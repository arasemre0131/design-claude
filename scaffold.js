#!/usr/bin/env node
/**
 * design-claude scaffold.js — CLI orchestrator
 * ----------------------------------------------------------------
 * Kullanim:
 *   node scaffold.js <preset-id> --out <output-path> [--recipe <override>]
 *
 * Ornek:
 *   node scaffold.js mucevher-editorial-luxury --out ./fatih-bey-v2/
 *
 * Akis:
 *   1. catalog/presets/{preset-id}.yaml oku
 *   2. catalog/recipes/{recipe}.yaml oku
 *   3. catalog/atoms/palette/{palette-id}.yaml + typography/{typo-id}.yaml oku
 *   4. scaffold/nextjs-16-base/ dizinini {output-path}/'a kopyala
 *   5. Patch dosyalari (package.json, globals.css, layout.tsx, constants.ts, CLAUDE.md, README.md)
 *   6. combo.md olustur
 */

"use strict";

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

/* ================================================================ */
/*  Console helpers                                                  */
/* ================================================================ */

const COLORS = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

const log = {
  info: (msg) => console.log(`${COLORS.cyan}[i]${COLORS.reset} ${msg}`),
  ok: (msg) => console.log(`${COLORS.green}[+]${COLORS.reset} ${msg}`),
  warn: (msg) => console.log(`${COLORS.yellow}[!]${COLORS.reset} ${msg}`),
  err: (msg) => console.error(`${COLORS.red}[x]${COLORS.reset} ${msg}`),
  step: (n, msg) => console.log(`${COLORS.bold}${COLORS.blue}[${n}]${COLORS.reset} ${msg}`),
  header: (msg) => console.log(`\n${COLORS.bold}${COLORS.magenta}== ${msg} ==${COLORS.reset}`),
};

/* ================================================================ */
/*  Argument parsing                                                 */
/* ================================================================ */

function parseArgs(argv) {
  const args = { preset: null, out: null, recipe: null, help: false, force: false, skipWarnings: false };
  const rest = argv.slice(2);

  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (arg === "-h" || arg === "--help") {
      args.help = true;
    } else if (arg === "--out" || arg === "-o") {
      args.out = rest[++i];
    } else if (arg === "--recipe" || arg === "-r") {
      args.recipe = rest[++i];
    } else if (arg === "--force" || arg === "-f") {
      args.force = true;
    } else if (arg === "--skip-warnings") {
      args.skipWarnings = true;
    } else if (!arg.startsWith("-") && !args.preset) {
      args.preset = arg;
    }
  }

  return args;
}

function printHelp() {
  console.log(`
${COLORS.bold}design-claude scaffold.js${COLORS.reset}

Usage:
  node scaffold.js <preset-id> --out <path> [options]

Examples:
  node scaffold.js mucevher-editorial-luxury --out ./fatih-bey-v2/
  node scaffold.js eticaret-brutalist --out /tmp/test-scaffold/

Options:
  <preset-id>           Preset ID (catalog/presets/<id>.yaml)
  --out, -o <path>      Cikti dizini (zorunlu)
  --recipe, -r <id>     Recipe override (preset'teki default yerine)
  --force, -f           Hedef dizin doluysa silip yeniden yaz
  --skip-warnings       Yasakli ID uyarilarini atla (dikkat!)
  -h, --help            Bu yardim

Available presets (sample):
  mucevher-editorial-luxury | eticaret-brutalist | insaat-minimal-swiss
  klinik-warm-organic       | otel-immersive-3d  | ...

Dokuman:
  C:/Users/EAS/Desktop/armut/research/design-claude/catalog/
`);
}

/* ================================================================ */
/*  Path resolution                                                  */
/* ================================================================ */

const ROOT = __dirname;
const CATALOG = path.join(ROOT, "catalog");
const BASE_TEMPLATE = path.join(ROOT, "scaffold", "nextjs-16-base");

function presetPath(id) {
  return path.join(CATALOG, "presets", `${id}.yaml`);
}

function recipePath(id) {
  return path.join(CATALOG, "recipes", `${id}.yaml`);
}

function atomPath(category, id) {
  return path.join(CATALOG, "atoms", category, `${id}.yaml`);
}

/* ================================================================ */
/*  YAML loader (js-yaml + front-matter)                             */
/* ================================================================ */

function readYaml(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`YAML bulunamadi: ${filePath}`);
  }
  const raw = fs.readFileSync(filePath, "utf8");
  return parseYamlFrontMatter(raw);
}

/**
 * Atom + preset YAML'lar "---\n..." front-matter bloklu.
 * 1. Front-matter YAML (header)
 * 2. Body YAML (front-matter'dan sonra, yine YAML formatinda)
 *
 * Bu loader her iki block'i merge eder — tek obje dondurur.
 */
function parseYamlFrontMatter(raw) {
  const text = raw.replace(/^\uFEFF/, ""); // BOM temizle
  const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (fmMatch) {
    const header = yaml.load(fmMatch[1]) || {};
    const body = yaml.load(stripComments(fmMatch[2])) || {};
    return { ...header, ...body };
  }

  // No front-matter — direct yaml
  return yaml.load(stripComments(text)) || {};
}

function stripComments(text) {
  // js-yaml zaten # yorumlari destekliyor, ama bazi dosyalarda sadece # Baslik var
  return text;
}

/* ================================================================ */
/*  FS helpers (fs-extra replacement — zero deps)                    */
/* ================================================================ */

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function rmRecursive(target) {
  if (!fs.existsSync(target)) return;
  fs.rmSync(target, { recursive: true, force: true });
}

function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function readFile(p) {
  return fs.readFileSync(p, "utf8");
}

function writeFile(p, content) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, content, "utf8");
}

/* ================================================================ */
/*  Font provider — Google Fonts URL builder                         */
/* ================================================================ */

/**
 * Atom typography YAML icinde "google_fonts" key'i URL query olarak string
 * (orn: "Fraunces:ital,opsz,wght@0,9..144,300..900&family=IBM+Plex+Sans:wght@300..700").
 *
 * Bu fonksiyon onu tam URL'ye cevirir.
 */
function buildGoogleFontsURL(googleFontsQuery) {
  if (!googleFontsQuery) return null;
  const baseUrl = "https://fonts.googleapis.com/css2";
  const clean = googleFontsQuery.trim().replace(/^family=/, "");
  return `${baseUrl}?family=${clean}&display=swap`;
}

/**
 * Typography atom → { display, body, mono, googleUrl } objesi dondurur.
 * display_font / body_font / mono_font alanlarinda "Font Name (variable ...)" yaziyor,
 * ilk parantezden oncesini isim olarak al.
 */
function extractFontNames(typoAtom) {
  const clean = (raw) => {
    if (!raw) return null;
    return String(raw).replace(/\s*\(.*\)\s*$/, "").trim();
  };
  return {
    displayFont: clean(typoAtom.display_font) || "Inter",
    bodyFont: clean(typoAtom.body_font) || "Inter",
    monoFont: clean(typoAtom.mono_font) || "JetBrains Mono",
    googleUrl: buildGoogleFontsURL(typoAtom.google_fonts),
  };
}

/* ================================================================ */
/*  Palette parser                                                   */
/* ================================================================ */

/**
 * Atom palette YAML'da renk tanimi 2 formatta olabilir:
 *   bg: "#F5F0E8 pearl"          → "#F5F0E8"
 *   accent: "#2A1F14 tobacco"    → "#2A1F14"
 * Bu fonksiyon hex degerini ayirir.
 */
function extractHex(colorString) {
  if (!colorString) return null;
  const match = String(colorString).match(/#[0-9A-Fa-f]{3,8}/);
  return match ? match[0] : String(colorString).trim();
}

function resolvePalette(paletteAtom) {
  const bg = extractHex(paletteAtom.bg) || "#FFFFFF";
  const ink = extractHex(paletteAtom.ink) || "#0A0A0A";
  const accent = extractHex(paletteAtom.accent) || "#6366F1";

  // ikincil "clay + tan" tarzi compound — ilk hex'i al
  const secondary = extractHex(paletteAtom.ikincil) || accent;

  // Derived tokens
  const muted = ink + "88"; // 53% opacity approx
  const surface = bg;
  const border = ink + "22"; // subtle border

  return { bg, ink, accent, secondary, muted, surface, border };
}

/* ================================================================ */
/*  Main flow                                                        */
/* ================================================================ */

async function main() {
  const args = parseArgs(process.argv);

  if (args.help || !args.preset) {
    printHelp();
    process.exit(args.help ? 0 : 1);
  }

  if (!args.out) {
    log.err("--out <path> parametresi zorunlu");
    printHelp();
    process.exit(1);
  }

  log.header(`scaffold.js → ${args.preset}`);

  // ============================================================
  // STEP 1: Preset YAML
  // ============================================================
  log.step(1, `Preset yukleniyor: ${args.preset}`);
  const presetFile = presetPath(args.preset);
  if (!fs.existsSync(presetFile)) {
    log.err(`Preset bulunamadi: ${presetFile}`);
    log.info("Mevcut preset'ler icin: ls catalog/presets/");
    process.exit(1);
  }

  let preset;
  try {
    preset = readYaml(presetFile);
  } catch (e) {
    log.err(`Preset parse hatasi: ${e.message}`);
    process.exit(1);
  }
  log.ok(`${preset.id} (${preset.sector} × ${preset.style})`);

  // ============================================================
  // STEP 2: Recipe YAML
  // ============================================================
  const recipeId = args.recipe || preset.recipe || "next-premium";
  log.step(2, `Recipe: ${recipeId}`);

  let recipe;
  const recipeFile = recipePath(recipeId);
  if (!fs.existsSync(recipeFile)) {
    log.warn(`Recipe bulunamadi: ${recipeFile}. Fallback: next-premium`);
    recipe = readYaml(recipePath("next-premium"));
  } else {
    recipe = readYaml(recipeFile);
  }
  log.ok(`${recipe.name || recipe.id} (Tier ${recipe.tier || "?"})`);

  // ============================================================
  // STEP 3: Atoms (palette + typography)
  // ============================================================
  log.step(3, "Atoms yukleniyor (palette + typography)");

  const atomsConfig = preset.atoms || {};
  const paletteId = atomsConfig.palette;
  const typoId = atomsConfig.typography;

  if (!paletteId) {
    log.err("preset.atoms.palette tanimli degil");
    process.exit(1);
  }
  if (!typoId) {
    log.err("preset.atoms.typography tanimli degil");
    process.exit(1);
  }

  let paletteAtom, typoAtom;
  try {
    paletteAtom = readYaml(atomPath("palette", paletteId));
    typoAtom = readYaml(atomPath("typography", typoId));
  } catch (e) {
    log.err(`Atom yukleme hatasi: ${e.message}`);
    process.exit(1);
  }

  const palette = resolvePalette(paletteAtom);
  const fonts = extractFontNames(typoAtom);

  log.ok(`palette: ${paletteId} (${paletteAtom.name || "?"})`);
  log.ok(`   bg: ${palette.bg} | ink: ${palette.ink} | accent: ${palette.accent}`);
  log.ok(`typography: ${typoId} (${typoAtom.name || "?"})`);
  log.ok(`   display: ${fonts.displayFont} | body: ${fonts.bodyFont} | mono: ${fonts.monoFont}`);

  // ============================================================
  // STEP 4: Forbidden ID check
  // ============================================================
  log.step(4, "Anti-cliche kontrolu");

  const antiCliche = preset.anti_cliche || {};
  const forbiddenList = []
    .concat(antiCliche.forbidden_palettes || [])
    .concat(antiCliche.forbidden_typography || [])
    .concat(antiCliche.forbidden_heroes || [])
    .concat(antiCliche.forbidden_headers || [])
    .concat(antiCliche.forbidden_kpi || [])
    .concat(antiCliche.forbidden_tables || [])
    .concat(antiCliche.forbidden_layouts || [])
    .concat(antiCliche.forbidden_motion || [])
    .concat(antiCliche.forbidden_pipelines || []);

  const usedAtoms = Object.values(atomsConfig).flatMap((v) =>
    Array.isArray(v) ? v : [v]
  );

  const violations = usedAtoms.filter((a) => forbiddenList.includes(a));
  if (violations.length > 0) {
    log.err(`YASAKLI ID KULLANIMI: ${violations.join(", ")}`);
    if (!args.skipWarnings) {
      log.err("Devam etmek icin --skip-warnings kullan (onerilmez)");
      process.exit(1);
    } else {
      log.warn("--skip-warnings aktif, devam ediliyor");
    }
  } else {
    log.ok(`Temiz (yasakli liste: ${forbiddenList.length} ID)`);
  }

  // ============================================================
  // STEP 5: Copy base template
  // ============================================================
  log.step(5, `Base template kopyalaniyor → ${args.out}`);

  const outDir = path.resolve(args.out);
  if (fs.existsSync(outDir)) {
    const entries = fs.readdirSync(outDir);
    if (entries.length > 0) {
      if (!args.force) {
        log.err(`Hedef dizin dolu: ${outDir}. --force kullan veya temizle`);
        process.exit(1);
      }
      log.warn("--force aktif, dizin siliniyor");
      rmRecursive(outDir);
    }
  }

  if (!fs.existsSync(BASE_TEMPLATE)) {
    log.err(`Base template bulunamadi: ${BASE_TEMPLATE}`);
    process.exit(1);
  }

  copyDir(BASE_TEMPLATE, outDir);
  log.ok(`Kopyalandi (${outDir})`);

  // ============================================================
  // STEP 6: Patch files
  // ============================================================
  log.step(6, "Dosyalar patch'leniyor");

  patchPackageJson(outDir, preset);
  patchGlobalsCss(outDir, preset, paletteId, typoId, palette, fonts);
  patchLayoutTsx(outDir, preset, fonts);
  patchConstantsTs(outDir, preset, atomsConfig);
  patchClaudeMd(outDir, preset, atomsConfig, antiCliche);
  patchReadmeMd(outDir, preset);

  log.ok("Patch islemleri tamamlandi");

  // ============================================================
  // STEP 7: combo.md
  // ============================================================
  log.step(7, "combo.md olusturuluyor");
  writeComboMd(outDir, preset, atomsConfig, antiCliche, palette, fonts, paletteAtom, typoAtom);
  log.ok("combo.md yazildi");

  // ============================================================
  // Done
  // ============================================================
  log.header("BASARILI");
  console.log(`
${COLORS.green}${COLORS.bold}Proje hazir:${COLORS.reset} ${outDir}

${COLORS.bold}Calistirmak icin:${COLORS.reset}
  ${COLORS.cyan}cd ${args.out}${COLORS.reset}
  ${COLORS.cyan}pnpm install${COLORS.reset}
  ${COLORS.cyan}pnpm dev${COLORS.reset}

${COLORS.bold}Sonraki adim:${COLORS.reset}
  1. combo.md dosyasini oku (atom listesi + yasakli ID'ler)
  2. src/components/ altina atom componentlerini yaz
  3. app/page.tsx placeholder'ini degistir
`);
}

/* ================================================================ */
/*  Patch functions                                                  */
/* ================================================================ */

function patchPackageJson(outDir, preset) {
  const file = path.join(outDir, "package.json");
  const pkg = JSON.parse(readFile(file));
  pkg.name = preset.id;
  pkg.description = `${preset.sector} × ${preset.style} (design-claude preset)`;
  pkg.version = "0.1.0";
  writeFile(file, JSON.stringify(pkg, null, 2) + "\n");
}

function patchGlobalsCss(outDir, preset, paletteId, typoId, palette, fonts) {
  const file = path.join(outDir, "app", "globals.css");
  let css = readFile(file);

  css = css
    .replace(/__PALETTE_ID__/g, paletteId)
    .replace(/__TYPOGRAPHY_ID__/g, typoId)
    .replace(/__COLOR_BG__/g, palette.bg)
    .replace(/__COLOR_INK__/g, palette.ink)
    .replace(/__COLOR_ACCENT__/g, palette.accent)
    .replace(/__COLOR_MUTED__/g, palette.muted)
    .replace(/__COLOR_SURFACE__/g, palette.surface)
    .replace(/__COLOR_BORDER__/g, palette.border)
    .replace(/__FONT_DISPLAY__/g, `"${fonts.displayFont}", serif`)
    .replace(/__FONT_BODY__/g, `"${fonts.bodyFont}", sans-serif`)
    .replace(/__FONT_MONO__/g, `"${fonts.monoFont}", monospace`);

  writeFile(file, css);
}

function patchLayoutTsx(outDir, preset, fonts) {
  const file = path.join(outDir, "app", "layout.tsx");
  let tsx = readFile(file);

  const presetTitle = `${preset.sector} × ${preset.style}`;
  const presetDesc = `${preset.tier || "mid"} tier | ${preset.delivery_weeks ? preset.delivery_weeks.join("-") + " hafta" : "3 hafta"}`;

  const fontLinkTag = fonts.googleUrl
    ? `<link rel="stylesheet" href="${fonts.googleUrl}" />`
    : `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap" />`;

  tsx = tsx
    .replace(/__PRESET_TITLE__/g, presetTitle)
    .replace(/__PRESET_DESCRIPTION__/g, presetDesc)
    .replace(/__FONT_GOOGLE_URL__/g, fonts.googleUrl || "(none)")
    .replace(/\{\/\* __FONT_LINK_TAG__ \*\/\}/g, fontLinkTag);

  writeFile(file, tsx);
}

function patchConstantsTs(outDir, preset, atoms) {
  const file = path.join(outDir, "src", "lib", "constants.ts");
  let ts = readFile(file);

  const budget = preset.budget_range_try || [15000, 25000];
  const delivery = preset.delivery_weeks || [2, 3];
  const firstAtom = (val) => (Array.isArray(val) ? val[0] : val) || "";

  ts = ts
    .replace(/__PRESET_ID__/g, preset.id || "unknown")
    .replace(/__PRESET_NAME__/g, preset.name || preset.id || "unknown")
    .replace(/__PRESET_RECIPE__/g, preset.recipe || "next-premium")
    .replace(/__PRESET_TIER__/g, preset.tier || "mid")
    .replace(/__PRESET_SECTOR__/g, preset.sector || "unknown")
    .replace(/__PRESET_STYLE__/g, preset.style || "unknown")
    .replace(/__BUDGET_MIN__/g, String(budget[0]))
    .replace(/__BUDGET_MAX__/g, String(budget[1]))
    .replace(/__DELIVERY_MIN__/g, String(delivery[0]))
    .replace(/__DELIVERY_MAX__/g, String(delivery[1]))
    .replace(/__ATOM_PALETTE__/g, firstAtom(atoms.palette))
    .replace(/__ATOM_TYPOGRAPHY__/g, firstAtom(atoms.typography))
    .replace(/__ATOM_HEADER__/g, firstAtom(atoms.header))
    .replace(/__ATOM_NAV__/g, firstAtom(atoms.nav))
    .replace(/__ATOM_HERO__/g, firstAtom(atoms.hero))
    .replace(/__ATOM_KPI__/g, firstAtom(atoms.kpi))
    .replace(/__ATOM_FOOTER__/g, firstAtom(atoms.footer))
    .replace(/__WCAG_TARGET__/g, (preset.scaffold_hints && preset.scaffold_hints.wcag_contrast_target) || "AA (4.5:1)")
    .replace(/__LIGHTHOUSE_TARGET__/g, String((preset.scaffold_hints && preset.scaffold_hints.lighthouse_target) || 90))
    .replace(/__PRIMARY_CTA__/g, (preset.scaffold_hints && preset.scaffold_hints.primary_cta) || "Iletisime Gec")
    .replace(/__SECONDARY_CTA__/g, (preset.scaffold_hints && preset.scaffold_hints.secondary_cta) || "Daha Fazla Bilgi");

  writeFile(file, ts);
}

function patchClaudeMd(outDir, preset, atoms, antiCliche) {
  const file = path.join(outDir, "CLAUDE.md");
  let md = readFile(file);

  const budget = preset.budget_range_try || [15000, 25000];
  const delivery = preset.delivery_weeks || [2, 3];
  const firstAtom = (val) => (Array.isArray(val) ? val[0] : val) || "";

  const allForbidden = []
    .concat(antiCliche.forbidden_palettes || [])
    .concat(antiCliche.forbidden_typography || [])
    .concat(antiCliche.forbidden_heroes || [])
    .concat(antiCliche.forbidden_headers || [])
    .concat(antiCliche.forbidden_kpi || [])
    .concat(antiCliche.forbidden_tables || [])
    .concat(antiCliche.forbidden_layouts || [])
    .concat(antiCliche.forbidden_motion || [])
    .concat(antiCliche.forbidden_pipelines || []);
  const forbiddenListMd = allForbidden.length > 0
    ? allForbidden.map((id) => `- \`${id}\``).join("\n")
    : "- (yok)";

  md = md
    .replace(/__PRESET_ID__/g, preset.id || "unknown")
    .replace(/__PRESET_SECTOR__/g, preset.sector || "unknown")
    .replace(/__PRESET_STYLE__/g, preset.style || "unknown")
    .replace(/__PRESET_RECIPE__/g, preset.recipe || "next-premium")
    .replace(/__PRESET_TIER__/g, preset.tier || "mid")
    .replace(/__BUDGET_MIN__/g, String(budget[0]))
    .replace(/__BUDGET_MAX__/g, String(budget[1]))
    .replace(/__DELIVERY_MIN__/g, String(delivery[0]))
    .replace(/__DELIVERY_MAX__/g, String(delivery[1]))
    .replace(/__ATOM_PALETTE__/g, firstAtom(atoms.palette))
    .replace(/__ATOM_TYPOGRAPHY__/g, firstAtom(atoms.typography))
    .replace(/__ATOM_HEADER__/g, firstAtom(atoms.header))
    .replace(/__ATOM_NAV__/g, firstAtom(atoms.nav))
    .replace(/__ATOM_HERO__/g, firstAtom(atoms.hero))
    .replace(/__ATOM_KPI__/g, firstAtom(atoms.kpi))
    .replace(/__ATOM_FOOTER__/g, firstAtom(atoms.footer))
    .replace(/__ANTI_CLICHE_LIST__/g, forbiddenListMd)
    .replace(/__WCAG_TARGET__/g, (preset.scaffold_hints && preset.scaffold_hints.wcag_contrast_target) || "AA")
    .replace(/__LIGHTHOUSE_TARGET__/g, String((preset.scaffold_hints && preset.scaffold_hints.lighthouse_target) || 90));

  writeFile(file, md);
}

function patchReadmeMd(outDir, preset) {
  const file = path.join(outDir, "README.md");
  let md = readFile(file);

  md = md
    .replace(/__PRESET_ID__/g, preset.id || "unknown")
    .replace(/__PRESET_RECIPE__/g, preset.recipe || "next-premium")
    .replace(/__PRESET_TIER__/g, preset.tier || "mid");

  writeFile(file, md);
}

/* ================================================================ */
/*  combo.md generator                                               */
/* ================================================================ */

function writeComboMd(outDir, preset, atoms, antiCliche, palette, fonts, paletteAtom, typoAtom) {
  const file = path.join(outDir, "combo.md");
  const budget = preset.budget_range_try || [15000, 25000];
  const delivery = preset.delivery_weeks || [2, 3];

  const arr = (v) => (Array.isArray(v) ? v : v ? [v] : []);

  const forbiddenTable = (title, list) => {
    if (!list || list.length === 0) return `| ${title} | (yok) |`;
    return `| ${title} | \`${list.join("`, `")}\` |`;
  };

  const content = `# ${preset.id} — Combo

**Kaynak:** \`design-claude/catalog/presets/${preset.id}.yaml\`
**Uretim:** scaffold.js ${new Date().toISOString()}

---

## Preset Metadata

| Alan | Deger |
|------|-------|
| ID | \`${preset.id}\` |
| Sektor | \`${preset.sector}\` |
| Stil | \`${preset.style}\` |
| Recipe | \`${preset.recipe || "next-premium"}\` |
| Tier | \`${preset.tier || "mid"}\` |
| Butce | ${budget[0].toLocaleString("tr-TR")} – ${budget[1].toLocaleString("tr-TR")} TL |
| Teslim | ${delivery[0]}–${delivery[1]} hafta |
| Matrix Cell | \`${preset.matrix_cell || "-"}\` |

---

## Mood

${(preset.mood || []).map((m) => `- ${m}`).join("\n") || "- (tanimli degil)"}

---

## Atoms (Design Council Onayli)

### Core Atoms
| Atom | ID | Aciklama |
|------|-----|----------|
| Palette | \`${atoms.palette || "-"}\` | ${paletteAtom.name || "-"} |
| Typography | \`${atoms.typography || "-"}\` | ${typoAtom.name || "-"} |
| Header | \`${atoms.header || "-"}\` | - |
| Nav | \`${atoms.nav || "-"}\` | - |
| Hero | \`${atoms.hero || "-"}\` | - |
| KPI | \`${atoms.kpi || "-"}\` | - |
| Footer | \`${atoms.footer || "-"}\` | - |
${atoms.table ? `| Table | \`${atoms.table}\` | - |` : ""}
${atoms.form ? `| Form | \`${atoms.form}\` | - |` : ""}
${atoms.modal ? `| Modal | \`${atoms.modal}\` | - |` : ""}
${atoms.chart ? `| Chart | \`${arr(atoms.chart).join(", ")}\` | - |` : ""}
${atoms.pipeline ? `| Pipeline | \`${arr(atoms.pipeline).join(", ")}\` | - |` : ""}

### Layout
${arr(atoms.layout).map((l) => `- \`${l}\``).join("\n") || "- (yok)"}

### Motion
${arr(atoms.motion).map((m) => `- \`${m}\``).join("\n") || "- (yok)"}

### Motion Ajans (signature)
${arr(atoms.motion_ajans).map((m) => `- ${m}`).join("\n") || "- (yok)"}

${atoms["3d_optional"] ? `### 3D (opsiyonel)
${arr(atoms["3d_optional"]).map((a) => `- \`${a}\``).join("\n")}` : ""}

---

## Palette (${atoms.palette})

${paletteAtom.name ? `**${paletteAtom.name}**` : ""}

| Token | Hex |
|-------|-----|
| \`--color-bg\` | \`${palette.bg}\` |
| \`--color-ink\` | \`${palette.ink}\` |
| \`--color-accent\` | \`${palette.accent}\` |
| \`--color-surface\` | \`${palette.surface}\` |
| \`--color-border\` | \`${palette.border}\` |

${paletteAtom.wcag_pairs ? `**WCAG:**\n${arr(paletteAtom.wcag_pairs).map((p) => `- ${p}`).join("\n")}` : ""}

---

## Typography (${atoms.typography})

${typoAtom.name ? `**${typoAtom.name}**` : ""}

| Rol | Font |
|-----|------|
| Display | \`${fonts.displayFont}\` |
| Body | \`${fonts.bodyFont}\` |
| Mono | \`${fonts.monoFont}\` |

**Google Fonts URL:**
\`\`\`
${fonts.googleUrl || "(yok — yerel font kullan)"}
\`\`\`

---

## Components

### Core (yazilacak)
${(preset.components && arr(preset.components.core).map((c) => `- [ ] \`${c}\``).join("\n")) || "- (tanimli degil)"}

### Optional
${(preset.components && arr(preset.components.optional).map((c) => `- [ ] \`${c}\``).join("\n")) || "- (yok)"}

---

## YASAKLI ID'LER (Bu projede kullanilamaz)

${forbiddenTable("Palette", antiCliche.forbidden_palettes)}
${forbiddenTable("Typography", antiCliche.forbidden_typography)}
${forbiddenTable("Hero", antiCliche.forbidden_heroes)}
${forbiddenTable("Header", antiCliche.forbidden_headers)}
${forbiddenTable("KPI", antiCliche.forbidden_kpi)}
${forbiddenTable("Table", antiCliche.forbidden_tables)}
${forbiddenTable("Layout", antiCliche.forbidden_layouts)}
${forbiddenTable("Motion", antiCliche.forbidden_motion)}
${forbiddenTable("Pipeline", antiCliche.forbidden_pipelines)}

${antiCliche.warning ? `### Uyari\n${antiCliche.warning}` : ""}

${antiCliche.fatih_bey_override_warning ? `### Override Warning\n${antiCliche.fatih_bey_override_warning}` : ""}

---

## Scaffold Hints

${preset.scaffold_hints ? Object.entries(preset.scaffold_hints).map(([k, v]) => {
    if (Array.isArray(v)) return `- **${k}:** ${v.join(", ")}`;
    if (typeof v === "object") return `- **${k}:** \n${Object.entries(v).map(([k2, v2]) => `  - ${k2}: ${v2}`).join("\n")}`;
    return `- **${k}:** ${v}`;
  }).join("\n") : "- (tanimli degil)"}

---

## Research Refs

${(preset.research_refs || []).map((r) => `- \`${r}\``).join("\n") || "- (yok)"}

---

## Sonraki Adimlar

1. \`pnpm install\` — bagimliliklari kur
2. \`pnpm dev\` — localhost:3000
3. \`CLAUDE.md\` dosyasini oku (proje-ozel kurallar)
4. \`src/components/\` altina atom componentlerini yaz (atom-resolver mapping'e bak)
5. \`app/page.tsx\` placeholder'ini asil sayfayla degistir
`;

  writeFile(file, content);
}

/* ================================================================ */
/*  Entry                                                            */
/* ================================================================ */

main().catch((e) => {
  log.err(`Hata: ${e.message}`);
  if (process.env.DEBUG) console.error(e.stack);
  process.exit(1);
});
