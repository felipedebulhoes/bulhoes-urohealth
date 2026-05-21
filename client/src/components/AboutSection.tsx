/*
 * Design: Clinical Precision — Swiss Medical Design
 * About: Split layout with REAL photo and text, credentials badges
 * Uses real Instagram photo from UroOnco 2025 congress
 */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Stethoscope, Globe, BookOpen } from "lucide-react";

// Real photo — Dr. Felipe at I Jornada IDOR Urologia (academic event with colleagues)
const ABOUT_IMG = "/manus-storage/jornada-idor_cd58a6fe_2866b20d.webp";

const credentials = [
  {
    icon: GraduationCap,
    title: "Formação de Excelência",
    desc: "Medicina pela UFF, Cirurgia Geral pela FMABC e Urologia pelo Instituto D'Or de Ensino e Pesquisa (SP)",
  },
  {
    icon: Stethoscope,
    title: "Título de Especialista",
    desc: "Membro Titular do Colégio Brasileiro de Cirurgiões (TCBC) com Título de Especialista em Cirurgia Geral pela AMB/CBC",
  },
  {
    icon: Globe,
    title: "Afiliações Internacionais",
    desc: "Membro da SBU, AUA e EAU",
  },
  {
    icon: BookOpen,
    title: "Pesquisa & Ensino",
    desc: "Pesquisa clínica por Harvard (PPCR), publicações em congressos nacionais e internacionais, e atuação como editor do UroTrends",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="py-20 lg:py-28 bg-white dark:bg-card" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#B87333]" />
            <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.15em]">
              Sobre o Médico
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl text-[#1C3D5A] dark:text-foreground leading-tight max-w-xl">
            Excelência técnica com cuidado humanizado
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image — real photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-lg overflow-hidden shadow-2xl shadow-[#1C3D5A]/10">
              <img loading="lazy"
                src={ABOUT_IMG}
                alt="Dr. Felipe de Bulhões na I Jornada IDOR de Urologia"
                className="w-full h-auto object-cover object-center aspect-[4/3]" style={{width: '724px', height: '644px'}}
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-[#1C3D5A] text-white rounded-lg p-5 shadow-xl">
              <p className="text-3xl font-bold font-sans">IDOR</p>
              <p className="text-xs text-white/70 font-sans mt-1">Instituto D'Or<br />São Paulo</p>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-base lg:text-lg text-[#1C3D5A] dark:text-foreground/70 leading-relaxed mb-6">
              Sou o Dr. Felipe de Bulhões, médico especialista em Urologia e Cirurgia Geral.
              Acredito que a excelência médica exige duas coisas: domínio técnico absoluto e a
              capacidade de ouvir o paciente de verdade.
            </p>
            <p className="text-base lg:text-lg text-[#1C3D5A] dark:text-foreground/70 leading-relaxed mb-6">
              Na prática clínica, atuo como o médico principal da saúde do homem. Nossa primeira
              consulta é uma investigação completa — avaliamos desde a saúde metabólica e
              distribuição de peso até o rastreio rigoroso da próstata e exames funcionais como
              a urodinâmica. O objetivo não é apenas tratar o que dói hoje, mas otimizar sua
              performance para o futuro.
            </p>
            <p className="text-base lg:text-lg text-[#1C3D5A] dark:text-foreground/70 leading-relaxed mb-8">
              No centro cirúrgico, minha prioridade é a sua segurança e rápida recuperação.
              Com treinamento intensivo em centros de alto volume, utilizo técnicas minimamente
              invasivas — robótica, videolaparoscopia e endourologia — para o tratamento de
              cálculos renais complexos, tumores, hérnias e doenças da próstata.
            </p>

            {/* Thin divider */}
            <div className="h-px bg-[#1C3D5A]/10 mb-8" />

            {/* Credentials grid */}
            <div className="grid sm:grid-cols-2 gap-5">
              {credentials.map((cred, i) => (
                <motion.div
                  key={cred.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex gap-3"
                >
                  <div className="w-9 h-9 rounded-md bg-[#B87333]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <cred.icon className="w-4 h-4 text-[#B87333]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground font-sans mb-1">{cred.title}</h4>
                    <p className="text-xs text-[#1C3D5A] dark:text-foreground/55 font-sans leading-relaxed">{cred.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
