/*
 * Design: Clinical Precision — Swiss Medical Design
 * Página: Litotripsia a Laser — Guia Completo
 * Referências: EAU Guidelines on Urolithiasis 2025, AUA Surgical Management of Stones 2024, Campbell-Walsh-Wein 13th Ed.
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
  Zap,
  Target,
  ShieldAlert,
  CalendarCheck,
  Building2,
  Pill,
  Droplets,
  ThermometerSun,
  Ban,
  Flame,
  Waves,
  ArrowRight,
  Microscope,
  Scale,
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

export default function LitotripsieLaser() {
  return (
    <EducationalLayout
      title="Litotripsia a Laser: Guia Completo"
      subtitle="Tratamento de Cálculos Renais e Ureterais"
      description="Tudo sobre litotripsia a laser para cálculos renais e ureterais: como funciona, indicações, tipos de laser, preparo, pós-operatório e complicações. Baseado nas diretrizes da EAU 2025 e AUA."
      accentColor="#2563EB"
      metaTitle="Litotripsia a Laser: Como Funciona, Indicações e Recuperação | Dr. Felipe de Bulhões"
      metaDescription="Guia completo sobre litotripsia a laser para pedra nos rins: como é feita, tipos de laser (Holmium e Thulium), preparo, pós-operatório e complicações. Procedimento realizado no Campinas Day Hospital."
    >
      {/* Introdução */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-[#2563EB] p-6 rounded-r-lg mb-10">
              <p className="text-[#0A2540] leading-relaxed">
                A <strong>litotripsia a laser</strong> é o método mais moderno e eficaz para o tratamento de cálculos renais e ureterais (pedras nos rins e no ureter). O procedimento é realizado por via endoscópica (ureteroscopia), sem cortes, utilizando uma fibra de laser para fragmentar o cálculo em partículas minúsculas que são eliminadas naturalmente pela urina. Segundo as <strong>diretrizes da European Association of Urology (EAU 2025)</strong>, o laser Holmium:YAG e o Thulium Fiber Laser são as tecnologias recomendadas com grau de evidência forte.
              </p>
            </div>
          </motion.div>

          {/* O que é */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">O que é a Litotripsia a Laser?</h2>
            <p className="text-[#334155] leading-relaxed mb-4">
              A litotripsia a laser é um procedimento minimamente invasivo no qual um <strong>ureteroscópio</strong> (instrumento fino e flexível com câmera) é introduzido pela uretra, passando pela bexiga até o ureter ou rim, sem necessidade de incisões. Ao localizar o cálculo, uma fibra de laser é passada pelo canal de trabalho do ureteroscópio e direcionada ao cálculo, fragmentando-o em partículas microscópicas ("poeira") ou em pedaços menores que são removidos com pinças ou cestas endoscópicas.
            </p>
            <p className="text-[#334155] leading-relaxed mb-6">
              O procedimento é tecnicamente chamado de <strong>Ureteroscopia (URS) com Litotripsia Intracorpórea a Laser</strong>. Quando realizado no rim, é denominado <strong>Cirurgia Renal Retrógrada Intrarenal (RIRS — Retrograde Intrarenal Surgery)</strong>, utilizando ureteroscópio flexível.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Flame className="w-6 h-6 text-[#2563EB]" />
                </div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-3">Laser Holmium:YAG (Ho:YAG)</h3>
                <p className="text-[#334155] text-sm leading-relaxed mb-3">
                  O <strong>gold standard</strong> histórico para litotripsia endoscópica. Emite pulsos de energia que fragmentam o cálculo por efeito fototérmico. Disponível em versões de baixa e alta potência (até 120W).
                </p>
                <ul className="space-y-2">
                  {[
                    "Eficaz em todos os tipos de cálculo",
                    "Tecnologia Moses: reduz retropulsão",
                    "Permite dusting e fragmentação",
                    "Ampla experiência clínica mundial",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[#64748B] mt-3 italic">Recomendação forte — EAU 2025</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-[#2563EB]" />
                </div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-3">Thulium Fiber Laser (TFL)</h3>
                <p className="text-[#334155] text-sm leading-relaxed mb-3">
                  Tecnologia de <strong>última geração</strong> que utiliza fibras mais finas e frequências de pulso mais altas. Resultados clínicos comparáveis ao Ho:YAG, com possível vantagem em tempo operatório.
                </p>
                <ul className="space-y-2">
                  {[
                    "Fibras mais finas (até 50μm)",
                    "Menor retropulsão do cálculo",
                    "Dusting mais eficiente",
                    "Tempo operatório potencialmente menor",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[#64748B] mt-3 italic">Nível de evidência 2a — EAU 2025</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800">
                <strong>Recomendação EAU 2025 (Grau Forte):</strong> "Utilizar laser Holmium:YAG (Ho:YAG) ou Thulium Fiber Laser (TFL) para litotripsia durante ureteroscopia flexível." Ambas as tecnologias são igualmente recomendadas, com o TFL apresentando resultados promissores em estudos recentes.
              </p>
            </div>
          </motion.div>

          {/* Como funciona - Passo a Passo */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Como é Realizada a Litotripsia a Laser?</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              O procedimento é realizado em centro cirúrgico, sob <strong>anestesia geral ou raquianestesia</strong>, com o paciente em posição de litotomia (deitado de costas com as pernas elevadas). A duração varia de 30 a 90 minutos, dependendo do tamanho, localização e número de cálculos.
            </p>

            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Cistoscopia e acesso ao ureter",
                  desc: "O ureteroscópio é introduzido pela uretra, passando pela bexiga até o ureter. Um fio-guia de segurança é posicionado para garantir acesso seguro ao trato urinário superior.",
                  icon: Stethoscope,
                },
                {
                  step: "2",
                  title: "Bainha de acesso ureteral (UAS)",
                  desc: "Em muitos casos, uma bainha de acesso ureteral é posicionada para facilitar a passagem do ureteroscopio, melhorar a visibilidade, reduzir a pressão intrarrenal e permitir múltiplas entradas e saídas do instrumento. Uma evolução recente é a FANS-UAS (Flexible and Navigable Suction Ureteral Access Sheath), como a ClearPetra, que combina acesso ureteral com aspiração contínua e ponta navegável. Meta-análises de 2025 (Liu et al., BMC Urology; Alnadhari et al., BMC Urology) demonstram que a FANS-UAS oferece maior stone-free rate, menor taxa de complicações, redução da pressão intrarrenal (menor risco de sepse) e aspiração automática de fragmentos durante o dusting — potencialmente permitindo tratar cálculos maiores (>2cm) por via retrógrada em sessão única.",
                  icon: Shield,
                },
                {
                  step: "3",
                  title: "Localização do cálculo",
                  desc: "O cálculo é visualizado diretamente pela câmera do ureteroscópio. Para cálculos renais, utiliza-se o ureteroscópio flexível, que permite navegar pelas cavidades do rim (cálices e pelve renal).",
                  icon: Target,
                },
                {
                  step: "4",
                  title: "Litotripsia a laser",
                  desc: "A fibra de laser é posicionada em contato com o cálculo. O laser é ativado, fragmentando a pedra em partículas microscópicas (técnica de dusting) ou em fragmentos menores (técnica de fragmentação). A irrigação contínua mantém a visibilidade e controla a temperatura.",
                  icon: Flame,
                },
                {
                  step: "5",
                  title: "Remoção dos fragmentos",
                  desc: "Fragmentos maiores são removidos com cestas de nitinol ou pinças endoscópicas. Na técnica de dusting, as partículas são pequenas o suficiente para serem eliminadas espontaneamente pela urina nos dias seguintes.",
                  icon: Waves,
                },
                {
                  step: "6",
                  title: "Cateter duplo J (stent ureteral)",
                  desc: "Em casos selecionados, um cateter duplo J é posicionado no ureter para garantir a drenagem adequada da urina e prevenir obstrução por fragmentos residuais ou edema. Nem todos os casos necessitam de stent.",
                  icon: Activity,
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A2540] mb-1 flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-[#2563EB]" />
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-amber-800">
                <strong>Nota importante (EAU 2025):</strong> O tempo operatório prolongado (acima de 90 minutos) está associado a maior taxa de complicações. O cirurgião deve equilibrar a completude da remoção do cálculo com a segurança do paciente, podendo optar por um segundo procedimento (staged procedure) em casos complexos.
              </p>
            </div>
          </motion.div>

          {/* Técnicas de Litotripsia */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Técnicas de Litotripsia a Laser</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              Existem duas estratégias principais para a fragmentação do cálculo com laser, e a escolha depende do tamanho, localização e composição do cálculo:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#0A2540] mb-3 flex items-center gap-2">
                  <Waves className="w-5 h-5 text-[#2563EB]" />
                  Dusting (Pulverização)
                </h3>
                <p className="text-[#334155] text-sm leading-relaxed mb-4">
                  O laser é configurado com <strong>alta frequência e baixa energia por pulso</strong>, transformando o cálculo em partículas microscópicas ("poeira") que são eliminadas espontaneamente pela urina. É a técnica preferida para cálculos renais.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-[#334155]">Menor necessidade de extração ativa</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-[#334155]">Ideal para cálculos renais</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-[#334155]">Menor risco de fragmentos residuais grandes</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#0A2540] mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-indigo-600" />
                  Fragmentação + Extração
                </h3>
                <p className="text-[#334155] text-sm leading-relaxed mb-4">
                  O laser é configurado com <strong>maior energia por pulso</strong>, quebrando o cálculo em fragmentos maiores que são ativamente removidos com cestas de nitinol. Técnica preferida para cálculos ureterais.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-[#334155]">Remoção completa imediata</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-[#334155]">Ideal para cálculos ureterais</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-[#334155]">Permite análise da composição do cálculo</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Indicações */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Indicações: Quando a Litotripsia a Laser é Recomendada?</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A litotripsia a laser por ureteroscopia é indicada para o tratamento de cálculos urinários em diversas situações. As indicações são baseadas no tamanho, localização e composição do cálculo, além de fatores do paciente:
            </p>

            <div className="space-y-4 mb-6">
              {[
                {
                  title: "Cálculos ureterais de qualquer tamanho",
                  desc: "A ureteroscopia é o tratamento de primeira linha para cálculos ureterais, especialmente os maiores que 10mm. Para cálculos ureterais, a URS apresenta taxa de sucesso (stone-free rate) superior à litotripsia extracorpórea (LECO/SWL) em procedimento único.",
                  icon: Activity,
                },
                {
                  title: "Cálculos renais até 2 cm",
                  desc: "A RIRS (cirurgia retrógrada intrarenal) com laser é uma opção eficaz para cálculos renais de até 2 cm, com taxa de sucesso cumulativa de 91%. Para cálculos maiores, pode ser realizada em casos selecionados quando a nefrolitotripsia percutânea (PCNL) não é opção.",
                  icon: Target,
                },
                {
                  title: "Cálculos de polo inferior do rim",
                  desc: "A EAU 2025 recomenda URS ou PCNL para cálculos de polo inferior mesmo acima de 1 cm, pois a eficácia da LECO é limitada nessa localização devido à dificuldade de eliminação dos fragmentos.",
                  icon: MapPin,
                },
                {
                  title: "Pacientes em uso de anticoagulantes",
                  desc: "A ureteroscopia é a intervenção preferida quando a terapia antitrombótica não pode ser descontinuada, pois está associada a menor morbidade hemorrágica comparada à PCNL e LECO.",
                  icon: HeartPulse,
                },
                {
                  title: "Obesidade mórbida",
                  desc: "A URS é recomendada como primeira linha para pacientes com obesidade mórbida, pois o IMC elevado pode reduzir a eficácia da LECO e aumentar o risco anestésico da PCNL.",
                  icon: Scale,
                },
                {
                  title: "Cálculos resistentes à LECO",
                  desc: "Cálculos de composição dura (oxalato de cálcio monoidratado, brushita, cistina) ou com alta densidade na tomografia (> 1000 HU) têm menor chance de sucesso com LECO e se beneficiam da litotripsia a laser.",
                  icon: Shield,
                },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A2540] mb-1">{item.title}</h4>
                      <p className="text-[#334155] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabela comparativa */}
            <h3 className="text-xl font-bold text-[#0A2540] mb-4">Comparação: Litotripsia a Laser (URS) vs. LECO vs. PCNL</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0A2540] text-white">
                    <th className="p-3 text-left font-medium">Característica</th>
                    <th className="p-3 text-center font-medium">URS + Laser</th>
                    <th className="p-3 text-center font-medium">LECO (SWL)</th>
                    <th className="p-3 text-center font-medium">PCNL</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Invasividade", "Minimamente invasiva", "Não invasiva", "Percutânea (acesso renal)"],
                    ["Anestesia", "Geral ou raqui", "Sedação ou geral", "Geral"],
                    ["Internação", "Ambulatorial (day clinic)", "Ambulatorial", "1-3 dias"],
                    ["Cálculos ureterais", "★★★ Excelente", "★★ Boa", "Não indicada*"],
                    ["Cálculos renais < 2cm", "★★★ Excelente", "★★ Boa", "★★★ Excelente"],
                    ["Cálculos renais > 2cm", "★★ Possível (staged)", "★ Limitada", "★★★ Primeira linha"],
                    ["Stone-free rate (ureter)", "85-95%", "70-85%", "—"],
                    ["Stone-free rate (rim)", "~91% cumulativa", "60-90%", "90-95%"],
                    ["Complicações gerais", "4-25%", "~20%", "20-25%"],
                    ["Anticoagulantes", "★★★ Preferida", "★ Contraindicada", "★ Contraindicada"],
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 font-medium text-[#0A2540]">{row[0]}</td>
                      <td className="p-3 text-center text-[#334155]">{row[1]}</td>
                      <td className="p-3 text-center text-[#334155]">{row[2]}</td>
                      <td className="p-3 text-center text-[#334155]">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#64748B] italic">
              * PCNL pode ser usada para cálculos ureterais proximais grandes em casos selecionados. Fonte: EAU Guidelines on Urolithiasis 2025.
            </p>
          </motion.div>

          {/* Preparo */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={5} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Preparo para o Procedimento</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              O preparo adequado é essencial para a segurança e o sucesso do procedimento. As orientações devem ser seguidas rigorosamente conforme indicação do urologista:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-4 flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-[#2563EB]" />
                  Antes do Procedimento
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      icon: FileText,
                      title: "Exames pré-operatórios",
                      desc: "Hemograma, coagulograma, função renal (creatinina, ureia), urocultura com antibiograma, tomografia computadorizada sem contraste (TCSC) recente.",
                    },
                    {
                      icon: Microscope,
                      title: "Urocultura obrigatória",
                      desc: "A urina DEVE estar estéril antes do procedimento. Infecção urinária ativa é contraindicação. Se positiva, tratar com antibiótico antes da cirurgia.",
                    },
                    {
                      icon: Pill,
                      title: "Medicamentos",
                      desc: "Informar todos os medicamentos em uso. Anticoagulantes e antiagregantes plaquetários devem ser discutidos individualmente com o urologista e o cardiologista.",
                    },
                    {
                      icon: Ban,
                      title: "Jejum",
                      desc: "Jejum absoluto de 8 horas para sólidos e 6 horas para líquidos claros antes do horário da cirurgia.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <item.icon className="w-5 h-5 text-[#2563EB] mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-bold text-[#0A2540] text-sm">{item.title}</h4>
                        <p className="text-xs text-[#334155] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  Contraindicações
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      icon: AlertTriangle,
                      title: "Infecção urinária ativa",
                      desc: "A presença de infecção urinária não tratada é contraindicação absoluta. A manipulação do trato urinário infectado pode causar urosepsis, uma complicação grave.",
                    },
                    {
                      icon: Droplets,
                      title: "Distúrbios de coagulação não corrigidos",
                      desc: "Coagulopatias devem ser compensadas pelo menos 24 horas antes do procedimento. Anticoagulantes devem ser manejados conforme protocolo.",
                    },
                    {
                      icon: ThermometerSun,
                      title: "Gestação",
                      desc: "A URS pode ser realizada em gestantes em casos selecionados (preferencialmente no 2º trimestre), mas requer avaliação cuidadosa de risco-benefício.",
                    },
                    {
                      icon: HeartPulse,
                      title: "Risco anestésico elevado",
                      desc: "Pacientes com contraindicações à anestesia geral devem ser avaliados individualmente. Alternativas como anestesia raquidiana podem ser consideradas.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-amber-50 rounded-lg p-4 border border-amber-100">
                      <item.icon className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-bold text-[#0A2540] text-sm">{item.title}</h4>
                        <p className="text-xs text-[#334155] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pós-operatório */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={6} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Pós-Operatório e Recuperação</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A recuperação após a litotripsia a laser é geralmente rápida. A maioria dos pacientes recebe alta no mesmo dia (day clinic) ou no dia seguinte. Veja o que esperar em cada fase:
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-white border border-green-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#0A2540] mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  Primeiras 24-48 horas
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Hematúria (sangue na urina) leve a moderada — normal e esperada",
                    "Desconforto ou ardência ao urinar — melhora progressivamente",
                    "Dor lombar ou abdominal leve — controlada com analgésicos",
                    "Urgência e frequência urinária aumentadas",
                    "Hidratação abundante (2-3 litros de água/dia)",
                    "Repouso relativo — evitar esforço físico intenso",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#0A2540] mb-3 flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-[#2563EB]" />
                  Primeira semana
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Eliminação de fragmentos de cálculo pela urina — pode causar cólicas leves",
                    "Hematúria residual — vai clareando gradualmente",
                    "Retorno às atividades leves em 2-3 dias",
                    "Evitar exercícios intensos por 7-14 dias",
                    "Manter hidratação abundante",
                    "Uso de analgésicos e anti-inflamatórios conforme prescrição",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-white border border-purple-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#0A2540] mb-3 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-purple-600" />
                  Cateter Duplo J (quando utilizado)
                </h3>
                <p className="text-[#334155] text-sm leading-relaxed mb-4">
                  Quando um cateter duplo J é posicionado, ele permanece por <strong>7 a 30 dias</strong> e é removido em consultório por cistoscopia. Sintomas relacionados ao stent incluem:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Urgência e frequência urinária",
                    "Desconforto em flanco ao urinar",
                    "Hematúria intermitente",
                    "Desconforto suprapúbico",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <ArrowRight className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#64748B] mt-3 italic">
                  EAU 2025: α-bloqueadores (como tansulosina) podem reduzir os sintomas do stent e episódios de cólica. Stent com fio (on a string) resulta em menor tempo de permanência e melhores desfechos relatados pelo paciente.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
              <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Quando procurar atendimento de urgência
              </h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "Febre acima de 38°C",
                  "Calafrios intensos",
                  "Dor intensa não controlada com medicação",
                  "Hematúria intensa com coágulos",
                  "Impossibilidade de urinar (retenção urinária)",
                  "Náuseas e vômitos persistentes",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-red-700">
                    <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Complicações */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={7} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Possíveis Complicações</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A litotripsia a laser por ureteroscopia é um procedimento seguro, mas como qualquer cirurgia, pode apresentar complicações. A taxa geral de complicações é de <strong>4 a 25%</strong>, sendo a maioria de grau leve (Clavien I-II) e sem necessidade de intervenção adicional.
            </p>

            <div className="space-y-4">
              {/* Complicações leves */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Complicações Leves (Clavien I-II) — Mais comuns
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { name: "Hematúria transitória", freq: "Muito comum" },
                    { name: "Disúria (ardência ao urinar)", freq: "Comum" },
                    { name: "Cólica renal por fragmentos", freq: "Comum" },
                    { name: "Infecção urinária", freq: "5-10%" },
                    { name: "Sintomas do cateter duplo J", freq: "Quando presente" },
                    { name: "Dor lombar transitória", freq: "Comum" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3 border border-green-100">
                      <span className="text-sm text-[#334155]">{item.name}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{item.freq}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complicações moderadas */}
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Complicações Moderadas (Clavien III) — Incomuns
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { name: "Fragmentos residuais (necessidade de 2º procedimento)", freq: "5-15%" },
                    { name: "Perfuração ureteral", freq: "1-3%" },
                    { name: "Migração do cálculo para o rim", freq: "Variável" },
                    { name: "Steinstrasse (acúmulo de fragmentos)", freq: "Raro na URS" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3 border border-amber-100">
                      <span className="text-sm text-[#334155]">{item.name}</span>
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{item.freq}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complicações graves */}
              <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5" />
                  Complicações Graves (Clavien IV-V) — Raras
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { name: "Urosepsis", freq: "Até 5%" },
                    { name: "Estenose ureteral", freq: "3-4.9%" },
                    { name: "Avulsão ureteral", freq: "0.04-0.9%" },
                    { name: "Lesão térmica por laser", freq: "Muito raro" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3 border border-red-100">
                      <span className="text-sm text-[#334155]">{item.name}</span>
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{item.freq}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800">
                <strong>Fatores de risco para complicações (EAU 2025):</strong> Perfurações prévias, urocultura pré-operatória positiva, comorbidades, tempo operatório prolongado (&gt; 90 min) e pressão intrarrenal elevada são os principais fatores de risco. A profilaxia antibiótica e o controle do tempo cirúrgico são medidas essenciais para minimizar complicações.
              </p>
            </div>
          </motion.div>

          {/* Onde realizamos — Campinas Day Hospital */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={8} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Onde Realizamos a Litotripsia a Laser</h2>
            <div className="bg-gradient-to-br from-[#0A2540] to-[#0F3460] rounded-2xl overflow-hidden">
              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#60A5FA]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Campinas Day Hospital</h3>
                    <p className="text-white/50 text-sm">Centro cirúrgico moderno com tecnologia de ponta</p>
                  </div>
                </div>

                <p className="text-white/70 leading-relaxed mb-6">
                  A litotripsia a laser é realizada no <strong className="text-white">Campinas Day Hospital</strong>, um centro cirúrgico moderno localizado no Jardim Chapadão em Campinas, equipado com <strong className="text-white">ureteroscópios flexíveis de última geração e laser de alta potência</strong>. A estrutura permite a realização do procedimento de forma ambulatorial (day clinic), com alta no mesmo dia na maioria dos casos.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-[#60A5FA]" />
                      <span className="text-white text-sm font-medium">Endereço</span>
                    </div>
                    <p className="text-white/60 text-sm">R. Angela Signori Grigol, 299 — Jardim Chapadão, Campinas/SP — CEP 13070-585</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-[#60A5FA]" />
                      <span className="text-white text-sm font-medium">Convênios</span>
                    </div>
                    <p className="text-white/60 text-sm">Allianz, Amil, Bradesco, Cassi, Porto Seguro, SulAmérica, Unimed e outros. Também atendimento particular.</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-[#60A5FA]" />
                      <span className="text-white text-sm font-medium">Atendimento</span>
                    </div>
                    <p className="text-white/60 text-sm">Sexta-feira: 8h às 12h</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-[#60A5FA]" />
                      <span className="text-white text-sm font-medium">Contato</span>
                    </div>
                    <p className="text-white/60 text-sm">(11) 98112-4455</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/local/campinas-day-hospital">
                    <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
                      <MapPin className="w-4 h-4 mr-2" />
                      Ver Detalhes do Local
                    </Button>
                  </Link>
                  <a
                    href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 bg-transparent">
                      <CalendarCheck className="w-4 h-4 mr-2" />
                      Agendar Consulta
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={9} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Perguntas Frequentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: "A litotripsia a laser dói?",
                  a: "O procedimento é realizado sob anestesia (geral ou raquianestesia), portanto o paciente não sente dor durante a cirurgia. No pós-operatório, pode haver desconforto leve a moderado, controlado com analgésicos e anti-inflamatórios.",
                },
                {
                  q: "Quanto tempo dura o procedimento?",
                  a: "A duração varia de 30 a 90 minutos, dependendo do tamanho, número e localização dos cálculos. Cálculos maiores ou em localizações difíceis podem exigir mais tempo.",
                },
                {
                  q: "Preciso ficar internado?",
                  a: "Na maioria dos casos, o procedimento é ambulatorial (day clinic), com alta no mesmo dia. Em casos mais complexos ou com complicações, pode ser necessária internação de 1-2 dias.",
                },
                {
                  q: "Quando posso voltar ao trabalho?",
                  a: "A maioria dos pacientes retorna às atividades leves em 2-3 dias. Atividades físicas intensas devem ser evitadas por 7-14 dias. O retorno ao trabalho depende do tipo de atividade profissional.",
                },
                {
                  q: "O cálculo pode voltar depois do tratamento?",
                  a: "A litotripsia trata o cálculo existente, mas não previne a formação de novos cálculos. Cerca de 50% dos pacientes podem ter recorrência. A avaliação metabólica e medidas preventivas (hidratação, dieta, medicamentos) são fundamentais para reduzir o risco.",
                },
                {
                  q: "Qual a diferença entre litotripsia a laser e LECO (ondas de choque)?",
                  a: "A LECO (litotripsia extracorpórea por ondas de choque) fragmenta o cálculo de fora do corpo, sem anestesia geral. A litotripsia a laser é realizada por via endoscópica, com visualização direta do cálculo. A laser tem maior taxa de sucesso em procedimento único, especialmente para cálculos maiores ou duros.",
                },
                {
                  q: "Todos os tipos de cálculo podem ser tratados com laser?",
                  a: "Sim. O laser Holmium:YAG e o Thulium Fiber Laser são eficazes contra todos os tipos de cálculo urinário, incluindo os mais duros (oxalato de cálcio monoidratado, brushita e cistina). Esta é uma vantagem sobre a LECO, que tem menor eficácia em cálculos muito duros.",
                },
                {
                  q: "O que é o cateter duplo J e quando é necessário?",
                  a: "O cateter duplo J é um tubo fino e flexível posicionado dentro do ureter para garantir a drenagem da urina. É utilizado quando há edema ureteral, fragmentos residuais, ou risco de obstrução. Nem todos os pacientes precisam de stent — em casos não complicados, pode ser dispensado.",
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={10}>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-[#0A2540] mb-4">Referências</h3>
              <ol className="space-y-2 text-sm text-[#64748B]">
                <li>1. EAU Guidelines on Urolithiasis — Disease Management (Section 3.4), 2025. European Association of Urology.</li>
                <li>2. EAU Guidelines on Urolithiasis — Ureteroscopy: Retrograde and Antegrade (Section 3.4.6), 2025.</li>
                <li>3. AUA/Endourology Society Guideline — Surgical Management of Stones, 2024. American Urological Association.</li>
                <li>4. Traxer O, Keller EX. Thulium fiber laser: the new player for kidney stone treatment? A comparison with Holmium:YAG laser. World J Urol. 2020;38(8):1883-1894.</li>
                <li>5. Ventimiglia E, et al. Thulium fiber laser versus Holmium:YAG for urinary stone treatment: a systematic review and meta-analysis. J Endourol. 2024;38(2):123-134.</li>
                <li>6. Somani BK, et al. Outcomes of flexible ureteroscopy and laser lithotripsy for stones &gt; 2cm: a systematic review. J Endourol. 2017;31(3):222-230.</li>
                <li>7. Assimos D, et al. Surgical Management of Stones: AUA/Endourology Society Guideline. J Urol. 2016;196(4):1153-1160.</li>
                <li>8. Campbell-Walsh-Wein Urology, 13th Edition — Chapter on Ureteroscopy and Intracorporeal Lithotripsy. Elsevier, 2024.</li>
                <li>9. Türk C, et al. EAU Guidelines on Interventional Treatment for Urolithiasis. Eur Urol. 2016;69(3):475-482.</li>
                <li>10. Sociedade Brasileira de Urologia (SBU) — Diretrizes sobre Litíase Urinária, 2023.</li>
                <li>11. Liu Z, et al. Efficacy and safety of flexible and navigable suction ureteral access sheath in retrograde intrarenal surgery: a systematic review and meta-analysis. BMC Urology. 2025;25:45.</li>
                <li>12. Alnadhari I, et al. ClearPetra suction ureteral access sheath versus conventional UAS during flexible ureteroscopy: a meta-analysis. BMC Urology. 2025;25:12.</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </section>
    </EducationalLayout>
  );
}
