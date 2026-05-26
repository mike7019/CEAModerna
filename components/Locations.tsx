import { MapPin, Phone, Clock } from "lucide-react";

const locations = [
  {
    name: "Sede Minorista",
    address: "Carrera 56C #54-12",
    neighborhood: "Minorista, Medellín",
    phone: "+57 300 250 3130",
    hours: "Lun–Sáb 7am–6pm",
  },
  {
    name: "Sede Mayorca",
    address: "C.C Mayorca Etapa 2, Local 9923",
    neighborhood: "Sabaneta, Medellín",
    phone: "+57 300 250 3130",
    hours: "Lun–Sáb 8am–7pm",
  },
  {
    name: "Pista Poblado",
    address: "Pista Manila",
    neighborhood: "El Poblado, Medellín",
    phone: "(604) 431 0187",
    hours: "Lun–Dom 7am–5pm",
  },
  {
    name: "Sede Sao Paulo",
    address: "CR 43A #19 Sur-135",
    neighborhood: "Sao Paulo Plaza, Medellín",
    phone: "+57 300 250 3130",
    hours: "Lun–Sáb 8am–6pm",
  },
];

export default function Locations() {
  return (
    <section id="locations" className="py-28 bg-[#0D1321]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-orange-500 text-xs font-bold tracking-[0.25em] uppercase mb-4">
            Encuéntranos
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-5">
            Nuestras Sedes
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Cuatro ubicaciones estratégicas en Medellín para que encuentres
            siempre la más cercana a ti.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((loc, idx) => (
            <div
              key={loc.name}
              className="group bg-[#111827] border border-white/5 rounded-2xl p-7 hover:border-orange-500/25 transition-all duration-300 flex gap-6"
            >
              {/* Number */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
                  <span className="text-orange-400 group-hover:text-white font-black text-lg transition-colors duration-300">
                    {idx + 1}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-lg mb-4">{loc.name}</h3>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={15} className="text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300 text-sm">{loc.address}</p>
                      <p className="text-gray-500 text-xs">{loc.neighborhood}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={15} className="text-orange-500 flex-shrink-0" />
                    <a
                      href={`tel:${loc.phone.replace(/\s/g, "")}`}
                      className="text-gray-300 text-sm hover:text-orange-400 transition-colors"
                    >
                      {loc.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock size={15} className="text-orange-500 flex-shrink-0" />
                    <p className="text-gray-400 text-sm">{loc.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map placeholder CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://maps.google.com/?q=CEA+Moderna+Medellín"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/10 hover:border-orange-500/40 text-gray-300 hover:text-orange-400 px-7 py-3.5 rounded-xl text-sm font-medium transition-all duration-200"
          >
            <MapPin size={16} />
            Ver en Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
