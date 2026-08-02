"use client";

type Props = { company: { phone: string; phoneRaw: string } };

export default function MobileBar({ company }: Props) {
  const scrollToOrder = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 px-3 py-2 flex gap-2 shadow-lg">
      <a
        href={`tel:${company.phoneRaw}`}
        className="flex-1 bg-brand-dark text-white font-medium py-2 text-center text-xs uppercase tracking-wider"
      >
        Позвонить
      </a>
      <button
        onClick={scrollToOrder}
        className="flex-1 bg-brand-gold text-brand-dark font-medium py-2 text-xs uppercase tracking-wider"
      >
        Обсудить запрос
      </button>
    </div>
  );
}
