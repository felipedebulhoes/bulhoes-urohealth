/*
 * ResearchSection Component
 * Design: Clinical Precision — Swiss Medical Design
 * Research: Scientific publications, congress presentations, and academic contributions
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Award, Globe } from "lucide-react";

const publications = [
  {
    title: "Profile of Brazilian Men Seeking Online Help for Ejaculatory Disorders",
    authors: "Lipay MA, Secches LV, Saleme BP, Krueger WB, Sanglard BS, Caldano FG, Ojeda FB, Avilez ND, Mazzucato EL, Barroso Jr. U.",
    journal: "The Journal of Urology",
    year: 2026,
    detail: "215(5S Supl.):e35 (AUA Annual Meeting 2026)",
  },
];

const bookChapters = [
  {
    title: "Hiperplasia Prostática Benigna: Etiologia, Fisiopatologia, Epidemiologia e História Natural",
    chapter: "Cap. 69",
    book: "Tratado de Urologia — SBU",
    publisher: "Ed. DiLivros",
    year: 2025,
  },
];

const congressPresentations = [
  {
    title: "Bainhas de Aspiração Ureteral na Ureterorrenolitotripsia Flexível: Revisão Sistemática",
    type: "Apresentação Oral",
    congress: "40º Congresso Brasileiro de Urologia (CBU 2025)",
    year: 2025,
  },
  {
    title: "Litíase Vesical Pós-Prostatectomia Radical: Série de Casos e Revisão Sistemática",
    type: "Pôster",
    congress: "CBU 2025",
    year: 2025,
  },
  {
    title: "Hemangioma testicular em paciente com síndrome de Down: relato de caso e revisão sistemática",
    type: "Pôster",
    congress: "CBU 2025",
    year: 2025,
  },
];

const events = [
  "17º Congresso Internacional de Uro-oncologia (2026)",
  "40º Congresso Brasileiro de Urologia — CBU 2025",
  "Congressos e Jornadas Paulistas de Urologia (2022, 2024, 2025)",
];

export default function ResearchSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-card" ref={ref}>
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
              Produção Científica
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl text-[#1C3D5A] dark:text-foreground leading-tight mb-4">
            Pesquisa & Ensino
          </h2>
          <p className="text-base text-[#1C3D5A] dark:text-foreground/60 leading-relaxed max-w-2xl">
            Contribuições científicas em periódicos internacionais, capítulos de livros, apresentações em congressos e participação ativa em eventos acadêmicos.
          </p>
        </motion.div>

        {/* Publications Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Publications in Journals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#B87333]/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#B87333]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1C3D5A] dark:text-foreground">
                Periódicos
              </h3>
            </div>
            <div className="space-y-4">
              {publications.map((pub, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[#F8FAFB] dark:bg-background/50 border border-border/50">
                  <p className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground mb-2">
                    {pub.title}
                  </p>
                  <p className="text-xs text-[#1C3D5A]/60 dark:text-foreground/60 mb-2">
                    {pub.authors}
                  </p>
                  <p className="text-xs text-[#B87333] font-medium">
                    {pub.journal} ({pub.year}) — {pub.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Book Chapters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#B87333]/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#B87333]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1C3D5A] dark:text-foreground">
                Capítulos de Livros
              </h3>
            </div>
            <div className="space-y-4">
              {bookChapters.map((chapter, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[#F8FAFB] dark:bg-background/50 border border-border/50">
                  <p className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground mb-2">
                    {chapter.title}
                  </p>
                  <p className="text-xs text-[#1C3D5A]/60 dark:text-foreground/60 mb-2">
                    {chapter.chapter} — {chapter.book}
                  </p>
                  <p className="text-xs text-[#B87333] font-medium">
                    {chapter.publisher}, {chapter.year}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Congress Presentations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#B87333]/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#B87333]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1C3D5A] dark:text-foreground">
                Congressos
              </h3>
            </div>
            <div className="space-y-4">
              {congressPresentations.map((pres, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[#F8FAFB] dark:bg-background/50 border border-border/50">
                  <p className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground mb-2">
                    {pres.title}
                  </p>
                  <p className="text-xs text-[#1C3D5A]/60 dark:text-foreground/60 mb-2">
                    {pres.type} — {pres.congress}
                  </p>
                  <p className="text-xs text-[#B87333] font-medium">
                    {pres.year}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-8 rounded-lg bg-gradient-to-r from-[#1C3D5A]/5 to-[#B87333]/5 border border-[#B87333]/20"
        >
          <h3 className="text-lg font-semibold text-[#1C3D5A] dark:text-foreground mb-4">
            Participação em Eventos
          </h3>
          <ul className="space-y-3">
            {events.map((event, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#B87333] mt-2 flex-shrink-0" />
                <span className="text-sm text-[#1C3D5A] dark:text-foreground/80">
                  {event}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
