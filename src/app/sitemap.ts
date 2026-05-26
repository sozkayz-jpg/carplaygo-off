import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://carplaygo.fr";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/compatibility`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/success`, lastModified: new Date(), changeFrequency: "never", priority: 0.1 },
    { url: `${base}/cancel`, lastModified: new Date(), changeFrequency: "never", priority: 0.1 },
  ];
}
