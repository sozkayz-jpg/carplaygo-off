"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Admin CarplayGO</h1>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mot de passe
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Connexion
        </button>
      </form>
    </div>
  );
}
