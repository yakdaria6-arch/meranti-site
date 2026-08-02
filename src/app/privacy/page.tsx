import { readFileSync } from "fs";
import { join } from "path";

export default function PrivacyPage() {
  let text = "";
  try {
    const content = JSON.parse(readFileSync(join(process.cwd(), "data", "content.json"), "utf-8"));
    text = content.privacyText ?? "";
  } catch {}

  return (
    <main className="min-h-screen bg-white font-sans">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="font-serif text-3xl text-gray-900 mb-8">Политика конфиденциальности</h1>
        <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
          {text || "Текст документа не добавлен. Зайдите в админку → Документы."}
        </div>
        <a href="/" className="inline-block mt-10 text-sm text-brand-gold hover:opacity-75 font-semibold transition">
          ← Вернуться на главную
        </a>
      </div>
    </main>
  );
}
