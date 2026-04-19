#!/usr/bin/env node
/**
 * design-claude scaffold-shopify.js — Shopify Hydrogen CLI orchestrator
 * ----------------------------------------------------------------
 * Kullanim:
 *   node scaffold-shopify.js <preset-id> --out <output-path> [options]
 *
 * Ornek:
 *   node scaffold-shopify.js mucevher-immersive-3d --out ./fatih-bey-shopify/
 *   node scaffold-shopify.js eticaret-immersive-3d --out /tmp/shopify-test/
 *
 * Akis:
 *   1. catalog/presets/{preset-id}.yaml oku
 *   2. Recipe dogrulama — shopify-hydrogen olmali (veya yasaklanmamis)
 *   3. catalog/recipes/shopify-hydrogen.yaml oku
 *   4. atoms/palette + typography yukle
 *   5. Anti-cliche kontrol (forbidden ID'ler)
 *   6. hydrogen-base/ dizinini output'a kopyala
 *   7. Patch: package.json, app.css, root.tsx, constants.ts, CLAUDE.md, README.md, .env.example
 *   8. combo.md olustur
 *
 * Premium Tier 3 gereksinimleri:
 *   - Butce 35K-80K TL
 *   - Shopify Plus plan tavsiyeli
 *   - R3F 3D product viewer destekli (metafield "custom.3d_model_url")
 *   - iyzipay + PayTR Turkiye payment ready
 *   - KVKK cookie consent + structured data
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
  const args = {
    preset: null,
    out: null,
    help: false,
    force: false,
    skipWarnings: false,
    skipRecipeCheck: false,
    storeDomain: null,
  };
  const rest = argv.slice(2);

  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (arg === "-h" || arg === "--help") args.help = true;
    else if (arg === "--out" || arg === "-o") args.out = rest[++i];
    else if (arg === "--force" || arg === "-f") args.force = true;
    else if (arg === "--skip-warnings") args.skipWarnings = true;
    else if (arg === "--skip-recipe-check") args.skipRecipeCheck = true;
    else if (arg === "--store-domain") args.storeDomain = rest[++i];
    else if (!arg.startsWith("-") && !args.preset) args.preset = arg;
  }

  return args;
}

function printHelp() {
  console.log(`
${COLORS.bold}design-claude scaffold-shopify.js${COLORS.reset}

Shopify Hydrogen 2024.10+ storefront scaffolder.
Tier 3 Premium e-commerce (mucevher / mobilya / luxury).

Usage:
  node scaffold-shopify.js <preset-id> --out <path> [options]

Examples:
  node scaffold-shopify.js mucevher-immersive-3d --out ./fatih-bey-shopify/
  node scaffold-shopify.js eticaret-editorial-luxury --out ./luxury-store/
  node scaffold-shopify.js mobilya-immersive-3d --out ./furniture-shop/ --store-domain my-store.myshopify.com

Options:
  <preset-id>              Preset ID (catalog/presets/<id>.yaml)
  --out, -o <path>         Cikti dizini (zorunlu)
  --force, -f              Hedef dizin doluysa silip yeniden yaz
  --skip-warnings          Yasakli ID uyarilarini atla
  --skip-recipe-check      Preset recipe=shopify-hydrogen kontrolu atla
  --store-domain <domain>  .env.example'a otomatik enjekte et
  -h, --help               Bu yardim

Premium Tier (3):
  Butce 35K-80K TL  |  Teslim 4-6 hafta  |  Shopify Plus tavsiyeli
  iyzipay + PayTR Turkiye payment  |  R3F 3D viewer (metafield-driven)

Dokuman:
  design-claude/catalog/recipes/shopify-hydrogen.yaml
  design-claude/scaffold/shopify-hydrogen/README.md
`);
}

/* ================================================================ */
/*  Path resolution                                                  */
/* ================================================================ */

const ROOT = path.resolve(__dirname, "..", "..");
const CATALOG = path.join(ROOT, "catalog");
const BASE_TEMPLATE = path.join(__dirname, "hydrogen-base");

function presetPath(id) { return path.join(CATALOG, "presets", `${id}.yaml`); }
function recipePath(id) { return path.join(CATALOG, "recipes", `${id}.yaml`); }
function atomPath(cat, id) { return path.join(CATALOG, "atoms", cat, `${id}.yaml`); }

/* ================================================================ */
/*  YAML loader (front-matter)                                       */
/* ================================================================ */

function readYaml(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`YAML bulunamadi: ${filePath}`);
  const raw = fs.readFileSync(filePath, "utf8");
  return parseYamlFrontMatter(raw);
}

function parseYamlFrontMatter(raw) {
  const text = raw.replace(/^\uFEFF/, "");
  const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (fmMatch) {
    const header = yaml.load(fmMatch[1]) || {};
    const body = yaml.load(fmMatch[2]) || {};
    return { ...header, ...body };
  }
  return yaml.load(text) || {};
}

/* ================================================================ */
/*  FS helpers                                                       */
/* ================================================================ */

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function rmRecursive(target) {
  if (!fs.existsSync(target)) return;
  fs.rmSync(target, { recursive: true, force: true });
}
function copyDir(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".shopify" || entry.name === "dist") continue;
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}
function readFile(p) { return fs.readFileSync(p, "utf8"); }
function writeFile(p, c) { ensureDir(path.dirname(p)); fs.writeFileSync(p, c, "utf8"); }

/* ================================================================ */
/*  Font helpers                                                     */
/* ================================================================ */

function buildGoogleFontsURL(query) {
  if (!query) return null;
  const base = "https://fonts.googleapis.com/css2";
  const clean = query.trim().replace(/^family=/, "");
  return `${base}?family=${clean}&display=swap`;
}

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
/*  Palette helpers                                                  */
/* ================================================================ */

function extractHex(colorString) {
  if (!colorString) return null;
  const match = String(colorString).match(/#[0-9A-Fa-f]{3,8}/);
  return match ? match[0] : String(colorString).trim();
}

function resolvePalette(paletteAtom) {
  const bg = extractHex(paletteAtom.bg) || "#FFFFFF";
  const ink = extractHex(paletteAtom.ink) || "#0A0A0A";
  const accent = extractHex(paletteAtom.accent) || "#6366F1";
  const secondary = extractHex(paletteAtom.ikincil) || accent;
  const muted = ink + "88";
  const surface = bg;
  const border = ink + "22";
  return { bg, ink, accent, secondary, muted, surface, border };
}

/* ================================================================ */
/*  Main                                                             */
/* ================================================================ */

async function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.preset) { printHelp(); process.exit(args.help ? 0 : 1); }
  if (!args.out) { log.err("--out <path> zorunlu"); printHelp(); process.exit(1); }

  log.header(`scaffold-shopify.js → ${args.preset}`);

  /* ---- Step 1: Preset ---- */
  log.step(1, `Preset yukleniyor: ${args.preset}`);
  const presetFile = presetPath(args.preset);
  if (!fs.existsSync(presetFile)) {
    log.err(`Preset bulunamadi: ${presetFile}`);
    log.info("Preset listesi: ls catalog/presets/");
    process.exit(1);
  }
  let preset;
  try { preset = readYaml(presetFile); }
  catch (e) { log.err(`Preset parse hatasi: ${e.message}`); process.exit(1); }
  log.ok(`${preset.id} (${preset.sector} × ${preset.style})`);

  /* ---- Step 2: Recipe dogrulama ---- */
  log.step(2, "Recipe dogrulama (shopify-hydrogen)");
  const recipeId = preset.recipe || "next-premium";
  if (recipeId !== "shopify-hydrogen" && !args.skipRecipeCheck) {
    log.warn(`Preset recipe: "${recipeId}" — shopify-hydrogen degil`);
    log.info("Bu scaffolder sadece shopify-hydrogen recipe icin tasarlandi.");
    log.info("Devam etmek icin --skip-recipe-check kullan veya next-r3f scaffold'u kullan:");
    log.info(`  node ${path.join(ROOT, "scaffold.js")} ${args.preset} --out ${args.out}`);
    if (!args.skipRecipeCheck) process.exit(1);
  }

  /* ---- Step 3: Recipe YAML ---- */
  const recipeFile = recipePath("shopify-hydrogen");
  if (!fs.existsSync(recipeFile)) {
    log.err(`shopify-hydrogen recipe YAML bulunamadi: ${recipeFile}`);
    process.exit(1);
  }
  const recipe = readYaml(recipeFile);
  log.ok(`${recipe.name || recipe.id} (Tier ${recipe.tier || 3})`);

  /* ---- Step 4: Atoms ---- */
  log.step(3, "Atoms yukleniyor (palette + typography)");
  const atomsConfig = preset.atoms || {};
  const paletteId = atomsConfig.palette;
  const typoId = atomsConfig.typography;
  if (!paletteId || !typoId) {
    log.err("preset.atoms.palette veya .typography tanimli degil");
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
  log.ok(`palette: ${paletteId} | bg: ${palette.bg} | ink: ${palette.ink} | accent: ${palette.accent}`);
  log.ok(`typography: ${typoId} | display: ${fonts.displayFont} | body: ${fonts.bodyFont}`);

  /* ---- Step 5: Anti-cliche ---- */
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
  const usedAtoms = Object.values(atomsConfig).flatMap((v) => Array.isArray(v) ? v : [v]);
  const violations = usedAtoms.filter((a) => forbiddenList.includes(a));
  if (violations.length > 0) {
    log.err(`YASAKLI ID: ${violations.join(", ")}`);
    if (!args.skipWarnings) { log.err("--skip-warnings kullan"); process.exit(1); }
    log.warn("--skip-warnings aktif, devam");
  } else {
    log.ok(`Temiz (yasakli liste: ${forbiddenList.length} ID)`);
  }

  /* ---- Step 6: Premium tier check ---- */
  log.step(5, "Premium Tier (3) gereksinimleri");
  const budget = preset.budget_range_try || [];
  if (budget[0] && budget[0] < 25000) {
    log.warn(`Preset butce ${budget[0]}-${budget[1]} TL — Shopify Hydrogen icin dusuk`);
    log.info("Shopify Plus plan $2000/ay — dusuk butceli proje Next.js + Supabase recipe'i dene");
    if (!args.skipWarnings) { log.err("--skip-warnings ile devam et"); process.exit(1); }
  }
  log.ok(`Butce ${budget[0] || "?"}-${budget[1] || "?"} TL (premium tier eligible)`);

  /* ---- Step 7: Copy base ---- */
  log.step(6, `Base template kopyalaniyor → ${args.out}`);
  const outDir = path.resolve(args.out);
  if (fs.existsSync(outDir)) {
    const entries = fs.readdirSync(outDir);
    if (entries.length > 0) {
      if (!args.force) { log.err(`Hedef dizin dolu: ${outDir} — --force kullan`); process.exit(1); }
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

  /* ---- Step 8: Patch ---- */
  log.step(7, "Dosyalar patch'leniyor");
  patchPackageJson(outDir, preset);
  patchAppCss(outDir, preset, paletteId, typoId, palette, fonts);
  patchRootTsx(outDir, preset, fonts, palette);
  patchConstantsTs(outDir, preset, atomsConfig);
  patchClaudeMd(outDir, preset, atomsConfig, antiCliche);
  patchReadme(outDir, preset);
  patchEnv(outDir, args.storeDomain);
  log.ok("Patch tamamlandi");

  /* ---- Step 9: combo.md ---- */
  log.step(8, "combo.md olusturuluyor");
  writeComboMd(outDir, preset, atomsConfig, antiCliche, palette, fonts, paletteAtom, typoAtom, recipe);
  log.ok("combo.md yazildi");

  /* ---- Done ---- */
  log.header("BASARILI");
  console.log(`
${COLORS.green}${COLORS.bold}Proje hazir:${COLORS.reset} ${outDir}

${COLORS.bold}Kurulum:${COLORS.reset}
  ${COLORS.cyan}cd ${args.out}${COLORS.reset}
  ${COLORS.cyan}cp .env.example .env${COLORS.reset}
  ${COLORS.cyan}# .env dosyasini duzenle (Shopify Admin'den token al)${COLORS.reset}
  ${COLORS.cyan}pnpm install${COLORS.reset}
  ${COLORS.cyan}pnpm dev${COLORS.reset}

${COLORS.bold}Shopify Admin setup:${COLORS.reset}
  1. Shopify Partners'ta yeni store olustur (dev store uygun)
  2. Settings -> Apps -> Develop apps -> "Headless" app olustur
  3. Admin API + Storefront API token al
  4. Products -> her ürüne "custom.3d_model_url" metafield tanimla (GLB URL)
  5. iyzipay Turkiye partner app yukle (2-3 gun onay)

${COLORS.bold}Sonraki adim:${COLORS.reset}
  1. ${COLORS.cyan}cat combo.md${COLORS.reset} (atom listesi)
  2. ${COLORS.cyan}app/components/${COLORS.reset} altindaki component'leri preset'e uyarla
  3. ${COLORS.cyan}app/routes/_index.tsx${COLORS.reset} hero + koleksiyon
  4. ${COLORS.cyan}pnpm deploy${COLORS.reset} (Oxygen)
`);
}

/* ================================================================ */
/*  Patch functions                                                  */
/* ================================================================ */

function patchPackageJson(outDir, preset) {
  const file = path.join(outDir, "package.json");
  const pkg = JSON.parse(readFile(file));
  pkg.name = preset.id + "-shopify";
  pkg.description = `${preset.sector} × ${preset.style} — Shopify Hydrogen storefront (design-claude preset)`;
  pkg.version = "0.1.0";
  writeFile(file, JSON.stringify(pkg, null, 2) + "\n");
}

function patchAppCss(outDir, preset, paletteId, typoId, palette, fonts) {
  const file = path.join(outDir, "app", "styles", "app.css");
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

function patchRootTsx(outDir, preset, fonts, palette) {
  const file = path.join(outDir, "app", "root.tsx");
  let tsx = readFile(file);
  const fontLink = fonts.googleUrl
    ? `{ rel: "stylesheet", href: "${fonts.googleUrl}" },`
    : `// No custom fonts`;
  tsx = tsx
    .replace(/\/\* __FONT_LINK__ \*\//g, fontLink)
    .replace(/__COLOR_BG__/g, palette.bg);
  writeFile(file, tsx);
}

function patchConstantsTs(outDir, preset, atoms) {
  const file = path.join(outDir, "app", "lib", "constants.ts");
  let ts = readFile(file);
  const budget = preset.budget_range_try || [35000, 80000];
  const delivery = preset.delivery_weeks || [4, 6];
  const firstAtom = (v) => (Array.isArray(v) ? v[0] : v) || "";
  ts = ts
    .replace(/__PRESET_ID__/g, preset.id || "unknown")
    .replace(/__PRESET_NAME__/g, preset.name || preset.id || "unknown")
    .replace(/__PRESET_RECIPE__/g, preset.recipe || "shopify-hydrogen")
    .replace(/__PRESET_TIER__/g, preset.tier || "premium")
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
    .replace(/__WCAG_TARGET__/g, (preset.scaffold_hints?.wcag_contrast_target) || "AA (4.5:1)")
    .replace(/__LIGHTHOUSE_TARGET__/g, String(preset.scaffold_hints?.lighthouse_target || 88))
    .replace(/__PRIMARY_CTA__/g, preset.scaffold_hints?.primary_cta || "Kesfet")
    .replace(/__SECONDARY_CTA__/g, preset.scaffold_hints?.secondary_cta || "Daha Fazla");
  writeFile(file, ts);
}

function patchClaudeMd(outDir, preset, atoms, antiCliche) {
  const file = path.join(outDir, "CLAUDE.md");
  if (!fs.existsSync(file)) return;
  let md = readFile(file);
  const budget = preset.budget_range_try || [35000, 80000];
  const delivery = preset.delivery_weeks || [4, 6];
  const firstAtom = (v) => (Array.isArray(v) ? v[0] : v) || "";
  const forbidden = []
    .concat(antiCliche.forbidden_palettes || [])
    .concat(antiCliche.forbidden_typography || [])
    .concat(antiCliche.forbidden_heroes || [])
    .concat(antiCliche.forbidden_headers || [])
    .concat(antiCliche.forbidden_kpi || [])
    .concat(antiCliche.forbidden_tables || [])
    .concat(antiCliche.forbidden_layouts || [])
    .concat(antiCliche.forbidden_motion || [])
    .concat(antiCliche.forbidden_pipelines || []);
  const forbiddenMd = forbidden.length > 0
    ? forbidden.map((id) => `- \`${id}\``).join("\n")
    : "- (yok)";

  md = md
    .replace(/__PRESET_ID__/g, preset.id || "unknown")
    .replace(/__PRESET_SECTOR__/g, preset.sector || "unknown")
    .replace(/__PRESET_STYLE__/g, preset.style || "unknown")
    .replace(/__PRESET_RECIPE__/g, preset.recipe || "shopify-hydrogen")
    .replace(/__PRESET_TIER__/g, preset.tier || "premium")
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
    .replace(/__ANTI_CLICHE_LIST__/g, forbiddenMd)
    .replace(/__WCAG_TARGET__/g, preset.scaffold_hints?.wcag_contrast_target || "AA")
    .replace(/__LIGHTHOUSE_TARGET__/g, String(preset.scaffold_hints?.lighthouse_target || 88));
  writeFile(file, md);
}

function patchReadme(outDir, preset) {
  const file = path.join(outDir, "README.md");
  if (!fs.existsSync(file)) return;
  let md = readFile(file);
  md = md
    .replace(/__PRESET_ID__/g, preset.id || "unknown")
    .replace(/__PRESET_RECIPE__/g, preset.recipe || "shopify-hydrogen")
    .replace(/__PRESET_TIER__/g, preset.tier || "premium");
  writeFile(file, md);
}

function patchEnv(outDir, storeDomain) {
  if (!storeDomain) return;
  const file = path.join(outDir, ".env.example");
  let env = readFile(file);
  env = env.replace(/your-store\.myshopify\.com/g, storeDomain);
  writeFile(file, env);
}

/* ================================================================ */
/*  combo.md                                                         */
/* ================================================================ */

function writeComboMd(outDir, preset, atoms, antiCliche, palette, fonts, paletteAtom, typoAtom, recipe) {
  const file = path.join(outDir, "combo.md");
  const budget = preset.budget_range_try || [35000, 80000];
  const delivery = preset.delivery_weeks || [4, 6];
  const arr = (v) => (Array.isArray(v) ? v : v ? [v] : []);
  const fTable = (t, l) => !l || l.length === 0
    ? `| ${t} | (yok) |`
    : `| ${t} | \`${l.join("`, `")}\` |`;

  const content = `# ${preset.id} — Shopify Hydrogen Combo

**Kaynak:** \`design-claude/catalog/presets/${preset.id}.yaml\`
**Recipe:** \`shopify-hydrogen\` (Tier 3 Premium)
**Uretim:** scaffold-shopify.js ${new Date().toISOString()}

---

## Preset Metadata

| Alan | Deger |
|------|-------|
| ID | \`${preset.id}\` |
| Sektor | \`${preset.sector}\` |
| Stil | \`${preset.style}\` |
| Recipe | \`shopify-hydrogen\` |
| Tier | Premium (3) |
| Butce | ${budget[0].toLocaleString("tr-TR")} – ${budget[1].toLocaleString("tr-TR")} TL |
| Teslim | ${delivery[0]}–${delivery[1]} hafta |
| Shopify Plan | Shopify Plus tavsiyeli (aylik $2000+) |

---

## Shopify-Spesifik

| Alan | Deger |
|------|-------|
| Framework | Hydrogen 2024.10+ (Remix-based) |
| API | Storefront API 2024-10 (GraphQL) |
| Deploy | Shopify Oxygen (edge hosting) |
| i18n | TR (country + language) |
| Currency | TRY |
| Payment | Shopify Payments + iyzipay (partner app) + PayTR |
| CMS | Shopify Metaobjects + Metafields |

### Metafield tanimlari (Shopify admin'de olusturulmali)

| Namespace | Key | Type | Kullanim |
|-----------|-----|------|----------|
| \`custom\` | \`3d_model_url\` | url / single_line_text | GLB/GLTF 3D model URL |
| \`custom\` | \`ar_usdz_url\` | url / single_line_text | iOS Quick Look USDZ |
| \`custom\` | \`certificate_pdf\` | file_reference / url | Elmas/ayar sertifikasi PDF |
| \`custom\` | \`spec_sheet\` | json | \`[{label, value}]\` array |
| \`custom\` | \`metal_purity\` | single_line_text | 14K, 18K, Platinum |
| \`custom\` | \`stone_carat\` | number_decimal | Elmas karat |

---

## Mood

${(preset.mood || []).map((m) => `- ${m}`).join("\n") || "- (tanimli degil)"}

---

## Atoms (Design Council Onayli)

### Core
| Atom | ID | Aciklama |
|------|-----|----------|
| Palette | \`${atoms.palette || "-"}\` | ${paletteAtom.name || "-"} |
| Typography | \`${atoms.typography || "-"}\` | ${typoAtom.name || "-"} |
| Header | \`${atoms.header || "-"}\` | - |
| Nav | \`${atoms.nav || "-"}\` | - |
| Hero | \`${atoms.hero || "-"}\` | - |
| KPI | \`${atoms.kpi || "-"}\` | - |
| Footer | \`${atoms.footer || "-"}\` | - |

### Layout
${arr(atoms.layout).map((l) => `- \`${l}\``).join("\n") || "- (yok)"}

### Motion
${arr(atoms.motion).map((m) => `- \`${m}\``).join("\n") || "- (yok)"}

### 3D
${arr(atoms["3d"] || atoms["3d_optional"]).map((a) => `- \`${a}\``).join("\n") || "- (yok)"}

---

## Palette (${atoms.palette})

| Token | Hex |
|-------|-----|
| \`--color-bg\` | \`${palette.bg}\` |
| \`--color-ink\` | \`${palette.ink}\` |
| \`--color-accent\` | \`${palette.accent}\` |
| \`--color-surface\` | \`${palette.surface}\` |
| \`--color-border\` | \`${palette.border}\` |

---

## Typography (${atoms.typography})

| Rol | Font |
|-----|------|
| Display | \`${fonts.displayFont}\` |
| Body | \`${fonts.bodyFont}\` |
| Mono | \`${fonts.monoFont}\` |

**Google Fonts URL:**
\`\`\`
${fonts.googleUrl || "(yok)"}
\`\`\`

---

## Components

### Core Shopify Hydrogen (yazilacak / patch'lenecek)
- [ ] \`Hero.tsx\` — preset hero stili (HR4 canvas veya HR1 editorial)
- [ ] \`ProductCard.tsx\` — koleksiyon listesi karti
- [ ] \`ProductCard3D.tsx\` — R3F + metafield driven 3D viewer
- [ ] \`ProductSpec.tsx\` — spec sheet (metafield \`spec_sheet\` JSON)
- [ ] \`AddToCartButton.tsx\` — CartForm.ACTIONS.LinesAdd
- [ ] \`Cart.tsx\` / \`CartAside.tsx\` — slide-over drawer + /cart sayfa
- [ ] \`Header.tsx\` + \`Footer.tsx\` — preset stiline gore customize
- [ ] \`CollectionFilters.tsx\` — Storefront API filter system
- [ ] \`KvkkBanner.tsx\` — Turkiye yasal uyum
- [ ] \`JsonLd.tsx\` — Product + 3DModel structured data

### Preset-spesifik (core)
${(preset.components && arr(preset.components.core).map((c) => `- [ ] \`${c}\``).join("\n")) || "- (tanimli degil)"}

---

## YASAKLI ID'LER

${fTable("Palette", antiCliche.forbidden_palettes)}
${fTable("Typography", antiCliche.forbidden_typography)}
${fTable("Hero", antiCliche.forbidden_heroes)}
${fTable("Header", antiCliche.forbidden_headers)}
${fTable("KPI", antiCliche.forbidden_kpi)}
${fTable("Table", antiCliche.forbidden_tables)}
${fTable("Layout", antiCliche.forbidden_layouts)}
${fTable("Motion", antiCliche.forbidden_motion)}

${antiCliche.warning ? `### Uyari\n${antiCliche.warning}\n` : ""}

---

## Scaffold Hints

${preset.scaffold_hints ? Object.entries(preset.scaffold_hints).map(([k, v]) => {
  if (Array.isArray(v)) return `- **${k}:** ${v.join(", ")}`;
  if (typeof v === "object" && v !== null) return `- **${k}:**\n${Object.entries(v).map(([k2, v2]) => `  - ${k2}: ${v2}`).join("\n")}`;
  return `- **${k}:** ${v}`;
}).join("\n") : "- (tanimli degil)"}

---

## Deploy (Oxygen)

\`\`\`bash
# 1. Shopify Partners'tan dev store olustur
# 2. Admin -> Settings -> Apps -> Develop apps -> Headless
# 3. Storefront API token kopyala, .env'e yaz
# 4. Deploy:
pnpm build
pnpm deploy  # shopify hydrogen deploy (Oxygen)

# Alternatif: Cloudflare Pages
pnpm build
wrangler pages deploy dist/client
\`\`\`
`;
  writeFile(file, content);
}

/* ================================================================ */
/*  Kick off                                                         */
/* ================================================================ */

main().catch((e) => { log.err(e.stack || e.message); process.exit(1); });
