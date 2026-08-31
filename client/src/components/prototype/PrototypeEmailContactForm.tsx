import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { trackPrototypeEvent } from "@/lib/analytics";

type LocationPreference = "sao-paulo" | "campinas" | "teleconsulta" | "nao-definido";

export default function PrototypeEmailContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [preferredLocation, setPreferredLocation] = useState<LocationPreference>("nao-definido");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const mutation = trpc.ai.submitEmailContact.useMutation({
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      setSubmitted(true);
      trackPrototypeEvent("email_contact_submit", "girth_faq", "success");
      toast.success("Solicitação enviada com sucesso", {
        id: "prototype-email-contact-success",
        description: "A equipe responderá pelo e-mail informado.",
        duration: 5000,
      });
    },
    onError: () => toast.error("Não foi possível enviar agora. Tente novamente."),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!consent) {
      toast.error("Confirme o consentimento para solicitar o contato.");
      return;
    }
    mutation.mutate({ name, email, preferredLocation, consent: true });
  };

  if (submitted) {
    return (
      <div className="mt-12 rounded-3xl border border-emerald-200 bg-emerald-50 p-7 text-emerald-950" role="status" aria-live="polite">
        <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-2xl">Solicitação recebida</h3>
        <p className="mt-2 text-sm leading-6">A equipe responderá pelo e-mail informado. Não envie exames, fotos ou detalhes clínicos por resposta automática.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 rounded-3xl border border-[#17364F]/10 bg-[#F7FAFB] p-6 dark:bg-card sm:p-8" aria-labelledby="email-contact-title">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#17364F] text-white" aria-hidden="true"><Mail className="h-5 w-5" /></span>
        <div>
          <h3 id="email-contact-title" className="font-serif text-2xl text-[#17364F] dark:text-foreground">Prefere receber contato por e-mail?</h3>
          <p className="mt-2 text-sm leading-6 text-[#17364F]/70 dark:text-foreground/70">Informe apenas seus dados de contato. Sintomas, exames e detalhes íntimos ficam para a consulta confidencial.</p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[#17364F] dark:text-foreground">
          Nome
          <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required minLength={2} maxLength={120} className="min-h-12 rounded-lg border border-[#17364F]/20 bg-white px-4 font-normal outline-none transition focus:border-[#B87333] focus:ring-2 focus:ring-[#B87333]/25 dark:bg-background" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#17364F] dark:text-foreground">
          E-mail
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required maxLength={320} className="min-h-12 rounded-lg border border-[#17364F]/20 bg-white px-4 font-normal outline-none transition focus:border-[#B87333] focus:ring-2 focus:ring-[#B87333]/25 dark:bg-background" />
        </label>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-semibold text-[#17364F] dark:text-foreground">
        Preferência de atendimento
        <select value={preferredLocation} onChange={(event) => setPreferredLocation(event.target.value as LocationPreference)} className="min-h-12 rounded-lg border border-[#17364F]/20 bg-white px-4 font-normal outline-none transition focus:border-[#B87333] focus:ring-2 focus:ring-[#B87333]/25 dark:bg-background">
          <option value="nao-definido">Ainda não defini</option>
          <option value="sao-paulo">São Paulo</option>
          <option value="campinas">Campinas</option>
          <option value="teleconsulta">Teleconsulta</option>
        </select>
      </label>

      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-[#17364F]/10 bg-white p-4 text-sm leading-6 text-[#17364F]/75 dark:bg-background dark:text-foreground/75">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-1 h-4 w-4 accent-[#B87333]" />
        <span>Autorizo o uso do meu nome e e-mail para retorno sobre atendimento, conforme a <a href="/privacidade" className="font-semibold text-[#9D602A] underline underline-offset-2">Política de Privacidade</a>.</span>
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-[#17364F]/65 dark:text-foreground/65"><LockKeyhole className="h-4 w-4" aria-hidden="true" /> Seus dados não são usados para diagnóstico automático.</p>
        <button type="submit" disabled={mutation.isPending} aria-busy={mutation.isPending} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#B87333] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#9D602A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-4 disabled:cursor-wait disabled:opacity-70 motion-reduce:transform-none">
          {mutation.isPending ? <><Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> Enviando…</> : <><Mail className="h-4 w-4" aria-hidden="true" /> Solicitar contato por e-mail</>}
        </button>
      </div>
    </form>
  );
}
