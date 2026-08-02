# MERANTI — сайт авторского шоколада

Next.js 14 + Tailwind CSS. Заявки → Telegram.

## Быстрый старт

```bash
cd sweet-site
npm install
cp .env.example .env.local
# заполни .env.local
npm run dev
```

## Настройка Telegram

1. Создай бота через [@BotFather](https://t.me/BotFather) → получи `TELEGRAM_BOT_TOKEN`
2. Напиши боту любое сообщение, потом открой:
   `https://api.telegram.org/bot<TOKEN>/getUpdates`
   — найди `"chat":{"id":...}` — это твой `TELEGRAM_CHAT_ID`
3. Вставь оба значения в `.env.local`

## Деплой на VPS

1. Сервер с Ubuntu + Node.js
2. `git clone`, `npm install`, `npm run build`
3. Запуск через PM2: `pm2 start npm --name meranti -- start`
4. Nginx как reverse proxy + SSL через Let's Encrypt
5. Домен → A-запись на IP сервера

## Что кастомизировать

| Что | Где |
|-----|-----|
| Телефон | `Header.tsx`, `Hero.tsx`, `Footer.tsx`, `MobileBar.tsx` |
| Наборы и цены | `Calculator.tsx` → данные в `content.json` → `repairTypes` |
| B2B-сегменты | `Business.tsx` → `SEGMENTS` |
| Кейсы | `Portfolio.tsx` → `content.json` → `portfolio` |
| Отзывы | `Reviews.tsx` |
| FAQ | `FAQ.tsx` |
| Название бренда | `layout.tsx` (meta) + компоненты |

Весь контент (тексты, цены, фото, отзывы) редактируется через `/admin` без правки кода.
