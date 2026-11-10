import { lazy } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { usePageMeta } from "@/hooks/usePageMeta";
import DoctoraliaBadge from "@/components/DoctoraliaBadge";
import AboutSection from "@/components/AboutSection";
import StatsCounter from "@/components/StatsCounter";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import MobileBottomBar from "@/components/MobileBottomBar";
import ScheduleBanner from "@/components/ScheduleBanner";
import { ScrollReveal } from "@/components/ScrollReveal";
import DeferredSection from "@/components/DeferredSection";

const EducationalPreviewSection = lazy(() => import("@/components/EducationalPreviewSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const LocationCardsSection = lazy(() => import("@/components/LocationCardsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const QuickContactForm = lazy(() => import("@/components/QuickContactForm"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const DoctoraliaWidget = lazy(() => import("@/components/DoctoraliaWidget"));

interface HomeProps {
  /** Habilita uma apresentação privada da paleta marrom/neutra, sem publicar a mudança. */
  isBrandPalettePreview?: boolean;
  /** Habilita uma apresentação privada Quiet Luxury, sem alterar o site público. */
  isQuietLuxuryPreview?: boolean;
}

export default function Home({
  isBrandPalettePreview = false,
  isQuietLuxuryPreview = false,
}: HomeProps) {
  const isVisualPreview = isBrandPalettePreview || isQuietLuxuryPreview;
  const previewTitle = isQuietLuxuryPreview
    ? "Prévia Quiet Luxury"
    : "Prévia da nova paleta";
  const previewDescription = isQuietLuxuryPreview
    ? "Prévia privada Quiet Luxury do site do Dr. Felipe de Bulhões."
    : "Prévia privada da nova paleta visual do site do Dr. Felipe de Bulhões.";

  usePageMeta({
    title: isVisualPreview ? previewTitle : "Urologista em São Paulo e Campinas",
    description: isVisualPreview
      ? previewDescription
      : "Dr. Felipe de Bulhões — Urologista em São Paulo e Campinas. Cirurgia robótica, endourologia e saúde do homem. Atendimento particular. Formado Instituto D'Or. Agende.",
    canonical: isVisualPreview ? undefined : "https://felipebulhoes.com/",
  });

  return (
    <div
      className={`min-h-screen flex flex-col brand-site-home${isBrandPalettePreview ? " brand-preview-espresso" : ""}${isQuietLuxuryPreview ? " quiet-luxury-preview" : ""}`}
      data-brand-palette="espresso"
    >
      {isVisualPreview && (
        <aside className="brand-preview-ribbon" aria-label="Aviso de prévia de identidade visual">
          <span>Prévia privada</span>
          <strong>
            {isQuietLuxuryPreview
              ? "Quiet Luxury • Marfim, pedra, café e bronze fosco"
              : "Nova paleta • Marrom profundo, café, taupe e off white"}
          </strong>
          <a href="/" className="brand-preview-current-link">Ver site atual</a>
        </aside>
      )}
      <Header
        previewMode={isVisualPreview}
        previewHref={isQuietLuxuryPreview ? "/preview-quiet-luxury" : "/preview-paleta"}
      />
      <main>
        <HeroSection palette="espresso" />
        <ScrollReveal><DoctoraliaBadge /></ScrollReveal>
        <ScrollReveal><SpecialtiesSection /></ScrollReveal>
        <DeferredSection minHeight={560}>
          <ScrollReveal><TestimonialsSection /></ScrollReveal>
        </DeferredSection>
        <DeferredSection minHeight={820}>
          <ScrollReveal><LocationCardsSection /></ScrollReveal>
        </DeferredSection>
        <ScrollReveal><AboutSection /></ScrollReveal>
        <ScrollReveal><StatsCounter /></ScrollReveal>
        <DeferredSection minHeight={520}>
          <ScrollReveal><FAQSection /></ScrollReveal>
        </DeferredSection>
        <DeferredSection minHeight={520}>
          <ScrollReveal><QuickContactForm /></ScrollReveal>
        </DeferredSection>
        <DeferredSection minHeight={440}>
          <ScrollReveal><EducationalPreviewSection /></ScrollReveal>
        </DeferredSection>
        <DeferredSection minHeight={500}>
          <ScrollReveal><ContactSection /></ScrollReveal>
        </DeferredSection>
        <DeferredSection mode="idle" minHeight={0}><DoctoraliaWidget /></DeferredSection>
      </main>
      <Footer />
      <WhatsAppWidget />
      <MobileBottomBar source="homepage" />
      <ScheduleBanner />
    </div>
  );
}
