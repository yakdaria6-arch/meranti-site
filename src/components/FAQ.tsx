"use client";
import { useState } from "react";

type Faq = { q: string; a: string };

export default function FAQ({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-brand-cream">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="section-title">Частые вопросы</h2>
        <p className="section-sub">Отвечаем честно на главные сомнения</p>

        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{f.q}</span>
                <span className="text-gray-400 text-xl flex-shrink-0">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
