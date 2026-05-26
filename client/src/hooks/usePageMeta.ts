import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description: string;
  canonical?: string;
}

/**
 * Hook reutilizável para definir meta tags de SEO por página.
 * Define document.title e meta description, e restaura ao desmontar.
 */
export function usePageMeta({ title, description, canonical }: PageMetaOptions) {
  useEffect(() => {
    const fullTitle = `${title} | Dr. Felipe de Bulhões`;
    document.title = fullTitle;

    let metaTag = document.querySelector('meta[name="description"]');
    if (metaTag) {
      metaTag.setAttribute("content", description);
    } else {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "description");
      metaTag.setAttribute("content", description);
      document.head.appendChild(metaTag);
    }

    // Open Graph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", fullTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (link) {
        link.href = canonical;
      }
    }

    return () => {
      document.title = "Dr. Felipe de Bulhões | Urologista em São Paulo e Campinas";
      if (metaTag) {
        metaTag.setAttribute("content", "Dr. Felipe de Bulhões — Urologista em São Paulo e Campinas. Cirurgia robótica, endourologia e saúde do homem. Agende sua consulta.");
      }
    };
  }, [title, description, canonical]);
}
