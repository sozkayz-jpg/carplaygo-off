import { Button } from "../components/ui/Button";
import { AnimatedSection } from "../components/AnimatedSection";

export function TrustCTA() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <AnimatedSection>
          <div className="flex flex-wrap justify-center gap-8 mb-10 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-2">
              <span className="text-lg">🔒</span> Paiement sécurisé SSL
            </span>
            <span className="flex items-center gap-2">
              <span className="text-lg">🚚</span> Livraison 24–48h
            </span>
            <span className="flex items-center gap-2">
              <span className="text-lg">🛡️</span> Garantie 2 ans
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Prêt à rouler sans fil ?
          </h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            Rejoignez plus de 12 000 conducteurs en France qui ont déjà adopté
            CarplayGO.
          </p>

          <Button
            variant="primary"
            size="lg"
            className="shadow-[0_8px_30px_rgba(16,185,129,0.35)]"
          >
            Commander maintenant — Livraison offerte
          </Button>

          <p className="text-sm text-slate-500 mt-4">
            Satisfait ou remboursé sous 30 jours · Support réactif
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
