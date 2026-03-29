/*
 * Design: Clinical Precision — Swiss Medical Design
 * Education: Timeline-style academic credentials with real congress photo
 * Uses real Instagram photo from UroOnco congress (group)
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Real photo — Dr. Felipe at UroOnco congress with colleagues
const CONGRESS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/uroonco-congress_907ca9a3.jpeg";

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
  "Membro da American Urological Association (AUA) — International Resident in Training",
  "Membro da European Association of Urology (EAU) — Junior International Member",
  "ATLS — Advanced Trauma Life Support",
  "ACLS — Advanced Cardiovascular Life Support",
];

export default function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFB]" ref={ref}>
      <div className="container">
        {/* Top: Section header with congress photo */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#0D9488]" />
              <span className="text-[#0D9488] text-sm font-semibold uppercase tracking-[0.15em]">
                Formação
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl text-[#0A2540] leading-tight mb-4">
              Trajetória Acadêmica
            </h2>
            <p className="text-base text-[#0A2540]/60 leading-relaxed max-w-lg">
              Uma formação sólida em centros de referência, com participação ativa em congressos
              nacionais e internacionais, pesquisa clínica e educação continuada.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 relative"
          >
            <div className="rounded-xl overflow-hidden shadow-xl shadow-[#0A2540]/8">
              <img
                src={CONGRESS_IMG}
                alt="Dr. Felipe com colegas no Congresso UroOnco 2025"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
            <div className="absolute -bottom-3 left-4 bg-[#0A2540] text-white rounded-lg px-4 py-2 shadow-lg">
              <p className="text-xs font-semibold">UroOnco 2025 — São Paulo</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom: Timeline + Certifications */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Timeline */}
          <div>
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
              className="mb-6"
            >
              <h3 className="text-xl font-semibold text-[#0A2540]">
                Títulos & Certificações
              </h3>
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
