/*
 * Design: Clinical Precision — Swiss Medical Design
 * Education: Timeline-style academic credentials with real congress photo
 * Uses real Instagram photo from UroOnco congress (group)
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Real photo — Dr. Felipe at JPU 2025 congress (solo, full body, great quality)
const CONGRESS_IMG = "/manus-storage/jpu-congress_61ecfbf9_f41d816f.webp";

const timeline = [
  {
    period: "2023 – 2026",
    title: "Urologia",
    institution: "Instituto D'Or de Ensino e Pesquisa (IDOR)",
    location: "São Paulo, SP",
    highlight: true,
  },
  {
    period: "2021",
    title: "Pesquisa Clínica (PPCR)",
    institution: "Harvard T.H. Chan School of Public Health",
    location: "EUA (Online)",
    highlight: false,
  },
  {
    period: "2019 – 2021",
    title: "Cirurgia Geral",
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
  "Membro Internacional da American Urological Association (AUA)",
  "Membro Internacional da European Association of Urology (EAU)",
  "ATLS — Advanced Trauma Life Support (Atualizado)",
  "ACLS/SAVC — Advanced Cardiovascular Life Support (Atualizado)",
  "Cirurgia Robótica — Programa Pré-Clínico IDOR/Rede D'Or (2026)",
  "Ultrassonografia em Urologia — Cetrus Sanar/SBUS (2026, 40h)",
  "Doppler Peniano com Fármaco-Indução — Cetrus Sanar (2026, 20h)",
  "Hands-On Biópsia de Próstata guiada por Ultrassonografia (2024)",
  "Pesquisa Clínica (PPCR) — Harvard T.H. Chan School of Public Health (2021)",
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
              <div className="h-px w-10 bg-[#B87333]" />
              <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.15em]">
                Formação
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl text-[#1C3D5A] dark:text-foreground leading-tight mb-4">
              Trajetória Acadêmica
            </h2>
            <p className="text-base text-[#1C3D5A] dark:text-foreground/60 leading-relaxed max-w-lg">
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
            <div className="rounded-xl overflow-hidden shadow-xl shadow-[#1C3D5A]/8">
              <img loading="lazy"
                src={CONGRESS_IMG}
                alt="Dr. Felipe no Congresso JPU 2025"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
            <div className="absolute -bottom-3 left-4 bg-[#1C3D5A] text-white rounded-lg px-4 py-2 shadow-lg">
              <p className="text-xs font-semibold">JPU 2025 — Congresso de Urologia</p>
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
                    <div className="absolute left-[7px] top-3 bottom-0 w-px bg-[#1C3D5A]/10" />
                  )}
                  {/* Dot */}
                  <div
                    className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${
                      item.highlight
                        ? "bg-[#B87333] border-[#B87333]"
                        : "bg-white border-[#1C3D5A]/20"
                    }`}
                  />

                  <span className="text-xs font-semibold text-[#B87333] font-sans uppercase tracking-wider">
                    {item.period}
                  </span>
                  <h3 className="text-base font-semibold text-[#1C3D5A] dark:text-foreground font-sans mt-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#1C3D5A] dark:text-foreground/60 font-sans mt-0.5">
                    {item.institution}
                  </p>
                  <p className="text-xs text-[#1C3D5A] dark:text-foreground/40 font-sans">
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
              <h3 className="text-xl font-semibold text-[#1C3D5A] dark:text-foreground">
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
                  className="flex items-start gap-3 bg-white dark:bg-card rounded-lg p-4 border border-[#1C3D5A]/6 shadow-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-[#B87333] mt-1.5 shrink-0" />
                  <span className="text-sm font-medium text-[#1C3D5A] dark:text-foreground/80 font-sans">
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
