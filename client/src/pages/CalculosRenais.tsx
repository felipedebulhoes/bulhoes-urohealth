/*
 * Design: Clinical Precision — Swiss Medical Design
 * Page: Cálculos Renais — prevenção, tratamentos minimamente invasivos e cateter duplo J
 * Referências: EAU Guidelines on Urolithiasis 2025, AUA Surgical Management of Stones 2025, Campbell-Walsh-Wein 13th Ed.
 */
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import EducationalLayout from "@/components/EducationalLayout";
import {
  Droplets, Flame, Zap, Target, Shield, AlertTriangle,
  Check, X, ChevronDown, ChevronUp, Clock, Ruler,
  Apple, GlassWater, Sun, Dumbbell, Pill, Stethoscope
} from "lucide-react";

/* ── CDN URLs ── */
const IMG = {
  ureteroscopy: "/manus-storage/ureteroscopy-illustration_0dc79076_b87de921.webp",
  doubleJ: "/manus-storage/double-j-stent_063cc894_8ea27222.webp",
  jjPlacement: "/manus-storage/jj-stent-placement_40a34aa6_113423d0.webp",
  prevention: "/manus-storage/kidney-prevention-diet_6a6af788_5e94c70b.webp",
};

interface Treatment {
  id: string;
  name: string;
  fullName: string;
  icon: React.ReactNode;
  description: string;
  howItWorks: string;
  indication: string;
  advantages: string[];
  disadvantages: string[];
  recovery: string;
  needsDoubleJ: string;
}

const treatments: Treatment[] = [
  {
    id: "leco",
    name: "LECO",
    fullName: "Litotripsia Extracorpórea por Ondas de Choque",
    icon: <Zap className="w-6 h-6" />,
    description: "Procedimento não invasivo que fragmenta cálculos renais por ondas de choque aplicadas externamente, sem necessidade de incisão ou introdução de instrumentos. Os fragmentos são eliminados naturalmente pela urina.",
    howItWorks: "O paciente é posicionado em uma mesa com um sistema de focalização (fluoroscopia ou ultrassom) que localiza o cálculo. Ondas de choque eletro-hidráulicas, eletromagnéticas ou piezelétricas são geradas externamente e focalizadas no cálculo, fragmentando-o em pedaços menores que podem ser eliminados espontaneamente pelo trato urinário.",
    indication: "Cálculos renais ≤20mm e cálculos ureterais proximais ≤10mm. Melhor resultado em cálculos <15mm, de baixa densidade (<1000 HU) e distância pele-cálculo <10cm. Contraindicada em gestantes, pacientes com coagulopatia não corrigida e aneurisma de aorta.",
    advantages: [
      "Não invasiva — sem incisão ou instrumentação",
      "Ambulatorial — alta no mesmo dia",
      "Anestesia leve (sedação) na maioria dos casos",
      "Pode ser repetida se necessário",
      "Recuperação rápida — retorno às atividades em 1-2 dias",
    ],
    disadvantages: [
      "Taxa stone-free inferior à URS e NLPC para cálculos >10mm",
      "Pode necessitar de múltiplas sessões",
      "Fragmentos residuais podem causar cólica durante a eliminação",
      "Limitada por composição (cistina, brushita são resistentes), tamanho e localização",
      "Risco de hematoma renal (raro, <1%)",
      "Ineficaz para cálculos >20mm ou de alta densidade (>1000 HU)",
    ],
    recovery: "Imediata para atividades leves. Trabalho: 1-2 dias. Exercícios: 3-5 dias.",
    needsDoubleJ: "Geralmente não. Pode ser necessário se houver fragmentos grandes ou obstrução prévia.",
  },
  {
    id: "urs-flexivel",
    name: "Ureterorrenolitotripsia Flexível (URS-F)",
    fullName: "Ureteroscopia Flexível com Litotripsia a Laser",
    icon: <Flame className="w-6 h-6" />,
    description: "Procedimento endoscópico que utiliza um ureteroscópio flexível ultrafino introduzido pela uretra para acessar o rim e fragmentar cálculos com laser holmium ou thulium. É a técnica mais versátil para cálculos renais de até 20mm e cálculos ureterais de qualquer localização.",
    howItWorks: "Um ureteroscópio flexível (diâmetro ~7.5Fr, ~2.5mm) é introduzido pela uretra, passa pela bexiga e sobe pelo ureter até o rim. Uma fibra de laser holmium (ou thulium) é passada pelo canal de trabalho do aparelho e utilizada para fragmentar o cálculo em pó (técnica 'dusting') ou em fragmentos que são extraídos com basket (cesta). Todo o procedimento é visualizado em tempo real por câmera de alta definição.",
    indication: "Cálculos renais ≤20mm (primeira linha — EAU 2025). Cálculos ureterais de qualquer localização e tamanho. Alternativa à LECO quando esta falha ou é contraindicada. Pacientes em uso de anticoagulantes. Cálculos em rim transplantado ou anomalias anatômicas.",
    advantages: [
      "Alta taxa stone-free (>85% para cálculos <20mm)",
      "Trata cálculos em qualquer localização do rim e ureter",
      "Sem incisão — acesso totalmente endoscópico",
      "Segura em pacientes anticoagulados",
      "Permite análise da composição do cálculo",
      "Técnica 'dusting': fragmentação em pó, sem necessidade de extração",
    ],
    disadvantages: [
      "Necessita de anestesia geral ou raquianestesia",
      "Frequentemente necessita de cateter duplo J pós-operatório",
      "Custo dos ureteroscópios flexíveis e fibras de laser",
      "Para cálculos >20mm pode necessitar de procedimento em dois tempos (staged)",
      "Risco de lesão ureteral (<2%)",
    ],
    recovery: "Atividades leves: 2-3 dias. Trabalho: 3-7 dias. Exercícios: 1-2 semanas.",
    needsDoubleJ: "Sim, na maioria dos casos. Permanece 1-4 semanas. Retirado no consultório por cistoscopia.",
  },
  {
    id: "urs-semi",
    name: "Ureterolitotripsia Semirrígida",
    fullName: "Ureteroscopia Semirrígida com Litotripsia a Laser",
    icon: <Target className="w-6 h-6" />,
    description: "Procedimento endoscópico com ureteroscópio semirrígido para tratamento de cálculos ureterais, especialmente os localizados no ureter médio e distal. Utiliza laser holmium ou pneumático para fragmentação.",
    howItWorks: "Um ureteroscópio semirrígido (mais robusto que o flexível) é introduzido pela uretra e avançado pelo ureter até o nível do cálculo. O cálculo é visualizado diretamente e fragmentado com laser holmium ou litotriptor pneumático. Os fragmentos são extraídos com basket ou eliminados espontaneamente.",
    indication: "Cálculos ureterais médios e distais (primeira linha — EAU 2025). Cálculos ureterais proximais quando a URS flexível não está disponível. Cálculos impactados no ureter.",
    advantages: [
      "Excelente taxa stone-free para cálculos ureterais distais (>95%)",
      "Instrumento robusto com boa visibilidade",
      "Custo menor que a URS flexível",
      "Procedimento geralmente mais rápido",
      "Sem incisão",
    ],
    disadvantages: [
      "Limitada ao ureter — não alcança o rim (para isso, usar URS flexível)",
      "Risco de migração do cálculo para o rim durante o procedimento",
      "Necessita de anestesia",
      "Pode necessitar de cateter duplo J",
    ],
    recovery: "Atividades leves: 1-2 dias. Trabalho: 2-5 dias. Exercícios: 1 semana.",
    needsDoubleJ: "Variável. Depende do edema ureteral e da duração do procedimento.",
  },
  {
    id: "nlpc",
    name: "Nefrolitotripsia Percutânea (NLPC)",
    fullName: "Cirurgia Renal Percutânea — Standard, Mini-Perc e Micro-Perc",
    icon: <Shield className="w-6 h-6" />,
    description: "Procedimento que acessa o rim através de um pequeno orifício na pele da região lombar para fragmentar e remover cálculos grandes (>20mm), coraliformes ou complexos. É o padrão-ouro para cálculos renais grandes e oferece a maior taxa stone-free em um único procedimento.",
    howItWorks: "Sob anestesia geral, uma punção percutânea é realizada na região lombar guiada por fluoroscopia e/ou ultrassom, criando um acesso direto ao sistema coletor renal. O trajeto é dilatado e um nefroscópio é introduzido. O cálculo é fragmentado com laser, ultrassom ou litotriptor pneumático e os fragmentos são aspirados ou extraídos. Variantes miniaturizadas (mini-NLPC com bainha de 14-20Fr, micro-NLPC com 4.8Fr) reduzem a morbidade para cálculos menores.",
    indication: "Cálculos renais >20mm (primeira linha — EAU 2025). Cálculos coraliformes (staghorn). Cálculos em divertículo calicinal de difícil acesso. Falha de URS ou LECO. Cálculos de cistina ou brushita (resistentes à LECO).",
    advantages: [
      "Maior taxa stone-free em um único procedimento (>90% para cálculos >20mm)",
      "Padrão-ouro para cálculos grandes e coraliformes",
      "Permite remoção completa de grandes volumes de cálculo",
      "Mini-NLPC: menor morbidade mantendo alta eficácia",
      "Fragmentação + aspiração simultânea",
    ],
    disadvantages: [
      "Mais invasiva que URS e LECO — acesso percutâneo",
      "Necessita de anestesia geral",
      "Risco de sangramento (transfusão: 2-5%)",
      "Internação de 1-3 dias",
      "Risco de lesão de órgãos adjacentes (raro, <1%)",
      "Pode necessitar de nefrostomia pós-operatória",
    ],
    recovery: "Atividades leves: 1 semana. Trabalho: 1-2 semanas. Exercícios: 3-4 semanas.",
    needsDoubleJ: "Variável. Pode usar nefrostomia, cateter duplo J ou tubeless (sem dreno) dependendo do caso.",
  },
];

const preventionTips = [
  { icon: <GlassWater className="w-5 h-5" />, title: "Hidratação", detail: "Ingerir 2,5 a 3 litros de líquidos por dia para manter débito urinário >2,5L/dia. A urina deve estar sempre clara (cor de palha). A hidratação é a medida isolada mais eficaz na prevenção de recorrência (reduz em ~40%).", source: "EAU Guidelines 2025" },
  { icon: <Apple className="w-5 h-5" />, title: "Dieta balanceada", detail: "Reduzir sódio (<5g/dia de sal), proteína animal (0,8-1g/kg/dia) e açúcar refinado. Manter ingestão normal de cálcio (1000-1200mg/dia) — NÃO restringir cálcio, pois isso aumenta a absorção intestinal de oxalato. Aumentar frutas, verduras e fibras.", source: "EAU/AUA Guidelines 2025" },
  { icon: <Sun className="w-5 h-5" />, title: "Citrato", detail: "Aumentar ingestão de citrato (limonada, suco de laranja natural) — o citrato é o principal inibidor da cristalização de cálcio. Em casos refratários, suplementação com citrato de potássio pode ser prescrita.", source: "EAU Guidelines 2025" },
  { icon: <Dumbbell className="w-5 h-5" />, title: "Peso e exercício", detail: "Manter IMC <25. Obesidade e síndrome metabólica aumentam o risco de cálculos de ácido úrico e oxalato de cálcio. Exercício regular moderado reduz o risco.", source: "Campbell-Walsh-Wein 13th Ed." },
  { icon: <Pill className="w-5 h-5" />, title: "Avaliação metabólica", detail: "Após o primeiro episódio de cálculo, especialmente em pacientes de alto risco ou recorrentes, uma avaliação metabólica completa (urina de 24h, sangue) é essencial para identificar distúrbios como hipercalciúria, hiperuricosúria, hipocitratúria e hiperoxalúria, permitindo tratamento direcionado.", source: "EAU/AUA Guidelines 2025" },
  { icon: <Stethoscope className="w-5 h-5" />, title: "Acompanhamento", detail: "Cálculos renais têm taxa de recorrência de 50% em 5-10 anos sem prevenção. Com medidas adequadas, essa taxa cai para 10-15%. Acompanhamento com exames de imagem periódicos é fundamental.", source: "EAU Guidelines 2025" },
];

function TreatmentCard({ treatment, index }: { treatment: Treatment; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-white dark:bg-card rounded-xl border border-[#1C3D5A]/6 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="p-6 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              {treatment.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1C3D5A] dark:text-foreground mb-0.5">{treatment.name}</h3>
              <p className="text-xs text-[#1C3D5A] dark:text-foreground/40 mb-2">{treatment.fullName}</p>
              <p className="text-sm text-[#1C3D5A] dark:text-foreground/60 leading-relaxed">{treatment.description}</p>
            </div>
          </div>
          <button className="shrink-0 mt-1 text-[#1C3D5A] dark:text-foreground/30">
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex items-center gap-2 text-xs text-[#1C3D5A] dark:text-foreground/50">
            <Clock className="w-3.5 h-3.5 text-[#B87333]" />
            <span>Recuperação: {treatment.recovery.split(".")[0]}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#1C3D5A] dark:text-foreground/50">
            <Ruler className="w-3.5 h-3.5 text-[#B87333]" />
            <span>Duplo J: {treatment.needsDoubleJ.split(".")[0]}</span>
          </div>
        </div>
      </div>
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="border-t border-[#1C3D5A]/6"
        >
          <div className="p-6 space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground mb-2">Como funciona</h4>
              <p className="text-sm text-[#1C3D5A] dark:text-foreground/60 leading-relaxed">{treatment.howItWorks}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-700 mb-2">Indicações</h4>
              <p className="text-xs text-blue-800/70 leading-relaxed">{treatment.indication}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-amber-50/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Vantagens
                </h4>
                <ul className="space-y-2">
                  {treatment.advantages.map((a, i) => (
                    <li key={i} className="text-xs text-amber-800/70 flex items-start gap-2">
                      <Check className="w-3 h-3 mt-0.5 shrink-0 text-amber-500" />{a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Desvantagens
                </h4>
                <ul className="space-y-2">
                  {treatment.disadvantages.map((d, i) => (
                    <li key={i} className="text-xs text-red-800/70 flex items-start gap-2">
                      <X className="w-3 h-3 mt-0.5 shrink-0 text-red-400" />{d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-amber-700 mb-2">Cateter Duplo J</h4>
              <p className="text-xs text-amber-800/70 leading-relaxed">{treatment.needsDoubleJ}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function CalculosRenais() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <EducationalLayout
      title="Cálculos Renais"
      subtitle="Prevenção, Tratamentos e Cateter Duplo J"
      description="Entenda como prevenir cálculos renais, conheça as técnicas minimamente invasivas de tratamento e saiba tudo sobre o cateter duplo J."
      accentColor="#D97706"
    >
      {/* Intro */}
      <section className="py-12 lg:py-16 border-b border-[#1C3D5A]/6">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none prose-headings:text-[#1C3D5A] dark:text-foreground prose-p:text-[#1C3D5A] dark:text-foreground/65 prose-p:leading-relaxed prose-strong:text-[#1C3D5A] dark:text-foreground/80">
            <p>
              Os <strong>cálculos renais</strong> (pedras nos rins) afetam cerca de <strong>12% dos homens e 6% das mulheres</strong> ao longo da vida, com pico de incidência entre 30 e 60 anos. A prevalência vem aumentando globalmente, associada a mudanças dietéticas, obesidade e aquecimento climático. Sem medidas preventivas, a <strong>taxa de recorrência é de 50% em 5-10 anos</strong>.
            </p>
            <p>
              O tratamento moderno dos cálculos renais é predominantemente <strong>minimamente invasivo</strong>. A escolha da técnica depende do tamanho, localização, composição do cálculo e das características do paciente. As opções vão desde a litotripsia extracorpórea (LECO) até a nefrolitotripsia percutânea (NLPC) para cálculos grandes e complexos, passando pela ureteroscopia com laser — a técnica mais versátil e frequentemente utilizada.
            </p>
          </div>
        </div>
      </section>

      {/* Illustration */}
      <section className="py-12 lg:py-16 bg-[#F8FAFB]">
        <div className="container max-w-5xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-8 text-center font-serif">
            Tratamentos Minimamente Invasivos
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-card rounded-xl overflow-hidden shadow-sm">
              <img loading="lazy" src={IMG.ureteroscopy} alt="Ureteroscopia com laser - ilustração" className="w-full h-auto" />
              <div className="p-4">
                <p className="text-xs text-[#1C3D5A] dark:text-foreground/50 text-center">Ureteroscopia com litotripsia a laser — o ureteroscópio acessa o rim pela uretra para fragmentar o cálculo</p>
              </div>
            </div>
            <div className="bg-white dark:bg-card rounded-xl overflow-hidden shadow-sm">
              <img loading="lazy" src={IMG.doubleJ} alt="Cateter Duplo J - ilustração" className="w-full h-auto" />
              <div className="p-4">
                <p className="text-xs text-[#1C3D5A] dark:text-foreground/50 text-center">Cateter duplo J posicionado entre o rim e a bexiga para garantir drenagem urinária</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment cards */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-4xl space-y-4">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-8 text-center font-serif">
            Opções de Tratamento
          </h2>
          {treatments.map((t, i) => (
            <TreatmentCard key={t.id} treatment={t} index={i} />
          ))}
        </div>
      </section>

      {/* Double J section */}
      <section className="py-12 lg:py-16 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-8 text-center font-serif">
            O Cateter Duplo J
          </h2>
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-3 space-y-4">
              <div className="prose prose-sm max-w-none prose-p:text-[#1C3D5A] dark:text-foreground/65 prose-p:leading-relaxed prose-strong:text-[#1C3D5A] dark:text-foreground/80 prose-headings:text-[#1C3D5A] dark:text-foreground">
                <h3>O que é?</h3>
                <p>
                  O cateter duplo J (ou stent ureteral) é um tubo flexível de silicone ou poliuretano com extremidades em formato de "J" que é posicionado internamente entre o rim e a bexiga. Sua função é <strong>garantir a drenagem da urina</strong> do rim para a bexiga, prevenindo obstrução por fragmentos de cálculo, edema ou coágulos após procedimentos urológicos.
                </p>
                <h3>Por que é necessário?</h3>
                <p>
                  Após a ureteroscopia com laser, o ureter pode apresentar edema (inchaço) que dificulta a passagem da urina. O cateter duplo J mantém o ureter aberto, previne a obstrução e permite que fragmentos residuais sejam eliminados. Também é utilizado em situações de emergência para desobstruir o rim em casos de cólica renal com infecção (sepse urinária).
                </p>
                <h3>Quanto tempo permanece?</h3>
                <p>
                  Geralmente <strong>1 a 4 semanas</strong>, dependendo do procedimento realizado e da complexidade do caso. É fundamental <strong>não ultrapassar o prazo de retirada</strong>, pois o cateter pode calcificar e tornar a remoção significativamente mais difícil.
                </p>
                <h3>Como é retirado?</h3>
                <p>
                  A retirada é realizada no consultório por <strong>cistoscopia</strong> — um procedimento rápido (1-2 minutos) com anestesia local (gel de lidocaína). Um cistoscópio fino é introduzido pela uretra e uma pinça remove o cateter sob visão direta.
                </p>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-card rounded-xl overflow-hidden shadow-sm sticky top-24">
                <img loading="lazy" src={IMG.jjPlacement} alt="Posicionamento do cateter duplo J" className="w-full h-auto" />
                <div className="p-4 space-y-3">
                  <p className="text-xs text-[#1C3D5A] dark:text-foreground/50 text-center">Posicionamento do cateter duplo J no trato urinário</p>
                  <div className="bg-amber-50 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-amber-700 mb-1">Sintomas comuns com o cateter:</h4>
                    <ul className="text-[10px] text-amber-800/70 space-y-1">
                      <li>• Urgência e frequência urinária aumentada</li>
                      <li>• Desconforto em flanco ao urinar</li>
                      <li>• Sangue na urina (hematúria leve)</li>
                      <li>• Desconforto na bexiga ao final da micção</li>
                    </ul>
                    <p className="text-[10px] text-amber-700 mt-2 font-medium">Estes sintomas são normais e desaparecem após a retirada.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-3 text-center font-serif">
            Prevenção de Cálculos Renais
          </h2>
          <p className="text-center text-sm text-[#1C3D5A] dark:text-foreground/50 mb-10 max-w-2xl mx-auto">
            A prevenção é fundamental para evitar recorrência. Medidas dietéticas e comportamentais simples podem reduzir o risco de novos cálculos em até 50%.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {preventionTips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-card rounded-xl border border-[#1C3D5A]/6 p-5 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 mb-3">
                  {tip.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground mb-2">{tip.title}</h3>
                <p className="text-xs text-[#1C3D5A] dark:text-foreground/55 leading-relaxed mb-2">{tip.detail}</p>
                <p className="text-[10px] text-[#B87333] font-medium">{tip.source}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <img loading="lazy" src={IMG.prevention} alt="Dieta para prevenção de cálculos renais" className="w-full max-w-2xl mx-auto rounded-xl shadow-sm" />
            <p className="text-xs text-[#1C3D5A] dark:text-foreground/40 text-center mt-3">Medidas dietéticas para prevenção de cálculos renais</p>
          </div>
        </div>
      </section>

      {/* Decision flowchart */}
      <section className="py-12 lg:py-16 bg-[#F8FAFB]">
        <div className="container max-w-3xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-8 text-center font-serif">
            Como escolhemos o tratamento?
          </h2>
          <div className="space-y-4">
            {[
              { size: "< 5mm", rec: "Tratamento conservador (expulsivo) — hidratação + alfa-bloqueador. Eliminação espontânea em 68-98% dos casos.", color: "emerald" },
              { size: "5-10mm", rec: "URS (ureteroscopia) ou LECO, dependendo da localização. Alfa-bloqueador como terapia expulsiva pode ser tentado para cálculos ureterais distais de 5-10mm.", color: "blue" },
              { size: "10-20mm", rec: "URS flexível com laser (primeira linha para cálculos renais). LECO como alternativa para cálculos <15mm de baixa densidade.", color: "amber" },
              { size: "> 20mm", rec: "NLPC (primeira linha — EAU 2025). URS flexível em dois tempos (staged) como alternativa. LECO não recomendada.", color: "red" },
              { size: "Coraliforme", rec: "NLPC (padrão-ouro). Pode necessitar de múltiplos acessos ou combinação com URS flexível (ECIRS — Endoscopic Combined Intrarenal Surgery).", color: "purple" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-white dark:bg-card rounded-xl p-5 border border-[#1C3D5A]/6"
              >
                <div className={`shrink-0 w-20 h-10 rounded-lg bg-${item.color}-50 flex items-center justify-center`}>
                  <span className={`text-sm font-bold text-${item.color}-600`}>{item.size}</span>
                </div>
                <p className="text-sm text-[#1C3D5A] dark:text-foreground/60 leading-relaxed">{item.rec}</p>
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
            <li>Türk C, et al. EAU Guidelines on Urolithiasis. European Association of Urology, 2025.</li>
            <li>Assimos D, et al. AUA/Endourology Society Guideline: Surgical Management of Stones. American Urological Association, 2025.</li>
            <li>Partin AW, et al. Campbell-Walsh-Wein Urology, 13th Edition. Elsevier, 2024. Chapters 90-100.</li>
            <li>Ziemba JB, Matlaga BR. Epidemiology and economics of nephrolithiasis. Investig Clin Urol. 2017;58(5):299-306.</li>
            <li>Pearle MS, et al. Medical management of kidney stones: AUA Guideline. J Urol. 2014;192(2):316-24.</li>
            <li>Sorokin I, et al. Epidemiology of stone disease across the world. World J Urol. 2017;35(9):1301-1320.</li>
          </ol>
        </div>
      </section>
    </EducationalLayout>
  );
}
