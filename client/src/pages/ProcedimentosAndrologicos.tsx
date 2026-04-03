/*
 * Design: Clinical Precision — Swiss Medical Design
 * Page: Procedimentos Andrológicos — Postectomia, Vasectomia, Varicocele e HPV
 * Referências: EAU Guidelines 2025, AUA Guidelines 2024, Campbell-Walsh-Wein 13th Ed.
 */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import EducationalLayout from "@/components/EducationalLayout";
import {
  Shield, Scissors, Heart, AlertTriangle, Check, X,
  Clock, ChevronDown, ChevronUp, Activity, Pill,
  Stethoscope, Thermometer, Baby
} from "lucide-react";

interface Procedure {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  whatIs: string;
  indications: string[];
  howItWorks: string;
  anesthesia: string;
  duration: string;
  recovery: {
    work: string;
    exercise: string;
    sex: string;
    special: string;
  };
  expectedSymptoms: string[];
  warningSymptoms: string[];
  advantages: string[];
  risks: string[];
}

const procedures: Procedure[] = [
  {
    id: "postectomia",
    name: "Postectomia (Circuncisão)",
    icon: <Scissors className="w-6 h-6" />,
    color: "blue",
    whatIs: "A postectomia (circuncisão) é a remoção cirúrgica do prepúcio — a pele que recobre a glande (cabeça do pênis). É um dos procedimentos cirúrgicos mais antigos e realizados no mundo, com indicações médicas bem estabelecidas. Pode ser realizada em qualquer idade, sendo mais frequente em adultos por indicações como fimose, parafimose, balanopostites de repetição e prevenção de infecções.",
    indications: [
      "Fimose — impossibilidade de retrair completamente o prepúcio",
      "Parafimose — prepúcio retraído que não retorna à posição normal (urgência)",
      "Balanopostite de repetição — infecções recorrentes da glande e prepúcio",
      "Líquen escleroso (balanite xerótica obliterante)",
      "Prevenção de ISTs — reduz risco de HIV em 50-60%, HPV e herpes",
      "Prevenção de câncer de pênis",
      "Preferência pessoal / higiene",
    ],
    howItWorks: "Sob anestesia, o prepúcio é marcado, excisado com bisturi ou dispositivo específico, e os vasos são cauterizados. A pele é suturada com pontos absorvíveis (que caem sozinhos em 2-4 semanas). Pode ser realizada com técnica convencional (bisturi), com grampeador (stapler) ou com dispositivo de compressão. O procedimento dura 30-45 minutos.",
    anesthesia: "Local com sedação (mais comum em adultos), raquianestesia ou geral",
    duration: "30-45 minutos",
    recovery: {
      work: "3-5 dias para trabalho de escritório; 7-10 dias para trabalho físico",
      exercise: "2-3 semanas sem exercícios intensos",
      sex: "30-40 dias de abstinência sexual",
      special: "Curativos diários com pomada antibiótica por 7-10 dias. Usar cueca justa para suporte.",
    },
    expectedSymptoms: [
      "Edema (inchaço) da glande e região da sutura — normal por 1-2 semanas",
      "Equimose (roxo) — normal por 1-2 semanas",
      "Sensibilidade aumentada da glande — normal, melhora em 2-4 semanas",
      "Desconforto leve — controlado com analgésicos comuns",
      "Pontos caindo gradualmente em 2-4 semanas",
    ],
    warningSymptoms: [
      "Sangramento ativo que não para com compressão por 20 minutos",
      "Febre >38°C",
      "Secreção purulenta (pus) com odor fétido",
      "Dor intensa e progressiva não controlada com analgésicos",
      "Inchaço excessivo e progressivo com mudança de cor (arroxeado intenso)",
    ],
    advantages: [
      "Procedimento ambulatorial — alta no mesmo dia",
      "Resolve definitivamente a fimose",
      "Reduz risco de infecções urinárias e ISTs",
      "Facilita a higiene",
      "Reduz risco de câncer de pênis",
    ],
    risks: [
      "Sangramento pós-operatório (2-5%)",
      "Infecção da ferida (1-3%)",
      "Resultado estético insatisfatório (raro)",
      "Estenose do meato uretral (raro)",
    ],
  },
  {
    id: "vasectomia",
    name: "Vasectomia",
    icon: <Shield className="w-6 h-6" />,
    color: "emerald",
    whatIs: "A vasectomia é um método contraceptivo cirúrgico masculino permanente que consiste na secção e oclusão dos ductos deferentes — os canais que transportam os espermatozoides dos testículos até a uretra. É o método contraceptivo mais eficaz disponível (taxa de falha <0,1%), mais seguro e menos invasivo que a laqueadura tubária feminina. Não altera a produção de hormônios (testosterona), a libido, a ereção ou o volume do ejaculado (os espermatozoides representam apenas 2-5% do volume seminal).",
    indications: [
      "Homens com prole constituída que desejam contracepção definitiva",
      "Casais que optam por contracepção permanente masculina",
      "Contraindicação a outros métodos contraceptivos na parceira",
      "Requisito legal no Brasil: ≥21 anos OU ≥2 filhos vivos, com prazo de reflexão de 60 dias. Não é necessário consentimento do cônjuge (Lei 14.443/2022)",
    ],
    howItWorks: "Através de uma pequena incisão (1-2cm) na bolsa escrotal (ou técnica 'no-scalpel' com punção), os ductos deferentes são identificados, seccionados e suas extremidades são cauterizadas e/ou ligadas. A técnica 'no-scalpel' (sem bisturi) utiliza uma pinça especial para acessar o deferente por uma pequena punção, reduzindo sangramento e complicações. O procedimento dura 15-30 minutos.",
    anesthesia: "Local (mais comum) — injeção de anestésico na bolsa escrotal",
    duration: "15-30 minutos",
    recovery: {
      work: "2-3 dias para trabalho de escritório; 5-7 dias para trabalho físico",
      exercise: "1-2 semanas sem exercícios intensos; evitar esforço abdominal",
      sex: "7-10 dias de abstinência. USAR OUTRO MÉTODO até espermograma de controle negativo (3 meses)",
      special: "Gelo local nas primeiras 48h. Cueca justa (sunga) por 7 dias. Espermograma de controle em 3 meses (ou após 20 ejaculações) — ESSENCIAL.",
    },
    expectedSymptoms: [
      "Dor leve a moderada na bolsa escrotal — 2-5 dias",
      "Edema e equimose (inchaço e roxo) — 1-2 semanas",
      "Desconforto ao caminhar nos primeiros dias",
      "Pequeno nódulo palpável no local da cirurgia — normal",
    ],
    warningSymptoms: [
      "Aumento progressivo do inchaço da bolsa escrotal (hematoma)",
      "Febre >38°C",
      "Secreção purulenta no local da incisão",
      "Dor intensa e progressiva após 48h",
      "Sangramento ativo pela incisão",
    ],
    advantages: [
      "Método contraceptivo mais eficaz (<0,1% de falha)",
      "Procedimento ambulatorial rápido (15-30 min)",
      "Anestesia local — sem necessidade de anestesia geral",
      "Não altera hormônios, libido ou ereção",
      "Mais seguro e menos invasivo que a laqueadura feminina",
      "Recuperação rápida",
    ],
    risks: [
      "Hematoma escrotal (1-2%)",
      "Infecção (1-2%)",
      "Dor crônica escrotal — síndrome pós-vasectomia (1-2%)",
      "Granuloma espermático (raro)",
      "Falha (recanalização espontânea): 0,03-0,05%",
    ],
  },
  {
    id: "varicocele",
    name: "Varicocele",
    icon: <Activity className="w-6 h-6" />,
    color: "violet",
    whatIs: "A varicocele é a dilatação anormal das veias do plexo pampiniforme — as veias que drenam o sangue dos testículos. É semelhante a varizes nas pernas, mas ocorre na bolsa escrotal. Afeta 15-20% dos homens na população geral e até 35-40% dos homens inférteis. É a causa tratável mais comum de infertilidade masculina. Predomina no lado esquerdo (80-90%) devido à anatomia da veia gonadal esquerda, que drena em ângulo reto na veia renal.",
    indications: [
      "Varicocele clínica (palpável) + infertilidade + espermograma alterado",
      "Varicocele clínica + dor/desconforto escrotal",
      "Varicocele em adolescente com assimetria testicular (>20% de diferença)",
      "Varicocele clínica + hipogonadismo (testosterona baixa)",
    ],
    howItWorks: "O tratamento cirúrgico consiste na ligadura (amarração) das veias dilatadas, preservando a artéria testicular e os vasos linfáticos. A técnica microcirúrgica subinguinal (com microscópio) é o padrão-ouro — oferece menor taxa de recorrência (<1%) e menor risco de hidrocele. Alternativas: técnica laparoscópica e embolização percutânea (radiologia intervencionista). O procedimento dura 45-90 minutos.",
    anesthesia: "Raquianestesia ou geral (microcirúrgica); local + sedação (embolização)",
    duration: "45-90 minutos (microcirúrgica); 30-60 minutos (embolização)",
    recovery: {
      work: "3-5 dias para trabalho de escritório; 7-14 dias para trabalho físico",
      exercise: "2-3 semanas sem exercícios intensos; 4 semanas para musculação pesada",
      sex: "7-14 dias de abstinência",
      special: "Gelo local nas primeiras 48h. Cueca justa por 2 semanas. Espermograma de controle em 3-6 meses. Melhora dos parâmetros seminais em 60-80% dos casos.",
    },
    expectedSymptoms: [
      "Dor leve na região inguinal — 3-7 dias",
      "Edema e equimose na bolsa escrotal — 1-2 semanas",
      "Sensação de 'peso' na bolsa escrotal nos primeiros dias",
      "Desconforto ao caminhar — melhora progressiva",
    ],
    warningSymptoms: [
      "Aumento progressivo do volume escrotal (hidrocele ou hematoma)",
      "Febre >38°C",
      "Dor intensa e progressiva no testículo",
      "Secreção purulenta na incisão",
      "Atrofia testicular (redução do tamanho) — raro, procurar médico",
    ],
    advantages: [
      "Melhora dos parâmetros seminais em 60-80% dos casos",
      "Aumento da testosterona em 100-140 ng/dL (média)",
      "Técnica microcirúrgica: recorrência <1%",
      "Melhora da dor escrotal em >80% dos casos",
      "Pode permitir concepção natural evitando FIV/ICSI",
    ],
    risks: [
      "Hidrocele (acúmulo de líquido): 0,5-1% (microcirúrgica) vs 5-10% (outras)",
      "Recorrência: <1% (microcirúrgica) vs 5-15% (outras técnicas)",
      "Atrofia testicular (<0,5% — muito raro com preservação arterial)",
      "Infecção da ferida (1-2%)",
    ],
  },
  {
    id: "hpv",
    name: "HPV — Prevenção e Tratamento",
    icon: <Thermometer className="w-6 h-6" />,
    color: "amber",
    whatIs: "O HPV (Papilomavírus Humano) é a infecção sexualmente transmissível mais comum no mundo — estima-se que 80% das pessoas sexualmente ativas terão contato com o vírus ao longo da vida. Existem mais de 200 subtipos, sendo os tipos 6 e 11 responsáveis por 90% das verrugas genitais (condilomas), e os tipos 16 e 18 responsáveis por 70% dos cânceres associados ao HPV (colo uterino, pênis, ânus, orofaringe). No homem, o HPV pode causar verrugas genitais, câncer de pênis e câncer anal.",
    indications: [
      "Verrugas genitais (condilomas acuminados) — tratamento das lesões",
      "Lesões subclínicas detectadas por peniscopia",
      "Prevenção: vacinação (HPV quadrivalente ou nonavalente)",
      "Parceira com HPV ou NIC — investigação do parceiro masculino",
    ],
    howItWorks: "O tratamento das lesões por HPV pode ser: (1) Destrutivo: cauterização elétrica, crioterapia, laser CO2 ou excisão cirúrgica — remove as lesões visíveis. (2) Tópico: imiquimode 5% (imunomodulador), podofilotoxina ou ácido tricloroacético — aplicação pelo paciente ou médico. (3) Combinado: destruição das lesões + imunomodulador para reduzir recorrência. A peniscopia (exame com lente de aumento + ácido acético) é fundamental para detectar lesões subclínicas não visíveis a olho nu.",
    anesthesia: "Local (cauterização); sem anestesia (tratamento tópico)",
    duration: "15-30 minutos (cauterização); semanas (tratamento tópico)",
    recovery: {
      work: "1-2 dias (cauterização); sem afastamento (tópico)",
      exercise: "3-5 dias sem exercícios intensos após cauterização",
      sex: "Abstinência até cicatrização completa (2-4 semanas). Uso de preservativo sempre.",
      special: "Seguimento com peniscopia a cada 3-6 meses por 2 anos. Vacinação do paciente e parceira se não vacinados.",
    },
    expectedSymptoms: [
      "Dor/ardência local após cauterização — 3-7 dias",
      "Formação de crosta no local tratado — cai em 1-2 semanas",
      "Irritação e vermelhidão com imiquimode — esperado (sinal de resposta imune)",
      "Possível recorrência das lesões (30-40%) — necessidade de seguimento",
    ],
    warningSymptoms: [
      "Sangramento ativo que não para com compressão",
      "Febre >38°C",
      "Secreção purulenta no local tratado",
      "Lesões que crescem rapidamente ou mudam de aspecto",
      "Dor intensa desproporcional ao procedimento",
    ],
    advantages: [
      "Tratamento ambulatorial — sem internação",
      "Múltiplas opções terapêuticas adaptáveis ao caso",
      "Vacinação previne 90% das verrugas e 70-90% dos cânceres por HPV",
      "Peniscopia permite detecção precoce de lesões subclínicas",
    ],
    risks: [
      "Recorrência das lesões (30-40%) — o vírus pode permanecer latente",
      "Cicatriz ou alteração de pigmentação no local tratado",
      "Reação inflamatória intensa com imiquimode (raro)",
      "Progressão para lesões pré-malignas se não tratado (raro em imunocompetentes)",
    ],
  },
];

function ProcedureSection({ proc, index }: { proc: Procedure; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.section
      id={proc.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-24"
    >
      <div className="bg-white rounded-xl border border-[#0A2540]/6 overflow-hidden">
        {/* Header */}
        <div className={`bg-${proc.color}-50 p-6 lg:p-8`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-xl bg-${proc.color}-100 flex items-center justify-center text-${proc.color}-600`}>
              {proc.icon}
            </div>
            <div>
              <h2 className="text-xl lg:text-2xl font-serif text-[#0A2540]">{proc.name}</h2>
              <div className="flex items-center gap-3 mt-1 text-xs text-[#0A2540]/40">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {proc.duration}</span>
                <span className="flex items-center gap-1"><Stethoscope className="w-3 h-3" /> {proc.anesthesia}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-[#0A2540]/60 leading-relaxed">{proc.whatIs}</p>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8 space-y-6">
          {/* Indications */}
          <div>
            <h3 className="text-sm font-semibold text-[#0A2540] mb-3">Indicações</h3>
            <div className="space-y-1.5">
              {proc.indications.map((ind, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-500" />
                  <span className="text-xs text-[#0A2540]/60">{ind}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="bg-[#F8FAFB] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-[#0A2540] mb-2">Como é realizado</h3>
            <p className="text-xs text-[#0A2540]/55 leading-relaxed">{proc.howItWorks}</p>
          </div>

          {/* Advantages and Risks */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-50/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-emerald-700 mb-3">Vantagens</h3>
              <div className="space-y-1.5">
                {proc.advantages.map((a, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3 h-3 mt-0.5 shrink-0 text-emerald-500" />
                    <span className="text-xs text-emerald-800/70">{a}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-red-50/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-red-700 mb-3">Riscos</h3>
              <div className="space-y-1.5">
                {proc.risks.map((r, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0 text-red-400" />
                    <span className="text-xs text-red-800/70">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recovery */}
          <div>
            <h3 className="text-sm font-semibold text-[#0A2540] mb-3">Recuperação</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Trabalho", value: proc.recovery.work },
                { label: "Exercícios", value: proc.recovery.exercise },
                { label: "Atividade sexual", value: proc.recovery.sex },
                { label: "Cuidados especiais", value: proc.recovery.special },
              ].map((r, i) => (
                <div key={i} className="bg-[#F8FAFB] rounded-lg p-3">
                  <h4 className="text-[10px] uppercase tracking-wider font-semibold text-[#0A2540]/40 mb-1">{r.label}</h4>
                  <p className="text-xs text-[#0A2540]/60 leading-relaxed">{r.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Expected vs Warning symptoms */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-emerald-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                <Check className="w-4 h-4" /> Sintomas Esperados (Normais)
              </h3>
              <div className="space-y-1.5">
                {proc.expectedSymptoms.map((s, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3 h-3 mt-0.5 shrink-0 text-emerald-500" />
                    <span className="text-xs text-emerald-800/70">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-red-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Sinais de Alerta — Procure o Médico
              </h3>
              <div className="space-y-1.5">
                {proc.warningSymptoms.map((s, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0 text-red-500" />
                    <span className="text-xs text-red-800/70">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default function ProcedimentosAndrologicos() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <EducationalLayout
      title="Procedimentos Urológicos"
      subtitle="Postectomia, Vasectomia, Varicocele e HPV"
      description="Conheça os procedimentos urológicos mais frequentes: o que são, como são realizados, a recuperação esperada e os sinais de alerta."
      accentColor="#2563EB"
    >
      {/* Quick nav */}
      <section className="py-8 border-b border-[#0A2540]/6">
        <div className="container max-w-4xl">
          <div className="flex flex-wrap justify-center gap-3">
            {procedures.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium bg-${p.color}-50 text-${p.color}-700 hover:bg-${p.color}-100 transition-colors`}
              >
                {p.name.split(" (")[0].split(" —")[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Procedures */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-4xl space-y-12">
          {procedures.map((proc, i) => (
            <ProcedureSection key={proc.id} proc={proc} index={i} />
          ))}
        </div>
      </section>

      {/* HPV Vaccination highlight */}
      <section className="py-12 lg:py-16 bg-[#F8FAFB]">
        <div className="container max-w-3xl">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 lg:p-8">
            <h3 className="text-lg font-semibold text-[#0A2540] mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-600" />
              Vacinação contra HPV — A Melhor Prevenção
            </h3>
            <div className="space-y-3 text-sm text-[#0A2540]/60 leading-relaxed">
              <p>
                A <strong>vacina nonavalente (Gardasil 9)</strong> protege contra 9 subtipos do HPV (6, 11, 16, 18, 31, 33, 45, 52, 58), prevenindo até <strong>90% das verrugas genitais</strong> e <strong>90% dos cânceres associados ao HPV</strong>.
              </p>
              <p>
                <strong>Quem deve se vacinar:</strong> Meninos e meninas a partir de 9 anos (ideal: antes do início da vida sexual). O SUS oferece gratuitamente para meninos de 11-14 anos. Adultos até 45 anos podem se vacinar na rede privada. Mesmo quem já teve HPV se beneficia da vacinação (proteção contra subtipos ainda não adquiridos).
              </p>
              <p>
                <strong>Esquema:</strong> 2 doses (9-14 anos) ou 3 doses (≥15 anos ou imunossuprimidos).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-8 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h3 className="text-xs font-semibold text-[#0A2540]/40 uppercase tracking-wider mb-3">Referências</h3>
          <ol className="text-[10px] text-[#0A2540]/35 space-y-1 list-decimal list-inside">
            <li>EAU Guidelines on Sexual and Reproductive Health. European Association of Urology, 2025.</li>
            <li>AUA Guideline: Vasectomy. American Urological Association, 2024.</li>
            <li>Partin AW, et al. Campbell-Walsh-Wein Urology, 13th Edition. Elsevier, 2024.</li>
            <li>Shridharani A, et al. Varicocelectomy: Microsurgical approach. Urol Clin North Am. 2014;41(1):129-44.</li>
            <li>Giuliano AR, et al. Efficacy of quadrivalent HPV vaccine against HPV infection and disease in males. N Engl J Med. 2011;364(5):401-11.</li>
            <li>Morris BJ, et al. A 'snip' in time: what is the best age to circumcise? BMC Pediatr. 2012;12:20.</li>
            <li>Eisenberg ML, et al. The relationship between male BMI and waist circumference on semen quality. Hum Reprod. 2014;29(2):193-200.</li>
            <li>Lei 14.443/2022 — Altera a Lei do Planejamento Familiar (vasectomia e laqueadura). Brasil, 2022.</li>
          </ol>
        </div>
      </section>
    </EducationalLayout>
  );
}
