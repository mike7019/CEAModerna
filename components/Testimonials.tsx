import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Camila Restrepo",
    license: "Licencia B1 – Automóvil",
    rating: 5,
    text: "Excelente academia. Mi instructor fue muy paciente y profesional. En menos de un mes ya estaba manejando con confianza. Totalmente recomendada para quien quiera aprender de la mejor manera.",
    avatar: "CR",
    color: "bg-violet-500",
  },
  {
    name: "Andrés Morales",
    license: "Licencia A2 – Motocicleta",
    rating: 5,
    text: "Llevaba tiempo queriendo sacar la licencia de moto y lo logré gracias a CEA Moderna. Las instalaciones son de primera, los instructores conocen muy bien su trabajo y el proceso fue rápido.",
    avatar: "AM",
    color: "bg-blue-500",
  },
  {
    name: "Valentina Torres",
    license: "Renovación de Licencia",
    rating: 5,
    text: "El proceso de renovación fue súper fácil. Todo en un solo lugar: examen médico, prueba de conocimientos y tramite. El equipo es muy organizado y amable. Sin duda volvería.",
    avatar: "VT",
    color: "bg-emerald-500",
  },
  {
    name: "Santiago Díaz",
    license: "Licencia C1 – Camión",
    rating: 5,
    text: "Necesitaba la licencia de camión para mi trabajo y CEA Moderna fue la mejor opción. Instructores expertos, horarios flexibles y un trato muy humano. Gracias por ayudarme a cumplir mi meta.",
    avatar: "SD",
    color: "bg-rose-500",
  },
  {
    name: "Laura Ospina",
    license: "Licencia B1 – Automóvil",
    rating: 5,
    text: "No sabía nada de manejar y me daba mucho miedo. El instructor me dio tanta confianza que en pocas clases ya me sentía segura. La sede del Poblado está en un lugar perfecto para practicar.",
    avatar: "LO",
    color: "bg-amber-500",
  },
  {
    name: "Felipe Gutiérrez",
    license: "Licencia A1 – Moto Básica",
    rating: 5,
    text: "Muy buen servicio. Los pagos en línea son súper cómodos y los instructores muy puntuales. Aprendí rápido y con mucha seguridad. El precio es justo para la calidad que ofrecen.",
    avatar: "FG",
    color: "bg-cyan-500",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-orange-500 text-xs font-bold tracking-[0.25em] uppercase mb-4">
            Testimonios
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-5">
            Lo que Dicen<br />Nuestros Estudiantes
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Miles de conductores ya cambiaron su vida con CEA Moderna.
            Lee sus experiencias.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[#111827] border border-white/5 rounded-2xl p-7 flex flex-col gap-5 hover:border-white/10 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote size={24} className="text-orange-500/40" />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-orange-500 fill-orange-500" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 text-sm leading-relaxed flex-1">{t.text}</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div
                  className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white font-bold text-xs">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.license}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
