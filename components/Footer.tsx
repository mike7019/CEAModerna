import { Phone, MapPin, Mail } from "lucide-react";

const navLinks = [
  { label: "Conócenos", href: "#about" },
  { label: "Cursos", href: "#courses" },
  { label: "Servicios", href: "#services" },
  { label: "Sedes", href: "#locations" },
  { label: "Contacto", href: "#contact" },
];

const legalLinks = [
  { label: "Política de Privacidad", href: "#" },
  { label: "Tratamiento de Datos", href: "#" },
  { label: "Quejas y Reclamos", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#080C17] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <span className="text-white font-black text-lg">C</span>
              </div>
              <div>
                <span className="text-white font-black text-xl">CEA</span>
                <span className="text-orange-500 font-black text-xl"> Moderna</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              Escuela de conducción líder en Medellín. Formamos conductores
              responsables, seguros y preparados para las vías colombianas
              desde 2008.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { label: "Facebook", href: "https://www.facebook.com/ceamoderna", abbr: "f" },
                { label: "Instagram", href: "https://www.instagram.com/ceamoderna", abbr: "in" },
                { label: "YouTube", href: "https://www.youtube.com/@ceamoderna", abbr: "yt" },
              ].map(({ label, href, abbr }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 rounded-lg flex items-center justify-center transition-all duration-200 group"
                >
                  <span className="text-gray-400 group-hover:text-white text-xs font-bold transition-colors uppercase">{abbr}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Navegación
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <Phone size={15} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">300 250 3130</p>
                  <p className="text-gray-500 text-xs">(604) 431 0187</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">Medellín, Colombia<br />4 Sedes disponibles</p>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-orange-500 flex-shrink-0" />
                <a
                  href="mailto:info@ceamoderna.com"
                  className="text-gray-300 hover:text-orange-400 text-sm transition-colors"
                >
                  info@ceamoderna.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} CEA Moderna. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
