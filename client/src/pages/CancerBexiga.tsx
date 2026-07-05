import { trackDoctoraliaClick } from "@/lib/analytics";
/**
 * Design: Clinical Precision — Swiss Medical Design
 * Página: Câncer de Bexiga — Guia Completo
 * Referências: EAU Guidelines 2026 (NMIBC + MIBC), AUA 2024, SBU, Campbell-Walsh-Wein 13th Ed.
 */
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Stethoscope,
  Activity,
  FileText,
  HeartPulse,
  ChevronRight,
  MapPin,
  Phone,
  Microscope,
  Target,
  ShieldAlert,
  CalendarCheck,
  Building2,
  Pill,
  Droplets,
  Cigarette,
  Eye,
  Syringe,
  Zap,
  Brain,
  Radiation,
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import EducationalLayout from "@/components/EducationalLayout";
import { FAQSchema } from "@/components/SchemaMarkup";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const cancerBexigaFAQs = [
  { question: "Sangue na urina sempre significa câncer de bexiga?", answer: "Não. A hematúria pode ter diversas causas, como infecção urinária, cálculos renais, hiperplasia prostática benigna ou trauma. Porém, toda hematúria macroscópica (sangue visível) deve ser investigada para descartar câncer, especialmente em pacientes acima de 40 anos ou com fatores de risco." },
  { question: "O câncer de bexiga tem cura?", answer: "Sim, especialmente quando diagnosticado precocemente. Tumores não-músculo invasivos (75% dos casos) têm excelente prognóstico com tratamento adequado (RTU-B + BCG). Mesmo tumores músculo-invasivos podem ser curados com cistectomia radical e quimioterapia neoadjuvante." },
  { question: "O que é BCG intravesical?", answer: "BCG (Bacillus Calmette-Guérin) é uma imunoterapia intravesical — uma solução contendo bactérias atenuadas é instilada diretamente na bexiga para estimular o sistema imunológico a combater as células tumorais. É o tratamento padrão-ouro para tumores de alto risco e CIS." },
  { question: "É possível viver sem bexiga?", answer: "Sim. Após a cistectomia radical, existem opções de derivação urinária: neobexiga (bexiga reconstruída com intestino, permitindo micção pela uretra), conduto ileal (urostomia com bolsa coletora) ou derivação continente cutânea. A qualidade de vida pode ser muito boa com adaptação adequada." },
  { question: "Quem fuma tem mais chance de ter câncer de bexiga?", answer: "Sim, significativamente. O tabagismo é responsável por aproximadamente 50% dos casos de câncer de bexiga. Fumantes de 20 cigarros/dia têm risco 3,27 vezes maior que não-fumantes. Parar de fumar é a medida preventiva mais importante." },
  { question: "A cistoscopia dói?", answer: "A cistoscopia flexível é realizada com anestesia local (gel de lidocaína) e causa desconforto mínimo. A maioria dos pacientes tolera bem o procedimento, que dura poucos minutos. É fundamental para o diagnóstico e seguimento do câncer de bexiga." },
  { question: "Qual a diferença entre NMIBC e MIBC?", answer: "NMIBC (não-músculo invasivo) é o tumor confinado à mucosa ou submucosa da bexiga — tratado com RTU-B e terapia intravesical. MIBC (músculo-invasivo) invade a camada muscular da bexiga — geralmente requer cistectomia radical com quimioterapia neoadjuvante ou radioterapia." },
  { question: "A cirurgia robótica pode ser usada no câncer de bexiga?", answer: "Sim. A cistectomia radical robótica (RARC) é uma opção cada vez mais utilizada, com resultados oncológicos comparáveis à cirurgia aberta, menor sangramento e recuperação mais rápida. O Dr. Felipe de Bulhões pode orientar sobre a melhor abordagem para cada caso." }
];

export default function CancerBexiga() {
  return (
    <EducationalLayout
      title="Câncer de Bexiga: Guia Completo"
      subtitle="Oncologia Urológica"
      description="Tudo o que você precisa saber sobre o câncer de bexiga: fatores de risco, sintomas, diagnóstico, estadiamento, tratamento e seguimento. Informações baseadas nas diretrizes da EAU 2026, AUA e SBU."
      accentColor="#7C3AED"
      metaTitle="Câncer de Bexiga: Sintomas, Diagnóstico e Tratamento | Dr. Felipe de Bulhões"
      metaDescription="Guia completo sobre câncer de bexiga: hematúria, cistoscopia, RTU-B, BCG intravesical, cistectomia radical e imunoterapia. Urologista em Campinas e São Paulo."
    >
      <FAQSchema questions={cancerBexigaFAQs} />

      {/* O que é */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Target className="w-5 h-5 text-purple-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">O que é o Câncer de Bexiga?</h2>
        </div>
        <div className="bg-white dark:bg-card rounded-xl border border-gray-100 p-6 shadow-sm">
          <p className="text-gray-700 dark:text-foreground leading-relaxed mb-4">
            O <strong>câncer de bexiga</strong> é o sexto tipo de câncer mais diagnosticado em homens no mundo e o nono considerando ambos os sexos. Origina-se no <strong>urotélio</strong> — o revestimento interno da bexiga — e pode se apresentar em diferentes estágios de profundidade e agressividade.
          </p>
          <p className="text-gray-700 dark:text-foreground leading-relaxed mb-4">
            Aproximadamente <strong>75% dos casos</strong> são diagnosticados como <strong>câncer de bexiga não-músculo invasivo (NMIBC)</strong>, confinado à mucosa (Ta, CIS) ou submucosa (T1). Os demais 25% apresentam invasão da camada muscular (MIBC — T2 ou mais), exigindo tratamentos mais agressivos.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <h4 className="font-semibold text-purple-800 mb-2">Incidência Mundial</h4>
              <p className="text-sm text-gray-700 dark:text-foreground">
                <strong>Homens:</strong> 9,3 por 100.000/ano<br />
                <strong>Mulheres:</strong> 2,4 por 100.000/ano<br />
                <span className="text-xs text-gray-500 dark:text-muted-foreground">Fonte: EAU Guidelines 2026 [1]</span>
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <h4 className="font-semibold text-purple-800 mb-2">Mortalidade Mundial</h4>
              <p className="text-sm text-gray-700 dark:text-foreground">
                <strong>Homens:</strong> 3,1 por 100.000/ano<br />
                <strong>Mulheres:</strong> 0,80 por 100.000/ano<br />
                <span className="text-xs text-gray-500 dark:text-muted-foreground">Fonte: EAU Guidelines 2026 [1]</span>
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Fatores de Risco */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">Fatores de Risco</h2>
        </div>
        <div className="bg-white dark:bg-card rounded-xl border border-gray-100 p-6 shadow-sm">
          <p className="text-gray-700 dark:text-foreground leading-relaxed mb-6">
            O câncer de bexiga possui fatores de risco bem estabelecidos. O <strong>tabagismo</strong> é o principal, responsável por aproximadamente 50% dos casos. A exposição ocupacional a substâncias químicas é o segundo fator mais relevante.
          </p>
          <div className="space-y-4">
            {[
              {
                icon: <Cigarette className="w-5 h-5 text-red-600" />,
                title: "Tabagismo (Principal Fator)",
                desc: "Responsável por ~50% dos casos. Risco relativo de 2,52 para 10 cigarros/dia e 3,27 para 20 cigarros/dia. Cigarros com baixo teor de alcatrão NÃO reduzem o risco. O risco aumenta com duração e intensidade do hábito.",
                level: "Nível de Evidência 1a",
              },
              {
                icon: <Building2 className="w-5 h-5 text-orange-600" />,
                title: "Exposição Ocupacional",
                desc: "Segundo fator mais importante (~10% dos casos). Aminas aromáticas, hidrocarbonetos policíclicos e clorados em indústrias de tintas, corantes, metais e petróleo. Exposição a diesel: OR 1,61.",
                level: "Nível de Evidência 2a",
              },
              {
                icon: <Brain className="w-5 h-5 text-blue-600" />,
                title: "Predisposição Genética",
                desc: "Portadores de Síndrome de Lynch têm risco aumentado. Familiares de 1º e 2º grau: HR 1,69. Gene GSTM1 (glutationa S-transferase) identificado como fator-chave.",
                level: "Nível de Evidência 2b",
              },
              {
                icon: <Droplets className="w-5 h-5 text-cyan-600" />,
                title: "Fatores Ambientais",
                desc: "Arsênico na água potável, cloração da água (trihalometanos). Efeito combinado arsênico + tabagismo. Uso de tinturas permanentes de cabelo em indivíduos com fenótipo NAT2 lento.",
                level: "Nível de Evidência 2b",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 2}
                className="flex gap-4 p-4 bg-gray-50 dark:bg-card rounded-lg border border-gray-100"
              >
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-card flex items-center justify-center shrink-0 shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-foreground">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground mt-1">{item.desc}</p>
                  <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                    {item.level}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sintomas e Sinais de Alerta */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">Sintomas e Sinais de Alerta</h2>
        </div>
        <div className="bg-white dark:bg-card rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Sinal de Alerta Principal: Hematúria
            </p>
            <p className="text-sm text-red-700 mt-2">
              A <strong>hematúria macroscópica indolor</strong> (sangue visível na urina sem dor) é o sintoma mais comum e deve ser investigada com urgência. Mesmo a hematúria microscópica (detectada em exame de urina) merece atenção, especialmente em pacientes com fatores de risco.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-card rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-foreground mb-3">Sintomas Urinários</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-foreground">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span><strong>Hematúria macroscópica</strong> — sangue visível na urina (80% dos casos)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span><strong>Hematúria microscópica</strong> — detectada em exame de urina</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span><strong>Urgência miccional</strong> — vontade súbita e intensa de urinar</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span><strong>Polaciúria</strong> — aumento da frequência urinária</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span><strong>Disúria</strong> — dor ou ardência ao urinar</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-card rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-foreground mb-3">Sintomas de Doença Avançada</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-foreground">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <span>Dor pélvica ou lombar</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <span>Edema de membros inferiores</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <span>Perda de peso inexplicada</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <span>Dor óssea (metástases)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <span>Hidronefrose (obstrução ureteral)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Diagnóstico */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Microscope className="w-5 h-5 text-blue-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">Diagnóstico</h2>
        </div>
        <div className="bg-white dark:bg-card rounded-xl border border-gray-100 p-6 shadow-sm">
          <p className="text-gray-700 dark:text-foreground leading-relaxed mb-6">
            O diagnóstico do câncer de bexiga envolve uma combinação de exames laboratoriais, de imagem e procedimentos endoscópicos. A <strong>cistoscopia</strong> é o exame padrão-ouro para visualização direta do tumor.
          </p>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Exame de Urina e Citologia",
                desc: "Urina tipo I (EAS) para detectar hematúria. A citologia urinária tem alta especificidade para tumores de alto grau e CIS, mas baixa sensibilidade para tumores de baixo grau.",
              },
              {
                step: "2",
                title: "Ultrassonografia do Trato Urinário",
                desc: "Exame inicial não-invasivo para avaliação da bexiga e rins. Pode detectar tumores vesicais >5mm, hidronefrose e massas renais.",
              },
              {
                step: "3",
                title: "Cistoscopia (Padrão-Ouro)",
                desc: "Exame endoscópico que permite visualização direta da mucosa vesical. Realizado com cistoscópio flexível sob anestesia local. A cistoscopia com luz azul (PDD) aumenta a detecção de CIS e tumores papilares.",
              },
              {
                step: "4",
                title: "Tomografia Computadorizada (Uro-TC)",
                desc: "Avaliação do trato urinário superior e estadiamento. Fase excretora para avaliar ureteres e pelve renal. Essencial para descartar tumores do trato urinário superior.",
              },
              {
                step: "5",
                title: "RTU-B (Ressecção Transuretral de Bexiga)",
                desc: "Procedimento diagnóstico E terapêutico. Remove o tumor para análise histopatológica (grau e estágio). Deve incluir músculo detrusor na amostra para estadiamento adequado.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 4}
                className="flex gap-4 p-4 bg-gray-50 dark:bg-card rounded-lg border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center shrink-0 text-white font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-foreground">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Estadiamento TNM */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={4}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
            <FileText className="w-5 h-5 text-indigo-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">Estadiamento TNM</h2>
        </div>
        <div className="bg-white dark:bg-card rounded-xl border border-gray-100 p-6 shadow-sm">
          <p className="text-gray-700 dark:text-foreground leading-relaxed mb-6">
            O estadiamento define a profundidade de invasão do tumor na parede vesical e é fundamental para determinar o tratamento adequado. A classificação TNM (Tumor, Linfonodos, Metástases) é o sistema utilizado internacionalmente.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-purple-50">
                  <th className="text-left p-3 font-semibold text-purple-900 border-b border-purple-200">Estágio</th>
                  <th className="text-left p-3 font-semibold text-purple-900 border-b border-purple-200">Descrição</th>
                  <th className="text-left p-3 font-semibold text-purple-900 border-b border-purple-200">Classificação</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { stage: "Ta", desc: "Carcinoma papilar não-invasivo (confinado ao urotélio)", class: "NMIBC" },
                  { stage: "CIS (Tis)", desc: "Carcinoma in situ — plano, alto grau, confinado ao urotélio", class: "NMIBC" },
                  { stage: "T1", desc: "Invasão da lâmina própria (submucosa)", class: "NMIBC" },
                  { stage: "T2a", desc: "Invasão da metade interna da muscular própria", class: "MIBC" },
                  { stage: "T2b", desc: "Invasão da metade externa da muscular própria", class: "MIBC" },
                  { stage: "T3a", desc: "Invasão microscópica do tecido perivesical", class: "MIBC" },
                  { stage: "T3b", desc: "Invasão macroscópica do tecido perivesical", class: "MIBC" },
                  { stage: "T4a", desc: "Invasão de próstata, útero ou vagina", class: "MIBC" },
                  { stage: "T4b", desc: "Invasão da parede pélvica ou abdominal", class: "MIBC" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50 dark:bg-card"}>
                    <td className="p-3 font-semibold text-purple-700 border-b border-gray-100">{row.stage}</td>
                    <td className="p-3 text-gray-700 dark:text-foreground border-b border-gray-100">{row.desc}</td>
                    <td className="p-3 border-b border-gray-100">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        row.class === "NMIBC" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {row.class}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-muted-foreground mt-3">
            NMIBC = Câncer de Bexiga Não-Músculo Invasivo | MIBC = Câncer de Bexiga Músculo-Invasivo. Fonte: EAU Guidelines 2026 [1,2]
          </p>
        </div>
      </motion.section>

      {/* Tratamento NMIBC */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={5}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <Syringe className="w-5 h-5 text-green-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">Tratamento do NMIBC (Não-Músculo Invasivo)</h2>
        </div>
        <div className="bg-white dark:bg-card rounded-xl border border-gray-100 p-6 shadow-sm">
          <p className="text-gray-700 dark:text-foreground leading-relaxed mb-6">
            O tratamento do câncer de bexiga não-músculo invasivo depende do grupo de risco (baixo, intermediário, alto e muito alto risco) e envolve a combinação de cirurgia endoscópica com terapia intravesical.
          </p>
          <div className="space-y-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                1. RTU-B (Ressecção Transuretral de Bexiga)
              </h4>
              <p className="text-sm text-gray-700 dark:text-foreground">
                Primeiro passo do tratamento — remove completamente o tumor visível por via endoscópica. Deve incluir músculo detrusor para estadiamento. Uma <strong>segunda RTU-B (re-RTU)</strong> em 2-6 semanas é recomendada para tumores T1 e de alto grau, pois detecta doença residual em até 50% dos casos.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <Pill className="w-4 h-4" />
                2. Quimioterapia Intravesical (Instilação Única)
              </h4>
              <p className="text-sm text-gray-700 dark:text-foreground">
                Uma dose única de <strong>mitomicina C</strong> ou <strong>gemcitabina</strong> instilada na bexiga nas primeiras 24 horas após a RTU-B. Reduz o risco de recorrência em tumores de baixo risco em até 35%.
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                3. BCG Intravesical (Bacillus Calmette-Guérin)
              </h4>
              <p className="text-sm text-gray-700 dark:text-foreground">
                Padrão-ouro para tumores de alto risco e CIS. Esquema de indução (6 semanas) seguido de manutenção (até 3 anos). O BCG estimula o sistema imunológico a atacar as células tumorais. Reduz recorrência e progressão. Novidade 2026: <strong>sasanlimab e durvalumab</strong> adicionados ao BCG em pacientes selecionados de alto e muito alto risco.
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
              <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                4. Cistectomia Radical (Casos Refratários)
              </h4>
              <p className="text-sm text-gray-700 dark:text-foreground">
                Indicada para tumores que não respondem ao BCG (BCG-unresponsive) ou com progressão para músculo-invasivo. Envolve a remoção completa da bexiga com derivação urinária.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Tratamento MIBC */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={6}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
            <HeartPulse className="w-5 h-5 text-red-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">Tratamento do MIBC (Músculo-Invasivo)</h2>
        </div>
        <div className="bg-white dark:bg-card rounded-xl border border-gray-100 p-6 shadow-sm">
          <p className="text-gray-700 dark:text-foreground leading-relaxed mb-6">
            O câncer de bexiga músculo-invasivo requer tratamento multimodal. Todos os pacientes devem ser discutidos em <strong>equipe multidisciplinar (MDT)</strong> antes do início do tratamento, conforme recomendação forte da EAU 2026.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-red-50">
                  <th className="text-left p-3 font-semibold text-red-900 border-b border-red-200">Modalidade</th>
                  <th className="text-left p-3 font-semibold text-red-900 border-b border-red-200">Descrição</th>
                  <th className="text-left p-3 font-semibold text-red-900 border-b border-red-200">Indicação</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    mod: "Quimioterapia Neoadjuvante",
                    desc: "Quimioterapia baseada em cisplatina antes da cirurgia. Melhora a sobrevida global em 5-8%.",
                    ind: "Pacientes elegíveis a cisplatina com MIBC",
                  },
                  {
                    mod: "Cistectomia Radical",
                    desc: "Remoção da bexiga + linfadenectomia pélvica. Padrão-ouro para MIBC. Pode ser aberta, laparoscópica ou robótica (RARC).",
                    ind: "T2-T4a, N0-Nx, M0",
                  },
                  {
                    mod: "Derivação Urinária",
                    desc: "Neobexiga ortotópica (Studer/Hautmann), conduto ileal (Bricker) ou derivação continente cutânea.",
                    ind: "Após cistectomia radical",
                  },
                  {
                    mod: "Preservação Vesical (TMT)",
                    desc: "RTU-B máxima + quimiorradioterapia concomitante. Alternativa à cistectomia em casos selecionados.",
                    ind: "Pacientes selecionados que recusam cistectomia",
                  },
                  {
                    mod: "Imunoterapia Adjuvante",
                    desc: "Nivolumab adjuvante pós-cistectomia. Pembrolizumab, atezolizumab e avelumab em doença metastática.",
                    ind: "Pós-cistectomia ou doença avançada/metastática",
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50 dark:bg-card"}>
                    <td className="p-3 font-semibold text-red-700 border-b border-gray-100">{row.mod}</td>
                    <td className="p-3 text-gray-700 dark:text-foreground border-b border-gray-100">{row.desc}</td>
                    <td className="p-3 text-gray-600 dark:text-muted-foreground border-b border-gray-100">{row.ind}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-800">
              <strong>Cirurgia Robótica (RARC):</strong> A cistectomia radical robótica oferece resultados oncológicos comparáveis à cirurgia aberta, com menor sangramento e recuperação mais rápida. Saiba mais na nossa{" "}
              <Link href="/educativo/cirurgia-robotica" className="underline font-semibold">
                página sobre Cirurgia Robótica
              </Link>.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Seguimento */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={7}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <CalendarCheck className="w-5 h-5 text-amber-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">Seguimento e Acompanhamento</h2>
        </div>
        <div className="bg-white dark:bg-card rounded-xl border border-gray-100 p-6 shadow-sm">
          <p className="text-gray-700 dark:text-foreground leading-relaxed mb-6">
            O acompanhamento regular é fundamental, pois o câncer de bexiga tem alta taxa de recorrência. O protocolo de seguimento varia conforme o grupo de risco e o tipo de tratamento realizado.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-amber-50">
                  <th className="text-left p-3 font-semibold text-amber-900 border-b border-amber-200">Grupo de Risco</th>
                  <th className="text-left p-3 font-semibold text-amber-900 border-b border-amber-200">Cistoscopia</th>
                  <th className="text-left p-3 font-semibold text-amber-900 border-b border-amber-200">Citologia</th>
                  <th className="text-left p-3 font-semibold text-amber-900 border-b border-amber-200">Imagem (Uro-TC)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-card">
                  <td className="p-3 font-semibold text-gray-700 dark:text-foreground border-b border-gray-100">Baixo Risco</td>
                  <td className="p-3 text-gray-600 dark:text-muted-foreground border-b border-gray-100">3 meses, depois anual por 5 anos</td>
                  <td className="p-3 text-gray-600 dark:text-muted-foreground border-b border-gray-100">Não obrigatória</td>
                  <td className="p-3 text-gray-600 dark:text-muted-foreground border-b border-gray-100">Não obrigatória</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-card">
                  <td className="p-3 font-semibold text-gray-700 dark:text-foreground border-b border-gray-100">Risco Intermediário</td>
                  <td className="p-3 text-gray-600 dark:text-muted-foreground border-b border-gray-100">3, 6, 12 meses, depois anual por 5 anos</td>
                  <td className="p-3 text-gray-600 dark:text-muted-foreground border-b border-gray-100">A cada cistoscopia</td>
                  <td className="p-3 text-gray-600 dark:text-muted-foreground border-b border-gray-100">Anual</td>
                </tr>
                <tr className="bg-white dark:bg-card">
                  <td className="p-3 font-semibold text-gray-700 dark:text-foreground border-b border-gray-100">Alto Risco</td>
                  <td className="p-3 text-gray-600 dark:text-muted-foreground border-b border-gray-100">3, 6, 9, 12 meses, depois semestral até 5 anos, anual após</td>
                  <td className="p-3 text-gray-600 dark:text-muted-foreground border-b border-gray-100">A cada cistoscopia</td>
                  <td className="p-3 text-gray-600 dark:text-muted-foreground border-b border-gray-100">Anual</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-muted-foreground mt-3">
            Adaptado das EAU Guidelines 2026 [1]. O seguimento pode ser individualizado conforme resposta ao tratamento.
          </p>
        </div>
      </motion.section>

      {/* Prevenção */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={8}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <Shield className="w-5 h-5 text-amber-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">Prevenção</h2>
        </div>
        <div className="bg-white dark:bg-card rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <h4 className="font-semibold text-amber-800 mb-2">Cessação do Tabagismo</h4>
              <p className="text-sm text-gray-700 dark:text-foreground">
                A medida preventiva mais importante. Parar de fumar reduz significativamente o risco de desenvolver câncer de bexiga e de recorrência após o tratamento. O risco diminui progressivamente com o tempo de cessação.
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <h4 className="font-semibold text-amber-800 mb-2">Proteção Ocupacional</h4>
              <p className="text-sm text-gray-700 dark:text-foreground">
                Uso adequado de EPIs em ambientes com exposição a substâncias químicas. Seguir rigorosamente as normas de segurança do trabalho em indústrias de risco.
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <h4 className="font-semibold text-amber-800 mb-2">Hidratação Adequada</h4>
              <p className="text-sm text-gray-700 dark:text-foreground">
                Ingestão adequada de líquidos para diluir substâncias potencialmente carcinogênicas na urina e reduzir o tempo de contato com a mucosa vesical.
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <h4 className="font-semibold text-amber-800 mb-2">Dieta Mediterrânea</h4>
              <p className="text-sm text-gray-700 dark:text-foreground">
                Rica em vegetais, frutas e gorduras não-saturadas (azeite). Associada a redução do risco de câncer de bexiga (HR 0,85). Evitar dieta ocidental rica em gorduras saturadas.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Onde Tratar - Campinas */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={9}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-purple-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">Onde Tratar em Campinas e São Paulo</h2>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100 p-6">
          <p className="text-gray-700 dark:text-foreground leading-relaxed mb-4">
            O <strong>Dr. Felipe de Bulhões</strong> oferece atendimento especializado em oncologia urológica, incluindo diagnóstico e tratamento completo do câncer de bexiga, desde a RTU-B até o acompanhamento pós-tratamento.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-card rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-900 dark:text-foreground mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-600" />
                Campinas Day Hospital
              </h4>
              <p className="text-sm text-gray-600 dark:text-muted-foreground">
                Av. Benjamin Constant, 1991 — Cambuí, Campinas/SP<br />
                Procedimentos cirúrgicos e RTU-B<br />
                
              </p>
            </div>
            <div className="bg-white dark:bg-card rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-900 dark:text-foreground mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-600" />
                Clinovi Paulista / Clinovi Moema
              </h4>
              <p className="text-sm text-gray-600 dark:text-muted-foreground">
                Atendimento ambulatorial em São Paulo<br />
                Consultas e acompanhamento<br />
                <strong>Particular</strong>
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas?utm_source=site&utm_medium=educational&utm_campaign=cancer-bexiga" onClick={() => trackDoctoraliaClick("cancer_bexiga")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <CalendarCheck className="w-4 h-4 mr-2" />
                Agendar Consulta
              </Button>
            </a>
            <a href="https://wa.me/5511981124455" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp SP: (11) 98112-4455 | WhatsApp Campinas: (19) 99855-9890 | Tel: Clinovi (11) 3382-1529 | Campinas (19) 2127-2900
              </Button>
            </a>
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={10}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-muted flex items-center justify-center">
            <Activity className="w-5 h-5 text-gray-700 dark:text-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">Perguntas Frequentes</h2>
        </div>
        <div className="space-y-4">
          {[
            {
              q: "Sangue na urina sempre significa câncer de bexiga?",
              a: "Não. A hematúria pode ter diversas causas, como infecção urinária, cálculos renais, hiperplasia prostática benigna ou trauma. Porém, toda hematúria macroscópica (sangue visível) deve ser investigada para descartar câncer, especialmente em pacientes acima de 40 anos ou com fatores de risco.",
            },
            {
              q: "O câncer de bexiga tem cura?",
              a: "Sim, especialmente quando diagnosticado precocemente. Tumores não-músculo invasivos (75% dos casos) têm excelente prognóstico com tratamento adequado (RTU-B + BCG). Mesmo tumores músculo-invasivos podem ser curados com cistectomia radical e quimioterapia neoadjuvante.",
            },
            {
              q: "O que é BCG intravesical?",
              a: "BCG (Bacillus Calmette-Guérin) é uma imunoterapia intravesical — uma solução contendo bactérias atenuadas é instilada diretamente na bexiga para estimular o sistema imunológico a combater as células tumorais. É o tratamento padrão-ouro para tumores de alto risco e CIS.",
            },
            {
              q: "É possível viver sem bexiga?",
              a: "Sim. Após a cistectomia radical, existem opções de derivação urinária: neobexiga (bexiga reconstruída com intestino, permitindo micção pela uretra), conduto ileal (urostomia com bolsa coletora) ou derivação continente cutânea. A qualidade de vida pode ser muito boa com adaptação adequada.",
            },
            {
              q: "Quem fuma tem mais chance de ter câncer de bexiga?",
              a: "Sim, significativamente. O tabagismo é responsável por aproximadamente 50% dos casos de câncer de bexiga. Fumantes de 20 cigarros/dia têm risco 3,27 vezes maior que não-fumantes. Parar de fumar é a medida preventiva mais importante.",
            },
            {
              q: "A cistoscopia dói?",
              a: "A cistoscopia flexível é realizada com anestesia local (gel de lidocaína) e causa desconforto mínimo. A maioria dos pacientes tolera bem o procedimento, que dura poucos minutos. É fundamental para o diagnóstico e seguimento do câncer de bexiga.",
            },
            {
              q: "Qual a diferença entre NMIBC e MIBC?",
              a: "NMIBC (não-músculo invasivo) é o tumor confinado à mucosa ou submucosa da bexiga — tratado com RTU-B e terapia intravesical. MIBC (músculo-invasivo) invade a camada muscular da bexiga — geralmente requer cistectomia radical com quimioterapia. Cerca de 75% dos diagnósticos são NMIBC.",
            },
            {
              q: "A cirurgia robótica pode ser usada no câncer de bexiga?",
              a: "Sim. A cistectomia radical robótica (RARC) é uma opção cada vez mais utilizada, com resultados oncológicos comparáveis à cirurgia aberta, menor sangramento e recuperação mais rápida. O Dr. Felipe de Bulhões pode orientar sobre a melhor abordagem para cada caso.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i + 11}
              className="bg-white dark:bg-card rounded-xl border border-gray-100 p-5 shadow-sm"
            >
              <h4 className="font-semibold text-gray-900 dark:text-foreground mb-2">{item.q}</h4>
              <p className="text-sm text-gray-600 dark:text-muted-foreground leading-relaxed">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Referências */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={11}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-muted flex items-center justify-center">
            <FileText className="w-5 h-5 text-gray-700 dark:text-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">Referências Científicas</h2>
        </div>
        <div className="bg-white dark:bg-card rounded-xl border border-gray-100 p-6 shadow-sm">
          <ol className="space-y-2 text-sm text-gray-600 dark:text-muted-foreground list-decimal list-inside">
            <li>
              EAU Guidelines on Non-muscle-invasive Bladder Cancer. European Association of Urology, 2026.{" "}
              <a href="https://uroweb.org/guidelines/non-muscle-invasive-bladder-cancer" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">
                uroweb.org
              </a>
            </li>
            <li>
              EAU Guidelines on Muscle-invasive and Metastatic Bladder Cancer. European Association of Urology, 2026.{" "}
              <a href="https://uroweb.org/guidelines/muscle-invasive-and-metastatic-bladder-cancer" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">
                uroweb.org
              </a>
            </li>
            <li>
              AUA/ASTRO/SUO Guideline on Non-Muscle Invasive Bladder Cancer. American Urological Association, 2024.
            </li>
            <li>
              Babjuk M, et al. European Association of Urology Guidelines on Non-muscle-invasive Bladder Cancer (Ta, T1, and CIS). Eur Urol. 2022;81(1):75-94.
            </li>
            <li>
              Witjes JA, et al. European Association of Urology Guidelines on Muscle-invasive and Metastatic Bladder Cancer. Eur Urol. 2021;79(1):82-104.
            </li>
            <li>
              Sung H, et al. Global Cancer Statistics 2020: GLOBOCAN Estimates of Incidence and Mortality Worldwide. CA Cancer J Clin. 2021;71(3):209-249.
            </li>
            <li>
              Freedman ND, et al. Association between smoking and risk of bladder cancer among men and women. JAMA. 2011;306(7):737-745.
            </li>
            <li>
              Powles T, et al. Avelumab Maintenance Therapy for Advanced or Metastatic Urothelial Carcinoma. N Engl J Med. 2020;383(13):1218-1230.
            </li>
            <li>
              Parekh DJ, et al. Robot-assisted radical cystectomy versus open radical cystectomy in patients with bladder cancer (RAZOR): an open-label, randomised, phase 3, non-inferiority trial. Lancet. 2018;391(10139):2525-2536.
            </li>
            <li>
              Campbell-Walsh-Wein Urology. 13th Edition. Elsevier, 2024. Chapter: Bladder Cancer.
            </li>
          </ol>
        </div>
      </motion.section>
    </EducationalLayout>
  );
}
