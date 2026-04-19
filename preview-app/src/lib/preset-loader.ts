// preset-loader.ts — server-side YAML reader.
// preview-app parent'i design-claude/, icinde catalog/ klasoru var.
// SERVER-ONLY — node:fs kullanir. 'use client' dosyadan import edilemez.

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

// --- CATALOG ROOT RESOLUTION ---------------------------------------------
/**
 * Root of the design-claude catalog directory.
 * Dev server: cwd = preview-app/ → ../catalog
 * Production build: cwd = design-claude/ → ./catalog
 * Override: DESIGN_CLAUDE_CATALOG env var
 */
function resolveCatalogRoot(): string {
  const candidates = [
    process.env.DESIGN_CLAUDE_CATALOG,
    path.resolve(process.cwd(), '..', 'catalog'),
    path.resolve(process.cwd(), 'catalog'),
  ].filter((p): p is string => Boolean(p));

  for (const candidate of candidates) {
    try {
      if (fs.statSync(candidate).isDirectory()) return candidate;
    } catch {
      /* try next */
    }
  }
  // Fallback to best-effort relative path (error surfaces on first load call)
  return path.join(process.cwd(), '..', 'catalog');
}

const CATALOG_ROOT = resolveCatalogRoot();

export function getCatalogRoot(): string {
  return CATALOG_ROOT;
}

// --- TYPES --------------------------------------------------------------
export type Tier = 'ultra-budget' | 'budget' | 'mid' | 'premium' | 'enterprise';

export type PresetAtoms = {
  palette: string;
  typography: string;
  header?: string;
  nav?: string;
  hero?: string;
  kpi?: string;
  footer?: string;
  table?: string;
  form?: string;
  modal?: string;
  chat?: string;
  chart?: string | string[];
  pipeline?: string | string[];
  layout?: string | string[];
  motion?: string | string[];
  motion_ajans?: string[];
  '3d'?: string[];
  '3d_optional'?: string[];
};

export type Preset = {
  id: string;
  sector: string;
  style: string;
  recipe: string;
  tier: Tier | string;
  matrix_cell?: string;
  budget_range_try?: [number, number];
  delivery_weeks?: [number, number];
  mood?: string[];
  atoms: PresetAtoms;
  components?: {
    core?: string[];
    optional?: string[];
  };
  anti_cliche?: {
    forbidden_palettes?: string[];
    forbidden_typography?: string[];
    forbidden_heroes?: string[];
    forbidden_headers?: string[];
    forbidden_kpi?: string[];
    forbidden_tables?: string[];
    forbidden_layouts?: string[];
    forbidden_motion?: string[];
    forbidden_pipelines?: string[];
    repeat_score_vs_existing?: number;
    warning?: string;
  };
  scaffold_hints?: Record<string, unknown>;
  compatibility?: Record<string, unknown>;
  preview_app_route?: string;
  scaffold_command?: string;
};

export type PaletteAtom = {
  id: string;
  name?: string;
  category: string;
  description?: string;
  bg?: string;
  accent?: string;
  ikincil?: string;
  ink?: string;
  values?: Record<string, string>;
  wcag_pairs?: string[];
  preview_snippet?: string;
};

export type TypographyAtom = {
  id: string;
  name?: string;
  category: string;
  description?: string;
  display_font?: string;
  body_font?: string;
  mono_font?: string;
  google_fonts?: string;
  preview_snippet?: string;
};

export type GenericAtom = {
  id: string;
  name?: string;
  category: string;
  description?: string;
  usage_sectors?: string[];
  forbidden_sectors?: string[];
  forbidden_with?: string[];
  requires?: Record<string, unknown>;
  preview_snippet?: string;
  [k: string]: unknown;
};

// --- YAML + FRONT-MATTER LOADER ------------------------------------------
function parseYamlFrontMatter<T>(raw: string): T {
  const text = raw.replace(/^\uFEFF/, '');
  const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (fmMatch) {
    const header = (yaml.load(fmMatch[1]) as Record<string, unknown>) ?? {};
    const body = (yaml.load(fmMatch[2]) as Record<string, unknown>) ?? {};
    return { ...header, ...body } as T;
  }
  return (yaml.load(text) as T) ?? ({} as T);
}

function readYaml<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, 'utf8');
  return parseYamlFrontMatter<T>(raw);
}

// --- PRESET LOADERS ------------------------------------------------------
export function loadPreset(id: string): Preset {
  const file = path.join(CATALOG_ROOT, 'presets', `${id}.yaml`);
  if (!fs.existsSync(file)) {
    throw new Error(`Preset bulunamadi: ${id} (${file})`);
  }
  return readYaml<Preset>(file);
}

export function listPresets(): string[] {
  const dir = path.join(CATALOG_ROOT, 'presets');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.yaml') && !f.startsWith('_'))
    .map((f) => f.replace(/\.yaml$/, ''))
    .sort();
}

export function loadAllPresets(): Preset[] {
  return listPresets()
    .map((id) => {
      try {
        return loadPreset(id);
      } catch (e) {
        console.warn(`Preset atlandi: ${id}`, e);
        return null;
      }
    })
    .filter((p): p is Preset => p !== null);
}

// --- ATOM LOADERS --------------------------------------------------------
export function loadPaletteAtom(id: string): PaletteAtom {
  const file = path.join(CATALOG_ROOT, 'atoms', 'palette', `${id}.yaml`);
  if (!fs.existsSync(file)) throw new Error(`Palette atom bulunamadi: ${id}`);
  return readYaml<PaletteAtom>(file);
}

export function loadTypographyAtom(id: string): TypographyAtom {
  const file = path.join(CATALOG_ROOT, 'atoms', 'typography', `${id}.yaml`);
  if (!fs.existsSync(file)) throw new Error(`Typography atom bulunamadi: ${id}`);
  return readYaml<TypographyAtom>(file);
}

export function loadAtom<T = GenericAtom>(category: string, id: string): T {
  const file = path.join(CATALOG_ROOT, 'atoms', category, `${id}.yaml`);
  if (!fs.existsSync(file)) {
    throw new Error(`Atom bulunamadi: ${category}/${id}`);
  }
  return readYaml<T>(file);
}

/**
 * Load every atom referenced by a preset, keyed by atom id.
 * Silently skips missing atoms (renderer surfaces the real error).
 */
export function loadPresetAtoms(preset: Preset): Record<string, GenericAtom> {
  const atoms: Record<string, GenericAtom> = {};
  const push = (category: string, id?: string): void => {
    if (!id) return;
    try {
      atoms[id] = loadAtom<GenericAtom>(category, id);
    } catch {
      /* missing atom — skip */
    }
  };
  const pushMany = (category: string, ids?: string[] | string): void => {
    if (!ids) return;
    if (Array.isArray(ids)) ids.forEach((i) => push(category, i));
    else push(category, ids);
  };

  push('palette', preset.atoms.palette);
  push('typography', preset.atoms.typography);
  push('hero', preset.atoms.hero);
  pushMany('layout', preset.atoms.layout);
  pushMany('motion', preset.atoms.motion);
  push('header', preset.atoms.header);
  push('nav', preset.atoms.nav);
  push('kpi', preset.atoms.kpi);
  pushMany('pipeline', preset.atoms.pipeline);
  push('table', preset.atoms.table);
  push('chat', preset.atoms.chat);
  push('form', preset.atoms.form);
  push('modal', preset.atoms.modal);
  push('footer', preset.atoms.footer);
  pushMany('chart', preset.atoms.chart);
  pushMany('motion-ajans', preset.atoms.motion_ajans);
  pushMany('3d', preset.atoms['3d']);
  pushMany('3d', preset.atoms['3d_optional']);

  return atoms;
}

// --- DERIVED METADATA ----------------------------------------------------
export function extractHex(colorString?: string): string {
  if (!colorString) return '#FFFFFF';
  const match = String(colorString).match(/#[0-9A-Fa-f]{3,8}/);
  return match ? match[0] : '#FFFFFF';
}

export type PaletteTokens = {
  bg: string;
  ink: string;
  accent: string;
  secondary: string;
  muted: string;
  surface: string;
  border: string;
};

export function resolvePaletteTokens(atom: PaletteAtom): PaletteTokens {
  // Prefer explicit `values` block when present (newer palette YAML)
  const v = atom.values ?? {};
  const bg = extractHex(v.bg ?? atom.bg);
  const ink = extractHex(v.ink ?? atom.ink);
  const accent = extractHex(v.accent ?? atom.accent);
  const secondary = extractHex(v['accent-2'] ?? v.accent2 ?? atom.ikincil);
  const muted = extractHex(v.muted) !== '#FFFFFF' ? extractHex(v.muted) : ink + '88';
  const line = extractHex(v.line) !== '#FFFFFF' ? extractHex(v.line) : ink + '22';
  const surface = extractHex(v.surface) !== '#FFFFFF' ? extractHex(v.surface) : bg;

  return {
    bg,
    ink,
    accent,
    secondary,
    muted,
    surface,
    border: line,
  };
}

export function extractFontNames(atom: TypographyAtom): {
  display: string;
  body: string;
  mono: string;
} {
  const clean = (raw?: string): string => {
    if (!raw) return 'Inter';
    return String(raw)
      .replace(/\s*\(.*\)\s*$/, '')
      .trim();
  };
  return {
    display: clean(atom.display_font),
    body: clean(atom.body_font),
    mono: clean(atom.mono_font),
  };
}
