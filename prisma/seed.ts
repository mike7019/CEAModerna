import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Sembrando base de datos...");

  // Limpiar datos previos
  await prisma.claseEstudiante.deleteMany();
  await prisma.slotDisponible.deleteMany();
  await prisma.estudiante.deleteMany();
  await prisma.clase.deleteMany();

  // ── Clases ────────────────────────────────────────
  const clasesData = [
    { numero: 1,  nombre: "Adaptación al medio 1",        horas: 2, tipo: "teorica" },
    { numero: 2,  nombre: "Adaptación al medio 2",        horas: 2, tipo: "teorica" },
    { numero: 3,  nombre: "Adaptación al medio 3",        horas: 2, tipo: "teorica" },
    { numero: 4,  nombre: "Adaptación al medio 4",        horas: 2, tipo: "teorica" },
    { numero: 5,  nombre: "Ética 1",                      horas: 2, tipo: "teorica" },
    { numero: 6,  nombre: "Ética 2",                      horas: 2, tipo: "teorica" },
    { numero: 7,  nombre: "Ética 3",                      horas: 2, tipo: "teorica" },
    { numero: 8,  nombre: "Ética 4",                      horas: 1, tipo: "teorica" },
    { numero: 9,  nombre: "Marco legal 1",                horas: 2, tipo: "teorica" },
    { numero: 10, nombre: "Marco legal 2",                horas: 2, tipo: "teorica" },
    { numero: 11, nombre: "Marco legal 3",                horas: 2, tipo: "teorica" },
    { numero: 12, nombre: "Marco legal 4",                horas: 2, tipo: "teorica" },
    { numero: 13, nombre: "Mecánica 1 Carro",             horas: 2, tipo: "practica" },
    { numero: 14, nombre: "Mecánica 2 Carro",             horas: 2, tipo: "practica" },
    { numero: 15, nombre: "Técnica de conducción 1 Carro",horas: 2, tipo: "practica" },
    { numero: 16, nombre: "Técnica de conducción 2 Carro",horas: 1, tipo: "practica" },
  ];

  const clases = await Promise.all(
    clasesData.map((c) => prisma.clase.create({ data: c }))
  );

  // ── Slots disponibles ─────────────────────────────
  const slotsData = [
    { fecha: "2026-06-02", horaInicial: "08:00", horaFinal: "10:00", aula: "Aula teórica centro" },
    { fecha: "2026-06-02", horaInicial: "14:00", horaFinal: "16:00", aula: "Aula teórica centro" },
    { fecha: "2026-06-03", horaInicial: "07:00", horaFinal: "09:00", aula: "Pista Poblado Manila" },
    { fecha: "2026-06-03", horaInicial: "17:00", horaFinal: "19:00", aula: "Aula teórica centro" },
    { fecha: "2026-06-04", horaInicial: "08:00", horaFinal: "10:00", aula: "Aula teórica centro" },
    { fecha: "2026-06-05", horaInicial: "10:00", horaFinal: "12:00", aula: "Sede Mayorca" },
    { fecha: "2026-06-06", horaInicial: "08:00", horaFinal: "10:00", aula: "Pista Poblado Manila" },
    { fecha: "2026-06-07", horaInicial: "06:00", horaFinal: "08:00", aula: "Aula teórica centro" },
    { fecha: "2026-06-09", horaInicial: "17:00", horaFinal: "19:00", aula: "Aula teórica centro" },
    { fecha: "2026-06-10", horaInicial: "08:00", horaFinal: "10:00", aula: "Sede Sao Paulo Plaza" },
    { fecha: "2026-06-11", horaInicial: "14:00", horaFinal: "16:00", aula: "Aula teórica centro" },
    { fecha: "2026-06-12", horaInicial: "07:00", horaFinal: "09:00", aula: "Pista Poblado Manila" },
  ];

  const slots = await Promise.all(
    slotsData.map((s) => prisma.slotDisponible.create({ data: s }))
  );

  // ── Estudiante de prueba ──────────────────────────
  const hashedPassword = await bcrypt.hash("Password123!", 10);

  const estudiante = await prisma.estudiante.create({
    data: {
      cedula: "12345678",
      password: hashedPassword,
      nombre: "María Fernanda",
      apellido: "García López",
      email: "estudiante@test.com",
      telefono: "3001234567",
      curso: "CURSOB1+3ROS",
      deuda: 549000,
    },
  });

  // ── Asignar clases al estudiante ──────────────────
  // Clases 1-10 → completadas con asistencia
  const completadas = clases.slice(0, 10);
  for (const clase of completadas) {
    await prisma.claseEstudiante.create({
      data: {
        estudianteId: estudiante.id,
        claseId: clase.id,
        slotId: null,
        estado: "completada",
        asistencia: true,
      },
    });
  }

  // Clases 11-13 → agendadas con slots futuros
  const agendadas = clases.slice(10, 13);
  for (let i = 0; i < agendadas.length; i++) {
    await prisma.claseEstudiante.create({
      data: {
        estudianteId: estudiante.id,
        claseId: agendadas[i].id,
        slotId: slots[i].id,
        estado: "agendada",
        asistencia: null,
      },
    });
  }

  // Clases 14-16 → pendientes
  const pendientes = clases.slice(13, 16);
  for (const clase of pendientes) {
    await prisma.claseEstudiante.create({
      data: {
        estudianteId: estudiante.id,
        claseId: clase.id,
        slotId: null,
        estado: "pendiente",
        asistencia: null,
      },
    });
  }

  console.log("✅ Seed completado:");
  console.log(`   • ${clases.length} clases creadas`);
  console.log(`   • ${slots.length} slots disponibles`);
  console.log(`   • Estudiante: ${estudiante.nombre} ${estudiante.apellido}`);
  console.log(`   • Cédula: 12345678 | Contraseña: Password123!`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
