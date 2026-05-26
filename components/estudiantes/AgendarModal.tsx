"use client";

import { useState } from "react";
import { X, Calendar, MapPin, Clock, CheckCircle2, Loader2 } from "lucide-react";

type Slot = {
  id: string;
  fecha: string;
  horaInicial: string;
  horaFinal: string;
  aula: string;
};

type ClaseInfo = {
  id: string;
  nombre: string;
  horas: number;
};

function formatFecha(fecha: string) {
  const [y, m, d] = fecha.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function AgendarModal({
  clase,
  slots,
  onClose,
  onSuccess,
}: {
  clase: ClaseInfo;
  slots: Slot[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirm() {
    if (!selectedSlot) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/clases/${clase.id}/agendar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId: selectedSlot }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al agendar. Intenta de nuevo.");
      } else {
        onSuccess();
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  // Group slots by date
  const slotsByDate = slots.reduce<Record<string, Slot[]>>((acc, slot) => {
    if (!acc[slot.fecha]) acc[slot.fecha] = [];
    acc[slot.fecha].push(slot);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg bg-[#111827] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0D1321] border-b border-white/5 px-6 py-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-1">
              Agendar clase
            </p>
            <h2 className="text-white font-black text-lg leading-tight">{clase.nombre}</h2>
            <p className="text-gray-400 text-sm mt-0.5">{clase.horas} hora{clase.horas !== 1 ? "s" : ""} de clase</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors mt-0.5 flex-shrink-0"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
          {slots.length === 0 ? (
            <div className="text-center py-8">
              <Calendar size={40} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 font-medium">No hay horarios disponibles</p>
              <p className="text-gray-600 text-sm mt-1">
                Comunícate con la sede para programar tu clase.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="text-gray-400 text-sm">Selecciona un horario disponible:</p>

              {Object.entries(slotsByDate).map(([fecha, daySlots]) => (
                <div key={fecha}>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2.5 capitalize">
                    {formatFecha(fecha)}
                  </p>
                  <div className="space-y-2">
                    {daySlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot.id)}
                        className={`w-full text-left rounded-xl border p-4 transition-all ${
                          selectedSlot === slot.id
                            ? "bg-orange-500/10 border-orange-500 ring-1 ring-orange-500/30"
                            : "bg-[#1A2235] border-white/5 hover:border-white/15"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                selectedSlot === slot.id
                                  ? "border-orange-500 bg-orange-500"
                                  : "border-gray-600"
                              }`}
                            >
                              {selectedSlot === slot.id && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <Clock size={13} className="text-gray-400" />
                                <span className="text-white font-bold text-sm">
                                  {slot.horaInicial} – {slot.horaFinal}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <MapPin size={12} className="text-gray-500" />
                                <span className="text-gray-400 text-xs">{slot.aula}</span>
                              </div>
                            </div>
                          </div>
                          {selectedSlot === slot.id && (
                            <CheckCircle2 size={18} className="text-orange-500" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-white/10 hover:border-white/20 text-gray-300 py-3 rounded-xl text-sm font-medium transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedSlot || loading}
            className="flex-1 bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/40 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Agendando...
              </>
            ) : (
              "Confirmar Agendamiento"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
