import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          /* === ЦВЕТОВАЯ ПАЛИТРА MERANTI (снята с kutkevich.ru) === */
          gold: "#C8A96E",     /* акцентный золотой — кнопки, рамки, иконки, заголовки */
          goldLight: "#E0D0AA",/* hover / светлый золотой */
          dark: "#1C1006",     /* тёмный фон — hero, футер */
          espresso: "#2D1F0E", /* вторичный тёмный (карточки на тёмном) */
          cream: "#FAF8F4",    /* светлый фон секций */
          /* =========================================================== */
        },
      },
      fontFamily: {
        display: ["'Poiret One'", "cursive"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
