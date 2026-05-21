/*
 * Design: Clinical Precision — Swiss Medical Design
 * AI Chat Widget — Assistente Virtual Urológico com Coleta de Leads
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  X,
  Send,
  Loader2,
  Sparkles,
  User,
  RotateCcw,
  CheckCircle2,
  Phone,
  UserCircle,
  MapPin,
  FileText,
  Mail,
  CalendarCheck,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { trackLeadGenerated, trackChatOpen } from "@/lib/analytics";
import { Streamdown } from "streamdown";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type LeadFormData = {
  name: string;
  phone: string;
  email: string;
  reason: string;
  preferredLocation: string;
};

type WidgetView = "chat" | "lead-form" | "lead-success";

const suggestedQuestions = [
  "Como funciona a cirurgia robótica?",
  "Quando devo procurar um urologista?",
  "Como é a biópsia de próstata?",
  "Quero agendar uma consulta",
];

const SCHEDULING_KEYWORDS = [
  "agendar",
  "agendamento",
  "consulta",
  "marcar",
  "horário",
  "horario",
  "disponibilidade",
  "atendimento",
  "quero consultar",
  "preciso de consulta",
  "ligar",
  "contato",
  "telefone",
];

function detectSchedulingIntent(messages: ChatMessage[]): boolean {
  const recentMessages = messages.slice(-4);
  return recentMessages.some(
    (msg) =>
      msg.role === "user" &&
      SCHEDULING_KEYWORDS.some((kw) => msg.content.toLowerCase().includes(kw))
  );
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [view, setView] = useState<WidgetView>("chat");
  const [showLeadBanner, setShowLeadBanner] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    phone: "",
    email: "",
    reason: "",
    preferredLocation: "",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const chatMutation = trpc.ai.sendMessage.useMutation({
    onSuccess: (response) => {
      setMessages((prev) => [...prev, { role: "assistant", content: response.content }]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Desculpe, estou com dificuldades técnicas. Envie uma mensagem pelo WhatsApp: (11) 98112-4455, ou ligue para agendar: Clinovi (11) 3382-1529 | Campinas Day Hospital (19) 2127-2900 | São Luiz Campinas (19) 3014-3000. WhatsApp Campinas: (19) 99855-9890.",
        },
      ]);
    },
  });

  const leadMutation = trpc.ai.submitLead.useMutation({
    onSuccess: (result) => {
      if (result.success) {
        setView("lead-success");
        setLeadSubmitted(true);
        trackLeadGenerated({
          name: formData.name,
          phone: formData.phone,
          reason: formData.reason,
          location: formData.preferredLocation,
        });
      }
    },
  });

  // Show bubble after delay
  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatMutation.isPending]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && view === "chat") {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, view]);

  // Detect scheduling intent to show lead banner
  useEffect(() => {
    if (messages.length >= 2 && !leadSubmitted && detectSchedulingIntent(messages)) {
      setShowLeadBanner(true);
    }
  }, [messages, leadSubmitted]);

  const handleSend = useCallback(
    (text?: string) => {
      const messageText = (text || input).trim();
      if (!messageText || chatMutation.isPending) return;

      const newMessages: ChatMessage[] = [...messages, { role: "user", content: messageText }];
      setMessages(newMessages);
      setInput("");

      chatMutation.mutate({ messages: newMessages });
    },
    [input, messages, chatMutation]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([]);
    setView("chat");
    setShowLeadBanner(false);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    const chatHistory = messages
      .map((m) => `${m.role === "user" ? "Paciente" : "Assistente"}: ${m.content}`)
      .join("\n\n");

    leadMutation.mutate({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || "",
      reason: formData.reason.trim() || "",
      preferredLocation: formData.preferredLocation || "",
      chatHistory,
    });
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-20 left-0 w-[380px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            style={{ maxHeight: "min(560px, calc(100vh - 140px))" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#B87333] to-[#0F766E] p-4 text-white shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Assistente Virtual</p>
                    <p className="text-xs text-white/70 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Dr. Felipe de Bulhões
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {messages.length > 0 && (
                    <button
                      onClick={handleReset}
                      className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                      title="Nova conversa"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* ===== CHAT VIEW ===== */}
            {view === "chat" && (
              <>
                {/* Messages area */}
                <div
                  className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFB]"
                  style={{ minHeight: "200px" }}
                >
                  {messages.length === 0 ? (
                    <div className="space-y-4">
                      {/* Welcome message */}
                      <div className="flex items-start gap-2">
                        <div className="w-7 h-7 shrink-0 bg-[#B87333]/10 rounded-full flex items-center justify-center mt-0.5">
                          <Bot className="w-3.5 h-3.5 text-[#B87333]" />
                        </div>
                        <div className="bg-white rounded-xl rounded-tl-sm p-3 shadow-sm border border-gray-100 max-w-[85%]">
                          <p className="text-sm text-[#334155] leading-relaxed">
                            Olá! Sou o assistente virtual do consultório do Dr. Felipe de Bulhões.
                            Posso ajudar com informações sobre procedimentos urológicos, orientações
                            gerais e agendamento de consultas.
                          </p>
                          <p className="text-sm text-[#334155] leading-relaxed mt-2">
                            Como posso ajudá-lo(a) hoje?
                          </p>
                        </div>
                      </div>

                      {/* Suggested questions */}
                      <div className="pl-9 space-y-1.5">
                        <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-medium mb-2">
                          Perguntas sugeridas
                        </p>
                        {suggestedQuestions.map((q, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(q)}
                            disabled={chatMutation.isPending}
                            className="block w-full text-left text-xs bg-white hover:bg-[#B87333]/5 text-[#475569] hover:text-[#B87333] px-3 py-2 rounded-lg border border-gray-100 hover:border-[#B87333]/20 transition-all disabled:opacity-50"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      {messages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                          {msg.role === "assistant" ? (
                            <div className="w-7 h-7 shrink-0 bg-[#B87333]/10 rounded-full flex items-center justify-center mt-0.5">
                              <Bot className="w-3.5 h-3.5 text-[#B87333]" />
                            </div>
                          ) : (
                            <div className="w-7 h-7 shrink-0 bg-[#1C3D5A]/10 rounded-full flex items-center justify-center mt-0.5">
                              <User className="w-3.5 h-3.5 text-[#1C3D5A]" />
                            </div>
                          )}
                          <div
                            className={`max-w-[85%] rounded-xl p-3 shadow-sm ${
                              msg.role === "user"
                                ? "bg-[#B87333] text-white rounded-tr-sm"
                                : "bg-white border border-gray-100 text-[#334155] rounded-tl-sm"
                            }`}
                          >
                            {msg.role === "assistant" ? (
                              <div className="prose prose-sm max-w-none text-[#334155] [&_p]:text-sm [&_p]:leading-relaxed [&_li]:text-sm [&_a]:text-[#B87333]">
                                <Streamdown>{msg.content}</Streamdown>
                              </div>
                            ) : (
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                {msg.content}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Loading indicator */}
                      {chatMutation.isPending && (
                        <div className="flex items-start gap-2">
                          <div className="w-7 h-7 shrink-0 bg-[#B87333]/10 rounded-full flex items-center justify-center mt-0.5">
                            <Bot className="w-3.5 h-3.5 text-[#B87333]" />
                          </div>
                          <div className="bg-white rounded-xl rounded-tl-sm p-3 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-2">
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B87333]" />
                              <span className="text-xs text-[#94A3B8]">Digitando...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Lead collection banner */}
                <AnimatePresence>
                  {showLeadBanner && !leadSubmitted && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden shrink-0"
                    >
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200 p-3">
                        <div className="flex items-start gap-2">
                          <CalendarCheck className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-amber-800">
                              Quer que a secretária entre em contato?
                            </p>
                            <p className="text-[10px] text-amber-700 mt-0.5">
                              Deixe seus dados e retornaremos em breve.
                            </p>
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => setView("lead-form")}
                                className="text-[10px] font-medium bg-amber-600 text-white px-3 py-1.5 rounded-lg hover:bg-amber-700 transition-colors"
                              >
                                Deixar meus dados
                              </button>
                              <button
                                onClick={() => setShowLeadBanner(false)}
                                className="text-[10px] text-amber-600 hover:text-amber-800 px-2 py-1.5 transition-colors"
                              >
                                Agora não
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Input area */}
                <div className="p-3 border-t border-gray-100 bg-white shrink-0">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="flex items-end gap-2"
                  >
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Digite sua pergunta..."
                      rows={1}
                      className="flex-1 resize-none text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333]/20 max-h-20 placeholder:text-[#94A3B8]"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || chatMutation.isPending}
                      className="w-9 h-9 shrink-0 bg-[#B87333] hover:bg-[#0F766E] disabled:bg-gray-200 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"
                    >
                      {chatMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                      ) : (
                        <Send className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </form>
                  <p className="text-[9px] text-[#94A3B8] text-center mt-2">
                    Este assistente fornece informações gerais e não substitui uma consulta médica.
                  </p>
                </div>
              </>
            )}

            {/* ===== LEAD FORM VIEW ===== */}
            {view === "lead-form" && (
              <div className="flex-1 overflow-y-auto p-4 bg-[#F8FAFB]">
                <div className="mb-4">
                  <button
                    onClick={() => setView("chat")}
                    className="text-xs text-[#B87333] hover:text-[#0F766E] flex items-center gap-1 mb-3"
                  >
                    ← Voltar ao chat
                  </button>
                  <h3 className="text-base font-bold text-[#1C3D5A]">Solicitar Contato</h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Preencha seus dados e a secretária entrará em contato para agendar sua consulta.
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-[#334155] mb-1">
                      <UserCircle className="w-3.5 h-3.5 text-[#B87333]" />
                      Nome completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Seu nome"
                      required
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333]/20 placeholder:text-[#94A3B8]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-[#334155] mb-1">
                      <Phone className="w-3.5 h-3.5 text-[#B87333]" />
                      Telefone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, phone: formatPhone(e.target.value) }))
                      }
                      placeholder="(11) 99999-9999"
                      required
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333]/20 placeholder:text-[#94A3B8]"
                    />
                  </div>

                  {/* Email (optional) */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-[#334155] mb-1">
                      <Mail className="w-3.5 h-3.5 text-[#B87333]" />
                      E-mail <span className="text-[#94A3B8] text-[10px]">(opcional)</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      placeholder="seu@email.com"
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333]/20 placeholder:text-[#94A3B8]"
                    />
                  </div>

                  {/* Preferred Location */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-[#334155] mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#B87333]" />
                      Local de preferência
                    </label>
                    <select
                      value={formData.preferredLocation}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, preferredLocation: e.target.value }))
                      }
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333]/20 text-[#334155] bg-white"
                    >
                      <option value="">Selecione...</option>
                      <option value="campinas">Campinas Day Hospital (Convênios)</option>
                      <option value="sp-paulista">Clinovi Paulista (Particular)</option>
                      <option value="sp-moema">Clinovi Moema (Particular)</option>
                      <option value="sp-pinheiros">Clinovi Pinheiros (Particular)</option>
                      <option value="sp-sbc">Clinovi SBC (Particular)</option>
                      <option value="cemed-campinas">CEMED - Rede D'Or - São Luiz Campinas (Convênios)</option>
                    </select>
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-[#334155] mb-1">
                      <FileText className="w-3.5 h-3.5 text-[#B87333]" />
                      Motivo da consulta{" "}
                      <span className="text-[#94A3B8] text-[10px]">(opcional)</span>
                    </label>
                    <textarea
                      value={formData.reason}
                      onChange={(e) => setFormData((p) => ({ ...p, reason: e.target.value }))}
                      placeholder="Ex: Exame de rotina, dor ao urinar, acompanhamento..."
                      rows={2}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333]/20 placeholder:text-[#94A3B8] resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!formData.name.trim() || !formData.phone.trim() || leadMutation.isPending}
                    className="w-full bg-[#B87333] hover:bg-[#0F766E] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {leadMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar dados para contato
                      </>
                    )}
                  </button>

                  <p className="text-[9px] text-[#94A3B8] text-center">
                    Seus dados são protegidos e usados apenas para agendamento.
                  </p>
                </form>
              </div>
            )}

            {/* ===== LEAD SUCCESS VIEW ===== */}
            {view === "lead-success" && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#F8FAFB] text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-lg font-bold text-[#1C3D5A] mb-2">Dados recebidos!</h3>
                <p className="text-sm text-[#64748B] mb-1">
                  A secretária do Dr. Felipe entrará em contato pelo número informado para agendar
                  sua consulta.
                </p>
                <p className="text-xs text-[#94A3B8] mb-6">
                  Tempo médio de retorno: até 24 horas úteis.
                </p>
                <div className="space-y-2 w-full">
                  <button
                    onClick={() => setView("chat")}
                    className="w-full text-sm bg-[#B87333] hover:bg-[#0F766E] text-white py-2.5 rounded-xl transition-colors"
                  >
                    Continuar conversando
                  </button>
                  <a
                    href="https://wa.me/5511981124455"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-sm border border-green-300 text-green-700 hover:bg-green-50 py-2.5 rounded-xl transition-colors text-center"
                  >
                    Falar pelo WhatsApp agora
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble notification */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute bottom-20 left-0 bg-white rounded-xl shadow-lg p-3 max-w-[220px] border border-gray-100"
          >
            <button
              onClick={() => setShowBubble(false)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center"
            >
              <X className="w-3 h-3 text-gray-500" />
            </button>
            <p className="text-xs text-[#334155]">
              Tem dúvidas? Pergunte ao nosso{" "}
              <strong className="text-[#B87333]">assistente virtual</strong>!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => {
          if (!isOpen) trackChatOpen();
          setIsOpen(!isOpen);
          setShowBubble(false);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#B87333] hover:bg-[#0F766E] rounded-full shadow-lg flex items-center justify-center transition-colors relative"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Bot className="w-6 h-6 text-white" />
        )}
        {!isOpen && messages.length === 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
