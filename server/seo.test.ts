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
      <link rel="canonical" href="https://example.com/old" />
      <link rel="canonical" href="https://example.com/duplicate" />
      <meta property="og:url" content="https://example.com/old" />
    </head><body></body></html>`;
    const result = injectCanonicalMetadata(html, "/sobre?utm_source=test");

    expect(result.match(/rel="canonical"/g)).toHaveLength(1);
    expect(result.match(/property="og:url"/g)).toHaveLength(1);
    expect(result).toContain(
      '<link rel="canonical" href="https://felipebulhoes.com/sobre" />'
    );
    expect(result).toContain(
      '<meta property="og:url" content="https://felipebulhoes.com/sobre" />'
    );
    expect(result).toContain('<meta name="robots" content="index, follow" />');
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
    expect(result).not.toContain('rel="canonical"');
    expect(result).not.toContain('property="og:url"');
  });

  it("keeps valid public, blog and intentional noindex routes available", () => {
    expect(getSpaResponseStatus("/sobre")).toBe(200);
    expect(getSpaResponseStatus("/blog/quando-procurar-urologista")).toBe(200);
    expect(getSpaResponseStatus("/prototipo-jornada-paciente")).toBe(200);
    expect(getSpaResponseStatus("/admin/leads")).toBe(200);
    expect(isIndexableSitePath("/prototipo-jornada-paciente")).toBe(false);
    expect(isIndexableSitePath("/admin/leads")).toBe(false);
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
