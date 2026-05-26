import { Navigation } from "./sections/Navigation";
import { Hero } from "./sections/Hero";
import { SocialProof } from "./sections/SocialProof";
import { Benefits } from "./sections/Benefits";
import { Variants } from "./sections/Variants";
import { HowItWorks } from "./sections/HowItWorks";
import { Vehicles } from "./sections/Vehicles";
import { Specs } from "./sections/Specs";
import { FAQ } from "./sections/FAQ";
import { TrustCTA } from "./sections/TrustCTA";
import { Footer } from "./sections/Footer";
import { JSONLD } from "./components/JSONLD";
import { variants } from "./lib/products";
import { faqItems } from "./lib/faq";

export default function HomePage() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "CarplayGO Dongle USB",
    image: "https://carplaygo.fr/images/dongle-dual.png",
    description:
      "Dongle USB universel pour activer le CarPlay sans fil et Android Auto sans fil sur les véhicules d'usine.",
    brand: { "@type": "Brand", name: "CarplayGO" },
    offers: variants.map((v) => ({
      "@type": "Offer",
      url: `https://carplaygo.fr/#${v.id}`,
      price: v.price.toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Product",
        name: v.name,
        sku: v.id,
      },
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "2847",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CarplayGO",
    url: "https://carplaygo.fr",
    logo: "https://carplaygo.fr/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@carplaygo.fr",
      contactType: "customer service",
    },
  };

  return (
    <>
      <JSONLD data={productJsonLd} />
      <JSONLD data={faqJsonLd} />
      <JSONLD data={orgJsonLd} />
      <Navigation />
      <main>
        <Hero />
        <SocialProof />
        <Benefits />
        <Variants />
        <HowItWorks />
        <Vehicles />
        <Specs />
        <FAQ />
        <TrustCTA />
      </main>
      <Footer />
    </>
  );
}
