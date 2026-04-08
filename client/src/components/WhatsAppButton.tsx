/*
 * Design: Clinical Precision — Swiss Medical Design
 * WhatsApp: Floating button bottom-right
 */
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/5511981124455?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20d%C3%BAvidas%20com%20o%20Dr.%20Felipe%20de%20Bulh%C3%B5es."
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("educational_page")}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-lg shadow-green-900/30 transition-colors"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </motion.a>
  );
}
