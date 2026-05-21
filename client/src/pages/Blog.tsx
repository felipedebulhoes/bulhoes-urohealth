/*
 * Design: Clinical Precision — Swiss Medical Design
 * Blog listing page with card grid layout
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { blogPosts } from "@/lib/blogData";
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header bar */}
      <header className="bg-[#1C3D5A] py-4 sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <img
              src="/manus-storage/logo-landscape_be6628b3.svg"
              alt="Dr. Felipe de Bulhões - Urologista"
              className="h-12 lg:h-14 w-auto brightness-0 invert"
            />
          </Link>
          <Link href="/">
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Site
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#1C3D5A] to-[#0F3460] py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#D4884A]" />
              <span className="text-[#D4884A] text-sm font-semibold uppercase tracking-[0.15em]">
                Blog
              </span>
            </div>
            <h1 className="text-3xl lg:text-5xl text-white leading-tight mb-4">
              Saúde Urológica
              <span className="block text-[#D4884A]">em Evidência</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              Artigos baseados em evidências científicas sobre prevenção, diagnóstico e
              tratamento das principais condições urológicas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-white rounded-xl border border-[#1C3D5A]/8 overflow-hidden hover:shadow-xl hover:shadow-[#1C3D5A]/5 transition-all duration-500 hover:-translate-y-1">
                    {/* Cover image */}
                    <div className="relative overflow-hidden aspect-[16/9]">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#B87333] text-white text-xs font-semibold px-3 py-1.5 rounded-md">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-[#1C3D5A]/40 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>

                      <h2 className="text-lg font-semibold text-[#1C3D5A] leading-snug mb-3 group-hover:text-[#B87333] transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-sm text-[#1C3D5A]/50 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-2 text-[#B87333] text-sm font-medium">
                        Ler artigo
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Empty state hint for future posts */}
          {blogPosts.length <= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <p className="text-[#1C3D5A]/30 text-sm">
                Novos artigos serão publicados em breve. Acompanhe também pelo{" "}
                <a
                  href="https://www.instagram.com/drfelipebulhoes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B87333] hover:underline"
                >
                  Instagram
                </a>.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer mini */}
      <footer className="bg-[#0F2A3F] py-8">
        <div className="container text-center">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Dr. Felipe de Bulhões — Urologista | CRM-SP 202291
          </p>
        </div>
      </footer>
    </div>
  );
}
