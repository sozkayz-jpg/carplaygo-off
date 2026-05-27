"use client";

import { useEffect, useState } from "react";

type FAQ = {
  id: string;
  question: string;
  answer: string;
  keywords: string | null;
  order: number;
};

export default function AdminFAQPage() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [creating, setCreating] = useState(false);
  const [newFAQ, setNewFAQ] = useState<Partial<FAQ>>({});

  useEffect(() => {
    fetch("/api/admin/faq")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  const saveEdit = async () => {
    if (!editing) return;
    await fetch("/api/admin/faq", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setItems((prev) => prev.map((i) => (i.id === editing.id ? editing : i)));
    setEditing(null);
  };

  const create = async () => {
    const res = await fetch("/api/admin/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFAQ),
    });
    const f = await res.json();
    setItems((prev) => [...prev, f]);
    setCreating(false);
    setNewFAQ({});
  };

  const del = async (id: string) => {
    if (!confirm("Supprimer ?")) return;
    await fetch(`/api/admin/faq?id=${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const form = (data: Partial<FAQ>, setter: (v: Partial<FAQ>) => void) => (
    <div className="space-y-3">
      <input
        placeholder="Question"
        value={data.question || ""}
        onChange={(e) => setter({ ...data, question: e.target.value })}
        className="w-full border rounded-lg px-3 py-2"
      />
      <textarea
        placeholder="Réponse"
        value={data.answer || ""}
        onChange={(e) => setter({ ...data, answer: e.target.value })}
        className="w-full border rounded-lg px-3 py-2"
        rows={3}
      />
      <input
        placeholder="Keywords"
        value={data.keywords || ""}
        onChange={(e) => setter({ ...data, keywords: e.target.value })}
        className="w-full border rounded-lg px-3 py-2"
      />
      <input
        type="number"
        placeholder="Ordre"
        value={data.order || 0}
        onChange={(e) => setter({ ...data, order: parseInt(e.target.value) })}
        className="w-full border rounded-lg px-3 py-2"
      />
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">FAQ</h1>
      <button
        onClick={() => setCreating(true)}
        className="mb-6 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition"
      >
        Ajouter une question
      </button>
      {creating && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <h2 className="font-semibold mb-3">Nouvelle question</h2>
          {form(newFAQ, setNewFAQ)}
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
        {items.map((f) => (
          <div key={f.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            {editing?.id === f.id ? (
              <>
                {form(editing, (v) => setEditing({ ...editing, ...v }))}
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
                  <h2 className="font-semibold text-gray-900">{f.question}</h2>
                  <p className="text-sm text-gray-600 mt-1">{f.answer}</p>
                  <p className="text-xs text-gray-400 mt-1">Order: {f.order}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(f)}
                    className="text-sm bg-gray-900 text-white px-3 py-1 rounded-lg hover:bg-gray-800 transition"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => del(f.id)}
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
