/**
 * Landing Page: Vasectomia Sem Bisturi
 * Campanha Google Ads — foco em conversão high ticket
 * Tom: médico, elegante, discreto, autoridade técnica
 */
import { motion } from "framer-motion";
import { CheckCircle2, Clock, ShieldCheck, Stethoscope, Heart, AlertCircle } from "lucide-react";
import CampaignLayout from "@/components/CampaignLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function VasectomiaSemBisturi() {
  return (
    <CampaignLayout
      title="Vasectomia Sem Bisturi"
      subtitle="Contracepção Definitiva Masculina"
      description="Procedimento minimamente invasivo, sem cortes e sem pontos. Recuperação rápida, segurança comprovada e realizado em ambiente ambulatorial com anestesia local."
      campaignSlug="vasectomia-sem-bisturi"
      metaTitle="Vasectomia Sem Bisturi em SP e Campinas | Dr. Felipe de Bulhões"
      metaDescription="Vasectomia sem bisturi com o Dr. Felipe de Bulhões. Procedimento ambulatorial, sem cortes, recuperação rápida. Atendimento em São Paulo e Campinas."
      medicalCondition="Vasectomia"
      trustBadges={["Formado Instituto D'Or", "Técnica No-Scalpel", "Atendimento Particular"]}
    >
      {/* Seção: Benefício Clínico */}
      <section className="py-16 lg:py-20">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">
              O que é a vasectomia sem bisturi?
            </h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A vasectomia sem bisturi (técnica <em>no-scalpel</em>) é o método contraceptivo definitivo masculino mais seguro e eficaz disponível. Diferente da técnica convencional, utiliza uma micropunção na pele escrotal — sem necessidade de incisão com bisturi, sem pontos e com mínimo desconforto.
            </p>
            <p className="text-[#334155] leading-relaxed mb-8">
              O procedimento é realizado em ambiente ambulatorial, com anestesia local, e dura aproximadamente 20 a 30 minutos. A taxa de sucesso é superior a 99,85% quando confirmada por espermograma de controle.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: Clock, title: "20-30 min", desc: "Procedimento ambulatorial" },
                { icon: ShieldCheck, title: ">99,85%", desc: "Taxa de eficácia" },
                { icon: Heart, title: "2-3 dias", desc: "Retorno às atividades" },
              ].map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
                  className="bg-[#F8FAFB] rounded-xl p-6 border border-[#1C3D5A]/6 text-center"
                >
                  <item.icon className="w-8 h-8 text-[#B87333] mx-auto mb-3" />
                  <p className="text-xl font-bold text-[#1C3D5A] dark:text-foreground">{item.title}</p>
                  <p className="text-sm text-[#64748B] mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção: Mitos Frequentes */}
      <section className="py-16 lg:py-20 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-8">
              Mitos e verdades
            </h2>
            <div className="space-y-5">
              {[
                {
                  myth: "Vasectomia reduz a testosterona",
                  truth: "A vasectomia não altera a produção hormonal. Os testículos continuam produzindo testosterona normalmente, pois o procedimento atua apenas nos ductos deferentes.",
                },
                {
                  myth: "Vasectomia diminui a libido ou a ereção",
                  truth: "Não há relação entre vasectomia e disfunção sexual. Estudos de longo prazo demonstram que a função erétil e o desejo sexual permanecem inalterados.",
                },
                {
                  myth: "O procedimento é muito doloroso",
                  truth: "A técnica sem bisturi utiliza anestesia local eficaz. A maioria dos pacientes relata desconforto mínimo durante e após o procedimento, comparável a uma leve pressão.",
                },
                {
                  myth: "A recuperação é longa e difícil",
                  truth: "A maioria dos pacientes retorna às atividades leves em 2-3 dias e às atividades físicas em 7-10 dias. Repouso relativo com gelo local é suficiente.",
                },
              ].map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
                  className="bg-white rounded-xl p-6 border border-[#1C3D5A]/6"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#1C3D5A] dark:text-foreground mb-1">Mito: "{item.myth}"</p>
                      <p className="text-sm text-[#334155] leading-relaxed">{item.truth}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção: Recuperação e Segurança */}
      <section className="py-16 lg:py-20">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">
              Recuperação e segurança
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-[#1C3D5A] dark:text-foreground mb-4">Pós-operatório</h3>
                <ul className="space-y-3">
                  {[
                    "Repouso relativo por 48-72 horas",
                    "Compressas de gelo nas primeiras 24h",
                    "Uso de suporte escrotal por 5-7 dias",
                    "Retorno ao trabalho em 2-3 dias (atividades leves)",
                    "Atividades físicas após 7-10 dias",
                    "Relações sexuais após 7 dias",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#B87333] mt-0.5 shrink-0" />
                      <span className="text-sm text-[#334155]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1C3D5A] dark:text-foreground mb-4">Confirmação de eficácia</h3>
                <p className="text-sm text-[#334155] leading-relaxed mb-4">
                  A vasectomia só é considerada eficaz após a confirmação por espermograma de controle, realizado aproximadamente 3 meses após o procedimento (ou após 20 ejaculações).
                </p>
                <p className="text-sm text-[#334155] leading-relaxed">
                  Até a confirmação laboratorial, é fundamental manter método contraceptivo alternativo.
                </p>
                <div className="mt-6 bg-[#F8FAFB] rounded-lg p-4 border border-[#1C3D5A]/6">
                  <div className="flex items-center gap-2 mb-2">
                    <Stethoscope className="w-4 h-4 text-[#B87333]" />
                    <span className="text-xs font-semibold text-[#1C3D5A] uppercase tracking-wider">Legislação</span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A vasectomia é permitida para homens com 21 anos ou mais, independentemente do número de filhos, sem necessidade de consentimento do cônjuge (Lei 14.443/2022).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção: Avaliação com Urologista */}
      <section className="py-16 lg:py-20 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">
              Avaliação individualizada
            </h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A consulta pré-operatória é fundamental para esclarecer dúvidas, avaliar indicações e discutir expectativas. O Dr. Felipe de Bulhões realiza uma avaliação completa, incluindo histórico clínico e exame físico, para garantir que o procedimento seja adequado ao seu caso.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Discussão detalhada sobre irreversibilidade",
                "Avaliação de histórico cirúrgico prévio",
                "Orientações pré e pós-operatórias",
                "Esclarecimento sobre criopreservação de sêmen",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-4 border border-[#1C3D5A]/6">
                  <CheckCircle2 className="w-4 h-4 text-[#B87333] shrink-0" />
                  <span className="text-sm text-[#334155]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção: Locais de atendimento */}
      <section className="py-16 lg:py-20">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">
              Onde realizar o procedimento
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-[#F8FAFB] rounded-xl p-6 border border-[#1C3D5A]/6">
                <h3 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-2">São Paulo</h3>
                <p className="text-sm text-[#64748B]">Clinovi — Av. Paulista, Moema, Pinheiros e SBC</p>
                <p className="text-xs text-[#B87333] mt-2">Consultas e procedimentos ambulatoriais</p>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-6 border border-[#1C3D5A]/6">
                <h3 className="font-semibold text-[#1C3D5A] dark:text-foreground mb-2">Campinas</h3>
                <p className="text-sm text-[#64748B]">Campinas Day Hospital — Cambuí</p>
                <p className="text-xs text-[#B87333] mt-2">Centro cirúrgico completo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </CampaignLayout>
  );
}
