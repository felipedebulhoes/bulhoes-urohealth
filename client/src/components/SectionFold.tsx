/**
 * Recolhe seções longas sem retirar o conteúdo do HTML.
 * O texto continua disponível para buscadores e para quem abrir a seção.
 */
import { ChevronDown } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface SectionFoldProps {
  title: string;
  children: ReactNode;
  variant?: "peek" | "row";
  label?: string;
  inset?: boolean;
}

/** Abre a seção recolhida que contém o elemento e rola até ele. */
export function openFoldAndScroll(id: string, behavior: ScrollBehavior) {
  window.dispatchEvent(new CustomEvent("section-fold:open", { detail: id }));
  window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior }), 60);
}

export default function SectionFold({ title, children, variant = "row", label = "Continuar lendo", inset = false }: SectionFoldProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (rootRef.current?.querySelector(`[id="${id}"]`)) setOpen(true);
    };
    const onHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? rootRef.current?.querySelector(`[id="${id}"]`) : null;
      if (!target) return;
      setOpen(true);
      window.setTimeout(() => target.scrollIntoView(), 60);
    };
    onHash();
    window.addEventListener("section-fold:open", onOpen);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("section-fold:open", onOpen);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  if (variant === "row") {
    return (
      <div ref={rootRef} className="border-b border-[#2E2520]/12 dark:border-border">
        <div className={inset ? "" : "container max-w-4xl"}>
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex min-h-20 w-full items-center justify-between gap-6 py-6 text-left"
          >
            <span className="font-serif text-xl leading-snug text-[#2E2520] dark:text-foreground lg:text-2xl">{title}</span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-[#4A3A30] transition-transform duration-200 dark:text-foreground/70 ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>
        <div className={open ? "" : "hidden"}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <div className={open ? "" : "max-h-[620px] overflow-hidden"}>{children}</div>
      {!open && (
        <div className="absolute inset-x-0 bottom-0 flex h-44 items-end justify-center bg-gradient-to-t from-[#F7F5F2] via-[#F7F5F2]/90 to-transparent pb-6 dark:from-background dark:via-background/90">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#2E2520]/25 bg-[#F7F5F2] px-6 text-sm font-medium text-[#2E2520] dark:bg-card dark:text-foreground"
          >
            {label}
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
