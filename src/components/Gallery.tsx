const PHOTOS = [
  "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&q=80",
  "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=500&q=80",
  "https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&q=80",
  "https://images.unsplash.com/photo-1548907040-4baa419e2ff2?w=500&q=80",
  "https://images.unsplash.com/photo-1526081715791-7be6bea9b7a2?w=500&q=80",
  "https://images.unsplash.com/photo-1521302200778-33500795e128?w=500&q=80",
  "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=500&q=80",
  "https://images.unsplash.com/photo-1611072965169-6ff2b7de5c8f?w=500&q=80",
  "https://images.unsplash.com/photo-1548365328-8b849e6c7e93?w=500&q=80",
  "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&q=80",
];

export default function Gallery() {
  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold mb-3">— Галерея</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-wide">
          Вкус и эстетика<br /><span className="text-gold-gradient">в деталях</span>
        </h2>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-1">
          {PHOTOS.map((url, i) => (
            <div key={i} className="aspect-square overflow-hidden">
              <img src={url} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
