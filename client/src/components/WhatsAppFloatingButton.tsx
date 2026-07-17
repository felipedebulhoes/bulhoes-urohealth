/**
 * Botão Flutuante WhatsApp para Landing Pages
 * Facilita agendamento rápido de consultas
 */
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      aria-label="Abrir WhatsApp"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.div>
      
      {/* Tooltip ao passar o mouse */}
      <motion.div
        className="absolute right-full mr-3 bg-[#1C3D5A] text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
      >
        Agende pelo WhatsApp
      </motion.div>
    </motion.button>
  );
}
