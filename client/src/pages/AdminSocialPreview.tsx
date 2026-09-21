import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getSocialPreviewData } from "@shared/pageMetadata";
import { normalizeSitePath } from "@shared/siteRoutes";
import {
  ArrowLeft,
  CheckCircle2,
  Clipboard,
  ExternalLink,
  Eye,
  FileCode2,
  Image as ImageIcon,
  Link2,
  Loader2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

const PRESET_PATHS = [
  { path: "/", label: "Página inicial" },
  { path: "/vasectomia-sem-bisturi", label: "Vasectomia" },
  { path: "/andrologia-performance-masculina", label: "Andrologia" },
  { path: "/estetica-intima-masculina", label: "Estética íntima" },
  { path: "/blog/quando-procurar-urologista", label: "Artigo do blog" },
];

type PreviewData = NonNullable<ReturnType<typeof getSocialPreviewData>>;

function copyText(value: string, successMessage: string) {
  navigator.clipboard?.writeText(value)
    .then(() => toast.success(successMessage))
    .catch(() => toast.error("Não foi possível copiar. Tente novamente."));
}

function MetadataLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-slate-200 py-3 last:border-0 sm:grid-cols-[9.5rem_1fr] sm:gap-4 dark:border-slate-800">
      <span className="font-mono text-xs font-semibold text-[#9D602A]">{label}</span>
      <span className="break-all font-mono text-xs leading-5 text-slate-700 dark:text-slate-300">{value}</span>
    </div>
  );
}

function SocialCard({
  network,
  preview,
  compact = false,
}: {
  network: "Facebook" | "WhatsApp" | "LinkedIn";
  preview: PreviewData;
  compact?: boolean;
}) {
  const { metadata, canonicalUrl } = preview;
  const host = new URL(canonicalUrl).hostname.replace("www.", "");

  return (
    <article className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 ${compact ? "max-w-md" : ""}`}>
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>{network}</span>
        <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" /> Tags ativas
        </span>
      </div>
      <img
        src={metadata.image}
        alt={metadata.imageAlt}
        width="1200"
        height="630"
        loading="eager"
        className="aspect-[1.91/1] w-full object-cover"
      />
      <div className="space-y-1.5 p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{host}</p>
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 dark:text-white">{metadata.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{metadata.description}</p>
      </div>
    </article>
  );
}

function AccessDenied() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <Card className="w-full max-w-md border-slate-200 text-center shadow-lg dark:border-slate-800">
        <CardContent className="space-y-5 p-8">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#B87333]/10 text-[#9D602A]">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-xl font-semibold">Acesso restrito</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Esta ferramenta é exclusiva para administradores do site.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">Voltar ao site</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

export default function AdminSocialPreview() {
  const { user, loading: authLoading, isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const [inputPath, setInputPath] = useState("/vasectomia-sem-bisturi");
  const normalizedPath = useMemo(() => normalizeSitePath(inputPath), [inputPath]);
  const preview = useMemo(() => getSocialPreviewData(inputPath), [inputPath]);
  const previewOpenUrl = preview
    ? `${window.location.origin}${preview.pathname}`
    : "";

  const metadataText = useMemo(() => {
    if (!preview) return "";
    const { metadata, canonicalUrl } = preview;
    return [
      `URL: ${canonicalUrl}`,
      `og:title: ${metadata.title}`,
      `og:description: ${metadata.description}`,
      `og:type: ${metadata.type}`,
      `og:image: ${metadata.image}`,
      `og:image:alt: ${metadata.imageAlt}`,
      "twitter:card: summary_large_image",
    ].join("\n");
  }, [preview]);

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-[#B87333]" aria-label="Carregando ferramenta interna" />
      </main>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") return <AccessDenied />;

  return (
    <main className="min-h-screen bg-[#F7F5F2] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Button asChild variant="ghost" size="icon" className="shrink-0" aria-label="Voltar ao site">
              <Link href="/"><ArrowLeft className="h-5 w-5" /></Link>
            </Button>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#133456] text-[#E6BC72] shadow-sm">
              <Eye className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">Prévia social</h1>
              <p className="hidden text-sm text-muted-foreground sm:block">Open Graph e Twitter Card antes da publicação</p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#B87333]/10 px-3 py-1.5 text-xs font-semibold text-[#85501F] dark:text-[#E6BC72]">
            <ShieldCheck className="h-3.5 w-3.5" /> Interno · não indexável
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        <section className="rounded-2xl bg-[#133456] px-5 py-7 text-white shadow-lg sm:px-8 sm:py-9">
          <div className="max-w-3xl">
            <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#E6BC72]"><Sparkles className="h-3.5 w-3.5" /> Controle de compartilhamento</p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Veja exatamente os dados sociais enviados pelo site.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">A prévia usa o mesmo catálogo que o servidor entrega aos crawlers. Nenhuma URL externa é consultada e nenhuma alteração é publicada por esta ferramenta.</p>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm dark:border-slate-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-base"><Link2 className="h-4 w-4 text-[#9D602A]" /> URL pública para testar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="social-preview-path" className="text-sm font-medium">Caminho relativo do site</label>
                  <Input
                    id="social-preview-path"
                    value={inputPath}
                    onChange={event => setInputPath(event.target.value)}
                    placeholder="Ex.: /vasectomia-sem-bisturi"
                    aria-describedby="social-preview-path-hint"
                    className="font-mono text-sm"
                  />
                  <p id="social-preview-path-hint" className="text-xs leading-relaxed text-muted-foreground">Use apenas URLs públicas já cadastradas. Parâmetros de campanha são ignorados na prévia, assim como na canônica.</p>
                </div>

                <div className="flex flex-wrap gap-2" aria-label="Exemplos de páginas para pré-visualizar">
                  {PRESET_PATHS.map(item => (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => setInputPath(item.path)}
                      aria-pressed={normalizedPath === item.path}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-2 ${normalizedPath === item.path ? "border-[#B87333] bg-[#B87333]/10 text-[#85501F] dark:text-[#E6BC72]" : "border-slate-200 bg-white text-slate-600 hover:border-[#B87333]/50 hover:text-[#85501F] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {preview ? (
              <Card className="border-slate-200 shadow-sm dark:border-slate-800">
                <CardHeader className="flex-row items-center justify-between gap-4 pb-3">
                  <CardTitle className="flex items-center gap-2 text-base"><FileCode2 className="h-4 w-4 text-[#9D602A]" /> Dados entregues no HTML</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={() => copyText(metadataText, "Metadados copiados")}> <Clipboard className="mr-1.5 h-3.5 w-3.5" /> Copiar</Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 dark:border-slate-800 dark:bg-slate-950">
                    <MetadataLine label="canonical" value={preview.canonicalUrl} />
                    <MetadataLine label="og:title" value={preview.metadata.title} />
                    <MetadataLine label="og:description" value={preview.metadata.description} />
                    <MetadataLine label="og:type" value={preview.metadata.type} />
                    <MetadataLine label="og:image" value={preview.metadata.image} />
                    <MetadataLine label="og:image:alt" value={preview.metadata.imageAlt} />
                    <MetadataLine label="twitter:card" value="summary_large_image" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Resumo técnico dos metadados">
                    <div className="rounded-lg bg-slate-50 p-3 text-center dark:bg-slate-900"><p className="text-lg font-semibold">{preview.metadata.title.length}</p><p className="text-[11px] text-muted-foreground">caracteres no título</p></div>
                    <div className="rounded-lg bg-slate-50 p-3 text-center dark:bg-slate-900"><p className="text-lg font-semibold">{preview.metadata.description.length}</p><p className="text-[11px] text-muted-foreground">na descrição</p></div>
                    <div className="rounded-lg bg-slate-50 p-3 text-center dark:bg-slate-900"><p className="text-lg font-semibold capitalize">{preview.metadata.type}</p><p className="text-[11px] text-muted-foreground">tipo Open Graph</p></div>
                    <div className="rounded-lg bg-slate-50 p-3 text-center dark:bg-slate-900"><p className="text-lg font-semibold">1200×630</p><p className="text-[11px] text-muted-foreground">imagem declarada</p></div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-amber-200 bg-amber-50 shadow-sm dark:border-amber-900/50 dark:bg-amber-950/20">
                <CardContent className="flex gap-3 p-5 text-sm leading-relaxed text-amber-900 dark:text-amber-100">
                  <ImageIcon className="mt-0.5 h-5 w-5 shrink-0" />
                  <div><strong>Essa URL não está disponível para prévia.</strong><br />Selecione uma rota pública indexável. Rotas administrativas, protótipos, redirecionamentos e páginas inexistentes são excluídos para manter a prévia alinhada à política de SEO.</div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="overflow-hidden border-slate-200 shadow-sm dark:border-slate-800">
              <CardHeader className="border-b border-slate-100 bg-white pb-4 dark:border-slate-800 dark:bg-slate-950">
                <CardTitle className="flex items-center gap-2 text-base"><MessageCircle className="h-4 w-4 text-[#9D602A]" /> Como a página tende a aparecer no feed</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5 p-5 sm:grid-cols-2">
                {preview ? (
                  <>
                    <SocialCard network="Facebook" preview={preview} />
                    <SocialCard network="LinkedIn" preview={preview} />
                    <div className="sm:col-span-2"><SocialCard network="WhatsApp" preview={preview} compact /></div>
                  </>
                ) : (
                  <div className="sm:col-span-2 flex min-h-72 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-muted-foreground dark:border-slate-700 dark:bg-slate-900">Escolha uma URL pública para carregar a prévia social.</div>
                )}
              </CardContent>
            </Card>

            {preview && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="min-w-0"><p className="font-medium">Abrir no ambiente atual</p><p className="truncate text-xs text-muted-foreground">{previewOpenUrl}</p></div>
                <Button asChild variant="outline" size="sm"><a href={previewOpenUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Abrir</a></Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
