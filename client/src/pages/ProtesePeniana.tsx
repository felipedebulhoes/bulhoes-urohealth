/*
 * Design: Clinical Precision — Swiss Medical Design
 * Page: Prótese Peniana — Tipos, Indicação, Cirurgia e Recuperação
 * Referências: EAU Guidelines on Sexual and Reproductive Health 2025, AUA Erectile Dysfunction Guideline 2018, Campbell-Walsh-Wein 13th Ed.
 */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import EducationalLayout from "@/components/EducationalLayout";
import { FAQSchema } from "@/components/SchemaMarkup";
import {
  Check, ChevronDown, ChevronUp, Stethoscope, Clock, ArrowRight,
  Shield, AlertCircle, Settings, Hand, ClipboardCheck, CalendarCheck,
} from "lucide-react";

/* ========== DATA ========== */

const indications = [
  "Disfunção erétil que não melhora com comprimidos (sildenafila, tadalafila e similares)",
  "Falha, efeitos colaterais ou recusa das injeções intracavernosas e do dispositivo a vácuo",
  "Disfunção erétil após cirurgia de próstata, bexiga ou reto que não respondeu ao tratamento clínico",
  "Doença de Peyronie associada a disfunção erétil",
  "Homem bem informado que, após conversar com o urologista, prefere uma solução definitiva",
];

const prosthesisTypes = [
  {
    name: "Prótese inflável de 3 volumes",
    icon: Settings,
    color: "violet",
    summary: "Modelo mais usado no mundo. Fica imperceptível em repouso e produz ereção ao acionar uma bomba.",
    howItWorks:
      "Dois cilindros são colocados dentro dos corpos cavernosos, uma pequena bomba fica na bolsa escrotal e um reservatório de líquido fica no abdome. Ao apertar a bomba, o líquido passa para os cilindros e o pênis fica rígido; um botão devolve o líquido ao reservatório e o pênis volta ao estado flácido.",
    pros: ["Aspecto mais natural em repouso e em ereção", "Rigidez e flacidez controladas pelo paciente", "Modelo com mais estudos de longo prazo"],
    cons: ["Cirurgia um pouco mais longa", "Exige destreza manual para acionar a bomba", "Mais componentes mecânicos"],
  },
  {
    name: "Prótese inflável de 2 volumes",
    icon: Settings,
    color: "blue",
    summary: "Bomba e reservatório ficam juntos na bolsa escrotal, sem componente no abdome.",
    howItWorks:
      "Funciona como a de 3 volumes, mas o reservatório é menor e fica junto da bomba. É uma alternativa quando não é desejável colocar o reservatório no abdome, por exemplo após cirurgias abdominais extensas.",
    pros: ["Não há reservatório no abdome", "Acionamento por bomba, como a de 3 volumes"],
    cons: ["Flacidez menos completa que a de 3 volumes", "Indicação mais restrita"],
  },
  {
    name: "Prótese maleável (semirrígida)",
    icon: Hand,
    color: "teal",
    summary: "Dois cilindros flexíveis, sem bomba. O pênis é posicionado com as mãos.",
    howItWorks:
      "Os cilindros têm um núcleo que se dobra e mantém a posição. Para a relação, o pênis é posicionado para cima; no dia a dia, para baixo. Não há líquido nem mecanismo hidráulico.",
    pros: ["Cirurgia mais simples e rápida", "Fácil de usar, sem bomba", "Opção para quem tem pouca destreza nas mãos"],
    cons: ["O pênis fica sempre firme", "Pode ser mais perceptível sob a roupa"],
  },
];

const evaluationSteps = [
  {
    step: 1,
    title: "Consulta e história clínica",
    icon: Stethoscope,
    description:
      "Entender a causa da disfunção erétil, os tratamentos já feitos, as doenças associadas (diabetes, doenças do coração, cirurgias anteriores) e as expectativas do paciente e da parceria.",
  },
  {
    step: 2,
    title: "Exame físico e exames",
    icon: ClipboardCheck,
    description:
      "Exame genital, avaliação de curvatura ou fibrose e exames de sangue e urina. Diabetes deve estar controlado e qualquer infecção urinária ou de pele precisa ser tratada antes da cirurgia.",
  },
  {
    step: 3,
    title: "Escolha do modelo",
    icon: Settings,
    description:
      "Decisão compartilhada entre médico e paciente, considerando anatomia, cirurgias prévias, destreza manual, estilo de vida e preferência pessoal.",
  },
  {
    step: 4,
    title: "Consentimento informado",
    icon: Shield,
    description:
      "Conversa clara sobre benefícios, riscos, irreversibilidade e cuidados do pós-operatório. O paciente só segue para a cirurgia depois de entender e concordar com cada ponto.",
  },
];

const recoveryTimeline = [
  { period: "Dia da cirurgia", text: "Anestesia raquidiana ou geral. A cirurgia costuma durar entre 1 e 2 horas, e a alta geralmente acontece em até 24 horas." },
  { period: "Primeiras 2 semanas", text: "Inchaço e desconforto na bolsa escrotal são esperados e controlados com analgésicos e compressas frias. Atividades leves estão liberadas." },
  { period: "4 a 6 semanas", text: "Revisão com o urologista e, na prótese inflável, treinamento para acionar a bomba. Início do uso conforme orientação médica." },
  { period: "Após liberação", text: "Retorno à atividade sexual e aos exercícios físicos, com consultas periódicas de acompanhamento." },
];

const risks = [
  {
    title: "Infecção",
    text: "É a complicação mais importante. Em primeiras cirurgias a taxa descrita nas diretrizes fica em torno de 2 a 3%, menor com próteses revestidas de antibiótico e protocolos rigorosos de preparo. Quando ocorre, normalmente é preciso retirar a prótese.",
  },
  {
    title: "Falha mecânica",
    text: "Com o tempo, as peças podem se desgastar. Nos modelos atuais a falha mecânica fica abaixo de 5% em 5 anos de acompanhamento, e o componente pode ser trocado em nova cirurgia.",
  },
  {
    title: "Irreversibilidade",
    text: "A prótese ocupa o tecido erétil. Se ela for retirada, a ereção natural e os tratamentos com comprimidos ou injeções deixam de funcionar como antes.",
  },
  {
    title: "Percepção de comprimento",
    text: "A prótese não aumenta o pênis. Alguns homens percebem o pênis um pouco menor que as ereções que tinham antes de desenvolver a disfunção erétil.",
  },
  {
    title: "Outros",
    text: "Hematoma, erosão dos cilindros, dor persistente e mudança de posição dos componentes são menos comuns e discutidos na consulta.",
  },
];

const faqs = [
  {
    q: "A prótese peniana muda a sensibilidade, o orgasmo ou a ejaculação?",
    a: "A prótese atua apenas na rigidez. Os nervos da sensibilidade, o orgasmo e a ejaculação não são alterados pela cirurgia. Se o paciente já tinha alguma alteração antes, como após uma prostatectomia, ela continua.",
  },
  {
    q: "A prótese aumenta o tamanho do pênis?",
    a: "Não. O objetivo da prótese é tratar a disfunção erétil, permitindo uma ereção firme para a relação sexual. Ela não é um tratamento para aumentar o pênis.",
  },
  {
    q: "Qual é a diferença entre prótese inflável e maleável?",
    a: "Na inflável, o paciente aperta uma bomba na bolsa escrotal para ter a ereção e aperta um botão para desfazê-la, com aspecto mais natural em repouso. Na maleável não há bomba: o pênis fica sempre firme e é posicionado com as mãos. A escolha depende da anatomia, da destreza manual e da preferência de cada paciente.",
  },
  {
    q: "A prótese peniana aparece? Dá para perceber?",
    a: "A prótese fica toda dentro do corpo, sem nenhuma parte externa. A inflável costuma ser imperceptível em repouso; a maleável pode ser notada sob roupas justas, porque o pênis fica sempre firme.",
  },
  {
    q: "Quanto tempo dura a recuperação?",
    a: "A alta geralmente acontece em até 24 horas. O inchaço melhora nas primeiras semanas e o uso da prótese costuma ser liberado entre 4 e 6 semanas, após a revisão com o urologista.",
  },
  {
    q: "Quem tem prótese peniana pode ter filhos?",
    a: "A prótese não interfere na produção de espermatozoides nem na ejaculação. A fertilidade depende de outros fatores, que podem ser avaliados na consulta.",
  },
  {
    q: "Quem tem prótese pode fazer ressonância magnética?",
    a: "A maioria dos modelos atuais é compatível com ressonância magnética sob condições específicas. Sempre informe que tem prótese peniana e leve o cartão de identificação do implante ao exame.",
  },
  {
    q: "Quando devo procurar um urologista?",
    a: "Quando a disfunção erétil persiste apesar do tratamento clínico ou quando os remédios causam efeitos que impedem o uso. A prótese é uma das opções, e a avaliação define se ela é indicada no seu caso.",
  },
];

const references = [
  { num: 1, text: "Salonia A et al. EAU Guidelines on Sexual and Reproductive Health — Erectile Dysfunction: Penile Prostheses. European Association of Urology, 2025." },
  { num: 2, text: "Burnett AL et al. Erectile Dysfunction: AUA Guideline. J Urol. 2018;200(3):633-641." },
  { num: 3, text: "Wilson SK et al. Long-term survival of inflatable penile prostheses: single surgical group experience with 2,384 first-time implants spanning two decades. J Sex Med. 2007;4(4 Pt 1):1074-1079." },
  { num: 4, text: "Carson CC et al. Efficacy, safety and patient satisfaction outcomes of the AMS 700CX inflatable penile prosthesis: results of a long-term multicenter study. J Urol. 2000;164(2):376-380." },
  { num: 5, text: "Wein AJ, Kavoussi LR, Partin AW, Peters CA. Campbell-Walsh-Wein Urology. 13th ed. Elsevier; 2024. Surgery for Erectile Dysfunction." },
];

/* Ícones na paleta mineral (AGENTS.md §3.3) sobre container cobre translúcido (§3.4). */
const colorMap: Record<string, { bg: string; icon: string; text: string; border: string; light: string }> = {
  teal: { bg: "bg-[#B87333]/15", icon: "#D5B18D", text: "text-amber-700", border: "border-amber-200", light: "bg-amber-50" },
  blue: { bg: "bg-[#B87333]/15", icon: "#AFC1D0", text: "text-blue-700", border: "border-blue-200", light: "bg-blue-50" },
  violet: { bg: "bg-[#B87333]/15", icon: "#C7A9C8", text: "text-violet-700", border: "border-violet-200", light: "bg-violet-50" },
};

/* ========== COMPONENT ========== */

export default function ProtesePeniana() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <EducationalLayout
      title="Prótese Peniana"
      subtitle="Tipos, Indicação, Cirurgia e Recuperação"
      description="Guia sobre a prótese peniana para disfunção erétil: quando é indicada, diferenças entre prótese inflável e maleável, como é a cirurgia, recuperação e riscos. Baseado nas diretrizes EAU 2025 e AUA."
      accentColor="#7C3AED"
      metaTitle="Prótese Peniana Inflável e Maleável | Dr. Felipe de Bulhões"
      metaDescription="Prótese peniana para disfunção erétil: indicação, tipos inflável e maleável, cirurgia, recuperação e riscos. Urologista em São Paulo e Campinas."
    >
      <FAQSchema questions={faqs.map(item => ({ question: item.q, answer: item.a }))} />

      {/* Introdução */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-6">O Que é a Prótese Peniana?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-foreground space-y-4">
              <p>
                A <strong>prótese peniana</strong> é um implante colocado por cirurgia dentro dos corpos cavernosos,
                as estruturas do pênis que se enchem de sangue na ereção. Ela é um tratamento para a{" "}
                <Link href="/educativo/disfuncao-eretil" className="underline hover:text-[#B87333]">disfunção erétil</Link>{" "}
                e permite uma ereção firme sempre que o paciente desejar, sem depender de remédios antes da relação.
              </p>
              <p>
                Pelas diretrizes da <strong>European Association of Urology (EAU)</strong> e da{" "}
                <strong>American Urological Association (AUA)</strong>, a prótese pode ser considerada quando os
                tratamentos clínicos não funcionam, não são tolerados ou quando o homem, bem informado, prefere uma
                solução definitiva. As diretrizes descrevem altas taxas de satisfação entre pacientes e parcerias,
                mas cada caso precisa de avaliação individual e nenhum resultado pode ser garantido.
              </p>
              <p>
                A avaliação é feita em consulta com o urologista Dr. Felipe de Bulhões, em São Paulo (Av. Paulista e
                Pinheiros) e em Campinas.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Indicações */}
      <section className="py-16 bg-gray-50 dark:bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-3 text-center">Quando a Prótese é Indicada?</h2>
            <p className="text-gray-600 dark:text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Situações em que a prótese peniana costuma ser discutida — EAU 2025 e AUA
            </p>
          </motion.div>
          <div className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-border p-6 shadow-sm">
            <ul className="space-y-3">
              {indications.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-foreground">
                  <span className="w-6 h-6 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3.5 h-3.5" style={{ color: "#C7A9C8" }} /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 dark:text-muted-foreground mt-5">
              Na <Link href="/educativo/doenca-peyronie" className="underline hover:text-[#B87333]">doença de Peyronie</Link>{" "}
              com disfunção erétil, a prótese pode tratar a rigidez e corrigir a curvatura na mesma cirurgia.
            </p>
          </div>
        </div>
      </section>

      {/* Tipos */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-3 text-center">Tipos de Prótese Peniana</h2>
            <p className="text-gray-600 dark:text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Inflável ou maleável: como funciona cada modelo
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {prosthesisTypes.map((type, i) => {
              const colors = colorMap[type.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-white dark:bg-card rounded-xl border ${colors.border} p-6 shadow-sm flex flex-col`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
                      <type.icon className="w-5 h-5" style={{ color: colors.icon }} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-foreground">{type.name}</h3>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-foreground mb-3">{type.summary}</p>
                  <div className={`${colors.light} rounded-lg p-3 mb-4`}>
                    <p className="text-sm font-semibold text-gray-800 mb-1">Como funciona</p>
                    <p className="text-sm text-gray-700">{type.howItWorks}</p>
                  </div>
                  <p className="text-sm font-semibold text-amber-700 mb-2">Vantagens</p>
                  <ul className="space-y-1.5 mb-4">
                    {type.pros.map((p, pi) => (
                      <li key={pi} className="flex items-start gap-2 text-sm text-gray-600 dark:text-muted-foreground">
                        <span className="w-5 h-5 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0"><Check className="w-3 h-3" style={{ color: "#D9C58A" }} /></span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-semibold text-red-700 mb-2">Limitações</p>
                  <ul className="space-y-1.5">
                    {type.cons.map((c, ci) => (
                      <li key={ci} className="flex items-start gap-2 text-sm text-gray-600 dark:text-muted-foreground">
                        <span className="w-5 h-5 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0"><AlertCircle className="w-3 h-3" style={{ color: "#D8A5A5" }} /></span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Avaliação */}
      <section className="py-16 bg-gray-50 dark:bg-card">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-3 text-center">Avaliação Antes da Cirurgia</h2>
            <p className="text-gray-600 dark:text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              A indicação é feita depois de uma avaliação completa, e pode ser contraindicada quando não houver benefício
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {evaluationSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-card rounded-xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#B87333]/15 flex items-center justify-center text-[#B87333] font-bold text-sm">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-foreground">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cirurgia e recuperação */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-3 text-center">Como é a Cirurgia e a Recuperação</h2>
            <p className="text-gray-600 dark:text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              O implante é feito por uma pequena incisão, em geral na transição entre o pênis e a bolsa escrotal
            </p>
          </motion.div>
          <div className="space-y-4">
            {recoveryTimeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-gray-50 dark:bg-card rounded-xl p-4 border border-gray-200 dark:border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-[#B87333]/15 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" style={{ color: "#B7C0A1" }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-foreground">{item.period}</h3>
                  <p className="text-sm text-gray-700 dark:text-foreground">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-muted-foreground mt-6">
            Veja também as{" "}
            <Link href="/educativo/orientacoes-pre-operatorias" className="underline hover:text-[#B87333]">orientações pré-operatórias</Link>{" "}
            e as{" "}
            <Link href="/educativo/orientacoes-pos-operatorias" className="underline hover:text-[#B87333]">orientações pós-operatórias</Link>.
          </p>
        </div>
      </section>

      {/* Riscos */}
      <section className="py-16 bg-gray-50 dark:bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-3 text-center">Riscos e Limitações</h2>
            <p className="text-gray-600 dark:text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Pontos que todo paciente precisa conhecer antes de decidir
            </p>
          </motion.div>
          <div className="space-y-3">
            {risks.map((risk, i) => (
              <div key={i} className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-border p-5">
                <h3 className="font-semibold text-gray-900 dark:text-foreground mb-1 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0"><AlertCircle className="w-3.5 h-3.5" style={{ color: "#D8A5A5" }} /></span>
                  {risk.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-foreground">{risk.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-3 text-center">Perguntas Frequentes</h2>
            <p className="text-gray-600 dark:text-muted-foreground text-center mb-10">Dúvidas comuns sobre a prótese peniana</p>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 dark:border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-muted transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-medium text-gray-900 dark:text-foreground pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-gray-600 dark:text-muted-foreground border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chamada para consulta */}
      <section className="py-16 bg-gray-50 dark:bg-card">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-12 h-12 rounded-md bg-[#B87333]/15 flex items-center justify-center mx-auto mb-4">
            <CalendarCheck className="w-6 h-6" style={{ color: "#B7C0A1" }} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-3">Avaliação com Urologista</h2>
          <p className="text-gray-700 dark:text-foreground mb-6">
            A consulta define se a prótese é indicada no seu caso e qual modelo combina com a sua anatomia e o seu dia a
            dia. Atendimento particular em São Paulo (Av. Paulista e Pinheiros), Campinas e por teleconsulta.
          </p>
          <Link
            href="/agendamento"
            className="inline-flex items-center gap-2 rounded-lg bg-[#1C3D5A] px-6 py-3 font-semibold text-white hover:bg-[#B87333] transition-colors"
          >
            Agendar consulta <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Referências */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-6">Referências</h2>
          <ol className="space-y-2">
            {references.map((ref) => (
              <li key={ref.num} className="text-sm text-gray-600 dark:text-muted-foreground flex gap-2">
                <span className="font-semibold text-gray-500 dark:text-muted-foreground shrink-0">{ref.num}.</span>
                <span>{ref.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </EducationalLayout>
  );
}
