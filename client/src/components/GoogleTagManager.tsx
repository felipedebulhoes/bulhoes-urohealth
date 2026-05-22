import { useEffect, useState } from "react";

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
      try {
        const consent = localStorage.getItem("lgpd_consent");
        if (consent) {
          const parsed = JSON.parse(consent);
          // Carrega GTM se analytics OU marketing estiver habilitado
          if (parsed.analytics || parsed.marketing) {
            setShouldLoad(true);
          }
        }
      } catch {
        // Se não conseguir parsear, não carrega
      }
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

    // Polling leve para capturar mudanças na mesma aba (fallback)
    const interval = setInterval(checkConsent, 2000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cookie_consent_updated", handleConsentChange);
      clearInterval(interval);
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

    // Enviar evento de consentimento ao dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "consent_granted",
      consent_analytics: true,
      consent_marketing: true,
    });
  }, [shouldLoad, gtmId]);

  return null;
}
