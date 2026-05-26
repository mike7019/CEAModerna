import { CheckCircle2 } from "lucide-react";

const pillars = [
  "Instructores certificados por el Ministerio de Transporte",
  "Metodología práctica con simuladores y vehículos modernos",
  "Clases flexibles en horarios que se adaptan a ti",
  "Acompañamiento hasta obtener tu licencia de conducción",
  "Énfasis en seguridad vial y conducción responsable",
  "Ambientes de aprendizaje cómodos y equipados",
];

export default function About() {
  return (
    <section id="about" className="py-28 bg-[#0D1321]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual side */}
          <div className="relative">
            {/* Main card */}
            <div className="relative bg-[#111827] border border-white/5 rounded-3xl p-10 overflow-hidden">
              {/* Background glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />

              {/* Big text */}
              <div className="relative z-10">
                <p className="text-orange-500 text-xs font-bold tracking-[0.25em] uppercase mb-3">
                  Desde 2008
                </p>
                <h3 className="text-5xl lg:text-6xl font-black text-white leading-none mb-6">
                  +15<br />
                  <span className="text-orange-500">Años</span>
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  formando conductores responsables y seguros en la ciudad de Medellín.
                </p>
              </div>

              {/* Floating stats */}
              <div className="relative z-10 grid grid-cols-2 gap-4 mt-10">
                {[
                  { value: "98%", label: "Tasa de aprobación" },
                  { value: "4.9★", label: "Calificación promedio" },
                  { value: "4", label: "Sedes disponibles" },
                  { value: "24/7", label: "Soporte estudiantil" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#1A2235] border border-white/5 rounded-2xl p-4"
                  >
                    <p className="text-white font-black text-2xl">{item.value}</p>
                    <p className="text-gray-500 text-xs mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-orange-500 rounded-3xl -z-10 opacity-10" />
          </div>

          {/* Text side */}
          <div>
            <span className="inline-block text-orange-500 text-xs font-bold tracking-[0.25em] uppercase mb-5">
              Quiénes Somos
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              La escuela de<br />
              conducción más{" "}
              <span className="text-orange-500">moderna</span>{" "}
              de Medellín
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              En CEA Moderna creemos que conducir es una habilidad que transforma
              vidas. Por eso, ofrecemos una formación integral que va más allá del
              simple aprendizaje técnico: formamos conductores conscientes,
              responsables y seguros para las vías colombianas.
            </p>

            {/* Pillars */}
            <ul className="space-y-3">
              {pillars.map((pillar) => (
                <li key={pillar} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-orange-500 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-gray-300 text-sm leading-relaxed">{pillar}</span>
                </li>
              ))}
            </ul>

            <a
              href="#courses"
              className="inline-flex items-center gap-2 mt-10 bg-orange-500 hover:bg-orange-400 text-white px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all hover:scale-105 shadow-lg shadow-orange-500/25"
            >
              Conoce Nuestros Cursos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
