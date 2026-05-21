/* GuiaGoogleBusiness.tsx — Página interna (não pública) com guia para otimizar Google Business
 * Esta página é para uso interno do Dr. Felipe
 */

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Star, MapPin, Camera, MessageSquare, Clock, TrendingUp } from "lucide-react";
import { Link } from "wouter";

const steps = [
  {
    icon: MapPin,
    title: "1. Crie ou Reivindique seu Perfil",
    description: "Acesse business.google.com e crie um perfil para cada local de atendimento (Campinas Day Hospital, Clinovi Paulista, Clinovi Moema).",
    tips: [
      "Use o nome exato: 'Dr. Felipe de Bulhões — Urologista'",
      "Categoria principal: 'Urologista'",
      "Categorias secundárias: 'Cirurgião', 'Médico'",
      "Adicione todos os 3 endereços como locais separados",
    ],
  },
  {
    icon: Camera,
    title: "2. Adicione Fotos Profissionais",
    description: "Perfis com fotos recebem 42% mais solicitações de direção e 35% mais cliques no site.",
    tips: [
      "Foto de perfil: sua foto profissional de jaleco",
      "Foto de capa: fachada do consultório ou logo",
      "Adicione fotos do interior do consultório",
      "Atualize fotos a cada 3-6 meses",
    ],
  },
  {
    icon: Clock,
    title: "3. Mantenha Horários Atualizados",
    description: "Horários incorretos são a principal causa de avaliações negativas no Google.",
    tips: [
      "Atualize horários de cada local separadamente",
      "Marque feriados e datas especiais com antecedência",
      "Adicione horários especiais para teleconsulta",
      "Ative 'Agendar consulta' com link para o Doctoralia",
    ],
  },
  {
    icon: Star,
    title: "4. Solicite Avaliações dos Pacientes",
    description: "Práticas com 100+ reviews ranqueiam significativamente melhor. 92% dos pacientes confiam em avaliações online.",
    tips: [
      "Peça avaliação após consultas bem-sucedidas",
      "Envie link direto do Google Reviews por WhatsApp",
      "Responda TODAS as avaliações — positivas e negativas",
      "Responder reviews aumenta confiança em 20-28%",
    ],
  },
  {
    icon: MessageSquare,
    title: "5. Publique Posts Regularmente",
    description: "Google Business permite publicar atualizações, ofertas e novidades diretamente no perfil.",
    tips: [
      "Publique 1-2 posts por semana",
      "Compartilhe dicas de saúde urológica",
      "Divulgue novos artigos do blog do site",
      "Anuncie participação em congressos e eventos",
    ],
  },
  {
    icon: TrendingUp,
    title: "6. Monitore e Otimize",
    description: "O Google Business Insights mostra como os pacientes encontram você e o que fazem.",
    tips: [
      "Verifique insights mensalmente",
      "Acompanhe: buscas, visualizações, ações (ligações, rotas, site)",
      "Adicione palavras-chave naturais na descrição",
      "Mantenha o perfil 100% completo — perfis completos ranqueiam melhor",
    ],
  },
];

export default function GuiaGoogleBusiness() {
  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      {/* Header */}
      <div className="bg-[#1C3D5A] py-16">
        <div className="container">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar ao site
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#B87333] text-sm font-medium uppercase tracking-wider">Guia Interno</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Como Otimizar seu Google Business Profile
            </h1>
            <p className="text-white/70 max-w-2xl">
              Perfis otimizados no Google geram 5-12x mais ligações de pacientes. Siga este guia passo a passo para maximizar sua visibilidade nas buscas locais.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="container -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "5-12x", label: "Mais ligações" },
            { value: "42%", label: "Mais direções" },
            { value: "92%", label: "Confiam em reviews" },
            { value: "82%", label: "Buscam no Google" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-card rounded-xl p-5 shadow-sm border border-slate-100 text-center"
            >
              <div className="text-2xl font-bold text-[#B87333]">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="container py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-card rounded-xl p-8 shadow-sm border border-slate-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#B87333]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#B87333]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-[#B87333] mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <div className="bg-[#1C3D5A] rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Comece Agora
            </h3>
            <p className="text-white/70 text-sm mb-6">
              Acesse o Google Business e comece a otimizar seu perfil. O impacto na captação de pacientes é significativo.
            </p>
            <a
              href="https://business.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#B87333] text-white rounded-lg font-semibold hover:bg-[#0B8278] transition-colors"
            >
              Acessar Google Business
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
