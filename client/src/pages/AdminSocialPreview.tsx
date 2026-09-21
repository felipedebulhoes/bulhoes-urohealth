import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { getSocialPreviewData } from "@shared/pageMetadata";
import { normalizeSitePath } from "@shared/siteRoutes";
import {
  AlertTriangle,
  ArrowLeft,
  Bug,
  CheckCircle2,
  ChevronRight,
  Clipboard,
  Clock3,
  Database,
  ExternalLink,
  Eye,
  FileCode2,
  HardDriveDownload,
  History,
  Image as ImageIcon,
  Link2,
  Loader2,
  MessageCircle,
  RefreshCw,
  Ruler,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
type ValidationStatus = "pass" | "warning" | "error";
type ImageAudit = {
  url: string;
  finalUrl: string;
  reachable: boolean;
  contentType: string | null;
  bytes: number | null;
  width: number | null;
  height: number | null;
  format: string;
  expectedWidth: number;
  expectedHeight: number;
  dimensionStatus: ValidationStatus;
  sizeStatus: ValidationStatus;
  overallStatus: ValidationStatus;
  messages: string[];
};
type HistoryEntry = {
  id: number;
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  type: string;
  contentHash: string;
  createdAt: Date;
};

function copyText(value: string, successMessage: string) {
  if (!navigator.clipboard) {
    toast.error("A cópia não é compatível com este navegador.");
    return;
  }
  navigator.clipboard.writeText(value)
    .then(() => toast.success(successMessage))
    .catch(() => toast.error("Não foi possível copiar. Tente novamente."));
}

function formatBytes(bytes: number | null): string {
  if (bytes === null) return "Indisponível";
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function formatTimestamp(value: Date | string) {
  return new Date(value).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function StatusBadge({ status, label }: { status: ValidationStatus; label: string }) {
  const config = {
    pass: { icon: CheckCircle2, text: "text-emerald-700 dark:text-emerald-400", background: "bg-emerald-50 dark:bg-emerald-950/30" },
    warning: { icon: AlertTriangle, text: "text-amber-700 dark:text-amber-300", background: "bg-amber-50 dark:bg-amber-950/30" },
    error: { icon: XCircle, text: "text-red-700 dark:text-red-300", background: "bg-red-50 dark:bg-red-950/30" },
  }[status];
  const Icon = config.icon;

  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${config.text} ${config.background}`}><Icon className="h-3.5 w-3.5" /> {label}</span>;
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
        <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400"><CheckCircle2 className="h-3.5 w-3.5" /> Tags ativas</span>
      </div>
      <img src={metadata.image} alt={metadata.imageAlt} width="1200" height="630" loading="eager" className="aspect-[1.91/1] w-full object-cover" />
      <div className="space-y-1.5 p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{host}</p>
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 dark:text-white">{metadata.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{metadata.description}</p>
      </div>
    </article>
  );
}

function ImageValidationCard({ audit, loading, onRefresh }: { audit?: ImageAudit; loading: boolean; onRefresh: () => void }) {
  const dimensions = audit?.width && audit?.height ? `${audit.width} × ${audit.height}px` : "Indisponível";
  const fileDetails = audit?.bytes !== null && audit?.bytes !== undefined ? `${formatBytes(audit.bytes)} · ${audit.format.toUpperCase()}` : "Indisponível";

  return (
    <Card className="border-slate-200 shadow-sm dark:border-slate-800">
      <CardHeader className="flex-row items-center justify-between gap-3 pb-3">
        <div>
          <CardTitle className="flex items-center gap-2 text-base"><ImageIcon className="h-4 w-4 text-[#9D602A]" /> Auditoria da imagem Open Graph</CardTitle>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Consulta segura feita no servidor; tamanho máximo operacional de 8 MB.</p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
          <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Atualizar
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex min-h-32 items-center justify-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin text-[#9D602A]" /> Verificando imagem configurada…</div>
        ) : !audit ? (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-muted-foreground dark:bg-slate-900">A auditoria ficará disponível ao selecionar uma URL pública.</p>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
              <div><p className="text-sm font-semibold">Resultado da verificação</p><p className="mt-0.5 text-xs text-muted-foreground">{audit.reachable ? "A imagem foi alcançada pelo servidor." : "A imagem não pôde ser verificada."}</p></div>
              <StatusBadge status={audit.overallStatus} label={audit.overallStatus === "pass" ? "Aprovada" : audit.overallStatus === "warning" ? "Revisar" : "Falhou"} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800"><div className="flex items-center gap-2"><Ruler className="h-4 w-4 text-[#9D602A]" /><span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dimensões</span></div><p className="mt-2 text-lg font-semibold">{dimensions}</p><p className="mt-1 text-xs text-muted-foreground">Padrão: {audit.expectedWidth} × {audit.expectedHeight}px</p><div className="mt-2"><StatusBadge status={audit.dimensionStatus} label={audit.dimensionStatus === "pass" ? "No padrão" : audit.dimensionStatus === "warning" ? "Fora do padrão" : "Não lidas"} /></div></div>
              <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800"><div className="flex items-center gap-2"><HardDriveDownload className="h-4 w-4 text-[#9D602A]" /><span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Arquivo</span></div><p className="mt-2 text-lg font-semibold">{fileDetails}</p><p className="mt-1 text-xs text-muted-foreground">Content-Type: {audit.contentType ?? "não informado"}</p><div className="mt-2"><StatusBadge status={audit.sizeStatus} label={audit.sizeStatus === "pass" ? "Dentro do limite" : audit.sizeStatus === "warning" ? "Revisar tamanho" : "Não verificado"} /></div></div>
            </div>
            <div className="space-y-1.5 rounded-lg border border-slate-200 p-3 text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-300">
              {audit.messages.map(message => <p key={message}>• {message}</p>)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MetadataHistoryCard({
  history,
  loading,
  error,
  selectedId,
  onSelect,
}: {
  history: HistoryEntry[];
  loading: boolean;
  error: unknown;
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  const selected = history.find(item => item.id === selectedId) ?? history[0];
  const current = history[0];
  const isCurrent = selected?.id === current?.id;

  return (
    <Card className="border-slate-200 shadow-sm dark:border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base"><History className="h-4 w-4 text-[#9D602A]" /> Histórico de versões</CardTitle>
        <p className="text-xs leading-relaxed text-muted-foreground">Uma nova versão é registrada automaticamente quando título, descrição, imagem, texto alternativo ou tipo Open Graph mudam.</p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex min-h-28 items-center justify-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin text-[#9D602A]" /> Carregando histórico…</div>
        ) : error ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-100">O histórico ainda não pôde ser lido. A prévia atual continua disponível; tente atualizar a página em instantes.</div>
        ) : history.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-muted-foreground dark:border-slate-700 dark:bg-slate-900">A primeira versão será salva ao carregar esta página com o banco disponível.</div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)]">
            <div className="space-y-2" aria-label="Versões registradas do metadado">
              {history.map((item, index) => {
                const selectedItem = item.id === selected?.id;
                return <button key={item.id} type="button" onClick={() => onSelect(item.id)} aria-pressed={selectedItem} className={`w-full rounded-xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-2 ${selectedItem ? "border-[#B87333] bg-[#B87333]/10" : "border-slate-200 hover:border-[#B87333]/45 dark:border-slate-800"}`}>
                  <span className="flex items-center justify-between gap-2"><span className="text-xs font-semibold text-[#85501F] dark:text-[#E6BC72]">{index === 0 ? "Versão atual" : `Versão anterior ${history.length - index}`}</span><ChevronRight className="h-4 w-4 text-muted-foreground" /></span>
                  <span className="mt-1 block text-xs text-muted-foreground"><Clock3 className="mr-1 inline h-3 w-3" />{formatTimestamp(item.createdAt)}</span>
                  <span className="mt-2 line-clamp-2 block text-sm font-medium">{item.title}</span>
                </button>;
              })}
            </div>
            {selected && <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
              <img src={selected.image} alt={selected.imageAlt} width="1200" height="630" loading="lazy" className="aspect-[1.91/1] w-full object-cover" />
              <div className="space-y-3 p-4">
                <div className="flex flex-wrap items-center gap-2"><StatusBadge status={isCurrent ? "pass" : "warning"} label={isCurrent ? "Versão vigente" : "Versão anterior"} /><span className="text-xs text-muted-foreground">{formatTimestamp(selected.createdAt)}</span></div>
                <div><p className="text-xs font-semibold text-[#9D602A]">Título</p><p className="mt-1 text-sm font-semibold leading-relaxed">{selected.title}</p></div>
                <div><p className="text-xs font-semibold text-[#9D602A]">Descrição</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{selected.description}</p></div>
                <div className="rounded-lg border border-slate-200 bg-white p-3 font-mono text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"><p><span className="font-semibold text-[#9D602A]">og:image:</span> {selected.image}</p><p className="mt-2"><span className="font-semibold text-[#9D602A]">og:type:</span> {selected.type}</p></div>
              </div>
            </div>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AccessDenied() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <Card className="w-full max-w-md border-slate-200 text-center shadow-lg dark:border-slate-800"><CardContent className="space-y-5 p-8"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#B87333]/10 text-[#9D602A]"><ShieldCheck className="h-6 w-6" /></span><div><h1 className="text-xl font-semibold">Acesso restrito</h1><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Esta ferramenta é exclusiva para administradores do site.</p></div><Button asChild variant="outline"><Link href="/">Voltar ao site</Link></Button></CardContent></Card>
    </main>
  );
}

export default function AdminSocialPreview() {
  const { user, loading: authLoading, isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const [inputPath, setInputPath] = useState("/vasectomia-sem-bisturi");
  const [selectedHistoryId, setSelectedHistoryId] = useState<number | null>(null);
  const normalizedPath = useMemo(() => normalizeSitePath(inputPath), [inputPath]);
  const preview = useMemo(() => getSocialPreviewData(inputPath), [inputPath]);
  const previewOpenUrl = preview ? `${window.location.origin}${preview.pathname}` : "";
  const isAdmin = isAuthenticated && user?.role === "admin";
  const historyQuery = trpc.socialPreview.history.useQuery({ path: normalizedPath }, { enabled: Boolean(preview && isAdmin), retry: false, refetchOnWindowFocus: false });
  const imageAuditQuery = trpc.socialPreview.imageAudit.useQuery({ path: normalizedPath }, { enabled: Boolean(preview && isAdmin), retry: false, refetchOnWindowFocus: false });
  const history = (historyQuery.data ?? []) as HistoryEntry[];

  useEffect(() => {
    setSelectedHistoryId(null);
  }, [normalizedPath]);

  useEffect(() => {
    if (!selectedHistoryId && history[0]) setSelectedHistoryId(history[0].id);
  }, [history, selectedHistoryId]);

  const metadataText = useMemo(() => {
    if (!preview) return "";
    const { metadata, canonicalUrl } = preview;
    return [`URL: ${canonicalUrl}`, `og:title: ${metadata.title}`, `og:description: ${metadata.description}`, `og:type: ${metadata.type}`, `og:image: ${metadata.image}`, `og:image:alt: ${metadata.imageAlt}`, "twitter:card: summary_large_image"].join("\n");
  }, [preview]);

  const facebookDebuggerUrl = preview ? `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(preview.canonicalUrl)}` : "";

  if (authLoading) return <main className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950"><Loader2 className="h-8 w-8 animate-spin text-[#B87333]" aria-label="Carregando ferramenta interna" /></main>;
  if (!isAdmin) return <AccessDenied />;

  return (
    <main className="min-h-screen bg-[#F7F5F2] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6"><div className="flex min-w-0 items-center gap-3"><Button asChild variant="ghost" size="icon" className="shrink-0" aria-label="Voltar ao site"><Link href="/"><ArrowLeft className="h-5 w-5" /></Link></Button><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#133456] text-[#E6BC72] shadow-sm"><Eye className="h-5 w-5" /></span><div className="min-w-0"><h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">Prévia social</h1><p className="hidden text-sm text-muted-foreground sm:block">Open Graph e Twitter Card antes da publicação</p></div></div><span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#B87333]/10 px-3 py-1.5 text-xs font-semibold text-[#85501F] dark:text-[#E6BC72]"><ShieldCheck className="h-3.5 w-3.5" /> Interno · não indexável</span></div></header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        <section className="rounded-2xl bg-[#133456] px-5 py-7 text-white shadow-lg sm:px-8 sm:py-9"><div className="max-w-3xl"><p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#E6BC72]"><Sparkles className="h-3.5 w-3.5" /> Controle de compartilhamento</p><h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Veja os dados sociais, o histórico e a imagem configurada.</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">A prévia usa o catálogo enviado pelo servidor. O histórico guarda somente versões técnicas dos metadados públicos, e a auditoria da imagem é feita de forma segura pelo backend.</p></div></section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm dark:border-slate-800"><CardHeader className="pb-4"><CardTitle className="flex items-center gap-2 text-base"><Link2 className="h-4 w-4 text-[#9D602A]" /> URL pública para testar</CardTitle></CardHeader><CardContent className="space-y-4"><div className="space-y-2"><label htmlFor="social-preview-path" className="text-sm font-medium">Caminho relativo do site</label><Input id="social-preview-path" value={inputPath} onChange={event => setInputPath(event.target.value)} placeholder="Ex.: /vasectomia-sem-bisturi" aria-describedby="social-preview-path-hint" className="font-mono text-sm" /><p id="social-preview-path-hint" className="text-xs leading-relaxed text-muted-foreground">Use apenas URLs públicas já cadastradas. Parâmetros de campanha são ignorados, como na canônica.</p></div><div className="flex flex-wrap gap-2" aria-label="Exemplos de páginas para pré-visualizar">{PRESET_PATHS.map(item => <button key={item.path} type="button" onClick={() => setInputPath(item.path)} aria-pressed={normalizedPath === item.path} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-2 ${normalizedPath === item.path ? "border-[#B87333] bg-[#B87333]/10 text-[#85501F] dark:text-[#E6BC72]" : "border-slate-200 bg-white text-slate-600 hover:border-[#B87333]/50 hover:text-[#85501F] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>{item.label}</button>)}</div></CardContent></Card>

            {preview ? <><Card className="border-slate-200 shadow-sm dark:border-slate-800"><CardHeader className="flex-row items-center justify-between gap-4 pb-3"><CardTitle className="flex items-center gap-2 text-base"><FileCode2 className="h-4 w-4 text-[#9D602A]" /> Dados entregues no HTML</CardTitle><Button type="button" variant="outline" size="sm" onClick={() => copyText(metadataText, "Metadados copiados")}><Clipboard className="mr-1.5 h-3.5 w-3.5" /> Copiar</Button></CardHeader><CardContent><div className="rounded-xl border border-slate-200 bg-slate-50 px-4 dark:border-slate-800 dark:bg-slate-950"><MetadataLine label="canonical" value={preview.canonicalUrl} /><MetadataLine label="og:title" value={preview.metadata.title} /><MetadataLine label="og:description" value={preview.metadata.description} /><MetadataLine label="og:type" value={preview.metadata.type} /><MetadataLine label="og:image" value={preview.metadata.image} /><MetadataLine label="og:image:alt" value={preview.metadata.imageAlt} /><MetadataLine label="twitter:card" value="summary_large_image" /></div><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Resumo técnico dos metadados"><div className="rounded-lg bg-slate-50 p-3 text-center dark:bg-slate-900"><p className="text-lg font-semibold">{preview.metadata.title.length}</p><p className="text-[11px] text-muted-foreground">caracteres no título</p></div><div className="rounded-lg bg-slate-50 p-3 text-center dark:bg-slate-900"><p className="text-lg font-semibold">{preview.metadata.description.length}</p><p className="text-[11px] text-muted-foreground">na descrição</p></div><div className="rounded-lg bg-slate-50 p-3 text-center dark:bg-slate-900"><p className="text-lg font-semibold capitalize">{preview.metadata.type}</p><p className="text-[11px] text-muted-foreground">tipo Open Graph</p></div><div className="rounded-lg bg-slate-50 p-3 text-center dark:bg-slate-900"><p className="text-lg font-semibold">{history.length}</p><p className="text-[11px] text-muted-foreground">versões registradas</p></div></div></CardContent></Card><ImageValidationCard audit={imageAuditQuery.data as ImageAudit | undefined} loading={imageAuditQuery.isLoading || imageAuditQuery.isFetching} onRefresh={() => void imageAuditQuery.refetch()} /><MetadataHistoryCard history={history} loading={historyQuery.isLoading} error={historyQuery.error} selectedId={selectedHistoryId} onSelect={setSelectedHistoryId} /></> : <Card className="border-amber-200 bg-amber-50 shadow-sm dark:border-amber-900/50 dark:bg-amber-950/20"><CardContent className="flex gap-3 p-5 text-sm leading-relaxed text-amber-900 dark:text-amber-100"><ImageIcon className="mt-0.5 h-5 w-5 shrink-0" /><div><strong>Essa URL não está disponível para prévia.</strong><br />Selecione uma rota pública indexável. Rotas administrativas, protótipos, redirecionamentos e páginas inexistentes são excluídos.</div></CardContent></Card>}
          </div>

          <div className="space-y-6"><Card className="overflow-hidden border-slate-200 shadow-sm dark:border-slate-800"><CardHeader className="border-b border-slate-100 bg-white pb-4 dark:border-slate-800 dark:bg-slate-950"><CardTitle className="flex items-center gap-2 text-base"><MessageCircle className="h-4 w-4 text-[#9D602A]" /> Como a página tende a aparecer no feed</CardTitle></CardHeader><CardContent className="grid gap-5 p-5 sm:grid-cols-2">{preview ? <><SocialCard network="Facebook" preview={preview} /><SocialCard network="LinkedIn" preview={preview} /><div className="sm:col-span-2"><SocialCard network="WhatsApp" preview={preview} compact /></div></> : <div className="sm:col-span-2 flex min-h-72 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-muted-foreground dark:border-slate-700 dark:bg-slate-900">Escolha uma URL pública para carregar a prévia social.</div>}</CardContent></Card>{preview && <><div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-950"><div className="min-w-0"><p className="font-medium">Abrir no ambiente atual</p><p className="truncate text-xs text-muted-foreground">{previewOpenUrl}</p></div><Button asChild variant="outline" size="sm"><a href={previewOpenUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Abrir</a></Button></div><div className="rounded-xl border border-[#1877F2]/25 bg-[#1877F2]/5 p-4 shadow-sm dark:bg-[#1877F2]/10"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="flex items-center gap-2 font-semibold"><Bug className="h-4 w-4 text-[#1877F2]" /> Facebook Sharing Debugger</p><p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground">Abre o depurador oficial com a URL canônica atual para conferir o cache e solicitar nova coleta do preview.</p></div><Button asChild className="bg-[#1877F2] text-white hover:bg-[#1466d0]"><a href={facebookDebuggerUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-1.5 h-4 w-4" /> Abrir depurador</a></Button></div></div></>}</div>
        </section>
      </div>
    </main>
  );
}
