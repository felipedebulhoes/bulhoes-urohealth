/*
 * Design: Clinical Precision — Swiss Medical Design
 * Página: Urodinâmica — O Que É, Como Funciona e Quando É Indicada
 * Referências: EAU Guidelines 2025, AUA, SBU, Campbell-Walsh-Wein 13th Ed.
 */
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Gauge,
  Droplets,
  ShieldCheck,
  ChevronRight,
  Zap,
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

export default function Urodinamica() {
  return (
    <EducationalLayout
      title="Urodinâmica: O Que É, Como Funciona e Quando É Indicada"
      subtitle="Exame Especializado"
      description="Guia completo sobre o estudo urodinâmico: indicações, como é realizado, preparo, resultados e importância para o diagnóstico de disfunções do trato urinário inferior."
      accentColor="#6366F1"
      metaTitle="Urodinâmica: O Que É, Como Funciona e Quando Fazer | Dr. Felipe de Bulhões"
      metaDescription="Guia completo sobre urodinâmica: o que é, como funciona, indicações, preparo e resultados. Urologista especialista em urodinâmica em São Paulo e Campinas."
    >
      {/* Introdução */}
      <section className="py-16 bg-white dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-500 p-6 rounded-r-lg mb-10">
              <p className="text-[#1C3D5A] dark:text-foreground leading-relaxed">
                O <strong>estudo urodinâmico</strong> é o exame padrão-ouro para avaliar o funcionamento do trato urinário inferior — bexiga e uretra. Ele mede como a bexiga armazena e esvazia a urina, identificando com precisão a causa de sintomas como incontinência, jato fraco, urgência miccional e retenção urinária. Segundo a <strong>EAU Guidelines 2025</strong>, a urodinâmica é fundamental antes de procedimentos cirúrgicos para disfunções miccionais, garantindo o diagnóstico correto e o melhor planejamento terapêutico.
              </p>
            </div>
          </motion.div>

          {/* O que é */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">O que é a Urodinâmica?</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A urodinâmica é um conjunto de exames que avalia a função vesical (da bexiga) e uretral durante as fases de enchimento e esvaziamento. O estudo fornece informações objetivas que não podem ser obtidas apenas pela história clínica ou por exames de imagem.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Gauge, title: "Cistometria", desc: "Mede a pressão dentro da bexiga durante o enchimento, avaliando capacidade, complacência e presença de contrações involuntárias (hiperatividade detrusora)." },
                { icon: Droplets, title: "Fluxometria", desc: "Mede o fluxo urinário (velocidade e volume) durante a micção. É o exame mais simples e não invasivo da urodinâmica." },
                { icon: Zap, title: "Estudo Pressão-Fluxo", desc: "Avalia simultaneamente a pressão da bexiga e o fluxo urinário durante a micção, diferenciando obstrução de hipocontratilidade." },
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-card border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h3 className="font-bold text-[#1C3D5A] dark:text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Indicações */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Quando a Urodinâmica É Indicada?</h2>
            <p className="text-[#334155] leading-relaxed mb-6">
              A urodinâmica é indicada quando os sintomas urinários não são suficientes para definir o diagnóstico ou quando o tratamento inicial não obteve sucesso. As principais indicações incluem:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Antes de cirurgia para HPB", desc: "Fundamental para confirmar obstrução infravesical e descartar hipocontratilidade detrusora, especialmente em homens com sintomas atípicos ou próstatas pequenas (EAU 2025)." },
                { title: "Incontinência urinária", desc: "Diferencia incontinência de esforço, urgência e mista. Essencial antes de cirurgias como sling masculino ou esfíncter artificial." },
                { title: "Bexiga neurogênica", desc: "Pacientes com lesão medular, esclerose múltipla, Parkinson ou AVC. Avalia risco de dano renal por altas pressões vesicais." },
                { title: "Falha de tratamento prévio", desc: "Quando medicamentos para LUTS/HPB não funcionam ou quando há recidiva de sintomas após cirurgia prostática." },
                { title: "Sintomas complexos", desc: "Pacientes com sintomas mistos (armazenamento + esvaziamento), diabéticos com neuropatia ou idosos com múltiplas comorbidades." },
                { title: "Avaliação pré-transplante renal", desc: "Em pacientes com disfunção vesical conhecida que serão submetidos a transplante renal, para garantir que a bexiga receptora funcione adequadamente." },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-card rounded-xl p-5 border border-gray-100">
                  <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Como é feito */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Como É Realizado o Exame?</h2>
            <div className="space-y-4 mb-8">
              {[
                { step: "1", title: "Fluxometria Livre", desc: "O paciente urina normalmente em um aparelho que mede o fluxo. É a etapa mais simples e não invasiva. Deve-se chegar com a bexiga confortavelmente cheia." },
                { step: "2", title: "Cateterismo", desc: "Um cateter fino (6-8 Fr) é introduzido pela uretra até a bexiga, e outro cateter fino é posicionado no reto para medir a pressão abdominal. O procedimento causa leve desconforto." },
                { step: "3", title: "Fase de Enchimento (Cistometria)", desc: "A bexiga é preenchida lentamente com soro fisiológico enquanto as pressões são monitoradas. O paciente relata sensações como primeiro desejo, desejo forte e urgência." },
                { step: "4", title: "Fase de Esvaziamento (Pressão-Fluxo)", desc: "O paciente é solicitado a urinar com os cateteres posicionados. As pressões vesicais e o fluxo são registrados simultaneamente para avaliar a presença de obstrução." },
                { step: "5", title: "Análise e Laudo", desc: "O urologista analisa os traçados e emite o laudo com diagnóstico funcional: obstrução, hiperatividade, hipocontratilidade, incontinência de esforço, etc." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-indigo-500 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-1">Duração e Conforto</h4>
                  <p className="text-sm text-[#334155] leading-relaxed">
                    O exame completo dura entre <strong>30 a 45 minutos</strong>. Embora envolva cateterismo, a maioria dos pacientes tolera bem o procedimento. Não é necessária anestesia. Após o exame, pode haver leve ardência ao urinar nas primeiras 24 horas, que se resolve espontaneamente.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preparo */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Preparo para o Exame</h2>
            <div className="bg-white dark:bg-card border border-gray-100 rounded-xl p-6 shadow-sm">
              <ul className="space-y-3">
                {[
                  "Chegar com a bexiga confortavelmente cheia (não urinar nas 2 horas anteriores)",
                  "Não é necessário jejum",
                  "Informar ao médico sobre medicamentos em uso (especialmente anticolinérgicos e alfa-bloqueadores)",
                  "Trazer exames anteriores (ultrassonografia, PSA, urocultura)",
                  "Urocultura negativa recente (até 7 dias) — o exame não pode ser realizado com infecção urinária ativa",
                  "Não suspender medicamentos sem orientação médica",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#334155]">
                    <CheckCircle2 className="w-5 h-5 text-[#B87333] mt-0.5 shrink-0" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* O que a urodinâmica avalia */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={5} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">O que a Urodinâmica Pode Diagnosticar?</h2>
            <div className="space-y-4">
              {[
                { title: "Obstrução Infravesical (BOO)", desc: "Confirma se há obstrução ao fluxo urinário, como na HPB. Essencial para indicação cirúrgica correta.", color: "bg-red-50 border-red-100" },
                { title: "Hiperatividade Detrusora (DO)", desc: "Contrações involuntárias da bexiga durante o enchimento, causa comum de urgência e incontinência de urgência.", color: "bg-amber-50 border-amber-100" },
                { title: "Hipocontratilidade Detrusora (DU)", desc: "Bexiga com contração fraca, que pode mimetizar obstrução. Diferenciação crucial antes de cirurgia para HPB.", color: "bg-blue-50 border-blue-100" },
                { title: "Incontinência Urinária de Esforço (SUI)", desc: "Perda urinária associada a aumento de pressão abdominal (tosse, espirro). Confirmada pela demonstração de perda durante o enchimento.", color: "bg-purple-50 border-purple-100" },
                { title: "Baixa Complacência Vesical", desc: "Bexiga com pouca elasticidade, que gera altas pressões durante o enchimento. Risco de dano renal se não tratada.", color: "bg-green-50 border-green-100" },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl p-5 border ${item.color}`}>
                  <h4 className="font-bold text-[#1C3D5A] dark:text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Importância clínica */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={6} className="mb-14">
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground font-serif mb-6">Por que a Urodinâmica É Importante?</h2>
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
              <div className="space-y-4">
                {[
                  { icon: ShieldCheck, text: "Evita cirurgias desnecessárias — pacientes com hipocontratilidade podem não se beneficiar de cirurgia desobstrutiva" },
                  { icon: Activity, text: "Identifica a causa exata dos sintomas — diferencia obstrução de bexiga fraca, hiperatividade de incontinência de esforço" },
                  { icon: FileText, text: "Documenta objetivamente a disfunção — fornece dados numéricos para acompanhamento e comparação pós-tratamento" },
                  { icon: AlertTriangle, text: "Protege os rins — identifica pacientes com altas pressões vesicais que necessitam de tratamento urgente (bexiga neurogênica)" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-[#334155] leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Referências */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={7}>
            <div className="bg-gray-50 dark:bg-card rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-[#1C3D5A] dark:text-foreground mb-4">Referências</h3>
              <ol className="space-y-2 text-sm text-[#64748B]">
                <li>1. EAU Guidelines on Non-neurogenic Male LUTS, 2025. European Association of Urology.</li>
                <li>2. EAU Guidelines on Neuro-Urology, 2025. European Association of Urology.</li>
                <li>3. AUA/SUFU Guideline on Adult Urodynamics, 2024. American Urological Association.</li>
                <li>4. Campbell-Walsh-Wein Urology, 13th Edition — Chapter: Urodynamic and Video-Urodynamic Evaluation. Elsevier, 2024.</li>
                <li>5. Abrams P, et al. The standardisation of terminology in lower urinary tract function. Neurourol Urodyn. 2002;21(2):167-178.</li>
                <li>6. SBU — Diretrizes de Urodinâmica, 2023. Sociedade Brasileira de Urologia.</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </section>
    </EducationalLayout>
  );
}
