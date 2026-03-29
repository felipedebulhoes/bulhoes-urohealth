/*
 * Design: Clinical Precision — Swiss Medical Design
 * Hero: Full-width dark overlay on medical image, split layout, strong CTA
 */
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CalendarCheck, Award, ShieldCheck } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/hero-bg-6uhJ3yapcGEiWBuUUhNSQ7.webp";

const stats = [
  { icon: Award, value: "TCBC", label: "Membro Titular CBC" },
  { icon: ShieldCheck, value: "3", label: "Sociedades Internacionais" },
  { icon: CalendarCheck, value: "9+", label: "Anos de Formação" },
];

export default function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="Consultório médico moderno"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/95 via-[#0A2540]/80 to-[#0A2540]/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-[#0D9488]" />
              <span className="text-[#5EEAD4] text-sm font-semibold uppercase tracking-[0.15em]">
                CRM-SP 202291
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
              Dr. Felipe de Bulhões
            </h1>

            <p className="text-lg sm:text-xl text-white/60 font-sans font-light leading-relaxed mb-4 max-w-lg">
              Urologista & Cirurgião Geral
            </p>

            <p className="text-base text-white/80 font-sans leading-relaxed mb-8 max-w-xl">
              Especialista em cirurgia minimamente invasiva, robótica e endourologia.
              Formado pelo Instituto D'Or de Ensino e Pesquisa, com atuação em São Paulo.
              Cuidado integral da saúde do homem com excelência técnica e acolhimento.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a
              href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/sao-paulo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#0D9488] hover:bg-[#0B7C72] text-white h-12 px-8 text-base font-semibold rounded-md shadow-lg shadow-teal-900/30">
                <CalendarCheck className="w-5 h-5 mr-2" />
                Agendar Consulta
              </Button>
            </a>
            <a href="#sobre">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 h-12 px-8 text-base font-medium rounded-md"
              >
                Conheça o Dr. Felipe
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-6 lg:gap-10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-[#5EEAD4]" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white font-sans">{stat.value}</p>
                  <p className="text-xs text-white/50 font-sans">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAFBFD] to-transparent" />
    </section>
  );
}
