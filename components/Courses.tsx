import { Bike, Car, Truck, RefreshCw, BookOpen, Clock } from "lucide-react";

const courses = [
  {
    icon: Bike,
    category: "Categoría A1",
    name: "Motocicleta Básica",
    description:
      "Aprende a manejar motocicletas de hasta 125cc con seguridad y confianza desde cero.",
    duration: "20 horas",
    highlight: false,
  },
  {
    icon: Bike,
    category: "Categoría A2",
    name: "Motocicleta Avanzada",
    description:
      "Curso para motocicletas de mayor cilindrada. Maniobras avanzadas y seguridad vial.",
    duration: "25 horas",
    highlight: false,
  },
  {
    icon: Car,
    category: "Categoría B1",
    name: "Automóvil Particular",
    description:
      "El curso más popular. Aprende a conducir un auto desde lo básico hasta maniobras complejas.",
    duration: "30 horas",
    highlight: true,
  },
  {
    icon: Car,
    category: "Categoría B2",
    name: "Automóvil Reforzado",
    description:
      "Ideal para conductores con experiencia previa que desean perfeccionar sus habilidades.",
    duration: "15 horas",
    highlight: false,
  },
  {
    icon: Truck,
    category: "Categoría C1",
    name: "Camión y Vehículo Pesado",
    description:
      "Formación especializada para conducción de camiones y vehículos de carga.",
    duration: "40 horas",
    highlight: false,
  },
  {
    icon: RefreshCw,
    category: "Renovación",
    name: "Renovación de Licencia",
    description:
      "Trámites de renovación con exámenes médicos, de conocimientos y de habilidades.",
    duration: "1 día",
    highlight: false,
  },
];

export default function Courses() {
  return (
    <section id="courses" className="py-28 bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-orange-500 text-xs font-bold tracking-[0.25em] uppercase mb-4">
            Nuestros Cursos
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
            Elige tu Categoría
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Cursos diseñados para todos los niveles, con instructores certificados
            y metodología probada.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const Icon = course.icon;
            return (
              <div
                key={course.name}
                className={`relative group rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  course.highlight
                    ? "bg-orange-500 border-orange-400 shadow-xl shadow-orange-500/20"
                    : "bg-[#111827] border-white/5 hover:border-orange-500/30 hover:shadow-orange-500/10"
                }`}
              >
                {course.highlight && (
                  <span className="absolute -top-3 left-7 bg-white text-orange-500 text-xs font-black px-3 py-1 rounded-full tracking-wide">
                    MÁS POPULAR
                  </span>
                )}

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    course.highlight
                      ? "bg-white/20"
                      : "bg-orange-500/10 border border-orange-500/20 group-hover:bg-orange-500/15"
                  }`}
                >
                  <Icon
                    size={22}
                    className={course.highlight ? "text-white" : "text-orange-500"}
                  />
                </div>

                {/* Category tag */}
                <span
                  className={`text-xs font-bold tracking-[0.15em] uppercase mb-2 block ${
                    course.highlight ? "text-white/70" : "text-orange-500"
                  }`}
                >
                  {course.category}
                </span>

                {/* Name */}
                <h3
                  className={`text-xl font-black mb-3 ${
                    course.highlight ? "text-white" : "text-white"
                  }`}
                >
                  {course.name}
                </h3>

                {/* Description */}
                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    course.highlight ? "text-white/80" : "text-gray-400"
                  }`}
                >
                  {course.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock
                      size={14}
                      className={course.highlight ? "text-white/60" : "text-gray-500"}
                    />
                    <span
                      className={`text-sm font-medium ${
                        course.highlight ? "text-white/80" : "text-gray-400"
                      }`}
                    >
                      {course.duration}
                    </span>
                  </div>
                  <a
                    href="#contact"
                    className={`flex items-center gap-1.5 text-sm font-bold transition-all ${
                      course.highlight
                        ? "text-white hover:gap-2.5"
                        : "text-orange-500 hover:text-orange-400 hover:gap-2.5"
                    }`}
                  >
                    <BookOpen size={15} />
                    Inscribirme
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
