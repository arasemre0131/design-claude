import type { Config } from "tailwindcss";

/**
 * Tailwind v4 CSS-first konfigurasyonu — asil tokens `app/styles/app.css`
 * icinde `@theme` directive ile tanimli. Bu dosya sadece content path + dark mode
 * override icin kalmistir (backwards compat).
 */
const config: Config = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.css",
  ],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
