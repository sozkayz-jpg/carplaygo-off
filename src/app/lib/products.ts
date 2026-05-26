export interface ProductVariant {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  features: string[];
  stripePriceId: string;
}

export const variants: ProductVariant[] = [
  {
    id: "wireless-carplay",
    name: "Wireless CarPlay",
    tagline: "Pour iPhone uniquement",
    description:
      "Transformez votre CarPlay filaire en connexion sans fil. Compatible avec tous les iPhone dotés de CarPlay.",
    price: 49.9,
    originalPrice: 79.9,
    image: "/images/dongle-wireless.png",
    features: ["WiFi 5GHz", "Bluetooth 5.0", "Mise à jour OTA", "Plug & Play"],
    stripePriceId: "price_wireless_placeholder",
  },
  {
    id: "dual-carplay-androidauto",
    name: "CarPlay + Android Auto",
    tagline: "Dual, pour iPhone & Android",
    description:
      "La solution ultime : CarPlay sans fil pour iPhone ET Android Auto sans fil pour smartphones Android. Un dongle, deux univers.",
    price: 59.9,
    originalPrice: 99.9,
    image: "/images/dongle-dual.png",
    features: ["WiFi 5GHz", "Bluetooth 5.0", "Mise à jour OTA", "Bascule auto iOS/Android"],
    stripePriceId: "price_dual_placeholder",
  },
];

export function getVariantById(id: string): ProductVariant | undefined {
  return variants.find((v) => v.id === id);
}
