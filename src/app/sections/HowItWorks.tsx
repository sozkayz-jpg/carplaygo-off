import { AnimatedSection } from "../components/AnimatedSection";

const steps = [
  {
    num: "1",
    title: "Branchez le dongle",
    desc: "Insérez le dongle CarplayGO dans le port USB de votre voiture, à la place de votre câble.",
  },
  {
    num: "2",
    title: "Activez le Bluetooth",
    desc: "Appairez votre smartphone une seule fois. L'appairage WiFi se fait automatiquement.",
  },
  {
    num: "3",
    title: "Roulez sans fil",
    desc: "À chaque démarrage, CarPlay ou Android Auto se lance automatiquement, sans câble.",
  },
];

export function HowItWorks() {
  return (
    <section id="fonctionnement" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Comment ça marche ?
          </h2>
          <p className="text-slate-600">Trois étapes. Zéro prise de tête.</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <AnimatedSection key={s.num} delay={i * 0.15}>
              <div className="text-center">
                <div className="w-14 h-14 bg-emerald-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-5 shadow-[0_4px_14px_rgba(16,185,129,0.3)]">
                  {s.num}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
