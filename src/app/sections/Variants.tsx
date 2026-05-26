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
