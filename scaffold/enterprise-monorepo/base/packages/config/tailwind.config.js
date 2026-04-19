/**
 * Shared Tailwind v4 config fragment.
 * NOT: Tailwind v4'te @theme directive CSS icinde.
 * Bu dosya eski v3 uyumluluk icin opsiyonel kullanilir.
 */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
};
