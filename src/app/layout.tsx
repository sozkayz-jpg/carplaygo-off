import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./components/CartProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CarplayGO — CarPlay & Android Auto sans fil | Livraison gratuite",
  description:
    "Transformez votre CarPlay filaire en sans fil avec CarplayGO. Dongle universel compatible 95% des véhicules. Livraison gratuite en 24-48h. Garantie 2 ans.",
  keywords: [
    "dongle carplay sans fil",
    "android auto sans fil",
    "carplay wireless",
    "voiture compatible carplay",
    "carplay dongle",
  ],
  openGraph: {
    title: "CarplayGO — CarPlay & Android Auto sans fil",
    description: "Dongle universel CarPlay sans fil. Livraison gratuite, garantie 2 ans.",
    type: "website",
    locale: "fr_FR",
    url: "https://carplaygo.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "CarplayGO — CarPlay sans fil",
    description: "Dongle universel. Livraison gratuite en 24-48h.",
  },
  alternates: { canonical: "https://carplaygo.fr" },
  robots: { index: true, follow: true },
};

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
