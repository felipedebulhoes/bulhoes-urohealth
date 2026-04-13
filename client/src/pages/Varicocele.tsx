/**
 * Design: Clinical Precision — Swiss Medical Design
 * Page: Varicocele — Causas, Diagnóstico e Tratamento
 * Referências: EAU Guidelines on Sexual and Reproductive Health 2025, AUA/ASRM Male Infertility Guideline 2024, Campbell-Walsh-Wein 13th Ed.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import EducationalLayout from "@/components/EducationalLayout";
import { FAQSchema } from "@/components/SchemaMarkup";
import {
  Activity, AlertTriangle, ArrowRight, Baby, Check, ChevronDown,
  ChevronUp, Clock, Dna, FlaskConical, Heart, Microscope, Pill,
  Search, Shield, Stethoscope, Target, Thermometer, TrendingUp,
  Users, Wrench, Zap, CircleDot, Scissors, Waves, Syringe
} from "lucide-react";

/* ─── DATA ─── */

const grading = [
  {
    grade: "Subclínica",
    description: "Não palpável, detectada apenas por ultrassonografia com Doppler.",
    exam: "Ultrassom Doppler",
    color: "gray",
    treatment: "Não há indicação de tratamento cirúrgico.",
  },
  {
    grade: "Grau I",
    description: "Palpável apenas durante a manobra de Valsalva (esforço abdominal).",
    exam: "Palpação + Valsalva",
    color: "yellow",
    treatment: "Tratamento indicado se houver infertilidade com espermograma alterado.",
  },
  {
    grade: "Grau II",
    description: "Palpável sem necessidade de Valsalva, mas não visível.",
    exam: "Palpação direta",
    color: "orange",
    treatment: "Tratamento indicado se houver infertilidade com espermograma alterado.",
  },
  {
    grade: "Grau III",
    description: "Visível e palpável à inspeção (aspecto de 'saco de vermes').",
    exam: "Inspeção visual",
    color: "red",
    treatment: "Tratamento geralmente indicado, especialmente se associado a infertilidade ou dor.",
  },
];

const symptoms = [
  { icon: Activity, title: "Dor ou desconforto escrotal", description: "Dor surda ou sensação de peso no escroto, que piora ao ficar em pé por longos períodos ou ao final do dia e melhora ao deitar." },
  { icon: TrendingUp, title: "Aumento de volume escrotal", description: "Inchaço visível ou palpável no escroto, geralmente mais evidente do lado esquerdo (85-90% dos casos)." },
  { icon: Baby, title: "Dificuldade para engravidar", description: "A varicocele é a causa tratável mais comum de infertilidade masculina, presente em 35-40% dos homens com infertilidade primária." },
  { icon: Thermometer, title: "Assintomática", description: "Muitos homens com varicocele não apresentam nenhum sintoma. O diagnóstico pode ser feito incidentalmente durante exame físico de rotina." },
];

const diagnosticSteps = [
  {
    step: 1,
    title: "Exame Físico",
    icon: Stethoscope,
    description: "Realizado com o paciente em pé. Palpação do cordão espermático em repouso e durante manobra de Valsalva. Avaliação do volume testicular com orquidômetro de Prader.",
    evidence: "Recomendação Forte — EAU 2025",
  },
  {
    step: 2,
    title: "Espermograma",
    icon: Microscope,
    description: "Análise seminal com 2-7 dias de abstinência. Avalia concentração, motilidade, morfologia e vitalidade espermática. Se alterado, repetir em 4-6 semanas para confirmação.",
    evidence: "Recomendação Forte — EAU 2025 / AUA 2024",
  },
  {
    step: 3,
    title: "Ultrassonografia Escrotal com Doppler",
    icon: Waves,
    description: "Confirma o diagnóstico, mede o diâmetro das veias (> 3mm é sugestivo), avalia refluxo venoso durante Valsalva e permite medir o volume testicular com precisão.",
    evidence: "Recomendação Forte — EAU 2025",
  },
  {
    step: 4,
    title: "Avaliação Hormonal",
    icon: FlaskConical,
    description: "Dosagem de FSH, LH, testosterona total e livre. Importante para avaliar a função testicular endócrina, especialmente em pacientes com suspeita de hipogonadismo associado.",
    evidence: "Recomendação Forte — EAU 2025 / AUA 2024",
  },
  {
    step: 5,
    title: "Fragmentação do DNA Espermático (SDF)",
    icon: Dna,
    description: "Teste complementar que avalia a integridade do DNA dos espermatozoides. A varicocele está associada a aumento da SDF, e a correção pode reduzir significativamente esses níveis.",
    evidence: "Nível de Evidência 2a — EAU 2025",
  },
];

const treatmentOptions = [
  {
    name: "Varicocelectomia Microcirúrgica Subinguinal",
    icon: Microscope,
    badge: "Padrão-Ouro",
    badgeColor: "teal",
    description: "Técnica realizada com auxílio de microscópio cirúrgico através de incisão subinguinal. Permite identificação precisa e ligadura das veias dilatadas, preservando a artéria testicular e os vasos linfáticos.",
    pros: [
      "Menor taxa de recorrência (0,8-4%)",
      "Menor taxa de hidrocele pós-operatória",
      "Preservação da artéria testicular",
      "Preservação dos linfáticos (menos hidrocele)",
      "Anestesia local ou raquianestesia",
    ],
    cons: [
      "Requer microscópio cirúrgico e treinamento especializado",
      "Tempo cirúrgico um pouco maior",
    ],
    recurrence: "0,8-4%",
    complications: "< 5%",
  },
  {
    name: "Varicocelectomia Laparoscópica",
    icon: Target,
    badge: "Minimamente Invasiva",
    badgeColor: "blue",
    description: "Abordagem por videolaparoscopia com ligadura das veias espermáticas internas no nível retroperitoneal. Permite visualização ampliada e tratamento bilateral simultâneo.",
    pros: [
      "Boa visualização das estruturas",
      "Possibilidade de tratamento bilateral",
      "Recuperação relativamente rápida",
    ],
    cons: [
      "Requer anestesia geral",
      "Risco de lesão de órgãos abdominais (raro)",
      "Taxa de recorrência intermediária",
    ],
    recurrence: "3-7%",
    complications: "5-10%",
  },
  {
    name: "Ligadura Inguinal (Ivanissevich)",
    icon: Scissors,
    badge: "Técnica Clássica",
    badgeColor: "amber",
    description: "Abordagem inguinal aberta com ligadura das veias espermáticas. Técnica bem estabelecida, mas com taxas de recorrência e complicações superiores à microcirurgia.",
    pros: [
      "Técnica amplamente conhecida",
      "Não requer microscópio",
      "Pode ser realizada com anestesia local",
    ],
    cons: [
      "Maior risco de lesão da artéria testicular",
      "Maior taxa de hidrocele",
      "Taxa de recorrência mais alta",
    ],
    recurrence: "5-15%",
    complications: "10-15%",
  },
  {
    name: "Embolização Percutânea",
    icon: Syringe,
    badge: "Radiologia Intervencionista",
    badgeColor: "purple",
    description: "Procedimento minimamente invasivo realizado por radiologista intervencionista. Cateter inserido pela veia femoral ou jugular para embolizar as veias espermáticas com molas ou esclerosante.",
    pros: [
      "Sem incisão cirúrgica",
      "Recuperação mais rápida",
      "Pode ser ambulatorial",
      "Anestesia local",
    ],
    cons: [
      "Taxa de recorrência mais alta que microcirurgia",
      "Risco de falha técnica (1-9%)",
      "Exposição à radiação",
      "Nem sempre disponível",
    ],
    recurrence: "5-11%",
    complications: "5-10%",
  },
];

const indications = [
  {
    category: "Indicações de Tratamento",
    icon: Check,
    color: "teal",
    items: [
      "Varicocele clínica (palpável) + espermograma alterado + infertilidade inexplicada",
      "Parceira com boa reserva ovariana (fator importante na decisão)",
      "Adolescentes com varicocele e testículo ipsilateral persistentemente menor (diferença > 2 mL ou 20%)",
      "Dor escrotal crônica atribuível à varicocele, refratária ao tratamento clínico",
      "Hipogonadismo associado a varicocele clínica",
      "Fragmentação do DNA espermático (SDF) elevada com falha de reprodução assistida",
    ],
  },
  {
    category: "Contraindicações / Sem Indicação",
    icon: AlertTriangle,
    color: "red",
    items: [
      "Varicocele subclínica (detectada apenas por ultrassom) — NÃO tratar",
      "Espermograma normal em homem infértil — NÃO tratar varicocele",
      "Varicocele assintomática sem desejo reprodutivo e sem alterações seminais",
    ],
  },
];

const references = [
  { num: 1, text: "EAU Guidelines on Sexual and Reproductive Health: 2025 Update on Male Infertility. Eur Urol. 2025;87:601-616." },
  { num: 2, text: "Schlegel PN, et al. Diagnosis and Treatment of Infertility in Men: AUA/ASRM Guideline Part I. J Urol. 2021;205(1):36-43." },
  { num: 3, text: "Schlegel PN, et al. Diagnosis and Treatment of Infertility in Men: AUA/ASRM Guideline Part II. Fertil Steril. 2021;115(1):62-69." },
  { num: 4, text: "Kim DK, et al. Recent Guidelines and Perspectives for Varicocele. World J Mens Health. 2025;43(1):1-14." },
  { num: 5, text: "Takács T, et al. Recent Trends in the Management of Varicocele. J Clin Med. 2025;14(3):892." },
  { num: 6, text: "Esteves SC, et al. Varicocele repair improves semen parameters in infertile men: a meta-analysis. Fertil Steril. 2012;98(6):1562-1569." },
  { num: 7, text: "Baazeem A, et al. Varicocele and male factor infertility treatment: a new meta-analysis and review. Asian J Androl. 2011;13(3):443-449." },
  { num: 8, text: "Kroese AC, et al. Surgery or embolization for varicoceles in subfertile men. Cochrane Database Syst Rev. 2012;10:CD000479." },
  { num: 9, text: "Zini A, et al. Varicocele is associated with abnormal retention of cytoplasmic droplets by human spermatozoa. Fertil Steril. 2000;74(3):461-464." },
  { num: 10, text: "Campbell-Walsh-Wein Urology, 13th Edition — Chapter on Male Infertility. Elsevier, 2024." },
];

const faqItems = [
  {
    question: "A varicocele sempre causa infertilidade?",
    answer: "Não. Muitos homens com varicocele têm fertilidade normal. Estima-se que 15% dos homens da população geral tenham varicocele, mas apenas uma parcela apresenta alterações na qualidade do sêmen. A varicocele é encontrada em 35-40% dos homens com infertilidade primária e até 80% com infertilidade secundária, mas a relação causa-efeito nem sempre é direta.",
  },
  {
    question: "A varicocele pode voltar após a cirurgia?",
    answer: "Sim, existe uma taxa de recorrência que varia conforme a técnica utilizada. A varicocelectomia microcirúrgica subinguinal tem a menor taxa de recorrência (0,8-4%), enquanto técnicas como a ligadura retroperitoneal (Palomo) podem ter recorrência de até 15-25%. Por isso, a microcirurgia é considerada o padrão-ouro.",
  },
  {
    question: "A cirurgia de varicocele melhora a testosterona?",
    answer: "Sim. Uma meta-análise com 712 homens demonstrou que a varicocelectomia está associada a aumento significativo da testosterona sérica. Homens com varicocele clínica e hipogonadismo podem se beneficiar da correção cirúrgica, com melhora dos níveis hormonais e dos sintomas associados à deficiência de testosterona.",
  },
  {
    question: "Quanto tempo após a cirurgia posso ver melhora no espermograma?",
    answer: "A espermatogênese (produção de espermatozoides) leva aproximadamente 72 dias para completar um ciclo. Portanto, a melhora nos parâmetros seminais geralmente é observada entre 3 e 6 meses após a cirurgia, com resultados máximos em 6 a 12 meses.",
  },
  {
    question: "Varicocele causa dor?",
    answer: "A maioria das varicoceles é assintomática. Quando há dor, geralmente é uma dor surda ou sensação de peso no escroto que piora ao ficar em pé por longos períodos, durante exercícios físicos ou ao final do dia, e melhora ao deitar. Dor intensa é incomum e deve ser investigada para excluir outras causas.",
  },
  {
    question: "Adolescentes devem operar varicocele?",
    answer: "Segundo as EAU Guidelines 2025, a cirurgia em adolescentes é indicada quando há varicocele associada a testículo ipsilateral persistentemente menor (diferença de volume > 2 mL ou > 20%), confirmada em duas avaliações com intervalo de 6 meses. A maioria dos adolescentes com varicocele não terá problemas de fertilidade no futuro, portanto há risco de sobretratamento.",
  },
];

/* ─── COMPONENT ─── */

export default function Varicocele() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedTreatment, setExpandedTreatment] = useState<number | null>(0);

  const colorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
    gray: { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300", light: "bg-gray-50" },
    yellow: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-300", light: "bg-yellow-50" },
    orange: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300", light: "bg-orange-50" },
    red: { bg: "bg-red-100", text: "text-red-700", border: "border-red-300", light: "bg-red-50" },
    teal: { bg: "bg-teal-100", text: "text-teal-700", border: "border-teal-300", light: "bg-teal-50" },
    blue: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300", light: "bg-blue-50" },
    amber: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300", light: "bg-amber-50" },
    purple: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300", light: "bg-purple-50" },
  };

  return (
    <EducationalLayout
      title="Varicocele"
      subtitle="Causas, Diagnóstico e Tratamento"
      description="Entenda o que é varicocele, como é diagnosticada, quando o tratamento é indicado e quais são as técnicas cirúrgicas disponíveis. Baseado nas EAU Guidelines 2025 e AUA/ASRM 2024."
      accentColor="#0D9488"
      metaTitle="Varicocele: Causas, Diagnóstico e Tratamento | Dr. Felipe de Bulhões"
      metaDescription="Tudo sobre varicocele: o que é, sintomas, classificação, diagnóstico e tratamento cirúrgico. Varicocelectomia microcirúrgica é o padrão-ouro. Baseado nas EAU Guidelines 2025."
    >
      <FAQSchema questions={faqItems} />

      {/* O que é Varicocele */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                <Search className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">O que é Varicocele?</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  A <strong>varicocele</strong> é a dilatação anormal das veias do <strong>plexo pampiniforme</strong> no escroto — a rede de veias que drena o sangue dos testículos. É semelhante às varizes que ocorrem nas pernas, mas localizada no escroto.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Afeta aproximadamente <strong>15% dos homens</strong> da população geral e é a <strong>causa tratável mais comum de infertilidade masculina</strong>, sendo encontrada em 35-40% dos homens com infertilidade primária e até 80% com infertilidade secundária.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A varicocele ocorre predominantemente do <strong>lado esquerdo</strong> (85-90% dos casos), devido à anatomia da veia espermática esquerda, que drena em ângulo reto na veia renal esquerda, criando maior pressão hidrostática. Pode ser bilateral em 10-15% dos casos.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/edu-varicocele-hero-599XQPQfjE7X8GrKiTmeJT.webp"
                  alt="Ilustração anatômica da varicocele"
                  className="w-full rounded-xl"
                />
                <p className="text-sm text-gray-500 mt-3 text-center">
                  Comparação entre lado com varicocele (esquerdo) e lado normal (direito)
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fisiopatologia */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Como a Varicocele Afeta a Fertilidade?</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-8 max-w-3xl">
              A varicocele pode comprometer a função testicular por múltiplos mecanismos. A presença de veias dilatadas causa estase venosa e aumento da temperatura escrotal, que é prejudicial à espermatogênese.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Thermometer, title: "Aumento da Temperatura", text: "A estase venosa eleva a temperatura escrotal em 1-2°C. A espermatogênese ideal ocorre 2-3°C abaixo da temperatura corporal." },
                { icon: Activity, title: "Estresse Oxidativo", text: "O refluxo venoso aumenta a produção de espécies reativas de oxigênio (ROS), causando dano ao DNA espermático e às membranas celulares." },
                { icon: Zap, title: "Refluxo de Metabólitos", text: "Refluxo de metabólitos adrenais e renais para as veias testiculares pode ter efeito tóxico direto sobre as células germinativas." },
                { icon: TrendingUp, title: "Hipóxia Testicular", text: "A estase venosa reduz a oxigenação do tecido testicular, comprometendo a espermatogênese e a produção hormonal." },
                { icon: Dna, title: "Fragmentação do DNA", text: "Meta-análise demonstrou que a varicocele está associada a aumento da fragmentação do DNA espermático (SDF), que pode comprometer a fertilização e o desenvolvimento embrionário." },
                { icon: Pill, title: "Disfunção Hormonal", text: "A varicocele pode reduzir a produção de testosterona pelas células de Leydig, levando a hipogonadismo subclínico ou clínico." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <item.icon className="w-8 h-8 text-teal-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sintomas */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Sintomas</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {symptoms.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Classificação */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                <CircleDot className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Classificação</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-8 max-w-3xl">
              A varicocele é classificada em graus conforme o exame físico. A classificação mais utilizada é a de <strong>Dubin & Amelar</strong>, que divide em três graus clínicos além da varicocele subclínica.
            </p>
            <div className="space-y-4">
              {grading.map((g, i) => {
                const colors = colorMap[g.color] || colorMap.gray;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-xl border ${colors.border} ${colors.light}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className={`px-4 py-2 rounded-lg ${colors.bg} ${colors.text} font-bold text-lg flex-shrink-0 text-center min-w-[120px]`}>
                        {g.grade}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{g.description}</p>
                        <p className="text-sm text-gray-500 mt-1"><strong>Diagnóstico:</strong> {g.exam}</p>
                        <p className="text-sm text-gray-600 mt-1"><strong>Conduta:</strong> {g.treatment}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Diagnóstico */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Investigação Diagnóstica</h2>
            </div>
            <div className="space-y-6">
              {diagnosticSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {step.step}
                    </div>
                    {i < diagnosticSteps.length - 1 && <div className="w-0.5 h-12 bg-teal-200 mt-2" />}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className="w-5 h-5 text-teal-600" />
                      <h3 className="font-bold text-gray-900 text-lg">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-2">{step.description}</p>
                    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-teal-100 text-teal-700">{step.evidence}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Indicações de Tratamento */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Quando Tratar?</h2>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
              <p className="text-amber-800 font-medium">
                <strong>Importante:</strong> A decisão de tratar a varicocele deve ser individualizada, levando em consideração a idade do casal, a reserva ovariana da parceira, os parâmetros seminais e o desejo reprodutivo.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {indications.map((ind, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`rounded-xl border p-6 ${
                    ind.color === "teal" ? "bg-teal-50 border-teal-200" : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <ind.icon className={`w-6 h-6 ${ind.color === "teal" ? "text-teal-600" : "text-red-600"}`} />
                    <h3 className={`font-bold text-lg ${ind.color === "teal" ? "text-teal-800" : "text-red-800"}`}>{ind.category}</h3>
                  </div>
                  <ul className="space-y-3">
                    {ind.items.map((item, j) => (
                      <li key={j} className="flex gap-2 items-start">
                        <span className={`mt-1 flex-shrink-0 ${ind.color === "teal" ? "text-teal-600" : "text-red-500"}`}>
                          {ind.color === "teal" ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                        </span>
                        <span className={`text-sm leading-relaxed ${ind.color === "teal" ? "text-teal-700" : "text-red-700"}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Opções de Tratamento */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Opções de Tratamento Cirúrgico</h2>
            </div>
            <div className="space-y-4">
              {treatmentOptions.map((t, i) => {
                const colors = colorMap[t.badgeColor] || colorMap.teal;
                const isExpanded = expandedTreatment === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`rounded-xl border transition-all ${
                      i === 0 ? "border-teal-300 shadow-md" : "border-gray-200"
                    }`}
                  >
                    <button
                      onClick={() => setExpandedTreatment(isExpanded ? null : i)}
                      className="w-full p-6 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                          <t.icon className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="font-bold text-gray-900">{t.name}</h3>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.bg} ${colors.text}`}>{t.badge}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Recorrência: {t.recurrence} | Complicações: {t.complications}</p>
                        </div>
                      </div>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </button>
                    {isExpanded && (
                      <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                        <p className="text-gray-700 leading-relaxed mb-4">{t.description}</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-green-50 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2"><Check className="w-4 h-4" /> Vantagens</h4>
                            <ul className="space-y-1">
                              {t.pros.map((p, j) => (
                                <li key={j} className="text-sm text-green-700 flex gap-2"><span className="text-green-500 mt-0.5">+</span>{p}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-red-50 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Limitações</h4>
                            <ul className="space-y-1">
                              {t.cons.map((c, j) => (
                                <li key={j} className="text-sm text-red-700 flex gap-2"><span className="text-red-500 mt-0.5">-</span>{c}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabela Comparativa */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Comparativo das Técnicas Cirúrgicas</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
                <thead>
                  <tr className="bg-teal-600 text-white">
                    <th className="px-4 py-3 text-left text-sm font-semibold">Técnica</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Recorrência</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Complicações</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Anestesia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 bg-teal-50">
                    <td className="px-4 py-3 font-semibold text-teal-800">Microcirúrgica Subinguinal</td>
                    <td className="px-4 py-3 text-center text-sm font-bold text-green-600">0,8-4%</td>
                    <td className="px-4 py-3 text-center text-sm">{'< 5%'}</td>
                    <td className="px-4 py-3 text-center text-sm">Local / Raqui</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800">Laparoscópica</td>
                    <td className="px-4 py-3 text-center text-sm">3-7%</td>
                    <td className="px-4 py-3 text-center text-sm">5-10%</td>
                    <td className="px-4 py-3 text-center text-sm">Geral</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800">Inguinal (Ivanissevich)</td>
                    <td className="px-4 py-3 text-center text-sm">5-15%</td>
                    <td className="px-4 py-3 text-center text-sm">10-15%</td>
                    <td className="px-4 py-3 text-center text-sm">Local / Raqui</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800">Retroperitoneal (Palomo)</td>
                    <td className="px-4 py-3 text-center text-sm text-red-600 font-bold">15-25%</td>
                    <td className="px-4 py-3 text-center text-sm">10-15%</td>
                    <td className="px-4 py-3 text-center text-sm">Geral / Raqui</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-800">Embolização Percutânea</td>
                    <td className="px-4 py-3 text-center text-sm">5-11%</td>
                    <td className="px-4 py-3 text-center text-sm">5-10%</td>
                    <td className="px-4 py-3 text-center text-sm">Local</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">Fonte: EAU Guidelines 2025, Tabela 11.3</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Perguntas Frequentes</h2>
            <div className="space-y-3">
              {faqItems.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    {openFaq === i ? <ChevronUp className="w-5 h-5 text-teal-600 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Avaliação Especializada em Varicocele</h2>
            <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
              O diagnóstico precoce e o tratamento adequado podem preservar a fertilidade e melhorar a qualidade de vida.
              Agende uma consulta para avaliação individualizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5511981124455?text=Olá, gostaria de tirar dúvidas sobre varicocele."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors shadow-lg"
              >
                Agendar pelo WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://www.doctoralia.com.br/felipe-de-bulhoes/urologista/campinas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-400 transition-colors border border-teal-400"
              >
                Agendar pela Doctoralia
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Referências */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Referências</h2>
          <ol className="space-y-2">
            {references.map((ref) => (
              <li key={ref.num} className="text-sm text-gray-600 flex gap-2">
                <span className="font-semibold text-teal-700 flex-shrink-0">[{ref.num}]</span>
                <span>{ref.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </EducationalLayout>
  );
}
