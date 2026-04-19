// PresetRenderer.tsx — CORE orchestrator (server component).
//
// Preset YAML → atom components compose. Next.js App Router compatible.
// - preset.atoms.* okunur → atom-resolver.ts → React component
// - palette/typography atom → tailwind-tokens.ts → inline CSS vars
// - content prop'u her atom section'una props pass eder
//
// 'use client' yok — server component. Client gereken atom'lar kendileri
// 'use client' directive'i tasir (HeroInteractiveMap, HeroKineticSerif, vb).

import type { ReactNode, CSSProperties } from 'react';
import {
  loadPreset,
  loadPaletteAtom,
  loadTypographyAtom,
  resolvePaletteTokens,
  extractFontNames,
  type Preset,
} from '@/lib/preset-loader';
import {
  tokensAsStyle,
  buildGoogleFontsUrl,
} from '@/lib/tailwind-tokens';
import { tryResolveAtom, ATOM_REGISTRY } from '@/lib/atom-resolver';
import { cn } from '@/lib/utils';

// --- Types ---------------------------------------------------------------
/**
 * Her atom section'u icin spesifik props taşıyan content map.
 * Preset YAML bunu doldurmaz — runtime'da CMS / static data ile gelir.
 */
export interface PresetContent {
  header?: Record<string, unknown>;
  nav?: Record<string, unknown>;
  hero?: Record<string, unknown>;
  kpi?: Record<string, unknown>;
  pipeline?: Record<string, unknown>;
  table?: Record<string, unknown>;
  chart?: Record<string, unknown>;
  chat?: Record<string, unknown>;
  form?: Record<string, unknown>;
  modal?: Record<string, unknown>;
  footer?: Record<string, unknown>;
  [k: string]: Record<string, unknown> | undefined;
}

export type PresetRendererProps =
  | {
      /** Preset id (filename without .yaml). loadPreset() runtime'da cagirilir. */
      presetId: string;
      preset?: never;
      content?: PresetContent;
      className?: string;
      style?: CSSProperties;
      /** true ise gallery/metadata render; false → production compose. Default false. */
      debug?: boolean;
    }
  | {
      preset: Preset;
      presetId?: never;
      content?: PresetContent;
      className?: string;
      style?: CSSProperties;
      debug?: boolean;
    };

// --- Section order -------------------------------------------------------
/**
 * Render sirasi. data-dense tier hero olmadan baslar; composer
 * atom yoksa o section atlanir.
 */
export const SECTION_ORDER = [
  'hero',
  'kpi',
  'pipeline',
  'table',
  'chart',
  'chat',
  'form',
  'modal',
] as const;

// --- Component -----------------------------------------------------------
/**
 * PresetRenderer — preset'ten tam sayfa tree render eder.
 *
 * Iki mod:
 *   - debug: false (default) — compose mode, gercek atom component'leri
 *   - debug: true — gallery-style metadata (swatches + atom kartlari)
 */
export function PresetRenderer(props: PresetRendererProps): ReactNode {
  const { content = {}, className, style, debug = false } = props;

  // 1) Preset resolve
  let preset: Preset;
  try {
    preset = 'preset' in props && props.preset ? props.preset : loadPreset(props.presetId!);
  } catch (e) {
    return (
      <div className="p-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-red-600">Preset Bulunamadi</h1>
        <p className="mt-2 opacity-70">{String(e)}</p>
        <a href="/gallery" className="mt-4 inline-block underline">
          ← Gallery
        </a>
      </div>
    );
  }

  // 2) Palette / typography token yukle (safe)
  const paletteAtom = safeLoad(() => loadPaletteAtom(preset.atoms.palette));
  const typoAtom = safeLoad(() => loadTypographyAtom(preset.atoms.typography));
  const rootTokens: CSSProperties = paletteAtom
    ? tokensAsStyle(paletteAtom, typoAtom ?? undefined)
    : {};
  const googleFontsHref = typoAtom ? buildGoogleFontsUrl(typoAtom) : null;

  // 3) Atom components resolve (soft — eksik atom null)
  const HeaderComp = tryResolveAtom(preset.atoms.header);
  const NavComp = tryResolveAtom(preset.atoms.nav);
  const HeroComp = tryResolveAtom(preset.atoms.hero);
  const KpiComp = tryResolveAtom(preset.atoms.kpi);
  const PipelineComp = tryResolveAtom(firstOf(preset.atoms.pipeline));
  const TableComp = tryResolveAtom(preset.atoms.table);
  const ChartComp = tryResolveAtom(firstOf(preset.atoms.chart));
  const ChatComp = tryResolveAtom(preset.atoms.chat);
  const FormComp = tryResolveAtom(preset.atoms.form);
  const ModalComp = tryResolveAtom(preset.atoms.modal);
  const FooterComp = tryResolveAtom(preset.atoms.footer);

  const mergedStyle: CSSProperties = { ...rootTokens, ...style };

  // 4) Debug mode — gallery metadata render
  if (debug && paletteAtom && typoAtom) {
    return (
      <DebugGallery
        preset={preset}
        paletteAtom={paletteAtom}
        typoAtom={typoAtom}
        rootStyle={mergedStyle}
      />
    );
  }

  // 5) Compose mode — production render
  return (
    <div
      data-preset={preset.id}
      data-sector={preset.sector}
      data-style={preset.style}
      data-tier={preset.tier}
      className={cn(
        'preset-root min-h-screen w-full',
        'bg-[color:var(--color-bg)] text-[color:var(--color-ink)]',
        className
      )}
      style={mergedStyle}
    >
      {googleFontsHref ? <link rel="stylesheet" href={googleFontsHref} /> : null}

      {HeaderComp ? <HeaderComp {...(content.header ?? {})} /> : null}
      {NavComp && preset.atoms.nav !== preset.atoms.header ? (
        <NavComp {...(content.nav ?? {})} />
      ) : null}

      <main className="preset-body">
        {HeroComp ? <HeroComp {...(content.hero ?? {})} /> : null}
        {KpiComp ? <KpiComp {...(content.kpi ?? {})} /> : null}
        {PipelineComp ? <PipelineComp {...(content.pipeline ?? {})} /> : null}
        {TableComp ? <TableComp {...(content.table ?? {})} /> : null}
        {ChartComp ? <ChartComp {...(content.chart ?? {})} /> : null}
        {ChatComp ? <ChatComp {...(content.chat ?? {})} /> : null}
        {FormComp ? <FormComp {...(content.form ?? {})} /> : null}
        {ModalComp ? <ModalComp {...(content.modal ?? {})} /> : null}
      </main>

      {FooterComp ? <FooterComp {...(content.footer ?? {})} /> : null}
    </div>
  );
}

// --- Debug gallery (optional mode for gallery route) --------------------
function DebugGallery({
  preset,
  paletteAtom,
  typoAtom,
  rootStyle,
}: {
  preset: Preset;
  paletteAtom: ReturnType<typeof loadPaletteAtom>;
  typoAtom: ReturnType<typeof loadTypographyAtom>;
  rootStyle: CSSProperties;
}): ReactNode {
  const colors = resolvePaletteTokens(paletteAtom);
  const fonts = extractFontNames(typoAtom);

  return (
    <div data-preview-root style={rootStyle} className="min-h-screen">
      <aside
        className="fixed top-0 right-0 z-50 m-4 p-4 rounded-lg shadow-2xl text-xs font-mono max-w-[260px] bg-white/95 text-black border border-black/10"
        style={{ fontFamily: 'system-ui' }}
      >
        <div className="flex justify-between items-center mb-2 pb-2 border-b border-black/10">
          <strong>{preset.id}</strong>
          <a href="/gallery" className="underline">
            ← gallery
          </a>
        </div>
        <div className="space-y-1">
          <div>
            <span className="opacity-50">sector:</span> {preset.sector}
          </div>
          <div>
            <span className="opacity-50">style:</span> {preset.style}
          </div>
          <div>
            <span className="opacity-50">tier:</span> {preset.tier}
          </div>
          <div>
            <span className="opacity-50">palette:</span> {preset.atoms.palette}
          </div>
          <div>
            <span className="opacity-50">typo:</span> {preset.atoms.typography}
          </div>
        </div>
      </aside>

      <header
        className="pt-20 pb-12 text-center border-b"
        style={{ borderColor: colors.border }}
      >
        <div className="text-[10px] uppercase tracking-[0.35em] opacity-60 mb-4">
          design-claude preset preview
        </div>
        <h1
          className="text-6xl md:text-8xl font-normal tracking-tight px-4"
          style={{
            fontFamily: `"${fonts.display}", serif`,
            letterSpacing: '-0.02em',
          }}
        >
          {preset.id}
        </h1>
        <div
          className="mt-4 text-sm opacity-70"
          style={{ fontFamily: `"${fonts.body}", sans-serif` }}
        >
          {preset.sector} × {preset.style}
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-8 py-16">
        <h2 className="text-3xl mb-8" style={{ fontFamily: `"${fonts.display}", serif` }}>
          Palette — {preset.atoms.palette}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'bg', value: colors.bg },
            { label: 'ink', value: colors.ink },
            { label: 'accent', value: colors.accent },
            { label: 'secondary', value: colors.secondary },
          ].map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-3 p-3 rounded"
              style={{ borderColor: colors.border, borderWidth: 1 }}
            >
              <div
                className="w-12 h-12 rounded"
                style={{ background: c.value, border: `1px solid ${colors.border}` }}
              />
              <div
                className="text-xs"
                style={{ fontFamily: `"${fonts.mono}", monospace` }}
              >
                <div className="opacity-60">{c.label}</div>
                <div>{c.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="max-w-5xl mx-auto px-8 py-16 border-t"
        style={{ borderColor: colors.border }}
      >
        <h2
          className="text-3xl mb-8"
          style={{ fontFamily: `"${fonts.display}", serif` }}
        >
          Atoms (combo)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {expandAtomEntries(preset).map(({ category, id }) => {
            const meta = ATOM_REGISTRY[id];
            return (
              <div
                key={`${category}-${id}`}
                className="p-4 border rounded"
                style={{ borderColor: colors.border }}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.2em] opacity-50"
                  style={{ fontFamily: `"${fonts.mono}", monospace` }}
                >
                  {category}
                </div>
                <div
                  className="text-2xl mt-1"
                  style={{ fontFamily: `"${fonts.display}", serif` }}
                >
                  {id}
                </div>
                {meta ? (
                  <>
                    <div
                      className="text-xs opacity-70 mt-1"
                      style={{ fontFamily: `"${fonts.body}", sans-serif` }}
                    >
                      → {meta.componentName}
                    </div>
                    <div
                      className="text-xs opacity-60 mt-2"
                      style={{ fontFamily: `"${fonts.body}", sans-serif` }}
                    >
                      {meta.description}
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// --- Helpers -------------------------------------------------------------
function safeLoad<T>(fn: () => T): T | null {
  try {
    return fn();
  } catch {
    return null;
  }
}

function firstOf(v: string | string[] | undefined): string | undefined {
  if (!v) return undefined;
  return Array.isArray(v) ? v[0] : v;
}

function expandAtomEntries(preset: Preset): Array<{ category: string; id: string }> {
  const atoms = preset.atoms;
  const out: Array<{ category: string; id: string }> = [];
  const push = (category: string, v: string | string[] | undefined): void => {
    if (!v) return;
    if (Array.isArray(v)) v.forEach((id) => out.push({ category, id }));
    else out.push({ category, id: v });
  };
  push('palette', atoms.palette);
  push('typography', atoms.typography);
  push('header', atoms.header);
  push('nav', atoms.nav);
  push('hero', atoms.hero);
  push('kpi', atoms.kpi);
  push('layout', atoms.layout);
  push('motion', atoms.motion);
  push('pipeline', atoms.pipeline);
  push('table', atoms.table);
  push('chart', atoms.chart);
  push('chat', atoms.chat);
  push('form', atoms.form);
  push('modal', atoms.modal);
  push('footer', atoms.footer);
  push('3d', atoms['3d_optional']);
  return out;
}

// Default export mirror — consumer choice: default or named.
export default PresetRenderer;
