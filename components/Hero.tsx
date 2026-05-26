"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Shield, Star, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0E1A]">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Radial orange glow left */}
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse-glow" />
        {/* Radial blue-purple glow right */}
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(249,115,22,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.15) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A0E1A] to-transparent" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 lg:right-20 w-64 h-64 border border-orange-500/10 rounded-full" />
      <div className="absolute top-32 right-16 lg:right-28 w-40 h-40 border border-orange-500/15 rounded-full animate-float" />
      <div className="absolute bottom-40 left-10 w-20 h-20 border border-white/5 rounded-full" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase px-5 py-2.5 rounded-full mb-8"
        >
          <Star size={12} fill="currentColor" />
          Escuela de Conducción · Medellín, Colombia
          <Star size={12} fill="currentColor" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.95] tracking-tight"
        >
          Aprende a<br />
          <span className="text-orange-500">Conducir</span>
          <br />
          con Profesionales
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Formación vial profesional con los mejores instructores certificados.
          Obtén tu licencia de manera segura, eficiente y a tu ritmo.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="#courses"
            className="group inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-200 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
          >
            Ver Cursos
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-orange-500/50 text-white px-8 py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-200 hover:bg-orange-500/5"
          >
            Contáctanos
          </a>
        </motion.div>

        {/* Mini stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10"
        >
          {[
            { icon: Shield, value: "+15 años", label: "de experiencia" },
            { icon: Users, value: "+50.000", label: "estudiantes formados" },
            { icon: Star, value: "4 sedes", label: "en Medellín" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 bg-orange-500/15 rounded-lg flex items-center justify-center">
                <Icon size={16} className="text-orange-400" />
              </div>
              <div>
                <p className="text-white font-black text-lg leading-none">{value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#stats"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 hover:text-orange-500 transition-colors"
      >
        <ChevronDown size={30} />
      </motion.a>
    </section>
  );
}
