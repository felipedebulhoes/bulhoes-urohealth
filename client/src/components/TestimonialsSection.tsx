/*
 * Design: Clinical Precision — Swiss Medical Design
 * Testimonials: Clean cards with large quote marks, verified badges
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, BadgeCheck } from "lucide-react";

const testimonials = [
  {
    name: "Flavio",
    text: "Excelente profissional... atencioso, competente e atento às modernidades da medicina. Recomendo a todos.",
    type: "Primeira consulta Urologia",
    location: "Clinovi - Av. Paulista",
  },
  {
    name: "P.S.",
    text: "Fui para uma consulta de rotina e saí muito satisfeito com o nível de profissionalismo e a precisão das orientações. Senti muita segurança dado que o Dr. Felipe demonstra um conhecimento técnico profundo e está atualizado com o que há de mais moderno na área.",
    type: "Primeira consulta Urologia",
    location: "Clinovi - Av. Paulista",
  },
  {
    name: "L. A. S.",
    text: "Dr. Felipe é extremamente atencioso e em 3 minutos de conversa já é percebido que realmente entende do assunto, explicando de forma clara e pontual todos os aspectos relevantes. Só tenho a agradecer!",
    type: "Primeira consulta Urologia",
    location: "Clinovi - Av. Paulista",
  },
  {
    name: "A.L.",
    text: "Excelente profissional. Ele é atencioso, o que deixa o paciente tranquilo e ajuda no diagnóstico mais preciso.",
    type: "Consulta",
    location: "Presencial",
  },
  {
    name: "E.U.",
    text: "Dr. Felipe é exemplar. Se você procura um profissional competente, você encontrou.",
    type: "Consulta",
    location: "Clinovi - Av. Paulista",
  },
  {
    name: "A.S.",
    text: "Ótimo profissional! Além de pontual, o atendimento é nota 1000.",
    type: "Primeira consulta Urologia",
    location: "Clinovi - Av. Paulista",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="depoimentos" className="py-20 lg:py-28 bg-[#F8FAFB]" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#0D9488]" />
            <span className="text-[#0D9488] text-sm font-semibold uppercase tracking-[0.15em]">
              Depoimentos
            </span>
            <div className="h-px w-10 bg-[#0D9488]" />
          </div>
          <h2 className="text-3xl lg:text-4xl text-[#0A2540] leading-tight">
            O que dizem os pacientes
          </h2>
          <p className="text-[#0A2540]/50 font-sans mt-4 max-w-xl mx-auto">
            Opiniões verificadas pela Doctoralia. Avaliado como empático, atencioso e resolutivo.
          </p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mt-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-sm font-semibold text-[#0A2540] font-sans ml-2">
              9 opiniões verificadas
            </span>
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((test, i) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="bg-white rounded-lg p-6 border border-[#0A2540]/6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Quote */}
              <div className="text-[#0D9488]/20 text-5xl font-serif leading-none mb-2">"</div>
              <p className="text-sm text-[#0A2540]/70 font-sans leading-relaxed mb-5">
                {test.text}
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-[#0A2540]/6">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-[#0A2540] font-sans">
                      {test.name}
                    </span>
                    <BadgeCheck className="w-3.5 h-3.5 text-[#0D9488]" />
                  </div>
                  <span className="text-xs text-[#0A2540]/40 font-sans">
                    {test.type}
                  </span>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/sao-paulo#opinions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#0D9488] hover:text-[#0B7C72] transition-colors underline underline-offset-4"
          >
            Ver todas as opiniões na Doctoralia
          </a>
        </motion.div>
      </div>
    </section>
  );
}
