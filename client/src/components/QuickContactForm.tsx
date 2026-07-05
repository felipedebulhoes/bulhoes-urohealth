/*
 * Design: Clinical Precision — Swiss Medical Design
 * Component: Quick Contact Form — Formulário de contato rápido para captação
 * Atualizado: Conversões Otimizadas Google Ads (Enhanced Conversions)
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, User, Phone, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fireFormConversionEvents } from "@/lib/analytics";

export default function QuickContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    privacyConsent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    // Disparar eventos de conversão otimizados antes do redirecionamento
    // Apenas email e telefone — nunca dados clínicos
    await fireFormConversionEvents({
      email: formData.email,
      phone: formData.phone,
    });

    // Redireciona para WhatsApp com os dados preenchidos
    const message = `Olá, meu nome é ${formData.name}. ${formData.message ? `Mensagem: ${formData.message}. ` : ""}Meu telefone: ${formData.phone}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5511981124455?text=${encoded}`, "_blank");
    setSubmitted(true);
    setLoading(false);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="formulario" className="py-16 lg:py-24 bg-gradient-to-br from-[#1C3D5A] to-[#0F3460] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#B87333] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B87333] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container max-w-5xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-[#B87333]" />
              <span className="text-xs font-semibold text-[#B87333] uppercase tracking-widest">
                Contato Rápido
              </span>
            </div>
            <h2 className="text-2xl lg:text-4xl text-white mb-4 font-serif">
              Solicite um Contato
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Preencha o formulário abaixo e enviaremos sua mensagem pelo WhatsApp. Para agendamento por telefone, ligue: Clinovi (11) 3382-1529 | Campinas Day Hospital (19) 2127-2900 | São Luiz Campinas (19) 3014-3000. WhatsApp Campinas: (19) 99855-9890. Resposta em até 2 horas.
            </p>

            <div className="space-y-4">
              {[
                { icon: "🕐", text: "Resposta rápida — em até 2 horas" },
                { icon: "📱", text: "WhatsApp apenas para mensagens" },
                { icon: "🔒", text: "Seus dados são confidenciais" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-white/60 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="bg-white dark:bg-card/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10">
                <CheckCircle className="w-12 h-12 text-[#B87333] mx-auto mb-4" />
                <h3 className="text-xl text-white font-semibold mb-2">
                  Mensagem Enviada!
                </h3>
                <p className="text-white/50 text-sm">
                  Você será redirecionado para o WhatsApp. Entraremos em contato em breve.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-card/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 space-y-4"
              >
                {/* Nome */}
                <div>
                  <label className="text-white/70 text-xs font-medium mb-1.5 block">
                    Nome completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Seu nome"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#B87333]/50 transition-colors"
                    />
                  </div>
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="text-white/70 text-xs font-medium mb-1.5 block">
                    WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#B87333]/50 transition-colors"
                    />
                  </div>
                </div>

                {/* E-mail */}
                <div>
                  <label className="text-white/70 text-xs font-medium mb-1.5 block">
                    E-mail *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#B87333]/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Mensagem */}
                <div>
                  <label className="text-white/70 text-xs font-medium mb-1.5 block">
                    Mensagem
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Como podemos ajudar? (opcional)"
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#B87333]/50 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Checkbox de privacidade — obrigatório */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    required
                    checked={formData.privacyConsent}
                    onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                    className="mt-0.5 w-4 h-4 accent-[#B87333] flex-shrink-0 cursor-pointer"
                  />
                  <label htmlFor="privacyConsent" className="text-white/50 text-[11px] leading-relaxed cursor-pointer">
                    Ao enviar, você concorda em ser contatado por WhatsApp/e-mail e com a{" "}
                    <a href="/privacidade" className="text-[#B87333] hover:underline" target="_blank" rel="noopener noreferrer">
                      Política de Privacidade
                    </a>
                    . Não envie informações médicas sensíveis neste formulário.
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#B87333] hover:bg-[#8B5A2B] text-white h-12 text-sm font-semibold rounded-lg mt-2 disabled:opacity-70"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? "Enviando..." : "Enviar pelo WhatsApp"}
                </Button>

                <p className="text-white/25 text-[11px] text-center">
                  Ao enviar, você será redirecionado para o WhatsApp com sua mensagem pré-preenchida.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
