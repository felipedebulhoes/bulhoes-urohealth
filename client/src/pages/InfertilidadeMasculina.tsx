/**
 * Design: Clinical Precision — Swiss Medical Design
 * Page: Infertilidade Masculina — Causas, Diagnóstico e Tratamentos
 * Referências: EAU Guidelines on Male Infertility 2025, AUA/ASRM Male Infertility Guideline 2024, Campbell-Walsh-Wein 13th Ed.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import EducationalLayout from "@/components/EducationalLayout";
import { FAQSchema } from "@/components/SchemaMarkup";
import {
  Baby, Microscope, Activity, Dumbbell, Wrench, AlertTriangle,
  Check, ChevronDown, ChevronUp, Stethoscope, Clock, Target,
  ArrowRight, Users, TrendingUp, Zap, Heart, Thermometer,
  Shield, Pill, Search, Syringe, FlaskConical, TestTube2, Dna
} from "lucide-react";

/* ─── DATA ─── */

const causes = [
  {
    category: "Pré-testicular (Endócrina)",
    color: "violet",
    icon: Pill,
    items: [
      { name: "Hipogonadismo hipogonadotrófico", detail: "Deficiência de GnRH, FSH ou LH — congênito (Kallmann) ou adquirido (tumores hipofisários, uso de esteroides anabolizantes)." },
      { name: "Hiperprolactinemia", detail: "Prolactina elevada suprime o eixo gonadal, causando hipogonadismo e infertilidade." },
      { name: "Uso de testosterona exógena", detail: "A reposição de testosterona suprime a espermatogênese de forma dose-dependente. Pode levar a azoospermia reversível." },
      { name: "Doenças sistêmicas", detail: "Obesidade, diabetes, doenças tireoidianas e insuficiência renal crônica podem afetar a produção hormonal." },
    ],
  },
  {
    category: "Testicular",
    color: "teal",
    icon: Target,
    items: [
      { name: "Varicocele", detail: "Causa tratável mais comum de infertilidade masculina. Presente em 35-40% dos homens com infertilidade primária e até 80% com infertilidade secundária." },
      { name: "Criptorquidia", detail: "Testículo não descido, mesmo após correção cirúrgica, pode ter função espermatogênica comprometida." },
      { name: "Fatores genéticos", detail: "Síndrome de Klinefelter (47,XXY), microdeleções do cromossomo Y (AZFa, AZFb, AZFc), mutações do gene CFTR." },
      { name: "Orquite / Infecção", detail: "Orquite por caxumba, infecções do trato genital (clamídia, gonorreia) podem causar dano testicular." },
      { name: "Torção testicular", detail: "Isquemia prolongada pode causar atrofia testicular e comprometimento da espermatogênese." },
      { name: "Quimioterapia / Radioterapia", detail: "Agentes alquilantes são particularmente gonadotóxicos. Criopreservação de sêmen deve ser oferecida antes do tratamento." },
    ],
  },
  {
    category: "Pós-testicular (Obstrutiva)",
    color: "amber",
    icon: Shield,
    items: [
      { name: "Azoospermia obstrutiva", detail: "Obstrução dos ductos deferentes, epidídimo ou ductos ejaculatórios. Produção espermática preservada." },
      { name: "Vasectomia prévia", detail: "Causa mais comum de azoospermia obstrutiva. Reversão possível (vasovasostomia ou vasoepididimostomia)." },
      { name: "Ausência congênita dos vasos deferentes (CAVD)", detail: "Associada a mutações do gene CFTR (fibrose cística). Presente em 1-2% dos homens inférteis." },
      { name: "Ejaculação retrógrada", detail: "Sêmen direcionado para a bexiga em vez da uretra. Causas: diabetes, cirurgias pélvicas, medicações alfa-bloqueadoras." },
    ],
  },
  {
    category: "Idiopática",
    color: "gray",
    icon: Search,
    items: [
      { name: "Infertilidade masculina idiopática", detail: "Em 30-40% dos casos, nenhuma causa identificável é encontrada. Fatores ambientais, estresse oxidativo e epigenéticos podem contribuir." },
    ],
  },
];

const diagnosticWorkup = [
  {
    step: 1,
    title: "História Clínica Detalhada",
    icon: Stethoscope,
    description: "Tempo de infertilidade, frequência sexual, história de criptorquidia, infecções, cirurgias, medicações (especialmente testosterona e anabolizantes), exposições ocupacionais e hábitos de vida.",
    evidence: "Recomendação Forte — EAU 2025 / AUA 2024",
  },
  {
    step: 2,
    title: "Espermograma (Análise Seminal)",
    icon: Microscope,
    description: "Exame fundamental. Deve ser realizado após 2-7 dias de abstinência. Se alterado, repetir em 4-6 semanas. Avalia volume, concentração, motilidade, morfologia e vitalidade.",
    evidence: "Recomendação Forte — EAU 2025 / AUA 2024 / OMS 2021",
  },
  {
    step: 3,
    title: "Dosagens Hormonais",
    icon: FlaskConical,
    description: "FSH, LH, testosterona total (matinal). Prolactina e estradiol se indicados. FSH elevado sugere falência testicular; FSH baixo sugere causa pré-testicular.",
    evidence: "Recomendação Forte — EAU 2025",
  },
  {
    step: 4,
    title: "Exame Físico Urológico",
    icon: Search,
    description: "Avaliação do volume testicular (orquidômetro de Prader), palpação dos vasos deferentes, pesquisa de varicocele (manobra de Valsalva), avaliação de caracteres sexuais secundários.",
    evidence: "Recomendação Forte — EAU 2025 / AUA 2024",
  },
  {
    step: 5,
    title: "Ultrassonografia Escrotal",
    icon: Zap,
    description: "Avaliação do parênquima testicular, pesquisa de varicocele subclínica, massas testiculares, cistos epididimários e obstruções. Complementa o exame físico.",
    evidence: "Recomendação Condicional — EAU 2025",
  },
  {
    step: 6,
    title: "Testes Genéticos",
    icon: Dna,
    description: "Cariótipo (azoospermia ou oligozoospermia grave < 5 milhões/mL), microdeleções do Y (AZFa/b/c), pesquisa de mutações CFTR (CAVD). Essenciais antes de técnicas de reprodução assistida.",
    evidence: "Recomendação Forte — EAU 2025 / AUA 2024",
  },
];

const semenParameters = [
  { parameter: "Volume", normal: "≥ 1,5 mL", altered: "< 1,5 mL (hipospermia)", significance: "Volume baixo: ejaculação retrógrada, obstrução ductal, hipogonadismo ou coleta incompleta." },
  { parameter: "Concentração", normal: "≥ 16 milhões/mL", altered: "< 16 milhões/mL (oligozoospermia)", significance: "Oligozoospermia grave (< 5 milhões/mL): investigar causa genética." },
  { parameter: "Motilidade total", normal: "≥ 42%", altered: "< 42% (astenozoospermia)", significance: "Motilidade reduzida: varicocele, infecção, anticorpos antiesperma, defeitos flagelares." },
  { parameter: "Motilidade progressiva", normal: "≥ 30%", altered: "< 30%", significance: "Motilidade progressiva é a mais relevante para fertilidade natural." },
  { parameter: "Morfologia (Kruger)", normal: "≥ 4% formas normais", altered: "< 4% (teratozoospermia)", significance: "Morfologia isoladamente alterada tem valor prognóstico limitado." },
  { parameter: "Vitalidade", normal: "≥ 54% vivos", altered: "< 54% (necrozoospermia)", significance: "Importante quando motilidade é muito baixa — diferencia imóveis vivos de mortos." },
  { parameter: "Contagem total", normal: "≥ 39 milhões/ejaculado", altered: "< 39 milhões", significance: "Parâmetro global que combina volume e concentração." },
];

const treatments = [
  {
    name: "Correção de Varicocele",
    icon: Wrench,
    category: "Cirúrgico",
    indication: "Varicocele clínica + parâmetros seminais alterados + infertilidade do casal",
    description: "A varicocelectomia (microcirúrgica subinguinal é o padrão-ouro) melhora os parâmetros seminais em 60-80% dos casos e resulta em gravidez espontânea em 30-50% dos casais.",
    evidence: "Recomendação Forte (Grau A) — EAU 2025 / AUA 2024",
    details: [
      "Técnica microcirúrgica subinguinal: menor taxa de recidiva (< 1%) e hidrocele (< 1%)",
      "Melhora da concentração, motilidade e morfologia espermática",
      "Tempo para melhora: 3-6 meses após a cirurgia",
      "Também indicada em adolescentes com varicocele e assimetria testicular > 20%",
      "Pode melhorar os níveis de testosterona em homens com hipogonadismo associado",
    ],
  },
  {
    name: "Terapia Hormonal",
    icon: Pill,
    category: "Clínico",
    indication: "Hipogonadismo hipogonadotrófico, uso prévio de testosterona/anabolizantes",
    description: "Gonadotrofinas (hCG + FSH recombinante) para estimular a espermatogênese em homens com deficiência gonadotrófica. Clomifeno e letrozol como alternativas off-label.",
    evidence: "Recomendação Forte para hipogonadismo hipogonadotrófico — EAU 2025",
    details: [
      "hCG 1.500-3.000 UI 2-3x/semana ± FSH 75-150 UI 3x/semana",
      "Tempo para resposta: 6-12 meses (pode levar até 24 meses)",
      "Clomifeno 25-50 mg/dia: estimula eixo HPG em hipogonadismo funcional",
      "Suspensão de testosterona exógena: recuperação em 3-12 meses (variável)",
      "Monitorar espermograma a cada 3-4 meses durante o tratamento",
    ],
  },
  {
    name: "Reversão de Vasectomia",
    icon: Activity,
    category: "Cirúrgico",
    indication: "Desejo de fertilidade após vasectomia prévia",
    description: "Vasovasostomia (reconexão dos vasos deferentes) ou vasoepididimostomia (conexão do vaso ao epidídimo). Sucesso depende do intervalo desde a vasectomia.",
    evidence: "Recomendação Forte — EAU 2025 / AUA 2024",
    details: [
      "Vasovasostomia microcirúrgica: patência 75-99%, gravidez 30-75%",
      "Intervalo < 3 anos: melhores resultados (patência > 95%)",
      "Intervalo > 15 anos: considerar vasoepididimostomia",
      "Alternativa: extração de espermatozoides (TESE/micro-TESE) + ICSI",
      "Decisão compartilhada: reversão vs. extração + reprodução assistida",
    ],
  },
  {
    name: "Extração Cirúrgica de Espermatozoides",
    icon: Syringe,
    category: "Cirúrgico",
    indication: "Azoospermia obstrutiva ou não-obstrutiva quando reprodução assistida é planejada",
    description: "Técnicas para obter espermatozoides diretamente do testículo ou epidídimo para uso em ICSI (injeção intracitoplasmática de espermatozoides).",
    evidence: "Recomendação Forte — EAU 2025 / AUA 2024",
    details: [
      "TESA (aspiração testicular): procedimento simples, ambulatorial",
      "TESE (extração testicular): biópsia aberta, maior volume de tecido",
      "Micro-TESE: padrão-ouro para azoospermia não-obstrutiva (taxa de recuperação 40-60%)",
      "MESA (aspiração microcirúrgica do epidídimo): para azoospermia obstrutiva",
      "Espermatozoides obtidos são usados para ICSI — taxa de fertilização 50-70%",
    ],
  },
  {
    name: "Reprodução Assistida (FIV/ICSI)",
    icon: Baby,
    category: "Reprodução Assistida",
    indication: "Falha do tratamento clínico/cirúrgico, fator feminino associado, azoospermia não-obstrutiva",
    description: "Fertilização in vitro (FIV) com injeção intracitoplasmática de espermatozoides (ICSI) é o tratamento de última linha, com altas taxas de sucesso mesmo com poucos espermatozoides.",
    evidence: "Recomendação Forte — EAU 2025 / AUA 2024",
    details: [
      "ICSI: necessário apenas 1 espermatozoide por óvulo",
      "Taxa de gravidez por ciclo: 30-50% (depende da idade da parceira)",
      "Indicada quando: oligozoospermia grave, azoospermia com extração, falha de tratamento prévio",
      "Aconselhamento genético obrigatório quando há fator genético masculino",
      "Criopreservação de embriões excedentes para tentativas futuras",
    ],
  },
  {
    name: "Modificações do Estilo de Vida",
    icon: Dumbbell,
    category: "Conservador",
    indication: "Todos os pacientes — medidas adjuvantes ao tratamento principal",
    description: "Fatores modificáveis que impactam a qualidade seminal: obesidade, tabagismo, álcool, calor escrotal, estresse e exposições ambientais.",
    evidence: "Recomendação Condicional (Grau C) — EAU 2025",
    details: [
      "Perda de peso: IMC > 30 associado a oligozoospermia e hipogonadismo",
      "Cessar tabagismo: reduz estresse oxidativo e fragmentação de DNA espermático",
      "Limitar álcool: consumo excessivo reduz testosterona e qualidade seminal",
      "Evitar calor escrotal: saunas, banhos quentes, laptop no colo, roupas apertadas",
      "Suplementação antioxidante: evidência limitada, mas pode ser considerada (vitamina C, E, zinco, selênio, coenzima Q10)",
    ],
  },
];

const azoospermiaAlgorithm = [
  { step: "Espermograma: azoospermia (2 amostras)", icon: Microscope, color: "red" },
  { step: "Dosagem de FSH + Volume testicular", icon: FlaskConical, color: "amber" },
  { step: "FSH normal + testículos normais → Azoospermia obstrutiva provável", icon: Shield, color: "teal" },
  { step: "FSH elevado + testículos pequenos → Azoospermia não-obstrutiva provável", icon: AlertTriangle, color: "red" },
  { step: "Testes genéticos: cariótipo + microdeleções Y + CFTR", icon: Dna, color: "violet" },
  { step: "Decisão: Reconstrução cirúrgica vs. Extração (TESE/micro-TESE) + ICSI", icon: Wrench, color: "teal" },
];

const faqs = [
  {
    q: "Quanto tempo o casal deve tentar antes de investigar infertilidade?",
    a: "A investigação é recomendada após 12 meses de relações sexuais regulares sem contracepção. Porém, se a mulher tem mais de 35 anos, a investigação deve iniciar após 6 meses. Se há fatores de risco conhecidos (criptorquidia, varicocele, quimioterapia prévia), a investigação pode ser antecipada.",
  },
  {
    q: "O uso de testosterona causa infertilidade?",
    a: "Sim. A testosterona exógena (injeções, gel, adesivos) suprime a produção de FSH e LH pela hipófise, o que reduz ou elimina a produção de espermatozoides. Pode causar azoospermia em 40-60% dos homens em 3-6 meses. A recuperação após suspensão é variável (3-12 meses), mas nem sempre é completa. Homens que desejam fertilidade NÃO devem usar testosterona — alternativas como clomifeno podem ser utilizadas.",
  },
  {
    q: "Varicocele sempre causa infertilidade?",
    a: "Não. Varicocele está presente em cerca de 15% dos homens na população geral, mas em 35-40% dos homens com infertilidade primária. Nem toda varicocele precisa ser tratada — a cirurgia é indicada quando há varicocele clínica (palpável), parâmetros seminais alterados e infertilidade do casal. A varicocele subclínica (detectada apenas por ultrassom) geralmente não tem indicação cirúrgica.",
  },
  {
    q: "É possível ter filhos após quimioterapia?",
    a: "Depende do tipo e dose do quimioterápico. Agentes alquilantes (ciclofosfamida, clorambucil) são os mais gonadotóxicos. A criopreservação de sêmen ANTES do tratamento é fortemente recomendada (EAU 2025, Recomendação Forte). Após o tratamento, a recuperação da espermatogênese pode levar 1-5 anos. Se não houver recuperação, micro-TESE pode encontrar espermatozoides em alguns casos.",
  },
  {
    q: "Qual a diferença entre azoospermia obstrutiva e não-obstrutiva?",
    a: "Na azoospermia obstrutiva, os testículos produzem espermatozoides normalmente, mas há uma obstrução que impede sua saída (vasectomia, CAVD, infecção). O FSH é normal e os testículos têm tamanho normal. Na azoospermia não-obstrutiva, há falência da produção testicular — FSH elevado e testículos frequentemente pequenos. O tratamento e prognóstico são diferentes: obstrutiva tem excelente prognóstico com reconstrução ou extração; não-obstrutiva requer micro-TESE com taxa de recuperação de 40-60%.",
  },
  {
    q: "Suplementos e vitaminas melhoram a fertilidade masculina?",
    a: "A evidência é limitada, mas alguns estudos sugerem benefício modesto. Antioxidantes como vitamina C, vitamina E, zinco, selênio, coenzima Q10 e L-carnitina podem reduzir o estresse oxidativo espermático. A EAU 2025 classifica como Recomendação Fraca (Grau C). Não devem substituir o tratamento da causa base (varicocele, hipogonadismo), mas podem ser usados como terapia adjuvante.",
  },
  {
    q: "A idade do homem afeta a fertilidade?",
    a: "Sim, embora de forma menos drástica que na mulher. Após os 40 anos, há declínio progressivo do volume seminal, motilidade e morfologia. A fragmentação do DNA espermático aumenta com a idade. Homens mais velhos têm maior risco de mutações de novo nos espermatozoides, o que pode afetar a saúde da prole. A EAU 2025 recomenda considerar a idade paterna no aconselhamento reprodutivo.",
  },
  {
    q: "Quando devo procurar um urologista especialista em fertilidade?",
    a: "Procure um urologista quando: o casal não consegue engravidar após 12 meses (ou 6 meses se a parceira tem > 35 anos); o espermograma está alterado; há história de criptorquidia, varicocele, cirurgias genitais, infecções ou uso de hormônios; ou quando há disfunção sexual associada. O urologista é o especialista que investiga e trata o fator masculino da infertilidade.",
  },
];

const references = [
  { num: 1, text: "Salonia A et al. EAU Guidelines on Sexual and Reproductive Health — Male Infertility. European Association of Urology, 2025." },
  { num: 2, text: "Schlegel PN et al. Diagnosis and Treatment of Infertility in Men: AUA/ASRM Guideline Part I. J Urol. 2021;205(1):36-43." },
  { num: 3, text: "Schlegel PN et al. Diagnosis and Treatment of Infertility in Men: AUA/ASRM Guideline Part II. J Urol. 2021;205(1):44-51." },
  { num: 4, text: "WHO Laboratory Manual for the Examination and Processing of Human Semen. 6th ed. World Health Organization; 2021." },
  { num: 5, text: "Agarwal A et al. Male Oxidative Stress Infertility (MOSI): Proposed Terminology and Clinical Practice Guidelines. World J Mens Health. 2019;37(3):296-312." },
  { num: 6, text: "Esteves SC et al. Surgical treatment of male infertility: varicocelectomy and sperm retrieval. Fertil Steril. 2023;120(5):963-979." },
  { num: 7, text: "Dabaja AA, Schlegel PN. Microdissection testicular sperm extraction: an update. Asian J Androl. 2013;15(1):35-39." },
  { num: 8, text: "Wein AJ, Kavoussi LR, Partin AW, Peters CA. Campbell-Walsh-Wein Urology. 13th ed. Elsevier; 2024. Chapters 66-72: Male Infertility." },
  { num: 9, text: "Tournaye H et al. Novel concepts in the aetiology of male reproductive impairment. Lancet Diabetes Endocrinol. 2017;5(7):544-553." },
  { num: 10, text: "Minhas S et al. EAU Guidelines on Male Sexual and Reproductive Health: 2021 Update on Male Infertility. Eur Urol. 2021;80(5):603-620." },
];

const colorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
  teal: { bg: "bg-amber-500", text: "text-amber-700", border: "border-amber-200", light: "bg-amber-50" },
  violet: { bg: "bg-violet-500", text: "text-violet-700", border: "border-violet-200", light: "bg-violet-50" },
  amber: { bg: "bg-amber-500", text: "text-amber-700", border: "border-amber-200", light: "bg-amber-50" },
  red: { bg: "bg-red-500", text: "text-red-700", border: "border-red-200", light: "bg-red-50" },
  gray: { bg: "bg-gray-50 dark:bg-card0", text: "text-gray-700 dark:text-foreground", border: "border-gray-200 dark:border-border", light: "bg-gray-50 dark:bg-card" },
  green: { bg: "bg-green-500", text: "text-green-700", border: "border-green-200", light: "bg-green-50" },
};

/* ─── COMPONENT ─── */

export default function InfertilidadeMasculina() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openTreatment, setOpenTreatment] = useState<number | null>(null);
  const [openCause, setOpenCause] = useState<number | null>(null);

  return (
    <EducationalLayout
      title="Infertilidade Masculina"
      subtitle="Causas, Diagnóstico e Tratamentos Baseados em Evidências"
      description="Guia completo sobre infertilidade masculina: espermograma, varicocele, azoospermia, terapia hormonal, micro-TESE e reprodução assistida. Baseado nas guidelines EAU 2025 e AUA/ASRM 2024."
      accentColor="#B87333"
      metaTitle="Infertilidade Masculina: Causas e Tratamentos | Dr. Felipe de Bulhões"
      metaDescription="Guia completo sobre infertilidade masculina: espermograma, varicocele, azoospermia, terapia hormonal, micro-TESE e reprodução assistida. EAU 2025 + AUA 2024. Urologista em Campinas e São Paulo."
    >
      <FAQSchema questions={faqs.map(item => ({ question: item.q, answer: item.a }))} />

      {/* Imagem Ilustrativa */}
      <section className="py-10 bg-gray-50 dark:bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/infertilidade-masculina-hero-EmAjCVccuojobY99U9Eo5t.webp"
              alt="Infertilidade masculina — diagnóstico e tratamento"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Introdução */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-6">O Que é Infertilidade Masculina?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-foreground space-y-4">
              <p>
                A <strong>infertilidade</strong> é definida como a incapacidade de um casal conceber após 12 meses de relações sexuais
                regulares sem contracepção. O <strong>fator masculino</strong> está presente, isoladamente ou em combinação com o fator
                feminino, em aproximadamente <strong>50% dos casais inférteis</strong>.
              </p>
              <p>
                Estima-se que <strong>7% dos homens</strong> em idade reprodutiva apresentam algum grau de subfertilidade. As causas são
                diversas: varicocele (a causa tratável mais comum), distúrbios hormonais, fatores genéticos, obstruções do trato genital,
                infecções, uso de medicações gonadotóxicas e fatores ambientais. Em 30-40% dos casos, nenhuma causa é identificada
                (infertilidade idiopática).
              </p>
              <p>
                A avaliação do homem infértil é <strong>obrigatória</strong> em todo casal com dificuldade para engravidar. O urologista é
                o especialista responsável por diagnosticar e tratar o fator masculino, podendo identificar condições tratáveis que
                restauram a fertilidade natural ou otimizam os resultados da reprodução assistida. Além disso, a infertilidade pode ser
                o primeiro sinal de doenças sistêmicas como tumores testiculares, hipogonadismo ou condições genéticas.
              </p>
            </div>
          </motion.div>

          {/* Alerta sobre Testosterona */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-red-800 mb-2">Alerta: Testosterona e Fertilidade</h3>
                <p className="text-red-700">
                  O uso de <strong>testosterona exógena</strong> (injeções, gel, adesivos) é uma das causas mais comuns de infertilidade
                  masculina iatrogênica. A testosterona suprime a produção de FSH e LH, levando a <strong>azoospermia em 40-60% dos
                  homens</strong> em poucos meses. Se você deseja ter filhos, <strong>não use testosterona</strong> sem orientação
                  médica especializada. Existem alternativas seguras para tratar o hipogonadismo sem comprometer a fertilidade.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Epidemiologia */}
      <section className="py-16 bg-gray-50 dark:bg-card">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-3 text-center">Números da Infertilidade Masculina</h2>
            <p className="text-gray-600 dark:text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Dados epidemiológicos baseados em estudos populacionais e guidelines internacionais
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "50%", label: "dos casais inférteis têm fator masculino", color: "teal" },
              { value: "7%", label: "dos homens em idade reprodutiva são subférteis", color: "violet" },
              { value: "35-40%", label: "dos homens inférteis têm varicocele", color: "amber" },
              { value: "30-40%", label: "dos casos são idiopáticos", color: "gray" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-card rounded-xl p-6 text-center shadow-sm border border-gray-100"
              >
                <p className={`text-4xl font-bold ${colorMap[stat.color].text} mb-2`}>{stat.value}</p>
                <p className="text-gray-600 dark:text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Causas */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-3 text-center">Causas da Infertilidade Masculina</h2>
            <p className="text-gray-600 dark:text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Classificadas por localização anatômica — Baseado em EAU 2025 e Campbell-Walsh-Wein 13th Ed.
            </p>
          </motion.div>
          <div className="space-y-6">
            {causes.map((group, gi) => {
              const colors = colorMap[group.color];
              return (
                <motion.div
                  key={gi}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.1 }}
                  className={`bg-white rounded-xl border ${colors.border} overflow-hidden shadow-sm`}
                >
                  <button
                    onClick={() => setOpenCause(openCause === gi ? null : gi)}
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-muted dark:bg-card transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                        <group.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-foreground">{group.category}</h3>
                        <p className="text-sm text-gray-500 dark:text-muted-foreground">{group.items.length} {group.items.length === 1 ? "causa" : "causas"}</p>
                      </div>
                    </div>
                    {openCause === gi ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>
                  {openCause === gi && (
                    <div className="px-5 pb-5 space-y-3">
                      {group.items.map((item, ii) => (
                        <div key={ii} className={`${colors.light} rounded-lg p-4`}>
                          <p className={`font-semibold ${colors.text} mb-1`}>{item.name}</p>
                          <p className="text-gray-700 dark:text-foreground text-sm">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investigação Diagnóstica */}
      <section className="py-16 bg-gray-50 dark:bg-card">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-3 text-center">Investigação Diagnóstica</h2>
            <p className="text-gray-600 dark:text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Abordagem sistemática recomendada pelas guidelines EAU 2025 e AUA/ASRM 2024
            </p>
          </motion.div>
          <div className="space-y-4">
            {diagnosticWorkup.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 bg-white dark:bg-card rounded-xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-700 font-bold text-lg">{item.step}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon className="w-4 h-4 text-amber-600" />
                    <h3 className="font-bold text-gray-900 dark:text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-gray-700 dark:text-foreground text-sm mb-2">{item.description}</p>
                  <span className="inline-block text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                    {item.evidence}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Espermograma — Parâmetros de Referência */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-3 text-center">Espermograma: Valores de Referência</h2>
            <p className="text-gray-600 dark:text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Baseado no Manual da OMS para Exame de Sêmen, 6ª edição (2021)
            </p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-amber-600 text-white">
                  <th className="px-4 py-3 text-left rounded-tl-lg">Parâmetro</th>
                  <th className="px-4 py-3 text-left">Valor Normal (P5)</th>
                  <th className="px-4 py-3 text-left">Alterado</th>
                  <th className="px-4 py-3 text-left rounded-tr-lg">Significado Clínico</th>
                </tr>
              </thead>
              <tbody>
                {semenParameters.map((item, i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? "bg-gray-50 dark:bg-card" : "bg-white"}`}>
                    <td className="px-4 py-3 font-semibold text-gray-900 dark:text-foreground">{item.parameter}</td>
                    <td className="px-4 py-3 text-green-700 font-medium">{item.normal}</td>
                    <td className="px-4 py-3 text-red-600">{item.altered}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-muted-foreground text-sm">{item.significance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4"
          >
            <p className="text-amber-800 text-sm">
              <strong>Importante:</strong> Um espermograma alterado isolado não define infertilidade. Deve ser repetido em 4-6 semanas
              para confirmação. Fatores como febre recente, medicações e estresse podem alterar temporariamente os resultados.
              A interpretação deve ser feita pelo urologista no contexto clínico do casal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Algoritmo da Azoospermia */}
      <section className="py-16 bg-gray-50 dark:bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-3 text-center">Azoospermia: Algoritmo de Investigação</h2>
            <p className="text-gray-600 dark:text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Ausência completa de espermatozoides no ejaculado — presente em 10-15% dos homens inférteis
            </p>
          </motion.div>
          <div className="space-y-3">
            {azoospermiaAlgorithm.map((item, i) => {
              const colors = colorMap[item.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 bg-white dark:bg-card rounded-lg p-4 shadow-sm border border-gray-100">
                    <p className="text-gray-800 dark:text-foreground font-medium">{item.step}</p>
                  </div>
                  {i < azoospermiaAlgorithm.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-300 rotate-90 hidden sm:block absolute right-0" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tratamentos */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-3 text-center">Opções de Tratamento</h2>
            <p className="text-gray-600 dark:text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Do tratamento clínico à reprodução assistida — abordagem individualizada baseada na causa
            </p>
          </motion.div>
          <div className="space-y-4">
            {treatments.map((tx, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-border overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenTreatment(openTreatment === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-muted dark:bg-card transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
                      <tx.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-foreground">{tx.name}</h3>
                        <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">{tx.category}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-muted-foreground">{tx.indication}</p>
                    </div>
                  </div>
                  {openTreatment === i ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                {openTreatment === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-700 dark:text-foreground mb-3">{tx.description}</p>
                    <div className="bg-amber-50 rounded-lg p-3 mb-3">
                      <p className="text-sm font-medium text-amber-800">{tx.evidence}</p>
                    </div>
                    <ul className="space-y-2">
                      {tx.details.map((detail, di) => (
                        <li key={di} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-foreground text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quando Procurar o Urologista */}
      <section className="py-16 bg-gray-50 dark:bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-6 text-center">Quando Procurar o Urologista?</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Casal tentando engravidar há mais de 12 meses sem sucesso",
              "Parceira com mais de 35 anos e tentativa há mais de 6 meses",
              "Espermograma alterado (oligozoospermia, astenozoospermia, azoospermia)",
              "História de criptorquidia, varicocele ou cirurgias genitais",
              "Uso atual ou prévio de testosterona ou anabolizantes",
              "Quimioterapia ou radioterapia prévia (preservação de fertilidade)",
              "Disfunção erétil ou ejaculatória associada",
              "Dor ou aumento testicular (excluir tumor testicular)",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 bg-white dark:bg-card rounded-lg p-4 shadow-sm border border-gray-100"
              >
                <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700 dark:text-foreground text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-3 text-center">Perguntas Frequentes</h2>
            <p className="text-gray-600 dark:text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Respostas baseadas nas guidelines EAU 2025 e AUA/ASRM 2024
            </p>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-gray-50 dark:bg-card rounded-xl border border-gray-200 dark:border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-100 dark:hover:bg-muted dark:bg-muted transition-colors"
                >
                  <span className="text-left font-semibold text-gray-900 dark:text-foreground pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-700 dark:text-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Avaliação Especializada em Fertilidade Masculina</h2>
            <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
              O diagnóstico precoce e o tratamento adequado podem restaurar a fertilidade natural em muitos casos.
              Agende uma consulta para avaliação individualizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5511981124455?text=Olá, gostaria de tirar dúvidas sobre avaliação de fertilidade masculina."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-card text-amber-700 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors shadow-lg"
              >
                Agendar pelo WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://www.doctoralia.com.br/felipe-de-bulhoes/urologista/campinas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors border border-amber-400"
              >
                Agendar pela Doctoralia
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Referências */}
      <section className="py-12 bg-gray-50 dark:bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-6">Referências</h2>
          <ol className="space-y-2">
            {references.map((ref) => (
              <li key={ref.num} className="text-sm text-gray-600 dark:text-muted-foreground flex gap-2">
                <span className="font-semibold text-amber-700 flex-shrink-0">[{ref.num}]</span>
                <span>{ref.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </EducationalLayout>
  );
}
