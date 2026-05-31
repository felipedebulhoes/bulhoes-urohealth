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
} from "lucide-react";
import { Link } from "wouter";

type Category = "urologia" | "robotica" | "andrologia" | "all";

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

/** Visual difficulty bar with color gradient */
function DifficultyBar({ difficulty }: { difficulty: number | null }) {
  if (difficulty === null) return <span className="text-muted-foreground">—</span>;

  const getColor = (d: number) => {
    if (d <= 20) return { bg: "bg-green-500", text: "text-green-700 dark:text-green-400", label: "Fácil" };
    if (d <= 40) return { bg: "bg-lime-500", text: "text-lime-700 dark:text-lime-400", label: "Moderada" };
    if (d <= 60) return { bg: "bg-amber-500", text: "text-amber-700 dark:text-amber-400", label: "Média" };
    if (d <= 80) return { bg: "bg-orange-500", text: "text-orange-700 dark:text-orange-400", label: "Difícil" };
    return { bg: "bg-red-500", text: "text-red-700 dark:text-red-400", label: "Muito Difícil" };
  };

  const { bg, text, label } = getColor(difficulty);

  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${bg}`}
          style={{ width: `${difficulty}%` }}
        />
      </div>
      <span className={`text-xs font-mono font-medium ${text} min-w-[24px] text-right`}>
        {difficulty}
      </span>
    </div>
  );
}

/** Blog article idea generator based on top keywords */
function ArticleIdeasSection({ snapshots }: { snapshots: Array<{ keyword: string; volume: number | null; difficulty: number | null; category: string; intent: string | null }> }) {
  const [showIdeas, setShowIdeas] = useState(false);

  const ideas = useMemo(() => {
    // Sort by volume (highest first), then by lowest difficulty (best opportunities)
    const sorted = [...snapshots]
      .filter((s) => s.volume && s.volume > 0)
      .sort((a, b) => {
        // Score = volume / (difficulty + 1) — higher is better opportunity
        const scoreA = (a.volume || 0) / ((a.difficulty || 50) + 1);
        const scoreB = (b.volume || 0) / ((b.difficulty || 50) + 1);
        return scoreB - scoreA;
      })
      .slice(0, 10);

    return sorted.map((s) => {
      const templates = getArticleTemplates(s.keyword, s.category, s.intent);
      return {
        keyword: s.keyword,
        volume: s.volume,
        difficulty: s.difficulty,
        category: s.category,
        suggestions: templates,
      };
    });
  }, [snapshots]);

  if (ideas.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Gerador de Ideias de Artigos
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowIdeas(!showIdeas)}
          >
            <Sparkles className="w-4 h-4 mr-1" />
            {showIdeas ? "Ocultar" : "Gerar Ideias"}
          </Button>
        </CardTitle>
      </CardHeader>
      {showIdeas && (
        <CardContent className="pt-0">
          <p className="text-xs text-muted-foreground mb-4">
            Sugestões baseadas nas keywords com melhor relação volume/dificuldade (melhores oportunidades de ranqueamento).
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
                <div className="space-y-1.5 ml-2">
                  {idea.suggestions.map((title, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#b87333] mt-0.5">•</span>
                      <span className="text-sm">{title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

/** Generate article title templates based on keyword, category and intent */
function getArticleTemplates(keyword: string, category: string, intent: string | null): string[] {
  const kw = keyword.charAt(0).toUpperCase() + keyword.slice(1);
  const templates: string[] = [];

  // Intent-based templates
  if (intent === "informational" || !intent) {
    templates.push(`${kw}: Guia Completo do Urologista para Pacientes`);
    templates.push(`Tudo o que Você Precisa Saber sobre ${kw}`);
  }
  if (intent === "transactional" || intent === "commercial") {
    templates.push(`Quando Procurar um Especialista em ${kw}? Sinais de Alerta`);
    templates.push(`${kw}: Quanto Custa e Como Funciona o Tratamento`);
  }

  // Category-based templates
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

  // Queries
  const trackedQuery = trpc.keywords.listTracked.useQuery();
  const snapshotsQuery = trpc.keywords.getSnapshots.useQuery({ category: selectedCategory, limit: 200 });

  // Mutations
  const addKeyword = trpc.keywords.addKeyword.useMutation({
    onSuccess: () => {
      toast.success("Keyword adicionada!");
      trackedQuery.refetch();
      setNewKeyword("");
    },
    onError: (e) => toast.error(e.message),
  });

  const removeKeyword = trpc.keywords.removeKeyword.useMutation({
    onSuccess: () => {
      toast.success("Keyword removida!");
      trackedQuery.refetch();
    },
  });

  const toggleKeyword = trpc.keywords.toggleKeyword.useMutation({
    onSuccess: () => {
      trackedQuery.refetch();
    },
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

  // Group snapshots by keyword for the latest data
  const latestSnapshots = useMemo(() => {
    if (!snapshotsQuery.data) return [];
    const map = new Map<string, typeof snapshotsQuery.data[0]>();
    for (const s of snapshotsQuery.data) {
      if (!map.has(s.keyword)) map.set(s.keyword, s);
    }
    return Array.from(map.values());
  }, [snapshotsQuery.data]);

  // Filter snapshots
  const filteredSnapshots = useMemo(() => {
    if (!searchFilter) return latestSnapshots;
    return latestSnapshots.filter((s) =>
      s.keyword.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [latestSnapshots, searchFilter]);

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
    if (filteredSnapshots.length === 0) {
      toast.error("Nenhum dado para exportar");
      return;
    }

    const headers = ["Keyword", "Categoria", "Volume", "Dificuldade", "CPC", "Intenção", "Tendência", "Variação (%)", "Data"];
    const rows = filteredSnapshots.map((s) => [
      s.keyword,
      categoryLabels[s.category] || s.category,
      s.volume?.toString() || "",
      s.difficulty?.toString() || "",
      s.cpc || "",
      s.intent || "",
      s.trend || "stable",
      s.trendChange || "",
      s.weekDate ? new Date(s.weekDate).toLocaleDateString("pt-BR") : "",
    ]);

    const csvContent = [
      headers.join(";"),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(";")),
    ].join("\n");

    // BOM for Excel UTF-8 compatibility
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#b87333]" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-lg font-medium">Acesso restrito</p>
            <p className="text-muted-foreground mt-2">Apenas administradores podem acessar este painel.</p>
            <Link href="/">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao site
              </Button>
            </Link>
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
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Site
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#b87333]" />
                  Painel de Keywords SEO
                </h1>
                <p className="text-sm text-muted-foreground">
                  Monitoramento semanal de palavras-chave — Urologia, Robótica, Andrologia
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={exportCSV}
                disabled={filteredSnapshots.length === 0}
              >
                <Download className="w-4 h-4 mr-1" />
                Exportar CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => seedDefaults.mutate()}
                disabled={seedDefaults.isPending}
              >
                <Database className="w-4 h-4 mr-1" />
                {seedDefaults.isPending ? "Adicionando..." : "Seed Padrão"}
              </Button>
              <Button
                size="sm"
                onClick={() => refreshData.mutate()}
                disabled={refreshData.isPending}
                className="bg-[#b87333] hover:bg-[#a0622d] text-white"
              >
                <RefreshCw className={`w-4 h-4 mr-1 ${refreshData.isPending ? "animate-spin" : ""}`} />
                {refreshData.isPending ? "Atualizando..." : "Atualizar Dados"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Keywords Rastreadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              <p className="text-xs text-muted-foreground">Ativas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.withData}</p>
              <p className="text-xs text-muted-foreground">Com Dados</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[#b87333]">{stats.trending}</p>
              <p className="text-xs text-muted-foreground">Em Alta</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Keyword */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Adicionar Keyword</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <Input
                placeholder="Ex: prostatectomia robótica"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                className="flex-1 min-w-[200px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newKeyword.trim()) {
                    addKeyword.mutate({ keyword: newKeyword.trim(), category: newCategory });
                  }
                }}
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="border rounded-md px-3 py-2 text-sm bg-background"
              >
                <option value="urologia">Urologia</option>
                <option value="robotica">Robótica</option>
                <option value="andrologia">Andrologia</option>
              </select>
              <Button
                onClick={() => {
                  if (newKeyword.trim()) {
                    addKeyword.mutate({ keyword: newKeyword.trim(), category: newCategory });
                  }
                }}
                disabled={addKeyword.isPending || !newKeyword.trim()}
              >
                <Plus className="w-4 h-4 mr-1" /> Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter + Search */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex gap-1">
            {(["all", "urologia", "robotica", "andrologia"] as const).map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? "bg-[#b87333] hover:bg-[#a0622d] text-white" : ""}
              >
                {categoryLabels[cat]}
              </Button>
            ))}
          </div>
          <div className="flex-1 min-w-[200px] max-w-sm ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Filtrar keywords..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        {/* Keywords Data Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Dados de Keywords ({filteredSnapshots.length})</span>
              <div className="flex items-center gap-2">
                {snapshotsQuery.isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {/* Difficulty Legend */}
                <div className="hidden md:flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />Fácil</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-lime-500" />Moderada</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" />Média</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" />Difícil</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />Muito Difícil</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredSnapshots.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">Nenhum dado disponível</p>
                <p className="text-sm mt-1">
                  Clique em "Seed Padrão" para adicionar keywords e depois "Atualizar Dados" para coletar informações.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-medium">Keyword</th>
                      <th className="text-left p-3 font-medium">Categoria</th>
                      <th className="text-right p-3 font-medium">Volume</th>
                      <th className="text-left p-3 font-medium pl-4">Dificuldade</th>
                      <th className="text-right p-3 font-medium">CPC</th>
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
                        <td className="p-3 text-right font-mono">
                          {s.volume ? s.volume.toLocaleString("pt-BR") : "—"}
                        </td>
                        <td className="p-3 pl-4">
                          <DifficultyBar difficulty={s.difficulty} />
                        </td>
                        <td className="p-3 text-right font-mono">
                          {s.cpc ? `$${parseFloat(s.cpc).toFixed(2)}` : "—"}
                        </td>
                        <td className="p-3 text-center">
                          <IntentBadge intent={s.intent} />
                        </td>
                        <td className="p-3 text-center">
                          <TrendIcon trend={s.trend} />
                        </td>
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
        <ArticleIdeasSection snapshots={filteredSnapshots} />

        {/* Tracked Keywords Management */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Keywords Rastreadas ({trackedQuery.data?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {trackedQuery.isLoading ? (
              <div className="p-8 text-center">
                <Loader2 className="w-6 h-6 animate-spin mx-auto" />
              </div>
            ) : trackedQuery.data && trackedQuery.data.length > 0 ? (
              <div className="divide-y max-h-[400px] overflow-y-auto">
                {trackedQuery.data.map((kw) => (
                  <div key={kw.id} className="flex items-center justify-between p-3 hover:bg-muted/30">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[kw.category] || ""}`}>
                        {categoryLabels[kw.category] || kw.category}
                      </span>
                      <span className={`text-sm ${kw.active === "no" ? "line-through text-muted-foreground" : ""}`}>
                        {kw.keyword}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleKeyword.mutate({ id: kw.id, active: kw.active === "yes" ? "no" : "yes" })}
                        title={kw.active === "yes" ? "Desativar" : "Ativar"}
                      >
                        {kw.active === "yes" ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (confirm(`Remover "${kw.keyword}"?`)) {
                            removeKeyword.mutate({ id: kw.id });
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <p>Nenhuma keyword cadastrada. Clique em "Seed Padrão" para começar.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="border-dashed">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">
              <strong>Fonte dos dados:</strong> SimilarWeb Keywords Overview API (volume global, dificuldade orgânica, CPC, intenção de busca).
              Os dados são coletados semanalmente via job automático. Use "Atualizar Dados" para forçar uma coleta manual.
              A tendência é calculada comparando o volume atual com o snapshot anterior.
              O CSV exportado usa separador ";" e encoding UTF-8 com BOM para compatibilidade com Excel.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
