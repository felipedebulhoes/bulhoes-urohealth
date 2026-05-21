/* StatsCounter.tsx — Contador Animado de Estatísticas
 * Design: Clinical Precision / Swiss Medical
 * Objetivo: Prova social numérica — aumenta confiança do paciente
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, Award, Stethoscope, Star, Clock, MapPin } from "lucide-react";

interface Stat {
  icon: typeof Users;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    icon: Users,
    value: 5000,
    suffix: "+",
    label: "Pacientes Atendidos",
    description: "Consultas e procedimentos realizados",
  },
  {
    icon: Stethoscope,
    value: 1500,
    suffix: "+",
    label: "Procedimentos Cirúrgicos",
    description: "Cirurgias minimamente invasivas",
  },
  {
    icon: Award,
    value: 1,
    suffix: "",
    label: "Título de Especialista",
    description: "TCBC",
  },
  {
    icon: Star,
    value: 5.0,
    suffix: "",
    label: "Nota no Doctoralia",
    description: "Avaliação máxima dos pacientes",
  },
  {
    icon: Clock,
    value: 8,
    suffix: "+",
    label: "Anos de Experiência",
    description: "Em cirurgia e urologia",
  },
  {
    icon: MapPin,
    value: 3,
    suffix: "",
    label: "Locais de Atendimento",
    description: "Campinas e São Paulo",
  },
];

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const isDecimal = target % 1 !== 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      if (isDecimal) {
        setCount(parseFloat((eased * target).toFixed(1)));
      } else {
        setCount(Math.floor(eased * target));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, start]);

  return count;
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const count = useCountUp(stat.value, 2000, isVisible);
  const Icon = stat.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const displayValue = stat.value % 1 !== 0 ? count.toFixed(1) : count.toLocaleString("pt-BR");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="text-center group"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-xl mb-4 group-hover:bg-white/20 transition-colors">
        <Icon className="w-7 h-7 text-[#B87333]" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-white mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>
        {displayValue}
        <span className="text-[#B87333]">{stat.suffix}</span>
      </div>
      <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
      <div className="text-white/60 text-xs">{stat.description}</div>
    </motion.div>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-20 bg-[#1C3D5A] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Números que Refletem Compromisso
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Cada número representa a confiança depositada pelos nossos pacientes e o compromisso com a excelência em urologia.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
