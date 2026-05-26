import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

function googleCalendarUrl(params: {
  nombre: string;
  fecha: string;
  horaInicial: string;
  horaFinal: string;
  aula: string;
}): string {
  const fmt = (fecha: string, hora: string) =>
    `${fecha.replace(/-/g, "")}T${hora.replace(/:/g, "")}00`;

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", `CEA Moderna - ${params.nombre}`);
  url.searchParams.set("dates", `${fmt(params.fecha, params.horaInicial)}/${fmt(params.fecha, params.horaFinal)}`);
  url.searchParams.set("details", `Clase de conducción en CEA Moderna.\n\nCurso: Automovilismo B1\nProfesor asignado por la sede.`);
  url.searchParams.set("location", `${params.aula}, Medellín, Colombia`);
  return url.toString();
}

function formatFecha(fecha: string): string {
  const [year, month, day] = fecha.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function sendClaseAgendadaEmail(params: {
  nombreEstudiante: string;
  email: string;
  nombreClase: string;
  fecha: string;
  horaInicial: string;
  horaFinal: string;
  aula: string;
}) {
  const calendarUrl = googleCalendarUrl({
    nombre: params.nombreClase,
    fecha: params.fecha,
    horaInicial: params.horaInicial,
    horaFinal: params.horaFinal,
    aula: params.aula,
  });

  const fechaFormateada = formatFecha(params.fecha);

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <div style="max-width:580px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#F97316,#ea580c);padding:36px 40px;text-align:center;">
      <div style="display:inline-block;background:rgba(255,255,255,0.2);border-radius:12px;padding:10px 20px;margin-bottom:16px;">
        <span style="color:white;font-size:22px;font-weight:900;letter-spacing:-0.5px;">CEA Moderna</span>
      </div>
      <h1 style="color:white;margin:0;font-size:26px;font-weight:800;">¡Clase agendada!</h1>
      <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:15px;">Tu clase ha sido confirmada exitosamente</p>
    </div>

    <!-- Content -->
    <div style="padding:40px;">
      <p style="color:#374151;font-size:16px;margin:0 0 24px;">
        Hola <strong>${params.nombreEstudiante}</strong>,<br>
        tu clase ha sido agendada. Aquí tienes todos los detalles:
      </p>

      <!-- Class card -->
      <div style="background:#fff7ed;border:1px solid #fed7aa;border-left:4px solid #F97316;border-radius:12px;padding:24px;margin:0 0 28px;">
        <p style="color:#F97316;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 8px;">Clase agendada</p>
        <h2 style="color:#1a1a2e;font-size:20px;font-weight:800;margin:0 0 20px;">${params.nombreClase}</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;color:#6b7280;font-size:14px;width:40%;">📅 Fecha</td>
            <td style="padding:8px 0;color:#111827;font-weight:600;font-size:14px;text-transform:capitalize;">${fechaFormateada}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280;font-size:14px;border-top:1px solid #fed7aa;">🕐 Horario</td>
            <td style="padding:8px 0;color:#111827;font-weight:600;font-size:14px;border-top:1px solid #fed7aa;">${params.horaInicial} – ${params.horaFinal}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280;font-size:14px;border-top:1px solid #fed7aa;">📍 Lugar</td>
            <td style="padding:8px 0;color:#111827;font-weight:600;font-size:14px;border-top:1px solid #fed7aa;">${params.aula}</td>
          </tr>
        </table>
      </div>

      <!-- Google Calendar CTA -->
      <div style="text-align:center;margin:0 0 32px;">
        <a href="${calendarUrl}"
           style="display:inline-block;background:#F97316;color:white;padding:16px 32px;border-radius:12px;text-decoration:none;font-weight:700;font-size:16px;letter-spacing:0.3px;">
          📅 Agregar a Google Calendar
        </a>
        <p style="color:#9ca3af;font-size:13px;margin:12px 0 0;">Haz clic para guardar el recordatorio en tu calendario</p>
      </div>

      <!-- Reminder -->
      <div style="background:#f9fafb;border-radius:10px;padding:16px 20px;margin:0 0 24px;">
        <p style="color:#374151;font-size:14px;margin:0;"><strong>Recuerda:</strong> llega 10 minutos antes de tu clase con tu documento de identidad.</p>
      </div>

      <p style="color:#9ca3af;font-size:13px;margin:0;">
        ¿Tienes dudas? Contáctanos al <a href="tel:+573002503130" style="color:#F97316;">300 250 3130</a> o escríbenos al WhatsApp.
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;border-top:1px solid #f0f0f0;padding:20px 40px;text-align:center;">
      <p style="color:#9ca3af;font-size:12px;margin:0;">
        © ${new Date().getFullYear()} CEA Moderna · Medellín, Colombia<br>
        Escuela de conducción certificada por el Ministerio de Transporte
      </p>
    </div>
  </div>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"CEA Moderna" <${process.env.GMAIL_USER}>`,
      to: params.email,
      subject: `✅ Clase agendada: ${params.nombreClase} - ${fechaFormateada}`,
      html,
    });
  } catch (err) {
    console.error("[Email] Error enviando notificación:", err);
  }
}
