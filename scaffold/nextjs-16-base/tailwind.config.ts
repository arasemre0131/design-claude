import type { Config } from "tailwindcss";

/**
 * Tailwind v4 JS config — sadece content paths icin.
 * Tum tema tokens (renk, tipografi, spacing) app/globals.css icinde
 * @theme directive ile tanimli (CSS-first approach).
 *
 * scaffold.js bu dosyayi degistirMEz — globals.css'i patch'ler.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
