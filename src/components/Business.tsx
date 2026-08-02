"use client";
import { useState } from "react";

const SEGMENTS = [
  {
    id: "hotels",
    icon: "🏨",
    label: "Отели и резиденции",
    title: "Конфеты как ощущение исключительности",
    points: ["Эксклюзивный подарок гостю, отражающий стиль именно вашего отеля", "Брендирование под стиль отеля"],
  },
  {
    id: "cafes",
    icon: "☕",
    label: "Кофейни",
    title: "Конфеты как способ увеличения среднего чека",
    points: ["Задай вопрос и получи «ответ от Вселенной» — виральный формат. Классика вкуса: кофе и шоколад", "Цукаты и мармелад к кофе"],
  },
  {
    id: "retail",
    icon: "🏪",
    label: "Магазины и ритейл",
    title: "Стабильные поставки под собственную торговую марку",
    points: ["Декларация соответствия ЕАС, срок хранения до 180 дней", "Работаем по ЭДО, возможен формат СТМ"],
  },
  {
    id: "corporate",
    icon: "💼",
    label: "Корпоративным клиентам",
    title: "Новогодние наборы и комплименты партнёрам",
    points: ["Брендирование под фирменный стиль компании", "Договор и закрывающие документы, ЭДО"],
  },
];

export default function Business() {
  const [open, setOpen] = useState<string | null>("hotels");

  const scrollToOrder = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="business" className="py-20 bg-brand-dark">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">Для кого мы работаем</h2>
        <p className="text-white/60 mt-4 max-w-xl">
          Создаём продукты под конкретный формат бизнеса — не универсальные решения, а те, которые работают именно у вас.
        </p>

        <div className="mt-12 grid md:grid-cols-2 border-t border-l border-white/10">
          {SEGMENTS.map((s) => (
            <div key={s.id} className="border-r border-b border-white/10 p-8">
              <div className="flex items-start justify-between">
                <span className="text-2xl">{s.icon}</span>
                <button
                  onClick={() => setOpen(open === s.id ? null : s.id)}
                  aria-expanded={open === s.id}
                  className="w-8 h-8 border border-brand-gold text-brand-gold flex items-center justify-center flex-shrink-0 hover:bg-brand-gold hover:text-brand-dark transition-colors"
                >
                  {open === s.id ? "−" : "+"}
                </button>
              </div>
              <p className="text-brand-gold text-xs uppercase tracking-widest font-semibold mt-6">{s.label}</p>
              <h3 className="font-display text-2xl text-white mt-2 mb-4 max-w-sm">{s.title}</h3>
              {open === s.id && (
                <ul className="flex flex-col gap-2 mt-4">
                  {s.points.map((p) => (
                    <li key={p} className="text-white/70 text-sm leading-relaxed flex gap-2">
                      <span className="text-brand-gold flex-shrink-0">→</span>{p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-white/70 max-w-lg mx-auto">
            Продукт, которым приятно удивить — и который точно будет готов в нужный день.
            Расскажите о вашей задаче — подберём решение под ваш формат.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <button onClick={scrollToOrder} className="btn-primary text-xs">Обсудить запрос</button>
            <button onClick={scrollToOrder} className="btn-outline text-xs">Получить пробный набор</button>
          </div>
        </div>
      </div>
    </section>
  );
}
