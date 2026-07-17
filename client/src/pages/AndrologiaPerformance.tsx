/**
 * Landing Page: Andrologia e Performance Masculina
 * Campanha Google Ads — foco em conversão high ticket
 * Tom: médico, elegante, discreto, autoridade técnica
 */
import { motion } from "framer-motion";
import { CheckCircle2, Activity, Brain, Beaker, ShieldCheck, TrendingUp } from "lucide-react";
import CampaignLayout from "@/components/CampaignLayout";
import { FaviconInjector } from "@/components/FaviconInjector";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function AndrologiaPerformance() {
  return (
    <>
      <FaviconInjector />
      <CampaignLayout
      title="Andrologia e Performance Masculina"
      subtitle="Saúde Hormonal e Sexual do Homem"
      description="Avaliação médica individualizada para otimização hormonal, saúde sexual e qualidade de vida masculina. Abordagem baseada em evidências científicas."
      campaignSlug="andrologia-performance-masculina"
      metaTitle="Andrologia e Performance Masculina em SP e Campinas | Dr. Felipe de Bulhões"
      metaDescription="Andrologia e saúde hormonal masculina com o Dr. Felipe de Bulhões. Avaliação individualizada, investigação hormonal e tratamento baseado em evidências. SP e Campinas."
      ogImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/og-banner-andrologia-5MNza8WeePLcioXt5hqUNr.png"
      medicalCondition="Hipogonadismo Masculino"
      trustBadges={["Formado Instituto D'Or", "Medicina Baseada em Evidências", "Atendimento Particular"]}
    >
      {/* Seção: Sintomas que merecem avaliação */}
      <section className="py-16 lg:py-20">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">
              Sintomas que merecem avaliação médica
            </h2>
            <p className="text-[#334155] leading-relaxed mb-8">
              A saúde hormonal masculina influencia diretamente a energia, composição corporal, função sexual e bem-estar geral. Quando há desequilíbrio, os sintomas podem ser sutis e progressivos — por isso a importância de uma avaliação especializada.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Activity, text: "Fadiga persistente e perda de energia" },
                { icon: Brain, text: "Dificuldade de concentração e irritabilidade" },
                { icon: TrendingUp, text: "Ganho de gordura abdominal e perda muscular" },
                { icon: ShieldCheck, text: "Redução da libido e disfunção erétil" },
                { icon: Activity, text: "Distúrbios do sono e suores noturnos" },
                { icon: Beaker, text: "Infertilidade ou alterações no espermograma" },
              ].map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
                  className="flex items-center gap-3 bg-[#F8FAFB] rounded-lg p-4 border border-[#1C3D5A]/6"
                >
                  <item.icon className="w-5 h-5 text-[#B87333] shrink-0" />
                  <span className="text-sm text-[#334155]">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção: Investigação Hormonal */}
      <section className="py-16 lg:py-20 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">
              Investigação hormonal completa
            </h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              O diagnóstico de hipogonadismo masculino requer avaliação clínica detalhada associada a exames laboratoriais específicos. Não se trata apenas de dosar testosterona — é necessário avaliar o eixo hormonal completo.
            </p>
            <div className="bg-white rounded-xl p-6 border border-[#1C3D5A]/6">
              <h3 className="text-lg font-semibold text-[#1C3D5A] dark:text-foreground mb-4">Painel de avaliação</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Testosterona total e livre",
                  "SHBG e albumina",
                  "LH e FSH",
                  "Estradiol e prolactina",
                  "PSA e hematócrito",
                  "Perfil metabólico completo",
                  "Espermograma (quando indicado)",
                  "Densitometria óssea (quando indicado)",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B87333] shrink-0" />
                    <span className="text-sm text-[#334155]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção: Abordagem Individualizada */}
      <section className="py-16 lg:py-20">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">
              Consulta individualizada
            </h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              Cada paciente apresenta um perfil hormonal único. A reposição de testosterona não é indicada para todos — e quando indicada, deve ser monitorada de forma rigorosa. O tratamento é sempre baseado em critérios clínicos e laboratoriais bem definidos.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
              <p className="text-sm text-amber-800 leading-relaxed">
                <strong>Importante:</strong> A terapia de reposição hormonal masculina (TRT) possui indicações precisas e contraindicações absolutas. Nunca inicie tratamento hormonal sem avaliação médica especializada e acompanhamento laboratorial regular.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#F8FAFB] rounded-xl p-6 border border-[#1C3D5A]/6">
                <h3 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-3">O que avaliamos</h3>
                <ul className="space-y-2">
                  {[
                    "Histórico clínico detalhado",
                    "Sintomas e impacto na qualidade de vida",
                    "Exames laboratoriais completos",
                    "Comorbidades e medicações em uso",
                    "Desejo reprodutivo atual e futuro",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B87333] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-6 border border-[#1C3D5A]/6">
                <h3 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-3">Abordagem terapêutica</h3>
                <ul className="space-y-2">
                  {[
                    "Otimização de estilo de vida (sono, exercício, nutrição)",
                    "Tratamento de causas reversíveis",
                    "TRT quando clinicamente indicada",
                    "Monitoramento laboratorial periódico",
                    "Preservação da fertilidade quando necessário",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B87333] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção: Medicina Baseada em Evidências */}
      <section className="py-16 lg:py-20 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">
              Medicina baseada em evidências
            </h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              O Dr. Felipe de Bulhões segue as diretrizes das principais sociedades urológicas internacionais (EAU, AUA) para diagnóstico e tratamento de distúrbios hormonais masculinos. A abordagem é sempre individualizada, segura e com acompanhamento rigoroso.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { title: "EAU Guidelines", desc: "European Association of Urology" },
                { title: "AUA Guidelines", desc: "American Urological Association" },
                { title: "ISSM", desc: "International Society for Sexual Medicine" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg p-4 border border-[#1C3D5A]/6 text-center">
                  <p className="font-semibold text-[#1C3D5A] dark:text-foreground text-sm">{item.title}</p>
                  <p className="text-xs text-[#64748B] mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </CampaignLayout>
    </>
  );
}
