"use client";

import { useEffect, useState, useCallback } from "react";

type UploadedImage = {
  id: string;
  url: string;
  filename: string;
  width: number | null;
  height: number | null;
  sizeBytes: number | null;
  mimeType: string | null;
};

export default function AdminImagesPage() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const fetchImages = async () => {
    const res = await fetch("/api/admin/images");
    if (res.ok) setImages(await res.json());
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadFile = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    if (res.ok) {
      const img = await res.json();
      setImages((prev) => [img, ...prev]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      Array.from(e.dataTransfer.files).forEach(uploadFile);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) Array.from(e.target.files).forEach(uploadFile);
  };

  const deleteImage = async (id: string) => {
    if (!confirm("Supprimer cette image ?")) return;
    const res = await fetch(`/api/admin/images?id=${id}`, { method: "DELETE" });
    if (res.ok) setImages((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Images</h1>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-xl p-8 text-center mb-8 transition ${
          dragOver ? "border-emerald-500 bg-emerald-50" : "border-gray-300 bg-white"
        }`}
      >
        <p className="text-gray-600 mb-2">Glissez-déposez des images ici</p>
        <p className="text-gray-400 text-sm mb-4">ou</p>
        <label className="inline-block cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-lg transition">
          Sélectionner des fichiers
          <input type="file" multiple className="hidden" onChange={handleFileInput} />
        </label>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group relative"
          >
            <img src={img.url} alt={img.filename} className="w-full h-32 object-cover" />
            <div className="p-3">
              <p className="text-xs text-gray-500 truncate">{img.filename}</p>
              <p className="text-xs text-gray-400">
                {img.width ?? "?"}×{img.height ?? "?"} ·{" "}
                {img.sizeBytes ? (img.sizeBytes / 1024).toFixed(1) + " KB" : "?"}
              </p>
            </div>
            <button
              onClick={() => deleteImage(img.id)}
              className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
            >
              Suppr
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
