/**
 * Landing Page: Urodinâmica, Incontinência Urinária e Disfunções Miccionais (/avaliacao-urodinamica)
 * Padrão de Conversão inspirado em /preenchimento-peniano
 */
import { Activity, Clock, ShieldCheck } from "lucide-react";
import AreaLandingPageTemplate, {
  type AreaLandingPageConfig,
} from "@/components/AreaLandingPageTemplate";

const config: AreaLandingPageConfig = {
  campaignSlug: "avaliacao-urodinamica",
  path: "/avaliacao-urodinamica",
  pageTitle: "Exame de Urodinâmica e Incontinência Urinária em SP e Campinas | Dr. Felipe de Bulhões",
  pageDescription:
    "Estudo urodinâmico completo e tratamento de incontinência urinária, bexiga hiperativa e obstrução prostática em São Paulo e Campinas. Exame conduzido com conforto, privacidade e precisão.",
  medicalCondition: "Incontinência Urinária, Bexiga Hiperativa e Disfunções Miccionais",
  heroBadge: "Urologia Funcional · Diagnóstico Urodinâmico de Precisão",
  heroTitle: "Estudo Urodinâmico e Tratamento das Disfunções Miccionais",
  heroSubtitleHtml: (
    <>
      Avaliação funcional completa do trato urinário inferior ("o eletrocardiograma da bexiga") para
      diagnóstico certeiro de{" "}
      <strong className="text-white font-semibold">incontinência urinária</strong>,{" "}
      <strong className="text-white font-semibold">bexiga hiperativa</strong> e{" "}
      <strong className="text-white font-semibold">obstrução prostática</strong> — conduzida com
      conforto, respeito e tecnologia em{" "}
      <strong className="text-white font-semibold">São Paulo</strong> e{" "}
      <strong className="text-white font-semibold">Campinas</strong>.
    </>
  ),
  heroHighlights: [
    {
      icon: Activity,
      title: "Diagnóstico Padrão-Ouro",
      desc: "Diferencia com exatidão fraqueza esfincteriana, hiperatividade e obstrução",
    },
    {
      icon: ShieldCheck,
      title: "Sondas Ultrafinas e Conforto",
      desc: "Protocolo humanizado com anestésico local em gel e total privacidade",
    },
    {
      icon: Clock,
      title: "Laudo Médico Especializado",
      desc: "30 a 40 minutos com interpretação clínica direta para guiar seu tratamento",
    },
  ],
  synthesisCard: {
    eyebrow: "Síntese em Urologia Funcional",
    title: "Por que a urodinâmica muda o rumo do tratamento?",
    items: [
      {
        title: "Sintomas Parecidos Podem Ter Causas Opostas",
        desc: "Urinar toda hora ou perder urina pode vir tanto de uma bexiga que contrai sozinha quanto de uma bexiga obstruída que transborda. A urodinâmica mostra a verdade fisiológica.",
      },
      {
        title: "Segurança Antes de Cirurgias de Próstata ou Incontinência",
        desc: "Comprova se o jato urinário fraco decorre de obstrução prostática real ou de fraqueza do músculo da bexiga (hipocontratilidade detrusora), evitando cirurgias mal indicadas.",
      },
      {
        title: "Atendimento em Homens e Mulheres com Discrição",
        desc: "Investigação especializada da perda urinária aos esforços, urgência miccional, incontinência pós-prostatectomia e bexiga neurogênica.",
      },
      {
        title: "Do Diagnóstico à Solução Terapêutica",
        desc: "Além do exame, planejamos o tratamento completo: fisioterapia pélvica, fármacos modernos, toxina botulínica vesical, sling ou esfíncter artificial.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Fisiologia da Micção",
    title: "Como funciona o Estudo Urodinâmico Completo?",
    intro:
      "Assim como o cardiologista utiliza o teste ergométrico e o eletrocardiograma para avaliar o coração em funcionamento, o urologista utiliza o estudo urodinâmico computadorizado para registrar em tempo real como a bexiga armazena e esvazia a urina.",
    cards: [
      {
        title: "As 3 Fases do Exame: Urofluxometria, Cistometria e Estudo Miccional",
        paragraphs: [
          "O exame inicia de forma não invasiva com a Urofluxometria livre, onde o paciente urina em um equipamento que mede a velocidade máxima e a curva do fluxo.",
          "Em seguida, com cateteres milimétricos flexíveis e gel anestésico, avaliamos a fase de enchimento (Cistometria — verificando sensibilidade, capacidade, complacência e contrações involuntárias) e a fase de esvaziamento (Estudo Fluxo-Pressão).",
        ],
        footer: "Equipamento computadorizado de alta sensibilidade e sensores calibrados.",
      },
      {
        title: "Tratamento Direcionado para Incontinência e Bexiga Hiperativa",
        paragraphs: [
          "Com os dados urodinâmicos em mãos, deixamos de tratar sintomas por tentativa e erro e atuamos diretamente na causa biomecânica ou neurológica.",
          "Oferecemos desde terapias comportamentais e medicamentos de última geração (beta-3 agonistas que não causam boca seca ou risco cognitivo) até aplicação endoscópica de Toxina Botulínica (Botox®) na bexiga e cirurgias para incontinência.",
        ],
        footer: "Protocolos atualizados da International Continence Society (ICS) e EAU.",
      },
    ],
    metrics: [
      {
        metric: "30 a 40 min",
        label: "Duração total do exame",
        detail: "Realizado em regime ambulatorial sem necessidade de jejum ou internação",
      },
      {
        metric: "Sem Sedação",
        label: "Retorno imediato",
        detail: "Anestesia local em gel; o paciente sai dirigindo e retoma a rotina no mesmo dia",
      },
      {
        metric: "3 Etapas",
        label: "Avaliação integrada",
        detail: "Urofluxometria livre + Cistometria de enchimento + Estudo fluxo-pressão",
      },
      {
        metric: "Alta Precisão",
        label: "Indicação cirúrgica segura",
        detail: "Padrão-ouro antes de cirurgias de incontinência recidivada ou obstrução complexa",
      },
    ],
  },
  comparison: {
    navLabel: "Urodinâmica vs. Ultrassom",
    eyebrow: "Diagnóstico Funcional vs. Anatômico",
    title: "Por que o Ultrassom ou a Tomografia não substituem a Urodinâmica?",
    intro:
      "Muitos pacientes perguntam por que precisam do estudo urodinâmico se já fizeram ultrassom de vias urinárias. Entenda a diferença fundamental:",
    modernLabel: "Estudo Urodinâmico (Avaliação Funcional Dinâmica)",
    conventionalLabel: "Exames de Imagem Isolados ou Tratamento Empírico",
    rows: [
      {
        criterion: "O que o Exame Consegue Enxergar",
        modernApproach:
          "Avalia o funcionamento dinâmico: mede a pressão dentro da bexiga, detecta contrações involuntárias (bexiga hiperativa) e mede a força de contração do músculo detrusor.",
        conventionalApproach:
          "O ultrassom mostra apenas uma foto estática do tamanho da próstata e do volume da bexiga, sem dizer se o músculo vesical está forte, fraco ou hiperativo.",
      },
      {
        criterion: "Prevenção de Cirurgias sem Resultado",
        modernApproach:
          "Diferencia com certeza se o jato urinário é fraco por bloqueio da próstata (que melhora com cirurgia) ou por bexiga fraca/hipocontrátil.",
        conventionalApproach:
          "Operar a próstata sem perceber que a bexiga perdeu a contratilidade pode fazer com que o paciente continue sem urinar bem após a cirurgia.",
      },
      {
        criterion: "Investigação da Perda de Urina (Incontinência)",
        modernApproach:
          "Determina a pressão exata de perda sob esforço (VLPP) e identifica se há urgência motora associada (incontinência mista).",
        conventionalApproach:
          "Indicar cirurgia de sling sem identificar hiperatividade detrusora oculta pode agravar a urgência miccional no pós-operatório.",
      },
      {
        criterion: "Proteção dos Rins em Bexiga Neurogênica",
        modernApproach:
          "Identifica precocemente pressões vesicais perigosas (baixa complacência) em pacientes com diabetes, Parkinson, AVC ou lesões medulares.",
        conventionalApproach:
          "Aguardar alterações no exame de sangue (creatinina) ou dilatação renal significa descobrir o problema tarde demais.",
      },
    ],
    calloutTitle: "Precisa realizar o Estudo Urodinâmico ou investigar perdas urinárias?",
    calloutDescription:
      "Converse com nossa equipe pelo WhatsApp para receber o preparo simples e agendar seu exame ou consulta.",
  },
  stepByStep: {
    eyebrow: "Experiência Humanizada e Discreta",
    title: "Passo a passo do Estudo Urodinâmico sem estresse",
    intro:
      "Sabemos que muitos pacientes chegam apreensivos por não saberem como o exame é feito. Nossa prioridade é tornar a experiência tranquila, indolor e totalmente privada.",
    steps: [
      {
        step: "01",
        title: "Preparo Simples antes do Exame",
        duration: "Pré-exame",
        description:
          "Não requer jejum. Solicitamos apenas exame de urina negativo para infecção e que você venha com vontade confortável de urinar no horário agendado.",
      },
      {
        step: "02",
        title: "Conversa Inicial e Urofluxometria Livre",
        duration: "5–10 minutos",
        description:
          "Entendemos sua queixa principal e iniciamos com uma micção espontânea e privada em funil acoplado ao computador para medir seu fluxo natural.",
      },
      {
        step: "03",
        title: "Passagem Delicada de Sondas Ultrafinas com Gel Anestésico",
        duration: "Indolor",
        description:
          "Com antissepsia rigorosa e gel anestésico, posicionamos cateteres milimétricos que causam apenas leve sensação tátil, sem dor aguda.",
      },
      {
        step: "04",
        title: "Fase de Enchimento (Cistometria) e Testes de Esforço",
        duration: "15–20 minutos",
        description:
          "A bexiga é preenchida lentamente com soro estéril enquanto você nos informa quando sente o primeiro desejo de urinar, testando se há perdas ao tossir.",
      },
      {
        step: "05",
        title: "Fase de Esvaziamento (Estudo Fluxo-Pressão)",
        duration: "5 minutos",
        description:
          "Ao final, você urina normalmente enquanto os sensores registram a relação exata entre a pressão da bexiga e a velocidade do jato.",
      },
      {
        step: "06",
        title: "Laudo Detalhado e Plano Terapêutico",
        duration: "Imediato",
        description:
          "Retirada imediata das sondas, entrega do relatório gráfico completo e explicação clara dos achados para definir o melhor tratamento.",
      },
    ],
  },
  indicationsAndLimits: {
    eyebrow: "Indicações Clínicas",
    title: "Para quem a Avaliação Urodinâmica é recomendada",
    intro:
      "O exame é solicitado tanto para esclarecer sintomas urinários complexos quanto como etapa de segurança antes de procedimentos cirúrgicos.",
    indicationsTitle: "Principais Indicações do Exame e Consulta Funcional",
    indications: [
      "Perda involuntária de urina aos esforços (tosse, riso, exercício físico) ou perda associada a desejo súbito e incontrolável (urgência)",
      "Bexiga hiperativa: idas muito frequentes ao banheiro de dia e à noite que não melhoraram com o tratamento inicial",
      "Avaliação pré-operatória de Hiperplasia Prostática Benigna (HPB) para diferenciar obstrução prostática de bexiga fraca (hipocontrátil)",
      "Incontinência urinária masculina pós-prostatectomia radical (para definir indicação de fisioterapia, sling masculino ou esfíncter artificial)",
      "Suspeita de Bexiga Neurogênica (pacientes com diabetes de longa data, hérnia de disco, Parkinson, esclerose múltipla ou pós-AVC)",
    ],
    limitsTitle: "Quando Aguardar ou Preparar Antes do Exame",
    limits: [
      "O exame não deve ser realizado na vigência de infecção urinária ativa (caso haja ardência intensa ou urocultura positiva, tratamos antes)",
      "Informe previamente caso utilize anticoagulantes ou tenha histórico de estenose (estreitamento) de uretra",
      "Não é necessário suspender medicamentos de uso contínuo (pressão, diabetes), exceto se orientado especificamente pelo médico solicitante",
      "Pacientes em uso de sonda vesical de demora também podem e devem realizar o exame para avaliar a possibilidade de retirada segura da sonda",
      "Total respeito à intimidade: todo o exame ocorre em sala exclusiva apenas com a presença estritamente necessária",
    ],
    timelineTitle: "Cuidados Após o Estudo Urodinâmico",
    timeline: [
      {
        period: "Imediatamente após",
        title: "Liberado para dirigir",
        desc: "Como não há sedação, você sai caminhando normalmente e pode dirigir e trabalhar no mesmo dia.",
      },
      {
        period: "Primeiras 24h",
        title: "Hidratação reforçada",
        desc: "Beber bastante água ajuda a limpar a via urinária e alivia rapidamente eventual ardor leve nas primeiras micções.",
      },
      {
        period: "Em até 48h",
        title: "Profilaxia orientada",
        desc: "Quando indicado, prescrevemos dose profilática para prevenir qualquer infecção do trato urinário.",
      },
      {
        period: "Próximo passo",
        title: "Conduta assertiva",
        desc: "Com o diagnóstico exato em mãos, iniciamos o tratamento medicamentoso, reabilitação ou cirurgia sob medida.",
      },
    ],
  },
  mythsAndFacts: [
    {
      myth: "“O exame de urodinâmica é extremamente doloroso e requer internação.”",
      fact: "Mito. As sondas urodinâmicas atuais são ultrafinas (muito mais finas que uma sonda vesical comum) e inseridas com gel anestésico. A maioria dos pacientes relata que o exame foi muito mais simples e rápido do que imaginava.",
    },
    {
      myth: "“Perder um pouco de urina ao tossir ou com o avançar da idade é normal.”",
      fact: "Comum não significa normal. A incontinência urinária (seja em mulheres ou em homens após cirurgia de próstata) tem diagnóstico objetivo e tratamentos altamente eficazes que devolvem a liberdade social.",
    },
    {
      myth: "“Se o jato de urina do homem está fraco, a culpa é sempre da próstata grande.”",
      fact: "Nem sempre! Cerca de 20% a 30% dos homens com jato fraco têm, na verdade, hipocontratilidade detrusora (músculo da bexiga fraco). Só o estudo urodinâmico consegue medir a força real da bexiga.",
    },
    {
      myth: "“Bexiga hiperativa só se trata com remédios que deixam a boca seca.”",
      fact: "Hoje dispomos de medicamentos modernos (como a mirabegrona) sem efeito de boca seca, eletroestimulação tibial/sacral e aplicação endoscópica rápida de Toxina Botulínica intravesical para casos refratários.",
    },
  ],
  quiz: {
    title: "Identifique em 30 segundos o perfil da sua avaliação funcional",
    question1Label: "Objetivo Principal",
    question1Prompt: "O que você precisa agendar hoje?",
    question1Options: [
      {
        id: "exame_urodinamica",
        label: "Tenho pedido médico para realizar o Exame de Urodinâmica",
        summaryText: "Realização de Estudo Urodinâmico Computadorizado",
      },
      {
        id: "incontinencia_bexiga",
        label: "Sofro com perda de urina, urgência ou bexiga hiperativa",
        summaryText: "Consulta e Tratamento de Incontinência / Bexiga Hiperativa",
      },
      {
        id: "jato_fraco_sonda",
        label: "Jato urinário fraco, retenção urinária ou uso de sonda",
        summaryText: "Avaliação Funcional de Obstrução / Retirada de Sonda",
      },
    ],
    question2Label: "Histórico Clínico",
    question2Prompt: "Qual situação mais se aproxima do seu caso?",
    question2Options: [
      { id: "primeira_vez", label: "Primeira investigação especializada do problema" },
      { id: "pre_cirurgico", label: "Avaliação pré-operatória (próstata ou incontinência)" },
      { id: "pos_cirurgico", label: "Sintomas persistentes após cirurgia anterior" },
    ],
  },
  specialistFocusParagraph:
    "O Dr. Felipe de Bulhões possui ampla experiência na condução e interpretação de estudos urodinâmicos e no manejo clínico e cirúrgico das disfunções miccionais masculinas e femininas — integrando o diagnóstico funcional preciso às terapias mais modernas para restaurar a continência e o conforto urinário.",
  faqs: [
    {
      id: "faq-preparo-urodinamica",
      category: "recuperacao",
      question: "Qual é o preparo necessário para fazer o exame de urodinâmica?",
      answer:
        "Não é preciso fazer jejum alimentar. Os dois cuidados principais são: 1) Ter um exame de urina (urina tipo 1 / urocultura) recente demonstrando ausência de infecção urinária ativa; e 2) Tomar 2 a 3 copos de água cerca de 1 hora antes do exame para chegar à clínica com vontade confortável de urinar para a primeira etapa (urofluxometria).",
    },
    {
      id: "faq-tempo-urodinamica",
      category: "procedimento",
      question: "Quanto tempo demora o estudo urodinâmico e posso ir desacompanhado?",
      answer:
        "O exame completo dura em média de 30 a 40 minutos. Como utilizamos apenas gel anestésico local (sem sedação venosa ou anestesia geral), você pode vir desacompanhado, dirigir normalmente após o exame e retornar ao trabalho no mesmo dia.",
    },
    {
      id: "faq-incontinencia-pos-prostata",
      category: "indicacoes",
      question: "Perco urina após cirurgia de câncer de próstata. A urodinâmica ajuda?",
      answer:
        "Sim, é fundamental. Na incontinência pós-prostatectomia, a urodinâmica quantifica o grau de deficiência do esfíncter e verifica se a bexiga também apresenta contrações involuntárias ou baixa capacidade. Isso define com precisão se o melhor tratamento é fisioterapia pélvica intensiva, medicação, implante de Sling masculino ou Esfíncter Urinário Artificial.",
    },
    {
      id: "faq-botox-bexiga",
      category: "procedimento",
      question: "Quando é indicado o uso de Toxina Botulínica (Botox®) na bexiga?",
      answer:
        "Para pacientes com Bexiga Hiperativa ou Bexiga Neurogênica que não tiveram controle adequado com medicamentos orais ou não toleram seus efeitos colaterais. É um procedimento rápido e minimamente invasivo feito por via endoscópica (cistoscopia), que relaxa a musculatura hiperativa da bexiga e controla as perdas e a urgência por 6 a 9 meses.",
    },
    {
      id: "faq-retirar-sonda",
      category: "indicacoes",
      question: "Estou usando sonda vesical após travar a urina. O exame mostra se voltarei a urinar sem sonda?",
      answer:
        "Exatamente. O estudo urodinâmico avalia se o músculo da bexiga (detrusor) ainda possui força contrátil preservada para vencer a resistência da próstata após uma cirurgia desobstrutiva, orientando com clareza o prognóstico de retirada definitiva da sonda.",
    },
  ],
  references: {
    guideLinkHref: "/educativo/urodinamica",
    guideLinkLabel: "Ler guia completo sobre o Exame de Urodinâmica",
    items: [
      "International Continence Society (ICS) Standards on Good Urodynamic Practice.",
      "European Association of Urology (EAU) Guidelines on Non-Neurogenic Female and Male LUTS & Urinary Incontinence, 2025.",
      "American Urological Association (AUA) / SUFU Guideline on Adult Urodynamics and Overactive Bladder.",
    ],
  },
  relatedLinks: [
    { href: "/educativo/incontinencia-urinaria", label: "Incontinência Urinária" },
    { href: "/educativo/urodinamica", label: "Como é Feita a Urodinâmica" },
    { href: "/saude-da-prostata", label: "Saúde da Próstata e HPB" },
  ],
};

export default function AvaliacaoUrodinamica() {
  return <AreaLandingPageTemplate config={config} />;
}
