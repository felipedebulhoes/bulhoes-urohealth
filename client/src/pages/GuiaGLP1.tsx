/*
 * Guia das Canetas Emagrecedoras (GLP-1) — Página pública educativa
 * Conteúdo baseado em evidência científica de alto nível (EAU, AUA, Andrology 2025, ENDO 2026)
 * Adaptado do pacote de migração para a identidade visual do site felipebulhoes.com
 */
import EducationalLayout from "@/components/EducationalLayout";
import { motion } from "framer-motion";
import {
  Scale,
  Activity,
  Baby,
  ShieldCheck,
  HeartPulse,
  AlertTriangle,
  CheckCircle2,
  Stethoscope,
  Syringe,
  ArrowRight,
  ArrowDown,
  BookOpen,
} from "lucide-react";

/* ─── Dados ─────────────────────────────────────────────────────────── */

const cadeia = [
  {
    icon: Scale,
    step: "1",
    title: "Você perde peso",
    desc: "As canetas (semaglutida e tirzepatida) reduzem o apetite e ajudam a emagrecer de forma consistente, diminuindo a gordura abdominal.",
  },
  {
    icon: Activity,
    step: "2",
    title: "Sua testosterona sobe",
    desc: "A gordura em excesso transforma testosterona em estrogênio. Ao emagrecer, esse processo diminui e os níveis do hormônio masculino tendem a subir naturalmente.",
  },
  {
    icon: Baby,
    step: "3",
    title: "Sua fertilidade melhora",
    desc: "Com mais testosterona e menos inflamação, a qualidade do esperma (forma e movimento) e a saúde sexual tendem a melhorar.",
  },
];

const evidencias = [
  {
    valor: "+1,39 ng/mL",
    label: "de aumento médio na testosterona total",
    fonte: "Meta-análise com 7 estudos e 680 homens (Andrology, 2025; PMID 40105090)",
  },
  {
    valor: "24 semanas",
    label: "de semaglutida melhoraram a forma dos espermatozoides",
    fonte: "Estudos apresentados na ENDO 2026 (Endocrine Society)",
  },
  {
    valor: "Melhor que TRT",
    label: "tratar o peso superou a reposição de testosterona isolada em homens com obesidade",
    fonte: "Ensaio de 16 semanas com liraglutida (ENDO 2026)",
  },
];

const efeitos = [
  "Enjoo, náusea ou desconforto no estômago (geralmente nas primeiras semanas)",
  "Prisão de ventre ou diarreia",
  "Sensação de saciedade precoce e menos fome",
  "Mais raramente: refluxo, dor de cabeça ou cansaço",
];

const seguranca = [
  "Início com dose baixa e aumento gradual para reduzir enjoos",
  "Acompanhamento médico periódico com exames de sangue",
  "Orientação alimentar para preservar massa muscular",
  "Avaliação individual de quem pode (e quem não deve) usar",
];

/* ─── Componente ─────────────────────────────────────────────────────── */

export default function GuiaGLP1() {
  return (
    <EducationalLayout
      title="Canetas Emagrecedoras: muito além do peso"
      subtitle="Guia do Paciente"
      description="Ozempic e Mounjaro viraram febre pelo emagrecimento. Mas para o homem existe um benefício pouco comentado: emagrecer pode elevar a testosterona e melhorar a fertilidade."
      metaTitle="Guia das Canetas GLP-1 (Ozempic, Mounjaro) | Dr. Felipe de Bulhões"
      metaDescription="Entenda como as canetas emagrecedoras (semaglutida e tirzepatida) podem elevar a testosterona e melhorar a fertilidade masculina. Guia baseado em evidência científica."
      medicalCondition="Obesidade masculina e hipogonadismo funcional"
      accentColor="#B87333"
    >
      {/* ── O QUE SÃO ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-4"
          >
            <div className="w-11 h-11 shrink-0 flex items-center justify-center rounded-md bg-[#B87333] text-white">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-white mb-4">
                O que são essas "canetas"?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                São medicamentos da classe dos <strong>análogos de GLP-1</strong>{" "}
                (e do GIP, no caso do Mounjaro). Eles imitam hormônios naturais do
                intestino que avisam ao cérebro que você está satisfeito. O
                resultado é menos fome, menos compulsão e perda de peso
                significativa. Os nomes mais conhecidos são{" "}
                <strong>semaglutida</strong> (Ozempic® e Wegovy®) e{" "}
                <strong>tirzepatida</strong> (Mounjaro®).
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── A CADEIA emagrecimento → testosterona → fertilidade ──────── */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-background border-y border-gray-100 dark:border-border">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-white mb-3">
              A conexão que poucos explicam
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Para o homem, emagrecer não é só estética. Existe uma reação em
              cadeia que impacta diretamente a saúde hormonal e reprodutiva.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-3">
            {cadeia.map((c, i) => (
              <div
                key={c.title}
                className="flex flex-col md:flex-row md:items-center md:flex-1 gap-6 md:gap-3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative bg-white dark:bg-card border border-gray-200 dark:border-border rounded-lg p-7 flex flex-col gap-4 md:flex-1 md:min-h-[260px] shadow-sm"
                >
                  <span className="absolute -top-3 left-7 bg-[#1C3D5A] text-white text-[11px] tracking-[0.2em] uppercase px-3 py-1 rounded-sm">
                    Passo {c.step}
                  </span>
                  <div className="w-12 h-12 mt-2 flex items-center justify-center rounded-md bg-[#B87333] text-white">
                    <c.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg text-[#1C3D5A] dark:text-white font-semibold">
                    {c.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {c.desc}
                  </p>
                </motion.div>
                {i < cadeia.length - 1 && (
                  <>
                    <ArrowRight className="hidden md:block w-7 h-7 text-[#B87333]/60 shrink-0" />
                    <ArrowDown className="md:hidden w-6 h-6 text-[#B87333]/60 mx-auto" />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── O QUE A CIÊNCIA MOSTRA ────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white dark:bg-card">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-[#B87333] text-xs tracking-[0.2em] uppercase mb-3">
              <BookOpen className="w-4 h-4" /> Baseado em evidência
            </span>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-white mb-3">
              O que a ciência mais recente mostra
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Estudos publicados em 2025 e apresentados em 2026 reforçam o
              benefício hormonal em homens com obesidade.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {evidencias.map((e, i) => (
              <motion.div
                key={e.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 dark:bg-background border border-gray-200 dark:border-border rounded-lg p-7 flex flex-col gap-3 text-center"
              >
                <span className="text-2xl lg:text-3xl text-[#B87333] font-semibold">
                  {e.valor}
                </span>
                <p className="text-sm text-[#1C3D5A] dark:text-white font-medium leading-snug">
                  {e.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-3 border-t border-gray-200 dark:border-border">
                  {e.fonte}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-8 max-w-3xl mx-auto leading-relaxed">
            Fontes: Salvio G. et al. <em>Effects of GLP-1 receptor agonists on
            testicular dysfunction: a systematic review and meta-analysis.</em>{" "}
            Andrology, 2025 (PMID: 40105090). Endocrine Society — comunicado
            ENDO 2026 (junho de 2026). A maior parte do benefício reprodutivo é{" "}
            <strong>indireta</strong>, decorrente da perda de peso e da melhora
            metabólica.
          </p>
        </div>
      </section>

      {/* ── AVISO IMPORTANTE: FERTILIDADE ──────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white dark:bg-card">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-[#B87333] rounded-r-lg p-7 flex items-start gap-4"
          >
            <AlertTriangle className="w-7 h-7 text-[#B87333] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg text-[#1C3D5A] dark:text-white mb-2 font-semibold">
                Está tentando ter um filho? Leia com atenção
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Embora emagrecer ajude a fertilidade, essas medicações{" "}
                <strong>não são liberadas durante a tentativa de gravidez do
                casal sem avaliação</strong>, e a segurança em homens que buscam
                concepção ainda está sendo estudada. Se o seu objetivo inclui
                fertilidade, o uso precisa ser planejado individualmente, com
                acompanhamento e, muitas vezes, com tempo de pausa antes de tentar.
                Nunca use por conta própria.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EFEITOS COLATERAIS + SEGURANÇA ─────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-background border-y border-gray-100 dark:border-border">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-lg p-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#1C3D5A]/10 dark:bg-[#1C3D5A]/30 text-[#1C3D5A] dark:text-white">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <h3 className="text-lg text-[#1C3D5A] dark:text-white font-semibold">
                  Efeitos colaterais comuns
                </h3>
              </div>
              <ul className="space-y-3">
                {efeitos.map((ef) => (
                  <li
                    key={ef}
                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B87333] shrink-0" />
                    {ef}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-lg p-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#B87333] text-white">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg text-[#1C3D5A] dark:text-white font-semibold">
                  Como usamos com segurança
                </h3>
              </div>
              <ul className="space-y-3">
                {seguranca.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B87333] shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── POR QUE COM UM UROLOGISTA ──────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white dark:bg-card">
        <div className="container max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center rounded-md bg-[#B87333] text-white">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-white mb-4">
              Por que tratar isso com um urologista?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Porque, para o homem, peso, hormônios, desempenho sexual e
              fertilidade fazem parte de uma mesma história. Como urologista com
              foco em andrologia, avalio o conjunto — não apenas a balança — e
              construo um plano que cuida da sua saúde masculina de forma completa,
              com base em evidência científica e acompanhamento próximo.
            </p>
          </motion.div>
        </div>
      </section>
    </EducationalLayout>
  );
}
