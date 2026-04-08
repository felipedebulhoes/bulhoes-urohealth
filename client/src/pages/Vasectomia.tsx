/**
 * Design: Clinical Precision — Swiss Medical Design
 * Página: Vasectomia — Guia Completo
 * Referências: AUA Vasectomy Guideline 2026, EAU Guidelines 2025, Campbell-Walsh-Wein 13th Ed.
 */
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Stethoscope,
  Activity,
  FileText,
  HeartPulse,
  ChevronRight,
  MapPin,
  Phone,
  Scissors,
  ShieldCheck,
  ShieldAlert,
  CalendarCheck,
  Building2,
  Pill,
  Ban,
  Timer,
  UserCheck,
  Baby,
  Heart,
  Zap,
  TestTube,
  Undo2,
  Info,
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import EducationalLayout from "@/components/EducationalLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function Vasectomia() {
  return (
    <EducationalLayout
      title="Vasectomia: Guia Completo"
      subtitle="Contracepção Masculina Definitiva"
      description="Tudo o que você precisa saber sobre a vasectomia: indicações, preparo, como é realizada, pós-operatório, complicações e perguntas frequentes. Informações baseadas no AUA Vasectomy Guideline 2026 e EAU Guidelines 2025."
      accentColor="#0D9488"
      metaTitle="Vasectomia: Como é Feita, Preparo, Recuperação e Riscos | Dr. Felipe de Bulhões"
      metaDescription="Guia completo sobre vasectomia: indicações, técnica no-scalpel, preparo, pós-operatório, espermograma de controle e reversão. Baseado no AUA Guideline 2026."
    >
      {/* Introdução */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 border-l-4 border-[#0D9488] p-6 rounded-r-lg mb-10">
              <p className="text-[#0A2540] leading-relaxed">
                A vasectomia é o <strong>método mais seguro e eficaz de contracepção permanente masculina</strong>. Trata-se de um procedimento ambulatorial, minimamente invasivo, com taxa de falha inferior a 1%. Segundo o <strong>AUA Vasectomy Guideline (2026)</strong>, mais de 500.000 vasectomias são realizadas anualmente nos Estados Unidos, sendo um dos procedimentos urológicos mais comuns. O procedimento <strong>não altera a libido, a ereção nem a ejaculação</strong> — apenas impede a passagem dos espermatozoides.
              </p>
            </div>
          </motion.div>

          {/* O que é */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">O que é a Vasectomia?</h2>
            <p className="text-[#334155] leading-relaxed mb-4">
              A vasectomia é um procedimento cirúrgico que consiste na <strong>secção e oclusão dos ductos deferentes</strong> — os canais que transportam os espermatozoides dos testículos até a uretra. Após a vasectomia, os espermatozoides continuam sendo produzidos pelos testículos, mas são reabsorvidos pelo organismo, sem serem eliminados no ejaculado.
            </p>
            <p className="text-[#334155] leading-relaxed mb-6">
              O procedimento é realizado sob <strong>anestesia local</strong>, dura entre 15 e 30 minutos, e o paciente recebe alta no mesmo dia. A vasectomia <strong>não interfere na produção de testosterona</strong>, portanto não causa alterações hormonais, mudanças na voz, perda de pelos ou ganho de peso. O volume do ejaculado permanece praticamente inalterado, pois os espermatozoides representam apenas 2-5% do sêmen.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Timer, label: "15-30 min", desc: "Duração do procedimento" },
                { icon: ShieldCheck, label: "< 1%", desc: "Taxa de falha" },
                { icon: Activity, label: "Ambulatorial", desc: "Alta no mesmo dia" },
              ].map((item, i) => (
                <div key={i} className="bg-[#0D9488]/5 rounded-xl p-5 text-center border border-[#0D9488]/10">
                  <item.icon className="w-8 h-8 text-[#0D9488] mx-auto mb-2" />
                  <p className="text-xl font-bold text-[#0A2540]">{item.label}</p>
                  <p className="text-xs text-[#64748B]">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Indicações */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Quando a Vasectomia é Indicada?</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A vasectomia é indicada para homens que desejam <strong>contracepção definitiva</strong> e que já têm certeza de que não querem mais filhos. Segundo o AUA Guideline 2026, a consulta pré-operatória é obrigatória e deve abordar:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Desejo de contracepção permanente",
                  desc: "O homem deve compreender que a vasectomia é um método definitivo. Embora a reversão seja possível, ela não é garantida e não deve ser considerada no planejamento.",
                  icon: UserCheck,
                },
                {
                  title: "Planejamento familiar completo",
                  desc: "Casais que já completaram a família e desejam um método contraceptivo seguro, sem os efeitos colaterais dos métodos hormonais femininos.",
                  icon: Baby,
                },
                {
                  title: "Alternativa à laqueadura tubária",
                  desc: "A vasectomia tem taxa de falha menor que a laqueadura, é menos invasiva, mais rápida, com menor custo e menor risco de complicações.",
                  icon: Heart,
                },
                {
                  title: "Condições médicas da parceira",
                  desc: "Quando a parceira tem contraindicações ao uso de anticoncepcionais hormonais ou quando uma gestação representaria risco à saúde.",
                  icon: ShieldAlert,
                },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[#0D9488]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A2540] mb-1">{item.title}</h4>
                      <p className="text-[#334155] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800">
                <strong>Importante (AUA 2026):</strong> Não existe idade mínima obrigatória para a vasectomia, mas a decisão deve ser tomada com maturidade e sem pressão. Homens jovens (abaixo de 30 anos) e sem filhos devem ser aconselhados sobre a possibilidade de arrependimento futuro.
              </p>
            </div>
          </motion.div>

          {/* Mitos e Verdades */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Mitos e Verdades sobre a Vasectomia</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              O AUA Vasectomy Guideline 2026 abordou especificamente diversas preocupações comuns dos pacientes, com base em evidências científicas de alta qualidade:
            </p>
            <div className="space-y-3">
              {[
                {
                  myth: "Vasectomia causa câncer de próstata",
                  truth: "NÃO há relação causal entre vasectomia e câncer de próstata, incluindo formas agressivas. (AUA 2026 — Evidência Grau B)",
                  isTrue: false,
                },
                {
                  myth: "Vasectomia aumenta risco de doença cardiovascular",
                  truth: "NÃO há relação causal entre vasectomia e doença cardiovascular. (AUA 2026 — Evidência Grau C)",
                  isTrue: false,
                },
                {
                  myth: "Vasectomia causa pedra nos rins",
                  truth: "NÃO há relação causal entre vasectomia e nefrolitíase (cálculos renais). (AUA 2026 — Evidência Grau B)",
                  isTrue: false,
                },
                {
                  myth: "Vasectomia diminui a libido ou a ereção",
                  truth: "A vasectomia NÃO afeta a produção de testosterona, a libido, a ereção nem o prazer sexual. A ejaculação permanece normal.",
                  isTrue: false,
                },
                {
                  myth: "Vasectomia é um procedimento seguro e eficaz",
                  truth: "VERDADEIRO. A vasectomia é um dos métodos contraceptivos mais seguros, com taxa de falha < 1% e complicações graves raras. (AUA 2026)",
                  isTrue: true,
                },
                {
                  myth: "A vasectomia pode ser revertida",
                  truth: "VERDADEIRO, porém a reversão não é garantida. O sucesso depende do tempo desde a vasectomia, idade do paciente e da parceira. (AUA 2026)",
                  isTrue: true,
                },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl p-5 border ${item.isTrue ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.isTrue ? "bg-green-100" : "bg-red-100"}`}>
                      {item.isTrue ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Ban className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className={`font-bold text-sm mb-1 ${item.isTrue ? "text-green-800" : "text-red-800"}`}>
                        "{item.myth}"
                      </p>
                      <p className="text-sm text-[#334155] leading-relaxed">{item.truth}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Preparo */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Preparo para a Vasectomia</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              O preparo para a vasectomia é simples. As orientações abaixo seguem as recomendações do AUA Guideline 2026:
            </p>

            <h3 className="text-xl font-bold text-[#0A2540] mb-4 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-[#0D9488]" />
              Antes do Procedimento
            </h3>
            <div className="space-y-4 mb-8">
              {[
                {
                  step: "1",
                  title: "Consulta pré-operatória",
                  desc: "Obrigatória segundo o AUA 2026. Pode ser presencial ou por telemedicina. O médico discutirá o procedimento, riscos, alternativas e confirmará o desejo de contracepção permanente.",
                },
                {
                  step: "2",
                  title: "Tricotomia (depilação)",
                  desc: "Realizar a depilação da região escrotal na véspera ou no dia do procedimento. Utilizar máquina de cortar cabelo ou tesoura — evitar lâmina de barbear para não causar microlesões na pele.",
                },
                {
                  step: "3",
                  title: "Higiene local",
                  desc: "Tomar banho e realizar higiene cuidadosa da região genital antes de ir ao consultório.",
                },
                {
                  step: "4",
                  title: "Roupa íntima de suporte",
                  desc: "Levar uma cueca justa (tipo boxer ou sunga) para usar após o procedimento, pois ajuda a manter o curativo no local e reduz o desconforto.",
                },
                {
                  step: "5",
                  title: "Acompanhante",
                  desc: "Embora não seja obrigatório (o procedimento é sob anestesia local), é recomendável ir acompanhado para maior conforto no retorno.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#0D9488] text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#0A2540] mb-1">{item.title}</h4>
                    <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-[#0A2540] mb-4 flex items-center gap-2">
              <Ban className="w-5 h-5 text-red-500" />
              O que Evitar Antes da Vasectomia
            </h3>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <ul className="space-y-3">
                {[
                  "Anti-inflamatórios (ibuprofeno, naproxeno) — suspender 5-7 dias antes",
                  "AAS (aspirina) — discutir com o médico a necessidade de suspensão",
                  "Anticoagulantes — suspender conforme orientação médica",
                  "Suplementos com efeito anticoagulante (ginkgo biloba, ômega-3, vitamina E)",
                  "Álcool nas 24 horas antes do procedimento",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                    <Ban className="w-4 h-4 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-amber-800">
                <strong>Nota (AUA 2026):</strong> Antibióticos perioperatórios <strong>não são necessários</strong> para a vasectomia, exceto em pacientes de alto risco para infecção. A pele deve ser preparada com solução antisséptica antes do procedimento.
              </p>
            </div>
          </motion.div>

          {/* Como é realizada */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={5} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Como é Realizada a Vasectomia?</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A técnica recomendada pelo AUA Guideline 2026 é a <strong>vasectomia sem bisturi (no-scalpel vasectomy — NSV)</strong>, uma abordagem minimamente invasiva com menor risco de sangramento e infecção. Abaixo, o passo a passo do procedimento:
            </p>

            <h3 className="text-xl font-bold text-[#0A2540] mb-4 flex items-center gap-2">
              <Scissors className="w-5 h-5 text-[#0D9488]" />
              Passo a Passo do Procedimento
            </h3>
            <div className="space-y-4 mb-8">
              {[
                {
                  step: "1",
                  title: "Anestesia local",
                  desc: "A região escrotal é anestesiada com infiltração de lidocaína por agulha fina ou injetor a jato (sem agulha). Um anestésico tópico (creme de lidocaína) pode ser aplicado previamente para reduzir o desconforto da infiltração. Não é necessária sedação nem anestesia geral.",
                },
                {
                  step: "2",
                  title: "Acesso ao ducto deferente (técnica no-scalpel)",
                  desc: "O ducto deferente é palpado e fixado sob a pele do escroto. Em vez de incisão com bisturi, utiliza-se uma pinça especial (ring clamp) para fazer uma pequena abertura puntiforme na pele — geralmente de 2-3 mm, sem necessidade de pontos.",
                },
                {
                  step: "3",
                  title: "Isolamento do ducto deferente",
                  desc: "O ducto deferente é exteriorizado e isolado das estruturas adjacentes (vasos sanguíneos e nervos). A técnica minimamente invasiva reduz significativamente o risco de hematoma.",
                },
                {
                  step: "4",
                  title: "Oclusão do ducto deferente",
                  desc: "A técnica recomendada (AUA 2026 — Strong Recommendation, Grau B) combina cauterização da mucosa (MC) + interposição fascial (FI). A mucosa interna do ducto é cauterizada e a fáscia que envolve o ducto é interposta entre as duas extremidades, criando uma barreira adicional. NÃO se deve usar apenas ligadura simples com excisão.",
                },
                {
                  step: "5",
                  title: "Repetição do lado contralateral",
                  desc: "O mesmo procedimento é realizado no ducto deferente do outro lado, geralmente pela mesma abertura na pele ou por uma segunda abertura puntiforme.",
                },
                {
                  step: "6",
                  title: "Curativo e alta",
                  desc: "Um curativo simples é aplicado. O paciente recebe orientações pós-operatórias e é liberado para casa. O procedimento completo dura entre 15 e 30 minutos.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#0D9488] text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#0A2540] mb-1">{item.title}</h4>
                    <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparação de técnicas */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-[#0A2540] text-white p-4">
                <h3 className="text-lg font-bold">Comparação: No-Scalpel vs. Vasectomia Convencional</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-bold text-[#0A2540] border-b">Característica</th>
                      <th className="text-left p-4 font-bold text-[#0D9488] border-b">No-Scalpel (NSV)</th>
                      <th className="text-left p-4 font-bold text-gray-500 border-b">Convencional</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Incisão", "Abertura puntiforme (2-3 mm)", "Incisão com bisturi (1-2 cm)"],
                      ["Sangramento", "Mínimo", "Maior risco de hematoma"],
                      ["Infecção", "Menor risco", "Risco padrão"],
                      ["Pontos", "Geralmente não necessários", "Podem ser necessários"],
                      ["Dor pós-operatória", "Menor", "Moderada"],
                      ["Recuperação", "Mais rápida", "Padrão"],
                      ["Recomendação AUA", "Recomendada (Grau A)", "Aceitável"],
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-4 font-medium text-[#0A2540] border-b">{row[0]}</td>
                        <td className="p-4 text-[#334155] border-b">{row[1]}</td>
                        <td className="p-4 text-[#64748B] border-b">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Pós-operatório */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={6} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Pós-Operatório: O que Esperar</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A recuperação após a vasectomia é rápida. A maioria dos homens retorna às atividades leves em 2-3 dias. Veja o que é normal e o que requer atenção:
            </p>

            <h3 className="text-xl font-bold text-[#0A2540] mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Sintomas Normais (Esperados)
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                {
                  title: "Desconforto leve no escroto",
                  duration: "2-5 dias",
                  desc: "Dor leve a moderada é esperada nos primeiros dias. Controlada com paracetamol ou anti-inflamatórios (AUA 2026: NÃO usar opioides).",
                  icon: HeartPulse,
                },
                {
                  title: "Inchaço e equimose (roxo)",
                  duration: "5-7 dias",
                  desc: "Edema leve e manchas arroxeadas na região escrotal são comuns e resolvem espontaneamente.",
                  icon: Activity,
                },
                {
                  title: "Pequeno sangramento no local",
                  duration: "1-2 dias",
                  desc: "Pode haver mínimo sangramento ou secreção no local da abertura. Manter o curativo limpo e seco.",
                  icon: Shield,
                },
                {
                  title: "Ejaculação com sangue",
                  duration: "1-2 semanas",
                  desc: "Hematospermia (sêmen avermelhado ou escuro) pode ocorrer nas primeiras ejaculações e é normal.",
                  icon: AlertTriangle,
                },
              ].map((item, i) => (
                <div key={i} className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-green-800 text-sm">{item.title}</h4>
                  </div>
                  <p className="text-xs text-green-700 font-medium mb-2">Duração: {item.duration}</p>
                  <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-[#0A2540] mb-4 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-[#0D9488]" />
              Orientações Pós-Operatórias
            </h3>
            <div className="space-y-3 mb-8">
              {[
                { text: "Repouso relativo por 48-72 horas (evitar esforço físico)", icon: Clock },
                { text: "Aplicar gelo na região escrotal nas primeiras 24-48h (20 min a cada hora)", icon: Zap },
                { text: "Usar cueca justa (suporte escrotal) por 5-7 dias", icon: Shield },
                { text: "Analgesia com paracetamol ou AINES — NÃO usar opioides (AUA 2026)", icon: Pill },
                { text: "Evitar exercícios físicos intensos por 7 dias", icon: Activity },
                { text: "Evitar relações sexuais por 5-7 dias (ou até se sentir confortável)", icon: Heart },
                { text: "Retorno ao trabalho leve em 2-3 dias; trabalho pesado em 7 dias", icon: Building2 },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <item.icon className="w-5 h-5 text-[#0D9488] mt-0.5 shrink-0" />
                  <p className="text-sm text-[#334155]">{item.text}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-[#0A2540] mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Sinais de Alerta — Procure o Médico
            </h3>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <ul className="space-y-3">
                {[
                  "Febre acima de 38°C",
                  "Dor intensa e progressiva que não melhora com analgésicos",
                  "Inchaço excessivo ou aumento rápido do volume escrotal (hematoma)",
                  "Secreção purulenta (pus) no local da incisão",
                  "Vermelhidão extensa na região escrotal",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Espermograma de Controle */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={7} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Espermograma de Controle (PVSA)</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A vasectomia <strong>não é imediatamente eficaz</strong>. Espermatozoides residuais permanecem nos ductos deferentes acima do ponto de oclusão e precisam ser eliminados. O espermograma pós-vasectomia (PVSA) é <strong>obrigatório</strong> para confirmar o sucesso do procedimento.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-[#0A2540] mb-4 flex items-center gap-2">
                <TestTube className="w-5 h-5 text-blue-600" />
                Recomendações do AUA 2026
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Quando coletar?",
                    desc: "A amostra pode ser coletada a partir de 8 semanas após a vasectomia. (Recomendação Condicional — Grau C)",
                  },
                  {
                    title: "Quantas amostras?",
                    desc: "Pelo menos uma amostra de sêmen deve ser fornecida para confirmar o sucesso. (Recomendação Moderada — Grau C)",
                  },
                  {
                    title: "Critério de liberação",
                    desc: "Azoospermia completa OU ≤ 100.000 espermatozoides não-móveis/mL (RNMS) em amostra avaliada em até 2 horas. Se avaliada após 2h: deve mostrar azoospermia.",
                  },
                  {
                    title: "Método de avaliação",
                    desc: "Amostra não centrifugada, avaliada em laboratório, consultório ou por teste enviado por correio (mail-in testing).",
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white/70 rounded-lg p-4">
                    <h4 className="font-bold text-[#0A2540] text-sm mb-1">{item.title}</h4>
                    <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                <strong>ATENÇÃO:</strong> Até a confirmação do espermograma negativo, o casal <strong>DEVE continuar usando outro método contraceptivo</strong>. A vasectomia só é considerada eficaz após o resultado do PVSA.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-[#334155]">
                <strong>Se espermatozoides móveis persistirem após 6 meses:</strong> deve-se considerar re-vasectomia. Se houver &gt; 100.000 espermatozoides não-móveis/mL após 6 meses, a decisão entre re-vasectomia, manutenção de contracepção ou novos espermogramas deve ser compartilhada entre médico e paciente. (AUA 2026 — Expert Opinion)
              </p>
            </div>
          </motion.div>

          {/* Complicações */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={8} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Possíveis Complicações</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A vasectomia é um procedimento seguro, mas como qualquer cirurgia, pode apresentar complicações. O AUA Guideline 2026 destaca que o cirurgião deve ser capaz de reconhecer e tratar as seguintes complicações:
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Hematoma",
                  freq: "1-6%",
                  severity: "Leve a moderada",
                  desc: "Acúmulo de sangue no escroto. Geralmente resolve com repouso e gelo. Hematomas grandes podem necessitar drenagem cirúrgica.",
                  color: "amber",
                },
                {
                  title: "Infecção",
                  freq: "< 4%",
                  severity: "Leve a moderada",
                  desc: "Infecção no local da incisão. Tratada com antibióticos e cuidados locais. Rara com técnica no-scalpel.",
                  color: "amber",
                },
                {
                  title: "Epididimite / Orquite congestiva",
                  freq: "1-3%",
                  severity: "Moderada",
                  desc: "Inflamação do epidídimo por congestão de espermatozoides. Causa dor e inchaço testicular. Tratada com anti-inflamatórios.",
                  color: "amber",
                },
                {
                  title: "Granuloma espermático",
                  freq: "1-3%",
                  severity: "Leve",
                  desc: "Nódulo inflamatório no local da vasectomia causado por extravasamento de espermatozoides. Geralmente assintomático; quando doloroso, pode necessitar excisão.",
                  color: "blue",
                },
                {
                  title: "Dor escrotal crônica (PVPS)",
                  freq: "1-2%",
                  severity: "Variável",
                  desc: "Dor persistente que afeta a qualidade de vida, ocorrendo em 1-2% dos casos. Pode necessitar tratamento multimodal. Abordada no AUA Guideline on Chronic Pelvic Pain.",
                  color: "red",
                },
                {
                  title: "Falha da vasectomia (recanalização)",
                  freq: "< 1%",
                  severity: "—",
                  desc: "Recanalização espontânea dos ductos deferentes, resultando em retorno de espermatozoides ao ejaculado. Por isso o espermograma de controle é obrigatório.",
                  color: "red",
                },
              ].map((item, i) => {
                const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
                  blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", badge: "bg-blue-100 text-blue-700" },
                  amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", badge: "bg-amber-100 text-amber-700" },
                  red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", badge: "bg-red-100 text-red-700" },
                };
                const c = colorMap[item.color];
                return (
                  <div key={i} className={`${c.bg} ${c.border} border rounded-xl p-5`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-bold ${c.text}`}>{item.title}</h4>
                      <div className="flex gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.badge}`}>
                          Frequência: {item.freq}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Reversão */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={9} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Reversão da Vasectomia</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              Embora a vasectomia seja considerada um método permanente, a <strong>reversão é possível</strong> através de microcirurgia. O AUA Guideline 2026 aborda detalhadamente as opções de restauração da fertilidade após vasectomia:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-[#0D9488]/10 rounded-lg flex items-center justify-center mb-4">
                  <Undo2 className="w-6 h-6 text-[#0D9488]" />
                </div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-3">Vasovasostomia</h3>
                <p className="text-sm text-[#334155] leading-relaxed mb-3">
                  Reconexão microcirúrgica dos ductos deferentes. Técnica de 1 ou 2 camadas (AUA 2026). Taxas de patência de 75-97% quando realizada nos primeiros 3 anos.
                </p>
                <ul className="space-y-2">
                  {["Técnica microcirúrgica", "Melhor resultado com menor tempo de obstrução", "Anastomose de 1 ou 2 camadas"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#334155]">
                      <CheckCircle2 className="w-3 h-3 text-[#0D9488] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Baby className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-3">Recuperação de Espermatozoides + ICSI</h3>
                <p className="text-sm text-[#334155] leading-relaxed mb-3">
                  Alternativa à reversão cirúrgica. Espermatozoides são recuperados diretamente do testículo ou epidídimo e utilizados em fertilização in vitro (FIV) com injeção intracitoplasmática (ICSI).
                </p>
                <ul className="space-y-2">
                  {["Não requer reconstrução do ducto", "Indicada quando reversão não é viável", "Depende de FIV/ICSI"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#334155]">
                      <CheckCircle2 className="w-3 h-3 text-blue-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Preditores de sucesso da reversão (AUA 2026):</strong> Os melhores preditores pré-operatórios são: <strong>tempo desde a vasectomia</strong> (quanto menor, melhor), <strong>idade do paciente</strong> e <strong>idade da parceira</strong>. O melhor preditor intraoperatório é a presença de espermatozoides no fluido vasal no momento da reconstrução.
              </p>
            </div>
          </motion.div>

          {/* Onde é realizada */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={10} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Onde a Vasectomia é Realizada</h2>
            <div className="bg-gradient-to-r from-[#0A2540] to-[#0D3B66] rounded-xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-[#0D9488]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Campinas Day Hospital</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">
                    Centro cirúrgico moderno no Cambuí, em Campinas, com estrutura completa para procedimentos ambulatoriais. A vasectomia é realizada com técnica no-scalpel, sob anestesia local, com alta no mesmo dia.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
                    <MapPin className="w-4 h-4" />
                    Av. Benjamin Constant, 1991 — Cambuí, Campinas/SP
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
                    <Phone className="w-4 h-4" />
                    WhatsApp (11) 98112-4455 — apenas mensagens | Tel: Clinovi (11) 3382-1529 | Campinas (19) 2127-2900
                  </div>
                  <Link href="/local/campinas-day-hospital">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Ver Detalhes do Local <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={11} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Perguntas Frequentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: "A vasectomia dói?",
                  a: "O procedimento é realizado sob anestesia local, portanto a dor durante a cirurgia é mínima — geralmente limitada à picada da anestesia. Após o procedimento, é normal sentir desconforto leve por 2-5 dias, controlado com paracetamol ou anti-inflamatórios.",
                },
                {
                  q: "Quanto tempo depois da vasectomia posso ter relações sexuais?",
                  a: "Geralmente após 5-7 dias, ou quando se sentir confortável. IMPORTANTE: é obrigatório usar outro método contraceptivo até o espermograma de controle confirmar a ausência de espermatozoides (mínimo 8 semanas após o procedimento).",
                },
                {
                  q: "A vasectomia afeta a ereção ou o prazer sexual?",
                  a: "Não. A vasectomia não interfere na produção de testosterona, na libido, na ereção nem no orgasmo. O volume do ejaculado permanece praticamente inalterado, pois os espermatozoides representam apenas 2-5% do sêmen.",
                },
                {
                  q: "A vasectomia é coberta pelo convênio?",
                  a: "Sim. A vasectomia está incluída no rol de procedimentos da ANS e é coberta pela maioria dos convênios médicos. Também é oferecida pelo SUS. Verifique com seu plano de saúde os detalhes de cobertura.",
                },
                {
                  q: "Posso fazer vasectomia se não tenho filhos?",
                  a: "Sim, não há exigência legal de ter filhos para realizar a vasectomia no Brasil. A Lei de Planejamento Familiar (Lei 14.443/2022) permite a vasectomia a partir dos 21 anos, independentemente do número de filhos, com prazo de reflexão de 60 dias.",
                },
                {
                  q: "Preciso da autorização da esposa/parceira?",
                  a: "Segundo a Lei 14.443/2022, não é necessário consentimento do cônjuge para a realização da vasectomia. A decisão é individual do paciente, embora a discussão em casal seja sempre recomendada.",
                },
                {
                  q: "Quanto tempo leva para a vasectomia fazer efeito?",
                  a: "A vasectomia não é imediatamente eficaz. Espermatozoides residuais permanecem nos ductos acima do ponto de corte. O espermograma de controle pode ser coletado a partir de 8 semanas. Até a confirmação, use outro método contraceptivo.",
                },
                {
                  q: "A vasectomia pode falhar?",
                  a: "A taxa de falha é inferior a 1%. A recanalização espontânea (reconexão dos ductos) é rara, mas possível. Por isso o espermograma de controle é obrigatório para confirmar o sucesso.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h4 className="font-bold text-[#0A2540] mb-2">{item.q}</h4>
                  <p className="text-sm text-[#334155] leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Referências */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={12}>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-[#0A2540] mb-4">Referências</h3>
              <ol className="space-y-2 text-sm text-[#64748B]">
                <li>1. Schlegel PN, Clark JY, Coward RM, et al. Vasectomy: AUA Guideline Part I. J Urol. 2026. DOI:10.1097/JU.0000000000004861.</li>
                <li>2. Schlegel PN, Clark JY, Coward RM, et al. Fertility Restoration After Vasectomy: AUA Guideline Part II. J Urol. 2026. DOI:10.1097/JU.0000000000004862.</li>
                <li>3. EAU Guidelines on Sexual and Reproductive Health — Vasectomy, 2025. European Association of Urology.</li>
                <li>4. Campbell-Walsh-Wein Urology, 13th Edition — Chapter on Vasectomy. Elsevier, 2024.</li>
                <li>5. Sharlip ID, et al. Vasectomy: AUA Guideline. J Urol. 2012;188(6 Suppl):2482-2491.</li>
                <li>6. Cook LA, et al. Scalpel versus no-scalpel incision for vasectomy. Cochrane Database Syst Rev. 2014;(3):CD004112.</li>
                <li>7. Labrecque M, et al. Vasectomy surgical techniques: a systematic review. BMC Med. 2004;2:21.</li>
                <li>8. Sociedade Brasileira de Urologia (SBU) — Nota Técnica sobre Vasectomia, 2023.</li>
                <li>9. Lei 14.443/2022 — Altera a Lei de Planejamento Familiar (Lei 9.263/1996). Diário Oficial da União, 2022.</li>
                <li>10. Rust JO, et al. Vasectomy in real-world clinical practice: an ideal checklist. Int J Impot Res. 2025. DOI:10.1038/s41443-025-01158-8.</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </section>
    </EducationalLayout>
  );
}
