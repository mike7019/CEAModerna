"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  LogOut,
  BookOpen,
  CheckCircle2,
  Calendar,
  Clock,
  GraduationCap,
  AlertCircle,
} from "lucide-react";
import ClaseCard from "./ClaseCard";

type Slot = {
  id: string;
  fecha: string;
  horaInicial: string;
  horaFinal: string;
  aula: string;
};

type Clase = {
  id: string;
  numero: number;
  nombre: string;
  horas: number;
  tipo: string;
};

type ClaseEstudiante = {
  id: string;
  estado: string;
  asistencia: boolean | null;
  clase: Clase;
  slot: Slot | null;
};

type Estudiante = {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  cedula: string;
  curso: string;
  deuda: number;
  clases: ClaseEstudiante[];
};

type Tab = "todas" | "teorica" | "practica";

const TAB_LABELS: Record<Tab, string> = {
  todas: "Todas",
  teorica: "Teóricas",
  practica: "Prácticas",
};

export default function StudentDashboard({
  estudiante,
  slots,
}: {
  estudiante: Estudiante;
  slots: Slot[];
}) {
  const [tab, setTab] = useState<Tab>("todas");

  const { clases } = estudiante;
  const total = clases.length;
  const completadas = clases.filter((c) => c.estado === "completada").length;
  const agendadas = clases.filter((c) => c.estado === "agendada").length;
  const pendientes = clases.filter((c) => c.estado === "pendiente").length;
  const progreso = total > 0 ? Math.round((completadas / total) * 100) : 0;

  const filtered = clases.filter((c) =>
    tab === "todas" ? true : c.clase.tipo === tab
  );

  const initials = `${estudiante.nombre[0]}${estudiante.apellido[0]}`.toUpperCase();

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      {/* ── Header ────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#0D1321]/95 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-500/30">
              <span className="text-white font-black text-base">C</span>
            </div>
            <span className="hidden sm:block text-white font-black text-lg">
              CEA<span className="text-orange-500"> Moderna</span>
            </span>
          </a>

          <div className="h-6 w-px bg-white/10 flex-shrink-0" />

          {/* Student info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center flex-shrink-0 text-white font-black text-sm shadow-md">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-tight truncate">
                {estudiante.nombre} {estudiante.apellido}
              </p>
              <p className="text-gray-500 text-xs truncate">
                Cédula: {estudiante.cedula}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => signOut({ callbackUrl: "/estudiantes/login" })}
            className="flex items-center gap-2 border border-white/10 hover:border-red-500/40 text-gray-400 hover:text-red-400 px-4 py-2 rounded-xl text-sm font-medium transition-all flex-shrink-0"
          >
            <LogOut size={16} />
            <span className="hidden sm:block">Cerrar Sesión</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Greeting ──────────────────────────── */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">
            Bienvenido, {estudiante.nombre} 👋
          </h1>
          <p className="text-gray-400 text-sm">
            Aquí puedes ver y agendar tus clases de conducción.
          </p>
        </div>

        {/* ── Info cards ────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Curso */}
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 bg-orange-500/15 border border-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <GraduationCap size={20} className="text-orange-500" />
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Curso</p>
              <p className="text-white font-black text-base">{estudiante.curso}</p>
            </div>
          </div>

          {/* Deuda */}
          <div className={`bg-[#111827] border rounded-2xl p-5 flex items-center gap-4 ${estudiante.deuda > 0 ? "border-red-500/20" : "border-emerald-500/20"}`}>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${estudiante.deuda > 0 ? "bg-red-500/10 border border-red-500/20" : "bg-emerald-500/10 border border-emerald-500/20"}`}>
              <AlertCircle size={20} className={estudiante.deuda > 0 ? "text-red-400" : "text-emerald-400"} />
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Saldo Pendiente</p>
              <p className={`font-black text-base ${estudiante.deuda > 0 ? "text-red-400" : "text-emerald-400"}`}>
                {estudiante.deuda > 0
                  ? `$${estudiante.deuda.toLocaleString("es-CO")}`
                  : "Al día ✓"}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen size={20} className="text-blue-400" />
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Correo</p>
              <p className="text-white font-bold text-sm truncate">{estudiante.email}</p>
            </div>
          </div>
        </div>

        {/* ── Progress ──────────────────────────── */}
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-white font-black text-lg">Progreso del Curso</h2>
              <p className="text-gray-400 text-sm">{completadas} de {total} clases completadas</p>
            </div>
            <span className="text-3xl font-black text-orange-500">{progreso}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/5 rounded-full h-3 mb-5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all duration-700"
              style={{ width: `${progreso}%` }}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: CheckCircle2, label: "Completadas", value: completadas, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { icon: Calendar, label: "Agendadas", value: agendadas, color: "text-blue-400", bg: "bg-blue-500/10" },
              { icon: Clock, label: "Pendientes", value: pendientes, color: "text-gray-400", bg: "bg-white/5" },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className={`${bg} rounded-xl p-3 text-center`}>
                <Icon size={18} className={`${color} mx-auto mb-1`} />
                <p className={`${color} font-black text-xl`}>{value}</p>
                <p className="text-gray-500 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs ──────────────────────────────── */}
        <div className="flex items-center gap-2 mb-6">
          {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === t
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "bg-[#111827] border border-white/5 text-gray-400 hover:text-white hover:border-white/15"
              }`}
            >
              {TAB_LABELS[t]}
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-md ${tab === t ? "bg-white/20" : "bg-white/5"}`}>
                {t === "todas" ? total : clases.filter((c) => c.clase.tipo === t).length}
              </span>
            </button>
          ))}
        </div>

        {/* ── Classes grid ──────────────────────── */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen size={40} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">No hay clases en esta categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((claseEst) => (
              <ClaseCard key={claseEst.id} claseEst={claseEst} slots={slots} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
