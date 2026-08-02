"use client";

export default function CTA() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-brand-dark text-center">
      <div className="max-w-lg mx-auto px-4">
        <p className="text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold mb-4">Для бизнеса</p>
        <h2 className="font-display text-3xl md:text-4xl text-white mb-4 tracking-wide">
          Хотите узнать, что мы можем предложить именно вам?
        </h2>
        <p className="text-white/60 mb-8">Пришлём презентацию под ваш сегмент.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button onClick={scrollToContact} className="btn-primary text-xs">Шоколадные конфеты (отели)</button>
          <button onClick={scrollToContact} className="btn-primary text-xs">Цукаты и мармелад (ритейл)</button>
        </div>
      </div>
    </section>
  );
}
