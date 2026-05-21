/*
 * Design: Clinical Precision — Swiss Medical Design
 * Página: Cirurgia Robótica em Urologia — Guia Completo
 * Referências: EAU Guidelines 2025, AUA 2024/2025, Campbell-Walsh-Wein 13th Ed.
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
  Cpu,
  Eye,
  Zap,
  Target,
  ShieldAlert,
  CalendarCheck,
  Building2,
  Scissors,
  MonitorPlay,
  Crosshair,
  Minimize2,
  TrendingUp,
  Users,
  Award,
  Layers,
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import EducationalLayout from "@/components/EducationalLayout";
import { FAQSchema } from "@/components/SchemaMarkup";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const cirurgiaRoboticaFAQs = [
  { question: "O robô opera sozinho?", answer: "Não. O robô é um instrumento controlado integralmente pelo cirurgião. Cada movimento dos braços robóticos é comandado em tempo real pelo médico, que opera sentado no console com visão 3D. O robô não toma decisões — ele amplifica a precisão e a destreza do cirurgião." },
  { question: "A cirurgia robótica é mais segura que a cirurgia aberta?", answer: "Sim, as evidências mostram que a cirurgia robótica apresenta menores taxas de complicações, menor sangramento e recuperação mais rápida. Na prostatectomia radical, por exemplo, a taxa de complicações Clavien II é de 3,9% na robótica vs 17,5% na aberta (EAU 2025)." },
  { question: "Qual o tempo de duração de uma cirurgia robótica?", answer: "Depende do procedimento. Uma prostatectomia radical robótica dura em média 2-3 horas. Uma nefrectomia parcial robótica, 2-4 horas. O tempo operatório é comparável ou ligeiramente maior que a cirurgia aberta, mas com benefícios significativos na recuperação." },
  { question: "Quanto tempo de internação após cirurgia robótica?", answer: "Na maioria dos procedimentos, a internação é de 1-2 dias (vs 5-7 dias na cirurgia aberta). Em alguns casos selecionados, o paciente pode receber alta no mesmo dia." },
  { question: "A cirurgia robótica deixa cicatriz?", answer: "As incisões são muito pequenas (8-12mm), resultando em cicatrizes mínimas que se tornam praticamente imperceptíveis com o tempo. Geralmente são 5-6 pequenas incisões no abdome." },
  { question: "Meu convênio cobre cirurgia robótica?", answer: "Muitos convênios já cobrem a cirurgia robótica para procedimentos urológicos. A cobertura depende do plano e da operadora. Recomendamos entrar em contato conosco para verificar a cobertura do seu plano específico." },
  { question: "Quando posso voltar a trabalhar após a cirurgia?", answer: "Para atividades sedentárias, o retorno geralmente ocorre em 2-3 semanas. Para atividades que exigem esforço físico, recomenda-se aguardar 4-6 semanas. Cada caso é individualizado conforme o tipo de cirurgia e a evolução do paciente." },
  { question: "A cirurgia robótica é indicada para todos os casos?", answer: "Não. A indicação é individualizada, considerando o tipo de doença, a anatomia do paciente, cirurgias prévias e outros fatores. Em alguns casos, a cirurgia aberta ou laparoscópica convencional pode ser mais adequada. O urologista avaliará a melhor abordagem para cada situação." }
];

export default function CirurgiaRobotica() {
  return (
    <EducationalLayout
      title="Cirurgia Robótica em Urologia"
      subtitle="Tecnologia de Ponta"
      description="Guia completo sobre cirurgia robótica aplicada à urologia: como funciona, indicações, vantagens, principais procedimentos, recuperação e resultados baseados em evidências das diretrizes da EAU 2025 e AUA."
      accentColor="#6366F1"
      metaTitle="Cirurgia Robótica em Urologia: Guia Completo | Dr. Felipe de Bulhões"
      metaDescription="Saiba tudo sobre cirurgia robótica em urologia: prostatectomia, nefrectomia parcial, cistectomia. Vantagens, recuperação e resultados. Baseado nas guidelines EAU 2025."
    >
      <FAQSchema questions={cirurgiaRoboticaFAQs} />

      {/* Introdução */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border-l-4 border-[#6366F1] p-6 rounded-r-lg mb-10">
              <p className="text-[#1C3D5A] leading-relaxed">
                A <strong>cirurgia robótica</strong> representa uma das maiores revoluções da cirurgia moderna. Na urologia, o sistema robótico permite ao cirurgião operar com <strong>precisão milimétrica, visão tridimensional ampliada em até 10 vezes</strong> e movimentos articulados que superam a capacidade da mão humana. Segundo as <strong>diretrizes da European Association of Urology (EAU 2025)</strong>, a abordagem robótica é uma opção estabelecida para os principais procedimentos urológicos, com resultados funcionais e oncológicos comparáveis ou superiores às técnicas convencionais.
              </p>
            </div>
          </motion.div>

          {/* O que é */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] font-serif mb-6">O que é a Cirurgia Robótica?</h2>
            <p className="text-[#334155] leading-relaxed mb-4">
              A cirurgia robótica — também chamada de <strong>cirurgia assistida por robô</strong> — é uma modalidade de cirurgia minimamente invasiva na qual o cirurgião opera sentado em um console, controlando braços robóticos que seguram instrumentos miniaturizados e uma câmera de alta definição 3D. O robô não opera sozinho: ele é um instrumento que amplifica as habilidades do cirurgião, filtrando tremores naturais das mãos e permitindo movimentos com até 7 graus de liberdade em espaços anatômicos reduzidos.
            </p>
            <p className="text-[#334155] leading-relaxed mb-6">
              O sistema mais utilizado mundialmente é o <strong>Da Vinci</strong> (Intuitive Surgical), atualmente na geração <strong>Da Vinci Xi e Da Vinci 5</strong>. Novas plataformas como o <strong>Hugo RAS</strong> (Medtronic), <strong>Hinotori</strong> (Medicaroid) e <strong>Versius</strong> (CMR Surgical) também estão sendo adotadas em centros de referência.
            </p>

            {/* Imagem ilustrativa */}
            <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
              <img
                src="/manus-storage/cirurgia-robotica-hero_bc9b9ac6_4e08d375.webp"
                alt="Sistema robótico Da Vinci Xi em sala cirúrgica — cirurgia robótica urológica"
                className="w-full h-auto"
              />
              <p className="text-xs text-[#64748B] italic text-center py-2 bg-gray-50">
                Sistema robótico Da Vinci Xi em sala cirúrgica — imagem ilustrativa
              </p>
            </div>

            {/* Componentes do sistema */}
            <h3 className="text-xl font-bold text-[#1C3D5A] mb-4">Componentes do Sistema Robótico</h3>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  icon: MonitorPlay,
                  title: "Console do Cirurgião",
                  desc: "Onde o cirurgião se senta e opera. Oferece visão 3D imersiva com ampliação de até 10x, controles ergonômicos para os braços robóticos e pedais para eletrocautério e câmera.",
                },
                {
                  icon: Cpu,
                  title: "Carrinho do Paciente",
                  desc: "Posicionado ao lado do paciente, contém os braços robóticos articulados (3-4 braços) que seguram os instrumentos e a câmera endoscópica de alta definição.",
                },
                {
                  icon: Layers,
                  title: "Torre de Visão",
                  desc: "Sistema de processamento de imagem que gera a visão 3D em alta definição, além de integrar tecnologias como fluorescência (Firefly/ICG) para identificação de estruturas vasculares.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#6366F1]/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-[#6366F1]" />
                  </div>
                  <h4 className="text-lg font-bold text-[#1C3D5A] mb-2">{item.title}</h4>
                  <p className="text-[#334155] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vantagens */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] font-serif mb-6">Vantagens da Cirurgia Robótica</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              As vantagens da cirurgia robótica em relação à cirurgia aberta convencional são bem documentadas na literatura. Segundo meta-análises de ensaios clínicos randomizados citados nas <strong>diretrizes da EAU 2025</strong>, os principais benefícios incluem:
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  icon: Eye,
                  title: "Visão 3D ampliada",
                  desc: "Câmera endoscópica com ampliação de até 10x e visão tridimensional, permitindo identificação precisa de nervos, vasos e planos anatômicos.",
                  evidence: "Tecnologia Firefly (ICG) para fluorescência em tempo real",
                },
                {
                  icon: Crosshair,
                  title: "Precisão milimétrica",
                  desc: "Instrumentos articulados com 7 graus de liberdade e filtro de tremor, superando as limitações da mão humana em espaços confinados.",
                  evidence: "Permite preservação neurovascular com maior acurácia",
                },
                {
                  icon: Minimize2,
                  title: "Incisões menores",
                  desc: "Pequenas incisões de 8-12mm em vez de cortes de 15-20cm da cirurgia aberta, resultando em menor dor, melhor estética e recuperação mais rápida.",
                  evidence: "EAU 2025: menor sangramento intraoperatório (p<0.001)",
                },
                {
                  icon: HeartPulse,
                  title: "Menor sangramento",
                  desc: "Perda sanguínea significativamente menor em comparação à cirurgia aberta, reduzindo a necessidade de transfusões.",
                  evidence: "RARP vs RRP: Clavien II 3.9% vs 17.5% (EAU 2025)",
                },
                {
                  icon: TrendingUp,
                  title: "Recuperação mais rápida",
                  desc: "Internação hospitalar mais curta (1-2 dias vs 5-7 dias na aberta), retorno mais precoce às atividades diárias e ao trabalho.",
                  evidence: "RCT 327 pacientes: menor internação para RARP (p<0.05)",
                },
                {
                  icon: Shield,
                  title: "Melhores resultados funcionais",
                  desc: "Recuperação mais precoce da continência urinária e da função erétil, especialmente nos primeiros meses após a cirurgia.",
                  evidence: "Continência 3 meses: 80% robótica vs 65% aberta (p=0.002)",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-[#6366F1]/10 rounded-lg flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-[#6366F1]" />
                  </div>
                  <h4 className="font-bold text-[#1C3D5A] mb-2">{item.title}</h4>
                  <p className="text-[#334155] text-sm leading-relaxed mb-2">{item.desc}</p>
                  <p className="text-xs text-[#6366F1] font-medium">{item.evidence}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tabela comparativa RARP vs RRP */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] font-serif mb-6">Robótica vs Aberta vs Laparoscópica: Comparação</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A tabela abaixo compara os resultados da <strong>prostatectomia radical</strong> realizada por via robótica (RARP), laparoscópica (LRP) e aberta (RRP), conforme dados compilados nas diretrizes da EAU 2025 (Tabela 6.2.4):
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1C3D5A] text-white">
                    <th className="text-left p-3 font-semibold">Desfecho</th>
                    <th className="text-center p-3 font-semibold">Robótica (RARP)</th>
                    <th className="text-center p-3 font-semibold">Laparoscópica (LRP)</th>
                    <th className="text-center p-3 font-semibold">Aberta (RRP)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { outcome: "Estenose de colo vesical", rarp: "1,0%", lrp: "2,1%", rrp: "4,9%" },
                    { outcome: "Fístula anastomótica", rarp: "1,0%", lrp: "4,4%", rrp: "3,3%" },
                    { outcome: "Infecção", rarp: "0,8%", lrp: "1,1%", rrp: "4,8%" },
                    { outcome: "Íleo paralítico", rarp: "1,1%", lrp: "2,4%", rrp: "0,3%" },
                    { outcome: "TVP", rarp: "0,6%", lrp: "0,2%", rrp: "1,4%" },
                    { outcome: "Clavien-Dindo I", rarp: "2,1%", lrp: "4,1%", rrp: "4,2%" },
                    { outcome: "Clavien-Dindo II", rarp: "3,9%", lrp: "7,2%", rrp: "17,5%" },
                    { outcome: "Clavien-Dindo IIIa", rarp: "0,5%", lrp: "2,3%", rrp: "1,8%" },
                    { outcome: "Mortalidade (Clavien V)", rarp: "<0,1%", lrp: "0,2%", rrp: "0,2%" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 font-medium text-[#1C3D5A]">{row.outcome}</td>
                      <td className="p-3 text-center text-green-700 font-semibold">{row.rarp}</td>
                      <td className="p-3 text-center text-amber-700">{row.lrp}</td>
                      <td className="p-3 text-center text-red-700">{row.rrp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <p className="text-xs text-[#64748B] italic text-center">
                  Fonte: EAU Guidelines 2025 — Tabela 6.2.4 (Prostate Cancer — Treatment)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Resultados funcionais */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] font-serif mb-6">Resultados Funcionais: O que Dizem os Estudos?</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              Os resultados funcionais — especialmente a <strong>continência urinária</strong> e a <strong>função erétil</strong> — são prioridades na prostatectomia radical. Ensaios clínicos randomizados (RCTs) demonstram vantagens significativas para a abordagem robótica:
            </p>
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-indigo-50 to-white border border-indigo-100 rounded-xl p-6">
                <h4 className="font-bold text-[#1C3D5A] mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#6366F1]" />
                  Continência Urinária
                </h4>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-sm text-[#334155] leading-relaxed">
                      <strong>RCT com 327 pacientes (RARP vs RRP):</strong> A continência urinária foi significativamente melhor no grupo robótico em todos os intervalos avaliados — <strong>3 meses: 80% vs 65% (p=0,002)</strong>, 6 meses: 90% vs 82% (p=0,04) e 18 meses: 95% vs 79% (p&lt;0,001).
                    </p>
                    <p className="text-xs text-[#64748B] mt-2 italic">Fonte: EAU Guidelines 2025 — Prostate Cancer Treatment</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-sm text-[#334155] leading-relaxed">
                      <strong>Meta-análise de 5 RCTs (1.205 pacientes, RARP vs LRP):</strong> Melhor continência aos 3 meses (OR 1,81) e 6 meses (OR 1,88) para RARP. Aos 12 meses, sem diferença significativa entre as técnicas.
                    </p>
                    <p className="text-xs text-[#64748B] mt-2 italic">Fonte: EAU Guidelines 2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-violet-50 to-white border border-violet-100 rounded-xl p-6">
                <h4 className="font-bold text-[#1C3D5A] mb-3 flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-violet-600" />
                  Função Erétil
                </h4>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <p className="text-sm text-[#334155] leading-relaxed">
                    <strong>Meta-análise de 5 RCTs (RARP vs LRP):</strong> Recuperação da função erétil significativamente melhor em pacientes potentes submetidos à preservação neurovascular — <strong>OR 4,05 (p=0,003)</strong> a favor da robótica. Aos 10 anos, taxas comparáveis, mas com qualidade funcional superior no grupo robótico.
                  </p>
                  <p className="text-xs text-[#64748B] mt-2 italic">Fonte: EAU Guidelines 2025</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-white border border-amber-100 rounded-xl p-6">
                <h4 className="font-bold text-[#1C3D5A] mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  Técnicas Avançadas de Preservação
                </h4>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-sm text-[#334155] leading-relaxed">
                      <strong>Preservação neurovascular (Nerve-Sparing):</strong> A visão ampliada e a precisão robótica permitem preservação dos feixes neurovasculares com maior acurácia. A técnica <strong>NeuroSAFE</strong> (avaliação intraoperatória de margens) aumentou a taxa de preservação bilateral de 56% para 82%, com melhores escores de função erétil (IIEF-5).
                    </p>
                    <p className="text-xs text-[#64748B] mt-2 italic">Fonte: NeuroSAFE PROOF Trial — EAU Guidelines 2025</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-sm text-[#334155] leading-relaxed">
                      <strong>Retzius-sparing (rsRARP):</strong> Técnica que preserva o espaço de Retzius, com melhora na recuperação precoce e global da continência. Deve-se considerar que pode haver taxas ligeiramente maiores de margens positivas (OR 0,45, p&lt;0,05), sem diferença na recorrência bioquímica.
                    </p>
                    <p className="text-xs text-[#64748B] mt-2 italic">Fonte: EAU Guidelines 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Indicações */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={5} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] font-serif mb-6">Principais Procedimentos Robóticos em Urologia</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A cirurgia robótica é aplicada em diversos procedimentos urológicos. As indicações mais estabelecidas, com evidências robustas nas guidelines internacionais, são:
            </p>
            <div className="space-y-5">
              {[
                {
                  title: "Prostatectomia Radical Robótica (RARP)",
                  subtitle: "Câncer de Próstata",
                  desc: "Remoção completa da próstata e vesículas seminais para tratamento do câncer de próstata localizado e localmente avançado. É o procedimento robótico mais realizado no mundo. A abordagem robótica permite preservação neurovascular com maior precisão, resultando em melhor recuperação da continência e função erétil.",
                  evidence: "Indicação: câncer de próstata localizado (T1-T2) e localmente avançado selecionado (T3). EAU 2025: resultados oncológicos equivalentes, com vantagens funcionais.",
                  icon: Target,
                  color: "#6366F1",
                },
                {
                  title: "Nefrectomia Parcial Robótica (RAPN)",
                  subtitle: "Tumores Renais",
                  desc: "Remoção apenas do tumor renal, preservando o máximo de tecido renal saudável. A plataforma robótica facilita a reconstrução do parênquima e o controle vascular, especialmente em tumores complexos (RENAL score alto). Indicada para tumores T1 (até 7cm) e selecionados T2.",
                  evidence: "EAU 2025 (Nível 2b): RAPN associada a menor perda sanguínea e menor internação vs aberta. Resultados oncológicos equivalentes em 5 anos.",
                  icon: Shield,
                  color: "#059669",
                },
                {
                  title: "Cistectomia Radical Robótica (RARC)",
                  subtitle: "Câncer de Bexiga",
                  desc: "Remoção da bexiga e reconstrução do trato urinário (derivação urinária) para tratamento do câncer de bexiga músculo-invasivo. A abordagem robótica permite menor sangramento, menos transfusões e internação mais curta, com resultados oncológicos comparáveis à cirurgia aberta.",
                  evidence: "Meta-análise (Scuderi 2026): perioperative outcomes melhores com RARC. Menor perda sanguínea, menor internação e menos transfusões.",
                  icon: Activity,
                  color: "#DC2626",
                },
                {
                  title: "Pieloplastia Robótica",
                  subtitle: "Estenose de Junção Ureteropélvica (JUP)",
                  desc: "Reconstrução da junção entre o rim e o ureter para corrigir obstruções que causam hidronefrose. A precisão da sutura robótica é especialmente vantajosa neste procedimento, com taxas de sucesso superiores a 95%.",
                  evidence: "Taxas de sucesso >95%. Menor internação e recuperação mais rápida vs aberta. Campbell-Walsh-Wein 13th Ed.",
                  icon: Zap,
                  color: "#D97706",
                },
                {
                  title: "Reimplante Ureteral Robótico",
                  subtitle: "Estenoses Ureterais",
                  desc: "Reconstrução da conexão entre o ureter e a bexiga em casos de estenose, lesão iatrogênica ou refluxo vesicoureteral. A plataforma robótica facilita a dissecção e a anastomose em espaço pélvico profundo.",
                  evidence: "Indicado para estenoses distais, lesões iatrogênicas e refluxo vesicoureteral complexo.",
                  icon: Stethoscope,
                  color: "#7C3AED",
                },
                {
                  title: "Nefrectomia Radical Robótica",
                  subtitle: "Tumores Renais Grandes",
                  desc: "Remoção completa do rim para tumores renais grandes (>7cm) ou quando a nefrectomia parcial não é viável. A abordagem robótica oferece menor sangramento e recuperação mais rápida que a cirurgia aberta.",
                  evidence: "EAU 2025: não associada a aumento de complicações vs laparoscópica. Menor sangramento vs aberta.",
                  icon: Scissors,
                  color: "#0891B2",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                        <item.icon className="w-6 h-6" style={{ color: item.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-[#1C3D5A]">{item.title}</h3>
                        </div>
                        <p className="text-sm font-medium mb-3" style={{ color: item.color }}>{item.subtitle}</p>
                        <p className="text-[#334155] text-sm leading-relaxed mb-3">{item.desc}</p>
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <p className="text-xs text-[#64748B] leading-relaxed">{item.evidence}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Como é o procedimento */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={6} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] font-serif mb-6">Como é Realizada a Cirurgia Robótica?</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              O passo a passo de uma cirurgia robótica urológica segue uma sequência padronizada. Embora cada procedimento tenha particularidades, as etapas gerais são:
            </p>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Anestesia e Posicionamento",
                  desc: "O paciente recebe anestesia geral e é posicionado na mesa cirúrgica (geralmente em posição de Trendelenburg para cirurgias pélvicas). A equipe de enfermagem prepara o campo cirúrgico estéril.",
                },
                {
                  step: "2",
                  title: "Criação do Pneumoperitônio e Colocação dos Trocárteres",
                  desc: "Pequenas incisões de 8-12mm são realizadas no abdome para inserção dos trocárteres (portais). O abdome é insuflado com CO₂ (pneumoperitônio) para criar espaço de trabalho. Estudos mostram que pressão baixa (7mmHg) resulta em menor dor pós-operatória.",
                },
                {
                  step: "3",
                  title: "Docking do Robô",
                  desc: "O carrinho do paciente (com os braços robóticos) é posicionado e conectado aos trocárteres. Os instrumentos robóticos e a câmera 3D são inseridos através dos portais.",
                },
                {
                  step: "4",
                  title: "Procedimento Cirúrgico",
                  desc: "O cirurgião opera no console com visão 3D ampliada, controlando os braços robóticos com movimentos precisos. A equipe auxiliar permanece ao lado do paciente para troca de instrumentos e assistência.",
                },
                {
                  step: "5",
                  title: "Reconstrução e Hemostasia",
                  desc: "Após a ressecção, o cirurgião realiza a reconstrução necessária (anastomose, sutura) com a precisão dos instrumentos articulados. A hemostasia é verificada meticulosamente.",
                },
                {
                  step: "6",
                  title: "Undocking e Fechamento",
                  desc: "O robô é desacoplado, os trocárteres são removidos e as incisões são fechadas com pontos. Um dreno pode ser deixado temporariamente, conforme o procedimento.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#6366F1] rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm">
                    {item.step}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <h4 className="font-bold text-[#1C3D5A] mb-2">{item.title}</h4>
                    <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Preparo */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={7} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] font-serif mb-6">Preparo para a Cirurgia Robótica</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              O preparo pré-operatório é fundamental para o sucesso da cirurgia e a recuperação do paciente. As orientações gerais incluem:
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  icon: FileText,
                  title: "Exames pré-operatórios",
                  items: ["Hemograma, coagulograma, função renal", "Eletrocardiograma e risco cirúrgico", "Exames de imagem específicos (TC, RM)", "Avaliação anestésica (risco ASA)"],
                },
                {
                  icon: CalendarCheck,
                  title: "Dias antes da cirurgia",
                  items: ["Suspender anticoagulantes (conforme orientação)", "Suspender AAS 7 dias antes (se autorizado)", "Jejum de 8 horas para sólidos", "Jejum de 6 horas para líquidos claros"],
                },
                {
                  icon: HeartPulse,
                  title: "Otimização pré-operatória",
                  items: ["Cessar tabagismo (mínimo 4 semanas antes)", "Controle glicêmico em diabéticos", "Exercícios de Kegel (para prostatectomia)", "Fisioterapia pélvica pré-operatória"],
                },
                {
                  icon: Shield,
                  title: "No dia da cirurgia",
                  items: ["Chegar ao hospital no horário indicado", "Trazer exames e documentos", "Usar roupas confortáveis", "Acompanhante obrigatório para alta"],
                },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#6366F1]/10 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#6366F1]" />
                    </div>
                    <h4 className="font-bold text-[#1C3D5A]">{item.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {item.items.map((text, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[#334155]">
                        <CheckCircle2 className="w-4 h-4 text-[#6366F1] mt-0.5 shrink-0" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pós-operatório */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={8} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] font-serif mb-6">Pós-Operatório e Recuperação</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A recuperação após cirurgia robótica é significativamente mais rápida que após cirurgia aberta. O protocolo de recuperação acelerada (ERAS — Enhanced Recovery After Surgery) é aplicado para otimizar os resultados:
            </p>
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h4 className="font-bold text-[#1C3D5A] mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#6366F1]" />
                  Primeiras 24-48 horas
                </h4>
                <ul className="space-y-2">
                  {[
                    "Deambulação precoce (levantar e caminhar no mesmo dia ou no dia seguinte)",
                    "Dieta líquida progredindo para sólida conforme tolerância",
                    "Controle da dor com analgésicos orais (geralmente sem necessidade de opioides)",
                    "Monitorização de sinais vitais e débito urinário",
                    "Remoção do dreno (quando presente) em 24-48h",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <ChevronRight className="w-4 h-4 text-[#6366F1] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-violet-50 border border-violet-100 rounded-xl p-6">
                <h4 className="font-bold text-[#1C3D5A] mb-3 flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-violet-600" />
                  Primeiras semanas
                </h4>
                <ul className="space-y-2">
                  {[
                    "Alta hospitalar em 1-2 dias (vs 5-7 dias na cirurgia aberta)",
                    "Repouso relativo por 2-3 semanas (evitar esforço físico intenso)",
                    "Retorno às atividades leves em 1-2 semanas",
                    "Retorno ao trabalho (atividades sedentárias) em 2-3 semanas",
                    "Sonda vesical removida em 7-14 dias (prostatectomia) conforme protocolo",
                    "Exercícios de Kegel para fortalecimento do assoalho pélvico",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <ChevronRight className="w-4 h-4 text-violet-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
                <h4 className="font-bold text-[#1C3D5A] mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                  Recuperação completa
                </h4>
                <ul className="space-y-2">
                  {[
                    "Atividade física moderada liberada após 4-6 semanas",
                    "Atividade sexual liberada após 4-6 semanas (prostatectomia)",
                    "Recuperação da continência: progressiva ao longo de 3-12 meses",
                    "Recuperação da função erétil: progressiva ao longo de 6-24 meses",
                    "Seguimento oncológico conforme protocolo (PSA trimestral no primeiro ano)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <ChevronRight className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Complicações */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={9} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] font-serif mb-6">Possíveis Complicações</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              Como em qualquer procedimento cirúrgico, a cirurgia robótica pode apresentar complicações, embora as taxas sejam significativamente menores que na cirurgia aberta. As principais complicações, conforme as diretrizes da EAU 2025, incluem:
            </p>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Complicações Menores (Clavien I-II) — Mais comuns
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { name: "Dor no local das incisões", freq: "Transitória, 1-2 semanas" },
                    { name: "Hematoma subcutâneo", freq: "Autolimitado" },
                    { name: "Infecção de trato urinário", freq: "~1-3%" },
                    { name: "Íleo paralítico transitório", freq: "~1-2%" },
                    { name: "Retenção urinária transitória", freq: "Após retirada de sonda" },
                    { name: "Incontinência urinária temporária", freq: "Melhora progressiva" },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 border border-green-100">
                      <p className="text-sm font-medium text-[#1C3D5A]">{item.name}</p>
                      <p className="text-xs text-[#64748B]">{item.freq}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Complicações Moderadas (Clavien IIIa) — Incomuns
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { name: "Fístula anastomótica", freq: "~1,0% (RARP)" },
                    { name: "Estenose de colo vesical", freq: "~1,0% (RARP)" },
                    { name: "Linfocele", freq: "~1-3%" },
                    { name: "Sangramento requerendo transfusão", freq: "~1-2% (RARP)" },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 border border-amber-100">
                      <p className="text-sm font-medium text-[#1C3D5A]">{item.name}</p>
                      <p className="text-xs text-[#64748B]">{item.freq}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5" />
                  Complicações Graves (Clavien IV-V) — Raras
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { name: "Lesão de órgão adjacente", freq: "Rara (<0,5%)" },
                    { name: "Tromboembolismo (TVP/TEP)", freq: "~0,6% (RARP)" },
                    { name: "Conversão para cirurgia aberta", freq: "~1-2%" },
                    { name: "Mortalidade perioperatória", freq: "<0,1% (RARP)" },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 border border-red-100">
                      <p className="text-sm font-medium text-[#1C3D5A]">{item.name}</p>
                      <p className="text-xs text-[#64748B]">{item.freq}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800">
                <strong>Nota importante:</strong> A taxa global de complicações graves (Clavien ≥ III) na cirurgia robótica é significativamente menor que na cirurgia aberta. Na prostatectomia radical, por exemplo, a taxa de Clavien II é de apenas 3,9% na robótica vs 17,5% na aberta (EAU 2025, Tabela 6.2.4).
              </p>
            </div>
          </motion.div>

          {/* Onde realizamos */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={10} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] font-serif mb-6">Cirurgia Robótica em Campinas e São Paulo</h2>
            <div className="bg-gradient-to-br from-[#1C3D5A] to-[#0F3460] rounded-2xl overflow-hidden">
              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#818CF8]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Hospitais com Plataforma Robótica</h3>
                    <p className="text-white/50 text-sm">Centros de referência para cirurgia robótica urológica</p>
                  </div>
                </div>

                <p className="text-white/70 leading-relaxed mb-6">
                  O Dr. Felipe de Bulhões realiza cirurgias robóticas em hospitais equipados com a plataforma Da Vinci nas regiões de <strong className="text-white">Campinas e São Paulo</strong>. A indicação do procedimento robótico é individualizada, considerando a doença, a anatomia do paciente e as melhores evidências disponíveis.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="w-4 h-4 text-[#818CF8]" />
                      <span className="text-white text-sm font-medium">Tecnologia</span>
                    </div>
                    <p className="text-white/60 text-sm">Plataforma Da Vinci Xi — última geração, com visão 3D, fluorescência (Firefly) e instrumentos articulados.</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-[#818CF8]" />
                      <span className="text-white text-sm font-medium">Equipe</span>
                    </div>
                    <p className="text-white/60 text-sm">Equipe multidisciplinar com urologista, anestesista, enfermagem especializada e instrumentador treinado em robótica.</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-[#818CF8]" />
                      <span className="text-white text-sm font-medium">Convênios</span>
                    </div>
                    <p className="text-white/60 text-sm">Diversos convênios cobrem a cirurgia robótica. Consulte disponibilidade para o seu plano de saúde.</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-[#818CF8]" />
                      <span className="text-white text-sm font-medium">Contato</span>
                    </div>
                    <p className="text-white/60 text-sm">WhatsApp (11) 98112-4455 — apenas mensagens</p>
                    <p className="text-white/60 text-sm">Telefone: Clinovi (11) 3382-1529 | Campinas (19) 2127-2900 | WhatsApp Campinas: (19) 99855-9890</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-[#6366F1] hover:bg-[#5558E6] text-white">
                      <CalendarCheck className="w-4 h-4 mr-2" />
                      Agendar Consulta
                    </Button>
                  </a>
                  <a
                    href="https://wa.me/5511981124455?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20cirurgia%20rob%C3%B3tica."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 bg-transparent">
                      <Phone className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={11} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] font-serif mb-6">Perguntas Frequentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: "O robô opera sozinho?",
                  a: "Não. O robô é um instrumento controlado integralmente pelo cirurgião. Cada movimento dos braços robóticos é comandado em tempo real pelo médico, que opera sentado no console com visão 3D. O robô não toma decisões — ele amplifica a precisão e a destreza do cirurgião.",
                },
                {
                  q: "A cirurgia robótica é mais segura que a cirurgia aberta?",
                  a: "Sim, as evidências mostram que a cirurgia robótica apresenta menores taxas de complicações, menor sangramento e recuperação mais rápida. Na prostatectomia radical, por exemplo, a taxa de complicações Clavien II é de 3,9% na robótica vs 17,5% na aberta (EAU 2025).",
                },
                {
                  q: "Quanto tempo dura a cirurgia robótica?",
                  a: "Depende do procedimento. Uma prostatectomia radical robótica dura em média 2-3 horas. Uma nefrectomia parcial robótica, 2-4 horas. O tempo operatório é comparável ou ligeiramente maior que a cirurgia aberta, mas com benefícios significativos na recuperação.",
                },
                {
                  q: "Quanto tempo de internação após cirurgia robótica?",
                  a: "Na maioria dos procedimentos, a internação é de 1-2 dias (vs 5-7 dias na cirurgia aberta). Em alguns casos selecionados, o paciente pode receber alta no mesmo dia.",
                },
                {
                  q: "A cirurgia robótica deixa cicatriz?",
                  a: "As incisões são muito pequenas (8-12mm), resultando em cicatrizes mínimas que se tornam praticamente imperceptíveis com o tempo. Geralmente são 5-6 pequenas incisões no abdome.",
                },
                {
                  q: "Meu convênio cobre cirurgia robótica?",
                  a: "Muitos convênios já cobrem a cirurgia robótica para procedimentos urológicos. A cobertura depende do plano e da operadora. Recomendamos entrar em contato conosco para verificar a cobertura do seu plano específico.",
                },
                {
                  q: "Quando posso voltar a trabalhar após a cirurgia?",
                  a: "Para atividades sedentárias, o retorno geralmente ocorre em 2-3 semanas. Para atividades que exigem esforço físico, recomenda-se aguardar 4-6 semanas. Cada caso é individualizado conforme o tipo de cirurgia e a evolução do paciente.",
                },
                {
                  q: "A cirurgia robótica é indicada para todos os casos?",
                  a: "Não. A indicação é individualizada, considerando o tipo de doença, a anatomia do paciente, cirurgias prévias e outros fatores. Em alguns casos, a cirurgia aberta ou laparoscópica convencional pode ser mais adequada. O urologista avaliará a melhor abordagem para cada situação.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h4 className="font-bold text-[#1C3D5A] mb-2">{item.q}</h4>
                  <p className="text-sm text-[#334155] leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Referências */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={12}>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-[#1C3D5A] mb-4">Referências</h3>
              <ol className="space-y-2 text-sm text-[#64748B]">
                <li>1. EAU-EANM-ESTRO-ESUR-ISUP-SIOG Guidelines on Prostate Cancer — Treatment, 2025. European Association of Urology. Tabela 6.2.4.</li>
                <li>2. EAU Guidelines on Renal Cell Carcinoma — Disease Management, 2025. European Association of Urology. Seção 7.2.2.</li>
                <li>3. Yaxley JW, et al. A randomised trial of robot-assisted laparoscopic prostatectomy vs open radical retropubic prostatectomy. Eur Urol. 2016;70(6):1028-1035.</li>
                <li>4. Coughlin GD, et al. Robot-assisted laparoscopic prostatectomy versus open radical retropubic prostatectomy: 24-month outcomes from a randomised controlled study. Lancet Oncol. 2018;19(8):1051-1060.</li>
                <li>5. Nyberg M, et al. Functional and oncological outcomes of robot-assisted vs laparoscopic radical prostatectomy: meta-analysis of 5 RCTs. BJU Int. 2023.</li>
                <li>6. Galfano A, et al. Retzius-sparing robot-assisted radical prostatectomy: early results and literature review. Eur Urol. 2019;76(3):363-370.</li>
                <li>7. Schlomm T, et al. NeuroSAFE PROOF: intraoperative frozen section during RARP. Lancet Oncol. 2021;22(10):1413-1422.</li>
                <li>8. Scuderi S, et al. Surgical technique and perioperative outcomes of robot-assisted vs open radical cystectomy. Eur Urol. 2026.</li>
                <li>9. Yang JW, et al. Application effect of different robotic surgery systems in urology: a network meta-analysis. PMC. 2025.</li>
                <li>10. Campbell-Walsh-Wein Urology, 13th Edition — Chapters on Minimally Invasive and Robotic Surgery. Elsevier, 2024.</li>
                <li>11. AUA Robotic Surgery (Urologic) Standard Operating Procedure. American Urological Association, 2024.</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </section>
    </EducationalLayout>
  );
}
