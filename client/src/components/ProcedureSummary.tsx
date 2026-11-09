/**
 * Resumo sempre visível das páginas de procedimento.
 * Usa os textos já revisados de cada página; os limites aparecem por inteiro.
 */
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface ProcedureSummaryProps {
  indicationsTitle: string;
  indications: string[];
  limitsTitle: string;
  limits: string[];
  stepsTitle: string;
  steps: Array<{ title: string }>;
}

export default function ProcedureSummary({
  indicationsTitle,
  indications,
  limitsTitle,
  limits,
  stepsTitle,
  steps,
}: ProcedureSummaryProps) {
  return (
    <section className="py-14 lg:py-20" aria-label="Resumo do procedimento">
      <div className="container max-w-4xl space-y-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-5 font-serif text-2xl text-[#2E2520] dark:text-foreground">{indicationsTitle}</h2>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#334155] dark:text-foreground/80">
              {indications.slice(0, 4).map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#4A3A30] dark:text-foreground/70" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-5 font-serif text-2xl text-[#2E2520] dark:text-foreground">{limitsTitle}</h2>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#334155] dark:text-foreground/80">
              {limits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#4A3A30] dark:text-foreground/70" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2E2520]/12 pt-10 dark:border-border">
          <h2 className="mb-6 font-serif text-2xl text-[#2E2520] dark:text-foreground">{stepsTitle}</h2>
          <ol className="grid gap-4 sm:grid-cols-2">
            {steps.slice(0, 4).map((item, index) => (
              <li key={item.title} className="flex items-start gap-4">
                <span className="font-serif text-lg leading-6 text-[#8D7B6B]" aria-hidden="true">{index + 1}</span>
                <span className="text-[15px] leading-6 text-[#2E2520] dark:text-foreground">{item.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
