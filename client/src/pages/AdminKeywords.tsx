import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
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
          <div className="flex items-center justify-between">
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
            <div className="flex gap-2">
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
              {snapshotsQuery.isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
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
                      <th className="text-right p-3 font-medium">Dificuldade</th>
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
                        <td className="p-3 text-right">
                          {s.difficulty !== null ? (
                            <span className={`font-mono ${
                              s.difficulty > 70 ? "text-red-600" :
                              s.difficulty > 40 ? "text-amber-600" :
                              "text-green-600"
                            }`}>
                              {s.difficulty}
                            </span>
                          ) : "—"}
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
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
