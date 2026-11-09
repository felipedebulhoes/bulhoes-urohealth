/**
 * Landing Page: Cálculos Renais e Litotripsia a Laser (/litotripsia-calculo-renal)
 * Padrão de Conversão inspirado em /preenchimento-peniano
 */
import { Clock, ShieldCheck, Zap } from "lucide-react";
import AreaLandingPageTemplate, {
  type AreaLandingPageConfig,
} from "@/components/AreaLandingPageTemplate";

const config: AreaLandingPageConfig = {
  campaignSlug: "litotripsia-calculo-renal",
  path: "/litotripsia-calculo-renal",
  pageTitle: "Cirurgia de Pedra no Rim em São Paulo | Dr. Felipe de Bulhões",
  pageDescription:
    "Tratamento especializado de cálculos renais (pedra nos rins) e ureterais em São Paulo e Campinas. Litotripsia a laser flexível sem cortes, alívio rápido da cólica renal e prevenção metabólica.",
  medicalCondition: "Litíase Urinária (Cálculo Renal e Ureteral)",
  heroBadge: "Endourologia Avançada · Ureteroscopia Flexível e Laser",
  heroTitle: "Cálculos Renais e Litotripsia a Laser",
  heroSubtitleHtml: (
    <>
      Tratamento minimamente invasivo de{" "}
      <strong className="text-white font-semibold">pedras nos rins e no ureter</strong> com
      ureterorrenololitotripsia flexível a laser (Holmium / Thulium) —{" "}
      <strong className="text-white font-semibold">100% sem cortes externos</strong>, alta
      hospitalar precoce e investigação metabólica para evitar novas crises em{" "}
      <strong className="text-white font-semibold">São Paulo</strong> e{" "}
      <strong className="text-white font-semibold">Campinas</strong>.
    </>
  ),
  heroHighlights: [
    {
      icon: Zap,
      title: "Pulverização a Laser",
      desc: "Fragmentação completa em micropartículas (dusting) sem incisões",
    },
    {
      icon: Clock,
      title: "Alta em até 24h",
      desc: "Procedimento endoscópico com rápido retorno às atividades",
    },
    {
      icon: ShieldCheck,
      title: "Prevenção de Recidiva",
      desc: "Investigação metabólica para impedir a formação de novas pedras",
    },
  ],
  synthesisCard: {
    eyebrow: "Síntese em Endourologia",
    title: "Resolução definitiva sem cortes e com proteção renal",
    items: [
      {
        title: "Ureteroscopia Flexível Digital de Alta Definição",
        desc: "Microcâmeras flexíveis alcançam todos os cálices do rim pelo canal natural da urina, permitindo tratar múltiplos cálculos na mesma sessão.",
      },
      {
        title: "Tecnologia Laser (Dusting & Fragmentation)",
        desc: "A fibra de laser transforma o cálculo em pó finíssimo eliminado naturalmente na urina ou em fragmentos retirados no ato cirúrgico.",
      },
      {
        title: "Avaliação de Urgência vs. Tratamento Eletivo Planejado",
        desc: "Orientação precisa sobre quando o cálculo pode sair espontaneamente com medicação expulsiva e quando exige desobstrução para proteger o rim.",
      },
      {
        title: "Protocolo de Conforto com Cateter Duplo J",
        desc: "Uso criterioso de stents ureterais biocompatíveis pelo menor tempo necessário e prescrição específica para minimizar sintomas irritativos.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Tecnologia Endourológica",
    title: "Como funciona a cirurgia a laser para cálculo renal?",
    intro:
      "Esqueça as grandes incisões cirúrgicas do passado. Hoje, mais de 95% dos cálculos renais e ureterais são resolvidos por via endoscópica (pelos orifícios naturais) ou por microacesso percutâneo guiado por imagem.",
    cards: [
      {
        title: "Ureterorrenololitotripsia Flexível a Laser (RIRS)",
        paragraphs: [
          "Sob anestesia segura, introduzimos um aparelho ultrafino e flexível pela uretra, passando pela bexiga e pelo ureter até chegar diretamente ao rim — sem nenhum corte na pele.",
          "Com visão direta em alta definição, acionamos a fibra de laser sobre o cálculo até pulverizá-lo completamente, preservando o tecido renal saudável ao redor.",
        ],
        footer:
          "Padrão-ouro internacional (EAU/AUA) para cálculos ureterais e renais de até 20 mm.",
      },
      {
        title: "Mini-Percutânea (Mini-ECIRS) e Investigação Metabólica",
        paragraphs: [
          "Para cálculos renais muito volumosos (acima de 2 cm ou coraliformes), utilizamos a nefrolitotripsia percutânea miniaturizada combinada ao acesso flexível (ECIRS), garantindo altíssima taxa livre de cálculos em uma única abordagem.",
          "Após resolver a pedra, realizamos o estudo metabólico no sangue e na urina para identificar a causa (ácido úrico, cálcio, oxalato, baixo citrato) e blindar seus rins contra novas crises.",
        ],
        footer: "Hospitais credenciados de referência em São Paulo (Rede D'Or) e Campinas.",
      },
    ],
    metrics: [
      {
        metric: "Sem Cortes",
        label: "Acesso via canal natural",
        detail: "Ureteroscopia flexível e semirrígida realizada integralmente pela via uretral",
      },
      {
        metric: "12 a 24h",
        label: "Internação hospitalar",
        detail: "Procedimento de rápida recuperação com alta no mesmo dia ou na manhã seguinte",
      },
      {
        metric: ">90%",
        label: "Taxa livre de cálculos",
        detail: "Alta eficácia de resolução em sessão única com laser de alta potência",
      },
      {
        metric: "-60% Recidiva",
        label: "Com prevenção metabólica",
        detail: "Ajuste alimentar e medicamentoso reduz drasticamente a formação de novas pedras",
      },
    ],
  },
  comparison: {
    navLabel: "Laser Flexível vs. Antigo",
    eyebrow: "Comparativo de Tratamentos para Pedra nos Rins",
    title: "Litotripsia Endoscópica a Laser vs. Litotripsia Externa Antiga (LECO) ou Espera Prolongada",
    intro:
      "A escolha da técnica correta evita múltiplos procedimentos malsucedidos, idas repetidas ao pronto-socorro de madrugada e perda silenciosa da função de filtração do rim:",
    modernLabel: "Ureteroscopia Flexível a Laser (Padrão Atual)",
    conventionalLabel: "Litotripsia Externa (LECO) ou Conduta Passiva",
    rows: [
      {
        criterion: "Visualização e Precisão na Fragmentação",
        modernApproach:
          "Visão direta em alta definição: o urologista vê a pedra em tempo real e aplica o laser diretamente até pulverizá-la por completo.",
        conventionalApproach:
          "Na litotripsia externa por ondas de choque (LECO), os disparos são externos e cálculos duros (como oxalato de cálcio monohidratado) frequentemente não quebram.",
      },
      {
        criterion: "Risco de Nova Cólica Renal Pós-Procedimento",
        modernApproach:
          "Os fragmentos maiores são retirados com microcestas (dormia) e o restante vira pó fino, reduzindo drasticamente novas obstruções.",
        conventionalApproach:
          "Fragmentos grandes quebrados externamente podem descer juntos pelo ureter ('rua de cálculos'), provocando novas cólicas intensas.",
      },
      {
        criterion: "Resolução em Sessão Única",
        modernApproach:
          "Permite tratar simultaneamente pedras no ureter e em diferentes cálices do rim (inclusive cálice inferior) no mesmo procedimento.",
        conventionalApproach:
          "Frequentemente exige múltiplas sessões e apresenta baixa eficácia em cálculos do polo inferior do rim ou em pacientes com sobrepeso.",
      },
      {
        criterion: "Preservação da Função Renal",
        modernApproach:
          "Desobstrui imediatamente o rim dilatado (hidronefrose), restaurando o fluxo urinário e protegendo os néfrons.",
        conventionalApproach:
          "Aguardar meses pela saída espontânea de cálculos >6–7 mm pode levar à perda irreversível da função do rim obstruído.",
      },
    ],
    calloutTitle: "Tem um cálculo diagnosticado na tomografia ou no ultrassom?",
    calloutDescription:
      "Envie uma mensagem para avaliarmos o tamanho, a densidade (Unidades Hounsfield) e a posição exata da sua pedra.",
  },
  stepByStep: {
    eyebrow: "Do Diagnóstico à Prevenção",
    title: "Passo a passo do atendimento para Cálculo Renal",
    intro:
      "Seja para um cálculo descoberto em exame de rotina (antes de dar dor) ou após um episódio de cólica renal no pronto-socorro, organizamos sua jornada com agilidade:",
    steps: [
      {
        step: "01",
        title: "Avaliação da Tomografia e Função Renal",
        duration: "Consulta Inicial",
        description:
          "Analisamos na Tomografia (padrão-ouro) o tamanho em milímetros, a localização exata, a dureza do cálculo (densidade em UH) e se há dilatação renal.",
      },
      {
        step: "02",
        title: "Decisão: Terapia Expulsiva, Dissolução ou Laser",
        duration: "Planejamento",
        description:
          "Cálculos pequenos (<5 mm) ou de ácido úrico puro muitas vezes podem ser tratados clinicamente; cálculos maiores ou obstrutivos têm indicação de resolução a laser.",
      },
      {
        step: "03",
        title: "Procedimento Endoscópico a Laser Sem Cortes",
        duration: "45–60 minutos",
        description:
          "Realizado em centro cirúrgico sob anestesia confortável, utilizando ureteroscópio flexível digital e fibra de laser para pulverizar o cálculo.",
      },
      {
        step: "04",
        title: "Alta Precoce e Retorno Rápido à Rotina",
        duration: "Mesmo dia / 24h",
        description:
          "O paciente recebe alta hospitalar caminhando e alimentando-se normalmente, com receita otimizada para máximo conforto urinário.",
      },
      {
        step: "05",
        title: "Retirada Rápida do Cateter Duplo J (Quando Utilizado)",
        duration: "Em minutos",
        description:
          "Quando o stent protetor interno é necessário por poucos dias, sua retirada é rápida, simples e indolor.",
      },
      {
        step: "06",
        title: "Check-up Metabólico de Prevenção",
        duration: "30–60 dias",
        description:
          "Investigação laboratorial completa para corrigir as alterações da urina e evitar que você volte a formar novas pedras no futuro.",
      },
    ],
  },
  indicationsAndLimits: {
    eyebrow: "Critérios Clínicos e Sinais de Alerta",
    title: "Quando operar uma pedra no rim — e quando a urgência é imediata",
    intro:
      "Nem toda pedra exige cirurgia, mas saber exatamente quais cálculos não devem permanecer no rim evita emergências médicas e infecções graves.",
    indicationsTitle: "Quando a Litotripsia a Laser é Indicada",
    indications: [
      "Cálculos no ureter que não foram expelidos após período de tratamento medicamentoso ou que medem acima de 6–7 mm",
      "Pedras nos rins em crescimento progressivo nos exames de acompanhamento ou acima de 10 mm",
      "Cálculos renais que causam episódios recorrentes de dor lombar ou sangue na urina (hematúria)",
      "Pacientes com rim único, viagens frequentes, pilotos ou executivos que não podem correr risco de cólica aguda imprevista",
      "Falha de tratamentos anteriores ou presença de múltiplos cálculos bilaterais",
    ],
    limitsTitle: "Sinais de Alerta (Procure Atendimento Imediato)",
    limits: [
      "Cólica renal associada a febre (>37,8°C) ou calafrios — sinal de infecção em rim obstruído, que exige drenagem urgente",
      "Dor lombar intensa que não cede mesmo após medicação analgésica endovenosa",
      "Redução importante do volume de urina ou cálculo obstruindo rim único",
      "Piora da creatinina (função renal) no exame de sangue acompanhada de hidronefrose acentuada",
      "Náuseas e vômitos incoercíveis que impedem a hidratação e o uso de medicamentos por via oral",
    ],
    timelineTitle: "Linha do Tempo de Recuperação Pós-Ureteroscopia a Laser",
    timeline: [
      {
        period: "Primeiras 24h",
        title: "Alta hospitalar",
        desc: "Saída do hospital sem cortes ou curativos externos. Hidratação oral abundante para lavar a via urinária.",
      },
      {
        period: "Dias 2 a 5",
        title: "Retomada do trabalho",
        desc: "Retorno às atividades de escritório e rotina leve. Discreta ardência ao urinar é controlada com medicação específica.",
      },
      {
        period: "Dias 7 a 14",
        title: "Revisão e liberação plena",
        desc: "Retirada do cateter protetor (quando utilizado) e liberação completa para academia, corrida e viagens.",
      },
      {
        period: "Dia 30–60",
        title: "Blindagem metabólica",
        desc: "Avaliação de controle por imagem e início do protocolo personalizado para impedir novas pedras.",
      },
    ],
  },
  mythsAndFacts: [
    {
      myth: "“Pedra parada dentro do rim que não dói nunca precisa ser tratada.”",
      fact: "Enquanto está no cálice renal, a pedra geralmente não dói, mas pode crescer silenciosamente ou migrar de repente para o ureter, travando a passagem da urina. Cálculos acima de certos limites têm indicação de remoção eletiva planejada.",
    },
    {
      myth: "“Quem tem pedra nos rins deve cortar o leite, queijo e cálcio da dieta.”",
      fact: "Mito perigoso! Reduzir o cálcio alimentar aumenta a absorção de oxalato no intestino e eleva o risco de formar mais pedras (além de prejudicar os ossos). O segredo é aumentar a água, reduzir o sódio (sal) e equilibrar o citrato.",
    },
    {
      myth: "“Chá de quebra-pedra dissolve qualquer cálculo renal.”",
      fact: "O Phyllanthus niruri (quebra-pedra) pode auxiliar no relaxamento ureteral e inibir a agregação de novos cristais pequenos, mas não dissolve cálculos de oxalato de cálcio já formados e duros. Apenas cálculos de ácido úrico puro podem ser dissolvidos quimicamente com alcalinização médica da urina.",
    },
    {
      myth: "“A cirurgia de pedra no rim exige corte nas costas e longo afastamento.”",
      fact: "Com a ureteroscopia flexível a laser moderna, entramos pelo canal natural da urina sem nenhum corte, permitindo retorno ao trabalho em poucos dias.",
    },
  ],
  quiz: {
    title: "Avalie em 30 segundos o cenário do seu cálculo renal",
    question1Label: "Situação Atual",
    question1Prompt: "Qual é o seu quadro neste momento?",
    question1Options: [
      {
        id: "crise_recente",
        label: "Tive cólica renal recente / Pedra descendo no ureter",
        summaryText: "Avaliação Prioritária de Cálculo Ureteral / Alívio Obstrutivo",
      },
      {
        id: "achado_exame",
        label: "Descobri cálculo(s) no rim em ultrassom ou tomografia",
        summaryText: "Planejamento Eletivo de Litotripsia a Laser Sem Cortes",
      },
      {
        id: "recorrente",
        label: "Já tive várias pedras e quero tratamento + prevenção",
        summaryText: "Resolução Endourológica e Investigação Metabólica de Recidiva",
      },
    ],
    question2Label: "Exames Realizados",
    question2Prompt: "Você já possui exame de imagem recente?",
    question2Options: [
      { id: "tenho_tc", label: "Sim, já tenho Tomografia ou Ultrassom em mãos" },
      { id: "usar_duploj", label: "Já estou usando cateter Duplo J e preciso operar" },
      { id: "preciso_exames", label: "Ainda preciso solicitar exames na consulta" },
    ],
  },
  specialistFocusParagraph:
    "Especialista em Endourologia e Cirurgia Minimamente Invasiva com formação pelo Instituto D'Or (IDOR), o Dr. Felipe de Bulhões realiza procedimentos de alta precisão com ureteroscópios flexíveis digitais e tecnologia a laser nos principais hospitais de São Paulo e Campinas, aliando resolução cirúrgica eficiente à prevenção metabólica de longo prazo.",
  faqs: [
    {
      id: "faq-tamanho-pedra",
      category: "indicacoes",
      question: "A partir de qual tamanho a pedra no rim ou no ureter precisa de cirurgia a laser?",
      answer:
        "No ureter (canal entre o rim e a bexiga), cálculos até 4–5 mm têm boa chance de eliminação espontânea com medicação expulsiva, desde que a dor esteja controlada e não haja infecção. Acima de 6–7 mm, a taxa de passagem espontânea cai acentuadamente e a ureteroscopia a laser evita sofrimento e dano renal. Já dentro do rim, cálculos acima de 6–10 mm, sintomáticos ou em crescimento costumam ter indicação de tratamento planejado.",
    },
    {
      id: "faq-dissolver-pedra",
      category: "procedimento",
      question: "Existe algum remédio capaz de dissolver a pedra sem cirurgia?",
      answer:
        "Sim, mas exclusivamente quando o cálculo é composto por ácido úrico (identificado pela baixa densidade na tomografia, geralmente abaixo de 500 UH, e pH urinário ácido). Nesses casos, o protocolo médico de alcalinização urinária com citrato de potássio pode dissolver o cálculo. Já pedras de cálcio (80% dos casos) não dissolvem com remédios e, quando indicadas, são pulverizadas a laser.",
    },
    {
      id: "faq-duplo-j",
      category: "recuperacao",
      question: "Sempre é necessário colocar o cateter Duplo J após a cirurgia a laser?",
      answer:
        "Em muitos procedimentos endoscópicos utilizamos um cateter ureteral temporário (Duplo J) por alguns dias para garantir que o inchaço natural do ureter não bloqueie a passagem da urina após o laser. Utilizamos cateteres modernos e prescrevemos medicações específicas para minimizar o desconforto, retirando-o rapidamente assim que a via urinária cicatriza.",
    },
    {
      id: "faq-laser-doi",
      category: "seguranca",
      question: "O procedimento de litotripsia a laser dói?",
      answer:
        "Não. O procedimento é realizado em ambiente hospitalar sob anestesia (geral ou sedação/raqui), de modo que o paciente dorme durante toda a cirurgia e não sente nenhuma dor. Como não há cortes na pele, a recuperação pós-operatória é muito tranquila.",
    },
    {
      id: "faq-voltar-trabalhar",
      category: "recuperacao",
      question: "Quanto tempo depois da cirurgia a laser posso voltar a trabalhar?",
      answer:
        "A maioria dos pacientes recebe alta em até 24 horas e pode retomar atividades de escritório ou home office entre 2 e 4 dias após o procedimento.",
    },
  ],
  references: {
    guideLinkHref: "/educativo/calculos-renais",
    guideLinkLabel: "Ler guia completo sobre Cálculos Renais",
    items: [
      "European Association of Urology (EAU) Guidelines on Urolithiasis — Endourological Management and Metabolic Evaluation, 2025.",
      "American Urological Association (AUA) / Endourological Society Guideline: Surgical Management of Stones.",
      "Sociedade Brasileira de Urologia (SBU) — Recomendações em Litíase Urinária e Ureterorrenololitotripsia Flexível.",
    ],
  },
  relatedLinks: [
    { href: "/educativo/litotripsia-laser", label: "Como Funciona a Litotripsia a Laser" },
    { href: "/educativo/calculos-renais", label: "Prevenção de Pedra nos Rins" },
    { href: "/cirurgia-robotica-urologia", label: "Cirurgias Minimamente Invasivas" },
  ],
};

export default function LitotripsiaCalculoRenal() {
  return <AreaLandingPageTemplate config={config} />;
}
