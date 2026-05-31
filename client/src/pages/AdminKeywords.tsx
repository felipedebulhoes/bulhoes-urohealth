import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useMemo, useCallback } from "react";
import { toast } from "sonner";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  Trash2,
  RefreshCw,
  Search,
  BarChart3,
  ArrowLeft,
  Loader2,
  Database,
  Eye,
  EyeOff,
  Download,
  Lightbulb,
  Sparkles,
  Star,
  FileText,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
  Heart,
  BookOpen,
} from "lucide-react";
import { Link } from "wouter";
import { Streamdown } from "streamdown";

type Category = "urologia" | "robotica" | "andrologia" | "all";
type SortField = "keyword" | "volume" | "difficulty" | "cpc" | "category";
type SortDir = "asc" | "desc";

const categoryLabels: Record<string, string> = {
  urologia: "Urologia",
  robotica: "Cirurgia Robótica",
  andrologia: "Andrologia",
  all: "Todas",
};

const categoryColors: Record<string, string> = {
  urologia: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  robotica: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  andrologia: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
};

const statusLabels: Record<string, string> = {
  pending: "Pendente",
  in_progress: "Em Progresso",
  published: "Publicado",
};

const statusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  in_progress: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  published: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
};

function TrendIcon({ trend }: { trend: string | null }) {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-500" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Minus className="w-4 h-4 text-gray-400" />;
}

function IntentBadge({ intent }: { intent: string | null }) {
  if (!intent) return null;
  const colors: Record<string, string> = {
    informational: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
    navigational: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    transactional: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    commercial: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[intent] || "bg-gray-100 text-gray-700"}`}>
      {intent}
    </span>
  );
}

function DifficultyBar({ difficulty }: { difficulty: number | null }) {
  if (difficulty === null) return <span className="text-muted-foreground">—</span>;

  const getColor = (d: number) => {
    if (d <= 20) return { bg: "bg-green-500", text: "text-green-700 dark:text-green-400", label: "Fácil" };
    if (d <= 40) return { bg: "bg-lime-500", text: "text-lime-700 dark:text-lime-400", label: "Moderada" };
    if (d <= 60) return { bg: "bg-amber-500", text: "text-amber-700 dark:text-amber-400", label: "Média" };
    if (d <= 80) return { bg: "bg-orange-500", text: "text-orange-700 dark:text-orange-400", label: "Difícil" };
    return { bg: "bg-red-500", text: "text-red-700 dark:text-red-400", label: "Muito Difícil" };
  };

  const { bg, text } = getColor(difficulty);

  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${bg}`} style={{ width: `${difficulty}%` }} />
      </div>
      <span className={`text-xs font-mono font-medium ${text} min-w-[24px] text-right`}>{difficulty}</span>
    </div>
  );
}

/** Sortable column header */
function SortHeader({ label, field, currentSort, currentDir, onSort }: {
  label: string;
  field: SortField;
  currentSort: SortField;
  currentDir: SortDir;
  onSort: (field: SortField) => void;
}) {
  const isActive = currentSort === field;
  return (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1 hover:text-foreground transition-colors font-medium"
    >
      {label}
      {isActive ? (
        currentDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-40" />
      )}
    </button>
  );
}

/** Generate article title templates */
function getArticleTemplates(keyword: string, category: string, intent: string | null): string[] {
  const kw = keyword.charAt(0).toUpperCase() + keyword.slice(1);
  const templates: string[] = [];

  if (intent === "informational" || !intent) {
    templates.push(`${kw}: Guia Completo do Urologista para Pacientes`);
    templates.push(`Tudo o que Você Precisa Saber sobre ${kw}`);
  }
  if (intent === "transactional" || intent === "commercial") {
    templates.push(`Quando Procurar um Especialista em ${kw}? Sinais de Alerta`);
    templates.push(`${kw}: Quanto Custa e Como Funciona o Tratamento`);
  }

  if (category === "robotica") {
    templates.push(`${kw}: Vantagens da Tecnologia Robótica vs. Cirurgia Convencional`);
    if (templates.length < 3) templates.push(`Recuperação Após ${kw}: O Que Esperar`);
  } else if (category === "andrologia") {
    templates.push(`${kw}: Mitos e Verdades que Todo Homem Deveria Saber`);
    if (templates.length < 3) templates.push(`${kw} em 2026: Novos Tratamentos e Evidências`);
  } else {
    templates.push(`${kw}: Diagnóstico, Tratamento e Prevenção`);
    if (templates.length < 3) templates.push(`5 Perguntas Frequentes sobre ${kw}`);
  }

  return templates.slice(0, 3);
}

export default function AdminKeywords() {
  const { user, loading: authLoading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [newKeyword, setNewKeyword] = useState("");
  const [newCategory, setNewCategory] = useState<"urologia" | "robotica" | "andrologia">("urologia");
  const [searchFilter, setSearchFilter] = useState("");
  const [sortField, setSortField] = useState<SortField>("volume");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [showIdeas, setShowIdeas] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);
  const [expandedDraft, setExpandedDraft] = useState<number | null>(null);
  const [generatingDraft, setGeneratingDraft] = useState<string | null>(null);

  // Queries
  const trackedQuery = trpc.keywords.listTracked.useQuery();
  const snapshotsQuery = trpc.keywords.getSnapshots.useQuery({ category: selectedCategory, limit: 200 });
  const favoritesQuery = trpc.keywords.listFavorites.useQuery();
  const draftsQuery = trpc.keywords.listDrafts.useQuery();

  // Mutations
  const addKeyword = trpc.keywords.addKeyword.useMutation({
    onSuccess: () => { toast.success("Keyword adicionada!"); trackedQuery.refetch(); setNewKeyword(""); },
    onError: (e) => toast.error(e.message),
  });

  const removeKeyword = trpc.keywords.removeKeyword.useMutation({
    onSuccess: () => { toast.success("Keyword removida!"); trackedQuery.refetch(); },
  });

  const toggleKeyword = trpc.keywords.toggleKeyword.useMutation({
    onSuccess: () => { trackedQuery.refetch(); },
  });

  const refreshData = trpc.keywords.refreshData.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        const successCount = data.results.filter((r) => r.success).length;
        const failCount = data.results.filter((r) => !r.success).length;
        toast.success(`Dados atualizados: ${successCount} ok, ${failCount} falhas`);
        snapshotsQuery.refetch();
      } else {
        toast.error(data.message || "Erro ao atualizar");
      }
    },
    onError: (e) => toast.error(e.message),
  });

  const seedDefaults = trpc.keywords.seedDefaults.useMutation({
    onSuccess: (data) => {
      toast.success(`${data.added} keywords adicionadas de ${data.total} padrão`);
      trackedQuery.refetch();
    },
    onError: (e) => toast.error(e.message),
  });

  const addFavorite = trpc.keywords.addFavorite.useMutation({
    onSuccess: () => { toast.success("Ideia favoritada!"); favoritesQuery.refetch(); },
    onError: (e) => toast.error(e.message),
  });

  const removeFavorite = trpc.keywords.removeFavorite.useMutation({
    onSuccess: () => { toast.success("Favorito removido!"); favoritesQuery.refetch(); },
  });

  const updateFavoriteStatus = trpc.keywords.updateFavoriteStatus.useMutation({
    onSuccess: () => { favoritesQuery.refetch(); },
  });

  const createDraft = trpc.keywords.createDraft.useMutation({
    onSuccess: (data) => {
      toast.success("Rascunho criado com sucesso!");
      draftsQuery.refetch();
      favoritesQuery.refetch();
      setGeneratingDraft(null);
      setExpandedDraft(data.id);
      setShowDrafts(true);
    },
    onError: (e) => { toast.error(e.message); setGeneratingDraft(null); },
  });

  const removeDraft = trpc.keywords.removeDraft.useMutation({
    onSuccess: () => { toast.success("Rascunho removido!"); draftsQuery.refetch(); },
  });

  // Group snapshots by keyword for the latest data
  const latestSnapshots = useMemo(() => {
    if (!snapshotsQuery.data) return [];
    const map = new Map<string, typeof snapshotsQuery.data[0]>();
    for (const s of snapshotsQuery.data) {
      if (!map.has(s.keyword)) map.set(s.keyword, s);
    }
    return Array.from(map.values());
  }, [snapshotsQuery.data]);

  // Sort and filter snapshots
  const filteredSnapshots = useMemo(() => {
    let data = latestSnapshots;
    if (searchFilter) {
      data = data.filter((s) => s.keyword.toLowerCase().includes(searchFilter.toLowerCase()));
    }
    // Sort
    data = [...data].sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "keyword": cmp = a.keyword.localeCompare(b.keyword); break;
        case "volume": cmp = (a.volume || 0) - (b.volume || 0); break;
        case "difficulty": cmp = (a.difficulty || 0) - (b.difficulty || 0); break;
        case "cpc": cmp = parseFloat(a.cpc || "0") - parseFloat(b.cpc || "0"); break;
        case "category": cmp = a.category.localeCompare(b.category); break;
      }
      return sortDir === "desc" ? -cmp : cmp;
    });
    return data;
  }, [latestSnapshots, searchFilter, sortField, sortDir]);

  // Handle sort toggle
  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => d === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }, [sortField]);

  // Article ideas
  const ideas = useMemo(() => {
    const sorted = [...latestSnapshots]
      .filter((s) => s.volume && s.volume > 0)
      .sort((a, b) => {
        const scoreA = (a.volume || 0) / ((a.difficulty || 50) + 1);
        const scoreB = (b.volume || 0) / ((b.difficulty || 50) + 1);
        return scoreB - scoreA;
      })
      .slice(0, 10);

    return sorted.map((s) => ({
      keyword: s.keyword,
      volume: s.volume,
      difficulty: s.difficulty,
      category: s.category,
      suggestions: getArticleTemplates(s.keyword, s.category, s.intent),
    }));
  }, [latestSnapshots]);

  // Check if a title is already favorited
  const isFavorited = useCallback((title: string) => {
    return favoritesQuery.data?.some((f) => f.title === title) || false;
  }, [favoritesQuery.data]);

  // Stats
  const stats = useMemo(() => {
    const total = trackedQuery.data?.length || 0;
    const active = trackedQuery.data?.filter((k) => k.active === "yes").length || 0;
    const withData = latestSnapshots.length;
    const trending = latestSnapshots.filter((s) => s.trend === "up").length;
    return { total, active, withData, trending };
  }, [trackedQuery.data, latestSnapshots]);

  // CSV Export
  const exportCSV = useCallback(() => {
    if (filteredSnapshots.length === 0) { toast.error("Nenhum dado para exportar"); return; }
    const headers = ["Keyword", "Categoria", "Volume", "Dificuldade", "CPC", "Intenção", "Tendência", "Variação (%)", "Data"];
    const rows = filteredSnapshots.map((s) => [
      s.keyword, categoryLabels[s.category] || s.category, s.volume?.toString() || "",
      s.difficulty?.toString() || "", s.cpc || "", s.intent || "", s.trend || "stable",
      s.trendChange || "", s.weekDate ? new Date(s.weekDate).toLocaleDateString("pt-BR") : "",
    ]);
    const csvContent = [headers.join(";"), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(";"))].join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `keywords-seo-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`${filteredSnapshots.length} keywords exportadas para CSV`);
  }, [filteredSnapshots]);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#b87333]" /></div>;
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-lg font-medium">Acesso restrito</p>
            <p className="text-muted-foreground mt-2">Apenas administradores podem acessar este painel.</p>
            <Link href="/"><Button variant="outline" className="mt-4"><ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao site</Button></Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <Link href="/"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Site</Button></Link>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#b87333]" />
                  Painel de Keywords SEO
                </h1>
                <p className="text-sm text-muted-foreground">Monitoramento semanal — Urologia, Robótica, Andrologia</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={exportCSV} disabled={filteredSnapshots.length === 0}>
                <Download className="w-4 h-4 mr-1" /> CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => seedDefaults.mutate()} disabled={seedDefaults.isPending}>
                <Database className="w-4 h-4 mr-1" /> {seedDefaults.isPending ? "..." : "Seed"}
              </Button>
              <Button size="sm" onClick={() => refreshData.mutate()} disabled={refreshData.isPending} className="bg-[#b87333] hover:bg-[#a0622d] text-white">
                <RefreshCw className={`w-4 h-4 mr-1 ${refreshData.isPending ? "animate-spin" : ""}`} />
                {refreshData.isPending ? "Atualizando..." : "Atualizar"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{stats.total}</p><p className="text-xs text-muted-foreground">Keywords</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-green-600">{stats.active}</p><p className="text-xs text-muted-foreground">Ativas</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">{stats.withData}</p><p className="text-xs text-muted-foreground">Com Dados</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-[#b87333]">{stats.trending}</p><p className="text-xs text-muted-foreground">Em Alta</p></CardContent></Card>
        </div>

        {/* Add Keyword */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Adicionar Keyword</CardTitle></CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <Input placeholder="Ex: prostatectomia robótica" value={newKeyword} onChange={(e) => setNewKeyword(e.target.value)} className="flex-1 min-w-[200px]"
                onKeyDown={(e) => { if (e.key === "Enter" && newKeyword.trim()) addKeyword.mutate({ keyword: newKeyword.trim(), category: newCategory }); }} />
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value as any)} className="border rounded-md px-3 py-2 text-sm bg-background">
                <option value="urologia">Urologia</option>
                <option value="robotica">Robótica</option>
                <option value="andrologia">Andrologia</option>
              </select>
              <Button onClick={() => { if (newKeyword.trim()) addKeyword.mutate({ keyword: newKeyword.trim(), category: newCategory }); }} disabled={addKeyword.isPending || !newKeyword.trim()}>
                <Plus className="w-4 h-4 mr-1" /> Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter + Search + Sort info */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex gap-1">
            {(["all", "urologia", "robotica", "andrologia"] as const).map((cat) => (
              <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} size="sm"
                onClick={() => setSelectedCategory(cat)} className={selectedCategory === cat ? "bg-[#b87333] hover:bg-[#a0622d] text-white" : ""}>
                {categoryLabels[cat]}
              </Button>
            ))}
          </div>
          <div className="flex-1 min-w-[200px] max-w-sm ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Filtrar keywords..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} className="pl-9" />
            </div>
          </div>
        </div>

        {/* Keywords Data Table with Sortable Headers */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Dados de Keywords ({filteredSnapshots.length})</span>
              <div className="hidden md:flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />Fácil</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-lime-500" />Moderada</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" />Média</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" />Difícil</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />Muito Difícil</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredSnapshots.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">Nenhum dado disponível</p>
                <p className="text-sm mt-1">Clique em "Seed" para adicionar keywords e depois "Atualizar" para coletar dados.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-3"><SortHeader label="Keyword" field="keyword" currentSort={sortField} currentDir={sortDir} onSort={handleSort} /></th>
                      <th className="text-left p-3"><SortHeader label="Categoria" field="category" currentSort={sortField} currentDir={sortDir} onSort={handleSort} /></th>
                      <th className="text-right p-3"><SortHeader label="Volume" field="volume" currentSort={sortField} currentDir={sortDir} onSort={handleSort} /></th>
                      <th className="text-left p-3 pl-4"><SortHeader label="Dificuldade" field="difficulty" currentSort={sortField} currentDir={sortDir} onSort={handleSort} /></th>
                      <th className="text-right p-3"><SortHeader label="CPC" field="cpc" currentSort={sortField} currentDir={sortDir} onSort={handleSort} /></th>
                      <th className="text-center p-3 font-medium">Intenção</th>
                      <th className="text-center p-3 font-medium">Tendência</th>
                      <th className="text-right p-3 font-medium">Variação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSnapshots.map((s) => (
                      <tr key={`${s.keyword}-${s.id}`} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-3 font-medium max-w-[200px] truncate">{s.keyword}</td>
                        <td className="p-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[s.category] || ""}`}>
                            {categoryLabels[s.category] || s.category}
                          </span>
                        </td>
                        <td className="p-3 text-right font-mono">{s.volume ? s.volume.toLocaleString("pt-BR") : "—"}</td>
                        <td className="p-3 pl-4"><DifficultyBar difficulty={s.difficulty} /></td>
                        <td className="p-3 text-right font-mono">{s.cpc ? `$${parseFloat(s.cpc).toFixed(2)}` : "—"}</td>
                        <td className="p-3 text-center"><IntentBadge intent={s.intent} /></td>
                        <td className="p-3 text-center"><TrendIcon trend={s.trend} /></td>
                        <td className="p-3 text-right font-mono text-xs">
                          {s.trendChange ? (
                            <span className={parseFloat(s.trendChange) > 0 ? "text-green-600" : parseFloat(s.trendChange) < 0 ? "text-red-600" : ""}>
                              {parseFloat(s.trendChange) > 0 ? "+" : ""}{s.trendChange}%
                            </span>
                          ) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Article Ideas Generator */}
        {ideas.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Gerador de Ideias de Artigos
                </span>
                <Button variant="outline" size="sm" onClick={() => setShowIdeas(!showIdeas)}>
                  <Sparkles className="w-4 h-4 mr-1" />
                  {showIdeas ? "Ocultar" : "Gerar Ideias"}
                </Button>
              </CardTitle>
            </CardHeader>
            {showIdeas && (
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground mb-4">
                  Sugestões baseadas nas keywords com melhor relação volume/dificuldade. Clique em <Star className="w-3 h-3 inline text-amber-500" /> para favoritar ou <FileText className="w-3 h-3 inline text-blue-500" /> para gerar rascunho.
                </p>
                <div className="space-y-4">
                  {ideas.map((idea, idx) => (
                    <div key={idx} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[idea.category] || ""}`}>
                            {categoryLabels[idea.category] || idea.category}
                          </span>
                          <span className="text-sm font-medium">{idea.keyword}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>Vol: {idea.volume?.toLocaleString("pt-BR")}</span>
                          <span>Dif: {idea.difficulty || "?"}</span>
                        </div>
                      </div>
                      <div className="space-y-2 ml-2">
                        {idea.suggestions.map((title, i) => (
                          <div key={i} className="flex items-center justify-between gap-2 group">
                            <div className="flex items-start gap-2 flex-1">
                              <span className="text-[#b87333] mt-0.5">•</span>
                              <span className="text-sm">{title}</span>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                disabled={isFavorited(title)}
                                onClick={() => addFavorite.mutate({
                                  keyword: idea.keyword,
                                  category: idea.category,
                                  title,
                                  volume: idea.volume,
                                  difficulty: idea.difficulty,
                                })}
                                title={isFavorited(title) ? "Já favoritado" : "Favoritar ideia"}
                              >
                                <Star className={`w-4 h-4 ${isFavorited(title) ? "fill-amber-500 text-amber-500" : "text-amber-500"}`} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                disabled={generatingDraft === title || createDraft.isPending}
                                onClick={() => {
                                  setGeneratingDraft(title);
                                  createDraft.mutate({
                                    keyword: idea.keyword,
                                    category: idea.category,
                                    title,
                                  });
                                }}
                                title="Criar rascunho do artigo"
                              >
                                {generatingDraft === title ? (
                                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                                ) : (
                                  <FileText className="w-4 h-4 text-blue-500" />
                                )}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Favorites Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                Ideias Favoritadas ({favoritesQuery.data?.length || 0})
              </span>
              <Button variant="outline" size="sm" onClick={() => setShowFavorites(!showFavorites)}>
                {showFavorites ? "Ocultar" : "Ver Favoritos"}
              </Button>
            </CardTitle>
          </CardHeader>
          {showFavorites && (
            <CardContent className="pt-0">
              {!favoritesQuery.data || favoritesQuery.data.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhuma ideia favoritada. Use o <Star className="w-3 h-3 inline text-amber-500" /> nas sugestões acima para salvar.
                </p>
              ) : (
                <div className="space-y-2">
                  {favoritesQuery.data.map((fav) => (
                    <div key={fav.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[fav.category] || ""}`}>
                            {categoryLabels[fav.category] || fav.category}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[fav.status]}`}>
                            {statusLabels[fav.status]}
                          </span>
                        </div>
                        <p className="text-sm font-medium">{fav.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Keyword: {fav.keyword} | Vol: {fav.volume?.toLocaleString("pt-BR") || "?"} | Dif: {fav.difficulty || "?"}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 ml-3">
                        <select
                          value={fav.status}
                          onChange={(e) => updateFavoriteStatus.mutate({ id: fav.id, status: e.target.value as any })}
                          className="text-xs border rounded px-2 py-1 bg-background"
                        >
                          <option value="pending">Pendente</option>
                          <option value="in_progress">Em Progresso</option>
                          <option value="published">Publicado</option>
                        </select>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          disabled={createDraft.isPending}
                          onClick={() => {
                            setGeneratingDraft(fav.title);
                            createDraft.mutate({
                              keyword: fav.keyword,
                              category: fav.category,
                              title: fav.title,
                              favoriteId: fav.id,
                            });
                          }}
                          title="Criar rascunho"
                        >
                          {generatingDraft === fav.title ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <FileText className="w-4 h-4 text-blue-500" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"
                          onClick={() => { if (confirm(`Remover "${fav.title}" dos favoritos?`)) removeFavorite.mutate({ id: fav.id }); }}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>

        {/* Drafts Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-500" />
                Rascunhos Gerados ({draftsQuery.data?.length || 0})
              </span>
              <Button variant="outline" size="sm" onClick={() => setShowDrafts(!showDrafts)}>
                {showDrafts ? "Ocultar" : "Ver Rascunhos"}
              </Button>
            </CardTitle>
          </CardHeader>
          {showDrafts && (
            <CardContent className="pt-0">
              {!draftsQuery.data || draftsQuery.data.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhum rascunho gerado. Use o <FileText className="w-3 h-3 inline text-blue-500" /> nas ideias para criar.
                </p>
              ) : (
                <div className="space-y-3">
                  {draftsQuery.data.map((draft) => (
                    <div key={draft.id} className="border rounded-lg overflow-hidden">
                      <div
                        className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/30 transition-colors"
                        onClick={() => setExpandedDraft(expandedDraft === draft.id ? null : draft.id)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[draft.category] || ""}`}>
                              {categoryLabels[draft.category] || draft.category}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(draft.createdAt).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                          <p className="text-sm font-medium">{draft.title}</p>
                        </div>
                        <div className="flex items-center gap-1 ml-3">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0"
                            onClick={(e) => { e.stopPropagation(); if (confirm("Remover rascunho?")) removeDraft.mutate({ id: draft.id }); }}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                          {expandedDraft === draft.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                      {expandedDraft === draft.id && (
                        <div className="border-t p-4 bg-muted/10 max-h-[500px] overflow-y-auto prose prose-sm dark:prose-invert max-w-none">
                          <Streamdown>{draft.content}</Streamdown>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>

        {/* Tracked Keywords Management */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Keywords Rastreadas ({trackedQuery.data?.length || 0})</CardTitle></CardHeader>
          <CardContent className="p-0">
            {trackedQuery.isLoading ? (
              <div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
            ) : trackedQuery.data && trackedQuery.data.length > 0 ? (
              <div className="divide-y max-h-[400px] overflow-y-auto">
                {trackedQuery.data.map((kw) => (
                  <div key={kw.id} className="flex items-center justify-between p-3 hover:bg-muted/30">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[kw.category] || ""}`}>
                        {categoryLabels[kw.category] || kw.category}
                      </span>
                      <span className={`text-sm ${kw.active === "no" ? "line-through text-muted-foreground" : ""}`}>{kw.keyword}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => toggleKeyword.mutate({ id: kw.id, active: kw.active === "yes" ? "no" : "yes" })} title={kw.active === "yes" ? "Desativar" : "Ativar"}>
                        {kw.active === "yes" ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => { if (confirm(`Remover "${kw.keyword}"?`)) removeKeyword.mutate({ id: kw.id }); }}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground"><p>Nenhuma keyword cadastrada. Clique em "Seed" para começar.</p></div>
            )}
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="border-dashed">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">
              <strong>Fonte dos dados:</strong> SimilarWeb Keywords Overview API. Dados coletados semanalmente.
              Clique nos cabeçalhos da tabela para ordenar. O CSV usa separador ";" com BOM UTF-8 para Excel.
              Rascunhos são gerados via IA com conteúdo médico otimizado para SEO.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
