"use client";

const HERO_VIDEO = "https://videos.pexels.com/video-files/3195392/3195392-hd_1920_1080_25fps.mp4";

type Stat = { value: string; label: string };
type Props = {
  hero: { badge: string; title: string; subtitle: string; bgImage: string };
  stats: Stat[];
  company: { phone: string; phoneRaw: string };
};

export default function Hero({ hero, company }: Props) {
  const scrollToOrder = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToBusiness = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-brand-dark flex flex-col md:flex-row md:min-h-screen pt-16">
      <div className="relative md:flex-1 flex items-center py-12 md:py-0">
        <div className="px-5 md:px-14 w-full max-w-2xl">
          <p className="text-brand-gold font-medium text-[11px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] mb-5">
            {hero.badge}
          </p>
          <h1 className="text-gold-gradient font-display text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-6 whitespace-pre-line tracking-wide">
            {hero.title}
          </h1>
          <p className="text-white/70 text-base md:text-lg tracking-wide mb-8">
            {hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={scrollToOrder} className="btn-primary text-xs">
              Обсудить запрос
            </button>
            <button onClick={scrollToBusiness} className="btn-outline text-xs">
              Получить пробный набор
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full h-64 sm:h-80 md:h-auto md:flex-1 overflow-hidden flex-shrink-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-brand-dark/10" />
      </div>
    </section>
  );
}
