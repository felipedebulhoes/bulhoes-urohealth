/*
 * Design: Clinical Precision — Swiss Medical Design
 * Página: Exame de Próstata — Tudo o que Você Precisa Saber
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

export default function ExameProstata() {
  return (
    <EducationalLayout
      title="Exame de Próstata: Tudo o que Você Precisa Saber"
      subtitle="Guia Completo"
      description="Entenda como funciona o exame de próstata, quando é indicado, como se preparar e por que ele é fundamental para a saúde masculina. Informações baseadas nas diretrizes da EAU, AUA e SBU."
      accentColor="#B87333"
      metaTitle="Exame de Próstata: Como Funciona, Preparo e Quando Fazer | Dr. Felipe de Bulhões"
      metaDescription="Guia completo sobre o exame de próstata (toque retal e PSA): como funciona, preparo, quando fazer, mitos e verdades. Urologista em São Paulo e Campinas."
    >
      {/* Introdução */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="bg-gradient-to-r from-amber-50 to-blue-50 border-l-4 border-[#B87333] p-6 rounded-r-lg mb-10">
              <p className="text-[#1C3D5A] dark:text-foreground leading-relaxed">
                O exame de próstata é um dos procedimentos mais importantes para a saúde do homem, mas também um dos mais cercados de mitos e tabus. Segundo a <strong>Sociedade Brasileira de Urologia (SBU)</strong>, o rastreamento deve começar aos <strong>50 anos</strong> para a população geral e aos <strong>45 anos</strong> para homens com fatores de risco (histórico familiar, raça negra). A <strong>European Association of Urology (EAU 2025)</strong> recomenda uma abordagem baseada em risco, iniciando com PSA basal a partir dos 50 anos.
              </p>
            </div>
          </motion.div>

          {/* O que é */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">O que é o Exame de Próstata?</h2>
            <p className="text-[#334155] leading-relaxed mb-4">
              O "exame de próstata" na verdade engloba dois procedimentos complementares que, juntos, oferecem a melhor avaliação da saúde prostática:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#B87333]/10 rounded-lg flex items-center justify-center mb-4">
                  <Stethoscope className="w-6 h-6 text-[#B87333]" />
                </div>
                <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-3">Toque Retal (TR)</h3>
                <p className="text-[#334155] text-sm leading-relaxed mb-3">
                  Exame físico em que o urologista palpa a próstata através do reto para avaliar seu tamanho, consistência e presença de nódulos. Dura apenas <strong>10 a 15 segundos</strong>.
                </p>
                <ul className="space-y-2">
                  {["Avalia tamanho e consistência", "Detecta nódulos e assimetrias", "Complementa o PSA", "Indolor na maioria dos casos"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <CheckCircle2 className="w-4 h-4 text-[#B87333] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#B87333]/10 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-[#B87333]" />
                </div>
                <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-3">PSA (Antígeno Prostático Específico)</h3>
                <p className="text-[#334155] text-sm leading-relaxed mb-3">
                  Exame de sangue que mede os níveis de PSA, uma proteína produzida pela próstata. Valores elevados podem indicar diversas condições prostáticas.
                </p>
                <ul className="space-y-2">
                  {["Exame de sangue simples", "Valores normais: até 4,0 ng/mL*", "Avalia risco de câncer", "Monitora tratamentos"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                      <CheckCircle2 className="w-4 h-4 text-[#B87333] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[#64748B] mt-3 italic">
                  *Valores de referência variam com a idade. A interpretação deve ser individualizada pelo urologista.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quando fazer */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Quando Fazer o Exame?</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              As recomendações variam entre as sociedades médicas, mas convergem na importância do rastreamento individualizado:
            </p>
            <div className="space-y-4">
              {[
                {
                  org: "SBU (Sociedade Brasileira de Urologia)",
                  rec: "A partir dos 50 anos para todos os homens. A partir dos 45 anos para homens com fatores de risco (histórico familiar de 1º grau, raça negra).",
                  ref: "Nota Oficial SBU 2023",
                },
                {
                  org: "EAU (European Association of Urology)",
                  rec: "Abordagem baseada em risco com PSA basal a partir dos 50 anos (ou 45 anos com fatores de risco). Intervalo de rastreamento adaptado ao nível de PSA basal.",
                  ref: "EAU Guidelines on Prostate Cancer 2025",
                },
                {
                  org: "AUA (American Urological Association)",
                  rec: "Decisão compartilhada entre médico e paciente a partir dos 55-69 anos. Para homens com maior risco, discussão pode iniciar aos 40-54 anos.",
                  ref: "AUA/ASTRO/SUO Guideline 2024",
                },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-card rounded-xl p-6 border border-gray-100">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#B87333] mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-1">{item.org}</h4>
                      <p className="text-[#334155] text-sm leading-relaxed">{item.rec}</p>
                      <p className="text-xs text-[#64748B] mt-2 italic">Fonte: {item.ref}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Fatores de risco */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Fatores de Risco para Câncer de Próstata</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Idade", desc: "O risco aumenta significativamente após os 50 anos. Cerca de 60% dos casos são diagnosticados em homens acima de 65 anos.", icon: Clock },
                { title: "Histórico Familiar", desc: "Homens com pai ou irmão diagnosticados têm risco 2 a 3 vezes maior. Mutações nos genes BRCA1/BRCA2 também aumentam o risco.", icon: HeartPulse },
                { title: "Raça/Etnia", desc: "Homens negros têm incidência 1,7 vezes maior e mortalidade 2,1 vezes maior em comparação com homens brancos (INCA 2025).", icon: AlertTriangle },
                { title: "Estilo de Vida", desc: "Obesidade, sedentarismo e dieta rica em gorduras saturadas estão associados a maior risco de doença agressiva.", icon: Activity },
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-card border border-gray-100 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-red-500" />
                    </div>
                    <h4 className="font-bold text-[#1C3D5A] dark:text-foreground">{item.title}</h4>
                  </div>
                  <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Como é feito */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Como É Feito o Exame?</h2>

            <h3 className="text-xl font-bold text-[#1C3D5A] dark:text-foreground mb-4">Toque Retal — Passo a Passo</h3>
            <div className="space-y-4 mb-8">
              {[
                { step: "1", title: "Posicionamento", desc: "O paciente deita de lado com os joelhos flexionados (posição mais confortável) ou fica em pé inclinado sobre a maca." },
                { step: "2", title: "Lubrificação", desc: "O médico utiliza lubrificante e luvas descartáveis para garantir conforto e higiene." },
                { step: "3", title: "Palpação", desc: "Com o dedo indicador, o urologista palpa a próstata avaliando tamanho, consistência, limites e presença de nódulos." },
                { step: "4", title: "Duração", desc: "O exame dura apenas 10 a 15 segundos. Pode causar leve desconforto, mas não é doloroso na grande maioria dos casos." },
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

            <h3 className="text-xl font-bold text-[#1C3D5A] dark:text-foreground mb-4">PSA — Coleta e Interpretação</h3>
            <div className="bg-gray-50 dark:bg-card rounded-xl p-6 border border-gray-100">
              <p className="text-[#334155] leading-relaxed mb-4">
                O PSA é coletado por meio de uma simples amostra de sangue. Alguns cuidados antes da coleta:
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  "Evitar relações sexuais nas 48 horas anteriores",
                  "Não andar de bicicleta nas 48 horas anteriores",
                  "Informar ao médico sobre uso de medicamentos (finasterida, dutasterida)",
                  "O toque retal pode ser feito antes da coleta sem alterar significativamente o resultado",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                    <ChevronRight className="w-4 h-4 text-[#B87333] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Importante:</strong> O PSA elevado NÃO significa necessariamente câncer. Diversas condições benignas podem elevar o PSA, como hiperplasia prostática benigna (HPB), prostatite e infecção urinária. A interpretação deve ser feita pelo urologista considerando o contexto clínico completo.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mitos e Verdades */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={5} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Mitos e Verdades</h2>
            <div className="space-y-4">
              {[
                { myth: "O toque retal é muito doloroso", truth: "O exame dura 10-15 segundos e causa apenas leve desconforto. A grande maioria dos pacientes relata que o procedimento é muito mais simples do que imaginavam.", isMyth: true },
                { myth: "O PSA sozinho é suficiente para diagnosticar câncer", truth: "O PSA é um marcador de triagem, não de diagnóstico. Valores elevados indicam necessidade de investigação adicional, mas não confirmam câncer. O diagnóstico definitivo requer biópsia.", isMyth: true },
                { myth: "Homens jovens não precisam se preocupar com a próstata", truth: "Embora o câncer seja mais comum após os 50, condições como prostatite e dor pélvica podem afetar homens de qualquer idade. Além disso, o rastreamento precoce em grupos de risco é fundamental.", isMyth: true },
                { myth: "O toque retal pode ser substituído apenas pelo PSA", truth: "Ambos os exames são complementares. Cerca de 15-25% dos cânceres de próstata ocorrem com PSA normal (EAU 2025). O toque retal pode detectar tumores que o PSA não identifica.", isMyth: true },
                { myth: "O diagnóstico precoce salva vidas", truth: "Quando detectado em estágio inicial, o câncer de próstata tem taxa de sobrevida em 5 anos superior a 99% (AUA 2024). O rastreamento adequado é a chave para o diagnóstico precoce.", isMyth: false },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl p-5 border ${item.isMyth ? "bg-red-50/50 border-red-100" : "bg-green-50/50 border-green-100"}`}>
                  <div className="flex items-start gap-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${item.isMyth ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                      {item.isMyth ? "MITO" : "VERDADE"}
                    </span>
                    <div>
                      <p className="font-semibold text-[#1C3D5A] dark:text-foreground mb-1">"{item.myth}"</p>
                      <p className="text-sm text-[#334155] leading-relaxed">{item.truth}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Exames complementares */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={6} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Exames Complementares</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              Quando os exames iniciais (PSA e toque retal) indicam necessidade de investigação adicional, o urologista pode solicitar:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Ressonância Multiparamétrica (mpMRI)", desc: "Exame de imagem que avalia a próstata em detalhes, classificando lesões pelo sistema PI-RADS (1 a 5). Fundamental antes da biópsia para guiar a coleta de fragmentos.", ref: "EAU Guidelines 2025" },
                { title: "Biópsia de Próstata", desc: "Coleta de fragmentos da próstata para análise histológica. Pode ser feita por via transretal ou transperineal (preferida atualmente por menor risco de infecção).", ref: "AUA/EAU Guidelines" },
                { title: "PHI (Prostate Health Index)", desc: "Exame de sangue que combina PSA total, PSA livre e p2PSA para melhor estratificação de risco, reduzindo biópsias desnecessárias.", ref: "NCCN Guidelines 2024" },
                { title: "Ultrassonografia Prostática", desc: "Avalia o tamanho da próstata e pode auxiliar no diagnóstico de HPB. Geralmente realizada por via transretal ou suprapúbica.", ref: "Campbell-Walsh-Wein 13th Ed." },
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-card border border-gray-100 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="w-5 h-5 text-[#B87333]" />
                    <h4 className="font-bold text-[#1C3D5A] dark:text-foreground">{item.title}</h4>
                  </div>
                  <p className="text-sm text-[#334155] leading-relaxed mb-2">{item.desc}</p>
                  <p className="text-xs text-[#64748B] italic">Fonte: {item.ref}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Referências */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={7}>
            <div className="bg-gray-50 dark:bg-card rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-4">Referências</h3>
              <ol className="space-y-2 text-sm text-[#64748B]">
                <li>1. EAU Guidelines on Prostate Cancer, 2025. European Association of Urology.</li>
                <li>2. AUA/ASTRO/SUO Guideline on Clinically Localized Prostate Cancer, 2024. American Urological Association.</li>
                <li>3. Nota Oficial SBU — Rastreamento do Câncer de Próstata, 2023. Sociedade Brasileira de Urologia.</li>
                <li>4. Campbell-Walsh-Wein Urology, 13th Edition. Elsevier, 2024.</li>
                <li>5. INCA — Estimativa de Câncer no Brasil, 2025. Instituto Nacional de Câncer.</li>
                <li>6. NCCN Clinical Practice Guidelines in Oncology — Prostate Cancer Early Detection, Version 1.2024.</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </section>
    </EducationalLayout>
  );
}
