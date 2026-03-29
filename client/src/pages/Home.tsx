import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import ServicesSection from "@/components/ServicesSection";
import VideosSection from "@/components/VideosSection";
import InsuranceSection from "@/components/InsuranceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LocationSection from "@/components/LocationSection";
import InstagramSection from "@/components/InstagramSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import EducationalPreviewSection from "@/components/EducationalPreviewSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SpecialtiesSection />
        <EducationalPreviewSection />
        <VideosSection />
        <ServicesSection />
        <InsuranceSection />
        <TestimonialsSection />
        <LocationSection />
        <BlogPreviewSection />
        <InstagramSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
