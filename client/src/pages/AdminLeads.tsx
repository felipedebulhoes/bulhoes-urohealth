import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import {
  Users, Phone, Mail, MapPin, MessageSquare, Clock, ArrowLeft,
  Loader2, CheckCircle2, PhoneCall, CalendarCheck, CircleDot,
  ChevronDown, ChevronUp, Search, Filter
} from "lucide-react";
import { Link } from "wouter";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  new: { label: "Novo", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: <CircleDot className="w-3.5 h-3.5" /> },
  contacted: { label: "Contatado", color: "text-amber-700", bg: "bg-amber-50 border-amber-200", icon: <PhoneCall className="w-3.5 h-3.5" /> },
  scheduled: { label: "Agendado", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", icon: <CalendarCheck className="w-3.5 h-3.5" /> },
  completed: { label: "Concluído", color: "text-gray-600", bg: "bg-gray-50 border-gray-200", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
};

const STATUS_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "new", label: "Novos" },
  { value: "contacted", label: "Contatados" },
  { value: "scheduled", label: "Agendados" },
  { value: "completed", label: "Concluídos" },
];

const LOCATION_MAP: Record<string, string> = {
  campinas: "Campinas Day Hospital",
  "sp-paulista": "Clinovi Paulista",
  "sp-moema": "Clinovi Moema",
};

function formatDate(dateStr: string | Date): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

export default function AdminLeads() {
  const { user, loading: authLoading, isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLead, setExpandedLead] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const queryInput = statusFilter ? { status: statusFilter as "new" | "contacted" | "scheduled" | "completed" } : undefined;
  const { data: leads, isLoading, refetch } = trpc.ai.listLeads.useQuery(queryInput, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const updateStatus = trpc.ai.updateLeadStatus.useMutation({
    onSuccess: () => {
      refetch();
      setUpdatingId(null);
    },
    onError: () => {
      setUpdatingId(null);
    },
  });

  const handleStatusChange = (leadId: number, newStatus: string) => {
    setUpdatingId(leadId);
    updateStatus.mutate({ id: leadId, status: newStatus as "new" | "contacted" | "scheduled" | "completed" });
  };

  // Filter leads by search query
  const filteredLeads = leads?.filter((lead: any) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      lead.name?.toLowerCase().includes(q) ||
      lead.phone?.toLowerCase().includes(q) ||
      lead.email?.toLowerCase().includes(q) ||
      lead.reason?.toLowerCase().includes(q)
    );
  });

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  // Not admin
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-500 mb-4">Esta página é restrita a administradores.</p>
          <Link href="/" className="text-teal-600 hover:underline">Voltar ao site</Link>
        </div>
      </div>
    );
  }

  const stats = {
    total: leads?.length || 0,
    new: leads?.filter((l: any) => l.status === "new").length || 0,
    contacted: leads?.filter((l: any) => l.status === "contacted").length || 0,
    scheduled: leads?.filter((l: any) => l.status === "scheduled").length || 0,
    completed: leads?.filter((l: any) => l.status === "completed").length || 0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-600" />
                Painel de Leads
              </h1>
              <p className="text-sm text-gray-500">Contatos captados pelo assistente virtual</p>
            </div>
          </div>
          <Link href="/admin/files">
            <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
              Gerenciar Arquivos →
            </button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { label: "Total", value: stats.total, color: "bg-gray-100 text-gray-700" },
            { label: "Novos", value: stats.new, color: "bg-blue-50 text-blue-700" },
            { label: "Contatados", value: stats.contacted, color: "bg-amber-50 text-amber-700" },
            { label: "Agendados", value: stats.scheduled, color: "bg-emerald-50 text-emerald-700" },
            { label: "Concluídos", value: stats.completed, color: "bg-gray-50 text-gray-600" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-xl p-4 ${stat.color} border border-gray-200`}>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, telefone, email ou motivo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none cursor-pointer"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Leads List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          </div>
        ) : !filteredLeads || filteredLeads.length === 0 ? (
          <div className="text-center py-20">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Nenhum lead encontrado</h3>
            <p className="text-gray-500">
              {searchQuery || statusFilter
                ? "Tente ajustar os filtros de busca."
                : "Quando pacientes deixarem seus dados no chat, eles aparecerão aqui."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLeads.map((lead: any) => {
              const statusCfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
              const isExpanded = expandedLead === lead.id;

              return (
                <div
                  key={lead.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow"
                >
                  {/* Lead Summary */}
                  <button
                    onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${statusCfg.bg} border`}>
                        <span className={statusCfg.color}>{statusCfg.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900 truncate">{lead.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${statusCfg.bg} ${statusCfg.color} font-medium`}>
                            {statusCfg.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5" />
                            {formatPhone(lead.phone)}
                          </span>
                          {lead.preferredLocation && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {LOCATION_MAP[lead.preferredLocation] || lead.preferredLocation}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {formatDate(lead.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Contact Info */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Informações de Contato</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-4 h-4 text-teal-600" />
                              <a href={`tel:${lead.phone}`} className="text-teal-600 hover:underline font-medium">
                                {formatPhone(lead.phone)}
                              </a>
                            </div>
                            {lead.email && (
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-teal-600" />
                                <a href={`mailto:${lead.email}`} className="text-teal-600 hover:underline">
                                  {lead.email}
                                </a>
                              </div>
                            )}
                            {lead.preferredLocation && (
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700">{LOCATION_MAP[lead.preferredLocation] || lead.preferredLocation}</span>
                              </div>
                            )}
                            {lead.reason && (
                              <div className="flex items-start gap-2 text-sm">
                                <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5" />
                                <span className="text-gray-700">{lead.reason}</span>
                              </div>
                            )}
                          </div>

                          {/* Quick Actions */}
                          <div className="flex gap-2 pt-2">
                            <a
                              href={`https://wa.me/55${lead.phone.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors border border-green-200"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              WhatsApp
                            </a>
                            <a
                              href={`tel:${lead.phone}`}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-200"
                            >
                              <PhoneCall className="w-3.5 h-3.5" />
                              Ligar
                            </a>
                            {lead.email && (
                              <a
                                href={`mailto:${lead.email}`}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors border border-purple-200"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                Email
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Status Update */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Atualizar Status</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                              <button
                                key={key}
                                onClick={() => handleStatusChange(lead.id, key)}
                                disabled={lead.status === key || updatingId === lead.id}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                                  lead.status === key
                                    ? `${cfg.bg} ${cfg.color} border-current opacity-100`
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                } ${updatingId === lead.id ? "opacity-50 cursor-not-allowed" : ""}`}
                              >
                                {updatingId === lead.id ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  cfg.icon
                                )}
                                {cfg.label}
                              </button>
                            ))}
                          </div>

                          {/* Chat History */}
                          {lead.chatHistory && (
                            <div className="mt-3">
                              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Histórico do Chat</h4>
                              <div className="bg-gray-50 rounded-lg p-3 max-h-48 overflow-y-auto text-sm text-gray-600 whitespace-pre-wrap border border-gray-200">
                                {lead.chatHistory}
                              </div>
                            </div>
                          )}

                          {/* Notes */}
                          {lead.notes && (
                            <div className="mt-2">
                              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">Notas</h4>
                              <p className="text-sm text-gray-600">{lead.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
