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
