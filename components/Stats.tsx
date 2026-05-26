"use client";

import { useEffect, useRef, useState } from "react";
import { Award, MapPin, Users, GraduationCap } from "lucide-react";

const stats = [
  { icon: Award, value: 15, suffix: "+", label: "Años de Experiencia", color: "text-orange-500" },
  { icon: Users, value: 50000, suffix: "+", label: "Estudiantes Formados", color: "text-orange-500" },
  { icon: MapPin, value: 4, suffix: "", label: "Sedes en Medellín", color: "text-orange-500" },
  { icon: GraduationCap, value: 20, suffix: "+", label: "Instructores Certificados", color: "text-orange-500" },
];

function useCountUp(target: number, duration = 2000, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);

  return count;
}

function StatItem({
  stat,
  active,
}: {
  stat: (typeof stats)[0];
  active: boolean;
}) {
  const count = useCountUp(stat.value, 2000, active);
  const Icon = stat.icon;

  return (
    <div className="flex flex-col items-center text-center p-8 group">
      <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-orange-500/20 group-hover:border-orange-500/40 transition-all duration-300">
        <Icon size={24} className="text-orange-500" />
      </div>
      <div className="text-4xl lg:text-5xl font-black text-white mb-2">
        {count.toLocaleString("es-CO")}
        <span className="text-orange-500">{stat.suffix}</span>
      </div>
      <p className="text-gray-400 text-sm font-medium tracking-wide">{stat.label}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className="bg-[#0D1321] border-y border-white/5" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
