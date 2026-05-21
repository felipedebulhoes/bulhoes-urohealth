/*
 * Design: Clinical Precision — Swiss Medical Design
 * Page: Hipogonadismo, Reposição de Testosterona e Qualidade de Vida
 * Referências: EAU Guidelines on Male Hypogonadism 2025, AUA Testosterone Deficiency 2024, Campbell-Walsh-Wein 13th Ed.
 */
import { motion } from "framer-motion";
import { useEffect } from "react";
import EducationalLayout from "@/components/EducationalLayout";
import {
  Activity, AlertTriangle, ArrowDown, ArrowUp,
  Check, Heart, Pill, Shield, Thermometer, TrendingDown,
  Dumbbell, Brain, Bone, Droplets, Moon
} from "lucide-react";

const symptoms = [
  { icon: <TrendingDown className="w-5 h-5" />, title: "Diminuição da libido", detail: "Redução do desejo sexual é o sintoma mais específico e frequente do hipogonadismo." },
  { icon: <Heart className="w-5 h-5" />, title: "Disfunção erétil", detail: "Dificuldade em obter ou manter ereções, especialmente as ereções matinais." },
  { icon: <Activity className="w-5 h-5" />, title: "Fadiga e perda de energia", detail: "Cansaço desproporcional ao esforço, perda de motivação e sensação de 'esgotamento'." },
  { icon: <Dumbbell className="w-5 h-5" />, title: "Perda de massa muscular", detail: "Redução da força e massa muscular, aumento da gordura corporal, especialmente abdominal." },
  { icon: <Brain className="w-5 h-5" />, title: "Alterações cognitivas e humor", detail: "Dificuldade de concentração, irritabilidade, humor deprimido, perda de autoconfiança." },
  { icon: <Bone className="w-5 h-5" />, title: "Osteoporose", detail: "Redução da densidade mineral óssea com risco aumentado de fraturas." },
  { icon: <Moon className="w-5 h-5" />, title: "Distúrbios do sono", detail: "Insônia, sono não reparador, ondas de calor e sudorese noturna." },
  { icon: <Droplets className="w-5 h-5" />, title: "Redução dos pelos corporais", detail: "Diminuição dos pelos faciais e corporais, pele mais fina." },
];

const trtOptions = [
  {
    name: "Gel Transdérmico",
    description: "Aplicação diária na pele (ombros, braços ou abdome). Mantém níveis estáveis de testosterona ao longo do dia.",
    advantages: ["Níveis fisiológicos estáveis", "Fácil ajuste de dose", "Aplicação simples", "Mimetiza ritmo circadiano"],
    disadvantages: ["Aplicação diária necessária", "Risco de transferência por contato", "Irritação cutânea possível", "Custo mensal"],
    frequency: "Diária",
  },
  {
    name: "Injeção Intramuscular (Cipionato/Enantato)",
    description: "Injeções intramusculares a cada 1-2 semanas. Forma mais utilizada no Brasil pela praticidade e custo.",
    advantages: ["Custo acessível", "Aplicação quinzenal ou semanal", "Amplamente disponível", "Longa experiência clínica"],
    disadvantages: ["Picos e vales nos níveis séricos", "Variação de humor e energia", "Dor no local da injeção", "Policitemia mais frequente"],
    frequency: "Semanal ou quinzenal",
  },
  {
    name: "Undecanoato de Testosterona (Nebido®)",
    description: "Injeção intramuscular de longa duração a cada 10-14 semanas. Mantém níveis mais estáveis que as formulações de curta duração.",
    advantages: ["Aplicação a cada 10-14 semanas", "Níveis mais estáveis que cipionato", "Menor risco de policitemia", "Boa adesão ao tratamento"],
    disadvantages: ["Custo elevado", "Injeção de grande volume (4ml)", "Ajuste de dose menos flexível", "Disponibilidade variável"],
    frequency: "A cada 10-14 semanas",
  },
  {
    name: "Pellets Subcutâneos (Implante)",
    description: "Pellets de testosterona cristalina implantados sob a pele (glúteo ou abdome) a cada 4-6 meses.",
    advantages: ["Liberação contínua e estável", "Aplicação semestral", "Sem risco de transferência", "Conveniência"],
    disadvantages: ["Procedimento invasivo (implante)", "Risco de extrusão do pellet", "Ajuste de dose limitado", "Custo elevado"],
    frequency: "A cada 4-6 meses",
  },
];

const contraindicacoes = [
  "Câncer de próstata ativo ou suspeito (contraindicação absoluta)",
  "Câncer de mama masculino",
  "Desejo de fertilidade ativa (TRT suprime a espermatogênese)",
  "Policitemia não controlada (hematócrito >54%)",
  "Insuficiência cardíaca grave descompensada (NYHA IV)",
  "Apneia obstrutiva do sono grave não tratada",
  "PSA >4 ng/mL sem avaliação urológica prévia",
];

const monitoramento = [
  { item: "Testosterona total", timing: "3, 6 e 12 meses, depois anual", target: "Manter entre 400-700 ng/dL" },
  { item: "Hematócrito / Hemoglobina", timing: "3, 6 e 12 meses, depois anual", target: "Hematócrito <54% — se >54%, reduzir dose ou suspender" },
  { item: "PSA", timing: "3, 6 e 12 meses, depois anual", target: "Aumento >1,4 ng/mL em 12 meses → investigar" },
  { item: "Perfil lipídico", timing: "Anual", target: "Monitorar colesterol e triglicerídeos" },
  { item: "Glicemia / HbA1c", timing: "Anual", target: "Monitorar resistência insulínica" },
  { item: "Densitometria óssea", timing: "A cada 1-2 anos (se osteoporose)", target: "Melhora da DMO esperada com TRT" },
  { item: "Sintomas e questionários", timing: "A cada consulta", target: "ADAM, IIEF, IPSS" },
];

export default function Hipogonadismo() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <EducationalLayout
      title="Hipogonadismo Masculino"
      subtitle="Deficiência de Testosterona e Reposição Hormonal"
      description="Entenda o que é o hipogonadismo, como é diagnosticado e as opções de reposição de testosterona para melhora da qualidade de vida."
      accentColor="#7C3AED"
    >
      {/* Intro */}
      <section className="py-12 lg:py-16 border-b border-[#1C3D5A]/6">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none prose-headings:text-[#1C3D5A] dark:text-foreground prose-p:text-[#1C3D5A] dark:text-foreground/65 prose-p:leading-relaxed prose-strong:text-[#1C3D5A] dark:text-foreground/80">
            <p>
              O <strong>hipogonadismo masculino</strong> é uma condição clínica caracterizada pela <strong>deficiência de testosterona</strong> associada a <strong>sinais e sintomas clínicos</strong>. Afeta cerca de 2-6% dos homens entre 40-79 anos, com prevalência aumentando significativamente com a idade — a testosterona total diminui em média 1-2% ao ano após os 30 anos.
            </p>
            <p>
              É fundamental diferenciar o hipogonadismo do declínio fisiológico normal da testosterona com a idade. O diagnóstico exige a <strong>combinação de sintomas clínicos</strong> (diminuição da libido, disfunção erétil, fadiga, perda muscular) <strong>com confirmação laboratorial</strong> (testosterona total &lt;300 ng/dL em duas dosagens matinais). A reposição de testosterona (TRT) pode melhorar significativamente a qualidade de vida quando bem indicada, mas requer acompanhamento médico rigoroso.
            </p>
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="py-12 lg:py-16 bg-[#F8FAFB]">
        <div className="container max-w-5xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-3 text-center font-serif">Sinais e Sintomas</h2>
          <p className="text-center text-sm text-[#1C3D5A] dark:text-foreground/50 mb-10 max-w-2xl mx-auto">
            Os sintomas do hipogonadismo são inespecíficos e podem se sobrepor a outras condições. A presença de múltiplos sintomas associados reforça a suspeita diagnóstica.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {symptoms.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-card rounded-xl border border-[#1C3D5A]/6 p-5 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center text-violet-600 mb-3">
                  {s.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground mb-1">{s.title}</h3>
                <p className="text-xs text-[#1C3D5A] dark:text-foreground/55 leading-relaxed">{s.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnosis */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-8 text-center font-serif">Diagnóstico</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Avaliação Clínica", detail: "Anamnese detalhada dos sintomas (questionário ADAM), exame físico (volume testicular, distribuição de gordura, ginecomastia, pelos). Excluir causas secundárias: depressão, hipotireoidismo, apneia do sono, uso de opioides." },
              { step: "2", title: "Dosagem Hormonal", detail: "Testosterona total em jejum, pela manhã (8-10h), em duas ocasiões separadas. Se TT entre 200-400 ng/dL: dosar testosterona livre calculada e SHBG. Valores: TT <300 ng/dL ou TL <6,5 ng/dL confirmam deficiência bioquímica (EAU 2025)." },
              { step: "3", title: "Diferenciação Etiológica", detail: "LH e FSH: elevados = hipogonadismo primário (testicular). Baixos/normais = hipogonadismo secundário (hipotálamo-hipofisário) → investigar prolactina, RNM de sela túrcica. Cariótipo se suspeita de Klinefelter." },
              { step: "4", title: "Avaliação Pré-TRT", detail: "PSA e toque retal (excluir câncer de próstata). Hematócrito basal. Perfil lipídico e glicemia. Densitometria óssea se indicada. Avaliação cardiovascular. Discussão sobre fertilidade (TRT suprime espermatogênese)." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-white dark:bg-card rounded-xl p-5 border border-[#1C3D5A]/6"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-violet-700">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-[#1C3D5A] dark:text-foreground/55 leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRT Options */}
      <section className="py-12 lg:py-16 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-3 text-center font-serif">
            Opções de Reposição de Testosterona
          </h2>
          <p className="text-center text-sm text-[#1C3D5A] dark:text-foreground/50 mb-10 max-w-2xl mx-auto">
            A escolha da formulação depende da preferência do paciente, custo, conveniência e perfil farmacocinético desejado.
          </p>
          <div className="space-y-4">
            {trtOptions.map((opt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-card rounded-xl border border-[#1C3D5A]/6 p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-[#1C3D5A] dark:text-foreground">{opt.name}</h3>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded">
                    {opt.frequency}
                  </span>
                </div>
                <p className="text-sm text-[#1C3D5A] dark:text-foreground/60 leading-relaxed mb-4">{opt.description}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    {opt.advantages.map((a, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <ArrowUp className="w-3 h-3 mt-0.5 shrink-0 text-amber-500" />
                        <span className="text-xs text-[#1C3D5A] dark:text-foreground/55">{a}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    {opt.disadvantages.map((d, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <ArrowDown className="w-3 h-3 mt-0.5 shrink-0 text-red-400" />
                        <span className="text-xs text-[#1C3D5A] dark:text-foreground/55">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contraindications */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
            <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Contraindicações à TRT
            </h3>
            <div className="space-y-2">
              {contraindicacoes.map((c, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Shield className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-500" />
                  <span className="text-sm text-red-800/70">{c}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-red-100/50 rounded-lg p-3">
              <p className="text-xs text-red-700/70 leading-relaxed">
                <strong>Nota sobre fertilidade:</strong> A TRT exógena suprime o eixo hipotálamo-hipófise-gonadal, reduzindo drasticamente a produção de espermatozoides. Para homens que desejam fertilidade, alternativas como clomifeno, hCG ou enobosarm devem ser consideradas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Monitoring */}
      <section className="py-12 lg:py-16 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-8 text-center font-serif">
            Monitoramento Durante a TRT
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse bg-white dark:bg-card rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-[#1C3D5A] text-white">
                  <th className="p-3 text-left font-semibold">Exame</th>
                  <th className="p-3 text-center font-semibold">Periodicidade</th>
                  <th className="p-3 text-left font-semibold">Alvo / Ação</th>
                </tr>
              </thead>
              <tbody>
                {monitoramento.map((m, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F8FAFB]"}>
                    <td className="p-3 font-medium text-[#1C3D5A] dark:text-foreground border-t border-[#1C3D5A]/5">{m.item}</td>
                    <td className="p-3 text-center text-[#1C3D5A] dark:text-foreground/60 border-t border-[#1C3D5A]/5">{m.timing}</td>
                    <td className="p-3 text-[#1C3D5A] dark:text-foreground/60 border-t border-[#1C3D5A]/5">{m.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-8 text-center font-serif">
            Benefícios Esperados da TRT
          </h2>
          <div className="space-y-3">
            {[
              { benefit: "Melhora da libido e função sexual", timeline: "3-6 semanas", evidence: "TRAVERSE Trial, NEJM 2023" },
              { benefit: "Aumento da massa muscular e força", timeline: "3-6 meses", evidence: "TTrials, NEJM 2016" },
              { benefit: "Redução da gordura corporal", timeline: "3-6 meses", evidence: "Corona et al., Eur J Endocrinol 2020" },
              { benefit: "Melhora do humor e energia", timeline: "3-4 semanas", evidence: "TTrials, JAMA Int Med 2017" },
              { benefit: "Aumento da densidade óssea", timeline: "6-12 meses", evidence: "TTrials, JAMA Int Med 2017" },
              { benefit: "Melhora da resistência insulínica", timeline: "3-12 meses", evidence: "Dhindsa et al., Diabetes Care 2021" },
              { benefit: "Melhora da anemia", timeline: "3-6 meses", evidence: "TTrials, JAMA Int Med 2017" },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 bg-white dark:bg-card rounded-lg p-4 border border-[#1C3D5A]/6"
              >
                <Check className="w-5 h-5 shrink-0 text-amber-500" />
                <div className="flex-1">
                  <span className="text-sm font-medium text-[#1C3D5A] dark:text-foreground">{b.benefit}</span>
                  <span className="text-xs text-[#1C3D5A] dark:text-foreground/40 ml-2">({b.timeline})</span>
                </div>
                <span className="text-[10px] text-[#B87333] font-medium shrink-0 hidden sm:block">{b.evidence}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-8 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h3 className="text-xs font-semibold text-[#1C3D5A] dark:text-foreground/40 uppercase tracking-wider mb-3">Referências</h3>
          <ol className="text-[10px] text-[#1C3D5A] dark:text-foreground/35 space-y-1 list-decimal list-inside">
            <li>Dohle GR, et al. EAU Guidelines on Male Hypogonadism. European Association of Urology, 2025.</li>
            <li>Mulhall JP, et al. AUA Guideline: Evaluation and Management of Testosterone Deficiency. American Urological Association, 2024.</li>
            <li>Partin AW, et al. Campbell-Walsh-Wein Urology, 13th Edition. Elsevier, 2024. Chapters 69-72.</li>
            <li>Bhasin S, et al. Testosterone Therapy in Men with Hypogonadism: An Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab. 2018;103(5):1715-1744.</li>
            <li>Lincoff AM, et al. Cardiovascular Safety of Testosterone-Replacement Therapy (TRAVERSE). N Engl J Med. 2023;389(2):107-117.</li>
            <li>Snyder PJ, et al. Effects of Testosterone Treatment in Older Men (TTrials). N Engl J Med. 2016;374(7):611-624.</li>
            <li>Corona G, et al. Testosterone supplementation and body composition: results from a meta-analysis. Eur J Endocrinol. 2020;183(3):R103-R116.</li>
          </ol>
        </div>
      </section>
    </EducationalLayout>
  );
}
