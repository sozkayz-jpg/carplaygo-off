import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // SiteConfig
  await prisma.siteConfig.create({
    data: {
      id: "singleton",
      logoUrl: null,
      logoWidth: 120,
      logoHeight: 40,
      faviconUrl: null,
      ogImageUrl: null,
      primaryColor: "#10B981",
    },
  });

  // Products
  await prisma.product.createMany({
    data: [
      {
        name: "Wireless CarPlay",
        tagline: "Pour iPhone uniquement",
        description:
          "Transformez votre CarPlay filaire en connexion sans fil. Compatible avec tous les iPhone dotés de CarPlay.",
        price: 49.9,
        originalPrice: 79.9,
        imageUrl: "/images/dongle-wireless.png",
        features: JSON.stringify(["WiFi 5GHz", "Bluetooth 5.0", "Mise à jour OTA", "Plug & Play"]),
        stripePriceId: "price_wireless_placeholder",
      },
      {
        name: "CarPlay + Android Auto",
        tagline: "Dual, pour iPhone & Android",
        description:
          "La solution ultime : CarPlay sans fil pour iPhone ET Android Auto sans fil pour smartphones Android. Un dongle, deux univers.",
        price: 59.9,
        originalPrice: 99.9,
        imageUrl: "/images/dongle-dual.png",
        features: JSON.stringify(["WiFi 5GHz", "Bluetooth 5.0", "Mise à jour OTA", "Bascule auto iOS/Android"]),
        stripePriceId: "price_dual_placeholder",
      },
    ],
  });

  // SEOSettings
  await prisma.sEOSetting.createMany({
    data: [
      {
        route: "/",
        title: "CarplayGO — CarPlay & Android Auto sans fil | Livraison gratuite",
        description:
          "Transformez votre CarPlay filaire en sans fil avec CarplayGO. Dongle universel compatible 95% des véhicules. Livraison gratuite en 24-48h. Garantie 2 ans.",
        keywords:
          "dongle carplay sans fil, android auto sans fil, carplay wireless, voiture compatible carplay",
        ogTitle: "CarplayGO — CarPlay & Android Auto sans fil",
        ogDescription: "Dongle universel CarPlay sans fil. Livraison gratuite, garantie 2 ans.",
      },
      {
        route: "/compatibility",
        title: "Compatibilité CarplayGO — Liste des véhicules compatibles",
        description:
          "Découvrez si votre voiture est compatible avec le dongle CarplayGO. Plus de 50 marques et des centaines de modèles.",
        keywords: "compatibilité carplay, voiture compatible, marques carplay",
      },
    ],
  });

  // FAQItems
  const faqData = [
    {
      question: "Le dongle CarplayGO fonctionne-t-il sur ma voiture ?",
      answer:
        "CarplayGO est compatible avec 95% des véhicules équipés du CarPlay filaire d'usine. Si votre voiture possède une prise USB avec laquelle vous utilisez déjà CarPlay via câble, notre dongle transformera cette connexion en sans fil.",
      keywords: "compatibilité, voiture, marques",
      order: 0,
    },
    {
      question: "Quelle est la différence entre la version Wireless CarPlay et CarPlay + Android Auto ?",
      answer:
        "La version Wireless CarPlay est dédiée aux iPhones. La version CarPlay + Android Auto est universelle : CarPlay sans fil pour iPhone ET Android Auto sans fil pour smartphones Android.",
      keywords: "différence, iphone, android, version",
      order: 1,
    },
    {
      question: "Le CarPlay sans fil consomme-t-il plus de batterie que le filaire ?",
      answer:
        "Le CarPlay sans fil utilise le WiFi et le Bluetooth de votre téléphone, ce qui consomme légèrement plus d'énergie. La différence est minime lors d'un trajet court.",
      keywords: "batterie, consommation, autonomie",
      order: 2,
    },
    {
      question: "Puis-je passer des appels et utiliser Siri avec le dongle ?",
      answer:
        "Oui, absolument. CarplayGO conserve 100% des fonctionnalités CarPlay et Android Auto : appels, Siri, Google Assistant, musique, navigation.",
      keywords: "appels, siri, google assistant, fonctionnalités",
      order: 3,
    },
    {
      question: "Comment savoir si ma voiture a déjà le CarPlay d'usine ?",
      answer:
        "Si votre véhicule dispose d'un écran d'infodivertissement et que vous pouvez connecter votre iPhone via USB pour afficher CarPlay, alors vous avez le CarPlay d'usine.",
      keywords: "voiture compatible, carplay d'usine, savoir",
      order: 4,
    },
    {
      question: "Quel est le délai de livraison en France ?",
      answer:
        "Nous expédions depuis notre entrepôt en région parisienne. Le délai de livraison est de 24 à 48 heures ouvrées en France métropolitaine. La livraison est gratuite.",
      keywords: "livraison, délai, france, gratuite",
      order: 5,
    },
    {
      question: "Puis-je retourner le produit s'il ne fonctionne pas sur ma voiture ?",
      answer:
        "Oui. Nous offrons une garantie 'Satisfait ou remboursé' de 30 jours. Contactez notre support à support@carplaygo.fr.",
      keywords: "retour, remboursement, garantie, 30 jours",
      order: 6,
    },
    {
      question: "La mise à jour du dongle est-elle payante ?",
      answer:
        "Non, les mises à jour sont entièrement gratuites et illimitées via Over-The-Air (OTA). Aucun frais caché, aucun abonnement.",
      keywords: "mise à jour, payante, gratuite, OTA",
      order: 7,
    },
  ];

  await prisma.fAQItem.createMany({ data: faqData });

  // VehicleBrands
  const brands = [
    "Audi", "BMW", "Mercedes-Benz", "Volkswagen", "Ford", "Renault", "Peugeot",
    "Citroën", "DS Automobiles", "Opel", "Toyota", "Honda", "Hyundai", "Kia",
    "Nissan", "Mazda", "Mitsubishi", "Subaru", "Suzuki", "Lexus", "Infiniti",
    "Chevrolet", "Cadillac", "Buick", "GMC", "Jeep", "Dodge", "Chrysler", "Ram",
    "Tesla", "Volvo", "Polestar", "Jaguar", "Land Rover", "Mini", "Seat", "Skoda",
    "Cupra", "Fiat", "Alfa Romeo", "Lancia", "Maserati", "Ferrari", "Lamborghini",
    "Bentley", "Rolls-Royce", "Aston Martin", "McLaren", "Porsche", "Smart",
    "Dacia", "Seres", "MG", "BYD",
  ];

  await prisma.vehicleBrand.createMany({
    data: brands.map((name) => ({ name })),
  });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
