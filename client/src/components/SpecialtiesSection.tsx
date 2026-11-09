/*
 * Design: Clinical Precision — Swiss Medical Design
 * Specialties: Cards with left border accent, clean grid
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { trackCtaClick } from "@/lib/analytics";
import {
  Activity,
  Heart,
  Zap,
  Shield,
  Microscope,
  Syringe,
  Scan,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";

const specialties = [
  {
    icon: Sparkles,
    iconColor: "#D5B18D",
    title: "Estética Íntima & Botox Peniano",
    desc: "Harmonização genital urológica, botox peniano e escrotal (toxina botulínica para retração em repouso) e correções funcionais.",
    href: "/estetica-intima-masculina",
    cta: "Ver estética íntima",
    trackingId: "estetica_intima",
  },
  {
    icon: Layers,
    iconColor: "#D9C58A",
    title: "Preenchimento Peniano",
    desc: "Ganho de espessura (circunferência) peniana com ácido hialurônico: procedimento ambulatorial com microcânula, sem cortes e reversível.",
    href: "/preenchimento-peniano",
    cta: "Ver preenchimento peniano",
    trackingId: "preenchimento",
  },
  {
    icon: Heart,
    iconColor: "#D8A5A5",
    title: "Andrologia & Saúde do Homem",
    desc: "Check-up hormonal, reposição de testosterona (TRT), disfunção erétil, fertilidade e varicocelectomia com microscópio.",
    href: "/andrologia-performance-masculina",
    cta: "Ver andrologia",
    trackingId: "andrologia",
  },
  {
    icon: Zap,
    iconColor: "#E1B58A",
    title: "Cálculos Renais",
    desc: "Tratamento de litíase urinária com litotripsia a laser, ureteroscopia flexível e cirurgia percutânea sem cortes externos.",
    href: "/litotripsia-calculo-renal",
    cta: "Ver tratamento de cálculos",
    trackingId: "calculo_renal",
  },
  {
    icon: Shield,
    iconColor: "#D9C58A",
    title: "Saúde da Próstata",
    desc: "Rastreio, diagnóstico e tratamento de hiperplasia prostática benigna (HPB) e câncer de próstata com técnicas minimamente invasivas.",
    href: "/saude-da-prostata",
    cta: "Ver saúde da próstata",
    trackingId: "prostata",
  },
  {
    icon: Syringe,
    iconColor: "#C7A9C8",
    title: "Vasectomia & Postectomia",
    desc: "Vasectomia sem bisturi (no-scalpel), postectomia, frenuloplastia e microcirurgias escrotais com rápida recuperação.",
    href: "/vasectomia-sem-bisturi",
    cta: "Ver vasectomia",
    trackingId: "vasectomia",
  },
  {
    icon: Microscope,
    iconColor: "#C9B6A3",
    title: "Cirurgia Robótica & Laparoscópica",
    desc: "Prostatectomia, nefrectomia parcial e reconstruções urológicas com visão 3D em 10x e rápida recuperação.",
    href: "/cirurgia-robotica-urologia",
    cta: "Ver cirurgia robótica",
    trackingId: "cirurgia_robotica",
  },
  {
    icon: Scan,
    iconColor: "#AFC1D0",
    title: "Uro-oncologia",
    desc: "Diagnóstico e tratamento cirúrgico de tumores de próstata, rim, bexiga e testículo seguindo diretrizes internacionais.",
    href: "/uro-oncologia",
    cta: "Ver uro-oncologia",
    trackingId: "uro_oncologia",
  },
  {
    icon: Activity,
    iconColor: "#B7C0A1",
    title: "Urodinâmica",
    desc: "Exame funcional do trato urinário inferior para diagnóstico preciso de incontinência, bexiga hiperativa e obstrução prostática.",
    href: "/avaliacao-urodinamica",
    cta: "Ver urodinâmica",
    trackingId: "urodinamica",
  },
];

export default function SpecialtiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="especialidades" className="brand-dark-surface relative py-20 lg:py-28 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-[#1C3D5A]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#B87333]" />
            <span className="text-[#D4884A] text-sm font-semibold uppercase tracking-[0.15em]">
              Especialidades
            </span>
            <div className="h-px w-10 bg-[#B87333]" />
          </div>
          <h2 className="text-3xl lg:text-4xl text-white leading-tight">
            Áreas de Atuação
          </h2>
          <p className="text-white/50 font-sans mt-4 max-w-2xl mx-auto text-base">
            Atendimento completo em urologia e cirurgia geral, com foco em técnicas
            minimamente invasivas e protocolos internacionais atualizados.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {specialties.map((spec, i) => (
            <Link
              key={spec.title}
              href={spec.href}
              onClick={() => trackCtaClick(`especialidade_${spec.trackingId}`, "specialties_section")}
              className="block h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                className="group specialty-card-hover bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-5 hover:bg-white/10 hover:border-[#B87333]/30 h-full flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-md bg-[#B87333]/15 flex items-center justify-center mb-4 group-hover:bg-[#B87333]/25 transition-colors">
                    <spec.icon className="w-5 h-5" style={{ color: spec.iconColor }} />
                  </div>
                  <h3 className="text-base font-semibold text-white font-sans mb-2 group-hover:text-[#D4884A] transition-colors">
                    {spec.title}
                  </h3>
                  <p className="text-sm text-white/50 font-sans leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-medium text-[#D9C58A] group-hover:text-white transition-colors">
                  <span>{spec.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
