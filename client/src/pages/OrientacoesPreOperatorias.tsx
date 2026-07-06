/**
 * Design: Clinical Precision — Swiss Medical Design
 * Página: Orientações Pré-Operatórias para Pacientes
 * Referências: ASA 2023 (Jejum), EAU 2025, ERAS Society, AUA 2024
 * Consistente com OrientacoesPosOperatorias.tsx
 */
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Calendar, ClipboardCheck, Pill, Utensils, Droplets,
  ShieldCheck, AlertTriangle, ChevronDown, ChevronUp,
  Stethoscope, Heart, Activity, Clock, FileText,
  Scissors, BedDouble, ShoppingBag, Car, Phone,
  CheckCircle2, XCircle, Info, Syringe, Apple,
  Shirt, Thermometer
} from "lucide-react";
import EducationalLayout from "@/components/EducationalLayout";
import { getWhatsAppUrl } from "@/lib/tracking";

/* ─── Types ─── */
interface PreOpSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  items: PreOpItem[];
}

interface PreOpItem {
  title: string;
  detail: string;
  timing?: string;
  important?: boolean;
}

interface SurgeryPrep {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  specificInstructions: string[];
  prepIntestinal?: string;
  jejumEspecial?: string;
  examesPreOp: string[];
  internacao: string;
  anestesia: string;
}

/* ─── Fade animation ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45 },
  }),
};

/* ─── General Pre-Op Sections ─── */
const generalSections: PreOpSection[] = [
  {
    id: "jejum",
    title: "Jejum Pré-Operatório",
    icon: <Utensils className="w-5 h-5" />,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    items: [
      {
        title: "Alimentos sólidos e leite",
        detail: "Suspender a ingestão de alimentos sólidos, leite e derivados pelo menos 8 horas antes do horário previsto da cirurgia. Isso inclui chicletes e balas.",
        timing: "8 horas antes",
        important: true,
      },
      {
        title: "Líquidos claros (água, chá, suco sem polpa)",
        detail: "Líquidos claros sem resíduos podem ser ingeridos até 2 horas antes do procedimento. Isso inclui água, chá sem leite, suco de maçã coado e bebidas isotônicas. A hidratação pré-operatória é recomendada pelo protocolo ERAS e reduz náuseas e desconforto.",
        timing: "Até 2h antes",
      },
      {
        title: "Por que o jejum é importante?",
        detail: "O jejum previne a aspiração pulmonar — a passagem acidental do conteúdo gástrico para os pulmões durante a anestesia. Seguir rigorosamente os tempos de jejum é fundamental para sua segurança.",
        important: true,
      },
      {
        title: "Pacientes diabéticos",
        detail: "Diabéticos devem seguir orientações específicas sobre ajuste de insulina e medicamentos orais. Informe o anestesista e o cirurgião sobre seu esquema de medicação. Em geral, metformina é suspensa 24-48h antes e insulina de ação longa pode ser ajustada.",
        timing: "Consultar médico",
      },
    ],
  },
  {
    id: "medicamentos",
    title: "Medicamentos — O Que Manter e O Que Suspender",
    icon: <Pill className="w-5 h-5" />,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    items: [
      {
        title: "Anti-hipertensivos",
        detail: "A maioria dos anti-hipertensivos deve ser mantida até o dia da cirurgia, tomados com um pequeno gole de água pela manhã. Exceção: inibidores da ECA (enalapril, ramipril) e BRAs (losartana, valsartana) podem ser suspensos no dia da cirurgia conforme orientação do anestesista, pois podem causar hipotensão na indução anestésica.",
        timing: "Manter (com exceções)",
      },
      {
        title: "Anticoagulantes e antiagregantes plaquetários",
        detail: "Varfarina: suspender 5 dias antes (INR alvo < 1,5). Rivaroxabana/Apixabana: suspender 48h antes para cirurgias de alto risco hemorrágico, 24h para baixo risco. AAS (aspirina): suspender 7 dias antes para cirurgias com risco de sangramento (biópsia de próstata, RTU-P, NLPC). Clopidogrel: suspender 5-7 dias antes. Sempre confirmar com seu cirurgião e cardiologista.",
        timing: "5-7 dias antes",
        important: true,
      },
      {
        title: "Medicamentos para diabetes",
        detail: "Metformina: suspender 24-48h antes da cirurgia. Sulfonilureias (glibenclamida, glimepirida): suspender no dia da cirurgia. Insulina de ação longa: reduzir dose em 50% na noite anterior (ou conforme orientação). Insulina de ação rápida: não aplicar no dia da cirurgia em jejum. Monitorar glicemia capilar.",
        timing: "24-48h antes",
      },
      {
        title: "Fitoterápicos e suplementos",
        detail: "Suspender todos os fitoterápicos e suplementos nutricionais pelo menos 2 semanas antes da cirurgia. Ginkgo biloba, ginseng, alho em cápsulas, óleo de peixe (ômega-3), vitamina E em altas doses e erva de São João podem aumentar o risco de sangramento ou interferir com a anestesia.",
        timing: "2 semanas antes",
        important: true,
      },
      {
        title: "Anti-inflamatórios (ibuprofeno, diclofenaco, nimesulida)",
        detail: "Suspender 5-7 dias antes da cirurgia, pois interferem na agregação plaquetária e aumentam o risco de sangramento. Paracetamol (Tylenol) e dipirona podem ser usados como alternativa para dor, se necessário.",
        timing: "5-7 dias antes",
      },
    ],
  },
  {
    id: "exames",
    title: "Exames e Avaliação Pré-Operatória",
    icon: <FileText className="w-5 h-5" />,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    items: [
      {
        title: "Exames laboratoriais",
        detail: "Hemograma completo, coagulograma (TP, TTPa, INR), glicemia de jejum, ureia, creatinina, sódio, potássio. Para cirurgias de grande porte: tipagem sanguínea e reserva de hemoderivados. Urocultura é obrigatória antes de procedimentos que violam a mucosa do trato urinário (EAU 2025).",
        timing: "Até 30 dias antes",
      },
      {
        title: "Eletrocardiograma (ECG)",
        detail: "Indicado para pacientes acima de 40 anos ou com fatores de risco cardiovascular. Deve ser realizado nos últimos 30 dias antes da cirurgia.",
        timing: "Até 30 dias antes",
      },
      {
        title: "Radiografia de tórax",
        detail: "Indicada para pacientes acima de 60 anos, tabagistas, portadores de doença pulmonar ou cardíaca. Não é necessária rotineiramente para pacientes jovens e saudáveis.",
        timing: "Até 30 dias antes",
      },
      {
        title: "Risco cirúrgico / Avaliação cardiológica",
        detail: "Necessária para pacientes com doenças cardíacas, hipertensão não controlada, diabetes, obesidade mórbida ou idade avançada. O cardiologista avaliará o risco anestésico-cirúrgico (classificação ASA) e poderá solicitar exames complementares (ecocardiograma, teste ergométrico).",
        timing: "Até 30 dias antes",
      },
      {
        title: "Urocultura",
        detail: "Obrigatória antes de qualquer procedimento endoscópico (cistoscopia, RTU-P, RTU-B, ureteroscopia, NLPC) ou que viole a mucosa urinária. Se positiva, o tratamento antibiótico deve ser realizado antes da cirurgia para reduzir o risco de infecção pós-operatória (EAU Guidelines on Urological Infections, 2025).",
        timing: "7-14 dias antes",
        important: true,
      },
    ],
  },
  {
    id: "dia-anterior",
    title: "No Dia Anterior à Cirurgia",
    icon: <Calendar className="w-5 h-5" />,
    color: "text-violet-700",
    bgColor: "bg-violet-50",
    items: [
      {
        title: "Alimentação leve",
        detail: "Faça uma refeição leve no jantar (sopas, saladas, frutas). Evite alimentos pesados, gordurosos, frituras e bebidas alcoólicas. Hidrate-se bem ao longo do dia.",
      },
      {
        title: "Banho com antisséptico",
        detail: "Tome banho com sabonete antisséptico (clorexidina 2% degermante) na noite anterior e na manhã da cirurgia. Dê atenção especial à região da cirurgia, axilas e virilhas. Isso reduz a colonização bacteriana da pele e o risco de infecção do sítio cirúrgico.",
        timing: "Noite anterior + manhã",
        important: true,
      },
      {
        title: "Tricotomia (depilação)",
        detail: "NÃO raspe os pelos da região cirúrgica com lâmina em casa. Se necessário, a tricotomia será realizada pela equipe do hospital com máquina elétrica (clipper) no dia da cirurgia. Raspar com lâmina causa microlesões na pele que aumentam o risco de infecção.",
        important: true,
      },
      {
        title: "Preparo intestinal (quando indicado)",
        detail: "Algumas cirurgias (prostatectomia radical, cistectomia radical, cirurgias pélvicas) podem exigir preparo intestinal com laxante ou fleet enema na véspera. Siga rigorosamente a prescrição fornecida. Nem todas as cirurgias urológicas necessitam de preparo intestinal.",
        timing: "Conforme prescrição",
      },
      {
        title: "Organize seus pertences",
        detail: "Separe documentos (RG, exames pré-operatórios), roupas confortáveis e folgadas para a alta, chinelo, itens de higiene pessoal. Não leve joias, relógios ou objetos de valor ao hospital.",
      },
    ],
  },
  {
    id: "dia-cirurgia",
    title: "No Dia da Cirurgia",
    icon: <ClipboardCheck className="w-5 h-5" />,
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    items: [
      {
        title: "Chegada ao hospital",
        detail: "Chegue ao hospital no horário informado (geralmente 1-2 horas antes do procedimento). Leve todos os documentos, exames e guias de autorização. Você passará pela admissão e será encaminhado ao centro cirúrgico.",
        timing: "1-2h antes",
      },
      {
        title: "Medicamentos da manhã",
        detail: "Tome apenas os medicamentos autorizados pelo cirurgião/anestesista com um pequeno gole de água. NÃO tome medicamentos que foram orientados a suspender.",
        important: true,
      },
      {
        title: "Banho pré-operatório",
        detail: "Tome banho com clorexidina degermante pela manhã. Vista roupas limpas e confortáveis. Não aplique cremes, perfumes, desodorantes ou maquiagem.",
      },
      {
        title: "Esmalte e acessórios",
        detail: "Remova esmalte das unhas (mãos e pés), lentes de contato, próteses dentárias removíveis, piercings e joias. O oxímetro de pulso precisa de unhas limpas para funcionar corretamente.",
      },
      {
        title: "Acompanhante",
        detail: "É obrigatório ter um acompanhante adulto responsável para a alta hospitalar. Para procedimentos ambulatoriais, o acompanhante deve permanecer no hospital durante todo o procedimento. Você NÃO poderá dirigir nas primeiras 24 horas após anestesia.",
        important: true,
      },
    ],
  },
  {
    id: "habitos",
    title: "Hábitos e Estilo de Vida",
    icon: <Heart className="w-5 h-5" />,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    items: [
      {
        title: "Tabagismo",
        detail: "Idealmente, pare de fumar pelo menos 4-8 semanas antes da cirurgia. O tabagismo aumenta significativamente o risco de complicações pulmonares, infecções e atraso na cicatrização. Mesmo parar 24-48h antes já traz benefícios na oxigenação. Converse com seu médico sobre estratégias de cessação.",
        timing: "4-8 semanas antes (ideal)",
        important: true,
      },
      {
        title: "Álcool",
        detail: "Evite bebidas alcoólicas nos 7 dias anteriores à cirurgia. O álcool interfere com a coagulação sanguínea, a resposta imunológica e pode interagir com medicamentos anestésicos. Consumo crônico de álcool aumenta o risco de complicações pós-operatórias.",
        timing: "7 dias antes",
      },
      {
        title: "Atividade física",
        detail: "Mantenha atividade física leve a moderada nos dias anteriores à cirurgia (caminhadas, alongamentos). Pacientes com melhor condicionamento físico pré-operatório têm recuperação mais rápida. Evite exercícios intensos nas 24h anteriores.",
      },
      {
        title: "Sono e ansiedade",
        detail: "Procure dormir bem na noite anterior. É normal sentir ansiedade antes de uma cirurgia. Se necessário, converse com seu médico sobre medicação ansiolítica. Técnicas de respiração e relaxamento podem ajudar.",
      },
    ],
  },
];

/* ─── Surgery-Specific Preparations ─── */
const surgeryPreps: SurgeryPrep[] = [
  {
    id: "rtup-holep",
    name: "RTU-P / HoLEP / Enucleação Prostática",
    subtitle: "Cirurgias endoscópicas da próstata para HPB",
    icon: <Stethoscope className="w-6 h-6" />,
    description: "Procedimentos realizados por via endoscópica (através da uretra) para tratamento da hiperplasia prostática benigna. Geralmente requerem internação de 1-2 dias.",
    specificInstructions: [
      "Urocultura obrigatória 7-14 dias antes — se positiva, tratar antes da cirurgia",
      "Suspender anticoagulantes e antiagregantes conforme orientação (AAS 7 dias, clopidogrel 5-7 dias)",
      "Suspender alfa-bloqueadores (tansulosina, doxazosina) conforme orientação do cirurgião",
      "Informar ao anestesista se usa medicamentos para HPB (finasterida, dutasterida)",
    ],
    examesPreOp: ["Hemograma", "Coagulograma", "Creatinina", "Urocultura", "ECG", "PSA recente", "Ultrassom de próstata"],
    internacao: "Internação no dia da cirurgia ou na véspera. Alta geralmente em 24-48h após retirada do cateter.",
    anestesia: "Raquianestesia (anestesia regional) é a mais comum. Anestesia geral pode ser indicada em casos selecionados.",
  },
  {
    id: "prostatectomia",
    name: "Prostatectomia Radical (Robótica/Laparoscópica)",
    subtitle: "Remoção da próstata para tratamento do câncer",
    icon: <Heart className="w-6 h-6" />,
    description: "Cirurgia de grande porte para remoção completa da próstata e vesículas seminais. Realizada por via robótica ou laparoscópica, com internação de 1-3 dias.",
    specificInstructions: [
      "Preparo intestinal com fleet enema na véspera (conforme prescrição)",
      "Suspender anticoagulantes e antiagregantes conforme orientação",
      "Trazer meias de compressão elástica (antitrombótica) para uso no hospital",
      "Iniciar exercícios de Kegel (assoalho pélvico) antes da cirurgia — a fisioterapia pré-operatória melhora a recuperação da continência",
      "Reserva de sangue pode ser solicitada (tipagem sanguínea)",
    ],
    prepIntestinal: "Fleet enema na véspera à noite, conforme prescrição médica.",
    examesPreOp: ["Hemograma", "Coagulograma", "Bioquímica completa", "Urocultura", "ECG", "Radiografia de tórax", "PSA", "Ressonância magnética da próstata", "Tipagem sanguínea"],
    internacao: "Internação na manhã da cirurgia. Alta em 1-3 dias. Cateter vesical permanece por 7-14 dias (retirado no consultório).",
    anestesia: "Anestesia geral combinada com peridural ou bloqueio do plano transverso abdominal (TAP block) para controle da dor.",
  },
  {
    id: "ureteroscopia",
    name: "Ureteroscopia (URS) / Litotripsia a Laser",
    subtitle: "Tratamento endoscópico de cálculos renais e ureterais",
    icon: <Activity className="w-6 h-6" />,
    description: "Procedimento minimamente invasivo para fragmentação e remoção de cálculos urinários com laser holmium. Realizado por via endoscópica, geralmente com alta no mesmo dia.",
    specificInstructions: [
      "Urocultura obrigatória — infecção urinária ativa é contraindicação para o procedimento",
      "Suspender anticoagulantes conforme orientação",
      "Informar se já teve alergia a contraste iodado (pode ser necessário durante o procedimento)",
      "Trazer exames de imagem recentes (tomografia, ultrassom) no dia da cirurgia",
    ],
    examesPreOp: ["Hemograma", "Coagulograma", "Creatinina", "Urocultura", "ECG (se > 40 anos)", "Tomografia de abdome recente"],
    internacao: "Procedimento ambulatorial na maioria dos casos. Alta no mesmo dia ou no dia seguinte. Pode ser necessário cateter duplo J (stent ureteral) por 1-4 semanas.",
    anestesia: "Anestesia geral é a mais comum. Raquianestesia pode ser utilizada em casos selecionados.",
  },
  {
    id: "nlpc",
    name: "Nefrolitotripsia Percutânea (NLPC)",
    subtitle: "Cirurgia percutânea para cálculos renais grandes",
    icon: <Scissors className="w-6 h-6" />,
    description: "Procedimento para remoção de cálculos renais grandes (> 2 cm) ou complexos (coraliformes) através de um acesso percutâneo (pela pele do flanco). Internação de 2-4 dias.",
    specificInstructions: [
      "Urocultura obrigatória — tratar infecção antes do procedimento",
      "Suspender anticoagulantes e antiagregantes (risco de sangramento renal)",
      "Tipagem sanguínea e reserva de hemoderivados (risco de sangramento)",
      "Informar sobre alergias a contraste e antibióticos",
      "Pode ser necessário cateter duplo J prévio em casos selecionados",
    ],
    examesPreOp: ["Hemograma", "Coagulograma", "Bioquímica completa", "Urocultura", "ECG", "Radiografia de tórax", "Tomografia de abdome", "Tipagem sanguínea"],
    internacao: "Internação na véspera ou manhã da cirurgia. Alta em 2-4 dias, dependendo da evolução. Nefrostomia pode permanecer por alguns dias.",
    anestesia: "Anestesia geral. Posição prona (de bruços) durante o procedimento.",
  },
  {
    id: "rtub",
    name: "RTU de Bexiga (RTU-B)",
    subtitle: "Ressecção transuretral de tumor vesical",
    icon: <Stethoscope className="w-6 h-6" />,
    description: "Procedimento endoscópico para ressecção de tumores da bexiga. É tanto diagnóstico quanto terapêutico. Internação de 1-2 dias.",
    specificInstructions: [
      "Urocultura obrigatória antes do procedimento",
      "Suspender anticoagulantes e antiagregantes conforme orientação",
      "Informar sobre uso de BCG intravesical prévio ou quimioterapia",
      "Trazer resultados de cistoscopia e exames de imagem anteriores",
    ],
    examesPreOp: ["Hemograma", "Coagulograma", "Creatinina", "Urocultura", "ECG", "Tomografia de abdome e pelve"],
    internacao: "Internação no dia da cirurgia. Alta em 24-48h após retirada do cateter vesical.",
    anestesia: "Raquianestesia (preferencial) ou anestesia geral.",
  },
  {
    id: "biopsia-prostata",
    name: "Biópsia de Próstata (Fusão / Transperineal)",
    subtitle: "Biópsia guiada por fusão de imagens RM-US",
    icon: <FileText className="w-6 h-6" />,
    description: "Procedimento ambulatorial para coleta de fragmentos da próstata para análise histológica. Realizado por via transperineal com fusão de imagens, sob sedação.",
    specificInstructions: [
      "Suspender AAS (aspirina) e anti-inflamatórios 7 dias antes",
      "Suspender anticoagulantes conforme orientação do cardiologista",
      "NÃO é necessário preparo intestinal para biópsia transperineal",
      "Antibioticoprofilaxia será prescrita (dose única ou curta duração)",
      "Trazer ressonância magnética da próstata (CD/pendrive com imagens DICOM)",
    ],
    examesPreOp: ["Hemograma", "Coagulograma", "PSA", "Urocultura", "Ressonância magnética da próstata (PI-RADS)"],
    internacao: "Procedimento ambulatorial. Alta no mesmo dia, algumas horas após o procedimento.",
    anestesia: "Sedação + anestesia local (bloqueio periprostático) ou raquianestesia.",
  },
  {
    id: "vasectomia",
    name: "Vasectomia",
    subtitle: "Esterilização masculina definitiva",
    icon: <Scissors className="w-6 h-6" />,
    description: "Procedimento ambulatorial simples realizado sob anestesia local. Duração de 20-30 minutos com alta imediata.",
    specificInstructions: [
      "Realizar tricotomia (depilação) da região escrotal na véspera com máquina elétrica (NÃO usar lâmina)",
      "Levar cueca tipo slip (não boxer) justa para uso após o procedimento",
      "Suspender AAS e anti-inflamatórios 7 dias antes",
      "Não é necessário jejum prolongado — apenas 4h de jejum para sedação leve, se indicada",
      "Levar acompanhante para dirigir na volta",
    ],
    examesPreOp: ["Hemograma", "Coagulograma", "Espermograma (opcional, para registro basal)"],
    internacao: "Procedimento ambulatorial. Alta imediata após o procedimento.",
    anestesia: "Anestesia local (bloqueio do cordão espermático). Sedação leve opcional.",
  },
  {
    id: "postectomia",
    name: "Postectomia (Circuncisão)",
    subtitle: "Remoção do prepúcio",
    icon: <Scissors className="w-6 h-6" />,
    description: "Procedimento ambulatorial para remoção do prepúcio, indicado em casos de fimose. Realizado sob anestesia local ou raquianestesia.",
    specificInstructions: [
      "Suspender AAS e anti-inflamatórios 7 dias antes",
      "Higiene local cuidadosa nos dias anteriores",
      "Levar cueca justa e confortável para uso após o procedimento",
      "Não é necessário jejum prolongado para anestesia local",
    ],
    examesPreOp: ["Hemograma", "Coagulograma"],
    internacao: "Procedimento ambulatorial. Alta no mesmo dia.",
    anestesia: "Anestesia local (bloqueio peniano) ou raquianestesia.",
  },
  {
    id: "nefrectomia",
    name: "Nefrectomia (Robótica/Laparoscópica)",
    subtitle: "Remoção total ou parcial do rim",
    icon: <Heart className="w-6 h-6" />,
    description: "Cirurgia de grande porte para remoção total ou parcial do rim, indicada para tumores renais ou outras condições. Realizada por via robótica ou laparoscópica.",
    specificInstructions: [
      "Preparo intestinal pode ser indicado (conforme prescrição)",
      "Suspender anticoagulantes e antiagregantes conforme orientação",
      "Tipagem sanguínea e reserva de hemoderivados",
      "Trazer meias de compressão elástica antitrombótica",
      "Avaliação da função renal contralateral (cintilografia renal, se indicada)",
    ],
    prepIntestinal: "Pode ser indicado preparo intestinal leve na véspera, conforme prescrição.",
    examesPreOp: ["Hemograma", "Coagulograma", "Bioquímica completa", "Urocultura", "ECG", "Radiografia de tórax", "Tomografia de abdome", "Tipagem sanguínea", "Cintilografia renal (se nefrectomia parcial)"],
    internacao: "Internação na manhã da cirurgia. Alta em 2-4 dias.",
    anestesia: "Anestesia geral combinada com bloqueio regional para controle da dor.",
  },
  {
    id: "protese-peniana",
    name: "Implante de Prótese Peniana",
    subtitle: "Prótese inflável para disfunção erétil refratária",
    icon: <Heart className="w-6 h-6" />,
    description: "Cirurgia para implante de prótese peniana inflável, indicada para disfunção erétil refratária ao tratamento clínico. Requer cuidados especiais de assepsia.",
    specificInstructions: [
      "Banho com clorexidina degermante 2% por 3 dias consecutivos antes da cirurgia (fundamental para reduzir infecção)",
      "Urocultura obrigatória — tratar qualquer infecção antes",
      "Suspender anticoagulantes conforme orientação",
      "Tricotomia será realizada no hospital com clipper elétrico",
      "Controle glicêmico rigoroso para diabéticos (HbA1c < 8,5% idealmente)",
      "Informar sobre uso de dispositivos intracavernosos prévios ou cirurgias penianas anteriores",
    ],
    examesPreOp: ["Hemograma", "Coagulograma", "Glicemia", "HbA1c (diabéticos)", "Urocultura", "ECG", "PSA (se > 40 anos)"],
    internacao: "Internação no dia da cirurgia. Alta em 24-48h.",
    anestesia: "Raquianestesia ou anestesia geral.",
  },
];

/* ─── Checklist Items ─── */
const checklistItems = [
  { text: "Exames pré-operatórios realizados e resultados em mãos", icon: <FileText className="w-4 h-4" /> },
  { text: "Avaliação cardiológica / risco cirúrgico (se indicado)", icon: <Heart className="w-4 h-4" /> },
  { text: "Urocultura coletada e resultado negativo (ou tratada)", icon: <Droplets className="w-4 h-4" /> },
  { text: "Medicamentos ajustados conforme orientação médica", icon: <Pill className="w-4 h-4" /> },
  { text: "Anticoagulantes/antiagregantes suspensos no prazo correto", icon: <AlertTriangle className="w-4 h-4" /> },
  { text: "Fitoterápicos e suplementos suspensos há 2 semanas", icon: <Apple className="w-4 h-4" /> },
  { text: "Banho com clorexidina degermante realizado", icon: <Droplets className="w-4 h-4" /> },
  { text: "Jejum respeitado (8h sólidos / 2h líquidos claros)", icon: <Utensils className="w-4 h-4" /> },
  { text: "Documentos separados (RG, exames)", icon: <ClipboardCheck className="w-4 h-4" /> },
  { text: "Roupas confortáveis e itens pessoais organizados", icon: <Shirt className="w-4 h-4" /> },
  { text: "Esmalte removido, sem joias/piercings/lentes de contato", icon: <XCircle className="w-4 h-4" /> },
  { text: "Acompanhante adulto confirmado para o dia da cirurgia", icon: <Car className="w-4 h-4" /> },
];

/* ─── Components ─── */
function GeneralSection({ section, index }: { section: PreOpSection; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      custom={index}
      className="bg-white dark:bg-card rounded-xl border border-[#1C3D5A]/8 shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-muted dark:bg-card/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${section.bgColor} rounded-lg flex items-center justify-center ${section.color}`}>
            {section.icon}
          </div>
          <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground text-left">{section.title}</h3>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-[#1C3D5A] dark:text-foreground/40" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#1C3D5A] dark:text-foreground/40" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4">
          {section.items.map((item, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg border ${
                item.important
                  ? "border-amber-200 bg-amber-50/50"
                  : "border-gray-100 bg-gray-50 dark:bg-card/50"
              }`}
            >
              <div className="flex items-start gap-3">
                {item.important ? (
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                ) : (
                  <Info className="w-5 h-5 text-[#1C3D5A] dark:text-foreground/30 mt-0.5 shrink-0" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-[#1C3D5A] dark:text-foreground">{item.title}</h4>
                    {item.timing && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white dark:bg-card border border-[#1C3D5A]/10 text-[#1C3D5A] dark:text-foreground/60 font-medium">
                        {item.timing}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground mt-1.5 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function SurgeryCard({ surgery, index }: { surgery: SurgeryPrep; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      custom={index}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-white dark:bg-card rounded-xl border border-[#1C3D5A]/8 shadow-sm p-5 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1C3D5A]/5 rounded-lg flex items-center justify-center text-[#1C3D5A] dark:text-foreground/60">
              {surgery.icon}
            </div>
            <div className="text-left">
              <h4 className="font-bold text-[#1C3D5A] dark:text-foreground">{surgery.name}</h4>
              <p className="text-xs text-[#1C3D5A] dark:text-foreground/50">{surgery.subtitle}</p>
            </div>
          </div>
          {open ? (
            <ChevronUp className="w-5 h-5 text-[#1C3D5A] dark:text-foreground/40 shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#1C3D5A] dark:text-foreground/40 shrink-0" />
          )}
        </div>
      </button>

      {open && (
        <div className="mt-2 bg-white dark:bg-card rounded-xl border border-[#1C3D5A]/8 p-5 space-y-5">
          <p className="text-sm text-gray-600 dark:text-muted-foreground leading-relaxed">{surgery.description}</p>

          {/* Instruções Específicas */}
          <div>
            <h5 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-3 flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-amber-600" />
              Instruções Específicas
            </h5>
            <ul className="space-y-2">
              {surgery.specificInstructions.map((inst, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Preparo Intestinal */}
          {surgery.prepIntestinal && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-800">
                <strong>Preparo intestinal:</strong> {surgery.prepIntestinal}
              </p>
            </div>
          )}

          {/* Exames */}
          <div>
            <h5 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Exames Pré-Operatórios
            </h5>
            <div className="flex flex-wrap gap-2">
              {surgery.examesPreOp.map((exam, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700"
                >
                  {exam}
                </span>
              ))}
            </div>
          </div>

          {/* Internação e Anestesia */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-card rounded-lg p-4">
              <h5 className="font-semibold text-[#1C3D5A] dark:text-foreground text-sm mb-1 flex items-center gap-2">
                <BedDouble className="w-4 h-4" />
                Internação
              </h5>
              <p className="text-xs text-gray-600 dark:text-muted-foreground leading-relaxed">{surgery.internacao}</p>
            </div>
            <div className="bg-gray-50 dark:bg-card rounded-lg p-4">
              <h5 className="font-semibold text-[#1C3D5A] dark:text-foreground text-sm mb-1 flex items-center gap-2">
                <Syringe className="w-4 h-4" />
                Anestesia
              </h5>
              <p className="text-xs text-gray-600 dark:text-muted-foreground leading-relaxed">{surgery.anestesia}</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function OrientacoesPreOperatorias() {
  const [activeTab, setActiveTab] = useState<"geral" | "especifico" | "checklist">("geral");

  return (
    <EducationalLayout
      title="Orientações Pré-Operatórias"
      subtitle="Guia Completo de Preparo para Cirurgia"
      description="Tudo o que você precisa saber para se preparar adequadamente para sua cirurgia urológica: jejum, medicamentos, exames, cuidados especiais e checklist completo."
      accentColor="#1C3D5A"
      metaTitle="Orientações Pré-Operatórias | Preparo para Cirurgia Urológica | Dr. Felipe de Bulhões"
      metaDescription="Guia completo de orientações pré-operatórias para cirurgias urológicas: jejum, medicamentos, exames, preparo intestinal, anticoagulantes e checklist. Baseado nas guidelines ASA, EAU 2025 e ERAS."
    >
      {/* Introdução */}
      <section className="py-12 lg:py-16 border-b border-[#1C3D5A]/6">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border-l-4 border-[#1C3D5A] p-6 rounded-r-lg mb-8">
              <p className="text-[#1C3D5A] dark:text-foreground leading-relaxed">
                O preparo pré-operatório adequado é fundamental para o sucesso da sua cirurgia e para uma recuperação mais rápida e segura. Este guia reúne as orientações baseadas nos protocolos <strong>ERAS (Enhanced Recovery After Surgery)</strong>, nas diretrizes da <strong>ASA (American Society of Anesthesiologists)</strong> e da <strong>EAU (European Association of Urology, 2025)</strong>. Leia com atenção e, em caso de dúvidas, entre em contato com a equipe do Dr. Felipe de Bulhões.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-5 shadow-sm text-center">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Utensils className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-1">Jejum Seguro</h4>
                <p className="text-sm text-gray-600 dark:text-muted-foreground">8h sólidos, 2h líquidos claros (ASA 2023)</p>
              </div>
              <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-5 shadow-sm text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Pill className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-1">Medicamentos</h4>
                <p className="text-sm text-gray-600 dark:text-muted-foreground">Saiba o que manter e o que suspender</p>
              </div>
              <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-5 shadow-sm text-center">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-1">Checklist</h4>
                <p className="text-sm text-gray-600 dark:text-muted-foreground">Confira tudo antes do dia da cirurgia</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-6 bg-[#F8FAFB] border-b border-[#1C3D5A]/6">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: "geral" as const, label: "Orientações Gerais" },
              { id: "especifico" as const, label: "Por Procedimento" },
              { id: "checklist" as const, label: "Checklist" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs px-4 py-2 rounded-full border transition-colors font-medium ${
                  activeTab === tab.id
                    ? "bg-[#1C3D5A] text-white border-[#1C3D5A]"
                    : "bg-white border-[#1C3D5A]/8 text-[#1C3D5A] dark:text-foreground/60 hover:border-[#1C3D5A]/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-4xl">
          {/* Orientações Gerais */}
          {activeTab === "geral" && (
            <div className="space-y-4">
              {generalSections.map((section, i) => (
                <GeneralSection key={section.id} section={section} index={i} />
              ))}
            </div>
          )}

          {/* Por Procedimento */}
          {activeTab === "especifico" && (
            <div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Selecione seu procedimento</strong> para ver as orientações específicas de preparo. As orientações gerais (jejum, medicamentos, exames) se aplicam a todos os procedimentos — consulte a aba "Orientações Gerais" também.
                  </p>
                </div>
              </motion.div>
              <div className="space-y-3">
                {surgeryPreps.map((surgery, i) => (
                  <SurgeryCard key={surgery.id} surgery={surgery} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Checklist */}
          {activeTab === "checklist" && (
            <div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-6">
                  <p className="text-sm text-amber-800">
                    <strong>Use este checklist</strong> para garantir que tudo está pronto antes da sua cirurgia. Marque cada item conforme for completando. Em caso de dúvida sobre qualquer item, entre em contato com a equipe do Dr. Felipe.
                  </p>
                </div>
              </motion.div>

              <div className="bg-white dark:bg-card rounded-xl border border-[#1C3D5A]/8 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-amber-600" />
                    Checklist Pré-Operatório
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-muted-foreground mt-1">Confirme cada item antes do dia da cirurgia</p>
                </div>
                <div className="divide-y divide-gray-50">
                  {checklistItems.map((item, i) => (
                    <motion.label
                      key={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={i}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-muted dark:bg-card/50 transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-emerald-500 shrink-0"
                      />
                      <div className="flex items-center gap-2 text-[#1C3D5A] dark:text-foreground/60">
                        {item.icon}
                      </div>
                      <span className="text-sm text-[#1C3D5A] dark:text-foreground">{item.text}</span>
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Contato de Emergência */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
                className="mt-6 bg-[#1C3D5A] rounded-xl p-6 text-white"
              >
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Dúvidas sobre o preparo?
                </h4>
                <p className="text-white/70 text-sm mb-4">
                  Se tiver qualquer dúvida sobre as orientações pré-operatórias, entre em contato:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <a
                    href={getWhatsAppUrl({ page: "pre-operatorio" })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/15 rounded-lg p-3 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#25D366]" />
                    <div>
                      <p className="text-sm font-medium">WhatsApp (apenas mensagens)</p>
                      <p className="text-xs text-white/50">(11) 98112-4455</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3">
                    <Phone className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="text-sm font-medium">Telefone (agendamento)</p>
                      <p className="text-xs text-white/50">Clinovi: (11) 3382-1529 | Campinas: (19) 2127-2900 | WhatsApp Campinas: (19) 99855-9890</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Referências */}
      <section className="py-8 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h3 className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground/40 uppercase tracking-wider mb-3">Referências</h3>
          <ol className="text-xs text-[#1C3D5A] dark:text-foreground/40 space-y-1.5 list-decimal list-inside">
            <li>ASA — Practice Guidelines for Preoperative Fasting and the Use of Pharmacologic Agents to Reduce the Risk of Pulmonary Aspiration. Anesthesiology, 2023.</li>
            <li>Peri-operative fasting in adults: an international, multidisciplinary consensus statement. Anaesthesia, 2026.</li>
            <li>ESAIC — Perioperative Fasting: Guidelines for Adults and Children. European Society of Anaesthesiology and Intensive Care, 2022.</li>
            <li>EAU Guidelines on Urological Infections — Perioperative Antibacterial Prophylaxis. European Association of Urology, 2025.</li>
            <li>EAU Guidelines on Thromboprophylaxis in Urological Surgery. European Association of Urology, 2025.</li>
            <li>Azhar RA, et al. Enhanced recovery after urological surgery: a contemporary systematic review. Eur Urol. 2016;70(1):176-187.</li>
            <li>Cerantola Y, et al. Guidelines for perioperative care after radical cystectomy for bladder cancer: ERAS Society recommendations. Clin Nutr. 2013;32(6):879-887.</li>
            <li>Culkin DJ, et al. Anticoagulation and antiplatelet therapy in urological practice: ICUD/AUA review paper. J Urol. 2014;192(4):1026-1034.</li>
            <li>Dimitropoulos K, et al. Perioperative antithrombotic therapy in urological practice: a critical assessment. World J Urol. 2020;38:3191-3203.</li>
            <li>Vukovic N, Dinic L. Enhanced Recovery After Surgery Protocols in Major Urologic Surgery. Front Med. 2018;5:93.</li>
            <li>AUA — Optimizing Outcomes in Urological Surgery: Pre-Operative Care for the Patient Undergoing Urologic Surgery or Procedure. 2024.</li>
          </ol>
        </div>
      </section>
    </EducationalLayout>
  );
}
