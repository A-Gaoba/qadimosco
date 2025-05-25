import type React from "react"
import type { Metadata } from "next"
import { Cairo, Tajawal } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { ToastContainer } from "@/components/toast"
import { CartProvider } from "@/hooks/use-cart"

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
})

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
})

export const metadata: Metadata = {
  title: "قاضي موسكو - أفضل شركة سياحة في روسيا | رحلات موسكو وسان بطرسبرغ وسوتشي",
  description:
    "قاضي موسكو أفضل شركة سياحة عربية في روسيا. رحلات سياحية مميزة إلى موسكو وسان بطرسبرغ وسوتشي مع مرشدين عرب. حجز فنادق، أنشطة، ومواصلات بأفضل الأسعار.",
  keywords: [
    "شركة سياحة روسيا",
    "رحلات روسيا",
    "سياحة موسكو",
    "سياحة سان بطرسبرغ",
    "سياحة سوتشي",
    "شركة سياحة عربية روسيا",
    "مرشد سياحي عربي روسيا",
    "حجز فنادق روسيا",
    "أنشطة سياحية روسيا",
    "رحلات عائلية روسيا",
    "قاضي موسكو",
    "tourism company russia",
    "russia travel agency",
    "moscow tours",
    "st petersburg tours",
    "sochi tours",
    "arabic guide russia",
    "russia hotels booking",
    "russia activities",
    "russian tourism",
    "travel to russia",
    "russia vacation packages",
    "kremlin tours",
    "hermitage tours",
    "red square tours",
    "russia winter tours",
    "russia summer tours",
    "business travel russia",
    "family tours russia",
    "luxury travel russia",
    "budget travel russia",
    "russia visa assistance",
    "russia cultural tours",
    "russia adventure tours",
    "russia photography tours",
    "russia food tours",
    "russia shopping tours",
    "russia transportation",
    "russia airport transfer",
    "russia city tours",
    "russia group tours",
    "russia private tours",
    "russia honeymoon packages",
    "russia ski tours",
    "russia cruise tours",
  ].join(", "),
  authors: [{ name: "قاضي موسكو" }],
  creator: "قاضي موسكو",
  publisher: "قاضي موسكو",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    alternateLocale: ["en_US", "ru_RU"],
    url: "https://qadimosco.com",
    siteName: "قاضي موسكو - شركة السياحة الرائدة في روسيا",
    title: "قاضي موسكو - أفضل شركة سياحة في روسيا | رحلات موسكو وسان بطرسبرغ وسوتشي",
    description:
      "اكتشف روسيا مع قاضي موسكو، الشركة الرائدة في السياحة العربية بروسيا. رحلات مميزة، مرشدين عرب، وخدمات متكاملة لجميع المدن الروسية.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "قاضي موسكو - شركة السياحة في روسيا",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@qadimosco",
    creator: "@qadimosco",
    title: "قاضي موسكو - أفضل شركة سياحة في روسيا",
    description: "رحلات سياحية مميزة إلى روسيا مع مرشدين عرب وخدمات متكاملة",
    images: ["/twitter-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: "https://qadimosco.com",
    languages: {
      "ar-SA": "https://qadimosco.com",
      "en-US": "https://qadimosco.com/en",
      "ru-RU": "https://qadimosco.com/ru",
    },
  },
  category: "travel",
  classification: "Tourism and Travel Services",
  other: {
    "geo.region": "RU",
    "geo.placename": "Moscow, Russia",
    "geo.position": "55.7558;37.6176",
    ICBM: "55.7558, 37.6176",
    "business:contact_data:street_address": "Moscow, Russia",
    "business:contact_data:locality": "Moscow",
    "business:contact_data:region": "Moscow",
    "business:contact_data:postal_code": "101000",
    "business:contact_data:country_name": "Russia",
    "business:contact_data:phone_number": "+79177714832",
    "business:contact_data:website": "https://qadimosco.com",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable}`}>
      <body className={cairo.className}>
        <CartProvider>
          <Navbar />
          <ToastContainer />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
