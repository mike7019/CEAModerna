import { BookOpen, Car, Stethoscope, FileCheck, CreditCard, HeartHandshake } from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Clases Teóricas",
    description:
      "Aprende las normas de tránsito, señales viales y el Código Nacional de Tránsito con material actualizado.",
  },
  {
    icon: Car,
    title: "Clases Prácticas",
    description:
      "Practica en nuestros vehículos modernos y en pistas habilitadas bajo la supervisión de instructores certificados.",
  },
  {
    icon: Stethoscope,
    title: "Exámenes Médicos",
    description:
      "Realizamos los exámenes médicos de aptitud psicofísica requeridos por el Ministerio de Transporte.",
  },
  {
    icon: FileCheck,
    title: "Trámite de Licencia",
    description:
      "Te acompañamos en todo el proceso de obtención y renovación de tu licencia de conducción.",
  },
  {
    icon: CreditCard,
    title: "Pagos en Línea",
    description:
      "Realiza tus pagos de manera segura a través de nuestra plataforma ePayco, rápido y sin filas.",
  },
  {
    icon: HeartHandshake,
    title: "Seguridad Vial",
    description:
      "Programas de prevención: manejo defensivo, normas de descanso y cero tolerancia a sustancias.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-orange-500 text-xs font-bold tracking-[0.25em] uppercase mb-4">
            Lo que Ofrecemos
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-5">
            Servicios Completos
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Todo lo que necesitas para obtener tu licencia en un solo lugar,
            con la calidad y el respaldo de CEA Moderna.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-[#111827] border border-white/5 rounded-2xl p-7 hover:border-orange-500/25 hover:bg-[#131e2e] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/15 rounded-xl flex items-center justify-center mb-5 group-hover:bg-orange-500/15 group-hover:border-orange-500/30 transition-all duration-300">
                  <Icon size={22} className="text-orange-500" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
