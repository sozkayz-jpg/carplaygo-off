import { AnimatedSection } from "../components/AnimatedSection";

const specs = [
  { label: "Connectivité", value: "WiFi 5GHz + Bluetooth 5.0" },
  { label: "Ports", value: "USB-A et USB-C (adaptateur inclus)" },
  { label: "Mise à jour", value: "OTA automatique via application" },
  { label: "Dimensions", value: "45 × 25 × 12 mm" },
  { label: "Poids", value: "18 g" },
  { label: "Garantie", value: "2 ans" },
  { label: "Certification", value: "CE, FCC, RoHS" },
];

export function Specs() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4">
        <AnimatedSection className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Spécifications techniques
          </h2>
          <p className="text-slate-600">Petit, rapide, puissant.</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {specs.map((s, i) => (
              <div
                key={s.label}
                className={`flex justify-between items-center px-6 py-4 ${
                  i !== specs.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <span className="text-slate-600 font-medium">{s.label}</span>
                <span className="text-slate-900 font-semibold text-right">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
