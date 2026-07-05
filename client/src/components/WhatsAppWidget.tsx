/*
 * Design: Clinical Precision — Swiss Medical Design
 * WhatsApp Chat Widget — Mais proeminente e com mensagem de boas-vindas
 */
import { useState, useEffect } from "react";
import { trackWhatsAppClick } from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/tracking";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Clock } from "lucide-react";

const WHATSAPP_NUMBER = "5511981124455";

const quickMessages = [
  "Tenho dúvidas sobre um procedimento",
  "Quero saber sobre teleconsulta",

  "Quero informações sobre valores",
];

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = (msg: string) => {
    trackWhatsAppClick("whatsapp_widget");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setIsOpen(false);
  };

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-80 bg-white dark:bg-card rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#075E54] p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Dr. Felipe de Bulhões</p>
                    <p className="text-xs text-white/70 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                      Online agora
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat area */}
            <div className="bg-[#ECE5DD] p-4 min-h-[120px]">
              <div className="bg-white dark:bg-card rounded-lg p-3 shadow-sm max-w-[85%] relative">
                <p className="text-sm text-[#334155] leading-relaxed">
                  Olá! Sou o Dr. Felipe de Bulhões, urologista. Envie sua mensagem por aqui. Para agendamento por telefone, ligue: Clinovi (11) 3382-1529 | Campinas Day Hospital (19) 2127-2900 | São Luiz Campinas (19) 3014-3000. WhatsApp: (19) 99855-9890.
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-[#64748B]">agora</span>
                </div>
              </div>
            </div>

            {/* Quick messages */}
            <div className="p-4 border-t border-gray-100">
              <p className="text-xs text-[#64748B] mb-3 flex items-center gap-1">
                <Send className="w-3 h-3" /> Selecione uma mensagem rápida:
              </p>
              <div className="space-y-2">
                {quickMessages.map((msg, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(`Olá Dr. Felipe, ${msg.toLowerCase()}.`)}
                    className="w-full text-left text-sm bg-gray-50 dark:bg-card hover:bg-[#B87333]/10 text-[#334155] hover:text-[#B87333] px-3 py-2 rounded-lg border border-gray-100 hover:border-[#B87333]/30 transition-colors"
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div className="px-4 pb-3 flex items-center gap-2 text-xs text-[#64748B]">
              <Clock className="w-3 h-3" />
              Apenas mensagens — resposta em até 2h
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble notification */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-20 right-0 bg-white dark:bg-card rounded-xl shadow-lg p-3 max-w-[220px] border border-gray-100"
          >
            <button onClick={() => setShowBubble(false)} className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
              <X className="w-3 h-3 text-gray-500 dark:text-muted-foreground" />
            </button>
            <p className="text-xs text-[#334155]">
              Precisa de ajuda? Fale conosco pelo <strong className="text-[#075E54]">WhatsApp</strong>!
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
        className="w-16 h-16 bg-[#25D366] hover:bg-[#20BD5A] rounded-full shadow-lg flex items-center justify-center transition-colors relative"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
        )}
      </motion.button>
    </div>
  );
}
