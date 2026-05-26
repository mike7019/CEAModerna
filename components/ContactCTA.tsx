import { Phone, MessageCircle, ArrowRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section id="contact" className="py-28 bg-[#0D1321]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main CTA card */}
        <div className="relative rounded-3xl overflow-hidden bg-orange-500 p-12 lg:p-16 text-center">
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <span className="inline-block bg-white/20 text-white text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6">
              Comienza Hoy
            </span>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-5 leading-tight">
              ¿Listo para aprender<br />a conducir?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
              Contáctanos ahora y un asesor te ayudará a elegir el curso
              ideal. ¡Tu licencia está más cerca de lo que crees!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/573002503130?text=Hola%2C%20quiero%20información%20sobre%20los%20cursos%20de%20CEA%20Moderna"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 bg-white text-orange-500 px-8 py-4 rounded-xl font-black text-base tracking-wide transition-all hover:scale-105 shadow-xl"
              >
                <MessageCircle size={20} />
                WhatsApp
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+573002503130"
                className="inline-flex items-center justify-center gap-2.5 border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-bold text-base tracking-wide transition-all hover:bg-white/10"
              >
                <Phone size={20} />
                300 250 3130
              </a>
            </div>
          </div>
        </div>

        {/* Secondary info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "WhatsApp", value: "300 250 3130", sub: "Respuesta inmediata" },
            { label: "Teléfono", value: "(604) 431 0187", sub: "Lun–Sáb 8am–6pm" },
            { label: "Quejas y Reclamos", value: "ceamoderna.com", sub: "Formulario en línea" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[#111827] border border-white/5 rounded-2xl p-6 text-center"
            >
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">
                {item.label}
              </p>
              <p className="text-white font-black text-xl mb-1">{item.value}</p>
              <p className="text-gray-500 text-sm">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
