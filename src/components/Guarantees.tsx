type Item = { icon: string; title: string; desc: string };

export default function Guarantees({ items }: { items: Item[] }) {
  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold mb-3">— Наши преимущества</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-wide">
          Почему нас выбирают<br /><span className="text-gold-gradient">бизнес-партнёры</span>
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 border-t border-l border-gray-200">
          {items.map((item) => (
            <div key={item.title} className="border-r border-b border-gray-200 p-8">
              <span className="w-8 h-8 rounded-full border border-brand-gold text-brand-gold flex items-center justify-center text-sm">✓</span>
              <h3 className="font-semibold text-gray-900 mt-4">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
