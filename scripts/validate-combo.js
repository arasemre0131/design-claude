#!/usr/bin/env node
/**
 * validate-combo.js — design-claude combo/preset validator
 *
 * USAGE:
 *   node scripts/validate-combo.js catalog/presets/mucevher-editorial-luxury.yaml
 *   node scripts/validate-combo.js insaat-crm/combo.md
 *   node scripts/validate-combo.js <path>
 *
 * CHECKS:
 *   1. Yasaklı pathway ID'leri (TY1, TY2, TY4, TY8, PL1, K1, HR2, H8, HR7, P1, T6, CH1, CH2)
 *   2. Repeat skor — 13 mevcut proje ile 15 kolon karşılaştırma
 *   3. Sektör-stil uyumluluk (compatibility.yaml forbidden_combinations)
 *   4. Türkçe karakter font desteği (atom YAML'ından turkish_support)
 *   5. A11y hızlı check — palette kontrast ≥ 4.5 + prefers-reduced-motion
 *
 * OUTPUT: stdout'a PASS/WARN/FAIL raporu, exit code 0 (PASS) veya 1 (FAIL)
 *
 * DEPENDENCIES:
 *   npm install js-yaml
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ---------- Dependency check ---------- //
let yaml;
try {
  yaml = require('js-yaml');
} catch (err) {
  console.error('[ERROR] js-yaml paketi bulunamadı. Kurulum:');
  console.error('        npm install js-yaml');
  process.exit(2);
}

// ---------- CLI arg ---------- //
const inputFile = process.argv[2];
if (!inputFile) {
  console.error('[USAGE] node scripts/validate-combo.js <combo.md | preset.yaml>');
  process.exit(2);
}

const absInput = path.isAbsolute(inputFile)
  ? inputFile
  : path.resolve(process.cwd(), inputFile);

if (!fs.existsSync(absInput)) {
  console.error(`[ERROR] Dosya bulunamadı: ${absInput}`);
  process.exit(2);
}

// ---------- Repo root detection ---------- //
// Script config'e göre repo root'u scripts/'ın parent'ı olsun
const REPO_ROOT = path.resolve(__dirname, '..');
const CATALOG_DIR = path.join(REPO_ROOT, 'catalog');

// ---------- 1. Yasaklı ID listesi (globally_forbidden) ---------- //
const GLOBALLY_FORBIDDEN = {
  TY1:  'Inter-only (5+ proje)',
  TY2:  'Playfair Italic + Inter (5+ proje, mücevher klişesi)',
  TY4:  'Instrument Serif + Space Grotesk + JetBrains Mono (v1-CONSTRUO)',
  TY8:  'DM Serif Display + Inter (v2-immersive-3d)',
  PL1:  'Dark #0A0A0A + Gold #C9A84C (6 proje)',
  K1:   'Bento Grid Glass (5+ proje)',
  HR2:  'Split Hero — büyük ürün + yan metin (5+ proje)',
  H8:   'Hero-Attached Header (6+ proje)',
  HR7:  'Dashboard-as-Hero (v1-CONSTRUO)',
  P1:   'Klasik Kanban Pipeline',
  T6:   'Card Grid Table (5+ proje)',
  CH1:  'Chart.js Smooth (v1-CONSTRUO + Freeman)',
  CH2:  'Recharts Tremor SaaS default (3+ proje)'
};

// Alternatif öneri mapping (FAIL output'ta kullanıcıya gösterilir)
const FORBIDDEN_ALTERNATIVES = {
  TY1:  'TY27 (Fraunces+IBM Plex), TY39 (IBM Plex monolithic), TY29 (Schibsted Grotesk)',
  TY2:  'TY27 (Fraunces+IBM Plex), TY28 (Cormorant+Mulish), TY31 (Fraunces SC+Work Sans)',
  TY4:  'TY9 (mockup-A varyant), TY5 (Syne), TY7 (kinetic-opsz)',
  TY8:  'TY14 (Monument+Inter Tight), TY12 (Instrument italic minor)',
  PL1:  'PL22 (Tobacco+Pearl), PL23 (Plum+Champagne), PL10 (Deep Night Cobalt)',
  K1:   'K2 (Band+rules), K3 (Stencil number), K5 (Almanac editorial), K10 (KPI ticker)',
  HR2:  'HR11 (Brochure cover), HR3 (full-bleed video), HR9 (interactive map), HR16 (3D camera)',
  H8:   'H1, H2, H3, H5, H9 — hero-bağımsız header stilleri',
  HR7:  'HR8 (huge-number card), HR13 (blueprint title block), HR6 (newspaper)',
  P1:   'P2 (blueprint step), P3+P4 (kinetic ticker), P8 (dense table), P10 (brutalist)',
  T6:   'T2 (receipt), T3 (spec sheet), T4 (kinetic ticker), L8 masonry',
  CH1:  'CH3 (D3 v7 bespoke), CH6 (ozalit blueprint), CH7 (3D depth), CH11 (ticker)',
  CH2:  'CH3 (D3 v7 bespoke), CH11 (ticker), CH7 (3D depth)'
};

// ---------- 2. Mevcut projeler (repeat-guard) ---------- //
// DESIGN-PATHWAYS.md § PROJECT MATRIX satır 306-320
// Her proje 15 kolon: Header, Nav, Hero, KPI, Pipeline, Table, Chat, Chart, Form, Modal, Footer, Typo, Palette, Layout, Motion
const COLUMNS = [
  'header', 'nav', 'hero', 'kpi', 'pipeline', 'table', 'chat',
  'chart', 'form', 'modal', 'footer', 'typography', 'palette', 'layout', 'motion'
];

const EXISTING_PROJECTS = [
  {
    name: 'Freeman',
    combo: { header: 'H8', nav: 'N2', hero: 'HR2', kpi: null, pipeline: null,
      table: null, chat: null, chart: null, form: 'F1', modal: 'M1',
      footer: 'FT1', typography: 'TY1', palette: 'PL1', layout: 'L1', motion: 'MO4' }
  },
  {
    name: 'BG Foto',
    combo: { header: 'H8', nav: 'N2', hero: 'HR2', kpi: 'K1', pipeline: null,
      table: null, chat: null, chart: null, form: 'F1', modal: 'M1',
      footer: 'FT1', typography: 'TY2', palette: 'PL1', layout: 'L1', motion: 'MO4' }
  },
  {
    name: 'Dagintaslı',
    combo: { header: 'H8', nav: 'N2', hero: 'HR2', kpi: 'K1', pipeline: null,
      table: null, chat: null, chart: null, form: 'F1', modal: 'M1',
      footer: 'FT2', typography: 'TY2', palette: 'PL1', layout: 'L1', motion: 'MO4' }
  },
  {
    name: 'Modern Alyans',
    combo: { header: 'H8', nav: 'N2', hero: 'HR2', kpi: 'K1', pipeline: null,
      table: null, chat: null, chart: null, form: 'F1', modal: 'M1',
      footer: 'FT2', typography: 'TY2', palette: 'PL1', layout: 'L1', motion: 'MO4' }
  },
  {
    name: 'Fatih Bey Mücevher',
    combo: { header: 'H8', nav: 'N2', hero: 'HR2', kpi: 'K1', pipeline: null,
      table: 'T6', chat: null, chart: null, form: 'F1', modal: 'M1',
      footer: 'FT2', typography: 'TY3', palette: 'PL10', layout: 'L1', motion: 'MO4' }
  },
  {
    name: 'v1-CONSTRUO',
    combo: { header: 'H3', nav: 'N1', hero: 'HR7', kpi: 'K1', pipeline: 'P1',
      table: 'T2', chat: 'C1', chart: 'CH1', form: null, modal: 'M1',
      footer: 'FT1', typography: 'TY4', palette: 'PL8', layout: 'L1', motion: 'MO4' }
  },
  {
    name: 'v2-blueprint',
    combo: { header: 'H9', nav: 'N3', hero: 'HR13', kpi: 'K12', pipeline: 'P2',
      table: 'T3', chat: null, chart: 'CH6', form: null, modal: null,
      footer: 'FT6', typography: 'TY5', palette: 'PL5', layout: 'L5', motion: 'MO1' }
  },
  {
    name: 'v2-neobrutalist',
    combo: { header: 'H1', nav: 'N2', hero: 'HR5', kpi: 'K3', pipeline: 'P10',
      table: 'T6', chat: 'C2', chart: 'CH3', form: null, modal: null,
      footer: 'FT1', typography: 'TY6', palette: 'PL6', layout: 'L2', motion: 'MO4' }
  },
  {
    name: 'v2-kinetic-data',
    combo: { header: 'H5', nav: 'N7', hero: 'HR1', kpi: 'K10', pipeline: 'P3',
      table: 'T4', chat: null, chart: 'CH11', form: null, modal: null,
      footer: 'FT7', typography: 'TY7', palette: 'PL7', layout: 'L4', motion: 'MO1' }
  },
  {
    name: 'v2-immersive-3d',
    combo: { header: 'H8', nav: 'N10', hero: 'HR4', kpi: 'K7', pipeline: 'P7',
      table: 'T6', chat: null, chart: 'CH7', form: null, modal: null,
      footer: 'FT1', typography: 'TY8', palette: 'PL8', layout: 'L7', motion: 'MO1' }
  },
  {
    name: 'mockup-A (warm-dark)',
    combo: { header: 'H8', nav: null, hero: 'HR11', kpi: 'K2', pipeline: null,
      table: null, chat: null, chart: null, form: null, modal: null,
      footer: 'FT3', typography: 'TY9', palette: 'PL2', layout: 'L6', motion: 'MO10' }
  },
  {
    name: 'mockup-B (editorial)',
    combo: { header: 'H2', nav: null, hero: 'HR6', kpi: 'K5', pipeline: null,
      table: null, chat: null, chart: null, form: null, modal: null,
      footer: 'FT4', typography: 'TY10', palette: 'PL3', layout: 'L5', motion: 'MO10' }
  },
  {
    name: 'mockup-C (industrial)',
    combo: { header: 'H1', nav: null, hero: 'HR5', kpi: 'K3', pipeline: null,
      table: 'T3', chat: null, chart: null, form: null, modal: null,
      footer: 'FT8', typography: 'TY11', palette: 'PL4', layout: 'L1', motion: 'MO10' }
  }
];

// ---------- Helpers ---------- //
function readFileSafe(p) {
  return fs.readFileSync(p, 'utf8');
}

/**
 * Combo parser — .md veya .yaml dosyasından combo field'ları çeker
 * .yaml: combo: { header: H8, nav: N2, ... } veya root-level atom: id
 * .md:   "| Header | H8 | ..." formatındaki tabloyu yakalar
 */
function parseCombo(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const raw = readFileSafe(filePath);

  if (ext === '.yaml' || ext === '.yml') {
    return parseYamlCombo(raw);
  }
  if (ext === '.md') {
    return parseMarkdownCombo(raw);
  }
  throw new Error(`Desteklenmeyen dosya uzantısı: ${ext} (sadece .yaml, .yml, .md)`);
}

function parseYamlCombo(raw) {
  // Front-matter varsa çıkar
  let content = raw;
  const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (fmMatch) {
    content = fmMatch[1] + '\n' + fmMatch[2];
  }

  let doc;
  try {
    doc = yaml.load(content);
  } catch (err) {
    throw new Error(`YAML parse hatası: ${err.message}`);
  }
  if (!doc || typeof doc !== 'object') {
    throw new Error('YAML içeriği boş veya nesne değil.');
  }

  // 1) doc.combo varsa direkt al
  if (doc.combo && typeof doc.combo === 'object') {
    return normalizeCombo(doc.combo, doc);
  }

  // 2) doc.pathway / doc.pathways varsa
  if (doc.pathway && typeof doc.pathway === 'object') {
    return normalizeCombo(doc.pathway, doc);
  }

  // 3) root-level field'lardan çıkar
  return normalizeCombo(doc, doc);
}

function parseMarkdownCombo(raw) {
  const combo = {};
  // Markdown tablosundan "| Kategori | ID | notlar |" satırlarını yakala
  // Kategoriler: Header, Nav, Hero, KPI, Pipeline, Table, Chat, Chart, Form, Modal, Footer, Typography, Palette, Layout, Motion
  const tableRowRe = /^\|\s*([A-Za-z]+)\s*\|\s*([A-Z]{1,3}\d+)\b/gm;
  let m;
  while ((m = tableRowRe.exec(raw)) !== null) {
    const label = m[1].toLowerCase();
    const id = m[2].trim();
    const mapped = mapLabelToColumn(label);
    if (mapped) combo[mapped] = id;
  }

  // Meta alanları (sector, style) extract et
  const meta = {};
  const sectorMatch = raw.match(/sekt(ö|o)r[:\s]+([a-z-]+)/i);
  if (sectorMatch) meta.sector = sectorMatch[2].trim().toLowerCase();
  const styleMatch = raw.match(/stil[:\s]+([a-z-]+)/i) || raw.match(/style[:\s]+([a-z-]+)/i);
  if (styleMatch) meta.style = styleMatch[1].trim().toLowerCase();

  return { combo, meta, source: raw };
}

function mapLabelToColumn(label) {
  const t = label.trim().toLowerCase();
  const map = {
    header: 'header',
    nav: 'nav',
    navigation: 'nav',
    hero: 'hero',
    kpi: 'kpi',
    pipeline: 'pipeline',
    table: 'table',
    chat: 'chat',
    chart: 'chart',
    form: 'form',
    modal: 'modal',
    footer: 'footer',
    typography: 'typography',
    typo: 'typography',
    palette: 'palette',
    layout: 'layout',
    motion: 'motion'
  };
  return map[t] || null;
}

function normalizeCombo(src, fullDoc) {
  const combo = {};
  const meta = {};

  // Sektör + stil
  if (fullDoc.sector) meta.sector = String(fullDoc.sector).toLowerCase();
  if (fullDoc.style)  meta.style  = String(fullDoc.style).toLowerCase();
  if (fullDoc.sektor) meta.sector = String(fullDoc.sektor).toLowerCase();
  if (fullDoc.stil)   meta.style  = String(fullDoc.stil).toLowerCase();

  for (const col of COLUMNS) {
    if (src[col]) {
      const v = Array.isArray(src[col]) ? src[col][0] : src[col];
      combo[col] = String(v).trim();
    }
  }

  // Alias: typo → typography
  if (!combo.typography && src.typo) combo.typography = String(src.typo).trim();

  return { combo, meta, source: null };
}

// ---------- Check 1: Forbidden IDs ---------- //
function checkForbiddenIds(combo) {
  const hits = [];
  const allIds = extractAllIds(combo);

  for (const id of allIds) {
    if (GLOBALLY_FORBIDDEN[id]) {
      hits.push({
        id,
        reason: GLOBALLY_FORBIDDEN[id],
        alternative: FORBIDDEN_ALTERNATIVES[id] || '(alternatif yok)'
      });
    }
  }
  return hits;
}

function extractAllIds(combo) {
  const out = [];
  for (const col of COLUMNS) {
    const v = combo[col];
    if (v && typeof v === 'string') out.push(v);
  }
  return out;
}

// ---------- Check 2: Repeat skor ---------- //
function checkRepeatScore(combo) {
  let best = { name: null, score: 0, matches: [] };
  for (const proj of EXISTING_PROJECTS) {
    let score = 0;
    const matches = [];
    for (const col of COLUMNS) {
      const a = (combo[col] || '').trim();
      const b = (proj.combo[col] || '').trim();
      if (a && b && a === b) {
        score++;
        matches.push(`${col}=${a}`);
      }
    }
    if (score > best.score) {
      best = { name: proj.name, score, matches };
    }
  }
  return best;
}

function classifyRepeat(score) {
  if (score <= 3) return { level: 'PASS',  symbol: '✓',  msg: 'OK — farklı, geç' };
  if (score <= 5) return { level: 'WARN',  symbol: '⚠',  msg: 'İkinci tur gözden geçir' };
  if (score <= 7) return { level: 'WARN2', symbol: '⚠⚠', msg: 'En az 3 kolon değiştir' };
  return           { level: 'FAIL',  symbol: '✗',  msg: 'RED — combo yeniden türetilmeli' };
}

// ---------- Check 3: Sektör-stil uyumluluk ---------- //
function loadCompatibility() {
  const p = path.join(CATALOG_DIR, 'compatibility.yaml');
  if (!fs.existsSync(p)) return null;
  try {
    return yaml.load(readFileSafe(p));
  } catch (err) {
    console.error(`[WARN] compatibility.yaml okunamadı: ${err.message}`);
    return null;
  }
}

function checkCombinationCompat(meta, compat) {
  if (!compat || !meta.sector || !meta.style) {
    return { status: 'SKIP', reason: 'sektör veya stil meta yok' };
  }
  const forbidden = compat.forbidden_combinations || [];
  for (const row of forbidden) {
    if (String(row.sektör || row.sector || '').toLowerCase() === meta.sector &&
        String(row.stil   || row.style  || '').toLowerCase() === meta.style) {
      return { status: 'FAIL', reason: row.reason };
    }
  }
  const conditional = compat.conditional_combinations || [];
  for (const row of conditional) {
    if (String(row.sektör || row.sector || '').toLowerCase() === meta.sector &&
        String(row.stil   || row.style  || '').toLowerCase() === meta.style) {
      return { status: 'WARN', reason: row.condition };
    }
  }
  return { status: 'PASS', reason: 'uyumlu' };
}

// ---------- Check 4: Türkçe font desteği ---------- //
function checkTurkishSupport(combo) {
  const typoId = combo.typography;
  if (!typoId) return { status: 'SKIP', reason: 'typography ID yok' };

  const atomPath = path.join(CATALOG_DIR, 'atoms', 'typography', `${typoId}.yaml`);
  if (!fs.existsSync(atomPath)) {
    return { status: 'WARN', reason: `${typoId}.yaml atom dosyası bulunamadı` };
  }
  const raw = readFileSafe(atomPath);
  let atom;
  try {
    // Front-matter varsa çıkar
    const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
    const body = fmMatch ? (fmMatch[1] + '\n' + fmMatch[2]) : raw;
    atom = yaml.load(body);
  } catch (err) {
    return { status: 'WARN', reason: `atom parse hatası: ${err.message}` };
  }
  if (!atom) return { status: 'WARN', reason: 'atom YAML boş' };

  // turkish_support field'ı yoksa display_font üzerinden kontrol et
  if (atom.turkish_support) {
    // Array ise (stil YAML formatı) tam destek varsayılır
    if (Array.isArray(atom.turkish_support) && atom.turkish_support.length > 0) {
      return { status: 'PASS', reason: `${typoId} turkish_support tam (${atom.turkish_support.length} karakter)` };
    }
    if (typeof atom.turkish_support === 'string' &&
        (atom.turkish_support === 'yes' || atom.turkish_support === 'full')) {
      return { status: 'PASS', reason: `${typoId} turkish_support: ${atom.turkish_support}` };
    }
    if (atom.turkish_support === false || atom.turkish_support === 'no') {
      return { status: 'FAIL', reason: `${typoId} Türkçe karakter DESTEKLEMİYOR` };
    }
  }

  // display/body font adlarından tanınan Google Fonts
  const knownTrSupport = [
    'Inter', 'IBM Plex', 'Fraunces', 'Cormorant', 'Hanken Grotesk',
    'Space Grotesk', 'Geist', 'JetBrains Mono', 'Archivo',
    'Recoleta', 'Schibsted Grotesk', 'Lato', 'Mulish', 'Work Sans',
    'Bricolage Grotesque', 'Manrope', 'Instrument', 'Syne',
    'Big Shoulders', 'Unbounded', 'Public Sans', 'DM Serif', 'DM Mono',
    'Monument Extended', 'Inter Tight', 'Soehne', 'National', 'Marfa',
    'Rubik Mono One', 'Stardos Stencil', 'Archivo Narrow', 'Archivo Black'
  ];
  const fontName = atom.display_font || atom.name || '';
  const matched = knownTrSupport.find(f => fontName.toLowerCase().includes(f.toLowerCase()));
  if (matched) {
    return { status: 'PASS', reason: `${typoId} (${matched}) bilinen TR-uyumlu font` };
  }
  return { status: 'WARN', reason: `${typoId} (${fontName}) TR desteği manuel doğrulanmalı` };
}

// ---------- Check 5: A11y hızlı check ---------- //
function checkA11y(combo) {
  const issues = [];
  const notes = [];

  // Palette kontrast
  const palId = combo.palette;
  if (palId) {
    const atomPath = path.join(CATALOG_DIR, 'atoms', 'palette', `${palId}.yaml`);
    if (fs.existsSync(atomPath)) {
      try {
        const raw = readFileSafe(atomPath);
        const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
        const body = fmMatch ? (fmMatch[1] + '\n' + fmMatch[2]) : raw;
        const atom = yaml.load(body);
        if (atom && atom.wcag_pairs && Array.isArray(atom.wcag_pairs)) {
          const ratios = atom.wcag_pairs.map(extractContrastRatio).filter(Boolean);
          const minRatio = ratios.length ? Math.min(...ratios) : null;
          if (minRatio === null) {
            notes.push(`${palId} wcag_pairs var ama ratio parse edilemedi`);
          } else if (minRatio < 4.5) {
            issues.push(`${palId} kontrast ${minRatio}:1 < 4.5 (AA FAIL)`);
          } else {
            const level = minRatio >= 7.0 ? 'AAA' : 'AA';
            notes.push(`${palId} kontrast ${minRatio}:1 ${level} pass`);
          }
        } else {
          notes.push(`${palId} wcag_pairs yok — manuel kontrol gerek`);
        }
      } catch (err) {
        notes.push(`${palId} atom parse hatası: ${err.message}`);
      }
    } else {
      notes.push(`${palId}.yaml atom dosyası bulunamadı`);
    }
  }

  // Motion + prefers-reduced-motion
  const motionId = combo.motion;
  if (motionId) {
    const staticMotions = ['MO10', 'MO3'];
    if (staticMotions.includes(motionId)) {
      notes.push(`${motionId} zaten static/subtle — reduced-motion güvenli`);
    } else {
      notes.push(`${motionId} için prefers-reduced-motion fallback YAZILMALI (manual check)`);
    }
  }

  return { issues, notes };
}

function extractContrastRatio(str) {
  const m = String(str).match(/(\d+(?:\.\d+)?)\s*:\s*1/);
  return m ? parseFloat(m[1]) : null;
}

// ---------- Runner ---------- //
function main() {
  console.log(`\n[validate-combo] Dosya: ${absInput}`);
  console.log(`[validate-combo] Repo:  ${REPO_ROOT}\n`);

  let parsed;
  try {
    parsed = parseCombo(absInput);
  } catch (err) {
    console.error(`[FAIL] Parse hatası: ${err.message}`);
    process.exit(1);
  }

  const { combo, meta } = parsed;
  const extractedIds = extractAllIds(combo);

  if (extractedIds.length === 0) {
    console.error('[FAIL] Combo boş — hiçbir pathway ID yakalanamadı.');
    console.error('       .yaml için combo: { header: H1, ... } veya root-level field gerekir.');
    console.error('       .md için | Kategori | ID | tablosu gerekir.');
    process.exit(1);
  }

  console.log(`[INFO] ${extractedIds.length} pathway ID yakalandı: ${extractedIds.join(', ')}`);
  if (meta.sector || meta.style) {
    console.log(`[INFO] Meta — sektör: ${meta.sector || '?'}, stil: ${meta.style || '?'}`);
  }
  console.log('');

  let overallFail = false;
  const report = [];

  // Check 1
  const forbidden = checkForbiddenIds(combo);
  if (forbidden.length === 0) {
    report.push(`  ✓ Yasaklı ID: 0 ihlal`);
  } else {
    overallFail = true;
    report.push(`  ✗ Yasaklı ID: ${forbidden.length} ihlal`);
    for (const hit of forbidden) {
      report.push(`    - ${hit.id}: ${hit.reason}`);
      report.push(`      Alternatif: ${hit.alternative}`);
    }
  }

  // Check 2
  const rep = checkRepeatScore(combo);
  const repClass = classifyRepeat(rep.score);
  if (repClass.level === 'FAIL') overallFail = true;
  report.push(`  ${repClass.symbol} Repeat skor: ${rep.score}/15 — ${repClass.msg}`);
  if (rep.name) {
    report.push(`    En yakın: ${rep.name} (${rep.matches.length} eşleşme)`);
    if (rep.matches.length > 0) {
      report.push(`    Eşleşen kolonlar: ${rep.matches.join(', ')}`);
    }
  }

  // Check 3
  const compat = loadCompatibility();
  const compatResult = checkCombinationCompat(meta, compat);
  if (compatResult.status === 'FAIL') {
    overallFail = true;
    report.push(`  ✗ Sektör-stil uyum: FORBIDDEN — ${compatResult.reason}`);
  } else if (compatResult.status === 'WARN') {
    report.push(`  ⚠ Sektör-stil uyum: KOŞULLU — ${compatResult.reason}`);
  } else if (compatResult.status === 'PASS') {
    report.push(`  ✓ Sektör-stil uyum: ${compatResult.reason}`);
  } else {
    report.push(`  — Sektör-stil uyum: SKIP (${compatResult.reason})`);
  }

  // Check 4
  const tr = checkTurkishSupport(combo);
  if (tr.status === 'FAIL') {
    overallFail = true;
    report.push(`  ✗ Türkçe font: ${tr.reason}`);
  } else if (tr.status === 'WARN') {
    report.push(`  ⚠ Türkçe font: ${tr.reason}`);
  } else if (tr.status === 'PASS') {
    report.push(`  ✓ Türkçe font: ${tr.reason}`);
  } else {
    report.push(`  — Türkçe font: SKIP (${tr.reason})`);
  }

  // Check 5
  const a11y = checkA11y(combo);
  if (a11y.issues.length > 0) {
    overallFail = true;
    report.push(`  ✗ A11y: ${a11y.issues.length} sorun`);
    for (const iss of a11y.issues) report.push(`    - ${iss}`);
  } else {
    report.push(`  ✓ A11y: kontrast + motion check OK`);
  }
  for (const note of a11y.notes) report.push(`    · ${note}`);

  // Header
  const projectName = path.basename(absInput, path.extname(absInput));
  if (overallFail) {
    console.log(`[FAIL] combo ${projectName} reddedildi`);
  } else {
    console.log(`[PASS] combo ${projectName} geçti`);
  }
  for (const line of report) console.log(line);
  console.log('');

  process.exit(overallFail ? 1 : 0);
}

main();
