/**
 * Design: Clinical Precision — Swiss Medical Design
 * Layout para landing pages de campanha Google Ads
 * Foco em conversão: CTAs parametrizados, tracking avançado, WhatsApp por campanha
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Phone, Calendar, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "./WhatsAppButton";
import { trackEducationalPageView, trackDoctoraliaClick, trackWhatsAppClick } from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/tracking";
import { MedicalPageSchema, BreadcrumbSchema } from "@/components/SchemaMarkup";

interface CampaignLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  campaignSlug: string; // ex: "vasectomia-sem-bisturi"
  accentColor?: string;
  metaTitle?: string;
  metaDescription?: string;
  medicalCondition?: string;
  trustBadges?: string[];
  children: React.ReactNode;
}

export default function CampaignLayout({
  title,
  subtitle,
  description,
  campaignSlug,
  accentColor = "#B87333",
  metaTitle,
  metaDescription,
  medicalCondition,
  trustBadges = ["Formado Instituto D'Or", "CRM-SP 202.291", "Atendimento Particular"],
  children,
}: CampaignLayoutProps) {
  const whatsappUrl = getWhatsAppUrl({ page: campaignSlug });
  const doctoraliaUrl = "https://www.doctoralia.com.br/felipe-de-bulhoes-ojeda-2/urologista/campinas";

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
    trackDoctoraliaClick(`campaign_${campaignSlug}`);
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(`campaign_${campaignSlug}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-card">
      {/* Schema Markup */}
      <MedicalPageSchema
        title={metaTitle || title}
        description={metaDescription || description}
        path={typeof window !== "undefined" ? window.location.pathname : ""}
        medicalCondition={medicalCondition || title}
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: title, url: typeof window !== "undefined" ? window.location.pathname : "" },
        ]}
      />

      {/* Header — minimal, focused on conversion */}
      <header className="bg-[#1C3D5A] py-4 sticky top-0 z-50 border-b border-white/5">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <img
              src="/manus-storage/logo-landscape_be6628b3.svg"
              alt="Dr. Felipe de Bulhões - Urologista"
              className="h-10 lg:h-12 w-auto brightness-0 invert"
            />
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="hidden sm:block"
            >
              <Button variant="outline" className="text-white border-[#25D366]/40 hover:bg-[#25D366]/10 bg-transparent text-sm">
                <Phone className="w-4 h-4 mr-1.5" />
                WhatsApp
              </Button>
            </a>
            <a
              href={doctoraliaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDoctoraliaClick}
            >
              <Button className="bg-[#B87333] hover:bg-[#8B5A2B] text-white text-sm">
                <Calendar className="w-4 h-4 mr-1.5" />
                Agendar
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero — editorial, high-impact */}
      <section className="bg-gradient-to-b from-[#1C3D5A] via-[#0F3460] to-[#0D2847] py-16 lg:py-24">
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
            <h1 className="text-3xl lg:text-5xl text-white leading-tight mb-4 font-serif">
              {title}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">{description}</p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4">
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-white/50 text-sm">
                  {i === 0 ? <Award className="w-4 h-4 text-[#B87333]" /> : <Shield className="w-4 h-4 text-[#B87333]" />}
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <main>{children}</main>

      {/* CTA Final — conversion-focused */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#1C3D5A] to-[#0F3460]">
        <div className="container text-center max-w-2xl">
          <h2 className="text-2xl lg:text-3xl text-white mb-3 font-serif">
            Agende sua avaliação
          </h2>
          <p className="text-white/50 text-sm mb-8 leading-relaxed">
            O Dr. Felipe de Bulhões oferece atendimento individualizado em São Paulo e Campinas.
            Consulta presencial ou teleconsulta — escolha o formato mais conveniente.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={doctoraliaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDoctoraliaClick}
            >
              <Button className="bg-[#B87333] hover:bg-[#8B5A2B] text-white px-8 h-12 text-base">
                <Calendar className="w-5 h-5 mr-2" />
                Agendar pelo Doctoralia
              </Button>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
            >
              <Button variant="outline" className="text-white border-[#25D366]/30 hover:bg-[#25D366]/10 bg-transparent px-8 h-12 text-base">
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </a>
          </div>
          <p className="text-white/30 text-xs mt-6">
            Atendimento particular · Campinas Day Hospital · Clinovi SP (Paulista, Moema, Pinheiros, SBC) · Teleconsulta
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F2A3F] py-8">
        <div className="container text-center">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Dr. Felipe de Bulhões — Urologista | CRM-SP 202.291
          </p>
          <p className="text-white/20 text-xs mt-2">
            Este conteúdo é informativo e não substitui a consulta médica. Procure sempre um especialista.
          </p>
        </div>
      </footer>

      <WhatsAppButton
        message={`Olá! Vi a página sobre ${title} e gostaria de agendar uma consulta com o Dr. Felipe de Bulhões.`}
        source={`campaign_${campaignSlug}`}
      />
    </div>
  );
}
