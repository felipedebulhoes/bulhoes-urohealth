/**
 * Botão Flutuante WhatsApp para Landing Pages
 * Facilita agendamento rápido de consultas
 */
import { MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

interface WhatsAppFloatingButtonProps {
  phoneNumber?: string;
  message?: string;
  campaignName?: string;
}

export function WhatsAppFloatingButton({
  phoneNumber = '5511981124455',
  message = 'Olá Dr. Felipe! Gostaria de agendar uma consulta.',
  campaignName = 'site',
}: WhatsAppFloatingButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="campaign-whatsapp-cta fixed bottom-6 right-6 z-50 bg-[#147A3F] hover:bg-[#116637] text-white rounded-full p-4 shadow-lg flex items-center justify-center group focus-visible:outline-none"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.35, duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
      aria-label={`Abrir WhatsApp para ${campaignName}`}
    >
      <span aria-hidden="true">
        <MessageCircle className="w-6 h-6" />
      </span>
      
      {/* Tooltip ao passar o mouse */}
      <span
        aria-hidden="true"
        className="campaign-whatsapp-tooltip absolute right-full mr-3 bg-[#453830] text-white px-3 py-2 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 motion-safe:transition-[opacity,transform] motion-safe:duration-150 pointer-events-none"
      >
        Agende pelo WhatsApp
      </span>
    </motion.button>
  );
}
