/**
 * Chamada discreta para o meio das páginas de procedimento.
 * Sem promessa de resultado (CFM 2.336/2023).
 */
import { MessageCircle } from "lucide-react";

interface InlineConsultCTAProps {
  title: string;
  href: string;
  onClick: () => void;
}

export default function InlineConsultCTA({ title, href, onClick }: InlineConsultCTAProps) {
  return (
    <div className="container max-w-4xl py-2">
      <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-[#2E2520]/10 bg-[#E7E1DA]/50 p-5 text-center dark:bg-card sm:flex-row sm:text-left">
        <p className="font-serif text-lg text-[#2E2520] dark:text-foreground">{title}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          className="schedule-cta schedule-cta--primary inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Falar no WhatsApp
        </a>
      </div>
    </div>
  );
}
