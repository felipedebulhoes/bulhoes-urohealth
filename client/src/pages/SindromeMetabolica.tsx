/*
 * Design: Clinical Precision — Swiss Medical Design
 * Page: Síndrome Metabólica, Testosterona e Envelhecimento Saudável
 * Referências: EAU 2025, AUA 2024, ACSM Guidelines 2021, Endocrine Society 2018
 */
import { motion } from "framer-motion";
import { useEffect } from "react";
import EducationalLayout from "@/components/EducationalLayout";
import {
  Activity, Heart, Dumbbell, Apple, TrendingUp, TrendingDown,
  Scale, Flame, Clock, Shield, Check, AlertTriangle, Brain, Zap
} from "lucide-react";

const IMG = {
  exercise: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/exercise-testosterone_9500c26e.webp",
};

const criterios = [
  { name: "Circunferência abdominal", value: "≥ 94 cm (homens)", icon: <Scale className="w-4 h-4" /> },
  { name: "Triglicerídeos", value: "≥ 150 mg/dL", icon: <Activity className="w-4 h-4" /> },
  { name: "HDL-colesterol", value: "< 40 mg/dL (homens)", icon: <TrendingDown className="w-4 h-4" /> },
  { name: "Pressão arterial", value: "≥ 130/85 mmHg", icon: <Heart className="w-4 h-4" /> },
  { name: "Glicemia de jejum", value: "≥ 100 mg/dL", icon: <Flame className="w-4 h-4" /> },
];

const exerciseTypes = [
  {
    type: "Exercício Aeróbico",
    icon: <Activity className="w-6 h-6" />,
    color: "blue",
    recommendation: "150-300 minutos/semana de intensidade moderada ou 75-150 minutos/semana de alta intensidade",
    examples: "Caminhada rápida, corrida, natação, ciclismo, dança",
    benefits: [
      "Reduz gordura visceral em 6-7% (mesmo sem perda de peso total)",
      "Melhora sensibilidade insulínica em 20-30%",
      "Reduz PA sistólica em 5-7 mmHg",
      "Reduz triglicerídeos em 20-30% e aumenta HDL em 5-10%",
      "Melhora função endotelial e saúde cardiovascular",
      "Reduz risco de mortalidade por todas as causas em 30-35%",
    ],
    testosteroneEffect: "Aumento modesto de testosterona (10-15%) com exercício regular moderado. Exercício excessivo (overtraining) pode REDUZIR testosterona.",
    source: "ACSM Guidelines 2021; Hackney AC, Exerc Sport Sci Rev 2020",
  },
  {
    type: "Exercício de Resistência (Musculação)",
    icon: <Dumbbell className="w-6 h-6" />,
    color: "violet",
    recommendation: "2-3 sessões/semana, envolvendo grandes grupos musculares, 8-12 repetições, 2-4 séries",
    examples: "Musculação, exercícios com peso corporal, CrossFit, pilates com carga",
    benefits: [
      "Aumento de massa muscular (hipertrofia) — combate a sarcopenia",
      "Aumento do metabolismo basal (mais músculo = mais gasto calórico em repouso)",
      "Melhora da sensibilidade insulínica (efeito independente do aeróbico)",
      "Aumento da densidade mineral óssea — previne osteoporose",
      "Melhora da composição corporal (↓ gordura, ↑ músculo)",
      "Melhora da força funcional e equilíbrio — reduz risco de quedas",
    ],
    testosteroneEffect: "Exercícios compostos e pesados (agachamento, levantamento terra, supino) provocam picos agudos de testosterona de 15-30%. O treinamento regular de resistência mantém níveis basais mais elevados a longo prazo.",
    source: "Vingren JL, Sports Med 2010; Kraemer WJ, J Appl Physiol 1999",
  },
  {
    type: "Exercício Combinado (Ideal)",
    icon: <Zap className="w-6 h-6" />,
    color: "emerald",
    recommendation: "Combinar aeróbico (150min/sem) + resistência (2-3x/sem) para máximo benefício metabólico e hormonal",
    examples: "Programa estruturado com dias alternados de cardio e musculação",
    benefits: [
      "Efeito sinérgico: melhora metabólica superior a cada modalidade isolada",
      "Maior redução de gordura visceral e melhora da composição corporal",
      "Manutenção de massa muscular durante perda de peso",
      "Maior impacto nos níveis de testosterona",
      "Melhora global da qualidade de vida e saúde mental",
      "Redução de risco cardiovascular em até 40-50%",
    ],
    testosteroneEffect: "A combinação oferece o maior benefício hormonal sustentado. Estudos mostram que homens fisicamente ativos com exercício combinado têm níveis de testosterona 15-20% superiores a sedentários da mesma idade.",
    source: "Kumagai H, Exerc Sport Sci Rev 2016; Hayes LD, Eur J Appl Physiol 2017",
  },
];

export default function SindromeMetabolica() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <EducationalLayout
      title="Síndrome Metabólica e Saúde Masculina"
      subtitle="Peso, Testosterona e Envelhecimento Saudável"
      description="Entenda a relação entre síndrome metabólica, testosterona e qualidade de vida, e como exercícios aeróbicos e de resistência são fundamentais para um bom envelhecimento."
      accentColor="#059669"
    >
      {/* Intro */}
      <section className="py-12 lg:py-16 border-b border-[#1C3D5A]/6">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none prose-headings:text-[#1C3D5A] prose-p:text-[#1C3D5A]/65 prose-p:leading-relaxed prose-strong:text-[#1C3D5A]/80">
            <p>
              A <strong>síndrome metabólica</strong> é um conjunto de fatores de risco cardiovascular — obesidade abdominal, hipertensão, dislipidemia e resistência insulínica — que afeta cerca de <strong>30-40% dos homens acima de 50 anos</strong>. Sua relação com a <strong>testosterona</strong> é bidirecional: a obesidade reduz os níveis de testosterona, e a deficiência de testosterona favorece o acúmulo de gordura visceral, criando um <strong>ciclo vicioso</strong> que acelera o envelhecimento e aumenta o risco de diabetes, doenças cardiovasculares e disfunção sexual.
            </p>
            <p>
              A boa notícia é que esse ciclo pode ser <strong>interrompido e revertido</strong>. O controle do peso, a prática regular de exercícios físicos (tanto aeróbicos quanto de resistência) e, quando indicada, a reposição de testosterona, são os pilares para um <strong>envelhecimento saudável</strong> e manutenção da vitalidade masculina.
            </p>
          </div>
        </div>
      </section>

      {/* Vicious cycle */}
      <section className="py-12 lg:py-16 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] mb-8 text-center font-serif">
            O Ciclo Vicioso: Obesidade ↔ Testosterona Baixa
          </h2>
          <div className="bg-white rounded-xl border border-[#1C3D5A]/6 p-6 lg:p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1C3D5A] mb-1">Obesidade → ↓ Testosterona</h4>
                    <p className="text-xs text-[#1C3D5A]/55 leading-relaxed">
                      O tecido adiposo (gordura) contém a enzima <strong>aromatase</strong>, que converte testosterona em estradiol (estrogênio). Quanto mais gordura visceral, maior a conversão e menor a testosterona disponível. A obesidade também reduz a SHBG, alterando a biodisponibilidade hormonal.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1C3D5A] mb-1">↓ Testosterona → Mais Obesidade</h4>
                    <p className="text-xs text-[#1C3D5A]/55 leading-relaxed">
                      A deficiência de testosterona favorece o acúmulo de gordura (especialmente visceral), reduz a massa muscular e o metabolismo basal, aumenta a resistência insulínica e diminui a motivação para atividade física — perpetuando o ciclo.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1C3D5A] mb-1">Perda de Peso → ↑ Testosterona</h4>
                    <p className="text-xs text-[#1C3D5A]/55 leading-relaxed">
                      Perda de 5-10% do peso corporal pode aumentar a testosterona em <strong>50-100 ng/dL</strong>. A cirurgia bariátrica em obesos graves pode aumentar em até 200-300 ng/dL. A perda de gordura visceral reduz a atividade da aromatase.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1C3D5A] mb-1">Exercício → Quebra o Ciclo</h4>
                    <p className="text-xs text-[#1C3D5A]/55 leading-relaxed">
                      O exercício físico regular (aeróbico + resistência) é a intervenção mais eficaz para quebrar o ciclo vicioso: reduz gordura visceral, aumenta massa muscular, melhora sensibilidade insulínica e eleva os níveis de testosterona — tudo simultaneamente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metabolic syndrome criteria */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] mb-3 text-center font-serif">
            Critérios Diagnósticos
          </h2>
          <p className="text-center text-sm text-[#1C3D5A]/50 mb-8">
            Diagnóstico: presença de 3 ou mais dos 5 critérios abaixo (IDF/AHA/NHLBI 2009)
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {criterios.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl border border-[#1C3D5A]/6 p-4 text-center"
              >
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 mx-auto mb-2">
                  {c.icon}
                </div>
                <h4 className="text-xs font-semibold text-[#1C3D5A] mb-1">{c.name}</h4>
                <p className="text-xs text-red-600 font-medium">{c.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exercise section */}
      <section className="py-12 lg:py-16 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] mb-3 text-center font-serif">
            Exercício Físico: O Pilar do Tratamento
          </h2>
          <p className="text-center text-sm text-[#1C3D5A]/50 mb-10 max-w-2xl mx-auto">
            O exercício é a intervenção com maior impacto na síndrome metabólica e nos níveis de testosterona. A combinação de exercícios aeróbicos e de resistência oferece o máximo benefício.
          </p>

          <div className="mb-8">
            <img loading="lazy" src={IMG.exercise} alt="Exercício e testosterona" className="w-full max-w-2xl mx-auto rounded-xl shadow-sm" />
            <p className="text-xs text-[#1C3D5A]/40 text-center mt-3">O exercício de resistência é fundamental para manutenção da massa muscular e dos níveis de testosterona</p>
          </div>

          <div className="space-y-6">
            {exerciseTypes.map((ex, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-[#1C3D5A]/6 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-${ex.color}-50 flex items-center justify-center text-${ex.color}-600`}>
                      {ex.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#1C3D5A]">{ex.type}</h3>
                      <p className="text-xs text-[#1C3D5A]/40">{ex.recommendation}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#1C3D5A]/50 mb-3"><strong>Exemplos:</strong> {ex.examples}</p>
                  <div className="grid sm:grid-cols-2 gap-2 mb-4">
                    {ex.benefits.map((b, j) => (
                      <div key={j} className="flex items-start gap-2 bg-[#F8FAFB] rounded-lg p-2.5">
                        <Check className="w-3 h-3 mt-0.5 shrink-0 text-amber-500" />
                        <span className="text-xs text-[#1C3D5A]/55">{b}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-violet-50 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-violet-700 mb-1 flex items-center gap-1">
                      <Brain className="w-3 h-3" /> Efeito na Testosterona
                    </h4>
                    <p className="text-xs text-violet-800/70 leading-relaxed">{ex.testosteroneEffect}</p>
                    <p className="text-[10px] text-violet-600 mt-1">{ex.source}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical recommendations */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] mb-8 text-center font-serif">
            Recomendações Práticas
          </h2>
          <div className="space-y-3">
            {[
              { icon: <Scale className="w-5 h-5" />, title: "Controle do peso", detail: "Meta: perda de 5-10% do peso corporal em 6 meses. Cada 1 kg de perda de peso = aumento de ~2 ng/dL de testosterona. Priorizar redução da circunferência abdominal." },
              { icon: <Apple className="w-5 h-5" />, title: "Dieta mediterrânea", detail: "Rica em vegetais, frutas, azeite, peixes e grãos integrais. Associada a melhores níveis de testosterona, menor inflamação e menor risco cardiovascular. Evitar ultraprocessados e açúcar refinado." },
              { icon: <Dumbbell className="w-5 h-5" />, title: "Exercício combinado", detail: "150 min/sem de aeróbico + 2-3 sessões de musculação. Priorizar exercícios compostos (agachamento, levantamento terra, supino). Progressão gradual de carga." },
              { icon: <Clock className="w-5 h-5" />, title: "Sono de qualidade", detail: "7-9 horas por noite. A privação de sono reduz testosterona em até 15%. Tratar apneia obstrutiva do sono se presente — é causa frequente de hipogonadismo funcional." },
              { icon: <Shield className="w-5 h-5" />, title: "Redução do estresse", detail: "Cortisol cronicamente elevado suprime o eixo gonadal. Técnicas de manejo do estresse, atividade física e sono adequado ajudam a normalizar o cortisol." },
              { icon: <Heart className="w-5 h-5" />, title: "Acompanhamento médico", detail: "Avaliação periódica de testosterona, perfil metabólico e risco cardiovascular. A TRT pode ser indicada quando mudanças de estilo de vida são insuficientes e há confirmação de hipogonadismo." },
            ].map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-4 bg-white rounded-xl p-5 border border-[#1C3D5A]/6"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                  {rec.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1C3D5A] mb-1">{rec.title}</h3>
                  <p className="text-xs text-[#1C3D5A]/55 leading-relaxed">{rec.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key message */}
      <section className="py-12 lg:py-16 bg-[#F8FAFB]">
        <div className="container max-w-3xl">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 lg:p-8">
            <h3 className="text-lg font-semibold text-[#1C3D5A] mb-3">Mensagem Principal</h3>
            <p className="text-sm text-[#1C3D5A]/60 leading-relaxed">
              O envelhecimento saudável do homem depende de um tripé: <strong>controle do peso</strong>, <strong>exercício físico regular</strong> (aeróbico + resistência) e <strong>equilíbrio hormonal</strong>. A síndrome metabólica e o hipogonadismo são condições tratáveis que, quando abordadas de forma integrada, permitem uma melhora significativa da qualidade de vida, da função sexual, da composição corporal e da saúde cardiovascular. Agende uma consulta para avaliarmos seu perfil metabólico e hormonal de forma personalizada.
            </p>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-8 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h3 className="text-xs font-semibold text-[#1C3D5A]/40 uppercase tracking-wider mb-3">Referências</h3>
          <ol className="text-[10px] text-[#1C3D5A]/35 space-y-1 list-decimal list-inside">
            <li>Dohle GR, et al. EAU Guidelines on Male Hypogonadism. European Association of Urology, 2025.</li>
            <li>Mulhall JP, et al. AUA Guideline: Evaluation and Management of Testosterone Deficiency. American Urological Association, 2024.</li>
            <li>Alberti KG, et al. Harmonizing the metabolic syndrome (IDF/AHA/NHLBI). Circulation. 2009;120(16):1640-5.</li>
            <li>Lincoff AM, et al. Cardiovascular Safety of TRT (TRAVERSE). N Engl J Med. 2023;389(2):107-117.</li>
            <li>Garber CE, et al. ACSM Position Stand: Quantity and Quality of Exercise. Med Sci Sports Exerc. 2011;43(7):1334-59.</li>
            <li>Vingren JL, et al. Testosterone physiology in resistance exercise and training. Sports Med. 2010;40(12):1037-53.</li>
            <li>Kumagai H, et al. Increased physical activity has a greater effect than reduced energy intake on lifestyle modification-induced increases in testosterone. J Clin Biochem Nutr. 2016;58(1):84-89.</li>
            <li>Corona G, et al. Testosterone supplementation and body composition. Eur J Endocrinol. 2020;183(3):R103-R116.</li>
            <li>Dhindsa S, et al. Testosterone and Insulin Resistance. Diabetes Care. 2021;44(8):1752-1761.</li>
          </ol>
        </div>
      </section>
    </EducationalLayout>
  );
}
