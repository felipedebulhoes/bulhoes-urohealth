import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { usePageMeta } from "@/hooks/usePageMeta";
import DoctoraliaBadge from "@/components/DoctoraliaBadge";
import AboutSection from "@/components/AboutSection";
import StatsCounter from "@/components/StatsCounter";
import EducationSection from "@/components/EducationSection";
import MediaSection from "@/components/MediaSection";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import EducationalPreviewSection from "@/components/EducationalPreviewSection";
import SymptomChecker from "@/components/SymptomChecker";
import VideosSection from "@/components/VideosSection";
import ServicesSection from "@/components/ServicesSection";
import InsuranceSection from "@/components/InsuranceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LocationCardsSection from "@/components/LocationCardsSection";
import FAQSection from "@/components/FAQSection";
import QuickContactForm from "@/components/QuickContactForm";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import NewsletterSection from "@/components/NewsletterSection";
import InstagramSection from "@/components/InstagramSection";
import ContactSection from "@/components/ContactSection";
import DoctoraliaWidget from "@/components/DoctoraliaWidget";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import AIChatWidget from "@/components/AIChatWidget";
import ScheduleBanner from "@/components/ScheduleBanner";
import { ScrollReveal } from "@/components/ScrollReveal";
import PlaybookSection from "@/components/PlaybookSection";

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
          <MediaSection />
        </ScrollReveal>
        <ScrollReveal>
          <SpecialtiesSection />
        </ScrollReveal>
        <ScrollReveal>
          <PlaybookSection />
        </ScrollReveal>
        <ScrollReveal>
          <EducationalPreviewSection />
        </ScrollReveal>
        <ScrollReveal>
          <SymptomChecker />
        </ScrollReveal>
        <ScrollReveal>
          <VideosSection />
        </ScrollReveal>
        <ScrollReveal>
          <ServicesSection />
        </ScrollReveal>
        <ScrollReveal>
          <InsuranceSection />
        </ScrollReveal>
        <ScrollReveal>
          <TestimonialsSection />
        </ScrollReveal>
        <ScrollReveal>
          <LocationCardsSection />
        </ScrollReveal>
        <ScrollReveal>
          <FAQSection />
        </ScrollReveal>
        <ScrollReveal>
          <QuickContactForm />
        </ScrollReveal>
        <ScrollReveal>
          <BlogPreviewSection />
        </ScrollReveal>
        <ScrollReveal>
          <NewsletterSection />
        </ScrollReveal>
        <ScrollReveal>
          <InstagramSection />
        </ScrollReveal>
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
        <DoctoraliaWidget />
      </main>
      <Footer />
      <WhatsAppWidget />
      <AIChatWidget />
      <ScheduleBanner />
    </div>
  );
}
