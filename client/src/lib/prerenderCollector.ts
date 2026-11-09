/**
 * Durante a pré-renderização, os efeitos não rodam. Este coletor guarda o JSON-LD
 * declarado pelos componentes para que ele chegue no HTML entregue aos robôs.
 */
export type PrerenderJsonLd = Map<string, string>;

type PrerenderGlobal = typeof globalThis & { __PRERENDER_JSON_LD__?: PrerenderJsonLd };

export function startJsonLdCollection(): PrerenderJsonLd {
  const collected: PrerenderJsonLd = new Map();
  (globalThis as PrerenderGlobal).__PRERENDER_JSON_LD__ = collected;
  return collected;
}

export function collectJsonLd(id: string, data: unknown) {
  if (typeof window !== "undefined") return;
  (globalThis as PrerenderGlobal).__PRERENDER_JSON_LD__?.set(id, JSON.stringify(data));
}
