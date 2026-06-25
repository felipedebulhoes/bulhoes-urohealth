/*
 * Design: Clinical Precision — Swiss Medical Design
 * Insurance: Grid of accepted health insurance plans at Campinas Day Hospital
 * Clean logo-style grid with operadora names and badges
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Building2, Monitor, Info, CreditCard } from "lucide-react";

const mainInsurers = [
  { name: "Allianz", category: "premium", note: "" },
  { name: "Amil", category: "premium", note: "" },
  { name: "Assefaz", category: "standard", note: "" },
  { name: "Bradesco", category: "premium", note: "" },
  { name: "Cassi", category: "standard", note: "" },
  { name: "Gama", category: "standard", note: "" },
  { name: "Go Care", category: "standard", note: "Cirurgias" },
  { name: "Holambra", category: "standard", note: "" },
  { name: "Medservice", category: "standard", note: "" },
  { name: "Porto Seguro", category: "premium", note: "" },
  { name: "Skill / Omint", category: "premium", note: "" },
  { name: "SulAmérica", category: "premium", note: "Cirurgias" },
  { name: "Unimed", category: "premium", note: "Cooperados" },
];

const highlights = [
  {
    icon: Building2,
    title: "São Luiz Campinas (Rede D'Or)",
    desc: "Convênios aceitos para consultas e procedimentos cirúrgicos",
  },
  {
    icon: Monitor,
    title: "Teleconsulta",
    desc: "Atendimento online disponível para todo o Brasil",
  },
  {
    icon: CreditCard,
    title: "Particular",
    desc: "Clinovi Paulista e Clinovi Moema — pagamento via PIX, cartão de crédito ou débito no local",
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
              <div className="h-px w-10 bg-[#B87333]" />
              <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.15em]">
                Convênios Aceitos
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl text-[#1C3D5A] dark:text-foreground leading-tight">
              Planos de Saúde
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-end"
          >
            <p className="text-base text-[#1C3D5A] dark:text-foreground/60 leading-relaxed">
              Atendo por diversos convênios no{" "}
              <strong className="text-[#1C3D5A] dark:text-foreground/80">Centro Médico São Luiz Campinas (Rede D'Or)</strong>.
              Nas unidades <strong className="text-[#1C3D5A] dark:text-foreground/80">Clinovi</strong> (Paulista, Moema, Pinheiros e SBC) e no{" "}
              <strong className="text-[#1C3D5A] dark:text-foreground/80">Campinas Day Hospital</strong>, o atendimento é exclusivamente particular,
              com pagamento via PIX, cartão de crédito ou débito no local antes da consulta.
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
              className="bg-white dark:bg-card rounded-lg border border-[#1C3D5A]/6 p-5 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-md bg-[#B87333]/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-[#B87333]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground mb-1">{item.title}</h4>
                <p className="text-xs text-[#1C3D5A] dark:text-foreground/50 leading-relaxed">{item.desc}</p>
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
                className="group bg-white dark:bg-card rounded-lg border border-[#1C3D5A]/6 hover:border-[#B87333]/30 hover:shadow-md hover:shadow-[#B87333]/5 transition-all duration-300 p-4 flex items-center gap-3"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  insurer.category === "premium"
                    ? "bg-[#B87333]/10"
                    : "bg-[#1C3D5A]/5"
                }`}>
                  <ShieldCheck className={`w-4 h-4 ${
                    insurer.category === "premium"
                      ? "text-[#B87333]"
                      : "text-[#1C3D5A] dark:text-foreground/40"
                  }`} />
                </div>
                <div>
                  <span className="text-sm font-medium text-[#1C3D5A] dark:text-foreground/80 group-hover:text-[#1C3D5A] dark:text-foreground transition-colors">
                    {insurer.name}
                  </span>
                  {insurer.note && (
                    <span className="block text-[10px] text-[#B87333]/70 mt-0.5">{insurer.note}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex items-start gap-2 bg-[#B87333]/5 rounded-lg p-4"
        >
          <Info className="w-4 h-4 text-[#B87333] mt-0.5 shrink-0" />
          <p className="text-xs text-[#1C3D5A] dark:text-foreground/50 leading-relaxed">
            A cobertura pode variar conforme o plano contratado. Alguns convênios cobrem apenas procedimentos cirúrgicos.
            Recomendamos confirmar a cobertura diretamente com sua operadora ou entrar em contato conosco antes de agendar.
            Convênios aceitos exclusivamente no Centro Médico São Luiz Campinas (Rede D'Or).
          </p>
        </motion.div>
      </div>
    </section>
  );
}
