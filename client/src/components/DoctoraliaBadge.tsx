/*
 * Design: Clinical Precision — Swiss Medical Design
 * Component: Doctoralia Badge — Selo de avaliação para prova social
 */
import { motion } from "framer-motion";
import { Star, ExternalLink, ThumbsUp, Shield } from "lucide-react";

const reviews = [
  {
    name: "Paciente verificado",
    date: "Março 2026",
    rating: 5,
    text: "Excelente profissional! Muito atencioso e explicou tudo com clareza. Recomendo demais.",
  },
  {
    name: "Paciente verificado",
    date: "Fevereiro 2026",
    rating: 5,
    text: "Médico muito competente e humano. Me deixou tranquilo sobre o procedimento e tudo correu perfeitamente.",
  },
  {
    name: "Paciente verificado",
    date: "Janeiro 2026",
    rating: 5,
    text: "Atendimento pontual e consultório excelente. Dr. Felipe é muito dedicado e explica cada detalhe do tratamento.",
  },
];

const stats = [
  { icon: <Star className="w-4 h-4" />, value: "5.0", label: "Avaliação" },
  { icon: <ThumbsUp className="w-4 h-4" />, value: "100%", label: "Recomendam" },
  { icon: <Shield className="w-4 h-4" />, value: "1500+", label: "Pacientes" },
];

export default function DoctoraliaBadge() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#00B8A9]/5 to-[#B87333]/5 rounded-2xl border border-[#B87333]/10 p-6 lg:p-8"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left — Badge */}
            <div className="lg:w-1/3">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="https://platform.docplanner.com/img/logo/doctoralia-logo.svg"
                  alt="Doctoralia"
                  className="h-6"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-xs font-semibold text-[#00B8A9] bg-[#00B8A9]/10 px-2 py-0.5 rounded">
                  Perfil Verificado
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-[#1C3D5A]">5.0</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mb-4">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="flex items-center justify-center gap-1 text-[#B87333]">
                      {stat.icon}
                      <span className="text-sm font-bold text-[#1C3D5A]">{stat.value}</span>
                    </div>
                    <span className="text-[10px] text-[#1C3D5A]/40">{stat.label}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00B8A9] hover:text-[#B87333] transition-colors"
              >
                Ver perfil completo <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Right — Reviews */}
            <div className="lg:w-2/3 space-y-3">
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-lg border border-[#1C3D5A]/5 p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#1C3D5A]/5 flex items-center justify-center">
                        <span className="text-xs font-bold text-[#1C3D5A]/40">P</span>
                      </div>
                      <span className="text-xs font-medium text-[#1C3D5A]/60">{review.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-[10px] text-[#1C3D5A]/30 ml-1">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#1C3D5A]/55 leading-relaxed">
                    "{review.text}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
