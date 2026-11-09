/**
 * Landing Page: Estética Íntima Masculina e Cirurgia Genital Funcional (/estetica-intima-masculina)
 * Padrão de Conversão inspirado em /preenchimento-peniano
 */
import { Eye, ShieldCheck, UserCheck } from "lucide-react";
import AreaLandingPageTemplate, {
  type AreaLandingPageConfig,
} from "@/components/AreaLandingPageTemplate";

const config: AreaLandingPageConfig = {
  campaignSlug: "estetica-intima-masculina",
  path: "/estetica-intima-masculina",
  pageTitle: "Estética Íntima Masculina e Botox Peniano em SP e Campinas | Dr. Felipe de Bulhões",
  pageDescription:
    "Avaliação especializada em Estética Íntima Masculina com Urologista em São Paulo e Campinas. Preenchimento peniano com ácido hialurônico, Botox peniano (toxina botulínica), escrotoplastia, Peyronie e postectomia estética.",
  medicalCondition: "Estética Genital Masculina, Botox Peniano, Doença de Peyronie e Reconstrução Urológica",
  heroBadge: "Estética e Reconstrução Genital · Sigilo Médico Absoluto",
  heroTitle: "Estética Íntima Masculina e Harmonia Genital",
  heroSubtitleHtml: (
    <>
      Procedimentos urológicos estéticos e funcionais conduzidos por cirurgião urologista:{" "}
      <strong className="text-white font-semibold">
        preenchimento peniano com ácido hialurônico
      </strong>
      , <strong className="text-white font-semibold">Botox peniano e escrotal (toxina botulínica)</strong>,{" "}
      <strong className="text-white font-semibold">postectomia estética</strong>,{" "}
      <strong className="text-white font-semibold">escrotoplastia</strong> e correção de{" "}
      <strong className="text-white font-semibold">curvatura peniana (Peyronie)</strong> — com
      discrição total e expectativas realistas em{" "}
      <strong className="text-white font-semibold">São Paulo</strong> e{" "}
      <strong className="text-white font-semibold">Campinas</strong>.
    </>
  ),
  heroHighlights: [
    {
      icon: Eye,
      title: "Sigilo em 4 Camadas",
      desc: "Agendamento codificado e atendimento privado sem exposição na recepção",
    },
    {
      icon: ShieldCheck,
      title: "Precisão Anatômica",
      desc: "Procedimentos realizados exclusivamente por Urologista e Cirurgião (TCBC)",
    },
    {
      icon: UserCheck,
      title: "Protocolos Reversíveis",
      desc: "Ácido Hialurônico e Toxina Botulínica seguros, sem uso de PMMA",
    },
  ],
  synthesisCard: {
    eyebrow: "Síntese em Estética Urológica",
    title: "Harmonia estética sem comprometer a função erétil",
    items: [
      {
        title: "Preenchimento Peniano com Ácido Hialurônico",
        desc: "Ganho real de circunferência (espessura) e menor retração no estado flácido, em procedimento ambulatorial de 30–45 minutos sem cortes e reversível com hialuronidase.",
      },
      {
        title: "Botox Peniano e Escrotal (Toxina Botulínica)",
        desc: "Relaxamento seletivo da musculatura lisa (fáscia de Dartos e corpos cavernosos) para reduzir a retração peniana no estado flácido, suavizar a bolsa escrotal e favorecer o fluxo sanguíneo.",
      },
      {
        title: "Postectomia Estética, Frenuloplastia e Escrotoplastia",
        desc: "Remoção precisa do excesso de prepúcio, alongamento do freio curto e correção da prega peno-escrotal (webbed penis) com acabamento microcirúrgico.",
      },
      {
        title: "Tratamento da Curvatura Peniana (Doença de Peyronie e Congênita)",
        desc: "Abordagem clínica e cirúrgica especializada para restaurar o eixo funcional do pênis e a segurança na relação sexual.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Abordagem Médica Ética e Especializada",
    title: "Quais procedimentos compõem a Estética Íntima Masculina?",
    intro:
      "A insatisfação com a aparência genital ou alterações anatômicas adquiridas impactam diretamente a autoconfiança masculina e a qualidade da vida íntima. Na urologia moderna, tratamos essas queixas com rigor anatômico, segurança e total naturalidade.",
    cards: [
      {
        title: "Preenchimento com Ácido Hialurônico & Botox Peniano (Sinergia Não Cirúrgica)",
        paragraphs: [
          "Enquanto o Preenchimento Peniano com Ácido Hialurônico (depositado com microcânula entre as fáscias de Dartos e Buck) promove ganho imediato de circunferência (calibre), o Botox Peniano (Toxina Botulínica Tipo A) atua relaxando as fibras musculares lisas hiperativas da túnica de Dartos.",
          "Esse relaxamento muscular bloqueia o reflexo adrenérgico de encolhimento acentuado (muito comum no frio, estresse ou prática esportiva), proporcionando maior projeção e relaxamento no estado flácido e na bolsa escrotal (Scrotox), além de poder atuar como adjuvante vascular na qualidade erétil.",
        ],
        footer:
          "Ambos são realizados em consultório sob anestesia local em 20–40 minutos, de forma isolada ou combinada.",
      },
      {
        title: "Refinamento Cirúrgico: Postectomia, Escrotoplastia e Peyronie",
        paragraphs: [
          "Muitas queixas estéticas e funcionais decorrem de excesso de pele prepucial, cicatrizes inestéticas de cirurgias antigas, inserção alta da bolsa escrotal na haste peniana (penoscrotal webbing) ou curvaturas adquiridas (Doença de Peyronie).",
          "Com técnicas de cirurgia reconstrutiva urológica, corrigimos o contorno genital respeitando os planos vasculares e nervosos, com recuperação rápida e cicatrizes estrategicamente posicionadas.",
        ],
        footer: "Procedimentos ambulatoriais ou em regime de Hospital-Dia (alta no mesmo dia).",
      },
    ],
    metrics: [
      {
        metric: "100% Sigiloso",
        label: "Privacidade garantida",
        detail: "Atendimento codificado desde o WhatsApp até a sala médica privada",
      },
      {
        metric: "Sem PMMA",
        label: "Biocompatibilidade total",
        detail: "Uso exclusivo de materiais aprovados pela ANVISA e validados pelas diretrizes",
      },
      {
        metric: "Mesmo Dia",
        label: "Alta ambulatorial",
        detail: "Procedimentos realizados em consultório ou Day Hospital sem pernoite",
      },
      {
        metric: "Urologista",
        label: "Especialista no órgão",
        detail: "Domínio completo da anatomia funcional, vascular e nervosa genital",
      },
    ],
  },
  comparison: {
    navLabel: "Urologista vs. Clínicas Comerciais",
    eyebrow: "Critério Médico e Segurança Anatômica",
    title: "Estética Íntima com Cirurgião Urologista vs. Clínicas Estéticas Não Especializadas",
    intro:
      "A região genital masculina possui vascularização e inervação únicas no corpo humano. Veja por que a avaliação com um urologista titular faz toda a diferença:",
    modernLabel: "Atendimento com Cirurgião Urologista (Dr. Felipe)",
    conventionalLabel: "Clínicas Comerciais / Procedimentos Sem Base Urológica",
    rows: [
      {
        criterion: "Domínio da Anatomia Profunda e Funcional",
        modernApproach:
          "O urologista conhece milimetricamente as fáscias de Dartos e Buck, os corpos cavernosos, a uretra e o feixe vasculonervoso dorsal.",
        conventionalApproach:
          "Profissionais sem formação cirúrgica urológica não tratam as estruturas profundas nem possíveis variações anatômicas genitais.",
      },
      {
        criterion: "Avaliação Global (Estética + Ereção + Hormônios)",
        modernApproach:
          "Integra a queixa estética à avaliação da qualidade erétil, presença de placas de Peyronie, fimose ou retração por gordura pubiana.",
        conventionalApproach:
          "Visão isolada de venda de procedimento, sem diagnosticar condições urológicas associadas.",
      },
      {
        criterion: "Segurança de Materiais (Proibição de PMMA)",
        modernApproach:
          "Utiliza exclusivamente ácido hialurônico biocompatível e reversível com hialuronidase para preenchimento peniano.",
        conventionalApproach:
          "Risco de indicação de preenchedores definitivos (PMMA) ou enxertos que causam nódulos, fibrose e deformidades irreversíveis.",
      },
      {
        criterion: "Postura Ética e Expectativas Realistas (CFM)",
        modernApproach:
          "Transparência total sobre ganhos reais, limites anatômicos e contraindicação quando o procedimento não trará benefício ao paciente.",
        conventionalApproach:
          "Promessas irreais de ganho de comprimento em ereção sem respaldo nas sociedades internacionais (EAU / SMSNA / AUA).",
      },
    ],
    calloutTitle: "Deseja conversar de forma confidencial sobre o seu caso?",
    calloutDescription:
      "Use o modo 'Mensagem 100% Discreta' para agendar sua avaliação particular sem mencionar o procedimento na recepção.",
  },
  stepByStep: {
    eyebrow: "Jornada Discreta e Individualizada",
    title: "Como funciona o atendimento em Estética Íntima Masculina",
    intro:
      "Desenhamos cada etapa para que você se sinta acolhido, respeitado e seguro desde o primeiro contato.",
    steps: [
      {
        step: "01",
        title: "Agendamento Reservado pelo WhatsApp",
        duration: "Confidencial",
        description:
          "Você pode agendar usando nosso código de 'Avaliação Reservada', sem precisar explicar detalhes íntimos para a recepção.",
      },
      {
        step: "02",
        title: "Consulta Médica e Exame Anatômico",
        duration: "Sem Pressa",
        description:
          "Em consultório fechado com o Dr. Felipe, avaliamos a anatomia, elasticidade da pele, proporção, presença de retração ou curvatura e alinhamos expectativas reais.",
      },
      {
        step: "03",
        title: "Plano Personalizado (Consultório ou Day Hospital)",
        duration: "Sob Medida",
        description:
          "Definimos a indicação ideal: preenchimento com ácido hialurônico, Botox peniano/escrotal (em consultório), postectomia estética, frenuloplastia, escrotoplastia ou tratamento de Peyronie.",
      },
      {
        step: "04",
        title: "Execução com Conforto Anestésico",
        duration: "30 a 60 min",
        description:
          "Procedimentos realizados com bloqueio anestésico local indolor (ou sedação leve em procedimentos cirúrgicos no Day Hospital).",
      },
      {
        step: "05",
        title: "Alta no Mesmo Dia e Recuperação Rápida",
        duration: "Ambulatorial",
        description:
          "Você retorna para casa caminhando normalmente no mesmo dia, com todas as orientações escritas e canal direto de contato.",
      },
      {
        step: "06",
        title: "Revisão Médica de Acompanhamento",
        duration: "14 e 30 dias",
        description:
          "Acompanhamento presencial para conferir a acomodação tecidual, a cicatrização e a simetria final do resultado.",
      },
    ],
  },
  indicationsAndLimits: {
    eyebrow: "Transparência Clínica",
    title: "Principais queixas atendidas — e limites éticos",
    intro:
      "A boa medicina estética e reconstrutiva começa sabendo diferenciar o que traz resultados naturais e seguros do que deve ser evitado.",
    indicationsTitle: "Queixas e Procedimentos que Realizamos",
    indications: [
      "Preenchimento Peniano com Ácido Hialurônico para ganho real de circunferência (espessura) e melhor contorno",
      "Botox Peniano e Escrotal (Toxina Botulínica) para combater a retração peniana acentuada no estado flácido (reflexo de Dartos hiperativo), relaxar a musculatura escrotal e auxiliar o relaxamento sinusoidal",
      "Postectomia Estética (circuncisão) para excesso de pele, fimose, higienização ou revisão de cicatriz anterior irregular",
      "Frenuloplastia para freio bálano-prepucial curto que causa repuxamento, dor ou pequenas fissuras durante a ereção",
      "Escrotoplastia para correção de pele escrotal redundante ou inserção peno-escrotal alta ('webbed penis') e tratamento da Doença de Peyronie",
    ],
    limitsTitle: "O que Não Fazemos por Segurança do Paciente",
    limits: [
      "Jamais utilizamos PMMA (polimetilmetacrilato), silicone líquido ou hidroxiapatita na haste peniana devido ao risco grave de necrose e deformidade",
      "Não recomendamos secção isolada do ligamento suspensor do pênis sem indicação reconstrutiva estrita, pelo risco de instabilidade na ereção ('pênis em pêndulo')",
      "Não prometemos aumento do comprimento real dos corpos cavernosos em ereção através de preenchimento",
      "Não realizamos procedimentos na vigência de infecções ativas ou em pacientes com expectativas incompatíveis com a segurança anatômica",
      "Respeitamos rigorosamente a Resolução CFM nº 2.336/2023, preservando o sigilo e jamais expondo fotos íntimas de pacientes",
    ],
    timelineTitle: "Linha do Tempo Média de Recuperação",
    timeline: [
      {
        period: "Primeiras 24–48h",
        title: "Retorno à rotina leve",
        desc: "Trabalho de escritório e caminhadas leves liberados rapidamente conforme o procedimento realizado.",
      },
      {
        period: "Dias 5 a 7",
        title: "Atividades físicas",
        desc: "Retomada gradual de academia e treinos no preenchimento peniano (10–14 dias em procedimentos cirúrgicos com sutura).",
      },
      {
        period: "Dias 10 a 21",
        title: "Retorno sexual",
        desc: "Entre 10–14 dias para preenchimento com ácido hialurônico e 3–4 semanas para postectomia/escrotoplastia.",
      },
      {
        period: "Dia 30",
        title: "Resultado estabilizado",
        desc: "Revisão médica final para confirmar acomodação natural, simetria e conforto funcional.",
      },
    ],
  },
  mythsAndFacts: [
    {
      myth: "“Procedimentos de estética íntima masculina prejudicam a sensibilidade ou a ereção.”",
      fact: "Quando realizados pelo urologista nos planos fasciais superficiais corretos (acima da fáscia de Buck), os nervos da sensibilidade e os corpos cavernosos da ereção permanecem 100% intactos.",
    },
    {
      myth: "“Preenchimento peniano definitivo com PMMA é melhor porque dura para sempre.”",
      fact: "O PMMA é uma resina acrílica permanente que provoca reação inflamatória crônica, nódulos duros e deformidades que exigem cirurgias mutilantes para remoção. O Ácido Hialurônico é biocompatível, macio ao toque e reversível com hialuronidase.",
    },
    {
      myth: "“Curvatura peniana que surgiu depois dos 40 anos vai sumir sozinha sem avaliação.”",
      fact: "A curvatura adquirida (Doença de Peyronie) possui uma fase inflamatória ativa e uma fase de estabilização da placa. Procurar o urologista precocemente é essencial para evitar a progressão da deformidade e proteger a função erétil.",
    },
    {
      myth: "“O Botox Peniano deixa o pênis flácido ou impede a ereção.”",
      fact: "É exatamente o oposto na fisiologia urológica! A ereção depende do relaxamento da musculatura lisa para que o sangue preencha os corpos cavernosos, enquanto a contração muscular adrenérgica causa a retração (encolhimento). O Botox Peniano relaxa o músculo de Dartos (reduzindo a retração em repouso) e pode inclusive favorecer a hemodinâmica erétil.",
    },
  ],
  quiz: {
    title: "Descubra em 30 segundos o protocolo ideal para o seu objetivo",
    question1Label: "Seu Objetivo Principal",
    question1Prompt: "Qual procedimento ou queixa você deseja avaliar?",
    question1Options: [
      {
        id: "preenchimento_botox",
        label: "Preenchimento com Ácido Hialurônico e/ou Botox Peniano (Calibre e Retração)",
        summaryText: "Preenchimento Peniano com Ácido Hialurônico e Botox Peniano",
      },
      {
        id: "postectomia_escroto",
        label: "Postectomia estética (fimose), freio curto ou Escrotoplastia",
        summaryText: "Refinamento Cirúrgico (Postectomia / Frenuloplastia / Escrotoplastia)",
      },
      {
        id: "peyronie_curvatura",
        label: "Curvatura peniana (Doença de Peyronie) ou reconstrução genital",
        summaryText: "Avaliação Especializada de Curvatura Peniana / Peyronie",
      },
    ],
    question2Label: "Sua Prioridade",
    question2Prompt: "O que é mais importante para você no atendimento?",
    question2Options: [
      { id: "sigilo_total", label: "Discrição absoluta desde o agendamento até a consulta" },
      { id: "naturalidade", label: "Resultado natural ao toque e segurança anatômica" },
      { id: "recuperacao_rapida", label: "Procedimento sem afastamento prolongado do trabalho" },
    ],
  },
  specialistFocusParagraph:
    "Urologista formado pelo Instituto D'Or de Ensino e Pesquisa (IDOR) e Cirurgião Geral Titular do Colégio Brasileiro de Cirurgiões (TCBC), o Dr. Felipe de Bulhões conduz os procedimentos de estética íntima e reconstrução genital masculina unindo destreza cirúrgica, materiais de excelência e respeito absoluto à privacidade de cada paciente.",
  faqs: [
    {
      id: "faq-botox-peniano",
      category: "procedimento",
      question: "O que é o Botox Peniano (Toxina Botulínica) e quais são seus benefícios?",
      answer:
        "O Botox Peniano consiste na aplicação precisa de Toxina Botulínica Tipo A na região genital com duas finalidades principais avaliadas pelo urologista: 1) Estética/Antirretração (aplicação na fáscia muscular de Dartos peniana e/ou escrotal), que relaxa o reflexo de encolhimento no estado flácido causado pelo frio, adrenalina ou exercício físico, deixando o pênis mais projetado e pendular em repouso; e 2) Funcional/Vascular (aplicação intracavernosa em casos selecionados), que promove o relaxamento da musculatura lisa sinusoidal e auxilia o influxo sanguíneo na ereção. É um procedimento rápido de consultório (15–20 min), com efeito médio de 4 a 6 meses, podendo ser associado ao preenchimento com ácido hialurônico.",
    },
    {
      id: "faq-preenchimento-detalhes",
      category: "procedimento",
      question: "Como funciona o preenchimento peniano com ácido hialurônico?",
      answer:
        "É um procedimento ambulatorial realizado no próprio consultório sob anestesia local, sem cortes, utilizando microcânula romba para depositar ácido hialurônico reticulado entre a fáscia de Dartos e a fáscia de Buck. Dura cerca de 30 a 45 minutos, proporciona ganho imediato de circunferência (espessura) e menor retração em repouso, com durabilidade média de 12 a 18 meses e total reversibilidade. Você pode ver todos os diagramas anatômicos em nossa página exclusiva: /preenchimento-peniano.",
    },
    {
      id: "faq-escrotoplastia-webbing",
      category: "indicacoes",
      question: "O que é a escrotoplastia e a correção da prega peno-escrotal ('webbed penis')?",
      answer:
        "Alguns homens apresentam uma inserção alta da pele do escroto na face inferior do pênis (como uma 'vela de barco') ou flacidez escrotal acentuada, o que reduz visualmente o comprimento aparente da haste peniana e pode causar desconforto na relação ou em roupas justas. A escrotoplastia reposiciona esse ângulo peno-escrotal de forma rápida e segura.",
    },
    {
      id: "faq-postectomia-adulto",
      category: "procedimento",
      question: "Como fica a cicatriz da postectomia (circuncisão) estética no adulto?",
      answer:
        "Utilizamos técnica cirúrgica de precisão (sleeve resection) que posiciona a linha de sutura milimetricamente próxima ao sulco coronal, utilizando fios absorvíveis delicados que caem sozinhos, evitando marcas grosseiras e proporcionando transição suave e simétrica.",
    },
    {
      id: "faq-peyronie-tratamento",
      category: "indicacoes",
      question: "Quando a curvatura peniana (Doença de Peyronie) precisa de cirurgia?",
      answer:
        "Na fase inicial (inflamatória, com dor ou curvatura em mudança), o tratamento é clínico e medicamentoso para estabilizar a placa. Quando a curvatura já está estável há pelo menos 3–6 meses e dificulta ou impede a penetração, indicamos a correção cirúrgica personalizada (plicatura anatômica ou incisão de placa com enxerto, conforme o grau de curvatura e a função erétil).",
    },
    {
      id: "faq-sigilo-recepcao",
      category: "seguranca",
      question: "Preciso falar na recepção da clínica qual procedimento quero fazer?",
      answer:
        "Não. Ao iniciar o contato pelo WhatsApp usando o modo '100% Discreta (Código Reservado)', seu agendamento entra no sistema apenas como consulta urológica particular. Na recepção, ninguém perguntará o motivo da sua consulta.",
    },
  ],
  references: {
    guideLinkHref: "/preenchimento-peniano",
    guideLinkLabel: "Ver página completa de Preenchimento Peniano com Ácido Hialurônico",
    items: [
      "European Association of Urology (EAU) Guidelines on Sexual and Reproductive Health — Penile Size Abnormalities, Dysmorphophobia & Peyronie's Disease, 2025.",
      "Sexual Medicine Society of North America (SMSNA) Position Statements on Penile Girth Enhancement and Reconstructive Urology.",
      "American Urological Association (AUA) — Updates on Hyaluronic Acid Penile Augmentation & Peyronie's Disease Guideline.",
    ],
  },
  relatedLinks: [
    { href: "/preenchimento-peniano", label: "Preenchimento Peniano com Ácido Hialurônico" },
    { href: "/educativo/engrossamento-peniano", label: "Guia Educativo: Engrossamento Peniano" },
    { href: "/educativo/doenca-peyronie", label: "Doença de Peyronie" },
    { href: "/andrologia-performance-masculina", label: "Andrologia e Saúde Hormonal" },
  ],
};

export default function EsteticaIntimaMasculina() {
  return <AreaLandingPageTemplate config={config} />;
}
