"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Conócenos", href: "#about" },
  { label: "Cursos", href: "#courses" },
  { label: "Servicios", href: "#services" },
  { label: "Sedes", href: "#locations" },
  { label: "Contacto", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0E1A]/95 backdrop-blur-md shadow-2xl shadow-black/40 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-lg leading-none">C</span>
          </div>
          <div className="leading-none">
            <span className="text-white font-black text-xl tracking-tight">CEA</span>
            <span className="text-orange-500 font-black text-xl tracking-tight"> Moderna</span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-white text-sm font-medium tracking-widest uppercase transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+573002503130"
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <Phone size={15} />
            <span>300 250 3130</span>
          </a>
          <a
            href="/estudiantes"
            className="border border-white/15 hover:border-orange-500/50 text-gray-300 hover:text-orange-400 px-4 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200"
          >
            Estudiantes
          </a>
          <a
            href="#contact"
            className="bg-orange-500 hover:bg-orange-400 text-white px-5 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105"
          >
            Matricúlate
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Menú"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-[#0D1321] border-t border-white/5 px-6 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-400 hover:text-orange-400 font-medium py-3 border-b border-white/5 text-sm uppercase tracking-widest transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 bg-orange-500 hover:bg-orange-400 text-white text-center py-3 rounded-xl font-bold text-sm transition-colors"
          >
            Matricúlate
          </a>
        </div>
      </div>
    </nav>
  );
}
