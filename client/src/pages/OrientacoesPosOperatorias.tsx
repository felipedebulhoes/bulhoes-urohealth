/*
 * Design: Clinical Precision — Swiss Medical Design
 * Page: Orientações Pós-Operatórias — cuidados e sinais de alerta
 */
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import EducationalLayout from "@/components/EducationalLayout";
import {
  AlertTriangle, Check, ChevronDown, ChevronUp,
  Thermometer, Droplets, Activity, Clock,
  ShieldAlert, Heart, Stethoscope, Pill, BedDouble
} from "lucide-react";

interface Surgery {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  expectedSymptoms: { symptom: string; duration: string; detail: string }[];
  warningSignals: string[];
  generalCare: string[];
  catheterInfo?: string;
  returnToActivities: string;
}

const surgeries: Surgery[] = [
  {
    id: "prostata-rtup-holep",
    name: "Cirurgias de Próstata (RTU-P / HoLEP)",
    subtitle: "Ressecção ou enucleação prostática para HPB",
    icon: <Stethoscope className="w-6 h-6" />,
    description:
      "Após a ressecção transuretral (RTU-P) ou enucleação com laser holmium (HoLEP) da próstata para tratamento da hiperplasia prostática benigna, é normal apresentar alguns sintomas durante o período de recuperação. A maioria resolve espontaneamente em semanas.",
    expectedSymptoms: [
      { symptom: "Hematúria (sangue na urina)", duration: "2 a 4 semanas", detail: "A urina pode variar de rosada a avermelhada. É normal e tende a clarear progressivamente. Aumente a ingestão de água para diluir a urina." },
      { symptom: "Urgência e frequência urinária", duration: "2 a 6 semanas", detail: "Vontade súbita e frequente de urinar, especialmente nas primeiras semanas. Resulta da cicatrização da loja prostática." },
      { symptom: "Ardência ao urinar (disúria)", duration: "1 a 3 semanas", detail: "Sensação de queimação durante a micção. Melhora progressivamente com a cicatrização." },
      { symptom: "Cateter vesical", duration: "24h a 7 dias", detail: "HoLEP: geralmente retirado em 24h. RTU-P: 1-3 dias. Pode haver desconforto e espasmos vesicais com o cateter." },
      { symptom: "Ejaculação retrógrada", duration: "Permanente na maioria", detail: "O sêmen é direcionado para a bexiga durante o orgasmo em vez de sair pela uretra. Não afeta o prazer sexual nem a ereção. Ocorre em 65-90% dos casos." },
    ],
    warningSignals: [
      "Febre acima de 38°C ou calafrios",
      "Sangramento intenso com coágulos que obstruem a passagem da urina",
      "Impossibilidade de urinar (retenção urinária) após retirada do cateter",
      "Dor abdominal intensa que não melhora com analgésicos",
      "Urina com odor fétido ou aspecto turvo (possível infecção)",
    ],
    generalCare: [
      "Ingerir 2 a 3 litros de água por dia para manter a urina clara",
      "Evitar esforço físico intenso por 3 a 4 semanas",
      "Não carregar peso acima de 5 kg nas primeiras 2 semanas",
      "Evitar relações sexuais por 3 a 4 semanas",
      "Evitar alimentos condimentados, café e álcool na primeira semana",
      "Tomar os medicamentos prescritos nos horários corretos",
      "Manter atividade leve (caminhadas curtas) desde o primeiro dia",
    ],
    returnToActivities: "Atividades leves: 1-2 semanas. Trabalho de escritório: 1-2 semanas. Exercícios físicos: 3-4 semanas. Direção: após retirada do cateter e sem uso de analgésicos fortes.",
  },
  {
    id: "prostatectomia-radical",
    name: "Prostatectomia Radical (Robótica/Laparoscópica)",
    subtitle: "Remoção da próstata para tratamento do câncer",
    icon: <Heart className="w-6 h-6" />,
    description:
      "A prostatectomia radical é a remoção completa da próstata para tratamento do câncer de próstata. A recuperação envolve cuidados com o cateter vesical, exercícios para o assoalho pélvico e acompanhamento da função urinária e sexual.",
    expectedSymptoms: [
      { symptom: "Cateter vesical (sonda de Foley)", duration: "7 a 14 dias", detail: "Necessário para permitir a cicatrização da anastomose (sutura entre bexiga e uretra). Será retirado no consultório." },
      { symptom: "Incontinência urinária transitória", duration: "Semanas a meses", detail: "Perda involuntária de urina, especialmente aos esforços (tossir, espirrar, levantar). Melhora progressivamente com exercícios de Kegel. A maioria recupera a continência em 3-6 meses." },
      { symptom: "Disfunção erétil", duration: "Meses (variável)", detail: "Depende da preservação dos nervos cavernosos durante a cirurgia, da idade e da função prévia. A recuperação pode levar 6-24 meses. Existem tratamentos disponíveis." },
      { symptom: "Dor nos locais dos portais", duration: "1 a 2 semanas", detail: "Desconforto leve nos pontos de inserção dos trocárteres. Controlado com analgésicos simples." },
      { symptom: "Fadiga", duration: "2 a 4 semanas", detail: "Cansaço geral pós-operatório. Melhora gradualmente com retorno às atividades." },
    ],
    warningSignals: [
      "Febre acima de 38°C",
      "Vazamento de urina ao redor do cateter em grande quantidade",
      "Sangue vivo em grande quantidade pelo cateter",
      "Dor intensa no abdome que não melhora com medicação",
      "Inchaço, vermelhidão ou secreção nos locais das incisões",
      "Dor ou inchaço na panturrilha (possível trombose venosa)",
      "Falta de ar súbita",
    ],
    generalCare: [
      "Manter o cateter limpo e bem fixado — lavar com água e sabão",
      "Iniciar exercícios de Kegel assim que o cateter for retirado",
      "Usar absorvente masculino conforme necessidade",
      "Caminhar diariamente desde o primeiro dia pós-operatório",
      "Evitar esforço físico intenso por 4-6 semanas",
      "Manter acompanhamento com PSA conforme orientação",
      "Usar meias de compressão conforme orientação médica",
    ],
    catheterInfo: "O cateter será retirado no consultório entre 7-14 dias. Antes da retirada, pode ser realizada uma cistografia (exame com contraste) para confirmar a cicatrização da anastomose.",
    returnToActivities: "Caminhadas: imediato. Trabalho de escritório: 2-3 semanas. Direção: 2-3 semanas (sem cateter). Exercícios físicos: 4-6 semanas. Relações sexuais: 4-6 semanas.",
  },
  {
    id: "calculos-urs",
    name: "Cirurgia de Cálculos (Ureterorrenolitotripsia)",
    subtitle: "Tratamento endoscópico de cálculos renais e ureterais",
    icon: <Activity className="w-6 h-6" />,
    description:
      "A ureterorrenolitotripsia (URS) é o tratamento endoscópico de cálculos renais e ureterais com laser. Após o procedimento, é comum a colocação de um cateter duplo J (stent ureteral) que permanece por 1-4 semanas.",
    expectedSymptoms: [
      { symptom: "Cólica leve a moderada", duration: "1 a 5 dias", detail: "Dor em flanco ou região lombar, geralmente controlada com analgésicos. Pode ocorrer pela passagem de fragmentos residuais." },
      { symptom: "Hematúria (sangue na urina)", duration: "2 a 7 dias", detail: "Urina rosada a avermelhada é normal nos primeiros dias. Aumente a ingestão hídrica." },
      { symptom: "Sintomas do cateter duplo J", duration: "Enquanto o cateter estiver presente", detail: "Urgência urinária, frequência aumentada, desconforto em flanco ao urinar e sangue na urina. São sintomas do cateter, não complicações." },
      { symptom: "Fragmentos de cálculo na urina", duration: "Dias a semanas", detail: "Pequenos fragmentos podem ser eliminados pela urina. Pode causar desconforto passageiro." },
    ],
    warningSignals: [
      "Febre acima de 38°C — pode indicar infecção/sepse urinária (URGENTE)",
      "Dor intensa que não melhora com analgésicos prescritos",
      "Ausência completa de urina por mais de 6 horas",
      "Náuseas e vômitos persistentes",
      "Sangramento intenso com coágulos",
    ],
    generalCare: [
      "Ingerir no mínimo 2,5 a 3 litros de água por dia",
      "Tomar os analgésicos e anti-inflamatórios prescritos nos horários corretos",
      "Usar alfa-bloqueador (tansulosina) se prescrito — facilita a passagem de fragmentos",
      "Coletar e guardar fragmentos de cálculo para análise (usar peneira)",
      "Retornar na data agendada para retirada do cateter duplo J",
      "Evitar esforço físico intenso por 1-2 semanas",
    ],
    catheterInfo: "O cateter duplo J é um tubo flexível posicionado entre o rim e a bexiga para garantir a drenagem da urina e prevenir obstrução por fragmentos ou edema. Permanece por 1-4 semanas e é retirado no consultório por cistoscopia (procedimento rápido, geralmente sem anestesia geral).",
    returnToActivities: "Atividades leves: 2-3 dias. Trabalho: 3-7 dias. Exercícios: 1-2 semanas. Sem restrição após retirada do cateter duplo J.",
  },
  {
    id: "calculos-leco",
    name: "LECO (Litotripsia Extracorpórea)",
    subtitle: "Fragmentação de cálculos por ondas de choque",
    icon: <Droplets className="w-6 h-6" />,
    description:
      "A LECO fragmenta cálculos renais por ondas de choque aplicadas externamente. É um procedimento ambulatorial, mas os fragmentos precisam ser eliminados naturalmente pela urina nos dias e semanas seguintes.",
    expectedSymptoms: [
      { symptom: "Cólica renal", duration: "1 a 7 dias", detail: "Os fragmentos do cálculo precisam passar pelo ureter para serem eliminados, o que pode causar cólica. Use os analgésicos prescritos." },
      { symptom: "Hematúria", duration: "1 a 3 dias", detail: "Sangue na urina é esperado e resulta do impacto das ondas de choque no rim." },
      { symptom: "Equimose (hematoma) na pele", duration: "1 a 2 semanas", detail: "Mancha roxa na região lombar onde as ondas foram aplicadas. Resolve espontaneamente." },
      { symptom: "Fragmentos na urina", duration: "Dias a semanas", detail: "Pequenos fragmentos de cálculo são eliminados pela urina. Use uma peneira para coletá-los." },
    ],
    warningSignals: [
      "Febre acima de 38°C ou calafrios",
      "Dor intensa que não responde aos analgésicos",
      "Ausência de urina por mais de 6 horas",
      "Náuseas e vômitos que impedem a ingestão de líquidos",
    ],
    generalCare: [
      "Ingerir abundante quantidade de líquidos (2,5-3L/dia) para facilitar a eliminação dos fragmentos",
      "Tomar os medicamentos prescritos (analgésicos, alfa-bloqueador)",
      "Coletar fragmentos com peneira para análise",
      "Atividade física leve é permitida desde o primeiro dia",
      "Retornar para exame de imagem de controle conforme agendado",
    ],
    returnToActivities: "Imediato para atividades leves. Trabalho: 1-2 dias. Exercícios: 3-5 dias.",
  },
  {
    id: "nefrectomia",
    name: "Nefrectomia (Total ou Parcial)",
    subtitle: "Remoção total ou parcial do rim — robótica/laparoscópica",
    icon: <ShieldAlert className="w-6 h-6" />,
    description:
      "A nefrectomia é a remoção cirúrgica do rim (total) ou de parte dele (parcial), geralmente para tratamento de tumores renais. Quando realizada por via robótica ou laparoscópica, a recuperação é significativamente mais rápida que na cirurgia aberta.",
    expectedSymptoms: [
      { symptom: "Dor nos locais dos portais", duration: "1 a 2 semanas", detail: "Desconforto nas incisões de 8-12mm. Controlado com analgésicos. A dor no ombro (por irritação diafragmática pelo CO₂) é comum e temporária." },
      { symptom: "Hematúria leve", duration: "1 a 5 dias", detail: "Especialmente na nefrectomia parcial. Resolve espontaneamente." },
      { symptom: "Fadiga", duration: "2 a 4 semanas", detail: "Cansaço geral é esperado. Melhora gradualmente com atividade progressiva." },
      { symptom: "Constipação", duration: "3 a 7 dias", detail: "O íleo pós-operatório (intestino 'adormecido') é comum. Dieta leve e laxantes ajudam." },
      { symptom: "Dreno (se colocado)", duration: "1 a 5 dias", detail: "Na nefrectomia parcial, um dreno pode ser deixado para monitorar sangramento. Retirado antes da alta ou no retorno." },
    ],
    warningSignals: [
      "Febre acima de 38°C",
      "Sangramento pela incisão ou aumento do débito do dreno",
      "Dor abdominal intensa e progressiva",
      "Falta de ar ou dor torácica",
      "Dor ou inchaço na panturrilha (possível trombose)",
      "Ausência de eliminação de gases por mais de 48h",
    ],
    generalCare: [
      "Caminhar desde o primeiro dia pós-operatório — previne trombose e íleo",
      "Dieta leve e progressiva nos primeiros dias",
      "Evitar esforço físico e carregar peso por 4-6 semanas",
      "Manter as incisões limpas e secas",
      "Usar meias de compressão conforme orientação",
      "Monitorar função renal com exames de sangue no seguimento",
      "Na nefrectomia parcial: controle de imagem conforme agendado",
    ],
    returnToActivities: "Caminhadas: imediato. Trabalho de escritório: 2-3 semanas. Direção: 2-3 semanas. Exercícios: 4-6 semanas.",
  },
  {
    id: "circuncisao",
    name: "Circuncisão (Postectomia)",
    subtitle: "Remoção cirúrgica do prepúcio",
    icon: <Pill className="w-6 h-6" />,
    description:
      "A circuncisão é a remoção cirúrgica do prepúcio, indicada para fimose, parafimose, balanopostites de repetição ou por escolha pessoal. É um procedimento ambulatorial com recuperação relativamente rápida.",
    expectedSymptoms: [
      { symptom: "Edema (inchaço) peniano", duration: "1 a 3 semanas", detail: "Inchaço na glande e na linha de sutura é normal. Melhora progressivamente." },
      { symptom: "Equimose (hematoma)", duration: "1 a 2 semanas", detail: "Manchas roxas no pênis são comuns e resolvem espontaneamente." },
      { symptom: "Desconforto local", duration: "5 a 10 dias", detail: "Sensibilidade aumentada da glande, especialmente ao contato com a roupa. Melhora com a adaptação." },
      { symptom: "Pontos absorvíveis", duration: "2 a 4 semanas para absorver", detail: "Os pontos caem sozinhos. Não tente removê-los." },
    ],
    warningSignals: [
      "Sangramento ativo que não para com compressão local",
      "Sinais de infecção: pus, vermelhidão intensa, calor local",
      "Febre acima de 38°C",
      "Dor intensa e progressiva",
      "Inchaço excessivo que não melhora após 1 semana",
    ],
    generalCare: [
      "Manter o curativo limpo e trocar conforme orientação",
      "Lavar com água e sabão neutro após 24-48h",
      "Usar cueca justa (tipo boxer) para dar suporte",
      "Aplicar pomada antibiótica se prescrita",
      "Evitar atividade sexual por 30 dias",
      "Evitar exercícios físicos intensos por 2-3 semanas",
      "Compressas frias nas primeiras 48h ajudam a reduzir o edema",
    ],
    returnToActivities: "Trabalho: 2-3 dias. Exercícios leves: 1-2 semanas. Exercícios intensos: 3 semanas. Relações sexuais: 30 dias.",
  },
];

function SurgeryCard({ surgery, index }: { surgery: Surgery; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      id={surgery.id}
      className="bg-white rounded-xl border border-[#1C3D5A]/6 overflow-hidden hover:shadow-lg transition-shadow scroll-mt-24"
    >
      {/* Header */}
      <div className="p-6 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center text-red-600 shrink-0">
              {surgery.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1C3D5A] mb-0.5">{surgery.name}</h3>
              <p className="text-xs text-[#1C3D5A]/40 mb-2">{surgery.subtitle}</p>
              <p className="text-sm text-[#1C3D5A]/60 leading-relaxed">{surgery.description}</p>
            </div>
          </div>
          <button className="shrink-0 mt-1 text-[#1C3D5A]/30">
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded */}
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="border-t border-[#1C3D5A]/6"
        >
          <div className="p-6 space-y-6">
            {/* Expected symptoms */}
            <div>
              <h4 className="text-sm font-semibold text-[#1C3D5A] mb-3 flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-500" />
                Sintomas Esperados (Normais)
              </h4>
              <div className="space-y-3">
                {surgery.expectedSymptoms.map((s, i) => (
                  <div key={i} className="bg-amber-50/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[#1C3D5A]">{s.symptom}</span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                        {s.duration}
                      </span>
                    </div>
                    <p className="text-xs text-[#1C3D5A]/55 leading-relaxed">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning signals */}
            <div className="bg-red-50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Sinais de Alerta — Procure Atendimento Médico
              </h4>
              <div className="space-y-2">
                {surgery.warningSignals.map((signal, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Thermometer className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-500" />
                    <span className="text-xs text-red-800/80">{signal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Catheter info */}
            {surgery.catheterInfo && (
              <div className="bg-blue-50 rounded-xl p-5">
                <h4 className="text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                  <BedDouble className="w-4 h-4" />
                  Sobre o Cateter
                </h4>
                <p className="text-xs text-blue-800/70 leading-relaxed">{surgery.catheterInfo}</p>
              </div>
            )}

            {/* General care */}
            <div>
              <h4 className="text-sm font-semibold text-[#1C3D5A] mb-3">Cuidados Gerais</h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {surgery.generalCare.map((care, i) => (
                  <div key={i} className="flex items-start gap-2 bg-[#F8FAFB] rounded-lg p-3">
                    <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#B87333]" />
                    <span className="text-xs text-[#1C3D5A]/60">{care}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Return to activities */}
            <div className="bg-[#1C3D5A]/3 rounded-lg p-4">
              <h4 className="text-xs font-semibold text-[#1C3D5A]/70 mb-1 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#B87333]" />
                Retorno às Atividades
              </h4>
              <p className="text-xs text-[#1C3D5A]/55">{surgery.returnToActivities}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function OrientacoesPosOperatorias() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <EducationalLayout
      title="Orientações Pós-Operatórias"
      subtitle="Cuidados e Sinais de Alerta"
      description="Saiba o que esperar após as cirurgias urológicas mais frequentes, quais sintomas são normais durante a recuperação e quando é necessário procurar atendimento médico."
      accentColor="#DC2626"
    >
      {/* Intro */}
      <section className="py-12 lg:py-16 border-b border-[#1C3D5A]/6">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none prose-headings:text-[#1C3D5A] prose-p:text-[#1C3D5A]/65 prose-p:leading-relaxed prose-strong:text-[#1C3D5A]/80">
            <p>
              A recuperação após uma cirurgia urológica envolve sintomas que são <strong>esperados e normais</strong> — como sangue na urina, desconforto e urgência urinária — e outros que representam <strong>sinais de alerta</strong> e exigem avaliação médica imediata. Saber diferenciar esses dois cenários é fundamental para uma recuperação segura e tranquila.
            </p>
            <p>
              Abaixo, detalhamos as orientações para cada tipo de cirurgia, incluindo os sintomas esperados e sua duração, os sinais que indicam possíveis complicações, os cuidados gerais e o tempo estimado de retorno às atividades.
            </p>
          </div>

          {/* Emergency box */}
          <div className="mt-8 bg-red-50 border-l-4 border-red-500 rounded-r-xl p-5">
            <h3 className="text-sm font-bold text-red-700 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Em caso de emergência
            </h3>
            <p className="text-xs text-red-700/70 leading-relaxed">
              Se apresentar <strong>febre alta, sangramento intenso, dor incontrolável ou ausência de urina</strong>, procure o pronto-socorro mais próximo imediatamente e entre em contato com o Dr. Felipe pelo WhatsApp: <a href="https://wa.me/5511981124455" className="underline font-semibold">(11) 98112-4455</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <section className="py-6 bg-[#F8FAFB] border-b border-[#1C3D5A]/6">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {surgeries.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-xs px-3 py-1.5 rounded-full bg-white border border-[#1C3D5A]/8 text-[#1C3D5A]/60 hover:border-[#1C3D5A]/20 transition-colors"
              >
                {s.name.split("(")[0].trim()}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Surgery cards */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-4xl space-y-4">
          {surgeries.map((s, i) => (
            <SurgeryCard key={s.id} surgery={s} index={i} />
          ))}
        </div>
      </section>

      {/* References */}
      <section className="py-8 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h3 className="text-xs font-semibold text-[#1C3D5A]/40 uppercase tracking-wider mb-3">Referências</h3>
          <ol className="text-[10px] text-[#1C3D5A]/35 space-y-1 list-decimal list-inside">
            <li>EAU Guidelines on Urolithiasis, 2025. European Association of Urology.</li>
            <li>EAU Guidelines on Non-neurogenic Male LUTS (BPH), 2025. European Association of Urology.</li>
            <li>AUA/ASTRO Guidelines on Clinically Localized Prostate Cancer, 2025.</li>
            <li>Campbell-Walsh-Wein Urology, 12th Edition. Elsevier, 2021. Chapters 90-95, 150-155.</li>
            <li>Gravas S, et al. EAU Guidelines on Management of Non-Neurogenic Male LUTS. Eur Urol. 2025.</li>
            <li>Türk C, et al. EAU Guidelines on Urolithiasis. Eur Urol. 2025.</li>
            <li>Mottet N, et al. EAU Guidelines on Prostate Cancer. Eur Urol. 2025.</li>
          </ol>
        </div>
      </section>
    </EducationalLayout>
  );
}
