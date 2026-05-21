/*
 * Design: Clinical Precision — Swiss Medical Design
 * Blog post detail page with rich typography and reading experience
 */
import { useParams, Link, useLocation } from "wouter";
import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { getPostBySlug } from "@/lib/blogData";
import { Calendar, Clock, ArrowLeft, User, Share2, CalendarCheck, MessageCircle, Star, Copy, Check, Linkedin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";
import { ArticleSchema, BreadcrumbSchema } from "@/components/SchemaMarkup";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const post = getPostBySlug(params.slug || "");
  const [copied, setCopied] = useState(false);

  const articleUrl = typeof window !== "undefined" ? `https://felipebulhoes.com/blog/${params.slug}` : "";
  const articleTitle = post?.title || "";
  const articleExcerpt = post?.excerpt || "";

  const shareWhatsApp = useCallback(() => {
    const text = encodeURIComponent(`${articleTitle}\n\n${articleExcerpt}\n\nLeia mais: ${articleUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }, [articleTitle, articleExcerpt, articleUrl]);

  const shareLinkedIn = useCallback(() => {
    const url = encodeURIComponent(articleUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  }, [articleUrl]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }, [articleUrl]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-card flex flex-col items-center justify-center">
        <h1 className="text-2xl text-[#1C3D5A] dark:text-foreground mb-4">Artigo não encontrado</h1>
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

  // Parse date string to ISO format for schema
  const parseDate = (dateStr: string): string => {
    const months: Record<string, string> = {
      "Janeiro": "01", "Fevereiro": "02", "Março": "03", "Abril": "04",
      "Maio": "05", "Junho": "06", "Julho": "07", "Agosto": "08",
      "Setembro": "09", "Outubro": "10", "Novembro": "11", "Dezembro": "12",
    };
    const match = dateStr.match(/(\d+)\s+de\s+(\w+)\s+de\s+(\d{4})/);
    if (match) {
      const [, day, month, year] = match;
      return `${year}-${months[month] || "01"}-${day.padStart(2, "0")}`;
    }
    return "2026-04-01";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-card">
      {/* Schema Markup for SEO */}
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        slug={params.slug || ""}
        datePublished={parseDate(post.date)}
        coverImage={post.coverImage}
        authorName={post.author.name}
        authorCredentials={post.author.credentials}
        readTime={post.readTime}
        category={post.category}
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${params.slug}` },
        ]}
      />

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
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C3D5A] via-[#1C3D5A]/40 to-transparent" />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 pb-10 lg:pb-14">
          <div className="container">
            <span className="inline-block bg-[#B87333] text-white text-xs font-semibold px-3 py-1.5 rounded-md mb-4">
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
              className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[#1C3D5A]/8"
            >
              <div className="flex items-center gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#B87333]/20"
                />
                <div>
                  <p className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground">{post.author.name}</p>
                  <p className="text-xs text-[#1C3D5A] dark:text-foreground/40">{post.author.credentials}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#1C3D5A] dark:text-foreground/40">
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
                  className="flex items-center gap-1.5 hover:text-[#B87333] transition-colors"
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
                prose-headings:text-[#1C3D5A] dark:text-foreground prose-headings:font-serif
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-[#1C3D5A] dark:text-foreground/70 prose-p:leading-relaxed
                prose-strong:text-[#1C3D5A] dark:text-foreground/90
                prose-li:text-[#1C3D5A] dark:text-foreground/70
                prose-a:text-[#B87333] prose-a:no-underline hover:prose-a:underline
                prose-hr:border-[#1C3D5A]/8
                prose-ol:text-[#1C3D5A] dark:text-foreground/70
                prose-ul:text-[#1C3D5A] dark:text-foreground/70
              "
            >
              <Streamdown>{post.content}</Streamdown>
            </motion.div>

            {/* Share buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-12 pt-8 border-t border-[#1C3D5A]/8"
            >
              <p className="text-sm font-semibold text-[#1C3D5A] dark:text-foreground mb-4">Compartilhe este artigo</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={shareWhatsApp}
                  className="group flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/20 hover:border-[#25D366] rounded-lg px-4 py-2.5 transition-all duration-300"
                >
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="text-sm font-medium">WhatsApp</span>
                </button>

                <button
                  onClick={shareLinkedIn}
                  className="group flex items-center gap-2 bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border border-[#0A66C2]/20 hover:border-[#0A66C2] rounded-lg px-4 py-2.5 transition-all duration-300"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </button>

                <button
                  onClick={copyLink}
                  className={`group flex items-center gap-2 rounded-lg px-4 py-2.5 border transition-all duration-300 ${
                    copied
                      ? "bg-[#B87333]/10 text-[#B87333] border-[#B87333]/20"
                      : "bg-[#1C3D5A]/5 hover:bg-[#1C3D5A]/10 text-[#1C3D5A] dark:text-foreground/60 hover:text-[#1C3D5A] dark:text-foreground border-[#1C3D5A]/10 hover:border-[#1C3D5A]/20"
                  }`}
                >
                  {copied ? (
                    <Check className="w-4.5 h-4.5" />
                  ) : (
                    <Copy className="w-4.5 h-4.5" />
                  )}
                  <span className="text-sm font-medium">{copied ? "Link copiado!" : "Copiar link"}</span>
                </button>
              </div>
            </motion.div>

            {/* CTA — Agendamento Doctoralia */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-14 relative overflow-hidden rounded-2xl"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1C3D5A] via-[#0F3460] to-[#1C3D5A]" />
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

              <div className="relative p-8 lg:p-12">
                {/* Top accent */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="h-px w-8 bg-[#B87333]" />
                  <span className="text-[#D4884A] text-xs font-semibold uppercase tracking-[0.2em]">Agende sua consulta</span>
                  <div className="h-px w-8 bg-[#B87333]" />
                </div>

                <h3 className="text-2xl lg:text-3xl text-white text-center mb-3 font-serif">
                  Tem dúvidas? Converse com um especialista.
                </h3>
                <p className="text-white/50 text-center text-sm lg:text-base mb-8 max-w-xl mx-auto leading-relaxed">
                  Agende uma consulta com o Dr. Felipe de Bulhões pelo Doctoralia.
                  Atendimento presencial em São Paulo e Campinas, ou por teleconsulta.
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 mb-8">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-medium">Nota 5.0</span>
                    <span className="text-white/40 text-xs">Doctoralia</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5">
                    <CalendarCheck className="w-4 h-4 text-[#D4884A]" />
                    <span className="text-white text-sm font-medium">Agenda online</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5">
                    <MessageCircle className="w-4 h-4 text-[#D4884A]" />
                    <span className="text-white text-sm font-medium">Teleconsulta</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button className="w-full sm:w-auto bg-[#B87333] hover:bg-[#8B5A2B] text-white px-8 h-12 text-base font-semibold shadow-lg shadow-[#B87333]/20 transition-all hover:shadow-xl hover:shadow-[#B87333]/30 hover:-translate-y-0.5">
                      <CalendarCheck className="w-5 h-5 mr-2" />
                      Agendar pelo Doctoralia
                    </Button>
                  </a>
                  <a
                    href="https://wa.me/5511981124455?text=Ol%C3%A1%2C%20li%20o%20artigo%20no%20blog%20e%20gostaria%20de%20tirar%20d%C3%BAvidas."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button variant="outline" className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10 bg-transparent px-8 h-12 text-base transition-all hover:-translate-y-0.5">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                </div>

                {/* Bottom note */}
                <p className="text-white/30 text-xs text-center mt-6">
                  CRM-SP 202291 · RQE 146538 / RQE 114019
                </p>
              </div>
            </motion.div>

            {/* Back to blog */}
            <div className="mt-10 text-center">
              <Link href="/blog">
                <Button variant="ghost" className="text-[#1C3D5A] dark:text-foreground/50 hover:text-[#1C3D5A] dark:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

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
