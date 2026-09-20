/**
 * CanonicalTag — Gerencia a tag <link rel="canonical"> dinamicamente.
 * 
 * Garante que todas as páginas apontem para https://felipebulhoes.com + rota atual,
 * independente do domínio de acesso (bulhoesurohealth.com, felipebulhoes.com.br, etc.).
 * 
 * Também remove tags canônicas duplicadas injetadas por outros scripts.
 */
import { useEffect } from "react";
import { useLocation } from "wouter";
import { isIndexableSitePath, normalizeSitePath } from "@shared/siteRoutes";

const CANONICAL_DOMAIN = "https://felipebulhoes.com";

export default function CanonicalTag() {
  const [location] = useLocation();

  useEffect(() => {
    const pathname = normalizeSitePath(window.location.pathname);
    const canonicalUrl = `${CANONICAL_DOMAIN}${pathname}`;
    const isIndexable = isIndexableSitePath(pathname);

    // Remove ALL existing canonical tags (including those injected by runtime)
    const existingCanonicals = document.querySelectorAll('link[rel="canonical"]');
    existingCanonicals.forEach((el) => el.remove());

    const robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
      ?? document.createElement("meta");
    robots.name = "robots";
    robots.content = isIndexable
      ? "index, follow"
      : "noindex, nofollow, noarchive, nosnippet";
    if (!robots.isConnected) document.head.appendChild(robots);

    if (!isIndexable) {
      document.querySelectorAll('meta[property="og:url"]').forEach((el) => el.remove());
      return;
    }

    // Create and insert the correct canonical tag
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = canonicalUrl;
    document.head.appendChild(link);

    // Also update og:url to match
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", canonicalUrl);
    }

    // Set up a MutationObserver to remove any duplicate canonical tags
    // that might be injected after our tag (e.g., by the Manus runtime)
    const observer = new MutationObserver((mutations) => {
      Array.from(mutations).forEach((mutation) => {
        Array.from(mutation.addedNodes).forEach((node) => {
          if (
            node instanceof HTMLLinkElement &&
            node.rel === "canonical" &&
            node.href !== canonicalUrl
          ) {
            node.remove();
          }
        });
      });
    });

    observer.observe(document.head, { childList: true });

    return () => {
      observer.disconnect();
    };
  }, [location]);

  return null;
}
