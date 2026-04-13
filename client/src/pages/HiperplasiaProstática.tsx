/*
 * Design: Clinical Precision — Swiss Medical Design
 * Page: Hiperplasia Prostática Benigna (HPB) — Guia para o Paciente
 * Linguagem acessível para leigos, com conteúdo baseado em EAU 2025, AUA 2023 e Campbell 13ª ed.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import EducationalLayout from "@/components/EducationalLayout";
import { FAQSchema } from "@/components/SchemaMarkup";
import {
  AlertCircle, CheckCircle2, HelpCircle, ArrowRight,
  Droplets, Moon, Clock, Activity, Pill, Zap,
  Stethoscope, ChevronDown, ChevronUp, Heart,
  ShieldCheck, BookOpen, ThermometerSun
} from "lucide-react";

/* ─── Dados dos Sintomas ─── */
const sintomas = [
  {
    icon: <Droplets className="w-5 h-5" />,
    titulo: "Jato urinário fraco",
    descricao: "O jato da urina fica mais fino, fraco ou intermitente (para e recomeça). Você pode notar que demora mais para esvaziar a bexiga.",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    titulo: "Demora para começar a urinar",
    descricao: "Mesmo com vontade, a urina demora a sair. Isso é chamado de hesitação urinária e ocorre porque a próstata comprime a uretra.",
  },
  {
    icon: <Moon className="w-5 h-5" />,
    titulo: "Acordar à noite para urinar",
    descricao: "Levantar 2 ou mais vezes durante a noite para urinar (noctúria) é um dos sintomas mais incômodos. Prejudica o sono e a qualidade de vida.",
  },
  {
    icon: <Activity className="w-5 h-5" />,
    titulo: "Urgência urinária",
    descricao: "Vontade súbita e intensa de urinar, difícil de segurar. Em alguns casos, pode haver pequenos escapes de urina antes de chegar ao banheiro.",
  },
  {
    icon: <AlertCircle className="w-5 h-5" />,
    titulo: "Sensação de esvaziamento incompleto",
    descricao: "Após urinar, a sensação de que a bexiga não esvaziou completamente. Isso pode levar a idas frequentes ao banheiro.",
  },
  {
    icon: <ThermometerSun className="w-5 h-5" />,
    titulo: "Gotejamento no final",
    descricao: "Após terminar de urinar, continuam saindo gotas de urina. Isso ocorre porque a uretra comprimida não esvazia completamente.",
  },
];

/* ─── Dados dos Fatores de Risco ─── */
const fatoresRisco = [
  { fator: "Idade acima de 50 anos", detalhe: "A HPB afeta cerca de 50% dos homens aos 50 anos e até 90% após os 80 anos." },
  { fator: "Histórico familiar", detalhe: "Ter pai ou irmão com HPB aumenta o risco, especialmente se precisaram de cirurgia." },
  { fator: "Obesidade", detalhe: "O excesso de peso está associado a próstatas maiores e sintomas mais intensos." },
  { fator: "Diabetes e síndrome metabólica", detalhe: "Condições metabólicas podem agravar os sintomas urinários." },
  { fator: "Sedentarismo", detalhe: "A atividade física regular está associada a menor risco de sintomas urinários." },
];

/* ─── Dados do Diagnóstico ─── */
const examesDiagnostico = [
  {
    nome: "Conversa com o médico (anamnese)",
    descricao: "O urologista vai perguntar sobre seus sintomas, há quanto tempo existem, o quanto incomodam e se há outros problemas de saúde. Pode pedir que você preencha um questionário chamado IPSS (Escore Internacional de Sintomas Prostáticos).",
    obrigatorio: true,
  },
  {
    nome: "Toque retal",
    descricao: "Exame rápido (dura menos de 10 segundos) em que o médico avalia o tamanho, a forma e a consistência da próstata. É indolor — pode causar leve desconforto. É fundamental para descartar nódulos suspeitos.",
    obrigatorio: true,
  },
  {
    nome: "PSA (exame de sangue)",
    descricao: "O PSA (Antígeno Prostático Específico) é um exame de sangue simples. Na HPB, o PSA pode estar levemente elevado. Valores muito altos podem indicar necessidade de investigação adicional.",
    obrigatorio: true,
  },
  {
    nome: "Ultrassom de vias urinárias",
    descricao: "Exame de imagem indolor que avalia o tamanho da próstata, o volume de urina que sobra na bexiga após urinar (resíduo pós-miccional) e a presença de complicações como cálculos ou dilatação renal.",
    obrigatorio: false,
  },
  {
    nome: "Urofluxometria",
    descricao: "Você urina em um aparelho que mede a velocidade e o volume do jato urinário. É simples, indolor e ajuda a quantificar o grau de obstrução.",
    obrigatorio: false,
  },
  {
    nome: "Estudo urodinâmico",
    descricao: "Exame mais detalhado, indicado quando há dúvida se os sintomas são causados pela próstata ou pela bexiga. Avalia a pressão e o funcionamento da bexiga durante o enchimento e o esvaziamento.",
    obrigatorio: false,
  },
];

/* ─── Dados dos Tratamentos ─── */
const tratamentos = [
  {
    categoria: "Observação vigilante",
    icone: <ShieldCheck className="w-6 h-6" />,
    cor: "bg-green-50 text-green-600 border-green-200",
    paraQuem: "Sintomas leves (IPSS < 8) que não incomodam muito",
    descricao: "Se os sintomas são leves e não atrapalham o dia a dia, o urologista pode recomendar apenas acompanhamento com consultas periódicas. Mudanças no estilo de vida (reduzir líquidos à noite, evitar cafeína e álcool, urinar em dois tempos) podem ajudar bastante.",
    exemplos: ["Consultas a cada 6-12 meses", "Mudanças no estilo de vida", "Treinamento vesical"],
  },
  {
    categoria: "Medicamentos",
    icone: <Pill className="w-6 h-6" />,
    cor: "bg-blue-50 text-blue-600 border-blue-200",
    paraQuem: "Sintomas moderados (IPSS 8-19)",
    descricao: "Existem dois tipos principais de medicamentos: os alfa-bloqueadores (tansulosina, doxazosina), que relaxam a musculatura da próstata e aliviam os sintomas rapidamente (em dias), e os inibidores da 5-alfa-redutase (finasterida, dutasterida), que reduzem o tamanho da próstata ao longo de meses. Em próstatas grandes, a combinação dos dois é mais eficaz.",
    exemplos: ["Tansulosina (Secotex/Ominic)", "Finasterida (Proscar)", "Dutasterida (Avodart)", "Tadalafila (Cialis) — também trata disfunção erétil"],
  },
  {
    categoria: "Procedimentos minimamente invasivos",
    icone: <Zap className="w-6 h-6" />,
    cor: "bg-amber-50 text-amber-600 border-amber-200",
    paraQuem: "Sintomas moderados a graves, ou quando medicamentos não funcionam",
    descricao: "São procedimentos realizados por dentro da uretra (sem cortes na pele), com anestesia raquidiana ou geral. A recuperação é mais rápida que a cirurgia aberta. As técnicas mais modernas incluem laser (HoLEP, ThuLEP) e vaporização, que removem o tecido prostático que obstrui a passagem da urina.",
    exemplos: ["RTU de próstata (ressecção transuretral)", "HoLEP / ThuLEP (enucleação a laser)", "Vaporização a laser (GreenLight)", "Rezum (vapor d'água)", "UroLift (implantes)"],
  },
  {
    categoria: "Cirurgia aberta ou robótica",
    icone: <Stethoscope className="w-6 h-6" />,
    cor: "bg-red-50 text-red-600 border-red-200",
    paraQuem: "Próstatas muito grandes (> 80-100g) ou casos complexos",
    descricao: "Para próstatas muito volumosas, pode ser necessária a prostatectomia simples (remoção do tecido interno da próstata), que pode ser feita por cirurgia aberta, laparoscópica ou robótica. A cirurgia robótica oferece menor sangramento e recuperação mais rápida.",
    exemplos: ["Prostatectomia simples aberta", "Prostatectomia simples robótica", "Enucleação a laser (HoLEP) — alternativa para qualquer tamanho"],
  },
];

/* ─── Dados das Perguntas Frequentes ─── */
const perguntasFrequentes = [
  {
    pergunta: "HPB pode virar câncer?",
    resposta: "Não. A hiperplasia prostática benigna (HPB) e o câncer de próstata são doenças diferentes que podem coexistir, mas uma não se transforma na outra. Porém, como ambas são comuns após os 50 anos, é importante fazer o acompanhamento urológico regular para rastrear as duas condições.",
  },
  {
    pergunta: "Preciso operar?",
    resposta: "A maioria dos homens com HPB não precisa de cirurgia. O tratamento depende da intensidade dos sintomas e do quanto eles afetam sua qualidade de vida. Muitos pacientes melhoram com medicamentos. A cirurgia é indicada quando os medicamentos não funcionam, quando há complicações (retenção urinária, infecções de repetição, cálculos na bexiga) ou quando o paciente prefere uma solução definitiva.",
  },
  {
    pergunta: "Os medicamentos têm efeitos colaterais?",
    resposta: "Os alfa-bloqueadores podem causar tontura, congestão nasal e ejaculação retrógrada (o sêmen vai para a bexiga em vez de sair — não é perigoso, mas pode incomodar). A finasterida/dutasterida pode reduzir a libido e causar disfunção erétil em uma pequena parcela dos pacientes. Converse com seu urologista sobre os riscos e benefícios.",
  },
  {
    pergunta: "Quanto tempo dura a recuperação da cirurgia?",
    resposta: "Depende da técnica. Procedimentos por via uretral (RTU, HoLEP) geralmente permitem alta em 1-2 dias, com retorno a atividades leves em 1-2 semanas. A sonda vesical costuma ficar por 1-3 dias. A cirurgia aberta tem recuperação um pouco mais longa (3-5 dias de internação). A melhora do jato urinário é percebida logo após a retirada da sonda.",
  },
  {
    pergunta: "A cirurgia afeta a ereção?",
    resposta: "As cirurgias para HPB (RTU, HoLEP, vaporização) têm baixo risco de causar disfunção erétil (menos de 5-10%). A ejaculação retrógrada, porém, é comum após esses procedimentos (50-90% dos casos). Isso significa que o orgasmo é preservado, mas o sêmen vai para a bexiga. Técnicas mais novas como Rezum e UroLift têm menor impacto na ejaculação.",
  },
  {
    pergunta: "Com que idade devo começar a ir ao urologista?",
    resposta: "A Sociedade Brasileira de Urologia (SBU) recomenda que todo homem faça uma consulta urológica a partir dos 50 anos, ou a partir dos 45 anos se tiver fatores de risco (histórico familiar de câncer de próstata, raça negra). Essa consulta serve para avaliar tanto a HPB quanto rastrear o câncer de próstata.",
  },
  {
    pergunta: "Posso prevenir a HPB?",
    resposta: "Não é possível prevenir completamente a HPB, pois o crescimento da próstata faz parte do envelhecimento natural. Porém, manter um peso saudável, praticar atividade física regular, ter uma dieta equilibrada e controlar diabetes e colesterol podem ajudar a reduzir a intensidade dos sintomas.",
  },
];

/* ─── Componente Accordion ─── */
function Accordion({ titulo, children, defaultOpen = false }: { titulo: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#0A2540]/8 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-[#0A2540]/2 transition-colors"
      >
        <span className="font-semibold text-[#0A2540] text-sm md:text-base">{titulo}</span>
        {open ? <ChevronUp className="w-4 h-4 text-[#0A2540]/40 shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#0A2540]/40 shrink-0" />}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="px-4 md:px-5 pb-4 md:pb-5"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

/* ─── Página Principal ─── */
export default function HiperplasiaProstática() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <EducationalLayout
      title="Hiperplasia Prostática Benigna (HPB)"
      subtitle="GUIA PARA O PACIENTE"
      description="Entenda o que é o aumento benigno da próstata, quais são os sintomas, como é feito o diagnóstico e quais são as opções de tratamento disponíveis."
      accentColor="#0D9488"
      metaTitle="Próstata Aumentada (HPB) — O Que É, Sintomas e Tratamento | Dr. Felipe de Bulhões"
      metaDescription="Guia completo sobre Hiperplasia Prostática Benigna (HPB) para pacientes: o que é, sintomas, diagnóstico, medicamentos e cirurgias. Linguagem acessível, baseado em evidências (EAU 2025, AUA 2023)."
      medicalCondition="Hiperplasia Prostática Benigna"
    >
      <FAQSchema questions={perguntasFrequentes.map(p => ({ question: p.pergunta, answer: p.resposta }))} />

      {/* ─── Introdução ─── */}
      <section className="mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#0D9488]/5 to-[#0D9488]/10 rounded-2xl p-6 md:p-8 border border-[#0D9488]/15"
        >
          <h2 className="text-xl md:text-2xl font-serif text-[#0A2540] mb-4">
            O que é a Hiperplasia Prostática Benigna?
          </h2>
          <div className="space-y-4 text-sm md:text-base text-[#0A2540]/70 leading-relaxed">
            <p>
              A <strong className="text-[#0A2540]">próstata</strong> é uma glândula do tamanho de uma noz que fica logo abaixo da bexiga e envolve a uretra (o canal por onde a urina sai). Sua função principal é produzir parte do líquido seminal.
            </p>
            <p>
              Com o passar dos anos, a próstata tende a crescer naturalmente — isso é chamado de <strong className="text-[#0A2540]">Hiperplasia Prostática Benigna (HPB)</strong>. A palavra "benigna" significa que <strong className="text-[#0A2540]">não é câncer</strong>. Esse crescimento pode comprimir a uretra e dificultar a passagem da urina, causando sintomas urinários.
            </p>
            <p>
              A HPB é extremamente comum: afeta cerca de <strong className="text-[#0A2540]">50% dos homens aos 50 anos</strong> e até <strong className="text-[#0A2540]">90% após os 80 anos</strong>. Nem todo homem com próstata aumentada terá sintomas — o tamanho da próstata nem sempre se correlaciona com a intensidade dos sintomas.
            </p>
          </div>

          {/* Ilustração simplificada */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 text-center border border-[#0A2540]/6">
              <div className="text-2xl font-bold text-[#0D9488]">~20g</div>
              <div className="text-xs text-[#0A2540]/50 mt-1">Próstata normal<br />(tamanho de uma noz)</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-[#0A2540]/6">
              <div className="text-2xl font-bold text-amber-500">40-60g</div>
              <div className="text-xs text-[#0A2540]/50 mt-1">HPB moderada<br />(tamanho de um limão)</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-[#0A2540]/6">
              <div className="text-2xl font-bold text-red-500">80-150g+</div>
              <div className="text-xs text-[#0A2540]/50 mt-1">HPB volumosa<br />(tamanho de uma laranja)</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Sintomas ─── */}
      <section className="mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl md:text-2xl font-serif text-[#0A2540] mb-2">
            Quais são os sintomas?
          </h2>
          <p className="text-sm text-[#0A2540]/50 mb-6">
            Os sintomas da HPB são chamados de LUTS (Lower Urinary Tract Symptoms — Sintomas do Trato Urinário Inferior). Nem todos os homens apresentam todos os sintomas.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {sintomas.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-[#0A2540]/6 p-5 hover:border-[#0D9488]/20 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[#0A2540] text-sm mb-1">{s.titulo}</h3>
                  <p className="text-xs text-[#0A2540]/55 leading-relaxed">{s.descricao}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alerta de sinais de gravidade */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 bg-red-50 border border-red-200 rounded-xl p-5"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-700 text-sm mb-1">Quando procurar o urologista com urgência</h3>
              <ul className="text-xs text-red-600/80 space-y-1">
                <li>• Incapacidade total de urinar (retenção urinária aguda)</li>
                <li>• Sangue na urina (hematúria)</li>
                <li>• Dor intensa ao urinar com febre</li>
                <li>• Infecções urinárias de repetição</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Fatores de Risco ─── */}
      <section className="mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl md:text-2xl font-serif text-[#0A2540] mb-6">
            Fatores de Risco
          </h2>
        </motion.div>

        <div className="space-y-3">
          {fatoresRisco.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 bg-white rounded-xl border border-[#0A2540]/6 p-4"
            >
              <ArrowRight className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#0A2540] text-sm">{f.fator}</span>
                <p className="text-xs text-[#0A2540]/50 mt-0.5">{f.detalhe}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Diagnóstico ─── */}
      <section className="mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl md:text-2xl font-serif text-[#0A2540] mb-2">
            Como é feito o diagnóstico?
          </h2>
          <p className="text-sm text-[#0A2540]/50 mb-6">
            O diagnóstico da HPB é feito pelo urologista através de uma combinação de exames. Nem todos são necessários em todos os casos — o médico vai indicar os mais adequados para a sua situação.
          </p>
        </motion.div>

        <div className="space-y-4">
          {examesDiagnostico.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-xl border border-[#0A2540]/6 p-5"
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${e.obrigatorio ? 'bg-[#0D9488]/10 text-[#0D9488]' : 'bg-[#0A2540]/5 text-[#0A2540]/40'}`}>
                  {e.obrigatorio ? <CheckCircle2 className="w-4 h-4" /> : <HelpCircle className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[#0A2540] text-sm">{e.nome}</h3>
                    {e.obrigatorio && (
                      <span className="text-[10px] bg-[#0D9488]/10 text-[#0D9488] px-2 py-0.5 rounded-full font-medium">
                        Essencial
                      </span>
                    )}
                    {!e.obrigatorio && (
                      <span className="text-[10px] bg-[#0A2540]/5 text-[#0A2540]/40 px-2 py-0.5 rounded-full font-medium">
                        Complementar
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#0A2540]/55 leading-relaxed">{e.descricao}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Tratamentos ─── */}
      <section className="mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl md:text-2xl font-serif text-[#0A2540] mb-2">
            Opções de Tratamento
          </h2>
          <p className="text-sm text-[#0A2540]/50 mb-6">
            O tratamento da HPB é individualizado — depende da intensidade dos sintomas, do tamanho da próstata, da presença de complicações e das preferências do paciente. A decisão é sempre compartilhada entre médico e paciente.
          </p>
        </motion.div>

        <div className="space-y-4">
          {tratamentos.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl border p-5 md:p-6 ${t.cor}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center">
                  {t.icone}
                </div>
                <div>
                  <h3 className="font-semibold text-[#0A2540] text-base">{t.categoria}</h3>
                  <p className="text-xs text-[#0A2540]/50">Para quem: {t.paraQuem}</p>
                </div>
              </div>
              <p className="text-sm text-[#0A2540]/70 leading-relaxed mb-3">{t.descricao}</p>
              <div className="flex flex-wrap gap-2">
                {t.exemplos.map((ex, j) => (
                  <span key={j} className="text-[11px] bg-white/60 text-[#0A2540]/60 px-2.5 py-1 rounded-full border border-[#0A2540]/8">
                    {ex}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Link para página técnica */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 bg-[#0A2540]/3 rounded-xl p-5 border border-[#0A2540]/6"
        >
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-[#0A2540] text-sm mb-1">Quer saber mais sobre cada técnica cirúrgica?</h3>
              <p className="text-xs text-[#0A2540]/55 mb-2">
                Temos uma página detalhada comparando todas as técnicas cirúrgicas para HPB (RTU, HoLEP, ThuLEP, Rezum, UroLift, GreenLight e mais), com dados de eficácia, tempo de recuperação e preservação da ejaculação.
              </p>
              <a
                href="/educativo/tratamentos-hpb"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0D9488] hover:text-[#0D9488]/80 transition-colors"
              >
                Ver comparação completa das técnicas <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Quando procurar o urologista ─── */}
      <section className="mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#0A2540] to-[#0A2540]/90 rounded-2xl p-6 md:p-8 text-white"
        >
          <h2 className="text-xl md:text-2xl font-serif mb-4">
            Quando procurar o urologista?
          </h2>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Procure um urologista se você apresentar qualquer um dos sintomas descritos acima, especialmente se eles estiverem atrapalhando sua qualidade de vida, seu sono ou suas atividades diárias.
            </p>
            <p>
              Mesmo sem sintomas, todo homem a partir dos <strong className="text-white">50 anos</strong> (ou <strong className="text-white">45 anos</strong> com fatores de risco) deve fazer uma consulta urológica anual para avaliação da próstata.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <Heart className="w-5 h-5 text-[#0D9488] mx-auto mb-2" />
              <div className="text-xs text-white/70">Atendimento humanizado e acolhedor</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <Stethoscope className="w-5 h-5 text-[#0D9488] mx-auto mb-2" />
              <div className="text-xs text-white/70">Decisão compartilhada entre médico e paciente</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <ShieldCheck className="w-5 h-5 text-[#0D9488] mx-auto mb-2" />
              <div className="text-xs text-white/70">Tratamento baseado em evidências científicas</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Perguntas Frequentes ─── */}
      <section className="mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl md:text-2xl font-serif text-[#0A2540] mb-6">
            Perguntas Frequentes
          </h2>
        </motion.div>

        <div className="space-y-3">
          {perguntasFrequentes.map((pf, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <Accordion titulo={pf.pergunta} defaultOpen={i === 0}>
                <p className="text-sm text-[#0A2540]/65 leading-relaxed">{pf.resposta}</p>
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Referências ─── */}
      <section className="mb-8">
        <h2 className="text-lg font-serif text-[#0A2540] mb-4">Referências</h2>
        <div className="bg-[#0A2540]/2 rounded-xl p-5 border border-[#0A2540]/6">
          <ol className="text-[11px] text-[#0A2540]/45 space-y-1.5 list-decimal list-inside">
            <li>EAU Guidelines on Management of Non-neurogenic Male LUTS (incl. BPO). European Association of Urology, 2025.</li>
            <li>Lerner LB, McVary KT, Barry MJ, et al. Management of Lower Urinary Tract Symptoms Attributed to Benign Prostatic Hyperplasia: AUA Guideline Part I and II. J Urol. 2021;206(4):806-826.</li>
            <li>Campbell-Walsh-Wein Urology, 13th Edition — Chapter on Benign Prostatic Hyperplasia. Elsevier, 2024.</li>
            <li>Roehrborn CG. Benign Prostatic Hyperplasia: Etiology, Pathophysiology, Epidemiology, and Natural History. In: Campbell-Walsh-Wein Urology. 13th ed. Elsevier; 2024.</li>
            <li>Sociedade Brasileira de Urologia (SBU). Consenso sobre HPB. Portal da Urologia, 2024.</li>
            <li>Gravas S, Cornu JN, Gacci M, et al. EAU Guidelines on Management of Non-Neurogenic Male Lower Urinary Tract Symptoms (LUTS), incl. Benign Prostatic Obstruction (BPO). Eur Urol. 2025.</li>
            <li>McVary KT, Roehrborn CG, Avins AL, et al. Update on AUA Guideline on the Management of Benign Prostatic Hyperplasia. J Urol. 2011;185(5):1793-1803.</li>
            <li>Nickel JC, Aaron L, Barkin J, et al. Canadian Urological Association guideline on male lower urinary tract symptoms/benign prostatic hyperplasia (MLUTS/BPH). Can Urol Assoc J. 2018;12(10):303-312.</li>
          </ol>
        </div>
      </section>
    </EducationalLayout>
  );
}
