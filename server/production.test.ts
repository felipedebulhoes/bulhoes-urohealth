import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer, type Server } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Readable } from "node:stream";
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

  it("inclui os patches exigidos pelo pnpm antes da instalação no container", () => {
    const dockerfile = readFileSync(new URL("../Dockerfile", import.meta.url), "utf8");

    expect(dockerfile).toContain("COPY package.json pnpm-lock.yaml ./");
    expect(dockerfile).toContain("COPY patches ./patches");
    expect(dockerfile).not.toContain("COPY package.json pnpm-lock.yaml patches/ ./");
    expect(dockerfile.indexOf("COPY patches ./patches")).toBeLessThan(
      dockerfile.indexOf("RUN pnpm install --frozen-lockfile")
    );
  });

  it("repete erros transitórios de transporte ao copiar assets legados", () => {
    const copyScript = readFileSync(
      new URL("../scripts/google-cloud/copy-manus-assets.sh", import.meta.url),
      "utf8"
    );

    expect(copyScript).toContain("--retry 3 --retry-all-errors");
    expect(copyScript).toContain("--connect-timeout 20 --max-time 180");
  });

  it("mantém o preview de produção separado do Hosting live e protegido por confirmações", () => {
    const previewConfig = JSON.parse(
      readFileSync(new URL("../firebase.production-preview.json", import.meta.url), "utf8")
    );
    const previewScript = readFileSync(
      new URL("../scripts/google-cloud/deploy-production-preview.sh", import.meta.url),
      "utf8"
    );

    expect(previewConfig.hosting.site).toBe("site-dr-felipe-bulhoes");
    expect(previewConfig.hosting.rewrites).toEqual([
      {
        source: "**",
        run: {
          serviceId: "dr-felipe-site-production",
          region: "southamerica-east1",
          pinTag: true,
        },
      },
    ]);
    expect(previewScript).toContain('PREVIEW_CHANNEL="${PREVIEW_CHANNEL:-production-candidate}"');
    expect(previewScript).toContain("FIREBASE_PREVIEW_PUBLIC_APPROVED=YES");
    expect(previewScript).toContain('firebase --config firebase.production-preview.json hosting:channel:deploy "$PREVIEW_CHANNEL"');
    expect(previewScript).toContain("--no-invoker-iam-check");
    expect(previewScript).not.toContain("firebase deploy --only hosting");
    expect(previewScript).not.toContain("gcloud dns");
    expect(previewScript).not.toContain("add-iam-policy-binding");
    expect(previewScript).not.toContain('member="allUsers"');
  });

  it("publica o Hosting live somente para o serviço de produção após confirmação explícita", () => {
    const liveConfig = JSON.parse(readFileSync(new URL("../firebase.json", import.meta.url), "utf8"));
    const liveScript = readFileSync(
      new URL("../scripts/google-cloud/deploy-production-live.sh", import.meta.url),
      "utf8"
    );

    expect(liveConfig.hosting.rewrites).toEqual([
      {
        source: "**",
        run: {
          serviceId: "dr-felipe-site-production",
          region: "southamerica-east1",
          pinTag: true,
        },
      },
    ]);
    expect(liveScript).toContain("FIREBASE_HOSTING_LIVE_APPROVED=YES");
    expect(liveScript).toContain('firebase deploy --only hosting --project "$PROJECT_ID"');
    expect(liveScript).toContain("run.googleapis.com/invoker-iam-disabled");
    expect(liveScript).not.toContain("gcloud dns");
    expect(liveScript).not.toContain("customDomains");
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

  it("entrega mídia por um provedor privado quando o bucket do Cloud Storage estiver configurado", async () => {
    const privateServer = createServer(
      createPortablePublicApp({
        staticDirectory,
        assetProvider: async key => {
          if (key !== "imagem.webp") return null;
          return {
            contentType: "image/webp",
            cacheControl: "public, max-age=31536000, immutable",
            etag: '"imagem-versao-1"',
            size: 14,
            createReadStream: () => Readable.from(["mídia privada"]),
          };
        },
      })
    );

    await new Promise<void>(resolve => privateServer.listen(0, "127.0.0.1", resolve));
    const address = privateServer.address();
    if (!address || typeof address === "string") throw new Error("Servidor de mídia privada sem porta");

    try {
      const response = await fetch(`http://127.0.0.1:${address.port}/manus-storage/imagem.webp`, {
        redirect: "manual",
      });

      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toBe("image/webp");
      expect(response.headers.get("cache-control")).toBe("public, max-age=31536000, immutable");
      expect(response.headers.get("etag")).toBe('"imagem-versao-1"');
      expect(response.headers.get("location")).toBeNull();
      expect(await response.text()).toBe("mídia privada");
    } finally {
      await new Promise<void>((resolve, reject) =>
        privateServer.close(error => (error ? reject(error) : resolve()))
      );
    }
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
