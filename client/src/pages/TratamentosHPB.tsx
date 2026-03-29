/*
 * Design: Clinical Precision — Swiss Medical Design
 * Page: Tratamentos para HPB — comparação completa de técnicas
 * Referências: EAU Guidelines 2025, AUA Guidelines 2025, Campbell-Walsh-Wein 12th Ed.
 */
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import EducationalLayout from "@/components/EducationalLayout";
import {
  Pill, Zap, Flame, Droplets, Target, Wrench, Sparkles,
  Check, X, AlertTriangle, ChevronDown, ChevronUp,
  Clock, Ruler, ShieldCheck, Heart
} from "lucide-react";

interface Treatment {
  id: string;
  name: string;
  fullName: string;
  type: "medicamento" | "cirurgico-tradicional" | "cirurgico-laser" | "mist" | "aberta";
  icon: React.ReactNode;
  description: string;
  howItWorks: string;
  prostateSize: string;
  anesthesia: string;
  recovery: string;
  hospitalization: string;
  advantages: string[];
  disadvantages: string[];
  preservesEjaculation: boolean | "parcial";
  evidenceLevel: string;
}

const treatments: Treatment[] = [
  /* ── MEDICAMENTOSO ── */
  {
    id: "medicamentoso",
    name: "Tratamento Medicamentoso",
    fullName: "Alfa-bloqueadores, Inibidores da 5-alfa-redutase, Terapia Combinada e Inibidores de PDE5",
    type: "medicamento",
    icon: <Pill className="w-6 h-6" />,
    description:
      "Primeira linha de tratamento para sintomas leves a moderados de HPB. Inclui alfa-bloqueadores (tansulosina, doxazosina), que relaxam a musculatura do colo vesical; inibidores da 5-alfa-redutase (finasterida, dutasterida), que reduzem o volume prostático; terapia combinada; e tadalafila (inibidor de PDE5), aprovada para LUTS/HPB.",
    howItWorks:
      "Os alfa-bloqueadores atuam relaxando a musculatura lisa da próstata e do colo vesical, melhorando o fluxo urinário em dias a semanas. Os inibidores da 5-alfa-redutase bloqueiam a conversão de testosterona em DHT, reduzindo o volume prostático em 20-30% ao longo de 6-12 meses. A tadalafila 5mg diária atua relaxando a musculatura lisa do trato urinário inferior e melhorando o fluxo sanguíneo pélvico.",
    prostateSize: "Qualquer tamanho",
    anesthesia: "Não se aplica",
    recovery: "Sem necessidade de recuperação",
    hospitalization: "Não se aplica",
    advantages: [
      "Não invasivo — sem cirurgia ou anestesia",
      "Início rápido dos alfa-bloqueadores (dias)",
      "Pode ser combinado para maior eficácia",
      "Reduz risco de retenção urinária aguda (inibidores 5-ARI)",
      "Tadalafila: melhora simultânea de LUTS e disfunção erétil",
    ],
    disadvantages: [
      "Alfa-bloqueadores: tontura, hipotensão, ejaculação retrógrada (tansulosina)",
      "Inibidores 5-ARI: diminuição da libido, disfunção erétil, ginecomastia",
      "Necessidade de uso contínuo e indefinido",
      "Eficácia limitada em próstatas muito grandes ou sintomas graves",
      "Não trata a obstrução mecânica — apenas alivia sintomas",
    ],
    preservesEjaculation: "parcial",
    evidenceLevel: "Recomendação forte — EAU/AUA 2025",
  },
  /* ── CIRÚRGICO TRADICIONAL: RTU MONOPOLAR ── */
  {
    id: "turp-monopolar",
    name: "RTU Monopolar (TURP)",
    fullName: "Ressecção Transuretral da Próstata — Monopolar",
    type: "cirurgico-tradicional",
    icon: <Zap className="w-6 h-6" />,
    description:
      "Técnica clássica e padrão-ouro histórico do tratamento cirúrgico da HPB. Utiliza uma alça elétrica monopolar para ressecar o tecido prostático. Possui o maior tempo de seguimento e dados de longo prazo, mas vem sendo progressivamente substituída por técnicas mais modernas como a RTU bipolar e a enucleação a laser.",
    howItWorks:
      "Um ressectoscópio é introduzido pela uretra. Uma alça elétrica monopolar corta fatias do adenoma prostático utilizando corrente elétrica que retorna por uma placa dispersiva na coxa do paciente. Necessita de solução de irrigação não condutora (glicina ou manitol), o que limita o tempo cirúrgico pelo risco de síndrome pós-TURP (hiponatremia dilucional).",
    prostateSize: "30 a 80 ml",
    anesthesia: "Raquianestesia ou geral",
    recovery: "2 a 4 semanas",
    hospitalization: "1 a 3 dias",
    advantages: [
      "Padrão-ouro histórico com décadas de evidência",
      "Melhora significativa e rápida do fluxo urinário",
      "Tecido disponível para análise anatomopatológica",
      "Amplamente disponível em hospitais",
    ],
    disadvantages: [
      "Risco de síndrome pós-TURP (hiponatremia) — exclusivo da monopolar",
      "Tempo cirúrgico limitado a ~60 minutos pela absorção de irrigação",
      "Ejaculação retrógrada em 65-75% dos casos",
      "Risco de sangramento (transfusão: 2-5%)",
      "Limitada a próstatas de até 80 ml",
      "Taxa de retratamento de 5-10% em 10 anos",
    ],
    preservesEjaculation: false,
    evidenceLevel: "Recomendação forte — EAU/AUA 2025",
  },
  /* ── CIRÚRGICO TRADICIONAL: RTU BIPOLAR ── */
  {
    id: "turp-bipolar",
    name: "RTU Bipolar (Bipolar TURP)",
    fullName: "Ressecção Transuretral da Próstata — Bipolar (em soro fisiológico)",
    type: "cirurgico-tradicional",
    icon: <Zap className="w-6 h-6" />,
    description:
      "Evolução da RTU monopolar que utiliza energia bipolar com irrigação em soro fisiológico (NaCl 0,9%). Elimina o risco de síndrome pós-TURP e permite tempos cirúrgicos mais longos, possibilitando o tratamento de próstatas maiores. Considerada a versão moderna e mais segura da RTU clássica.",
    howItWorks:
      "O princípio é semelhante à RTU monopolar, mas a corrente elétrica flui entre dois polos na própria alça do ressectoscópio (bipolar), sem necessidade de placa dispersiva. Isso permite o uso de soro fisiológico como irrigação, eliminando o risco de hiponatremia dilucional e permitindo ressecções mais prolongadas.",
    prostateSize: "30 a 100 ml",
    anesthesia: "Raquianestesia ou geral",
    recovery: "2 a 4 semanas",
    hospitalization: "1 a 2 dias",
    advantages: [
      "Elimina o risco de síndrome pós-TURP (usa soro fisiológico)",
      "Permite tempos cirúrgicos mais longos — próstatas maiores",
      "Menor sangramento que a monopolar",
      "Tecido disponível para análise anatomopatológica",
      "Eficácia equivalente à monopolar",
      "Segurança superior comprovada em metanálises",
    ],
    disadvantages: [
      "Ejaculação retrógrada em 65-75% dos casos",
      "Ainda limitada a próstatas de até ~100 ml (vs. enucleação sem limite)",
      "Taxa de retratamento semelhante à monopolar (5-10% em 10 anos)",
      "Curva de aprendizado semelhante à monopolar",
    ],
    preservesEjaculation: false,
    evidenceLevel: "Recomendação forte — EAU 2025 (preferida sobre monopolar)",
  },
  /* ── LASER: HoLEP ── */
  {
    id: "holep",
    name: "HoLEP",
    fullName: "Enucleação Prostática com Laser Holmium",
    type: "cirurgico-laser",
    icon: <Flame className="w-6 h-6" />,
    description:
      "Considerada o padrão-ouro moderno pela EAU 2025 para o tratamento cirúrgico da HPB. É o único tratamento cirúrgico independente do tamanho da próstata. O laser holmium enuclea (descasca) todo o adenoma prostático da cápsula cirúrgica, simulando a cirurgia aberta por via endoscópica. Resultados duráveis com menor sangramento e menor taxa de retratamento.",
    howItWorks:
      "O laser holmium (comprimento de onda 2.140nm) é utilizado para separar o adenoma prostático da cápsula cirúrgica por enucleação — o tecido é 'descascado' em lobos inteiros e empurrado para dentro da bexiga. Em seguida, um morcelador fragmenta o tecido dentro da bexiga para remoção por aspiração. Todo o tecido é recuperado para análise anatomopatológica.",
    prostateSize: "Qualquer tamanho (único sem limite — EAU 2025)",
    anesthesia: "Raquianestesia ou geral",
    recovery: "1 a 3 semanas",
    hospitalization: "1 a 2 dias (cateter geralmente 24h)",
    advantages: [
      "Único tratamento independente do tamanho prostático (EAU 2025)",
      "Padrão-ouro moderno — enucleação completa do adenoma",
      "Menor sangramento — seguro em pacientes anticoagulados",
      "Menor tempo de cateter (geralmente 24 horas)",
      "Menor taxa de retratamento (<2% em 10 anos)",
      "Todo tecido disponível para biópsia",
      "Resultados duráveis equivalentes à cirurgia aberta",
    ],
    disadvantages: [
      "Curva de aprendizado significativa (30-50 casos)",
      "Ejaculação retrógrada em 75-90% dos casos",
      "Equipamento especializado (laser + morcelador)",
      "Disponibilidade ainda limitada em alguns centros no Brasil",
    ],
    preservesEjaculation: false,
    evidenceLevel: "Recomendação forte — EAU 2025 (padrão-ouro moderno)",
  },
  /* ── LASER: ThuLEP ── */
  {
    id: "thulep",
    name: "ThuLEP",
    fullName: "Enucleação Prostática com Laser Thulium",
    type: "cirurgico-laser",
    icon: <Flame className="w-6 h-6" />,
    description:
      "Técnica de enucleação prostática que utiliza o laser thulium em vez do holmium. O princípio cirúrgico é o mesmo do HoLEP — enucleação completa do adenoma — mas o laser thulium opera em modo contínuo (vs. pulsado do holmium), proporcionando um corte mais suave e hemostasia ligeiramente diferente. Resultados funcionais equivalentes ao HoLEP.",
    howItWorks:
      "O laser thulium (comprimento de onda 2.013nm) opera em modo contínuo, diferente do holmium que é pulsado. Isso proporciona um corte tecidual mais homogêneo e uma superfície de coagulação mais uniforme. A técnica cirúrgica de enucleação é idêntica ao HoLEP: separação do adenoma da cápsula, morcelação e remoção do tecido.",
    prostateSize: "Qualquer tamanho (sem limite)",
    anesthesia: "Raquianestesia ou geral",
    recovery: "1 a 3 semanas",
    hospitalization: "1 a 2 dias",
    advantages: [
      "Independente do tamanho prostático — como o HoLEP",
      "Laser contínuo: corte mais suave e hemostasia uniforme",
      "Resultados funcionais equivalentes ao HoLEP (metanálises)",
      "Menor sangramento que RTU",
      "Todo tecido disponível para biópsia",
      "Menor taxa de retratamento",
    ],
    disadvantages: [
      "Curva de aprendizado semelhante ao HoLEP",
      "Ejaculação retrógrada em 70-85% dos casos",
      "Disponibilidade limitada — menos centros que o HoLEP",
      "Dados de longo prazo (>10 anos) ainda menores que HoLEP",
    ],
    preservesEjaculation: false,
    evidenceLevel: "Recomendação forte — EAU 2025 (equivalente ao HoLEP)",
  },
  /* ── LASER: Green Light ── */
  {
    id: "greenlight",
    name: "Green Light (PVP)",
    fullName: "Vaporização Fotosseletiva da Próstata com Laser 532nm",
    type: "cirurgico-laser",
    icon: <Sparkles className="w-6 h-6" />,
    description:
      "Utiliza laser de luz verde (532nm, 180W — XPS) para vaporizar o tecido prostático. Especialmente indicada para pacientes em uso de anticoagulantes ou antiagregantes, pois apresenta excelente hemostasia. O tecido é vaporizado, não havendo material para análise anatomopatológica.",
    howItWorks:
      "O laser de luz verde (GreenLight XPS 180W) emite energia que é seletivamente absorvida pela hemoglobina no tecido prostático. Isso vaporiza o tecido e simultaneamente sela os vasos sanguíneos, criando um canal uretral amplo com hemostasia imediata. A fibra óptica é movimentada em varredura sobre o tecido.",
    prostateSize: "30 a 80 ml (até 100ml com técnica de enucleação — GreenLEP)",
    anesthesia: "Raquianestesia ou geral",
    recovery: "1 a 2 semanas",
    hospitalization: "0 a 1 dia (frequentemente ambulatorial)",
    advantages: [
      "Excelente hemostasia — ideal para anticoagulados",
      "Frequentemente ambulatorial (alta no mesmo dia)",
      "Cateter por curto período (geralmente 24h ou menos)",
      "Seguro em pacientes de alto risco cardiovascular",
    ],
    disadvantages: [
      "Sem tecido para análise anatomopatológica (vaporização pura)",
      "Ejaculação retrógrada em 40-60% dos casos",
      "Disúria prolongada possível (irritação térmica)",
      "Taxa de retratamento superior à enucleação (10-15% em 5 anos)",
      "Limitada a próstatas moderadas na técnica de vaporização pura",
    ],
    preservesEjaculation: false,
    evidenceLevel: "Recomendação condicional — EAU/AUA 2025",
  },
  /* ── MIST: Aquablation ── */
  {
    id: "aquablation",
    name: "Aquablation",
    fullName: "Ablação Prostática por Jato d'Água Guiada por Robótica (AquaBeam)",
    type: "mist",
    icon: <Droplets className="w-6 h-6" />,
    description:
      "Técnica guiada por ultrassom transretal em tempo real e executada por braço robótico. Utiliza jato d'água de alta pressão para remover o tecido prostático com precisão milimétrica. Destaca-se pela padronização do procedimento (independe da habilidade manual na fase de ablação) e pela possibilidade de preservação da ejaculação.",
    howItWorks:
      "O ultrassom transretal mapeia a anatomia prostática em 3D. O cirurgião define a área de ressecção em um software, delimitando as zonas a serem tratadas e as que devem ser preservadas. O braço robótico executa a ablação com jato d'água pressurizado (salina). Após a ablação, é realizada hemostasia com balão de tração ou eletrocautério.",
    prostateSize: "30 a 150 ml",
    anesthesia: "Geral",
    recovery: "2 a 4 semanas",
    hospitalization: "1 a 2 dias",
    advantages: [
      "Guiada por ultrassom e robótica — alta precisão e reprodutibilidade",
      "Ampla faixa de tamanho prostático (30-150ml)",
      "Possibilidade de preservação da ejaculação (taxas superiores à RTU)",
      "Tempo de ablação curto (minutos)",
      "Padronização: resultado menos dependente da experiência do cirurgião",
    ],
    disadvantages: [
      "Equipamento de alto custo e disponibilidade muito limitada no Brasil",
      "Necessidade de hemostasia adicional após ablação",
      "Dados de longo prazo ainda em acúmulo (>5 anos)",
      "Anestesia geral obrigatória",
      "Sem tecido para análise anatomopatológica",
    ],
    preservesEjaculation: "parcial",
    evidenceLevel: "Recomendação condicional — EAU/AUA 2025",
  },
  /* ── MIST: Rezum ── */
  {
    id: "rezum",
    name: "Rezum",
    fullName: "Terapia com Vapor d'Água Convectivo (Water Vapor Thermal Therapy)",
    type: "mist",
    icon: <Flame className="w-6 h-6" />,
    description:
      "Procedimento minimamente invasivo ambulatorial que utiliza vapor d'água (steam) para causar necrose do tecido prostático. É classificado como MIST (Minimally Invasive Surgical Therapy) e representa uma opção para pacientes que priorizam a preservação da função sexual e desejam evitar cirurgias mais invasivas, aceitando uma eficácia desobstrutiva menor.",
    howItWorks:
      "Através de um cistoscópio rígido, uma agulha retrátil é inserida no tecido prostático adenomatoso e libera vapor d'água a 103°C por 9 segundos em cada aplicação. A energia térmica convectiva se distribui pelos espaços intercelulares, causando necrose coagulativa imediata. O tecido necrótico é gradualmente reabsorvido pelo organismo ao longo de semanas a meses, reduzindo o volume prostático.",
    prostateSize: "30 a 80 ml (incluindo lobo mediano)",
    anesthesia: "Local + sedação ou bloqueio prostático",
    recovery: "1 a 2 semanas (melhora completa: 3-6 meses)",
    hospitalization: "Ambulatorial (alta no mesmo dia)",
    advantages: [
      "Procedimento ambulatorial — sem internação",
      "Preserva a função sexual: ejaculação anterógrada e ereção mantidas",
      "Anestesia local ou sedação leve — sem raquianestesia",
      "Procedimento rápido (5-10 minutos)",
      "Trata lobo mediano (diferente do UroLift)",
      "Pode ser repetido se necessário",
    ],
    disadvantages: [
      "Melhora gradual — efeito completo em 3-6 meses",
      "Necessidade de cateter vesical por 3-7 dias após o procedimento",
      "Eficácia desobstrutiva inferior à RTU, HoLEP e ThuLEP",
      "Taxa de retratamento: ~13% em 5 anos (WATER II trial)",
      "Sintomas irritativos transitórios significativos nas primeiras semanas",
    ],
    preservesEjaculation: true,
    evidenceLevel: "Recomendação condicional — AUA 2025 | Mencionado EAU 2025",
  },
  /* ── MIST: UroLift ── */
  {
    id: "urolift",
    name: "UroLift (PUL)",
    fullName: "Prostatic Urethral Lift — Implantes de Afastamento Prostático",
    type: "mist",
    icon: <Target className="w-6 h-6" />,
    description:
      "Procedimento mecânico que utiliza implantes permanentes de nitinol e sutura para afastar os lobos prostáticos laterais, abrindo o canal uretral sem remover, cortar ou destruir tecido. É a opção com menor impacto na função sexual, mas com eficácia desobstrutiva mais limitada e menor durabilidade.",
    howItWorks:
      "Através de um cistoscópio, pequenos implantes (âncoras de nitinol conectadas por sutura de poliéster) são posicionados para comprimir os lobos prostáticos laterais, afastando-os da uretra. Cada implante ancora de um lado na cápsula prostática e do outro no lúmen uretral, criando um canal aberto mecanicamente.",
    prostateSize: "30 a 80 ml (contraindicado se lobo mediano proeminente)",
    anesthesia: "Local + sedação",
    recovery: "Dias",
    hospitalization: "Ambulatorial",
    advantages: [
      "Preserva totalmente a função sexual (ejaculação e ereção)",
      "Procedimento ambulatorial rápido (~30 minutos)",
      "Geralmente sem necessidade de cateter",
      "Recuperação muito rápida — retorno às atividades em dias",
      "Sem destruição de tecido — reversível em teoria",
    ],
    disadvantages: [
      "Contraindicado se houver lobo mediano proeminente",
      "Eficácia desobstrutiva inferior a todas as outras técnicas cirúrgicas",
      "Taxa de retratamento elevada: ~27% em 5 anos (L.I.F.T. study)",
      "Implantes permanentes no tecido prostático",
      "Limitado a próstatas de até 80 ml",
      "Melhora do IPSS inferior à RTU e enucleação",
    ],
    preservesEjaculation: true,
    evidenceLevel: "Recomendação condicional — AUA 2025",
  },
  /* ── ABERTA/ROBÓTICA ── */
  {
    id: "aberta",
    name: "Prostatectomia Aberta / Robótica",
    fullName: "Adenomectomia Prostática — Aberta (Millin/Freyer) ou Robótica",
    type: "aberta",
    icon: <Wrench className="w-6 h-6" />,
    description:
      "Reservada para próstatas muito grandes (>80-100ml) quando a enucleação a laser (HoLEP/ThuLEP) não está disponível. A adenomectomia remove o adenoma prostático através de incisão abdominal (suprapúbica — Freyer, ou retropúbica — Millin). A versão robótica (adenomectomia robótica) oferece os mesmos resultados com menor morbidade perioperatória.",
    howItWorks:
      "Na técnica aberta, uma incisão abdominal infraumbilical permite acesso à próstata. O adenoma é enucleado digitalmente (com o dedo) da cápsula cirúrgica. Na versão robótica, o mesmo princípio é realizado por via minimamente invasiva com braços robóticos, visão 3D ampliada e sutura precisa da loja prostática.",
    prostateSize: ">80-100 ml (quando enucleação a laser indisponível)",
    anesthesia: "Geral ou raquianestesia",
    recovery: "4 a 6 semanas",
    hospitalization: "3 a 5 dias (aberta) / 1-3 dias (robótica)",
    advantages: [
      "Eficaz para próstatas muito grandes",
      "Resultados duráveis — baixa taxa de retratamento",
      "Todo tecido disponível para biópsia",
      "Versão robótica: menor sangramento e recuperação mais rápida",
      "Técnica bem estabelecida com longo seguimento",
    ],
    disadvantages: [
      "Mais invasiva — incisão abdominal (aberta)",
      "Maior sangramento e risco de transfusão (aberta)",
      "Internação mais prolongada",
      "Ejaculação retrógrada em praticamente todos os casos",
      "Recuperação mais longa que técnicas endoscópicas",
      "Robótica: custo elevado e disponibilidade limitada",
    ],
    preservesEjaculation: false,
    evidenceLevel: "Recomendação condicional — EAU/AUA 2025 (quando laser indisponível)",
  },
];

const typeConfig: Record<string, { bg: string; text: string; label: string }> = {
  medicamento: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Medicamentoso" },
  "cirurgico-tradicional": { bg: "bg-blue-50", text: "text-blue-700", label: "Ressecção (RTU)" },
  "cirurgico-laser": { bg: "bg-violet-50", text: "text-violet-700", label: "Enucleação / Laser" },
  mist: { bg: "bg-amber-50", text: "text-amber-700", label: "MIST" },
  aberta: { bg: "bg-slate-50", text: "text-slate-700", label: "Aberta / Robótica" },
};

function TreatmentCard({ treatment, index }: { treatment: Treatment; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const typeStyle = typeConfig[treatment.type];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="bg-white rounded-xl border border-[#0A2540]/6 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="p-6 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#0A2540]/5 flex items-center justify-center text-[#0A2540]/70 shrink-0">
              {treatment.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-lg font-semibold text-[#0A2540]">{treatment.name}</h3>
                <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${typeStyle.bg} ${typeStyle.text}`}>
                  {typeStyle.label}
                </span>
              </div>
              <p className="text-xs text-[#0A2540]/40 mb-2">{treatment.fullName}</p>
              <p className="text-sm text-[#0A2540]/60 leading-relaxed">{treatment.description}</p>
            </div>
          </div>
          <button className="shrink-0 mt-1 text-[#0A2540]/30">
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="flex items-center gap-2 text-xs text-[#0A2540]/50">
            <Ruler className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>{treatment.prostateSize}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#0A2540]/50">
            <Clock className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>{treatment.recovery}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#0A2540]/50">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>{treatment.hospitalization}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Heart className="w-3.5 h-3.5 text-[#0D9488]" />
            <span className={
              treatment.preservesEjaculation === true
                ? "text-emerald-600 font-medium"
                : treatment.preservesEjaculation === "parcial"
                ? "text-amber-600 font-medium"
                : "text-red-500 font-medium"
            }>
              {treatment.preservesEjaculation === true
                ? "Preserva ejaculação"
                : treatment.preservesEjaculation === "parcial"
                ? "Preservação parcial"
                : "Ejaculação retrógrada"}
            </span>
          </div>
        </div>
      </div>
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="border-t border-[#0A2540]/6"
        >
          <div className="p-6 space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-[#0A2540] mb-2">Como funciona</h4>
              <p className="text-sm text-[#0A2540]/60 leading-relaxed">{treatment.howItWorks}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-emerald-50/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Vantagens
                </h4>
                <ul className="space-y-2">
                  {treatment.advantages.map((adv, i) => (
                    <li key={i} className="text-xs text-emerald-800/70 flex items-start gap-2">
                      <Check className="w-3 h-3 mt-0.5 shrink-0 text-emerald-500" />
                      {adv}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Desvantagens
                </h4>
                <ul className="space-y-2">
                  {treatment.disadvantages.map((dis, i) => (
                    <li key={i} className="text-xs text-red-800/70 flex items-start gap-2">
                      <X className="w-3 h-3 mt-0.5 shrink-0 text-red-400" />
                      {dis}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-[#0A2540]/3 rounded-lg p-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
              <span className="text-xs text-[#0A2540]/60">{treatment.evidenceLevel}</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function TratamentosHPB() {
  const [filter, setFilter] = useState<string>("todos");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = filter === "todos" ? treatments : treatments.filter((t) => t.type === filter);

  const filters = [
    { key: "todos", label: "Todos" },
    { key: "medicamento", label: "Medicamentoso" },
    { key: "cirurgico-tradicional", label: "RTU (Ressecção)" },
    { key: "cirurgico-laser", label: "Laser (Enucleação)" },
    { key: "mist", label: "MISTs" },
    { key: "aberta", label: "Aberta/Robótica" },
  ];

  return (
    <EducationalLayout
      title="Tratamentos para HPB"
      subtitle="Hiperplasia Prostática Benigna"
      description="Conheça todas as opções de tratamento para o aumento benigno da próstata — desde medicamentos até as técnicas cirúrgicas mais modernas — com base nas diretrizes da EAU e AUA 2025."
      accentColor="#0D9488"
    >
      {/* Intro */}
      <section className="py-12 lg:py-16 border-b border-[#0A2540]/6">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none prose-headings:text-[#0A2540] prose-p:text-[#0A2540]/65 prose-p:leading-relaxed prose-strong:text-[#0A2540]/80">
            <p>
              A <strong>Hiperplasia Prostática Benigna (HPB)</strong> é o aumento não canceroso da próstata que afeta mais de 50% dos homens acima de 60 anos e até 90% dos homens acima de 85 anos. À medida que a próstata cresce, pode comprimir a uretra e dificultar a passagem da urina, causando sintomas como jato fraco, necessidade de urinar com frequência (especialmente à noite), urgência e sensação de esvaziamento incompleto.
            </p>
            <p>
              O tratamento é escalonado: inicia-se com <strong>medidas comportamentais e medicamentos</strong>, progredindo para <strong>procedimentos minimamente invasivos (MISTs)</strong> ou <strong>cirurgias</strong> quando o tratamento clínico falha ou há complicações. A escolha depende da intensidade dos sintomas, do tamanho da próstata, das complicações associadas e das prioridades do paciente — especialmente em relação à <strong>preservação da função sexual</strong>.
            </p>
            <p>
              Abaixo, apresentamos <strong>todas as opções disponíveis</strong>, organizadas por categoria, com base nas diretrizes mais atualizadas da <strong>European Association of Urology (EAU 2025)</strong>, <strong>American Urological Association (AUA 2025)</strong> e do <strong>Campbell-Walsh-Wein Urology (12ª edição)</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 bg-[#F8FAFB] border-b border-[#0A2540]/6 sticky top-[68px] z-30">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                  filter === f.key
                    ? "bg-[#0A2540] text-white"
                    : "bg-white border border-[#0A2540]/8 text-[#0A2540]/60 hover:border-[#0A2540]/20"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-4xl space-y-4">
          {filtered.map((t, i) => (
            <TreatmentCard key={t.id} treatment={t} index={i} />
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-12 lg:py-16 bg-[#F8FAFB]">
        <div className="container">
          <h2 className="text-2xl lg:text-3xl text-[#0A2540] mb-8 text-center font-serif">
            Tabela Comparativa
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-[#0A2540] text-white">
                  <th className="p-3 text-left font-semibold">Técnica</th>
                  <th className="p-3 text-center font-semibold">Categoria</th>
                  <th className="p-3 text-center font-semibold">Próstata</th>
                  <th className="p-3 text-center font-semibold">Internação</th>
                  <th className="p-3 text-center font-semibold">Ejaculação</th>
                  <th className="p-3 text-center font-semibold">Retratamento</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["RTU Monopolar", "Ressecção", "30-80ml", "1-3 dias", "Retrógrada (65-75%)", "5-10% (10a)"],
                  ["RTU Bipolar", "Ressecção", "30-100ml", "1-2 dias", "Retrógrada (65-75%)", "5-10% (10a)"],
                  ["HoLEP", "Enucleação Laser", "Qualquer", "1-2 dias", "Retrógrada (75-90%)", "<2% (10a)"],
                  ["ThuLEP", "Enucleação Laser", "Qualquer", "1-2 dias", "Retrógrada (70-85%)", "<3% (5a)"],
                  ["Green Light", "Vaporização Laser", "30-80ml", "0-1 dia", "Retrógrada (40-60%)", "10-15% (5a)"],
                  ["Aquablation", "MIST / Robótica", "30-150ml", "1-2 dias", "Preservada (parcial)", "5-8% (5a)"],
                  ["Rezum", "MIST", "30-80ml", "Ambulatorial", "Preservada", "~13% (5a)"],
                  ["UroLift", "MIST", "30-80ml*", "Ambulatorial", "Preservada", "~27% (5a)"],
                  ["Aberta/Robótica", "Adenomectomia", ">80-100ml", "3-5 / 1-3 dias", "Retrógrada", "<5% (10a)"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F8FAFB]"}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`p-3 ${j === 0 ? "text-left font-semibold text-[#0A2540]" : "text-center text-[#0A2540]/60"} border-t border-[#0A2540]/5`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-[10px] text-[#0A2540]/40 space-y-1">
            <p>* UroLift: contraindicado se houver lobo mediano proeminente.</p>
          </div>
        </div>
      </section>

      {/* Key message */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          <div className="bg-[#0D9488]/5 border border-[#0D9488]/15 rounded-xl p-6 lg:p-8">
            <h3 className="text-lg font-semibold text-[#0A2540] mb-3">Qual o melhor tratamento para mim?</h3>
            <p className="text-sm text-[#0A2540]/60 leading-relaxed">
              A escolha do tratamento ideal depende de uma avaliação individualizada que considera o tamanho da próstata, a intensidade dos sintomas (IPSS), a presença de complicações (retenção urinária, infecções de repetição, cálculos vesicais), suas prioridades em relação à função sexual e sua saúde geral. Não existe uma técnica universalmente superior — existe a técnica certa para cada paciente. Agende uma consulta para que possamos avaliar seu caso e definir juntos a melhor estratégia.
            </p>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-8 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h3 className="text-xs font-semibold text-[#0A2540]/40 uppercase tracking-wider mb-3">Referências</h3>
          <ol className="text-[10px] text-[#0A2540]/35 space-y-1 list-decimal list-inside">
            <li>Gravas S, et al. EAU Guidelines on Management of Non-Neurogenic Male LUTS. European Association of Urology, 2025.</li>
            <li>Lerner LB, et al. AUA Guideline: Surgical Management of LUTS Attributed to BPH. American Urological Association, 2025.</li>
            <li>Partin AW, et al. Campbell-Walsh-Wein Urology, 12th Edition. Elsevier, 2021. Chapters 144-149.</li>
            <li>Zhou Y, et al. Integrated management strategies for BPH. PMC, 2025.</li>
            <li>Hu X, et al. Clinical comparison of TURP, PVP and HoLEP. Nature Scientific Reports, 2025.</li>
            <li>Sathish V, et al. HoLEP, Rezum, and Aquablation — narrative review. PMC, 2025.</li>
            <li>McVary KT, et al. AUA BPH Clinical Guidelines: 2024 Update. J Urol, 2024.</li>
            <li>Enikeev D, et al. Thulium fiber laser enucleation vs HoLEP: systematic review. World J Urol, 2024.</li>
          </ol>
        </div>
      </section>
    </EducationalLayout>
  );
}
