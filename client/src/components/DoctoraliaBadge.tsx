/*
 * Design: Dr. Felipe de Bulhões — Direção Editorial
 * Avaliações: nota à esquerda, três opiniões públicas em serifa à direita.
 */
import { Star } from "lucide-react";
import { trackDoctoraliaClick } from "@/lib/analytics";

const DOCTORALIA_PROFILE =
  "https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas";

// Avaliações públicas copiadas do perfil na Doctoralia (conferidas em 09/11/2026).
// Use somente textos que existam lá, com as iniciais exibidas pela plataforma.
const reviews = [
  {
    name: "SA · Consulta verificada",
    date: "Setembro 2026",
    rating: 5,
    text: "Consulta perfeita. Eu falei e ele foi atencioso em buscar uma solução. Também muito respeitoso.",
  },
  {
    name: "TS · Consulta verificada",
    date: "Setembro 2026",
    rating: 5,
    text: "Foi um atendimento muito bom, consegui passar minhas dúvidas e fui muito bem atendido.",
  },
  {
    name: "WJM · Consulta verificada",
    date: "Agosto 2026",
    rating: 5,
    text: "Gostaria de elogiar o atendimento profissional, atencioso e humanizado do Dr. Felipe. Demonstrou grande conhecimento, ouviu cuidadosamente minhas necessidades e explicou tudo com clareza e paciência.",
  },
];

export default function DoctoraliaBadge() {
  return (
    <section id="avaliacoes" className="editorial-section editorial-reviews">
      <div className="editorial-wrap editorial-reviews-grid">
        <div className="editorial-reviews-score">
          <p className="editorial-kicker">Reputação</p>
          <h2 className="editorial-display editorial-title">Avaliações na Doctoralia</h2>
          <div className="editorial-score">
            <span className="editorial-score-value">5,0</span>
            <span className="editorial-score-stars" role="img" aria-label="Nota 5 de 5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} aria-hidden="true" />
              ))}
            </span>
          </div>
          <p className="editorial-score-note">35 opiniões verificadas na Doctoralia</p>
          <a
            href={DOCTORALIA_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link"
            onClick={() => trackDoctoraliaClick("doctoralia_badge")}
          >
            Ver perfil completo
          </a>
        </div>

        <ul className="editorial-quotes">
          {reviews.map((review) => (
            <li key={review.name}>
              <blockquote className="editorial-display">“{review.text}”</blockquote>
              <p className="editorial-quote-by">
                {review.name} · {review.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
