# CarplayGO — Spécification Design

## Contexte

CarplayGO est un site e-commerce monoproduit destiné au marché français. Il vend un dongle USB qui active le CarPlay sans fil (et Android Auto en option) sur les véhicules d'usine équipés de CarPlay filaire. Le site doit incarner un positionnement premium-tech à prix accessible, avec une expérience utilisateur moderne, dynamique et une conversion optimisée.

## Objectifs

1. **Conversion** : guider le visiteur de la découverte à l'achat en une seule page scrollée, avec des CTA répétés et contextuels.
2. **SEO/GEO** : indexation parfaite sur les requêtes "carplay sans fil", "dongle carplay", "android auto sans fil", "voiture compatible carplay". FAQ structurée en Schema.org pour les featured snippets.
3. **Performance** : LCP < 2s, CLS < 0.1, TBT < 150ms (Core Web Vitals vert sur mobile).
4. **Confiance** : social proof, garanties, sécurité de paiement, compatibilité véhicules clairement communiquée.

## Stack Technique

- **Framework** : Next.js 15 (App Router), React 19, TypeScript
- **Styling** : Tailwind CSS 4
- **Animations** : GSAP + ScrollTrigger pour le hero scroll-driven ; Framer Motion pour les micro-interactions (hover, apparition sections)
- **Paiement** : Stripe Checkout (sessions) via API Routes
- **Panier** : React Context + `use-sync-external-store` sur localStorage (pas de state externe)
- **Déploiement** : Vercel (Fluid Compute, Edge Network)
- **Monitoring** : Vercel Analytics + Speed Insights
- **SEO** : Metadata API, sitemap.ts, robots.ts, JSON-LD (`product`, `FAQPage`, `Organization`)

## Architecture des Pages

| Route | Type | Description |
|-------|------|-------------|
| `/` | Page principale | Single-page monoproduit avec toutes les sections |
| `/api/checkout` | API Route | Crée une Stripe Checkout Session et redirige |
| `/api/webhook` | API Route | Écoute `checkout.session.completed` pour confirmation |
| `/success` | Page statique | Page de confirmation post-achat avec tracking |
| `/cancel` | Page statique | Page d'abandon de panier avec CTA de retour |
| `/compatibility` | Page secondaire | Index détaillé des véhicules compatibles (SEO long-tail) |
| `/sitemap.xml` | Générée | Toutes les URLs indexables |

## Design System

### Couleurs
- **Primaire** : `#10B981` (Emerald 500) — CTA, accents, indicateurs de confiance
- **Fond** : `#FFFFFF` (blanc pur) — hero et sections principales
- **Fond alternatif** : `#F8FAFC` (Slate 50) — sections de détail pour créer du rythme
- **Texte** : `#0F172A` (Slate 900) — titres ; `#475569` (Slate 600) — corps
- **Bordures** : `#E2E8F0` (Slate 200)
- **Danger/Alerte** : `#EF4444` (Red 500) — rare, stock faible si besoin

### Typographie
- **Titre** : Inter (Google Fonts), font-weight 700–800, tracking tight (-0.02em)
- **Corps** : Inter, font-weight 400–500, line-height 1.6
- **Échelle** : Hero 48–64px desktop / 32–40px mobile ; section titles 28–32px ; body 16–18px

### Composants clés
- **Primary Button** : fond `#10B981`, texte blanc, padding 16px 32px, border-radius 9999px, shadow `0 4px 14px rgba(16,185,129,0.3)`, hover scale 1.02 + shadow up
- **Ghost Button** : bordure `#10B981`, texte `#10B981`, hover fond `#10B981`/5%
- **Card** : fond blanc, border-radius 16px, shadow `0 1px 3px rgba(0,0,0,0.05)`, hover shadow `0 8px 24px rgba(0,0,0,0.08)`
- **FAQ Item** : bordure basse, chevron rotate on open, animation height auto

## Sections de la Page Principale

### 1. Navigation (sticky)
- Logo "CarplayGO" à gauche (texte + icône feuille verte abstraite)
- Liens ancres : Fonctionnement, Compatibilité, FAQ
- Badge "Livraison gratuite" à droite
- CTA "Commander" sticky à droite sur mobile après scroll

### 2. Hero (scroll-driven)
- **État initial** : grand titre centré "CarPlay sans fil", produit flottant au centre, fond blanc
- **Scroll 0–30%** : le produit descend légèrement, les bénéfices apparaissent en fade-in stagger (3 mots-clés : Sans fil / Universel / Plug & Play)
- **Scroll 30–60%** : sélecteur de variantes apparaît à droite du produit, prix animés
- **Scroll 60–100%** : CTA "Commander" grandit et se fixe, fond passe très légèrement au Slate 50
- **Technique** : GSAP ScrollTrigger, pin du hero container, animations basées sur `scrub: true`

### 3. Social Proof (bandeau)
- 5 étoiles + note "4.8/5 — 2 847 avis vérifiés". En V1, données statiques dans un fichier JSON. Système d'avis client dynamique en V4.
- "+12 450 unités vendues en France"
- 3–4 logos partenaires / presse (monochrome) pour renforcer la confiance. En V1, placeholders statiques remplaçables.

### 4. Bénéfices (3 colonnes)
- **Sans fil** : icône éclair, "Connectez-vous en 3 secondes, sans toucher un câble"
- **Universel** : icône voiture, "Compatible avec 95% des véhicules équipés de CarPlay d'usine"
- **Plug & Play** : icône prise, "Branchez, activez, roulez. Aucune installation technique."
- Animation : fade-in + translateY au scroll (IntersectionObserver ou ScrollTrigger)

### 5. Sélecteur de Variantes
- Deux cards côte à côte (desktop) / empilées (mobile)
- **Wireless CarPlay** : "Pour iPhone uniquement" — 49,90 €
- **CarPlay + Android Auto** : "Dual, pour iPhone & Android" — 59,90 €
- Sélection visuelle : bordure `#10B981` épaisse + checkmark quand active
- CTA dynamique : "Ajouter au panier — [Variante] — [Prix]"
- Sticky bar en bas mobile quand une variante est sélectionnée

### 6. Comment ça marche (3 étapes)
1. Branchez le dongle USB dans votre voiture
2. Appairage Bluetooth/WiFi automatique en 10 secondes
3. Votre smartphone se connecte sans fil à chaque démarrage
- Visuels : illustrations vectorielles SVG minimalistes en V1 (pas de dépendance à des photos produit). Facilement remplaçables par des photos réelles quand disponibles.

### 7. Véhicules Compatibles
- Titre SEO-friendly : "Compatibilité CarplayGO — Toutes les marques de voiture"
- Grille de logos/marques : 50+ marques (voir liste exhaustive ci-dessous)
- Barre de recherche "Rechercher votre modèle..." (filtrage client-side)
- CTA : "Votre véhicule n'est pas listé ? Contactez-nous, nous testons gratuitement."
- **Contenu SEO** : paragraphe par marque populaire (Audi, BMW, Mercedes, VW, Ford, Renault, Peugeot, Toyota...) décrivant la compatibilité
- Lien vers `/compatibility` pour l'index détaillé (tableau années/modèles)

#### Liste des marques (à afficher)
Audi, BMW, Mercedes-Benz, Volkswagen, Ford, Renault, Peugeot, Citroën, DS Automobiles, Opel, Toyota, Honda, Hyundai, Kia, Nissan, Mazda, Mitsubishi, Subaru, Suzuki, Lexus, Infiniti, Chevrolet, Cadillac, Buick, GMC, Jeep, Dodge, Chrysler, Ram, Tesla, Volvo, Polestar, Jaguar, Land Rover, Mini, Seat, Skoda, Cupra, Fiat, Alfa Romeo, Lancia, Maserati, Ferrari, Lamborghini, Bentley, Rolls-Royce, Aston Martin, McLaren, Porsche, Smart, Dacia, Seres, MG, BYD.

### 8. Spécifications Techniques
- Tableau minimaliste 2 colonnes (label / valeur)
- Connectivité : WiFi 5GHz + Bluetooth 5.0
- Ports : USB-A et USB-C (adaptateur inclus)
- Mise à jour : OTA (Over-The-Air) automatique via application
- Dimensions : 45×25×12 mm
- Poids : 18g
- Garantie : 2 ans
- Certification : CE, FCC, RoHS

### 9. FAQ (GEO — Schema.org FAQPage)
- Accordion interactif avec 8–10 questions ciblées SEO
- **Questions requises** :
  1. "Le dongle CarplayGO fonctionne-t-il sur ma voiture ?"
  2. "Quelle est la différence entre la version Wireless CarPlay et CarPlay + Android Auto ?"
  3. "Le CarPlay sans fil consomme-t-il plus de batterie que le filaire ?"
  4. "Puis-je passer des appels et utiliser Siri avec le dongle ?"
  5. "Comment savoir si ma voiture a déjà le CarPlay d'usine ?"
  6. "Quel est le délai de livraison en France ?"
  7. "Puis-je retourner le produit si il ne fonctionne pas sur ma voiture ?"
  8. "La mise à jour du dongle est-elle payante ?"
- Réponses détaillées (80–150 mots chacune), avec mots-clés naturels.
- JSON-LD `FAQPage` injecté dans `<head>` pour les featured snippets Google.

### 10. Preuve Sociale / Trust
- 3 icônes alignées : "Paiement sécurisé SSL" (lock), "Livraison 24–48h" (truck), "Garantie 2 ans" (shield)
- CTA final massif : "Commander maintenant — Livraison offerte en France"
- Mention "Satisfait ou remboursé sous 30 jours"

### 11. Footer
- Liens : Mentions légales, CGV, Politique de confidentialité, Livraisons & Retours, Contact
- Paiements acceptés : Visa, Mastercard, Amex, Apple Pay, Google Pay (logos Stripe)
- Réseaux sociaux : TikTok, Instagram, YouTube (icônes)
- Email support : support@carplaygo.fr

## Panier & Paiement

### Panier
- **Trigger** : slide-over drawer depuis la droite (desktop) / bottom sheet (mobile)
- **Contenu** : miniature produit, variante sélectionnée, quantité (1–5), prix unitaire, sous-total, frais de port (0€ pour la France), total TTC
- **Actions** : "Continuer les achats" (ferme) / "Passer au paiement" (redirige Stripe)
- **Persistence** : localStorage avec hydratation côté client uniquement (pas de flash SSR)

### Stripe Checkout
- **Flow** :
  1. User clique "Passer au paiement"
  2. Client appelle `POST /api/checkout` avec `{ variantId, quantity }`
  3. Server crée Stripe Checkout Session avec `line_items`, `mode: payment`, `success_url`, `cancel_url`
  4. Server renvoie `{ url }`
  5. Client redirige vers Stripe hosted checkout
  6. Retour sur `/success` ou `/cancel`
- **Produits Stripe** : 2 price objects (Wireless 49,90 €, Dual 59,90 €), metadata `variant`
- **Webhooks** : endpoint `/api/webhook` sécurisé avec `stripe-webhook-secret`. Événements : `checkout.session.completed` (envoi email confirmation), `checkout.session.expired`

## SEO / GEO Stratégie

### Metadata dynamique (Next.js Metadata API)
- Title : "CarplayGO — CarPlay & Android Auto sans fil | Livraison gratuite"
- Description : 155 caractères, mots-clés "dongle carplay sans fil", "android auto", "voiture compatible"
- OpenGraph / Twitter Card : image produit, titre, description
- Canonical : `/`

### JSON-LD structuré
- **Product** : nom, image, description, marque, offers (price 49.90/59.90, priceCurrency EUR, availability InStock), aggregateRating (4.8, 2847), sku
- **FAQPage** : mainEntity avec tous les Q/A de la section FAQ
- **Organization** : CarplayGO, URL, logo, contactPoint (email)
- **BreadcrumbList** : Accueil > CarplayGO

### Contenu GEO (Generative Engine Optimization)
- La FAQ répond exactement aux questions que les LLM (ChatGPT, Perplexity) utilisent pour citer des sources : "Quel dongle CarPlay sans fil choisir ?", "Comment avoir CarPlay sans fil ?", "Dongle CarPlay compatible Renault / Peugeot..."
- Chaque réponse FAQ est structurée (paragraphe court, liste si besoin, conclusion) pour maximiser la probabilité d'être citée.

### Performance SEO
- Images produit en WebP/AVIF avec `sizes` et `priority` pour le hero
- Polices auto-hébergées ou `next/font` (pas de blocage Google Fonts externe)
- Pas de layout shift : dimensions fixes sur images, skeleton pour le sélecteur de variantes

## Animations & Interactions

- **Hero** : GSAP ScrollTrigger, `scrub: true`, `pin: true`. Le container reste fixé pendant que le contenu évolue. Pas d'animation lourde sur mobile (fallback fade-in simple).
- **Sections** : `fadeInUp` au scroll — translateY(30px)→0, opacity 0→1, duration 0.6s, ease `power2.out`, déclenché par ScrollTrigger `start: "top 85%"`.
- **Cards variantes** : hover scale 1.02, shadow transition 0.3s
- **Boutons** : hover translateY(-2px), shadow intensifié
- **FAQ** : height transition fluide (0 → auto via CSS grid trick ou Framer Motion `AnimatePresence`)
- **Panier** : slide-in 0.3s ease-out, overlay backdrop-blur

## Gestion des Données

Pas de base de données nécessaire pour un monoproduit statique.
- **Produits** : fichier TypeScript `lib/products.ts` avec les 2 variantes (id, name, description, price, image, specs)
- **Véhicules compatibles** : fichier JSON `data/vehicles.json` avec marques et modèles. Filtrage client-side.
- **FAQ** : fichier JSON `data/faq.json` avec question, réponse, mots-clés associés.
- **Commandes** : gérées par Stripe Dashboard (pas de back-office custom nécessaire en V1)

## Sécurité

- **Stripe webhook** : signature vérifiée avec `stripe.webhooks.constructEvent`
- **API checkout** : rate limiting via middleware Next.js avec Map in-memory (5 requêtes/minute par IP). Migrable vers Vercel KV si scale nécessaire.
- **Env vars** : `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` en production uniquement
- **CORS** : API routes restreintes au domaine CarplayGO

## Tests

- **Lighthouse CI** : score 100 Performance, 100 SEO, 100 Accessibilité, 100 Best Practices
- **E2E** : Playwright pour le flow panier → paiement (mode test Stripe)
- **A11y** : axe-core, navigation clavier complète, contrastes WCAG AA

## Phases de Livraison suggérées

1. **V1 Core** : Hero, Bénéfices, Variantes, Panier, Stripe Checkout, Footer, SEO basique
2. **V2 Conversion** : Social proof, Comment ça marche, Trust section, animations scroll-driven
3. **V3 SEO/GEO** : Page compatibilité complète, FAQ Schema.org, contenu GEO, blog/articles
4. **V4 Optimisation** : A/B tests CTA, avis clients, email post-achat, analytics avancé

---

*Spec version 1.0 — 2026-05-27*
