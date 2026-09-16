import { describe, expect, it } from "vitest";
import {
  getCanonicalUrl,
  getSeoRedirectTarget,
  injectCanonicalMetadata,
} from "./_core/seo";

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
  });
});
