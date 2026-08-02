import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ error: "Telegram not configured" }, { status: 500 });
  }

  const body = await req.json();
  const { name, phone, repairType, apartType, area, materialTier, timing, priceMin, priceMax } = body;

  const timingMap: Record<string, string> = {
    asap: "Как можно скорее",
    "1-3m": "Через 1–3 месяца",
    planning: "Пока изучает варианты",
  };

  const text = [
    "📋 Новая заявка с сайта",
    "",
    `👤 Имя: ${name}`,
    `📞 Телефон: ${phone}`,
    "",
    `🏠 Тип ремонта: ${repairType}`,
    `📐 Квартира: ${apartType} (${area} м²)`,
    `🪵 Материалы: ${materialTier}`,
    `📅 Сроки: ${timingMap[timing] ?? timing}`,
    "",
    `💰 Расчёт: ${Number(priceMin).toLocaleString("ru-RU")} – ${Number(priceMax).toLocaleString("ru-RU")} ₽`,
  ].join("\n");

  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });

  if (!tgRes.ok) {
    const err = await tgRes.text();
    console.error("Telegram error:", err);
    return NextResponse.json({ error: "Telegram send failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
