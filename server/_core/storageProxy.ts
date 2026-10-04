import type { Express } from "express";
import fs from "fs";
import path from "path";
import { ENV } from "./env";

export function registerStorageProxy(app: Express) {
  app.get("/manus-storage/*", async (req, res) => {
    const key = (req.params as Record<string, string>)[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }

    // 1. Check local static directory first (client/public/manus-storage)
    const localPath = path.resolve(process.cwd(), "client", "public", "manus-storage", key);
    if (fs.existsSync(localPath)) {
      res.sendFile(localPath);
      return;
    }

    // 2. If running on Manus cloud environment with Forge API
    if (ENV.forgeApiUrl && ENV.forgeApiKey) {
      try {
        const forgeUrl = new URL(
          "v1/storage/presign/get",
          ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
        );
        forgeUrl.searchParams.set("path", key);
        const forgeResp = await fetch(forgeUrl, {
          headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
        });
        if (forgeResp.ok) {
          const { url } = (await forgeResp.json()) as { url: string };
          if (url) {
            res.set("Cache-Control", "no-store");
            res.redirect(307, url);
            return;
          }
        }
      } catch (err) {
        console.error("[StorageProxy] forge error:", err);
      }
    }

    // 3. Fallback: Proxy directly from production CDN/host and cache locally for offline/fast reuse
    try {
      const sanitizedKey = key.split("/").map(encodeURIComponent).join("/");
      const prodUrl = `https://felipebulhoes.com/manus-storage/${sanitizedKey}`;
      const prodResp = await fetch(prodUrl);
      if (prodResp.ok && prodResp.body) {
        const contentType = prodResp.headers.get("content-type") || "application/octet-stream";
        res.setHeader("Content-Type", contentType);
        res.setHeader("Cache-Control", "public, max-age=86400");

        const arrayBuffer = await prodResp.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        try {
          fs.mkdirSync(path.dirname(localPath), { recursive: true });
          fs.writeFileSync(localPath, buffer);
        } catch {
          // ignore cache write errors
        }

        res.send(buffer);
        return;
      }
      res.status(404).send("Storage file not found");
    } catch (err) {
      console.error("[StorageProxy] fallback error:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}

