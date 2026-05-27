import Link from "next/link";
import { ReactNode } from "react";

export const metadata = {
  title: "Admin — CarplayGO",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 font-bold text-xl tracking-tight">CarplayGO Admin</div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            Dashboard
          </Link>
          <Link href="/admin/images" className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            Images
          </Link>
          <Link href="/admin/seo" className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            SEO
          </Link>
          <Link href="/admin/products" className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            Produits
          </Link>
          <Link href="/admin/faq" className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            FAQ
          </Link>
          <Link href="/admin/config" className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            Configuration
          </Link>
        </nav>
        <div className="p-4">
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-sm font-medium"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
