/*
 * Design: Dr. Felipe de Bulhões — Direção Editorial
 * Depoimentos: uma opinião em destaque e as demais em colunas com filetes.
 * Somente opiniões reais e verificadas do perfil na Doctoralia.
 */
import { Link } from "wouter";
import { trackCtaClick, trackDoctoraliaClick } from "@/lib/analytics";

const DOCTORALIA_OPINIONS =
  "https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas#opinions";

interface Testimonial {
  name: string;
  initials: string;
  text: string;
  type: string;
  location: string;
  date: string;
  featured?: boolean;
  isTelemedicine?: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: "Natanael Nicolini",
    initials: "NN",
    text: "Melhor atendimento medico que recebi até hoje. Otima qualidade de atendimento durante a consulta e no pós consulta, providenciou um nível extremamente completo de informações além de ter buscado o melhor tratamento para o meu caso. Recomendo!",
    type: "Primeira consulta Urologia",
    location: "CEMED — Rede D'Or São Luiz Campinas",
    date: "Junho 2026",
    featured: true,
  },
  {
    name: "Luis M",
    initials: "LM",
    text: "Mostrou-se bom profissional, atento às questões expostas. Detalhista. Coloca sua avaliação de forma clara. Procura saber se ficou clara a informação. Recomendo",
    type: "Primeira consulta Urologia",
    location: "CEMED — Rede D'Or São Luiz Campinas",
    date: "Maio 2026",
    featured: true,
  },
  {
    name: "Jorge L L Francato",
    initials: "JF",
    text: "Médico muito atencioso, respondendo todas perguntas com clareza e utilizando equipamentos modernos.",
    type: "Primeira consulta Urologia",
    location: "Campinas Day Hospital",
    date: "Abril 2026",
  },
  {
    name: "R.G.Z.O",
    initials: "RG",
    text: "Dr Felipe muito atencioso, explica e tira as dúvidas com amplo conhecimento técnico. Recomendo.",
    type: "Retorno de consultas Urologia",
    location: "CEMED — Rede D'Or São Luiz Campinas",
    date: "Julho 2026",
  },
  {
    name: "Carlos",
    initials: "CA",
    text: "Ótima experiência, primeira consulta com boas expectativas.",
    type: "Primeira consulta Urologia",
    location: "Campinas Day Hospital",
    date: "Julho 2026",
  },
  {
    name: "Paulo Moreira da Costa",
    initials: "PM",
    text: "Bom profissional. Ótimo atendimento bem atencioso",
    type: "Primeira consulta Urologia",
    location: "Campinas Day Hospital",
    date: "Julho 2026",
  },
  {
    name: "Vanderlei Festi",
    initials: "VF",
    text: "Ótima tratativa e explanação sobre o assunto. Mostrou o conhecimento e experiência.",
    type: "Primeira consulta Urologia",
    location: "CEMED — Rede D'Or São Luiz Campinas",
    date: "Maio 2026",
  },
  {
    name: "Radija",
    initials: "RA",
    text: "Ótimo profissional, super atencioso e prestativo. Tirou todas as minhas dúvidas com muita clareza. Recomendo!",
    type: "Primeira consulta Urologia",
    location: "Campinas Day Hospital",
    date: "Maio 2026",
  },
  {
    name: "Douglas Razaboni",
    initials: "DR",
    text: "Excelente. Muito satisfeito pela atenção e correta análise.",
    type: "Primeira consulta Urologia",
    location: "CEMED — Rede D'Or São Luiz Campinas",
    date: "Maio 2026",
  },
  {
    name: "JCP",
    initials: "JC",
    text: "Profissional competente com excelente conhecimento",
    type: "Primeira consulta Urologia",
    location: "CEMED — Rede D'Or São Luiz Campinas",
    date: "Maio 2026",
  },
];

const MONTH_NUMBERS: Record<string, string> = {
  Janeiro: "01",
  Fevereiro: "02",
  Março: "03",
  Abril: "04",
  Maio: "05",
  Junho: "06",
  Julho: "07",
  Agosto: "08",
  Setembro: "09",
  Outubro: "10",
  Novembro: "11",
  Dezembro: "12",
};

/** "Junho 2026" → "2026-06" */
function toIsoMonth(date: string): string {
  const [month, year] = date.split(" ");
  const number = MONTH_NUMBERS[month];
  return number && year ? `${year}-${number}` : date;
}

function ReviewSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Dr. Felipe de Bulhões Ojeda",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/dr-felipe-hero-portrait_a1e2b3c4.webp",
    url: "https://felipebulhoes.com",
    telephone: "+5511981124455",
    priceRange: "$$",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Av. Paulista, 1048, 18° andar",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        postalCode: "01310-100",
        addressCountry: "BR",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Av. Rebouças, 2636",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        addressCountry: "BR",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Av. Benjamin Constant, 1991",
        addressLocality: "Campinas",
        addressRegion: "SP",
        postalCode: "13025-005",
        addressCountry: "BR",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Av. Andrade Neves, 863, 4° andar",
        addressLocality: "Campinas",
        addressRegion: "SP",
        addressCountry: "BR",
      },
    ],
    medicalSpecialty: "Urologic",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "35",
      reviewCount: "35",
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      datePublished: toIsoMonth(t.date),
      reviewBody: t.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function TestimonialsSection() {
  const [lead, ...others] = testimonials;

  return (
    <section id="depoimentos" className="editorial-section editorial-voices">
      <ReviewSchema />
      <div className="editorial-wrap">
        <div className="editorial-head">
          <p className="editorial-kicker">Depoimentos</p>
          <h2 className="editorial-display editorial-title">O que dizem os pacientes</h2>
          <p className="editorial-intro">
            Todas as opiniões são verificadas pela Doctoralia e representam experiências reais de
            pacientes atendidos.
          </p>
        </div>

        <figure className="editorial-voice-lead">
          <blockquote className="editorial-display">“{lead.text}”</blockquote>
          <figcaption className="editorial-quote-by">
            {lead.name} · {lead.type} · {lead.date}
          </figcaption>
        </figure>

        <ul className="editorial-voice-grid">
          {others.map((t) => (
            <li key={t.name}>
              <blockquote className="editorial-display">“{t.text}”</blockquote>
              <p className="editorial-quote-by">
                {t.name} · {t.date}
              </p>
            </li>
          ))}
        </ul>

        <div className="editorial-hero-actions editorial-voice-actions">
          <Link
            href="/agendamento"
            className="editorial-cta"
            onClick={() => trackCtaClick("agendar_consulta", "testimonials_section")}
          >
            Agendar consulta
          </Link>
          <a
            href={DOCTORALIA_OPINIONS}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link"
            onClick={() => trackDoctoraliaClick("testimonials_section")}
          >
            Ver todas as opiniões na Doctoralia
          </a>
        </div>

        <p className="editorial-voice-note">
          Opiniões verificadas pela Doctoralia — plataforma independente de avaliação médica
        </p>
      </div>
    </section>
  );
}
