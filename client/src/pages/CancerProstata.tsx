/*
 * Design: Clinical Precision — Swiss Medical Design
 * Página: Câncer de Próstata — Diagnóstico, Estadiamento e Tratamento
 * Referências: EAU Guidelines 2025, AUA 2024, INCA 2025, Campbell-Walsh-Wein 13th Ed.
 */
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Shield,
  Activity,
  Target,
  Microscope,
  Zap,
  HeartPulse,
  ChevronRight,
  BarChart3,
  Pill,
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

export default function CancerProstata() {
  return (
    <EducationalLayout
      title="Câncer de Próstata: Diagnóstico, Estadiamento e Opções de Tratamento"
      subtitle="Uro-Oncologia"
      description="Guia completo sobre o câncer de próstata: epidemiologia, fatores de risco, diagnóstico, classificação de Gleason/ISUP, estadiamento e todas as opções de tratamento disponíveis."
      accentColor="#DC2626"
      metaTitle="Câncer de Próstata: Diagnóstico e Tratamento | Dr. Felipe de Bulhões"
      metaDescription="Guia completo sobre câncer de próstata: diagnóstico, PSA, biópsia, Gleason, estadiamento e tratamento. Urologista em São Paulo e Campinas."
    >
      <section className="py-16 bg-white dark:bg-card">
        <div className="container max-w-4xl">
          {/* Epidemiologia */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-600 p-6 rounded-r-lg mb-10">
              <p className="text-[#1C3D5A] dark:text-foreground leading-relaxed">
                O câncer de próstata é o <strong>tumor maligno mais frequente no homem brasileiro</strong> (excluindo pele não-melanoma), com estimativa de <strong>71.730 novos casos em 2025</strong> segundo o INCA. Quando diagnosticado precocemente, a taxa de sobrevida em 5 anos é superior a <strong>99%</strong>. O rastreamento adequado e o diagnóstico precoce são fundamentais para o sucesso do tratamento.
              </p>
            </div>
          </motion.div>

          {/* Fatores de risco */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Fatores de Risco</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { title: "Idade", desc: "Risco aumenta após 50 anos. 60% dos casos em >65 anos.", stat: "60%", statLabel: "dos casos >65 anos" },
                { title: "Hereditariedade", desc: "Pai ou irmão com CaP: risco 2-3x maior. BRCA2: risco 5x maior.", stat: "2-3x", statLabel: "maior risco" },
                { title: "Raça Negra", desc: "Incidência 1,7x maior. Doença mais agressiva e mortalidade 2,1x maior.", stat: "1,7x", statLabel: "maior incidência" },
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-card border border-gray-100 rounded-xl p-5 shadow-sm text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">{item.stat}</div>
                  <div className="text-xs text-[#64748B] mb-3">{item.statLabel}</div>
                  <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-2">{item.title}</h4>
                  <p className="text-xs text-[#334155] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Diagnóstico */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Diagnóstico</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              O diagnóstico do câncer de próstata segue uma sequência de etapas, desde o rastreamento até a confirmação histológica:
            </p>
            <div className="space-y-4">
              {[
                { step: "1", title: "PSA + Toque Retal", desc: "Rastreamento inicial. PSA elevado e/ou toque retal alterado indicam necessidade de investigação. A decisão de rastrear deve ser compartilhada entre médico e paciente.", ref: "EAU 2025 / AUA 2024" },
                { step: "2", title: "Ressonância Multiparamétrica (mpMRI)", desc: "Exame de imagem que avalia a próstata e classifica lesões pelo sistema PI-RADS (1-5). PI-RADS ≥3 indica necessidade de biópsia. Permite biópsia dirigida à lesão (fusion).", ref: "EAU 2025" },
                { step: "3", title: "Biópsia de Próstata", desc: "Coleta de fragmentos para análise histológica. Pode ser transretal ou transperineal (preferida pela EAU 2025 por menor risco de sepse). Biópsia por fusão (MRI-targeted) aumenta a detecção de tumores clinicamente significativos.", ref: "EAU 2025 / AUA 2024" },
                { step: "4", title: "Classificação Histológica", desc: "O patologista analisa os fragmentos e classifica pelo sistema de Gleason/ISUP. O grau ISUP (1-5) determina a agressividade do tumor e orienta o tratamento.", ref: "Campbell-Walsh-Wein 13th Ed." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-[#334155] leading-relaxed mb-1">{item.desc}</p>
                    <p className="text-xs text-[#64748B] italic">Fonte: {item.ref}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Classificação ISUP */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Classificação de Gleason e ISUP</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1C3D5A] text-white">
                    <th className="p-3 text-left text-sm font-semibold rounded-tl-lg">Grupo ISUP</th>
                    <th className="p-3 text-left text-sm font-semibold">Gleason</th>
                    <th className="p-3 text-left text-sm font-semibold">Risco</th>
                    <th className="p-3 text-left text-sm font-semibold rounded-tr-lg">Significado</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { isup: "1", gleason: "3+3 = 6", risco: "Baixo", desc: "Tumor bem diferenciado. Candidato a vigilância ativa.", color: "bg-green-50" },
                    { isup: "2", gleason: "3+4 = 7", risco: "Intermediário Favorável", desc: "Predominância de padrão 3. Bom prognóstico.", color: "bg-yellow-50" },
                    { isup: "3", gleason: "4+3 = 7", risco: "Intermediário Desfavorável", desc: "Predominância de padrão 4. Maior agressividade.", color: "bg-orange-50" },
                    { isup: "4", gleason: "4+4 = 8", risco: "Alto", desc: "Tumor pouco diferenciado. Tratamento agressivo indicado.", color: "bg-red-50" },
                    { isup: "5", gleason: "4+5 / 5+4 / 5+5", risco: "Muito Alto", desc: "Tumor indiferenciado. Maior risco de metástase.", color: "bg-red-100" },
                  ].map((row, i) => (
                    <tr key={i} className={`${row.color} border-b border-gray-100`}>
                      <td className="p-3 text-sm font-bold text-[#1C3D5A] dark:text-foreground">{row.isup}</td>
                      <td className="p-3 text-sm text-[#334155]">{row.gleason}</td>
                      <td className="p-3 text-sm text-[#334155] font-semibold">{row.risco}</td>
                      <td className="p-3 text-sm text-[#334155]">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#64748B] mt-3 italic">Fonte: ISUP 2014 / EAU Guidelines 2025</p>
          </motion.div>

          {/* Tratamento */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Opções de Tratamento</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              O tratamento é individualizado conforme o estágio da doença, classificação de risco, idade, comorbidades e preferência do paciente:
            </p>
            <div className="space-y-4">
              {[
                { icon: Shield, title: "Vigilância Ativa", desc: "Para tumores de baixo risco (ISUP 1, PSA <10, T1-T2a). Monitoramento com PSA, toque retal e biópsias periódicas. Evita tratamento desnecessário sem comprometer a cura. Recomendada pela EAU 2025 como opção preferencial para baixo risco.", risk: "Baixo Risco", color: "border-green-200 bg-green-50/30" },
                { icon: Zap, title: "Prostatectomia Radical", desc: "Remoção cirúrgica completa da próstata. Pode ser aberta, laparoscópica ou robótica (da Vinci). A via robótica oferece melhor visualização, menor sangramento e recuperação mais rápida. Indicada para doença localizada com expectativa de vida >10 anos.", risk: "Baixo a Alto Risco", color: "border-blue-200 bg-blue-50/30" },
                { icon: Target, title: "Radioterapia", desc: "Radioterapia externa (IMRT/VMAT) ou braquiterapia. Pode ser combinada com hormonioterapia em casos de risco intermediário e alto. Resultados oncológicos semelhantes à cirurgia para doença localizada.", risk: "Baixo a Alto Risco", color: "border-purple-200 bg-purple-50/30" },
                { icon: Pill, title: "Hormonioterapia (ADT)", desc: "Bloqueio androgênico por medicamentos que reduzem a testosterona. Usada em combinação com radioterapia ou como tratamento principal em doença metastática. Pode ser intermitente ou contínua.", risk: "Intermediário a Metastático", color: "border-orange-200 bg-orange-50/30" },
                { icon: Activity, title: "Terapias Combinadas", desc: "Para doença de alto risco e metastática: combinação de ADT + quimioterapia (docetaxel), ADT + novos agentes hormonais (abiraterona, enzalutamida, apalutamida, darolutamida) ou ADT + radioterapia.", risk: "Alto Risco / Metastático", color: "border-red-200 bg-red-50/30" },
                { icon: Microscope, title: "Terapias Focais", desc: "HIFU, crioterapia e terapia fotodinâmica. Tratam apenas a área do tumor, preservando tecido saudável. Ainda consideradas experimentais pela EAU 2025, mas com resultados promissores para doença unilateral de risco intermediário.", risk: "Intermediário (selecionados)", color: "border-indigo-200 bg-indigo-50/30" },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl p-5 border ${item.color}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white dark:bg-card rounded-lg flex items-center justify-center shadow-sm shrink-0">
                      <item.icon className="w-5 h-5 text-[#1C3D5A] dark:text-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h4 className="font-bold text-[#1C3D5A] dark:text-foreground">{item.title}</h4>
                        <span className="text-xs bg-white/80 px-2 py-0.5 rounded border text-[#64748B]">{item.risk}</span>
                      </div>
                      <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Decisão compartilhada */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={5} className="mb-14">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <BarChart3 className="w-8 h-8 text-blue-600 shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[#1C3D5A] dark:text-foreground mb-3">A Importância da Decisão Compartilhada</h3>
                  <p className="text-[#334155] leading-relaxed mb-3">
                    O tratamento do câncer de próstata deve ser uma <strong>decisão conjunta entre o paciente e o urologista</strong>. Cada opção terapêutica tem benefícios e efeitos colaterais específicos que devem ser discutidos abertamente.
                  </p>
                  <p className="text-[#334155] leading-relaxed">
                    Fatores como idade, expectativa de vida, comorbidades, preferências pessoais e impacto na qualidade de vida (continência urinária, função sexual) devem ser considerados. A discussão em equipe multidisciplinar (urologista, oncologista, radioterapeuta) é recomendada pela EAU 2025 para casos complexos.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Referências */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={6}>
            <div className="bg-gray-50 dark:bg-card rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-4">Referências</h3>
              <ol className="space-y-2 text-sm text-[#64748B]">
                <li>1. EAU Guidelines on Prostate Cancer, 2025. European Association of Urology.</li>
                <li>2. AUA/ASTRO/SUO Guideline on Clinically Localized Prostate Cancer, 2024.</li>
                <li>3. INCA — Estimativa de Câncer no Brasil, 2025. Instituto Nacional de Câncer.</li>
                <li>4. Campbell-Walsh-Wein Urology, 13th Edition — Chapters on Prostate Cancer. Elsevier, 2024.</li>
                <li>5. NCCN Clinical Practice Guidelines — Prostate Cancer, Version 1.2025.</li>
                <li>6. Mottet N, et al. EAU-EANM-ESTRO-ESUR-ISUP-SIOG Guidelines on Prostate Cancer. Eur Urol. 2025.</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </section>
    </EducationalLayout>
  );
}
