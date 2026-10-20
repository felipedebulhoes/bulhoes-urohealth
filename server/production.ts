import express, { type Request, type Response } from "express";
import { Storage } from "@google-cloud/storage";
import { existsSync, promises as fs } from "node:fs";
import { resolve } from "node:path";
import { getRequestHostname, getSeoRedirectTarget, getSpaResponseStatus, injectCanonicalMetadata } from "./_core/seo";
import { isIndexableSitePath } from "../shared/siteRoutes";

const NOINDEX_VALUE = "noindex, nofollow, noarchive, nosnippet";
const DEFAULT_LEGACY_ASSET_ORIGIN = "https://felipebulhoes.com";
const DEFAULT_ASSET_CACHE_CONTROL = "public, max-age=31536000, immutable";

const removedPageRedirects: Record<string, string> = {
  "/local/clinovi-campinas": "/local/campinas-day-hospital",
  "/local/clinovi-moema": "/consultorios",
  "/local/clinovi-sbc": "/consultorios",
  "/blog/urologista-sao-paulo-paulista-moema": "/consultorios",
  "/blog/urologista-abc-sao-bernardo-santo-andre": "/consultorios",
};

const anchorRedirects: Record<string, string> = {
  "/inicio": "/#inicio",
  "/especialidades": "/#especialidades",
  "/depoimentos": "/#depoimentos",
};

export type PrivateAsset = {
  contentType: string;
  cacheControl?: string;
  contentDisposition?: string;
  etag?: string;
  size?: number;
  createReadStream: () => NodeJS.ReadableStream;
};

export type PortableAssetProvider = (key: string) => Promise<PrivateAsset | null>;

export type PortablePublicAppOptions = {
  staticDirectory?: string;
  legacyAssetOrigin?: string;
  assetProvider?: PortableAssetProvider;
};

function applySecurityHeaders(_req: Request, res: Response, next: () => void) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
}

function applyNoindexHeaders(res: Response) {
  res.setHeader("X-Robots-Tag", NOINDEX_VALUE);
}

function sendSpaHtml(res: Response, page: string, requestPath: string) {
  const status = getSpaResponseStatus(requestPath);
  if (!isIndexableSitePath(requestPath)) applyNoindexHeaders(res);
  res.status(status).type("html").send(page);
}

function getStaticDirectory(staticDirectory?: string) {
  return staticDirectory ?? resolve(import.meta.dirname, "public");
}

function normalizeLegacyAssetOrigin(value: string) {
  return value.replace(/\/+$/, "");
}

function isSafeAssetKey(value: string | undefined): value is string {
  return Boolean(value && !value.includes("..") && !value.includes("\\") && !value.startsWith("/"));
}

function isObjectNotFound(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && (error as { code?: number }).code === 404;
}

/**
 * Creates an authenticated reader for a private Cloud Storage bucket.
 * Cloud Run supplies Application Default Credentials through its service identity;
 * the bucket never needs an allUsers IAM grant.
 */
export function createCloudStorageAssetProvider(bucketName: string): PortableAssetProvider {
  const bucket = new Storage().bucket(bucketName);

  return async key => {
    const file = bucket.file(`site-assets/${key}`);

    try {
      const [metadata] = await file.getMetadata();
      const size =
        typeof metadata.size === "number"
          ? metadata.size
          : metadata.size
            ? Number.parseInt(metadata.size, 10)
            : undefined;

      return {
        contentType: metadata.contentType ?? "application/octet-stream",
        cacheControl: metadata.cacheControl ?? DEFAULT_ASSET_CACHE_CONTROL,
        contentDisposition: metadata.contentDisposition,
        etag: metadata.etag,
        size: Number.isFinite(size) ? size : undefined,
        createReadStream: () => file.createReadStream(),
      };
    } catch (error) {
      if (isObjectNotFound(error)) return null;
      throw error;
    }
  };
}

function applyAssetHeaders(res: Response, asset: PrivateAsset) {
  res.setHeader("Content-Type", asset.contentType);
  res.setHeader("Cache-Control", asset.cacheControl ?? DEFAULT_ASSET_CACHE_CONTROL);
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (asset.contentDisposition) res.setHeader("Content-Disposition", asset.contentDisposition);
  if (asset.etag) res.setHeader("ETag", asset.etag);
  if (asset.size !== undefined) res.setHeader("Content-Length", asset.size);
}

/**
 * Produces the public-only Cloud Run application.
 *
 * Administrative APIs, uploads and platform OAuth are intentionally unavailable
 * until their Google Cloud replacements are provisioned and reviewed. This keeps
 * the staging service useful for SEO and presentation QA without accidentally
 * exposing an unauthenticated admin surface.
 */
export function createPortablePublicApp(options: PortablePublicAppOptions = {}) {
  const app = express();
  const staticDirectory = getStaticDirectory(options.staticDirectory);
  const assetProvider =
    options.assetProvider ??
    (process.env.GCS_ASSET_BUCKET ? createCloudStorageAssetProvider(process.env.GCS_ASSET_BUCKET) : undefined);
  const legacyAssetOrigin = normalizeLegacyAssetOrigin(
    options.legacyAssetOrigin ?? process.env.LEGACY_ASSET_ORIGIN ?? DEFAULT_LEGACY_ASSET_ORIGIN
  );

  if (!existsSync(staticDirectory)) {
    throw new Error(`Build público não encontrado em ${staticDirectory}. Execute pnpm build:portable.`);
  }

  app.use(applySecurityHeaders);

  app.use((req, res, next) => {
    if (req.path.startsWith("/admin/") || req.path.startsWith("/prototipo-jornada-paciente")) {
      applyNoindexHeaders(res);
    }

    if (req.path.startsWith("/admin/")) {
      res.status(404).end();
      return;
    }

    if (req.path === "/api" || req.path.startsWith("/api/")) {
      res.status(503).json({ error: "API indisponível durante a migração" });
      return;
    }

    next();
  });

  app.use((req, res, next) => {
    const host = getRequestHostname(req.headers, req.hostname);
    const target = getSeoRedirectTarget(host, req.originalUrl);
    if (target) {
      res.redirect(301, target);
      return;
    }
    next();
  });

  for (const [from, to] of Object.entries(removedPageRedirects)) {
    app.get(from, (_req, res) => res.redirect(301, to));
  }

  for (const [from, to] of Object.entries(anchorRedirects)) {
    app.get(from, (_req, res) => res.redirect(301, to));
  }

  app.get("/educativo/cancer-de-prostata", (_req, res) => {
    res.redirect(301, "/educativo/cancer-prostata");
  });

  app.get("/manus-storage/*", async (req, res, next) => {
    const assetKey = (req.params as { 0?: string })[0];
    if (!isSafeAssetKey(assetKey)) {
      res.status(400).end();
      return;
    }

    if (assetProvider) {
      try {
        const asset = await assetProvider(assetKey);
        if (!asset) {
          res.status(404).end();
          return;
        }

        applyAssetHeaders(res, asset);
        const stream = asset.createReadStream();
        stream.once("error", next).pipe(res);
        return;
      } catch (error) {
        next(error);
        return;
      }
    }

    // Compatibility bridge for local development and pre-migration staging only.
    // Cloud Run uses GCS_ASSET_BUCKET and its service identity instead.
    res.redirect(302, `${legacyAssetOrigin}/manus-storage/${encodeURIComponent(assetKey)}`);
  });

  app.use(express.static(staticDirectory, { index: false, fallthrough: true }));

  app.use("*", async (req, res, next) => {
    try {
      const template = await fs.readFile(resolve(staticDirectory, "index.html"), "utf8");
      const page = injectCanonicalMetadata(template, req.originalUrl);
      sendSpaHtml(res, page, req.originalUrl);
    } catch (error) {
      next(error);
    }
  });

  return app;
}

async function startPortableServer() {
  const app = createPortablePublicApp();
  const port = Number.parseInt(process.env.PORT ?? "8080", 10);
  const host = process.env.HOST ?? "0.0.0.0";

  app.listen(port, host, () => {
    console.log(`Servidor público portátil disponível em http://${host}:${port}`);
  });
}

if (process.env.NODE_ENV !== "test") {
  startPortableServer().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
