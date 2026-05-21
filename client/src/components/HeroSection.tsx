/*
 * Design: Dr. Felipe de Bulhões — Identidade Visual
 * Hero: Split layout — text left, portrait right, Azul do Nilo background
 * Cores: #1C3D5A (fundo), #B87333 (cobre CTAs), #C4C4C4 (nuvem), #FEFEFE (branco)
 */
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CalendarCheck, Award, ShieldCheck, Users } from "lucide-react";
import { trackCtaClick } from "@/lib/analytics";

// Real photo from Instagram — professional portrait with blazer
const HERO_PORTRAIT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/felipe-portrait_0e0693e4.jpeg";

const stats = [
  { icon: Award, value: "TCBC", label: "Membro Titular CBC" },
  { icon: ShieldCheck, value: "AUA · EAU · SBU", label: "Sociedades" },
  { icon: Users, value: "1500+", label: "Pacientes atendidos" },
];

export default function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-[100vh] bg-[#1C3D5A] overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Decorative copper glow */}
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#B87333]/10 rounded-full blur-[120px]" />
      <div className="absolute top-40 left-10 w-48 h-48 bg-[#B87333]/5 rounded-full blur-[80px]" />

      <div className="container relative z-10 flex flex-col lg:flex-row items-center min-h-[100vh]">
        {/* Left: Text Content */}
        <div className="flex-1 pt-28 pb-8 lg:pt-0 lg:pb-0 lg:pr-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#B87333]" />
              <span className="text-[#C4C4C4] text-xs font-semibold uppercase tracking-[0.2em]">
                CRM-SP 202291 · RQE 146538 / RQE 114019
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl text-white leading-[1.08] mb-4 font-serif">
              Dr. Felipe de
              <br />
              <span className="text-[#B87333]">Bulhões</span>
            </h1>

            <p className="text-xl sm:text-2xl text-[#C4C4C4] font-light mb-6 tracking-wide" style={{ fontStyle: 'normal' }}>
              Urologista & Cirurgião Geral
            </p>

            <p className="text-base text-white/70 leading-relaxed mb-8 max-w-lg" style={{ fontStyle: 'normal' }}>
              Especialista em cirurgia minimamente invasiva, robótica e endourologia.
              Formado pelo <strong className="text-white/90">Instituto D'Or de Ensino e Pesquisa</strong>,
              com atuação em São Paulo e Campinas. Atendimento presencial e por teleconsulta.
              Cuidado integral da saúde do homem com excelência técnica e acolhimento.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <a
              href="#agendamento"
              onClick={(e) => {
                e.preventDefault();
                trackCtaClick("agendar_consulta", "hero_section");
                document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Button className="bg-[#B87333] hover:bg-[#D4884A] text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#B87333]/30 hover:-translate-y-0.5 h-13 px-8 text-base font-semibold rounded-lg shadow-lg shadow-[#B87333]/30 transition-all hover:shadow-xl hover:shadow-[#B87333]/40 hover:-translate-y-0.5">
                <CalendarCheck className="w-5 h-5 mr-2" />
                Agendar Consulta
              </Button>
            </a>
            <a href="#sobre">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 h-13 px-8 text-base font-medium rounded-lg"
              >
                Conheça o Dr. Felipe
              </Button>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-6 lg:gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-[#B87333]" />
                </div>
                <div>
                  <p className="text-base font-bold text-white leading-tight" style={{ fontStyle: 'normal' }}>{stat.value}</p>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider" style={{ fontStyle: 'normal' }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Real Portrait Photo */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 flex justify-center lg:justify-end items-end self-end relative mt-8 lg:mt-0"
        >
          <div className="relative">
            {/* Accent border frame - copper */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#B87333]/40 rounded-tl-2xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#B87333]/40 rounded-br-2xl" />

            <img
              src={HERO_PORTRAIT}
              alt="Dr. Felipe de Bulhões - Urologista"
              className="relative z-10 w-[300px] sm:w-[360px] lg:w-[400px] xl:w-[440px] h-auto object-cover rounded-xl shadow-2xl shadow-black/30"
            />

            {/* Floating credential badge */}
            <div className="absolute -bottom-2 -left-6 bg-white rounded-lg px-4 py-3 shadow-xl z-20">
              <p className="text-xs font-semibold text-[#1C3D5A]" style={{ fontStyle: 'normal' }}>Instituto D'Or</p>
              <p className="text-[10px] text-[#1C3D5A]/50" style={{ fontStyle: 'normal' }}>Urologia · São Paulo</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FEFEFE] to-transparent" />
    </section>
  );
}
