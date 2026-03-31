/*
 * Design: Clinical Precision — Swiss Medical Design
 * AI Chat Widget — Assistente Virtual Urológico Embutido
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Loader2, Sparkles, User, RotateCcw } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const suggestedQuestions = [
  "Como funciona a cirurgia robótica?",
  "Quando devo procurar um urologista?",
  "Como é a biópsia de próstata?",
  "Quero agendar uma consulta",
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
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
            "Desculpe, estou com dificuldades técnicas. Para falar diretamente com a equipe, entre em contato pelo WhatsApp: (11) 98112-4455.",
        },
      ]);
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
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = (text?: string) => {
    const messageText = (text || input).trim();
    if (!messageText || chatMutation.isPending) return;

    const newMessages: ChatMessage[] = [...messages, { role: "user", content: messageText }];
    setMessages(newMessages);
    setInput("");

    chatMutation.mutate({
      messages: newMessages,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([]);
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
            className="absolute bottom-20 left-0 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            style={{ maxHeight: "min(520px, calc(100vh - 140px))" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0D9488] to-[#0F766E] p-4 text-white shrink-0">
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

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFB]" style={{ minHeight: "200px" }}>
              {messages.length === 0 ? (
                <div className="space-y-4">
                  {/* Welcome message */}
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 shrink-0 bg-[#0D9488]/10 rounded-full flex items-center justify-center mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-[#0D9488]" />
                    </div>
                    <div className="bg-white rounded-xl rounded-tl-sm p-3 shadow-sm border border-gray-100 max-w-[85%]">
                      <p className="text-sm text-[#334155] leading-relaxed">
                        Olá! Sou o assistente virtual do consultório do Dr. Felipe de Bulhões. Posso ajudar com informações sobre procedimentos urológicos, orientações gerais e agendamento de consultas.
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
                        className="block w-full text-left text-xs bg-white hover:bg-[#0D9488]/5 text-[#475569] hover:text-[#0D9488] px-3 py-2 rounded-lg border border-gray-100 hover:border-[#0D9488]/20 transition-all disabled:opacity-50"
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
                        <div className="w-7 h-7 shrink-0 bg-[#0D9488]/10 rounded-full flex items-center justify-center mt-0.5">
                          <Bot className="w-3.5 h-3.5 text-[#0D9488]" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 shrink-0 bg-[#0A2540]/10 rounded-full flex items-center justify-center mt-0.5">
                          <User className="w-3.5 h-3.5 text-[#0A2540]" />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] rounded-xl p-3 shadow-sm ${
                          msg.role === "user"
                            ? "bg-[#0D9488] text-white rounded-tr-sm"
                            : "bg-white border border-gray-100 text-[#334155] rounded-tl-sm"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <div className="prose prose-sm max-w-none text-[#334155] [&_p]:text-sm [&_p]:leading-relaxed [&_li]:text-sm [&_a]:text-[#0D9488]">
                            <Streamdown>{msg.content}</Streamdown>
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {chatMutation.isPending && (
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 shrink-0 bg-[#0D9488]/10 rounded-full flex items-center justify-center mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-[#0D9488]" />
                      </div>
                      <div className="bg-white rounded-xl rounded-tl-sm p-3 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0D9488]" />
                          <span className="text-xs text-[#94A3B8]">Digitando...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

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
                  className="flex-1 resize-none text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 max-h-20 placeholder:text-[#94A3B8]"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || chatMutation.isPending}
                  className="w-9 h-9 shrink-0 bg-[#0D9488] hover:bg-[#0F766E] disabled:bg-gray-200 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"
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
              Tem dúvidas? Pergunte ao nosso <strong className="text-[#0D9488]">assistente virtual</strong>!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowBubble(false);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#0D9488] hover:bg-[#0F766E] rounded-full shadow-lg flex items-center justify-center transition-colors relative"
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
