/**
 * Landing Page: Cirurgia Robótica e Minimamente Invasiva em Urologia (/cirurgia-robotica-urologia)
 * Padrão de Conversão inspirado em /preenchimento-peniano
 */
import { Clock, ShieldCheck, Microscope } from "lucide-react";
import AreaLandingPageTemplate, {
  type AreaLandingPageConfig,
} from "@/components/AreaLandingPageTemplate";

const config: AreaLandingPageConfig = {
  campaignSlug: "cirurgia-robotica-urologia",
  path: "/cirurgia-robotica-urologia",
  pageTitle: "Cirurgia Robótica em Urologia em SP e Campinas | Dr. Felipe de Bulhões",
  pageDescription:
    "Cirurgia robótica e videolaparoscópica em urologia em São Paulo e Campinas. Prostatectomia robótica, nefrectomia parcial e reconstruções com visão 3D, precisão milimétrica e rápida recuperação.",
  medicalCondition: "Cirurgia Urológica Minimamente Invasiva e Robótica",
  heroBadge: "Tecnologia Cirúrgica · Visão 3D HD e Preservação Funcional",
  heroTitle: "Cirurgia Robótica e Minimamente Invasiva em Urologia",
  heroSubtitleHtml: (
    <>
      Procedimentos urológicos de alta precisão com{" "}
      <strong className="text-white font-semibold">tecnologia robótica e videolaparoscópica</strong>{" "}
      para tratamento de tumores de próstata, rim, bexiga e reconstruções do trato urinário —
      priorizando <strong className="text-white font-semibold">preservação funcional</strong>,
      mínimo sangramento e rápida recuperação em{" "}
      <strong className="text-white font-semibold">São Paulo</strong> e{" "}
      <strong className="text-white font-semibold">Campinas</strong>.
    </>
  ),
  heroHighlights: [
    {
      icon: Microscope,
      title: "Visão 3D Aumentada 10x",
      desc: "Identificação milimétrica de nervos da ereção e esfíncter urinário",
    },
    {
      icon: ShieldCheck,
      title: "Pinças Articuladas 360°",
      desc: "Filtro de tremor e movimentos impossíveis à mão humana ou laparoscopia rígida",
    },
    {
      icon: Clock,
      title: "Alta em 24 a 48 Horas",
      desc: "Microincisões com menos dor pós-operatória e retorno precoce à rotina",
    },
  ],
  synthesisCard: {
    eyebrow: "Síntese em Cirurgia Robótica",
    title: "Por que a cirurgia robótica transformou a urologia?",
    items: [
      {
        title: "O Cirurgião 100% no Comando em Tempo Real",
        desc: "O robô não opera sozinho: cada movimento das microinstrumentações reproduz com perfeição e sem tremores a mão do urologista no console.",
      },
      {
        title: "Preservação Neurovascular na Prostatectomia",
        desc: "A magnificação óptica 3D permite dissecar delicadamente os feixes vasculonervosos responsáveis pela potência sexual e continência urinária.",
      },
      {
        title: "Salvação do Rim na Nefrectomia Parcial",
        desc: "Em tumores renais, a agilidade de sutura robótica permite remover apenas o nódulo tumoral e preservar todo o restante do rim saudável.",
      },
      {
        title: "Hospitais de Excelência em SP e Campinas",
        desc: "Atuação em centros cirúrgicos equipados com plataformas robóticas de última geração (Rede D'Or São Luiz e hospitais de referência).",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Precisão Cirúrgica Submilimétrica",
    title: "Como funciona a cirurgia robótica urológica?",
    intro:
      "A pelve masculina e o retroperitônio são regiões profundas e delicadas, cercadas por nervos microscópicos e vasos calibrosos. A plataforma robótica permite operar nesses espaços estreitos através de pequenos portais de 8 mm com precisão inigualável.",
    cards: [
      {
        title: "Prostatectomia Radical Robótica (Preservação Funcional)",
        paragraphs: [
          "No tratamento cirúrgico do câncer de próstata localizado, o grande desafio é conciliar a remoção completa do tumor (controle oncológico) com a preservação do esfíncter urinário e dos nervos cavernosos.",
          "Com a câmera 3D de alta definição ampliada em até 10 a 15 vezes e pinças articuladas EndoWrist, realizamos a dissecção intrafascial ou interfascial milimétrica e uma anastomose (costura entre bexiga e uretra) hermética e precisa.",
        ],
        footer: "Menor tempo de sonda vesical e recuperação acelerada da continência urinária.",
      },
      {
        title: "Nefrectomia Parcial Robótica e Pieloplastia",
        paragraphs: [
          "Diante de um tumor renal, o objetivo moderno não é retirar o rim inteiro, mas realizar a Nefrectomia Parcial (cirurgia poupadora de néfrons).",
          "A articulação robótica permite ressecar o tumor com margem segura e reconstruir o parênquima renal em poucos minutos (reduzindo o tempo de isquemia quente), além de ser o padrão-ouro para correção de estenose de JUP (pieloplastia) e cirurgias adrenais.",
        ],
        footer: "Preservação máxima da taxa de filtração glomerular e menor sangramento.",
      },
    ],
    metrics: [
      {
        metric: "10x a 15x",
        label: "Ampliação visual 3D HD",
        detail: "Visão tridimensional imersiva das estruturas anatômicas mais delicadas",
      },
      {
        metric: "< 5%",
        label: "Taxa de transfusão",
        detail: "Controle hemostático rigoroso e perda sanguínea drasticamente reduzida",
      },
      {
        metric: "24 a 48h",
        label: "Permanência hospitalar",
        detail: "Mobilização precoce no mesmo dia e alta hospitalar rápida na maioria dos casos",
      },
      {
        metric: "8 mm",
        label: "Microincisões cirúrgicas",
        detail: "Menor trauma na parede abdominal, menos dor e excelente cicatrização",
      },
    ],
  },
  comparison: {
    navLabel: "Robótica vs. Aberta",
    eyebrow: "Comparativo de Modalidades Cirúrgicas",
    title: "Cirurgia Robótica vs. Cirurgia Aberta Convencional e Laparoscopia Clássica",
    intro:
      "Compreenda de forma objetiva os ganhos técnicos e clínicos proporcionados pela evolução da cirurgia assistida por robô:",
    modernLabel: "Cirurgia Assistida por Robô (Padrão-Ouro)",
    conventionalLabel: "Cirurgia Aberta / Laparoscopia Rígida",
    rows: [
      {
        criterion: "Qualidade de Visão Anatômica",
        modernApproach:
          "Visão tridimensional (3D) de alta definição com profundidade real e zoom de até 15 vezes, controlada pelo próprio cirurgião.",
        conventionalApproach:
          "Visão a olho nu em cavidade profunda (cirurgia aberta) ou visão bidimensional 2D sem percepção de profundidade (laparoscopia convencional).",
      },
      {
        criterion: "Amplitude de Movimento e Ergonomia",
        modernApproach:
          "Pinças com 7 graus de liberdade que giram 540° (mais que o punho humano) e filtragem eletrônica total de qualquer tremor fisiológico.",
        conventionalApproach:
          "Pinças laparoscópicas longas e rígidas com efeito alavanca limitado para suturas delicadas no fundo da pelve.",
      },
      {
        criterion: "Recuperação da Continência e Ereção",
        modernApproach:
          "Dissecção anatômica precisa do colo vesical, uretra membranosa e feixes neurovasculares, favorecendo reabilitação funcional mais rápida.",
        conventionalApproach:
          "Maior tração tecidual e sangramento no campo operatório podem dificultar a visualização fina dos feixes nervosos.",
      },
      {
        criterion: "Dor Pós-Operatória e Retorno à Rotina",
        modernApproach:
          "Pequenos portais milimétricos, menor uso de analgésicos, caminhada no mesmo dia e retorno precoce ao trabalho.",
        conventionalApproach:
          "Incisão abdominal ampla na cirurgia aberta, com maior dor pós-operatória, risco de infecção de ferida e recuperação mais lenta.",
      },
    ],
    calloutTitle: "Recebeu indicação cirúrgica para próstata, rim ou trato urinário?",
    calloutDescription:
      "Agende uma consulta presencial ou por telemedicina para avaliar o planejamento cirúrgico robótico ou minimamente invasivo.",
  },
  stepByStep: {
    eyebrow: "Planejamento Cirúrgico de Excelência",
    title: "Como funciona a jornada da Cirurgia Robótica com nossa equipe",
    intro:
      "Uma cirurgia de alta complexidade exige preparação minuciosa antes, durante e depois do centro cirúrgico para garantir máxima segurança.",
    steps: [
      {
        step: "01",
        title: "Consulta de Planejamento e Revisão de Imagens",
        duration: "Pré-operatório",
        description:
          "Análise detalhada da Ressonância Multiparamétrica, Tomografia ou PET-PSMA para desenhar a estratégia exata de preservação nervosa ou renal.",
      },
      {
        step: "02",
        title: "Preparo Cardiopulmonar e Fisioterapia Pélvica Prévia",
        duration: "Otimização",
        description:
          "Avaliação pré-anestésica criteriosa e orientação precoce da musculatura pélvica para acelerar o controle urinário no pós-operatório.",
      },
      {
        step: "03",
        title: "Procedimento em Hospital de Referência",
        duration: "2 a 3 horas",
        description:
          "Cirurgia realizada em centro cirúrgico acreditado em São Paulo ou Campinas, com equipe anestésica e urológica dedicada.",
      },
      {
        step: "04",
        title: "Recuperação Acelerada (Protocolo ERAS)",
        duration: "24 a 48 horas",
        description:
          "Dieta leve e caminhada assistida já nas primeiras horas após o procedimento, com alta hospitalar precoce e segura.",
      },
      {
        step: "05",
        title: "Retirada de Sonda e Revisão Pós-Operatória",
        duration: "7 a 10 dias",
        description:
          "Acompanhamento próximo em consultório para revisão das microincisões, retirada da sonda (quando aplicável) e análise da patologia.",
      },
      {
        step: "06",
        title: "Programa de Reabilitação Funcional e Seguimento",
        duration: "Contínuo",
        description:
          "Protocolo estruturado de reabilitação peniana/urinária e monitoramento periódico para sua total tranquilidade.",
      },
    ],
  },
  indicationsAndLimits: {
    eyebrow: "Principais Procedimentos",
    title: "Quando a Cirurgia Robótica e Laparoscópica é indicada",
    intro:
      "A cirurgia minimamente invasiva é hoje a via preferencial para a grande maioria das cirurgias oncológicas e reconstrutivas da urologia moderna.",
    indicationsTitle: "Cirurgias Realizadas por Via Robótica / Laparoscópica",
    indications: [
      "Prostatectomia Radical Robótica para tratamento do câncer de próstata localizado ou localmente avançado",
      "Nefrectomia Parcial Robótica (retirada apenas do tumor preservando o rim) e Nefrectomia Radical",
      "Pieloplastia Robótica / Laparoscópica para correção de estenose da junção ureteropiélica (JUP)",
      "Adrenalectomia Minimamente Invasiva para tumores da glândula suprarrenal (adrenal)",
      "Prostatectomia Simples Robótica para próstatas benignas extremamente volumosas e Cistectomia / Reimplante Ureteral",
    ],
    limitsTitle: "Critérios de Segurança e Avaliação Individual",
    limits: [
      "Cada caso passa por estratificação de risco anestésico e cardiológico antes da definição da via cirúrgica",
      "Cirurgias abdominais múltiplas prévias com aderências severas são avaliadas individualmente para posicionamento seguro dos portais",
      "A indicação de preservação dos feixes neurovasculares depende do estadiamento local do tumor na ressonância e na biópsia",
      "Tumores renais muito pequenos em pacientes frágeis podem, em casos selecionados, ser acompanhados em vigilância ativa",
      "O suporte pós-operatório e a adesão à reabilitação pélvica/sexual são fundamentais para o melhor resultado funcional",
    ],
    timelineTitle: "Linha do Tempo de Recuperação Pós-Cirurgia Robótica",
    timeline: [
      {
        period: "Dia 1 a 2",
        title: "Caminhada e Alta",
        desc: "Deambulação precoce no quarto hospitalar e alta para casa entre 24 e 48 horas na maioria dos casos.",
      },
      {
        period: "Dias 7 a 10",
        title: "Retorno ao trabalho leve",
        desc: "Primeira revisão em consultório. Atividades intelectuais, home office e caminhadas leves liberadas.",
      },
      {
        period: "Semanas 3 a 4",
        title: "Exercícios progressivos",
        desc: "Retorno gradual a exercícios aeróbicos e rotina plena conforme evolução da cicatrização interna.",
      },
      {
        period: "Meses 1 a 6",
        title: "Consolidação funcional",
        desc: "Acompanhamento dedicado da reabilitação funcional e controle laboratorial/oncológico.",
      },
    ],
  },
  mythsAndFacts: [
    {
      myth: "“Na cirurgia robótica, uma máquina opera de forma automática sem o médico.”",
      fact: "Mito absoluto. O robô não possui autonomia nem toma decisões: ele é um instrumento escravo de altíssima precisão que reproduz em tempo real cada movimento das mãos do cirurgião no console.",
    },
    {
      myth: "“A cirurgia aberta enxerga melhor o tumor do que a cirurgia por pequenos furos.”",
      fact: "Pelo contrário: na cirurgia robótica, a câmera 3D de alta definição entra a poucos centímetros da próstata ou do rim, ampliando a imagem em até 15 vezes e iluminando ângulos que o olho humano não alcança na cirurgia aberta.",
    },
    {
      myth: "“Pacientes mais velhos não podem fazer cirurgia robótica.”",
      fact: "Pacientes idosos estão entre os que mais se beneficiam da cirurgia minimamente invasiva, justamente por haver menor perda sanguínea, menor dor pós-operatória e mobilização muito mais rápida.",
    },
    {
      myth: "“Todo tumor no rim exige a retirada completa do órgão.”",
      fact: "Com a precisão da cirurgia robótica e videolaparoscópica, a grande maioria dos tumores renais T1 (e muitos T2 selecionados) é tratada com Nefrectomia Parcial, removendo apenas a lesão e preservando o rim.",
    },
  ],
  quiz: {
    title: "Planeje sua avaliação cirúrgica em 30 segundos",
    question1Label: "Procedimento / Diagnóstico",
    question1Prompt: "Qual condição motivou sua busca?",
    question1Options: [
      {
        id: "prostata",
        label: "Câncer de Próstata / Prostatectomia Robótica",
        summaryText: "Planejamento de Prostatectomia Robótica com Preservação Funcional",
      },
      {
        id: "rim",
        label: "Nódulo ou Tumor no Rim / Nefrectomia Parcial",
        summaryText: "Avaliação de Cirurgia Poupadora de Rim (Nefrectomia Parcial)",
      },
      {
        id: "reconstrucao",
        label: "Estenose de JUP, Adrenal ou 2ª Opinião Cirúrgica",
        summaryText: "Avaliação Especializada em Cirurgia Minimamente Invasiva",
      },
    ],
    question2Label: "Momento da Jornada",
    question2Prompt: "Em que etapa você está hoje?",
    question2Options: [
      { id: "biopsia_pronta", label: "Já tenho biópsia ou ressonância/tomografia concluída" },
      { id: "segunda_opiniao", label: "Busco segunda opinião sobre a melhor técnica cirúrgica" },
      { id: "investigacao", label: "Estou em investigação inicial de exame alterado" },
    ],
  },
  specialistFocusParagraph:
    "Com formação urológica no Instituto D'Or de Ensino e Pesquisa (IDOR) — um dos maiores centros de cirurgia robótica e uro-oncologia da América Latina — e título de especialista em Cirurgia Geral pelo Colégio Brasileiro de Cirurgiões (TCBC), o Dr. Felipe de Bulhões alia rigor técnico anatômico ao cuidado próximo e humanizado em todas as fases do tratamento cirúrgico.",
  faqs: [
    {
      id: "faq-quem-opera",
      category: "procedimento",
      question: "Quem realiza a cirurgia durante o procedimento robótico?",
      answer:
        "O próprio cirurgião urologista realiza 100% do procedimento no console robótico dentro da sala cirúrgica, acompanhado de um segundo cirurgião auxiliar ao lado do paciente e da equipe de anestesiologia. O sistema robótico traduz os movimentos das mãos do médico em movimentos submilimétricos nas micro-pinças internas, eliminando qualquer tremor.",
    },
    {
      id: "faq-vantagens-prostata",
      category: "seguranca",
      question: "Quais as principais vantagens da prostatectomia robótica para o paciente?",
      answer:
        "Os principais benefícios documentados incluem menor perda sanguínea, menor dor pós-operatória, menor tempo de internação (geralmente 24 a 48h), menor tempo de uso de sonda vesical e melhor visualização dos feixes neurovasculares e do esfíncter, favorecendo a recuperação mais precoce da continência urinária e da função erétil.",
    },
    {
      id: "faq-nefrectomia-parcial",
      category: "indicacoes",
      question: "Quando é possível retirar apenas o tumor e preservar o rim (Nefrectomia Parcial)?",
      answer:
        "Sempre que tecnicamente seguro do ponto de vista oncológico e anatômico, a Nefrectomia Parcial é o tratamento de escolha segundo as diretrizes da EAU e AUA. A cirurgia robótica facilita a remoção de tumores mesmo em posições complexas (como tumores hilares ou endofíticos) e realiza a sutura rápida do rim, preservando a função renal global.",
    },
    {
      id: "faq-hospitais-sp-campinas",
      category: "procedimento",
      question: "Em quais hospitais são realizadas as cirurgias robóticas e laparoscópicas?",
      answer:
        "Os procedimentos hospitalares são realizados em hospitais de excelência em São Paulo e em Campinas (incluindo unidades da Rede D'Or São Luiz e centros cirúrgicos de referência com infraestrutura completa de UTI, tecnologia robótica e vídeo 4K).",
    },
    {
      id: "faq-segunda-opiniao",
      category: "indicacoes",
      question: "Posso agendar uma consulta ou teleconsulta para segunda opinião cirúrgica?",
      answer:
        "Sim. Recebemos frequentemente pacientes que já possuem biópsia de próstata ou tomografia/ressonância de rim e desejam avaliar detalhadamente suas opções (vigilância ativa, cirurgia robótica, laparoscópica ou tratamentos focais) antes de tomar a decisão final.",
    },
  ],
  references: {
    guideLinkHref: "/educativo/cirurgia-robotica",
    guideLinkLabel: "Ler guia educativo sobre Cirurgia Robótica",
    items: [
      "European Association of Urology (EAU) Guidelines on Robotic and Minimally Invasive Urological Surgery, 2025.",
      "American Urological Association (AUA) Guidelines on Clinically Localized Prostate Cancer & Renal Mass.",
      "Sociedade Brasileira de Urologia (SBU) & Colégio Brasileiro de Cirurgiões (CBC) — Diretrizes em Cirurgia Robótica.",
    ],
  },
  relatedLinks: [
    { href: "/educativo/cirurgias-minimamente-invasivas", label: "Cirurgias Minimamente Invasivas" },
    { href: "/uro-oncologia", label: "Uro-Oncologia" },
    { href: "/saude-da-prostata", label: "Saúde da Próstata" },
  ],
};

export default function CirurgiaRoboticaUrologia() {
  return <AreaLandingPageTemplate config={config} />;
}
