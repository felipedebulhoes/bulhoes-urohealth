/*
 * Design: Clinical Precision — Swiss Medical Design
 * WhatsApp: Floating button bottom-right
 * Aceita mensagem personalizada por landing page para identificar origem
 * Inclui origem do tráfego (UTM) na mensagem quando disponível
 */
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";
import { getAttribution } from "@/lib/tracking";

interface WhatsAppButtonProps {
  /** Mensagem pré-preenchida no WhatsApp. Se não informada, usa mensagem padrão. */
  message?: string;
  /** Identificador da página para tracking (ex: "vasectomia", "andrologia") */
  source?: string;
}

const DEFAULT_MESSAGE = "Olá, gostaria de tirar dúvidas com o Dr. Felipe de Bulhões.";

/**
 * Constrói sufixo de rastreamento baseado nos UTMs capturados.
 * Formato discreto no final da mensagem para não poluir a conversa.
 */
function buildTrafficOriginTag(): string {
  const attribution = getAttribution();
  if (!attribution) return "";

  const parts: string[] = [];
  if (attribution.utm_source) parts.push(attribution.utm_source);
  if (attribution.utm_medium) parts.push(attribution.utm_medium);
  if (attribution.utm_campaign) parts.push(attribution.utm_campaign);
  if (attribution.gclid) parts.push("gads");
  else if (attribution.gbraid || attribution.wbraid) parts.push("gads");

  if (parts.length === 0) return "";

  return `\n[via: ${parts.join("/")}]`;
}

export default function WhatsAppButton({ message, source }: WhatsAppButtonProps = {}) {
  const handleClick = () => {
    trackWhatsAppClick(source || "educational_page");
    
    const baseMessage = message || DEFAULT_MESSAGE;
    const trafficTag = buildTrafficOriginTag();
    const fullMessage = baseMessage + trafficTag;
    const encodedMessage = encodeURIComponent(fullMessage);
    
    window.open(`https://wa.me/5511981124455?text=${encodedMessage}`, "_blank");
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full items-center justify-center shadow-lg shadow-green-900/30 transition-colors cursor-pointer"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </motion.button>
  );
}
