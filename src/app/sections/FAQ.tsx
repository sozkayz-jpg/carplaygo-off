"use client";

import { useState } from "react";
import { faqItems } from "../lib/faq";
import { AnimatedSection } from "../components/AnimatedSection";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Questions fréquentes
          </h2>
          <p className="text-slate-600">
            Tout ce que vous devez savoir avant de commander.
          </p>
        </AnimatedSection>

        <div className="space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <span className="font-semibold text-slate-900 pr-4">
                      {item.question}
                    </span>
                    <span
                      className={`text-emerald-primary text-xl transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 py-4 text-slate-600 leading-relaxed bg-white">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
