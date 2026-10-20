import { useEffect, useState } from "react";
import { readConsent } from "@/lib/consent";

/**
 * Google Tag Manager - carrega APENAS quando o usuário consentiu cookies de analytics/marketing.
 * Verifica o localStorage "cookie_consent" para determinar se deve carregar.
 * 
 * Fluxo:
 * 1. Usuário aceita cookies → localStorage "cookie_consent" é salvo com analytics: true
 * 2. Este componente detecta o consentimento e injeta o script do GTM
 * 3. Se o usuário rejeitar, o GTM nunca é carregado
 */
export default function GoogleTagManager() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const gtmId = import.meta.env.VITE_GTM_ID;

  useEffect(() => {
    if (!gtmId) return;

    const checkConsent = () => {
      const consent = readConsent();
      // Carrega GTM somente quando alguma categoria opcional foi autorizada.
      setShouldLoad(consent.analytics || consent.marketing);
    };

    // Verificar consentimento inicial
    checkConsent();

    // Escutar mudanças no localStorage (caso o usuário aceite cookies depois)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "lgpd_consent") {
        checkConsent();
      }
    };

    // Também escutar evento customizado para quando o consentimento é dado na mesma aba
    const handleConsentChange = () => {
      checkConsent();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cookie_consent_updated", handleConsentChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cookie_consent_updated", handleConsentChange);
    };
  }, [gtmId]);

  useEffect(() => {
    if (!shouldLoad || !gtmId) return;

    // Verificar se já foi injetado
    if (document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${gtmId}"]`)) return;

    // Injetar GTM script
    const script = document.createElement("script");
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `;
    document.head.appendChild(script);

    // Injetar noscript iframe no body
    const noscript = document.createElement("noscript");
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);

    // Registrar somente categorias efetivamente concedidas, sem dados pessoais.
    const consent = readConsent();
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "consent_granted",
      consent_analytics: consent.analytics,
      consent_marketing: consent.marketing,
    });
  }, [shouldLoad, gtmId]);

  return null;
}
