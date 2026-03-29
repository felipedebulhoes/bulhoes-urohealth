/*
 * Design: Clinical Precision — Swiss Medical Design
 * Blog post detail page with rich typography and reading experience
 */
import { useParams, Link, useLocation } from "wouter";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { getPostBySlug } from "@/lib/blogData";
import { Calendar, Clock, ArrowLeft, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const post = getPostBySlug(params.slug || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-2xl text-[#0A2540] mb-4">Artigo não encontrado</h1>
        <Link href="/blog">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Blog
          </Button>
        </Link>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header bar */}
      <header className="bg-[#0A2540] py-4 sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/logo_min8_d351a844.webp"
              alt="Dr. Felipe de Bulhões - Urologista"
              className="h-12 lg:h-14 w-auto brightness-0 invert"
            />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/blog">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Blog
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Cover image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[40vh] lg:h-[50vh] overflow-hidden"
      >
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/40 to-transparent" />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 pb-10 lg:pb-14">
          <div className="container">
            <span className="inline-block bg-[#0D9488] text-white text-xs font-semibold px-3 py-1.5 rounded-md mb-4">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white leading-tight max-w-4xl">
              {post.title}
            </h1>
          </div>
        </div>
      </motion.div>

      {/* Article meta + content */}
      <article className="py-10 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Meta bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[#0A2540]/8"
            >
              <div className="flex items-center gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#0D9488]/20"
                />
                <div>
                  <p className="text-sm font-semibold text-[#0A2540]">{post.author.name}</p>
                  <p className="text-xs text-[#0A2540]/40">{post.author.credentials}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#0A2540]/40">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 hover:text-[#0D9488] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Compartilhar
                </button>
              </div>
            </motion.div>

            {/* Article body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-lg max-w-none
                prose-headings:text-[#0A2540] prose-headings:font-serif
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-[#0A2540]/70 prose-p:leading-relaxed
                prose-strong:text-[#0A2540]/90
                prose-li:text-[#0A2540]/70
                prose-a:text-[#0D9488] prose-a:no-underline hover:prose-a:underline
                prose-hr:border-[#0A2540]/8
                prose-ol:text-[#0A2540]/70
                prose-ul:text-[#0A2540]/70
              "
            >
              <Streamdown>{post.content}</Streamdown>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 bg-gradient-to-br from-[#0A2540] to-[#0F3460] rounded-xl p-8 lg:p-10 text-center"
            >
              <h3 className="text-xl lg:text-2xl text-white mb-3 font-serif">
                Cuide da sua saúde urológica
              </h3>
              <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">
                Agende uma consulta preventiva com o Dr. Felipe de Bulhões.
                Atendimento presencial em São Paulo e Campinas, ou por teleconsulta.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#0D9488] hover:bg-[#0B7C72] text-white px-6 h-11">
                    Agendar Consulta
                  </Button>
                </a>
                <a
                  href="https://wa.me/5511981124455?text=Ol%C3%A1%2C%20li%20o%20artigo%20no%20blog%20e%20gostaria%20de%20agendar%20uma%20consulta."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 bg-transparent px-6 h-11">
                    WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Back to blog */}
            <div className="mt-10 text-center">
              <Link href="/blog">
                <Button variant="ghost" className="text-[#0A2540]/50 hover:text-[#0A2540]">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Footer mini */}
      <footer className="bg-[#071A2E] py-8">
        <div className="container text-center">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Dr. Felipe de Bulhões — Urologista | CRM-SP 202291
          </p>
        </div>
      </footer>
    </div>
  );
}
