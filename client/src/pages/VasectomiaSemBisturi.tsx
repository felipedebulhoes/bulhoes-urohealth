/**
 * Landing Page: Vasectomia Sem Bisturi e Cirurgias Ambulatoriais (/vasectomia-sem-bisturi)
 * Padrão de Conversão inspirado em /preenchimento-peniano
 */
import { Clock, ShieldCheck, Heart } from "lucide-react";
import AreaLandingPageTemplate, {
  type AreaLandingPageConfig,
} from "@/components/AreaLandingPageTemplate";

const config: AreaLandingPageConfig = {
  campaignSlug: "vasectomia-sem-bisturi",
  path: "/vasectomia-sem-bisturi",
  pageTitle: "Vasectomia Sem Bisturi em SP e Campinas | Dr. Felipe de Bulhões",
  pageDescription:
    "Vasectomia sem bisturi (técnica no-scalpel) e postectomia com o Dr. Felipe de Bulhões em São Paulo e Campinas. Procedimento ambulatorial de 20–30 min, sem cortes, sem pontos e rápida recuperação.",
  medicalCondition: "Planejamento Familiar Masculino e Vasectomia Sem Bisturi",
  heroBadge: "Planejamento Familiar · Técnica No-Scalpel Sem Pontos",
  heroTitle: "Vasectomia Sem Bisturi e Procedimentos Ambulatoriais",
  heroSubtitleHtml: (
    <>
      Método contraceptivo definitivo masculino com{" "}
      <strong className="text-white font-semibold">técnica sem bisturi (no-scalpel)</strong>:
      procedimento ambulatorial de 20 a 30 minutos sob anestesia local,{" "}
      <strong className="text-white font-semibold">sem cortes, sem pontos externos</strong> e com
      preservação absoluta da potência, libido e testosterona em{" "}
      <strong className="text-white font-semibold">São Paulo</strong> e{" "}
      <strong className="text-white font-semibold">Campinas</strong>.
    </>
  ),
  heroHighlights: [
    {
      icon: Clock,
      title: "20 a 30 Minutos",
      desc: "Procedimento rápido com alta imediata no mesmo dia",
    },
    {
      icon: ShieldCheck,
      title: "> 99,85% de Eficácia",
      desc: "O método contraceptivo mais seguro da medicina",
    },
    {
      icon: Heart,
      title: "Função Sexual Intacta",
      desc: "Zero impacto na testosterona, ereção, orgasmo ou volume do sêmen",
    },
  ],
  synthesisCard: {
    eyebrow: "Síntese Técnica Urológica",
    title: "Por que escolher a técnica Sem Bisturi (No-Scalpel)?",
    items: [
      {
        title: "Micropunção Atraumática (Sem Lâmina de Bisturi)",
        desc: "Em vez de cortar a pele com bisturi em dois lados, utilizamos pinça especial de ponta fina que afasta delicadamente as fibras da pele por um único microponto central.",
      },
      {
        title: "Sem Pontos Externos e Menor Risco de Hematoma",
        desc: "A abertura milimétrica fecha-se espontaneamente em 24–48 horas, reduzindo em até 5 vezes a taxa de sangramento ou desconforto pós-operatório.",
      },
      {
        title: "Conformidade com a Nova Lei Federal (14.443/2022)",
        desc: "Atualmente basta ter 21 anos completos (ou 2 filhos vivos) e respeitar o prazo legal, sem obrigatoriedade de assinatura do cônjuge.",
      },
      {
        title: "Postectomia (Circuncisão), Frenuloplastia e Varicocelectomia com Microscópio",
        desc: "Refinamento técnico cirúrgico e microcirúrgico para tratamento definitivo de fimose, freio bálano-prepucial curto e varicocele (varicocelectomia subinguinal com microscópio óptico).",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Precisão Microcirúrgica",
    title: "Como funciona a Vasectomia Sem Bisturi na prática?",
    intro:
      "Desenvolvida para minimizar o trauma tecidual, a vasectomia sem bisturi (No-Scalpel Vasectomy — NSV) é recomendada pelas diretrizes da American Urological Association (AUA) e da European Association of Urology (EAU) como a técnica de eleição para esterilização masculina.",
    cards: [
      {
        title: "Interrupção Seletiva dos Ductos Deferentes",
        paragraphs: [
          "Após anestesia local indolor na pele escrotal, isolamos os dois pequenos canais (ductos deferentes) que transportam os espermatozoides dos testículos até a uretra.",
          "Realizamos a secção, cauterização da mucosa luminal e interposição fascial — uma tripla barreira de segurança que garante eficácia superior a 99,85%.",
        ],
        footer: "Técnica com interposição de fáscia recomendada pelo Guideline da AUA.",
      },
      {
        title: "O que Continua Exatamente Igual Após a Vasectomia?",
        paragraphs: [
          "A testosterona é produzida nos testículos e liberada diretamente na corrente sanguínea (não passa pelos canais deferentes). Portanto, sua produção hormonal, barba, massa muscular e desejo sexual não sofrem nenhuma alteração.",
          "Além disso, 95% a 98% do líquido ejaculado vem da próstata e das vesículas seminais: após a vasectomia, você continua ejaculando normalmente, com o mesmo volume, cor e prazer — apenas sem espermatozoides microscópicos.",
        ],
        footer: "Liberdade para o casal suspender anticoncepcionais hormonais femininos após o espermograma.",
      },
    ],
    metrics: [
      {
        metric: "> 99,85%",
        label: "Índice de eficácia",
        detail: "Confirmado pelo espermograma de controle pós-procedimento",
      },
      {
        metric: "20 a 30 min",
        label: "Tempo de execução",
        detail: "Alta imediata caminhando normalmente logo após o término",
      },
      {
        metric: "2 a 3 dias",
        label: "Retorno ao trabalho leve",
        detail: "Recuperação acelerada com mínimo uso de analgésicos simples",
      },
      {
        metric: "0% Alteração",
        label: "Na testosterona e ereção",
        detail: "Eixo hormonal e nervos da função erétil permanecem 100% preservados",
      },
    ],
  },
  comparison: {
    navLabel: "Sem Bisturi vs. Clássica",
    eyebrow: "Comparativo de Técnicas",
    title: "Vasectomia Sem Bisturi (No-Scalpel) vs. Vasectomia Convencional e Laqueadura",
    intro:
      "Compare por que a técnica sem bisturi se tornou o padrão-ouro mundial para casais que decidiram encerrar o planejamento reprodutivo:",
    modernLabel: "Vasectomia Sem Bisturi (No-Scalpel)",
    conventionalLabel: "Técnica Convencional com Bisturi / Laqueadura",
    rows: [
      {
        criterion: "Acesso na Pele e Sutura",
        modernApproach:
          "Micropunção única central por afastamento de fibras (sem lâmina de bisturi), sem necessidade de pontos na pele na maioria dos casos.",
        conventionalApproach:
          "Duas incisões com lâmina de bisturi na bolsa escrotal e fechamento com pontos externos que precisam ser absorvidos ou retirados.",
      },
      {
        criterion: "Dor e Risco de Hematoma / Infecção",
        modernApproach:
          "Redução documentada em até 5 vezes na incidência de hematomas e infecção superficial, com pós-operatório muito mais confortável.",
        conventionalApproach:
          "Maior manipulação de vasos subcutâneos da pele escrotal e maior inchaço nos primeiros dias.",
      },
      {
        criterion: "Comparação com a Laqueadura Tubária Feminina",
        modernApproach:
          "Procedimento superficial sob anestesia local em 25 minutos, sem invadir a cavidade abdominal e com custo/risco muito menor.",
        conventionalApproach:
          "A laqueadura feminina exige cirurgia abdominal (laparoscópica ou aberta), anestesia geral/raqui e internação hospitalar.",
      },
      {
        criterion: "Impacto Hormonal no Casal",
        modernApproach:
          "Permite que a parceira suspenda pílulas anticoncepcionais ou DIU hormonal (após a alta do espermograma), sem nenhum efeito hormonal no homem.",
        conventionalApproach:
          "Uso contínuo por décadas de hormônios contraceptivos femininos que podem causar efeitos adversos vasculares e na libido.",
      },
    ],
    calloutTitle: "Deseja planejar sua Vasectomia ou Postectomia (Circuncisão) com segurança?",
    calloutDescription:
      "Fale com nossa equipe no WhatsApp para conhecer toda a documentação legal simples e agendar sua consulta.",
  },
  stepByStep: {
    eyebrow: "Jornada Simples e Organizada",
    title: "Como funciona o processo da Vasectomia, passo a passo",
    intro:
      "Organizamos todas as etapas com transparência, cumprindo rigorosamente a legislação brasileira e garantindo seu conforto do início ao fim.",
    steps: [
      {
        step: "01",
        title: "Consulta de Avaliação e Termo Informativo",
        duration: "Etapa 1",
        description:
          "Consulta presencial ou pré-avaliação para exame físico, esclarecimento de dúvidas e assinatura da manifestação de vontade conforme a Lei 14.443/2022.",
      },
      {
        step: "02",
        title: "Preparo Simples Domiciliar",
        duration: "Véspera",
        description:
          "Orientação de tricotomia (aparar os pelos da região) e levar uma cueca justa ou suporte escrotal para vestir logo após o procedimento.",
      },
      {
        step: "03",
        title: "Procedimento Sem Bisturi sob Anestesia Local",
        duration: "20–30 minutos",
        description:
          "Realizado com anestesia local (com opção de sedação leve quando o paciente preferir total relaxamento). Rápido, seguro e indolor.",
      },
      {
        step: "04",
        title: "Alta Imediata e Repouso Relativo",
        duration: "Primeiras 48h",
        description:
          "Você volta para casa no mesmo dia. Recomendamos repouso tranquilo no sofá e compressas frias intermitentes nas primeiras 24–48 horas.",
      },
      {
        step: "05",
        title: "Retorno à Rotina, Treinos e Vida Sexual",
        duration: "3 a 7 dias",
        description:
          "Trabalho administrativo em 2–3 dias; academia e relações sexuais liberadas após 7 dias (mantendo método contraceptivo provisório).",
      },
      {
        step: "06",
        title: "Espermograma de Confirmação (Azoospermia)",
        duration: "Após 60–90 dias",
        description:
          "Após cerca de 20 a 25 ejaculações e 2 a 3 meses, realizamos o espermograma que comprova ausência total de espermatozoides para liberar o casal.",
      },
    ],
  },
  indicationsAndLimits: {
    eyebrow: "Critérios Legais e Clínicos",
    title: "Quem pode fazer a vasectomia — e o que saber antes",
    intro:
      "A atualização da Lei do Planejamento Familiar tornou o acesso à vasectomia muito mais simples e direto para homens adultos.",
    indicationsTitle: "Quem Tem Indicação (Lei Federal nº 14.443/2022)",
    indications: [
      "Homens com capacidade civil plena e idade igual ou superior a 21 anos (mesmo sem filhos), OU homens com pelo menos 2 filhos vivos",
      "Não é mais exigida a assinatura ou autorização da esposa/companheira por lei federal",
      "Homens e casais seguros de que não desejam novas gestações no futuro",
      "Casais em que a parceira apresenta intolerância ou contraindicação ao uso de anticoncepcionais hormonais ou DIU",
      "Pacientes que também desejam corrigir fimose (Postectomia) ou freio curto no mesmo tempo cirúrgico",
    ],
    limitsTitle: "Importante Saber Antes do Procedimento",
    limits: [
      "Embora exista a cirurgia microcirúrgica de reversão da vasectomia, o procedimento deve ser encarado desde o início como definitivo",
      "O efeito contraceptivo NÃO é imediato no dia seguinte: permanecem espermatozoides residuais no canal que precisam ser eliminados nas primeiras 20–25 ejaculações",
      "É obrigatório manter o anticoncepcional atual até que o urologista avalie o espermograma de controle mostrando zero espermatozoides (azoospermia)",
      "A vasectomia previne gravidez, mas não protege contra Infecções Sexualmente Transmissíveis (ISTs)",
      "A legislação prevê prazo regulamentar entre a manifestação formal de vontade na consulta e o ato cirúrgico",
    ],
    timelineTitle: "Linha do Tempo de Recuperação da Vasectomia Sem Bisturi",
    timeline: [
      {
        period: "Primeiras 48h",
        title: "Gelo local e descanso",
        desc: "Uso de cueca firme (slip/boxer justa) e compressa fria local. Desconforto leve controlado com analgésico comum.",
      },
      {
        period: "Dias 2 a 3",
        title: "Retorno ao trabalho",
        desc: "Liberação para trabalho de escritório, direção veicular e caminhadas leves.",
      },
      {
        period: "Dias 7 a 10",
        title: "Esportes e relações",
        desc: "Retomada de academia, corrida e relações sexuais (mantendo proteção contraceptiva até o espermograma).",
      },
      {
        period: "60 a 90 dias",
        title: "Alta definitiva",
        desc: "Realização do espermograma de controle confirmando azoospermia e liberação total do casal.",
      },
    ],
  },
  mythsAndFacts: [
    {
      myth: "“A vasectomia diminui a testosterona, a libido ou a potência da ereção.”",
      fact: "Mito absoluto. A testosterona cai direto no sangue pelos vasos testiculares, e os nervos da ereção ficam na pelve/pênis. A vasectomia fecha apenas o microcanal dos espermatozoides.",
    },
    {
      myth: "“Depois da vasectomia o homem para de ejacular no orgasmo.”",
      fact: "Mito. Os espermatozoides representam apenas 2% a 5% do volume do sêmen. Os outros 95%+ vêm da próstata e das vesículas seminais, mantendo o volume, o aspecto e o orgasmo inalterados.",
    },
    {
      myth: "“Ainda preciso da assinatura reconhecida em cartório da esposa para operar.”",
      fact: "Desde março de 2023 (Lei 14.443/2022), a exigência de consentimento do cônjuge foi revogada em todo o Brasil, assim como a idade mínima caiu de 25 para 21 anos.",
    },
    {
      myth: "“Os espermatozoides ficam acumulados e causam inchaço ou câncer.”",
      fact: "O organismo reabsorve naturalmente as células não utilizadas através de macrófagos (assim como faz com milhões de células todos os dias), sem risco algum à saúde ou à próstata.",
    },
  ],
  quiz: {
    title: "Planeje sua Vasectomia ou Procedimento Ambulatorial em 30 segundos",
    question1Label: "Procedimento Desejado",
    question1Prompt: "Qual procedimento você deseja avaliar?",
    question1Options: [
      {
        id: "vasectomia",
        label: "Vasectomia Sem Bisturi (No-Scalpel)",
        summaryText: "Planejamento de Vasectomia Sem Bisturi",
      },
      {
        id: "postectomia",
        label: "Postectomia (Circuncisão / Fimose) ou Frenuloplastia",
        summaryText: "Avaliação de Postectomia / Frenuloplastia Ambulatorial",
      },
      {
        id: "varicocelectomia",
        label: "Varicocelectomia com Microscópio (Microcirurgia de Varicocele)",
        summaryText: "Avaliação de Varicocelectomia Microcirúrgica com Microscópio",
      },
    ],
    question2Label: "Preferência de Anestesia / Formato",
    question2Prompt: "O que traz mais tranquilidade para você?",
    question2Options: [
      { id: "anestesia_local", label: "Anestesia local rápida e alta imediata" },
      { id: "sedacao_leve", label: "Anestesia + sedação leve (dormir durante o procedimento)" },
      { id: "orientacao_medico", label: "Quero decidir junto com o Dr. Felipe na consulta" },
    ],
  },
  specialistFocusParagraph:
    "Cirurgião Geral Titular (TCBC) e Urologista pelo Instituto D'Or (IDOR), o Dr. Felipe de Bulhões executa a Vasectomia Sem Bisturi, Postectomia estética/funcional, Frenuloplastia e Varicocelectomia com Microscópio (Microcirúrgica) — priorizando mínimo trauma tecidual, cicatrização discreta e rápida recuperação para pacientes em São Paulo e Campinas.",
  faqs: [
    {
      id: "faq-idade-lei",
      category: "indicacoes",
      question: "Quais são os requisitos atuais da lei para fazer vasectomia no Brasil?",
      answer:
        "Pela Lei Federal nº 14.443/2022, qualquer homem com 21 anos completos (mesmo que não tenha filhos) ou que já possua pelo menos 2 filhos vivos pode realizar a vasectomia. Não há mais necessidade de assinatura do cônjuge. Na consulta inicial preenchemos a documentação regulamentar obrigatória.",
    },
    {
      id: "faq-anestesia-sedacao",
      category: "procedimento",
      question: "A vasectomia é feita só com anestesia local ou posso dormir (sedação)?",
      answer:
        "Oferecemos ambas as opções! A técnica sem bisturi é perfeitamente tolerada apenas com anestesia local na pele escrotal em ambiente ambulatorial. Porém, para pacientes mais ansiosos que preferem dormir durante os 20 minutos do procedimento e não ver nada, realizamos também com sedação endovenosa leve assistida por anestesista.",
    },
    {
      id: "faq-espermograma",
      category: "seguranca",
      question: "Quando posso ter relações sem preservativo ou sem anticoncepcional da parceira?",
      answer:
        "Somente após a realização do espermograma pós-vasectomia (geralmente solicitado entre 60 e 90 dias após o procedimento e após pelo menos 20 ejaculações) confirmando azoospermia (zero espermatozoides móveis). Até lá, é indispensável manter o método contraceptivo habitual.",
    },
    {
      id: "faq-postectomia-junto",
      category: "procedimento",
      question: "É possível fazer cirurgia de fimose (Postectomia) ou freio curto junto com a vasectomia?",
      answer:
        "Sim, é muito comum e prático! Aproveitamos o mesmo preparo, a mesma anestesia e o mesmo período de repouso inicial de 2 a 3 dias para realizar a vasectomia e a postectomia ou frenuloplastia no mesmo ato.",
    },
    {
      id: "faq-varicocelectomia-micro",
      category: "procedimento",
      question: "Como é realizada a Varicocelectomia com Microscópio (Microcirurgia de Varicocele)?",
      answer:
        "A Varicocelectomia Subinguinal com Microscópio é o padrão-ouro para o tratamento da varicocele (veias dilatadas no escroto que causam dor testicular, alteração no espermograma ou queda de testosterona). Com o microscópio cirúrgico de alta magnificação, ligamos seletivamente as veias dilatadas preservando a artéria testicular e os vasos linfáticos, com alta no mesmo dia e rápida recuperação.",
    },
    {
      id: "faq-reversao",
      category: "seguranca",
      question: "A vasectomia pode ser revertida caso minha vida mude no futuro?",
      answer:
        "Existe a cirurgia microcirúrgica de reversão (vasovasostomia) ou a captação de espermatozoides para fertilização in vitro (FIV), já que os testículos continuam produzindo espermatozoides normalmente. Contudo, as taxas de sucesso diminuem com o passar dos anos, por isso recomendamos realizar a vasectomia com convicção de definitividade.",
    },
  ],
  references: {
    guideLinkHref: "/educativo/vasectomia",
    guideLinkLabel: "Ler guia educativo completo sobre Vasectomia",
    items: [
      "American Urological Association (AUA) Vasectomy Guideline — No-Scalpel Technique & Occlusion Methods.",
      "European Association of Urology (EAU) Guidelines on Sexual and Reproductive Health, 2025.",
      "Lei Federal nº 14.443/2022 — Planejamento Familiar e Esterilização Voluntária no Brasil.",
    ],
  },
  relatedLinks: [
    { href: "/educativo/procedimentos-andrologicos", label: "Procedimentos Urológicos e Postectomia" },
    { href: "/educativo/varicocele", label: "Varicocele e Microcirurgia" },
    { href: "/andrologia-performance-masculina", label: "Saúde do Homem e Andrologia" },
    { href: "/estetica-intima-masculina", label: "Estética Íntima Masculina" },
  ],
};

export default function VasectomiaSemBisturi() {
  return <AreaLandingPageTemplate config={config} />;
}
