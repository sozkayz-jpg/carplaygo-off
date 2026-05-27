"use client";

import { useEffect, useState } from "react";

type Config = {
  id: string;
  logoUrl: string | null;
  logoWidth: number;
  logoHeight: number;
  faviconUrl: string | null;
  ogImageUrl: string | null;
  primaryColor: string;
};

export default function AdminConfigPage() {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    fetch("/api/admin/config")
      .then((r) => r.json())
      .then(setConfig);
  }, []);

  const save = async () => {
    if (!config) return;
    await fetch("/api/admin/config", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    alert("Configuration enregistrée");
  };

  if (!config) return <p>Chargement...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Configuration</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Logo URL</label>
          <input
            value={config.logoUrl || ""}
            onChange={(e) => setConfig({ ...config, logoUrl: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Logo Width (px)</label>
            <input
              type="number"
              value={config.logoWidth}
              onChange={(e) => setConfig({ ...config, logoWidth: parseInt(e.target.value) })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Logo Height (px)</label>
            <input
              type="number"
              value={config.logoHeight}
              onChange={(e) => setConfig({ ...config, logoHeight: parseInt(e.target.value) })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Favicon URL</label>
          <input
            value={config.faviconUrl || ""}
            onChange={(e) => setConfig({ ...config, faviconUrl: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">OG Image URL</label>
          <input
            value={config.ogImageUrl || ""}
            onChange={(e) => setConfig({ ...config, ogImageUrl: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Couleur principale</label>
          <input
            value={config.primaryColor}
            onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>
        <button
          onClick={save}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-lg transition"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
