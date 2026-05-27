import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://carplaygo.fr";

  let routes: { route: string }[] = [];
  try {
    routes = await prisma.sEOSetting.findMany({
      select: { route: true },
    });
  } catch {
    // fallback static
  }

  const entries: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/compatibility`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/success`, lastModified: new Date(), changeFrequency: "never", priority: 0.1 },
    { url: `${base}/cancel`, lastModified: new Date(), changeFrequency: "never", priority: 0.1 },
  ];

  for (const r of routes) {
    if (r.route === "/" || r.route === "/compatibility") continue;
    entries.push({
      url: `${base}${r.route}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
