import { AnimatedSection } from "../components/AnimatedSection";

const benefits = [
  {
    icon: "⚡",
    title: "Sans fil",
    description: "Connectez-vous en 3 secondes, sans toucher un câble.",
  },
  {
    icon: "🚗",
    title: "Universel",
    description: "Compatible avec 95% des véhicules équipés de CarPlay d'usine.",
  },
  {
    icon: "🔧",
    title: "Plug & Play",
    description: "Branchez, activez, roulez. Aucune installation technique.",
  },
];

export function Benefits() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Pourquoi choisir CarplayGO ?
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Le dongle le plus simple et le plus fiable pour libérer votre
            CarPlay.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <AnimatedSection key={b.title} delay={i * 0.15}>
              <div className="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow">
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{b.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
