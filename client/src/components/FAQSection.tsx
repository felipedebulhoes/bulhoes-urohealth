/*
 * Design: Clinical Precision — Swiss Medical Design
 * Component: FAQ Section — Perguntas Frequentes expandida sobre Saúde Masculina e Urologia
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react";
import FAQSchema from "@/components/FAQSchema";

const faqs = [
  {
    category: "Consulta",
    questions: [
      {
        q: "Quando devo procurar um urologista?",
        a: "Todo homem a partir dos 40 anos (ou 35 anos com histórico familiar de câncer de próstata) deve fazer acompanhamento urológico anual. Porém, o ideal é que o acompanhamento comece desde a adolescência — assim como as mulheres fazem com o ginecologista. Procure um urologista se apresentar: dificuldade para urinar, sangue na urina, dor lombar intensa, disfunção erétil, infertilidade, dor testicular ou qualquer alteração genital.",
      },
      {
        q: "Como é a primeira consulta urológica?",
        a: "A primeira consulta inclui uma conversa detalhada sobre seus sintomas, histórico médico e hábitos de vida. O exame físico pode incluir palpação abdominal e, quando indicado, o toque retal (exame da próstata) — que dura apenas alguns segundos e é indolor na maioria dos casos. Exames complementares podem ser solicitados conforme a necessidade.",
      },
      {
        q: "O exame de próstata (toque retal) dói?",
        a: "O toque retal é um exame rápido (5-10 segundos) que causa, no máximo, um leve desconforto. Não é doloroso. É fundamental para a detecção precoce do câncer de próstata e avaliação da HPB. O exame é realizado com lubrificante e de forma respeitosa e profissional.",
      },
      {
        q: "Preciso de algum preparo para a consulta?",
        a: "Não é necessário preparo especial. Traga exames anteriores (sangue, imagem, biópsias), lista de medicamentos em uso e, se possível, um resumo dos seus sintomas. Para exames específicos como urodinâmica ou ultrassom, orientações de preparo serão fornecidas previamente.",
      },
      {
        q: "O urologista trata apenas homens?",
        a: "Não. Embora seja conhecido como o 'médico do homem', o urologista também trata mulheres em questões do trato urinário, como infecções urinárias de repetição, incontinência urinária e cálculos renais. Porém, a maior parte da demanda envolve saúde masculina.",
      },
    ],
  },
  {
    category: "Convênios e Valores",
    questions: [
      {
        q: "Quais convênios são aceitos?",
        a:"No Campinas Day Hospital e no Centro Médico São Luiz Campinas (Rede D'Or), atendo por convênios como Bradesco, Sul América, Amil, Allianz, Porto Seguro, Unimed, entre outros. No Campinas Day Hospital também aceito Assefaz, Cassi, Gama, Go Care, Holambra, Medservice e Skill/Omint. Nas unidades Clinovi (Paulista, Moema, Pinheiros e SBC), o atendimento é exclusivamente particular, com pagamento via PIX, cartão de crédito ou débito no local antes da consulta.",
      },
      {
        q: "Qual o valor da consulta particular?",
        a: "Os valores de consulta particular variam conforme o local de atendimento. Nas unidades Clinovi (Paulista e Moema), aceitamos pagamento via PIX, cartão de crédito ou débito, realizado no local antes da consulta. Para informações sobre valores, envie uma mensagem pelo WhatsApp (11) 98112-4455 (São Paulo) ou (19) 99855-9890 (Campinas), ou ligue para agendar: Clinovi (11) 3382-1529 | Campinas (19) 2127-2900.",
      },
      {
        q: "Vocês emitem nota fiscal / recibo para reembolso?",
        a: "Sim. Emitimos recibo detalhado com todos os dados necessários para solicitar reembolso junto ao seu plano de saúde, quando aplicável.",
      },
      {
        q: "O convênio cobre cirurgias?",
        a: "Sim, a maioria dos convênios cobre procedimentos cirúrgicos urológicos quando há indicação médica. Alguns convênios como Go Care e SulAmérica cobrem apenas cirurgias no Campinas Day Hospital. Verificamos a cobertura antes de qualquer procedimento.",
      },
    ],
  },
  {
    category: "Teleconsulta",
    questions: [
      {
        q: "Como funciona a teleconsulta?",
        a: "A teleconsulta é realizada por videochamada em plataforma segura, com a mesma qualidade e atenção da consulta presencial. É ideal para retornos, orientações pós-operatórias, segunda opinião médica e pacientes de outras cidades. Após o agendamento, você recebe um link de acesso por e-mail ou WhatsApp.",
      },
      {
        q: "A teleconsulta substitui a consulta presencial?",
        a: "A teleconsulta é excelente para avaliação inicial, retornos e orientações, mas não substitui completamente a consulta presencial quando há necessidade de exame físico. O médico indicará se uma consulta presencial é necessária.",
      },
      {
        q: "Posso receber receita médica pela teleconsulta?",
        a: "Sim. Receitas e atestados podem ser emitidos digitalmente com assinatura eletrônica válida, conforme regulamentação do CFM. Você recebe os documentos por e-mail ou WhatsApp.",
      },
    ],
  },
  {
    category: "Procedimentos",
    questions: [
      {
        q: "As cirurgias são realizadas em quais hospitais?",
        a: "As cirurgias são realizadas no Campinas Day Hospital (Campinas) e nos hospitais parceiros em São Paulo. A escolha do local depende do procedimento, convênio e preferência do paciente.",
      },
      {
        q: "Quanto tempo dura a recuperação das cirurgias?",
        a: "Varia conforme o procedimento. Cirurgias minimamente invasivas (endoscópicas, laparoscópicas, robóticas) têm recuperação mais rápida — em geral 3-7 dias para atividades leves. Consulte a página de Orientações Pós-Operatórias para detalhes específicos de cada cirurgia.",
      },
      {
        q: "Como devo me preparar para a cirurgia?",
        a: "O preparo inclui jejum (8h para sólidos, 2h para líquidos claros), ajuste de medicamentos (suspender anticoagulantes, anti-inflamatórios e fitoterápicos), exames pré-operatórios e banho com clorexidina. Consulte a página de Orientações Pré-Operatórias para o guia completo com checklist e orientações específicas por procedimento.",
      },
      {
        q: "O que é cirurgia minimamente invasiva?",
        a: "São técnicas cirúrgicas que utilizam pequenas incisões (0,5-1cm) ou acessos naturais (uretra) em vez de grandes cortes. Incluem endoscopia, laparoscopia e cirurgia robótica. Benefícios: menos dor, menor sangramento, recuperação mais rápida e menor tempo de internação.",
      },
      {
        q: "A vasectomia é reversível?",
        a: "Tecnicamente, a reversão (vasovasostomia) é possível, mas não é garantida. A vasectomia deve ser considerada um método definitivo de contracepção. Antes do procedimento, discutimos todas as opções e implicações. A taxa de sucesso da reversão diminui com o tempo após a vasectomia.",
      },
      {
        q: "A postectomia (circuncisão) dói muito?",
        a: "O procedimento é feito sob anestesia, então não há dor durante a cirurgia. No pós-operatório, pode haver desconforto leve a moderado nos primeiros dias, controlado com analgésicos. A recuperação completa leva cerca de 30 dias.",
      },
    ],
  },
  {
    category: "Saúde da Próstata",
    questions: [
      {
        q: "Qual a diferença entre HPB e câncer de próstata?",
        a: "A Hiperplasia Prostática Benigna (HPB) é o crescimento benigno da próstata, muito comum após os 50 anos, que causa sintomas urinários. O câncer de próstata é um tumor maligno que pode ou não coexistir com a HPB. São condições diferentes, mas ambas precisam de acompanhamento urológico regular.",
      },
      {
        q: "O PSA alto sempre significa câncer?",
        a: "Não. O PSA (Antígeno Prostático Específico) pode estar elevado por diversas causas: HPB, prostatite (inflamação), infecção urinária, atividade sexual recente ou até andar de bicicleta. Um PSA alterado indica necessidade de investigação, não necessariamente câncer.",
      },
      {
        q: "Quais são os tratamentos modernos para a próstata aumentada?",
        a: "Existem diversas opções: tratamento medicamentoso (alfa-bloqueadores, inibidores da 5-alfa-redutase), RTU (monopolar e bipolar), enucleação a laser (HoLEP, ThuLEP), GreenLight, terapias minimamente invasivas (Rezum, UroLift) e prostatectomia robótica para próstatas muito grandes. A escolha depende do tamanho da próstata e dos sintomas.",
      },
      {
        q: "A partir de que idade devo fazer o exame de próstata?",
        a: "A Sociedade Brasileira de Urologia recomenda avaliação a partir dos 50 anos para a população geral, e a partir dos 45 anos para homens negros ou com histórico familiar de câncer de próstata. A avaliação inclui PSA e toque retal.",
      },
    ],
  },
  {
    category: "Saúde Sexual",
    questions: [
      {
        q: "A disfunção erétil tem cura?",
        a: "Na maioria dos casos, a disfunção erétil pode ser tratada com sucesso. O tratamento depende da causa: pode incluir mudanças no estilo de vida, medicamentos orais (sildenafila, tadalafila), terapia por ondas de choque, injeção intracavernosa ou, em casos refratários, prótese peniana. O primeiro passo é uma avaliação completa para identificar a causa.",
      },
      {
        q: "A testosterona baixa pode causar problemas sexuais?",
        a: "Sim. O hipogonadismo (testosterona baixa) pode causar diminuição da libido, disfunção erétil, fadiga, perda de massa muscular e alterações de humor. A reposição de testosterona, quando indicada, pode melhorar significativamente a qualidade de vida e a função sexual.",
      },
      {
        q: "O que é ejaculação precoce e como tratar?",
        a: "É a ejaculação que ocorre antes do desejado, causando insatisfação. Pode ser tratada com técnicas comportamentais, medicamentos (dapoxetina, antidepressivos em doses baixas) e, em alguns casos, tratamento tópico com anestésicos. A abordagem é individualizada e pode envolver acompanhamento multidisciplinar.",
      },
      {
        q: "Homens jovens podem ter disfunção erétil?",
        a: "Sim. Embora seja mais comum após os 40 anos, homens jovens também podem apresentar disfunção erétil. Em jovens, as causas mais frequentes são psicológicas (ansiedade, estresse), uso de substâncias, sedentarismo e, menos frequentemente, causas hormonais ou vasculares. A avaliação médica é importante para identificar e tratar a causa.",
      },
    ],
  },
  {
    category: "Cálculos Renais",
    questions: [
      {
        q: "Pedra no rim sempre precisa de cirurgia?",
        a: "Não. Cálculos pequenos (até 6mm) podem ser eliminados espontaneamente com hidratação e medicamentos. Cálculos maiores ou que causam obstrução geralmente necessitam de tratamento: litotripsia extracorpórea (LECO), ureterorrenolitotripsia a laser (flexível ou semirrígida) ou nefrolitotripsia percutânea, dependendo do tamanho e localização.",
      },
      {
        q: "Como prevenir pedra nos rins?",
        a: "As principais medidas são: ingerir pelo menos 2,5-3 litros de água por dia, reduzir o consumo de sal e proteína animal, manter peso adequado, e evitar alimentos ricos em oxalato em excesso (espinafre, chocolate, beterraba). Uma análise metabólica pode identificar fatores de risco específicos para orientar a prevenção individualizada.",
      },
      {
        q: "O que é o cateter duplo J e por que é necessário?",
        a: "O cateter duplo J é um tubo fino colocado dentro do ureter (canal entre rim e bexiga) para manter a drenagem urinária após cirurgias de cálculos ou em casos de obstrução. Pode causar desconforto, urgência urinária e sangue na urina — sintomas esperados e temporários. É removido ambulatorialmente após 2-4 semanas.",
      },
      {
        q: "Cólica renal é uma emergência?",
        a: "A cólica renal é uma dor intensa que requer atendimento médico urgente para controle da dor e avaliação. Embora nem sempre seja uma emergência cirúrgica, pode indicar obstrução urinária que, se não tratada, pode comprometer a função renal. Procure atendimento médico imediatamente.",
      },
    ],
  },
  {
    category: "Estilo de Vida",
    questions: [
      {
        q: "Exercício físico ajuda na saúde urológica?",
        a: "Sim, significativamente. Exercícios aeróbicos e de resistência (musculação) ajudam a manter níveis adequados de testosterona, previnem síndrome metabólica, melhoram a função erétil e reduzem o risco de HPB sintomática. A recomendação é pelo menos 150 minutos de atividade moderada por semana.",
      },
      {
        q: "A obesidade afeta a saúde urológica?",
        a: "Sim. A obesidade está associada a: níveis mais baixos de testosterona, maior risco de disfunção erétil, aumento do risco de cálculos renais, piora dos sintomas de HPB e maior risco de câncer de próstata agressivo. O controle do peso é fundamental para a saúde urológica.",
      },
      {
        q: "Andar de bicicleta faz mal à próstata?",
        a: "O ciclismo prolongado pode causar compressão do períneo, levando a dormência genital temporária e, raramente, disfunção erétil transitória. Não causa câncer de próstata. Usar selim adequado com canal central e fazer pausas regulares minimiza os riscos. Pode elevar temporariamente o PSA.",
      },
      {
        q: "Suplementos de testosterona são seguros?",
        a: "A reposição de testosterona só deve ser feita sob indicação e acompanhamento médico, após confirmação laboratorial de deficiência hormonal. O uso sem indicação pode causar efeitos adversos graves: infertilidade, policitemia, problemas hepáticos e cardiovasculares. Nunca use testosterona sem prescrição médica.",
      },
    ],
  },
  {
    category: "Cirurgia Robótica",
    questions: [
      {
        q: "O que é cirurgia robótica urológica?",
        a: "A cirurgia robótica é uma evolução da laparoscopia em que o cirurgião opera por meio de um console com visão 3D em alta definição e braços articulados com amplitude de movimento superior à mão humana. O sistema filtra tremores naturais e permite movimentos de extrema precisão em espaços reduzidos. Na urologia, é utilizada principalmente em prostatectomia radical, nefrectomia parcial, pieloplastia e cistectomia radical (EAU Guidelines 2024; Campbell-Walsh-Wein, 13ª ed.).",
      },
      {
        q: "O robô opera sozinho?",
        a: "Não. O robô é um instrumento — quem opera é o cirurgião. O sistema robótico (como o Da Vinci) traduz os movimentos do cirurgião em movimentos precisos dentro do corpo do paciente. Cada decisão cirúrgica é tomada pelo médico em tempo real. O robô não possui inteligência artificial nem autonomia para realizar qualquer etapa do procedimento.",
      },
      {
        q: "Quais as vantagens da cirurgia robótica sobre a cirurgia aberta?",
        a: "As principais vantagens incluem: visão 3D ampliada em até 10 vezes, maior precisão na dissecção e preservação de estruturas nobres (nervos e vasos), menor sangramento intraoperatório, incisões de apenas 8-12mm (versus 10-15cm na cirurgia aberta), menor dor pós-operatória, internação mais curta (1-2 dias versus 3-5 dias) e retorno mais rápido às atividades. Na prostatectomia radical, estudos demonstram melhor preservação da continência urinária e da função erétil (Ficarra et al., Eur Urol, 2012).",
      },
      {
        q: "Quais procedimentos urológicos podem ser feitos por robótica?",
        a: "Os principais são: prostatectomia radical (câncer de próstata), nefrectomia parcial (retirada parcial do rim para tumores renais), pieloplastia (correção de obstrução da junção ureteropélvica), cistectomia radical (câncer de bexiga), reimplante ureteral e cirurgias reconstrutivas do trato urinário. A indicação depende de cada caso e é discutida individualmente na consulta.",
      },
      {
        q: "A cirurgia robótica é segura?",
        a: "Sim. A cirurgia robótica é considerada segura e está consolidada mundialmente há mais de 20 anos. Estudos com grandes séries de casos demonstram taxas de complicações iguais ou menores que a cirurgia aberta convencional. Como em qualquer procedimento cirúrgico, existem riscos, que são discutidos detalhadamente antes da cirurgia. A experiência do cirurgião é um fator determinante nos resultados (EAU Guidelines 2024).",
      },
      {
        q: "Como é a recuperação após cirurgia robótica?",
        a: "A recuperação é significativamente mais rápida que na cirurgia aberta. Em geral, o paciente recebe alta em 1-2 dias, retorna a atividades leves em 7-10 dias e a atividades físicas em 4-6 semanas. As incisões pequenas (8-12mm) cicatrizam rapidamente e causam menos dor. Orientações específicas são fornecidas conforme o tipo de procedimento realizado.",
      },
      {
        q: "A cirurgia robótica é coberta pelo convênio?",
        a: "A cobertura varia conforme o plano de saúde e a indicação cirúrgica. Alguns convênios já cobrem procedimentos robóticos, especialmente a prostatectomia radical. Verificamos a cobertura junto ao seu convênio antes de qualquer procedimento e orientamos sobre as opções disponíveis.",
      },
    ],
  },
  {
    category: "Saúde do Homem",
    questions: [
      {
        q: "O urologista é o médico do homem?",
        a: "Sim. Assim como a mulher tem o ginecologista como médico de referência ao longo da vida, o urologista desempenha esse papel para o homem. Além de tratar doenças do trato urinário e genital, o urologista cuida da saúde sexual, hormonal, reprodutiva e metabólica masculina. O ideal é que o acompanhamento comece na adolescência — e não apenas após os 40 anos.",
      },
      {
        q: "A partir de que idade o homem deve ir ao urologista?",
        a: "O acompanhamento urológico pode e deve começar na adolescência, para avaliação de varicocele, fimose, criptorquidia e orientação sobre saúde sexual. Na fase adulta jovem (20-40 anos), o urologista avalia fertilidade, ISTs, saúde hormonal e prevenção. A partir dos 40-45 anos, inicia-se o rastreamento de câncer de próstata e HPB. Não existe idade mínima para procurar um urologista.",
      },
      {
        q: "O que o urologista avalia além da próstata?",
        a: "O urologista avalia e trata: cálculos renais, infecções urinárias, incontinência urinária, disfunção erétil, ejaculação precoce, infertilidade masculina, hipogonadismo (testosterona baixa), varicocele, fimose, ISTs (HPV, herpes), tumores renais e de bexiga, além de realizar check-up metabólico e hormonal completo. A próstata é apenas uma parte da atuação do urologista.",
      },
      {
        q: "O que é o check-up urológico masculino?",
        a: "O check-up urológico inclui: anamnese detalhada (sintomas, histórico familiar, hábitos), exame físico (incluindo toque retal quando indicado), exames laboratoriais (PSA, testosterona total e livre, hemograma, perfil lipídico, glicemia, função renal, urina) e exames de imagem quando necessário (ultrassom de vias urinárias e próstata). A periodicidade e os exames são individualizados conforme a idade e fatores de risco.",
      },
      {
        q: "Quais sinais de alerta o homem não deve ignorar?",
        a: "Procure um urologista se apresentar: sangue na urina ou no esperma, dificuldade ou dor para urinar, jato urinário fraco ou interrompido, dor lombar intensa e súbita, nódulo ou dor testicular, disfunção erétil persistente, diminuição da libido, cansaço inexplicável, perda de massa muscular ou ganho de peso abdominal sem causa aparente. Muitas dessas condições têm tratamento eficaz quando diagnosticadas precocemente.",
      },
      {
        q: "A saúde mental afeta a saúde urológica?",
        a: "Sim, significativamente. Ansiedade e depressão estão diretamente relacionadas a disfunção erétil, ejaculação precoce e sintomas urinários baixos. O estresse crônico pode reduzir os níveis de testosterona e piorar a qualidade de vida sexual. A abordagem urológica moderna considera a saúde mental como parte integral do tratamento, e o encaminhamento para acompanhamento psicológico ou psiquiátrico é feito quando necessário.",
      },
      {
        q: "Como a alimentação influencia a saúde urológica?",
        a: "A alimentação tem impacto direto: dietas ricas em frutas, vegetais, peixes e azeite (padrão mediterrâneo) estão associadas a menor risco de câncer de próstata e melhor função erétil. O excesso de sal aumenta o risco de cálculos renais. Alimentos ultraprocessados e excesso de açúcar contribuem para síndrome metabólica, que afeta testosterona e função sexual. A hidratação adequada (2,5-3L/dia) é fundamental para a prevenção de cálculos renais.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#1C3D5A]/6 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-4 text-left group"
      >
        <span className="text-sm font-medium text-[#1C3D5A] dark:text-foreground pr-4 group-hover:text-[#B87333] transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 mt-0.5 text-[#1C3D5A] dark:text-foreground/30 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#1C3D5A] dark:text-foreground/55 leading-relaxed pb-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("Consulta");

  // Flatten all FAQs for Schema markup
  const allFaqItems = faqs.flatMap((cat) =>
    cat.questions.map((q) => ({ question: q.q, answer: q.a }))
  );

  return (
    <section id="faq" className="py-16 lg:py-24">
      <FAQSchema faqs={allFaqItems} />
      <div className="container max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-[#B87333]" />
            <span className="text-xs font-semibold text-[#B87333] uppercase tracking-widest">
              Perguntas Frequentes
            </span>
          </div>
          <h2 className="text-2xl lg:text-4xl text-[#1C3D5A] dark:text-foreground mb-3 font-serif">
            Tire Suas Dúvidas
          </h2>
          <p className="text-sm text-[#1C3D5A] dark:text-foreground/50 max-w-lg mx-auto">
            Respostas para as perguntas mais comuns sobre saúde masculina, urologia, procedimentos e convênios.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {faqs.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat.category
                  ? "bg-[#1C3D5A] text-white"
                  : "bg-[#F8FAFB] text-[#1C3D5A] dark:text-foreground/50 hover:text-[#1C3D5A] dark:text-foreground hover:bg-[#1C3D5A]/5"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Questions */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-card rounded-xl border border-[#1C3D5A]/6 p-6"
        >
          {faqs
            .find((c) => c.category === activeCategory)
            ?.questions.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#1C3D5A] dark:text-foreground/40 mb-3">
            Não encontrou sua resposta?
          </p>
          <a
            href="https://wa.me/5511981124455?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20um%20tratamento%20urol%C3%B3gico."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Pergunte pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
