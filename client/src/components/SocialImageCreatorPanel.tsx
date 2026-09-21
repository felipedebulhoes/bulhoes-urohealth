import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import {
  CheckCircle2,
  Clipboard,
  Crop,
  Download,
  ImagePlus,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type GeneratedOgImage = {
  url: string;
  key: string;
  width: number;
  height: number;
  bytes: number;
  format: "jpeg" | "png";
  source: "auto-crop" | "article-template";
};

function copyUrl(url: string) {
  if (!navigator.clipboard) {
    toast.error("A cópia não é compatível com este navegador.");
    return;
  }
  navigator.clipboard.writeText(url)
    .then(() => toast.success("URL da imagem copiada"))
    .catch(() => toast.error("Não foi possível copiar a URL."));
}

function GeneratedAsset({ asset, label }: { asset: GeneratedOgImage; label: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-950/15">
      <img src={asset.url} alt={label} width="1200" height="630" loading="lazy" className="aspect-[1.91/1] w-full object-cover" />
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 dark:text-emerald-300"><CheckCircle2 className="h-4 w-4" /> Pronta para `og:image`</span>
          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">{asset.width} × {asset.height} · {asset.format.toUpperCase()}</span>
        </div>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">A imagem foi salva em armazenamento permanente. Copie a URL ao atualizar o catálogo de metadados; nenhuma página pública é alterada automaticamente.</p>
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="outline" onClick={() => copyUrl(asset.url)}><Clipboard className="mr-1.5 h-3.5 w-3.5" /> Copiar URL</Button>
          <Button asChild type="button" size="sm" variant="outline"><a href={asset.url} target="_blank" rel="noopener noreferrer"><Download className="mr-1.5 h-3.5 w-3.5" /> Abrir imagem</a></Button>
        </div>
      </div>
    </div>
  );
}

export function SocialImageCreatorPanel({ path, defaultTitle }: { path: string; defaultTitle: string }) {
  const [articleTitle, setArticleTitle] = useState(defaultTitle);
  const cropMutation = trpc.socialPreview.cropImage.useMutation({
    onError: error => toast.error(error.message || "Não foi possível criar o corte."),
    onSuccess: () => toast.success("Corte 1200 × 630 criado com sucesso"),
  });
  const articleMutation = trpc.socialPreview.generateArticleImage.useMutation({
    onError: error => toast.error(error.message || "Não foi possível gerar a imagem."),
    onSuccess: () => toast.success("Imagem padrão para artigo criada"),
  });

  useEffect(() => {
    setArticleTitle(defaultTitle);
  }, [defaultTitle]);

  const createArticleImage = () => {
    const title = articleTitle.trim();
    if (title.length < 8) {
      toast.error("Informe um título público com pelo menos 8 caracteres.");
      return;
    }
    void articleMutation.mutateAsync({ title });
  };

  return (
    <Card className="border-slate-200 shadow-sm dark:border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base"><ImagePlus className="h-4 w-4 text-[#9D602A]" /> Criador de imagens Open Graph</CardTitle>
        <p className="text-xs leading-relaxed text-muted-foreground">Saídas padronizadas em 1200 × 630 px. Use apenas títulos públicos; não inclua informações de pacientes.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <section className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold"><Crop className="h-4 w-4 text-[#9D602A]" /> Corte automático da imagem atual</h3>
              <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground">Aplica o recorte de foco visual automático e converte a imagem configurada para JPEG 1200 × 630. Como é um corte, partes das bordas podem ser removidas.</p>
            </div>
            <Button type="button" onClick={() => void cropMutation.mutateAsync({ path })} disabled={cropMutation.isPending}>
              {cropMutation.isPending ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Crop className="mr-1.5 h-4 w-4" />} Criar corte
            </Button>
          </div>
          {cropMutation.data && <div className="mt-4"><GeneratedAsset asset={cropMutation.data} label="Corte automático Open Graph" /></div>}
        </section>

        <section className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-start gap-2"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#9D602A]" /><div><h3 className="text-sm font-semibold">Imagem padrão para novo artigo</h3><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Gera um banner tipográfico com a identidade visual do site e o título informado, sem usar IA para preservar a grafia exata.</p></div></div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <div className="flex-1"><label htmlFor="social-article-title" className="sr-only">Título público do artigo</label><Input id="social-article-title" value={articleTitle} maxLength={140} onChange={event => setArticleTitle(event.target.value)} placeholder="Título público do artigo" /><p className="mt-1.5 text-right text-xs text-muted-foreground">{articleTitle.length}/140</p></div>
            <Button type="button" onClick={createArticleImage} disabled={articleMutation.isPending || articleTitle.trim().length < 8}>
              {articleMutation.isPending ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <ImagePlus className="mr-1.5 h-4 w-4" />} Gerar banner
            </Button>
          </div>
          {articleMutation.data && <div className="mt-4"><GeneratedAsset asset={articleMutation.data} label={`Banner Open Graph: ${articleTitle}`} /></div>}
        </section>

        <p className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600 dark:bg-slate-900 dark:text-slate-300"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#9D602A]" /> Os arquivos são criados somente por administrador, a partir da imagem pública atualmente configurada ou de um título editorial informado. A ferramenta não modifica a página nem publica mudanças sem revisão.</p>
      </CardContent>
    </Card>
  );
}
