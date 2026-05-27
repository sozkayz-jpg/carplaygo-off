"use client";

import { useEffect, useState } from "react";

type Brand = {
  id: string;
  name: string;
};

export default function AdminVehiclesPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetch("/api/admin/vehicles")
      .then((r) => r.json())
      .then(setBrands);
  }, []);

  const create = async () => {
    if (!newName.trim()) return;
    const res = await fetch("/api/admin/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    });
    if (res.ok) {
      const b = await res.json();
      setBrands((prev) => [...prev, b].sort((a, b) => a.name.localeCompare(b.name)));
      setNewName("");
    }
  };

  const del = async (id: string) => {
    if (!confirm("Supprimer cette marque ?")) return;
    await fetch(`/api/admin/vehicles?id=${id}`, { method: "DELETE" });
    setBrands((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Véhicules compatibles</h1>
      <div className="flex gap-2 mb-6">
        <input
          placeholder="Nouvelle marque"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && create()}
          className="border rounded-lg px-3 py-2 w-64"
        />
        <button
          onClick={create}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition"
        >
          Ajouter
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {brands.map((b) => (
          <div
            key={b.id}
            className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between"
          >
            <span className="text-sm font-medium text-gray-800">{b.name}</span>
            <button
              onClick={() => del(b.id)}
              className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
            >
              Suppr
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
