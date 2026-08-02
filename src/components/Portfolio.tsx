type Project = {
  id: number; tag: string; type: string; area: number;
  days: number; price: number; before: string; after: string;
};

export default function Portfolio({ projects }: { projects: Project[] }) {
  return (
    <section id="portfolio" className="py-20 bg-brand-dark">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold mb-3">— Кейсы</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-wide max-w-xl">
          Примеры заказов,<br /><span className="text-gold-gradient">которыми мы гордимся</span>
        </h2>
        <p className="text-white/60 mt-4 max-w-lg">
          Не только красиво и вкусно. Крупные партии, сжатые сроки, доставка по России — вызовы, с которыми мы справляемся.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.id} className="flex flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-white/5">
                <img src={p.after} alt={p.type} className="w-full h-full object-cover" />
              </div>
              <div className="mt-5">
                <h3 className="font-display text-2xl text-white">{p.type}</h3>
                <p className="text-brand-gold text-xs uppercase tracking-widest font-semibold mt-1">{p.tag}</p>
                <p className="text-white/50 text-sm mt-3">
                  {p.area.toLocaleString("ru-RU")} шт за {p.days} {p.days === 1 ? "день" : "дней"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
