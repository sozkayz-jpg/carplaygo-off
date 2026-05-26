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
