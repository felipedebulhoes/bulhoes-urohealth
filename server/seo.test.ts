import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  getCanonicalUrl,
  getRequestHostname,
  getSeoRedirectTarget,
  getSpaResponseStatus,
  injectCanonicalMetadata,
} from "./_core/seo";
import { isIndexableSitePath } from "../shared/siteRoutes";
import { getBreadcrumbItems, getPageMetadata, getSocialPreviewData } from "../shared/pageMetadata";

describe("SEO URL consolidation", () => {
  it("redirects the malformed /$ URL to the homepage", () => {
    expect(getSeoRedirectTarget("felipebulhoes.com", "/$")).toBe("/");
  });

  it("redirects the obsolete SearchAction placeholder to the clean blog URL", () => {
    expect(
      getSeoRedirectTarget(
        "felipebulhoes.com",
        "/blog?q=%7Bsearch_term_string%7D"
      )
    ).toBe("/blog");
  });

  it("redirects a trailing slash only when the normalized route exists", () => {
    expect(getSeoRedirectTarget("felipebulhoes.com", "/sobre/")).toBe("/sobre");
    expect(getSeoRedirectTarget("felipebulhoes.com", "/rota-inexistente/")).toBeNull();
  });

  it.each([
    "www.felipebulhoes.com",
    "felipebulhoes.com.br",
    "www.felipebulhoes.com.br",
    "drfelipebulhoesurologia.com.br",
    "www.drfelipebulhoesurologia.com.br",
    "bulhoesurohealth.com",
    "www.bulhoesurohealth.com",
  ])("consolidates %s on the canonical domain in one hop", host => {
    expect(getSeoRedirectTarget(host, "/sobre?utm_source=test")).toBe(
      "https://felipebulhoes.com/sobre?utm_source=test"
    );
  });

  it("does not redirect valid canonical-host requests", () => {
    expect(getSeoRedirectTarget("felipebulhoes.com", "/sobre")).toBeNull();
    expect(getSeoRedirectTarget("localhost:3000", "/sobre")).toBeNull();
  });

  it("prefers the original hostname forwarded by the deployment proxy", () => {
    expect(
      getRequestHostname(
        {
          host: "internal-service.run.app",
          "x-forwarded-host": "felipebulhoes.com.br, internal-proxy",
        },
        "internal-service.run.app"
      )
    ).toBe("felipebulhoes.com.br");
  });

  it("falls back to the direct host when proxy headers are absent", () => {
    expect(getRequestHostname({ host: "felipebulhoes.com:443" })).toBe(
      "felipebulhoes.com"
    );
  });

  it("builds clean route-specific canonicals without query strings", () => {
    expect(getCanonicalUrl("/")).toBe("https://felipebulhoes.com/");
    expect(getCanonicalUrl("/educativo/vasectomia/?utm_source=test")).toBe(
      "https://felipebulhoes.com/educativo/vasectomia"
    );
  });

  it("replaces duplicate metadata with one route-specific canonical", () => {
    const html = `<!doctype html><html><head>
      <title>Old title</title>
      <meta name="description" content="old description" />
      <link rel="canonical" href="https://example.com/old" />
      <link rel="canonical" href="https://example.com/duplicate" />
      <meta property="og:url" content="https://example.com/old" />
      <meta property="og:title" content="old title" />
      <meta property="og:image" content="https://example.com/old.png" />
      <meta name="twitter:title" content="old title" />
    </head><body></body></html>`;
    const result = injectCanonicalMetadata(html, "/sobre?utm_source=test");

    expect(result.match(/rel="canonical"/g)).toHaveLength(1);
    expect(result.match(/property="og:url"/g)).toHaveLength(1);
    expect(result.match(/property="og:title"/g)).toHaveLength(1);
    expect(result.match(/property="og:image"/g)).toHaveLength(1);
    expect(result.match(/name="twitter:title"/g)).toHaveLength(1);
    expect(result).toContain(
      '<link rel="canonical" href="https://felipebulhoes.com/sobre" />'
    );
    expect(result).toContain(
      '<meta property="og:url" content="https://felipebulhoes.com/sobre" />'
    );
    expect(result).toContain('<meta name="robots" content="index, follow" />');
    expect(result).toContain('<meta property="og:type" content="website" />');
    expect(result).toContain('<meta property="og:locale" content="pt_BR" />');
    expect(result).toContain('<meta name="twitter:card" content="summary_large_image" />');
    expect(result).toContain("Sobre o Dr. Felipe de Bulhões");
  });

  it("emits campaign-specific social images before the client application loads", () => {
    const html = "<!doctype html><html><head></head><body></body></html>";
    const result = injectCanonicalMetadata(html, "/vasectomia-sem-bisturi");

    expect(result).toContain("og-banner-vasectomia");
    expect(result).toContain("Vasectomia Sem Bisturi em SP e Campinas");
    expect(result).toContain('<meta property="og:type" content="website" />');
  });

  it("uses article Open Graph type for published blog URLs", () => {
    const html = "<!doctype html><html><head></head><body></body></html>";
    const result = injectCanonicalMetadata(html, "/blog/quando-procurar-urologista");

    expect(result).toContain('<meta property="og:type" content="article" />');
    expect(result).toContain("10 sinais de que você deve procurar um urologista");
  });

  it("derives the internal social preview from the same public metadata catalog", () => {
    expect(getSocialPreviewData("/vasectomia-sem-bisturi?utm_source=preview")).toMatchObject({
      pathname: "/vasectomia-sem-bisturi",
      canonicalUrl: "https://felipebulhoes.com/vasectomia-sem-bisturi",
      metadata: {
        type: "website",
        title: "Vasectomia Sem Bisturi em SP e Campinas | Dr. Felipe de Bulhões",
      },
    });
    expect(getSocialPreviewData("/blog/quando-procurar-urologista")?.metadata.type).toBe("article");
  });

  it("does not offer social previews for internal, prototype, redirect or unknown paths", () => {
    expect(getSocialPreviewData("/admin/social-preview")).toBeNull();
    expect(getSocialPreviewData("/prototipo-jornada-paciente")).toBeNull();
    expect(getSocialPreviewData("/agendar/doctoralia")).toBeNull();
    expect(getSocialPreviewData("/rota-inexistente")).toBeNull();
  });

  it("derives a useful breadcrumb trail for blog, location and educational pages", () => {
    expect(getBreadcrumbItems("/blog/quando-procurar-urologista")).toEqual([
      { name: "Início", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: "10 sinais de que você deve procurar um urologista", url: "/blog/quando-procurar-urologista" },
    ]);
    expect(getBreadcrumbItems("/local/clinovi-paulista")).toEqual([
      { name: "Início", url: "/" },
      { name: "Consultórios", url: "/consultorios" },
      { name: "Clinovi Paulista", url: "/local/clinovi-paulista" },
    ]);
    expect(getBreadcrumbItems("/educativo/vasectomia")).toEqual([
      { name: "Início", url: "/" },
      { name: "Vasectomia", url: "/educativo/vasectomia" },
    ]);
    expect(getBreadcrumbItems("/admin/leads")).toEqual([]);
  });

  it("provides non-empty social metadata for every canonical sitemap URL", () => {
    const sitemap = readFileSync(
      resolve(import.meta.dirname, "../client/public/sitemap.xml"),
      "utf8"
    );
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);

    for (const url of urls) {
      const metadata = getPageMetadata(new URL(url).pathname);
      expect(metadata.title, url).not.toHaveLength(0);
      expect(metadata.description, url).not.toHaveLength(0);
      expect(metadata.image, url).toMatch(/^https:\/\//);
      expect(metadata.imageAlt, url).not.toHaveLength(0);
    }
  });

  it("returns a real 404 policy and noindex metadata for unknown URLs", () => {
    const html = `<!doctype html><html><head>
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://felipebulhoes.com/" />
      <meta property="og:url" content="https://felipebulhoes.com/" />
    </head><body></body></html>`;
    const result = injectCanonicalMetadata(html, "/rota-inexistente");

    expect(getSpaResponseStatus("/rota-inexistente")).toBe(404);
    expect(getSpaResponseStatus("/blog/artigo-inexistente")).toBe(404);
    expect(result).toContain(
      '<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />'
    );
    expect(result).toContain("<title>Página não encontrada | Dr. Felipe de Bulhões</title>");
    expect(result).not.toContain('rel="canonical"');
    expect(result).not.toContain('property="og:url"');
  });

  it("keeps valid public, blog and intentional noindex routes available", () => {
    expect(getSpaResponseStatus("/sobre")).toBe(200);
    expect(getSpaResponseStatus("/blog/quando-procurar-urologista")).toBe(200);
    expect(getSpaResponseStatus("/prototipo-jornada-paciente")).toBe(200);
    expect(getSpaResponseStatus("/admin/leads")).toBe(200);
    expect(getSpaResponseStatus("/admin/social-preview")).toBe(200);
    expect(isIndexableSitePath("/prototipo-jornada-paciente")).toBe(false);
    expect(isIndexableSitePath("/admin/leads")).toBe(false);
    expect(isIndexableSitePath("/admin/social-preview")).toBe(false);
  });

  it("keeps every sitemap URL canonical and indexable", () => {
    const sitemap = readFileSync(
      resolve(import.meta.dirname, "../client/public/sitemap.xml"),
      "utf8"
    );
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);

    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      const pathname = new URL(url).pathname;
      expect(getSpaResponseStatus(pathname), pathname).toBe(200);
      expect(isIndexableSitePath(pathname), pathname).toBe(true);
      expect(getCanonicalUrl(pathname), pathname).toBe(url.replace(/\/$/, pathname === "/" ? "/" : ""));
    }
  });
});
