"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, CreditCard, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      cedula,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Cédula o contraseña incorrectos. Verifica tus datos.");
    } else {
      router.push("/estudiantes/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-900/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-3 group mb-6">
            <div className="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <span className="text-white font-black text-xl">C</span>
            </div>
            <div>
              <span className="text-white font-black text-2xl">CEA</span>
              <span className="text-orange-500 font-black text-2xl"> Moderna</span>
            </div>
          </a>
          <h1 className="text-white text-2xl font-black mt-4">Portal Estudiantil</h1>
          <p className="text-gray-400 text-sm mt-2">Ingresa con tu número de cédula</p>
        </div>

        {/* Card */}
        <div className="bg-[#111827] border border-white/8 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3">
                <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Cedula */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Número de Cédula
              </label>
              <div className="relative">
                <CreditCard
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  placeholder="Ej: 1234567890"
                  required
                  className="w-full bg-[#1A2235] border border-white/8 text-white rounded-xl pl-11 pr-4 py-3 text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  required
                  className="w-full bg-[#1A2235] border border-white/8 text-white rounded-xl pl-11 pr-12 py-3 text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/50 text-white py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 mt-2"
            >
              {loading ? "Ingresando..." : "Ingresar al Portal"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/5 text-center">
            <p className="text-gray-500 text-xs">
              ¿Problemas para ingresar?{" "}
              <a
                href="tel:+573002503130"
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                Llama al 300 250 3130
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          <a href="/" className="hover:text-gray-400 transition-colors">
            ← Volver al sitio principal
          </a>
        </p>
      </div>
    </div>
  );
}
