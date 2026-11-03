/**
 * Landing Page: Saúde do Homem, Andrologia e Performance Masculina (/andrologia-performance-masculina)
 * Padrão de Conversão inspirado em /preenchimento-peniano
 */
import { Activity, ShieldCheck, TrendingUp } from "lucide-react";
import AreaLandingPageTemplate, {
  type AreaLandingPageConfig,
} from "@/components/AreaLandingPageTemplate";

const config: AreaLandingPageConfig = {
  campaignSlug: "andrologia-performance-masculina",
  path: "/andrologia-performance-masculina",
  pageTitle: "Andrologia, Saúde do Homem, TRT e Varicocelectomia Microcirúrgica em SP e Campinas | Dr. Felipe de Bulhões",
  pageDescription:
    "Consulta em Andrologia e Saúde do Homem em São Paulo e Campinas. Investigação hormonal, reposição de testosterona (TRT), varicocelectomia com microscópio, fertilidade masculina e disfunção erétil.",
  medicalCondition: "Hipogonadismo Masculino, Varicocele, Fertilidade e Disfunção Erétil",
  heroBadge: "Andrologia, Microcirurgia e Medicina Sexual · Abordagem Baseada em Evidências",
  heroTitle: "Saúde do Homem, Andrologia e Performance Masculina",
  heroSubtitleHtml: (
    <>
      Avaliação urológica individualizada e confidencial para{" "}
      <strong className="text-white font-semibold">investigação hormonal completa</strong>,{" "}
      <strong className="text-white font-semibold">terapia de reposição de testosterona (TRT)</strong>,{" "}
      <strong className="text-white font-semibold">varicocelectomia com microscópio (microcirúrgica)</strong>,
      fertilidade e tratamento da <strong className="text-white font-semibold">disfunção erétil</strong> em{" "}
      <strong className="text-white font-semibold">São Paulo</strong> e{" "}
      <strong className="text-white font-semibold">Campinas</strong>.
    </>
  ),
  heroHighlights: [
    {
      icon: Activity,
      title: "Painel Hormonal Completo",
      desc: "Avaliação do eixo hipofisário, testosterona livre, SHBG, estradiol e metabolismo",
    },
    {
      icon: ShieldCheck,
      title: "Microcirurgia de Varicocele",
      desc: "Varicocelectomia subinguinal com microscópio óptico: padrão-ouro para fertilidade e dor testicular",
    },
    {
      icon: TrendingUp,
      title: "Saúde Sexual e Energia",
      desc: "Tratamento estruturado para libido, função erétil, foco e composição corporal",
    },
  ],
  synthesisCard: {
    eyebrow: "Síntese em Andrologia e Microcirurgia",
    title: "Cuidado hormonal, reprodutivo e sexual com rigor científico",
    items: [
      {
        title: "Diagnóstico Real do Hipogonadismo (DAEM / Andropausa)",
        desc: "Não olhamos apenas um número isolado no exame: correlacionamos seus sintomas clínicos ao eixo hormonal completo (LH, FSH, prolactina, estradiol, SHBG e insulina).",
      },
      {
        title: "Varicocelectomia Subinguinal com Microscópio",
        desc: "Técnica microcirúrgica padrão-ouro internacional (EAU/AUA) para correção da varicocele: magnificação de até 20x que preserva artérias testiculares e vasos linfáticos, melhorando o espermograma e a produção natural de testosterona.",
      },
      {
        title: "Proteção da Fertilidade e dos Testículos",
        desc: "A reposição de testosterona exógena comum pode bloquear a produção de espermatozoides. Para homens que desejam filhos, utilizamos protocolos específicos que estimulam a produção própria.",
      },
      {
        title: "Tratamento Moderno da Disfunção Erétil e Ejaculação Precoce",
        desc: "Abordagem da causa raiz (vascular, hormonal, metabólica ou psicogênica) com farmacoterapia otimizada e reabilitação peniana.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Endocrinologia Urológica, Fertilidade e Microcirurgia",
    title: "Como funciona a atuação em Andrologia, Hormônios e Varicocele?",
    intro:
      "A queda progressiva de energia, desejo sexual, fertilidade ou o desconforto testicular (varicocele) exigem avaliação especializada. A andrologia investiga e trata de forma integrada os pilares hormonal, microcirúrgico, vascular e reprodutivo.",
    cards: [
      {
        title: "Equilíbrio Hormonal e Terapia de Reposição de Testosterona (TRT)",
        paragraphs: [
          "Quando o diagnóstico clínico e laboratorial confirma a Deficiência de Testosterona (Hipogonadismo), a reposição bem indicada e monitorada restaura a disposição física, a libido, a densidade óssea, a sensibilidade à insulina e a composição corporal.",
          "Personalizamos a via de administração (géis transdérmicos, injetáveis de ação prolongada como undecilato de testosterona ou moduladores do eixo como clomifeno/hCG) com controle estrito do hematócrito e da próstata.",
        ],
        footer: "Conformidade total com as diretrizes do CFM, SBU, EAU e Endocrine Society.",
      },
      {
        title: "Varicocelectomia com Microscópio, Fertilidade e Função Erétil",
        paragraphs: [
          "A varicocele (dilatação das veias do cordão espermático) é a principal causa tratável de infertilidade masculina e também pode reduzir a produção testicular de testosterona e causar dor/peso escrotal. A Varicocelectomia Microcirúrgica Subinguinal utiliza microscópio cirúrgico de alta magnificação para ligar seletivamente as veias dilatadas, preservando a artéria testicular e os canais linfáticos — com altíssima taxa de sucesso e risco mínimo de hidrocele ou recidiva.",
          "Também conduzimos protocolos avançados para disfunção erétil, reabilitação endotelial, ejaculação precoce e curvatura peniana adquirida (Doença de Peyronie).",
        ],
        footer: "Consulta em ambiente privado e acolhedor, e procedimentos hospitalares com alta no mesmo dia.",
      },
    ],
    metrics: [
      {
        metric: "8+ Marcadores",
        label: "No painel andrológico",
        detail: "Testosterona total/livre, SHBG, LH, FSH, estradiol, prolactina, PSA e hematócrito",
      },
      {
        metric: "3 a 6 Semanas",
        label: "Primeiras respostas clínicas",
        detail: "Melhora inicial na disposição, humor e libido após ajuste hormonal adequado",
      },
      {
        metric: "100% Ético",
        label: "Segurança cardiovascular",
        detail: "Acompanhamento trimestral/semestral para evitar policitemia (sangue grosso)",
      },
      {
        metric: "Integrado",
        label: "Metabolismo & estética",
        detail: "Avaliação conjunta de composição corporal, sono, função sexual e estética íntima",
      },
    ],
  },
  comparison: {
    navLabel: "TRT Médica vs. Uso Sem Critério",
    eyebrow: "Segurança Hormonal e Sexual",
    title: "Andrologia Baseada em Evidências vs. Prescrições Padronizadas sem Critério",
    intro:
      "O uso inadequado de hormônios ou medicamentos para ereção sem investigação urológica traz riscos reais à fertilidade, ao coração e à próstata. Veja a diferença do acompanhamento especializado:",
    modernLabel: "Protocolo Urológico Individualizado (Dr. Felipe)",
    conventionalLabel: "Uso Empírico / Prescrição Sem Investigação",
    rows: [
      {
        criterion: "Investigação da Causa da Queda de Testosterona",
        modernApproach:
          "Identifica se a causa é testicular (primária), hipofisária (secundária), resistência insulínica/obesidade ou apneia do sono antes de prescrever.",
        conventionalApproach:
          "Inicia testosterona externa imediatamente sem checar LH, FSH, prolactina ou estilo de vida.",
      },
      {
        criterion: "Preservação da Fertilidade e Volume Testicular",
        modernApproach:
          "Questiona o desejo reprodutivo e utiliza estimuladores endógenos quando o paciente planeja ter filhos, evitando atrofia testicular e azoospermia.",
        conventionalApproach:
          "Prescreve ésteres de testosterona para homens jovens sem avisar que isso zera a produção de espermatozoides.",
      },
      {
        criterion: "Monitoramento de Segurança (Hematócrito, Estradiol e Próstata)",
        modernApproach:
          "Controle periódico da viscosidade sanguínea (hematócrito), conversão em estradiol, perfil lipídico e saúde prostática (PSA).",
        conventionalApproach:
          "Doses supra-fisiológicas sem controle laboratorial, elevando risco de trombose, ginecomastia, acne e irritabilidade.",
      },
      {
        criterion: "Cirurgia de Varicocele (Varicocelectomia)",
        modernApproach:
          "Técnica Subinguinal com Microscópio Cirúrgico (padrão-ouro EAU/AUA): magnificação óptica que identifica e preserva a artéria testicular e linfáticos, minimizando hidrocele (<1%) e recidiva.",
        conventionalApproach:
          "Técnica aberta sem magnificação microscópica: maior dificuldade para distinguir pequenos vasos, com maior índice de hidrocele pós-operatória e retorno das veias dilatadas.",
      },
      {
        criterion: "Abordagem da Disfunção Erétil",
        modernApproach:
          "Trata a causa endotelial, hormonal e emocional, ajustando medicações diárias ou sob demanda para devolver espontaneidade ao casal.",
        conventionalApproach:
          "Automedicação isolada com comprimidos em doses crescentes que perdem o efeito com o tempo.",
      },
    ],
    calloutTitle: "Deseja investigar hormônios, fertilidade ou avaliar cirurgia microcirúrgica de varicocele?",
    calloutDescription:
      "Agende sua avaliação andrológica presencial em São Paulo, Campinas ou por Teleconsulta.",
  },
  stepByStep: {
    eyebrow: "Protocolo de Avaliação Masculina",
    title: "Como funciona sua consulta de Andrologia passo a passo",
    intro:
      "Estruturamos uma investigação clínica clara e objetiva para que você compreenda exatamente o que está acontecendo no seu organismo.",
    steps: [
      {
        step: "01",
        title: "Anamnese Detalhada e Escuta Confidencial",
        duration: "Etapa 1",
        description:
          "Conversa reservada sobre níveis de energia, qualidade do sono, rotina de treinos, função erétil, libido, histórico metabólico e objetivos de vida.",
      },
      {
        step: "02",
        title: "Exame Físico Urológico e Avaliação Corporal",
        duration: "Em Consulta",
        description:
          "Avaliação anatômica especializada (incluindo pesquisa de varicocele, trofismo testicular, placas penianas e próstata quando indicado).",
      },
      {
        step: "03",
        title: "Solicitação de Painel Laboratorial, Hormonal e Doppler",
        duration: "Diagnóstico",
        description:
          "Dosagens matinais precisas do eixo hormonal completo, perfil metabólico, espermograma e ultrassom Doppler testicular quando há suspeita de varicocele.",
      },
      {
        step: "04",
        title: "Desenho do Plano Terapêutico ou Microcirúrgico",
        duration: "Retorno",
        description:
          "Início do protocolo individualizado: otimização metabólica, reposição hormonal segura (TRT), programação de varicocelectomia com microscópio ou terapia sexual.",
      },
      {
        step: "05",
        title: "Monitoramento de Segurança de 90 Dias",
        duration: "Ajuste Fino",
        description:
          "Avaliação da resposta clínica e exames de controle (hematócrito, estradiol, PSA, testosterona ou novo espermograma pós-varicocelectomia).",
      },
      {
        step: "06",
        title: "Manutenção de Longo Prazo e Longevidade",
        duration: "Semestral",
        description:
          "Seguimento periódico para sustentar a vitalidade, a saúde cardiovascular, a função sexual e o envelhecimento saudável.",
      },
    ],
  },
  indicationsAndLimits: {
    eyebrow: "Sintomas e Critérios Médicos",
    title: "Quando procurar o Urologista Andrologista",
    intro:
      "Os sintomas andrológicos muitas vezes instalam-se de forma gradual e silenciosa, sendo confundidos apenas com excesso de trabalho.",
    indicationsTitle: "Sintomas e Condições que Merecem Investigação Especializada",
    indications: [
      "Cansaço persistente no meio da tarde, perda de iniciativa e sensação de recuperação lenta após exercícios",
      "Redução do desejo sexual (libido) ou diminuição das ereções matinais espontâneas",
      "Dificuldade para obter ou manter uma ereção firme do início ao fim da relação sexual",
      "Presença de Varicocele (veias dilatadas no escroto), sensação de peso/dor testicular ao ficar em pé ou após treinos, ou alterações no espermograma",
      "Casais tentando engravidar há mais de 12 meses sem sucesso ou desejo de check-up completo da fertilidade e composição corporal",
    ],
    limitsTitle: "Critérios de Segurança em TRT e Microcirurgia",
    limits: [
      "Em conformidade com a Resolução CFM nº 2.333/2023, não realizamos prescrição de esteroides anabolizantes para fins meramente estéticos ou esportivos em homens com hormônios normais",
      "A Varicocelectomia Microcirúrgica é indicada para varicocele clínica palpável associada a alteração seminal, dor testicular refratária ou hipogonadismo/assimetria testicular (varicocele subclínica isolada sem sintomas geralmente não requer cirurgia)",
      "A Terapia de Reposição de Testosterona (TRT) exige exclusão prévia de câncer de próstata ou mama masculino em atividade e controle de hematócrito (<54%)",
      "Homens que desejam engravidar a parceira no curto prazo não devem usar testosterona exógena direta, mas sim terapias que estimulem a produção intratesticular ou correção de fatores reversíveis como a varicocele",
      "Pacientes que utilizaram hormônios por conta própria (pós-ciclo) recebem protocolo médico específico para recuperação segura do eixo hormonal",
    ],
    timelineTitle: "Linha do Tempo de Resposta Clínica no Tratamento Andrológico",
    timeline: [
      {
        period: "Semanas 1 a 3",
        title: "Melhora sexual, disposição ou recuperação cirúrgica",
        desc: "Na varicocelectomia microcirúrgica, a alta ocorre no mesmo dia e o retorno ao trabalho leve se dá em 3 a 5 dias; no ajuste hormonal, a energia matinal começa a subir.",
      },
      {
        period: "Semanas 4 a 8",
        title: "Humor, foco e vitalidade",
        desc: "Estabilização dos níveis séricos fisiológicos de testosterona, alívio do peso escrotal pós-varicocelectomia e melhora da qualidade do sono.",
      },
      {
        period: "Meses 3 a 6",
        title: "Composição corporal e espermatogênese",
        desc: "Ciclo completo de renovação dos espermatozoides (após microcirurgia de varicocele, a melhora no espermograma consolida-se entre 3 e 6 meses) e ganho de massa magra.",
      },
      {
        period: "Contínuo",
        title: "Monitoramento protetor",
        desc: "Controle laboratorial programado garantindo eficácia com segurança prostática, testicular e hematológica.",
      },
    ],
  },
  mythsAndFacts: [
    {
      myth: "“Se a testosterona total está 'dentro do valor de referência do laboratório', não há problema hormonal.”",
      fact: "Os intervalos de laboratório são amplos (muitas vezes de 240 a 900 ng/dL). Mais importante é calcular a Testosterona Livre e Biodisponível (descontando o SHBG) e correlacionar aos sintomas clínicos do paciente.",
    },
    {
      myth: "“Toda cirurgia de varicocele tem o mesmo resultado, usando ou não o microscópio.”",
      fact: "Incorreto. As diretrizes da EAU e AUA apontam a Varicocelectomia Subinguinal com Microscópio como o padrão-ouro absoluto, pois a magnificação óptica permite preservar a finíssima artéria testicular e os vasos linfáticos, reduzindo drasticamente complicações (como hidrocele) e recidivas.",
    },
    {
      myth: "“Reposição de testosterona bem indicada pelo médico causa câncer de próstata.”",
      fact: "Mito derrubado pelos grandes estudos internacionais (como o TRAVERSE Trial publicado no New England Journal of Medicine). A reposição fisiológica em homens com deficiência hormonal não aumenta a incidência de câncer de próstata nem de infarto.",
    },
    {
      myth: "“Usar comprimidos para ereção vicia o organismo.”",
      fact: "Inibidores da PDE5 (como tadalafila e sildenafila) não causam dependência química. Quando prescritos em protocolo médico de reabilitação endotelial, inclusive melhoram a oxigenação dos corpos cavernosos.",
    },
  ],
  quiz: {
    title: "Identifique em 30 segundos o foco da sua avaliação andrológica",
    question1Label: "Principal Queixa / Objetivo",
    question1Prompt: "Qual tema você mais deseja abordar na consulta?",
    question1Options: [
      {
        id: "hormonal_energia",
        label: "Queda de testosterona, cansaço, libido ou composição corporal",
        summaryText: "Investigação Hormonal e Reposição de Testosterona (TRT)",
      },
      {
        id: "varicocele_fertilidade",
        label: "Varicocele (varicocelectomia com microscópio), dor testicular ou fertilidade",
        summaryText: "Avaliação de Varicocelectomia Microcirúrgica / Fertilidade Masculina",
      },
      {
        id: "funcao_eretil",
        label: "Qualidade da ereção, confiança sexual, pós-ciclo ou check-up global",
        summaryText: "Avaliação Especializada de Função Erétil e Saúde Sexual",
      },
    ],
    question2Label: "Exames Recentes",
    question2Prompt: "Como está sua investigação até agora?",
    question2Options: [
      { id: "sem_exames", label: "Quero solicitar todos os exames na primeira consulta" },
      { id: "tenho_exames", label: "Já tenho exames (sangue, espermograma ou ultrassom Doppler)" },
      { id: "em_reposicao", label: "Já tenho diagnóstico ou faço uso de medicação e quero acompanhamento" },
    ],
  },
  specialistFocusParagraph:
    "Membro da Sociedade Brasileira de Urologia (SBU), European Association of Urology (EAU) e American Urological Association (AUA), o Dr. Felipe de Bulhões conduz a área de Andrologia e Saúde do Homem com medicina baseada em evidências — oferecendo investigação endócrino-urológica profunda, microcirurgia de varicocele com microscópio, sigilo absoluto e tratamentos personalizados em São Paulo e Campinas.",
  faqs: [
    {
      id: "faq-varicocelectomia-microscopio",
      category: "procedimento",
      question: "Como funciona a Varicocelectomia com Microscópio e quais suas vantagens?",
      answer:
        "A Varicocelectomia Microcirúrgica Subinguinal é realizada através de uma mínima incisão de 2 a 3 cm abaixo da virilha, com auxílio de um microscópio óptico cirúrgico que amplia as estruturas em até 20 vezes. Isso permite identificar e ligar todas as veias varicosas responsáveis pelo superaquecimento e estresse oxidativo do testículo, preservando intactos a artéria testicular, os canais linfáticos e o ducto deferente. O paciente recebe alta no mesmo dia, com mínima dor pós-operatória, melhora significativa dos parâmetros do espermograma em 60% a 80% dos casos e estímulo à produção natural de testosterona.",
    },
    {
      id: "faq-quando-repor-testosterona",
      category: "indicacoes",
      question: "Quando a Terapia de Reposição de Testosterona (TRT) tem indicação médica real?",
      answer:
        "Segundo as diretrizes da EAU, AUA e SBU, a TRT é indicada quando o homem apresenta sintomas clínicos compatíveis (redução de libido, fadiga, perda muscular, disfunção erétil, humor deprimido) associados a níveis comprovadamente baixos de testosterona total e/ou livre em exames coletados pela manhã.",
    },
    {
      id: "faq-formas-trt",
      category: "procedimento",
      question: "Quais são as opções de tratamento para baixa testosterona?",
      answer:
        "A escolha depende da idade, da causa e do desejo de ter filhos. Para quem não deseja mais filhos, utilizamos géis transdérmicos diários ou injeções de longa duração (undecilato de testosterona a cada 10–12 semanas, evitando picos e vales). Para quem deseja preservar ou estimular a fertilidade, utilizamos moduladores seletivos ou gonadotrofinas que estimulam o próprio testículo a produzir mais testosterona.",
    },
    {
      id: "faq-canetas-glp1",
      category: "indicacoes",
      question: "Emagrecer com canetas GLP-1 (semaglutida / tirzepatida) melhora a testosterona?",
      answer:
        "Sim! O tecido adiposo visceral possui a enzima aromatase, que converte a testosterona masculina em estradiol (hormônio feminino). A perda de gordura visceral com acompanhamento médico reduz essa conversão e frequentemente eleva de forma expressiva a testosterona natural e a função erétil.",
    },
    {
      id: "faq-teleconsulta-andrologia",
      category: "procedimento",
      question: "A consulta de Andrologia pode ser iniciada por Teleconsulta?",
      answer:
        "Sim. Muitos pacientes optam por iniciar por Teleconsulta para relatar seus sintomas com privacidade, receber o pedido completo de exames laboratoriais e retornar com todos os resultados prontos.",
    },
    {
      id: "faq-estetica-associada",
      category: "recuperacao",
      question: "Posso avaliar questões de estética íntima (como preenchimento ou botox peniano) na mesma consulta?",
      answer:
        "Com certeza. Como urologista e andrologista, o Dr. Felipe realiza na mesma consulta tanto a avaliação funcional/hormonal quanto a avaliação anatômica para procedimentos de estética íntima masculina, com total sigilo.",
    },
  ],
  references: {
    guideLinkHref: "/educativo/varicocele",
    guideLinkLabel: "Ler guia completo sobre Varicocele e Microcirurgia",
    items: [
      "European Association of Urology (EAU) Guidelines on Sexual and Reproductive Health — Male Infertility, Varicocele & Hypogonadism, 2025.",
      "American Urological Association (AUA) / ASRM Guideline: Diagnosis and Treatment of Infertility in Men (Microsurgical Varicocelectomy).",
      "Lincoff AM, et al. Cardiovascular Safety of Testosterone-Replacement Therapy (TRAVERSE Trial). New England Journal of Medicine, 2023.",
    ],
  },
  relatedLinks: [
    { href: "/educativo/varicocele", label: "Varicocele e Microcirurgia" },
    { href: "/educativo/infertilidade-masculina", label: "Infertilidade Masculina" },
    { href: "/educativo/hipogonadismo", label: "Hipogonadismo e Testosterona" },
    { href: "/educativo/disfuncao-eretil", label: "Tratamento da Disfunção Erétil" },
  ],
};

export default function AndrologiaPerformance() {
  return <AreaLandingPageTemplate config={config} />;
}
