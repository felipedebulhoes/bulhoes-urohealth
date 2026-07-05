/*
 * Design: Clinical Precision — Swiss Medical Design
 * WhatsApp: Floating button bottom-right
 * Aceita mensagem personalizada por landing page para identificar origem
 */
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";

interface WhatsAppButtonProps {
  /** Mensagem pré-preenchida no WhatsApp. Se não informada, usa mensagem padrão. */
  message?: string;
  /** Identificador da página para tracking (ex: "vasectomia", "andrologia") */
  source?: string;
}

const DEFAULT_MESSAGE = "Olá, gostaria de tirar dúvidas com o Dr. Felipe de Bulhões.";

export default function WhatsAppButton({ message, source }: WhatsAppButtonProps = {}) {
  const whatsappMessage = message || DEFAULT_MESSAGE;
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const trackSource = source || "educational_page";

  return (
    <motion.a
      href={`https://wa.me/5511981124455?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(trackSource)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-lg shadow-green-900/30 transition-colors"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </motion.a>
  );
}
