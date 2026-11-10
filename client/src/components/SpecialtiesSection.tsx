/*
 * Design: Dr. Felipe de Bulhões — Direção Editorial
 * Especialidades: lista numerada com filetes sobre fundo espresso.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { trackCtaClick } from "@/lib/analytics";
import { ArrowRight } from "lucide-react";

const specialties = [
  {
    title: "Estética Íntima & Botox Peniano",
    desc: "Harmonização genital urológica, botox peniano e escrotal (toxina botulínica para retração em repouso) e correções funcionais.",
    href: "/estetica-intima-masculina",
    cta: "Ver estética íntima",
    trackingId: "estetica_intima",
  },
  {
    title: "Preenchimento Peniano",
    desc: "Ganho de espessura (circunferência) peniana com ácido hialurônico: procedimento ambulatorial com microcânula, sem cortes e reversível.",
    href: "/preenchimento-peniano",
    cta: "Ver preenchimento peniano",
    trackingId: "preenchimento",
  },
  {
    title: "Andrologia & Saúde do Homem",
    desc: "Check-up hormonal, reposição de testosterona (TRT), disfunção erétil, fertilidade e varicocelectomia com microscópio.",
    href: "/andrologia-performance-masculina",
    cta: "Ver andrologia",
    trackingId: "andrologia",
  },
  {
    title: "Cálculos Renais",
    desc: "Tratamento de litíase urinária com litotripsia a laser, ureteroscopia flexível e cirurgia percutânea sem cortes externos.",
    href: "/litotripsia-calculo-renal",
    cta: "Ver tratamento de cálculos",
    trackingId: "calculo_renal",
  },
  {
    title: "Saúde da Próstata",
    desc: "Rastreio, diagnóstico e tratamento de hiperplasia prostática benigna (HPB) e câncer de próstata com técnicas minimamente invasivas.",
    href: "/saude-da-prostata",
    cta: "Ver saúde da próstata",
    trackingId: "prostata",
  },
  {
    title: "Vasectomia & Postectomia",
    desc: "Vasectomia sem bisturi (no-scalpel), postectomia, frenuloplastia e microcirurgias escrotais com rápida recuperação.",
    href: "/vasectomia-sem-bisturi",
    cta: "Ver vasectomia",
    trackingId: "vasectomia",
  },
  {
    title: "Cirurgia Robótica & Laparoscópica",
    desc: "Prostatectomia, nefrectomia parcial e reconstruções urológicas com visão 3D em 10x e rápida recuperação.",
    href: "/cirurgia-robotica-urologia",
    cta: "Ver cirurgia robótica",
    trackingId: "cirurgia_robotica",
  },
  {
    title: "Uro-oncologia",
    desc: "Diagnóstico e tratamento cirúrgico de tumores de próstata, rim, bexiga e testículo seguindo diretrizes internacionais.",
    href: "/uro-oncologia",
    cta: "Ver uro-oncologia",
    trackingId: "uro_oncologia",
  },
  {
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
    <section id="especialidades" className="brand-dark-surface editorial-section editorial-section--dark" ref={ref}>
      <div className="editorial-wrap">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="editorial-head"
        >
          <p className="editorial-kicker">Especialidades</p>
          <h2 className="editorial-display editorial-title">Áreas de atuação</h2>
          <p className="editorial-intro">
            Urologia e cirurgia geral, com técnicas minimamente invasivas e protocolos
            internacionais atualizados.
          </p>
        </motion.div>

        <ol className="editorial-rows">
          {specialties.map((spec, i) => (
            <li key={spec.title}>
              <Link
                href={spec.href}
                aria-label={spec.cta}
                onClick={() => trackCtaClick(`especialidade_${spec.trackingId}`, "specialties_section")}
                className="editorial-row"
              >
                <span className="editorial-row-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="editorial-row-title">{spec.title}</h3>
                <p className="editorial-row-desc">{spec.desc}</p>
                <ArrowRight className="editorial-row-arrow" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
