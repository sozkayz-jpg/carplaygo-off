export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="font-bold text-slate-900 mb-3">CarplayGO</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Le dongle universel pour libérer votre CarPlay et Android Auto
              sans fil.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-3">Informations</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-emerald-primary">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-primary">
                  CGV
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-primary">
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-3">Service client</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-emerald-primary">
                  Livraisons & Retours
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@carplaygo.fr"
                  className="hover:text-emerald-primary"
                >
                  support@carplaygo.fr
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-3">Paiements</h4>
            <div className="flex flex-wrap gap-2 text-xl">
              {["💳", "💳", "💳", "🍎", "🤖"].map((icon, i) => (
                <span
                  key={i}
                  className="w-10 h-7 bg-slate-100 rounded flex items-center justify-center text-sm"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 CarplayGO. Tous droits réservés.</p>
          <div className="flex gap-4">
            {["TikTok", "Instagram", "YouTube"].map((social) => (
              <a
                key={social}
                href="#"
                className="hover:text-emerald-primary transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
