import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/private/"],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/admin/", "/api/", "/private/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/private/"],
      },
    ],
    sitemap: "https://qadimosco.com/sitemap.xml",
    host: "https://qadimosco.com",
  }
}
