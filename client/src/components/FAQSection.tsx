/*
 * Design: Clinical Precision — Swiss Medical Design
 * Component: FAQ Section — Perguntas Frequentes dos Pacientes
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react";

const faqs = [
  {
    category: "Consulta",
    questions: [
      {
        q: "Quando devo procurar um urologista?",
        a: "Todo homem a partir dos 40 anos (ou 35 anos com histórico familiar de câncer de próstata) deve fazer acompanhamento urológico anual. Além disso, procure um urologista se apresentar: dificuldade para urinar, sangue na urina, dor lombar intensa, disfunção erétil, infertilidade, dor testicular ou qualquer alteração genital.",
      },
      {
        q: "Como é a primeira consulta urológica?",
        a: "A primeira consulta inclui uma conversa detalhada sobre seus sintomas, histórico médico e hábitos de vida. O exame físico pode incluir palpação abdominal e, quando indicado, o toque retal (exame da próstata) — que dura apenas alguns segundos e é indolor na maioria dos casos. Exames complementares podem ser solicitados conforme a necessidade.",
      },
      {
        q: "O exame de próstata (toque retal) dói?",
        a: "O toque retal é um exame rápido (5-10 segundos) que causa, no máximo, um leve desconforto. Não é doloroso. É fundamental para a detecção precoce do câncer de próstata e avaliação da HPB. O exame é realizado com lubrificante e de forma respeitosa e profissional.",
      },
      {
        q: "Preciso de algum preparo para a consulta?",
        a: "Não é necessário preparo especial. Traga exames anteriores (sangue, imagem, biópsias), lista de medicamentos em uso e, se possível, um resumo dos seus sintomas. Para exames específicos como urodinâmica ou ultrassom, orientações de preparo serão fornecidas previamente.",
      },
    ],
  },
  {
    category: "Convênios e Valores",
    questions: [
      {
        q: "Quais convênios são aceitos?",
        a: "No Campinas Day Hospital, atendo pelos convênios: Allianz, Amil, Assefaz, Bradesco, Cassi, Gama, Go Care, Holambra, Medservice, Porto Seguro, Skill/Omint, SulAmérica e Unimed. Na Clinovi Paulista e Clinovi Moema, o atendimento é exclusivamente particular.",
      },
      {
        q: "Qual o valor da consulta particular?",
        a: "Os valores de consulta particular variam conforme o local de atendimento. Entre em contato pelo WhatsApp (11) 98112-4455 para informações atualizadas sobre valores e formas de pagamento.",
      },
      {
        q: "Vocês emitem nota fiscal / recibo para reembolso?",
        a: "Sim. Emitimos recibo detalhado com todos os dados necessários para solicitar reembolso junto ao seu plano de saúde, quando aplicável.",
      },
    ],
  },
  {
    category: "Teleconsulta",
    questions: [
      {
        q: "Como funciona a teleconsulta?",
        a: "A teleconsulta é realizada por videochamada em plataforma segura, com a mesma qualidade e atenção da consulta presencial. É ideal para retornos, orientações pós-operatórias, segunda opinião médica e pacientes de outras cidades. Após o agendamento, você recebe um link de acesso por e-mail ou WhatsApp.",
      },
      {
        q: "A teleconsulta substitui a consulta presencial?",
        a: "A teleconsulta é excelente para avaliação inicial, retornos e orientações, mas não substitui completamente a consulta presencial quando há necessidade de exame físico. O médico indicará se uma consulta presencial é necessária.",
      },
    ],
  },
  {
    category: "Procedimentos",
    questions: [
      {
        q: "As cirurgias são realizadas em quais hospitais?",
        a: "As cirurgias são realizadas no Campinas Day Hospital (Campinas) e nos hospitais parceiros em São Paulo. A escolha do local depende do procedimento, convênio e preferência do paciente.",
      },
      {
        q: "Quanto tempo dura a recuperação das cirurgias?",
        a: "Varia conforme o procedimento. Cirurgias minimamente invasivas (endoscópicas, laparoscópicas, robóticas) têm recuperação mais rápida — em geral 3-7 dias para atividades leves. Consulte a página de Orientações Pós-Operatórias para detalhes específicos de cada cirurgia.",
      },
      {
        q: "O que é cirurgia minimamente invasiva?",
        a: "São técnicas cirúrgicas que utilizam pequenas incisões (0,5-1cm) ou acessos naturais (uretra) em vez de grandes cortes. Incluem endoscopia, laparoscopia e cirurgia robótica. Benefícios: menos dor, menor sangramento, recuperação mais rápida e menor tempo de internação.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#0A2540]/6 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-4 text-left group"
      >
        <span className="text-sm font-medium text-[#0A2540] pr-4 group-hover:text-[#0D9488] transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 mt-0.5 text-[#0A2540]/30 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#0A2540]/55 leading-relaxed pb-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("Consulta");

  return (
    <section id="faq" className="py-16 lg:py-24">
      <div className="container max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-[#0D9488]" />
            <span className="text-xs font-semibold text-[#0D9488] uppercase tracking-widest">
              Perguntas Frequentes
            </span>
          </div>
          <h2 className="text-2xl lg:text-4xl text-[#0A2540] mb-3 font-serif">
            Tire Suas Dúvidas
          </h2>
          <p className="text-sm text-[#0A2540]/50 max-w-lg mx-auto">
            Respostas para as perguntas mais comuns dos nossos pacientes. Se sua dúvida não está aqui, entre em contato.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {faqs.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat.category
                  ? "bg-[#0A2540] text-white"
                  : "bg-[#F8FAFB] text-[#0A2540]/50 hover:text-[#0A2540] hover:bg-[#0A2540]/5"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Questions */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-[#0A2540]/6 p-6"
        >
          {faqs
            .find((c) => c.category === activeCategory)
            ?.questions.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#0A2540]/40 mb-3">
            Não encontrou sua resposta?
          </p>
          <a
            href="https://wa.me/5511981124455?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20um%20tratamento%20urol%C3%B3gico."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Pergunte pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
