/**
 * Preset metadata — scaffold.js tarafindan doldurulur.
 * src/ altinda import edilebilir, client-safe.
 */

export const PRESET_ID = "__PRESET_ID__";
export const PRESET_NAME = "__PRESET_NAME__";
export const PRESET_RECIPE = "__PRESET_RECIPE__";
export const PRESET_TIER = "__PRESET_TIER__";
export const PRESET_SECTOR = "__PRESET_SECTOR__";
export const PRESET_STYLE = "__PRESET_STYLE__";

export const BUDGET_RANGE: readonly [number, number] = [__BUDGET_MIN__, __BUDGET_MAX__];
export const DELIVERY_WEEKS: readonly [number, number] = [__DELIVERY_MIN__, __DELIVERY_MAX__];

/**
 * Atoms — scaffold.js tarafindan preset YAML'dan doldurulur.
 */
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
