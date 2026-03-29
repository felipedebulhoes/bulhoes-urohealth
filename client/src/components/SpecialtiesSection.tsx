/*
 * Design: Clinical Precision — Swiss Medical Design
 * Specialties: Cards with left border accent, clean grid
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Activity,
  Heart,
  Zap,
  Shield,
  Microscope,
  Syringe,
  Scan,
  Pill,
} from "lucide-react";

const SERVICES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/services-bg-exzYrPhm6JKJP7hWyhfgCa.webp";

const specialties = [
  {
    icon: Shield,
    title: "Saúde da Próstata",
    desc: "Rastreio, diagnóstico e tratamento de hiperplasia prostática benigna (HPB) e câncer de próstata com técnicas minimamente invasivas.",
  },
  {
    icon: Zap,
    title: "Cálculos Renais",
    desc: "Tratamento de litíase urinária com litotripsia, ureteroscopia flexível e cirurgia percutânea. Abordagem minimamente invasiva.",
  },
  {
    icon: Microscope,
    title: "Cirurgia Robótica & Laparoscópica",
    desc: "Prostatectomia, nefrectomia e outras cirurgias urológicas com tecnologia robótica e videolaparoscópica para menor tempo de recuperação.",
  },
  {
    icon: Heart,
    title: "Saúde do Homem",
    desc: "Check-up masculino completo com bioimpedância, avaliação hormonal, reposição de testosterona (TRH) e acompanhamento de performance.",
  },
  {
    icon: Activity,
    title: "Urodinâmica",
    desc: "Exame funcional do trato urinário inferior para diagnóstico preciso de incontinência, bexiga hiperativa e obstrução prostática.",
  },
  {
    icon: Syringe,
    title: "Vasectomia & Postectomia",
    desc: "Procedimentos ambulatoriais realizados com refinamento técnico para garantir mínimo desconforto e rápida recuperação.",
  },
  {
    icon: Scan,
    title: "Uro-oncologia",
    desc: "Diagnóstico e tratamento cirúrgico de tumores renais, vesicais, testiculares e de próstata seguindo protocolos internacionais.",
  },
  {
    icon: Pill,
    title: "Andrologia & ISTs",
    desc: "Tratamento de disfunção erétil, curvatura peniana, infertilidade masculina e infecções sexualmente transmissíveis.",
  },
];

export default function SpecialtiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="especialidades" className="relative py-20 lg:py-28 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src={SERVICES_BG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0A2540]/95" />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#0D9488]" />
            <span className="text-[#5EEAD4] text-sm font-semibold uppercase tracking-[0.15em]">
              Especialidades
            </span>
            <div className="h-px w-10 bg-[#0D9488]" />
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {specialties.map((spec, i) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-all duration-300 hover:border-[#0D9488]/30"
            >
              <div className="w-10 h-10 rounded-md bg-[#0D9488]/15 flex items-center justify-center mb-4 group-hover:bg-[#0D9488]/25 transition-colors">
                <spec.icon className="w-5 h-5 text-[#5EEAD4]" />
              </div>
              <h3 className="text-base font-semibold text-white font-sans mb-2">
                {spec.title}
              </h3>
              <p className="text-sm text-white/50 font-sans leading-relaxed">
                {spec.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
