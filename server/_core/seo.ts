export const CANONICAL_ORIGIN = "https://felipebulhoes.com";

const ALTERNATE_HOSTNAMES = new Set([
  "www.felipebulhoes.com",
  "felipebulhoes.com.br",
  "www.felipebulhoes.com.br",
  "drfelipebulhoesurologia.com.br",
  "www.drfelipebulhoesurologia.com.br",
  "bulhoesurohealth.com",
  "www.bulhoesurohealth.com",
]);

function normalizeHostname(host: string | undefined): string {
  return (host ?? "")
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "")
    .replace(/\.$/, "");
}

export function getRequestHostname(
  headers: Record<string, string | string[] | undefined>,
  fallback?: string
): string {
  const forwardedHost = headers["x-forwarded-host"];
  const originalHost = headers["x-original-host"];
  const directHost = headers.host;
  const candidate = Array.isArray(forwardedHost)
    ? forwardedHost[0]
    : forwardedHost?.split(",")[0] ||
      (Array.isArray(originalHost) ? originalHost[0] : originalHost) ||
      (Array.isArray(directHost) ? directHost[0] : directHost) ||
      fallback;

  return normalizeHostname(candidate);
}

/**
 * Returns the one-step SEO redirect for alternate domains and known malformed
 * URLs. A relative target keeps local development on the current host, while
 * alternate production hosts are consolidated on the canonical origin.
 */
export function getSeoRedirectTarget(
  host: string | undefined,
  originalUrl: string
): string | null {
  const hostname = normalizeHostname(host);
  const url = new URL(originalUrl || "/", "https://request.invalid");
  const isAlternateHost = ALTERNATE_HOSTNAMES.has(hostname);
  let normalizedPath = url.pathname;
  let normalizedSearch = url.search;
  let hasPathFix = false;

  // URL discovered by Google and reported as a duplicate canonical conflict.
  if (normalizedPath === "/$") {
    normalizedPath = "/";
    normalizedSearch = "";
    hasPathFix = true;
  }

  // Obsolete SearchAction placeholder discovered as an alternate blog URL.
  if (
    normalizedPath === "/blog" &&
    url.searchParams.get("q") === "{search_term_string}"
  ) {
    normalizedSearch = "";
    hasPathFix = true;
  }

  if (!isAlternateHost && !hasPathFix) return null;

  const target = `${normalizedPath}${normalizedSearch}`;
  return isAlternateHost ? `${CANONICAL_ORIGIN}${target}` : target;
}

export function getCanonicalUrl(requestPath: string): string {
  const url = new URL(requestPath || "/", CANONICAL_ORIGIN);
  let pathname = url.pathname || "/";

  if (pathname !== "/") {
    pathname = pathname.replace(/\/+$/, "");
  }

  return `${CANONICAL_ORIGIN}${pathname}`;
}

/** Injects one canonical and one og:url into server-delivered HTML. */
export function injectCanonicalMetadata(html: string, requestPath: string): string {
  const canonicalUrl = getCanonicalUrl(requestPath);
  const withoutExistingTags = html
    .replace(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>\s*/gi, "")
    .replace(/<meta\b(?=[^>]*\bproperty=["']og:url["'])[^>]*>\s*/gi, "");

  const tags = [
    `    <link rel="canonical" href="${canonicalUrl}" />`,
    `    <meta property="og:url" content="${canonicalUrl}" />`,
  ].join("\n");

  return withoutExistingTags.replace(/\s*<\/head>/i, `\n${tags}\n  </head>`);
}
