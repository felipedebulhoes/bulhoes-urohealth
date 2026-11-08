import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { readConsent } from "@/lib/consent";

interface ConsentMapFrameProps {
  src: string;
  title: string;
  className: string;
}

function hasCookieConsent() {
  const consent = readConsent();
  return consent.analytics || consent.marketing;
}

/** Só carrega o Google Maps depois do aceite de cookies ou de um clique do visitante. */
export default function ConsentMapFrame({ src, title, className }: ConsentMapFrameProps) {
  const [consented, setConsented] = useState(hasCookieConsent);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const syncConsent = () => setConsented(hasCookieConsent());
    window.addEventListener("cookie_consent_updated", syncConsent);
    return () => window.removeEventListener("cookie_consent_updated", syncConsent);
  }, []);

  if (consented || activated) {
    return (
      <iframe
        key={src}
        title={title}
        src={src}
        className={`block ${className}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className={`${className} flex flex-col items-center justify-center gap-3 bg-[#F8FAFB] p-6 text-center dark:bg-card`}>
      <div className="w-7 h-7 rounded-md bg-[#B87333]/15 flex items-center justify-center shrink-0">
        <MapPin className="w-3.5 h-3.5" style={{ color: "#AFC1D0" }} aria-hidden="true" />
      </div>
      <p className="max-w-sm text-sm leading-relaxed text-[#1C3D5A] dark:text-foreground">
        O mapa é carregado pelo Google, que recebe dados técnicos da sua visita ao exibi-lo.
      </p>
      <button
        type="button"
        onClick={() => setActivated(true)}
        className="min-h-11 rounded-lg border border-[#1C3D5A]/30 px-4 py-2 text-sm font-semibold text-[#1C3D5A] transition-colors hover:border-[#B87333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B87333] dark:border-white/35 dark:text-foreground"
      >
        Mostrar mapa
      </button>
    </div>
  );
}
