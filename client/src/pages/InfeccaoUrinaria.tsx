/*
 * Design: Clinical Precision — Swiss Medical Design
 * Página: Infecção Urinária no Homem
 * Referências: EAU Guidelines 2025, AUA, SBU, Campbell-Walsh-Wein 13th Ed.
 */
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Thermometer,
  Shield,
  Pill,
  Microscope,
  ChevronRight,
  HeartPulse,
} from "lucide-react";
import EducationalLayout from "@/components/EducationalLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function InfeccaoUrinaria() {
  return (
    <EducationalLayout
      title="Infecção Urinária no Homem: Causas, Tratamento e Quando Procurar o Urologista"
      subtitle="Urologia Geral"
      description="Entenda por que a infecção urinária no homem sempre merece atenção especial, suas causas, sintomas, diagnóstico e tratamento baseado em evidências."
      accentColor="#EF4444"
      metaTitle="Infecção Urinária no Homem: Causas e Tratamento | Dr. Felipe de Bulhões"
      metaDescription="Infecção urinária masculina: causas, sintomas, quando procurar o urologista e tratamento. Guia completo baseado em guidelines da EAU e AUA."
    >
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          {/* Introdução */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-10">
              <p className="text-[#0A2540] leading-relaxed">
                Diferentemente das mulheres, a infecção urinária (ITU) no homem é considerada <strong>sempre complicada</strong> pelas diretrizes internacionais (EAU 2025, AUA). Isso significa que toda ITU masculina requer investigação urológica para identificar fatores predisponentes como obstrução prostática, cálculos ou alterações anatômicas. Ignorar uma ITU no homem pode levar a complicações graves como prostatite bacteriana, epididimite, abscesso prostático e sepse urinária.
              </p>
            </div>
          </motion.div>

          {/* Por que é diferente */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Por que a ITU no Homem É Diferente?</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A uretra masculina é significativamente mais longa (18-20 cm) que a feminina (3-4 cm), o que naturalmente protege contra infecções ascendentes. Quando um homem desenvolve ITU, isso geralmente indica uma <strong>condição subjacente</strong> que precisa ser investigada.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Obstrução Prostática (HPB)", desc: "A hiperplasia prostática benigna causa esvaziamento incompleto da bexiga, criando ambiente propício para proliferação bacteriana. É a causa mais comum em homens acima de 50 anos.", icon: Shield },
                { title: "Cálculos Urinários", desc: "Cálculos renais ou vesicais podem servir como reservatório de bactérias e causar obstrução, predispondo a infecções recorrentes.", icon: AlertTriangle },
                { title: "Estenose Uretral", desc: "Estreitamento da uretra por trauma, infecção prévia ou instrumentação pode dificultar o esvaziamento e favorecer infecções.", icon: HeartPulse },
                { title: "Cateterismo e Instrumentação", desc: "Sondagem vesical, cistoscopia e cirurgias urológicas podem introduzir bactérias no trato urinário.", icon: Thermometer },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-red-500" />
                    </div>
                    <h4 className="font-bold text-[#0A2540]">{item.title}</h4>
                  </div>
                  <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sintomas */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Sintomas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
                <h3 className="font-bold text-[#0A2540] mb-4">Cistite (Infecção Baixa)</h3>
                <ul className="space-y-2">
                  {["Ardência ao urinar (disúria)", "Aumento da frequência urinária", "Urgência miccional", "Dor suprapúbica", "Urina turva ou com odor forte", "Hematúria (sangue na urina)"].map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                <h3 className="font-bold text-[#0A2540] mb-4">Pielonefrite / Prostatite (Infecção Complicada)</h3>
                <ul className="space-y-2">
                  {["Febre alta (>38°C) com calafrios", "Dor lombar (flanco)", "Dor perineal ou pélvica", "Mal-estar geral e prostração", "Náuseas e vômitos", "Retenção urinária aguda"].map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="bg-red-100 rounded-lg p-3 mt-4">
                  <p className="text-xs text-red-800 font-semibold">
                    Atenção: Febre + sintomas urinários no homem = urgência urológica. Procure atendimento imediato.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Diagnóstico */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Diagnóstico</h2>
            <div className="space-y-4">
              {[
                { icon: Microscope, title: "Urocultura com Antibiograma", desc: "Exame fundamental que identifica a bactéria causadora e os antibióticos eficazes. Deve ser coletada ANTES de iniciar antibiótico. Resultado em 48-72h." },
                { icon: Pill, title: "Exame de Urina (EAS/Urina I)", desc: "Análise rápida que mostra leucócitos, hemácias, nitritos e bactérias. Útil para triagem inicial, mas não substitui a urocultura." },
                { icon: Shield, title: "Ultrassonografia do Trato Urinário", desc: "Avalia rins, bexiga e próstata. Identifica obstrução, cálculos, resíduo pós-miccional e abscessos. Indicada em toda ITU masculina." },
                { icon: HeartPulse, title: "PSA (se indicado)", desc: "Pode estar elevado durante infecção/prostatite. Deve ser dosado após resolução da infecção para avaliação prostática adequada." },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex gap-4 items-start">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                    <item.icon className="w-5 h-5 text-[#0D9488]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A2540] mb-1">{item.title}</h4>
                    <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tratamento */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Tratamento</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              O tratamento da ITU masculina difere significativamente do tratamento feminino. Segundo a <strong>EAU Guidelines 2025</strong>:
            </p>
            <div className="space-y-4">
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-[#0A2540] mb-3">Antibioticoterapia</h4>
                <ul className="space-y-2">
                  {[
                    "Duração mínima de 7-14 dias (diferente dos 3 dias da cistite feminina)",
                    "Fluoroquinolonas ou sulfametoxazol-trimetoprim são opções de primeira linha (quando sensíveis)",
                    "Ajuste conforme resultado da urocultura com antibiograma",
                    "Em prostatite aguda: antibiótico por 2-4 semanas com boa penetração prostática",
                    "Casos graves (sepse): internação com antibiótico endovenoso",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <CheckCircle2 className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-[#0A2540] mb-3">Investigação da Causa</h4>
                <ul className="space-y-2">
                  {[
                    "Avaliação prostática (HPB, prostatite crônica)",
                    "Investigação de cálculos urinários",
                    "Avaliação de resíduo pós-miccional",
                    "Cistoscopia se ITU recorrente ou hematúria persistente",
                    "Urodinâmica se suspeita de disfunção vesical",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <ChevronRight className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Prevenção */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={5} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#0A2540] font-serif mb-6">Prevenção</h2>
            <div className="bg-green-50 border border-green-100 rounded-xl p-6">
              <ul className="space-y-3">
                {[
                  "Hidratação adequada (2-2,5 litros de água por dia)",
                  "Esvaziamento vesical completo e regular",
                  "Tratamento adequado da HPB quando indicado",
                  "Higiene adequada, especialmente em pacientes com fimose",
                  "Acompanhamento urológico regular para pacientes com fatores de risco",
                  "Evitar automedicação com antibióticos — favorece resistência bacteriana",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#334155]">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Referências */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={6}>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-[#0A2540] mb-4">Referências</h3>
              <ol className="space-y-2 text-sm text-[#64748B]">
                <li>1. EAU Guidelines on Urological Infections, 2025. European Association of Urology.</li>
                <li>2. AUA Best Practice Statement on Urological Infections, 2024. American Urological Association.</li>
                <li>3. Campbell-Walsh-Wein Urology, 13th Edition — Chapter: Infections of the Urinary Tract. Elsevier, 2024.</li>
                <li>4. Grabe M, et al. Guidelines on Urological Infections. EAU Guidelines. Arnhem, The Netherlands.</li>
                <li>5. SBU — Diretrizes de Infecções Urinárias, 2023. Sociedade Brasileira de Urologia.</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </section>
    </EducationalLayout>
  );
}
