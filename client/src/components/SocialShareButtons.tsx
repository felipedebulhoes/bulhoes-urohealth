import { useEffect, useRef, useState } from "react";
import { Check, Copy, Facebook, Linkedin, Loader2, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackSocialShare } from "@/lib/analytics";

interface SocialShareButtonsProps {
  title: string;
  text?: string;
  url?: string;
  source: string;
  className?: string;
  compact?: boolean;
  dark?: boolean;
}

type ShareMethod = "native" | "whatsapp" | "facebook" | "linkedin" | "copy";

export default function SocialShareButtons({
  title,
  text = "Conteúdo educativo do Dr. Felipe de Bulhões.",
  url,
  source,
  className,
  compact = false,
  dark = false,
}: SocialShareButtonsProps) {
  const [activeMethod, setActiveMethod] = useState<ShareMethod | null>(null);
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);
  const shareUrl = url || (typeof window !== "undefined" ? `${window.location.origin}${window.location.pathname}` : "https://felipebulhoes.com");

  useEffect(() => () => {
    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
  }, []);

  const beginFeedback = (method: ShareMethod) => {
    setActiveMethod(method);
    resetTimerRef.current = window.setTimeout(() => setActiveMethod(null), 1100);
  };

  const openShareWindow = (method: ShareMethod, destination: string) => {
    beginFeedback(method);
    trackSocialShare(method, source);
    window.open(destination, "_blank", "noopener,noreferrer,width=720,height=640");
  };

  const shareNative = async () => {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    beginFeedback("native");
    try {
      await navigator.share({ title, text, url: shareUrl });
      trackSocialShare("native", source);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      await copyLink();
    }
  };

  const copyLink = async () => {
    beginFeedback("copy");
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const input = document.createElement("textarea");
      input.value = shareUrl;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    trackSocialShare("copy", source);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const baseButton = cn(
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-3.5 text-sm font-medium",
    "motion-safe:transition-[color,background-color,border-color,transform,opacity] motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)]",
    "motion-safe:active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-2",
    dark
      ? "border-white/15 bg-white/5 text-white/80 hover:border-white/25 hover:bg-white/10 hover:text-white"
      : "border-[#1C3D5A]/10 bg-white text-[#1C3D5A] hover:border-[#B87333]/30 hover:bg-[#B87333]/5"
  );

  const label = compact ? "" : "Compartilhar";

  return (
    <section className={cn("flex flex-wrap items-center gap-2", className)} aria-label="Compartilhar esta página">
      <button type="button" onClick={() => void shareNative()} className={baseButton} aria-busy={activeMethod === "native"}>
        {activeMethod === "native" ? <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> : <Share2 className="h-4 w-4" />}
        {label || <span className="sr-only">Compartilhar</span>}
      </button>
      <button
        type="button"
        onClick={() => openShareWindow("whatsapp", `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${text}\n\n${shareUrl}`)}`)}
        className={cn(baseButton, dark ? "hover:text-[#8FE3AE]" : "hover:text-[#128C46]")}
        aria-busy={activeMethod === "whatsapp"}
      >
        {activeMethod === "whatsapp" ? <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> : <span className="font-bold" aria-hidden="true">W</span>}
        {!compact && "WhatsApp"}<span className="sr-only">Compartilhar no WhatsApp</span>
      </button>
      <button
        type="button"
        onClick={() => openShareWindow("facebook", `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)}
        className={cn(baseButton, dark ? "hover:text-[#9CB9F5]" : "hover:text-[#1877F2]")}
        aria-busy={activeMethod === "facebook"}
      >
        {activeMethod === "facebook" ? <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> : <Facebook className="h-4 w-4" />}
        {!compact && "Facebook"}<span className="sr-only">Compartilhar no Facebook</span>
      </button>
      <button
        type="button"
        onClick={() => openShareWindow("linkedin", `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`)}
        className={cn(baseButton, dark ? "hover:text-[#83B9EA]" : "hover:text-[#0A66C2]")}
        aria-busy={activeMethod === "linkedin"}
      >
        {activeMethod === "linkedin" ? <Loader2 className="h-4 w-4 motion-safe:animate-spin" /> : <Linkedin className="h-4 w-4" />}
        {!compact && "LinkedIn"}<span className="sr-only">Compartilhar no LinkedIn</span>
      </button>
      <button type="button" onClick={() => void copyLink()} className={baseButton} aria-busy={activeMethod === "copy"}>
        {activeMethod === "copy" ? (
          <Loader2 className="h-4 w-4 motion-safe:animate-spin" />
        ) : copied ? (
          <Check className="h-4 w-4 text-emerald-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        {!compact && (copied ? "Copiado" : "Copiar link")}
        <span className="sr-only">{copied ? "Link copiado" : "Copiar link"}</span>
      </button>
    </section>
  );
}
