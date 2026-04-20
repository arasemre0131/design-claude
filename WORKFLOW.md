# WORKFLOW.md — design-claude Sistem Durumu + Next Action

> **Tarih:** 2026-04-20
> **Durum:** ⚠️ KISMI — iskelet kuruldu, gerçek görsel farklılaşma eksik
> **Sonraki:** Context reset + re-audit + gerçek preset üretimi

---

## 1 · EXECUTIVE SUMMARY

### Ne yapıldı (11 commit, ~14 saat, ~2.8M token)

6 faz tamamlandı:
- **Faz 0+0.5**: 296 YAML catalog + 4 yeni agent draft (~16,800 satır)
- **Faz 1**: catalog-query skill + validate-combo.js + MATRIX + compatibility
- **Faz 2**: 60 preset YAML (10 stil × aktif sektör)
- **Faz 3**: Next.js 16 scaffolder + preview-app + 64 React component (~17,270 satır)
- **Faz 4**: WordPress Elementor + Shopify Hydrogen + Turborepo Enterprise scaffolder
- **Faz 5**: `/project-start` slash command + hook + pipeline integration
- **Faz 6**: 5 doküman MD + 3 test scaffold (PASS)

### Ne bozuk (kritik)

**60 preset'in hepsi aynı görünüyor — tek fark palette + font.**

- Preview-app'te `/preview/mucevher-editorial-luxury` ile `/preview/insaat-brutalist` yan yana açınca **aynı iskelet** — sadece renk + font farklı
- Gerçek stil imzası yok (brutalist'te hazard stripe yok, immersive-3d'de 3D yok, editorial-luxury'de blur reveal yok)
- Tier farkı yok (Premium 25K-80K'da da Budget 7.5-15K'da da aynı boş hero)
- Preset'lere content (ürün listesi, servis, ekip, nav) inject edilmedi — hepsinde default placeholder

### Neden oldu

1. **Metadata ağırlıklı iş** — 356 YAML "HR11 Brochure Cover ne demek" tanımladı, ama **HR11'in gerçek Next.js implementasyonunu preset'e özel** yapmadı.
2. **Generic component'ler** — `HeroBrochure.tsx` tüm preset'ler için aynı (props'suz boş iskelet), preset-spesifik varyant yok.
3. **Scraped ajans HTML'leri kullanılmadı** — fraxbit/wearebrand/mdx HTML'leri elimizde (1.6MB), ama Next.js'e port edilmedi, sadece pattern YAML'ına "referans" olarak yazıldı.
4. **Content boş** — preset.yaml'da `atoms: {...}` var ama `content: {hero: ..., products: [...], nav: [...]}` **hiç yok**.

---

## 2 · TÜM DOSYA ENVANTERİ (11 commit)

### L1 Catalog (356 YAML, ~16,800 satır)

```
catalog/
├── atoms/                       (261 YAML, 17 kategori)
│   ├── header/H1-H10.yaml       (10)
│   ├── nav/N1-N10.yaml          (10)
│   ├── hero/HR1-HR17.yaml       (17)
│   ├── kpi/K1-K13.yaml          (13)
│   ├── pipeline/P1-P10.yaml     (10)
│   ├── table/T1-T8.yaml         (8)
│   ├── chat/C1-C6.yaml          (6)
│   ├── chart/CH1-CH12.yaml      (12)
│   ├── form/F1-F8.yaml          (8)
│   ├── modal/M1-M6.yaml         (6)
│   ├── footer/FT1-FT8.yaml      (8)
│   ├── typography/TY1-TY44.yaml (44)
│   ├── palette/PL1-PL38.yaml    (38)
│   ├── layout/L1-L11.yaml       (11)
│   ├── motion/MO1-MO12.yaml     (12)
│   ├── motion-ajans/            (33 — 13 ajans + 14-ultra pattern)
│   └── 3d/                      (15 — drei + gsplat)
├── sectors/                     (10 YAML — insaat, mucevher, kuafor, restoran, klinik, eticaret, spa, fotograf, gayrimenkul, otel)
├── styles/                      (10 YAML — brutalist, editorial-luxury, kinetic-agency, immersive-3d, maximalist-atmospheric, minimal-swiss, warm-organic, data-dense-dashboard, editorial-print, industrial-workwear)
├── recipes/                     (7 YAML — next-premium, next-r3f, wordpress-elementor-motion, webflow-premium, nuxt-ogl, shopify-hydrogen, claude-design-handoff)
├── presets/                     (60 YAML — sektör × stil combo)
├── techstack/                   (3 YAML — frontend-index 82 + 3d-index 99 + oss-packages 25)
├── new-agents/                  (4 MD draft — seo-expert, accessibility-expert, performance-expert, claude-design-liaison)
├── ROUTING.yaml                 (144 feature mapping)
├── MATRIX.md                    (10×10 sektör×stil)
└── compatibility.yaml           (forbidden + conditional combo + repeat-guard)
```

### L3 Scaffold (4 template + 4 CLI)

```
scaffold/
├── nextjs-16-base/              (Next.js 16 + React 19 + Tailwind v4 + shadcn/ui base)
├── wordpress-elementor/         (Hello Elementor child + GSAP + Lenis + wab-safe-animations.js MIT rewrite)
├── shopify-hydrogen/            (Hydrogen 2024.10 + Remix + R3F + iyzico CSP)
└── enterprise-monorepo/         (Turborepo + pnpm workspaces + apps/web/admin/api + packages/ui/db/auth/observability)

scaffold.js                      (27KB Next.js CLI)
scaffold-wp.js                   (44KB WordPress CLI)
scaffold-shopify.js              (Shopify Hydrogen CLI)
scaffold-enterprise.js           (Enterprise monorepo CLI)

scripts/
├── validate-combo.js            (yasaklı ID + repeat skor + kontrast check)
└── README.md
```

### Preview-app (~80 dosya, Next.js 16)

```
preview-app/
├── app/
│   ├── layout.tsx               (25+ font family preload)
│   ├── gallery/page.tsx         (60 preset grid + filter)
│   ├── preview/[preset]/page.tsx (dynamic route)
│   └── compare/page.tsx
├── src/
│   ├── components/              (64 React component)
│   │   ├── hero/                (9 — HeroBrochure, HeroImmersive3D, HeroInteractiveMap, HeroKineticSerif, HeroMaximalistOverlap, HeroQAConversational, HeroSignBoardRotated, HeroVideoFullBleed, HeroZeroReceipt)
│   │   ├── motion/              (6 — BlurReveal, LenisProvider, MagneticButton, ScrambleText, ScrollTriggerProvider, VariableFontOpsz)
│   │   ├── chrome/              (8 — CommandPalette, ConcreteTexture, CornerBrackets, HazardStripe, MastheadCentered, MegaNav, PlateHeader, SidebarRail)
│   │   ├── layout/              (5 — BentoGridAsymmetric, CenterColumnNarrow, FullBleedRails, MasonryGallery, StickySidebarFeed)
│   │   ├── data/                (5 — DenseTable, ReceiptStrip, Sparkline, SpecSheet, TerminalLog)
│   │   ├── interaction/         (5 — BottomSheet, EmailThreaded, FavoriteList, InlineExpand, WizardSteps)
│   │   ├── effects/             (6 — CanvasTrail, ClipPathReveal, PortholeDive, SVGGrainOverlay, TextPathBendMarquee, ThemeScrollSwitch)
│   │   ├── 3d/                  (5 — CrystalScene, GaussianSplatViewer, Immersive3DCanvas, MeshTransmissionViewer, ScrollCameraPath)
│   │   ├── PresetRenderer.tsx   (core orchestrator)
│   │   ├── Gallery/PresetCard.tsx
│   │   └── Compare/SplitView.tsx
│   ├── lib/
│   │   ├── wab-safe-animations.ts (6 MIT-safe pattern)
│   │   ├── preset-loader.ts
│   │   ├── atom-resolver.ts     (48 atom → component mapping)
│   │   ├── tailwind-tokens.ts
│   │   └── utils.ts
│   └── hooks/                   (6 — useLenis, useGSAP, useScrollTrigger, useMagneticHover, useReducedMotion, useWabSplit)
└── package.json                 (next@16, react@19, gsap@3.13, lenis@1.3.4, three@0.183, R3F v9, drei v10, vaul, sonner, cmdk, babel-plugin-react-compiler)
```

### L4 Trigger Chain

```
~/.claude/commands/project-start.md
~/.claude/hooks/project-pipeline.js
~/.claude/skills/catalog-query/
├── SKILL.md
└── scripts/query.js              (node filesystem + js-yaml)
~/.claude/CLAUDE.md              (Catalog Pipeline bölümü eklendi)
~/.claude/settings.json          (hook registration)
```

### Dokümantasyon

```
ULTRAPLAN.md                     (2,226 satır, 24 bölüm)
YOL-HARITASI.md                  (718 satır, 10 bölüm)
LOG.md                           (334 satır, faz progress)
TEST-REPORT.md                   (199 satır, 3/3 scaffold PASS)
CODE-REVIEW.md                   (Code review APPROVE 100/100)
WORKFLOW.md                      (bu dosya)
COUNCIL-KURULUM-RAPORU.md        (mevcut)
INDEX.md                         (mevcut)
README.md                        (mevcut)
DOKUMAN/
├── README.md                    (224 satır — hızlı başlangıç)
├── CATALOG-STRUCTURE.md         (753 satır — YAML schema)
├── PIPELINE-GUIDE.md            (551 satır — /project-start rehberi)
├── TROUBLESHOOT.md              (789 satır — yaygın hatalar)
└── SYSTEM-OVERVIEW.md           (352 satır — 4 katman + 6 faz + teknik borç)
```

### Memory Entries

```
~/.claude/projects/.../memory/
├── MEMORY.md                    (index)
├── project_design_claude_catalog.md
├── feedback_dont_write_docs_without_ask.md
└── feedback_catalog_pipeline_mandatory.md
```

### Test Projeleri (dışarıda)

```
C:/Users/EAS/Desktop/
├── test-mucevher-v2/            (Next.js 16, scaffold.js çıktısı, dev server PASS)
├── test-kuafor-wp/              (WordPress child theme, scaffold-wp.js çıktısı)
└── test-shopify/                (Shopify Hydrogen, scaffold-shopify.js çıktısı)
```

---

## 3 · MEVCUT VARLIKLAR (kullanılmayan potansiyel)

### Scraped Agency HTMLs (1.6MB, kullanılmadı)

```
research-assets/
├── _fraxbit_home.html           (268KB — Awwwards HM — WP + Elementor + GSAP 3.12 + Lenis 0.2.28)
├── wearebrand_home.html         (121KB — Awwwards SOTD — WP + Barba + Lenis 1.2.3 + custom 30KB animations.js)
├── wearebrand_brand.html        (57KB — /brand premium landing)
├── theoberry_home.html          (163KB — Framer portfolyo)
├── theo_github.html             (185KB — referans)
├── theo_ig.html                 (794KB — instagram)
├── _research/
│   ├── marcelo_home/www/portfolio/proj1.html
│   └── mdx_home/services/projects.html
├── wab/
│   ├── wearebrand-animations.js (30KB)
│   ├── wearebrand-custom.css
│   ├── wearebrand.min.css       (84KB)
│   └── lenis.css
├── sr7.css                      (Slider Revolution 7)
└── elementor_post6.css
```

### 14 Sektör Template (tümü yazılı, 4,806 satır HTML)

```
templates/
├── 01-insaat/index.html         (Concrete + Ozalit palette switch)
├── 02-mucevher/index.html       (Tobacco+Pearl + Plum+Champagne)
├── 03-kuafor/index.html         (Salt+Peach + Slate+Olive)
├── 04-restoran/index.html       (Salmon+Burgundy + Olive+Tomato)
├── 05-klinik/index.html         (Glacier+Sage + Cream+Forest)
├── 06-eticaret/index.html       (Slate+Acid + Kraft+Burst)
├── 07-spa/index.html            (Clay+Mist + Pearl+Seafoam)
├── 08-fotograf/index.html       (Off-Black + Cream+Black)
├── 09-gayrimenkul/index.html    (Sand+Ocean + Mist+Sunset)
├── 10-otel/index.html           (Terracotta+Sky + Cool Marble)
├── 11-kinetic/index.html        (fraxbit-style — GSAP + Lenis + SplitText + Variable Fraunces opsz axis scroll)
├── 12-immersive-3d/index.html   (marcelo-style — Three.js crystal + orbit + scroll camera + particles)
├── 13-maximalist/index.html     (wearebrand-style — atmospheric drift + porthole + overlapping type)
└── 14-ultra/index.html          (14 signature technique — blur-36px reveal, porthole dive, mask-y, magnetic elastic, ScrambleText, variable font opsz, dual cursor, canvas trail, SVG textPath marquee, feTurbulence grain, SplitText chars, clip-path 4-yön, theme switch scroll)
```

### 4 v2 Variant (insaat-crm için, 3,010 satır)

```
v2-blueprint/index.html          (Ozalit + Syne + Space Grotesk + paper + GSAP reveal)
v2-neobrutalist/index.html       (Beyaz + cobalt/sarı + Archivo Black + 3px border + 7px shadow)
v2-kinetic-data/index.html       (Dark + lime/cyan/magenta + Bricolage + Lenis + GSAP + D3 force network)
v2-immersive-3d/index.html       (Three.js procedural 5-kat kule + scroll camera + particles + glass UI)
```

### 3 Mockup (1,285 satır)

```
mockups/
├── a-warm-dark/index.html       (Espresso + Coral + Fraunces + Hanken)
├── b-off-white-editorial/       (Newsprint + Editorial Red + Instrument Serif + IBM Plex Serif)
└── c-concrete-industrial/       (Beton + Safety Orange + Archivo Black + Stardos Stencil)
```

### Research Dosyaları (kullanılmadı)

```
C:/Users/EAS/Desktop/armut/Mobilyacı/3d-demo/research/  (241 dosya, 14MB)
C:/Users/EAS/Desktop/armut/Mobilyacı/ kök              (23 dosya)
C:/Users/EAS/Desktop/armut/Fatih Bey Mücevher Sitesi/  (research klasörü mevcut değil)
C:/Users/EAS/Desktop/armut/ kök                        (16 MD)
```

**Kritik research dosyaları:**
- `jewelry-watch-3d-showcase.md` (mücevher için)
- `furniture-3d-web-experience-research.md` (mobilya)
- `automotive-3d-configurator.md`
- `ecommerce-supabase-payment-turkey-2026.md`
- `accessibility-wcag-aria-2026.md` (147KB)
- `landing-page-conversion-patterns-2026.md` (108KB, 3380 satır)
- `animation-gsap-framer-lenis-masterclass-2026.md`
- `drei-MeshTransmissionMaterial-research.md`
- `claude-design-anthropic-labs-2026.md`

---

## 4 · KRİTİK GAP — NE OLMASI GEREKİYOR

### Her preset için:

1. **Unique visual identity** (palette + font YETERLİ DEĞİL):
   - `brutalist` → hazard stripe + rotated sign + concrete speckle + 3px border + 7px hard shadow
   - `editorial-luxury` → Fraunces opsz scroll-linked + blur-36px reveal + tobacco+pearl + italic drop cap
   - `kinetic-agency` → kinetic word reveal + variable font axis scroll + magnetic elastic + italic serif
   - `immersive-3d` → Three.js canlı sahne + scroll camera + MeshTransmission + particles
   - `maximalist-atmospheric` → radial gradient drift + porthole conic + overlapping type + theme switch

2. **Real content** (preset YAML'a `content:` bloğu):
   - Hero: gerçek başlık + alt başlık + CTA
   - Sektör ürün/servis listesi (en az 6 item)
   - Navigation items (sector-specific)
   - Team/about content
   - Footer links + KVKK + WhatsApp

3. **Tier-specific features:**
   - **Ultra-Budget (5-7K)**: template swap, WhatsApp only, static hero
   - **Budget (7.5-15K)**: WP Elementor + GSAP scroll + randevu form
   - **Mid (15-25K)**: Next.js + admin + e-ticaret + blog
   - **Premium (25-80K)**: + R3F + MeshTransmission + AR button + custom cursor + scroll camera
   - **Enterprise (80K+)**: + multi-tenant + observability + SLA + Turborepo

4. **Scraped HTML'den port edilen gerçek design:**
   - `mucevher-editorial-luxury` ← `wearebrand_brand.html` atmosphere + `templates/14-ultra` signature teknikleri
   - `kuafor-minimal-swiss` ← `mockups/a-warm-dark` + `templates/03-kuafor` + WhatsApp widget
   - `insaat-brutalist` ← `mockups/c-concrete-industrial` + `v2-neobrutalist` + Ankara SVG map
   - `eticaret-immersive-3d` ← `templates/12-immersive-3d` + `v2-immersive-3d` + iyzico checkout
   - `fotograf-editorial-print` ← `mockups/b-off-white-editorial` + masonry gallery
   - vs.

---

## 5 · SONRAKİ ADIM (context reset sonrası)

Yeni Claude session için hazırlanan **İngilizce detaylı prompt**: `NEW-SESSION-PROMPT.md` (bu dosyadan sonra oluşturulacak).

Plan özeti:
1. Yeni session katalog + preview-app'i read-only audit eder
2. `research-assets/` + `templates/` + `mockups/` + `v2-*/` → preset-specific base map üret
3. Her preset için: base HTML'den Next.js sayfasına port + sector content inject + tier feature toggle
4. Wave 1: 15 öncelikli preset (Armut ilan frekansına göre)
5. Wave 2: Kalan 45 preset, Wave 1 template clone
6. Polish + Lighthouse + deploy

### Tek-preset üretim akışı (her preset için)

```
1. Read catalog/presets/{preset-id}.yaml (atoms listesi)
2. Read catalog/sectors/{sector}.yaml (psychology + anti-cliché + recommended)
3. Read catalog/styles/{style}.yaml (mood + motion primitives + forbidden)
4. Find "base HTML":
   - templates/{XX-sector}/index.html (exists)
   - mockups/{style-variant}/index.html (exists)
   - research-assets/{agency}_home.html (scraped agency match)
   - templates/14-ultra/index.html (signature techniques)
5. Port to Next.js:
   - preview-app/src/presets/{preset-id}/
   ├── page.tsx                (full page layout)
   ├── content.ts              (real sample data)
   ├── components/             (preset-specific variants)
   └── styles.module.css       (signature CSS)
6. Inject sector content (products/team/services from sector research)
7. Apply tier features (Premium: 3D + AR + cursor; Budget: WhatsApp + form)
8. Apply signature techniques (motion-ajans atoms)
9. Test: /preview/{preset-id} renders unique design
10. Lighthouse ≥ 85 mobile
```

---

## 6 · İSTATİSTİK

- **11 commit** (db42206 → ad05dab)
- **~727 git tracked file**
- **~65,000 satır** (YAML + TypeScript + PHP + MD)
- **~2.8M token** Opus 4.7
- **~30 agent dispatch**
- **~14 saat** wall-time
- **0 critical code issue** (code-reviewer 100/100)

Fakat **görsel değer: düşük** — preset'ler birbirinden ayırt edilemiyor. Fix: context reset sonrası yeni session'da.

---

**Son olarak:** Context reset yap, `NEW-SESSION-PROMPT.md`'yi kopyala yeni session'a yapıştır.
