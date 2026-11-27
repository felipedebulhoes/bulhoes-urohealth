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
  // Link curto da bio do Instagram e do YouTube: abre o WhatsApp Business com
  // a mensagem pronta que diz a origem, para a SDR registrar no Kommo.
  "/agendar":
    "https://wa.me/5511981124455?text=Ol%C3%A1%21%20Vim%20pelo%20Instagram%20e%20gostaria%20de%20agendar%20uma%20consulta.",
  "/yt":
    "https://wa.me/5511981124455?text=Ol%C3%A1%21%20Vim%20pelo%20YouTube%20e%20gostaria%20de%20agendar%20uma%20consulta.",
  // Link do guia em PDF "Antes de decidir": a mensagem diz a origem sem
  // citar o procedimento, e o clique fica registrado no servidor.
  "/guia":
    "https://wa.me/5511981124455?text=Ol%C3%A1%21%20Li%20o%20guia%20%22Antes%20de%20decidir%22%20e%20gostaria%20de%20agendar%20uma%20consulta.",
  // Pedido de avaliação no Google enviado aos pacientes após a consulta
  // (mensagem automática do Feegow). Cada link abre a janela de avaliação do
  // perfil da unidade; o link curto cabe no SMS de 160 caracteres.
  "/avaliar/campinas":
    "https://search.google.com/local/writereview?placeid=ChIJm5WrOkDPyJQR0-eiwlzpcoM",
  "/avaliar/paulista":
    "https://search.google.com/local/writereview?placeid=ChIJe7OX8KZZzpQRFd2o_S6x7oM",
  "/avaliar/pinheiros":
    "https://search.google.com/local/writereview?placeid=ChIJ0Qew-nZXzpQRHtNRJkjD4jg",
  // Formulário de opinião do perfil Doctoralia (fonte mais citada pelas IAs).
  "/avaliar/doctoralia": "https://www.doctoralia.com.br/adicionar-opiniao/felipe-de-bulhoes",
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
