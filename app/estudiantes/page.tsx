import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function EstudiantesPage() {
  const session = await getServerSession(authOptions);
  redirect(session ? "/estudiantes/dashboard" : "/estudiantes/login");
}
