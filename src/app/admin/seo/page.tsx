"use client";

import { useEffect, useState } from "react";

type SEO = {
  id: string;
  route: string;
  title: string;
  description: string;
  keywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageUrl: string | null;
  noIndex: boolean;
};

export default function AdminSEOPage() {
  const [items, setItems] = useState<SEO[]>([]);
  const [editing, setEditing] = useState<SEO | null>(null);

  useEffect(() => {
    fetch("/api/admin/seo")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  const save = async () => {
    if (!editing) return;
    await fetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setItems((prev) => prev.map((i) => (i.id === editing.id ? editing : i)));
    setEditing(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">SEO (RankMath)</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">{item.route}</h2>
              <button
                onClick={() => setEditing(item)}
                className="text-sm bg-gray-900 text-white px-3 py-1 rounded-lg hover:bg-gray-800 transition"
              >
                Modifier
              </button>
            </div>
            {editing?.id === item.id ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    value={editing.title}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={editing.description}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Keywords</label>
                  <input
                    value={editing.keywords || ""}
                    onChange={(e) => setEditing({ ...editing, keywords: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">OG Title</label>
                  <input
                    value={editing.ogTitle || ""}
                    onChange={(e) => setEditing({ ...editing, ogTitle: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">OG Description</label>
                  <textarea
                    value={editing.ogDescription || ""}
                    onChange={(e) => setEditing({ ...editing, ogDescription: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    rows={2}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editing.noIndex}
                    onChange={(e) => setEditing({ ...editing, noIndex: e.target.checked })}
                  />
                  <label className="text-sm text-gray-700">noIndex</label>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={save}
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
              </div>
            ) : (
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">Title:</span> {item.title}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Description:</span> {item.description}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Keywords:</span> {item.keywords || "-"}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
