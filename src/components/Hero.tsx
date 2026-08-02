"use client";
import { useState, useEffect } from "react";

type Stat = { value: string; label: string };
type Props = {
  hero: { badge: string; title: string; subtitle: string; bgImage: string };
  stats: Stat[];
  company: { phone: string; phoneRaw: string };
};

const SLIDES = [
  "https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=1200&q=80",
  "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1200&q=80",
  "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=1200&q=80",
  "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=1200&q=80",
];

export default function Hero({ hero, company }: Props) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const scrollToOrder = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToBusiness = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-brand-dark flex flex-col md:flex-row md:min-h-screen pt-16">
      <div className="relative flex-1 flex items-center py-12 md:py-0">
        <div className="px-5 md:px-14 w-full max-w-2xl">
          <p className="text-brand-gold font-medium text-[11px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] mb-5">
            {hero.badge}
          </p>
          <h1 className="text-gold-gradient font-display text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-6 whitespace-pre-line tracking-wide">
            {hero.title}
          </h1>
          <p className="text-white/70 text-base md:text-lg tracking-wide mb-8">
            {hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={scrollToOrder} className="btn-primary text-xs">
              Обсудить запрос
            </button>
            <button onClick={scrollToBusiness} className="btn-outline text-xs">
              Получить пробный набор
            </button>
          </div>
        </div>
      </div>

      <div className="relative flex-1 h-64 sm:h-80 md:h-auto overflow-hidden">
        {SLIDES.map((url, i) => (
          <img
            key={url}
            src={url}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Слайд ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === slide ? "bg-brand-gold" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
