/*
 * Design: Clinical Precision — Swiss Medical Design
 * Testimonials: Enhanced section with all 9 verified reviews, carousel on mobile,
 * featured testimonial highlight, and Doctoralia integration
 */
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, BadgeCheck, Quote, ChevronLeft, ChevronRight, MapPin, Video, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  name: string;
  initials: string;
  text: string;
  type: string;
  location: string;
  date: string;
  featured?: boolean;
  isTelemedicine?: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: "P.S.",
    initials: "PS",
    text: "Fui para uma consulta de rotina e saí muito satisfeito com o nível de profissionalismo e a precisão das orientações. Senti muita segurança dado que o Dr. Felipe demonstra um conhecimento técnico profundo e está atualizado com o que há de mais moderno na área.",
    type: "Primeira consulta Urologia",
    location: "Clinovi — Av. Paulista",
    date: "Março 2026",
    featured: true,
  },
  {
    name: "L. A. S.",
    initials: "LS",
    text: "Dr. Felipe é extremamente atencioso e em 3 minutos de conversa já é percebido que realmente entende do assunto, explicando de forma clara e pontual todos os aspectos relevantes. Só tenho a agradecer!",
    type: "Primeira consulta Urologia",
    location: "Clinovi — Av. Paulista",
    date: "Março 2026",
    featured: true,
  },
  {
    name: "Flavio",
    initials: "FL",
    text: "Excelente profissional... atencioso, competente e atento às modernidades da medicina. Recomendo a todos.",
    type: "Primeira consulta Urologia",
    location: "Clinovi — Av. Paulista",
    date: "Março 2026",
  },
  {
    name: "G.I.S.B.S.",
    initials: "GS",
    text: "Atencioso e competente. Recomendei aos meus familiares.",
    type: "Primeira consulta Urologia",
    location: "Clinovi — Av. Paulista",
    date: "Março 2026",
  },
  {
    name: "A.L.",
    initials: "AL",
    text: "Excelente profissional. Ele é atencioso, o que deixa o paciente tranquilo e ajuda no diagnóstico mais preciso.",
    type: "Consulta",
    location: "Presencial",
    date: "Março 2026",
  },
  {
    name: "N.A.S.",
    initials: "NS",
    text: "Ótimo profissional! Atencioso e bom preparo técnico.",
    type: "Teleconsulta",
    location: "Telemedicina",
    date: "Março 2026",
    isTelemedicine: true,
  },
  {
    name: "E.U.",
    initials: "EU",
    text: "Dr. Felipe é exemplar. Se você procura um profissional competente, você encontrou.",
    type: "Consulta",
    location: "Clinovi — Av. Paulista",
    date: "Março 2026",
  },
  {
    name: "A.G.",
    initials: "AG",
    text: "Excelente profissional, fiquei satisfeita com a consulta.",
    type: "Teleconsulta em Urologia",
    location: "Telemedicina",
    date: "Março 2026",
    isTelemedicine: true,
  },
  {
    name: "A.S.",
    initials: "AS",
    text: "Ótimo profissional! Além de pontual, o atendimento é nota 1000.",
    type: "Primeira consulta Urologia",
    location: "Clinovi — Av. Paulista",
    date: "Março 2026",
  },
];

const featuredTestimonials = testimonials.filter((t) => t.featured);
const regularTestimonials = testimonials.filter((t) => !t.featured);

function StarRating({ count = 5, size = "w-4 h-4" }: { count?: number; size?: string }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className={`${size} fill-amber-400 text-amber-400`} />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index, isInView }: { testimonial: Testimonial; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.08 * index }}
      className="testimonial-card-hover bg-white dark:bg-card rounded-xl p-6 border border-[#1C3D5A]/6 shadow-sm hover:border-[#B87333]/20 flex flex-col h-full group"
    >
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-[#B87333]/15 mb-3 group-hover:text-[#B87333]/30 transition-colors" />

      {/* Text */}
      <p className="text-[15px] text-[#1C3D5A] dark:text-foreground/75 leading-relaxed mb-auto flex-1">
        "{testimonial.text}"
      </p>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#1C3D5A]/8 to-transparent my-5" />

      {/* Author row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B87333]/20 to-[#B87333]/5 flex items-center justify-center">
            <span className="text-xs font-bold text-[#B87333]">{testimonial.initials}</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground">{testimonial.name}</span>
              <BadgeCheck className="w-4 h-4 text-[#B87333]" />
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              {testimonial.isTelemedicine ? (
                <Video className="w-3 h-3 text-[#1C3D5A] dark:text-foreground/35" />
              ) : (
                <MapPin className="w-3 h-3 text-[#1C3D5A] dark:text-foreground/35" />
              )}
              <span className="text-xs text-[#1C3D5A] dark:text-foreground/40">{testimonial.type}</span>
            </div>
          </div>
        </div>
        <StarRating count={5} size="w-3.5 h-3.5" />
      </div>
    </motion.div>
  );
}

// Schema.org Review JSON-LD for Google Rich Results (stars in search)
function ReviewSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. Felipe de Bulhões Ojeda",
    "image": "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/dr-felipe-hero-portrait_a1e2b3c4.webp",
    "url": "https://felipebulhoes.com",
    "telephone": "+5511981124455",
    "priceRange": "$$",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Av. Paulista, 1048, 18° andar",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "postalCode": "01310-100",
        "addressCountry": "BR"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Av. Rebouças, 2636",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "addressCountry": "BR"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Av. Pereira Barreto, 1479",
        "addressLocality": "São Bernardo do Campo",
        "addressRegion": "SP",
        "addressCountry": "BR"
      }
    ],
    "medicalSpecialty": "Urology",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "9",
      "reviewCount": "9"
    },
    "review": testimonials.map((t) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "datePublished": "2026-03-01",
      "reviewBody": t.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [currentFeatured, setCurrentFeatured] = useState(0);

  // Auto-rotate featured testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatured((prev) => (prev + 1) % featuredTestimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="depoimentos" className="py-20 lg:py-28 bg-[#F8FAFB] overflow-hidden" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#B87333]" />
            <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.15em]">
              Depoimentos
            </span>
            <div className="h-px w-10 bg-[#B87333]" />
          </div>
          <h2 className="text-3xl lg:text-4xl text-[#1C3D5A] dark:text-foreground leading-tight font-serif">
            O que dizem nossos pacientes
          </h2>
          <p className="text-[#1C3D5A] dark:text-foreground/50 mt-4 max-w-xl mx-auto text-sm">
            Todas as opiniões são verificadas pela Doctoralia e representam experiências reais de pacientes atendidos.
          </p>

          {/* Rating summary */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white dark:bg-card rounded-full px-5 py-2.5 shadow-sm border border-[#1C3D5A]/6">
              <div className="text-2xl font-bold text-[#1C3D5A] dark:text-foreground">5.0</div>
              <div className="flex flex-col items-start">
                <StarRating count={5} size="w-4 h-4" />
                <span className="text-xs text-[#1C3D5A] dark:text-foreground/50 mt-0.5">9 opiniões verificadas</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured testimonial - large highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10"
        >
          <div className="relative bg-gradient-to-br from-[#1C3D5A] to-[#0F3460] rounded-2xl p-8 lg:p-12 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B87333]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B87333]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <Quote className="w-12 h-12 text-[#B87333]/30 mb-4" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeatured}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-lg lg:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl">
                    "{featuredTestimonials[currentFeatured].text}"
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#B87333]/20 flex items-center justify-center border border-[#B87333]/30">
                        <span className="text-sm font-bold text-[#B87333]">
                          {featuredTestimonials[currentFeatured].initials}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">
                            {featuredTestimonials[currentFeatured].name}
                          </span>
                          <BadgeCheck className="w-4 h-4 text-[#B87333]" />
                        </div>
                        <span className="text-white/40 text-sm">
                          {featuredTestimonials[currentFeatured].type} — {featuredTestimonials[currentFeatured].location}
                        </span>
                      </div>
                    </div>
                    <StarRating count={5} size="w-5 h-5" />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="flex items-center gap-2 mt-6">
                {featuredTestimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentFeatured(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentFeatured ? "w-8 bg-[#B87333]" : "w-3 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Regular testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {regularTestimonials.map((test, i) => (
            <TestimonialCard
              key={test.name}
              testimonial={test}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA to Doctoralia */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <a
            href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas#opinions"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-[#B87333]/30 text-[#B87333] hover:bg-[#B87333]/5 hover:border-[#B87333]/50 px-6 h-11 rounded-lg"
            >
              Ver todas as opiniões na Doctoralia
            </Button>
          </a>
          <a
            href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-[#B87333] hover:bg-[#8B5A2B] text-white px-6 h-11 rounded-lg">
              Agendar Consulta
            </Button>
          </a>
        </motion.div>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center justify-center gap-2 mt-8"
        >
          <BadgeCheck className="w-4 h-4 text-[#B87333]/50" />
          <span className="text-xs text-[#1C3D5A] dark:text-foreground/35">
            Opiniões verificadas pela Doctoralia — plataforma independente de avaliação médica
          </span>
        </motion.div>
      </div>

      {/* Schema.org Review structured data for Google Rich Results */}
      <ReviewSchema />
    </section>
  );
}
