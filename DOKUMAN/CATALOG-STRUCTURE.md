# CATALOG-STRUCTURE.md — YAML Catalog Schema Referansı

> **Kapsam:** 356 YAML dosyası, 9 alt-dizin, tam schema tanımı.
> **Amaç:** Yeni atom / preset / stil / sektör ekleyebilmek için schema cheatsheet.
> **Kaynak otoritesi:** `catalog/compatibility.yaml` + `catalog/MATRIX.md` + preset YAML'leri (hepsi uyumlu, tek kaynak).

---

## Klasör ağacı (tam)

```
C:/Users/EAS/Desktop/armut/research/design-claude/catalog/
├── atoms/                       # 261 atom YAML, 17 kategori
│   ├── header/                  # 10 atom (H1-H10) — nav header pattern
│   ├── nav/                     # 10 atom (N1-N10) — navigation stil
│   ├── hero/                    # 17 atom (HR1-HR17)
│   ├── kpi/                     # 13 atom (K1-K13) — stat/metric
│   ├── pipeline/                # 10 atom (P1-P10) — aşama göstergesi
│   ├── table/                   # 8 atom (T1-T8)
│   ├── chart/                   # 12 atom (CH1-CH12)
│   ├── chat/                    # 6 atom (C1-C6)
│   ├── form/                    # 8 atom (F1-F8)
│   ├── modal/                   # 6 atom (M1-M6)
│   ├── footer/                  # 8 atom (FT1-FT8)
│   ├── typography/              # 44 atom (TY1-TY44)
│   ├── palette/                 # 38 atom (PL1-PL38)
│   ├── layout/                  # 11 atom (L1-L11)
│   ├── motion/                  # 12 atom (MO1-MO12)
│   ├── motion-ajans/            # 33 atom (14 ajans + 14 signature, MIT-safe rewrite)
│   └── 3d/                      # 15 atom (3D-01..3D-15, drei + postprocessing + gsplat)
│
├── sectors/                     # 10 YAML, sektör psikolojisi + anti-cliché
│   ├── eticaret.yaml
│   ├── fotograf.yaml
│   ├── gayrimenkul.yaml
│   ├── insaat.yaml
│   ├── klinik.yaml
│   ├── kuafor.yaml
│   ├── mucevher.yaml            # Fatih Bey repeat-guard 4 yerde
│   ├── otel.yaml
│   ├── restoran.yaml
│   └── spa.yaml
│
├── styles/                      # 10 YAML, stil tanımı + compatible/incompatible sectors
│   ├── brutalist.yaml
│   ├── data-dense-dashboard.yaml
│   ├── editorial-luxury.yaml
│   ├── editorial-print.yaml
│   ├── immersive-3d.yaml
│   ├── industrial-workwear.yaml
│   ├── kinetic-agency.yaml
│   ├── maximalist-atmospheric.yaml
│   ├── minimal-swiss.yaml
│   └── warm-organic.yaml
│
├── presets/                     # 60+ preset YAML, sector × style compose
│   ├── _example-fail-mucevher-cliche.yaml          # pedagojik
│   ├── _example-forbidden-combo.yaml               # pedagojik
│   ├── _example-pass-mucevher-editorial.yaml       # pedagojik
│   ├── _example-md-combo.md                        # pedagojik
│   ├── mucevher-editorial-luxury.yaml              # gerçek preset
│   ├── mucevher-immersive-3d.yaml
│   ├── kuafor-warm-organic.yaml
│   ├── eticaret-data-dense-dashboard.yaml
│   ├── insaat-industrial-workwear.yaml
│   └── ... (60 toplam)
│
├── recipes/                     # 7 YAML, recipe = tech stack + deploy + version lock
│   ├── claude-design-handoff.yaml
│   ├── next-premium.yaml        # Tier 2 (mid, 15-25K)
│   ├── next-r3f.yaml            # Tier 3 (premium, 25-80K, 3D)
│   ├── nuxt-ogl-editorial.yaml
│   ├── shopify-hydrogen.yaml    # Tier 3 e-com
│   ├── webflow-premium.yaml
│   └── wordpress-elementor-motion.yaml  # Tier 1 (budget, 7.5-15K)
│
├── techstack/                   # 3 YAML, teknoloji index
│   ├── frontend-index.yaml      # 82 entry (FRONTEND-TECHSTACK.md mapping)
│   ├── 3d-index.yaml            # 99 entry (3D-TECHSTACK.md mapping)
│   └── oss-packages.yaml        # 25 paket (Adoratorio 6, Active Theory 8, Locomotive, Fiddle, 7 agency)
│
├── new-agents/                  # 4 MD (Faz 0.5 draft, council'e eklenecek)
│   ├── accessibility-expert.md  # WCAG 2.2 AA, 13 criteria
│   ├── claude-design-liaison.md # Stage 3.75 Handoff Bundle
│   ├── performance-expert.md    # Lighthouse ≥ 90
│   └── seo-expert.md            # 13 decision criteria, Türkçe URL + KVKK
│
├── ROUTING.yaml                 # 144 feature → research dosyası mapping
├── MATRIX.md                    # 10×10 görünür tablo
└── compatibility.yaml           # Anti-cliché + forbidden_combinations (validate-combo.js kaynağı)
```

**Toplam:** 261 atom + 10 sektör + 10 stil + 60+ preset + 7 recipe + 3 techstack + 1 ROUTING + 1 compatibility + 4 agent draft + 4 pedagojik = **356 YAML/MD**

---

## Atom schema (261 atom, 17 kategori)

Her atom YAML şu alanlara sahip:

```yaml
---
id: HR11                              # Kategori prefix + sıra no
name: "Brochure Cover"                # İnsan-okunur isim
category: hero                        # klasör adı ile eşleşir
version: "1.0"
---

one_liner: "Koleksiyon kapağı — editorial e-ticaret hero pattern"
description: |
  Gazete mastheads ile flat ürün vitrin'ini birleştirir.
  HR2'nin 5-slide carousel klişesine alternatif.

# Stil uyumluluğu
compatible_styles: [editorial-luxury, editorial-print, minimal-swiss]
incompatible_styles: [brutalist, industrial-workwear, kinetic-agency]

# Sektör uyumluluğu
compatible_sectors: [mucevher, restoran, fotograf, otel]
incompatible_sectors: [insaat-endustri]

# Yasak flag (forbidden atom ise)
forbidden: false                      # true olursa yasak
reason: ""                            # neden yasak (forbidden: true ise dolu)

# Code hint (scaffolder için)
component_name: "HeroBrochure"        # React component adı
props_example: |
  <HeroBrochure
    title="Koleksiyon 2026"
    eyebrow="YENİ"
    image="/hero/brochure.jpg"
  />

# Teknik detay
tech_requirements:
  - "Variable font (Fraunces opsz axis)"
  - "Static image (1600x900)"
motion_primitive: "MO1 GSAP reveal stagger 120ms"

# Research pointer
research_refs:
  - landing-page-conversion-patterns-2026.md
  - typography-variable-fonts-2026.md
```

### Yasak atomlar (15 ID)

Bu atomlar `forbidden: true` flag'li, **hiçbir preset kullanamaz**:

| ID | Kategori | Sebep |
|----|----------|-------|
| TY1 | typography | Inter-only (5+ projede tekrar) |
| TY2 | typography | Playfair + Inter (mücevher 4 proje) |
| TY4 | typography | Instrument Serif + Space Grotesk (2 proje) |
| TY8 | typography | DM Serif + Inter (4 proje) |
| PL1 | palette | Dark #0A0A0A + Gold #C9A84C (5+ mücevher) |
| K1 | kpi | Bento glass card (4 proje) |
| HR2 | hero | Split hero 5-slide carousel (CTR < %1) |
| H8 | header | Difference-blend header (4 proje) |
| HR7 | hero | (forbidden combo'da belirtildi) |
| P1 | pipeline | Card grid pipeline (klişe) |
| T6 | table | Card grid ürün tablosu (klişe) |
| CH1 | chart | Chart.js smooth default (tekrar) |
| CH2 | chart | Chart.js bar default (tekrar) |
| L1 | layout | Standard hero-features-cta (4 proje) |
| F1 | form | (repeat-guard) |

**Nasıl tespit edilir:** Preset YAML'inde `anti_cliche.forbidden_*` listelerinde, atom YAML'ında `forbidden: true`, `validate-combo.js` output'unda.

---

## Sektör schema (10 YAML)

Örnek: `catalog/sectors/mucevher.yaml`

```yaml
---
id: mucevher
name: "Mücevher / Jewelry"
version: "1.0"
updated: "2026-04-19"
---

# Sektör psikolojisi — Claude design card için
psychology:
  - el-emeği
  - ritüel
  - nadir
  - mikro-detay
  - güven (el işi otantiklik)

# Kaçınılması gereken (anti-cliché)
anti_cliche:
  forbidden_palettes: [PL1]           # dark+gold
  forbidden_typography: [TY1, TY2, TY4, TY8]
  forbidden_heroes: [HR2]
  forbidden_tables: [T6]
  forbidden_kpi: [K1]
  warning: "Mücevher için Playfair italic + gold gradient (#0A0A0A bg + #C9A84C) 5+ projede kullanıldı..."

# Repeat-guard context — mevcut mücevher projeleri
existing_projects:
  - name: "Freeman (kuaför ama gold klişe kanıtı)"
    combo: "H8 + N2 + HR2 + F1 + M1 + FT1 + TY1 YASAK + PL1 YASAK + L1 + MO4"
    note: "TY1 ve PL1 yasaklı..."
  - name: "Fatih Bey Mücevher (AKTIF — 8 Mayıs 2026 teslim)"
    combo: "H8 + N2 + HR2 + K1 + T6 + F1 + M1 + FT2 + TY3 + PL10 + L1 + MO4"

# Önerilen pathway ID'leri
recommended:
  palettes: [PL22, PL23, PL11, PL18]
  typography: [TY27, TY28]
  heroes: [HR11, HR3, HR4]
  layouts: [L6, L8]
  motion_primitives: [MO4, MO10]
  kpi: [K2, K5]
  footer: [FT4, FT6]

# 5 Tier bütçe mapping
budget_tiers:
  ultra-budget:
    recipe: nextjs-template-swap
    features: [whatsapp, instagram-feed, katalog-galerisi]
    delivery: "2-3 gün"
    suitability: "✗"                  # ✓✓ / ✓ / ⚠ / ✗
  budget:
    recipe: wordpress-elementor-motion
    # ...
  mid: # ...
  premium: # ...
  enterprise: # ...

# Sektör-spesifik feature katalogu
feature_modules:
  core: [e-ticaret, admin, katalog, wishlist, iyzico, whatsapp]
  optional: [blog, karsilastirma, misafir-alisveris, kampanya]
  special:
    - name: "3D viewer (MeshTransmissionMaterial)"
      tier: "premium"
      research: "research/drei-MeshTransmissionMaterial-research.md"

# Research dosyası pointer
research_refs:
  primary:
    - Mobilyacı/3d-demo/research/jewelry-watch-3d-showcase.md
    - Fatih Bey Mücevher Sitesi/research/
  secondary: [...]
  templates:
    - research/design-claude/templates/SECTOR-RESEARCH.md#mucevher

# 2026 trend uyumu
trends_2026:
  kinetic_typography: yes
  bento_2_0: yes
  maximalism: no
  3d_spline: yes

# Scaffolder için çıktı notları
scaffold_hints:
  font_test_required: ["ı", "İ", "ğ", "ş", "ç", "ö", "ü"]
  mobile_breakpoint: [375, 768, 1280]
  product_gallery: "masonry 3-col desktop, 2-col tablet, 1-col mobile"
  primary_cta: "Koleksiyonu Keşfet"
  trust_badges: "iyzico SSL, KVKK, sertifika"
```

**Kritik alanlar:**
- `anti_cliche.*` — `validate-combo.js` ve `catalog-query` burayı okur
- `existing_projects[]` — repeat-guard (8+ kolon eşleşme = red)
- `recommended.*` — `catalog-query` A/B/C önerisinde kullanılır
- `budget_tiers.*.suitability` — `✓✓ / ✓ / ⚠ / ✗`, MATRIX.md kaynak

---

## Stil schema (10 YAML)

Örnek: `catalog/styles/editorial-luxury.yaml`

```yaml
---
id: editorial-luxury
name: Editorial Luxury
mood: [sakin, rafine, ritmli-whitespace, baski-hissi, premium]
one_liner: "Serif display + variable opsz + bol beyaz alan — gazete/dergi baskı hissi."
---

# Tipografi ailesi
typography:
  display: [Fraunces, Cormorant-Garamond, Instrument-Serif]
  body: [IBM-Plex-Serif, Hanken-Grotesk, Mulish]
  mono: [IBM-Plex-Mono, Geist-Mono, JetBrains-Mono]
  variable_axes: [opsz, wght, SOFT]
  pair_ids: [TY27, TY28, TY9]
  turkish_support: ["i", "İ", "ğ", "ş", "ç", "ö", "ü"]

# Palette aileleri
palette_families:
  - warm-dark                        # PL22
  - off-white-editorial              # PL34
  - tobacco-pearl                    # PL22
  - plum-champagne                   # PL23

# Motion primitives
motion_primitives:
  preferred: [MO4, MO10]
  acceptable: [MO1, MO6]
  forbidden: [MO7-aggressive, MO11-scrolljack-fast]

# Motion stack (tech)
motion_stack:
  required: [GSAP 3.13, Framer Motion v12]
  optional: [Lenis 1.3.4, ScrollTrigger scrub 1.5-2.5]
  forbidden: [bounce easings, elastic, back.out(1.7)]

# Pathway ID tercihleri
preferred_heroes: [HR11, HR3, HR6]
preferred_layouts: [L6, L8, L2]
preferred_footers: [FT4, FT6]

# Yasaklar
forbidden:
  - aggressive-bounce-easing
  - neon-accent
  - glass-morphism
  - PL1-dark-gold
  - TY1-inter-only

# Referans implementations
reference_impls:
  - file: mockups/a-warm-dark/index.html
    score: 5/5

# Sektör uyumluluğu
compatible_sectors: [mucevher, restoran, otel, fotograf, spa, gayrimenkul, klinik]
incompatible_sectors: [insaat-endustriyel]

# Sample (scaffold thumbnail)
sample_palette:
  bg: "#1C1A17"
  surface: "#26221D"
  ink: "#F5EDE0"
  accent: "#E89B7C"
sample_font_pair: "Fraunces opsz 9-144 wght 300-700 + Hanken Grotesk"

tier_fit: [2, 3, 4]
```

**Kritik alanlar:**
- `compatible_sectors` + `incompatible_sectors` — MATRIX.md kaynağı
- `motion_stack.required` — recipe version-lock için
- `sample_palette` + `sample_font_pair` — preview-app thumbnail

---

## Preset schema (60+ YAML)

Örnek: `catalog/presets/mucevher-editorial-luxury.yaml` (gerçek, tam)

```yaml
---
id: mucevher-editorial-luxury
sector: mucevher
style: editorial-luxury
recipe: next-r3f                     # veya next-premium / wordpress-elementor-motion / ...
tier: premium
budget_range_try: [25000, 80000]
delivery_weeks: [3, 5]
matrix_cell: "✓✓"                    # ✓✓ / ✓ / ⚠ / ✗ (compatibility.yaml ile eşleşmeli)
---

mood: [sakin, rafine, premium, editorial]

# Preset-spesifik atom listesi
atoms:
  palette: PL22                      # Tobacco+Pearl (PL1 YASAK)
  typography: TY27                   # Fraunces opsz + IBM Plex
  hero: HR11                         # Brochure cover (HR2 YASAK)
  layout:
    - L8                             # Masonry editorial
    - L6                             # Center single col
  motion:
    - MO7                            # View Transitions
    - MO4                            # Framer layoutId morph
  motion_ajans:
    - wearebrand-blur-36px-reveal
    - ultra-variable-font-opsz-scroll
  header: H2                         # Masthead Centered
  nav: N2                            # Horizontal Tabs Underline
  kpi: K2                            # Band+rules
  table: T3                          # Spec Sheet
  chat: C3                           # Email Threaded
  form: F4                           # Inline Edit
  modal: M1                          # Centered Dialog
  footer: FT4                        # Colophon editorial
  3d_optional:
    - 3D-08-drei-meshtransmission    # cam/taş refraction
    - 3D-03-drei-presentationcontrols
    - 3D-11-gaussian-splat

# Scaffold'un üreteceği component listesi
components:
  core:
    - HeroBrochure
    - MastheadCentered
    - UrunMasonryEditorial
    - UrunDetayEditorial
    - UrunSpecSheet
    - SepetInline
    - CheckoutNative
    - FavoriList
    - ColophonFooter
  optional:
    - Urun3DViewer
    - ARTryOn
    - ScrollStorytelling
    - GaussianSplatViewer

# Anti-cliché (validate-combo.js okur)
anti_cliche:
  forbidden_palettes: [PL1]
  forbidden_typography: [TY1, TY2, TY4, TY8]
  forbidden_heroes: [HR2]
  forbidden_tables: [T6]
  forbidden_kpi: [K1]
  forbidden_patterns:
    - "hero-carousel-5s-autoplay"
    - "glass-morphism-card"
    - "countdown-timer-fake-urgency"
  repeat_score_vs_existing: 1        # Fatih Bey combo'su ile max 2/15 eşleşme
  warning: "Lüks e-ticaret için. Commodity'de data-dense-dashboard default..."

# Scaffold için preview-app + scaffold command
preview_app_route: /preview/mucevher-editorial-luxury
scaffold_command: "node scaffold.js mucevher-editorial-luxury --out ./mucevher-editorial/"

# Research pointer
research_refs:
  - Mobilyacı/3d-demo/research/ecommerce-supabase-payment-turkey-2026.md
  - research/webxr-ar-vr-2026.md

# Scaffolder hint
scaffold_hints:
  mobile_breakpoint: [375, 768, 1280]
  turkish_chars_test: ["ı", "İ", "ğ", "ş", "ç"]
  lighthouse_target: 92
  wcag_contrast_target: "AA (4.5:1) baseline"
  primary_cta: "Sepete Ekle"
  product_gallery: "L8 masonry 3-col"
  checkout_flow: "Sepet → bilgi → ödeme → onay (4 adım)"
  schema: "Product + Offer + AggregateRating + Brand JSON-LD"
  special_features:
    - "3D ürün viewer"
    - "AR try (WebXR)"
    - "Variable font opsz scroll"
```

---

## Recipe schema (7 YAML)

Örnek: `catalog/recipes/next-premium.yaml`

```yaml
---
id: next-premium
name: Next.js 16 Premium (Mid Tier)
tier: 2
---

evidence:
  - url: https://fatihbey-mucevher.com
    note: "Emre'nin Fatih Bey projesi Tier 2 reference"

budget_tier: mid
budget_try: [15000, 25000]
delivery_weeks: [2, 3]
maintenance_monthly_try: [1500, 3000]

core:
  framework:
    name: Next.js
    version: "16.x"
    features: [App Router, Turbopack, RSC, Server Actions]
  runtime:
    node: "22 LTS"
  language:
    name: TypeScript
    version: "5.9+"

frontend_libs:
  styling: [tailwindcss@4.x, class-variance-authority, clsx]
  animation: [gsap@3.13.0, lenis@1.3.4, framer-motion@12.x]
  ui: [shadcn/ui, cmdk, vaul, sonner, lucide-react]
  state: [zustand@5.x, "@tanstack/react-query@5.x"]
  forms: [react-hook-form@7.x, zod@3.x]

backend:
  database: Supabase PostgreSQL 16
  orm: "drizzle-orm@latest"
  auth: "@supabase/ssr"
  storage: "Supabase Storage"

payment:
  primary: iyzipay                   # Türkiye
  international: stripe

seo:
  metadata: "Next.js Metadata API"
  schema: "schema-dts + Product JSON-LD"

deploy:
  target: Vercel
  edge_regions: [fra1, iad1]

# Scaffold command
scaffold_command: |
  pnpm create next-app@latest <project-name> --ts --app --tailwind --turbo
  pnpm add gsap @gsap/react lenis framer-motion zustand

# Sıkı versiyonlar
constraints:
  - "LCP < 2.5s, CLS < 0.1, INP < 200ms"
  - "Mobile Lighthouse >= 90"
  - "WCAG AA full audit (axe-core pass)"
  - "3 breakpoint zorunlu (375/768/1280)"
  - "Supabase RLS her tabloda"

# Version lock (değiştirme yasağı)
red_line:
  - "3D viewer R3F gerekiyorsa → next-r3f (Tier 3)"
  - "Multi-tenant gerekiyorsa → next-enterprise-monorepo (Tier 4)"
```

**7 recipe özeti:**

| Recipe ID | Tier | Stack |
|-----------|------|-------|
| `next-premium` | mid | Next.js 16 + Supabase + Drizzle + GSAP + Lenis |
| `next-r3f` | premium | + React Three Fiber v9 + drei v10 + postprocessing |
| `wordpress-elementor-motion` | budget | WP 6.9 + Hello child theme + Elementor Pro + GSAP + Lenis |
| `shopify-hydrogen` | premium | Hydrogen + Remix + Oxygen deploy |
| `webflow-premium` | premium | Webflow + GSAP (hybrid) |
| `nuxt-ogl-editorial` | premium | Nuxt 3 + OGL shader |
| `claude-design-handoff` | premium+ | Claude Design bundle → kod |

---

## Techstack index (3 YAML)

`catalog/techstack/frontend-index.yaml` — 82 entry frontend teknoloji (FRONTEND-TECHSTACK.md mapping)
`catalog/techstack/3d-index.yaml` — 99 entry 3D teknoloji (3D-TECHSTACK.md mapping)
`catalog/techstack/oss-packages.yaml` — 25 paket (Adoratorio 6, Active Theory 8, Locomotive, Fiddle, 7 closed-source agency)

Her entry:

```yaml
- id: gsap-3.13
  name: "GSAP 3.13"
  category: animation
  license: "Free (all plugins, Webflow acquired)"
  version_locked: "3.13.0"
  url: https://gsap.com
  research_ref: "animation-gsap-framer-lenis-masterclass-2026.md"
  use_cases: [scroll-trigger, split-text, observer, timeline]
  compatible_recipes: [next-premium, next-r3f, wordpress-elementor-motion]
```

---

## ROUTING.yaml (144 feature mapping)

`catalog/ROUTING.yaml` — feature → research dosyası mapping.

Örnek:

```yaml
features:
  e-commerce:
    primary_research: "Mobilyacı/3d-demo/research/ecommerce-supabase-payment-turkey-2026.md"
    secondary:
      - "Mobilyacı/3d-demo/research/checkout-analiz.md"
      - "Mobilyacı/3d-demo/research/iyzico-analiz.md"
    recipes: [next-premium, next-r3f, shopify-hydrogen]

  3d-viewer:
    primary_research: "Mobilyacı/3d-demo/research/drei-MeshTransmissionMaterial-research.md"
    secondary:
      - "3D-TECHSTACK.md (R3F + drei bölümü)"
    recipes: [next-r3f]
    tier_minimum: premium

sectors:
  mucevher:
    default_features: [e-commerce, wishlist, whatsapp, iyzico]
    optional_features: [3d-viewer, ar-try-on, configurator]
```

**Toplam:** 144 feature + 16 sektör (10 ana + 6 alt-variant)

---

## MATRIX.md + compatibility.yaml

`catalog/MATRIX.md` — 10×10 görünür tablo (insan okur).
`catalog/compatibility.yaml` — **kanonik kaynak** (`validate-combo.js` okur).

`compatibility.yaml` şeması:

```yaml
matrix:
  mucevher:
    editorial-luxury: "✓✓"          # default
    immersive-3d: "✓"               # aktif
    kinetic-agency: "⚠"             # koşullu
    brutalist: "✗"                  # forbidden

forbidden_combinations:
  - sector: mucevher
    style: industrial-workwear
    reason: "Hazard stripes + stencil mücevher'in rafine hissini kırar"

conditional_combinations:
  - sector: mucevher
    style: maximalist-atmospheric
    condition: "Genç marka kampanya (koleksiyon launch)"
    note: "Günlük katalog değil, kampanya sayfası OK"

existing_projects:
  - name: "Fatih Bey Mücevher"
    sector: mucevher
    combo: "H8 + N2 + HR2 + K1 + T6 + F1 + M1 + FT2 + TY3 + PL10 + L1 + MO4"
    combo_hash: "abc123..."         # validate-combo.js hash karşılaştırır
    status: "AKTIF — 8 Mayıs 2026 teslim"
```

---

## Yeni atom ekleme (adım adım)

```bash
# 1) Uygun kategori klasörü seç
cd C:/Users/EAS/Desktop/armut/research/design-claude/catalog/atoms/hero/

# 2) Sonraki ID'yi bul (HR17 son → HR18)
ls | sort -V | tail -5

# 3) Yeni YAML yaz (atom schema template'e göre)
# compatible_styles + compatible_sectors doldur
# forbidden: false (yoksa true + reason)

# 4) preview-app atom resolver güncelle
vim C:/Users/EAS/Desktop/armut/research/design-claude/preview-app/src/lib/atom-resolver.ts
# HR18 → HeroNewPattern component mapping ekle

# 5) Component yaz
vim C:/Users/EAS/Desktop/armut/research/design-claude/preview-app/src/components/hero/HeroNewPattern.tsx

# 6) Test
cd preview-app && pnpm dev
# localhost:3000/preview/{bir-preset-id} atomu içeriyorsa görürsün
```

---

## Yeni preset ekleme (adım adım)

```bash
# 1) MATRIX.md'de hedef hücreyi kontrol et
# mucevher × maximalist-atmospheric = ⚠ (koşullu OK)

# 2) Mevcut benzer preseti kopyala
cp catalog/presets/mucevher-editorial-luxury.yaml catalog/presets/mucevher-maximalist-atmospheric.yaml

# 3) YAML patch
# - id + sector + style + matrix_cell güncelle
# - budget_range_try + tier güncelle
# - atoms bölümünde stil-uyumlu atomlar seç (styles/maximalist-atmospheric.yaml preferred_*)
# - anti_cliche forbidden_* doldur (sektör + stil birleşimi)
# - repeat_score_vs_existing hesapla (8+ eşleşme varsa vazgeç)

# 4) Validator
node scripts/validate-combo.js catalog/presets/mucevher-maximalist-atmospheric.yaml

# 5) Preview route'u kontrol et
cd preview-app && pnpm dev
# localhost:3000/preview/mucevher-maximalist-atmospheric

# 6) Scaffold testi
node scaffold.js mucevher-maximalist-atmospheric --out /tmp/test-preset/ --force
cd /tmp/test-preset/ && pnpm install && pnpm dev
```

---

## Yeni sektör ekleme (adım adım)

1. `catalog/sectors/<sector>.yaml` yaz (sektör schema'ya göre)
2. `catalog/compatibility.yaml` → `matrix.<sector>` tüm 10 stile ✓✓/✓/⚠/✗ ata
3. `catalog/ROUTING.yaml` → `sectors.<sector>` default + optional features
4. `catalog/MATRIX.md` → yeni satır ekle (10 hücre)
5. `catalog-query/SKILL.md` → sector mapping tablosuna ekle
6. En az 3 preset YAML yaz (default + 2 aktif stil)
7. Validator çalıştır: `node scripts/validate-combo.js --sector <sector>`

---

## Yeni stil ekleme (adım adım)

1. `catalog/styles/<style>.yaml` yaz (stil schema'ya göre)
2. `catalog/compatibility.yaml` → `matrix.*.<style>` tüm 10 sektöre ata
3. En az 3 atom kategorisinde `preferred_<style>` ID'leri belirle (typography / palette / hero)
4. `catalog/MATRIX.md` → yeni sütun ekle
5. En az 3 preset YAML (uyumlu sektörlerle)
6. Validator + preview

---

## Validator kullanımı

```bash
# Tek preset
node scripts/validate-combo.js catalog/presets/mucevher-editorial-luxury.yaml

# Tüm presets
node scripts/validate-combo.js --all

# Matrix rebuild
node scripts/validate-combo.js --matrix

# Custom combo dosyası (proje combo.md)
node scripts/validate-combo.js ./combo.yaml
```

**Kontrol ettiği 4 şey:**
1. **Yasaklı atom ID'leri** (TY1/2/4/8, PL1, K1, HR2, T6, H8, CH1, CH2 …)
2. **Forbidden combinations** (`compatibility.yaml` matrix ✗ hücre)
3. **Repeat-guard** (`existing_projects[].combo` ile 8+ eşleşme = red)
4. **Stil-sektör uyumsuzluğu** (style's `incompatible_sectors` listesinde mi)

---

## Diğer doküman referansları

| Doküman | Ne için |
|---------|---------|
| [README.md](README.md) | Hızlı başlangıç + tablo özet |
| [PIPELINE-GUIDE.md](PIPELINE-GUIDE.md) | `/project-start` 8 stage + 5 senaryo |
| [TROUBLESHOOT.md](TROUBLESHOOT.md) | Hata → çözüm |
| [SYSTEM-OVERVIEW.md](SYSTEM-OVERVIEW.md) | 4 katman mimari |
| [../catalog/MATRIX.md](../catalog/MATRIX.md) | 10×10 görünür tablo |
| [../catalog/compatibility.yaml](../catalog/compatibility.yaml) | Kanonik matrix + forbidden |
| [../catalog/ROUTING.yaml](../catalog/ROUTING.yaml) | Feature → research mapping |
