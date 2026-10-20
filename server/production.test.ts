import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createServer, type Server } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createPortablePublicApp } from "./production";

const platformOnlyVariables = [
  "BUILT_IN_FORGE_API_URL",
  "BUILT_IN_FORGE_API_KEY",
  "OAUTH_SERVER_URL",
  "VITE_APP_ID",
] as const;

describe("runtime público portátil", () => {
  let staticDirectory: string;
  let server: Server;
  let baseUrl: string;

  beforeEach(async () => {
    staticDirectory = mkdtempSync(join(tmpdir(), "felipe-site-public-"));
    writeFileSync(
      join(staticDirectory, "index.html"),
      '<!doctype html><html lang="pt-BR"><head><title>Fallback</title></head><body><div id="root"></div></body></html>'
    );

    server = createServer(createPortablePublicApp({ staticDirectory }));
    await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("Servidor de teste sem porta");
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterEach(async () => {
    await new Promise<void>((resolve, reject) => server.close(error => (error ? reject(error) : resolve())));
    rmSync(staticDirectory, { recursive: true, force: true });
  });

  it("inicia sem as variáveis exclusivas da hospedagem atual", () => {
    const previous = new Map(platformOnlyVariables.map(name => [name, process.env[name]]));

    try {
      for (const name of platformOnlyVariables) delete process.env[name];
      expect(() => createPortablePublicApp({ staticDirectory })).not.toThrow();
    } finally {
      for (const [name, value] of previous) {
        if (value === undefined) delete process.env[name];
        else process.env[name] = value;
      }
    }
  });

  it("entrega conteúdo público com metatags canônicas server-side", async () => {
    const response = await fetch(`${baseUrl}/`);
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(html).toContain('<link rel="canonical" href="https://felipebulhoes.com/" />');
    expect(html).toContain('property="og:url" content="https://felipebulhoes.com/"');
  });

  it("preserva redirecionamentos públicos críticos", async () => {
    const response = await fetch(`${baseUrl}/local/clinovi-moema`, { redirect: "manual" });

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("/consultorios");
  });

  it("responde 404 e noindex para uma rota pública desconhecida", async () => {
    const response = await fetch(`${baseUrl}/rota-que-nao-existe`);
    const html = await response.text();

    expect(response.status).toBe(404);
    expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow, noarchive, nosnippet");
    expect(html).toContain('name="robots" content="noindex, nofollow, noarchive, nosnippet"');
  });

  it("mantém uma ponte explícita para assets legados apenas durante staging", async () => {
    const response = await fetch(
      `${baseUrl}/manus-storage/logo-landscape-dr-felipe_cc84d4a3.svg`,
      { redirect: "manual" }
    );

    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe(
      "https://felipebulhoes.com/manus-storage/logo-landscape-dr-felipe_cc84d4a3.svg"
    );
  });

  it("não expõe APIs ou a área administrativa antes da substituição de autenticação", async () => {
    const admin = await fetch(`${baseUrl}/admin/social-preview`);
    const api = await fetch(`${baseUrl}/api/trpc/auth.me`);

    expect(admin.status).toBe(404);
    expect(admin.headers.get("x-robots-tag")).toBe("noindex, nofollow, noarchive, nosnippet");
    expect(api.status).toBe(503);
    expect(await api.json()).toEqual({ error: "API indisponível durante a migração" });
  });
});
