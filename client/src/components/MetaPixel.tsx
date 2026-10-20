import { useEffect } from "react";
import { hasMarketingConsent } from "@/lib/consent";

const PIXEL_ID = "1730608694762791";
const SCRIPT_ID = "meta-pixel-script";
const allowedHosts: Record<string, true> = {
  "felipebulhoes.com": true,
  "www.felipebulhoes.com": true,
  "felipebulhoes.com.br": true,
  "www.felipebulhoes.com.br": true,
  "bulhoesurohealth.com": true,
  "www.bulhoesurohealth.com": true,
  "drfelipebulhoesurologia.com.br": true,
  "www.drfelipebulhoesurologia.com.br": true,
};
const institutionalPaths: Record<string, true> = {
  "/": true,
  "/sobre": true,
  "/contato": true,
  "/agendamento": true,
  "/consultorios": true,
  "/privacidade": true,
};

type PixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  push?: PixelFunction;
  loaded?: boolean;
  version?: string;
};

function getPixelWindow() {
  return window as Window & { fbq?: PixelFunction; _fbq?: PixelFunction };
}

function isInstitutionalPage() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  return Boolean(allowedHosts[window.location.hostname] && institutionalPaths[pathname]);
}

function loadPixel() {
  if (!isInstitutionalPage()) return;
  const browser = getPixelWindow();

  if (!browser.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue?.push(args);
    } as PixelFunction;
    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    browser.fbq = fbq;
    browser._fbq = fbq;
    fbq("consent", "revoke");
    fbq("init", PIXEL_ID);

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  browser.fbq?.("consent", "grant");
  browser.fbq?.("track", "PageView");
}

export default function MetaPixel() {
  useEffect(() => {
    const sync = () => {
      if (hasMarketingConsent()) loadPixel();
      else getPixelWindow().fbq?.("consent", "revoke");
    };

    sync();
    window.addEventListener("cookie_consent_updated", sync);
    return () => window.removeEventListener("cookie_consent_updated", sync);
  }, []);

  return null;
}
