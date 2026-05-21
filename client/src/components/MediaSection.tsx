/* MediaSection.tsx — Seção Na Mídia / Congressos
 * Design: Clinical Precision / Swiss Medical
 * Objetivo: Prova de autoridade — 48% dos pacientes verificam credenciais antes de agendar
 */

import { motion } from "framer-motion";
import { Award, Calendar, MapPin, Users, ExternalLink } from "lucide-react";

interface Event {
  year: string;
  title: string;
  organization: string;
  location: string;
  type: "congresso" | "palestra" | "publicacao" | "formacao";
  description: string;
  image?: string;
  link?: string;
}

const events: Event[] = [
  {
    year: "2025",
    title: "UroOnco 2025 — Congresso de Uro-Oncologia",
    organization: "Sociedade Brasileira de Urologia (SBU)",
    location: "São Paulo, SP",
    type: "congresso",
    description: "Participação no principal congresso de uro-oncologia do Brasil, com atualização sobre as mais recentes técnicas cirúrgicas e tratamentos oncológicos em urologia.",
  },
  {
    year: "2025",
    title: "JPU 2025 — Jornada Paulista de Urologia",
    organization: "SBU - Seção São Paulo",
    location: "São Paulo, SP",
    type: "congresso",
    description: "Participação na Jornada Paulista de Urologia com discussões sobre avanços em cirurgia minimamente invasiva e urodinâmica.",
  },
  {
    year: "2025",
    title: "Palestra Universo Masculino — Saúde do Homem",
    organization: "Evento Educativo Comunitário",
    location: "Campinas, SP",
    type: "palestra",
    description: "Palestra educativa sobre saúde masculina, prevenção urológica e a importância do acompanhamento médico regular desde a adolescência.",
  },
  {
    year: "2024",
    title: "Jornada Acadêmica IDOR — Instituto D'Or",
    organization: "Instituto D'Or de Ensino e Pesquisa",
    location: "São Paulo, SP",
    type: "formacao",
    description: "Participação na jornada acadêmica do Instituto D'Or, referência em ensino e pesquisa médica no Brasil.",
  },
  {
    year: "2023",
    title: "Título de Especialista em Cirurgia Geral — TCBC",
    organization: "Colégio Brasileiro de Cirurgiões (CBC)",
    location: "Brasil",
    type: "formacao",
    description: "Obtenção do título TCBC (Titular do Colégio Brasileiro de Cirurgiões), reconhecimento de excelência em cirurgia geral.",
  },
];

const typeConfig = {
  congresso: { label: "Congresso", color: "bg-blue-50 text-blue-700 border-blue-200" },
  palestra: { label: "Palestra", color: "bg-purple-50 text-purple-700 border-purple-200" },
  publicacao: { label: "Publicação", color: "bg-amber-50 text-amber-700 border-amber-200" },
  formacao: { label: "Formação", color: "bg-amber-50 text-amber-700 border-amber-200" },
};

export default function MediaSection() {
  return (
    <section id="midia" className="py-20 bg-white">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1C3D5A]/5 text-[#1C3D5A] rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Congressos e Formação
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C3D5A] mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Atualização Contínua e Excelência
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Participação ativa em congressos nacionais e internacionais, garantindo que os pacientes recebam
            tratamento baseado nas mais recentes evidências científicas.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />

          {events.map((event, index) => {
            const typeStyle = typeConfig[event.type];
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start mb-10 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#B87333] rounded-full border-4 border-white shadow-md -translate-x-1/2 z-10 mt-6" />

                {/* Content */}
                <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="text-sm font-bold text-[#B87333]">{event.year}</span>
                      <span className={`text-xs px-2 py-1 rounded-full border font-medium ${typeStyle.color}`}>
                        {typeStyle.label}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#1C3D5A] mb-2 leading-snug">{event.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {event.organization}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {event.location}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{event.description}</p>
                    {event.link && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#B87333] text-sm font-medium mt-3 hover:text-[#0B8278] transition-colors"
                      >
                        Ver mais <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm mb-4">
            Formação pelo Instituto D'Or de Ensino e Pesquisa — referência em ensino médico no Brasil
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-[#1C3D5A] font-medium">
              <Award className="w-5 h-5 text-[#B87333]" />
              TCBC — Colégio Brasileiro de Cirurgiões
            </div>
            <div className="flex items-center gap-2 text-sm text-[#1C3D5A] font-medium">
              <Calendar className="w-5 h-5 text-[#B87333]" />
              CRM-SP 202.291
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
