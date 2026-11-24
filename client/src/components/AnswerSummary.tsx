/**
 * Resumo de 2 ou 3 frases no topo das páginas de procedimento.
 * Responde de forma direta (o que é, para quem e onde) e vai no HTML
 * pré-renderizado, para buscadores e assistentes de IA citarem a página.
 */
interface AnswerSummaryProps {
  text: string;
  tone?: "dark" | "light";
  className?: string;
}

export default function AnswerSummary({ text, tone = "dark", className = "" }: AnswerSummaryProps) {
  const isDark = tone === "dark";
  return (
    <aside
      aria-label="Resumo da página"
      data-answer-summary
      className={`rounded-xl border px-4 py-3.5 max-w-2xl ${
        isDark ? "border-[#C9B6A3]/30 bg-[#2E2520]/55" : "border-[#C9B6A3]/40 bg-[#F8FAFB]"
      } ${className}`}
    >
      <p
        className={`text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${
          isDark ? "text-[#C9B6A3]" : "text-[#8B5A2B]"
        }`}
      >
        Em resumo
      </p>
      <p className={`text-sm sm:text-[15px] leading-relaxed ${isDark ? "text-white/85" : "text-gray-700"}`}>
        {text}
      </p>
    </aside>
  );
}
