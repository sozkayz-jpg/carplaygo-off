import Link from "next/link";
import { Button } from "../components/ui/Button";

export const metadata = {
  title: "Merci pour votre commande — CarplayGO",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-emerald-primary/10 text-emerald-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
          🎉
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Merci pour votre commande !
        </h1>
        <p className="text-slate-600 mb-6">
          Vous recevrez un email de confirmation sous peu. Votre dongle sera
          expédié dans les 24h.
        </p>
        <Link href="/">
          <Button variant="primary" size="md" className="w-full">
            Retourner sur le site
          </Button>
        </Link>
      </div>
    </div>
  );
}
