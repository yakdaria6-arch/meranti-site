"use client";

type Props = { company: { phone: string; phoneRaw: string } };

export default function MobileBar({ company }: Props) {
  const scrollToOrder = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 px-4 py-3 flex gap-3 shadow-lg">
      <a
        href={`tel:${company.phoneRaw}`}
        className="flex-1 bg-brand-dark text-white font-semibold py-3 text-center text-sm uppercase tracking-widest"
      >
        Позвонить
      </a>
      <button
        onClick={scrollToOrder}
        className="flex-1 bg-brand-gold text-brand-dark font-semibold py-3 text-sm uppercase tracking-widest"
      >
        Обсудить запрос
      </button>
    </div>
  );
}
