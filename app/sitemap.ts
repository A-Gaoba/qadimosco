import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://qadimosco.com"

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: {
          ar: `${baseUrl}`,
          en: `${baseUrl}/en`,
          ru: `${baseUrl}/ru`,
        },
      },
    },
    {
      url: `${baseUrl}/hotels`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${baseUrl}/hotels`,
          en: `${baseUrl}/en/hotels`,
          ru: `${baseUrl}/ru/hotels`,
        },
      },
    },
    {
      url: `${baseUrl}/activities`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${baseUrl}/activities`,
          en: `${baseUrl}/en/activities`,
          ru: `${baseUrl}/ru/activities`,
        },
      },
    },
    {
      url: `${baseUrl}/transportation`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          ar: `${baseUrl}/transportation`,
          en: `${baseUrl}/en/transportation`,
          ru: `${baseUrl}/ru/transportation`,
        },
      },
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          ar: `${baseUrl}/testimonials`,
          en: `${baseUrl}/en/testimonials`,
          ru: `${baseUrl}/ru/testimonials`,
        },
      },
    },
    {
      url: `${baseUrl}/store`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
    // City-specific pages
    {
      url: `${baseUrl}/moscow-tours`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/st-petersburg-tours`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sochi-tours`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]
}
