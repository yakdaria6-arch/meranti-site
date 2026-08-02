"use client";
import { useRef } from "react";

const ITEMS = [
  {
    title: "Конфеты ручной работы",
    desc: "6 вкусовых линеек: классическая, ореховая, кофейная, ягодная, алкогольная, новогодняя. Авторская коллекция — Весенние этюды.",
    meta: "Срок годности — от 60 дней",
    img: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&q=80",
  },
  {
    title: "Цукаты в шоколаде",
    desc: "Апельсин в тёмном, лимон в тёмном, грейпфрут в молочном шоколаде. Единственный набор трёх цитрусов в РФ.",
    meta: "Срок — 6 мес. · хранение при 18–21°C",
    img: "https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=600&q=80",
  },
  {
    title: "Линейка без сахара",
    desc: "Цукаты в шоколаде и миндальный трюфель на сиропе топинамбура. Для тех, кто следит за составом.",
    meta: "Срок — 90–180 дней · ЗОЖ-аудитория",
    img: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&q=80",
  },
  {
    title: "Цитрусовый мармелад",
    desc: "Насыщенный вкус натуральных цитрусов без искусственных красителей и ароматизаторов.",
    meta: "Срок — 60 дней",
    img: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=600&q=80",
  },
  {
    title: "Колотый шоколад",
    desc: "Тёмный шоколад с фундуком и сушёными ягодами — для подарка и для себя.",
    meta: "Срок — 4 мес.",
    img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&q=80",
  },
  {
    title: "Солёная карамель",
    desc: "Мягкая карамель ручной варки в тёмном шоколаде с крупной морской солью.",
    meta: "Срок — 45 дней",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80",
  },
  {
    title: "Подарочные наборы",
    desc: "Готовые композиции в фирменной упаковке — под любой повод и бюджет.",
    meta: "От 6 до 48 шт в наборе",
    img: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&q=80",
  },
  {
    title: "Наборы детям",
    desc: "Уменьшенная порция сахара, яркая безопасная упаковка, любимые формы.",
    meta: "Срок — 60 дней",
    img: "https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?w=600&q=80",
  },
];

export default function Assortment() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 380, behavior: "smooth" });

  return (
    <section id="assortment" className="py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-wide">
              Каждая позиция —<br /><span className="text-gold-gradient">с характером</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-md">Ручная работа. Чистый состав. Производство полного цикла в Санкт-Петербурге.</p>
          </div>
          <div className="flex gap-2">
            <span className="text-xs uppercase tracking-widest text-gray-400 self-center mr-2">Листайте</span>
            <button onClick={() => scroll(-1)} className="w-10 h-10 border border-gray-300 hover:border-brand-gold flex items-center justify-center transition-colors">←</button>
            <button onClick={() => scroll(1)} className="w-10 h-10 border border-gray-300 hover:border-brand-gold flex items-center justify-center transition-colors">→</button>
          </div>
        </div>
      </div>

      <div ref={ref} className="flex gap-4 overflow-x-auto px-4 max-w-6xl mx-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex-shrink-0 w-[78vw] max-w-72 sm:w-80 sm:max-w-none snap-start">
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="mt-4">
              <h3 className="font-display text-2xl text-gray-900">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">{item.desc}</p>
              <p className="text-xs uppercase tracking-widest text-gray-400 mt-3">{item.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
