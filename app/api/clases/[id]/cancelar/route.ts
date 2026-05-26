import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;

  const claseEst = await prisma.claseEstudiante.findFirst({
    where: { id, estudianteId: session.user.id },
  });

  if (!claseEst) return NextResponse.json({ error: "Clase no encontrada" }, { status: 404 });
  if (claseEst.estado === "completada") {
    return NextResponse.json({ error: "No puedes cancelar una clase completada" }, { status: 400 });
  }

  await prisma.claseEstudiante.update({
    where: { id },
    data: { slotId: null, estado: "pendiente" },
  });

  return NextResponse.json({ ok: true });
}
