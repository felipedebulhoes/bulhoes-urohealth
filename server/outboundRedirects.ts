import type { Express, Request, Response } from "express";

/**
 * Links curtos de saída (ex.: /instagram) usados em canais externos como o
 * cartão digital Taggo. Cada acesso é registrado no servidor e o visitante é
 * redirecionado ao destino oficial.
 *
 * Por que no servidor: o GA4 do site só mede com consentimento LGPD, e um
 * redirecionamento imediato não dá tempo de o visitante aceitar cookies. O
 * registro server-side conta todos os cliques sem cookies e sem dados pessoais
 * (não grava IP, user agent nem identificadores), apenas o destino e os
 * parâmetros UTM informados no link.
 *
 * Os destinos são uma lista fechada para impedir redirecionamento aberto.
 */
export const outboundRedirects: Record<string, string> = {
  "/instagram": "https://www.instagram.com/drfelipebulhoes/",
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
const SAFE_UTM_VALUE = /^[a-z0-9_-]{1,64}$/;

export type OutboundClickLog = {
  severity: "INFO";
  message: "outbound_redirect";
  path: string;
  destination: string;
} & Partial<Record<(typeof UTM_KEYS)[number], string>>;

function readUtm(query: Request["query"]) {
  const utm: Partial<Record<(typeof UTM_KEYS)[number], string>> = {};
  for (const key of UTM_KEYS) {
    const raw = query[key];
    if (typeof raw !== "string") continue;
    const value = raw.trim().toLowerCase();
    // Valores fora do padrão são descartados em vez de registrados.
    if (SAFE_UTM_VALUE.test(value)) utm[key] = value;
  }
  return utm;
}

export function registerOutboundRedirects(
  app: Express,
  log: (entry: OutboundClickLog) => void = entry => console.log(JSON.stringify(entry))
) {
  for (const [path, destination] of Object.entries(outboundRedirects)) {
    app.get(path, (req: Request, res: Response) => {
      log({
        severity: "INFO",
        message: "outbound_redirect",
        path,
        destination,
        ...readUtm(req.query),
      });
      res.setHeader("Cache-Control", "no-store");
      res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
      res.redirect(302, destination);
    });
  }
}
