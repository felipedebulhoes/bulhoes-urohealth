import { useEffect, useState } from "react";
import { Check, Loader2, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { trackPrototypeEvent } from "@/lib/analytics";

export type PopularFaqQuestionId = "faq_duration" | "faq_risks" | "faq_candidate";

export default function PrototypeFaqHelpfulButton({ questionId, questionTitle }: { questionId: PopularFaqQuestionId; questionTitle: string }) {
  const storageKey = `prototype-helpful-${questionId}`;
  const [voted, setVoted] = useState(false);
  const [confirmedCount, setConfirmedCount] = useState<number>();
  const countsQuery = trpc.prototypeFeedback.listHelpfulCounts.useQuery(undefined, { staleTime: 60_000 });
  const helpfulMutation = trpc.prototypeFeedback.markHelpful.useMutation({
    onSuccess: (result) => {
      setVoted(true);
      setConfirmedCount(result.helpfulCount);
      window.localStorage.setItem(storageKey, "1");
      trackPrototypeEvent("faq_helpful", "girth_popular_faq", questionId);
      toast.success("Obrigado pelo feedback", { description: "Seu voto foi contabilizado sem registrar dados clínicos." });
    },
    onError: () => toast.error("Não foi possível registrar agora. Tente novamente."),
  });

  useEffect(() => {
    setVoted(window.localStorage.getItem(storageKey) === "1");
  }, [storageKey]);

  const count = confirmedCount ?? countsQuery.data?.[questionId] ?? 0;

  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#17364F]/10 pt-3">
      <span className="text-xs text-[#17364F]/60 dark:text-foreground/60" aria-live="polite">
        {count > 0 ? `${count} ${count === 1 ? "pessoa marcou" : "pessoas marcaram"} como útil` : "Se esta dúvida ajudou, conte para nós."}
      </span>
      <button
        type="button"
        disabled={voted || helpfulMutation.isPending}
        onClick={() => helpfulMutation.mutate({ questionId })}
        aria-label={voted ? `A pergunta “${questionTitle}” já foi marcada como útil neste navegador` : `Marcar a pergunta “${questionTitle}” como útil`}
        aria-pressed={voted}
        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#17364F]/15 bg-white px-3 py-2 text-xs font-bold text-[#17364F] transition hover:border-[#B87333]/55 hover:text-[#9D602A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-2 disabled:cursor-default disabled:border-emerald-200 disabled:bg-emerald-50 disabled:text-emerald-800 dark:bg-background dark:text-foreground"
      >
        {helpfulMutation.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : voted ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" />}
        {voted ? "Útil enviado" : "Útil"}
      </button>
    </div>
  );
}
