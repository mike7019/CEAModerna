"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  MapPin,
  CalendarPlus,
  RefreshCw,
  Loader2,
} from "lucide-react";
import AgendarModal from "./AgendarModal";
import { useRouter } from "next/navigation";

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

function formatFecha(fecha: string) {
  const [y, m, d] = fecha.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-CO", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function googleCalendarUrl(slot: Slot, nombreClase: string) {
  const fmt = (f: string, h: string) => `${f.replace(/-/g, "")}T${h.replace(/:/g, "")}00`;
  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", `CEA Moderna - ${nombreClase}`);
  url.searchParams.set("dates", `${fmt(slot.fecha, slot.horaInicial)}/${fmt(slot.fecha, slot.horaFinal)}`);
  url.searchParams.set("location", slot.aula);
  return url.toString();
}

export default function ClaseCard({
  claseEst,
  slots,
}: {
  claseEst: ClaseEstudiante;
  slots: Slot[];
}) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [canceling, setCanceling] = useState(false);

  const { estado, asistencia, clase, slot } = claseEst;

  async function handleCancelar() {
    if (!confirm("¿Seguro que deseas cancelar esta clase?")) return;
    setCanceling(true);
    await fetch(`/api/clases/${claseEst.id}/cancelar`, { method: "POST" });
    setCanceling(false);
    router.refresh();
  }

  function handleAgendado() {
    setShowModal(false);
    router.refresh();
  }

  // — Completada ——————————————————————————————————————
  if (estado === "completada") {
    const asistio = asistencia === true;
    return (
      <div className={`rounded-2xl border overflow-hidden ${asistio ? "border-emerald-500/25" : "border-red-500/20"}`}>
        {/* Header */}
        <div className={`px-5 py-4 flex items-start gap-3 ${asistio ? "bg-emerald-500/10" : "bg-red-500/8"}`}>
          {asistio
            ? <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
            : <XCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />}
          <div className="min-w-0">
            <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${asistio ? "text-emerald-500" : "text-red-500"}`}>
              {clase.numero}. Completada
            </p>
            <h3 className="text-white font-bold text-sm leading-tight">{clase.nombre}</h3>
          </div>
          <span className="ml-auto bg-white/8 text-gray-400 text-xs px-2 py-1 rounded-lg flex-shrink-0">
            {clase.horas}h
          </span>
        </div>
        {/* Body */}
        <div className="bg-[#111827] px-5 py-4 space-y-2">
          {slot && (
            <>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar size={13} className="flex-shrink-0" />
                <span className="capitalize">{formatFecha(slot.fecha)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock size={13} className="flex-shrink-0" />
                <span>{slot.horaInicial} – {slot.horaFinal}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={13} className="flex-shrink-0" />
                <span>{slot.aula}</span>
              </div>
            </>
          )}
          <div className="pt-2">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${asistio ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
              {asistio ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
              Asistencia: {asistio ? "Sí" : "No"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // — Agendada ———————————————————————————————————————
  if (estado === "agendada" && slot) {
    return (
      <>
        <div className="rounded-2xl border border-blue-500/25 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-500/10 px-5 py-4 flex items-start gap-3">
            <Calendar size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-0.5">
                {clase.numero}. Agendada
              </p>
              <h3 className="text-white font-bold text-sm leading-tight">{clase.nombre}</h3>
            </div>
            <span className="ml-auto bg-white/8 text-gray-400 text-xs px-2 py-1 rounded-lg flex-shrink-0">
              {clase.horas}h
            </span>
          </div>
          {/* Body */}
          <div className="bg-[#111827] px-5 py-4 space-y-2.5">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Calendar size={13} className="text-blue-400 flex-shrink-0" />
              <span className="capitalize font-medium">{formatFecha(slot.fecha)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Clock size={13} className="text-blue-400 flex-shrink-0" />
              <span>{slot.horaInicial} – {slot.horaFinal}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <MapPin size={13} className="flex-shrink-0" />
              <span>{slot.aula}</span>
            </div>

            {/* Calendar link */}
            <a
              href={googleCalendarUrl(slot, clase.nombre)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors pt-1"
            >
              <CalendarPlus size={13} />
              Agregar a Google Calendar
            </a>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 flex items-center justify-center gap-1.5 border border-white/10 hover:border-orange-500/40 text-gray-300 hover:text-orange-400 text-xs font-medium py-2 rounded-lg transition-all"
              >
                <RefreshCw size={13} />
                Reprogramar
              </button>
              <button
                onClick={handleCancelar}
                disabled={canceling}
                className="flex-1 flex items-center justify-center gap-1.5 border border-white/10 hover:border-red-500/40 text-gray-300 hover:text-red-400 text-xs font-medium py-2 rounded-lg transition-all"
              >
                {canceling ? <Loader2 size={13} className="animate-spin" /> : null}
                Cancelar
              </button>
            </div>
          </div>
        </div>

        {showModal && (
          <AgendarModal
            clase={{ id: claseEst.id, nombre: clase.nombre, horas: clase.horas }}
            slots={slots}
            onClose={() => setShowModal(false)}
            onSuccess={handleAgendado}
          />
        )}
      </>
    );
  }

  // — Pendiente ——————————————————————————————————————
  return (
    <>
      <div className="rounded-2xl border border-white/5 overflow-hidden group hover:border-orange-500/20 transition-all">
        {/* Header */}
        <div className="bg-[#1A2235] px-5 py-4 flex items-start gap-3">
          <div className="w-4.5 h-4.5 rounded-full border-2 border-gray-600 mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-0.5">
              {clase.numero}. Pendiente
            </p>
            <h3 className="text-gray-300 font-bold text-sm leading-tight">{clase.nombre}</h3>
          </div>
          <span className="ml-auto bg-white/5 text-gray-500 text-xs px-2 py-1 rounded-lg flex-shrink-0">
            {clase.horas}h
          </span>
        </div>
        {/* Body */}
        <div className="bg-[#111827] px-5 py-5 flex flex-col items-center text-center">
          <Clock size={28} className="text-gray-700 mb-2" />
          <p className="text-gray-500 text-xs mb-4">Esta clase aún no ha sido agendada</p>
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-orange-500/15 hover:shadow-orange-500/30 flex items-center justify-center gap-2"
          >
            <CalendarPlus size={15} />
            Agendar Clase
          </button>
        </div>
      </div>

      {showModal && (
        <AgendarModal
          clase={{ id: claseEst.id, nombre: clase.nombre, horas: clase.horas }}
          slots={slots}
          onClose={() => setShowModal(false)}
          onSuccess={handleAgendado}
        />
      )}
    </>
  );
}
