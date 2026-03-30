import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
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
import LocationSection from "@/components/LocationSection";
import FAQSection from "@/components/FAQSection";
import QuickContactForm from "@/components/QuickContactForm";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import NewsletterSection from "@/components/NewsletterSection";
import InstagramSection from "@/components/InstagramSection";
import ContactSection from "@/components/ContactSection";
import DoctoraliaWidget from "@/components/DoctoraliaWidget";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScheduleBanner from "@/components/ScheduleBanner";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <DoctoraliaBadge />
        <AboutSection />
        <StatsCounter />
        <EducationSection />
        <MediaSection />
        <SpecialtiesSection />
        <EducationalPreviewSection />
        <SymptomChecker />
        <VideosSection />
        <ServicesSection />
        <InsuranceSection />
        <TestimonialsSection />
        <LocationSection />
        <FAQSection />
        <QuickContactForm />
        <BlogPreviewSection />
        <NewsletterSection />
        <InstagramSection />
        <ContactSection />
        <DoctoraliaWidget />
      </main>
      <Footer />
      <WhatsAppWidget />
      <ScheduleBanner />
    </div>
  );
}
