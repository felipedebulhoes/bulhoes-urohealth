/*
 * Design: Clinical Precision — Swiss Medical Design
 * Page: Doença de Peyronie — Curvatura Peniana Adquirida: Diagnóstico e Tratamentos
 * Referências: EAU Guidelines on Sexual and Reproductive Health 2025, AUA Guideline on PD 2015 (amended 2022), Campbell-Walsh-Wein 13th Ed.
 */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import EducationalLayout from "@/components/EducationalLayout";
import { FAQSchema } from "@/components/SchemaMarkup";
import {
  AlertTriangle, Check, ChevronDown, ChevronUp, Stethoscope, Clock,
  ArrowRight, TrendingUp, Zap, Heart, Shield, Activity,
  Syringe, Wrench, Target, Search, Pill, Dumbbell, Eye, Ruler,
  CircleDot, Layers, Scissors, Cpu, AlertCircle, Info
} from "lucide-react";

/* ========== DATA ========== */

const diseasePhases = [
  {
    phase: "Fase Aguda (Inflamatória)",
    color: "red",
    icon: Zap,
    duration: "6-18 meses após início dos sintomas",
    characteristics: [
      "Dor peniana durante a ereção (sintoma definidor)",
      "Curvatura em evolução progressiva",
      "Placa em formação — pode não ser palpável inicialmente",
      "Possível aparecimento de novas deformidades",
    ],
    treatment: "Foco em controle da dor, prevenção de progressão. Tratamento conservador é a regra. Cirurgia NÃO indicada.",
  },
  {
    phase: "Fase Crônica (Estável)",
    color: "teal",
    icon: Shield,
    duration: "Após estabilização: ≥ 3 meses sem dor e sem mudança na curvatura",
    characteristics: [
      "Dor geralmente resolvida ou mínima",
      "Curvatura estabilizada (não muda mais)",
      "Placa palpável, podendo estar calcificada",
      "Disfunção erétil pode estar presente (30-70%)",
    ],
    treatment: "Opções de tratamento intralesional (CCH) ou cirúrgico para curvaturas funcionalmente significativas.",
  },
];

const diagnosticSteps = [
  {
    step: 1,
    title: "História Clínica Detalhada",
    icon: Stethoscope,
    description: "Anamnese completa incluindo início e duração dos sintomas, presença de dor, grau de deformidade, função erétil e impacto na vida sexual.",
    details: [
      "Duração dos sintomas e evolução temporal",
      "Presença e intensidade da dor na ereção",
      "Mudanças recentes na curvatura (ativa vs. estável)",
      "Função erétil basal (IIEF-5 ou SHIM)",
      "Impacto psicossocial e na relação conjugal",
      "Questionário PDQ (Peyronie's Disease Questionnaire)",
    ],
    evidence: "Recomendação Forte — EAU 2025",
  },
  {
    step: 2,
    title: "Exame Físico",
    icon: Search,
    description: "Avaliação genital completa com palpação do pênis e pesquisa de doenças fibromatosas associadas.",
    details: [
      "Palpação da placa: localização, tamanho, consistência",
      "Medida do comprimento peniano (esticado)",
      "Pesquisa de Dupuytren (mãos) e Ledderhose (pés)",
      "Avaliação do prepúcio e meato uretral",
      "Nota: tamanho da placa NÃO se correlaciona com grau de curvatura",
    ],
    evidence: "Recomendação Forte — EAU 2025",
  },
  {
    step: 3,
    title: "Avaliação Objetiva da Curvatura",
    icon: Ruler,
    description: "Documentação objetiva do grau e direção da curvatura, essencial para planejamento terapêutico.",
    details: [
      "Auto-fotografia em ereção (método mais prático)",
      "Teste com dispositivo de vácuo (VED)",
      "Injeção intracavernosa (método mais preciso)",
      "Documentar: grau, direção (dorsal, ventral, lateral), deformidade em ampulheta",
    ],
    evidence: "Recomendação Forte — EAU 2025",
  },
  {
    step: 4,
    title: "Avaliação da Função Erétil",
    icon: Heart,
    description: "Fundamental para a escolha terapêutica. Disfunção erétil coexiste em 30-70% dos pacientes.",
    details: [
      "Questionário IIEF-5 (International Index of Erectile Function)",
      "US Doppler peniano: indicado se cirurgia com enxerto planejada",
      "Avaliar resposta a iPDE5 (sildenafila, tadalafila)",
      "DE vascular vs. psicogênica vs. mista",
    ],
    evidence: "Recomendação Forte — EAU 2025",
  },
];

const conservativeTreatments = [
  {
    category: "Terapia Oral",
    icon: Pill,
    color: "blue",
    treatments: [
      {
        name: "Pentoxifilina",
        mechanism: "Inibidor de PDE, anti-inflamatório e antifibrótico",
        indication: "Fase aguda — pode reduzir progressão da placa e dor",
        eau: "Pode ser oferecida na fase aguda (Grau B, NE 2)",
        aua: "Pode oferecer (Condicional, Grau C)",
        recommended: true,
      },
      {
        name: "Vitamina E",
        mechanism: "Antioxidante",
        indication: "Historicamente utilizada, sem evidência de eficácia",
        eau: "Não recomendada (Grau C, NE 1)",
        aua: "Não deve oferecer (Forte, Grau C)",
        recommended: false,
      },
      {
        name: "Potaba (KPAB)",
        mechanism: "Propriedades antifibróticas",
        indication: "Historicamente utilizada, evidência limitada",
        eau: "Não recomendada (Grau C, NE 1)",
        aua: "Não deve oferecer (Forte, Grau C)",
        recommended: false,
      },
      {
        name: "Colchicina",
        mechanism: "Anti-inflamatório e antifibrótico",
        indication: "Historicamente utilizada, evidência limitada",
        eau: "Não recomendada (Grau C, NE 2)",
        aua: "Não deve oferecer (Forte, Grau C)",
        recommended: false,
      },
    ],
  },
  {
    category: "Injeções Intralesionais",
    icon: Syringe,
    color: "emerald",
    treatments: [
      {
        name: "Colagenase Clostridium Histolyticum (CCH / Xiaflex)",
        mechanism: "Quebra o colágeno da placa fibrótica",
        indication: "Fase crônica estável, curvatura 30-90°, placa palpável, função erétil preservada",
        eau: "Deve ser oferecida (Grau A, NE 1)",
        aua: "Deve oferecer (Forte, Grau B)",
        recommended: true,
        highlight: true,
        details: [
          "Protocolo: até 4 ciclos de 2 injeções (8 injeções no total)",
          "Modelagem peniana entre os ciclos",
          "Redução média de curvatura: 17-34%",
          "Contraindicações: fase aguda, placas calcificadas, curvatura dorsal com risco uretral",
        ],
      },
      {
        name: "Verapamil Intralesional",
        mechanism: "Bloqueador de canal de cálcio — altera metabolismo fibroblástico",
        indication: "Fases aguda e crônica",
        eau: "Pode ser considerado (Grau B, NE 2)",
        aua: "Pode oferecer (Condicional, Grau C)",
        recommended: true,
      },
      {
        name: "Interferon Alfa-2b",
        mechanism: "Efeitos antifibróticos e imunomoduladores",
        indication: "Fases aguda e crônica",
        eau: "Pode ser considerado (Grau B, NE 2)",
        aua: "Pode oferecer (Condicional, Grau C)",
        recommended: true,
      },
    ],
  },
  {
    category: "Terapias Mecânicas e Adjuvantes",
    icon: Dumbbell,
    color: "violet",
    treatments: [
      {
        name: "Terapia de Tração Peniana (PTT)",
        mechanism: "Estiramento mecânico para remodelação da túnica albugínea",
        indication: "Fase crônica — isolada ou adjuvante ao CCH",
        eau: "Deve ser oferecida na fase crônica, especialmente com CCH (Grau B, NE 2)",
        aua: "Pode oferecer (Condicional, Grau C)",
        recommended: true,
      },
      {
        name: "Ondas de Choque (Li-ESWT)",
        mechanism: "Microtrauma, angiogênese, modificação do colágeno",
        indication: "Apenas para DOR associada à DP. NÃO indicada para curvatura.",
        eau: "Para dor: pode ser considerada (Grau A, NE 1). Para curvatura: NÃO recomendada (Grau C)",
        aua: "Para curvatura: não deve oferecer (Forte, Grau C). Para dor: pode oferecer (Condicional, Grau C)",
        recommended: false,
        warning: "Não reduz curvatura",
      },
      {
        name: "Dispositivo de Vácuo (VED)",
        mechanism: "Estiramento mecânico e promoção do fluxo sanguíneo",
        indication: "Terapia adjuvante, especialmente pós-cirurgia ou com injeções intralesionais",
        eau: "Pode ser considerado como adjuvante (Grau B, NE 3)",
        aua: "Pode oferecer como adjuvante (Condicional, Grau C)",
        recommended: true,
      },
      {
        name: "Inibidores de PDE5 (Sildenafila, Tadalafila)",
        mechanism: "Melhora da função erétil",
        indication: "Para disfunção erétil associada à DP — NÃO trata a curvatura diretamente",
        eau: "Deve ser oferecido para DE associada à DP (Grau A, NE 1)",
        aua: "Deve oferecer para DE + DP (Forte, Grau B)",
        recommended: true,
      },
    ],
  },
];

const surgicalOptions = [
  {
    name: "Plicatura Tunical (Nesbit, 16-dot)",
    icon: Layers,
    color: "blue",
    indication: "Curvatura < 60°, comprimento adequado, função erétil preservada",
    description: "Encurtamento do lado convexo (mais longo) do pênis através de excisão ou plicatura de elipse de túnica albugínea. Técnica mais simples, com menor risco de disfunção erétil pós-operatória.",
    howItWorks: "Suturas ou excisão de cunha na túnica albugínea no lado oposto à curvatura, encurtando o lado mais longo para retificar o pênis. Resulta em algum encurtamento peniano.",
    results: "Taxa de retificação: 85-100%. Satisfação: 70-90%. Encurtamento médio: 1-2 cm.",
    eau: "Deve ser oferecida (Grau A, NE 2)",
    aua: "Deve oferecer (Forte, Grau B)",
    pros: ["Técnica mais simples e rápida", "Menor risco de DE pós-operatória", "Resultados previsíveis"],
    cons: ["Encurtamento peniano (1-2 cm)", "Não ideal para curvaturas graves (> 60°)", "Não corrige deformidade em ampulheta"],
  },
  {
    name: "Incisão/Excisão de Placa com Enxerto",
    icon: Scissors,
    color: "emerald",
    indication: "Curvatura > 60°, encurtamento significativo, deformidade em ampulheta, função erétil preservada",
    description: "Incisão ou excisão da placa fibrótica no lado côncavo (mais curto) do pênis, seguida de cobertura do defeito com material de enxerto para alongar o lado encurtado.",
    howItWorks: "A placa é incisada ou parcialmente excisada, e o defeito tunical é coberto com enxerto autólogo (veia safena, fáscia temporal), aloenxerto (derme cadavérica - TDA) ou xenoenxerto (submucosa intestinal suína - SIS).",
    results: "Taxa de retificação: 80-95%. Preservação do comprimento. Risco de DE: 5-25%.",
    eau: "Deve ser oferecida (Grau A, NE 2)",
    aua: "Deve oferecer (Forte, Grau B)",
    pros: ["Preserva ou recupera comprimento peniano", "Indicada para curvaturas graves", "Corrige deformidade em ampulheta"],
    cons: ["Maior risco de DE pós-operatória (5-25%)", "Cirurgia mais complexa e demorada", "Possível alteração de sensibilidade"],
  },
  {
    name: "Prótese Peniana Inflável (IPP)",
    icon: Cpu,
    color: "violet",
    indication: "Doença de Peyronie + Disfunção Erétil moderada a grave refratária",
    description: "Implante de prótese peniana inflável de 3 volumes, que simultaneamente restaura a rigidez erétil e permite retificação do pênis. Pode necessitar de modelagem manual ou enxerto complementar.",
    howItWorks: "Prótese inflável de 3 componentes (cilindros intracavernosos, bomba escrotal, reservatório). Após implante, modelagem manual sobre os cilindros inflados para corrigir curvatura residual. Se curvatura persistir > 20°, pode-se associar plicatura ou enxerto.",
    results: "Satisfação: 85-95%. Retificação com modelagem: 80-90%. Resolve DE e curvatura simultaneamente.",
    eau: "Deve ser oferecida para DP + DE moderada a grave (Grau A, NE 2)",
    aua: "Deve oferecer para DP + DE (Forte, Grau B)",
    pros: ["Resolve DE e curvatura simultaneamente", "Altíssima satisfação do paciente", "Solução definitiva para ambos os problemas"],
    cons: ["Procedimento irreversível", "Risco de infecção (1-3%)", "Necessidade de revisão a longo prazo", "Custo elevado"],
  },
];

const surgicalAlgorithm = [
  { condition: "Curvatura < 60° + Comprimento adequado + Ereção boa", arrow: "→", treatment: "Plicatura (Nesbit / 16-dot)", color: "blue" },
  { condition: "Curvatura > 60° ou Ampulheta + Ereção boa", arrow: "→", treatment: "Incisão de placa + Enxerto", color: "emerald" },
  { condition: "Curvatura + Disfunção Erétil refratária", arrow: "→", treatment: "Prótese Peniana Inflável (IPP)", color: "violet" },
];

const faqs = [
  {
    q: "A Doença de Peyronie é câncer?",
    a: "Não. A Doença de Peyronie é uma condição benigna causada por fibrose da túnica albugínea do pênis. Não é câncer e não se transforma em câncer. É uma doença fibromatosa, semelhante à contratura de Dupuytren nas mãos.",
  },
  {
    q: "A curvatura pode melhorar sozinha?",
    a: "Em alguns casos, sim. Dados sugerem que a dor geralmente resolve espontaneamente em 12-18 meses. Quanto à curvatura, homens mais jovens e com sintomas há menos de 6 meses podem ter alguma melhora. Porém, na maioria dos pacientes, a curvatura estabiliza sem melhora significativa, e em alguns pode piorar.",
  },
  {
    q: "Quando devo procurar um urologista?",
    a: "Procure um urologista assim que notar curvatura peniana nova, dor durante a ereção, nódulo palpável no pênis ou dificuldade para relações sexuais. O diagnóstico e acompanhamento precoces são importantes para definir a fase da doença e iniciar o tratamento adequado.",
  },
  {
    q: "O Xiaflex (CCH) está disponível no Brasil?",
    a: "A colagenase Clostridium histolyticum (Xiaflex) tem disponibilidade variável. É o único tratamento intralesional com evidência de nível 1 (Grau A — EAU 2025) para redução de curvatura em pacientes com doença estável, curvatura entre 30-90° e função erétil preservada. Consulte seu urologista sobre a disponibilidade atual.",
  },
  {
    q: "Qual a diferença entre plicatura e enxerto?",
    a: "A plicatura (Nesbit) encurta o lado mais longo do pênis para retificá-lo — é mais simples, mas causa algum encurtamento (1-2 cm). É indicada para curvaturas < 60° com comprimento adequado. O enxerto alonga o lado mais curto após incisão da placa — preserva o comprimento, mas é mais complexo e tem maior risco de disfunção erétil (5-25%). É indicado para curvaturas > 60° ou deformidade em ampulheta.",
  },
  {
    q: "Quando a prótese peniana é indicada?",
    a: "A prótese peniana inflável é indicada quando o paciente tem Doença de Peyronie associada a disfunção erétil moderada a grave que não responde a medicamentos (iPDE5). É a única opção que resolve simultaneamente a curvatura e a disfunção erétil, com satisfação de 85-95% (Grau A — EAU 2025).",
  },
  {
    q: "A cirurgia pode piorar a ereção?",
    a: "Depende da técnica. A plicatura tem baixo risco de disfunção erétil (< 5%). A incisão com enxerto tem risco de 5-25% de DE, especialmente em curvaturas graves ou deformidades complexas. A prótese peniana, por outro lado, restaura a ereção em pacientes que já tinham DE. A escolha da técnica leva em conta a função erétil pré-operatória.",
  },
  {
    q: "Existe relação entre Peyronie e Dupuytren?",
    a: "Sim. A Doença de Peyronie faz parte do espectro das doenças fibromatosas. Cerca de 10-40% dos pacientes com Peyronie têm contratura de Dupuytren (fibrose na palma da mão) e/ou doença de Ledderhose (fibrose na planta do pé). Por isso, o exame físico deve incluir avaliação das mãos e pés.",
  },
];

const references = [
  { num: 1, text: "Salonia A et al. EAU Guidelines on Sexual and Reproductive Health — Penile Curvature. European Association of Urology, 2025." },
  { num: 2, text: "Nehra A et al. Peyronie's Disease: AUA Guideline. J Urol. 2015;194(3):745-753. doi:10.1016/j.juro.2015.05.098" },
  { num: 3, text: "Ziegelmann MJ et al. Peyronie's Disease: AUA Guideline Amendment. J Urol. 2022;207(3):566-573. doi:10.1097/JU.0000000000002420" },
  { num: 4, text: "Gelbard M et al. Clinical efficacy, safety and tolerability of collagenase Clostridium histolyticum for the treatment of Peyronie disease in 2 large double-blind, randomized, placebo controlled phase 3 studies. J Urol. 2013;190(1):199-207." },
  { num: 5, text: "Levine LA, Larsen SM. Surgery for Peyronie's disease. Asian J Androl. 2013;15(1):27-34. doi:10.1038/aja.2012.92" },
  { num: 6, text: "Ralph D et al. The management of Peyronie's disease: evidence-based 2010 guidelines. J Sex Med. 2010;7(7):2359-2374." },
  { num: 7, text: "Mulhall JP et al. Subjective and objective analysis of the prevalence of Peyronie's disease in a population of men presenting for prostate cancer screening. J Urol. 2004;171(6 Pt 1):2350-2353." },
  { num: 8, text: "Wein AJ, Kavoussi LR, Partin AW, Peters CA. Campbell-Walsh-Wein Urology. 13th ed. Elsevier; 2024. Chapter 73: Peyronie's Disease." },
  { num: 9, text: "Hellstrom WJ et al. Implants, mechanical devices, and vascular surgery for erectile dysfunction. J Sex Med. 2010;7(1 Pt 2):501-523." },
  { num: 10, text: "Chung E et al. Penile prosthesis implantation for the management of Peyronie's disease. Transl Androl Urol. 2017;6(Suppl 5):S815-S823." },
];

const colorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
  teal: { bg: "bg-teal-500", text: "text-teal-700", border: "border-teal-200", light: "bg-teal-50" },
  red: { bg: "bg-red-500", text: "text-red-700", border: "border-red-200", light: "bg-red-50" },
  blue: { bg: "bg-blue-500", text: "text-blue-700", border: "border-blue-200", light: "bg-blue-50" },
  emerald: { bg: "bg-emerald-500", text: "text-emerald-700", border: "border-emerald-200", light: "bg-emerald-50" },
  violet: { bg: "bg-violet-500", text: "text-violet-700", border: "border-violet-200", light: "bg-violet-50" },
};

/* ========== COMPONENT ========== */

export default function DoencaPeyronie() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openSurgery, setOpenSurgery] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <EducationalLayout
      title="Doença de Peyronie"
      subtitle="Curvatura Peniana Adquirida: Diagnóstico e Tratamentos Baseados em Evidências"
      description="Guia completo sobre a Doença de Peyronie: fases da doença, diagnóstico, tratamento conservador (CCH/Xiaflex, tração, injeções intralesionais), cirurgia (plicatura, enxerto, prótese peniana). Baseado nas guidelines EAU 2025 e AUA."
      accentColor="#7C3AED"
      metaTitle="Doença de Peyronie: Curvatura Peniana — Tratamentos | Dr. Felipe de Bulhões"
      metaDescription="Guia completo sobre Doença de Peyronie (curvatura peniana adquirida). Xiaflex, plicatura, enxerto, prótese peniana. EAU 2025 + AUA. Urologista em São Paulo e Campinas."
    >
      <FAQSchema questions={faqs.map(item => ({ question: item.q, answer: item.a }))} />

      {/* Imagem Ilustrativa */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/peyronie-hero-PZ4avfGPN6TNxMX6qqECke.webp"
              alt="Doença de Peyronie — tratamento e correção da curvatura peniana"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Introdução */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">O Que é a Doença de Peyronie?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                A <strong>Doença de Peyronie (DP)</strong> é uma condição adquirida caracterizada pela formação de
                uma <strong>placa fibrótica na túnica albugínea</strong> do pênis, resultando em curvatura peniana,
                dor durante a ereção, possível encurtamento do pênis e, frequentemente, disfunção erétil e sofrimento
                psicológico significativo.
              </p>
              <p>
                A prevalência varia de <strong>0,7% a 20,3%</strong> dependendo da metodologia e população estudada,
                com incidência de 19,6-23 casos por 100.000 homens/ano. A idade típica de apresentação é entre
                50-60 anos, embora possa ocorrer em homens mais jovens (1,5-16,9% dos casos em menores de 40 anos).
                Estudos recentes sugerem que a doença é significativamente <strong>subdiagnosticada</strong>.
              </p>
              <p>
                O mecanismo mais aceito envolve <strong>microtrauma repetitivo</strong> durante a atividade sexual,
                desencadeando uma cascata inflamatória com deposição excessiva de colágeno na túnica albugínea. A
                placa resultante reduz a elasticidade local, causando curvatura durante a ereção. A DP faz parte do
                espectro das <strong>doenças fibromatosas</strong>, com associação frequente à contratura de Dupuytren
                (mãos) e doença de Ledderhose (pés).
              </p>
            </div>
          </motion.div>

          {/* Estatísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
          >
            {[
              { value: "0,7-20%", label: "Prevalência estimada" },
              { value: "50-60", label: "Idade típica (anos)" },
              { value: "30-70%", label: "Associação com DE" },
              { value: "10-40%", label: "Associação com Dupuytren" },
            ].map((stat, i) => (
              <div key={i} className="bg-violet-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-violet-700">{stat.value}</p>
                <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Fases da Doença */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Fases da Doença</h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Distinguir entre fase aguda e crônica é fundamental — as opções de tratamento são diferentes em cada fase.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {diseasePhases.map((phase, i) => {
              const colors = colorMap[phase.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`bg-white rounded-xl border ${colors.border} p-6 shadow-sm`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                      <phase.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{phase.phase}</h3>
                      <p className="text-xs text-gray-500">{phase.duration}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {phase.characteristics.map((c, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                        <CircleDot className={`w-4 h-4 ${colors.text} shrink-0 mt-0.5`} />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`${colors.light} rounded-lg p-3`}>
                    <p className="text-sm"><strong className={colors.text}>Conduta:</strong> <span className="text-gray-700">{phase.treatment}</span></p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Diagnóstico */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Investigação Diagnóstica</h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Avaliação sistemática em 4 etapas — EAU Guidelines 2025
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {diagnosticSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-sm">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{step.title}</h3>
                    <span className="text-xs text-violet-600 font-medium">{step.evidence}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">{step.description}</p>
                <ul className="space-y-1.5">
                  {step.details.map((d, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-3.5 h-3.5 text-violet-500 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tratamento Conservador */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Tratamento Conservador</h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Opções não cirúrgicas baseadas em evidências — EAU 2025 e AUA
            </p>
          </motion.div>

          {conservativeTreatments.map((category, ci) => {
            const catColors = colorMap[category.color] || colorMap.blue;
            return (
              <motion.div
                key={ci}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-lg ${catColors.bg} flex items-center justify-center`}>
                    <category.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                </div>
                <div className="space-y-3">
                  {category.treatments.map((tx, ti) => (
                    <div
                      key={ti}
                      className={`bg-white rounded-xl border p-5 ${"highlight" in tx && tx.highlight ? "border-violet-300 ring-1 ring-violet-100" : "border-gray-200"}`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{tx.name}</h4>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {tx.recommended ? (
                            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Recomendado</span>
                          ) : (
                            <span className="text-xs font-medium text-red-700 bg-red-50 px-2 py-0.5 rounded-full">Não recomendado</span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2"><strong>Mecanismo:</strong> {tx.mechanism}</p>
                      <p className="text-sm text-gray-600 mb-2"><strong>Indicação:</strong> {tx.indication}</p>
                      {"warning" in tx && tx.warning && (
                        <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-1.5 mb-2">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>{tx.warning as string}</span>
                        </div>
                      )}
                      <div className="grid md:grid-cols-2 gap-2 mt-2">
                        <div className="bg-blue-50 rounded-lg px-3 py-2">
                          <p className="text-xs font-medium text-blue-700">EAU 2025</p>
                          <p className="text-xs text-gray-700">{tx.eau}</p>
                        </div>
                        <div className="bg-indigo-50 rounded-lg px-3 py-2">
                          <p className="text-xs font-medium text-indigo-700">AUA</p>
                          <p className="text-xs text-gray-700">{tx.aua}</p>
                        </div>
                      </div>
                      {"details" in tx && tx.details && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <ul className="space-y-1">
                            {(tx.details as string[]).map((d: string, di: number) => (
                              <li key={di} className="flex items-start gap-2 text-sm text-gray-600">
                                <ArrowRight className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Algoritmo Cirúrgico */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Algoritmo de Decisão Cirúrgica</h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Pré-requisito: doença estável por ≥ 3-6 meses, curvatura funcionalmente significativa — EAU 2025 / AUA
            </p>
          </motion.div>
          <div className="space-y-4">
            {surgicalAlgorithm.map((item, i) => {
              const colors = colorMap[item.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 border border-gray-200"
                >
                  <div className="flex-1 text-sm text-gray-700 font-medium">{item.condition}</div>
                  <ArrowRight className="w-5 h-5 text-gray-400 shrink-0" />
                  <div className={`${colors.light} ${colors.text} rounded-lg px-4 py-2 text-sm font-semibold shrink-0`}>
                    {item.treatment}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Opções Cirúrgicas Detalhadas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Opções Cirúrgicas</h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Três abordagens principais, escolhidas conforme grau de curvatura e função erétil
            </p>
          </motion.div>
          <div className="space-y-4">
            {surgicalOptions.map((option, i) => {
              const colors = colorMap[option.color];
              const isOpen = openSurgery === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-white rounded-xl border ${isOpen ? colors.border : "border-gray-200"} shadow-sm overflow-hidden`}
                >
                  <button
                    onClick={() => setOpenSurgery(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                        <option.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{option.name}</h3>
                        <p className="text-xs text-gray-500">{option.indication}</p>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>
                  {isOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-5 border-t border-gray-100 pt-4">
                      <p className="text-gray-700 mb-4">{option.description}</p>
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm font-semibold text-gray-800 mb-1">Como funciona:</p>
                        <p className="text-sm text-gray-600">{option.howItWorks}</p>
                      </div>
                      <div className={`${colors.light} rounded-lg p-4 mb-4`}>
                        <p className="text-sm font-semibold ${colors.text} mb-1">Resultados:</p>
                        <p className="text-sm text-gray-700">{option.results}</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3 mb-4">
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-xs font-medium text-blue-700">EAU 2025</p>
                          <p className="text-xs text-gray-700">{option.eau}</p>
                        </div>
                        <div className="bg-indigo-50 rounded-lg p-3">
                          <p className="text-xs font-medium text-indigo-700">AUA</p>
                          <p className="text-xs text-gray-700">{option.aua}</p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-semibold text-emerald-700 mb-2">Vantagens</p>
                          <ul className="space-y-1.5">
                            {option.pros.map((p, pi) => (
                              <li key={pi} className="flex items-start gap-2 text-sm text-gray-600">
                                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-red-700 mb-2">Limitações</p>
                          <ul className="space-y-1.5">
                            {option.cons.map((c, ci) => (
                              <li key={ci} className="flex items-start gap-2 text-sm text-gray-600">
                                <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impacto Psicossocial */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Impacto Psicossocial</h2>
            <div className="bg-violet-50 rounded-2xl p-6 md:p-8 border border-violet-100">
              <div className="flex items-start gap-3 mb-4">
                <Heart className="w-6 h-6 text-violet-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">A Doença de Peyronie vai além da curvatura</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Muitos homens com DP experimentam sofrimento emocional significativo, sintomas depressivos e dificuldades
                    no relacionamento. O impacto psicológico é frequentemente subestimado.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { stat: "54%", desc: "relatam dificuldades no relacionamento" },
                  { stat: "48%", desc: "apresentam sintomas depressivos" },
                  { stat: "81%", desc: "relatam impacto na autoimagem masculina" },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-violet-700">{item.stat}</p>
                    <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                O acompanhamento psicológico e a comunicação aberta com o parceiro(a) são componentes importantes do
                tratamento. Não hesite em discutir esses aspectos com seu urologista.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Perguntas Frequentes</h2>
            <p className="text-gray-600 text-center mb-10">Dúvidas comuns sobre a Doença de Peyronie</p>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-4 pb-4 text-gray-600 border-t border-gray-100 pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Referências */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Referências</h2>
            <ol className="space-y-2">
              {references.map((ref) => (
                <li key={ref.num} className="text-sm text-gray-600 flex gap-2">
                  <span className="font-semibold text-gray-500 shrink-0">{ref.num}.</span>
                  <span>{ref.text}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>
    </EducationalLayout>
  );
}
