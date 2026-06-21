import { describe, expect, it } from "vitest";

const BASE_URL = "http://localhost:3000";

/**
 * These tests exercise real HTTP redirects/responses against a running
 * server instance (BASE_URL), since the redirect logic lives in Express
 * middleware registered before the tRPC/Vite handlers. That means a dev or
 * prod server must already be listening on BASE_URL for this file to verify
 * anything.
 *
 * When no server is reachable (e.g. running `pnpm test` in isolation, in CI
 * without a server step, or in a fresh clone) we skip instead of failing,
 * so `pnpm test` doesn't report false negatives. With the server running,
 * behavior is unchanged from before.
 */
async function isServerReachable(): Promise<boolean> {
  try {
    await fetch(BASE_URL, { method: "GET", redirect: "manual" });
    return true;
  } catch {
    return false;
  }
}

const serverReachable = await isServerReachable();

if (!serverReachable) {
  // eslint-disable-next-line no-console
  console.warn(
    `[redirects.test.ts] Skipping: no server reachable at ${BASE_URL}. Start the app (pnpm dev) before running tests to exercise these redirects.`
  );
}

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
      it.skipIf(!serverReachable)(`${route} returns 200 (real page, not redirect)`, async () => {
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
      it.skipIf(!serverReachable)(`redirects ${from} → ${to} with 301`, async () => {
        const res = await fetch(`${BASE_URL}${from}`, { redirect: "manual" });
        expect(res.status).toBe(301);
        const location = res.headers.get("location");
        expect(location).toBe(to);
      });
    }
  });

  describe("URL correction redirects", () => {
    it.skipIf(!serverReachable)("redirects /educativo/cancer-de-prostata → /educativo/cancer-prostata with 301", async () => {
      const res = await fetch(`${BASE_URL}/educativo/cancer-de-prostata`, { redirect: "manual" });
      expect(res.status).toBe(301);
      const location = res.headers.get("location");
      expect(location).toBe("/educativo/cancer-prostata");
    });
  });

  describe("Removed location page redirects", () => {
    it.skipIf(!serverReachable)("redirects /local/clinovi-campinas → /local/campinas-day-hospital with 301", async () => {
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
      it.skipIf(!serverReachable)(`${route} returns 200`, async () => {
        const res = await fetch(`${BASE_URL}${route}`, { redirect: "manual" });
        expect(res.status).toBe(200);
      });
    }
  });
});
