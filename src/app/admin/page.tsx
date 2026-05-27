import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let productCount = 0;
  let brandCount = 0;
  let faqCount = 0;
  let imageCount = 0;

  try {
    productCount = await prisma.product.count();
    brandCount = await prisma.vehicleBrand.count();
    faqCount = await prisma.fAQItem.count();
    imageCount = await prisma.uploadedImage.count();
  } catch {
    // DB not available during build or env missing
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Produits</h2>
          <p className="text-2xl font-bold text-gray-900">{productCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Marques compatibles</h2>
          <p className="text-2xl font-bold text-gray-900">{brandCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 mb-1">FAQ</h2>
          <p className="text-2xl font-bold text-gray-900">{faqCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Images uploadées</h2>
          <p className="text-2xl font-bold text-gray-900">{imageCount}</p>
        </div>
      </div>
    </div>
  );
}
