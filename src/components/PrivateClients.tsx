export default function PrivateClients() {
  return (
    <section id="private" className="py-20 bg-brand-cream text-center">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-wide">
          Порадуйте себя.<br /><span className="text-gold-gradient">Или кого-то важного</span>
        </h2>
        <p className="text-gray-500 mt-4">Готовые наборы MERANTI — в наличии на маркетплейсах</p>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <a href="#" className="border border-gray-300 hover:border-brand-gold p-6 transition-colors">
            <div className="font-semibold text-gray-900">Wildberries</div>
            <div className="text-xs uppercase tracking-widest text-brand-gold mt-2">Перейти в магазин →</div>
          </a>
          <a href="#" className="border border-gray-300 hover:border-brand-gold p-6 transition-colors">
            <div className="font-semibold text-gray-900">Ozon</div>
            <div className="text-xs uppercase tracking-widest text-brand-gold mt-2">Перейти в магазин →</div>
          </a>
        </div>
      </div>
    </section>
  );
}
