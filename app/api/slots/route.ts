import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const hoy = new Date().toISOString().split("T")[0];

  const slots = await prisma.slotDisponible.findMany({
    where: { fecha: { gte: hoy } },
    orderBy: [{ fecha: "asc" }, { horaInicial: "asc" }],
  });

  return NextResponse.json(slots);
}
