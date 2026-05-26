/*
 * Design: Clinical Precision — Swiss Medical Design
 * Page: Primeira Consulta — O que esperar na primeira consulta urológica
 */
import EducationalLayout from "@/components/EducationalLayout";
import { motion } from "framer-motion";
import {
  ClipboardList, Stethoscope, TestTube, MessageCircle,
  Clock, FileText, Heart, Shield, CheckCircle, ArrowRight
} from "lucide-react";

const steps = [
  {
    icon: <ClipboardList className="w-6 h-6" />,
    title: "1. Anamnese (Conversa Inicial)",
    duration: "10-15 minutos",
    description: "O médico fará perguntas detalhadas sobre seus sintomas, histórico médico pessoal e familiar, medicamentos em uso, hábitos de vida (tabagismo, atividade física, alimentação) e queixas específicas. Seja honesto e detalhado — todas as informações são confidenciais e fundamentais para o diagnóstico correto.",
    tips: [
      "Anote seus sintomas antes da consulta (quando começaram, frequência, intensidade)",
      "Traga lista de medicamentos em uso (incluindo suplementos)",
      "Informe sobre cirurgias anteriores e alergias",
      "Relate histórico familiar de doenças urológicas ou câncer",
    ],
  },
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: "2. Exame Físico",
    duration: "5-10 minutos",
    description: "O exame físico urológico é realizado de forma respeitosa e profissional. Pode incluir: palpação abdominal (para avaliar rins e bexiga), exame da genitália externa (pênis e testículos) e, quando indicado, o toque retal para avaliação da próstata. Todos os exames são explicados antes de serem realizados.",
    tips: [
      "O toque retal dura apenas 5-10 segundos e causa mínimo desconforto",
      "Nem toda consulta exige toque retal — depende da queixa e idade",
      "Você pode fazer perguntas a qualquer momento durante o exame",
      "Se sentir desconforto, avise o médico imediatamente",
    ],
  },
  {
    icon: <TestTube className="w-6 h-6" />,
    title: "3. Exames Complementares",
    duration: "Variável",
    description: "Conforme a avaliação inicial, o médico pode solicitar exames complementares para confirmar ou aprofundar o diagnóstico. Os mais comuns incluem: exames de sangue (PSA, testosterona, creatinina), exames de urina, ultrassonografia, tomografia e, em casos específicos, urodinâmica ou cistoscopia.",
    tips: [
      "Traga exames anteriores — evita repetições desnecessárias",
      "Pergunte sobre o preparo necessário para cada exame",
      "Alguns exames podem ser feitos no mesmo dia da consulta",
      "Os resultados são explicados detalhadamente no retorno",
    ],
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "4. Discussão do Plano de Tratamento",
    duration: "10-15 minutos",
    description: "Com base na avaliação, o médico discutirá com você as opções de tratamento disponíveis, explicando benefícios, riscos e alternativas de cada uma. A decisão é sempre compartilhada — você participa ativamente da escolha do melhor caminho para o seu caso.",
    tips: [
      "Não hesite em fazer perguntas sobre o tratamento proposto",
      "Pergunte sobre alternativas e efeitos colaterais",
      "Solicite material informativo para ler em casa",
      "Agende o retorno antes de sair do consultório",
    ],
  },
];

const whatToBring = [
  { icon: <FileText className="w-5 h-5" />, text: "Documento de identidade e cartão do convênio" },
  { icon: <ClipboardList className="w-5 h-5" />, text: "Lista de medicamentos em uso (com doses)" },
  { icon: <TestTube className="w-5 h-5" />, text: "Exames anteriores (sangue, imagem, biópsias)" },
  { icon: <Heart className="w-5 h-5" />, text: "Histórico de cirurgias e internações" },
  { icon: <Shield className="w-5 h-5" />, text: "Guia de encaminhamento (se necessário pelo convênio)" },
];

const myths = [
  {
    myth: "O urologista é médico só de homem",
    truth: "O urologista trata doenças do trato urinário de homens E mulheres (infecções urinárias, cálculos renais, incontinência). A parte exclusivamente masculina é a andrologia (próstata, disfunção erétil, infertilidade).",
  },
  {
    myth: "Só preciso ir ao urologista quando tiver sintomas",
    truth: "A prevenção é fundamental. Muitas doenças urológicas, incluindo o câncer de próstata, são silenciosas nos estágios iniciais. O check-up regular permite diagnóstico precoce e tratamento mais eficaz.",
  },
  {
    myth: "O exame de próstata é humilhante e muito doloroso",
    truth: "O toque retal é um exame médico como qualquer outro, realizado com profissionalismo e respeito. Dura poucos segundos e causa, no máximo, um leve desconforto. Pode salvar sua vida ao detectar alterações precoces.",
  },
  {
    myth: "Problemas de ereção são normais com a idade",
    truth: "A disfunção erétil NÃO é uma consequência inevitável do envelhecimento. Pode ser sinal de doenças cardiovasculares, diabetes ou alterações hormonais que precisam de investigação e tratamento.",
  },
];

export default function PrimeiraConsulta() {
  return (
    <EducationalLayout
      title="Sua Primeira Consulta Urológica"
      subtitle="Guia do Paciente"
      description="Tudo o que você precisa saber para se sentir seguro e preparado. Entenda como funciona a consulta, o que trazer e o que esperar."
      metaDescription="Primeira consulta com urologista: o que esperar, como se preparar, exames necessários e dicas. Guia completo do Dr. Felipe de Bulhões — Urologista em São Paulo e Campinas."
      accentColor="#B87333"
    >
      {/* Intro */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#B87333]/5 border border-[#B87333]/10 rounded-2xl p-6 lg:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#B87333]/10 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-[#B87333]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1C3D5A] dark:text-foreground mb-2">
                  Duração média: 30-45 minutos
                </h3>
                <p className="text-sm text-[#1C3D5A] dark:text-foreground/60 leading-relaxed">
                  A primeira consulta urológica é mais longa que as consultas de retorno, pois inclui uma avaliação completa do seu histórico e estado de saúde. Reserve tempo suficiente e chegue 15 minutos antes para preenchimento de cadastro.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-8 lg:py-12">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-8 font-serif text-center">
            Etapas da Consulta
          </h2>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-card rounded-xl border border-[#1C3D5A]/6 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1C3D5A]/5 flex items-center justify-center shrink-0 text-[#1C3D5A] dark:text-foreground">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-base font-semibold text-[#1C3D5A] dark:text-foreground">
                        {step.title}
                      </h3>
                      <span className="text-xs bg-[#B87333]/10 text-[#B87333] px-2 py-0.5 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-sm text-[#1C3D5A] dark:text-foreground/55 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <div className="bg-[#F8FAFB] rounded-lg p-4">
                      <p className="text-xs font-semibold text-[#1C3D5A] dark:text-foreground/70 mb-2">Dicas:</p>
                      <ul className="space-y-1.5">
                        {step.tips.map((tip, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-[#1C3D5A] dark:text-foreground/50">
                            <CheckCircle className="w-3.5 h-3.5 text-[#B87333] shrink-0 mt-0.5" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What to bring */}
      <section className="py-12 lg:py-16 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-8 font-serif text-center">
            O Que Trazer
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whatToBring.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-card rounded-xl border border-[#1C3D5A]/6 p-4 flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[#B87333]/10 flex items-center justify-center shrink-0 text-[#B87333]">
                  {item.icon}
                </div>
                <span className="text-sm text-[#1C3D5A] dark:text-foreground/70">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Myths */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-3 font-serif text-center">
            Mitos e Verdades
          </h2>
          <p className="text-sm text-[#1C3D5A] dark:text-foreground/40 text-center mb-8 max-w-lg mx-auto">
            Informação correta é o primeiro passo para cuidar da sua saúde.
          </p>
          <div className="space-y-4">
            {myths.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-card rounded-xl border border-[#1C3D5A]/6 p-5"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded shrink-0">
                    MITO
                  </span>
                  <p className="text-sm font-medium text-[#1C3D5A] dark:text-foreground">
                    "{item.myth}"
                  </p>
                </div>
                <div className="flex items-start gap-3 ml-0 pl-0 border-l-2 border-[#B87333]/30">
                  <div className="pl-4">
                    <span className="text-xs font-bold text-[#B87333] bg-[#B87333]/10 px-2 py-0.5 rounded inline-block mb-1">
                      VERDADE
                    </span>
                    <p className="text-sm text-[#1C3D5A] dark:text-foreground/55 leading-relaxed">
                      {item.truth}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* When to seek */}
      <section className="py-12 lg:py-16 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-8 font-serif text-center">
            Quando Procurar um Urologista?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Dificuldade ou dor ao urinar",
              "Sangue na urina ou no esperma",
              "Dor lombar ou abdominal intensa",
              "Aumento da frequência urinária",
              "Jato urinário fraco ou interrompido",
              "Disfunção erétil ou ejaculação precoce",
              "Dor ou nódulo nos testículos",
              "Infertilidade ou dificuldade para ter filhos",
              "Infecções urinárias de repetição",
              "Check-up preventivo (a partir dos 40 anos)",
              "Incontinência urinária",
              "Alteração no PSA ou exame de próstata",
            ].map((symptom, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 bg-white dark:bg-card rounded-lg border border-[#1C3D5A]/6 p-3"
              >
                <ArrowRight className="w-4 h-4 text-[#B87333] shrink-0" />
                <span className="text-sm text-[#1C3D5A] dark:text-foreground/70">{symptom}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8">
        <div className="container max-w-4xl">
          <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-4 text-center">
            <p className="text-xs text-amber-700/70">
              Este conteúdo é informativo e não substitui a consulta médica presencial. Cada caso é único e requer avaliação individualizada pelo especialista.
            </p>
          </div>
        </div>
      </section>
    </EducationalLayout>
  );
}
