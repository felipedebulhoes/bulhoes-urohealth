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
import { MedicalPageSchema } from "@/components/SchemaMarkup";
import { useLocation } from "wouter";
import { getIndexedDocumentMeta } from "@shared/pageMetadata";
import { formatMedicalReviewDate, getMedicalReviewDate } from "@shared/medicalReview";
import SocialShareButtons from "@/components/SocialShareButtons";
import { CTAButtonWithAnimation } from "@/components/CTAButtonWithAnimation";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { foldEducationalSections } from "@/components/foldEducationalSections";
import InlineConsultCTA from "@/components/InlineConsultCTA";

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
  accentColor = "#C9B6A3",
  metaTitle,
  metaDescription,
  medicalCondition,
  children,
}: EducationalLayoutProps) {
  const [currentPath] = useLocation();
  const reviewDate = getMedicalReviewDate(currentPath);
  const pageSlug = typeof window !== "undefined"
    ? window.location.pathname.replace(/^\//, "").replace(/\//g, "-") || "home"
    : "educational";

  const doctoraliaUrl = `https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas?utm_source=site&utm_medium=educational&utm_campaign=${pageSlug}`;
  const whatsappCtaUrl = getWhatsAppUrl({ page: pageSlug });

  useEffect(() => {
    // Nas páginas indexáveis, vale o mesmo título e descrição do servidor.
    const indexed = getIndexedDocumentMeta(currentPath);
    const pageTitle = indexed?.title || metaTitle || `${title} | Dr. Felipe de Bulhões - Urologista`;
    document.title = pageTitle;

    const metaDesc = indexed?.description || metaDescription || description;
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
  }, [title, description, metaTitle, metaDescription, currentPath]);

  const handleDoctoraliaClick = () => {
    trackDoctoraliaClick(`educational_${pageSlug}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-card">
      {/* Schema Markup for SEO */}
      <MedicalPageSchema
        title={metaTitle || title}
        description={metaDescription || description}
        path={currentPath}
        medicalCondition={medicalCondition || title}
      />

      {/* Header */}
      <header className="brand-campaign-header bg-[#F7F5F2] py-4 sticky top-0 z-50 border-b border-[#2E2520]/10">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <img loading="eager"
              src="/brand/logo-site-fundo-claro.png"
              alt="Dr. Felipe de Bulhões - Urologista"
              className="h-12 lg:h-14 w-auto"
            />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" className="brand-campaign-outline text-[#2E2520] border-[#4A3A30]/35 hover:bg-[#4A3A30]/10 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <CTAButtonWithAnimation
              href={doctoraliaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="max-sm:hidden"
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
          <PageBreadcrumbs className="mb-7" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ backgroundColor: accentColor }} />
              <span
                className="text-sm font-semibold uppercase tracking-[0.15em] text-[#C9B6A3]"
              >
                {subtitle}
              </span>
            </div>
            <h1 className="text-3xl lg:text-5xl text-white leading-tight mb-4">
              {title}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">{description}</p>
            <div className="mt-7 flex items-center gap-3 border-t border-white/12 pt-5">
              <img
                src="/manus-storage/instagram_profile_bc867e99_9d4bb2af.webp"
                alt=""
                width={44}
                height={44}
                loading="eager"
                className="h-11 w-11 shrink-0 rounded-full border border-[#C9B6A3]/50 object-cover"
                onError={(event) => { event.currentTarget.style.display = "none"; }}
              />
              <p className="text-sm leading-relaxed text-white/75">
                <span className="font-semibold text-white">Dr. Felipe de Bulhões</span> · Urologista
                <br />
                <span className="text-white/60">
                  CRM-SP 202291 · RQE 146538
                  {reviewDate && ` · Revisado em ${formatMedicalReviewDate(reviewDate)}`}
                  {" · "}
                  <Link href="/sobre" className="underline decoration-[#C9B6A3]/60 underline-offset-4 hover:text-white">
                    Sobre o médico
                  </Link>
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <main>
        {foldEducationalSections(
          children,
          <InlineConsultCTA
            title="Quer conversar sobre o seu caso?"
            note="A avaliação é individual. Atendimento presencial em São Paulo e Campinas, ou por teleconsulta."
            href={whatsappCtaUrl}
            onClick={() => trackWhatsAppClick(`educational_mid_${pageSlug}`)}
          />,
        )}
      </main>

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
            Cada caso pede uma avaliação própria
          </h2>
          <p className="text-white/65 text-sm mb-6 max-w-lg mx-auto">
            Na consulta, o Dr. Felipe de Bulhões ouve a sua história, examina, explica
            as opções com base nas diretrizes atuais e decide o caminho junto com você.
            Atendimento presencial em São Paulo e Campinas, ou por teleconsulta.
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
          <p className="text-white/70 text-sm mb-3">
            Conteúdo médico de responsabilidade do Dr. Felipe de Bulhões Ojeda — CRM-SP 202291 · RQE 146538 (Urologia) · RQE 114019 (Cirurgia Geral).
            {reviewDate && ` Revisado em ${formatMedicalReviewDate(reviewDate)}.`}
          </p>
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
