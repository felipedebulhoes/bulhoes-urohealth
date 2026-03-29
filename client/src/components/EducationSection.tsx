/*
 * Design: Clinical Precision — Swiss Medical Design
 * Education: Timeline-style academic credentials
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    period: "2023 – 2025",
    title: "Residência em Urologia",
    institution: "Instituto D'Or de Ensino e Pesquisa (IDOR)",
    location: "São Paulo, SP",
    highlight: true,
  },
  {
    period: "2024",
    title: "Pesquisa Clínica (PPCR)",
    institution: "Harvard T.H. Chan School of Public Health",
    location: "EUA (Online)",
    highlight: false,
  },
  {
    period: "2020 – 2023",
    title: "Residência em Cirurgia Geral",
    institution: "Faculdade de Medicina do ABC (FMABC)",
    location: "Santo André, SP",
    highlight: false,
  },
  {
    period: "2011 – 2017",
    title: "Graduação em Medicina",
    institution: "Universidade Federal Fluminense (UFF)",
    location: "Niterói, RJ",
    highlight: false,
  },
];

const certifications = [
  "Título de Especialista em Cirurgia Geral — AMB/CBC",
  "Membro Titular do Colégio Brasileiro de Cirurgiões (TCBC)",
  "Membro da Sociedade Brasileira de Urologia (SBU)",
  "Membro da American Urological Association (AUA)",
  "Membro da European Association of Urology (EAU)",
  "ATLS — Advanced Trauma Life Support",
  "ACLS — Advanced Cardiovascular Life Support",
];

export default function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFB]" ref={ref}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#0D9488]" />
                <span className="text-[#0D9488] text-sm font-semibold uppercase tracking-[0.15em]">
                  Formação
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl text-[#0A2540] leading-tight">
                Trajetória Acadêmica
              </h2>
            </motion.div>

            <div className="space-y-0">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  className="relative pl-8 pb-8 last:pb-0"
                >
                  {/* Timeline line */}
                  {i < timeline.length - 1 && (
                    <div className="absolute left-[7px] top-3 bottom-0 w-px bg-[#0A2540]/10" />
                  )}
                  {/* Dot */}
                  <div
                    className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${
                      item.highlight
                        ? "bg-[#0D9488] border-[#0D9488]"
                        : "bg-white border-[#0A2540]/20"
                    }`}
                  />

                  <span className="text-xs font-semibold text-[#0D9488] font-sans uppercase tracking-wider">
                    {item.period}
                  </span>
                  <h3 className="text-base font-semibold text-[#0A2540] font-sans mt-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#0A2540]/60 font-sans mt-0.5">
                    {item.institution}
                  </p>
                  <p className="text-xs text-[#0A2540]/40 font-sans">
                    {item.location}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Certifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#0D9488]" />
                <span className="text-[#0D9488] text-sm font-semibold uppercase tracking-[0.15em]">
                  Títulos & Certificações
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl text-[#0A2540] leading-tight">
                Credenciais
              </h2>
            </motion.div>

            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                  className="flex items-start gap-3 bg-white rounded-lg p-4 border border-[#0A2540]/6 shadow-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-[#0D9488] mt-1.5 shrink-0" />
                  <span className="text-sm font-medium text-[#0A2540]/80 font-sans">
                    {cert}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
