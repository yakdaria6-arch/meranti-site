const ITEMS = [
  { title: "Ручная работа", desc: "Авторские коллекции, уникальные дизайны. Производим и собираем вручную." },
  { title: "100% чистый состав", desc: "Осознанный выбор подарка, никаких консервантов и усилителей вкуса." },
  { title: "Избранные ингредиенты", desc: "Премиальный шоколад, свежие фрукты, высококачественные сливки и ореховые пасты — основа наших изделий." },
  { title: "Стабильное качество", desc: "Строгий контроль продукции и соблюдения норм на производстве. Декларация о соответствии ЕАС." },
  { title: "Лёгкие условия хранения и перевозки", desc: "Технология позволяет хранить продукцию от 60 дней при t 14–21°C, избегая попадания прямых солнечных лучей." },
  { title: "Любой объём заказа", desc: "Предложим варианты от 1 единицы продукции из наличия до крупных партий на заказ." },
];

export default function USP() {
  return (
    <section className="py-16 bg-brand-dark">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/10">
          {ITEMS.map((item) => (
            <div key={item.title} className="bg-brand-dark p-8">
              <h3 className="font-display text-2xl text-white mb-3">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
