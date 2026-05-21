/**
 * Design: Clinical Precision — Swiss Medical Design
 * Página: Tratamento do Câncer de Próstata — Guia Completo
 * Referências: EAU Guidelines 2025, AUA 2024, Campbell-Walsh-Wein 13th Ed.
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
  Cpu,
  Radiation,
  Eye,
  Swords,
  Zap,
  Users,
  TrendingUp,
  BarChart3,
  CircleDot,
  Crosshair,
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

const tratamentoCancerProstataFAQs = [
  { question: "Qual é o melhor tratamento para o câncer de próstata?", answer: "Não existe um tratamento único 'melhor'. A escolha depende do grupo de risco, expectativa de vida, preferências do paciente e efeitos colaterais aceitáveis. Para baixo risco, a vigilância ativa é o padrão. Para risco intermediário e alto, cirurgia robótica (RARP) e radioterapia são opções curativas equivalentes em termos de sobrevida." },
  { question: "A cirurgia robótica é melhor que a cirurgia aberta?", answer: "A RARP oferece recuperação funcional mais rápida (continência e ereção), menor sangramento e menos complicações pós-operatórias. Em 10 anos, os resultados oncológicos são equivalentes. A meta-análise de 5 RCTs mostra OR 4,05 para recuperação erétil a favor da RARP (p = 0,003)." },
  { question: "A vigilância ativa é segura?", answer: "Sim, para tumores de baixo risco. O estudo ProtecT (15 anos) mostrou sobrevida câncer-específica de 96,9% com monitoramento ativo. Porém, requer acompanhamento rigoroso com PSA, MRI e rebiópsias periódicas. Cerca de 1/3 dos pacientes eventualmente necessitam de tratamento curativo." },
  { question: "A radioterapia causa impotência?", answer: "A disfunção erétil pode ocorrer após radioterapia, mas geralmente de forma mais gradual que após cirurgia. Cerca de 30–50% dos pacientes apresentam algum grau de disfunção erétil após 2–5 anos. A braquiterapia tende a ter menores taxas de DE que a EBRT." },
  { question: "Quanto tempo dura o tratamento com radioterapia?", answer: "Depende do esquema: convencional (8 semanas), hipofracionamento moderado (4–6 semanas) ou SBRT/ultra-hipofracionamento (1–2 semanas, apenas 5–7 sessões). A SBRT é indicada para risco intermediário favorável." },
  { question: "O que é hormonioterapia e quando é usada?", answer: "A terapia de deprivação androgênica (ADT) bloqueia a testosterona, que estimula o crescimento do tumor. É combinada com radioterapia: 4–6 meses para risco intermediário e 2–3 anos para alto risco. Não é usada isoladamente como tratamento curativo." },
  { question: "Posso fazer tratamento focal (HIFU)?", answer: "As terapias focais (HIFU, crioterapia, PDT) são consideradas investigacionais pela EAU 2025 e devem ser realizadas apenas dentro de ensaios clínicos ou registros. Faltam dados comparativos de longo prazo (> 15 anos) para recomendação de rotina." },
  { question: "Após a cirurgia, o PSA deve zerar?", answer: "Sim. Após prostatectomia radical, o PSA deve tornar-se indetectável (< 0,1 ng/mL). Qualquer elevação acima de 0,2 ng/mL em duas medidas consecutivas é considerada recorrência bioquímica e deve ser investigada." }
];

export default function TratamentoCancerProstata() {
  return (
    <EducationalLayout
      title="Tratamento do Câncer de Próstata"
      subtitle="Guia Completo Baseado em Evidências"
      description="Conheça todas as opções de tratamento do câncer de próstata: vigilância ativa, cirurgia robótica (RARP), radioterapia, hormonioterapia e terapias focais. Informações baseadas nas diretrizes da EAU 2025."
      accentColor="#B87333"
      metaTitle="Tratamento do Câncer de Próstata: Cirurgia Robótica, Radioterapia e Vigilância Ativa | Dr. Felipe de Bulhões"
      metaDescription="Guia completo sobre tratamento do câncer de próstata: vigilância ativa, prostatectomia radical robótica (RARP), radioterapia (IMRT, braquiterapia), hormonioterapia e manejo por grupo de risco. Baseado nas EAU Guidelines 2025."
    >
      <FAQSchema questions={tratamentoCancerProstataFAQs} />

      {/* Introdução */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="bg-gradient-to-r from-amber-50 to-blue-50 border-l-4 border-[#B87333] p-6 rounded-r-lg mb-10">
              <p className="text-[#1C3D5A] dark:text-foreground leading-relaxed">
                O câncer de próstata é o <strong>tumor sólido mais comum no homem</strong> e a segunda causa de morte por câncer no sexo masculino. Felizmente, quando diagnosticado em estágio localizado, as taxas de cura são elevadas. A escolha do tratamento depende do <strong>grupo de risco</strong> (baseado em PSA, Gleason/ISUP e estadiamento), da <strong>expectativa de vida</strong> do paciente e de suas <strong>preferências pessoais</strong>. As diretrizes da <strong>European Association of Urology (EAU 2025)</strong> recomendam uma abordagem individualizada, com decisão compartilhada entre médico e paciente.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-5 shadow-sm text-center">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-[#B87333]" />
                </div>
                <h4 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-1">Vigilância Ativa</h4>
                <p className="text-sm text-gray-600 dark:text-muted-foreground">Monitoramento rigoroso sem tratamento imediato para tumores de baixo risco</p>
              </div>
              <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-5 shadow-sm text-center">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Cpu className="w-6 h-6 text-[#B87333]" />
                </div>
                <h4 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-1">Cirurgia Robótica</h4>
                <p className="text-sm text-gray-600 dark:text-muted-foreground">Prostatectomia radical assistida por robô (RARP) — padrão-ouro cirúrgico</p>
              </div>
              <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-5 shadow-sm text-center">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Radiation className="w-6 h-6 text-[#B87333]" />
                </div>
                <h4 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-1">Radioterapia</h4>
                <p className="text-sm text-gray-600 dark:text-muted-foreground">IMRT/VMAT, braquiterapia e SBRT com ou sem hormonioterapia</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 dark:text-foreground">
              <p>
                Este guia apresenta as principais modalidades de tratamento do câncer de próstata localizado e localmente avançado, com dados de ensaios clínicos randomizados e recomendações das principais sociedades urológicas internacionais.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Classificação de Risco */}
      <section className="py-16 bg-gray-50 dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#B87333] rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#1C3D5A] dark:text-foreground">Classificação de Risco (EAU 2025)</h2>
            </div>

            <p className="text-gray-700 dark:text-foreground mb-6 leading-relaxed">
              A estratificação de risco é fundamental para definir o tratamento mais adequado. A classificação da EAU considera o nível de PSA, o grau histológico (ISUP Grade Group) e o estadiamento clínico (TNM).
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white dark:bg-card rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-[#1C3D5A] text-white">
                    <th className="px-4 py-3 text-left text-sm font-semibold">Grupo de Risco</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">PSA</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">ISUP / Gleason</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Estágio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-green-50">
                    <td className="px-4 py-3 font-medium text-green-800">Baixo Risco</td>
                    <td className="px-4 py-3 text-sm">&lt; 10 ng/mL</td>
                    <td className="px-4 py-3 text-sm">ISUP 1 (Gleason 3+3=6)</td>
                    <td className="px-4 py-3 text-sm">cT1–cT2a</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="px-4 py-3 font-medium text-yellow-800">Risco Intermediário</td>
                    <td className="px-4 py-3 text-sm">10–20 ng/mL</td>
                    <td className="px-4 py-3 text-sm">ISUP 2–3 (Gleason 3+4 ou 4+3)</td>
                    <td className="px-4 py-3 text-sm">cT2b</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="px-4 py-3 font-medium text-orange-800">Alto Risco</td>
                    <td className="px-4 py-3 text-sm">&gt; 20 ng/mL</td>
                    <td className="px-4 py-3 text-sm">ISUP 4–5 (Gleason ≥ 4+4=8)</td>
                    <td className="px-4 py-3 text-sm">cT2c</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="px-4 py-3 font-medium text-red-800">Localmente Avançado</td>
                    <td className="px-4 py-3 text-sm">Qualquer</td>
                    <td className="px-4 py-3 text-sm">Qualquer</td>
                    <td className="px-4 py-3 text-sm">cT3–cT4 ou N+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> A classificação de risco intermediário é subdividida em <strong>favorável</strong> (ISUP 2, &lt; 10% padrão 4, poucos cores positivos) e <strong>desfavorável</strong> (ISUP 3, múltiplos fatores de risco). Essa distinção influencia diretamente a escolha terapêutica (EAU 2025, Section 6.3.2).
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vigilância Ativa */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#B87333] rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#1C3D5A] dark:text-foreground">Vigilância Ativa (Active Surveillance)</h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 dark:text-foreground mb-8">
              <p>
                A vigilância ativa (VA) é a <strong>estratégia padrão para câncer de próstata de baixo risco</strong> em pacientes com expectativa de vida superior a 10 anos (EAU 2025, recomendação <strong>Strong</strong>). O objetivo é evitar o sobretratamento — e seus efeitos colaterais — sem comprometer a sobrevida, monitorando rigorosamente o paciente para intervir caso haja progressão da doença.
              </p>
            </div>

            <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-6 shadow-sm mb-8">
              <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-4">Critérios de Inclusão (EAU 2025)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "Grau histológico", value: "ISUP Grade Group 1 (Gleason 3+3=6)" },
                  { label: "Estágio clínico", value: "cT1c ou cT2a" },
                  { label: "PSA", value: "< 10 ng/mL" },
                  { label: "Densidade do PSA", value: "< 0,15 ng/mL/cc" },
                  { label: "ISUP GG2 selecionados", value: "< 10% padrão 4, baixa extensão, ≤ 3 cores positivos" },
                  { label: "Exclusão", value: "ISUP GG ≥ 3, cribriform, ductal, invasão perineural" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#B87333] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-medium text-[#1C3D5A] dark:text-foreground">{item.label}:</span>{" "}
                      <span className="text-gray-600 dark:text-muted-foreground text-sm">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-6 shadow-sm mb-8">
              <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-4">Protocolo de Acompanhamento</h3>
              <div className="space-y-3">
                {[
                  { icon: Activity, text: "PSA a cada 3–6 meses nos primeiros 2 anos, depois semestral" },
                  { icon: Stethoscope, text: "Toque retal (DRE) a cada 12 meses" },
                  { icon: Microscope, text: "Ressonância magnética (mpMRI) a cada 12–24 meses" },
                  { icon: Target, text: "Biópsia de confirmação em 6–12 meses se não houve MRI prévia" },
                  { icon: FileText, text: "Rebiópsias periódicas guiadas por MRI (a cada 2–3 anos)" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <item.icon className="w-5 h-5 text-[#B87333] shrink-0" />
                    <span className="text-gray-700 dark:text-foreground text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-4">Evidências: Estudo ProtecT (15 anos)</h3>
              <p className="text-gray-700 dark:text-foreground text-sm mb-4">
                O estudo ProtecT (Hamdy et al., NEJM 2023) randomizou 1.643 pacientes em três braços: monitoramento ativo, prostatectomia radical e radioterapia. Após 15 anos de seguimento:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white dark:bg-card rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#1C3D5A] text-white">
                      <th className="px-3 py-2 text-left text-xs font-semibold">Desfecho</th>
                      <th className="px-3 py-2 text-center text-xs font-semibold">Monitoramento</th>
                      <th className="px-3 py-2 text-center text-xs font-semibold">Cirurgia (RP)</th>
                      <th className="px-3 py-2 text-center text-xs font-semibold">Radioterapia</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    <tr>
                      <td className="px-3 py-2 font-medium">Sobrevida câncer-específica</td>
                      <td className="px-3 py-2 text-center">96,9%</td>
                      <td className="px-3 py-2 text-center">97,8%</td>
                      <td className="px-3 py-2 text-center">97,1%</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-card">
                      <td className="px-3 py-2 font-medium">Progressão metastática</td>
                      <td className="px-3 py-2 text-center text-orange-600 font-medium">9,4%</td>
                      <td className="px-3 py-2 text-center text-green-600 font-medium">4,7%</td>
                      <td className="px-3 py-2 text-center text-green-600 font-medium">5,0%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">Progressão clínica</td>
                      <td className="px-3 py-2 text-center">25,9%</td>
                      <td className="px-3 py-2 text-center">10,7%</td>
                      <td className="px-3 py-2 text-center">10,7%</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-card">
                      <td className="px-3 py-2 font-medium">Morte por qualquer causa</td>
                      <td className="px-3 py-2 text-center">21,7%</td>
                      <td className="px-3 py-2 text-center">~21%</td>
                      <td className="px-3 py-2 text-center">~21%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 dark:text-muted-foreground mt-3">
                Fonte: Hamdy FC et al. Fifteen-Year Outcomes after Monitoring, Surgery, or Radiotherapy for Prostate Cancer. NEJM 2023; 388:1547-58.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800">
                    <strong>Importante:</strong> Embora a sobrevida câncer-específica seja semelhante entre as três estratégias, a vigilância ativa apresenta maior risco de progressão metastática (9,4% vs ~5%). Por isso, o acompanhamento rigoroso com MRI e rebiópsias é fundamental para identificar precocemente a necessidade de tratamento curativo.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prostatectomia Radical Robótica */}
      <section className="py-16 bg-gray-50 dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#B87333] rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#1C3D5A] dark:text-foreground">Prostatectomia Radical Robótica (RARP)</h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 dark:text-foreground mb-8">
              <p>
                A prostatectomia radical é o <strong>tratamento cirúrgico padrão</strong> para o câncer de próstata localizado em pacientes com expectativa de vida superior a 10 anos. A técnica <strong>robótica (RARP — Robot-Assisted Radical Prostatectomy)</strong> é atualmente a abordagem mais utilizada mundialmente, oferecendo vantagens em termos de recuperação funcional precoce quando comparada à cirurgia aberta (RRP).
              </p>
            </div>

            <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-6 shadow-sm mb-8">
              <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-4">Vantagens da RARP vs Cirurgia Aberta (RRP)</h3>
              <p className="text-gray-600 dark:text-muted-foreground text-sm mb-4">Meta-análise de 5 RCTs com 1.205 pacientes (EAU Guidelines 2025, Table 6.2.4):</p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white dark:bg-card rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#1C3D5A] text-white">
                      <th className="px-3 py-2 text-left text-xs font-semibold">Parâmetro</th>
                      <th className="px-3 py-2 text-center text-xs font-semibold">RARP</th>
                      <th className="px-3 py-2 text-center text-xs font-semibold">RRP (Aberta)</th>
                      <th className="px-3 py-2 text-center text-xs font-semibold">Significância</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    <tr>
                      <td className="px-3 py-2 font-medium">Continência 3 meses</td>
                      <td className="px-3 py-2 text-center text-green-600 font-medium">80%</td>
                      <td className="px-3 py-2 text-center">65%</td>
                      <td className="px-3 py-2 text-center">p = 0,002</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-card">
                      <td className="px-3 py-2 font-medium">Continência 6 meses</td>
                      <td className="px-3 py-2 text-center text-green-600 font-medium">90%</td>
                      <td className="px-3 py-2 text-center">82%</td>
                      <td className="px-3 py-2 text-center">p = 0,04</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">Continência 18 meses</td>
                      <td className="px-3 py-2 text-center text-green-600 font-medium">95%</td>
                      <td className="px-3 py-2 text-center">79%</td>
                      <td className="px-3 py-2 text-center">p &lt; 0,001</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-card">
                      <td className="px-3 py-2 font-medium">Recuperação erétil</td>
                      <td className="px-3 py-2 text-center text-green-600 font-medium">OR 4,05</td>
                      <td className="px-3 py-2 text-center">Referência</td>
                      <td className="px-3 py-2 text-center">p = 0,003</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">Complicações pós-op</td>
                      <td className="px-3 py-2 text-center text-green-600 font-medium">4%</td>
                      <td className="px-3 py-2 text-center">9%</td>
                      <td className="px-3 py-2 text-center">—</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-card">
                      <td className="px-3 py-2 font-medium">Controle oncológico</td>
                      <td className="px-3 py-2 text-center">Equivalente</td>
                      <td className="px-3 py-2 text-center">Equivalente</td>
                      <td className="px-3 py-2 text-center">NS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 dark:text-muted-foreground mt-3">
                Fontes: Coughlin et al. Eur Urol 2018; Yaxley et al. Lancet 2016; EAU Guidelines 2025.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-5 shadow-sm">
                <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#B87333]" />
                  Preservação Neurovascular
                </h4>
                <p className="text-sm text-gray-600 dark:text-muted-foreground">
                  A técnica <strong>nerve-sparing</strong> (preservação dos feixes neurovasculares) deve ser oferecida quando há baixo risco de doença extracapsular naquele lado (EAU 2025, <strong>Strong</strong>). A visão magnificada 10x do robô Da Vinci permite identificação precisa dos nervos, favorecendo a preservação da função erétil e continência urinária.
                </p>
              </div>
              <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-5 shadow-sm">
                <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#B87333]" />
                  Linfadenectomia (ePLND)
                </h4>
                <p className="text-sm text-gray-600 dark:text-muted-foreground">
                  A linfadenectomia pélvica estendida (ePLND) é recomendada quando o risco de invasão linfonodal é &gt; 5% por nomogramas (EAU 2025, <strong>Strong</strong>). Deve incluir os linfonodos obturadores, ilíacos internos e externos, e pré-sacrais. É fundamental para estadiamento e prognóstico.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-6 shadow-sm mb-8">
              <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-4">Indicações por Grupo de Risco</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 shrink-0"></div>
                  <div>
                    <span className="font-medium text-[#1C3D5A] dark:text-foreground">Baixo Risco:</span>{" "}
                    <span className="text-gray-600 dark:text-muted-foreground text-sm">Vigilância ativa é o padrão. RP não é recomendada de rotina (sobretratamento).</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1.5 shrink-0"></div>
                  <div>
                    <span className="font-medium text-[#1C3D5A] dark:text-foreground">Risco Intermediário:</span>{" "}
                    <span className="text-gray-600 dark:text-muted-foreground text-sm">RP é opção padrão para expectativa de vida &gt; 10 anos (Strong). Nerve-sparing quando possível.</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
                  <div>
                    <span className="font-medium text-[#1C3D5A] dark:text-foreground">Alto Risco:</span>{" "}
                    <span className="text-gray-600 dark:text-muted-foreground text-sm">RP é opção em pacientes selecionados com baixo volume tumoral. Pode ser parte de tratamento multimodal (RP + RT adjuvante/salvamento). ePLND obrigatória.</span>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/educativo/cirurgia-robotica">
              <div className="bg-gradient-to-r from-amber-50 to-blue-50 border border-amber-200 rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#1C3D5A] dark:text-foreground">Saiba mais sobre Cirurgia Robótica em Urologia</p>
                    <p className="text-sm text-gray-600 dark:text-muted-foreground">Página completa sobre o sistema Da Vinci, técnica e resultados</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#B87333]" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Radioterapia */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#B87333] rounded-lg flex items-center justify-center">
                <Radiation className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#1C3D5A] dark:text-foreground">Radioterapia</h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 dark:text-foreground mb-8">
              <p>
                A radioterapia é uma <strong>alternativa curativa à cirurgia</strong> para o câncer de próstata localizado e localmente avançado. As técnicas modernas — IMRT (Intensity-Modulated Radiation Therapy), VMAT (Volumetric Modulated Arc Therapy) e IGRT (Image-Guided Radiation Therapy) — permitem doses elevadas ao tumor com menor toxicidade aos tecidos adjacentes.
              </p>
            </div>

            {/* EBRT */}
            <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-6 shadow-sm mb-8">
              <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#B87333]" />
                Radioterapia Externa (EBRT)
              </h3>
              <div className="space-y-4 text-sm text-gray-700 dark:text-foreground">
                <p>
                  A radioterapia externa com modulação de intensidade (IMRT/VMAT) é o padrão atual. Diferentes esquemas de fracionamento estão disponíveis:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white dark:bg-card rounded-lg overflow-hidden border border-gray-200 dark:border-border">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-muted">
                        <th className="px-3 py-2 text-left text-xs font-semibold">Esquema</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold">Dose Total</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold">Frações</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold">Duração</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs">
                      <tr>
                        <td className="px-3 py-2 font-medium">Convencional</td>
                        <td className="px-3 py-2">76–78 Gy</td>
                        <td className="px-3 py-2">38–39 fx (2 Gy/fx)</td>
                        <td className="px-3 py-2">~8 semanas</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-card">
                        <td className="px-3 py-2 font-medium">Hipofrac. Moderada</td>
                        <td className="px-3 py-2">60–70 Gy</td>
                        <td className="px-3 py-2">20–28 fx (2,5–3 Gy/fx)</td>
                        <td className="px-3 py-2">4–6 semanas</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium">Ultra-hipofrac. (SBRT)</td>
                        <td className="px-3 py-2">36,25–42,7 Gy</td>
                        <td className="px-3 py-2">5–7 fx (6–7,25 Gy/fx)</td>
                        <td className="px-3 py-2">1–2 semanas</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  O estudo <strong>HYPO-RT-PC</strong> (Widmark et al., Lancet 2019) demonstrou não-inferioridade da ultra-hipofracionação em relação ao fracionamento convencional, com sobrevida livre de falha de 72% vs 65% em 10 anos (HR 0,84). A SBRT é indicada para risco intermediário favorável com boa função urinária.
                </p>
              </div>
            </div>

            {/* Braquiterapia */}
            <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-6 shadow-sm mb-8">
              <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-4 flex items-center gap-2">
                <CircleDot className="w-5 h-5 text-[#B87333]" />
                Braquiterapia
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-2">LDR (Baixa Taxa de Dose)</h4>
                  <ul className="text-sm text-gray-700 dark:text-foreground space-y-1">
                    <li>• Sementes radioativas permanentes (I-125 ou Pd-103)</li>
                    <li>• Dose: 145 Gy (I-125) ou 125 Gy (Pd-103)</li>
                    <li>• Indicação: risco intermediário favorável</li>
                    <li>• Controle bioquímico 10 anos: 85–95%</li>
                    <li>• Requer boa função urinária (IPSS baixo)</li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-2">HDR (Alta Taxa de Dose)</h4>
                  <ul className="text-sm text-gray-700 dark:text-foreground space-y-1">
                    <li>• Fonte temporária (Ir-192), fracionada</li>
                    <li>• Boost com EBRT (≥ 45 Gy) ou monoterapia</li>
                    <li>• Indicação: risco intermediário/alto</li>
                    <li>• Controle PSA 5 anos: 93,5% (monoterapia)</li>
                    <li>• Boost HDR: +12% DM-free survival em 10 anos</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ADT + RT */}
            <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-6 shadow-sm mb-8">
              <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-4 flex items-center gap-2">
                <Swords className="w-5 h-5 text-[#B87333]" />
                Hormonioterapia (ADT) Combinada com Radioterapia
              </h3>
              <div className="text-sm text-gray-700 dark:text-foreground space-y-3">
                <p>
                  A combinação de radioterapia com terapia de deprivação androgênica (ADT) é superior à radioterapia isolada, conforme demonstrado por múltiplos ensaios clínicos randomizados (EAU 2025, Section 6.2.3.a.4):
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                    <h5 className="font-semibold text-yellow-800 mb-2">Risco Intermediário</h5>
                    <p className="text-yellow-700">ADT de <strong>curta duração (4–6 meses)</strong> combinada com EBRT. O estudo RTOG 0815 demonstrou melhora na sobrevida livre de recorrência bioquímica, metástases e CSS.</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                    <h5 className="font-semibold text-red-800 mb-2">Alto Risco</h5>
                    <p className="text-red-700">ADT de <strong>longa duração (2–3 anos)</strong> combinada com EBRT. Múltiplos RCTs confirmam benefício em sobrevida global. ADT curta é insuficiente para alto risco.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800">
                    <strong>Efeitos colaterais da radioterapia:</strong> Toxicidade geniturinária (urgência, frequência, disúria) e gastrointestinal (diarreia, retite) podem ocorrer durante e após o tratamento. A ultra-hipofracionação pode causar maior toxicidade GU aguda (28% vs 23% grau ≥ 2). Espaçadores retais (SpaceOAR) podem reduzir a toxicidade retal.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Manejo por Grupo de Risco */}
      <section className="py-16 bg-gray-50 dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#B87333] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#1C3D5A] dark:text-foreground">Recomendações por Grupo de Risco (EAU 2025)</h2>
            </div>

            {/* Baixo Risco */}
            <div className="bg-white dark:bg-card border-l-4 border-green-500 rounded-r-xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-bold text-green-800 mb-3">Baixo Risco</h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-foreground">
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span><strong>Vigilância ativa:</strong> padrão para expectativa de vida &gt; 10 anos (<strong>Strong</strong>)</span>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span><strong>Watchful waiting:</strong> padrão para expectativa de vida &lt; 10 anos (<strong>Strong</strong>)</span>
                </div>
                <div className="flex gap-2 items-start">
                  <ShieldAlert className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>RP, RT ou terapia focal: consideradas sobretratamento neste grupo</span>
                </div>
              </div>
            </div>

            {/* Risco Intermediário */}
            <div className="bg-white dark:bg-card border-l-4 border-yellow-500 rounded-r-xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-3">Risco Intermediário</h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-foreground">
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span><strong>RP (RARP):</strong> oferecer para expectativa de vida &gt; 10 anos, nerve-sparing quando possível (<strong>Strong</strong>)</span>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span><strong>EBRT + ADT curta (4–6 meses):</strong> IMRT/VMAT 76–78 Gy ou hipofracionamento moderado (<strong>Strong</strong>)</span>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span><strong>Braquiterapia LDR:</strong> monoterapia para risco intermediário favorável (<strong>Strong</strong>)</span>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span><strong>SBRT:</strong> 36,25 Gy em 5 fx para risco intermediário favorável (<strong>Weak</strong>)</span>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span><strong>VA:</strong> ISUP GG2 selecionados com baixa extensão (<strong>Weak</strong>)</span>
                </div>
              </div>
            </div>

            {/* Alto Risco */}
            <div className="bg-white dark:bg-card border-l-4 border-red-500 rounded-r-xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-bold text-red-800 mb-3">Alto Risco Localizado</h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-foreground">
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span><strong>EBRT + ADT longa (2–3 anos):</strong> padrão de tratamento (<strong>Strong</strong>)</span>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span><strong>RP (RARP):</strong> pacientes selecionados, baixo volume, como parte de tratamento multimodal (<strong>Strong</strong>)</span>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span><strong>ePLND:</strong> obrigatória quando RP é realizada (<strong>Strong</strong>)</span>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span><strong>Boost com braquiterapia:</strong> LDR ou HDR boost + EBRT para intensificação de dose</span>
                </div>
                <div className="flex gap-2 items-start">
                  <ShieldAlert className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>Não usar ADT neoadjuvante antes de RP</span>
                </div>
              </div>
            </div>

            {/* Localmente Avançado */}
            <div className="bg-white dark:bg-card border-l-4 border-purple-500 rounded-r-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-purple-800 mb-3">Localmente Avançado (cT3–T4 / N+)</h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-foreground">
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span><strong>EBRT + ADT longa (2–3 anos):</strong> tratamento padrão (<strong>Strong</strong>)</span>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span><strong>RP multimodal:</strong> em centros de referência, pacientes selecionados cT3a com baixo volume</span>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span><strong>Irradiação pélvica:</strong> considerar em pacientes com alto risco de envolvimento linfonodal</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terapias Focais */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#B87333] rounded-lg flex items-center justify-center">
                <Crosshair className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#1C3D5A] dark:text-foreground">Terapias Focais e Investigacionais</h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 dark:text-foreground mb-8">
              <p>
                As terapias focais tratam apenas a área do tumor dentro da próstata, preservando o tecido saudável. Embora promissoras em termos de redução de efeitos colaterais, a EAU 2025 recomenda que sejam utilizadas <strong>apenas dentro de ensaios clínicos ou registros</strong> (recomendação <strong>Strong</strong>), devido à falta de dados comparativos de longo prazo.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: "HIFU (Ultrassom Focalizado)",
                  desc: "Ondas de ultrassom focalizadas que destroem o tecido tumoral por necrose coagulativa (> 65°C). Pode ser focal ou de glândula inteira. Sobrevida livre de falha em 7 anos: 65–68% para risco intermediário/alto.",
                  status: "Investigacional",
                },
                {
                  title: "Crioterapia",
                  desc: "Congelamento do tecido prostático com agulhas criogênicas. Pode ser focal ou de glândula inteira. Dados limitados de longo prazo. Risco de disfunção erétil e fístula uretroretal.",
                  status: "Investigacional",
                },
                {
                  title: "Terapia Fotodinâmica (PDT)",
                  desc: "Utiliza agente fotossensibilizante (padeliporfina/Tookad) ativado por laser. Estudo fase III mostrou redução de progressão vs VA. Aprovada na Europa para baixo risco.",
                  status: "Investigacional",
                },
                {
                  title: "Eletroporação Irreversível (IRE)",
                  desc: "Pulsos elétricos que destroem membranas celulares preservando estruturas vasculares e nervosas. Dados preliminares promissores, mas em fase inicial de avaliação.",
                  status: "Investigacional",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-card border border-gray-100 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-[#1C3D5A] dark:text-foreground">{item.title}</h4>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">{item.status}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decisão Compartilhada */}
      <section className="py-16 bg-gray-50 dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#B87333] rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#1C3D5A] dark:text-foreground">Decisão Compartilhada</h2>
            </div>

            <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-6 shadow-sm mb-8">
              <p className="text-gray-700 dark:text-foreground leading-relaxed mb-4">
                A EAU 2025 enfatiza que a escolha do tratamento deve ser uma <strong>decisão compartilhada</strong> entre médico e paciente, considerando não apenas as características do tumor, mas também os valores, preferências e expectativas do paciente em relação à qualidade de vida.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <HeartPulse className="w-8 h-8 text-[#B87333] mx-auto mb-2" />
                  <h5 className="font-semibold text-[#1C3D5A] dark:text-foreground text-sm mb-1">Função Sexual</h5>
                  <p className="text-xs text-gray-600 dark:text-muted-foreground">Preservação da ereção é prioridade? RARP nerve-sparing ou RT podem ser mais adequadas.</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <Shield className="w-8 h-8 text-[#B87333] mx-auto mb-2" />
                  <h5 className="font-semibold text-[#1C3D5A] dark:text-foreground text-sm mb-1">Continência</h5>
                  <p className="text-xs text-gray-600 dark:text-muted-foreground">Incontinência urinária é mais comum após RP, mas geralmente transitória com RARP.</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <Clock className="w-8 h-8 text-[#B87333] mx-auto mb-2" />
                  <h5 className="font-semibold text-[#1C3D5A] dark:text-foreground text-sm mb-1">Tempo de Tratamento</h5>
                  <p className="text-xs text-gray-600 dark:text-muted-foreground">RP: recuperação em semanas. RT: sessões por semanas/meses. VA: monitoramento contínuo.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Campinas Day Hospital */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#B87333] rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#1C3D5A] dark:text-foreground">Tratamento em Campinas e São Paulo</h2>
            </div>

            <div className="bg-gradient-to-r from-[#1C3D5A] to-[#0D3B66] rounded-xl p-8 text-white mb-8">
              <h3 className="text-xl font-bold mb-4">Dr. Felipe de Bulhões — Especialista em Cirurgia Robótica</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Urologista formado pelo Instituto D'Or de Ensino e Pesquisa, com experiência em cirurgia minimamente invasiva e robótica. Membro da AUA, EAU e SBU. Atendimento em Campinas e São Paulo para avaliação individualizada e discussão das opções de tratamento do câncer de próstata.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B87333] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Campinas Day Hospital</p>
                    <p className="text-sm text-gray-400">R. Antônio Lapa, 1032 — Cambuí, Campinas/SP</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B87333] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">São Paulo</p>
                    <p className="text-sm text-gray-400">Atendimento em centros de referência</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/5511981124455?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20tratamento%20de%20c%C3%A2ncer%20de%20pr%C3%B3stata." target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#25D366] hover:bg-[#20BD5A] text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    WhatsApp (mensagens)
                  </Button>
                </a>
                <Link href="/primeira-consulta">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    Saiba mais sobre a Primeira Consulta
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl font-bold text-[#1C3D5A] dark:text-foreground mb-8">Perguntas Frequentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Qual é o melhor tratamento para o câncer de próstata?",
                  a: "Não existe um tratamento único 'melhor'. A escolha depende do grupo de risco, expectativa de vida, preferências do paciente e efeitos colaterais aceitáveis. Para baixo risco, a vigilância ativa é o padrão. Para risco intermediário e alto, cirurgia robótica (RARP) e radioterapia são opções curativas equivalentes em termos de sobrevida.",
                },
                {
                  q: "A cirurgia robótica é melhor que a cirurgia aberta?",
                  a: "A RARP oferece recuperação funcional mais rápida (continência e ereção), menor sangramento e menos complicações pós-operatórias. Em 10 anos, os resultados oncológicos são equivalentes. A meta-análise de 5 RCTs mostra OR 4,05 para recuperação erétil a favor da RARP (p = 0,003).",
                },
                {
                  q: "A vigilância ativa é segura?",
                  a: "Sim, para tumores de baixo risco. O estudo ProtecT (15 anos) mostrou sobrevida câncer-específica de 96,9% com monitoramento ativo. Porém, requer acompanhamento rigoroso com PSA, MRI e rebiópsias periódicas. Cerca de 1/3 dos pacientes eventualmente necessitam de tratamento curativo.",
                },
                {
                  q: "A radioterapia causa impotência?",
                  a: "A disfunção erétil pode ocorrer após radioterapia, mas geralmente de forma mais gradual que após cirurgia. Cerca de 30–50% dos pacientes apresentam algum grau de disfunção erétil após 2–5 anos. A braquiterapia tende a ter menores taxas de DE que a EBRT.",
                },
                {
                  q: "Quanto tempo dura o tratamento com radioterapia?",
                  a: "Depende do esquema: convencional (8 semanas), hipofracionamento moderado (4–6 semanas) ou SBRT/ultra-hipofracionamento (1–2 semanas, apenas 5–7 sessões). A SBRT é indicada para risco intermediário favorável.",
                },
                {
                  q: "O que é hormonioterapia e quando é usada?",
                  a: "A terapia de deprivação androgênica (ADT) bloqueia a testosterona, que estimula o crescimento do tumor. É combinada com radioterapia: 4–6 meses para risco intermediário e 2–3 anos para alto risco. Não é usada isoladamente como tratamento curativo.",
                },
                {
                  q: "Posso fazer tratamento focal (HIFU)?",
                  a: "As terapias focais (HIFU, crioterapia, PDT) são consideradas investigacionais pela EAU 2025 e devem ser realizadas apenas dentro de ensaios clínicos ou registros. Faltam dados comparativos de longo prazo (> 15 anos) para recomendação de rotina.",
                },
                {
                  q: "Após a cirurgia, o PSA deve zerar?",
                  a: "Sim. Após prostatectomia radical, o PSA deve tornar-se indetectável (< 0,1 ng/mL). Qualquer elevação acima de 0,2 ng/mL em duas medidas consecutivas é considerada recorrência bioquímica e deve ser investigada.",
                },
              ].map((item, i) => (
                <details key={i} className="bg-white dark:bg-card border border-gray-100 rounded-xl shadow-sm group">
                  <summary className="px-6 py-4 cursor-pointer font-medium text-[#1C3D5A] dark:text-foreground flex items-center justify-between">
                    {item.q}
                    <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-4 text-sm text-gray-600 dark:text-muted-foreground leading-relaxed">{item.a}</div>
                </details>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Referências */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl font-bold text-[#1C3D5A] dark:text-foreground mb-6">Referências</h2>
            <div className="bg-gray-50 dark:bg-card rounded-xl p-6 space-y-3 text-sm text-gray-600 dark:text-muted-foreground">
              <p>1. EAU Guidelines on Prostate Cancer 2025. Chapter 6: Treatment. European Association of Urology.</p>
              <p>2. Hamdy FC, et al. Fifteen-Year Outcomes after Monitoring, Surgery, or Radiotherapy for Prostate Cancer. N Engl J Med. 2023;388:1547-1558. DOI: 10.1056/NEJMoa2214122</p>
              <p>3. Bill-Axelson A, et al. Radical Prostatectomy or Watchful Waiting in Prostate Cancer — 29-Year Follow-up (SPCG-4). N Engl J Med. 2018;379:2319-2329. DOI: 10.1056/NEJMoa1807801</p>
              <p>4. Wilt TJ, et al. Radical Prostatectomy versus Observation for Localized Prostate Cancer (PIVOT). N Engl J Med. 2017;377:132-142. DOI: 10.1056/NEJMoa1615869</p>
              <p>5. Coughlin GD, et al. Robot-assisted laparoscopic prostatectomy versus open radical retropubic prostatectomy: 24-month outcomes from a randomised controlled study. Lancet Oncol. 2018;19(8):1051-1060.</p>
              <p>6. Yaxley JW, et al. Robot-assisted laparoscopic prostatectomy versus open radical retropubic prostatectomy: early outcomes from a randomised controlled phase 3 study. Lancet. 2016;388:1057-1066.</p>
              <p>7. Widmark A, et al. Ultra-hypofractionated versus conventionally fractionated radiotherapy for prostate cancer: 5-year outcomes of the HYPO-RT-PC randomised, non-inferiority, phase 3 trial. Lancet. 2019;394:385-395.</p>
              <p>8. Mottet N, et al. EAU-EANM-ESTRO-ESUR-ISUP-SIOG Guidelines on Prostate Cancer. Eur Urol. 2025.</p>
              <p>9. Campbell-Walsh-Wein Urology, 13th Edition. Chapters 157-158: Treatment of Localized Prostate Cancer. Elsevier, 2024.</p>
              <p>10. AUA/ASTRO Guideline on Clinically Localized Prostate Cancer. American Urological Association, 2024.</p>
              <p>11. NCCN Clinical Practice Guidelines in Oncology: Prostate Cancer. Version 1.2025. National Comprehensive Cancer Network.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </EducationalLayout>
  );
}
