import { describe, expect, it } from "vitest";

const BASE_URL = "http://localhost:3000";

/**
 * Tests for SEO 301 redirects.
 * These verify that homepage anchor sections (which are not real routes)
 * return proper 301 redirects instead of serving the SPA shell (which causes Soft 404).
 */
describe("SEO 301 Redirects", () => {
  describe("Homepage anchor section redirects", () => {
    const anchorRedirects = [
      { from: "/consultorios", to: "/#consultorios" },
      { from: "/contato", to: "/#contato" },
      { from: "/agendamento", to: "/#agendamento" },
      { from: "/inicio", to: "/#inicio" },
      { from: "/especialidades", to: "/#especialidades" },
      { from: "/depoimentos", to: "/#depoimentos" },
    ];

    for (const { from, to } of anchorRedirects) {
      it(`redirects ${from} → ${to} with 301`, async () => {
        const res = await fetch(`${BASE_URL}${from}`, { redirect: "manual" });
        expect(res.status).toBe(301);
        const location = res.headers.get("location");
        expect(location).toBe(to);
      });
    }
  });

  describe("URL correction redirects", () => {
    it("redirects /educativo/cancer-de-prostata → /educativo/cancer-prostata with 301", async () => {
      const res = await fetch(`${BASE_URL}/educativo/cancer-de-prostata`, { redirect: "manual" });
      expect(res.status).toBe(301);
      const location = res.headers.get("location");
      expect(location).toBe("/educativo/cancer-prostata");
    });
  });

  describe("Real routes still return 200", () => {
    const validRoutes = [
      "/",
      "/sobre",
      "/educativo/cancer-prostata",
      "/educativo/hiperplasia-prostatica",
      "/blog",
    ];

    for (const route of validRoutes) {
      it(`${route} returns 200`, async () => {
        const res = await fetch(`${BASE_URL}${route}`, { redirect: "manual" });
        expect(res.status).toBe(200);
      });
    }
  });
});
