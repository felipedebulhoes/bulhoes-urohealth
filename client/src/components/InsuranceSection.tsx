/*
 * Design: Clinical Precision — Swiss Medical Design
 * Insurance: Grid of accepted health insurance plans at Campinas Day Hospital
 * Clean logo-style grid with operadora names and badges
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Building2, Monitor, Info } from "lucide-react";

const mainInsurers = [
  { name: "Allianz Saúde", category: "premium" },
  { name: "Amil", category: "premium" },
  { name: "Ampla Saúde", category: "standard" },
  { name: "Bradesco Saúde", category: "premium" },
  { name: "NotreDame Intermédica", category: "premium" },
  { name: "Mediservice", category: "standard" },
  { name: "Omint", category: "premium" },
  { name: "Porto Med", category: "standard" },
  { name: "Porto Seguro Saúde", category: "premium" },
  { name: "SulAmérica Saúde", category: "premium" },
  { name: "Unimed", category: "premium" },
  { name: "New Saúde Leader", category: "standard" },
];

const highlights = [
  {
    icon: Building2,
    title: "Campinas Day Hospital",
    desc: "Convênios aceitos para consultas e procedimentos cirúrgicos",
  },
  {
    icon: Monitor,
    title: "Teleconsulta",
    desc: "Atendimento online disponível para todo o Brasil",
  },
  {
    icon: ShieldCheck,
    title: "Particular",
    desc: "Clinovi Paulista e Clinovi Moema — atendimento particular",
  },
];

export default function InsuranceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="convenios" className="py-20 lg:py-28 bg-[#F8FAFB]" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#0D9488]" />
              <span className="text-[#0D9488] text-sm font-semibold uppercase tracking-[0.15em]">
                Convênios Aceitos
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl text-[#0A2540] leading-tight">
              Planos de Saúde
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-end"
          >
            <p className="text-base text-[#0A2540]/60 leading-relaxed">
              Atendo por diversos convênios no <strong className="text-[#0A2540]/80">Campinas Day Hospital</strong>.
              Nas unidades <strong className="text-[#0A2540]/80">Clinovi Paulista</strong> e{" "}
              <strong className="text-[#0A2540]/80">Clinovi Moema</strong>, o atendimento é exclusivamente particular.
              Teleconsulta disponível para todo o Brasil.
            </p>
          </motion.div>
        </div>

        {/* Highlights row */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              className="bg-white rounded-lg border border-[#0A2540]/6 p-5 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-md bg-[#0D9488]/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-[#0D9488]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#0A2540] mb-1">{item.title}</h4>
                <p className="text-xs text-[#0A2540]/50 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Insurance grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {mainInsurers.map((insurer, i) => (
              <motion.div
                key={insurer.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.04 }}
                className="group bg-white rounded-lg border border-[#0A2540]/6 hover:border-[#0D9488]/30 hover:shadow-md hover:shadow-[#0D9488]/5 transition-all duration-300 p-4 flex items-center gap-3"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  insurer.category === "premium"
                    ? "bg-[#0D9488]/10"
                    : "bg-[#0A2540]/5"
                }`}>
                  <ShieldCheck className={`w-4 h-4 ${
                    insurer.category === "premium"
                      ? "text-[#0D9488]"
                      : "text-[#0A2540]/40"
                  }`} />
                </div>
                <span className="text-sm font-medium text-[#0A2540]/80 group-hover:text-[#0A2540] transition-colors">
                  {insurer.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex items-start gap-2 bg-[#0D9488]/5 rounded-lg p-4"
        >
          <Info className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
          <p className="text-xs text-[#0A2540]/50 leading-relaxed">
            A cobertura pode variar conforme o plano contratado. Recomendamos confirmar a cobertura diretamente
            com sua operadora ou entrar em contato conosco antes de agendar. Dados de credenciamento baseados
            em registros da ANS (atualizado em fev/2026).
          </p>
        </motion.div>
      </div>
    </section>
  );
}
