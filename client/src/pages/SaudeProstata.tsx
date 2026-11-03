/**
 * Landing Page: Saúde da Próstata e Tratamentos Minimamente Invasivos para HPB (/saude-da-prostata)
 * Padrão de Conversão inspirado em /preenchimento-peniano
 */
import { Clock, ShieldCheck, Activity } from "lucide-react";
import AreaLandingPageTemplate, {
  type AreaLandingPageConfig,
} from "@/components/AreaLandingPageTemplate";

const config: AreaLandingPageConfig = {
  campaignSlug: "saude-da-prostata",
  path: "/saude-da-prostata",
  pageTitle: "Saúde da Próstata e Tratamento de HPB em SP e Campinas | Dr. Felipe de Bulhões",
  pageDescription:
    "Avaliação especializada da próstata em São Paulo e Campinas. Check-up prostático, rastreio seguro e tratamentos minimamente invasivos para próstata aumentada (HPB) com preservação sexual.",
  medicalCondition: "Hiperplasia Prostática Benigna e Saúde Prostática",
  heroBadge: "Saúde da Próstata · Diagnóstico Preciso e Cirurgia a Laser",
  heroTitle: "Saúde da Próstata e Tratamento Moderno da HPB",
  heroSubtitleHtml: (
    <>
      Avaliação urológica individualizada para{" "}
      <strong className="text-white font-semibold">check-up prostático preventivo</strong>,
      investigação de sintomas urinários e tratamento minimamente invasivo da{" "}
      <strong className="text-white font-semibold">próstata aumentada (HPB)</strong> com foco na
      preservação da função erétil e ejaculatória em{" "}
      <strong className="text-white font-semibold">São Paulo</strong> e{" "}
      <strong className="text-white font-semibold">Campinas</strong>.
    </>
  ),
  heroHighlights: [
    {
      icon: ShieldCheck,
      title: "Rastreio Inteligente",
      desc: "PSA, Ressonância Multiparamétrica e avaliação sem desconforto",
    },
    {
      icon: Activity,
      title: "Preservação Sexual",
      desc: "Técnicas modernas que protegem a ereção e a continência",
    },
    {
      icon: Clock,
      title: "Rápida Recuperação",
      desc: "Enucleação a laser (HoLEP), Rezum e RTU bipolar sem cortes externos",
    },
  ],
  synthesisCard: {
    eyebrow: "Síntese Clínica da Próstata",
    title: "Cuidado prostático sem tabus e com tecnologia",
    items: [
      {
        title: "Diferenciação Clara: HPB vs. Câncer de Próstata",
        desc: "O crescimento benigno da próstata (HPB) comprime o canal da urina, mas não é câncer. Diagnosticar corretamente evita ansiedade e tratamentos desnecessários.",
      },
      {
        title: "Ressonância Multiparamétrica (RMmp) de Alta Precisão",
        desc: "Utilizamos exames de imagem avançados (classificação PI-RADS) para indicar biópsias apenas quando há real suspeita clínica.",
      },
      {
        title: "Liberdade dos Medicamentos Contínuos",
        desc: "Procedimentos endoscópicos e a laser permitem desobstruir o fluxo urinário de forma definitiva, evitando efeitos colaterais de remédios de uso contínuo.",
      },
      {
        title: "Alta Hospitalar Precoce e Sem Incisões",
        desc: "As cirurgias modernas para HPB são realizadas integralmente pelo canal uretral (via endoscópica), com mínimo sangramento e retorno rápido à rotina.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Fisiologia e Precisão Terapêutica",
    title: "Como cuidamos da saúde da próstata em cada fase da vida?",
    intro:
      "A partir dos 40–45 anos, a próstata passa por transformações naturais que exigem acompanhamento especializado: tanto o rastreio preventivo assintomático quanto o tratamento da obstrução urinária causada pela Hiperplasia Prostática Benigna (HPB).",
    cards: [
      {
        title: "Check-up Prostático Moderno e Estratificado",
        paragraphs: [
          "O rastreamento atual vai muito além do exame isolado. Combinamos a cinética do PSA, relação PSA livre/total, densidade prostática e, quando indicado, a Ressonância Magnética Multiparamétrica da próstata.",
          "Essa abordagem reduz biópsias desnecessárias e detecta precocemente apenas alterações clinicamente relevantes, em um ambiente de consulta tranquilo e respeitoso.",
        ],
        footer: "Protocolo alinhado às diretrizes 2025/2026 da SBU, EAU e AUA.",
      },
      {
        title: "Desobstrução Prostática Minimamente Invasiva (HPB)",
        paragraphs: [
          "Quando o aumento benigno da próstata causa jato urinário fraco, idas frequentes ao banheiro à noite (noctúria) ou sensação de esvaziamento incompleto, o tratamento deve ser personalizado conforme o volume da glândula.",
          "Dominamos desde terapias medicamentosas ajustadas até técnicas endoscópicas a laser (HoLEP / Thulium), terapia por vapor d'água e ressecção bipolar — todas realizadas pelo canal natural, sem cortes no abdome.",
        ],
        footer: "Preservação dos nervos da ereção que correm externamente à cápsula prostática.",
      },
    ],
    metrics: [
      {
        metric: "Sem Cortes",
        label: "Acesso 100% endoscópico",
        detail: "Tratamento cirúrgico da HPB realizado integralmente pela via uretral natural",
      },
      {
        metric: "24 a 48h",
        label: "Tempo médio de internação",
        detail: "Alta hospitalar rápida com tecnologias a laser e energia bipolar",
      },
      {
        metric: ">95%",
        label: "Cura quando precoce",
        detail: "O diagnóstico precoce de neoplasias prostáticas permite taxas máximas de controle",
      },
      {
        metric: "100% Individual",
        label: "Escolha da técnica",
        detail: "Planejamento baseado no tamanho da próstata, idade e desejo de preservar ejaculação",
      },
    ],
  },
  comparison: {
    navLabel: "Laser vs. Convencional",
    eyebrow: "Evolução Tecnológica na Próstata",
    title: "Abordagem Minimamente Invasiva vs. Cirurgia Aberta ou Medicamentos Eternos",
    intro:
      "Muitos homens convivem anos com jato urinário fraco ou efeitos colaterais de medicamentos (como tontura, queda de libido e ejaculação retrógrada) por desconhecerem a evolução das técnicas urológicas:",
    modernLabel: "Protocolo Moderno (Laser / Endoscópico / RMmp)",
    conventionalLabel: "Abordagem Antiga ou Subtratamento",
    rows: [
      {
        criterion: "Via de Acesso e Recuperação",
        modernApproach:
          "Procedimentos 100% pelo canal da urina (HoLEP, RTU Bipolar, terapias ablativas), sem incisões na pele e com retorno rápido às atividades.",
        conventionalApproach:
          "Cirurgia aberta transvesical com corte abdominal, maior sangramento e tempo prolongado de sonda vesical.",
      },
      {
        criterion: "Proteção da Bexiga no Longo Prazo",
        modernApproach:
          "A intervenção no momento correto preserva a musculatura da bexiga (detrusor), evitando falência vesical ou retenção urinária aguda.",
        conventionalApproach:
          "Manter medicamentos ineficazes por anos permite que a bexiga fique espessada, trabeculada e perca sua capacidade de contração.",
      },
      {
        criterion: "Função Erétil e Qualidade de Vida Sexual",
        modernApproach:
          "Energia a laser ou bipolar atua apenas no adenoma interno, preservando os feixes vasculonervosos da ereção localizados fora da cápsula.",
        conventionalApproach:
          "Uso crônico de inibidores da 5-alfa-redutase pode causar redução persistente da libido e disfunção erétil medicamentosa em parte dos pacientes.",
      },
      {
        criterion: "Segurança em Próstata de Grande Volume (>80g)",
        modernApproach:
          "A enucleação endoscópica a laser (HoLEP) trata próstatas de qualquer volume sem corte abdominal e com baixíssimo risco de transfusão.",
        conventionalApproach:
          "Limitação técnica da raspagem monopolar antiga para próstatas volumosas, exigindo cirurgia aberta.",
      },
      {
        criterion: "Precisão no Rastreamento Diagnóstico",
        modernApproach:
          "Uso estratégico da Ressonância Multiparamétrica (PI-RADS) e biópsia com fusão de imagens quando estritamente indicada.",
        conventionalApproach:
          "Biópsias às cegas repetidas ou atraso diagnóstico por receio de realizar a consulta preventiva.",
      },
    ],
    calloutTitle: "Usa medicamentos para a próstata ou acorda várias vezes à noite para urinar?",
    calloutDescription:
      "Agende uma avaliação para medir o impacto real da próstata na sua bexiga e conhecer as opções modernas de tratamento.",
  },
  stepByStep: {
    eyebrow: "Jornada de Cuidado Prostático",
    title: "Como funciona a avaliação e o tratamento passo a passo",
    intro:
      "Cada etapa é conduzida com clareza, respeito à privacidade do paciente e exames objetivos para que você tome decisões com total segurança.",
    steps: [
      {
        step: "01",
        title: "Consulta Urológica e Escore de Sintomas (IPSS)",
        duration: "Etapa Inicial",
        description:
          "Conversa detalhada sobre seu padrão urinário (força do jato, frequência noturna, urgência), função sexual, histórico familiar e medicamentos em uso.",
      },
      {
        step: "02",
        title: "Avaliação Laboratorial e Exame Físico Cuidadoso",
        duration: "Em Consulta",
        description:
          "Análise refinada do PSA (total, livre, velocidade e densidade), função renal, exame de urina e exame físico prostático rápido e indolor quando indicado.",
      },
      {
        step: "03",
        title: "Exames de Imagem e Fluxo (Ultrassom / RMmp / Urofluxometria)",
        duration: "Diagnóstico",
        description:
          "Avaliação do peso exato da próstata, medida do resíduo pós-miccional na bexiga e, se necessário, Ressonância Multiparamétrica de alta definição.",
      },
      {
        step: "04",
        title: "Definição Personalizada da Conduta",
        duration: "Alinhamento",
        description:
          "Explicação visual dos achados: definimos juntos se o caso requer apenas acompanhamento anual, ajuste medicamentoso sem impacto sexual ou desobstrução minimamente invasiva.",
      },
      {
        step: "05",
        title: "Procedimento Minimamente Invasivo (Quando Indicado)",
        duration: "24h–48h",
        description:
          "Realizado em hospitais de ponta em São Paulo ou Campinas (Rede D'Or / Campinas Day Hospital), por via endoscópica sem cortes e sob anestesia segura.",
      },
      {
        step: "06",
        title: "Acompanhamento de Longo Prazo",
        duration: "Contínuo",
        description:
          "Revisão pós-tratamento para confirmar o esvaziamento completo da bexiga, a melhora do sono noturno e a manutenção preventiva da saúde urológica.",
      },
    ],
  },
  indicationsAndLimits: {
    eyebrow: "Quando Procurar o Urologista",
    title: "Sinais de que sua próstata precisa de avaliação especializada",
    intro:
      "Identificar precocemente os sintomas obstrutivos ou realizar o check-up no momento recomendado pelas sociedades médicas evita complicações na bexiga e nos rins.",
    indicationsTitle: "Principais Indicações de Consulta",
    indications: [
      "Homens a partir de 45 anos (ou 40 anos se houver histórico familiar de câncer de próstata ou ascendência negra)",
      "Jato urinário fraco, lento, espalhado ou que interrompe e recomeça",
      "Necessidade de levantar 2 ou mais vezes à noite para urinar (noctúria), prejudicando o sono",
      "Sensação de que a bexiga não esvaziou totalmente após urinar ou necessidade de fazer força",
      "Alteração recente no exame de PSA ou nódulo identificado em ultrassonografia/ressonância",
    ],
    limitsTitle: "Sinais de Alerta que Exigem Prioridade",
    limits: [
      "Episódio de retenção urinária (travamento da urina ou necessidade de passar sonda)",
      "Infecções urinárias de repetição no homem ou presença de sangue na urina (hematúria)",
      "Formação de cálculos (pedras) dentro da bexiga ou dilatação dos rins (hidronefrose)",
      "Intolerância aos medicamentos da próstata (tontura, queda de pressão, perda de libido ou falha de ejaculação)",
      "Elevação progressiva do PSA mesmo com exames anteriores normais",
    ],
    timelineTitle: "Linha do Tempo de Recuperação (Procedimentos Endoscópicos / Laser para HPB)",
    timeline: [
      {
        period: "Primeiras 24–48h",
        title: "Alta hospitalar",
        desc: "Procedimento sem cortes externos. Na maioria dos casos, o paciente recebe alta em 1 a 2 dias caminhando normalmente.",
      },
      {
        period: "Dias 3 a 7",
        title: "Retorno ao trabalho leve",
        desc: "Retomada de atividades administrativas e rotina domiciliar, mantendo hidratação oral abundante.",
      },
      {
        period: "Dias 14 a 21",
        title: "Melhora progressiva do fluxo",
        desc: "O jato urinário torna-se visivelmente mais forte e livre, com redução da ardência cicatricial inicial.",
      },
      {
        period: "Dia 30 em diante",
        title: "Rotina plena e sono restaurado",
        desc: "Liberação para exercícios físicos intensos e atividade sexual normal, com esvaziamento vesical eficiente.",
      },
    ],
  },
  mythsAndFacts: [
    {
      myth: "“Se eu não sinto dor nem dificuldade para urinar, minha próstata está 100% saudável.”",
      fact: "As fases iniciais do câncer de próstata são completamente silenciosas (pois surgem na zona periférica da glândula). Já quem causa sintomas urinários precoces costuma ser o crescimento benigno (HPB). Por isso o check-up preventivo é indispensável.",
    },
    {
      myth: "“Operar a próstata aumentada (HPB) sempre causa impotência sexual.”",
      fact: "Mito. Na cirurgia para HPB (a laser ou bipolar), remove-se apenas o 'miolo' obstrutivo (adenoma), preservando a cápsula prostática onde passam os nervos da ereção. A função erétil permanece preservada.",
    },
    {
      myth: "“Próstata grande significa que terei câncer de próstata no futuro.”",
      fact: "A Hiperplasia Prostática Benigna (HPB) não se transforma em câncer. São duas condições distintas que podem, contudo, coexistir na mesma faixa etária — exigindo avaliação urológica diferenciada.",
    },
    {
      myth: "“Qualquer aumento do PSA significa câncer de próstata.”",
      fact: "O PSA é específico da próstata, mas não exclusivo do câncer: próstata aumentada (HPB), prostatite (inflamação), exercícios de ciclismo e ejaculação recente também elevam o PSA. O urologista interpreta o exame no contexto correto.",
    },
  ],
  quiz: {
    title: "Descubra qual é a avaliação prostática ideal para o seu momento",
    question1Label: "Seu Momento Atual",
    question1Prompt: "Qual é o principal motivo da sua busca?",
    question1Options: [
      {
        id: "checkup",
        label: "Check-up preventivo da próstata / Exames de rotina",
        summaryText: "Check-up Prostático Preventivo e Estratificação de Risco",
      },
      {
        id: "sintomas_hpb",
        label: "Sintomas urinários (jato fraco, urinar à noite) ou HPB",
        summaryText: "Avaliação de Hiperplasia Prostática (HPB) e Desobstrução",
      },
      {
        id: "psa_alterado",
        label: "PSA alterado, Ressonância ou 2ª opinião cirúrgica",
        summaryText: "Investigação Diagnóstica de PSA / Ressonância Prostática",
      },
    ],
    question2Label: "Tratamento Atual",
    question2Prompt: "Como você está lidando com isso hoje?",
    question2Options: [
      { id: "sem_tratamento", label: "Ainda não iniciei acompanhamento urológico" },
      { id: "usando_remedio", label: "Já uso medicação (ex: tansulosina/dutasterida)" },
      { id: "buscando_cirurgia", label: "Busco alternativa definitiva / a laser sem remédios" },
    ],
  },
  specialistFocusParagraph:
    "No cuidado das doenças da próstata, o Dr. Felipe de Bulhões une o treinamento de alta complexidade no Instituto D'Or (IDOR) ao domínio de tecnologias endoscópicas a laser, cirurgia robótica e diagnóstico por imagem multiparamétrica — garantindo tratamentos seguros que priorizam a preservação da qualidade de vida urinária e sexual.",
  faqs: [
    {
      id: "faq-idade-checkup",
      category: "indicacoes",
      question: "Com qual idade devo iniciar o acompanhamento preventivo da próstata?",
      answer:
        "Segundo a Sociedade Brasileira de Urologia (SBU), recomenda-se iniciar a avaliação individualizada aos 50 anos para a população geral, e aos 45 anos para homens com fatores de risco (histórico familiar de câncer de próstata ou mama em parentes de primeiro grau, ou homens negros). Muitos pacientes, contudo, já realizam um check-up basal de saúde masculina a partir dos 40 anos.",
    },
    {
      id: "faq-quando-operar-hpb",
      category: "indicacoes",
      question: "Quando a próstata aumentada (HPB) deixa de ser tratada com remédios e precisa de cirurgia?",
      answer:
        "O procedimento desobstrutivo é indicado quando os medicamentos não proporcionam alívio satisfatório, quando o paciente deseja suspender o uso contínuo devido a efeitos colaterais (tontura, queda de libido, falha ejaculatória), ou quando surgem sinais de sobrecarga vesical — como resíduo urinário elevado, infecções de repetição, sangramento prostático, cálculos na bexiga ou retenção urinária.",
    },
    {
      id: "faq-laser-holep-rtu",
      category: "procedimento",
      question: "Qual a diferença entre a cirurgia a laser (HoLEP) e a RTU Bipolar da próstata?",
      answer:
        "Ambas são técnicas minimamente invasivas realizadas 100% pelo canal da urina (sem cortes na pele). A RTU Bipolar é excelente para próstatas de pequeno a médio volume (até 60–80g). Já a Enucleação a Laser (HoLEP) permite remover todo o adenoma obstrutivo em próstatas de qualquer tamanho (inclusive acima de 80–100g) com mínimo sangramento, menor tempo de sonda e resultado extremamente duradouro.",
    },
    {
      id: "faq-funcao-sexual",
      category: "seguranca",
      question: "O tratamento cirúrgico da HPB afeta a potência sexual (ereção)?",
      answer:
        "Não. Diferente da prostatectomia radical (realizada para câncer de próstata), a cirurgia para HPB atua exclusivamente na parte interna da glândula que comprime a uretra, mantendo intacta a cápsula prostática externa por onde passam os nervos cavernosos responsáveis pela ereção.",
    },
    {
      id: "faq-psa-elevado",
      category: "indicacoes",
      question: "Meu PSA veio acima do limite. Preciso fazer biópsia imediatamente?",
      answer:
        "Nem sempre. Hoje não indicamos biópsia com base em um único valor isolado de PSA. Avaliamos a presença de inflamação (prostatite), a relação PSA livre/total, o tamanho da próstata e solicitamos a Ressonância Magnética Multiparamétrica (classificação PI-RADS). Isso evita biópsias desnecessárias com total segurança.",
    },
    {
      id: "faq-recuperacao-hpb",
      category: "recuperacao",
      question: "Como é o pós-operatório das cirurgias endoscópicas da próstata?",
      answer:
        "Por não haver corte externo, a dor pós-operatória é mínima. O paciente permanece no hospital por cerca de 24 a 48 horas, recebe alta sem sonda na grande maioria dos casos e pode retomar atividades leves em poucos dias, evitando apenas esforço físico intenso nas primeiras 3 a 4 semanas.",
    },
  ],
  references: {
    guideLinkHref: "/educativo/hiperplasia-prostatica",
    guideLinkLabel: "Ler guia completo sobre HPB e Próstata",
    items: [
      "European Association of Urology (EAU) Guidelines on Management of Non-Neurogenic Male Lower Urinary Tract Symptoms (LUTS / BPH), 2025.",
      "American Urological Association (AUA) Guideline: Surgical Management of Lower Urinary Tract Symptoms Attributed to Benign Prostatic Hyperplasia.",
      "Sociedade Brasileira de Urologia (SBU) — Diretrizes de Rastreamento e Diagnóstico Precoce das Doenças Prostáticas.",
    ],
  },
  relatedLinks: [
    { href: "/educativo/tratamentos-hpb", label: "Tratamentos para HPB" },
    { href: "/educativo/exame-prostata", label: "Exame de Próstata" },
    { href: "/cirurgia-robotica-urologia", label: "Cirurgia Robótica" },
    { href: "/uro-oncologia", label: "Uro-Oncologia" },
  ],
};

export default function SaudeProstata() {
  return <AreaLandingPageTemplate config={config} />;
}
