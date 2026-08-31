import { lazy } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { usePageMeta } from "@/hooks/usePageMeta";
import DoctoraliaBadge from "@/components/DoctoraliaBadge";
import AboutSection from "@/components/AboutSection";
import StatsCounter from "@/components/StatsCounter";
import EducationSection from "@/components/EducationSection";
import ResearchSection from "@/components/ResearchSection";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import MobileBottomBar from "@/components/MobileBottomBar";
import ScheduleBanner from "@/components/ScheduleBanner";
import { ScrollReveal } from "@/components/ScrollReveal";
import DeferredSection from "@/components/DeferredSection";

const MediaSection = lazy(() => import("@/components/MediaSection"));
const PlaybookSection = lazy(() => import("@/components/PlaybookSection"));
const EducationalPreviewSection = lazy(() => import("@/components/EducationalPreviewSection"));
const SymptomChecker = lazy(() => import("@/components/SymptomChecker"));
const VideosSection = lazy(() => import("@/components/VideosSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const LocationCardsSection = lazy(() => import("@/components/LocationCardsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const QuickContactForm = lazy(() => import("@/components/QuickContactForm"));
const BlogPreviewSection = lazy(() => import("@/components/BlogPreviewSection"));
const NewsletterSection = lazy(() => import("@/components/NewsletterSection"));
const InstagramSection = lazy(() => import("@/components/InstagramSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const DoctoraliaWidget = lazy(() => import("@/components/DoctoraliaWidget"));
const AIChatWidget = lazy(() => import("@/components/AIChatWidget"));
const SocialShareButtons = lazy(() => import("@/components/SocialShareButtons"));

export default function Home() {
  usePageMeta({
    title: "Urologista em São Paulo e Campinas",
    description: "Dr. Felipe de Bulhões — Urologista em São Paulo e Campinas. Cirurgia robótica, endourologia e saúde do homem. Atendimento particular. Formado Instituto D'Or. Agende.",
    canonical: "https://felipebulhoes.com/",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <ScrollReveal>
          <DoctoraliaBadge />
        </ScrollReveal>
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>
        <ScrollReveal>
          <StatsCounter />
        </ScrollReveal>
        <ScrollReveal>
          <EducationSection />
        </ScrollReveal>
        <ScrollReveal>
          <ResearchSection />
        </ScrollReveal>
        <DeferredSection minHeight={420}>
          <ScrollReveal><MediaSection /></ScrollReveal>
        </DeferredSection>
        <ScrollReveal>
          <SpecialtiesSection />
        </ScrollReveal>
        <DeferredSection minHeight={440}>
          <ScrollReveal><PlaybookSection /></ScrollReveal>
        </DeferredSection>
        <DeferredSection minHeight={620}>
          <ScrollReveal><EducationalPreviewSection /></ScrollReveal>
        </DeferredSection>
        <DeferredSection minHeight={520}>
          <ScrollReveal><SymptomChecker /></ScrollReveal>
        </DeferredSection>
        <DeferredSection minHeight={520}>
          <ScrollReveal><VideosSection /></ScrollReveal>
        </DeferredSection>
        <ScrollReveal>
          <ServicesSection />
        </ScrollReveal>
        <DeferredSection minHeight={560}>
          <ScrollReveal><TestimonialsSection /></ScrollReveal>
        </DeferredSection>
        <DeferredSection minHeight={820}>
          <ScrollReveal><LocationCardsSection /></ScrollReveal>
        </DeferredSection>
        <DeferredSection minHeight={520}>
          <ScrollReveal><FAQSection /></ScrollReveal>
        </DeferredSection>
        <DeferredSection minHeight={520}>
          <ScrollReveal><QuickContactForm /></ScrollReveal>
        </DeferredSection>
        <DeferredSection minHeight={480}>
          <ScrollReveal><BlogPreviewSection /></ScrollReveal>
        </DeferredSection>
        <DeferredSection minHeight={320}>
          <ScrollReveal><NewsletterSection /></ScrollReveal>
        </DeferredSection>
        <DeferredSection minHeight={420}>
          <ScrollReveal><InstagramSection /></ScrollReveal>
        </DeferredSection>
        <DeferredSection minHeight={500}>
          <ScrollReveal><ContactSection /></ScrollReveal>
        </DeferredSection>
        <DeferredSection minHeight={210}>
          <section className="border-t border-[#1C3D5A]/8 bg-[#F7F8F8] py-10 dark:bg-card">
            <div className="container flex flex-col items-center justify-between gap-5 sm:flex-row">
              <div>
                <h2 className="text-xl font-semibold text-[#1C3D5A] dark:text-foreground">Compartilhe o site</h2>
                <p className="mt-1 text-sm text-[#1C3D5A]/55 dark:text-foreground/55">Indique informação urológica confiável para quem precisa.</p>
              </div>
              <SocialShareButtons
                title="Dr. Felipe de Bulhões — Urologista em São Paulo e Campinas"
                text="Conheça o site e os conteúdos educativos do Dr. Felipe de Bulhões."
                url="https://felipebulhoes.com/"
                source="homepage"
              />
            </div>
          </section>
        </DeferredSection>
        <DeferredSection mode="idle" minHeight={0}><DoctoraliaWidget /></DeferredSection>
      </main>
      <Footer />
      <WhatsAppWidget />
      <MobileBottomBar source="homepage" />
      <DeferredSection mode="idle" minHeight={0}><AIChatWidget /></DeferredSection>
      <ScheduleBanner />
    </div>
  );
}
