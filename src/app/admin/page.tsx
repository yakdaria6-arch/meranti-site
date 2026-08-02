"use client";
import { useState, useEffect, useCallback } from "react";

type Content = {
  company: Record<string, string | number>;
  hero: Record<string, string>;
  stats: { value: string; label: string }[];
  repairTypes: { id: string; label: string; desc: string; priceMin: number; priceMax: number }[];
  apartmentTypes: { id: string; label: string; area: number }[];
  materialTiers: { id: string; label: string; mult: number; desc: string }[];
  portfolio: {
    id: number; tag: string; type: string; area: number;
    days: number; price: number; before: string; after: string;
  }[];
  reviews: { name: string; location: string; tag: string; text: string; stars: number }[];
  process: { n: string; title: string; desc: string }[];
  guarantees: { icon: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
  privacyText: string;
  ofertaText: string;
};

const TABS = [
  { id: "company", label: "Компания" },
  { id: "hero", label: "Hero" },
  { id: "stats", label: "Статистика" },
  { id: "calculator", label: "Калькулятор" },
  { id: "portfolio", label: "Портфолио" },
  { id: "reviews", label: "Отзывы" },
  { id: "process", label: "Процесс" },
  { id: "guarantees", label: "Гарантии" },
  { id: "faq", label: "FAQ" },
  { id: "docs", label: "Документы" },
  { id: "settings", label: "Настройки" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Field({
  label, value, onChange, type = "text", rows,
}: {
  label: string; value: string | number; onChange: (v: string) => void;
  type?: string; rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      {rows ? (
        <textarea
          rows={rows}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
        />
      )}
    </div>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://... или /images/photo.jpg"
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
      />
      {value && (
        <img src={value} alt="preview" className="mt-2 rounded-lg h-32 object-cover w-full" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      )}
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [content, setContent] = useState<Content | null>(null);
  const [tab, setTab] = useState<TabId>("company");
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const load = useCallback(async (pwd: string) => {
    const res = await fetch("/api/admin/content", {
      headers: { "x-admin-password": pwd },
    });
    if (res.status === 401) { setAuthError("Неверный пароль"); return; }
    const data = await res.json();
    setContent(data);
    setAuthed(true);
  }, []);

  const handleLogin = async () => {
    setAuthError("");
    await load(password);
  };

  const save = async () => {
    if (!content) return;
    setSaving(true);
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setSavedMsg("Сохранено ✓");
    setTimeout(() => setSavedMsg(""), 2000);
  };

  const update = (path: string[], value: unknown) => {
    if (!content) return;
    const next = JSON.parse(JSON.stringify(content)) as Content;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let obj: any = next;
    for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
    obj[path[path.length - 1]] = value;
    setContent(next);
  };

  async function changePassword() {
    setPasswordMsg("");
    if (newPassword.length < 6) { setPasswordMsg("❌ Минимум 6 символов"); return; }
    if (newPassword !== newPassword2) { setPasswordMsg("❌ Пароли не совпадают"); return; }
    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ newPassword }),
    });
    if (res.ok) {
      setPasswordMsg("✅ Пароль изменён! Запомните новый пароль.");
      setNewPassword(""); setNewPassword2("");
    } else {
      const d = await res.json();
      setPasswordMsg("❌ " + (d.error || "Ошибка"));
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="text-2xl font-black text-gray-900 mb-1">
            MERANTI
          </div>
          <p className="text-gray-500 text-sm mb-6">Панель управления</p>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 focus:outline-none focus:border-yellow-400"
          />
          {authError && <p className="text-red-500 text-sm mb-3">{authError}</p>}
          <button onClick={handleLogin} className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            Войти
          </button>
        </div>
      </div>
    );
  }

  if (!content) return <div className="min-h-screen flex items-center justify-center text-gray-400">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="font-black text-gray-900">
            MERANTI{" "}
            <span className="text-gray-400 font-normal text-sm">Админка</span>
          </div>
          <div className="flex items-center gap-3">
            {savedMsg && <span className="text-green-600 text-sm font-semibold">{savedMsg}</span>}
            <a href="/" target="_blank" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Открыть сайт →
            </a>
            <button
              onClick={save}
              disabled={saving}
              className="bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-gray-900 font-bold px-5 py-2 rounded-xl text-sm transition-colors"
            >
              {saving ? "Сохраняю..." : "Сохранить"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        {/* sidebar */}
        <div className="w-48 flex-shrink-0">
          <nav className="flex flex-col gap-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  tab === t.id ? "bg-yellow-400 text-gray-900" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">

            {/* COMPANY */}
            {tab === "company" && (
              <div className="flex flex-col gap-4">
                <h2 className="font-black text-lg text-gray-900">Данные компании</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Название" value={content.company.name as string} onChange={(v) => update(["company", "name"], v)} />
                  <Field label="Телефон (отображение)" value={content.company.phone as string} onChange={(v) => update(["company", "phone"], v)} />
                  <Field label="Телефон (для href tel:)" value={content.company.phoneRaw as string} onChange={(v) => update(["company", "phoneRaw"], v)} />
                  <Field label="Город" value={content.company.city as string} onChange={(v) => update(["company", "city"], v)} />
                  <Field label="Работаем с (год)" value={content.company.workingSince as number} type="number" onChange={(v) => update(["company", "workingSince"], Number(v))} />
                  <Field label="Количество объектов" value={content.company.objectsCount as number} type="number" onChange={(v) => update(["company", "objectsCount"], Number(v))} />
                  <Field label="Гарантия (лет)" value={content.company.guaranteeYears as number} type="number" onChange={(v) => update(["company", "guaranteeYears"], Number(v))} />
                  <Field label="ИНН" value={content.company.inn as string} onChange={(v) => update(["company", "inn"], v)} />
                  <Field label="ОГРН" value={content.company.ogrn as string} onChange={(v) => update(["company", "ogrn"], v)} />
                  <Field label="Telegram (ссылка)" value={content.company.telegram as string} onChange={(v) => update(["company", "telegram"], v)} />
                  <Field label="ВКонтакте (ссылка)" value={content.company.vk as string} onChange={(v) => update(["company", "vk"], v)} />
                </div>
              </div>
            )}

            {/* HERO */}
            {tab === "hero" && (
              <div className="flex flex-col gap-4">
                <h2 className="font-black text-lg text-gray-900">Главный экран (Hero)</h2>
                <Field label="Надпись над заголовком" value={content.hero.badge} onChange={(v) => update(["hero", "badge"], v)} />
                <Field label="Заголовок" value={content.hero.title} onChange={(v) => update(["hero", "title"], v)} rows={2} />
                <Field label="Подзаголовок" value={content.hero.subtitle} onChange={(v) => update(["hero", "subtitle"], v)} rows={3} />
                <ImageField label="Фоновое фото (URL)" value={content.hero.bgImage} onChange={(v) => update(["hero", "bgImage"], v)} />
              </div>
            )}

            {/* STATS */}
            {tab === "stats" && (
              <div className="flex flex-col gap-4">
                <h2 className="font-black text-lg text-gray-900">Жёлтая полоса со статистикой</h2>
                {content.stats.map((s, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4 flex gap-4">
                    <div className="flex-1">
                      <Field label="Значение" value={s.value} onChange={(v) => update(["stats", String(i), "value"], v)} />
                    </div>
                    <div className="flex-1">
                      <Field label="Подпись" value={s.label} onChange={(v) => update(["stats", String(i), "label"], v)} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CALCULATOR */}
            {tab === "calculator" && (
              <div className="flex flex-col gap-6">
                <h2 className="font-black text-lg text-gray-900">Наборы и цены</h2>

                <div>
                  <h3 className="font-bold text-gray-700 mb-3">Типы наборов</h3>
                  <div className="flex flex-col gap-3">
                    {content.repairTypes.map((r, i) => (
                      <div key={i} className="border border-gray-100 rounded-xl p-4 grid md:grid-cols-2 gap-3">
                        <Field label="Название" value={r.label} onChange={(v) => update(["repairTypes", String(i), "label"], v)} />
                        <Field label="Описание" value={r.desc} onChange={(v) => update(["repairTypes", String(i), "desc"], v)} />
                        <Field label="Цена от (₽/м²)" value={r.priceMin} type="number" onChange={(v) => update(["repairTypes", String(i), "priceMin"], Number(v))} />
                        <Field label="Цена до (₽/м²)" value={r.priceMax} type="number" onChange={(v) => update(["repairTypes", String(i), "priceMax"], Number(v))} />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-700 mb-3">Типы квартир (площадь по умолчанию)</h3>
                  <div className="flex flex-col gap-3">
                    {content.apartmentTypes.filter(a => a.id !== "custom").map((a, i) => (
                      <div key={i} className="border border-gray-100 rounded-xl p-4 grid md:grid-cols-2 gap-3">
                        <Field label="Название" value={a.label} onChange={(v) => update(["apartmentTypes", String(i), "label"], v)} />
                        <Field label="Площадь (м²)" value={a.area} type="number" onChange={(v) => update(["apartmentTypes", String(i), "area"], Number(v))} />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-700 mb-3">Уровни материалов (коэффициент к цене)</h3>
                  <div className="flex flex-col gap-3">
                    {content.materialTiers.map((m, i) => (
                      <div key={i} className="border border-gray-100 rounded-xl p-4 grid md:grid-cols-3 gap-3">
                        <Field label="Название" value={m.label} onChange={(v) => update(["materialTiers", String(i), "label"], v)} />
                        <Field label="Описание" value={m.desc} onChange={(v) => update(["materialTiers", String(i), "desc"], v)} />
                        <Field label="Коэффициент (1.0 = базовый)" value={m.mult} type="number" onChange={(v) => update(["materialTiers", String(i), "mult"], Number(v))} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-gray-600">
                  <strong>Формула расчёта:</strong> Цена_мин × Площадь × Коэффициент_материала = итог, округлённый до тысяч ₽<br />
                  <strong>Пример:</strong> Евроремонт (25000 ₽/м²) × 58 м² × Стандарт (1.0) = 1 450 000 ₽
                </div>
              </div>
            )}

            {/* PORTFOLIO */}
            {tab === "portfolio" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-black text-lg text-gray-900">Портфолио</h2>
                  <button
                    onClick={() => {
                      const next = [...content.portfolio, {
                        id: Date.now(), tag: "Новый объект", type: "Евроремонт",
                        area: 50, days: 30, price: 1000000,
                        before: "", after: "",
                      }];
                      update(["portfolio"], next);
                    }}
                    className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-4 py-2 rounded-xl text-sm"
                  >
                    + Добавить объект
                  </button>
                </div>
                {content.portfolio.map((p, i) => (
                  <div key={p.id} className="border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-700">{p.tag || `Объект ${i + 1}`}</span>
                      <button
                        onClick={() => update(["portfolio"], content.portfolio.filter((_, idx) => idx !== i))}
                        className="text-red-400 hover:text-red-600 text-sm transition-colors"
                      >
                        Удалить
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <Field label="Название (тег)" value={p.tag} onChange={(v) => update(["portfolio", String(i), "tag"], v)} />
                      <Field label="Тип ремонта" value={p.type} onChange={(v) => update(["portfolio", String(i), "type"], v)} />
                      <Field label="Площадь (м²)" value={p.area} type="number" onChange={(v) => update(["portfolio", String(i), "area"], Number(v))} />
                      <Field label="Срок (дней)" value={p.days} type="number" onChange={(v) => update(["portfolio", String(i), "days"], Number(v))} />
                      <Field label="Стоимость (₽)" value={p.price} type="number" onChange={(v) => update(["portfolio", String(i), "price"], Number(v))} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ImageField label="Фото ДО (URL)" value={p.before} onChange={(v) => update(["portfolio", String(i), "before"], v)} />
                      <ImageField label="Фото ПОСЛЕ (URL)" value={p.after} onChange={(v) => update(["portfolio", String(i), "after"], v)} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* REVIEWS */}
            {tab === "reviews" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-black text-lg text-gray-900">Отзывы</h2>
                  <button
                    onClick={() => update(["reviews"], [...content.reviews, { name: "", location: "", tag: "", text: "", stars: 5 }])}
                    className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-4 py-2 rounded-xl text-sm"
                  >
                    + Добавить
                  </button>
                </div>
                {content.reviews.map((r, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-700">{r.name || `Отзыв ${i + 1}`}</span>
                      <button onClick={() => update(["reviews"], content.reviews.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 text-sm">Удалить</button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <Field label="Имя" value={r.name} onChange={(v) => update(["reviews", String(i), "name"], v)} />
                      <Field label="Город, район" value={r.location} onChange={(v) => update(["reviews", String(i), "location"], v)} />
                      <Field label="Тег (тип, метраж)" value={r.tag} onChange={(v) => update(["reviews", String(i), "tag"], v)} />
                      <Field label="Звёзды (1-5)" value={r.stars} type="number" onChange={(v) => update(["reviews", String(i), "stars"], Number(v))} />
                    </div>
                    <Field label="Текст отзыва" value={r.text} onChange={(v) => update(["reviews", String(i), "text"], v)} rows={4} />
                  </div>
                ))}
              </div>
            )}

            {/* PROCESS */}
            {tab === "process" && (
              <div className="flex flex-col gap-4">
                <h2 className="font-black text-lg text-gray-900">Как мы работаем — шаги</h2>
                {content.process.map((s, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4 flex flex-col gap-3">
                    <div className="flex gap-4">
                      <div className="w-20 flex-shrink-0">
                        <Field label="Номер" value={s.n} onChange={(v) => update(["process", String(i), "n"], v)} />
                      </div>
                      <div className="flex-1">
                        <Field label="Заголовок шага" value={s.title} onChange={(v) => update(["process", String(i), "title"], v)} />
                      </div>
                    </div>
                    <Field label="Описание" value={s.desc} onChange={(v) => update(["process", String(i), "desc"], v)} rows={2} />
                  </div>
                ))}
              </div>
            )}

            {/* GUARANTEES */}
            {tab === "guarantees" && (
              <div className="flex flex-col gap-4">
                <h2 className="font-black text-lg text-gray-900">Блок гарантий</h2>
                {content.guarantees.map((g, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4 grid md:grid-cols-3 gap-3">
                    <Field label="Иконка (эмодзи)" value={g.icon} onChange={(v) => update(["guarantees", String(i), "icon"], v)} />
                    <Field label="Заголовок" value={g.title} onChange={(v) => update(["guarantees", String(i), "title"], v)} />
                    <Field label="Описание" value={g.desc} onChange={(v) => update(["guarantees", String(i), "desc"], v)} />
                  </div>
                ))}
              </div>
            )}

            {/* FAQ */}
            {tab === "faq" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-black text-lg text-gray-900">Часто задаваемые вопросы</h2>
                  <button
                    onClick={() => update(["faq"], [...content.faq, { q: "", a: "" }])}
                    className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-4 py-2 rounded-xl text-sm"
                  >
                    + Добавить вопрос
                  </button>
                </div>
                {content.faq.map((f, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Field label="Вопрос" value={f.q} onChange={(v) => update(["faq", String(i), "q"], v)} />
                      </div>
                      <button onClick={() => update(["faq"], content.faq.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 text-sm mt-5 flex-shrink-0">Удалить</button>
                    </div>
                    <Field label="Ответ" value={f.a} onChange={(v) => update(["faq", String(i), "a"], v)} rows={3} />
                  </div>
                ))}
              </div>
            )}

            {/* DOCS */}
            {tab === "docs" && (
              <div className="flex flex-col gap-6">
                <h2 className="font-black text-lg text-gray-900">Документы</h2>
                <p className="text-gray-500 text-sm">Вставьте текст от клиента или отредактируйте стандартный. Отображается на страницах /privacy и /oferta.</p>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Политика конфиденциальности <span className="normal-case text-gray-400">(страница /privacy)</span></label>
                  <textarea
                    value={content.privacyText || ""}
                    onChange={e => update(["privacyText"], e.target.value)}
                    rows={14}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400 resize-y font-mono"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Публичная оферта <span className="normal-case text-gray-400">(страница /oferta)</span></label>
                  <textarea
                    value={content.ofertaText || ""}
                    onChange={e => update(["ofertaText"], e.target.value)}
                    rows={14}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400 resize-y font-mono"
                  />
                </div>

                <button onClick={save} disabled={saving}
                  className="bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-gray-900 font-bold px-5 py-3 rounded-xl text-sm transition-colors">
                  {saving ? "Сохраняю..." : "Сохранить документы"}
                </button>
                {savedMsg && <p className="text-green-600 text-sm font-semibold">{savedMsg}</p>}
              </div>
            )}

            {/* SETTINGS */}
            {tab === "settings" && (
              <div className="flex flex-col gap-6">
                <h2 className="font-black text-lg text-gray-900">Настройки</h2>
                <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-4 max-w-sm">
                  <h3 className="font-bold text-gray-800">Смена пароля</h3>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Новый пароль</label>
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                      placeholder="Минимум 6 символов"
                      className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Повторите пароль</label>
                    <input type="password" value={newPassword2} onChange={e => setNewPassword2(e.target.value)}
                      placeholder="Повторите новый пароль"
                      className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400" />
                  </div>
                  {passwordMsg && <p className="text-sm">{passwordMsg}</p>}
                  <button onClick={changePassword}
                    className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                    Сменить пароль
                  </button>
                  <p className="text-xs text-gray-400">После смены пароля запомните его — восстановить можно только через разработчика.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
