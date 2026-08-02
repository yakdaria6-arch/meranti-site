type Company = {
  name: string; phone: string; phoneRaw: string; city: string;
  inn: string; ogrn: string; telegram: string; vk: string;
};

export default function Footer({ company }: { company: Company }) {
  return (
    <footer className="bg-brand-dark border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-white font-display text-2xl tracking-widest mb-2">{company.name}</div>
            <p className="text-white/50 text-sm">{company.city}</p>
            <a href={`tel:${company.phoneRaw}`} className="block text-brand-gold font-semibold mt-3 hover:text-brand-goldLight transition-colors">
              {company.phone}
            </a>
            {(company.inn || company.ogrn) && (
              <p className="text-white/30 text-xs mt-2">
                {company.inn && `ИНН: ${company.inn}`}
                {company.inn && company.ogrn && " · "}
                {company.ogrn && `ОГРН: ${company.ogrn}`}
              </p>
            )}
            <div className="flex gap-3 mt-4">
              <a href={company.telegram} className="w-9 h-9 bg-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-dark transition-all text-xs font-bold">ТГ</a>
              <a href={company.vk} className="w-9 h-9 bg-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-dark transition-all text-xs font-bold">ВК</a>
            </div>
          </div>

          <div>
            <div className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-4">Документы</div>
            <ul className="flex flex-col gap-2 text-sm text-white/60">
              <li><a href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</a></li>
              <li><a href="/oferta" className="hover:text-white transition-colors">Публичная оферта</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/30">
          <span>© 2026 {company.name}. Все права защищены.</span>
          <span>Сайт не является публичной офертой. Окончательная стоимость определяется после согласования заказа.</span>
        </div>
      </div>
    </footer>
  );
}
