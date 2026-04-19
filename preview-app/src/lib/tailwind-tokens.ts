// tailwind-tokens.ts — Palette + typography atom'larindan CSS token uretici.
//
// Tailwind v4 CSS-first config kullandigimiz icin palette/typography atom'larindan
// dinamik @theme block uretiyoruz. Scaffold zamani: static .css dosyasi yaz.
// Runtime (preview-app): inline style object ile data-preview-root'a inject et.

import type { PaletteAtom, TypographyAtom } from './preset-loader';
import { resolvePaletteTokens, extractFontNames } from './preset-loader';
import type { CSSProperties } from 'react';

// --- Tailwind v4 @theme block uretici ------------------------------------
/**
 * Tailwind v4 @theme block — scaffold zamaninda global.css'e yapistirilir.
 * Next.js app/globals.css:
 *   @import 'tailwindcss';
 *   @theme { --color-bg: #F5F0E8; ... }
 */
export function generateThemeBlock(palette: PaletteAtom, typography?: TypographyAtom): string {
  const colors = resolvePaletteTokens(palette);
  const fonts = typography ? extractFontNames(typography) : null;
  const fontLines = fonts
    ? [
        `  --font-display: "${fonts.display}", serif;`,
        `  --font-body: "${fonts.body}", sans-serif;`,
        `  --font-mono: "${fonts.mono}", monospace;`,
      ].join('\n')
    : '';

  return `@theme {
  --color-bg: ${colors.bg};
  --color-ink: ${colors.ink};
  --color-fg: ${colors.ink};
  --color-accent: ${colors.accent};
  --color-accent-2: ${colors.secondary};
  --color-muted: ${colors.muted};
  --color-line: ${colors.border};
  --color-surface: ${colors.surface};${fontLines ? '\n' + fontLines : ''}
}`;
}

// --- Inline CSS vars (runtime preview) -----------------------------------
/**
 * Preset-ozgu inline CSS custom properties.
 * PresetRenderer data-preview-root icine inject eder.
 */
export function generateInlineTokens(
  paletteAtom: PaletteAtom,
  typoAtom?: TypographyAtom
): Record<string, string> {
  const colors = resolvePaletteTokens(paletteAtom);
  const base: Record<string, string> = {
    '--color-bg': colors.bg,
    '--color-ink': colors.ink,
    '--color-fg': colors.ink,
    '--color-accent': colors.accent,
    '--color-accent-2': colors.secondary,
    '--color-secondary': colors.secondary,
    '--color-muted': colors.muted,
    '--color-surface': colors.surface,
    '--color-line': colors.border,
    '--color-border': colors.border,
  };

  if (typoAtom) {
    const fonts = extractFontNames(typoAtom);
    base['--font-display'] = `"${fonts.display}", serif`;
    base['--font-body'] = `"${fonts.body}", sans-serif`;
    base['--font-mono'] = `"${fonts.mono}", monospace`;
  }
  return base;
}

/**
 * React style object — <div style={tokensAsStyle(...)}> ile kullan.
 * PresetRenderer bu helper'i cagirir.
 */
export function tokensAsStyle(
  paletteAtom: PaletteAtom,
  typoAtom?: TypographyAtom
): CSSProperties {
  const tokens = generateInlineTokens(paletteAtom, typoAtom);
  const colors = resolvePaletteTokens(paletteAtom);
  const fonts = typoAtom ? extractFontNames(typoAtom) : null;

  return {
    ...(tokens as CSSProperties),
    background: colors.bg,
    color: colors.ink,
    fontFamily: fonts ? `"${fonts.body}", sans-serif` : undefined,
  };
}

// --- Google Fonts URL helper --------------------------------------------
/**
 * Typography atom'undan Google Fonts URL uret.
 * Tum font'lar ayni URL'de — Next.js font loader yerine link rel=stylesheet.
 * Basit kullanim; ustun cozum icin next/font/google.
 */
export function buildGoogleFontsUrl(typoAtom: TypographyAtom): string | null {
  if (typoAtom.google_fonts) return String(typoAtom.google_fonts);
  const fonts = extractFontNames(typoAtom);
  const unique = Array.from(new Set([fonts.display, fonts.body, fonts.mono])).filter(
    (f) => f && f !== 'Inter' && f !== 'system-ui'
  );
  if (unique.length === 0) return null;
  const families = unique.map((f) => `family=${encodeURIComponent(f)}:wght@300;400;500;600;700`).join('&');
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

// --- Plain CSS string (non-theme) ----------------------------------------
/**
 * Inline <style> tag icine gomulebilir CSS var blogu.
 */
export function tokensToCssString(paletteAtom: PaletteAtom, typoAtom?: TypographyAtom): string {
  const tokens = generateInlineTokens(paletteAtom, typoAtom);
  return Object.entries(tokens)
    .map(([k, v]) => `${k}:${v}`)
    .join(';');
}
