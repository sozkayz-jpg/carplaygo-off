"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number | null;
  imageUrl: string;
  features: string;
  stripePriceId: string | null;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  const saveEdit = async () => {
    if (!editing) return;
    await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setProducts((prev) => prev.map((p) => (p.id === editing.id ? editing : p)));
    setEditing(null);
  };

  const create = async () => {
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const p = await res.json();
    setProducts((prev) => [p, ...prev]);
    setCreating(false);
    setNewProduct({});
  };

  const del = async (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const formFields = (p: Partial<Product>, setter: (v: Partial<Product>) => void) => (
    <div className="space-y-3">
      <input
        placeholder="Nom"
        value={p.name || ""}
        onChange={(e) => setter({ ...p, name: e.target.value })}
        className="w-full border rounded-lg px-3 py-2"
      />
      <input
        placeholder="Tagline"
        value={p.tagline || ""}
        onChange={(e) => setter({ ...p, tagline: e.target.value })}
        className="w-full border rounded-lg px-3 py-2"
      />
      <textarea
        placeholder="Description"
        value={p.description || ""}
        onChange={(e) => setter({ ...p, description: e.target.value })}
        className="w-full border rounded-lg px-3 py-2"
        rows={3}
      />
      <input
        type="number"
        placeholder="Prix"
        value={p.price || ""}
        onChange={(e) => setter({ ...p, price: parseFloat(e.target.value) })}
        className="w-full border rounded-lg px-3 py-2"
      />
      <input
        type="number"
        placeholder="Prix barré"
        value={p.originalPrice || ""}
        onChange={(e) =>
          setter({ ...p, originalPrice: e.target.value ? parseFloat(e.target.value) : null })
        }
        className="w-full border rounded-lg px-3 py-2"
      />
      <input
        placeholder="Image URL"
        value={p.imageUrl || ""}
        onChange={(e) => setter({ ...p, imageUrl: e.target.value })}
        className="w-full border rounded-lg px-3 py-2"
      />
      <input
        placeholder="Stripe Price ID"
        value={p.stripePriceId || ""}
        onChange={(e) => setter({ ...p, stripePriceId: e.target.value })}
        className="w-full border rounded-lg px-3 py-2"
      />
      <input
        placeholder="Features (JSON array)"
        value={p.features || "[]"}
        onChange={(e) => setter({ ...p, features: e.target.value })}
        className="w-full border rounded-lg px-3 py-2"
      />
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Produits</h1>
      <button
        onClick={() => setCreating(true)}
        className="mb-6 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition"
      >
        Ajouter un produit
      </button>
      {creating && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <h2 className="font-semibold mb-3">Nouveau produit</h2>
          {formFields(newProduct, setNewProduct)}
          <div className="flex gap-2 mt-3">
            <button
              onClick={create}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
            >
              Créer
            </button>
            <button
              onClick={() => setCreating(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            {editing?.id === p.id ? (
              <>
                {formFields(editing, (v) => setEditing({ ...editing, ...v }))}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={saveEdit}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    Annuler
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-gray-900">{p.name}</h2>
                  <p className="text-sm text-gray-500">{p.tagline}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {p.price} € {p.originalPrice ? `(~${p.originalPrice} €)` : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(p)}
                    className="text-sm bg-gray-900 text-white px-3 py-1 rounded-lg hover:bg-gray-800 transition"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => del(p.id)}
                    className="text-sm bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                  >
                    Suppr
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
