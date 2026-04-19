# YOL HARİTASI — design-claude Kataloğu + Otomatik Tasarım Pipeline'ı

> **Tarih:** 2026-04-19 · **Kaynak:** 5 paralel agent deep-audit (67 dosya, 12,700 satır HTML + 9 MD + wearebrand assets + 6 scraped agency)
> **Durum:** PLAN — uygulama için onay bekliyor.
> **Amaç:** "Armut'tan gelen her proje için Claude'un katalogdan otomatik teknoloji/stil/animasyon seçmesi, iskeletini kurması, senin hiçbir manuel kod yazmadan teslim etmen."

---

## 0 · TL;DR (Tek Ekran)

Repo'da **47+ dosya, 12,700 satır HTML, 9 MD research, 3 CRM combo, 6 scraped ajans + wearebrand asset** var. Design Council sistemi kurulmuş (4 katman enforcement, 14 agent). Ama:

- **Catalog makine-okunmaz** (HTML+MD, query edilemez)
- **Sektör başına 1 template** (10 sektör × 6 style = 60 istiyoruz, şu an 20 var)
- **combo.md → kod uyumu %67** (spec'in üçte biri koda geçmemiş — audit kanıtı)
- **Trigger chain manuel** (skill'ler birleşmiyor)
- **WordPress path yok** (fraxbit + wearebrand Awwwards'i WordPress ile kazanıyor)
- **Mobile responsive 0/14 template** (kritik açık)
- **800+ teknoloji indexi direkt query edilemez**

**Çözüm:** 6 fazda, **tek komut** → `/project-start [brief]` → catalog query → 3 preset öneri → onay → Next.js **veya** WordPress iskelet → SEO + schema → launch.

**Toplam:** 74-76 saat (~8-10 çalışma günü). Sen hiçbir aşamada manuel kod yazmıyorsun.

---

## 1 · MEVCUT DURUM (audit çıktısı)

### 1.1 Envanter
| Grup | Dosya | Satır | Kalite (audit) |
|------|-------|-------|----------------|
| 14 sektör template (01–14) | 14 HTML | 4,806 | 01–07: 3-4/5 (responsive yok), 08–14: 4-5/5 |
| 4 v2 CRM variant | 4 HTML | 3,010 | v2-immersive-3d: **5/5** |
| 3 mockup | 3 HTML | 1,285 | a-warm-dark: **5/5** (zero klişe) |
| 3 insaat-crm combo | 3 HTML | 1,874 | b-edge: 4.2/5, c-hybrid: 4.0/5, a-safe: 3.5/5 |
| 1 v1 CONSTRUO (iptal) | 1 HTML | 1,445 | **1/5 — 7 klişe yığını** (deprecate) |
| 9 MD research | 9 MD | ~6,500 | SCRAPED-STACKS en değerli (13 ajans scrape) |
| 6 scrape ajans | 6 HTML | ~600KB | wearebrand + mdx + fraxbit **promote**; marcelo + theo reject |
| wearebrand assets | 4 dosya | 114KB | animations.js'ten **6 pattern MIT-safe extract** edilir |

### 1.2 Altın Madeni Dosyalar (üretime direkt referans)
1. **templates/14-ultra/index.html (660 satır)** — 14 signature technique mapped with line numbers:
   - Blur-36px char reveal (612-618), Porthole dive scale 6.5x (578-584), CSS mask --mask-y (85-87), Magnetic elastic.out(1,0.3) (536-546), ScrambleText (597-610), Variable font opsz scroll (586-595), Dual cursor + back.out (520-546), SVG textPath bend marquee (454-466), SVG feTurbulence grain (62-63), Canvas2D cursor trail (548-570), SplitText chars+lines (621-628), Clip-path 4-yön reveal (314-315), Theme switch on scroll (637-645), Scroll-scrubbed char opacity (612-618)
2. **v2-immersive-3d/index.html (967 satır)** — Three.js procedural 5-kat kule, scroll-camera binding, particles, sun/rim/accent lights, glass UI overlay
3. **templates/12-immersive-3d/index.html (476 satır)** — IcosahedronGeometry crystal + 8 orbiting + particle system + scroll-linked camera path
4. **insaat-crm/b-edge/index.html (723 satır)** — Full Lenis 1.1.14 + GSAP ScrollTrigger production bridge, interactive map, barometer gauge, terminal log
5. **wearebrand-animations.js (30KB)** — wabSplit DIY SplitText (1-66), Lenis+GSAP ticker bridge (707-726), Blur-36px reveal (148-194), Magnetic elastic (738-784), Theme switch on scroll (276-297)

### 1.3 Klişe Yığını (DEPRECATE)
- **index.html v1 (1,445 satır)** = Freeman/Kadıköy recipe = dark+gold+glass+custom-cursor+noise+aurora+italic-gradient = **yasak listeye referans**

### 1.4 Design Council Çıktısı (insaat-crm)
Simüle council 3 combo üretti. **Audit sonucu:**
- Combo A (Safe): spec 12/14 ✓, MO3+MO4 vanilla JS (spec → Framer yoktu)
- Combo B (Edge): spec 13/14 ✓, CH5 ECharts yoksun (spec ihlali)
- Combo C (Hybrid): spec 13/14 ✓, C3 Email Threaded yoksun (archive use-case için acceptable)
- **Adversary onayı kağıt üstü**, build-time enforce edilmiyor.

---

## 2 · PROBLEM ANALİZİ

### Problem 1 — Catalog = MD Dosyaları
Claude query edemiyor. Her proje için SECTOR-RESEARCH.md, DESIGN-PATHWAYS.md, SCRAPED-STACKS.md re-read ediliyor. **10 sektör × 6 style × 120 atom = 7,200 olası kombinasyon** — MD ile navigate imkansız.

**Çözüm:** YAML katalog. Her atom/preset/recipe ayrı dosya, frontmatter'lı, Claude grep-filter ile query'liyor.

### Problem 2 — Spec-Code Drift
Audit kanıtı: 3 combo'da 5 spec ihlali. combo.md "CH5 Apache ECharts" → kodda ECharts yok. Council güzel, **enforcement yok**.

**Çözüm:** `validate-combo.js` — YAML'deki ID'ler kodda gerçek mi lint ile check.

### Problem 3 — Sektör Başına 1 Template
Mücevher müşterisi "editorial değil, minimal-swiss" derse yeni template yazmak = 3-5 saat. **Choice paralize eden şey: template değil, combinatoral eksiklik.**

**Çözüm:** 10 sektör × 6 style = 60 preset matrisi. Her preset YAML. Compose edilir, üretilir.

### Problem 4 — 800+ Teknoloji Query Edilemez
3D-TECHSTACK (350+) + FRONTEND-TECHSTACK (800+) indexleri MD'de. "Bu proje Three.js mi Spline mi?" → research dosyası aç + oku + karar ver = yavaş.

**Çözüm:** `techstack/*.yaml` — her tech: {name, type, bundle_kb, use_case, alternatives, production_score, detailed_research: path}. Claude filtreleyip cevap veriyor.

### Problem 5 — WordPress Yok
- **fraxbit.com:** WordPress + Elementor Pro 3.35.7 + GSAP 3.12.5 + Lenis 0.2.28 → Awwwards Honorable Mention
- **wearebrand.io:** WordPress + Custom Theme + Barba + Lenis 1.2.3 + GSAP → Awwwards SOTD Gold

Sen 7.5-12K TL tier'ı ile WordPress bitirebilirsin (3-5 gün) ama sistemde yok → elden kaçıyor.

**Çözüm:** `wordpress-elementor-motion.yaml` recipe + `scaffold-wp.js` Elementor JSON üretici.

### Problem 6 — Trigger Chain Manuel
Hook (`design-council-reminder.js`) var ama tek aşama. Full pipeline yok: brief → catalog → scaffold → polish → council → seo → launch.

**Çözüm:** `/project-start` slash komut + `project-pipeline.js` master orchestrator.

### Problem 7 — Mobile Responsive 0/14
Audit: 7 sektör template'inin **hiçbirinde media query yok**. Desktop-only.

**Çözüm:** Scaffold base'de zorunlu breakpoint (375/768/1280), her component responsive.

---

## 3 · HEDEF MİMARİ (4 Katman)

```
┌─────────────────────────────────────────────────────────────┐
│  L4: TRIGGER CHAIN (tek komut)                              │
│  /project-start "brief" →                                   │
│    meeting-analysis → tech-detect (Stage 1.5) →             │
│    catalog-query (3 preset) → ONAY →                        │
│    claude-design-handoff? (opsiyonel) →                     │
│    scaffold (nextjs/wp) → frontend-design polish →          │
│    design-council (validator) → seo-audit →                 │
│    schema-markup → code-reviewer → launch-strategy          │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  L3: SCAFFOLDER                                             │
│  preset.yaml + sector.yaml + style.yaml + recipe.yaml →     │
│    scaffold/nextjs-16-base/ (Next.js 16 + Tailwind v4 +     │
│    shadcn/ui + 50 component) OR                             │
│    scaffold/wordpress-elementor/ (Hello child theme +       │
│    Elementor JSON + wab-safe-animations.js) →               │
│    working dev server (5 dakikada hazır) + combo.yaml       │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  L2: QUERY SKILL (~/.claude/skills/catalog-query/)          │
│  query_catalog(sector, budget, features, constraints) →     │
│    3 ranked preset (A safe / B edge / C hybrid) +           │
│    anti-cliché flags + rationale                            │
│  get_recipe(style) → stack.yaml                             │
│  get_techstack(feature) → filtered tech list                │
│  validate_combo(yaml) → lint report                         │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  L1: CATALOG (YAML — machine-readable)                      │
│  catalog/                                                   │
│    ├── atoms/        — 120+ pattern (H/N/HR/K/P/T/C/CH/...)│
│    ├── sectors/      — 10 × {psikoloji, anti-cliché, ...}  │
│    ├── styles/       — 6 × {brutalist/editorial/kinetic/   │
│    │                        immersive-3d/maximalist/       │
│    │                        minimal-swiss}                 │
│    ├── presets/      — 50-60 × (sector × style kombin)     │
│    ├── recipes/      — 5 × {next-premium, next-r3f,        │
│    │                        webflow, wp-elementor, nuxt}   │
│    ├── techstack/    — 800+ tech indexed (pointer-only)    │
│    └── compatibility.yaml — anti-cliché matrix             │
└─────────────────────────────────────────────────────────────┘
```

### 3.1 YAML Schema Örnekleri

**catalog/atoms/HR11.yaml:**
```yaml
---
id: HR11
name: Brochure Cover Hero
category: hero
description: 2-col grid, large italic serif display (clamp 72-132px), framed product visual
---
usage_sectors: [mucevher, restoran, otel, spa, fotograf]
forbidden_with: [PL1]  # dark+gold yasak
requires:
  typography: [variable-serif-opsz]
  motion: optional  # CSS-only olabilir
reference_impl:
  - file: templates/02-mucevher/index.html
    lines: 74-78
  - file: templates/04-restoran/index.html
    lines: 76-81
variants:
  - name: photo-framed
    visual: 3/4 aspect, symbol ◎
  - name: object-centered
    visual: 4/5 aspect, product render
preview_html: previews/atoms/HR11.html
```

**catalog/sectors/mucevher.yaml:**
```yaml
---
id: mucevher
name: Mücevher / Jewelry
psychology: [el-emegi, ritüel, nadir, mikro-detay, ritüel]
---
anti_cliche:
  - PL1  # dark #0A0A0A + gold #C9A84C + Playfair italic + gold gradient
  - TY1  # Inter-only
  - HR2  # split-hero
warning_history: "5+ mücevher projesinde aynı recipe kullanıldı — repeat guard zorunlu"
recommended_palettes: [PL22, PL23]  # Tobacco+Pearl, Plum+Champagne
recommended_typography: [TY27, TY28]  # Fraunces, Cormorant Garamond
recommended_heroes: [HR11, HR3]
recommended_layouts: [L6, L8]
motion_approach: sakin  # MO4+MO10, fast/aggressive kaçın
budget_tiers:
  low: { recipe: wordpress-elementor-motion, deliver: 3-5 gün }
  mid: { recipe: next-premium, deliver: 2 hafta }
  high: { recipe: next-r3f, deliver: 3 hafta, features: [3d-viewer, gaussian-splat] }
```

**catalog/styles/editorial-luxury.yaml:**
```yaml
---
id: editorial-luxury
name: Editorial Luxury
mood: [sakin, rafine, ritmli-whitespace, baskı-hissi]
---
typography:
  display: [Fraunces, Cormorant-Garamond, Instrument-Serif]
  body: [IBM-Plex-Serif, Mulish, Hanken-Grotesk]
  mono: [IBM-Plex-Mono, JetBrains-Mono]
palette_families: [warm-dark, off-white-editorial, tobacco-pearl, plum-champagne]
motion_primitives: [MO4-framer-layout-id, MO6-splittext, MO10-print-first]
forbidden: [aggressive-bounce, neon-accent, glass-morphism]
reference_files:
  - mockups/a-warm-dark/index.html  # 5/5 production score
  - mockups/b-off-white-editorial/index.html
  - templates/02-mucevher/index.html
  - templates/04-restoran/index.html
```

**catalog/recipes/wordpress-elementor-motion.yaml:**
```yaml
---
id: wordpress-elementor-motion
name: WordPress + Elementor Pro + GSAP Motion Design
evidence: [fraxbit.com Awwwards HM, wearebrand.io Awwwards SOTD]
tier: budget
---
core:
  cms: WordPress 6.9+
  theme: Hello Elementor (child theme)
  builder: Elementor Pro 3.35+
  motion_addon: Motion Design for Elementor by MasterAddons
frontend:
  - GSAP@3.13 (all free plugins: ScrollTrigger, SplitText, ScrambleText, MorphSVG, Draggable, Flip)
  - Lenis@1.3.4
  - Barba@2.10.3 (optional, page transitions)
  - Custom wab-safe-animations.js (rewrite from wearebrand, MIT-safe)
seo: [Rank-Math, Schema-Pro]
deploy: [cPanel, Cloudflare Proxy]
delivery_time: 3-5 gün
budget_range_try: [7500, 15000]
monthly_maintenance_try: [750, 1500]
scaffold_command: "node scaffold-wp.js {preset} --out ./wp-export/"
```

---

## 4 · 6 FAZLI UYGULAMA PLANI

### Faz 0 — Konsolidasyon + Catalog Skeleton (10-12 saat)

**Deliverables (~200 yeni YAML):**
- `catalog/schema.md` — field tanımları (zorunlu, opsiyonel, validation rules)
- `catalog/atoms/*.yaml` — 120+ (H1-H10, N1-N10, HR1-HR17, K1-K13, P1-P10, T1-T8, C1-C6, F1-F8, M1-M6, FT1-FT8, CH1-CH12, TY1-TY44, PL1-PL38, L1-L11, MO1-MO12)
- `catalog/sectors/*.yaml` — 10 (insaat, mucevher, kuafor, restoran, klinik, eticaret, spa, fotograf, gayrimenkul, otel)
- `catalog/styles/*.yaml` — 6 (brutalist, editorial-luxury, kinetic-agency, immersive-3d, maximalist-atmospheric, minimal-swiss)
- `catalog/recipes/*.yaml` — 5 (next-premium, next-r3f, wordpress-elementor-motion, webflow-premium, nuxt-ogl-editorial)
- `catalog/techstack/*.yaml` — 800+ tech (kısa index, detaylı MD dosyaya pointer)
- `catalog/compatibility.yaml` — anti-cliché matrix

**Kaynak kullanımı (parse + split):**
- SECTOR-RESEARCH.md (10 sektör) → sectors/ × 10
- DESIGN-PATHWAYS.md (armut/ kökünde, 120+ pattern) → atoms/ × 120
- SCRAPED-STACKS-2026.md (13 ajans) → recipes/ × 5 + signature_patterns/ × 15
- 2026-ADVANCED-TECHNIQUES.md (fraxbit/mdx/wearebrand detay) → atoms/ içine technique snippet
- FRONTEND-TECHSTACK.md + 3D-TECHSTACK.md → techstack/ × 800 (index-only, detay pointer)
- Audit'ten promote edilen **15 atom** (HR9-SVG-Map, HR11-Brochure, HR12-QA, Blur-36px-Reveal, Porthole-Dive, Magnetic-Elastic, Variable-Font-Opsz, Lenis+GSAP-Bridge, Hazard-Stripe, Barometer-Gauge, Terminal-Log, Corner-Bracket-4dir, Blueprint-Title-Block, Spec-Sheet-Toggle, Column-Chart-Grow)

**Risk:** Schema v0.1 olgunlaşmamış — Faz 2'de tune.
**Onay gate:** Schema + 10 örnek YAML → "bu yapı doğru mu?"

---

### Faz 1 — Query Skill + Anti-Cliché Validator (8 saat)

**Deliverables:**
- `~/.claude/skills/catalog-query/SKILL.md`
  - Trigger keyword: "site yap", "tasarım öner", "stack seç", sektör adı
  - Input: brief, sector, budget, features, constraints
  - Output: 3 preset (A/B/C) + atom listesi + rationale + preview link
- `~/.claude/skills/catalog-query/scripts/query.js` — Node, filesystem YAML filter
- `scripts/validate-combo.js` — combo.yaml → anti-cliché + repeat score
- `catalog/MATRIX.md` — 10 sektör × 6 style = 60 hücre (valid/forbidden tablosu)

**Çalışma:**
```
User: "Kuafor sitesi, Kadıköy'de bir salon, modern ama ürkek değil"
Skill:
  sector=kuafor
  style_candidates=[editorial-luxury, minimal-swiss, kinetic-agency]
  constraints=[no-freeman-dark-gold-cliche]
Query:
  catalog/sectors/kuafor.yaml → anti_cliche: [PL1]
  catalog/styles/editorial-luxury.yaml + minimal-swiss.yaml + kinetic-agency.yaml
  cross-ref atoms/ for HR3, HR11, TY29, TY30, PL24, PL25
Compose 3:
  A safe:   kuafor-editorial-luxury (PL24 + TY29 + HR3)
  B edge:   kuafor-kinetic-agency (PL25 + TY30 + HR11)
  C hybrid: kuafor-minimal-swiss (PL24 + TY30 + HR3)
Validate:
  ✓ PL1 yok
  ✓ TY1 yok
  ✓ Repeat skor 2/15 (safe)
Return: 3 preset + atom listesi + preview HTML link
```

**Risk:** YAML query yavaş → SQLite index backup (Faz 0'da schema hazır olursa)
**Onay gate:** 3 test case (kuafor, mücevher, inşaat) — skill çıktısı senin onayından geçer

---

### Faz 2 — 50-60 Preset Üretimi (Sector × Style) (16 saat)

**Deliverables:**
- `catalog/presets/[sector]-[style].yaml` — 60 YAML (10 bazısı yasak, ~50 aktif)
- `previews/[sector]-[style]/index.html` — her preset için 1 HTML önizleme (14-ultra + mockup + audit atom'larından compose)
- `previews/gallery.html` — 60 preset gallery (tek sayfada, sen bir bakışta gör)

**60 matris:**

| Sektör ↓ / Style → | brutalist | editorial-luxury | kinetic-agency | immersive-3d | maximalist | minimal-swiss |
|--------------------|-----------|------------------|----------------|--------------|------------|---------------|
| insaat             | ✓         | ⚠ (kontrol)     | ✓              | ✓            | ✗ (güven-) | ✓             |
| mucevher           | ✗         | ✓ (PL1 yasak)   | ⚠              | ✓            | ⚠          | ✓             |
| kuafor             | ✗         | ✓               | ✓              | ✗            | ⚠          | ✓             |
| restoran           | ⚠         | ✓               | ⚠              | ✗            | ✓          | ✓             |
| klinik             | ✗         | ✓               | ✗              | ⚠            | ✗          | ✓             |
| eticaret           | ✓         | ⚠               | ✓              | ✓            | ✓          | ✓             |
| spa                | ✗         | ✓               | ✗              | ✗            | ✗          | ✓             |
| fotograf           | ⚠         | ✓               | ✓              | ✓            | ✓          | ✓             |
| gayrimenkul        | ✗         | ✓               | ⚠              | ✓            | ⚠          | ✓             |
| otel               | ✗         | ✓               | ⚠              | ✓            | ✓          | ✓             |

✓=valid, ⚠=kontrollü, ✗=forbidden (güven/sektör uyumsuzluğu)

**Tahmini aktif:** ~50 preset (60 - 10 forbidden)

**Üretim:** Paralel 6 agent, her biri 1 style + 10 sektör = 10 preset. 6 agent × 10 preset = 60.

**Risk:** Agent'lar preset kalitesi düşük üretir → 10 test preset önce, beğenmediysen refine brief, sonra batch.
**Onay gate:** gallery.html → sen tek tek işaretle, kırmızılar revize.

---

### Faz 3 — Next.js 16 Scaffolder (16 saat)

**Deliverables:**
- `scaffold/nextjs-16-base/` — Next.js 16 + Tailwind v4 (fallback v3) + shadcn/ui iskelet
- `scaffold/nextjs-16-base/app/` — App Router + RSC layout
- `scaffold/nextjs-16-base/src/components/` — 50 React component (14-ultra + wearebrand + insaat-crm + template'lerden extract)
  - **Hero:** `HeroBrochure.tsx`, `HeroInteractiveMap.tsx`, `HeroQAConversational.tsx`, `HeroPortholeDive.tsx`, `HeroKineticSerif.tsx`, `HeroImmersive3D.tsx`
  - **Motion:** `BlurReveal.tsx`, `MagneticButton.tsx`, `VariableFontOpsz.tsx`, `ScrambleText.tsx`, `ThemeScrollSwitch.tsx`, `CanvasTrail.tsx`, `SVGGrainOverlay.tsx`, `ClipPathReveal.tsx`, `TextPathBendMarquee.tsx`
  - **Layout:** `BentoAsymmetric.tsx`, `CenterColumnNarrow.tsx`, `FullBleedRails.tsx`, `StickySidebarFeed.tsx`, `MasonryColumns.tsx`
  - **Data:** `DenseTable.tsx` (Linear-style), `SpecSheet.tsx`, `TerminalLog.tsx`, `ReceiptStrip.tsx`, `Sparkline.tsx`, `BarometerGauge.tsx`, `ColumnChartGrow.tsx`, `TimelineVertical.tsx`, `TimelineMilestones.tsx`
  - **Interaction:** `CommandPalette.tsx` (⌘K), `BottomSheet.tsx`, `InlineExpand.tsx`, `WizardSteps.tsx`, `EmailThreaded.tsx`
  - **3D:** `Immersive3DCanvas.tsx` (R3F + drei), `CrystalScene.tsx`, `ScrollCameraPath.tsx`, `ParticleSystem.tsx`
  - **Chrome:** `CornerBracketFrame.tsx`, `HazardStripe.tsx`, `ConcreteTexture.tsx`, `PlateHeader.tsx`, `SignatureBlock.tsx`
- `scaffold/nextjs-16-base/src/hooks/` — `useLenis.ts`, `useGSAP.ts`, `useScrollTrigger.ts`, `useMagneticHover.ts`
- `scaffold/nextjs-16-base/src/lib/` — `wab-safe-animations.ts` (wearebrand 6 pattern — MIT-safe rewrite)
- `scaffold.js` — Node CLI orchestrator

**Kullanım:**
```bash
node scaffold.js mucevher-editorial-luxury --out ../client-ankara-mucevher/
cd ../client-ankara-mucevher && pnpm install && pnpm dev
# 30 saniyede çalışıyor, preset'in 3 hero + K2 + T2 + FT5 + PL22 + TY27 uygulanmış
```

**Zorunlu responsive:** Her component breakpoint (375/768/1280), mobile-first Tailwind.

**Risk:** Tailwind v4 alpha bug → v3 fallback otomatik.
**Onay gate:** İlk test (mucevher-editorial-luxury) → `pnpm dev` başarılı, sen browse et.

---

### Faz 4 — WordPress Scaffolder (8 saat)

**Deliverables:**
- `scaffold/wordpress-elementor/` — Hello Elementor child theme
  - `functions.php` — GSAP 3.13 + Lenis 1.3.4 + Barba 2.10.3 enqueue (sadece gerektiğinde)
  - `style.css` — child theme header + reset
  - `assets/wab-safe-animations.js` — MIT-safe rewrite (wearebrand 6 pattern)
  - `assets/main.css` — preset'e göre CSS vars injected
- `scaffold/wordpress-elementor/templates/*.json` — Elementor template (preset → JSON serialize)
- `scaffold-wp.js` — Node CLI

**Kullanım:**
```bash
node scaffold-wp.js kuafor-minimal-swiss --out ../wp-export/
# Çıktı: wp-content/themes/kuafor-minimal-swiss-child/
#        + templates/*.json (Elementor import edilecek)
#        + README (nasıl yükleyeceğin)
```

**Tier mapping:**
- Budget müşteri (7.5-12K TL, 3-5 gün) → WordPress
- Premium müşteri (15K+ TL, 2-3 hafta) → Next.js
- **Karar catalog-query skill içinde** (`budget` field'ı recipe seçiyor)

**Kritik:** wearebrand-animations.js'in 6 pattern'i **yeniden yazılır** (MIT lisans). Direkt kopya-yapıştır yok.

**Risk:** Elementor Pro 3.35+ vs 4.x schema farkı → 3.35 target.
**Onay gate:** Test import → localhost WordPress'e yükle, görüntüle.

---

### Faz 5 — Trigger Chain + Pipeline Entegrasyonu (8 saat)

**Deliverables:**
- `~/.claude/hooks/project-pipeline.js` — master orchestrator (UserPromptSubmit)
- `~/.claude/commands/project-start.md` — `/project-start [brief]` slash komut
- `armut/SITE-GELISTIRME-PIPELINE.md` — Aşama 3.8 "Catalog Query" eklendi
- `~/.claude/CLAUDE.md` — yeni skill + workflow referansı
- `.claude/projects/.../memory/feedback_catalog_pipeline.md` — memory entry

**Akış:**
```
/project-start "Ankara Fatih Bey Mücevher, premium e-ticaret, 3D ürün viewer, 25K TL"
    ↓
Stage 1 — Intake: meeting-analysis (toplantı transkripti varsa) / direkt brief
    ↓
Stage 1.5 — Tech Detection: sektör=mucevher, budget=25K, features=[e-ticaret, 3d-viewer, product-config]
    ↓
Stage 3.7 — Design Council (mevcut 14 agent, 5 tur)
    → combo önerileri
    ↓
Stage 3.8 — Catalog Query (YENİ)
    → catalog'dan 3 preset üret (A/B/C)
    → anti-cliché validator (Freeman PL1 yasak)
    → combo.md ↔ preset.yaml eşleştir
    ↓
[SEN ONAYLA: A / B / C / hybrid]
    ↓
Stage 3.85 — Claude Design Handoff (OPSIYONEL)
    Eğer tamamen özel görsel istiyorsan:
    → claude.ai/design ile visual exploration
    → handoff bundle (tokens.css + components) → preset'e merge
    ↓
Stage 4 — Scaffold
    → budget >= 15K → scaffold.js (Next.js)
    → budget < 12K  → scaffold-wp.js (WordPress)
    → 5 dakikada dev server hazır
    ↓
Stage 5 — Polish
    → frontend-design skill (kalite kontrol)
    → Lighthouse ≥ 90 zorunlu
    ↓
Stage 6 — SEO + Schema (zincir)
    → seo-audit → schema-markup (Product JSON-LD) → site-architecture
    ↓
Stage 7 — Code Review
    → code-reviewer skill
    → güvenlik + performans pass
    ↓
Stage 8 — Launch
    → launch-strategy skill
    → deploy plan (Vercel + Supabase / cPanel + Cloudflare)
```

**Risk:** Hook performance — uzun pipeline, user sabırsız olursa → her stage async + visible progress.
**Onay gate:** Bir test proje end-to-end (Fatih Bey tercih) → her stage sen onayla.

---

### Faz 6 — Doğrulama + Dokümantasyon (8 saat)

**Deliverables:**
- **3 end-to-end test proje** (bir sektörden bir stack):
  1. `test-projects/test-kuafor-minimal-swiss/` — Next.js 16, zero-3D, fast build
  2. `test-projects/test-eticaret-maximalist/` — Next.js + R3F + product configurator
  3. `test-projects/test-restoran-editorial/` — WordPress + Elementor + Lenis + Barba
- `DOKUMAN/README.md` — senin için kullanım rehberi (5 dk oku)
- `DOKUMAN/CATALOG-STRUCTURE.md` — YAML schema referansı
- `DOKUMAN/PIPELINE-GUIDE.md` — `/project-start` kullanımı + örnekler
- `DOKUMAN/TROUBLESHOOT.md` — scaffold hataları, WP import sorunları
- Her test proje için Lighthouse raporu (Performance, A11y, SEO ≥ 90)

**Kabul kriterleri (tümü geçmeli):**
- ✓ `/project-start` → 5 dk içinde scaffold hazır?
- ✓ Preset gallery'deki seçim üretime taşınıyor mu?
- ✓ Anti-cliché validator yasaklı ID içeren combo'yu RET'liyor mu?
- ✓ WordPress scaffold wp-admin'e import ediliyor mu?
- ✓ Mobile Lighthouse ≥ 90 (Performance + A11y + Best Practices + SEO)?
- ✓ Design Council combo ↔ catalog preset tutarlılığı %100?

**Onay gate:** 3 test projenin raporu + senin "kabul ediyorum" onayın.

---

## 5 · WORDPRESS KARARI (DETAY)

### 5.1 Niçin WordPress? — Kanıt

| Ajans | Stack | Sonuç |
|-------|-------|-------|
| **fraxbit.com** | WordPress 6.9 + Elementor Pro 3.35.7 + GSAP 3.12.5 + Lenis 0.2.28 + Motion Design Addon | Awwwards **Honorable Mention** |
| **wearebrand.io** | WordPress + Custom Theme + Barba 2.10.3 + Lenis 1.2.3 + GSAP + Custom animations.js | Awwwards **SOTD Gold** |
| Marcelo Design X | WordPress + Divi (plugin yığını, modern JS yok) | Standart ajans, **promote edilmez** |

**Ders:** WordPress "düşük kalite" algısı yanlış. Kötü olan **Divi + plugin stacking** — Custom theme + GSAP + Barba premium Awwwards kazanıyor.

### 5.2 İki Tier

**Tier A — Budget (Armut standard müşteri)**
- **Fiyat:** 7.500-15.000 TL
- **Süre:** 3-5 gün teslim
- **Stack:** WordPress 6.9 + Hello Elementor child + Elementor Pro 3.35 + GSAP 3.13 + Lenis 1.3 + wab-safe-animations.js
- **SEO:** Rank Math (ücretsiz)
- **Bakım:** 750-1.500 TL/ay
- **Use case:** Kuaför, küçük restoran, randevu sitesi, servis tanıtım

**Tier B — Premium (büyük müşteri)**
- **Fiyat:** 15.000-50.000 TL
- **Süre:** 2-3 hafta
- **Stack:** Next.js 16 + React 19 + Tailwind v4 + shadcn/ui + R3F + Motion v12
- **CMS:** Payload 3.0 (self-host) veya Supabase
- **Deploy:** Vercel + Supabase + Cloudflare R2
- **Use case:** Mücevher e-ticaret, mobilya 3D, premium kurumsal, ajans portfolyo

### 5.3 Karar Otomatik (catalog-query içinde)

```yaml
decision_rules:
  - if: budget < 12000 AND features does_not_include "3d_viewer" AND features does_not_include "headless_cms"
    recipe: wordpress-elementor-motion
    rationale: "Budget tier, standard features → WordPress 3-5 gün teslim"
  - if: budget < 12000 AND features includes "3d_viewer"
    recipe: next-r3f
    rationale: "WP Three.js zor, maintenance riski yüksek → Next.js önerilir (budget arttır)"
  - if: budget >= 15000
    recipe: next-premium veya next-r3f
    rationale: "Premium tier, full control"
  - if: features includes "headless_cms" OR features includes "native_auth"
    force: next-*
    rationale: "WP headless viable değil, Next.js zorunlu"
```

Claude bu kuralı uyguluyor, sana "WordPress mi Next.js mi?" diye sormuyor. Sen sadece **preset onayı veriyorsun**.

---

## 6 · GLOBAL PIPELINE'A ENTEGRASYON

### 6.1 SITE-GELISTIRME-PIPELINE.md Güncelleme

Aşama 3.7 (Design Council) sonrasına **Aşama 3.8 — Catalog Query** eklenir. Mevcut skill'ler değişmiyor, sadece zincir güçleniyor.

### 6.2 Memory Entry

`.claude/projects/.../memory/feedback_catalog_pipeline.md`:
```markdown
---
name: catalog_pipeline_mandatory
description: Her tasarım işinde design-council sonrası catalog-query tetiklenir. Asla boş Next.js'ten başlama.
type: feedback
---
design-council combo.md ürettikten sonra ASLA boş `npx create-next-app` ile başlama.

Why: Manuel iskelet kurma 3-5 saat alıyor, scaffold 5 dakikada aynı çıktıyı veriyor. Audit kanıtı: insaat-crm combo.md spec-code uyumu %67 — manuel yazarken drift oluyor.

How to apply:
1. catalog-query skill tetikle → preset seç (veya combo.md'yi preset.yaml'a dönüştür)
2. budget < 12K → scaffold-wp.js / budget ≥ 15K → scaffold.js
3. frontend-design polish (kalite kontrol)
```

### 6.3 32 Skill ile Uyum

Catalog sistem mevcut skill'lerle **çatışmıyor**, güçlendiriyor:
- `meeting-analysis` → Stage 1 (değişmez)
- `armut-bidding` → Stage -1 (değişmez)
- `frontend-design` → Stage 5 polish (catalog'dan çıktıyı refine eder)
- `design-council` → Stage 3.7 (combo üretir, catalog combo'yu preset'e dönüştürür)
- `e-commerce-builder` → WordPress ise Elementor + WooCommerce modül, Next.js ise Medusa/Shopify integration
- `3d-site-builder` → catalog-query `features=[3d-viewer]` tespit ederse, Stage 5'te bu skill tetiklenir
- `seo-audit` + `schema-markup` + `site-architecture` → Stage 6 zincir (değişmez)
- `code-reviewer` → Stage 7 (değişmez)
- `launch-strategy` → Stage 8 (değişmez)

---

## 7 · RİSK MATRİSİ

| Risk | Olasılık | Etki | Hafifletme |
|------|----------|------|------------|
| YAML query yavaş (200+ dosya) | Orta | Orta | Faz 0'da SQLite index hazır, fallback var |
| Tailwind v4 alpha bug | Yüksek | Düşük | Scaffold auto-detect, v3 fallback |
| wearebrand pattern rewrite uyumsuz | Düşük | Orta | 6 pattern için test suite, MIT-safe versiyon lib var |
| 60 preset agent üretim kalitesiz | Orta | Yüksek | 10 test preset önce, brief refine, sonra batch |
| Elementor 3.35 → 4.x schema değişir | Düşük | Orta | 3.35 LTS target, lock file |
| Mobile responsive base eksik | Kesin şu an | Yüksek | **scaffold zorunlu breakpoint**, 3 kontrol noktası |
| combo.md ↔ preset drift | Kesin mevcut | Yüksek | validate-combo.js + build-time CI lint |

---

## 8 · TOPLAM BÜTÇE + ZAMAN

| Faz | Saat | İş Çıktısı | Onay Gate |
|-----|------|-----------|-----------|
| 0 — Catalog Skeleton | 10-12 | 200+ YAML + schema | Schema + 10 örnek |
| 1 — Query Skill + Validator | 8 | Skill + validator + MATRIX | 3 test case |
| 2 — 50-60 Preset | 16 | Preset YAML + gallery | Gallery onayı |
| 3 — Next.js Scaffolder | 16 | Scaffolder + 50 component | İlk test scaffold |
| 4 — WordPress Scaffolder | 8 | WP scaffold + Elementor JSON | Test import |
| 5 — Trigger Chain | 8 | Hook + slash + pipeline | End-to-end test |
| 6 — Doğrulama | 8 | 3 test proje + doküman | Lighthouse + kabul |
| **TOPLAM** | **74-76 saat** | **~8-10 çalışma günü** | — |

**Sen bu sürede manuel kod yazmıyorsun.** Onay verip test scaffold'ları beğen/reddet.

---

## 9 · ÜÇ ALTERNATİF

### Seçenek A — Tam Plan (Önerim)
**Faz 0-6 tümü.** 74-76 saat. Çıktı: `/project-start [brief]` tek komutla end-to-end. WordPress + Next.js dualitesi, 50 preset gallery, 3 test proje.
**Kim için:** Armut sürekli iş geliyor, sen scale etmek istiyorsun.

### Seçenek B — MVP (Faz 0 + 1 + 3)
Sadece catalog + query skill + Next.js scaffolder. WordPress ve trigger chain ertelenir.
**Süre:** 34-36 saat (~4 gün).
**Çıktı:** Manuel komutla çalışan sistem. `/project-start` yok. WordPress sonra. Gallery sonra.
**Kim için:** "Hızlı kazan, sonra genişlet."

### Seçenek C — Sadece Katalog (Faz 0)
YAML kataloğu yaz, Claude okusun. Scaffolder yok — manuel Next.js setup devam eder.
**Süre:** 10-12 saat (~1.5 gün).
**Çıktı:** Claude artık catalog'u query ediyor, ama iskelet senin elinde.
**Kim için:** "Önce schema'yı doğrula, sonraki adımı gör."

---

## 10 · ONAY BEKLIYOR

**Hangisi?**

- [ ] **A — Tam plan** (8-10 gün, 6 faz) — Her şey otomatik
- [ ] **B — MVP** (4 gün, 3 faz) — Catalog + Next.js scaffold, WP sonra
- [ ] **C — Sadece katalog** (1.5 gün, 1 faz) — YAML'ları çıkar, gerisini sonra gör
- [ ] **D — Başka** (açıkla — farklı öncelik sırası?)

**Seçimini yazarsan Faz 0'a başlıyorum. Her faz sonunda durur, senin onayın olmadan devam etmem.**

---

## EK A · Atom Ayıklamaları (audit'ten, kategorize)

### A.1 Catalog'a Promote Edilecek Teknikler (evidence-backed)

**Hero patterns:**
- HR9 SVG Interactive Map (templates/01-insaat, templates/09-gayrimenkul, insaat-crm/b-edge — 3 implementasyon)
- HR11 Brochure Cover 2-col (templates/02-mucevher, templates/04-restoran, templates/10-otel)
- HR12 QA Conversational (templates/05-klinik — onboarding flow)
- HR13 Blueprint Title Block (insaat-crm/c-hybrid — engineering dokuman)
- HR14 Zero-Hero Receipt Strip (insaat-crm/a-safe — dashboard direkt)
- HR-Kinetic-Serif (templates/11-kinetic — word-inner translateY stagger)
- HR-Immersive-3D-Crystal (templates/12-immersive-3d + v2-immersive-3d — Three.js procedural)
- HR-Maximalist-Porthole (templates/13-maximalist, templates/14-ultra 578-584)

**Motion primitives:**
- Lenis+GSAP ticker bridge (wearebrand-animations.js 707-726, insaat-crm/b-edge 705-720)
- Blur-36px → 0 char reveal (templates/14-ultra 612-618, wearebrand 148-194)
- Porthole dive scale 1→6.5 (templates/14-ultra 578-584)
- Magnetic elastic.out(1, 0.3) (templates/14-ultra 536-546, wearebrand 738-784)
- Variable font opsz scroll-linked (templates/11, 13, 14 — 393-413, 442-450, 586-595)
- CSS mask --mask-y reveal (templates/14-ultra 85-87, wearebrand_brand 66-80)
- ScrambleText hero (templates/14-ultra 597-610 — GSAP 3.13 free plugin)
- Theme switch on scroll (templates/14-ultra 637-645, wearebrand 276-297)
- Dual cursor + back.out (templates/14-ultra 520-546)
- Canvas2D cursor trail (templates/14-ultra 548-570)
- SVG textPath bend marquee (templates/14-ultra 454-466)
- Clip-path 4-yön reveal (templates/14-ultra 314-315, fraxbit 931-955)
- Parallax via CSS vars (fraxbit 903-919 — `--speed-x`, `--direction-x`)

**Data UI:**
- Linear-style dense table P8+T2 (insaat-crm/a-safe 126-162)
- Sparkline inline SVG CH10 (insaat-crm/a-safe 124)
- Barometer/gauge SVG K9 (insaat-crm/b-edge 209-217)
- Terminal log C4 (insaat-crm/b-edge 293-310)
- Receipt strip T7 (insaat-crm/b-edge 254-291)
- Spec sheet engineering BOM T3 (insaat-crm/c-hybrid 291-327)
- Column chart grow K12 (insaat-crm/c-hybrid 178-226, GSAP animated)
- Timeline milestone P5 (insaat-crm/b-edge 224-264 — horizontal, insaat-crm/c-hybrid 249-287 — vertical)

**Chrome:**
- Corner bracket 4-dir frame H9 (insaat-crm/a-safe 70-82, c-hybrid 53-71)
- Hazard stripe utility (insaat-crm/b-edge 56-57, mockups/c-concrete 62-77)
- Concrete speckle grain (insaat-crm/b-edge 45-53, mockups/c-concrete 50-59)
- Sign board rotated + shadow (mockups/c-concrete 138-146)
- Plate + hazard header H1 (insaat-crm/b-edge 60-83)
- Signature block FT6 (insaat-crm/c-hybrid 381-395)

**Interaction:**
- Command palette ⌘K N5 (insaat-crm/a-safe 83-85, c-hybrid 87-101)
- Bottom sheet M3 (insaat-crm/b-edge 325-331)
- Inline expand M5 (insaat-crm/c-hybrid 364-379)
- Wizard steps F3 (insaat-crm/b-edge 664-700)

### A.2 Pattern'ler Reject Edildi

- **v1 index.html klişe yığını** — 7 overlap pattern yasak listesine eklenir (PL1 + custom cursor + SVG noise + italic gradient + kinetic float + aurora halo + glassmorphism)
- **Marcelo Design X (Divi)** — standard agency template, özgün yok
- **Theo Berry Framer** — designer portfolio, agency template pattern değil
- **Instagram / GitHub profil HTML'leri** — design-relevant değil

---

## EK B · Catalog Folder Yapısı (Faz 0 Çıktısı Önizleme)

```
design-claude/
├── YOL-HARITASI.md                 ← Bu dosya
├── catalog/                        ← YENİ
│   ├── schema.md                   ← YAML field tanımları
│   ├── MATRIX.md                   ← 10 sektör × 6 style görünür tablo
│   ├── compatibility.yaml          ← Anti-cliché kuralları
│   ├── atoms/                      ← 120+ pattern
│   │   ├── hero/
│   │   │   ├── HR1.yaml
│   │   │   ├── HR9.yaml
│   │   │   ├── HR11.yaml
│   │   │   └── ...
│   │   ├── nav/N1-N10.yaml
│   │   ├── header/H1-H10.yaml
│   │   ├── kpi/K1-K13.yaml
│   │   ├── pipeline/P1-P10.yaml
│   │   ├── table/T1-T8.yaml
│   │   ├── chat/C1-C6.yaml
│   │   ├── form/F1-F8.yaml
│   │   ├── modal/M1-M6.yaml
│   │   ├── footer/FT1-FT8.yaml
│   │   ├── chart/CH1-CH12.yaml
│   │   ├── typography/TY1-TY44.yaml
│   │   ├── palette/PL1-PL38.yaml
│   │   ├── layout/L1-L11.yaml
│   │   └── motion/MO1-MO12.yaml
│   ├── sectors/                    ← 10 sektör
│   │   ├── insaat.yaml
│   │   ├── mucevher.yaml
│   │   ├── kuafor.yaml
│   │   ├── restoran.yaml
│   │   ├── klinik.yaml
│   │   ├── eticaret.yaml
│   │   ├── spa.yaml
│   │   ├── fotograf.yaml
│   │   ├── gayrimenkul.yaml
│   │   └── otel.yaml
│   ├── styles/                     ← 6 tone
│   │   ├── brutalist.yaml
│   │   ├── editorial-luxury.yaml
│   │   ├── kinetic-agency.yaml
│   │   ├── immersive-3d.yaml
│   │   ├── maximalist-atmospheric.yaml
│   │   └── minimal-swiss.yaml
│   ├── presets/                    ← 50-60 sector × style
│   │   ├── mucevher-editorial-luxury.yaml
│   │   ├── mucevher-immersive-3d.yaml
│   │   ├── kuafor-minimal-swiss.yaml
│   │   ├── insaat-brutalist.yaml
│   │   └── ...
│   ├── recipes/                    ← 5 stack
│   │   ├── next-premium.yaml
│   │   ├── next-r3f.yaml
│   │   ├── wordpress-elementor-motion.yaml
│   │   ├── webflow-premium.yaml
│   │   └── nuxt-ogl-editorial.yaml
│   └── techstack/                  ← 800+ tech (kısa index)
│       ├── frontend.yaml (800+)
│       ├── 3d.yaml (350+)
│       ├── cms.yaml
│       ├── animation.yaml
│       └── ...
├── scaffold/                       ← YENİ (Faz 3-4)
│   ├── nextjs-16-base/
│   ├── wordpress-elementor/
│   ├── scaffold.js
│   └── scaffold-wp.js
├── previews/                       ← YENİ (Faz 2)
│   ├── gallery.html
│   └── [sector]-[style]/index.html × 60
├── scripts/                        ← YENİ (Faz 1)
│   ├── query.js
│   └── validate-combo.js
├── test-projects/                  ← YENİ (Faz 6)
│   ├── test-kuafor-minimal-swiss/
│   ├── test-eticaret-maximalist/
│   └── test-restoran-editorial/
├── DOKUMAN/                        ← YENİ (Faz 6)
│   ├── README.md
│   ├── CATALOG-STRUCTURE.md
│   ├── PIPELINE-GUIDE.md
│   └── TROUBLESHOOT.md
├── COUNCIL-KURULUM-RAPORU.md       ← Mevcut (referans)
├── INDEX.md                        ← Mevcut (update: catalog referans eklenecek)
├── README.md                       ← Mevcut
├── insaat-crm/                     ← Mevcut (referans test case)
├── templates/                      ← Mevcut (atom kaynağı)
├── mockups/                        ← Mevcut (atom kaynağı)
├── v2-*/                           ← Mevcut (atom kaynağı)
└── research-assets/                ← Mevcut (pattern extraction kaynağı)
```

---

**Plan bitti. Hangisini seçiyorsun: A / B / C / D?**
