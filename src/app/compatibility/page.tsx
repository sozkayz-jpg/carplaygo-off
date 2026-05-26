import { vehicleBrands } from "../lib/vehicles";
import { JSONLD } from "../components/JSONLD";

export const metadata = {
  title: "Compatibilité CarplayGO — Liste des véhicules compatibles",
  description:
    "Découvrez si votre voiture est compatible avec le dongle CarplayGO. Plus de 50 marques et des centaines de modèles : Audi, BMW, Mercedes, Renault, Peugeot, Toyota...",
  alternates: { canonical: "https://carplaygo.fr/compatibility" },
};

export default function CompatibilityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Compatibilité CarplayGO",
    description: "Liste complète des marques de véhicules compatibles avec CarplayGO.",
    url: "https://carplaygo.fr/compatibility",
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Véhicules compatibles
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl">
            CarplayGO fonctionne avec tous les véhicules équipés du CarPlay
            filaire d'usine. Voici la liste complète des marques compatibles :
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {vehicleBrands.map((brand) => (
              <div
                key={brand}
                className="bg-slate-50 rounded-lg px-4 py-3 text-center font-medium text-slate-700 hover:bg-emerald-primary/5 transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-slate-50 rounded-2xl">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Votre véhicule n'est pas listé ?
            </h2>
            <p className="text-slate-600 mb-4">
              Contactez-nous à{" "}
              <a
                href="mailto:support@carplaygo.fr"
                className="text-emerald-primary underline"
              >
                support@carplaygo.fr
              </a>{" "}
              avec la marque, le modèle et l'année de votre voiture. Nous
              vérifions la compatibilité sous 24h et vous offrons un test
              gratuit si nous ne l'avons pas encore validé.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
