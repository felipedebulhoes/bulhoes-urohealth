/*
 * Design: Clinical Precision — Swiss Medical Design
 * Shared layout for educational pages with header, hero, footer, and SEO meta tags
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "./WhatsAppButton";
import MobileBottomBar from "./MobileBottomBar";
import { trackEducationalPageView, trackDoctoraliaClick, trackWhatsAppClick } from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/tracking";
import { MedicalPageSchema, BreadcrumbSchema } from "@/components/SchemaMarkup";
import SocialShareButtons from "@/components/SocialShareButtons";
import { CTAButtonWithAnimation } from "@/components/CTAButtonWithAnimation";

interface EducationalLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  accentColor?: string;
  metaTitle?: string;
  metaDescription?: string;
  medicalCondition?: string;
  children: React.ReactNode;
}

export default function EducationalLayout({
  title,
  subtitle,
  description,
  accentColor = "#B87333",
  metaTitle,
  metaDescription,
  medicalCondition,
  children,
}: EducationalLayoutProps) {
  const pageSlug = typeof window !== "undefined"
    ? window.location.pathname.replace(/^\//, "").replace(/\//g, "-") || "home"
    : "educational";

  const doctoraliaUrl = `https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas?utm_source=site&utm_medium=educational&utm_campaign=${pageSlug}`;
  const whatsappCtaUrl = getWhatsAppUrl({ page: pageSlug });

  useEffect(() => {
    const pageTitle = metaTitle || `${title} | Dr. Felipe de Bulhões - Urologista`;
    document.title = pageTitle;

    const metaDesc = metaDescription || description;
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "description");
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", metaDesc);

    trackEducationalPageView(title, window.location.pathname);

    return () => {
      document.title = "Dr. Felipe de Bulhões | Urologista em São Paulo e Campinas";
    };
  }, [title, description, metaTitle, metaDescription]);

  const handleDoctoraliaClick = () => {
    trackDoctoraliaClick(`educational_${pageSlug}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-card">
      {/* Schema Markup for SEO */}
      <MedicalPageSchema
        title={metaTitle || title}
        description={metaDescription || description}
        path={typeof window !== "undefined" ? window.location.pathname : ""}
        medicalCondition={medicalCondition || title}
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Conteúdo Educativo", url: "/" },
          { name: title, url: typeof window !== "undefined" ? window.location.pathname : "" },
        ]}
      />

      {/* Header */}
      <header className="bg-[#1C3D5A] py-4 sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <img loading="eager"
              src="/manus-storage/logo-landscape-dr-felipe_cc84d4a3.svg"
              alt="Dr. Felipe de Bulhões - Urologista"
              className="h-12 lg:h-14 w-auto brightness-0 invert"
            />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <CTAButtonWithAnimation
              href={doctoraliaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
              onClick={handleDoctoraliaClick}
              loadingText="Abrindo agenda…"
              size="sm"
              icon={<Phone className="w-4 h-4" />}
            >
              Agendar Consulta
            </CTAButtonWithAnimation>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#1C3D5A] to-[#0F3460] py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ backgroundColor: accentColor }} />
              <span
                className="text-sm font-semibold uppercase tracking-[0.15em]"
                style={{ color: accentColor }}
              >
                {subtitle}
              </span>
            </div>
            <h1 className="text-3xl lg:text-5xl text-white leading-tight mb-4">
              {title}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">{description}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <main>{children}</main>

      <section className="border-y border-[#1C3D5A]/8 bg-[#F7F8F8] py-8 dark:bg-card">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-lg font-semibold text-[#1C3D5A] dark:text-foreground">Compartilhe informação confiável</h2>
            <p className="mt-1 text-sm text-[#1C3D5A]/55 dark:text-foreground/55">Ajude outras pessoas a encontrar conteúdo médico educativo.</p>
          </div>
          <SocialShareButtons title={title} text={description} source={`educational_${pageSlug}`} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1C3D5A] to-[#0F3460]">
        <div className="container text-center">
          <h2 className="text-2xl lg:text-3xl text-white mb-3 font-serif">
            Tem dúvidas? Agende uma consulta
          </h2>
          <p className="text-white/50 text-sm mb-6 max-w-lg mx-auto">
            O Dr. Felipe de Bulhões está disponível para esclarecer suas dúvidas e
            indicar o melhor tratamento para o seu caso. Atendimento presencial e por
            teleconsulta.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <CTAButtonWithAnimation
              href={doctoraliaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDoctoraliaClick}
              loadingText="Abrindo agenda…"
              className="px-6 h-11"
            >
              Agendar Consulta
            </CTAButtonWithAnimation>
            <CTAButtonWithAnimation
              href={whatsappCtaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(`educational_${pageSlug}`)}
              loadingText="Abrindo WhatsApp…"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover:text-white px-6 h-11"
            >
              WhatsApp
            </CTAButtonWithAnimation>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F2A3F] py-8">
        <div className="container text-center">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Dr. Felipe de Bulhões — Urologista | CRM-SP 202291
          </p>
          <p className="text-white/20 text-xs mt-2">
            Este conteúdo é informativo e não substitui a consulta médica. Procure sempre um especialista.
          </p>
        </div>
      </footer>

      <MobileBottomBar source={pageSlug} />
      <WhatsAppButton
        message={`Olá! Vi a página sobre ${title} e gostaria de agendar uma consulta com o Dr. Felipe de Bulhões.`}
        source={`educational_${pageSlug}`}
      />
    </div>
  );
}
