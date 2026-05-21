/* NewsletterSection.tsx — Captura de E-mail / Newsletter
 * Design: Clinical Precision / Swiss Medical
 * Objetivo: Retenção de pacientes e remarketing
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, Send, Shield } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      // In production, this would send to an email service
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
        setName("");
      }, 5000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-[#1C3D5A] to-[#0D3B66] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B87333]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B87333]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-[#B87333] rounded-full text-xs font-medium mb-4">
              <Mail className="w-3.5 h-3.5" />
              Newsletter Saúde Masculina
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Receba Dicas de Saúde Urológica
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Cadastre-se para receber conteúdos exclusivos sobre prevenção, saúde masculina e novidades em
              tratamentos urológicos diretamente no seu e-mail.
            </p>
            <div className="flex items-center gap-4 justify-center lg:justify-start text-xs text-white/50">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" /> Seus dados estão seguros
              </span>
              <span>Cancele quando quiser</span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-md"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-card/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10"
              >
                <CheckCircle2 className="w-12 h-12 text-[#B87333] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Cadastro Realizado!</h3>
                <p className="text-white/70 text-sm">
                  Obrigado, {name}! Você receberá nossas dicas de saúde urológica em breve.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-card/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#B87333] transition-colors text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#B87333] transition-colors text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#B87333] text-white rounded-lg font-semibold hover:bg-[#0B8278] transition-colors text-sm"
                >
                  <Send className="w-4 h-4" /> Quero Receber as Dicas
                </button>
                <p className="text-white/40 text-xs text-center mt-3">
                  Enviamos no máximo 2 e-mails por mês. Sem spam.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
