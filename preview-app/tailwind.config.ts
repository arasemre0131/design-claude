import type { Config } from "tailwindcss";

/**
 * Tailwind v4 — content paths only. Tokens app/globals.css icinde @theme.
 * Preview-app tum preset'lerin fontlarini ve renklerini runtime'da compose eder,
 * bu yuzden JS config'de token gerekmez.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [
    // Palette familyleri (dinamik class generation icin)
    { pattern: /bg-\[var\(--.*\)\]/ },
    { pattern: /text-\[var\(--.*\)\]/ },
    { pattern: /border-\[var\(--.*\)\]/ },
  ],
  theme: { extend: {} },
  plugins: [],
};

export default config;
