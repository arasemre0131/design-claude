#!/usr/bin/env node
/**
 * design-claude scaffold-wp.js — WordPress + Elementor Pro scaffolder
 * ----------------------------------------------------------------
 * Kullanim:
 *   node scaffold-wp.js <preset-id> --out <output-path> [--force]
 *
 * Ornek:
 *   node scaffold-wp.js kuafor-minimal-swiss --out ./kadikoy-freeman-wp/
 *   node scaffold-wp.js restoran-warm-organic --out /tmp/test-wp/ --force
 *
 * Akis:
 *   1. catalog/presets/<preset-id>.yaml oku
 *   2. Recipe kontrol: wordpress-elementor-motion olmali
 *   3. Atom'lari yukle (palette + typography)
 *   4. scaffold/wordpress-elementor/hello-elementor-child/ -> <out>/
 *   5. Dosyalari patch et (style.css, functions.php, templates, vs.)
 *   6. elementor-templates/<preset-id>.json uret
 *   7. README.md + CLAUDE.md patch'le
 *
 * Output: WordPress'e yuklenebilir child theme klasoru + Elementor JSON.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

/* ================================================================ */
/*  Console helpers                                                  */
/* ================================================================ */

const COLORS = {
  reset:   '\x1b[0m',
  bold:    '\x1b[1m',
  red:     '\x1b[31m',
  green:   '\x1b[32m',
  yellow:  '\x1b[33m',
  blue:    '\x1b[34m',
  magenta: '\x1b[35m',
  cyan:    '\x1b[36m'
};

const log = {
  info:   (m) => console.log(`${COLORS.cyan}[i]${COLORS.reset} ${m}`),
  ok:     (m) => console.log(`${COLORS.green}[+]${COLORS.reset} ${m}`),
  warn:   (m) => console.log(`${COLORS.yellow}[!]${COLORS.reset} ${m}`),
  err:    (m) => console.error(`${COLORS.red}[x]${COLORS.reset} ${m}`),
  step:   (n, m) => console.log(`${COLORS.bold}${COLORS.blue}[${n}]${COLORS.reset} ${m}`),
  header: (m) => console.log(`\n${COLORS.bold}${COLORS.magenta}== ${m} ==${COLORS.reset}`)
};

/* ================================================================ */
/*  Lightweight YAML parser (zero deps)                              */
/*  Supports: front-matter "---" blocks, scalars, arrays (inline &    */
/*  block), nested maps, block scalars (|), inline hashes.            */
/* ================================================================ */

function parseYaml(text) {
  text = text.replace(/^\uFEFF/, ''); // BOM
  // Strip "---\n...\n---" front-matter into header + body, merge both
  const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (fmMatch) {
    const header = parseYamlBody(fmMatch[1]);
    const body   = parseYamlBody(fmMatch[2]);
    return Object.assign({}, header, body);
  }
  return parseYamlBody(text);
}

function parseYamlBody(text) {
  const lines = text.split(/\r?\n/);
  const root = {};
  const stack = [{ indent: -1, obj: root, key: null, arr: null }];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    // Skip blank + comment-only lines (preserve # in strings via quote check)
    if (!line.trim() || /^\s*#/.test(line)) continue;

    const indent = line.match(/^ */)[0].length;
    line = line.replace(/\s+#(?=(?:[^"]|"[^"]*")*$).*$/, ''); // strip trailing comment
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Pop stack to current indent
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }
    const top = stack[stack.length - 1];

    // Array item "- "
    if (trimmed.startsWith('- ') || trimmed === '-') {
      const value = trimmed.replace(/^-\s*/, '').trim();
      if (!top.arr) {
        // Promote parent key to array
        if (top.key !== null) {
          top.obj[top.key] = [];
          top.arr = top.obj[top.key];
        }
      }
      if (top.arr == null) continue;
      if (value === '' || value === '{}' || value === '[]') {
        const newObj = {};
        top.arr.push(newObj);
        stack.push({ indent, obj: newObj, key: null, arr: null });
      } else if (/^[\w-]+:/.test(value)) {
        // "- key: val" inline object
        const inlineObj = {};
        top.arr.push(inlineObj);
        const [iK, ...iRest] = value.split(':');
        const iVal = iRest.join(':').trim();
        inlineObj[iK.trim()] = parseScalar(iVal);
        stack.push({ indent, obj: inlineObj, key: null, arr: null });
      } else {
        top.arr.push(parseScalar(value));
      }
      continue;
    }

    // Key: value
    const kvMatch = trimmed.match(/^([^:]+?):\s*(.*)$/);
    if (!kvMatch) continue;
    const key = kvMatch[1].trim();
    let value = kvMatch[2].trim();

    if (value === '' || value === '>' || value === '|' || value === '|-' || value === '>-') {
      // Block scalar or nested
      const blockStyle = (value === '|' || value === '|-');
      const blockLines = [];
      let j = i + 1;
      while (j < lines.length) {
        const peek = lines[j];
        if (peek.trim() === '' && !blockStyle) { j++; continue; }
        const peekIndent = peek.match(/^ */)[0].length;
        if (peekIndent <= indent && peek.trim() !== '') break;
        if (peek.trim() === '') { blockLines.push(''); j++; continue; }
        blockLines.push(peek.substring(indent + 2));
        j++;
      }

      // Detect if first child is "- " or "key:"
      if (blockStyle || value === '>' || value === '>-') {
        // Block scalar
        top.obj[key] = blockLines.join(blockStyle ? '\n' : ' ').trim();
        i = j - 1;
      } else {
        // Nested map / array — recurse by pushing stack
        const firstChild = blockLines.find((l) => l.trim());
        if (firstChild && firstChild.trim().startsWith('- ')) {
          top.obj[key] = [];
          stack.push({ indent, obj: top.obj, key, arr: top.obj[key] });
        } else {
          top.obj[key] = {};
          stack.push({ indent, obj: top.obj[key], key: null, arr: null });
        }
      }
      continue;
    }

    // Scalar value
    top.obj[key] = parseScalar(value);
  }

  return root;
}

function parseScalar(val) {
  if (val === undefined || val === null) return null;
  val = String(val).trim();
  if (val === '' || val === '~' || val === 'null') return null;
  if (val === 'true')  return true;
  if (val === 'false') return false;

  // Inline array [a, b, c] or [a,b]
  if (val.startsWith('[') && val.endsWith(']')) {
    const inner = val.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(',').map((s) => parseScalar(s.trim()));
  }

  // Inline map {a: 1, b: 2}
  if (val.startsWith('{') && val.endsWith('}')) {
    const inner = val.slice(1, -1).trim();
    const obj = {};
    if (!inner) return obj;
    inner.split(',').forEach((pair) => {
      const [k, ...r] = pair.split(':');
      if (k) obj[k.trim()] = parseScalar((r.join(':') || '').trim());
    });
    return obj;
  }

  // Quoted strings
  if ((val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1);
  }

  // Numbers
  if (/^-?\d+$/.test(val)) return parseInt(val, 10);
  if (/^-?\d+\.\d+$/.test(val)) return parseFloat(val);

  return val;
}

function readYaml(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`YAML bulunamadi: ${filePath}`);
  }
  return parseYaml(fs.readFileSync(filePath, 'utf8'));
}

/* ================================================================ */
/*  Args                                                             */
/* ================================================================ */

function parseArgs(argv) {
  const args = { preset: null, out: null, force: false, help: false };
  const rest = argv.slice(2);
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === '-h' || a === '--help')  args.help = true;
    else if (a === '--out' || a === '-o') args.out = rest[++i];
    else if (a === '--force' || a === '-f') args.force = true;
    else if (!a.startsWith('-') && !args.preset) args.preset = a;
  }
  return args;
}

function printHelp() {
  console.log(`
${COLORS.bold}scaffold-wp.js — WordPress + Elementor scaffolder${COLORS.reset}

Usage:
  node scaffold-wp.js <preset-id> --out <path> [options]

Examples:
  node scaffold-wp.js kuafor-minimal-swiss --out ./kadikoy-freeman-wp/
  node scaffold-wp.js restoran-warm-organic --out /tmp/test-wp/ --force

Options:
  <preset-id>        Preset ID (catalog/presets/<id>.yaml)
  --out, -o <path>   Cikti dizini (zorunlu)
  --force, -f        Hedef doluysa sil ve yeniden yaz
  -h, --help         Bu yardim

Requires:
  Preset'in recipe alani 'wordpress-elementor-motion' olmali.
  Baska recipe icin scaffold.js (Next.js) kullan.
`);
}

/* ================================================================ */
/*  Paths                                                            */
/* ================================================================ */

const ROOT          = path.resolve(__dirname, '..', '..');
const CATALOG       = path.join(ROOT, 'catalog');
const BASE_THEME    = path.join(__dirname, 'hello-elementor-child');
const BASE_TEMPLATE = path.join(__dirname, 'elementor-templates', '_template.json');

const presetPath  = (id) => path.join(CATALOG, 'presets',  `${id}.yaml`);
const recipePath  = (id) => path.join(CATALOG, 'recipes',  `${id}.yaml`);
const atomPath    = (cat, id) => path.join(CATALOG, 'atoms', cat, `${id}.yaml`);

/* ================================================================ */
/*  FS helpers                                                       */
/* ================================================================ */

function ensureDir(d) { fs.mkdirSync(d, { recursive: true }); }

function rmRecursive(t) {
  if (!fs.existsSync(t)) return;
  fs.rmSync(t, { recursive: true, force: true });
}

function copyDir(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', '.next'].includes(entry.name)) continue;
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

const readFile  = (p) => fs.readFileSync(p, 'utf8');
const writeFile = (p, c) => { ensureDir(path.dirname(p)); fs.writeFileSync(p, c, 'utf8'); };

/* ================================================================ */
/*  Color + font helpers                                             */
/* ================================================================ */

function extractHex(s) {
  if (!s) return null;
  const m = String(s).match(/#[0-9A-Fa-f]{3,8}/);
  return m ? m[0] : String(s).trim();
}

function resolvePalette(atom) {
  const bg        = extractHex(atom.bg)        || '#FFFFFF';
  const ink       = extractHex(atom.ink)       || '#0A0A0A';
  const accent    = extractHex(atom.accent)    || '#6366F1';
  const secondary = extractHex(atom.ikincil)   || accent;
  const muted     = hexAlpha(ink, 0.55) || '#999999';
  const surface   = bg;
  const border    = hexAlpha(ink, 0.12) || '#E5E5E5';
  return { bg, ink, accent, secondary, muted, surface, border };
}

function hexAlpha(hex, a) {
  if (!hex || !hex.startsWith('#')) return null;
  const clean = hex.replace('#', '');
  if (clean.length !== 6 && clean.length !== 3) return null;
  const expanded = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const alphaHex = Math.round(a * 255).toString(16).padStart(2, '0');
  return '#' + expanded + alphaHex;
}

function extractFontName(raw) {
  if (!raw) return null;
  // Strip "(variable ...)" parens and take first font if "+" separated
  var clean = String(raw).replace(/\s*\(.*\)\s*$/, '').trim();
  if (clean.indexOf(' + ') !== -1) clean = clean.split(' + ')[0].trim();
  // Strip trailing weight-only label ("Space Grotesk 900" -> "Space Grotesk")
  clean = clean.replace(/\s+\d{3,4}$/, '').trim();
  return clean;
}

function buildGoogleFontsUrl(query) {
  if (!query) return null;
  const clean = String(query).trim().replace(/^family=/, '');
  return `https://fonts.googleapis.com/css2?family=${clean}&display=swap`;
}

/* ================================================================ */
/*  Preset ID -> PHP-safe prefixes                                   */
/* ================================================================ */

function presetToSlug(id)          { return id.replace(/[^\w-]/g, '_').replace(/-/g, '_'); }
function presetToFnPrefix(id)      { return 'dc_' + presetToSlug(id); }
function presetToConstPrefix(id)   { return 'DC_' + presetToSlug(id).toUpperCase(); }

/* ================================================================ */
/*  Patch engine                                                     */
/* ================================================================ */

/**
 * Global replacement applied to every patched file.
 * Preset, palette, typography placeholders all replaced here.
 */
function buildReplacements(ctx) {
  const { preset, palette, fonts, paletteId, typoId, schemaType, heroContent, fnPrefix, constPrefix } = ctx;

  return {
    '__PRESET_ID__':            preset.id || 'preset',
    '__PRESET_SECTOR__':        preset.sector || '',
    '__PRESET_STYLE__':         preset.style || '',
    '__PRESET_RECIPE__':        preset.recipe || 'wordpress-elementor-motion',
    '__PRESET_TIER__':          preset.tier || 'budget',

    '__PRESET_FN_PREFIX__':     fnPrefix,
    '__PRESET_CONST_PREFIX__':  constPrefix,
    '__PRESET_LOCALIZE__':      `${constPrefix}_CFG`,

    '__PALETTE_ID__':           paletteId || '',
    '__TYPOGRAPHY_ID__':        typoId || '',

    '__COLOR_BG__':             palette.bg,
    '__COLOR_INK__':            palette.ink,
    '__COLOR_ACCENT__':         palette.accent,
    '__COLOR_SECONDARY__':      palette.secondary,
    '__COLOR_MUTED__':          palette.muted,
    '__COLOR_SURFACE__':        palette.surface,
    '__COLOR_BORDER__':         palette.border,

    '__FONT_DISPLAY__':         fonts.display,
    '__FONT_BODY__':            fonts.body,
    '__FONT_MONO__':            fonts.mono,
    '__FONT_GOOGLE_URL__':      fonts.googleUrl || '(none)',

    '__PRIMARY_CTA__':          heroContent.primaryCta,
    '__SECONDARY_CTA__':        heroContent.secondaryCta,
    '__HERO_HEADLINE__':        heroContent.headline,
    '__HERO_SUBHEADLINE__':     heroContent.subheadline,
    '__SCHEMA_TYPE__':          schemaType,
    '__GENERATED_AT__':         new Date().toISOString()
  };
}

function applyReplacements(text, replacements) {
  let out = text;
  for (const [key, val] of Object.entries(replacements)) {
    const safe = String(val == null ? '' : val);
    out = out.split(key).join(safe);
  }
  return out;
}

function patchFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  const before = readFile(filePath);
  const after = applyReplacements(before, replacements);
  if (before !== after) writeFile(filePath, after);
}

/**
 * Walk whole child theme directory and patch every text file.
 * Binary-safe (skip extensions).
 */
const PATCHABLE_EXT = new Set([
  '.css', '.php', '.js', '.json', '.md', '.html', '.txt', '.xml', '.pot'
]);

function patchTree(dir, replacements) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) { patchTree(p, replacements); continue; }
    const ext = path.extname(entry.name).toLowerCase();
    if (!PATCHABLE_EXT.has(ext)) continue;
    patchFile(p, replacements);
  }
}

/* ================================================================ */
/*  Hero content + schema inference                                  */
/* ================================================================ */

function inferHeroContent(preset) {
  const hints = preset.scaffold_hints || {};
  const sector = preset.sector || '';
  const style  = preset.style  || '';

  const defaults = {
    headline:     `${capitalize(sector)} — Doğru bir tercih.`,
    subheadline:  'Kaliteli hizmet, güvenilir ekip, net fiyat.',
    primaryCta:   hints.primary_cta   || 'İletişime Geç',
    secondaryCta: hints.secondary_cta || 'Daha Fazla Bilgi'
  };

  const sectorHeadlines = {
    kuafor:       ['Salon deneyimini yeniden düşündük.', 'Randevunuzu 30 saniyede alın.'],
    restoran:     ['Masa keyfi, damak zevki.', 'Rezervasyon açık.'],
    kuyumcu:      ['Zamansız tasarımlar.', 'El işi. Ömürlük.'],
    mucevher:     ['El işi pırlanta, zamansız tasarım.', 'Koleksiyon.'],
    spa:          ['Nefes alın. Yavaşlayın.', 'Ritüel, bakım ve masaj.'],
    klinik:       ['Sağlığınızda bir fark.', 'Uzman kadro, yeni teknoloji.'],
    otel:         ['Yolculuğun tadını çıkarın.', 'Rezervasyonunuzu bugün yapın.'],
    fotograf:     ['Anı görüntüye çevirmek.', 'Portfolyoya göz atın.'],
    insaat:       ['Zamanında, bütçede, söz verdiğimiz gibi.', 'Proje portföyü.'],
    gayrimenkul:  ['Doğru yatırımı bulmak.', 'Güncel portföy.'],
    eticaret:     ['Tek tıkla kapınızda.', 'Yeni sezon kataloğu.']
  };

  if (sectorHeadlines[sector]) {
    defaults.headline    = sectorHeadlines[sector][0];
    defaults.subheadline = sectorHeadlines[sector][1];
  }

  if (hints.headline)       defaults.headline = hints.headline;
  if (hints.subheadline)    defaults.subheadline = hints.subheadline;

  return defaults;
}

function inferSchemaType(preset) {
  const map = {
    kuafor:       'HairSalon',
    berber:       'BarberShop',
    restoran:     'Restaurant',
    kuyumcu:      'JewelryStore',
    mucevher:     'JewelryStore',
    spa:          'DaySpa',
    klinik:       'MedicalClinic',
    dis:          'Dentist',
    otel:         'Hotel',
    fotograf:     'LocalBusiness',
    insaat:       'GeneralContractor',
    gayrimenkul:  'RealEstateAgent',
    eticaret:     'Store'
  };
  return map[preset.sector] || 'LocalBusiness';
}

function capitalize(s) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ================================================================ */
/*  Elementor template JSON generator                                */
/* ================================================================ */

function generateElementorJson(ctx, outPath) {
  const base = readFile(BASE_TEMPLATE);
  const replacements = buildReplacements(ctx);
  const patched = applyReplacements(base, replacements);

  // Validate as JSON (catch placeholder leaks)
  try { JSON.parse(patched); }
  catch (e) {
    log.warn(`Elementor JSON parse warning: ${e.message}`);
  }

  writeFile(outPath, patched);
}

/* ================================================================ */
/*  Generate preset-specific CLAUDE.md and README.md at root of out  */
/* ================================================================ */

function generateProjectReadme(outDir, ctx) {
  const { preset, palette, fonts, paletteId, typoId } = ctx;
  const budget = preset.budget_range_try || [7500, 15000];
  const delivery = preset.delivery_weeks || [0.5, 1];

  const md = `# ${preset.id} — WordPress + Elementor Pro

**Sektor:** ${preset.sector}  |  **Stil:** ${preset.style}
**Recipe:** wordpress-elementor-motion (Budget Tier)
**Butce:** ${budget[0].toLocaleString('tr-TR')} - ${budget[1].toLocaleString('tr-TR')} TL
**Teslim:** ${delivery[0]}-${delivery[1]} hafta (3-7 gun)

---

## Hizli Kurulum

### 1. WordPress + Hello Elementor yukle

\`\`\`bash
# Hosting uzerinde WP yukle (Softaculous, manual vs.)
# cPanel > Softaculous Apps Installer > WordPress > Install
\`\`\`

Tema: **Appearance > Themes > Add New > Search "Hello Elementor" > Install**

### 2. Child theme'i yukle

\`\`\`bash
cd ${preset.id}-wp/
zip -r ${preset.id}-child.zip hello-elementor-child/
# ya da FTP ile wp-content/themes/ altina klasoru kopyala
\`\`\`

**Appearance > Themes > Add New > Upload Theme** > \`${preset.id}-child.zip\` > Activate

### 3. Gerekli plugin'ler

| Plugin | Zorunlu | Not |
|--------|:-------:|-----|
| Elementor | ✓ | Ana page builder (ücretsiz) |
| Elementor Pro | ✓ | Theme Builder + Forms + Motion |
| Rank Math SEO | ✓ | Meta + schema |
| WPForms Lite | opsiyonel | Alternatif form plugin'i |
| WP Rocket | opsiyonel | Cache + perf |
| Wordfence | ✓ | Güvenlik + 2FA |
| Limit Login Attempts Reloaded | ✓ | Brute force koruması |

### 4. Elementor template import

\`\`\`
WP Admin > Templates > Saved Templates > Import Templates
-> elementor-templates/${preset.id}.json seç > Import Now
\`\`\`

Sonra yeni sayfa > Edit with Elementor > My Templates > Insert.

### 5. WordPress options set

WP Admin > Settings > General altında aşağıdakileri doldur:

| Option key | Örnek deger |
|------------|-------------|
| \`${preset.id}_phone\` | +905555555555 |
| \`${preset.id}_phone_display\` | +90 555 555 55 55 |
| \`${preset.id}_email\` | info@example.com |
| \`${preset.id}_address\` | Caddebostan Mah. İstanbul |
| \`${preset.id}_whatsapp_number\` | 905555555555 |
| \`${preset.id}_whatsapp_message\` | Merhaba, siteden yazıyorum. |

Options'ı set etmek için \`wp option set ${preset.id}_phone "+905555555555"\` ya da "Advanced Custom Fields" / "Options Tree" plugin'i kullanılabilir.

---

## Design Tokens

### Palette (${paletteId})

| Token | Hex |
|-------|-----|
| \`--bg\` | \`${palette.bg}\` |
| \`--ink\` | \`${palette.ink}\` |
| \`--accent\` | \`${palette.accent}\` |
| \`--accent-2\` | \`${palette.secondary}\` |
| \`--muted\` | \`${palette.muted}\` |
| \`--surface\` | \`${palette.surface}\` |
| \`--line\` | \`${palette.border}\` |

### Typography (${typoId})

- Display: \`${fonts.display}\`
- Body: \`${fonts.body}\`
- Mono: \`${fonts.mono}\`
- Google Fonts URL: ${fonts.googleUrl || '(none)'}

---

## Animasyon Patternleri

Child theme 6 ücretsiz pattern içerir (wab-safe-animations.js):

1. **Lenis + GSAP ticker bridge** — smooth scroll + ScrollTrigger sync
2. **Blur-36px reveal** — \`data-wab-blur-reveal\`
3. **Magnetic elastic hover** — \`data-wab-magnetic\`
4. **Mask-y reveal** — \`data-wab-mask-y\`
5. **Theme switch on scroll** — \`data-wab-theme="dark"\`
6. **wabSplit DIY SplitText** — GSAP SplitText'in ücretsiz alternatifi

Elementor widget'inda **Advanced > Attributes** alanına şöyle ekle:

\`\`\`
data-wab-blur-reveal|
data-blur-type|chars
data-blur-duration|1.2
\`\`\`

---

## Deploy

\`\`\`bash
# 1. Theme zip
cd ${preset.id}-wp/
zip -r ${preset.id}-child.zip hello-elementor-child/

# 2. cPanel'e yukle ya da FTP ile
# wp-content/themes/${preset.id}-child/ altına aç

# 3. SSH + WP-CLI varsa:
wp theme activate ${preset.id}-child
wp option update blogname "${preset.sector} Site"
\`\`\`

---

## Güvenlik Kontrol Listesi

- [ ] \`wp-config.php\` \`DISALLOW_FILE_EDIT = true\` (functions.php otomatik ekler)
- [ ] Wordfence 2FA aktif
- [ ] Limit Login Attempts kurulmuş
- [ ] HTTPS zorunlu (.htaccess redirect)
- [ ] \`/wp-admin\` Cloudflare Access veya htpasswd arkasında
- [ ] XML-RPC kapalı (functions.php otomatik)
- [ ] DB backup haftalık (UpdraftPlus)
- [ ] KVKK banner görünüyor
- [ ] KVKK Aydınlatma Metni sayfası yayında

---

## Mobile Lighthouse Hedefleri

Target: Mobile Lighthouse >= 90

| Metrik | Hedef |
|--------|-------|
| Performance | >= 90 |
| Accessibility | >= 95 |
| Best Practices | >= 95 |
| SEO | >= 95 |

Performance ipuçları:
- WP Rocket aktifleştir (veya W3 Total Cache)
- Cloudflare proxy (free tier)
- Image: WebP + lazy load
- Elementor > Advanced > Disable Color/Font Defaults (küçük boyut)
- GSAP + Lenis \`defer\` ile yüklü (functions.php otomatik)

---

## Dokuman

- **Elementor template**: \`elementor-templates/${preset.id}.json\`
- **CLAUDE.md**: Claude/Emre için proje-ozel kurallar
- **Preset kataloğu**: \`catalog/presets/${preset.id}.yaml\`
- **Recipe**: \`catalog/recipes/wordpress-elementor-motion.yaml\`

## Kanıt referansları

- fraxbit.com — Awwwards Honorable Mention, Elementor + GSAP
- wearebrand.io — Awwwards SOTD, WordPress + Lenis + custom anim

Generated: ${new Date().toISOString()}
`;

  writeFile(path.join(outDir, 'README.md'), md);
}

function generateProjectClaudeMd(outDir, ctx) {
  const { preset, paletteId, typoId } = ctx;
  const atoms = preset.atoms || {};
  const antiCliche = preset.anti_cliche || {};
  const firstAtom = (v) => (Array.isArray(v) ? v[0] : v) || '';

  const allForbidden = []
    .concat(antiCliche.forbidden_palettes || [])
    .concat(antiCliche.forbidden_typography || [])
    .concat(antiCliche.forbidden_heroes || [])
    .concat(antiCliche.forbidden_headers || [])
    .concat(antiCliche.forbidden_kpi || [])
    .concat(antiCliche.forbidden_motion || []);

  const md = `# CLAUDE.md — ${preset.id}

## Proje

- **Preset ID:** ${preset.id}
- **Sektor:** ${preset.sector}
- **Stil:** ${preset.style}
- **Recipe:** wordpress-elementor-motion (Budget Tier, 7.5-15K TL)
- **Platform:** WordPress 6.9+ + Elementor Pro 3.35+ + Hello Elementor child
- **Motion:** GSAP 3.13 + Lenis 1.3.4 + wab-safe-animations.js (6 MIT-safe pattern)

## Atoms (Design Council Onayli)

| Rol | ID |
|-----|-----|
| Palette | \`${paletteId}\` |
| Typography | \`${typoId}\` |
| Hero | \`${firstAtom(atoms.hero)}\` |
| Header | \`${firstAtom(atoms.header)}\` |
| Nav | \`${firstAtom(atoms.nav)}\` |
| KPI | \`${firstAtom(atoms.kpi)}\` |
| Footer | \`${firstAtom(atoms.footer)}\` |

## YASAKLI ID'LER (kullanma)

${allForbidden.length ? allForbidden.map((id) => `- \`${id}\``).join('\n') : '- (yok)'}

## WordPress-Specific Kurallar

1. **Gutenberg kapali** — functions.php \`use_block_editor_for_post\` filter false.
2. **Elementor-first** — her sayfa Elementor template'inden doğar.
3. **Hello Elementor parent** — style.css \`Template: hello-elementor\` zorunlu.
4. **functions.php enqueue sırası:**
   - Parent style > child style > custom CSS > GSAP > Lenis > wab-anim > main.js
5. **CSS var pattern** — Her renk \`var(--bg)\`, \`var(--ink)\`, \`var(--accent)\` olarak kullanılır. Hard-coded hex YASAK.
6. **Animasyon markup** — Elementor widget > Advanced > Attributes alanına \`data-wab-*\` attribute'ları eklenir.
7. **KVKK banner** — functions.php otomatik gösterir. Kapatilamaz (yasal).
8. **Güvenlik:**
   - XML-RPC kapalı (functions.php otomatik)
   - \`/wp-admin\` 2FA (Wordfence)
   - DISALLOW_FILE_EDIT true
   - Limit Login Attempts Reloaded plugin kurulu olmalı
9. **Performans:**
   - GSAP + Lenis \`defer\` ile yüklenir
   - Google Fonts preload + display=swap
   - WP Rocket önerilir (opsiyonel)
10. **Schema:** functions.php otomatik \`${inferSchemaType(preset)}\` JSON-LD ekler.

## Kod Stili

- PHP: WordPress Coding Standards (WPCS)
- JS: Vanilla ES5+ (Elementor frontend bundled jQuery de var ama bağımlılık kurma)
- CSS: BEM benzeri (\`.site-header__inner\`), CSS var token'ları preset'ten

## Degisiklik Yapmadan Once

1. \`catalog/presets/${preset.id}.yaml\` dosyasını oku (bu proje için geçerli kurallar orada)
2. Atom dosyalarını oku (palette + typography + hero)
3. Yasaklı ID listesini kontrol et
4. Emre'ye onay aldıktan sonra kod yaz

## Delivery Workflow

\`\`\`
1. node scaffold-wp.js ${preset.id} --out <out-path>
2. <out-path>/hello-elementor-child/ zip'le
3. WP admin > Themes > Upload > Activate
4. Plugins: Elementor Pro, Rank Math, Wordfence, UpdraftPlus
5. Elementor templates > Import <preset-id>.json
6. WP options > Settings'e telefon/email/adres doldur
7. Rank Math > schema + sitemap yapılandır
8. Cloudflare proxy önerisi
9. Test: mobil Lighthouse + WCAG AA
10. Müşteriye teslim + admin eğitimi
\`\`\`

Generated: ${new Date().toISOString()}
`;

  writeFile(path.join(outDir, 'CLAUDE.md'), md);
}

/* ================================================================ */
/*  Main                                                             */
/* ================================================================ */

async function main() {
  const args = parseArgs(process.argv);

  if (args.help || !args.preset) {
    printHelp();
    process.exit(args.help ? 0 : 1);
  }
  if (!args.out) {
    log.err('--out <path> parametresi zorunlu');
    printHelp();
    process.exit(1);
  }

  log.header(`scaffold-wp.js -> ${args.preset}`);

  // 1. Preset
  log.step(1, `Preset yukleniyor: ${args.preset}`);
  const preset = readYaml(presetPath(args.preset));
  log.ok(`${preset.id} (${preset.sector} x ${preset.style})`);

  // 2. Recipe guard
  log.step(2, 'Recipe kontrol');
  const requiredRecipe = 'wordpress-elementor-motion';
  if (preset.recipe !== requiredRecipe) {
    log.err(`Bu scaffolder sadece '${requiredRecipe}' recipe'i destekler.`);
    log.err(`Preset recipe: '${preset.recipe}'`);
    log.info(`Next.js preset'leri icin: node scaffold.js ${preset.id} --out ...`);
    process.exit(1);
  }
  log.ok(`recipe OK: ${requiredRecipe}`);

  // Recipe meta
  let recipe = {};
  try { recipe = readYaml(recipePath(requiredRecipe)); } catch (e) { log.warn(`Recipe dosyasi okunamadi: ${e.message}`); }

  // 3. Atoms
  log.step(3, 'Atoms yukleniyor');
  const atoms = preset.atoms || {};
  const paletteId = atoms.palette;
  const typoId    = atoms.typography;
  if (!paletteId || !typoId) {
    log.err('preset.atoms.palette ve preset.atoms.typography zorunlu');
    process.exit(1);
  }
  const paletteAtom = readYaml(atomPath('palette', paletteId));
  const typoAtom    = readYaml(atomPath('typography', typoId));
  const palette = resolvePalette(paletteAtom);
  const fonts = {
    display: extractFontName(typoAtom.display_font) || 'Inter',
    body:    extractFontName(typoAtom.body_font) || 'Inter',
    mono:    extractFontName(typoAtom.mono_font) || 'JetBrains Mono',
    googleUrl: buildGoogleFontsUrl(typoAtom.google_fonts)
  };
  log.ok(`palette ${paletteId}: bg=${palette.bg} ink=${palette.ink} accent=${palette.accent}`);
  log.ok(`typography ${typoId}: display=${fonts.display} body=${fonts.body}`);

  // 4. Anti-cliche check
  log.step(4, 'Anti-cliche kontrolu');
  const antiCliche = preset.anti_cliche || {};
  const forbiddenList = []
    .concat(antiCliche.forbidden_palettes || [])
    .concat(antiCliche.forbidden_typography || [])
    .concat(antiCliche.forbidden_heroes || [])
    .concat(antiCliche.forbidden_headers || [])
    .concat(antiCliche.forbidden_kpi || [])
    .concat(antiCliche.forbidden_motion || []);
  const usedAtoms = Object.values(atoms).flatMap((v) => Array.isArray(v) ? v : [v]);
  const violations = usedAtoms.filter((a) => forbiddenList.includes(a));
  if (violations.length) {
    log.warn(`Yasakli ID ihlali: ${violations.join(', ')}`);
  } else {
    log.ok(`Temiz (${forbiddenList.length} yasakli ID kontrol edildi)`);
  }

  // 5. Copy base theme
  log.step(5, `Child theme kopyalaniyor -> ${args.out}`);
  const outDir = path.resolve(args.out);
  const themeDir = path.join(outDir, 'hello-elementor-child');
  if (fs.existsSync(outDir) && fs.readdirSync(outDir).length > 0) {
    if (!args.force) {
      log.err(`Hedef dolu: ${outDir}. --force kullan veya temizle.`);
      process.exit(1);
    }
    log.warn('--force aktif, dizin siliniyor');
    rmRecursive(outDir);
  }
  copyDir(BASE_THEME, themeDir);
  log.ok(`Kopyalandi: ${themeDir}`);

  // 6. Build context + patch every file
  log.step(6, 'Dosyalar patch ediliyor');
  const heroContent = inferHeroContent(preset);
  const schemaType = inferSchemaType(preset);
  const fnPrefix    = presetToFnPrefix(preset.id);
  const constPrefix = presetToConstPrefix(preset.id);

  const ctx = {
    preset, palette, fonts, paletteId, typoId,
    schemaType, heroContent, fnPrefix, constPrefix
  };
  const replacements = buildReplacements(ctx);

  patchTree(themeDir, replacements);
  log.ok(`Patch: style.css, functions.php, header.php, footer.php, templates/, assets/ (${countPatchable(themeDir)} file)`);

  // 7. Elementor JSON
  log.step(7, 'Elementor homepage template uretiliyor');
  const elementorDir = path.join(outDir, 'elementor-templates');
  ensureDir(elementorDir);
  const jsonOut = path.join(elementorDir, `${preset.id}.json`);
  generateElementorJson(ctx, jsonOut);
  // Also copy importer README
  const readmeSrc = path.join(__dirname, 'elementor-templates', 'README.md');
  if (fs.existsSync(readmeSrc)) {
    fs.copyFileSync(readmeSrc, path.join(elementorDir, 'README.md'));
  }
  log.ok(`Uretildi: ${jsonOut}`);

  // 8. Root README + CLAUDE.md
  log.step(8, 'Proje README.md + CLAUDE.md uretiliyor');
  generateProjectReadme(outDir, ctx);
  generateProjectClaudeMd(outDir, ctx);
  log.ok('Dokuman hazir');

  // 9. combo.md (design-claude tradition)
  log.step(9, 'combo.md yaziliyor');
  writeComboMd(outDir, preset, atoms, antiCliche, palette, fonts, paletteAtom, typoAtom);
  log.ok('combo.md hazir');

  // Done
  log.header('BASARILI');
  console.log(`
${COLORS.green}${COLORS.bold}WordPress child theme hazir:${COLORS.reset} ${outDir}

${COLORS.bold}Sonraki adimlar:${COLORS.reset}
  1. Zip olustur:
     ${COLORS.cyan}cd ${args.out}${COLORS.reset}
     ${COLORS.cyan}zip -r ${preset.id}-child.zip hello-elementor-child/${COLORS.reset}
  2. WP Admin > Themes > Upload > Activate
  3. Plugin: Elementor Pro, Rank Math, Wordfence, UpdraftPlus
  4. Templates > Import > elementor-templates/${preset.id}.json
  5. README.md dosyasini oku (detayli kurulum)
  6. CLAUDE.md dosyasini oku (proje-ozel kurallar)
`);
}

function countPatchable(dir) {
  let n = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) { n += countPatchable(p); continue; }
    if (PATCHABLE_EXT.has(path.extname(entry.name).toLowerCase())) n++;
  }
  return n;
}

/* ================================================================ */
/*  combo.md                                                         */
/* ================================================================ */

function writeComboMd(outDir, preset, atoms, antiCliche, palette, fonts, paletteAtom, typoAtom) {
  const arr = (v) => (Array.isArray(v) ? v : v ? [v] : []);
  const budget = preset.budget_range_try || [7500, 15000];
  const delivery = preset.delivery_weeks || [0.5, 1];

  const content = `# ${preset.id} — Combo (WordPress + Elementor)

**Kaynak:** \`design-claude/catalog/presets/${preset.id}.yaml\`
**Recipe:** wordpress-elementor-motion
**Uretim:** scaffold-wp.js ${new Date().toISOString()}

## Preset

| Alan | Deger |
|------|-------|
| ID | \`${preset.id}\` |
| Sektor | \`${preset.sector}\` |
| Stil | \`${preset.style}\` |
| Tier | \`budget\` |
| Butce | ${budget[0].toLocaleString('tr-TR')} - ${budget[1].toLocaleString('tr-TR')} TL |
| Teslim | ${delivery[0]}-${delivery[1]} hafta |

## Atoms

| Rol | ID | Aciklama |
|-----|-----|----------|
| Palette | \`${atoms.palette || '-'}\` | ${paletteAtom.name || '-'} |
| Typography | \`${atoms.typography || '-'}\` | ${typoAtom.name || '-'} |
| Header | \`${(Array.isArray(atoms.header) ? atoms.header[0] : atoms.header) || '-'}\` | - |
| Nav | \`${(Array.isArray(atoms.nav) ? atoms.nav[0] : atoms.nav) || '-'}\` | - |
| Hero | \`${(Array.isArray(atoms.hero) ? atoms.hero[0] : atoms.hero) || '-'}\` | - |
| KPI | \`${(Array.isArray(atoms.kpi) ? atoms.kpi[0] : atoms.kpi) || '-'}\` | - |
| Footer | \`${(Array.isArray(atoms.footer) ? atoms.footer[0] : atoms.footer) || '-'}\` | - |

## Palette

| Token | Hex |
|-------|-----|
| \`--bg\` | \`${palette.bg}\` |
| \`--ink\` | \`${palette.ink}\` |
| \`--accent\` | \`${palette.accent}\` |
| \`--accent-2\` | \`${palette.secondary}\` |
| \`--muted\` | \`${palette.muted}\` |
| \`--surface\` | \`${palette.surface}\` |
| \`--line\` | \`${palette.border}\` |

## Typography

- Display: \`${fonts.display}\`
- Body: \`${fonts.body}\`
- Mono: \`${fonts.mono}\`
- Google Fonts URL: ${fonts.googleUrl || '(none)'}

## YASAKLI ID'LER

${arr(antiCliche.forbidden_palettes).concat(arr(antiCliche.forbidden_typography), arr(antiCliche.forbidden_heroes), arr(antiCliche.forbidden_headers), arr(antiCliche.forbidden_kpi), arr(antiCliche.forbidden_motion)).map(id => `- \`${id}\``).join('\n') || '- (yok)'}

${antiCliche.warning ? `## Uyari\n\n${antiCliche.warning}` : ''}

## Sonraki adimlar

1. Child theme zip olustur
2. WP admin > Themes > Upload + Activate
3. Plugin: Elementor Pro, Rank Math, Wordfence
4. Elementor template import
5. WP options set
6. Test mobil + Lighthouse
7. Deploy + teslim
`;

  writeFile(path.join(outDir, 'combo.md'), content);
}

/* ================================================================ */
/*  Entry                                                            */
/* ================================================================ */

main().catch((e) => {
  log.err(`Hata: ${e.message}`);
  if (process.env.DEBUG) console.error(e.stack);
  process.exit(1);
});
