/*
 * Design: Clinical Precision — Swiss Medical Design
 * Blog Preview: Featured article card on the Home page
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { blogPosts } from "@/lib/blogData";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const featured = blogPosts[0];

  if (!featured) return null;

  return (
    <section id="blog" className="py-20 lg:py-28 bg-white" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#0D9488]" />
              <span className="text-[#0D9488] text-sm font-semibold uppercase tracking-[0.15em]">
                Blog
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl text-[#0A2540] leading-tight">
              Artigos sobre
              <span className="block text-[#0D9488]">Saúde Urológica</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-end"
          >
            <p className="text-base text-[#0A2540]/60 leading-relaxed">
              Conteúdo baseado em evidências científicas para ajudar você a cuidar da sua saúde
              com informação de qualidade.
            </p>
          </motion.div>
        </div>

        {/* Featured article */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href={`/blog/${featured.slug}`}>
            <div className="group grid lg:grid-cols-2 gap-0 bg-white rounded-xl border border-[#0A2540]/8 overflow-hidden hover:shadow-xl hover:shadow-[#0A2540]/5 transition-all duration-500">
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/9] lg:aspect-auto">
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#0D9488] text-white text-xs font-semibold px-3 py-1.5 rounded-md">
                    {featured.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-xs text-[#0A2540]/40 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readTime}
                  </span>
                </div>

                <h3 className="text-xl lg:text-2xl font-semibold text-[#0A2540] leading-snug mb-4 group-hover:text-[#0D9488] transition-colors">
                  {featured.title}
                </h3>

                <p className="text-sm text-[#0A2540]/50 leading-relaxed mb-6">
                  {featured.excerpt}
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={featured.author.avatar}
                    alt={featured.author.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#0D9488]/20"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#0A2540]">{featured.author.name}</p>
                    <p className="text-[10px] text-[#0A2540]/40">{featured.author.credentials}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[#0D9488] text-sm font-medium">
                  Ler artigo completo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Link href="/blog">
            <Button variant="outline" className="border-[#0A2540]/10 text-[#0A2540]/60 hover:text-[#0A2540] hover:border-[#0A2540]/20">
              Ver todos os artigos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
