/**
 * Landing Page: Uro-Oncologia e Cirurgia Oncológica Urológica (/uro-oncologia)
 * Padrão de Conversão inspirado em /preenchimento-peniano
 */
import { Clock, ShieldCheck, Scan } from "lucide-react";
import AreaLandingPageTemplate, {
  type AreaLandingPageConfig,
} from "@/components/AreaLandingPageTemplate";

const config: AreaLandingPageConfig = {
  campaignSlug: "uro-oncologia",
  path: "/uro-oncologia",
  pageTitle: "Uro-Oncologia em SP e Campinas: Próstata, Rim e Bexiga | Dr. Felipe de Bulhões",
  pageDescription:
    "Diagnóstico e tratamento cirúrgico de tumores urológicos (câncer de próstata, rim, bexiga e testículo) em São Paulo e Campinas. Cirurgia robótica, precisão oncológica e cuidado acolhedor.",
  medicalCondition: "Neoplasias Urológicas (Câncer de Próstata, Rim, Bexiga e Testículo)",
  heroBadge: "Uro-Oncologia · Protocolos Internacionais EAU, AUA e NCCN",
  heroTitle: "Uro-Oncologia: Diagnóstico Preciso e Cirurgia Oncológica Minimamente Invasiva",
  heroSubtitleHtml: (
    <>
      Cuidado especializado, ágil e humanizado para diagnóstico, estadiamento e tratamento cirúrgico
      de <strong className="text-white font-semibold">tumores de próstata, rim, bexiga e testículo</strong>{" "}
      — unindo <strong className="text-white font-semibold">cirurgia robótica</strong>, rigor
      oncológico e preservação da qualidade de vida em{" "}
      <strong className="text-white font-semibold">São Paulo</strong> e{" "}
      <strong className="text-white font-semibold">Campinas</strong>.
    </>
  ),
  heroHighlights: [
    {
      icon: Scan,
      title: "Estadiamento de Alta Precisão",
      desc: "Ressonância Multiparamétrica, PET-CT PSMA e Biópsia com Fusão",
    },
    {
      icon: ShieldCheck,
      title: "Cirurgia Poupadora e Robótica",
      desc: "Foco no controle oncológico com máxima preservação funcional",
    },
    {
      icon: Clock,
      title: "Prioridade de Agenda",
      desc: "Acolhimento rápido para casos suspeitos ou recém-diagnosticados",
    },
  ],
  synthesisCard: {
    eyebrow: "Síntese em Uro-Oncologia",
    title: "Ciência de ponta e serenidade para o momento mais importante",
    items: [
      {
        title: "Estratificação de Risco Individualizada (Sem Supertratamento)",
        desc: "Nem todo tumor de próstata ou pequeno nódulo renal precisa de cirurgia imediata: diferenciamos com rigor os casos para Vigilância Ativa daqueles que exigem tratamento curativo.",
      },
      {
        title: "Domínio em Cirurgia Robótica e Endoscópica Oncológica",
        desc: "Prostatectomia radical robótica com preservação neurovascular, nefrectomia parcial poupadora de rim e ressecção endoscópica em bloco de tumores de bexiga (RTU).",
      },
      {
        title: "Integração Multidisciplinar (Tumor Board)",
        desc: "Quando o caso requer abordagem combinada, trabalhamos em sintonia direta com oncologistas clínicos, radioterapeutas, radiologistas e patologistas de referência.",
      },
      {
        title: "Acompanhamento Próximo e Acessível à Família",
        desc: "Receber um diagnóstico oncológico gera dúvidas legítimas. Dedicamos tempo para explicar cada exame ao paciente e seus familiares com clareza e empatia.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Abordagem por Órgão e Estadiamento",
    title: "Como atuamos nos principais tumores urológicos?",
    intro:
      "Os tumores do trato geniturinário apresentam altíssimas taxas de cura quando diagnosticados precocemente e tratados segundo os protocolos internacionais da European Association of Urology (EAU), American Urological Association (AUA) e NCCN.",
    cards: [
      {
        title: "Câncer de Próstata e Tumores Renais",
        paragraphs: [
          "No Câncer de Próstata, utilizamos a Ressonância Multiparamétrica, biópsia guiada por fusão e PET-PSMA para planejar desde a Vigilância Ativa (em tumores indolentes ISUP 1) até a Prostatectomia Radical Robótica com dissecção anatômica preservadora dos nervos da ereção e do esfíncter.",
          "Nos Tumores de Rim (frequentemente descobertos por acaso em ultrassom ou tomografia), priorizamos a Nefrectomia Parcial Robótica ou Laparoscópica — removendo exclusivamente o tumor com margem oncológica segura e preservando o restante do rim funcionante.",
        ],
        footer: "Alta taxa de controle oncológico e preservação da função renal e urinária.",
      },
      {
        title: "Câncer de Bexiga, Urotélio Superior e Testículo",
        paragraphs: [
          "A presença de sangue na urina (hematúria, mesmo que ocorra uma única vez e sem dor) exige investigação imediata da bexiga e das vias excretoras. Realizamos a Cistoscopia diagnóstica e a Ressecção Transuretral de Bexiga (RTU) detalhada com amostragem muscular, além de protocolos de imunoterapia intravesical (BCG).",
          "Em nódulos testiculares em homens jovens, garantimos avaliação prioritária para diagnóstico rápido, estadiamento por marcadores séricos e tratamento cirúrgico com preservação estética e reprodutiva.",
        ],
        footer: "Atuação em centros hospitalares de alta complexidade em SP e Campinas.",
      },
    ],
    metrics: [
      {
        metric: "> 95%",
        label: "Sobrevida em 5 anos",
        detail: "Em tumores de próstata, rim e testículo diagnosticados em estágio localizado",
      },
      {
        metric: "100% Individual",
        label: "Decisão terapêutica",
        detail: "Baseada em grau histológico (ISUP/Gleason), imagem avançada e perfil clínico",
      },
      {
        metric: "Robótica 3D",
        label: "Padrão cirúrgico",
        detail: "Menor trauma cirúrgico, recuperação rápida e preservação funcional otimizada",
      },
      {
        metric: "Prioritário",
        label: "Encaixe diagnóstico",
        detail: "Fluxo ágil para pacientes com biópsia positiva, hematúria ou nódulo suspeito",
      },
    ],
  },
  comparison: {
    navLabel: "Oncologia de Precisão",
    eyebrow: "Evolução na Uro-Oncologia",
    title: "Medicina Oncológica de Precisão vs. Abordagem Padronizada Antiga",
    intro:
      "A uro-oncologia moderna abandonou as condutas únicas para todos os pacientes. Veja como a personalização protege sua saúde e sua qualidade de vida:",
    modernLabel: "Uro-Oncologia Moderna de Precisão",
    conventionalLabel: "Conduta Antiga Não Estratificada",
    rows: [
      {
        criterion: "Diagnóstico e Indicação de Biópsia Prostática",
        modernApproach:
          "Ressonância Multiparamétrica prévia e biópsia dirigida às áreas suspeitas (PI-RADS 4/5), preferencialmente com técnica segura que reduz o risco infeccioso.",
        conventionalApproach:
          "Biópsias aleatórias repetidas apenas por pequenas oscilações do PSA, sem mapeamento prévio por imagem.",
      },
      {
        criterion: "Tratamento de Tumores de Próstata de Muito Baixo Risco",
        modernApproach:
          "Protocolo estruturado de Vigilância Ativa para tumores indolentes selecionados (Gleason 6 / ISUP 1 de pequeno volume), poupando o paciente de efeitos colaterais.",
        conventionalApproach:
          "Cirurgia radical imediata para qualquer achado microscópico, sem estratificação de agressividade biológica.",
      },
      {
        criterion: "Abordagem dos Tumores Renais",
        modernApproach:
          "Nefrectomia Parcial Robótica/Laparoscópica sempre que viável, preservando néfrons e evitando insuficiência renal crônica no futuro.",
        conventionalApproach:
          "Nefrectomia radical (retirada de todo o rim) mesmo para nódulos pequenos de 2 a 4 cm.",
      },
      {
        criterion: "Qualidade da Ressecção no Câncer de Bexiga (RTU)",
        modernApproach:
          "Ressecção endoscópica completa com representação da camada muscular (detrusor) e Re-RTU programada conforme diretrizes internacionais.",
        conventionalApproach:
          "Raspagens incompletas sem amostragem muscular adequada, elevando o risco de subestadiamento e recidiva precoce.",
      },
    ],
    calloutTitle: "Tem uma biópsia recente, nódulo no rim/próstata ou sangue na urina?",
    calloutDescription:
      "Nossa equipe prioriza o agendamento de pacientes em investigação ou definição de tratamento oncológico.",
  },
  stepByStep: {
    eyebrow: "Caminho Claro e Seguro",
    title: "As 6 etapas do cuidado em Uro-Oncologia",
    intro:
      "Substituímos a incerteza por um plano de ação estruturado, transparente e baseado nas melhores evidências médicas disponíveis.",
    steps: [
      {
        step: "01",
        title: "Consulta de Acolhimento e Revisão Detalhada",
        duration: "Prioritária",
        description:
          "Analisamos cada linha do seu laudo anatomopatológico (biópsia), exames de sangue e imagens (Ressonância, Tomografia ou PET-PSMA) sem pressa.",
      },
      {
        step: "02",
        title: "Estadiamento Completo e Estratificação de Risco",
        duration: "Precisão",
        description:
          "Classificamos o estadiamento exato segundo as tabelas internacionais (EAU / NCCN) para confirmar se a doença é localizada e definir o potencial curativo.",
      },
      {
        step: "03",
        title: "Discussão Transparente das Opções Terapêuticas",
        duration: "Decisão Conjunta",
        description:
          "Apresentamos todas as opções indicadas para o seu caso (cirurgia robótica/minimamente invasiva, vigilância ativa, radioterapia ou terapia combinada), explicando prós e contras.",
      },
      {
        step: "04",
        title: "Planejamento Pré-Operatório Personalizado",
        duration: "Preparo",
        description:
          "Avaliação clínica pré-anestésica, suporte da equipe para autorizações hospitalares e orientação prévia para otimizar sua recuperação.",
      },
      {
        step: "05",
        title: "Tratamento Cirúrgico de Alta Tecnologia",
        duration: "Hospitalar",
        description:
          "Execução precisa do procedimento (Prostatectomia Robótica, Nefrectomia Parcial, RTU de Bexiga ou Orquiectomia) em hospitais de ponta em SP ou Campinas.",
      },
      {
        step: "06",
        title: "Seguimento Oncológico e Reabilitação Funcional",
        duration: "Longo Prazo",
        description:
          "Acompanhamento rigoroso com exames periódicos para confirmar o controle da doença e reabilitação dedicada da qualidade de vida.",
      },
    ],
  },
  indicationsAndLimits: {
    eyebrow: "Sinais de Atenção e Indicações",
    title: "Quando buscar avaliação especializada em Uro-Oncologia",
    intro:
      "Muitos tumores urológicos são silenciosos no início e descobertos em exames de rotina; outros dão sinais sutis que jamais devem ser ignorados.",
    indicationsTitle: "Situações que Indicam Consulta Especializada",
    indications: [
      "Biópsia de próstata positiva para adenocarcinoma (para definição entre cirurgia robótica, vigilância ativa ou outras terapias)",
      "Ressonância Magnética da próstata com lesão suspeita (PI-RADS 4 ou PI-RADS 5) ou elevação persistente do PSA",
      "Achado de nódulo sólido ou cisto complexo no rim (classificação Bosniak III ou IV) em ultrassom ou tomografia",
      "Presença de sangue na urina (hematúria visível a olho nu ou microscópica), especialmente em pacientes acima de 40 anos ou tabagistas/ex-tabagistas",
      "Pólipo ou vegetação na bexiga visto no ultrassom, ou nódulo endurecido / aumento indolor do testículo",
    ],
    limitsTitle: "Por que Não Adiar a Investigação",
    limits: [
      "O sangramento na urina (hematúria) costuma parar sozinho após 1 ou 2 dias, criando a falsa impressão de que era apenas uma 'infecção passageira' — nunca deixe de investigar",
      "Nódulos renais pequenos (<4 cm) têm altíssima chance de cirurgia poupadora do rim; esperar que cresçam pode tornar necessária a retirada completa do órgão",
      "No câncer de próstata localizado, operar no momento certo permite preservar os feixes nervosos da ereção com muito mais segurança",
      "Tumores testiculares têm crescimento rápido, mas apresentam taxas de cura próximas a 95–99% quando tratados prontamente",
      "Uma segunda opinião especializada ajuda a confirmar se sua cirurgia pode ser feita por via robótica/minimamente invasiva",
    ],
    timelineTitle: "Jornada de Cuidado e Recuperação Oncológica",
    timeline: [
      {
        period: "Semana 1",
        title: "Definição diagnóstica",
        desc: "Consulta detalhada, revisão de imagens/biópsia e definição clara do plano de tratamento sem atrasos.",
      },
      {
        period: "Internação (24–48h)",
        title: "Cirurgia minimamente invasiva",
        desc: "Nos procedimentos robóticos, laparoscópicos ou endoscópicos (RTU), a alta hospitalar ocorre geralmente em 1 a 2 dias.",
      },
      {
        period: "Dias 10 a 14",
        title: "Resultado anatomopatológico",
        desc: "Análise definitiva da peça cirúrgica em consulta presencial, confirmando margens e estadiamento final.",
      },
      {
        period: "Seguimento",
        title: "Vigilância e qualidade de vida",
        desc: "Protocolo estruturado de acompanhamento trimestral/semestral e reabilitação funcional completa.",
      },
    ],
  },
  mythsAndFacts: [
    {
      myth: "“Fazer biópsia de um tumor pode espalhar o câncer pelo corpo.”",
      fact: "Mito. As biópsias urológicas modernas (como a biópsia de próstata guiada por imagem) são procedimentos seguros e indispensáveis para identificar o tipo exato de célula e escolher o tratamento curativo correto.",
    },
    {
      myth: "“Todo diagnóstico de câncer de próstata exige cirurgia urgente no dia seguinte.”",
      fact: "A maioria dos tumores de próstata tem crescimento lento, o que permite realizar o estadiamento com calma, preparar o paciente adequadamente e escolher a melhor técnica (ou até mesmo Vigilância Ativa nos casos de muito baixo risco).",
    },
    {
      myth: "“Sangue na urina sem dor não é grave; só preocupa quando arde.”",
      fact: "É exatamente o oposto na urologia! Sangramento urinário acompanhado de ardência intensa costuma ser infecção ou cálculo, enquanto o sangramento indolor (hematúria silenciosa) é o principal sinal de alerta para pólipos ou tumores de bexiga e rim.",
    },
    {
      myth: "“Cisto simples no rim visto no ultrassom vira câncer.”",
      fact: "Cistos renais simples (classificação Bosniak I e II) são extremamente comuns com a idade e benignos. Apenas cistos complexos com septos espessos ou nódulos internos (Bosniak III e IV) exigem intervenção.",
    },
  ],
  quiz: {
    title: "Direcione sua avaliação em Uro-Oncologia em 30 segundos",
    question1Label: "Foco da Avaliação",
    question1Prompt: "Qual é a suspeita ou diagnóstico atual?",
    question1Options: [
      {
        id: "prostata_onco",
        label: "Câncer de Próstata (Biópsia positiva, PI-RADS 4/5 ou PSA)",
        summaryText: "Avaliação Oncológica e Cirurgia Robótica de Próstata",
      },
      {
        id: "rim_onco",
        label: "Nódulo / Tumor no Rim ou Cisto Renal Complexo",
        summaryText: "Planejamento de Nefrectomia Parcial / Tratamento de Tumor Renal",
      },
      {
        id: "bexiga_testiculo",
        label: "Tumor de Bexiga, Sangue na Urina (Hematúria) ou Testículo",
        summaryText: "Investigação e Tratamento de Bexiga / Hematúria / Testículo",
      },
    ],
    question2Label: "Etapa Atual",
    question2Prompt: "O que você busca na consulta com o Dr. Felipe?",
    question2Options: [
      { id: "definir_tratamento", label: "Acabei de receber o diagnóstico e preciso definir o tratamento" },
      { id: "segunda_opiniao", label: "Busco 2ª opinião especializada em Cirurgia Robótica" },
      { id: "investigar_exame", label: "Tenho exame de imagem ou sangue alterado para investigar" },
    ],
  },
  specialistFocusParagraph:
    "Formado em Urologia pelo Instituto D'Or de Ensino e Pesquisa (IDOR) em São Paulo e certificado em Pesquisa Clínica pela Harvard T.H. Chan School of Public Health (PPCR), o Dr. Felipe de Bulhões conduz o tratamento cirúrgico dos tumores urológicos seguindo rigorosamente as diretrizes da EAU, AUA e SBU — combinando precisão técnica à escuta acolhedora que o paciente oncológico e sua família merecem.",
  faqs: [
    {
      id: "faq-cura-cancer-prostata",
      category: "seguranca",
      question: "O câncer de próstata tem cura quando descoberto cedo?",
      answer:
        "Sim. Quando diagnosticado em fase localizada (restrito à próstata), as taxas de controle e cura ultrapassam 90% a 95%. Além disso, o diagnóstico precoce permite realizar a prostatectomia robótica com técnicas avançadas de preservação dos feixes neurovasculares e do esfíncter urinário.",
    },
    {
      id: "faq-vigilancia-ativa",
      category: "indicacoes",
      question: "O que é Vigilância Ativa e quem pode fazê-la com segurança?",
      answer:
        "A Vigilância Ativa é um protocolo médico rigoroso indicado para tumores de próstata de muito baixo ou baixo risco (geralmente Gleason 6 / ISUP 1 em poucos fragmentos e PSA baixo). Em vez de operar imediatamente, monitoramos o paciente com exames periódicos de PSA, Ressonância Multiparamétrica e biópsias de controle, intervindo apenas se houver qualquer sinal de progressão.",
    },
    {
      id: "faq-nodulo-rim",
      category: "procedimento",
      question: "Descobri um nódulo no rim em um exame de rotina. Preciso fazer biópsia antes de operar?",
      answer:
        "Diferente da próstata, na maioria dos nódulos renais sólidos com realce de contraste na tomografia ou ressonância, a imagem já fornece altíssima precisão diagnóstica para indicar a Nefrectomia Parcial (retirada direta do nódulo preservando o rim), sem necessidade de biópsia prévia — reservando-se a biópsia renal para casos específicos selecionados.",
    },
    {
      id: "faq-rtu-bexiga",
      category: "procedimento",
      question: "Como funciona a cirurgia para pólipo ou tumor na bexiga (RTU de Bexiga)?",
      answer:
        "O tratamento inicial do tumor de bexiga é a Ressecção Transuretral (RTU), realizada 100% pelo canal da urina com câmera endoscópica, sem cortes na barriga. O procedimento remove a lesão visível e coleta a base muscular para o patologista definir a profundidade exata, orientando se o controle será mantido apenas com acompanhamento/aplicações intravesicais (BCG) ou tratamentos adicionais.",
    },
    {
      id: "faq-rapidez-consulta",
      category: "recuperacao",
      question: "Consigo agendar consulta com prioridade para mostrar exames oncológicos?",
      answer:
        "Sim. Ao selecionar a opção 'Já Tenho Exames / 2ª Opinião' aqui na página e chamar nossa equipe no WhatsApp, identificamos a prioridade do caso para organizar seu atendimento presencial em São Paulo, Campinas ou por Teleconsulta no menor prazo possível.",
    },
  ],
  references: {
    guideLinkHref: "/educativo/cancer-prostata",
    guideLinkLabel: "Ler guia completo sobre Câncer de Próstata",
    items: [
      "European Association of Urology (EAU) Oncology Guidelines — Prostate Cancer, Renal Cell Carcinoma & Bladder Cancer, 2025.",
      "National Comprehensive Cancer Network (NCCN) Clinical Practice Guidelines in Oncology.",
      "American Urological Association (AUA) & Sociedade Brasileira de Urologia (SBU) — Diretrizes em Uro-Oncologia.",
    ],
  },
  relatedLinks: [
    { href: "/educativo/tratamento-cancer-prostata", label: "Tratamento do Câncer de Próstata" },
    { href: "/educativo/cancer-bexiga", label: "Guia sobre Câncer de Bexiga" },
    { href: "/educativo/biopsia-prostata", label: "Biópsia de Próstata" },
    { href: "/cirurgia-robotica-urologia", label: "Cirurgia Robótica" },
  ],
};

export default function UroOncologia() {
  return <AreaLandingPageTemplate config={config} />;
}
