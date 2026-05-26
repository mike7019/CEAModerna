import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import StudentDashboard from "@/components/estudiantes/StudentDashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/estudiantes/login");

  const estudiante = await prisma.estudiante.findUnique({
    where: { id: session.user.id },
    include: {
      clases: {
        include: { clase: true, slot: true },
        orderBy: { clase: { numero: "asc" } },
      },
    },
  });

  if (!estudiante) redirect("/estudiantes/login");

  const hoy = new Date().toISOString().split("T")[0];
  const slots = await prisma.slotDisponible.findMany({
    where: { fecha: { gte: hoy } },
    orderBy: [{ fecha: "asc" }, { horaInicial: "asc" }],
  });

  return <StudentDashboard estudiante={estudiante} slots={slots} />;
}
