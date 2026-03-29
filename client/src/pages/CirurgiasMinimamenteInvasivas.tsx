/*
 * Design: Clinical Precision — Swiss Medical Design
 * Page: Cirurgias Minimamente Invasivas em Urologia
 */
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import EducationalLayout from "@/components/EducationalLayout";
import {
  Microscope, MonitorSmartphone, Bot, Waves, Radio,
  Check, ChevronDown, ChevronUp, ArrowRight,
  Eye, Hand, Scissors, Timer, Shield, Activity
} from "lucide-react";

interface SurgeryCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  subtitle: string;
  overview: string;
  howItWorks: string;
  procedures: string[];
  advantages: string[];
  characteristics: { label: string; value: string; icon: React.ReactNode }[];
}

const categories: SurgeryCategory[] = [
  {
    id: "endourologia",
    name: "Endourologia",
    icon: <Microscope className="w-7 h-7" />,
    color: "#0D9488",
    bgColor: "bg-teal-50",
    subtitle: "Cirurgia através dos orifícios naturais",
    overview:
      "A endourologia é a subespecialidade que realiza procedimentos cirúrgicos através dos orifícios naturais do corpo (uretra), sem necessidade de incisões externas. Utiliza instrumentos finos e câmeras miniaturizadas que navegam pelo trato urinário, permitindo o tratamento de diversas condições diretamente no local da doença.",
    howItWorks:
      "O cirurgião introduz instrumentos endoscópicos (ureteroscópios, cistoscópios, nefroscópios) pela uretra, navegando até o local da doença — bexiga, ureter ou rim. Câmeras de alta definição transmitem imagens em tempo real, e instrumentos como laser, pinças e cestas permitem fragmentar cálculos, ressecar tumores ou tratar obstruções. Em procedimentos percutâneos, um pequeno orifício de 5-10mm é criado nas costas para acessar o rim diretamente.",
    procedures: [
      "Ureterorrenolitotripsia (URS) — tratamento de cálculos renais e ureterais com laser",
      "Ureterorrenolitotripsia flexível — acesso a cálculos em qualquer localização renal",
      "Nefrolitotomia percutânea (PCNL) — remoção de cálculos renais grandes (>2cm)",
      "Mini-PERC / Ultra-mini-PERC — versões miniaturizadas da percutânea",
      "RTU de próstata (TURP) — ressecção do adenoma prostático",
      "HoLEP — enucleação prostática com laser holmium",
      "RTU de bexiga — ressecção de tumores vesicais",
      "Ureterotomia interna — tratamento de estenoses ureterais",
      "Cistolitotripsia — fragmentação de cálculos vesicais",
    ],
    advantages: [
      "Sem incisões externas — acesso pelos orifícios naturais",
      "Recuperação rápida — retorno às atividades em dias",
      "Menor dor pós-operatória",
      "Internação curta (muitas vezes ambulatorial)",
      "Visualização direta da doença em alta definição",
      "Possibilidade de tratar e diagnosticar no mesmo procedimento",
    ],
    characteristics: [
      { label: "Incisão", value: "Nenhuma ou mínima (5-10mm)", icon: <Scissors className="w-4 h-4" /> },
      { label: "Visão", value: "Câmera HD endoscópica", icon: <Eye className="w-4 h-4" /> },
      { label: "Recuperação", value: "1-7 dias", icon: <Timer className="w-4 h-4" /> },
      { label: "Internação", value: "Ambulatorial a 1-2 dias", icon: <Shield className="w-4 h-4" /> },
    ],
  },
  {
    id: "leco",
    name: "LECO",
    icon: <Waves className="w-7 h-7" />,
    color: "#7C3AED",
    bgColor: "bg-violet-50",
    subtitle: "Litotripsia Extracorpórea por Ondas de Choque",
    overview:
      "A LECO é um tratamento não invasivo para cálculos renais e ureterais que utiliza ondas de choque geradas externamente ao corpo. As ondas são focalizadas no cálculo através da pele, fragmentando-o em pedaços menores que são eliminados naturalmente pela urina. É o único tratamento para cálculos renais que não requer qualquer tipo de instrumento dentro do corpo.",
    howItWorks:
      "O paciente é posicionado em uma maca especial com um gerador de ondas de choque. Através de ultrassom ou fluoroscopia, o cálculo é localizado e as ondas são focalizadas precisamente sobre ele. As ondas de choque atravessam a pele e os tecidos sem causar dano, mas ao se concentrarem no cálculo, geram energia suficiente para fragmentá-lo. Os fragmentos são eliminados pela urina nos dias e semanas seguintes.",
    procedures: [
      "Litotripsia de cálculos renais (até 2cm)",
      "Litotripsia de cálculos ureterais proximais",
    ],
    advantages: [
      "Totalmente não invasivo — sem incisões ou instrumentos internos",
      "Ambulatorial — sem necessidade de internação",
      "Geralmente sem anestesia geral (sedação leve)",
      "Recuperação imediata — retorno às atividades no mesmo dia",
      "Pode ser repetida se necessário",
    ],
    characteristics: [
      { label: "Incisão", value: "Nenhuma (não invasivo)", icon: <Scissors className="w-4 h-4" /> },
      { label: "Visão", value: "Ultrassom/Fluoroscopia", icon: <Eye className="w-4 h-4" /> },
      { label: "Recuperação", value: "Imediata", icon: <Timer className="w-4 h-4" /> },
      { label: "Internação", value: "Ambulatorial", icon: <Shield className="w-4 h-4" /> },
    ],
  },
  {
    id: "laparoscopia",
    name: "Videolaparoscopia",
    icon: <MonitorSmartphone className="w-7 h-7" />,
    color: "#2563EB",
    bgColor: "bg-blue-50",
    subtitle: "Cirurgia por vídeo com pequenas incisões",
    overview:
      "A videolaparoscopia revolucionou a cirurgia urológica ao permitir procedimentos complexos através de 3 a 5 pequenas incisões de 5-12mm. Uma câmera de alta definição e instrumentos longos e articulados são inseridos por esses portais, permitindo ao cirurgião operar visualizando um monitor. Comparada à cirurgia aberta, oferece menor dor, recuperação mais rápida e melhor resultado estético.",
    howItWorks:
      "O abdome é insuflado com gás carbônico (CO₂) para criar espaço de trabalho. Através de pequenas incisões (portais de 5-12mm), são inseridos uma câmera de alta definição e instrumentos cirúrgicos longos. O cirurgião opera visualizando as imagens ampliadas em um monitor, com movimentos precisos dos instrumentos. Ao final, as peças cirúrgicas são removidas por uma das incisões, que são fechadas com pontos.",
    procedures: [
      "Nefrectomia total — remoção completa do rim (tumores, rim não funcionante)",
      "Nefrectomia parcial — remoção apenas do tumor, preservando o rim",
      "Pieloplastia — correção de obstrução da junção ureteropélvica (JUP)",
      "Adrenalectomia — remoção da glândula adrenal",
      "Ureterolitotomia — remoção de cálculos ureterais impactados",
      "Nefroureterectomia — remoção de rim e ureter (tumores uroteliais)",
    ],
    advantages: [
      "Incisões pequenas (5-12mm) — melhor resultado estético",
      "Menor dor pós-operatória que cirurgia aberta",
      "Recuperação mais rápida — retorno às atividades em 2-3 semanas",
      "Menor perda sanguínea",
      "Internação mais curta (2-3 dias)",
      "Visão ampliada em alta definição",
    ],
    characteristics: [
      { label: "Incisão", value: "3-5 portais de 5-12mm", icon: <Scissors className="w-4 h-4" /> },
      { label: "Visão", value: "Câmera HD 2D (10x ampliação)", icon: <Eye className="w-4 h-4" /> },
      { label: "Recuperação", value: "2-3 semanas", icon: <Timer className="w-4 h-4" /> },
      { label: "Internação", value: "2-3 dias", icon: <Shield className="w-4 h-4" /> },
    ],
  },
  {
    id: "robotica",
    name: "Cirurgia Robótica",
    icon: <Bot className="w-7 h-7" />,
    color: "#0F172A",
    bgColor: "bg-slate-50",
    subtitle: "A evolução da laparoscopia com precisão robótica",
    overview:
      "A cirurgia robótica (plataforma Da Vinci) representa a forma mais avançada de cirurgia minimamente invasiva. O cirurgião opera sentado em um console, controlando braços robóticos com movimentos naturais das mãos. O sistema oferece visão 3D com ampliação de 10x, filtro de tremor e instrumentos com 7 graus de liberdade (mais que o punho humano), permitindo precisão superior em espaços confinados.",
    howItWorks:
      "O cirurgião senta-se em um console ergonômico e insere as mãos em controles que traduzem seus movimentos para os braços robóticos posicionados sobre o paciente. Uma câmera binocular fornece visão 3D estereoscópica com ampliação de 10-15x. Os instrumentos EndoWrist possuem 7 graus de liberdade, replicando os movimentos do punho humano em escala reduzida, com filtro de tremor fisiológico. O cirurgião mantém controle total — o robô não opera sozinho.",
    procedures: [
      "Prostatectomia radical — tratamento do câncer de próstata (procedimento mais realizado)",
      "Nefrectomia parcial — remoção de tumores renais preservando o rim",
      "Pieloplastia — reconstrução da junção ureteropélvica",
      "Cistectomia radical — remoção da bexiga (câncer de bexiga invasivo)",
      "Reimplante ureteral — correção de refluxo ou estenoses",
      "Adenomectomia prostática — para HPB em próstatas muito grandes",
      "Sacrocolpopexia — correção de prolapso de órgãos pélvicos",
    ],
    advantages: [
      "Visão 3D estereoscópica com ampliação de 10-15x",
      "7 graus de liberdade — mais que o punho humano",
      "Filtro de tremor fisiológico — movimentos ultraprecisos",
      "Melhor preservação dos nervos (função sexual e continência)",
      "Menor perda sanguínea que cirurgia aberta e laparoscópica",
      "Recuperação mais rápida — retorno às atividades em 2-3 semanas",
      "Menor dor pós-operatória",
      "Ergonomia superior para o cirurgião",
    ],
    characteristics: [
      { label: "Incisão", value: "4-6 portais de 8-12mm", icon: <Scissors className="w-4 h-4" /> },
      { label: "Visão", value: "3D estereoscópica (10-15x)", icon: <Eye className="w-4 h-4" /> },
      { label: "Recuperação", value: "2-3 semanas", icon: <Timer className="w-4 h-4" /> },
      { label: "Internação", value: "1-3 dias", icon: <Shield className="w-4 h-4" /> },
    ],
  },
];

function CategoryCard({ category, index }: { category: SurgeryCategory; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      id={category.id}
      className="scroll-mt-24"
    >
      <div className="bg-white rounded-xl border border-[#0A2540]/6 overflow-hidden hover:shadow-lg transition-shadow">
        {/* Top accent bar */}
        <div className="h-1" style={{ backgroundColor: category.color }} />

        {/* Header */}
        <div className="p-6 lg:p-8">
          <div className="flex items-start gap-5">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${category.color}10`, color: category.color }}
            >
              {category.icon}
            </div>
            <div className="flex-1">
              <h2 className="text-xl lg:text-2xl font-semibold text-[#0A2540] mb-1">
                {category.name}
              </h2>
              <p className="text-sm text-[#0A2540]/40 mb-3">{category.subtitle}</p>
              <p className="text-sm text-[#0A2540]/60 leading-relaxed">{category.overview}</p>
            </div>
          </div>

          {/* Characteristics grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            {category.characteristics.map((char, i) => (
              <div key={i} className={`${category.bgColor} rounded-lg p-3`}>
                <div className="flex items-center gap-2 mb-1" style={{ color: category.color }}>
                  {char.icon}
                  <span className="text-[10px] uppercase tracking-wider font-semibold">{char.label}</span>
                </div>
                <p className="text-xs text-[#0A2540]/70 font-medium">{char.value}</p>
              </div>
            ))}
          </div>

          {/* Expand button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-5 flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: category.color }}
          >
            {expanded ? "Ver menos" : "Ver detalhes e procedimentos"}
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded content */}
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="border-t border-[#0A2540]/6"
          >
            <div className="p-6 lg:p-8 space-y-6">
              {/* How it works */}
              <div>
                <h3 className="text-sm font-semibold text-[#0A2540] mb-2">Como funciona</h3>
                <p className="text-sm text-[#0A2540]/60 leading-relaxed">{category.howItWorks}</p>
              </div>

              {/* Procedures */}
              <div>
                <h3 className="text-sm font-semibold text-[#0A2540] mb-3">Procedimentos realizados</h3>
                <div className="space-y-2">
                  {category.procedures.map((proc, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: category.color }} />
                      <span className="text-sm text-[#0A2540]/60">{proc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advantages */}
              <div className={`${category.bgColor} rounded-lg p-5`}>
                <h3 className="text-sm font-semibold text-[#0A2540] mb-3">Vantagens</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {category.advantages.map((adv, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: category.color }} />
                      <span className="text-xs text-[#0A2540]/60">{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function CirurgiasMinimamenteInvasivas() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <EducationalLayout
      title="Cirurgias Minimamente Invasivas"
      subtitle="Endourologia, Laparoscopia e Robótica"
      description="Entenda as diferenças entre as técnicas cirúrgicas minimamente invasivas em urologia — como funcionam, quais procedimentos são realizados com cada uma e suas vantagens."
      accentColor="#2563EB"
    >
      {/* Intro */}
      <section className="py-12 lg:py-16 border-b border-[#0A2540]/6">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none prose-headings:text-[#0A2540] prose-p:text-[#0A2540]/65 prose-p:leading-relaxed prose-strong:text-[#0A2540]/80">
            <p>
              A <strong>cirurgia minimamente invasiva</strong> transformou a urologia nas últimas décadas. Em vez de grandes incisões, os cirurgiões agora utilizam câmeras, instrumentos miniaturizados e até braços robóticos para realizar procedimentos complexos com menor trauma ao paciente. O resultado: menos dor, recuperação mais rápida, menor tempo de internação e melhor resultado estético.
            </p>
            <p>
              Existem diferentes abordagens minimamente invasivas, cada uma com suas indicações e particularidades. Abaixo, explicamos as <strong>4 principais modalidades</strong> utilizadas na urologia moderna e os procedimentos realizados com cada técnica.
            </p>
          </div>
        </div>
      </section>

      {/* Quick navigation */}
      <section className="py-8 bg-[#F8FAFB] border-b border-[#0A2540]/6">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white border border-[#0A2540]/8 text-[#0A2540]/70 hover:border-[#0A2540]/20 transition-colors"
              >
                <span style={{ color: cat.color }}>{cat.icon}</span>
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-4xl space-y-6">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="py-12 lg:py-16 bg-[#F8FAFB]">
        <div className="container">
          <h2 className="text-2xl lg:text-3xl text-[#0A2540] mb-8 text-center font-serif">
            Comparação entre as Técnicas
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-[#0A2540] text-white">
                  <th className="p-3 text-left font-semibold">Característica</th>
                  <th className="p-3 text-center font-semibold">Endourologia</th>
                  <th className="p-3 text-center font-semibold">LECO</th>
                  <th className="p-3 text-center font-semibold">Laparoscopia</th>
                  <th className="p-3 text-center font-semibold">Robótica</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Acesso", "Orifícios naturais", "Externo (ondas)", "3-5 portais (5-12mm)", "4-6 portais (8-12mm)"],
                  ["Visão", "HD endoscópica", "US/Fluoroscopia", "2D HD (10x)", "3D estereoscópica (10-15x)"],
                  ["Graus de liberdade", "Limitados", "N/A", "4 graus", "7 graus"],
                  ["Filtro de tremor", "Não", "N/A", "Não", "Sim"],
                  ["Internação típica", "0-2 dias", "Ambulatorial", "2-3 dias", "1-3 dias"],
                  ["Recuperação", "1-7 dias", "Imediata", "2-3 semanas", "2-3 semanas"],
                  ["Indicação principal", "Cálculos, HPB, tumores vesicais", "Cálculos renais <2cm", "Cirurgias renais e adrenais", "Câncer de próstata, rim, bexiga"],
                  ["Custo relativo", "Moderado", "Baixo", "Moderado", "Alto"],
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
          <p className="mt-4 text-[10px] text-[#0A2540]/40 text-center">
            Fontes: EAU Guidelines 2025, AUA Guidelines 2025, Einstein/SP, H9J/SP.
          </p>
        </div>
      </section>

      {/* Key message */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 lg:p-8">
            <h3 className="text-lg font-semibold text-[#0A2540] mb-3">O robô opera sozinho?</h3>
            <p className="text-sm text-[#0A2540]/60 leading-relaxed mb-4">
              <strong className="text-[#0A2540]/80">Não.</strong> O robô cirúrgico é uma ferramenta controlada integralmente pelo cirurgião. Ele não toma decisões nem realiza movimentos autônomos. O sistema traduz os movimentos das mãos do cirurgião para os braços robóticos com maior precisão, filtrando tremores e ampliando a visão. A experiência e o treinamento do cirurgião continuam sendo os fatores mais importantes para o sucesso da cirurgia.
            </p>
            <h3 className="text-lg font-semibold text-[#0A2540] mb-3">Qual técnica é melhor?</h3>
            <p className="text-sm text-[#0A2540]/60 leading-relaxed">
              Não existe uma técnica universalmente superior. A escolha depende do tipo de doença, da localização, da anatomia do paciente e da experiência do cirurgião. Em muitos casos, diferentes técnicas podem ser utilizadas para tratar a mesma condição, e a decisão deve ser individualizada. Agende uma consulta para discutirmos a melhor abordagem para o seu caso.
            </p>
          </div>
        </div>
      </section>
    </EducationalLayout>
  );
}
