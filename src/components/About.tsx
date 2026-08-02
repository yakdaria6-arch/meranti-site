"use client";
import { useState } from "react";

export default function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="bg-white">
      <div className="grid md:grid-cols-2">
        <div className="aspect-[4/5] md:aspect-auto md:min-h-[600px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
            alt="Основатель MERANTI"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-brand-dark flex items-center px-8 md:px-14 py-16">
          <div>
            <p className="text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold mb-4">— Основатель бренда</p>
            <h2 className="font-display text-4xl text-white tracking-wide mb-2">Мария Соколова</h2>
            <p className="font-display text-xl text-white/70 italic border-l-2 border-brand-gold pl-4 my-6 leading-relaxed">
              «Я создаю не просто конфеты — я создаю ощущение исключительности»
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              Мой шоколадный путь начался в 2022 году с конфет ручной работы. Я всегда мечтала делать монопродукт —
              но чтобы к нему прийти, надо пройти весь путь проб и ошибок.
            </p>
            {expanded && (
              <p className="text-white/70 leading-relaxed mb-4">
                В 2023 году я попробовала итальянские цукаты и заглазировала их в шоколаде. Это был настоящий взрыв
                вкуса. С того момента я знала: хочу создавать такой продукт. Так родился MERANTI — бренд, где ручная
                работа встречается с чистым составом.
              </p>
            )}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="text-brand-gold text-xs uppercase tracking-widest font-semibold hover:text-brand-goldLight transition-colors"
            >
              {expanded ? "Свернуть ↑" : "Читать дальше ↓"}
            </button>
            <p className="text-white/40 text-xs mt-8">Основатель MERANTI · Санкт-Петербург · 4 года в деле</p>
          </div>
        </div>
      </div>
    </section>
  );
}
