import { AnimatedSection } from "../components/AnimatedSection";

export function SocialProof() {
  return (
    <AnimatedSection className="py-10 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
        <div>
          <div className="text-2xl mb-1">⭐⭐⭐⭐⭐</div>
          <p className="text-sm font-semibold text-slate-900">
            4,8/5 — 2 847 avis vérifiés
          </p>
        </div>
        <div className="hidden sm:block w-px h-10 bg-slate-200" />
        <div>
          <p className="text-2xl font-extrabold text-emerald-primary mb-1">
            +12 450
          </p>
          <p className="text-sm text-slate-600">unités vendues en France</p>
        </div>
        <div className="hidden sm:block w-px h-10 bg-slate-200" />
        <div className="flex items-center gap-3">
          {["📰", "📻", "📺", "🎙️"].map((icon, i) => (
            <div
              key={i}
              className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-lg grayscale hover:grayscale-0 transition-all"
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
