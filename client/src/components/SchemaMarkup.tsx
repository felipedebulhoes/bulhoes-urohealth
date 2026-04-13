/**
 * Schema Markup Components for SEO
 * JSON-LD structured data for Google Rich Results
 */
import { useEffect } from "react";

const SITE_URL = "https://felipebulhoes.com";
const DOCTOR_NAME = "Dr. Felipe de Bulhões Ojeda";
const DOCTOR_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028714945/a5L5opXZE55bTrHskCyAFy/og-image_318a8603.jpg";
const LOGO_URL = "https://cdn.manus.space/webdev/bulhoes-urohealth/logo_min8.webp";

function useJsonLd(id: string, data: Record<string, unknown>) {
  useEffect(() => {
    const existingScript = document.getElementById(id);
    if (existingScript) {
      existingScript.textContent = JSON.stringify(data);
      return;
    }

    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [id, JSON.stringify(data)]);
}

// --- Article Schema for Blog Posts ---
interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  coverImage: string;
  authorName?: string;
  authorCredentials?: string;
  readTime?: string;
  category?: string;
}

export function ArticleSchema({
  title,
  description,
  slug,
  datePublished,
  coverImage,
  authorName = DOCTOR_NAME,
  authorCredentials = "CRM-SP 202291 | Urologista | TCBC",
  readTime,
  category,
}: ArticleSchemaProps) {
  const articleData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "headline": title,
    "description": description,
    "url": `${SITE_URL}/blog/${slug}`,
    "image": coverImage,
    "datePublished": datePublished,
    "dateModified": datePublished,
    "inLanguage": "pt-BR",
    "author": {
      "@type": "Person",
      "name": authorName,
      "description": authorCredentials,
      "url": SITE_URL,
      "image": DOCTOR_IMAGE,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dr. Felipe de Bulhões — Urologista",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": LOGO_URL,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "Dr. Felipe de Bulhões | Urologista",
      "url": SITE_URL,
    },
  };

  if (readTime) {
    const minutes = parseInt(readTime);
    if (!isNaN(minutes)) {
      articleData["timeRequired"] = `PT${minutes}M`;
    }
  }

  if (category) {
    articleData["about"] = {
      "@type": "MedicalSpecialty",
      "name": category,
    };
  }

  useJsonLd("schema-article", articleData);
  return null;
}

// --- BreadcrumbList Schema ---
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  useJsonLd("schema-breadcrumb", breadcrumbData);
  return null;
}

// --- FAQPage Schema ---
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  questions: FAQItem[];
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map((q) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer,
      },
    })),
  };

  useJsonLd("schema-faq-page", faqData);
  return null;
}

// --- MedicalWebPage Schema for Educational Pages ---
interface MedicalPageSchemaProps {
  title: string;
  description: string;
  path: string;
  medicalCondition?: string;
  lastReviewed?: string;
}

export function MedicalPageSchema({
  title,
  description,
  path,
  medicalCondition,
  lastReviewed,
}: MedicalPageSchemaProps) {
  const pageData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": title,
    "description": description,
    "url": `${SITE_URL}${path}`,
    "inLanguage": "pt-BR",
    "lastReviewed": lastReviewed || "2026-04-01",
    "reviewedBy": {
      "@type": "Person",
      "name": DOCTOR_NAME,
      "url": SITE_URL,
      "jobTitle": "Urologista e Cirurgião Geral",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dr. Felipe de Bulhões — Urologista",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": LOGO_URL,
      },
    },
  };

  if (medicalCondition) {
    pageData["about"] = {
      "@type": "MedicalCondition",
      "name": medicalCondition,
    };
  }

  useJsonLd("schema-medical-page", pageData);
  return null;
}

// --- MedicalClinic Schema for Location Pages ---
interface MedicalClinicSchemaProps {
  name: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  slug: string;
  type: "convenio" | "particular";
  insurances?: string[];
  services: string[];
  hours: string[];
  paymentMethods?: string[];
}

export function MedicalClinicSchema({
  name,
  description,
  address,
  city,
  phone,
  slug,
  type,
  insurances,
  services,
  hours,
  paymentMethods,
}: MedicalClinicSchemaProps) {
  const clinicData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": name,
    "description": description,
    "url": `${SITE_URL}/local/${slug}`,
    "telephone": phone,
    "image": LOGO_URL,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address,
      "addressLocality": city.split(",")[0].trim(),
      "addressRegion": city.split(",")[1]?.trim() || "SP",
      "addressCountry": "BR",
    },
    "medicalSpecialty": "Urology",
    "availableService": services.map((s) => ({
      "@type": "MedicalProcedure",
      "name": s,
    })),
    "openingHoursSpecification": hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      "description": h,
    })),
    "isAcceptingNewPatients": true,
    "memberOf": {
      "@type": "Physician",
      "name": DOCTOR_NAME,
      "url": SITE_URL,
      "image": DOCTOR_IMAGE,
    },
  };

  if (type === "convenio" && insurances && insurances.length > 0) {
    clinicData["paymentAccepted"] = "Convênios e Particular";
    clinicData["currenciesAccepted"] = "BRL";
  } else {
    clinicData["paymentAccepted"] = paymentMethods?.join(", ") || "PIX, Cartão de Crédito, Cartão de Débito";
    clinicData["currenciesAccepted"] = "BRL";
  }

  useJsonLd(`schema-clinic-${slug}`, clinicData);
  return null;
}
