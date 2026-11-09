// Avisa Bing e demais buscadores do IndexNow sobre as URLs do sitemap.
// Rodar depois que a publicação estiver no ar: `pnpm indexnow`.
// Para enviar só algumas URLs: `pnpm indexnow https://felipebulhoes.com/rota ...`
import { readFileSync } from "node:fs";

const HOST = "felipebulhoes.com";
const KEY = "9d83624fc1a11fabb32f3b31b2f2ef3c";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const fromArgs = process.argv.slice(2);
const urls = fromArgs.length
  ? fromArgs
  : [...readFileSync(new URL("../client/public/sitemap.xml", import.meta.url), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());

const keyCheck = await fetch(KEY_LOCATION);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error(`A chave ainda não está no ar em ${KEY_LOCATION}. Publique o site antes de rodar.`);
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} (${urls.length} URLs)`);
if (res.status >= 300) {
  console.error(await res.text());
  process.exit(1);
}
