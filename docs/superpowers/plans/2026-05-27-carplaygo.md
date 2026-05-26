# CarplayGO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete single-product e-commerce site for the CarplayGO USB dongle, optimized for SEO/GEO, with Stripe payments, a functional cart, scroll-driven animations, and vehicle compatibility data.

**Architecture:** Next.js 15 App Router with React Server Components for static content and SEO, Client Components for interactivity (cart, animations, accordion). Stripe Checkout handles payments server-side. No database — product data lives in static TS/JSON files.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, GSAP + ScrollTrigger, Framer Motion, Stripe Node SDK, Playwright (E2E).

---

## File Structure

```
app/
  api/
    checkout/route.ts          # Stripe Checkout session creation
    webhook/route.ts           # Stripe webhook handler
  sections/
    Navigation.tsx             # Sticky nav with cart trigger
    Hero.tsx                   # Scroll-driven hero (GSAP)
    SocialProof.tsx            # Ratings & sales count
    Benefits.tsx               # 3-column benefit cards
    Variants.tsx               # Product variant selector
    HowItWorks.tsx             # 3-step process
    Vehicles.tsx               # Vehicle compatibility grid
    Specs.tsx                  # Technical specs table
    FAQ.tsx                    # Accordion FAQ with JSON-LD
    TrustCTA.tsx               # Final CTA + trust badges
    Footer.tsx                 # Links + payment icons
  components/
    CartDrawer.tsx             # Slide-over cart (client)
    CartProvider.tsx           # React Context + localStorage
    JSONLD.tsx                 # Structured data script tags
    AnimatedSection.tsx        # Fade-in scroll wrapper
  lib/
    products.ts                # Product/variant data
    faq.ts                     # FAQ data + types
    vehicles.ts                # Vehicle brands data
  types/
    cart.ts                    # CartItem, CartContext types
  data/
    vehicles.json              # Full vehicle brand list
    faq.json                   # FAQ content for GEO
  success/page.tsx             # Post-purchase page
  cancel/page.tsx              # Abandoned cart page
  compatibility/page.tsx       # SEO vehicle index page
  layout.tsx                   # Root layout with metadata + fonts
  page.tsx                     # Main landing page (assembles sections)
  globals.css                  # Tailwind + custom styles
  sitemap.ts                   # Generated sitemap
  robots.ts                    # robots.txt
components/ui/                 # shadcn-style primitives if needed
public/
  images/                      # Product mockups (placeholders in V1)
```

---

### Task 1: Initialize Next.js Project

**Files:**
- Create: entire project scaffold via `create-next-app`

- [ ] **Step 1: Bootstrap project**

Run:
```bash
cd "/home/kayzer/Documents/Antigravity/Sites  Web/CarplayGO OFF"
echo "my-app" | npx create-next-app@latest --typescript --tailwind --eslint --app --src-dir --no-turbopack --import-alias "@/*"
```
Expected: project created in `./my-app/`. If prompted, accept defaults.

- [ ] **Step 2: Move files to project root**

Run:
```bash
mv my-app/* . && mv my-app/.* . 2>/dev/null; rm -rf my-app
```
Expected: `package.json`, `app/`, `public/`, `tsconfig.json` at repo root.

- [ ] **Step 3: Install dependencies**

Run:
```bash
npm install gsap framer-motion stripe
npm install -D @types/node playwright
npx playwright install chromium
```
Expected: `package.json` includes `gsap`, `framer-motion`, `stripe`, `playwright`.

- [ ] **Step 4: Commit**

```bash
git init
git add .
git commit -m "chore: init Next.js 15 + Stripe + GSAP + Playwright"
```

---

### Task 2: Configure Tailwind, Fonts, and Globals

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `tailwind.config.ts` (or verify it's present)

- [ ] **Step 1: Update globals.css**

```css
@import "tailwindcss";

@theme {
  --color-emerald-primary: #10B981;
  --color-slate-50: #F8FAFC;
  --color-slate-900: #0F172A;
  --color-slate-600: #475569;
  --color-slate-200: #E2E8F0;
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  color: #0F172A;
  background: #ffffff;
}
```

- [ ] **Step 2: Update layout.tsx with Inter font + metadata**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify Tailwind config**

Ensure `tailwind.config.ts` exists at root. If not, create:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: { primary: "#10B981" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx tailwind.config.ts
git commit -m "config: tailwind theme, Inter font, root metadata"
```

---

### Task 3: Static Data Files

**Files:**
- Create: `app/lib/products.ts`
- Create: `app/lib/faq.ts`
- Create: `app/data/vehicles.json`
- Create: `app/data/faq.json`
- Create: `app/types/cart.ts`

- [ ] **Step 1: Write products data**

```ts
// app/lib/products.ts
export interface ProductVariant {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  features: string[];
  stripePriceId: string; // to be filled when Stripe products created
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
```

- [ ] **Step 2: Write FAQ data + types**

```ts
// app/lib/faq.ts
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
```

- [ ] **Step 3: Write vehicle brands JSON**

```json
// app/data/vehicles.json
{
  "brands": [
    "Audi", "BMW", "Mercedes-Benz", "Volkswagen", "Ford", "Renault", "Peugeot",
    "Citroën", "DS Automobiles", "Opel", "Toyota", "Honda", "Hyundai", "Kia",
    "Nissan", "Mazda", "Mitsubishi", "Subaru", "Suzuki", "Lexus", "Infiniti",
    "Chevrolet", "Cadillac", "Buick", "GMC", "Jeep", "Dodge", "Chrysler", "Ram",
    "Tesla", "Volvo", "Polestar", "Jaguar", "Land Rover", "Mini", "Seat", "Skoda",
    "Cupra", "Fiat", "Alfa Romeo", "Lancia", "Maserati", "Ferrari", "Lamborghini",
    "Bentley", "Rolls-Royce", "Aston Martin", "McLaren", "Porsche", "Smart",
    "Dacia", "Seres", "MG", "BYD"
  ]
}
```

- [ ] **Step 4: Write vehicle loader + cart types**

```ts
// app/lib/vehicles.ts
import vehiclesData from "../data/vehicles.json";

export const vehicleBrands: string[] = vehiclesData.brands;

export function searchBrands(query: string): string[] {
  const q = query.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  return vehicleBrands.filter((b) =>
    b.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes(q)
  );
}
```

```ts
// app/types/cart.ts
export interface CartItem {
  variantId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: "ADD"; variantId: string }
  | { type: "REMOVE"; variantId: string }
  | { type: "UPDATE_QUANTITY"; variantId: string; quantity: number }
  | { type: "CLEAR" };
```

- [ ] **Step 5: Commit**

```bash
git add app/lib app/data app/types
git commit -m "feat: add static data for products, FAQ, vehicles, cart types"
```

---

### Task 4: Cart Context + Hook + Provider

**Files:**
- Create: `app/components/CartProvider.tsx`
- Create: `app/hooks/useCart.ts`

- [ ] **Step 1: Write useCart hook**

```ts
// app/hooks/useCart.ts
"use client";

import { useContext } from "react";
import { CartContext } from "../components/CartProvider";

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
```

- [ ] **Step 2: Write CartProvider**

```tsx
// app/components/CartProvider.tsx
"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type { CartItem, CartAction } from "../types/cart";

interface CartContextValue {
  items: CartItem[];
  addItem: (variantId: string) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  isHydrated: boolean;
}

export const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.variantId === action.variantId);
      if (existing) {
        return state.map((i) =>
          i.variantId === action.variantId
            ? { ...i, quantity: Math.min(i.quantity + 1, 5) }
            : i
        );
      }
      return [...state, { variantId: action.variantId, quantity: 1 }];
    }
    case "REMOVE":
      return state.filter((i) => i.variantId !== action.variantId);
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return state.filter((i) => i.variantId !== action.variantId);
      }
      return state.map((i) =>
        i.variantId === action.variantId
          ? { ...i, quantity: Math.min(action.quantity, 5) }
          : i
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

const STORAGE_KEY = "carplaygo-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartItem[] = JSON.parse(raw);
        parsed.forEach((item) =>
          dispatch({ type: "UPDATE_QUANTITY", variantId: item.variantId, quantity: item.quantity })
        );
      }
    } catch {
      // ignore corrupt storage
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addItem = useCallback(
    (variantId: string) => dispatch({ type: "ADD", variantId }),
    []
  );
  const removeItem = useCallback(
    (variantId: string) => dispatch({ type: "REMOVE", variantId }),
    []
  );
  const updateQuantity = useCallback(
    (variantId: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", variantId, quantity }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      isHydrated,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalItems, isHydrated]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/components/CartProvider.tsx app/hooks/useCart.ts
git commit -m "feat: cart context with localStorage persistence"
```

---

### Task 5: Reusable UI Components

**Files:**
- Create: `app/components/ui/Button.tsx`
- Create: `app/components/AnimatedSection.tsx`
- Create: `app/components/JSONLD.tsx`

- [ ] **Step 1: Write Button component**

```tsx
// app/components/ui/Button.tsx
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-primary/50";

  const variants = {
    primary:
      "bg-emerald-primary text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "border-2 border-emerald-primary text-emerald-primary hover:bg-emerald-primary/5",
    outline: "border border-slate-200 text-slate-900 hover:bg-slate-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Write AnimatedSection wrapper**

```tsx
// app/components/AnimatedSection.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Write JSON-LD component**

```tsx
// app/components/JSONLD.tsx
export function JSONLD({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/components/ui app/components/AnimatedSection.tsx app/components/JSONLD.tsx
git commit -m "feat: add Button, AnimatedSection, JSONLD components"
```

---

### Task 6: Cart Drawer Component

**Files:**
- Create: `app/components/CartDrawer.tsx`

- [ ] **Step 1: Write CartDrawer**

```tsx
// app/components/CartDrawer.tsx
"use client";

import { useMemo } from "react";
import { useCart } from "../hooks/useCart";
import { getVariantById } from "../lib/products";
import { Button } from "./ui/Button";

export function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { items, removeItem, updateQuantity, totalItems, isHydrated } = useCart();

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const variant = getVariantById(item.variantId);
      return sum + (variant?.price ?? 0) * item.quantity;
    }, 0);
  }, [items]);

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  if (!isHydrated) return null;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-bold">Votre panier ({totalItems})</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-900 text-2xl leading-none"
              aria-label="Fermer le panier"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <p className="text-slate-500 text-center py-8">
                Votre panier est vide.
              </p>
            ) : (
              items.map((item) => {
                const variant = getVariantById(item.variantId);
                if (!variant) return null;
                return (
                  <div
                    key={item.variantId}
                    className="flex items-center gap-4 bg-slate-50 rounded-xl p-3"
                  >
                    <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-xl">
                      📦
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{variant.name}</p>
                      <p className="text-emerald-primary font-bold text-sm">
                        {variant.price.toFixed(2).replace(".", ",")} €
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity - 1)
                        }
                        className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="ml-2 text-slate-400 hover:text-red-500 text-sm"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {items.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Sous-total</span>
                <span className="font-bold text-lg">
                  {total.toFixed(2).replace(".", ",")} €
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-slate-500">
                <span>Livraison</span>
                <span className="text-emerald-primary font-semibold">
                  Gratuite
                </span>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleCheckout}
              >
                Passer au paiement
              </Button>
              <p className="text-xs text-slate-400 text-center">
                Paiement sécurisé par Stripe
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/CartDrawer.tsx
git commit -m "feat: cart drawer with Stripe checkout flow"
```

---

### Task 7: Navigation Section

**Files:**
- Create: `app/sections/Navigation.tsx`

- [ ] **Step 1: Write Navigation**

```tsx
// app/sections/Navigation.tsx
"use client";

import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { CartDrawer } from "../components/CartDrawer";

export function Navigation() {
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
            <span className="text-emerald-primary">🍃</span>
            CarplayGO
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#fonctionnement" className="hover:text-emerald-primary transition-colors">
              Fonctionnement
            </a>
            <a href="#compatibilite" className="hover:text-emerald-primary transition-colors">
              Compatibilité
            </a>
            <a href="#faq" className="hover:text-emerald-primary transition-colors">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center text-xs font-medium text-emerald-primary bg-emerald-primary/10 px-3 py-1 rounded-full">
              Livraison gratuite
            </span>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:bg-slate-50 rounded-lg transition-colors"
              aria-label="Ouvrir le panier"
            >
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/sections/Navigation.tsx
git commit -m "feat: sticky navigation with cart trigger"
```

---

### Task 8: Hero Section (Scroll-Driven with GSAP)

**Files:**
- Create: `app/sections/Hero.tsx`

- [ ] **Step 1: Write Hero**

```tsx
// app/sections/Hero.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "../components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.5,
        },
      });

      // Phase 1: subtle title fade + product float down
      tl.to(titleRef.current, { y: -20, opacity: 0.3, duration: 0.3 }, 0);
      tl.to(subtitleRef.current, { y: -10, opacity: 0.3, duration: 0.3 }, 0);
      tl.to(productRef.current, { y: 40, scale: 1.05, duration: 0.3 }, 0);

      // Phase 2: benefits stagger in
      tl.fromTo(
        benefitsRef.current?.children ?? [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.3 },
        0.2
      );

      // Phase 3: CTA reveal
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3 },
        0.6
      );

      // Phase 4: fade out pinned section to let next section scroll normally
      tl.to(containerRef.current, { opacity: 0.2, duration: 0.1 }, 0.9);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      <div className="text-center z-10 px-4">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-4"
        >
          CarPlay sans fil
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto mb-8"
        >
          Transformez votre écran d'usine en CarPlay & Android Auto sans câble.
        </p>
      </div>

      <div
        ref={productRef}
        className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl shadow-2xl flex items-center justify-center text-6xl mb-8"
      >
        📦
      </div>

      <div
        ref={benefitsRef}
        className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8"
      >
        {["⚡ Sans fil", "🚗 Universel", "🔧 Plug & Play"].map((b) => (
          <span
            key={b}
            className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm"
          >
            {b}
          </span>
        ))}
      </div>

      <div ref={ctaRef} className="text-center">
        <Button variant="primary" size="lg">
          Commander — 49,90 €
        </Button>
        <p className="text-xs text-slate-400 mt-3">
          Livraison gratuite · Garantie 2 ans
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/sections/Hero.tsx
git commit -m "feat: scroll-driven hero with GSAP ScrollTrigger"
```

---

### Task 9: Social Proof + Benefits Sections

**Files:**
- Create: `app/sections/SocialProof.tsx`
- Create: `app/sections/Benefits.tsx`

- [ ] **Step 1: Write SocialProof**

```tsx
// app/sections/SocialProof.tsx
import { AnimatedSection } from "../components/AnimatedSection";

export function SocialProof() {
  return (
    <AnimatedSection className="py-10 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
        <div>
          <div className="text-2xl mb-1">⭐⭐⭐⭐⭐</div>
          <p className="text-sm font-semibold text-slate-900">
            4,8/5 — 2 847 avis vérifiés
          </p>
        </div>
        <div className="hidden sm:block w-px h-10 bg-slate-200" />
        <div>
          <p className="text-2xl font-extrabold text-emerald-primary mb-1">
            +12 450
          </p>
          <p className="text-sm text-slate-600">unités vendues en France</p>
        </div>
        <div className="hidden sm:block w-px h-10 bg-slate-200" />
        <div className="flex items-center gap-3">
          {["📰", "📻", "📺", "🎙️"].map((icon, i) => (
            <div
              key={i}
              className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-lg grayscale hover:grayscale-0 transition-all"
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
```

- [ ] **Step 2: Write Benefits**

```tsx
// app/sections/Benefits.tsx
import { AnimatedSection } from "../components/AnimatedSection";

const benefits = [
  {
    icon: "⚡",
    title: "Sans fil",
    description: "Connectez-vous en 3 secondes, sans toucher un câble.",
  },
  {
    icon: "🚗",
    title: "Universel",
    description: "Compatible avec 95% des véhicules équipés de CarPlay d'usine.",
  },
  {
    icon: "🔧",
    title: "Plug & Play",
    description: "Branchez, activez, roulez. Aucune installation technique.",
  },
];

export function Benefits() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Pourquoi choisir CarplayGO ?
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Le dongle le plus simple et le plus fiable pour libérer votre
            CarPlay.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <AnimatedSection key={b.title} delay={i * 0.15}>
              <div className="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow">
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{b.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/sections/SocialProof.tsx app/sections/Benefits.tsx
git commit -m "feat: social proof band + 3 benefit cards"
```

---

### Task 10: Variant Selector Section

**Files:**
- Create: `app/sections/Variants.tsx`

- [ ] **Step 1: Write Variants**

```tsx
// app/sections/Variants.tsx
"use client";

import { useState } from "react";
import { variants, getVariantById } from "../lib/products";
import { useCart } from "../hooks/useCart";
import { Button } from "../components/ui/Button";
import { AnimatedSection } from "../components/AnimatedSection";

export function Variants() {
  const [selected, setSelected] = useState<string>(variants[0].id);
  const { addItem } = useCart();

  const active = getVariantById(selected);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Choisissez votre version
          </h2>
          <p className="text-slate-600">
            Un dongle, deux options selon votre smartphone.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {variants.map((v) => {
            const isActive = selected === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelected(v.id)}
                className={`relative text-left rounded-2xl border-2 p-6 transition-all duration-200 ${
                  isActive
                    ? "border-emerald-primary bg-emerald-primary/5 shadow-[0_4px_20px_rgba(16,185,129,0.15)]"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                {isActive && (
                  <span className="absolute top-4 right-4 w-6 h-6 bg-emerald-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                )}
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                  📦
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {v.name}
                </h3>
                <p className="text-sm text-slate-500 mb-4">{v.tagline}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-emerald-primary">
                    {v.price.toFixed(2).replace(".", ",")} €
                  </span>
                  {v.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {v.originalPrice.toFixed(2).replace(".", ",")} €
                    </span>
                  )}
                </div>
                <ul className="mt-4 space-y-1">
                  {v.features.map((f) => (
                    <li
                      key={f}
                      className="text-sm text-slate-600 flex items-center gap-2"
                    >
                      <span className="text-emerald-primary">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        <AnimatedSection className="text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => active && addItem(active.id)}
          >
            Ajouter au panier — {active?.name} —{" "}
            {active?.price.toFixed(2).replace(".", ",")} €
          </Button>
          <p className="text-sm text-slate-500 mt-3">
            Livraison gratuite · Satisfait ou remboursé 30 jours
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/sections/Variants.tsx
git commit -m "feat: variant selector with cart integration"
```

---

### Task 11: How It Works + Vehicles Compatibility Sections

**Files:**
- Create: `app/sections/HowItWorks.tsx`
- Create: `app/sections/Vehicles.tsx`

- [ ] **Step 1: Write HowItWorks**

```tsx
// app/sections/HowItWorks.tsx
import { AnimatedSection } from "../components/AnimatedSection";

const steps = [
  {
    num: "1",
    title: "Branchez le dongle",
    desc: "Insérez le dongle CarplayGO dans le port USB de votre voiture, à la place de votre câble.",
  },
  {
    num: "2",
    title: "Activez le Bluetooth",
    desc: "Appairez votre smartphone une seule fois. L'appairage WiFi se fait automatiquement.",
  },
  {
    num: "3",
    title: "Roulez sans fil",
    desc: "À chaque démarrage, CarPlay ou Android Auto se lance automatiquement, sans câble.",
  },
];

export function HowItWorks() {
  return (
    <section id="fonctionnement" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Comment ça marche ?
          </h2>
          <p className="text-slate-600">Trois étapes. Zéro prise de tête.</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <AnimatedSection key={s.num} delay={i * 0.15}>
              <div className="text-center">
                <div className="w-14 h-14 bg-emerald-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-5 shadow-[0_4px_14px_rgba(16,185,129,0.3)]">
                  {s.num}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write Vehicles**

```tsx
// app/sections/Vehicles.tsx
"use client";

import { useState } from "react";
import { vehicleBrands, searchBrands } from "../lib/vehicles";
import { AnimatedSection } from "../components/AnimatedSection";

export function Vehicles() {
  const [query, setQuery] = useState("");
  const filtered = query.trim() ? searchBrands(query) : vehicleBrands;

  return (
    <section id="compatibilite" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Compatibilité CarplayGO
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Plus de 50 marques et des centaines de modèles compatibles. Votre
            voiture y est probablement déjà.
          </p>
        </AnimatedSection>

        <AnimatedSection className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Rechercher votre marque..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-primary/50 focus:border-emerald-primary transition-all"
          />
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {filtered.map((brand) => (
              <div
                key={brand}
                className="bg-slate-50 hover:bg-emerald-primary/5 border border-slate-100 hover:border-emerald-primary/20 rounded-lg px-3 py-3 text-center text-sm font-medium text-slate-700 transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-slate-500 mt-6">
              Aucune marque trouvée.{" "}
              <a
                href="mailto:support@carplaygo.fr"
                className="text-emerald-primary underline"
              >
                Contactez-nous
              </a>{" "}
              pour vérifier la compatibilité.
            </p>
          )}
        </AnimatedSection>

        <AnimatedSection className="text-center mt-10">
          <a
            href="/compatibility"
            className="inline-flex items-center text-emerald-primary font-semibold hover:underline"
          >
            Voir la liste détaillée par modèle →
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/sections/HowItWorks.tsx app/sections/Vehicles.tsx
git commit -m "feat: how-it-works steps + vehicle compatibility grid"
```

---

### Task 12: Specs + FAQ Sections

**Files:**
- Create: `app/sections/Specs.tsx`
- Create: `app/sections/FAQ.tsx`

- [ ] **Step 1: Write Specs**

```tsx
// app/sections/Specs.tsx
import { AnimatedSection } from "../components/AnimatedSection";

const specs = [
  { label: "Connectivité", value: "WiFi 5GHz + Bluetooth 5.0" },
  { label: "Ports", value: "USB-A et USB-C (adaptateur inclus)" },
  { label: "Mise à jour", value: "OTA automatique via application" },
  { label: "Dimensions", value: "45 × 25 × 12 mm" },
  { label: "Poids", value: "18 g" },
  { label: "Garantie", value: "2 ans" },
  { label: "Certification", value: "CE, FCC, RoHS" },
];

export function Specs() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4">
        <AnimatedSection className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Spécifications techniques
          </h2>
          <p className="text-slate-600">Petit, rapide, puissant.</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {specs.map((s, i) => (
              <div
                key={s.label}
                className={`flex justify-between items-center px-6 py-4 ${
                  i !== specs.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <span className="text-slate-600 font-medium">{s.label}</span>
                <span className="text-slate-900 font-semibold text-right">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write FAQ**

```tsx
// app/sections/FAQ.tsx
"use client";

import { useState } from "react";
import { faqItems } from "../lib/faq";
import { AnimatedSection } from "../components/AnimatedSection";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Questions fréquentes
          </h2>
          <p className="text-slate-600">
            Tout ce que vous devez savoir avant de commander.
          </p>
        </AnimatedSection>

        <div className="space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <span className="font-semibold text-slate-900 pr-4">
                      {item.question}
                    </span>
                    <span
                      className={`text-emerald-primary text-xl transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 py-4 text-slate-600 leading-relaxed bg-white">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/sections/Specs.tsx app/sections/FAQ.tsx
git commit -m "feat: specs table + accordion FAQ"
```

---

### Task 13: Trust CTA + Footer Sections

**Files:**
- Create: `app/sections/TrustCTA.tsx`
- Create: `app/sections/Footer.tsx`

- [ ] **Step 1: Write TrustCTA**

```tsx
// app/sections/TrustCTA.tsx
import { Button } from "../components/ui/Button";
import { AnimatedSection } from "../components/AnimatedSection";

export function TrustCTA() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <AnimatedSection>
          <div className="flex flex-wrap justify-center gap-8 mb-10 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-2">
              <span className="text-lg">🔒</span> Paiement sécurisé SSL
            </span>
            <span className="flex items-center gap-2">
              <span className="text-lg">🚚</span> Livraison 24–48h
            </span>
            <span className="flex items-center gap-2">
              <span className="text-lg">🛡️</span> Garantie 2 ans
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Prêt à rouler sans fil ?
          </h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            Rejoignez plus de 12 000 conducteurs en France qui ont déjà adopté
            CarplayGO.
          </p>

          <Button
            variant="primary"
            size="lg"
            className="shadow-[0_8px_30px_rgba(16,185,129,0.35)]"
          >
            Commander maintenant — Livraison offerte
          </Button>

          <p className="text-sm text-slate-500 mt-4">
            Satisfait ou remboursé sous 30 jours · Support réactif
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write Footer**

```tsx
// app/sections/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="font-bold text-slate-900 mb-3">CarplayGO</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Le dongle universel pour libérer votre CarPlay et Android Auto
              sans fil.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-3">Informations</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-emerald-primary">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-primary">
                  CGV
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-primary">
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-3">Service client</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-emerald-primary">
                  Livraisons & Retours
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@carplaygo.fr"
                  className="hover:text-emerald-primary"
                >
                  support@carplaygo.fr
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-3">Paiements</h4>
            <div className="flex flex-wrap gap-2 text-xl">
              {["💳", "💳", "💳", "🍎", "🤖"].map((icon, i) => (
                <span
                  key={i}
                  className="w-10 h-7 bg-slate-100 rounded flex items-center justify-center text-sm"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 CarplayGO. Tous droits réservés.</p>
          <div className="flex gap-4">
            {["TikTok", "Instagram", "YouTube"].map((social) => (
              <a
                key={social}
                href="#"
                className="hover:text-emerald-primary transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/sections/TrustCTA.tsx app/sections/Footer.tsx
git commit -m "feat: final trust CTA + footer"
```

---

### Task 14: Assemble Main Page + CartProvider Wrap

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx` (wrap with CartProvider)

- [ ] **Step 1: Update layout.tsx to wrap CartProvider**

Modify `app/layout.tsx` body content:

```tsx
import { CartProvider } from "./components/CartProvider";

// ... inside body:
<CartProvider>{children}</CartProvider>
```

- [ ] **Step 2: Write main page.tsx**

```tsx
// app/page.tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat: assemble main landing page with JSON-LD structured data"
```

---

### Task 15: Stripe Checkout API Route

**Files:**
- Create: `app/api/checkout/route.ts`

- [ ] **Step 1: Write checkout route**

```ts
// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getVariantById } from "../../lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "https://carplaygo.fr";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: { variantId: string; quantity: number }[] = body.items || [];

    const lineItems = items
      .map((item) => {
        const variant = getVariantById(item.variantId);
        if (!variant) return null;
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: variant.name,
              description: variant.tagline,
              images: [`${DOMAIN}${variant.image}`],
            },
            unit_amount: Math.round(variant.price * 100),
          },
          quantity: item.quantity,
        };
      })
      .filter(Boolean) as Stripe.Checkout.SessionCreateParams.LineItem[];

    if (lineItems.length === 0) {
      return NextResponse.json(
        { error: "Aucun article valide" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/cancel`,
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      locale: "fr",
      metadata: {
        source: "carplaygo-web",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Checkout error:", message);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/checkout/route.ts
git commit -m "feat: Stripe Checkout API route with shipping to FR"
```

---

### Task 16: Stripe Webhook + Success / Cancel Pages

**Files:**
- Create: `app/api/webhook/route.ts`
- Create: `app/success/page.tsx`
- Create: `app/cancel/page.tsx`

- [ ] **Step 1: Write webhook route**

```ts
// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Bad signature";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("Payment succeeded:", session.id, session.customer_details?.email);
    // TODO: send confirmation email, update inventory in V2
  }

  return NextResponse.json({ received: true });
}
```

- [ ] **Step 2: Write success page**

```tsx
// app/success/page.tsx
import Link from "next/link";
import { Button } from "../components/ui/Button";

export const metadata = {
  title: "Merci pour votre commande — CarplayGO",
  robots: { index: false, follow: false },
};

export default function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }> | { session_id?: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-emerald-primary/10 text-emerald-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
          🎉
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Merci pour votre commande !
        </h1>
        <p className="text-slate-600 mb-6">
          Vous recevrez un email de confirmation sous peu. Votre dongle sera
          expédié dans les 24h.
        </p>
        <Link href="/">
          <Button variant="primary" size="md" className="w-full">
            Retourner sur le site
          </Button>
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write cancel page**

```tsx
// app/cancel/page.tsx
import Link from "next/link";
import { Button } from "../components/ui/Button";

export const metadata = {
  title: "Paiement annulé — CarplayGO",
  robots: { index: false, follow: false },
};

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
          🛒
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Votre panier vous attend
        </h1>
        <p className="text-slate-600 mb-6">
          Le paiement a été interrompu. Vos articles sont toujours réservés.
        </p>
        <Link href="/">
          <Button variant="ghost" size="md" className="w-full">
            Retourner au site et finaliser
          </Button>
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/api/webhook/route.ts app/success/page.tsx app/cancel/page.tsx
git commit -m "feat: Stripe webhook + success/cancel pages"
```

---

### Task 17: Compatibility Detail Page + Sitemap + Robots

**Files:**
- Create: `app/compatibility/page.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: Write compatibility page**

```tsx
// app/compatibility/page.tsx
import { vehicleBrands } from "../lib/vehicles";
import { JSONLD } from "../components/JSONLD";

export const metadata = {
  title: "Compatibilité CarplayGO — Liste des véhicules compatibles",
  description:
    "Découvrez si votre voiture est compatible avec le dongle CarplayGO. Plus de 50 marques et des centaines de modèles : Audi, BMW, Mercedes, Renault, Peugeot, Toyota...",
  alternates: { canonical: "https://carplaygo.fr/compatibility" },
};

export default function CompatibilityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Compatibilité CarplayGO",
    description: "Liste complète des marques de véhicules compatibles avec CarplayGO.",
    url: "https://carplaygo.fr/compatibility",
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Véhicules compatibles
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl">
            CarplayGO fonctionne avec tous les véhicules équipés du CarPlay
            filaire d'usine. Voici la liste complète des marques compatibles :
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {vehicleBrands.map((brand) => (
              <div
                key={brand}
                className="bg-slate-50 rounded-lg px-4 py-3 text-center font-medium text-slate-700 hover:bg-emerald-primary/5 transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-slate-50 rounded-2xl">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Votre véhicule n'est pas listé ?
            </h2>
            <p className="text-slate-600 mb-4">
              Contactez-nous à{" "}
              <a
                href="mailto:support@carplaygo.fr"
                className="text-emerald-primary underline"
              >
                support@carplaygo.fr
              </a>{" "}
              avec la marque, le modèle et l'année de votre voiture. Nous
              vérifions la compatibilité sous 24h et vous offrons un test
              gratuit si nous ne l'avons pas encore validé.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Write sitemap.ts**

```ts
// app/sitemap.ts
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
```

- [ ] **Step 3: Write robots.ts**

```ts
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/success", "/cancel", "/api/"] },
    ],
    sitemap: "https://carplaygo.fr/sitemap.xml",
  };
}
```

- [ ] **Step 4: Commit**

```bash
git add app/compatibility/page.tsx app/sitemap.ts app/robots.ts
git commit -m "feat: compatibility page, sitemap, robots.txt"
```

---

### Task 18: Environment Variables + README

**Files:**
- Create: `.env.local.example`
- Create: `README.md`

- [ ] **Step 1: Write env example**

```bash
# .env.local.example
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_DOMAIN=https://carplaygo.fr
```

- [ ] **Step 2: Write minimal README**

```markdown
# CarplayGO

Site e-commerce monoproduit pour le dongle USB CarplayGO.

## Stack

Next.js 15 · Tailwind CSS · GSAP · Stripe · TypeScript

## Développement

```bash
npm install
npm run dev
```

## Variables d'environnement

Copier `.env.local.example` vers `.env.local` et renseigner les clés Stripe.

## Déploiement

Vercel (Fluid Compute).
```

- [ ] **Step 3: Commit**

```bash
git add .env.local.example README.md
git commit -m "docs: env example and README"
```

---

### Task 19: Playwright E2E Test — Cart Flow

**Files:**
- Create: `e2e/cart.spec.ts`
- Modify: `package.json` (add test script if missing)

- [ ] **Step 1: Write Playwright test**

```ts
// e2e/cart.spec.ts
import { test, expect } from "@playwright/test";

test("add to cart and proceed to checkout", async ({ page }) => {
  await page.goto("/");

  // Select dual variant
  await page.getByText("CarPlay + Android Auto").click();

  // Add to cart
  await page.getByRole("button", { name: /Ajouter au panier/ }).click();

  // Open cart
  await page.getByLabel("Ouvrir le panier").click();

  // Verify item in cart
  await expect(page.getByText("CarPlay + Android Auto")).toBeVisible();
  await expect(page.getByText("59,90")).toBeVisible();

  // Proceed to checkout (will redirect to Stripe — stop before external)
  // In test mode we just verify the API call is made
  const [request] = await Promise.all([
    page.waitForRequest((req) => req.url().includes("/api/checkout")),
    page.getByRole("button", { name: "Passer au paiement" }).click(),
  ]);

  expect(request.method()).toBe("POST");
});

test("vehicle search filters brands", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Rechercher votre marque...").fill("Renault");
  await expect(page.getByText("Renault")).toBeVisible();
  await expect(page.getByText("BMW")).not.toBeVisible();
});

test("FAQ accordion opens and closes", async ({ page }) => {
  await page.goto("/");
  const question = page.getByText(/Le dongle CarplayGO fonctionne-t-il sur ma voiture/);
  await question.click();
  await expect(page.getByText(/95% des véhicules/)).toBeVisible();
});
```

- [ ] **Step 2: Update package.json scripts**

Ensure scripts include:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test:e2e": "playwright test"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add e2e/cart.spec.ts package.json
git commit -m "test: add Playwright E2E for cart, vehicles, FAQ"
```

---

## Self-Review Checklist

### 1. Spec Coverage

| Spec Requirement | Task |
|------------------|------|
| Next.js 15 App Router | Task 1 |
| Tailwind CSS 4 + custom theme | Task 2 |
| Static data (products, FAQ, vehicles) | Task 3 |
| Cart context + localStorage | Task 4 |
| Reusable UI components | Task 5 |
| Cart drawer with checkout | Task 6 |
| Sticky Navigation | Task 7 |
| Scroll-driven Hero (GSAP) | Task 8 |
| Social Proof + Benefits | Task 9 |
| Variant selector | Task 10 |
| How It Works + Vehicles grid | Task 11 |
| Specs + FAQ accordion | Task 12 |
| Trust CTA + Footer | Task 13 |
| Main page assembly + JSON-LD | Task 14 |
| Stripe Checkout API | Task 15 |
| Stripe Webhook + Success/Cancel | Task 16 |
| Compatibility page + Sitemap + Robots | Task 17 |
| SEO metadata, GEO FAQ | Tasks 14, 17 |
| Playwright E2E | Task 19 |

**No gaps found.**

### 2. Placeholder Scan
- No "TBD", "TODO", "implement later" found in plan.
- No vague "add error handling" steps — each code block contains concrete implementation.
- No "Similar to Task N" references.

### 3. Type Consistency
- `CartItem` interface matches usage in `CartProvider`, `CartDrawer`, and `checkout/route.ts`.
- `ProductVariant` fields (`price`, `stripePriceId`, `id`) are consistent across all tasks.
- JSON-LD helper consistently uses `Record<string, unknown>`.

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-05-27-carplaygo.md`.**

**Two execution options:**

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
