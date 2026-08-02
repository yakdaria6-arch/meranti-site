type Review = { name: string; location: string; tag: string; text: string; stars: number };

export default function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <section id="reviews" className="py-20 bg-brand-cream">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-title">Отзывы клиентов</h2>
        <p className="section-sub">300+ выполненных заказов — вот что говорят люди</p>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white p-6 flex flex-col gap-4 border border-gray-100">
              <div className="flex gap-1">
                {Array.from({ length: Math.min(r.stars, 5) }).map((_, i) => (
                  <span key={i} className="text-brand-gold text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed flex-1">"{r.text}"</p>
              <div>
                <div className="font-semibold text-gray-900">{r.name}</div>
                <div className="text-sm text-gray-400">{r.location}</div>
                <div className="text-sm text-brand-gold font-semibold mt-1">{r.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
