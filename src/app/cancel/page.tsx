import Link from "next/link";
import { Button } from "../components/ui/Button";

export const metadata = {
  title: "Paiement annulé — CarplayGO",
  robots: { index: false, follow: false },
};

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
          🛒
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Votre panier vous attend
        </h1>
        <p className="text-slate-600 mb-6">
          Le paiement a été interrompu. Vos articles sont toujours réservés.
        </p>
        <Link href="/">
          <Button variant="ghost" size="md" className="w-full">
            Retourner au site et finaliser
          </Button>
        </Link>
      </div>
    </div>
  );
}
