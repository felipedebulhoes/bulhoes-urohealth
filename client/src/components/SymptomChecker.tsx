/* SymptomChecker.tsx — Calculadora de Sintomas Interativa
 * Design: Clinical Precision / Swiss Medical
 * Objetivo: Aumentar tempo no site, reduzir bounce rate, gerar engajamento
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Stethoscope,
  Phone,
  RotateCcw,
} from "lucide-react";

interface Symptom {
  id: string;
  label: string;
  category: string;
  icon: string;
}

interface Result {
  condition: string;
  description: string;
  urgency: "baixa" | "moderada" | "alta";
  recommendation: string;
  relatedPage?: string;
  relatedPageLabel?: string;
}

const symptoms: Symptom[] = [
  { id: "jato_fraco", label: "Jato urinário fraco ou intermitente", category: "urinário", icon: "💧" },
  { id: "frequencia", label: "Urinar muitas vezes ao dia", category: "urinário", icon: "🔄" },
  { id: "nocturia", label: "Acordar à noite para urinar", category: "urinário", icon: "🌙" },
  { id: "urgencia", label: "Urgência para urinar", category: "urinário", icon: "⚡" },
  { id: "dor_lombar", label: "Dor lombar ou nas costas", category: "dor", icon: "🔥" },
  { id: "colica_renal", label: "Cólica renal intensa", category: "dor", icon: "⚠️" },
  { id: "hematuria", label: "Sangue na urina", category: "urinário", icon: "🩸" },
  { id: "disfuncao_eretil", label: "Dificuldade de ereção", category: "sexual", icon: "💊" },
  { id: "ejaculacao_precoce", label: "Ejaculação precoce", category: "sexual", icon: "⏱️" },
  { id: "dor_testicular", label: "Dor ou inchaço nos testículos", category: "dor", icon: "🔴" },
  { id: "infertilidade", label: "Dificuldade para ter filhos", category: "sexual", icon: "👶" },
  { id: "lesao_genital", label: "Lesão ou verruga genital", category: "genital", icon: "🔍" },
  { id: "fimose", label: "Dificuldade para retrair o prepúcio", category: "genital", icon: "📋" },
  { id: "fadiga", label: "Cansaço, perda de energia e disposição", category: "geral", icon: "😴" },
  { id: "perda_massa", label: "Perda de massa muscular", category: "geral", icon: "💪" },
  { id: "ganho_peso", label: "Ganho de peso abdominal", category: "geral", icon: "⚖️" },
  { id: "libido_baixa", label: "Diminuição do desejo sexual", category: "sexual", icon: "📉" },
  { id: "ardencia_urina", label: "Ardência ou dor ao urinar", category: "urinário", icon: "🔥" },
];

const ageGroups = [
  { id: "adolescente", label: "15–25 anos", range: "adolescente" },
  { id: "adulto_jovem", label: "26–40 anos", range: "adulto_jovem" },
  { id: "adulto", label: "41–55 anos", range: "adulto" },
  { id: "senior", label: "56+ anos", range: "senior" },
];

function getResults(selectedSymptoms: string[], ageGroup: string): Result[] {
  const results: Result[] = [];

  const urinarios = ["jato_fraco", "frequencia", "nocturia", "urgencia"].filter((s) =>
    selectedSymptoms.includes(s)
  );
  if (urinarios.length >= 2) {
    results.push({
      condition: "Possível Hiperplasia Prostática Benigna (HPB)",
      description:
        "Seus sintomas urinários podem estar relacionados ao aumento benigno da próstata, condição comum em homens acima de 40 anos. Existem diversas opções de tratamento, desde medicamentos até técnicas minimamente invasivas.",
      urgency: "moderada",
      recommendation:
        "Recomendamos uma avaliação urológica com exame de PSA e ultrassonografia para definir o melhor tratamento.",
      relatedPage: "/educativo/tratamentos-hpb",
      relatedPageLabel: "Conheça os tratamentos para HPB",
    });
  }

  if (selectedSymptoms.includes("colica_renal") || (selectedSymptoms.includes("dor_lombar") && selectedSymptoms.includes("hematuria"))) {
    results.push({
      condition: "Possível Cálculo Renal (Pedra nos Rins)",
      description:
        "A combinação de dor lombar intensa e/ou sangue na urina pode indicar cálculos renais. O tratamento depende do tamanho e localização da pedra.",
      urgency: "alta",
      recommendation:
        "Procure avaliação urológica com urgência. Uma tomografia pode confirmar o diagnóstico e orientar o tratamento adequado.",
      relatedPage: "/educativo/calculos-renais",
      relatedPageLabel: "Saiba mais sobre cálculos renais",
    });
  }

  if (selectedSymptoms.includes("disfuncao_eretil")) {
    results.push({
      condition: "Disfunção Erétil",
      description:
        "A dificuldade de ereção pode ter causas vasculares, hormonais, neurológicas ou psicológicas. Uma avaliação completa é fundamental para identificar a causa e definir o tratamento mais adequado.",
      urgency: "moderada",
      recommendation:
        "Agende uma consulta para avaliação completa incluindo exames hormonais e vasculares.",
      relatedPage: "/educativo/disfuncao-eretil",
      relatedPageLabel: "Entenda a disfunção erétil",
    });
  }

  if (selectedSymptoms.includes("dor_testicular")) {
    results.push({
      condition: "Dor Testicular — Avaliação Necessária",
      description:
        "Dor ou inchaço nos testículos pode ter diversas causas, desde varicocele até condições que requerem atenção urgente. Uma avaliação clínica e ultrassonográfica é essencial.",
      urgency: "alta",
      recommendation:
        "Procure avaliação urológica em breve. Dor testicular aguda pode necessitar de atendimento de urgência.",
      relatedPage: "/educativo/procedimentos-urologicos",
      relatedPageLabel: "Conheça os procedimentos urológicos",
    });
  }

  if (selectedSymptoms.includes("lesao_genital")) {
    results.push({
      condition: "Possível HPV ou Lesão Genital",
      description:
        "Lesões ou verrugas genitais podem estar relacionadas ao HPV (Papilomavírus Humano). O diagnóstico precoce e tratamento adequado são importantes para prevenir complicações.",
      urgency: "moderada",
      recommendation:
        "Agende uma consulta para avaliação da lesão. O tratamento pode incluir cauterização ou outros procedimentos ambulatoriais.",
      relatedPage: "/educativo/procedimentos-urologicos",
      relatedPageLabel: "Saiba mais sobre tratamento de HPV",
    });
  }

  if (selectedSymptoms.includes("fimose")) {
    results.push({
      condition: "Fimose",
      description:
        "A dificuldade para retrair o prepúcio pode causar desconforto, infecções recorrentes e dificuldades na higiene. A postectomia (circuncisão) é um procedimento simples e definitivo.",
      urgency: "baixa",
      recommendation:
        "Agende uma consulta para avaliação. O procedimento é ambulatorial com recuperação rápida.",
      relatedPage: "/educativo/procedimentos-urologicos",
      relatedPageLabel: "Conheça a postectomia",
    });
  }

  const hormonais = ["fadiga", "perda_massa", "ganho_peso", "libido_baixa"].filter((s) =>
    selectedSymptoms.includes(s)
  );
  if (hormonais.length >= 2) {
    results.push({
      condition: "Possível Hipogonadismo / Deficiência de Testosterona",
      description:
        "A combinação de cansaço, perda de massa muscular, ganho de peso e diminuição da libido pode indicar níveis baixos de testosterona. A reposição hormonal pode melhorar significativamente a qualidade de vida.",
      urgency: "moderada",
      recommendation:
        "Uma avaliação com dosagem hormonal completa pode confirmar o diagnóstico e orientar o tratamento.",
      relatedPage: "/educativo/hipogonadismo",
      relatedPageLabel: "Entenda o hipogonadismo",
    });
  }

  if (hormonais.length >= 2 && selectedSymptoms.includes("ganho_peso")) {
    results.push({
      condition: "Possível Síndrome Metabólica",
      description:
        "O ganho de peso abdominal associado a outros sintomas pode indicar síndrome metabólica, condição que aumenta o risco cardiovascular e pode afetar os níveis de testosterona.",
      urgency: "moderada",
      recommendation:
        "Além da avaliação urológica, recomendamos acompanhamento com exercícios físicos (aeróbicos e musculação) e controle alimentar.",
      relatedPage: "/educativo/sindrome-metabolica",
      relatedPageLabel: "Saiba mais sobre síndrome metabólica",
    });
  }

  if (selectedSymptoms.includes("infertilidade")) {
    results.push({
      condition: "Infertilidade Masculina",
      description:
        "A dificuldade para ter filhos pode ter causas variadas, incluindo varicocele, alterações hormonais ou obstruções. Uma avaliação completa com espermograma é o primeiro passo.",
      urgency: "moderada",
      recommendation:
        "Agende uma consulta para avaliação da fertilidade masculina, incluindo espermograma e exames hormonais.",
      relatedPage: "/educativo/procedimentos-urologicos",
      relatedPageLabel: "Conheça os procedimentos andrológicos",
    });
  }

  if (selectedSymptoms.includes("hematuria") && !selectedSymptoms.includes("colica_renal") && !selectedSymptoms.includes("dor_lombar")) {
    results.push({
      condition: "Hematúria — Sangue na Urina",
      description:
        "Sangue na urina sem dor pode ter causas diversas, desde infecções até condições que necessitam investigação mais aprofundada. Nunca deve ser ignorado.",
      urgency: "alta",
      recommendation:
        "Procure avaliação urológica com urgência. Exames de imagem e cistoscopia podem ser necessários para investigação.",
    });
  }

  if (selectedSymptoms.includes("ardencia_urina")) {
    results.push({
      condition: "Possível Infecção Urinária ou Prostatite",
      description:
        "Ardência ao urinar pode indicar infecção urinária, prostatite ou outras condições inflamatórias do trato urinário.",
      urgency: "moderada",
      recommendation:
        "Agende uma consulta para avaliação com exame de urina e urocultura.",
    });
  }

  if (results.length === 0) {
    results.push({
      condition: "Avaliação Urológica Recomendada",
      description:
        "Com base nos sintomas selecionados, recomendamos uma consulta urológica para avaliação personalizada. O urologista é o médico do homem — acompanhamento regular é fundamental para a saúde masculina em qualquer idade.",
      urgency: "baixa",
      recommendation:
        "Agende uma consulta para check-up urológico completo. A prevenção é sempre o melhor caminho.",
      relatedPage: "/primeira-consulta",
      relatedPageLabel: "Saiba o que esperar na primeira consulta",
    });
  }

  return results;
}

const urgencyConfig = {
  baixa: { color: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Baixa Urgência", icon: CheckCircle2 },
  moderada: { color: "bg-amber-50 text-amber-700 border-amber-200", label: "Urgência Moderada", icon: Activity },
  alta: { color: "bg-red-50 text-red-700 border-red-200", label: "Alta Urgência", icon: AlertTriangle },
};

export default function SymptomChecker() {
  const [step, setStep] = useState<"age" | "symptoms" | "results">("age");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const results = getResults(selectedSymptoms, selectedAge);

  const reset = () => {
    setStep("age");
    setSelectedAge("");
    setSelectedSymptoms([]);
  };

  return (
    <section id="sintomas" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium mb-4">
            <Stethoscope className="w-4 h-4" />
            Ferramenta Interativa
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Avaliação de Sintomas
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Selecione seus sintomas e receba uma orientação inicial. Esta ferramenta não substitui a consulta médica,
            mas pode ajudá-lo a entender melhor seus sintomas.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-4">
            {[
              { key: "age", label: "Faixa Etária" },
              { key: "symptoms", label: "Sintomas" },
              { key: "results", label: "Orientação" },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    step === s.key
                      ? "bg-[#0D9488] text-white"
                      : (step === "symptoms" && i === 0) || (step === "results" && i <= 1)
                      ? "bg-[#0A2540] text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {i + 1}
                </div>
                <span className={`text-sm hidden sm:inline ${step === s.key ? "text-[#0D9488] font-semibold" : "text-slate-500"}`}>
                  {s.label}
                </span>
                {i < 2 && <div className="w-8 md:w-16 h-px bg-slate-300" />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Age */}
            {step === "age" && (
              <motion.div
                key="age"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8"
              >
                <h3 className="text-xl font-bold text-[#0A2540] mb-6">Qual é a sua faixa etária?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {ageGroups.map((age) => (
                    <button
                      key={age.id}
                      onClick={() => {
                        setSelectedAge(age.id);
                        setStep("symptoms");
                      }}
                      className={`p-5 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                        selectedAge === age.id
                          ? "border-[#0D9488] bg-teal-50"
                          : "border-slate-200 hover:border-[#0D9488]/50"
                      }`}
                    >
                      <span className="text-lg font-semibold text-[#0A2540]">{age.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Symptoms */}
            {step === "symptoms" && (
              <motion.div
                key="symptoms"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8"
              >
                <h3 className="text-xl font-bold text-[#0A2540] mb-2">Selecione seus sintomas</h3>
                <p className="text-slate-500 text-sm mb-6">Marque todos os sintomas que você está sentindo</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {symptoms.map((symptom) => (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`p-3 rounded-lg border text-left text-sm transition-all flex items-center gap-3 ${
                        selectedSymptoms.includes(symptom.id)
                          ? "border-[#0D9488] bg-teal-50 text-[#0A2540] font-medium shadow-sm"
                          : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-lg flex-shrink-0">{symptom.icon}</span>
                      <span>{symptom.label}</span>
                      {selectedSymptoms.includes(symptom.id) && (
                        <CheckCircle2 className="w-4 h-4 text-[#0D9488] ml-auto flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => setStep("age")}
                    className="flex items-center gap-2 px-5 py-3 text-slate-600 hover:text-[#0A2540] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Voltar
                  </button>
                  <button
                    onClick={() => selectedSymptoms.length > 0 && setStep("results")}
                    disabled={selectedSymptoms.length === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                      selectedSymptoms.length > 0
                        ? "bg-[#0D9488] text-white hover:bg-[#0B8278] shadow-md"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    Ver Orientação <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Results */}
            {step === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {results.map((result, index) => {
                  const urgency = urgencyConfig[result.urgency];
                  const UrgencyIcon = urgency.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-2 rounded-lg border ${urgency.color}`}>
                          <UrgencyIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h3 className="text-lg font-bold text-[#0A2540]">{result.condition}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full border font-medium ${urgency.color}`}>
                              {urgency.label}
                            </span>
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed mb-3">{result.description}</p>
                          <div className="bg-slate-50 rounded-lg p-4 mb-4">
                            <p className="text-sm text-[#0A2540] font-medium">
                              <strong>Recomendação:</strong> {result.recommendation}
                            </p>
                          </div>
                          {result.relatedPage && (
                            <a
                              href={result.relatedPage}
                              className="inline-flex items-center gap-2 text-[#0D9488] hover:text-[#0B8278] text-sm font-medium transition-colors"
                            >
                              {result.relatedPageLabel} <ArrowRight className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: results.length * 0.15 }}
                  className="bg-[#0A2540] rounded-2xl p-8 text-center"
                >
                  <p className="text-white/80 text-sm mb-2">Esta avaliação é apenas orientativa e não substitui a consulta médica.</p>
                  <h3 className="text-xl font-bold text-white mb-6">Agende sua consulta para uma avaliação completa</h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D9488] text-white rounded-lg font-semibold hover:bg-[#0B8278] transition-colors"
                    >
                      Agendar Consulta <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="https://wa.me/5511981124455?text=Olá Dr. Felipe, gostaria de agendar uma consulta."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      <Phone className="w-4 h-4" /> WhatsApp
                    </a>
                  </div>
                </motion.div>

                {/* Reset */}
                <div className="text-center">
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0A2540] transition-colors text-sm"
                  >
                    <RotateCcw className="w-4 h-4" /> Refazer avaliação
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
