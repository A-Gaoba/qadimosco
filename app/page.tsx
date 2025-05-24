import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CitiesSection } from "@/components/cities-section"
import { ActivitiesSection } from "@/components/activities-section"
import { ServicesSection } from "@/components/services-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "قاضي موسكو - أفضل شركة سياحة في روسيا | رحلات موسكو وسان بطرسبرغ وسوتشي",
  description:
    "قاضي موسكو الشركة الرائدة في السياحة العربية بروسيا. رحلات سياحية مميزة، مرشدين عرب، حجز فنادق وأنشطة بأفضل الأسعار. أكثر من 5000 عميل سعيد.",
  keywords:
    "شركة سياحة روسيا, رحلات موسكو, سياحة سان بطرسبرغ, سياحة سوتشي, مرشد عربي روسيا, حجز فنادق روسيا, أنشطة سياحية روسيا",
  openGraph: {
    title: "قاضي موسكو - أفضل شركة سياحة في روسيا",
    description: "اكتشف روسيا مع قاضي موسكو - رحلات مميزة ومرشدين عرب",
    url: "https://qadimosco.com",
    images: [{ url: "/og-home.jpg", width: 1200, height: 630 }],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://qadimosco.com/#organization",
      name: "قاضي موسكو",
      alternateName: "Qadimosco",
      url: "https://qadimosco.com",
      logo: {
        "@type": "ImageObject",
        url: "https://qadimosco.com/logo.png",
        width: 300,
        height: 300,
      },
      image: "https://qadimosco.com/company-image.jpg",
      description: "شركة سياحة متخصصة في تقديم رحلات سياحية مميزة إلى روسيا مع مرشدين عرب وخدمات متكاملة",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Moscow",
        addressLocality: "Moscow",
        addressRegion: "Moscow",
        postalCode: "101000",
        addressCountry: "RU",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+79174828474",
        contactType: "customer service",
        availableLanguage: ["Arabic", "Russian", "English"],
        areaServed: ["RU", "SA", "AE", "KW", "QA", "OM", "BH"],
      },
      sameAs: ["https://wa.me/79174828474", "https://t.me/qadimosco", "https://instagram.com/qadimosco"],
      foundingDate: "2014",
      numberOfEmployees: "25",
      slogan: "اكتشف روسيا معنا",
      serviceArea: {
        "@type": "Country",
        name: "Russia",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "خدمات السياحة في روسيا",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "TouristTrip",
              name: "رحلات موسكو",
              description: "جولات سياحية شاملة في موسكو مع مرشد عربي",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "TouristTrip",
              name: "رحلات سان بطرسبرغ",
              description: "استكشاف مدينة القياصرة مع مرشد عربي متخصص",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "TouristTrip",
              name: "رحلات سوتشي",
              description: "عطلات ساحلية وجبلية في منتجع البحر الأسود",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://qadimosco.com/#website",
      url: "https://qadimosco.com",
      name: "قاضي موسكو",
      description: "موقع شركة قاضي موسكو للسياحة في روسيا",
      publisher: {
        "@id": "https://qadimosco.com/#organization",
      },
      inLanguage: "ar-SA",
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://qadimosco.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://qadimosco.com",
        },
      ],
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main>
        <HeroSection />
        <AboutSection />
        <TestimonialsSection />
        <CitiesSection />
        <ActivitiesSection />
        <ServicesSection />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}
