import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./components/CartProvider";
import { prisma } from "@/lib/prisma";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  let seo;
  let config;
  try {
    seo = await prisma.sEOSetting.findUnique({ where: { route: "/" } });
    config = await prisma.siteConfig.findUnique({ where: { id: "singleton" } });
  } catch {
    // DB not available during build or in static mode
  }

  return {
    title: seo?.title || "CarplayGO — CarPlay & Android Auto sans fil | Livraison gratuite",
    description:
      seo?.description ||
      "Transformez votre CarPlay filaire en sans fil avec CarplayGO. Dongle universel compatible 95% des véhicules. Livraison gratuite en 24-48h. Garantie 2 ans.",
    keywords: seo?.keywords ? seo.keywords.split(", ") : [
      "dongle carplay sans fil",
      "android auto sans fil",
      "carplay wireless",
      "voiture compatible carplay",
      "carplay dongle",
    ],
    openGraph: {
      title: seo?.ogTitle || seo?.title || "CarplayGO — CarPlay & Android Auto sans fil",
      description:
        seo?.ogDescription ||
        seo?.description ||
        "Dongle universel CarPlay sans fil. Livraison gratuite, garantie 2 ans.",
      type: "website",
      locale: "fr_FR",
      url: "https://carplaygo.fr",
      images: config?.ogImageUrl ? [{ url: config.ogImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.ogTitle || seo?.title || "CarplayGO — CarPlay sans fil",
      description:
        seo?.ogDescription ||
        seo?.description ||
        "Dongle universel. Livraison gratuite en 24-48h.",
      images: config?.ogImageUrl ? [config.ogImageUrl] : undefined,
    },
    alternates: { canonical: "https://carplaygo.fr" },
    robots: { index: !seo?.noIndex, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
