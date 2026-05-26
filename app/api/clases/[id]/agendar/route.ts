import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendClaseAgendadaEmail } from "@/lib/email";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const { slotId } = await req.json();

  if (!slotId) return NextResponse.json({ error: "slotId requerido" }, { status: 400 });

  // Verificar que la clase pertenece al estudiante
  const claseEst = await prisma.claseEstudiante.findFirst({
    where: { id, estudianteId: session.user.id },
    include: { clase: true, estudiante: true },
  });

  if (!claseEst) return NextResponse.json({ error: "Clase no encontrada" }, { status: 404 });
  if (claseEst.estado === "completada") {
    return NextResponse.json({ error: "Clase ya completada" }, { status: 400 });
  }

  const slot = await prisma.slotDisponible.findUnique({ where: { id: slotId } });
  if (!slot) return NextResponse.json({ error: "Horario no encontrado" }, { status: 404 });

  // Si tenía un slot anterior, liberarlo primero (reprogramar)
  const updated = await prisma.claseEstudiante.update({
    where: { id },
    data: { slotId, estado: "agendada" },
    include: { clase: true, slot: true, estudiante: true },
  });

  // Enviar email de confirmación
  await sendClaseAgendadaEmail({
    nombreEstudiante: `${claseEst.estudiante.nombre} ${claseEst.estudiante.apellido}`,
    email: claseEst.estudiante.email,
    nombreClase: claseEst.clase.nombre,
    fecha: slot.fecha,
    horaInicial: slot.horaInicial,
    horaFinal: slot.horaFinal,
    aula: slot.aula,
  });

  return NextResponse.json({ ok: true, clase: updated });
}
