import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // SEO: 301 redirect — domain consolidation
  // Redirect bulhoesurohealth.com → felipebulhoes.com (canonical domain)
  app.use((req, res, next) => {
    const host = req.hostname || req.headers.host || "";
    if (host.includes("bulhoesurohealth.com")) {
      const target = `https://felipebulhoes.com${req.originalUrl}`;
      return res.redirect(301, target);
    }
    next();
  });

  // SEO: 301 redirect for removed/renamed location pages
  app.get("/local/clinovi-campinas", (_req, res) => {
    res.redirect(301, "/local/campinas-day-hospital");
  });

  // SEO: 301 redirects for homepage anchor sections that have no standalone page
  // /consultorios, /contato, /agendamento now have real pages — no redirect needed
  const anchorRedirects: Record<string, string> = {
    "/inicio": "/#inicio",
    "/especialidades": "/#especialidades",
    "/depoimentos": "/#depoimentos",
  };

  for (const [from, to] of Object.entries(anchorRedirects)) {
    app.get(from, (_req, res) => {
      res.redirect(301, to);
    });
  }

  // SEO: 301 redirect for common misspelling / old URL patterns
  app.get("/educativo/cancer-de-prostata", (_req, res) => {
    res.redirect(301, "/educativo/cancer-prostata");
  });

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
