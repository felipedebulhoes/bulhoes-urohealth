/**
 * Landing Page: Estética Íntima Masculina
 * Campanha Google Ads — foco em conversão high ticket
 * Tom: clínico, discreto, sem apelo sexual explícito
 */
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Eye, UserCheck, AlertTriangle, Stethoscope } from "lucide-react";
import CampaignLayout from "@/components/CampaignLayout";
import { FaviconInjector } from "@/components/FaviconInjector";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function EsteticaIntimaMasculina() {
  return (
    <>
      <FaviconInjector />
      <WhatsAppFloatingButton campaignName="estetica-intima-masculina" />
      <CampaignLayout
      title="Estética Íntima Masculina"
      subtitle="Procedimentos Urológicos Estéticos"
      description="Avaliação médica especializada para procedimentos estéticos genitais masculinos. Abordagem clínica, discreta e com expectativas realistas."
      campaignSlug="estetica-intima-masculina"
      metaTitle="Estética Íntima Masculina em SP e Campinas | Dr. Felipe de Bulhões"
      metaDescription="Estética íntima masculina com urologista. Avaliação discreta, procedimentos seguros e expectativas realistas. Atendimento em São Paulo e Campinas."
      ogImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/og-banner-estetica-intima-9jXDPQ5y9xybYDDczDfBQY.png"
      medicalCondition="Estética Genital Masculina"
      trustBadges={["Formado Instituto D'Or", "Urologista Especialista", "Atendimento Particular"]}
    >
      {/* Seção: Avaliação Discreta */}
      <section className="py-16 lg:py-20">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">
              Avaliação médica especializada
            </h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A estética íntima masculina é uma área da urologia que trata de queixas relacionadas à aparência genital que impactam a autoestima e o bem-estar do paciente. A consulta é conduzida em ambiente acolhedor, com total sigilo e profissionalismo.
            </p>
            <p className="text-[#334155] leading-relaxed mb-8">
              O Dr. Felipe de Bulhões realiza avaliação individualizada para determinar se há indicação médica para procedimentos estéticos, discutindo de forma transparente os resultados esperados, limitações e possíveis complicações.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: Eye, title: "Discrição", desc: "Ambiente acolhedor e sigiloso" },
                { icon: UserCheck, title: "Individualizado", desc: "Avaliação caso a caso" },
                { icon: ShieldCheck, title: "Segurança", desc: "Protocolos validados" },
              ].map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
                  className="bg-[#F8FAFB] rounded-xl p-6 border border-[#1C3D5A]/6 text-center"
                >
                  <item.icon className="w-8 h-8 text-[#B87333] mx-auto mb-3" />
                  <p className="font-semibold text-[#1C3D5A] dark:text-foreground">{item.title}</p>
                  <p className="text-sm text-[#64748B] mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção: Procedimentos */}
      <section className="py-16 lg:py-20 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">
              Procedimentos disponíveis
            </h2>
            <p className="text-[#334155] leading-relaxed mb-8">
              Os procedimentos de estética íntima masculina são realizados com técnicas validadas na literatura urológica, utilizando materiais biocompatíveis e seguindo protocolos de segurança rigorosos.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Preenchimento peniano com ácido hialurônico",
                  desc: "Procedimento ambulatorial para aumento de circunferência. Utiliza ácido hialurônico de alta densidade, específico para a região. Resultado temporário (12-18 meses) e reversível.",
                },
                {
                  title: "Tratamento de curvatura peniana",
                  desc: "Avaliação e tratamento da Doença de Peyronie e curvaturas congênitas. Abordagem clínica ou cirúrgica conforme indicação.",
                },
                {
                  title: "Correção de assimetrias escrotais",
                  desc: "Procedimentos para correção de assimetrias ou excesso de pele escrotal que causem desconforto estético ou funcional.",
                },
              ].map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
                  className="bg-white rounded-xl p-6 border border-[#1C3D5A]/6"
                >
                  <h3 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção: Indicações e Contraindicações */}
      <section className="py-16 lg:py-20">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">
              Indicações e contraindicações
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#F8FAFB] rounded-xl p-6 border border-[#1C3D5A]/6">
                <h3 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Indicações
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "Insatisfação com a circunferência peniana",
                    "Curvatura peniana que dificulta a relação",
                    "Assimetrias que causam desconforto",
                    "Expectativas realistas e bem definidas",
                    "Avaliação psicológica favorável",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-6 border border-[#1C3D5A]/6">
                <h3 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Contraindicações
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "Infecções ativas na região genital",
                    "Distúrbios de coagulação não controlados",
                    "Expectativas irrealistas de resultado",
                    "Dismorfismo corporal não tratado",
                    "Doenças autoimunes em atividade",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção: Expectativas Realistas */}
      <section className="py-16 lg:py-20 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">
              Expectativas realistas
            </h2>
            <div className="bg-white rounded-xl p-6 border border-[#1C3D5A]/6 mb-6">
              <div className="flex items-start gap-3">
                <Stethoscope className="w-5 h-5 text-[#B87333] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[#334155] leading-relaxed mb-3">
                    A transparência sobre resultados é fundamental. Durante a consulta, o Dr. Felipe de Bulhões discute detalhadamente:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Resultados esperados com base na literatura científica",
                      "Limitações de cada procedimento",
                      "Tempo de recuperação e cuidados pós-procedimento",
                      "Possíveis complicações e como minimizá-las",
                      "Necessidade de sessões de manutenção (quando aplicável)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B87333] mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                <strong>Nota ética:</strong> Procedimentos estéticos genitais não garantem melhora na função sexual ou na satisfação do parceiro(a). A indicação é exclusivamente para queixas estéticas pessoais do paciente, após avaliação médica completa.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </CampaignLayout>
    </>
  );
}
