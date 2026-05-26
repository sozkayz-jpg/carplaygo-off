"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "../components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.5,
        },
      });

      tl.to(titleRef.current, { y: -20, opacity: 0.3, duration: 0.3 }, 0);
      tl.to(subtitleRef.current, { y: -10, opacity: 0.3, duration: 0.3 }, 0);
      tl.to(productRef.current, { y: 40, scale: 1.05, duration: 0.3 }, 0);

      tl.fromTo(
        benefitsRef.current?.children ?? [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.3 },
        0.2
      );

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3 },
        0.6
      );

      tl.to(containerRef.current, { opacity: 0.2, duration: 0.1 }, 0.9);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      <div className="text-center z-10 px-4">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-4"
        >
          CarPlay sans fil
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto mb-8"
        >
          Transformez votre écran d'usine en CarPlay & Android Auto sans câble.
        </p>
      </div>

      <div
        ref={productRef}
        className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl shadow-2xl flex items-center justify-center text-6xl mb-8"
      >
        📦
      </div>

      <div
        ref={benefitsRef}
        className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8"
      >
        {["⚡ Sans fil", "🚗 Universel", "🔧 Plug & Play"].map((b) => (
          <span
            key={b}
            className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm"
          >
            {b}
          </span>
        ))}
      </div>

      <div ref={ctaRef} className="text-center">
        <Button variant="primary" size="lg">
          Commander — 49,90 €
        </Button>
        <p className="text-xs text-slate-400 mt-3">
          Livraison gratuite · Garantie 2 ans
        </p>
      </div>
    </section>
  );
}
