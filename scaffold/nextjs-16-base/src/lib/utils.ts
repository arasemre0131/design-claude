import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind class merge helper — clsx + tailwind-merge
 * cn("px-4 py-2", condition && "bg-red-500") → merged + conflict resolved
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Turkce sayi formati (TRY)
 */
export function formatCurrency(amount: number, currency = "TRY"): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Turkce tarih formati
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/**
 * Slug uretici — Turkce karakter destekli
 */
export function slugify(text: string): string {
  const map: Record<string, string> = {
    "ı": "i", "İ": "i", "ğ": "g", "Ğ": "g",
    "ş": "s", "Ş": "s", "ç": "c", "Ç": "c",
    "ö": "o", "Ö": "o", "ü": "u", "Ü": "u",
  };
  return text
    .split("")
    .map((c) => map[c] ?? c)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
