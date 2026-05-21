/*
 * Design: Clinical Precision — Swiss Medical Design
 * Página: Biópsia de Próstata — Guia Completo
 * Referências: EAU Guidelines 2025, AUA 2024, SBU, Campbell-Walsh-Wein 13th Ed.
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
  Syringe,
  Microscope,
  Target,
  ShieldAlert,
  CalendarCheck,
  Building2,
  Pill,
  Droplets,
  ThermometerSun,
  Ban,
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

const biopsiaProstataFAQs = [
  { question: "A biópsia de próstata dói?", answer: "Com a anestesia adequada, o desconforto é mínimo. Na via transperineal sob anestesia local, o paciente sente uma leve pressão e, eventualmente, um desconforto passageiro durante a coleta dos fragmentos. Muitos pacientes relatam que o procedimento foi mais simples do que esperavam." },
  { question: "Quanto tempo dura o procedimento?", answer: "O procedimento em si dura entre 15 e 30 minutos. Com o preparo e a recuperação, o paciente permanece no hospital por aproximadamente 2-4 horas no total." },
  { question: "Posso dirigir após a biópsia?", answer: "Se o procedimento foi realizado sob sedação, o paciente não deve dirigir nas 24 horas seguintes. Sob anestesia local, pode dirigir após a alta, desde que se sinta confortável." },
  { question: "Quando terei o resultado?", answer: "O laudo anatomopatológico geralmente fica pronto em 7 a 14 dias úteis. O resultado será discutido em consulta de retorno com o urologista." },
  { question: "A biópsia pode disseminar o câncer?", answer: "Não há evidência científica de que a biópsia de próstata cause disseminação (metástase) do câncer. Este é um mito sem fundamento. A biópsia é segura e essencial para o diagnóstico." },
  { question: "Preciso repetir a biópsia se o resultado for negativo?", answer: "Depende do contexto clínico. Se a suspeita persistir (PSA em ascensão, lesão na RM), uma nova biópsia pode ser indicada. A decisão é individualizada pelo urologista." }
];

export default function BiopsiaProstata() {
  return (
    <EducationalLayout
      title="Biópsia de Próstata: Guia Completo"
      subtitle="Procedimento Diagnóstico"
      description="Tudo o que você precisa saber sobre a biópsia de próstata: indicações, preparo, como é realizada, pós-procedimento e possíveis complicações. Informações baseadas nas diretrizes da EAU 2025, AUA e SBU."
      accentColor="#B87333"
      metaTitle="Biópsia de Próstata: Como é Feita, Preparo e Complicações | Dr. Felipe de Bulhões"
      metaDescription="Guia completo sobre biópsia de próstata: indicações, preparo, técnicas (transperineal e transretal), pós-biópsia e complicações. Procedimento realizado no Campinas Day Hospital."
    >
      <FAQSchema questions={biopsiaProstataFAQs} />

      {/* Introdução */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="bg-gradient-to-r from-amber-50 to-blue-50 border-l-4 border-[#B87333] p-6 rounded-r-lg mb-10">
              <p className="text-[#1C3D5A] dark:text-foreground leading-relaxed">
                A biópsia de próstata é o <strong>exame definitivo para o diagnóstico do câncer de próstata</strong>. Consiste na coleta de pequenos fragmentos de tecido prostático para análise microscópica (histopatológica). Segundo as <strong>diretrizes da European Association of Urology (EAU 2025)</strong>, a biópsia deve ser precedida por ressonância magnética multiparamétrica (mpMRI) e realizada preferencialmente pela <strong>via transperineal</strong>, que apresenta menor risco de infecção.
              </p>
            </div>
          </motion.div>

          {/* O que é */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">O que é a Biópsia de Próstata?</h2>
            <p className="text-[#334155] leading-relaxed mb-4">
              A biópsia de próstata é um procedimento médico no qual uma agulha especial é utilizada para retirar pequenos fragmentos (cilindros) de tecido da próstata. Esses fragmentos são enviados ao laboratório de patologia, onde são analisados ao microscópio para identificar a presença de células cancerígenas e determinar o grau de agressividade do tumor (escore de Gleason / ISUP Grade Group).
            </p>
            <p className="text-[#334155] leading-relaxed mb-6">
              O procedimento é guiado por ultrassonografia transretal e, atualmente, pode ser combinado com a <strong>fusão de imagens de ressonância magnética (MRI-TRUS fusion)</strong>, que permite direcionar a agulha para áreas suspeitas identificadas previamente na RM, aumentando significativamente a acurácia diagnóstica.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#B87333]/10 rounded-lg flex items-center justify-center mb-4">
                  <Microscope className="w-6 h-6 text-[#B87333]" />
                </div>
                <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-3">Biópsia Sistemática</h3>
                <p className="text-[#334155] text-sm leading-relaxed mb-3">
                  Coleta padronizada de <strong>12 a 14 fragmentos</strong> distribuídos bilateralmente pela próstata, do ápice à base, nas regiões mais laterais e posteriores da glândula.
                </p>
                <ul className="space-y-2">
                  {["Amostragem ampla da próstata", "Padrão mínimo: 12 fragmentos", "Bilateral: ápice, meio e base", "Pode detectar tumores não visíveis na RM"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <CheckCircle2 className="w-4 h-4 text-[#B87333] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[#64748B] mt-3 italic">Fonte: EAU Guidelines 2025</p>
              </div>
              <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#B87333]/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-[#B87333]" />
                </div>
                <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-3">Biópsia Dirigida (MRI-Targeted)</h3>
                <p className="text-[#334155] text-sm leading-relaxed mb-3">
                  Coleta direcionada para <strong>lesões suspeitas identificadas na ressonância magnética</strong>, utilizando fusão de imagens (MRI-TRUS fusion) ou guia cognitivo. Mínimo de 3-5 fragmentos por lesão.
                </p>
                <ul className="space-y-2">
                  {["Maior detecção de câncer significativo", "Menor detecção de câncer insignificante", "Guiada por RM (PI-RADS ≥ 3)", "Complementa a biópsia sistemática"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <CheckCircle2 className="w-4 h-4 text-[#B87333] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[#64748B] mt-3 italic">Fonte: EAU Guidelines 2025 — PRECISION Trial</p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-amber-800">
                <strong>Recomendação atual (EAU 2025):</strong> A combinação de biópsia sistemática + biópsia dirigida (quando há lesão na RM) é o padrão-ouro, pois a biópsia dirigida isolada pode perder até 16% dos cânceres clinicamente significativos (ISUP GG ≥ 2).
              </p>
            </div>
          </motion.div>

          {/* Indicações */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Quando a Biópsia é Indicada?</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A biópsia de próstata não é um exame de rotina — ela é indicada quando há <strong>suspeita clínica de câncer de próstata</strong> baseada em um ou mais dos seguintes achados:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "PSA elevado ou em ascensão",
                  desc: "Valores de PSA acima do esperado para a idade, ou aumento progressivo (velocidade de PSA > 0,75 ng/mL/ano). O PSA isolado não indica biópsia — deve ser interpretado no contexto clínico.",
                  icon: Activity,
                  color: "blue",
                },
                {
                  title: "Toque retal alterado",
                  desc: "Presença de nódulos, endurecimento ou assimetria da próstata ao exame digital retal, independentemente do valor do PSA.",
                  icon: Stethoscope,
                  color: "blue",
                },
                {
                  title: "Ressonância magnética com lesão suspeita (PI-RADS ≥ 3)",
                  desc: "Lesões classificadas como PI-RADS 3, 4 ou 5 na ressonância multiparamétrica indicam probabilidade crescente de câncer clinicamente significativo e devem ser biopsiadas.",
                  icon: Target,
                  color: "blue",
                },
                {
                  title: "Calculadoras de risco elevado",
                  desc: "Ferramentas como o ERSPC Risk Calculator ou o Rotterdam Risk Calculator podem auxiliar na decisão, combinando PSA, idade, volume prostático, toque retal e resultados de RM.",
                  icon: FileText,
                  color: "blue",
                },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-card rounded-xl p-6 border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-1">{item.title}</h4>
                      <p className="text-[#334155] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800">
                <strong>Fluxo diagnóstico recomendado (EAU 2025):</strong> PSA + Toque Retal → Ressonância Magnética Multiparamétrica → Biópsia (se PI-RADS ≥ 3 ou alta suspeita clínica). A RM antes da biópsia é o padrão atual e permite evitar biópsias desnecessárias em até 28% dos casos.
              </p>
            </div>
          </motion.div>

          {/* Preparo */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Preparo para a Biópsia</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              O preparo adequado é fundamental para minimizar complicações e garantir a qualidade do procedimento. As orientações variam conforme a via de acesso (transperineal ou transretal) e o protocolo do serviço.
            </p>

            <h3 className="text-xl font-bold text-[#1C3D5A] dark:text-foreground mb-4 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-[#B87333]" />
              Antes do Procedimento
            </h3>
            <div className="space-y-4 mb-8">
              {[
                {
                  step: "1",
                  title: "Exames pré-operatórios",
                  desc: "Hemograma, coagulograma, urina tipo I e urocultura. Esses exames são essenciais para avaliar a coagulação e descartar infecção urinária ativa, que contraindica o procedimento.",
                },
                {
                  step: "2",
                  title: "Suspensão de anticoagulantes e antiagregantes",
                  desc: "Medicamentos como AAS (aspirina), clopidogrel, varfarina e anticoagulantes orais diretos (DOACs) devem ser suspensos conforme orientação médica, geralmente 5-7 dias antes. A decisão de suspender deve ser individualizada e discutida com o cardiologista quando necessário.",
                },
                {
                  step: "3",
                  title: "Antibioticoprofilaxia",
                  desc: "Para biópsia transretal: antibiótico profilático é obrigatório (geralmente fluoroquinolona ou antibiótico direcionado por cultura retal). Para biópsia transperineal: a profilaxia antibiótica pode ser omitida em muitos protocolos, conforme recomendação da EAU 2025.",
                },
                {
                  step: "4",
                  title: "Preparo intestinal (biópsia transretal)",
                  desc: "Quando a biópsia é realizada por via transretal, pode ser solicitado preparo intestinal com enema (fleet enema / Phosfoenema) na manhã do procedimento. Na via transperineal, o preparo intestinal geralmente não é necessário.",
                },
                {
                  step: "5",
                  title: "Jejum",
                  desc: "Jejum de 6 a 8 horas para procedimentos sob sedação. Para biópsias sob anestesia local, o jejum pode não ser necessário, mas deve ser confirmado com a equipe médica.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#B87333] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-[#1C3D5A] dark:text-foreground mb-4 flex items-center gap-2">
              <Ban className="w-5 h-5 text-red-500" />
              O que Evitar Antes da Biópsia
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { item: "Anti-inflamatórios (ibuprofeno, naproxeno) — suspender 5-7 dias antes", icon: Pill },
                { item: "Suplementos com efeito anticoagulante (ginkgo biloba, ômega-3, vitamina E em altas doses)", icon: Pill },
                { item: "Relações sexuais nas 24-48h antes (para não alterar PSA se coleta simultânea)", icon: Ban },
                { item: "Exercícios físicos intensos no dia do procedimento", icon: Activity },
              ].map((item, i) => (
                <div key={i} className="bg-red-50/50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-[#334155]">{item.item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Como é realizada */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Como é Realizada a Biópsia?</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A biópsia de próstata pode ser realizada por duas vias de acesso: <strong>transperineal</strong> (pela pele do períneo, entre o escroto e o ânus) ou <strong>transretal</strong> (através do reto). A via transperineal é atualmente preferida pela EAU 2025 devido ao menor risco de infecção.
            </p>

            {/* Comparação das vias */}
            <div className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-xl overflow-hidden mb-8">
              <div className="grid grid-cols-3 bg-[#1C3D5A] text-white text-sm font-semibold">
                <div className="p-4">Característica</div>
                <div className="p-4 text-center border-l border-white/10">Transperineal (TP)</div>
                <div className="p-4 text-center border-l border-white/10">Transretal (TR)</div>
              </div>
              {[
                { feat: "Via de acesso", tp: "Pele do períneo", tr: "Parede do reto" },
                { feat: "Risco de infecção (sepse)", tp: "0,1%", tr: "0,9%" },
                { feat: "Antibiótico profilático", tp: "Pode ser omitido", tr: "Obrigatório" },
                { feat: "Anestesia", tp: "Local ou sedação", tr: "Local ou sedação" },
                { feat: "Dor durante o procedimento", tp: "Moderada (maior)", tr: "Leve a moderada" },
                { feat: "Acesso a tumores anteriores", tp: "Melhor", tr: "Limitado" },
                { feat: "Preparo intestinal", tp: "Geralmente não necessário", tr: "Recomendado" },
                { feat: "Recomendação EAU 2025", tp: "Preferida ✓", tr: "Alternativa" },
              ].map((row, i) => (
                <div key={i} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-gray-50 dark:bg-card" : "bg-white"}`}>
                  <div className="p-4 font-medium text-[#1C3D5A] dark:text-foreground">{row.feat}</div>
                  <div className="p-4 text-center text-[#334155] border-l border-gray-100">{row.tp}</div>
                  <div className="p-4 text-center text-[#334155] border-l border-gray-100">{row.tr}</div>
                </div>
              ))}
              <div className="p-3 bg-gray-50 dark:bg-card border-t border-gray-200 dark:border-border">
                <p className="text-xs text-[#64748B] italic text-center">
                  Fonte: EAU Guidelines 2025 — Meta-análise de 13 estudos com 4.516 pacientes (LE 1a)
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#1C3D5A] dark:text-foreground mb-4">Passo a Passo do Procedimento</h3>
            <div className="space-y-4 mb-8">
              {[
                {
                  step: "1",
                  title: "Posicionamento",
                  desc: "O paciente é posicionado em litotomia (deitado de costas com as pernas elevadas) para a via transperineal, ou em decúbito lateral (deitado de lado) para a via transretal.",
                },
                {
                  step: "2",
                  title: "Anestesia",
                  desc: "Pode ser realizada sob anestesia local (bloqueio periprostático com lidocaína), sedação ou anestesia geral, dependendo do protocolo do serviço e da preferência do paciente. Na via transperineal, a anestesia local inclui infiltração da pele perineal e bloqueio periprostático.",
                },
                {
                  step: "3",
                  title: "Introdução do transdutor ultrassonográfico",
                  desc: "Um transdutor de ultrassom transretal é introduzido para visualizar a próstata em tempo real. As imagens da ressonância magnética prévia podem ser fundidas com o ultrassom (fusão MRI-TRUS) para guiar a biópsia dirigida.",
                },
                {
                  step: "4",
                  title: "Coleta dos fragmentos",
                  desc: "Utilizando uma pistola de biópsia com agulha de 18G, são coletados os fragmentos. Na biópsia sistemática, 12-14 fragmentos são retirados de regiões padronizadas. Na biópsia dirigida, 3-5 fragmentos adicionais são coletados de cada lesão suspeita na RM.",
                },
                {
                  step: "5",
                  title: "Identificação e envio ao laboratório",
                  desc: "Cada fragmento é identificado por localização (base, meio, ápice; direito ou esquerdo; dirigido) e acondicionado em frascos com formol para envio ao laboratório de patologia.",
                },
                {
                  step: "6",
                  title: "Duração",
                  desc: "O procedimento completo dura entre 15 e 30 minutos. O paciente geralmente recebe alta no mesmo dia (procedimento ambulatorial).",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#B87333] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pós-biópsia */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={5} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Pós-Biópsia: O que Esperar</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              Após a biópsia, é normal apresentar alguns sintomas leves que tendem a resolver espontaneamente em poucos dias a semanas. Conhecer o que é esperado ajuda a diferenciar o normal de situações que exigem atenção médica.
            </p>

            <h3 className="text-xl font-bold text-[#1C3D5A] dark:text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Sintomas Normais (Esperados)
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  title: "Sangue na urina (hematúria)",
                  desc: "Urina avermelhada ou rosada é comum nos primeiros 2-3 dias. Pode persistir de forma intermitente por até 2-3 semanas. Aumente a ingestão de água para diluir.",
                  icon: Droplets,
                  duration: "2-3 semanas",
                },
                {
                  title: "Sangue no esperma (hematospermia)",
                  desc: "O sêmen pode apresentar coloração escura ou avermelhada. É o sintoma mais duradouro e pode persistir por 4-6 semanas. Não tem significado clínico.",
                  icon: Droplets,
                  duration: "4-6 semanas",
                },
                {
                  title: "Sangramento retal leve",
                  desc: "Pequena quantidade de sangue nas fezes ou no papel higiênico, especialmente na biópsia transretal. Geralmente resolve em 2-3 dias.",
                  icon: Droplets,
                  duration: "2-3 dias",
                },
                {
                  title: "Desconforto perineal ou retal",
                  desc: "Dor leve ou desconforto na região do períneo ou reto é esperada. Pode ser aliviada com analgésicos simples (paracetamol ou dipirona).",
                  icon: ThermometerSun,
                  duration: "3-5 dias",
                },
              ].map((item, i) => (
                <div key={i} className="bg-green-50/50 border border-green-100 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1C3D5A] dark:text-foreground">{item.title}</h4>
                      <span className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Duração: {item.duration}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-[#1C3D5A] dark:text-foreground mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              Cuidados no Pós-Procedimento
            </h3>
            <div className="space-y-3 mb-8">
              {[
                "Beba bastante água (pelo menos 2-3 litros/dia) nos primeiros dias para ajudar a limpar a urina",
                "Evite esforço físico intenso e levantamento de peso por 48-72 horas",
                "Evite relações sexuais por 5-7 dias",
                "Evite andar de bicicleta ou moto por 7-10 dias",
                "Complete o antibiótico prescrito (se houver), mesmo que se sinta bem",
                "Utilize os analgésicos conforme orientação médica (paracetamol ou dipirona)",
                "Evite AAS e anti-inflamatórios por 5-7 dias após o procedimento",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 dark:bg-card rounded-lg p-4 border border-gray-100">
                  <ChevronRight className="w-4 h-4 text-[#B87333] mt-0.5 shrink-0" />
                  <p className="text-sm text-[#334155]">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Complicações */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={6} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Possíveis Complicações</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              Embora a biópsia de próstata seja um procedimento seguro e rotineiro, como qualquer procedimento invasivo, pode apresentar complicações. A maioria é leve e autolimitada. A escolha da via transperineal reduz significativamente o risco de complicações infecciosas.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Sangramento",
                  desc: "Hematúria (sangue na urina), hematospermia (sangue no esperma) e sangramento retal são as complicações mais comuns, ocorrendo em até 50-60% dos pacientes. Na grande maioria, são autolimitados e não requerem intervenção.",
                  severity: "Comum — geralmente leve",
                  color: "yellow",
                },
                {
                  title: "Infecção",
                  desc: "Infecção urinária pode ocorrer em 2-6% dos casos na via transretal. Sepse (infecção grave) ocorre em 0,9% na via transretal e apenas 0,1% na via transperineal (EAU 2025, meta-análise com 162.577 pacientes). A via transperineal reduziu significativamente esse risco.",
                  severity: "Incomum — potencialmente grave",
                  color: "red",
                },
                {
                  title: "Retenção urinária aguda",
                  desc: "Dificuldade ou impossibilidade de urinar após o procedimento pode ocorrer em 0,2-1,7% dos casos, especialmente em pacientes com próstata aumentada (HPB). Pode necessitar de sondagem vesical temporária.",
                  severity: "Rara",
                  color: "orange",
                },
                {
                  title: "Disfunção erétil transitória",
                  desc: "Dificuldade de ereção pode ocorrer temporariamente em alguns pacientes, geralmente relacionada à ansiedade e ao desconforto pós-procedimento. Tende a resolver espontaneamente em semanas.",
                  severity: "Incomum — transitória",
                  color: "yellow",
                },
                {
                  title: "Dor persistente",
                  desc: "Dor perineal ou retal que persiste além de uma semana deve ser avaliada. Pode indicar hematoma ou infecção local.",
                  severity: "Rara",
                  color: "yellow",
                },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl p-5 border ${
                  item.color === "red" ? "bg-red-50/50 border-red-100" :
                  item.color === "orange" ? "bg-orange-50/50 border-orange-100" :
                  "bg-yellow-50/50 border-yellow-100"
                }`}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-5 h-5 mt-0.5 shrink-0 ${
                      item.color === "red" ? "text-red-500" :
                      item.color === "orange" ? "text-orange-500" :
                      "text-yellow-600"
                    }`} />
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-[#1C3D5A] dark:text-foreground">{item.title}</h4>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          item.color === "red" ? "bg-red-100 text-red-700" :
                          item.color === "orange" ? "bg-orange-100 text-orange-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {item.severity}
                        </span>
                      </div>
                      <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-red-800">
                <strong>Quando procurar atendimento de urgência:</strong> Febre acima de 38°C, calafrios, dificuldade para urinar (retenção), sangramento intenso que não para, ou dor intensa e progressiva. Esses sintomas podem indicar infecção ou complicação que requer tratamento imediato.
              </p>
            </div>
          </motion.div>

          {/* Resultados */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={7} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Entendendo os Resultados</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              O resultado da biópsia geralmente fica pronto em 7 a 14 dias úteis. O laudo anatomopatológico informa se há presença de câncer e, em caso positivo, classifica o tumor:
            </p>
            <div className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-xl overflow-hidden mb-6">
              <div className="grid grid-cols-4 bg-[#1C3D5A] text-white text-sm font-semibold">
                <div className="p-4">ISUP Grade Group</div>
                <div className="p-4 text-center border-l border-white/10">Gleason Score</div>
                <div className="p-4 text-center border-l border-white/10">Classificação</div>
                <div className="p-4 text-center border-l border-white/10">Risco</div>
              </div>
              {[
                { isup: "1", gleason: "3+3 = 6", class: "Baixo grau", risk: "Baixo", color: "bg-green-50" },
                { isup: "2", gleason: "3+4 = 7", class: "Intermediário favorável", risk: "Intermediário", color: "bg-yellow-50" },
                { isup: "3", gleason: "4+3 = 7", class: "Intermediário desfavorável", risk: "Intermediário", color: "bg-orange-50" },
                { isup: "4", gleason: "4+4 / 3+5 / 5+3 = 8", class: "Alto grau", risk: "Alto", color: "bg-red-50" },
                { isup: "5", gleason: "4+5 / 5+4 / 5+5 = 9-10", class: "Muito alto grau", risk: "Muito alto", color: "bg-red-100" },
              ].map((row, i) => (
                <div key={i} className={`grid grid-cols-4 text-sm ${row.color}`}>
                  <div className="p-4 font-bold text-[#1C3D5A] dark:text-foreground">Grupo {row.isup}</div>
                  <div className="p-4 text-center text-[#334155] border-l border-gray-100">{row.gleason}</div>
                  <div className="p-4 text-center text-[#334155] border-l border-gray-100">{row.class}</div>
                  <div className="p-4 text-center font-medium border-l border-gray-100">{row.risk}</div>
                </div>
              ))}
              <div className="p-3 bg-gray-50 dark:bg-card border-t border-gray-200 dark:border-border">
                <p className="text-xs text-[#64748B] italic text-center">
                  Fonte: ISUP 2014 / WHO Classification 2022 — EAU Guidelines 2025
                </p>
              </div>
            </div>
            <p className="text-[#334155] leading-relaxed">
              O resultado da biópsia é fundamental para definir o tratamento mais adequado. Cânceres de baixo risco (ISUP 1) podem ser acompanhados com <strong>vigilância ativa</strong>, enquanto cânceres de risco intermediário e alto geralmente requerem tratamento ativo (cirurgia, radioterapia ou outras modalidades).
            </p>
          </motion.div>

          {/* Onde realizamos — Campinas Day Hospital */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={8} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Onde Realizamos a Biópsia de Próstata</h2>
            <div className="bg-gradient-to-br from-[#1C3D5A] to-[#0F3460] rounded-2xl overflow-hidden">
              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#D4884A]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Campinas Day Hospital</h3>
                    <p className="text-white/50 text-sm">Centro cirúrgico moderno e completo</p>
                  </div>
                </div>

                <p className="text-white/70 leading-relaxed mb-6">
                  A biópsia de próstata é realizada no <strong className="text-white">Campinas Day Hospital</strong>, um centro cirúrgico moderno localizado no Cambuí em Campinas, equipado com tecnologia de ponta para procedimentos urológicos. A estrutura permite a realização do procedimento de forma ambulatorial (day clinic), com alta no mesmo dia.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white dark:bg-card/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-[#D4884A]" />
                      <span className="text-white text-sm font-medium">Endereço</span>
                    </div>
                    <p className="text-white/60 text-sm">Av. Benjamin Constant, 1991 — Cambuí, Campinas/SP</p>
                  </div>
                  <div className="bg-white dark:bg-card/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-[#D4884A]" />
                      <span className="text-white text-sm font-medium">Convênios</span>
                    </div>
                    <p className="text-white/60 text-sm">Allianz, Amil, Bradesco, Cassi, Porto Seguro, SulAmérica, Unimed e outros. Também atendimento particular.</p>
                  </div>
                  <div className="bg-white dark:bg-card/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-[#D4884A]" />
                      <span className="text-white text-sm font-medium">Atendimento</span>
                    </div>
                    <p className="text-white/60 text-sm">Sexta-feira: 8h às 12h</p>
                  </div>
                  <div className="bg-white dark:bg-card/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-[#D4884A]" />
                      <span className="text-white text-sm font-medium">Contato</span>
                    </div>
                    <p className="text-white/60 text-sm">WhatsApp (11) 98112-4455 — apenas mensagens</p>
                    <p className="text-white/60 text-sm">Telefone: Clinovi (11) 3382-1529 | Campinas (19) 2127-2900 | WhatsApp Campinas: (19) 99855-9890</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/local/campinas-day-hospital">
                    <Button className="bg-[#B87333] hover:bg-[#8B5A2B] text-white">
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

          {/* Perguntas frequentes */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={9} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Perguntas Frequentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: "A biópsia de próstata dói?",
                  a: "Com a anestesia adequada, o desconforto é mínimo. Na via transperineal sob anestesia local, o paciente sente uma leve pressão e, eventualmente, um desconforto passageiro durante a coleta dos fragmentos. Muitos pacientes relatam que o procedimento foi mais simples do que esperavam.",
                },
                {
                  q: "Quanto tempo dura o procedimento?",
                  a: "O procedimento em si dura entre 15 e 30 minutos. Com o preparo e a recuperação, o paciente permanece no hospital por aproximadamente 2-4 horas no total.",
                },
                {
                  q: "Posso dirigir após a biópsia?",
                  a: "Se o procedimento foi realizado sob sedação, o paciente não deve dirigir nas 24 horas seguintes. Sob anestesia local, pode dirigir após a alta, desde que se sinta confortável.",
                },
                {
                  q: "Quando terei o resultado?",
                  a: "O laudo anatomopatológico geralmente fica pronto em 7 a 14 dias úteis. O resultado será discutido em consulta de retorno com o urologista.",
                },
                {
                  q: "A biópsia pode disseminar o câncer?",
                  a: "Não há evidência científica de que a biópsia de próstata cause disseminação (metástase) do câncer. Este é um mito sem fundamento. A biópsia é segura e essencial para o diagnóstico.",
                },
                {
                  q: "Preciso repetir a biópsia se o resultado for negativo?",
                  a: "Depende do contexto clínico. Se a suspeita persistir (PSA em ascensão, lesão na RM), uma nova biópsia pode ser indicada. A decisão é individualizada pelo urologista.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-card rounded-xl p-6 border border-gray-100">
                  <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-2">{item.q}</h4>
                  <p className="text-sm text-[#334155] leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Referências */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={10}>
            <div className="bg-gray-50 dark:bg-card rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-4">Referências</h3>
              <ol className="space-y-2 text-sm text-[#64748B]">
                <li>1. EAU-EANM-ESTRO-ESUR-ISUP-SIOG Guidelines on Prostate Cancer — Diagnostic Evaluation, 2025. European Association of Urology.</li>
                <li>2. Kasivisvanathan V, et al. MRI-Targeted or Standard Biopsy for Prostate-Cancer Diagnosis (PRECISION Trial). N Engl J Med. 2018;378(19):1767-1777.</li>
                <li>3. Pilatz A, et al. European Association of Urology Guidelines on Urological Infections — Antibiotic Prophylaxis for Prostate Biopsy, 2025.</li>
                <li>4. Xiang J, et al. Transperineal versus transrectal prostate biopsy in the diagnosis of prostate cancer: a systematic review and meta-analysis. World J Surg Oncol. 2019;17:31.</li>
                <li>5. Grummet JP, et al. Sepsis and 'superbugs': a role for the prostate biopsy revisited. BJU Int. 2020;125(2):175-177.</li>
                <li>6. Epstein JI, et al. The 2014 International Society of Urological Pathology (ISUP) Consensus Conference on Gleason Grading of Prostatic Carcinoma. Am J Surg Pathol. 2016;40(2):244-252.</li>
                <li>7. Campbell-Walsh-Wein Urology, 13th Edition — Chapter on Prostate Biopsy Techniques. Elsevier, 2024.</li>
                <li>8. AUA/ASTRO/SUO Guideline on Clinically Localized Prostate Cancer, 2024. American Urological Association.</li>
                <li>9. Sociedade Brasileira de Urologia (SBU) — Nota Oficial sobre Rastreamento do Câncer de Próstata, 2023.</li>
                <li>10. Drost FH, et al. Prostate MRI, with or without MRI-targeted biopsy, and systematic biopsy for detecting prostate cancer. Cochrane Database Syst Rev. 2019;4:CD012663.</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </section>
    </EducationalLayout>
  );
}
