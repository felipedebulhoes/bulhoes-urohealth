/*
 * Design: Dr. Felipe de Bulhões — Identidade Visual
 * Topo Editorial: texto à esquerda sobre marfim, retrato em altura inteira à direita
 * e faixa de credenciais com filetes. Sem cards, sem ícones, sem pílulas.
 */
import { Link } from "wouter";
import { trackCtaClick } from "@/lib/analytics";

const HERO_PORTRAIT = "/manus-storage/felipe-portrait_0e0693e4_be070ac1.webp";

const credentials = [
  { title: "CRM-SP 202291", detail: "RQE 146538 Urologia · RQE 114019 Cirurgia Geral" },
  { title: "TCBC", detail: "Membro Titular do Colégio Brasileiro de Cirurgiões" },
  { title: "SBU · AUA · EAU", detail: "Sociedades de urologia do Brasil, dos Estados Unidos e da Europa" },
  { title: "Instituto D'Or", detail: "Formação em Ensino e Pesquisa, São Paulo" },
];

const patientShortcuts = [
  { label: "Estética íntima", href: "/estetica-intima-masculina", id: "estetica_intima" },
  { label: "Andrologia", href: "/andrologia-performance-masculina", id: "andrologia" },
  { label: "Pedra nos rins", href: "/litotripsia-calculo-renal", id: "calculo_renal" },
  { label: "Próstata", href: "/saude-da-prostata", id: "prostata" },
  { label: "Vasectomia", href: "/vasectomia-sem-bisturi", id: "vasectomia" },
];

interface HeroSectionProps {
  palette?: "current" | "espresso";
}

export default function HeroSection(_props: HeroSectionProps) {
  return (
    <section id="inicio" className="editorial-hero">
      <div className="editorial-hero-grid">
        <div className="editorial-hero-copy hero-rise">
          <p className="editorial-eyebrow">
            <span aria-hidden="true" className="editorial-eyebrow-rule" />
            Urologia · Andrologia · Cirurgia robótica
          </p>

          <h1 className="editorial-hero-name">Dr. Felipe de Bulhões</h1>

          <p className="editorial-hero-statement">
            Urologia conduzida com técnica, tempo e discrição.
          </p>

          <p className="editorial-hero-lead">
            Atendimento particular em São Paulo e Campinas, presencial e por teleconsulta.
          </p>

          <div className="editorial-hero-actions">
            <Link
              href="/agendamento"
              className="editorial-cta"
              onClick={() => trackCtaClick("agendar_consulta", "hero_section")}
            >
              Agendar consulta
            </Link>
            <Link
              href="/sobre"
              className="editorial-link brand-espresso-secondary-cta"
              onClick={() => trackCtaClick("conhecer_medico", "hero_section")}
            >
              Conhecer o médico
            </Link>
          </div>

          <nav aria-label="O que você procura?" className="editorial-shortcuts">
            <span className="editorial-shortcuts-label">Ir direto para</span>
            {patientShortcuts.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => trackCtaClick(`atalho_${item.id}`, "hero_section")}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <figure className="editorial-hero-portrait">
          <img
            src={HERO_PORTRAIT}
            alt="Dr. Felipe de Bulhões - Urologista"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={1440}
            height={1440}
          />
          <figcaption>
            <span>CRM-SP 202291</span>
            <span>RQE 146538 · RQE 114019</span>
          </figcaption>
        </figure>
      </div>

      <ul className="editorial-credentials" aria-label="Credenciais">
        {credentials.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.detail}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
