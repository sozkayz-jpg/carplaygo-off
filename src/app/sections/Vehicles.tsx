"use client";

import { useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";

export function Vehicles({ vehicleBrands }: { vehicleBrands: string[] }) {
  const [query, setQuery] = useState("");
  const filtered = query.trim()
    ? vehicleBrands.filter((b) => {
        const q = query.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
        return b.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes(q);
      })
    : vehicleBrands;

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
