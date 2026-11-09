// Gera o conteúdo HTML de cada página pública depois do build.
// Se alguma rota indexável falhar, o build falha e a versão anterior continua no ar.
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "dist/prerender");
const ssrDirectory = resolve(root, "dist/ssr");
const MIN_TEXT_LENGTH = 300;

const { prerenderPaths, renderRoute } = await import(
  pathToFileURL(resolve(ssrDirectory, "entry-prerender.js")).href
);

const textLength = html =>
  html
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim().length;

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const failures = [];
for (const path of prerenderPaths) {
  try {
    const { html, jsonLd, errors } = await renderRoute(path);
    const problems = [...errors];
    if (!/<h1[\s>]/.test(html)) problems.push("sem <h1>");
    if (html.includes("route-fallback") || html.includes("<template id=\"B:")) problems.push("Suspense não resolvido");
    if (textLength(html) < MIN_TEXT_LENGTH) problems.push(`texto curto (${textLength(html)})`);
    if (problems.length > 0) {
      failures.push({ path, problems });
      continue;
    }
    const key = path === "/" ? "index" : path.slice(1).replaceAll("/", "__");
    await writeFile(resolve(output, `${key}.json`), JSON.stringify({ html, jsonLd }));
  } catch (error) {
    failures.push({ path, problems: [error instanceof Error ? error.stack ?? error.message : String(error)] });
  }
}

await rm(ssrDirectory, { recursive: true, force: true });

if (failures.length > 0) {
  for (const { path, problems } of failures) {
    console.error(`Falha ao pré-renderizar ${path}:\n  ${problems.map(item => item.slice(0, 600)).join("\n  ")}`);
  }
  console.error(`${failures.length} de ${prerenderPaths.length} rotas falharam.`);
  process.exit(1);
}

console.log(`${prerenderPaths.length} rotas pré-renderizadas em dist/prerender.`);
process.exit(0);
