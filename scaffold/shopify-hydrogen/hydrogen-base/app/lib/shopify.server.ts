/**
 * Shopify helpers (server-only).
 * Oxygen context'ten storefront/customerAccount/cart cekme + utility fonksiyonlari.
 */

import type { AppLoadContext } from "@shopify/remix-oxygen";
import type { Storefront } from "@shopify/hydrogen";

/**
 * getStorefront — Remix loader/action icindeki context'ten Storefront client cek.
 * Ornek:
 *   export async function loader({ context }) {
 *     const { storefront } = getStorefront(context);
 *     return storefront.query(PRODUCT_QUERY, { variables: { handle } });
 *   }
 */
export function getStorefront(context: AppLoadContext): { storefront: Storefront } {
  return { storefront: context.storefront };
}

export function getCart(context: AppLoadContext) {
  return context.cart;
}

export function getCustomerAccount(context: AppLoadContext) {
  return context.customerAccount;
}

/**
 * Turkce fiyat formati (Shopify <Money /> default EN-US — biz TR kullaniyoruz)
 * "1.299,00 TL" formatini TRY icin uret.
 */
export function formatTurkishPrice(amount: string | number, currencyCode = "TRY"): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  const formatted = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return formatted;
}

/**
 * Shopify Metafield parse — productuZn "custom.3d_model_url" metafield'ini cek.
 * Metafield value string ise direkt dondur, JSON array ise parse et.
 */
export function parseMetafield<T = string>(
  metafield: { value?: string | null } | null | undefined,
  fallback: T | null = null,
): T | null {
  if (!metafield?.value) return fallback;
  const value = metafield.value.trim();
  try {
    if (value.startsWith("{") || value.startsWith("[")) {
      return JSON.parse(value) as T;
    }
  } catch {
    // raw string
  }
  return value as unknown as T;
}

/**
 * Shopify image URL transform — resize + format + quality.
 * Shopify CDN native image transformation kullan.
 */
export function transformImageUrl(
  url: string,
  options: { width?: number; height?: number; crop?: "center" | "top" | "bottom"; format?: "webp" | "jpg" | "png" } = {},
): string {
  if (!url || !url.includes("cdn.shopify.com")) return url;
  const params = new URLSearchParams();
  if (options.width) params.set("width", String(options.width));
  if (options.height) params.set("height", String(options.height));
  if (options.crop) params.set("crop", options.crop);
  if (options.format) params.set("format", options.format);
  const query = params.toString();
  return query ? `${url.split("?")[0]}?${query}` : url;
}
