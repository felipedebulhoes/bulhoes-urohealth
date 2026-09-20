import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description: string;
  canonical?: string;
}

function setMetaTag(attribute: "name" | "property", key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`;
  let tag = document.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

/**
 * Hook reutilizável para definir meta tags de SEO por página.
 * Define document.title e meta description, e restaura ao desmontar.
 */
export function usePageMeta({ title, description, canonical }: PageMetaOptions) {
  useEffect(() => {
    const fullTitle = `${title} | Dr. Felipe de Bulhões`;
    document.title = fullTitle;

    setMetaTag("name", "description", description);

    // Open Graph and Twitter mirrors keep browser-side navigation consistent
    // with the crawler-visible metadata emitted by the server.
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (link) {
        link.href = canonical;
      }
    }

    return () => {
      document.title = "Dr. Felipe de Bulhões | Urologista em São Paulo e Campinas";
    };
  }, [title, description, canonical]);
}
