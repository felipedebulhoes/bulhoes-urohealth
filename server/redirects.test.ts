import { describe, expect, it } from "vitest";

const BASE_URL = "http://localhost:3000";

/**
 * Tests for SEO redirects and real pages.
 * /consultorios, /contato, /agendamento are now real pages (200).
 * Only remaining anchor sections (/inicio, /especialidades, /depoimentos) still redirect.
 */
describe("SEO Redirects & Real Pages", () => {
  describe("Real pages that previously caused Soft 404 now return 200", () => {
    const realPages = [
      "/consultorios",
      "/contato",
      "/agendamento",
    ];

    for (const route of realPages) {
      it(`${route} returns 200 (real page, not redirect)`, async () => {
        const res = await fetch(`${BASE_URL}${route}`, { redirect: "manual" });
        expect(res.status).toBe(200);
      });
    }
  });

  describe("Remaining homepage anchor section redirects", () => {
    const anchorRedirects = [
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

  describe("Removed location page redirects", () => {
    it("redirects /local/clinovi-campinas → /local/campinas-day-hospital with 301", async () => {
      const res = await fetch(`${BASE_URL}/local/clinovi-campinas`, { redirect: "manual" });
      expect(res.status).toBe(301);
      const location = res.headers.get("location");
      expect(location).toBe("/local/campinas-day-hospital");
    });
  });

  describe("Other real routes still return 200", () => {
    const validRoutes = [
      "/",
      "/sobre",
      "/educativo/cancer-prostata",
      "/educativo/hiperplasia-prostatica",
      "/blog",
      "/local/campinas-day-hospital",
      "/local/clinovi-paulista",
      "/local/clinovi-moema",
    ];

    for (const route of validRoutes) {
      it(`${route} returns 200`, async () => {
        const res = await fetch(`${BASE_URL}${route}`, { redirect: "manual" });
        expect(res.status).toBe(200);
      });
    }
  });
});
