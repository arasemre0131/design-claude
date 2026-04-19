/**
 * Preset metadata — scaffold-shopify.js tarafindan doldurulur.
 * Client + server ortak kullanim, hic env bagimliligi yok.
 */

export const PRESET_ID = "__PRESET_ID__";
export const PRESET_NAME = "__PRESET_NAME__";
export const PRESET_RECIPE = "__PRESET_RECIPE__";
export const PRESET_TIER = "__PRESET_TIER__";
export const PRESET_SECTOR = "__PRESET_SECTOR__";
export const PRESET_STYLE = "__PRESET_STYLE__";

export const BUDGET_RANGE: readonly [number, number] = [__BUDGET_MIN__, __BUDGET_MAX__];
export const DELIVERY_WEEKS: readonly [number, number] = [__DELIVERY_MIN__, __DELIVERY_MAX__];

export const ATOMS = {
  palette: "__ATOM_PALETTE__",
  typography: "__ATOM_TYPOGRAPHY__",
  header: "__ATOM_HEADER__",
  nav: "__ATOM_NAV__",
  hero: "__ATOM_HERO__",
  kpi: "__ATOM_KPI__",
  footer: "__ATOM_FOOTER__",
} as const;

export const MOBILE_BREAKPOINTS = [375, 768, 1280] as const;

export const WCAG_CONTRAST_TARGET = "__WCAG_TARGET__";
export const LIGHTHOUSE_TARGET = __LIGHTHOUSE_TARGET__;

export const PRIMARY_CTA = "__PRIMARY_CTA__";
export const SECONDARY_CTA = "__SECONDARY_CTA__";

/* Shopify-spesifik sabitler */
export const SHOPIFY_API_VERSION = "2024-10";
export const I18N_COUNTRY = "TR" as const;
export const I18N_LANGUAGE = "TR" as const;
export const CURRENCY_CODE = "TRY" as const;

/* Metafield namespaces — Shopify admin'de tanimlanmali */
export const METAFIELD_NAMESPACES = {
  threeDModel: { namespace: "custom", key: "3d_model_url" },
  arUsdz: { namespace: "custom", key: "ar_usdz_url" },
  certificate: { namespace: "custom", key: "certificate_pdf" },
  specSheet: { namespace: "custom", key: "spec_sheet" },
  metalPurity: { namespace: "custom", key: "metal_purity" },
  stoneCarat: { namespace: "custom", key: "stone_carat" },
} as const;
