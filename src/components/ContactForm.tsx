"use client";
import { useState } from "react";

const TYPES = [
  { id: "private", label: "Частный клиент / пробный набор" },
  { id: "hotel", label: "Отель / загородная резиденция" },
  { id: "cafe", label: "Кофейня" },
  { id: "retail", label: "Магазин / ритейл" },
  { id: "corporate", label: "Корпоративный заказ" },
  { id: "other", label: "Другое" },
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const nameInvalid = touched && !name.trim();
  const phoneInvalid = touched && !phone.trim();
  const agreeInvalid = touched && !agree;

  const handleSubmit = async () => {
    setTouched(true);
    if (!name.trim() || !phone.trim() || !agree) {
      setError("Заполните обязательные поля и подтвердите согласие");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone,
          repairType: TYPES.find((t) => t.id === type)?.label ?? "Не указано",
          apartType: email || "—",
          area: 0, materialTier: "—",
          timing: message || "—",
          priceMin: 0, priceMax: 0,
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Ошибка отправки. Позвоните напрямую.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-brand-cream">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="section-title">Обсудить запрос</h2>
        <p className="section-sub">Ответим в течение 24 часов</p>

        <div className="mt-10 bg-white p-6 md:p-8 border border-gray-200">
          {sent ? (
            <div className="text-center py-8">
              <h3 className="font-display text-3xl text-gray-900 mb-2">Заявка принята!</h3>
              <p className="text-gray-500">Мы лично изучим ваш запрос и свяжемся в течение 24 часов.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                <input
                  type="text" placeholder="Имя *" value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full border rounded-none px-4 py-3 text-base focus:outline-none ${
                    nameInvalid ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-brand-gold"
                  }`}
                />
                {nameInvalid && <p className="text-red-500 text-xs mt-1">Укажите имя</p>}
              </div>
              <div>
                <input
                  type="tel" placeholder="Телефон *" value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full border rounded-none px-4 py-3 text-base focus:outline-none ${
                    phoneInvalid ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-brand-gold"
                  }`}
                />
                {phoneInvalid && <p className="text-red-500 text-xs mt-1">Укажите телефон</p>}
              </div>
              <input
                type="email" placeholder="Email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-none px-4 py-3 text-base focus:outline-none focus:border-brand-gold"
              />
              <select
                value={type} onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-200 rounded-none px-4 py-3 text-base focus:outline-none focus:border-brand-gold text-gray-700"
              >
                <option value="">Тип сотрудничества</option>
                {TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
              <textarea
                placeholder="Ваш запрос" value={message} rows={3}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-200 rounded-none px-4 py-3 text-base focus:outline-none focus:border-brand-gold resize-none"
              />
              <label className="flex items-start gap-2 text-xs text-gray-500">
                <input
                  type="checkbox" checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 flex-shrink-0"
                />
                <span>
                  Согласен с <a href="/privacy" className="underline">политикой конфиденциальности</a> и обработкой персональных данных (152-ФЗ)
                </span>
              </label>
              {agreeInvalid && <p className="text-red-500 text-xs -mt-2">Подтвердите согласие на обработку данных</p>}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full text-sm mt-1 disabled:opacity-60">
                {loading ? "Отправляем..." : "Отправить →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
