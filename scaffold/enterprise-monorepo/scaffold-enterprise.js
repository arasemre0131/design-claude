#!/usr/bin/env node
/**
 * design-claude scaffold-enterprise.js — Tier 5 Enterprise Monorepo CLI
 * ================================================================
 * Kullanim:
 *   node scaffold-enterprise.js <preset-id> --out <output-path> [options]
 *
 * Ornek:
 *   node scaffold-enterprise.js mucevher-enterprise --out ./mucevher-zinciri/
 *
 * Akis:
 *   1. Preset YAML oku
 *   2. Preset tier >= 4 (Tier 5 Enterprise) dogrulama
 *   3. Recipe (next-enterprise-monorepo veya fallback next-r3f) oku
 *   4. Palette + typography atom'lari oku
 *   5. base/ dizinini hedefe kopyala
 *   6. Root + app + package dosyalarini patch'le (apps/web, apps/admin)
 *   7. packages/db/src/schema.ts icine presetId default set et
 *   8. .env.example palette/typography bilgisiyle yorum satiri ekle
 *   9. combo.md uret
 */

"use strict";

const fs = require("fs");
const path = require("path");

// js-yaml design-claude root'tan cozulur (root scaffold.js ile ayni)
let yaml;
try {
  yaml = require("js-yaml");
} catch {
  const rootNodeModules = path.resolve(__dirname, "..", "..", "node_modules", "js-yaml");
  if (fs.existsSync(rootNodeModules)) {
    yaml = require(rootNodeModules);
  } else {
    console.error("[x] js-yaml bulunamadi. Root'ta 'npm install js-yaml' calistir.");
    process.exit(1);
  }
}

/* ================================================================ */
/*  Console helpers                                                  */
/* ================================================================ */

const C = {
  reset: "\x1b[0m", bold: "\x1b[1m", dim: "\x1b[2m",
  red: "\x1b[31m", green: "\x1b[32m", yellow: "\x1b[33m",
  blue: "\x1b[34m", magenta: "\x1b[35m", cyan: "\x1b[36m",
};
const log = {
  info: (m) => console.log(`${C.cyan}[i]${C.reset} ${m}`),
  ok: (m) => console.log(`${C.green}[+]${C.reset} ${m}`),
  warn: (m) => console.log(`${C.yellow}[!]${C.reset} ${m}`),
  err: (m) => console.error(`${C.red}[x]${C.reset} ${m}`),
  step: (n, m) => console.log(`${C.bold}${C.blue}[${n}]${C.reset} ${m}`),
  header: (m) => console.log(`\n${C.bold}${C.magenta}== ${m} ==${C.reset}`),
};

/* ================================================================ */
/*  Argument parsing                                                 */
/* ================================================================ */

function parseArgs(argv) {
  const args = { preset: null, out: null, recipe: null, force: false, skipWarnings: false, help: false };
  const rest = argv.slice(2);
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === "-h" || a === "--help") args.help = true;
    else if (a === "--out" || a === "-o") args.out = rest[++i];
    else if (a === "--recipe" || a === "-r") args.recipe = rest[++i];
    else if (a === "--force" || a === "-f") args.force = true;
    else if (a === "--skip-warnings") args.skipWarnings = true;
    else if (!a.startsWith("-") && !args.preset) args.preset = a;
  }
  return args;
}

function printHelp() {
  console.log(`
${C.bold}scaffold-enterprise.js${C.reset} — Tier 5 Enterprise Monorepo

Usage:
  node scaffold-enterprise.js <preset-id> --out <path> [options]

Examples:
  node scaffold-enterprise.js mucevher-enterprise --out ./mucevher-zinciri/
  node scaffold-enterprise.js insaat-data-dense --out /tmp/test-enterprise/ --force

Options:
  <preset-id>           Preset YAML id (catalog/presets/<id>.yaml)
  --out, -o <path>      Cikti dizini (zorunlu)
  --recipe, -r <id>     Recipe override (default: next-enterprise-monorepo → next-r3f fallback)
  --force, -f           Hedef dolu ise sil + tekrar yaz
  --skip-warnings       Tier / yasakli ID uyarilarini atla (onerilmez)
  -h, --help            Bu yardim

Output:
  {output-path}/
  ├── apps/web, admin, api
  ├── packages/ui, db, auth, config, observability
  ├── docker/compose.dev.yaml
  └── .github/workflows/ (ci.yml, deploy.yml)

Dokuman: design-claude/scaffold/enterprise-monorepo/README.md
`);
}

/* ================================================================ */
/*  Path resolution — design-claude root'ta                          */
/* ================================================================ */

const DESIGN_CLAUDE_ROOT = path.resolve(__dirname, "..", "..");
const CATALOG = path.join(DESIGN_CLAUDE_ROOT, "catalog");
const BASE_TEMPLATE = path.resolve(__dirname, "base");

const presetPath = (id) => path.join(CATALOG, "presets", `${id}.yaml`);
const recipePath = (id) => path.join(CATALOG, "recipes", `${id}.yaml`);
const atomPath = (cat, id) => path.join(CATALOG, "atoms", cat, `${id}.yaml`);

/* ================================================================ */
/*  YAML front-matter loader                                         */
/* ================================================================ */

function readYaml(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`YAML bulunamadi: ${filePath}`);
  return parseFrontMatter(fs.readFileSync(filePath, "utf8"));
}

function parseFrontMatter(raw) {
  const text = raw.replace(/^\uFEFF/, "");
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (fm) {
    const header = yaml.load(fm[1]) || {};
    const body = yaml.load(fm[2]) || {};
    return { ...header, ...body };
  }
  return yaml.load(text) || {};
}

/* ================================================================ */
/*  FS helpers                                                       */
/* ================================================================ */

function ensureDir(d) { fs.mkdirSync(d, { recursive: true }); }
function rmRecursive(t) { if (fs.existsSync(t)) fs.rmSync(t, { recursive: true, force: true }); }

function copyDir(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".turbo") continue;
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

const readFile = (p) => fs.readFileSync(p, "utf8");
const writeFile = (p, c) => { ensureDir(path.dirname(p)); fs.writeFileSync(p, c, "utf8"); };

/* ================================================================ */
/*  Font + palette parser (scaffold.js ile tutarli)                  */
/* ================================================================ */

function buildGoogleFontsURL(q) {
  if (!q) return null;
  return `https://fonts.googleapis.com/css2?family=${String(q).trim().replace(/^family=/, "")}&display=swap`;
}

function extractFontNames(typo) {
  const clean = (v) => (v ? String(v).replace(/\s*\(.*\)\s*$/, "").trim() : null);
  return {
    displayFont: clean(typo.display_font) || "Inter",
    bodyFont: clean(typo.body_font) || "Inter",
    monoFont: clean(typo.mono_font) || "JetBrains Mono",
    googleUrl: buildGoogleFontsURL(typo.google_fonts),
  };
}

function extractHex(v) {
  if (!v) return null;
  const m = String(v).match(/#[0-9A-Fa-f]{3,8}/);
  return m ? m[0] : String(v).trim();
}

function resolvePalette(p) {
  const bg = extractHex(p.bg) || "#FFFFFF";
  const ink = extractHex(p.ink) || "#0A0A0A";
  const accent = extractHex(p.accent) || "#6366F1";
  return {
    bg, ink, accent,
    secondary: extractHex(p.ikincil) || accent,
    muted: ink + "88",
    surface: bg,
    border: ink + "22",
  };
}

/* ================================================================ */
/*  Main                                                             */
/* ================================================================ */

async function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.preset) { printHelp(); process.exit(args.help ? 0 : 1); }
  if (!args.out) { log.err("--out <path> zorunlu"); printHelp(); process.exit(1); }

  log.header(`scaffold-enterprise → ${args.preset}`);

  /* -------- 1. Preset -------- */
  log.step(1, `Preset yukleniyor: ${args.preset}`);
  const preFile = presetPath(args.preset);
  if (!fs.existsSync(preFile)) {
    log.err(`Preset bulunamadi: ${preFile}`);
    log.info("Mevcut preset'ler: ls catalog/presets/");
    process.exit(1);
  }
  const preset = readYaml(preFile);
  log.ok(`${preset.id} (${preset.sector} × ${preset.style})`);

  /* -------- 2. Tier check -------- */
  log.step(2, "Tier kontrolu");
  const tierRaw = preset.tier ?? 0;
  // Tier values: "budget"|"mid"|"premium"|"enterprise" veya 0..5
  const TIER_MAP = { budget: 1, mid: 2, premium: 3, enterprise: 4, saas: 5 };
  const tierNum = typeof tierRaw === "number"
    ? tierRaw
    : (TIER_MAP[String(tierRaw).toLowerCase()] ?? 0);
  if (tierNum < 3) {
    log.warn(`Preset tier="${tierRaw}" (numeric=${tierNum}). Enterprise scaffolder Premium+ icin tasarlandi.`);
    if (!args.skipWarnings) {
      log.err("Tier dusuk → next-premium scaffolder kullan. --skip-warnings ile zorla.");
      process.exit(1);
    }
  } else {
    log.ok(`Tier "${tierRaw}" OK (Premium/Enterprise)`);
  }

  /* -------- 3. Recipe -------- */
  const recipeId = args.recipe || preset.recipe || "next-enterprise-monorepo";
  log.step(3, `Recipe: ${recipeId}`);
  let recipe;
  const recFile = recipePath(recipeId);
  if (!fs.existsSync(recFile)) {
    log.warn(`Recipe bulunamadi: ${recFile}. Fallback: next-r3f`);
    recipe = readYaml(recipePath("next-r3f"));
  } else {
    recipe = readYaml(recFile);
  }
  log.ok(`${recipe.name || recipe.id} (Tier ${recipe.tier || "?"})`);

  /* -------- 4. Atoms -------- */
  log.step(4, "Atoms yukleniyor");
  const atoms = preset.atoms || {};
  if (!atoms.palette || !atoms.typography) {
    log.err("preset.atoms.palette veya preset.atoms.typography tanimli degil");
    process.exit(1);
  }
  const paletteAtom = readYaml(atomPath("palette", atoms.palette));
  const typoAtom = readYaml(atomPath("typography", atoms.typography));
  const palette = resolvePalette(paletteAtom);
  const fonts = extractFontNames(typoAtom);
  log.ok(`palette: ${atoms.palette} | typography: ${atoms.typography}`);
  log.ok(`   bg=${palette.bg} ink=${palette.ink} accent=${palette.accent}`);

  /* -------- 5. Anti-cliche -------- */
  log.step(5, "Anti-cliche kontrolu");
  const ac = preset.anti_cliche || {};
  const forbidden = []
    .concat(ac.forbidden_palettes || [])
    .concat(ac.forbidden_typography || [])
    .concat(ac.forbidden_heroes || [])
    .concat(ac.forbidden_headers || [])
    .concat(ac.forbidden_kpi || [])
    .concat(ac.forbidden_tables || [])
    .concat(ac.forbidden_layouts || [])
    .concat(ac.forbidden_motion || [])
    .concat(ac.forbidden_pipelines || []);
  const used = Object.values(atoms).flatMap((v) => Array.isArray(v) ? v : [v]);
  const violations = used.filter((a) => forbidden.includes(a));
  if (violations.length) {
    log.err(`YASAKLI ID: ${violations.join(", ")}`);
    if (!args.skipWarnings) { log.err("--skip-warnings ile zorla (onerilmez)"); process.exit(1); }
  } else {
    log.ok(`Temiz (yasakli liste: ${forbidden.length})`);
  }

  /* -------- 6. Copy base -------- */
  log.step(6, `Base template kopyalaniyor → ${args.out}`);
  const outDir = path.resolve(args.out);
  if (fs.existsSync(outDir) && fs.readdirSync(outDir).length > 0) {
    if (!args.force) { log.err(`Dizin dolu: ${outDir}. --force kullan`); process.exit(1); }
    log.warn("--force ile siliniyor");
    rmRecursive(outDir);
  }
  if (!fs.existsSync(BASE_TEMPLATE)) {
    log.err(`Base bulunamadi: ${BASE_TEMPLATE}`);
    process.exit(1);
  }
  copyDir(BASE_TEMPLATE, outDir);
  log.ok(`Kopyalandi (${outDir})`);

  /* -------- 7. Patch -------- */
  log.step(7, "Patch islemleri");
  const ctx = { preset, recipe, atoms, ac, palette, fonts };

  patchRoot(outDir, ctx);
  patchEnv(outDir, ctx);
  patchApp(outDir, "web", ctx);
  patchApp(outDir, "admin", ctx);
  patchApp(outDir, "api", ctx);
  patchPackageDb(outDir, ctx);
  patchReadme(outDir, ctx);
  patchClaudeMd(outDir, ctx);
  patchDocker(outDir, ctx);
  patchFlyToml(outDir, ctx);
  log.ok("Patch tamamlandi");

  /* -------- 8. combo.md -------- */
  log.step(8, "combo.md olusturuluyor");
  writeCombo(outDir, ctx);
  log.ok("combo.md yazildi");

  /* -------- Done -------- */
  log.header("BASARILI — Enterprise monorepo hazir");
  console.log(`
${C.green}${C.bold}Proje:${C.reset} ${outDir}

${C.bold}Sonraki adimlar:${C.reset}
  ${C.cyan}cd ${args.out}${C.reset}
  ${C.cyan}pnpm install${C.reset}                     # ~2-3 dakika
  ${C.cyan}cp .env.example .env.local${C.reset}       # Env degerlerini doldur
  ${C.cyan}pnpm docker:up${C.reset}                   # Postgres + Redis
  ${C.cyan}pnpm db:push${C.reset}                     # Schema'yi DB'ye ugra
  ${C.cyan}pnpm dev${C.reset}                         # 3 app paralel (port 3000/3001/3002)

${C.bold}Multi-tenant test:${C.reset}
  Chrome: ${C.dim}http://tenant1.localhost:3000${C.reset}  → middleware rewrite edecek

${C.bold}combo.md:${C.reset} Design council cikti dosyasi — okumadan gelistirmeye baslama
`);
}

/* ================================================================ */
/*  Patch functions                                                  */
/* ================================================================ */

function firstAtom(v) { return Array.isArray(v) ? v[0] : (v || ""); }

function replaceAll(content, replacements) {
  let out = content;
  for (const [key, value] of Object.entries(replacements)) {
    out = out.split(key).join(value ?? "");
  }
  return out;
}

function patchRoot(outDir, { preset }) {
  const file = path.join(outDir, "package.json");
  const pkg = JSON.parse(readFile(file));
  pkg.name = `${preset.id || "preset"}-enterprise`;
  pkg.description = `${preset.sector || "?"} × ${preset.style || "?"} — Tier 5 Enterprise (design-claude preset ${preset.id})`;
  pkg.version = "0.1.0";
  writeFile(file, JSON.stringify(pkg, null, 2) + "\n");
}

function patchEnv(outDir, { preset }) {
  const file = path.join(outDir, ".env.example");
  const text = readFile(file).replace(/__PRESET_ID__/g, preset.id || "preset");
  writeFile(file, text);
}

function patchApp(outDir, appName, { preset, atoms, palette, fonts }) {
  const appDir = path.join(outDir, "apps", appName);
  if (!fs.existsSync(appDir)) return;

  const title = `${preset.sector || "?"} × ${preset.style || "?"}`;
  const desc = `Tier 5 Enterprise | ${preset.id} | ${
    Array.isArray(preset.delivery_weeks) ? preset.delivery_weeks.join("-") + " hafta" : "6-12 hafta"
  }`;

  const fontTag = fonts.googleUrl
    ? `<link rel="stylesheet" href="${fonts.googleUrl}" />`
    : `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap" />`;

  const replacements = {
    "__PRESET_ID__": preset.id || "preset",
    "__PRESET_TITLE__": title,
    "__PRESET_DESCRIPTION__": desc,
    "__PALETTE_ID__": atoms.palette || "?",
    "__TYPOGRAPHY_ID__": atoms.typography || "?",
    "__COLOR_BG__": palette.bg,
    "__COLOR_INK__": palette.ink,
    "__COLOR_ACCENT__": palette.accent,
    "__COLOR_MUTED__": palette.muted,
    "__COLOR_SURFACE__": palette.surface,
    "__COLOR_BORDER__": palette.border,
    "__FONT_DISPLAY__": `"${fonts.displayFont}", serif`,
    "__FONT_BODY__": `"${fonts.bodyFont}", sans-serif`,
    "__FONT_MONO__": `"${fonts.monoFont}", monospace`,
    "{/* __FONT_LINK_TAG__ */}": fontTag,
  };

  // app/package.json
  const pkgFile = path.join(appDir, "package.json");
  if (fs.existsSync(pkgFile)) {
    const pkg = JSON.parse(replaceAll(readFile(pkgFile), replacements));
    writeFile(pkgFile, JSON.stringify(pkg, null, 2) + "\n");
  }

  // Recursively patch .tsx, .ts, .css, .json, .toml, .md dosyalari
  walkAndPatch(appDir, replacements);
}

function patchPackageDb(outDir, { preset }) {
  // packages/db/src/schema.ts icinde presetId default set (opsiyonel)
  const schemaFile = path.join(outDir, "packages", "db", "src", "schema.ts");
  if (!fs.existsSync(schemaFile)) return;
  // Zaten notNull(). Default yok cunku tenant olusumunda zorunlu.
  // Burada preset.id'i yorum olarak enjekte et
  let text = readFile(schemaFile);
  const marker = "/* ================================================================ */\n/*  Tenants                                                          */\n/* ================================================================ */";
  const replaced = text.replace(
    marker,
    `/* ================================================================ */
/*  Tenants                                                          */
/*  Default presetId: ${preset.id || "?"}                              */
/* ================================================================ */`,
  );
  writeFile(schemaFile, replaced);
}

function patchReadme(outDir, { preset, atoms }) {
  const file = path.join(outDir, "README.md");
  const text = replaceAll(readFile(file), {
    "__PRESET_ID__": preset.id || "preset",
    "__PRESET_RECIPE__": preset.recipe || "next-enterprise-monorepo",
  });
  writeFile(file, text);
}

function patchClaudeMd(outDir, { preset, atoms, ac }) {
  const file = path.join(outDir, "CLAUDE.md");
  const budget = preset.budget_range_try || [80000, 250000];
  const delivery = preset.delivery_weeks || [6, 12];

  const forbidden = []
    .concat(ac.forbidden_palettes || [])
    .concat(ac.forbidden_typography || [])
    .concat(ac.forbidden_heroes || [])
    .concat(ac.forbidden_headers || [])
    .concat(ac.forbidden_kpi || [])
    .concat(ac.forbidden_tables || [])
    .concat(ac.forbidden_layouts || [])
    .concat(ac.forbidden_motion || [])
    .concat(ac.forbidden_pipelines || []);
  const forbiddenMd = forbidden.length
    ? forbidden.map((id) => `- \`${id}\``).join("\n")
    : "- (yok)";

  const text = replaceAll(readFile(file), {
    "__PRESET_ID__": preset.id || "preset",
    "__PRESET_SECTOR__": preset.sector || "?",
    "__PRESET_STYLE__": preset.style || "?",
    "__PRESET_RECIPE__": preset.recipe || "next-enterprise-monorepo",
    "__BUDGET_MIN__": String(budget[0]),
    "__BUDGET_MAX__": String(budget[1]),
    "__DELIVERY_MIN__": String(delivery[0]),
    "__DELIVERY_MAX__": String(delivery[1]),
    "__ATOM_PALETTE__": firstAtom(atoms.palette),
    "__ATOM_TYPOGRAPHY__": firstAtom(atoms.typography),
    "__ATOM_HEADER__": firstAtom(atoms.header),
    "__ATOM_NAV__": firstAtom(atoms.nav),
    "__ATOM_HERO__": firstAtom(atoms.hero),
    "__ATOM_KPI__": firstAtom(atoms.kpi),
    "__ATOM_FOOTER__": firstAtom(atoms.footer),
    "__ANTI_CLICHE_LIST__": forbiddenMd,
    "__WCAG_TARGET__": (preset.scaffold_hints && preset.scaffold_hints.wcag_contrast_target) || "AA (4.5:1)",
    "__LIGHTHOUSE_TARGET__": String((preset.scaffold_hints && preset.scaffold_hints.lighthouse_target) || 90),
  });
  writeFile(file, text);
}

function patchDocker(outDir, { preset }) {
  const file = path.join(outDir, "docker", "compose.dev.yaml");
  if (!fs.existsSync(file)) return;
  writeFile(file, readFile(file).replace(/__PRESET_ID__/g, preset.id || "preset"));
}

function patchFlyToml(outDir, { preset }) {
  const file = path.join(outDir, "apps", "api", "fly.toml");
  if (!fs.existsSync(file)) return;
  writeFile(file, readFile(file).replace(/__PRESET_ID__/g, preset.id || "preset"));
}

/**
 * walkAndPatch — bir dizindeki tum .ts/.tsx/.css/.json/.md/.toml dosyalarinda
 * replacements'i uygular. node_modules / .next / .turbo / public atlanir.
 */
function walkAndPatch(dir, replacements) {
  const exts = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".css", ".md", ".toml", ".yaml", ".yml"]);
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".turbo", "dist"].includes(entry.name)) continue;
      walkAndPatch(p, replacements);
    } else {
      const ext = path.extname(entry.name);
      if (!exts.has(ext)) continue;
      const raw = readFile(p);
      const patched = replaceAll(raw, replacements);
      if (patched !== raw) writeFile(p, patched);
    }
  }
}

/* ================================================================ */
/*  combo.md generator                                               */
/* ================================================================ */

function writeCombo(outDir, { preset, atoms, ac, palette, fonts, paletteAtom, typoAtom, recipe }) {
  const file = path.join(outDir, "combo.md");
  const budget = preset.budget_range_try || [80000, 250000];
  const delivery = preset.delivery_weeks || [6, 12];

  const forbiddenRow = (label, list) =>
    !list || !list.length
      ? `| ${label} | — |`
      : `| ${label} | \`${list.join("`, `")}\` |`;

  const content = `# ${preset.id || "preset"} — Enterprise Combo

**Kaynak:** \`design-claude/catalog/presets/${preset.id}.yaml\`
**Recipe:** \`${preset.recipe || "next-enterprise-monorepo"}\`
**Uretim:** scaffold-enterprise.js ${new Date().toISOString()}

---

## Preset Metadata

| Alan | Deger |
|------|-------|
| ID | \`${preset.id}\` |
| Sektor | \`${preset.sector || "?"}\` |
| Stil | \`${preset.style || "?"}\` |
| Recipe | \`${preset.recipe || "next-enterprise-monorepo"}\` |
| Tier | \`5 — Enterprise\` |
| Butce | ${budget[0].toLocaleString("tr-TR")} – ${budget[1].toLocaleString("tr-TR")} TL |
| Teslim | ${delivery[0]}–${delivery[1]} hafta |

---

## Atoms (Design Council Onayli)

| Atom | ID |
|------|-----|
| Palette | \`${firstAtom(atoms.palette)}\` |
| Typography | \`${firstAtom(atoms.typography)}\` |
| Header | \`${firstAtom(atoms.header)}\` |
| Nav | \`${firstAtom(atoms.nav)}\` |
| Hero | \`${firstAtom(atoms.hero)}\` |
| KPI | \`${firstAtom(atoms.kpi)}\` |
| Footer | \`${firstAtom(atoms.footer)}\` |

---

## Renk Tokens (Tailwind v4 @theme icinde)

| Token | Deger |
|-------|-------|
| \`--color-bg\` | \`${palette.bg}\` |
| \`--color-ink\` | \`${palette.ink}\` |
| \`--color-accent\` | \`${palette.accent}\` |
| \`--color-muted\` | \`${palette.muted}\` |
| \`--color-surface\` | \`${palette.surface}\` |
| \`--color-border\` | \`${palette.border}\` |

---

## Tipografi

| Token | Font |
|-------|------|
| \`--font-display\` | ${fonts.displayFont} |
| \`--font-body\` | ${fonts.bodyFont} |
| \`--font-mono\` | ${fonts.monoFont} |
| Google URL | \`${fonts.googleUrl || "(yok)"}\` |

---

## Yasakli ID'ler

${ac && Object.keys(ac).length ? [
  forbiddenRow("Palette", ac.forbidden_palettes),
  forbiddenRow("Typography", ac.forbidden_typography),
  forbiddenRow("Hero", ac.forbidden_heroes),
  forbiddenRow("Header", ac.forbidden_headers),
  forbiddenRow("KPI", ac.forbidden_kpi),
  forbiddenRow("Table", ac.forbidden_tables),
  forbiddenRow("Layout", ac.forbidden_layouts),
  forbiddenRow("Motion", ac.forbidden_motion),
  forbiddenRow("Pipeline", ac.forbidden_pipelines),
].join("\n") : "- (yok)"}

---

## Enterprise Tier 5 Zorunluluklari

- [x] Turborepo + pnpm workspaces (monorepo)
- [x] Multi-tenant subdomain routing (\`apps/web/middleware.ts\`)
- [x] Row Level Security (\`packages/db/migrations/0001_init_rls.sql\`)
- [x] Observability uclusu — Sentry + Mixpanel + PostHog
- [x] Audit log + KVKK export/delete endpoints
- [x] Docker Compose local stack (Postgres 16 + Redis 7)
- [x] GitHub Actions CI (lint + typecheck + test + build)
- [x] GitHub Actions CD (Vercel web/admin + Fly.io api + DB migrate)
- [x] 99.9% SLA target (Vercel Pro + Supabase Pro + Fly.io min_machines)

---

## Komut Hizli Referans

\`\`\`bash
pnpm install                # Tum paketler
pnpm docker:up              # Postgres + Redis
pnpm db:generate            # Drizzle migration
pnpm db:push                # Schema → DB
pnpm dev                    # turbo run dev (3 app paralel)
pnpm build                  # Production build
pnpm test                   # Unit + integration
pnpm typecheck              # Her paket
\`\`\`

---

## Mood

${(preset.mood || []).map((m) => `- ${m}`).join("\n") || "- (tanimsiz)"}

---

## Referans

- ULTRAPLAN Bolum 6.5 — Tier 5 Enterprise detay
- Research: monorepo-turborepo-pnpm-2026.md, multi-tenant-whitelabel-saas-2026.md, error-handling-logging-monitoring-2026.md, analytics-tracking-ab-testing-2026.md
- Recipe: catalog/recipes/${preset.recipe || "next-enterprise-monorepo"}.yaml
`;

  writeFile(file, content);
}

main().catch((e) => { log.err(e.message); console.error(e); process.exit(1); });
