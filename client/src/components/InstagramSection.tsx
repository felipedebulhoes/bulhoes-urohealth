/*
 * Design: Clinical Precision — Swiss Medical Design
 * Instagram: Grid of recent posts with link to profile
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const instaPosts = [
  {
    caption: "Saúde do Homem: mais do que próstata. Check-up masculino completo com bioimpedância.",
    type: "Saúde do Homem",
  },
  {
    caption: "Cirurgia Robótica: menor tempo de recuperação, maior precisão e menos dor pós-operatória.",
    type: "Cirurgia Robótica",
  },
  {
    caption: "Cálculos Renais: quando procurar um urologista? Dor lombar intensa pode ser sinal de litíase.",
    type: "Cálculos Renais",
  },
  {
    caption: "Novembro Azul: rastreio do câncer de próstata salva vidas. Converse com seu urologista.",
    type: "Prevenção",
  },
];

export default function InstagramSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 lg:py-20 bg-white dark:bg-card" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Instagram className="w-5 h-5 text-[#B87333]" />
              <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.15em]">
                @drfelipebulhoes
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl text-[#1C3D5A] dark:text-foreground leading-tight">
              Conteúdo Educativo
            </h2>
          </div>
          <a
            href="https://www.instagram.com/drfelipebulhoes/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-[#1C3D5A]/15 text-[#1C3D5A] dark:text-foreground hover:bg-[#1C3D5A]/5 h-10 px-5 text-sm font-medium rounded-md"
            >
              Seguir no Instagram
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </motion.div>

        {/* Posts grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {instaPosts.map((post, i) => (
            <motion.a
              key={post.type}
              href="https://www.instagram.com/drfelipebulhoes/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="group relative bg-gradient-to-br from-[#1C3D5A] to-[#0D3B5C] rounded-lg p-6 aspect-square flex flex-col justify-end overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Decorative */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                <Instagram className="w-8 h-8 text-white" />
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B87333]/10 rounded-full blur-2xl" />

              <span className="text-[10px] uppercase tracking-[0.15em] text-[#D4884A] font-semibold mb-2">
                {post.type}
              </span>
              <p className="text-sm text-white/80 font-sans leading-relaxed line-clamp-3">
                {post.caption}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
