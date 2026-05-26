import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/success", "/cancel", "/api/"] },
    ],
    sitemap: "https://carplaygo.fr/sitemap.xml",
  };
}
