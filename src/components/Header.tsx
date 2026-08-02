"use client";
import { useState, useEffect } from "react";

type Props = {
  company: { name: string; phone: string; phoneRaw: string };
};

const LINKS = [
  { href: "#assortment", label: "Ассортимент" },
  { href: "#business", label: "Для бизнеса" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#faq", label: "FAQ" },
];

export default function Header({ company }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToOrder = () => {
    setMenuOpen(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? "bg-brand-dark/95 backdrop-blur-sm shadow-lg" : "bg-brand-dark/60"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="text-white font-display text-xl md:text-2xl tracking-widest">
          {company.name}
        </span>

        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-white/70">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-brand-gold transition-colors">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${company.phoneRaw}`}
            className="hidden md:block text-white text-sm font-medium hover:text-brand-gold transition-colors"
          >
            {company.phone}
          </a>
          <button onClick={scrollToOrder} className="hidden sm:block btn-primary text-xs px-5 py-2.5">
            Обсудить запрос
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Меню"
            className="md:hidden text-white w-9 h-9 flex items-center justify-center"
          >
            <span className="text-xl">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-brand-dark border-t border-white/10 px-4 py-5 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a
              key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 text-sm uppercase tracking-widest"
            >
              {l.label}
            </a>
          ))}
          <a href={`tel:${company.phoneRaw}`} className="text-brand-gold text-sm font-medium">
            {company.phone}
          </a>
          <button onClick={scrollToOrder} className="btn-primary text-xs w-full">
            Обсудить запрос
          </button>
        </div>
      )}
    </header>
  );
}
