/*
 * Design: Clinical Precision — Swiss Medical Design
 * Page: Disfunção Erétil — Causas, Diagnóstico e Tratamentos
 * Referências: EAU Guidelines on Sexual and Reproductive Health 2025, AUA ED Guideline 2024, Campbell-Walsh-Wein 13th Ed.
 */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import EducationalLayout from "@/components/EducationalLayout";
import {
  Heart, Brain, Activity, Pill, Zap, Shield, AlertTriangle,
  Check, ChevronDown, ChevronUp, Stethoscope, Dumbbell,
  TrendingUp, Clock, Users, ArrowRight
} from "lucide-react";

const causes = [
  {
    category: "Vasculares (mais comuns)",
    color: "red",
    items: [
      { name: "Aterosclerose", detail: "Obstrução das artérias penianas — mesma doença que causa infarto e AVC. A DE pode ser o primeiro sinal de doença cardiovascular, precedendo eventos cardíacos em 3-5 anos." },
      { name: "Hipertensão arterial", detail: "Causa dano endotelial e reduz o fluxo sanguíneo peniano. Alguns anti-hipertensivos também podem piorar a DE." },
      { name: "Diabetes mellitus", detail: "Causa neuropatia e vasculopatia. 50-75% dos diabéticos desenvolvem DE ao longo da vida. É a causa orgânica mais comum." },
      { name: "Dislipidemia", detail: "Colesterol elevado acelera a aterosclerose das artérias penianas." },
    ],
  },
  {
    category: "Hormonais",
    color: "violet",
    items: [
      { name: "Hipogonadismo", detail: "Deficiência de testosterona reduz a libido e prejudica o mecanismo erétil. Presente em 10-20% dos homens com DE." },
      { name: "Hiperprolactinemia", detail: "Excesso de prolactina suprime o eixo gonadal e causa DE + diminuição da libido." },
      { name: "Doenças tireoidianas", detail: "Tanto hipo quanto hipertireoidismo podem causar DE." },
    ],
  },
  {
    category: "Neurológicas",
    color: "blue",
    items: [
      { name: "Neuropatia diabética", detail: "Lesão dos nervos que controlam a ereção." },
      { name: "Lesão medular / AVC", detail: "Interrupção das vias nervosas entre cérebro e pênis." },
      { name: "Cirurgias pélvicas", detail: "Prostatectomia radical, cirurgia retal — podem lesar os nervos cavernosos." },
      { name: "Esclerose múltipla / Parkinson", detail: "Doenças neurodegenerativas que afetam o controle erétil." },
    ],
  },
  {
    category: "Psicogênicas",
    color: "amber",
    items: [
      { name: "Ansiedade de desempenho", detail: "Causa mais comum em homens jovens. O medo de falhar gera um ciclo de ansiedade que perpetua a DE." },
      { name: "Depressão", detail: "Reduz libido e afeta neurotransmissores envolvidos na ereção. Antidepressivos (ISRS) também podem causar DE." },
      { name: "Estresse crônico", detail: "Cortisol elevado suprime testosterona e prejudica a função erétil." },
      { name: "Problemas de relacionamento", detail: "Conflitos conjugais, falta de intimidade e comunicação." },
    ],
  },
  {
    category: "Medicamentosas",
    color: "emerald",
    items: [
      { name: "Anti-hipertensivos", detail: "Beta-bloqueadores e diuréticos tiazídicos são os mais associados. Preferir IECA, BRA ou bloqueadores de canal de cálcio." },
      { name: "Antidepressivos (ISRS)", detail: "Fluoxetina, sertralina, paroxetina — causam DE em 30-70% dos usuários." },
      { name: "Finasterida / Dutasterida", detail: "Inibidores da 5-alfa-redutase usados para HPB e calvície — podem causar DE em 5-10%." },
      { name: "Opioides", detail: "Suprimem o eixo gonadal e reduzem testosterona." },
    ],
  },
];

interface Treatment {
  line: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  details: string;
  efficacy: string;
  considerations: string;
}

const treatments: Treatment[] = [
  {
    line: "1ª Linha",
    name: "Mudanças de Estilo de Vida",
    icon: <Dumbbell className="w-5 h-5" />,
    description: "Base de todo tratamento — deve ser associada a qualquer outra terapia.",
    details: "Perda de peso (5-10% melhora a DE em obesos), exercício aeróbico regular (150 min/sem), cessação do tabagismo, redução do álcool, controle de diabetes e hipertensão, melhora do sono, manejo do estresse. Dieta mediterrânea associada a menor risco de DE.",
    efficacy: "Melhora de 30-40% na função erétil em homens obesos que perdem peso. Exercício regular melhora DE em 40% dos casos.",
    considerations: "Deve ser mantida a longo prazo. Benefícios cardiovasculares adicionais. Pode ser suficiente em casos leves.",
  },
  {
    line: "1ª Linha",
    name: "Inibidores da PDE5 (Sildenafila, Tadalafila, etc.)",
    icon: <Pill className="w-5 h-5" />,
    description: "Medicamentos orais que facilitam a ereção ao aumentar o fluxo sanguíneo peniano.",
    details: "Sildenafila (Viagra®): 50-100mg, 1h antes, duração 4-6h. Tadalafila (Cialis®): 10-20mg sob demanda ou 5mg diário, duração até 36h. Vardenafila (Levitra®): 10-20mg, 30min antes, duração 4-6h. Avanafila (Stendra®): 100-200mg, 15min antes, duração 6h. Todos necessitam de estímulo sexual para funcionar — não causam ereção automática.",
    efficacy: "Eficácia de 60-80% na população geral. Menor em diabéticos (50-60%) e pós-prostatectomia (15-40%). Tadalafila diária: melhora também os sintomas urinários (LUTS/HPB).",
    considerations: "Contraindicados com nitratos (risco de hipotensão grave). Efeitos colaterais: cefaleia, rubor facial, congestão nasal, dispepsia. Tadalafila diária: opção para uso contínuo sem planejamento.",
  },
  {
    line: "1ª Linha",
    name: "Terapia Psicossexual",
    icon: <Brain className="w-5 h-5" />,
    description: "Fundamental quando há componente psicogênico — pode ser isolada ou combinada com medicação.",
    details: "Terapia cognitivo-comportamental (TCC) focada em ansiedade de desempenho, dessensibilização, técnicas de mindfulness e exercícios de foco sensorial (Masters & Johnson). Terapia de casal quando há fatores relacionais. Tratamento de depressão e ansiedade subjacentes.",
    efficacy: "Eficácia de 50-80% para DE psicogênica. Melhor resultado quando combinada com iPDE5. Essencial para quebrar o ciclo de ansiedade de desempenho.",
    considerations: "Requer profissional especializado (psicólogo/sexólogo). Pode ser combinada com qualquer outra linha de tratamento.",
  },
  {
    line: "2ª Linha",
    name: "Injeção Intracavernosa (Alprostadil / Trimix)",
    icon: <Zap className="w-5 h-5" />,
    description: "Injeção de medicamento vasodilatador diretamente no corpo cavernoso do pênis.",
    details: "Alprostadil (prostaglandina E1): 5-40mcg. Trimix (papaverina + fentolamina + alprostadil): combinação mais potente. O paciente aprende a se autoinjetar com agulha ultrafina (30G) na base lateral do pênis. Ereção em 5-15 minutos, duração 30-60 minutos.",
    efficacy: "Eficácia de 85-95% — a mais alta entre todos os tratamentos não cirúrgicos. Funciona mesmo quando iPDE5 falham.",
    considerations: "Risco de priapismo (ereção >4h — emergência). Dor local (10-20%). Fibrose peniana com uso prolongado. Necessita treinamento para autoinjeção. Dose deve ser titulada em consultório.",
  },
  {
    line: "2ª Linha",
    name: "Dispositivo de Vácuo (Vacuum)",
    icon: <Activity className="w-5 h-5" />,
    description: "Dispositivo mecânico que cria vácuo ao redor do pênis, atraindo sangue e produzindo ereção.",
    details: "Um cilindro é colocado sobre o pênis e uma bomba (manual ou elétrica) cria pressão negativa, atraindo sangue para os corpos cavernosos. Um anel constritor é colocado na base do pênis para manter a ereção por até 30 minutos.",
    efficacy: "Eficácia de 60-70% em produzir ereção suficiente para penetração. Satisfação do casal: 50-60%.",
    considerations: "Ereção pode parecer 'não natural' (pênis frio, pivotante na base). Anel não deve permanecer >30 minutos. Pode causar equimose. Sem contraindicações medicamentosas.",
  },
  {
    line: "2ª Linha",
    name: "Ondas de Choque de Baixa Intensidade (Li-ESWT)",
    icon: <TrendingUp className="w-5 h-5" />,
    description: "Terapia com ondas de choque que estimula a neovascularização (formação de novos vasos) no pênis.",
    details: "Sessões de 15-20 minutos, 1-2x/semana, por 6-12 sessões. Ondas de choque de baixa energia são aplicadas no corpo do pênis e crura. Mecanismo: estimula fatores de crescimento vascular (VEGF), promovendo angiogênese e regeneração do endotélio.",
    efficacy: "Evidência moderada. Melhora do IIEF em 2-4 pontos. Pode restaurar resposta a iPDE5 em pacientes que não respondiam. Melhor resultado em DE vasculogênica leve a moderada.",
    considerations: "Ainda considerada experimental por algumas guidelines. Resultados variáveis. Não invasiva e sem efeitos colaterais significativos. Custo elevado.",
  },
  {
    line: "3ª Linha",
    name: "Prótese Peniana",
    icon: <Shield className="w-5 h-5" />,
    description: "Implante cirúrgico de prótese nos corpos cavernosos — tratamento definitivo para DE refratária.",
    details: "Prótese inflável (3 peças): cilindros nos corpos cavernosos, reservatório no abdome e bomba no escroto. O paciente aciona a bomba para inflar os cilindros, produzindo ereção rígida. Desinflação é igualmente simples. Prótese maleável (semirrígida): mais simples, sem mecanismo hidráulico — o pênis é posicionado manualmente.",
    efficacy: "Satisfação >90% (pacientes e parceiras) — maior taxa de satisfação entre todos os tratamentos de DE. Taxa de revisão: 5-10% em 10 anos. Durabilidade: 15-20 anos (inflável moderna).",
    considerations: "Cirurgia irreversível — destrói o tecido erétil natural. Riscos: infecção (1-3%), erosão, falha mecânica. Indicada quando todas as outras opções falharam ou são inaceitáveis. Pode ser indicada como primeira linha em casos selecionados (pós-prostatectomia, Peyronie grave).",
  },
];

function CauseCategory({ cat, index }: { cat: typeof causes[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="bg-white dark:bg-card rounded-xl border border-[#1C3D5A]/6 overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full bg-${cat.color}-500`} />
          <h3 className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground">{cat.category}</h3>
          <span className="text-xs text-[#1C3D5A] dark:text-foreground/30">({cat.items.length})</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-[#1C3D5A] dark:text-foreground/30" /> : <ChevronDown className="w-4 h-4 text-[#1C3D5A] dark:text-foreground/30" />}
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-3 border-t border-[#1C3D5A]/5 pt-3">
          {cat.items.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-1.5 h-1.5 rounded-full bg-${cat.color}-400 mt-1.5 shrink-0`} />
              <div>
                <span className="text-xs font-semibold text-[#1C3D5A] dark:text-foreground">{item.name}: </span>
                <span className="text-xs text-[#1C3D5A] dark:text-foreground/55">{item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function DisfuncaoEretil() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <EducationalLayout
      title="Disfunção Erétil"
      subtitle="Causas, Diagnóstico e Tratamentos"
      description="Entenda a complexidade da disfunção erétil, suas múltiplas causas e as diversas opções de tratamento disponíveis em decisão compartilhada entre médico e paciente."
      accentColor="#DC2626"
    >
      {/* Intro */}
      <section className="py-12 lg:py-16 border-b border-[#1C3D5A]/6">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none prose-headings:text-[#1C3D5A] dark:text-foreground prose-p:text-[#1C3D5A] dark:text-foreground/65 prose-p:leading-relaxed prose-strong:text-[#1C3D5A] dark:text-foreground/80">
            <p>
              A <strong>disfunção erétil (DE)</strong> é definida como a incapacidade persistente de obter e/ou manter uma ereção suficiente para uma atividade sexual satisfatória. Afeta cerca de <strong>52% dos homens entre 40-70 anos</strong> em algum grau (Massachusetts Male Aging Study), com prevalência aumentando significativamente com a idade — de 5-10% aos 40 anos para 40-70% aos 70 anos.
            </p>
            <p>
              A DE é uma condição complexa e <strong>multifatorial</strong> — raramente tem uma causa única. Na maioria dos casos, há uma combinação de fatores vasculares, hormonais, neurológicos, psicológicos e medicamentosos. Mais importante: a DE pode ser o <strong>primeiro sinal de doença cardiovascular</strong>, precedendo eventos como infarto em 3-5 anos. Por isso, todo homem com DE deve ter uma avaliação cardiovascular completa.
            </p>
            <p>
              O tratamento é <strong>individualizado e escalonado</strong>, baseado na decisão compartilhada entre médico e paciente. Existem opções para todos os graus de gravidade, desde mudanças de estilo de vida até a prótese peniana, com excelentes taxas de sucesso.
            </p>
          </div>
        </div>
      </section>

      {/* Key stat */}
      <section className="py-10 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: "52%", label: "dos homens 40-70 anos afetados", source: "MMAS" },
              { number: "3-5 anos", label: "antes de evento cardiovascular", source: "EAU 2025" },
              { number: ">80%", label: "têm causa orgânica", source: "Campbell 13th" },
              { number: "95%", label: "respondem a algum tratamento", source: "AUA 2024" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center bg-white dark:bg-card rounded-xl p-4 border border-[#1C3D5A]/6"
              >
                <div className="text-2xl font-bold text-[#1C3D5A] dark:text-foreground mb-1">{s.number}</div>
                <p className="text-xs text-[#1C3D5A] dark:text-foreground/50">{s.label}</p>
                <p className="text-[9px] text-[#B87333] mt-1">{s.source}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Causes */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-3 text-center font-serif">Causas da Disfunção Erétil</h2>
          <p className="text-center text-sm text-[#1C3D5A] dark:text-foreground/50 mb-8 max-w-2xl mx-auto">
            A DE é multifatorial — a maioria dos pacientes tem mais de uma causa contribuindo. Identificar todas as causas é essencial para um tratamento eficaz.
          </p>
          <div className="space-y-3">
            {causes.map((cat, i) => (
              <CauseCategory key={i} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Diagnosis */}
      <section className="py-12 lg:py-16 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-8 text-center font-serif">Diagnóstico</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Anamnese detalhada", detail: "Questionário IIEF-5 (International Index of Erectile Function), história sexual, início e progressão dos sintomas, fatores de risco cardiovascular, medicamentos em uso, saúde mental, qualidade do relacionamento. Diferenciar DE de outros distúrbios (ejaculação precoce, diminuição da libido, anorgasmia)." },
              { step: "2", title: "Exame físico", detail: "Avaliação cardiovascular (PA, pulsos periféricos), exame genital (tamanho testicular, placas de Peyronie, fimose), toque retal (próstata), sinais de hipogonadismo (ginecomastia, distribuição de gordura, pelos)." },
              { step: "3", title: "Exames laboratoriais", detail: "Glicemia de jejum / HbA1c, perfil lipídico, testosterona total (manhã), PSA (>40 anos), hemograma, função renal e hepática. Se testosterona baixa: LH, FSH, prolactina, SHBG." },
              { step: "4", title: "Exames especializados (se indicados)", detail: "Ultrassom peniano com Doppler (avalia fluxo arterial e drenagem venosa), tumescência peniana noturna (diferencia orgânica de psicogênica), avaliação psicológica/psiquiátrica, avaliação cardiológica (teste ergométrico, ecocardiograma)." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-white dark:bg-card rounded-xl p-5 border border-[#1C3D5A]/6"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-red-700">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-[#1C3D5A] dark:text-foreground/55 leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cardiovascular warning */}
      <section className="py-10">
        <div className="container max-w-3xl">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
            <h3 className="text-base font-semibold text-red-700 mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5" /> DE como Marcador Cardiovascular
            </h3>
            <p className="text-sm text-red-800/70 leading-relaxed">
              A disfunção erétil e a doença cardiovascular compartilham os mesmos fatores de risco e o mesmo mecanismo — a disfunção endotelial. As artérias penianas (1-2mm) são menores que as coronárias (3-4mm), por isso são afetadas primeiro. <strong>Todo homem com DE, especialmente sem causa psicogênica óbvia, deve ser avaliado para risco cardiovascular.</strong> A DE é considerada um equivalente de doença cardiovascular pela Princeton Consensus Conference.
            </p>
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-12 lg:py-16 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground mb-3 text-center font-serif">
            Opções de Tratamento
          </h2>
          <p className="text-center text-sm text-[#1C3D5A] dark:text-foreground/50 mb-10 max-w-2xl mx-auto">
            O tratamento é escalonado e individualizado, baseado na decisão compartilhada entre médico e paciente. A escolha considera a causa, gravidade, preferências do paciente e do casal.
          </p>
          <div className="space-y-5">
            {treatments.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-card rounded-xl border border-[#1C3D5A]/6 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                      t.line === "1ª Linha" ? "bg-amber-100 text-amber-700" :
                      t.line === "2ª Linha" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {t.line}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#F8FAFB] flex items-center justify-center text-[#1C3D5A] dark:text-foreground/50">
                      {t.icon}
                    </div>
                    <h3 className="text-base font-semibold text-[#1C3D5A] dark:text-foreground">{t.name}</h3>
                  </div>
                  <p className="text-sm text-[#1C3D5A] dark:text-foreground/50 mb-3">{t.description}</p>
                  <p className="text-xs text-[#1C3D5A] dark:text-foreground/55 leading-relaxed mb-4">{t.details}</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-amber-50/50 rounded-lg p-3">
                      <h4 className="text-[10px] uppercase tracking-wider font-semibold text-amber-700 mb-1">Eficácia</h4>
                      <p className="text-xs text-amber-800/70">{t.efficacy}</p>
                    </div>
                    <div className="bg-blue-50/50 rounded-lg p-3">
                      <h4 className="text-[10px] uppercase tracking-wider font-semibold text-blue-700 mb-1">Considerações</h4>
                      <p className="text-xs text-blue-800/70">{t.considerations}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shared decision */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          <div className="bg-[#1C3D5A] rounded-xl p-6 lg:p-8 text-white">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#B87333]" />
              Decisão Compartilhada
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              O tratamento da disfunção erétil é uma <strong className="text-white">decisão conjunta entre médico e paciente</strong>. Não existe um tratamento único que seja o melhor para todos. A escolha leva em conta:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Causa e gravidade da DE",
                "Expectativas do paciente e da parceira",
                "Comorbidades e medicamentos em uso",
                "Custo e disponibilidade do tratamento",
                "Preferência por tratamento sob demanda vs. contínuo",
                "Desejo de fertilidade",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 shrink-0 text-[#B87333]" />
                  <span className="text-xs text-white/60">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-white/70 leading-relaxed mt-4">
              Agende uma consulta para uma avaliação completa e individualizada. Com o tratamento adequado, <strong className="text-white">mais de 95% dos homens com DE podem ter uma vida sexual satisfatória</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-8 bg-[#F8FAFB]">
        <div className="container max-w-4xl">
          <h3 className="text-xs font-semibold text-[#1C3D5A] dark:text-foreground/40 uppercase tracking-wider mb-3">Referências</h3>
          <ol className="text-[10px] text-[#1C3D5A] dark:text-foreground/35 space-y-1 list-decimal list-inside">
            <li>Salonia A, et al. EAU Guidelines on Sexual and Reproductive Health. European Association of Urology, 2025.</li>
            <li>Burnett AL, et al. AUA Guideline: Erectile Dysfunction. American Urological Association, 2024.</li>
            <li>Partin AW, et al. Campbell-Walsh-Wein Urology, 13th Edition. Elsevier, 2024. Chapters 62-68.</li>
            <li>Feldman HA, et al. Impotence and its medical and psychosocial correlates: results of the MMAS. J Urol. 1994;151(1):54-61.</li>
            <li>Nehra A, et al. The Princeton III Consensus recommendations for the management of ED and cardiovascular disease. Mayo Clin Proc. 2012;87(8):766-78.</li>
            <li>Montorsi F, et al. Erectile dysfunction prevalence, time of onset and association with risk factors in 300 consecutive patients with acute chest pain. Eur Urol. 2003;44(3):360-5.</li>
            <li>Hatzimouratidis K, et al. Pharmacotherapy for erectile dysfunction: recommendations from the Fourth International Consultation for Sexual Medicine. J Sex Med. 2016;13(4):465-88.</li>
            <li>Mulhall JP, et al. Penile rehabilitation following radical prostatectomy. J Sex Med. 2013;10(1):34-42.</li>
          </ol>
        </div>
      </section>
    </EducationalLayout>
  );
}
