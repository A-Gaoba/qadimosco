"use client"

import Head from "next/head"

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  ogImage?: string
}

export function SEOHead({
  title = "قاضي موسكو - أفضل شركة سياحة في روسيا",
  description = "شركة قاضي موسكو الرائدة في السياحة العربية بروسيا. رحلات مميزة ومرشدين عرب",
  keywords = "شركة سياحة روسيا, رحلات روسيا, سياحة موسكو",
  canonical,
  ogImage = "/og-default.jpg",
}: SEOHeadProps) {
  return (
    <Head>
      {/* Hreflang tags for international SEO */}
      <link rel="alternate" hrefLang="ar" href="https://qadimosco.com" />
      <link rel="alternate" hrefLang="en" href="https://qadimosco.com/en" />
      <link rel="alternate" hrefLang="ru" href="https://qadimosco.com/ru" />
      <link rel="alternate" hrefLang="x-default" href="https://qadimosco.com" />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Additional meta tags */}
      <meta name="geo.region" content="RU" />
      <meta name="geo.placename" content="Moscow, Russia" />
      <meta name="geo.position" content="55.7558;37.6176" />
      <meta name="ICBM" content="55.7558, 37.6176" />

      {/* Business information */}
      <meta name="business:contact_data:phone_number" content="+79174828474" />
      <meta name="business:contact_data:website" content="https://qadimosco.com" />
      <meta name="business:contact_data:country_name" content="Russia" />

      {/* Additional Open Graph tags */}
      <meta property="og:locale" content="ar_SA" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="ru_RU" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@qadimosco" />

      {/* Additional SEO tags */}
      <meta name="rating" content="5" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="1 days" />
      <meta name="language" content="Arabic" />
      <meta name="target" content="all" />
      <meta name="audience" content="all" />
      <meta name="coverage" content="Worldwide" />

      {/* Rich snippets for local business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "قاضي موسكو",
          image: "https://qadimosco.com/logo.png",
          telephone: "+79174828474",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Moscow",
            addressLocality: "Moscow",
            addressRegion: "Moscow",
            postalCode: "101000",
            addressCountry: "RU",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 55.7558,
            longitude: 37.6176,
          },
          url: "https://qadimosco.com",
          sameAs: ["https://wa.me/79174828474"],
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "500",
          },
        })}
      </script>
    </Head>
  )
}
