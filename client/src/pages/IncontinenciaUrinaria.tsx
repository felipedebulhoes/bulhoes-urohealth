/*
 * Design: Clinical Precision — Swiss Medical Design
 * Page: Incontinência Urinária Masculina — Causas, Diagnóstico e Tratamentos
 * Referências: AUA/GURS/SUFU Guideline on IPT 2024, EAU Guidelines on Male LUTS 2025, Campbell-Walsh-Wein 13th Ed.
 */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import EducationalLayout from "@/components/EducationalLayout";
import { FAQSchema } from "@/components/SchemaMarkup";
import {
  Droplets, Shield, Activity, Dumbbell, Wrench, AlertTriangle,
  Check, ChevronDown, ChevronUp, Stethoscope, Clock, Target,
  ArrowRight, Users, TrendingUp, Zap, Heart
} from "lucide-react";

const types = [
  {
    name: "Incontinência de Esforço (IUE)",
    color: "teal",
    icon: Activity,
    description: "Perda involuntária de urina durante atividades que aumentam a pressão abdominal, como tossir, espirrar, rir, levantar peso ou praticar exercícios físicos.",
    causes: "Lesão do esfíncter uretral externo, geralmente após prostatectomia radical, cirurgia para HPB ou radioterapia pélvica.",
    prevalence: "Tipo mais comum de IU após tratamento prostático. Ocorre em 5-20% dos pacientes após prostatectomia radical a longo prazo.",
  },
  {
    name: "Incontinência de Urgência (IUU)",
    color: "violet",
    icon: Zap,
    description: "Perda involuntária de urina precedida por desejo súbito e intenso de urinar (urgência), que não pode ser adiado.",
    causes: "Hiperatividade do músculo detrusor (bexiga hiperativa), podendo ser idiopática ou secundária a obstrução prostática, radioterapia ou doenças neurológicas.",
    prevalence: "Segundo tipo mais comum. Pode coexistir com IUE (incontinência mista) em até 30% dos pacientes pós-prostatectomia.",
  },
  {
    name: "Incontinência por Transbordamento",
    color: "amber",
    icon: Droplets,
    description: "Perda involuntária de urina por bexiga cronicamente distendida, que ultrapassa a capacidade de armazenamento sem que haja contração eficiente.",
    causes: "Obstrução infravesical grave (HPB avançada, estenose uretral) ou hipocontratilidade do detrusor (diabetes, lesão neurológica).",
    prevalence: "Menos comum, mas importante diagnosticar pois o tratamento é diferente dos demais tipos.",
  },
  {
    name: "Incontinência Contínua",
    color: "red",
    icon: AlertTriangle,
    description: "Perda urinária constante, sem relação com esforço ou urgência. Gotejamento contínuo ao longo do dia e noite.",
    causes: "Lesão esfincteriana grave (deficiência esfincteriana intrínseca), fístula vesical ou destruição completa do mecanismo de continência.",
    prevalence: "Forma mais grave, geralmente pós-cirúrgica. Requer tratamento cirúrgico na maioria dos casos.",
  },
];

const severityScale = [
  { level: "Continência Social", pads: "≤ 1 absorvente/dia (tolerável)", color: "green", description: "Paciente considera-se socialmente continente. Pode usar um forro de segurança." },
  { level: "Leve", pads: "1-2 absorventes/dia", color: "yellow", description: "Perdas pequenas, geralmente aos grandes esforços. Tratamento conservador é a primeira opção." },
  { level: "Moderada", pads: "2-4 absorventes/dia", color: "orange", description: "Perdas que impactam a qualidade de vida. Candidato a sling masculino ou esfíncter artificial." },
  { level: "Grave", pads: "≥ 5 absorventes/dia", color: "red", description: "Perdas significativas e contínuas. Esfíncter urinário artificial é o tratamento de escolha." },
];

const conservativeTreatments = [
  {
    name: "Exercícios do Assoalho Pélvico (Kegel)",
    icon: Dumbbell,
    description: "Fortalecimento da musculatura do assoalho pélvico através de contrações voluntárias repetidas. Devem ser iniciados no pós-operatório imediato.",
    evidence: "Recomendação Moderada (Grau B) — AUA/GURS/SUFU 2024",
    details: [
      "Realizar 3 séries de 10-15 contrações, mantendo cada uma por 5-10 segundos",
      "Praticar 3 vezes ao dia, em diferentes posições (deitado, sentado, em pé)",
      "Resultados significativos geralmente em 3-6 meses de prática regular",
      "Biofeedback pode auxiliar pacientes com dificuldade de identificar a musculatura",
    ],
  },
  {
    name: "Fisioterapia Pélvica Especializada",
    icon: Users,
    description: "Acompanhamento com fisioterapeuta especializado em assoalho pélvico, utilizando técnicas de biofeedback, eletroestimulação e exercícios dirigidos.",
    evidence: "Recomendação Forte (Grau B) — AUA/GURS/SUFU 2024",
    details: [
      "Biofeedback com eletromiografia para otimizar a contração muscular",
      "Eletroestimulação transcutânea do nervo tibial posterior (PTNS)",
      "Terapia comportamental com treinamento vesical",
      "Pode ser iniciada antes da cirurgia (pré-habilitação) para melhores resultados",
    ],
  },
  {
    name: "Modificações Comportamentais",
    icon: Clock,
    description: "Ajustes no estilo de vida e hábitos miccionais que podem reduzir significativamente os episódios de perda urinária.",
    evidence: "Recomendação Forte — EAU Guidelines 2025",
    details: [
      "Micção programada a cada 2-3 horas (treinamento vesical)",
      "Redução de cafeína e álcool, que irritam a bexiga",
      "Controle da ingestão hídrica, especialmente à noite",
      "Manutenção do peso corporal adequado (IMC < 30)",
    ],
  },
];

const surgicalOptions = [
  {
    name: "Esfíncter Urinário Artificial (AUS — AMS 800)",
    icon: Shield,
    indication: "IU moderada a grave",
    description: "Considerado o padrão-ouro para incontinência urinária masculina moderada a grave. Dispositivo hidráulico implantado cirurgicamente que comprime a uretra, simulando a função do esfíncter natural.",
    howItWorks: "Composto por três componentes: um cuff (manguito) ao redor da uretra bulbar, uma bomba no escroto e um reservatório de pressão no espaço pré-vesical. O paciente pressiona a bomba para abrir o cuff e urinar; após 3-5 minutos, o cuff se fecha automaticamente.",
    results: "Taxa de continência social de 61-100%. Satisfação do paciente em 80-90% dos casos.",
    recommendation: "Recomendação Forte (Grau B) — AUA 2024. Discutir com todos os pacientes com IU leve a grave.",
    considerations: [
      "Preferir abordagem perineal com cuff único (Recomendação Moderada, Grau C)",
      "Eficácia pode diminuir com o tempo — reoperação em 26-37% em 10 anos",
      "Opção preferencial para pacientes pós-radioterapia",
      "Contraindicado em infecções urinárias recorrentes não tratadas",
      "Requer destreza manual para operar a bomba",
    ],
  },
  {
    name: "Sling Masculino (AdVance XP / ATOMS / Virtue)",
    icon: Target,
    indication: "IU leve a moderada",
    description: "Faixa sintética posicionada sob a uretra bulbar para fornecer suporte e compressão, restaurando o mecanismo de continência passiva. Procedimento menos invasivo que o AUS.",
    howItWorks: "O sling reposiciona e comprime a uretra bulbar, aumentando a resistência ao fluxo urinário durante esforços. Diferentes modelos: AdVance XP (retropúbico, reposicionamento), ATOMS (ajustável, com almofada de silicone) e Virtue (quadrática, fixação óssea).",
    results: "Taxa de cura/melhora de 60-80% para IU leve a moderada. ATOMS tem vantagem de ajuste pós-operatório.",
    recommendation: "Recomendação Moderada (Grau B) — AUA 2024. NÃO implantar rotineiramente em IU grave (Grau C).",
    considerations: [
      "Melhor indicação: IU leve a moderada (1-4 absorventes/dia)",
      "Não recomendado como primeira opção em pacientes irradiados",
      "Procedimento ambulatorial com recuperação mais rápida que AUS",
      "Se falha do sling → oferecer esfíncter artificial (Recomendação Moderada, Grau C)",
      "ATOMS permite ajuste de volume no consultório sem nova cirurgia",
    ],
  },
  {
    name: "Balões Ajustáveis (ProACT)",
    icon: TrendingUp,
    indication: "IU leve a grave (não irradiados)",
    description: "Dois balões de silicone implantados ao lado da uretra prostática, que podem ser ajustados em volume no consultório para otimizar a compressão uretral.",
    howItWorks: "Balões posicionados bilateralmente ao colo vesical via abordagem perineal. O volume é ajustado por punção percutânea no consultório, permitindo titulação individualizada da continência.",
    results: "Taxa de melhora de 50-70%. Vantagem de ajuste não-invasivo pós-operatório.",
    recommendation: "Recomendação Condicional (Grau C) — AUA 2024. Apenas para pacientes não irradiados.",
    considerations: [
      "Opção para pacientes que preferem procedimento menos invasivo",
      "Não recomendado para pacientes pós-radioterapia",
      "Pode necessitar de múltiplos ajustes para resultado ótimo",
      "Taxa de revisão/explante de 20-30% em 5 anos",
    ],
  },
  {
    name: "Agentes de Preenchimento (Bulking Agents)",
    icon: Droplets,
    indication: "IU leve (opção limitada)",
    description: "Injeção de substâncias ao redor da uretra para aumentar a coaptação uretral. Procedimento ambulatorial minimamente invasivo.",
    howItWorks: "Injeção periuretral de colágeno, ácido hialurônico ou outros materiais biocompatíveis sob visão cistoscópica. Aumenta a resistência uretral passiva.",
    results: "Eficácia baixa e cura rara. Efeito temporário na maioria dos casos.",
    recommendation: "Recomendação Forte (Grau B) — AUA 2024: eficácia baixa e cura rara. Não é primeira linha.",
    considerations: [
      "Procedimento ambulatorial com anestesia local",
      "Efeito geralmente temporário (meses)",
      "Pode necessitar de múltiplas sessões",
      "Não prejudica opções cirúrgicas futuras",
    ],
  },
];

const timeline = [
  { period: "Pré-operatório", action: "Iniciar exercícios do assoalho pélvico (pré-habilitação)", icon: Dumbbell },
  { period: "0-6 meses", action: "Fisioterapia pélvica + exercícios de Kegel + modificações comportamentais", icon: Activity },
  { period: "6 meses", action: "Se não melhora: pode considerar cirurgia (Condicional, Grau C)", icon: Clock },
  { period: "12 meses", action: "Se IU persistente: oferecer tratamento cirúrgico (Forte, Grau B)", icon: Wrench },
];

const faqs = [
  {
    q: "A incontinência após prostatectomia é permanente?",
    a: "Na maioria dos casos, não. Cerca de 80-90% dos pacientes recuperam a continência em até 12 meses após a prostatectomia radical. Exercícios do assoalho pélvico aceleram a recuperação. Apenas 5-20% mantêm incontinência significativa a longo prazo, e para esses existem tratamentos cirúrgicos eficazes.",
  },
  {
    q: "Qual a diferença entre sling masculino e esfíncter artificial?",
    a: "O sling é uma faixa que reposiciona/comprime a uretra, indicado para incontinência leve a moderada (1-4 absorventes/dia). O esfíncter artificial (AUS) é um dispositivo hidráulico que o paciente opera manualmente, indicado para incontinência moderada a grave. O AUS tem taxas de sucesso mais altas para casos graves, mas requer destreza manual para operação.",
  },
  {
    q: "Quando devo procurar tratamento cirúrgico?",
    a: "Segundo as guidelines da AUA 2024, a cirurgia pode ser considerada a partir de 6 meses se a incontinência não está melhorando com tratamento conservador. Com 12 meses, se a IU persiste apesar da fisioterapia, o tratamento cirúrgico deve ser oferecido. Não há benefício em esperar mais que 12 meses.",
  },
  {
    q: "Os exercícios de Kegel realmente funcionam?",
    a: "Sim. Existe evidência de nível B (estudos randomizados) de que exercícios do assoalho pélvico melhoram a continência após prostatectomia. O ideal é iniciar antes da cirurgia (pré-habilitação) e manter no pós-operatório. A fisioterapia especializada com biofeedback potencializa os resultados.",
  },
  {
    q: "Radioterapia prévia afeta as opções de tratamento?",
    a: "Sim. Pacientes que receberam radioterapia têm maior risco de complicações cirúrgicas. Para esses pacientes, o esfíncter artificial é preferido sobre sling ou balões ajustáveis (Recomendação Moderada, Grau C — AUA 2024). A radioterapia compromete a vascularização tecidual, aumentando risco de erosão.",
  },
  {
    q: "É possível tratar incontinência e disfunção erétil ao mesmo tempo?",
    a: "Sim. A AUA 2024 reconhece que procedimentos concomitantes ou estagiados podem ser oferecidos para pacientes com IU e disfunção erétil (Condicional, Grau C). É possível implantar esfíncter artificial e prótese peniana na mesma cirurgia ou em etapas separadas.",
  },
  {
    q: "Qual o tempo de recuperação após implante de esfíncter artificial?",
    a: "A cirurgia dura 1-2 horas e geralmente requer 1-2 dias de internação. O dispositivo é ativado após 4-6 semanas, quando a cicatrização está completa. A maioria dos pacientes retorna às atividades normais em 4-6 semanas. Atividades físicas intensas devem ser evitadas por 6-8 semanas.",
  },
  {
    q: "O esfíncter artificial dura para sempre?",
    a: "Não. A AUA 2024 recomenda informar que o AUS provavelmente perderá eficácia com o tempo e reoperações são comuns (Recomendação Forte, Grau B). A durabilidade média é de 7-10 anos, com taxa de revisão de 26-37% em 10 anos. Componentes mecânicos podem falhar e necessitar substituição.",
  },
];

const references = [
  { num: 1, text: "Sandhu JS et al. Incontinence after Prostate Treatment: AUA/GURS/SUFU Guideline. J Urol. 2019;202(2):369-378." },
  { num: 2, text: "Breyer BN et al. Incontinence after Prostate Treatment: AUA/GURS/SUFU Guideline Amendment. J Urol. 2024;211(4):531-537." },
  { num: 3, text: "EAU Guidelines on Non-neurogenic Male LUTS. European Association of Urology, 2025." },
  { num: 4, text: "EAU Guidelines on Male Urinary Incontinence. Eur Urol. 2022;82(6):e199-e200." },
  { num: 5, text: "Constable L et al. Male synthetic sling vs artificial urinary sphincter trial (MASTER). Lancet. 2022;400(10349):389-399." },
  { num: 6, text: "Grigoryan B et al. Safety and efficacy of AUS vs male slings: systematic review and meta-analysis. BJUI. 2024." },
  { num: 7, text: "Averbeck MA et al. Management of post-prostatectomy incontinence: EAU Position Statement. Eur Urol Focus. 2023." },
  { num: 8, text: "Wein AJ, Kavoussi LR, Partin AW, Peters CA. Campbell-Walsh-Wein Urology. 13th ed. Elsevier; 2024." },
  { num: 9, text: "Herschorn S et al. SIU/ICUD Consultation on Urinary Incontinence: Surgical Treatment of Male SUI. Neurourol Urodyn. 2022." },
  { num: 10, text: "NICE Guidelines. Urinary incontinence and pelvic organ prolapse in women: management. NICE guideline [NG123]. 2019, updated 2024." },
];

const colorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
  teal: { bg: "bg-amber-500", text: "text-amber-700", border: "border-amber-200", light: "bg-amber-50" },
  violet: { bg: "bg-violet-500", text: "text-violet-700", border: "border-violet-200", light: "bg-violet-50" },
  amber: { bg: "bg-amber-500", text: "text-amber-700", border: "border-amber-200", light: "bg-amber-50" },
  red: { bg: "bg-red-500", text: "text-red-700", border: "border-red-200", light: "bg-red-50" },
  green: { bg: "bg-green-500", text: "text-green-700", border: "border-green-200", light: "bg-green-50" },
  yellow: { bg: "bg-yellow-500", text: "text-yellow-700", border: "border-yellow-200", light: "bg-yellow-50" },
  orange: { bg: "bg-orange-500", text: "text-orange-700", border: "border-orange-200", light: "bg-orange-50" },
};

export default function IncontinenciaUrinaria() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openSurgery, setOpenSurgery] = useState<number | null>(null);

  return (
    <EducationalLayout
      title="Incontinência Urinária Masculina"
      subtitle="Causas, Diagnóstico e Tratamentos Baseados em Evidências"
      description="Guia completo sobre incontinência urinária masculina: tipos, classificação de gravidade, exercícios do assoalho pélvico, sling masculino e esfíncter urinário artificial. Baseado nas guidelines AUA 2024 e EAU 2025."
      accentColor="#B87333"
      metaTitle="Incontinência Urinária Masculina: Tratamentos | Dr. Felipe de Bulhões"
      metaDescription="Guia completo sobre incontinência urinária masculina pós-prostatectomia. Exercícios de Kegel, sling masculino, esfíncter artificial. AUA 2024 + EAU 2025. Urologista em Campinas e São Paulo."
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
              src="/manus-storage/incontinencia-urinaria-tipos_62186555_abc470ac.webp"
              alt="Tipos de incontinência urinária masculina"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Introdução */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">O Que é Incontinência Urinária Masculina?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                A <strong>incontinência urinária (IU)</strong> é definida como a perda involuntária de urina, uma condição que afeta
                significativamente a qualidade de vida do homem. Embora seja mais discutida em mulheres, a IU masculina é uma condição
                frequente, especialmente após tratamentos prostáticos como a prostatectomia radical para câncer de próstata ou cirurgias
                para hiperplasia prostática benigna (HPB).
              </p>
              <p>
                Estima-se que <strong>cerca de 1 em cada 10 homens</strong> apresenta algum grau de incontinência urinária, com taxas
                que aumentam significativamente após os 60 anos. Após prostatectomia radical, 5-20% dos pacientes mantêm incontinência
                significativa a longo prazo, embora a maioria recupere a continência em até 12 meses.
              </p>
              <p>
                O impacto psicossocial é profundo: constrangimento, isolamento social, limitação de atividades físicas, disfunção sexual
                e depressão são consequências frequentes. A boa notícia é que existem <strong>tratamentos eficazes</strong> para todos os
                graus de incontinência, desde exercícios simples até dispositivos cirúrgicos com altas taxas de sucesso.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tipos de Incontinência */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Tipos de Incontinência Urinária</h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Cada tipo tem mecanismo, causa e tratamento diferentes. O diagnóstico correto é fundamental.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {types.map((type, i) => {
              const colors = colorMap[type.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-white rounded-xl border ${colors.border} p-6 shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                      <type.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{type.name}</h3>
                  </div>
                  <p className="text-gray-700 mb-3">{type.description}</p>
                  <div className={`${colors.light} rounded-lg p-3 mb-3`}>
                    <p className="text-sm"><strong className={colors.text}>Causas:</strong> <span className="text-gray-700">{type.causes}</span></p>
                  </div>
                  <p className="text-sm text-gray-500">{type.prevalence}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Classificação de Gravidade */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Classificação de Gravidade</h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Baseada no número de absorventes utilizados por dia — AUA/GURS/SUFU Guideline 2024
            </p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-amber-600 text-white">
                  <th className="px-4 py-3 text-left rounded-tl-lg">Gravidade</th>
                  <th className="px-4 py-3 text-left">Absorventes/Dia</th>
                  <th className="px-4 py-3 text-left rounded-tr-lg">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {severityScale.map((item, i) => {
                  const colors = colorMap[item.color];
                  return (
                    <tr key={i} className={`border-b ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${colors.bg}`}></div>
                          <span className="font-semibold text-gray-900">{item.level}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-700">{item.pads}</td>
                      <td className="px-4 py-3 text-gray-600">{item.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Timeline de Tratamento */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Linha do Tempo do Tratamento</h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Algoritmo de manejo da incontinência pós-prostatectomia — AUA 2024
            </p>
          </motion.div>
          <div className="space-y-0">
            {timeline.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-4 items-start"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center shadow-md">
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  {i < timeline.length - 1 && <div className="w-0.5 h-16 bg-amber-200"></div>}
                </div>
                <div className="pb-8">
                  <span className="text-sm font-bold text-amber-600 uppercase tracking-wide">{step.period}</span>
                  <p className="text-gray-700 mt-1">{step.action}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tratamento Conservador */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Tratamento Conservador</h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Primeira linha de tratamento para todos os pacientes com incontinência urinária
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {conservativeTreatments.map((treatment, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-600 flex items-center justify-center mb-4">
                  <treatment.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{treatment.name}</h3>
                <p className="text-gray-700 text-sm mb-3">{treatment.description}</p>
                <div className="bg-amber-50 rounded-lg p-3 mb-4">
                  <p className="text-xs font-medium text-amber-700">{treatment.evidence}</p>
                </div>
                <ul className="space-y-2">
                  {treatment.details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tratamento Cirúrgico */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Tratamento Cirúrgico</h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Opções para incontinência persistente após tratamento conservador
            </p>
          </motion.div>
          <div className="space-y-4">
            {surgicalOptions.map((option, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenSurgery(openSurgery === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-600 flex items-center justify-center">
                      <option.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{option.name}</h3>
                      <span className="text-sm text-amber-600 font-medium">Indicação: {option.indication}</span>
                    </div>
                  </div>
                  {openSurgery === i ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                {openSurgery === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="px-6 pb-6 border-t border-gray-100"
                  >
                    <div className="pt-4 space-y-4">
                      <p className="text-gray-700">{option.description}</p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Como Funciona</h4>
                        <p className="text-gray-700 text-sm">{option.howItWorks}</p>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-4">
                        <h4 className="font-semibold text-amber-800 mb-2">Resultados</h4>
                        <p className="text-amber-700 text-sm">{option.results}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Nível de Evidência</h4>
                        <p className="text-blue-700 text-sm">{option.recommendation}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Considerações Importantes</h4>
                        <ul className="space-y-2">
                          {option.considerations.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                              <ArrowRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabela Comparativa */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Comparativo: Sling vs Esfíncter Artificial</h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Baseado no estudo MASTER (Lancet 2022) e meta-análise de Grigoryan et al. (2024)
            </p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-amber-600 text-white">
                  <th className="px-4 py-3 text-left rounded-tl-lg">Critério</th>
                  <th className="px-4 py-3 text-center">Sling Masculino</th>
                  <th className="px-4 py-3 text-center rounded-tr-lg">Esfíncter Artificial (AUS)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Indicação ideal", "IU leve a moderada (1-4 pads)", "IU moderada a grave (2+ pads)"],
                  ["Taxa de continência", "60-80%", "61-100%"],
                  ["Invasividade", "Menor (ambulatorial possível)", "Maior (internação 1-2 dias)"],
                  ["Necessidade de operar manualmente", "Não", "Sim (bomba escrotal)"],
                  ["Ajuste pós-operatório", "ATOMS: sim / AdVance: não", "Não (revisão cirúrgica)"],
                  ["Pós-radioterapia", "Não recomendado como 1ª opção", "Opção preferencial (Grau C)"],
                  ["Durabilidade", "Longo prazo (sem partes mecânicas)", "7-10 anos (revisão 26-37%)"],
                  ["Recuperação", "2-4 semanas", "4-6 semanas (ativação em 6 sem)"],
                  ["Custo relativo", "Menor", "Maior"],
                ].map((row, i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                    <td className="px-4 py-3 font-semibold text-gray-900">{row[0]}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{row[1]}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Destaque Campinas */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Stethoscope className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">Tratamento em Campinas e São Paulo</h2>
            <p className="text-amber-100 text-lg mb-6 max-w-2xl mx-auto">
              O Dr. Felipe de Bulhões realiza avaliação completa da incontinência urinária masculina, incluindo estudo urodinâmico,
              e oferece todas as opções de tratamento — desde fisioterapia pélvica até implante de esfíncter artificial e sling masculino.
              Procedimentos cirúrgicos são realizados no <strong>Campinas Day Hospital</strong>.
            </p>
            <div className="bg-white/10 rounded-xl p-6 max-w-md mx-auto">
              <p className="font-semibold text-lg mb-1">Campinas Day Hospital</p>
              <p className="text-amber-100">Av. Benjamin Constant, 1991</p>
              <p className="text-amber-100">Cambuí, Campinas — SP</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Perguntas Frequentes</h2>
            <p className="text-gray-600 text-center mb-10">Dúvidas comuns sobre incontinência urinária masculina</p>
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
      <section className="py-16 bg-gray-50">
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
