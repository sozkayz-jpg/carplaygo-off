export interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
}

export const faqItems: FAQItem[] = [
  {
    question: "Le dongle CarplayGO fonctionne-t-il sur ma voiture ?",
    answer:
      "CarplayGO est compatible avec 95% des véhicules équipés du CarPlay filaire d'usine. Si votre voiture possède une prise USB avec laquelle vous utilisez déjà CarPlay via câble, notre dongle transformera cette connexion en sans fil. Nous couvrons les marques Audi, BMW, Mercedes, Volkswagen, Ford, Renault, Peugeot, Toyota, Hyundai, Kia et plus de 40 autres. Consultez notre page compatibilité pour vérifier votre modèle précis.",
    keywords: ["compatibilité", "voiture", "marques"],
  },
  {
    question: "Quelle est la différence entre la version Wireless CarPlay et CarPlay + Android Auto ?",
    answer:
      "La version Wireless CarPlay est dédiée aux iPhones : elle transforme votre connexion CarPlay filaire en sans fil. La version CarPlay + Android Auto est universelle : elle offre le CarPlay sans fil pour iPhone ET l'Android Auto sans fil pour les smartphones Android (Samsung, Google Pixel, Xiaomi, etc.). Si vous avez un iPhone, la version Wireless suffit. Si votre foyer utilise les deux écosystèmes, optez pour la version Dual.",
    keywords: ["différence", "iphone", "android", "version"],
  },
  {
    question: "Le CarPlay sans fil consomme-t-il plus de batterie que le filaire ?",
    answer:
      "Le CarPlay sans fil utilise le WiFi et le Bluetooth de votre téléphone, ce qui consomme légèrement plus d'énergie que la connexion USB filaire. Cependant, la différence est minime lors d'un trajet court. Pour les longs trajets, nous recommandons de garder un câble de charge à portée de main. La plupart de nos clients ne remarquent aucun impact significatif sur l'autonomie au quotidien.",
    keywords: ["batterie", "consommation", "autonomie"],
  },
  {
    question: "Puis-je passer des appels et utiliser Siri avec le dongle ?",
    answer:
      "Oui, absolument. CarplayGO conserve 100% des fonctionnalités CarPlay et Android Auto. Vous pouvez passer et recevoir des appels via le micro et les haut-parleurs de votre voiture, utiliser Siri (iPhone) ou Google Assistant (Android) pour la navigation vocale, écouter vos messages, lire de la musique, et utiliser Waze, Google Maps ou Apple Maps en temps réel. La qualité audio est identique, voire meilleure grâce à la connexion WiFi 5GHz stable.",
    keywords: ["appels", "siri", "google assistant", "fonctionnalités"],
  },
  {
    question: "Comment savoir si ma voiture a déjà le CarPlay d'usine ?",
    answer:
      "Si votre véhicule dispose d'un écran d'infodivertissement et que vous pouvez connecter votre iPhone via USB pour afficher CarPlay, alors vous avez le CarPlay d'usine. Sur la plupart des modèles récents (à partir de 2016–2018 selon les marques), le CarPlay est intégré. Regardez dans les réglages de votre système multimédia : une section 'Smartphone' ou 'Apple CarPlay' confirme la présence de la fonction. Si vous utilisez déjà CarPlay avec un câble, CarplayGO est compatible.",
    keywords: ["voiture compatible", "carplay d'usine", "savoir"],
  },
  {
    question: "Quel est le délai de livraison en France ?",
    answer:
      "Nous expédions depuis notre entrepôt en région parisienne. Le délai de livraison est de 24 à 48 heures ouvrées en France métropolitaine avec notre transporteur partenaire. Les commandes passées avant 14h sont expédiées le jour même. La livraison est gratuite pour toute commande. Vous recevrez un numéro de suivi par email dès l'expédition.",
    keywords: ["livraison", "délai", "france", "gratuite"],
  },
  {
    question: "Puis-je retourner le produit s'il ne fonctionne pas sur ma voiture ?",
    answer:
      "Oui. Nous offrons une garantie 'Satisfait ou remboursé' de 30 jours. Si le dongle ne fonctionne pas sur votre véhicule malgré la présence de CarPlay d'usine, contactez notre support par email à support@carplaygo.fr. Nous vous guiderons pour un diagnostic rapide. Si le problème persiste, vous pouvez retourner le produit dans son emballage d'origine pour un remboursement intégral, frais de retour inclus. Nous validons les remboursements sous 48h après réception du colis.",
    keywords: ["retour", "remboursement", "garantie", "30 jours"],
  },
  {
    question: "La mise à jour du dongle est-elle payante ?",
    answer:
      "Non, les mises à jour sont entièrement gratuites et illimitées. CarplayGO dispose d'une technologie de mise à jour Over-The-Air (OTA). Lorsqu'une nouvelle version logicielle est disponible (compatibilité étendue, corrections, nouvelles fonctionnalités), votre dongle se met à jour automatiquement via l'application CarplayGO lors de la connexion à votre smartphone. Aucun frais caché, aucun abonnement.",
    keywords: ["mise à jour", "payante", "gratuite", "OTA"],
  },
];
