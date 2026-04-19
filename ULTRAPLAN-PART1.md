# ULTRAPLAN — design-claude Katalog + Scaffolder + Trigger Chain

**Tarih:** 2026-04-19
**Hazırlayan:** Local session (cloud `/ultraplan` stream timeout yediği için elden yazıldı)
**Kapsam:** Part 1/3 — Bölüm 1-8 (Temel, Stiller). Part 2 (Sektör, Matris, Agent, Pipeline) ve Part 3 (Timeline, Risk, Kabul) ayrı dosyalarda.
**Repo:** https://github.com/arasemre0131/design-claude (PUBLIC)
**Dil:** Türkçe, orthography eksiksiz

---

## 1 · ÖZET / TL;DR

### 1.1 Problem tek cümlede

**Emre her proje için 3-5 saat manuel iskelet kuruyor.** Hedef: **Armut ilanı → 30 dakikada çalışan Next.js 16 dev server** (veya Tier 1'de WordPress). 288 research + 14 template + 47 ajans atomu + 14-agent Design Council sistemi hazır ama **makine-okunabilir değil** — catalog markdown prose olarak yazılı, skill query edemiyor, scaffold komutu yok, 14 template'in 0'ında mobile responsive yok, combo.md ↔ kod uyumu audit'te %67 çıktı (drift kanıtlı).

### 1.2 Çözüm 4 katmanlı

```
L4 TRIGGER CHAIN     /project-start "brief" → end-to-end pipeline (Stage -1 → 8)
L3 SCAFFOLDER        scaffold.js (Next.js 16) + scaffold-wp.js (WordPress + Elementor)
L2 QUERY SKILL       catalog-query (sector, budget, features) → 3 ranked preset + adversary raporu
L1 CATALOG           YAML: atoms/ (120+) · sectors/ (10) · styles/ (10) · presets/ (60) · recipes/ (7) · techstack/ (800+ pointer)
```

### 1.3 6 fazlı plan — toplam 74-76 saat (8-10 çalışma günü)

| Faz | Saat | Deliverable | Onay Gate |
|-----|-----:|-------------|-----------|
| 0 · Catalog skeleton | 10-12 | 200+ YAML + schema | Schema + 10 örnek |
| 1 · Query skill + validator | 8 | catalog-query skill + validate-combo.js + MATRIX.md | 3 test case (kuafor/mücevher/inşaat) |
| 2 · 60 preset üretimi | 16 | 60 preset.yaml + gallery.html | Gallery onay |
| 3 · Next.js scaffolder | 16 | scaffold/nextjs-16-base/ + 50 component + scaffold.js | İlk test scaffold |
| 4 · WordPress scaffolder | 8 | scaffold/wordpress-elementor/ + scaffold-wp.js | Test import |
| 5 · Trigger chain | 8 | /project-start + project-pipeline.js hook | End-to-end test |
| 6 · Doğrulama | 8 | 3 test proje + doküman | Lighthouse + kabul |

### 1.4 Kabul kriteri (sistem "çalışıyor" eşiği)

- ✅ `/project-start` → ≤ 30 dk'da çalışır dev server
- ✅ Mobile Lighthouse ≥ 90 (Performance + A11y + Best Practices + SEO)
- ✅ WCAG AA kontrast pass
- ✅ Yasaklı ID (TY1/2/4/8, PL1, K1, HR2, H8, HR7, P1, T6, CH1, CH2) 0 ihlal — build-time validator kanıtı
- ✅ Türkçe karakter font test (Fraunces + IBM Plex + JetBrains Mono TR subset) pass
- ✅ 3 test projenin 6 fazı geçmiş, CLS < 0.05

### 1.5 Bu ULTRAPLAN'ın formatı

3 parçalı, tablo ağırlıklı, scannable. Her bölüm sonunda `[KAYNAK: dosya.md:satır]` zorunlu. Part 3 Bölüm 24'ün sonunda "bir sonraki adım için 5 öneri" kapanış.

[KAYNAK: YOL-HARITASI.md:1-25 (TL;DR özeti) + YOL-HARITASI.md:601-614 (6 faz zaman tablosu) + INDEX.md:143-149 (envanter özeti)]

---

## 2 · HEDEF — SMART Format

| S.M.A.R.T. | Tanım | Ölçü | Kanıt |
|------------|-------|------|-------|
| **Specific** | Armut ilanından (brief veya toplantı transkripti) → çalışır Next.js 16 veya WordPress dev server'a otomatik dönüşüm | Tek komut `/project-start "[brief]"` | SITE-GELISTIRME-PIPELINE.md:9-33 |
| **Measurable** | (1) 30 dk'da dev server hazır (2) mobile Lighthouse ≥ 90 (3) repeat skor ≤ 3/15 (4) build-time validator 0 yasaklı-ID ihlal | 4 numerik eşik | COUNCIL-KURULUM-RAPORU.md:49-51, YOL-HARITASI.md:483-490 |
| **Achievable** | 74-76 saat çalışma, 1 kişi (Emre + Claude), mevcut 14-agent Council + 32 skill + 288 research → otomasyon katmanı ekle. Sıfırdan yazmıyoruz | 6 faz × gün bütçesi | YOL-HARITASI.md:253-491 |
| **Relevant** | Emre'nin iş modeli: Armut'tan haftada 1-2 ilan → bunların 1 tanesi site projesi. Yılda ~60 proje. Her biri 3-5 saat manuel iskelet = 180-300 saat tasarruf/yıl. Saat × TL = ~30-50 bin TL operasyonel ROI. Ayrıca ilan → teslim süresi kısalır → daha fazla Armut mesajına "evet" diyebilir | Yıllık 180-300 saat | CLAUDE.md - Aktif Projeler tablosu |
| **Time-bound** | 8-10 çalışma günü (74-76 saat), 2026-04-28'e kadar Faz 6 test projesi yayında | Deadline: 2026-04-28 | YOL-HARITASI.md:612 |

### Anti-hedef (yapmayacağımız)

- ❌ Sıfırdan component library yazmak — shadcn/ui + Radix + 47 atom yeterli
- ❌ AI-first: catalog dinamik tutulur (YAML), embedding/vector search **yok** (Faz 7'de düşünülebilir)
- ❌ Desktop-first — mobile breakpoint (375/768/1280) zorunlu, masaüstü ikincil
- ❌ "Generic template" olarak satmak — her proje council + adversary + repeat-guard'dan geçer, iki müşteri aynı combo'yu almaz

[KAYNAK: YOL-HARITASI.md:21-23 (30 dk hedefi) + YOL-HARITASI.md:483-490 (kabul kriterleri) + CLAUDE.md kullanıcı talimatları (Armut iş modeli)]

---

## 3 · MEVCUT DURUM — Audit Bulguları

### 3.1 Envanter (5 agent scan sonucu)

| Grup | Dosya sayısı | Satır | Kalite audit skoru (5 üzerinden) |
|------|:-:|-:|:-:|
| 14 sektör template (`templates/01-14`) | 14 HTML | 4,806 | 01-07: 3-4 (responsive yok), 08-14: 4-5 |
| 4 v2 CRM variant (`v2-*/`) | 4 HTML | 3,010 | v2-immersive-3d: **5/5** |
| 3 mockup (`mockups/a-c`) | 3 HTML | 1,285 | `a-warm-dark`: **5/5** zero-klişe |
| 3 insaat-crm combo (`insaat-crm/a-c`) | 3 HTML | 1,874 | b-edge: 4.2, c-hybrid: 4.0, a-safe: 3.5 |
| 1 v1 CONSTRUO (iptal) | 1 HTML | 1,445 | **1/5** — 7 klişe yığını (deprecate) |
| 9 MD research | 9 MD | ~6,500 | `SCRAPED-STACKS-2026.md` en değerli (13 ajans) |
| 6 scrape ajans | 6 HTML | ~600 KB | wearebrand + mdx + fraxbit promote; marcelo + theo reject |
| wearebrand assets | 4 dosya | 114 KB | `animations.js` → 6 MIT-safe pattern extract edilecek |
| DESIGN-PATHWAYS.md (kök) | 1 MD | 381 | 15 kategori × 120+ pathway |
| FRONTEND-TECHSTACK.md | 1 MD | 526 | 800+ teknoloji index |
| SITE-GELISTIRME-PIPELINE.md | 1 MD | 594 | 8 aşama |

**Toplam (design-claude repo):** 47+ dosya, ~12,700 satır HTML, ~6,500 satır MD, ~600 KB scrape artefaktı.

### 3.2 Altın Madeni Dosyalar (scaffolder'ın referans alacağı)

| Dosya | Neden altın | Hangi fazda tüketilecek |
|-------|-------------|------------------------|
| `templates/14-ultra/index.html` (660 satır) | 14 imza teknik line-number'lı: blur-36px reveal (612-618), porthole dive (578-584), CSS mask --mask-y (85-87), magnetic elastic (536-546), ScrambleText (597-610), variable font opsz (586-595), dual cursor + back.out (520-546), SVG textPath (454-466), feTurbulence grain (62-63), canvas2D trail (548-570), SplitText chars (621-628), clip-path 4-yön (314-315), theme switch (637-645), scroll-scrubbed opacity (612-618) | Faz 0 atom extraction + Faz 3 component rewrite |
| `v2-immersive-3d/index.html` (967 satır) | Three.js procedural 5-kat kule, scroll-camera binding, particles, sun/rim/accent lights, glass UI overlay | Faz 3 `Immersive3DCanvas.tsx` + `ScrollCameraPath.tsx` |
| `templates/12-immersive-3d/index.html` (476 satır) | IcosahedronGeometry crystal + 8 orbiting + particle system + scroll-linked camera path | Faz 3 `CrystalScene.tsx` |
| `insaat-crm/b-edge/index.html` (723 satır) | Full Lenis 1.1.14 + GSAP ScrollTrigger production bridge, interactive map, barometer gauge, terminal log | Faz 3 `BarometerGauge.tsx` + `TerminalLog.tsx` + `InteractiveMap.tsx` |
| `research-assets/wab/wearebrand-animations.js` (30 KB) | wabSplit DIY SplitText (1-66), Lenis+GSAP ticker bridge (707-726), blur-36px reveal (148-194), magnetic elastic (738-784), theme switch (276-297) | Faz 3 `wab-safe-animations.ts` MIT-safe rewrite |

### 3.3 Klişe Yığını (DEPRECATE — yasak listeye referans)

**`index.html` v1 (1,445 satır, `design-claude/index.html`)** = Freeman + Kadıköy recipe:
`PL1 dark + gold` + `custom cursor` + `SVG noise turbulence` + `italic gradient title` + `kinetic float animation` + `aurora halo radial` + `glassmorphism`.
Bu 7 overlap pattern = **"vibe coded" klişesi**, yeni projede kullanılamaz. 13 ID yasak listesinin kökü.

### 3.4 Design Council (insaat-crm) çıktısı — şu anki durum

| Combo | Repeat skor | Adversary | Spec-code uyumu audit | Not |
|-------|:-:|:-:|:-:|-----|
| A · Safe | 2/15 ✓ | ✓ ONAY | 12/14 spec ✓ | MO3+MO4 vanilla JS (spec → Framer yoktu) — minör drift |
| B · Edge | 4/15 ⚠ | ⚠ KOŞULLU | 13/14 spec ✓ | CH5 Apache ECharts yoksun (spec ihlali) |
| C · Hybrid | 4/15 ✓ | ✓ ONAY | 13/14 spec ✓ | C3 Email Threaded yoksun (archive use-case için kabul) |

**Kritik bulgu:** Adversary onayı *kağıt üstünde*, build-time enforce edilmiyor. `scripts/validate-combo.js` yok. Spec → kod drift otomatik yakalanamıyor.

### 3.5 Mobile Responsive Durumu

**7 sektör template'inde (01-07) HİÇBİR media query yok.** Tümü desktop-only. 08-14'te kısmi responsive (`clamp()` font, bazı flex-wrap). Hiçbirinde 375 breakpoint test edilmemiş. Mobile Lighthouse ölçümü yapılmamış.

### 3.6 Trigger Chain Durumu

| Katman | Var mı | Durum |
|--------|:-:|-------|
| `/design-council` slash komut | ✅ | 5 tur çalışıyor, insaat-crm test edildi |
| `design-council-reminder.js` hook (UserPromptSubmit) | ✅ | Keyword tetikleniyor, combo.md yoksa uyarı basıyor |
| Memory feedback entries | ✅ | 5 aktif dosya |
| `/project-start` master orchestrator | ❌ | Yok — Faz 5'te yapılacak |
| `catalog-query` skill | ❌ | Yok — Faz 1'de yapılacak |
| `scaffold.js` (Next.js) | ❌ | Yok — Faz 3 |
| `scaffold-wp.js` (WordPress) | ❌ | Yok — Faz 4 |
| `validate-combo.js` | ❌ | Yok — Faz 1 |

[KAYNAK: YOL-HARITASI.md:29-56 (envanter + altın madenler) + YOL-HARITASI.md:49-57 (Council çıktısı audit) + INDEX.md:18-79 (envanter detay) + COUNCIL-KURULUM-RAPORU.md:96-106 (test sonucu) + templates/14-ultra/index.html:62-645 (14 atom satır numaraları)]

---

## 4 · PROBLEM ANALİZİ — 7 Kritik Boşluk

| # | Problem | Kanıt | Etki | Çözüm |
|:-:|---------|-------|------|-------|
| P1 | Catalog = markdown prose, Claude query edemiyor | 10 sektör × 10 stil × 120 atom = 12,000 olası kombinasyon. MD ile navigate imkansız, her proje için SECTOR-RESEARCH.md + DESIGN-PATHWAYS.md + SCRAPED-STACKS.md yeniden okunuyor | Yüksek — her proje 3-5 saat manuel | YAML catalog (`catalog/*.yaml`), frontmatter'lı, grep-filter ile query |
| P2 | Spec ↔ kod drift | Audit: 3 combo'da 5 spec ihlali. `combo.md` "CH5 Apache ECharts" → kodda ECharts yok. Council güzel, enforcement yok | Yüksek — müşteriye vaat edilen teslim edilmiyor | `scripts/validate-combo.js` — YAML ID'leri kodda gerçek mi lint ile check |
| P3 | Sektör başına 1 template | Mücevher müşterisi "minimal-swiss" isterse yeni template = 3-5 saat. 14 template × 1 stil = 14 combo, 60 hedef olmalı | Orta — ama sık yaşanıyor | 10 sektör × 10 stil = 100 preset matrisi (20 yasak hücre düşünce 80, aktif 60), her preset YAML, compose edilir |
| P4 | 800+ teknoloji sorgulanamaz (FRONTEND-TECHSTACK.md + 3D-TECHSTACK.md) | "Bu proje Three.js mi Spline mi?" → her iki dosya aç + oku + karar = yavaş. Filter atamıyorsun | Yüksek — Stage 1.5 tech detection manuel | `techstack/*.yaml` — her tech: {name, type, bundle_kb, use_case[], alternatives[], production_score, tier_compat[], detailed_research: path}. catalog-query skill filter'lıyor |
| P5 | WordPress pipeline yok | fraxbit.com (Awwwards HM) + wearebrand.io (Awwwards SOTD) WordPress + GSAP + Lenis. Tier 1 (7.5-15K TL) bu stack'le 3-5 gün teslim edilebilir ama sistemde yok | Yüksek — Armut'tan gelen budget müşteri elden kaçıyor | `recipes/wordpress-elementor-motion.yaml` + `scaffold-wp.js` (Hello Elementor child theme + Elementor JSON export + wab-safe-animations.js MIT-safe) |
| P6 | Trigger chain manuel | `design-council-reminder.js` hook var ama tek aşama. Full pipeline yok: brief → catalog → scaffold → polish → council → SEO → launch | Orta — Emre 7 komut manuel çalıştırıyor | `/project-start` + `project-pipeline.js` master orchestrator, stage-by-stage approval gate |
| P7 | Mobile responsive 0/14 template | 7 sektör template'inde hiçbir `@media (max-width)` yok. 14-ultra sadece `clamp()` font kullanıyor, gerçek breakpoint layout yok. Lighthouse mobile ölçümü yapılmamış | Kritik — 2026'da mobile-first olmayan site Google ranking + conversion kaybı | Scaffold base'de zorunlu 3 breakpoint (375/768/1280), Tailwind v4 `@theme` token, her component `*_responsive_test.tsx` story |

### 4.1 İkincil Problemler (Faz 6 doğrulamada yakalanacak)

- **Türkçe karakter font testi yok:** Variable font (Fraunces) bazı weight + opsz kombinasyonlarında `ı/İ/ğ/ş` glyph'leri düşük kalite → her typography combo'da `tr` subset + render test zorunlu
- **Yasaklı ID listesi manuel tutuluyor:** DESIGN-PATHWAYS.md:308-312 tablosu elle güncelleniyor. 14. proje geldiğinde Claude unutup tekrar PL1 önerebilir → build-time validator zorunlu
- **Audit skoru compositing metodolojisi dokümante değil:** "1/5" ve "5/5" nasıl hesaplandı bilinmiyor. Faz 6'da 6-axis rubric (klişe, responsive, a11y, perf, bug, craft) yayınlanacak

[KAYNAK: YOL-HARITASI.md:61-99 (7 problem) + YOL-HARITASI.md:50 (klişe yığını kanıtı) + DESIGN-PATHWAYS.md:326-330 (repeat guard kuralları) + DESIGN-PATHWAYS.md:308-320 (PROJECT MATRIX tablosu) + SITE-GELISTIRME-PIPELINE.md:9-33 (mevcut pipeline)]

---

## 5 · HEDEF MİMARİ — 4 Katman

### 5.1 Katmanlar

```
┌──────────────────────────────────────────────────────────────────┐
│  L4 · TRIGGER CHAIN (tek komut, 30 dk hedef)                     │
│  /project-start "brief"                                          │
│    ↓                                                             │
│  Stage -1 (ilan on-hazırlık) → Stage 0 (dosya+geçmiş) →          │
│  Stage 1 (Whisper transkript) → Stage 1.5 (tech detection) →     │
│  Stage 2 (analiz PDF) → Stage 3 (18 doküman) →                   │
│  Stage 3.5 (master analiz) → Stage 3.7 (design-council 14 agent) │
│  → Stage 3.75 (Claude Design opsiyonel Tier 3+) →                │
│  Stage 3.8 (catalog-query 3 preset) →                            │
│  [EMRE ONAYLA A/B/C] →                                           │
│  Stage 4 (scaffold nextjs VEYA wp) → Stage 5 (frontend polish) → │
│  Stage 6 (seo-audit → schema-markup → site-architecture) →       │
│  Stage 7 (code-reviewer) → Stage 8 (launch-strategy)             │
└──────────────────────────────────────────────────────────────────┘
                                ↓
┌──────────────────────────────────────────────────────────────────┐
│  L3 · SCAFFOLDER                                                 │
│  preset.yaml + sector.yaml + style.yaml + recipe.yaml →          │
│    ├─ scaffold/nextjs-16-base/  (Next.js 16 + Tailwind v4 +      │
│    │   shadcn/ui + 50 component + wab-safe-animations.ts)        │
│    ├─ scaffold/wordpress-elementor/  (Hello Elementor child      │
│    │   theme + Elementor JSON + wab-safe-animations.js)          │
│    ├─ scaffold.js   (Node CLI — Next.js)                         │
│    └─ scaffold-wp.js (Node CLI — WordPress)                      │
│  Çıktı: working dev server (5 dakikada hazır) + combo.yaml       │
└──────────────────────────────────────────────────────────────────┘
                                ↓
┌──────────────────────────────────────────────────────────────────┐
│  L2 · QUERY SKILL (~/.claude/skills/catalog-query/)              │
│  query_catalog(sector, budget, features, constraints) →          │
│    3 ranked preset (A safe / B edge / C hybrid) +                │
│    anti-cliché flags + rationale                                 │
│  get_recipe(style, budget) → stack.yaml                          │
│  get_techstack(feature) → filtered tech list                     │
│  validate_combo(yaml) → lint report                              │
│  scripts/query.js (Node, filesystem YAML filter, SQLite index    │
│  fallback)                                                       │
└──────────────────────────────────────────────────────────────────┘
                                ↓
┌──────────────────────────────────────────────────────────────────┐
│  L1 · CATALOG (YAML — machine-readable)                          │
│  catalog/                                                        │
│    ├── schema.md             ← YAML field tanımları              │
│    ├── MATRIX.md             ← 10×10 sector × style görünür      │
│    ├── compatibility.yaml    ← anti-cliché matrix + yasak ID     │
│    ├── atoms/                ← 120+ pattern (H/N/HR/K/P/T/       │
│    │                          C/CH/F/M/FT/TY/PL/L/MO)            │
│    ├── sectors/              ← 10 × {psikoloji, anti-cliché,     │
│    │                          recommended_*, budget_tiers}       │
│    ├── styles/               ← 10 × {mood, typography,           │
│    │                          palette_families, motion, forbidden│
│    ├── presets/              ← 60 × (sector × style kombin)      │
│    ├── recipes/              ← 7 × {next-premium, next-r3f,      │
│    │                          wordpress-elementor-motion,        │
│    │                          webflow-premium, nuxt-ogl,         │
│    │                          shopify-hydrogen,                  │
│    │                          claude-design-handoff}             │
│    └── techstack/            ← 800+ tech (kısa index, detay      │
│                               MD dosyaya pointer)                │
└──────────────────────────────────────────────────────────────────┘
```

### 5.2 Katman sorumluluk matrisi

| Katman | Sorumluluk | Kim yazacak | Nerede yaşar |
|--------|-----------|-------------|--------------|
| L1 Catalog | Veri — atomlar, sektörler, stiller, presetler, recipeler | Paralel agent batch (Faz 0 + 2) | `design-claude/catalog/` |
| L2 Query Skill | Filtre + compose + rank + validate | Opus 4.7 + design-director agent | `~/.claude/skills/catalog-query/` |
| L3 Scaffolder | Preset → çalışır iskelet (Next.js veya WP) | Opus 4.7 + frontend-design agent | `design-claude/scaffold/` |
| L4 Trigger Chain | Stage orchestration + approval gate + skill chain | Hook + slash komut | `~/.claude/hooks/` + `~/.claude/commands/` |

### 5.3 Veri akış örneği (kuafor projesi)

```
Emre yazar: /project-start "Kadıköy kuafor salon, 8K TL budget, mobile öncelikli, modern ama ürkek değil"
    ↓
L4: Brief parse → sector=kuafor, budget=8000, features=[randevu, whatsapp, galeri]
    ↓
L2: query_catalog(sector=kuafor, budget=8000, features=[randevu, whatsapp])
    → sectors/kuafor.yaml anti_cliche=[PL1, TY1, HR2]
    → styles/{editorial-luxury, minimal-swiss, kinetic-agency}.yaml
    → atoms/{HR3, HR11, TY29, TY30, PL24, PL25}.yaml cross-ref
    → 3 compose:
      A safe:   kuafor-editorial-luxury  (PL24 + TY29 + HR3 + L4)
      B edge:   kuafor-kinetic-agency    (PL25 + TY30 + HR11 + L9)
      C hybrid: kuafor-minimal-swiss     (PL24 + TY30 + HR3 + L1)
    → validate_combo() — ✓ PL1 yok, TY1 yok, repeat 2/15
    → return 3 preset + atom listesi + preview HTML link
    ↓
L4: Emre A'yı seçer → combo.md yazılır
    ↓
L3: scaffold-wp.js kuafor-editorial-luxury --out ../kadikoy-kuafor/
    → (budget < 12K → WordPress recipe otomatik seçildi)
    → Hello Elementor child theme + GSAP + Lenis + wab-safe-animations.js
    → Elementor JSON template'i import edilecek
    ↓
5 dakikada çalışır WordPress dev server
```

### 5.4 Neden bu mimari? (alternatif karşılaştırma)

| Alternatif | Sebep elendi |
|------------|--------------|
| **Tek büyük repo (monorepo başlangıçtan)** | Şu an overkill. Faz 6'dan sonra Enterprise tier olunca Turborepo eklenecek. Başlangıçta plain repo daha hızlı iterasyon |
| **Vector embedding catalog (LanceDB/Qdrant)** | 800 tech × 120 atom için overkill. YAML grep-filter milisaniyelerde. Embedding Faz 7+ (RAG olursa) |
| **SaaS (web UI)** | Emre kullanacak, o da CLI power-user. Web UI extra iş, fayda yok |
| **Claude Code MCP server** | Skill yeterli. MCP server başka dev'lerin kullanması için — şu an Emre solo |
| **Template generator (Hygen/Plop)** | Hygen gibi generator'lar basit, ama preset + atom compose edemez. Kendi scaffolder'ımız lazım |

[KAYNAK: YOL-HARITASI.md:103-151 (4 katman diyagramı) + YOL-HARITASI.md:153-249 (YAML schema örnekleri) + SITE-GELISTIRME-PIPELINE.md:354-419 (Stage 6.5 Council akışı)]

---

## 6 · 17 KONFİGÜRASYON AYARI — Gerekçe + Alternatif + Karar

| # | Ayar | Gerekçe | Alternatif düşünüldü | Karar |
|:-:|------|---------|----------------------|-------|
| 1 | **Stiller (10):** brutalist, editorial-luxury, kinetic-agency, immersive-3d, maximalist-atmospheric, minimal-swiss, warm-organic, data-dense-dashboard, editorial-print, industrial-workwear | Mevcut 6 stil (YOL-HARITASI.md:261) yetersiz — warm-organic (spa/klinik), data-dense (dashboard), editorial-print (gazete/editorial), industrial-workwear (inşaat) ayrı kimlik gerektiriyor. 10 stil × 10 sektör = 100, 20 forbidden sonrası 80 → aktif 60 geniş portföy | 6 stil (orijinal plan) → stil başı 10 preset, 60 aktif, spa+klinik aynı stile düşüyor | **10 stil** — 60 preset için yeterli çeşitlilik, warm-organic + industrial-workwear ayrı kategoriler |
| 2 | **Sektörler (10):** insaat, mucevher, kuafor, restoran, klinik, eticaret, spa, fotograf, gayrimenkul, otel | SECTOR-RESEARCH.md'deki 10 sektör zaten 2 palette + 2 typo + hero/layout/motion ile planlı. Her biri Emre'nin Armut ilan akışında ayda bir geliyor | 5 sektör (hızlı başlangıç) → yarısı eksik, Armut ilan tipine eşleşmiyor | **10 sektör** — Armut ilan kategorileri ile birebir |
| 3 | **Stack Recipes (7):** next-premium, next-r3f, wordpress-elementor-motion, webflow-premium, nuxt-ogl, shopify-hydrogen, claude-design-handoff | 5 orijinal + 2 yeni (shopify-hydrogen e-ticaret hızlı çözüm, claude-design-handoff Tier 3+ için Stage 3.75 entegrasyonu) | 5 recipe (orijinal) → Shopify Armut ilanlarında %15 talep, Claude Design 17 Nis 2026 lansmanı sonrası Tier 3+'ta değerli | **7 recipe** — 7. recipe (claude-design-handoff) Stage 3.75'i Pipeline'a bağlar |
| 4 | **Bütçe 5 Tier** | Tek tier (7.5-15K WP / 15-50K Next.js) yetersiz. Ultra-budget (5-7K) Kadıköy soğuk satış için, Mid (15-25K) standart mücevher, Premium (25-80K) 3D/AR projeler, Enterprise (80K+) multi-tenant CRM için ayrı teslim stratejisi + ayrı quality gate | Tek tier → bütçe müşterisine hızlı teslim zor, premium müşteriye 3D eksik | **5 tier** — detayı Bölüm 7'de |
| 5 | **Feature Modules (14):** e-ticaret, admin, blog, randevu, whatsapp, 3d-viewer, AR, chat, wishlist, karsilastirma, PWA, i18n, SLA, observability | Her feature ayrı YAML, scaffold sırasında `features: [...]` listesinden otomatik entegre. CLAUDE.md Workflow Kuralları'ndan türetildi | Feature kavramı yok, her şey preset içinde → preset bloat, kompozisyon zayıf | **14 module** — scaffold parametresi olarak opt-in |
| 6 | **Palette: 38 (PL1-PL38)** | Mevcut PL1-PL20 + SECTOR-RESEARCH.md PL21-PL38 | 20 (orijinal) → sektör başına 2 palette gerekli (A/B alternatif), 10 sektör × 2 = 20 ek = 38 toplam | **38 palette** — PL1 yasak, 37 aktif |
| 7 | **Typography: 44 (TY1-TY44)** | TY1-TY25 + SECTOR-RESEARCH.md TY26-TY44 | 25 (orijinal) → sektör başına 2 typography combo + yasak 4 = 44 | **44 combo** — TY1/2/4/8 yasak, 40 aktif |
| 8 | **Versiyon Lock:** GSAP 3.13, Lenis 1.3.4, Motion v12, Three.js r183, drei v10, R3F v9, Next.js 16, React 19, Tailwind v4 | FRONTEND-TECHSTACK.md Core Stack tablosu + SCRAPED-STACKS-2026.md CDN havuzu ile birebir. Ajanslar bu versiyonları production'da kullanıyor | Latest her zaman → breaking change riski (Tailwind v4 alpha bazı bug'lar) | **Lock versiyonlar** — Tailwind v4 için v3 fallback otomatik, diğerleri sabit |
| 9 | **Yasaklı ID (13):** TY1/2/4/8, PL1, K1, HR2, H8, HR7, P1, T6, CH1, CH2 | 5+ kez kullanıldı (Freeman, BG Foto, Dagintaslı, Modern Alyans, Fatih Bey) veya klişe (dark+gold+Inter recipe) | Sadece 9 (DESIGN-PATHWAYS.md:326-330) → H8, HR7, P1, CH2 de repeat riski taşıyor (insaat-crm audit) | **13 ID yasak** — build-time validator ile enforce |
| 10 | **Quality Gate:** Mobile Lighthouse ≥ 90 / WCAG AA / CLS < 0.05 / Enterprise 99.9% SLA | 2026 Google ranking + conversion için mobile-first zorunlu. CLS <0.05 Core Web Vitals "Good" üst sınır | Lighthouse ≥ 80 → "iyi" değil "vasat", müşteri tatmin olmaz | **≥ 90 / AA / CLS<0.05** — her test projede ölçüm |
| 11 | **Deploy:** Vercel + Cloudflare Pages + Docker self-host | Next.js → Vercel (edge runtime), WP → cPanel + Cloudflare proxy, Enterprise → Docker self-host (client VPS) | Sadece Vercel → Enterprise multi-tenant + veri sovereignty → self-host gerekli | **3 platform** — recipe'de `deploy_target` field'ı |
| 12 | **Agent Roster: 18 = 14 mevcut + 4 yeni** | Mevcut 14 (typography/palette/layout/motion/header/hero/kpi/pipeline-list/chart/interaction/footer/3d + director + adversary) yeterli değil. SEO, accessibility, performance ayrı domain; Claude Design Stage 3.75 için liaison gerekli | 14 (mevcut) → SEO/a11y/perf yok, bunlar skill olarak çalışıyor ama agent olmadan council'de görüşmüyorlar | **18 agent** — Bölüm 12 detay |
| 13 | **Preview: Gerçek Next.js 16 app (60+ route, canlı GSAP/Lenis/R3F)** | HTML mockup "ölü" — ne GSAP anim çalışıyor ne Lenis smooth scroll ne R3F canvas. Emre gallery gezdiğinde preset'in gerçek hissini alamıyor | HTML mockup (orijinal plan) → motion pattern'ler çalışmıyor | **Canlı Next.js preview** — `pnpm dev` → `localhost:3000/[sector]-[style]` |
| 14 | **Claude Design Stage 3.75** | 17 Nis 2026 Anthropic Labs lansmanı. Tier 3+ projelerde opsiyonel prototip + handoff bundle. Token ekonomisi ~55K/session. MCP kurulumu (playwright + chrome-devtools + context7 + figma-dev-mode) | Stage 3.75 yok → premium müşteri için visual exploration eksik | **Opsiyonel, Tier 3+** — Bölüm 15 detay |
| 15 | **Enterprise Monorepo: Turborepo + pnpm workspaces** | Tier 5 (80K+ TL) projelerinde admin + web + api + shared-ui ayrı paket, paralel build gerekli. Turborepo 2.8.20 cache ile 3-5x hız | Tek Next.js app → Enterprise'da shared-ui duplication + cache yok | **Turborepo** — sadece Tier 5 |
| 16 | **Observability: Sentry + Mixpanel + PostHog** | Enterprise 99.9% SLA için error tracking (Sentry) + product analytics (Mixpanel event) + session replay (PostHog) üçlüsü | Sadece Sentry → event analytics + replay eksik, SLA ihlali root cause bulunmuyor | **3 araç, Tier 5** — Tier 1-4'te sadece Sentry opsiyonel |
| 17 | **Aktif Preset: 60 = 100 - 20 forbidden - 20 zayıf** | 10 sektör × 10 stil = 100 teorik. 20 uyumsuz (örn: kuafor × brutalist, klinik × kinetic-agency) ✗. 20 zayıf (örn: otel × data-dense) üretilmez. 60 aktif hedef | 100 → %40'ı kalitesiz, gallery kirli | **60 aktif preset** — Faz 2 hedefi |

[KAYNAK: YOL-HARITASI.md:261-263 (6 stil) + SECTOR-RESEARCH.md:1-210 (10 sektör + PL21-38 + TY26-44) + FRONTEND-TECHSTACK.md:96-272 (Core Stack versiyonlar) + DESIGN-PATHWAYS.md:326-330 (yasaklı ID) + FRONTEND-TECHSTACK.md:423-488 (Claude Design + MCP) + SCRAPED-STACKS-2026.md:11-27 (ajans tech stack kanıtı)]

---

## 7 · 5 BÜTÇE TIER — Detay

### 7.1 Tier karşılaştırma tablosu

| Tier | Fiyat (TL) | Süre | Stack | Müşteri profili | Kâr marjı | Bakım |
|:-:|:-:|:-:|-------|-----------------|:-:|-------|
| **0 · Ultra-Budget** | 5.000 - 7.000 | 2-3 gün | Next.js template swap (Vercel preview → prod) | KADIKOY soğuk satış, hazır site kisellestirme, domain + hosting + SEO + WhatsApp widget | Yüksek (saat başı) | 500 TL/ay |
| **1 · Budget** | 7.500 - 15.000 | 3-7 gün | WordPress 6.9 + Hello Elementor child + Elementor Pro 3.35 + GSAP 3.13 + Lenis 1.3.4 + wab-safe-animations.js + Rank Math | Kuaför, küçük restoran, randevu sitesi, servis tanıtım — "standart Armut müşterisi" | Yüksek | 750-1.500 TL/ay |
| **2 · Mid** | 15.000 - 25.000 | 2-3 hafta | Next.js 16 + React 19 + Tailwind v4 + shadcn/ui + Supabase + Drizzle ORM + Vercel | Mücevher e-ticaret (Fatih Bey tarzı), mobilya katalog, kurumsal tanıtım + iletişim formu | Orta-yüksek | 1.500-3.000 TL/ay |
| **3 · Premium** | 25.000 - 80.000 | 3-5 hafta | + R3F v9 + drei v10 + Three.js r183 + MeshTransmissionMaterial + Gaussian Splat + postprocessing + Theatre.js | Mücevher 3D viewer, mobilya AR deneme, otel sanal tur, otomotiv konfigüratör | Orta | 3.000-8.000 TL/ay |
| **4 · Enterprise** | 80.000+ | 6-12 hafta | + Turborepo 2.8.20 + pnpm workspaces + multi-tenant (subdomain routing) + Sentry + Mixpanel + PostHog + Supabase RLS + 99.9% SLA | İnşaat CRM (Yıldız İnşaat), çok şubeli restoran zinciri, franchise sistemi, white-label SaaS | Düşük (yüksek volume) | 8.000-25.000 TL/ay + retainer |

### 7.2 Tier başına detay

#### Tier 0 · Ultra-Budget (5-7K TL, 2-3 gün)

**Stack:**
- Mevcut template'lerden biri (14 sektör template'i) swap
- Content inject (logo + 20 fotoğraf + menü/ürün listesi)
- Vercel preview → prod deploy
- Domain (GoDaddy/Cloudflare Registrar) + SSL auto
- Basit SEO (title + meta + sitemap.xml + robots.txt)
- WhatsApp widget (wa.me link + floating button)

**Müşteri profili:** "Hiç site yok, acilen lazım, 10K altı bütçe". KADIKOY 10 site portföyü (`C:/Users/EAS/Desktop/KADIKÖY SATIŞ/`), Armut'tan "hızlı sitesi olsun, SEO önemli değil" ilanları.

**Kabul kriteri:**
- Mobile Lighthouse ≥ 85 (≥90 değil — template hızlı swap)
- WCAG AA contrast (ama full a11y test yok)
- 1 sayfa (homepage) + iletişim formu (Formspree veya wa.me)

**Red kriteri:** Müşteri e-ticaret, admin panel, blog, çoklu dil, 3D istiyorsa → Tier 1+ teklifi.

---

#### Tier 1 · Budget (7.5-15K TL, 3-7 gün)

**Stack (WordPress + Motion):**
- WordPress 6.9+
- Hello Elementor child theme (custom)
- Elementor Pro 3.35+ (müşteri lisansı veya Emre'nin agency lisansı)
- Motion Design for Elementor by MasterAddons (premium addon)
- GSAP 3.13 + ScrollTrigger + SplitText + ScrambleText + MorphSVG (hepsi ücretsiz)
- Lenis 1.3.4 (smooth scroll)
- Barba 2.10.3 (page transition, opsiyonel)
- `wab-safe-animations.js` (wearebrand.io 6 pattern MIT-safe rewrite)
- SEO: Rank Math (ücretsiz)
- Deploy: cPanel hosting + Cloudflare proxy

**Evidence:** fraxbit.com WordPress + Elementor Pro 3.35.7 + GSAP 3.12.5 + Lenis 0.2.28 → Awwwards Honorable Mention. wearebrand.io WordPress + Custom Theme + Barba + Lenis 1.2.3 + GSAP → Awwwards SOTD. "WordPress düşük kalite" algısı yanlış — kötü olan Divi + plugin stacking, Custom theme + GSAP + Barba premium kalite.

**Müşteri profili:** Kuaför (randevu sistemi olmasa da), küçük restoran (menü + rezervasyon iframe), servis tanıtım (3-5 sayfa), fotoğrafçı portfolyo, spa randevu sitesi.

**Kabul kriteri:**
- Mobile Lighthouse ≥ 90 (hepsi)
- Page transition smooth (Lenis + Barba)
- At least 3 GSAP animation pattern (scroll reveal, magnetic button, text split)
- WhatsApp + Instagram embed
- Rank Math schema (LocalBusiness + FAQ)

**Red kriteri:** Headless CMS gerekli, native auth, 3D viewer, >20 sayfa, tamamen custom JS → Tier 2+.

---

#### Tier 2 · Mid (15-25K TL, 2-3 hafta)

**Stack (Next.js Standard):**
- Next.js 16 (App Router, Turbopack, RSC, Server Actions, Streaming)
- React 19 (use() hook, Actions, useOptimistic, Compiler)
- TypeScript 5.9
- Tailwind CSS v4 (@theme directive, OKLCH colors)
- shadcn/ui + Radix Primitives + Aceternity UI (seçmeli)
- Supabase (PostgreSQL 16 + Auth + Storage + RLS + Edge Functions)
- Drizzle ORM (type-safe)
- Zustand v5 (client state)
- React Hook Form v7 + Zod (form + validation)
- TanStack Query v5 (server state)
- GSAP + Framer Motion v12 + Lenis (gerekirse)
- Vercel (edge runtime + preview deployment)

**Müşteri profili:** Fatih Bey Mücevher (mevcut proje), mobilya e-ticaret, kurumsal tanıtım + ürün katalogu + iletişim formu, ajans portfolyo.

**Kabul kriteri:**
- Mobile Lighthouse ≥ 90
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms (CLS hedef 0.05)
- WCAG AA full audit (axe-core pass)
- Responsive 3 breakpoint (375/768/1280) her sayfa
- SEO: generateMetadata + sitemap.xml + JSON-LD (Product, LocalBusiness, FAQ, Breadcrumb)
- Auth (Supabase Auth) + RLS policy
- i18n opsiyonel (next-intl)

**Red kriteri:** 3D viewer (R3F), AR deneme, Gaussian Splat, multi-tenant → Tier 3+.

---

#### Tier 3 · Premium (25-80K TL, 3-5 hafta)

**Stack (Mid + 3D + Advanced Motion):**
- Tier 2 stack
- @react-three/fiber v9 + drei v10 (156 component)
- Three.js r183+
- @react-three/postprocessing (34 efekt: Bloom, DOF, Vignette, Glitch)
- @react-three/rapier (WASM physics, opsiyonel)
- MeshTransmissionMaterial (cam/kristal efekt)
- drei Float + PresentationControls + Environment
- gsplat (Gaussian Splatting — gerçek ürün yakalama, .splat format)
- Spline runtime (pre-authored scenes) veya Blender → GLTF pipeline
- Theatre.js (opsiyonel — keyframe editor)
- react-spring (spring physics)
- Lottie + Rive (vector animation)

**Müşteri profili:** Mücevher 3D viewer (Fatih Bey Premium tier), mobilya AR deneme (ikea-style), otel sanal tur (Matterport alternatif), otomotiv 3D konfigüratör, mimari çizim + walkthrough.

**Claude Design Stage 3.75 opsiyonel:** Tier 3+ için visual exploration → handoff bundle → preset merge. Bölüm 15 detay.

**Kabul kriteri (Tier 2'ye ek):**
- R3F Canvas'ta 60 FPS mobile (PerformanceMonitor + AdaptiveDpr)
- 3D model bundle ≤ 2 MB (Draco + Meshopt + KTX2)
- Loading state (useProgress + Suspense fallback)
- Desktop fine pointer'da custom cursor (magnetic + lerp)
- Scroll-linked camera path

**Red kriteri:** Multi-tenant, enterprise SLA, observability stack → Tier 4.

---

#### Tier 4 · Enterprise (80K+ TL, 6-12 hafta)

**Stack (Premium + Monorepo + Observability):**
- Tier 3 stack
- Turborepo 2.8.20 + pnpm workspaces
- Monorepo paket: `apps/web`, `apps/admin`, `apps/api`, `packages/shared-ui`, `packages/schema`, `packages/config`
- Multi-tenant (subdomain routing: `*.tenant.com` + Supabase RLS policy)
- Sentry (error tracking + performance monitoring)
- Mixpanel (event analytics)
- PostHog (session replay + feature flags)
- Inngest / QStash (background jobs)
- Playwright (E2E cross-browser + visual regression)
- Vitest (unit + integration)
- GitHub Actions (CI/CD)
- Docker (self-host opsiyonu — client VPS veya AWS)
- 99.9% SLA (uptime target 43.2 dk/ay downtime max)

**Müşteri profili:** İnşaat CRM (Yıldız İnşaat Ankara, `insaat-crm/`), çok şubeli restoran zinciri (20+ lokasyon), franchise sistemi (multi-tenant white-label), agency SaaS (kendi agency müşterilerine alt-admin).

**Kabul kriteri (Tier 3'e ek):**
- Turborepo cache hit %60+ (ikinci build'de)
- Sentry error budget (SLO: 99.9% success rate)
- Playwright smoke suite 30 test, her deploy öncesi
- Visual regression baseline + diff report
- Documentation: architecture.md + runbook.md + on-call schedule

**Red kriteri:** Yok — Enterprise son tier. Custom talepler "Enterprise +" scope-creep olarak ayrı teklif.

### 7.3 Tier tercih karar ağacı (catalog-query içinde)

```yaml
decision_rules:
  - if: budget < 7000 AND features == []
    tier: 0
    recipe: nextjs-template-swap
  - if: budget < 12000 AND "3d_viewer" NOT IN features AND "headless_cms" NOT IN features
    tier: 1
    recipe: wordpress-elementor-motion
    rationale: "WP 3-5 gün teslim, GSAP + Lenis premium kalite, fraxbit/wearebrand kanıtı"
  - if: budget < 25000 AND ("3d_viewer" NOT IN features OR budget >= 20000)
    tier: 2
    recipe: next-premium
  - if: budget >= 25000 AND budget < 80000 AND ("3d_viewer" IN features OR "ar" IN features)
    tier: 3
    recipe: next-r3f
    claude_design_offer: true
  - if: budget >= 80000 OR "multi_tenant" IN features OR "sla" IN features
    tier: 4
    recipe: next-enterprise-monorepo
```

[KAYNAK: YOL-HARITASI.md:497-544 (WordPress detay + tier mapping) + FRONTEND-TECHSTACK.md:96-272 (Core Stack versiyonlar) + FRONTEND-TECHSTACK.md:423-488 (Claude Design) + CLAUDE.md Aktif Projeler tablosu (Fatih Bey 17.500 TL = Tier 2 örnek, insaat-crm = Tier 4)]

---

## 8 · 10 STİL AİLESİ — Mood + Typography + Motion + Forbidden

### 8.1 Stil tablosu

| # | Stil ID | Mood | TY önerilen | MO önerilen | Forbidden | Referans impl |
|:-:|---------|------|-------------|-------------|-----------|---------------|
| 1 | **brutalist** | sharp, raw, high-contrast, rebel | TY6 (Archivo Black + Space Grotesk 900 + JetBrains Mono) | MO4 (Framer layout), MO9 (WAAPI + Popover stateful) | rounded-2xl, glassmorphism, pastel color | `v2-neobrutalist/index.html` (3,010 satırın ~750'si) + `mockups/c-concrete/index.html` |
| 2 | **editorial-luxury** | sakin, rafine, ritmli-whitespace, baskı-hissi | TY27 (Fraunces + IBM Plex Sans + IBM Plex Mono), TY28 (Cormorant Garamond + Mulish + JetBrains Mono), TY9 (Fraunces + Hanken + Geist Mono) | MO4 (Framer layoutId morph), MO6 (SplitText), MO10 (print-first) | aggressive-bounce, neon-accent, glass-morphism, dark+gold gradient | `mockups/a-warm-dark/index.html` (5/5 audit), `templates/02-mucevher/index.html`, `templates/04-restoran/index.html` |
| 3 | **kinetic-agency** | italic-vurgu, scroll-pin, variable font axes | TY7 (Bricolage Grotesque italic + Space Grotesk + JetBrains Mono), TY14 (Monument Extended + Inter Tight + JetBrains Mono) | MO1 (GSAP ScrollTrigger pin+scrub), MO6 (SplitText stagger), MO11 (variable font opsz scroll-linked — YENİ) | print-first, static typography | `templates/11-kinetic/index.html` + `templates/14-ultra/index.html:586-595` (variable font opsz scroll) |
| 4 | **immersive-3d** | cinematic, scroll-camera, depth | TY8 **YASAK** → TY14 Monument Extended + Inter Tight + JetBrains Mono (alternatif) | MO1 + MO2 (Lenis smooth) + MO12 (R3F + scroll-linked camera — YENİ) | flat 2D hero, static photography only | `v2-immersive-3d/index.html` (967 satır) + `templates/12-immersive-3d/index.html` (476 satır) |
| 5 | **maximalist-atmospheric** | overlap, aurora, deep gradient, rich layer | TY23 (Editorial Old + PP Neue Machina) | MO1 + MO6 + MO11 (opsz) | minimal whitespace, mono-chromatic | `templates/13-maximalist/index.html` (wearebrand.io-style), `research-assets/wearebrand_home.html:62-645` |
| 6 | **minimal-swiss** | grid-first, Helvetica-ish, white-space, mono accent | TY18 (Söhne Breit + Söhne + Söhne Mono), TY39 (IBM Plex Sans monolithic), TY40 (Inter Tight + JetBrains Mono) | MO3 (CSS scroll-driven native), MO7 (View Transitions), MO10 (no motion) | decorative serif display italic, gradient text | `templates/08-fotograf/index.html` (5/5 audit), `mockups/b-off-white-editorial/index.html` |
| 7 | **warm-organic** | clay, mist, sand, seafoam, nefes-alan | TY29 (Schibsted Grotesk + Schibsted + Space Mono), TY37 (Cormorant Infant + Inter Tight), TY21 (Recoleta + Lato + IBM Plex Mono) | MO2 (Lenis çok yavaş) + MO3 (CSS scroll-driven subtle), MO10 (print-first) | harsh neon, aggressive bounce, industrial gray | `templates/07-spa/index.html`, `templates/05-klinik/index.html`, SECTOR-RESEARCH.md:122-140 (spa palette B PL32) |
| 8 | **data-dense-dashboard** | Linear-style, tabular-nums, keyboard-first, receipt-strip | TY12 (Migra Italic + IBM Plex Sans + Berkeley Mono), TY14 (Monument + Inter Tight + JetBrains), TY10 (Instrument Serif + IBM Plex Serif + IBM Plex Mono) | MO8 (Web Animations API imperative), MO10 (print-first), minimal MO3 | splash hero video, page loader 5s | `insaat-crm/a-safe/index.html` (126-162 dense table), `templates/06-eticaret/index.html` admin görünüm |
| 9 | **editorial-print** | gazete column, newspaper hed, byline, printed paper | TY10 (Instrument Serif + IBM Plex Serif body + IBM Plex Mono), TY19 (Tiempos Headline + National 2 + Operator Mono), TY25 (Marfa + Neue Haas Unica) | MO10 (print-first) + MO7 (View Transitions slide) | parallax everything, glassmorphism | `mockups/b-off-white-editorial/index.html`, SECTOR-RESEARCH.md (fotograf sektör PL34 + TY40) |
| 10 | **industrial-workwear** | concrete texture, hazard stripe, blueprint, stencil | TY11 (Archivo Black + Narrow + Geist Sans + Stardos Stencil + Geist Mono), TY5 (Syne 800 italic + Space Grotesk + JetBrains Mono), TY26 (Rubik Mono One + Manrope + JetBrains Mono) | MO1 + MO2 + MO3 | luxury gold gradient, glassmorphism | `mockups/c-concrete-industrial/index.html`, `v2-blueprint/index.html`, `insaat-crm/b-edge/index.html:56-57` hazard stripe |

### 8.2 Stil seçimi için karar kriterleri (catalog-query içinde)

```yaml
style_selection_heuristics:
  - if: sector IN [mucevher, otel, spa, restoran] AND budget < 25000
    recommend: [editorial-luxury, warm-organic, minimal-swiss]
    avoid: [brutalist, industrial-workwear]
  - if: sector IN [insaat, eticaret] AND "dashboard" IN features
    recommend: [data-dense-dashboard, industrial-workwear, minimal-swiss]
    avoid: [editorial-luxury, warm-organic]
  - if: sector IN [kuafor, fotograf] AND style_preference == "modern"
    recommend: [kinetic-agency, minimal-swiss, editorial-print]
    avoid: [industrial-workwear]
  - if: features INCLUDES "3d_viewer"
    recommend: [immersive-3d, maximalist-atmospheric, kinetic-agency]
    avoid: [editorial-print, warm-organic]  # 3D + warm-organic uyumsuz
  - if: brand_personality == "rebel" OR "bold"
    recommend: [brutalist, maximalist-atmospheric]
```

### 8.3 Stil referansı ajans eşleşmesi

| Stil | Ajans örneği | Signature tekniği |
|------|--------------|-------------------|
| editorial-luxury | wearebrand.io /brand | Porthole dive + blur-36px reveal + magnetic elastic |
| kinetic-agency | fraxbit.com | Variable font opsz scroll + scatter preloader + dual cursor |
| immersive-3d | Lusion (lusion.co) | Raw GLSL simplex/fBM + GSAP Observer + CSS var→shader uniform |
| maximalist-atmospheric | Adoratorio (Max Mara) | Pixi WiggleFilter + aurora radial gradient + howler.js audio |
| minimal-swiss | Active Theory (activetheory.net) | Hydra proprietary engine + balance-text + SVG2MSDF |
| data-dense-dashboard | Linear.app + Airbnb | Tabular-nums + keyboard shortcut (⌘K) + dense receipt strip |
| editorial-print | mdx.so | Vimeo background video + clip-path reveal + `data-fade-clip` JSON |
| industrial-workwear | FLOT NOIR (flotnoir.studio) | Taxi.js PJAX curtain + Barba + custom Mersi pattern |
| warm-organic | SECTOR-RESEARCH.md PL31-PL32 (spa palette) | Slow Lenis + CSS scroll-driven subtle + print-first |
| brutalist | REJOUICE (rejouice.com) | mix-blend-mode:difference header + Next.js transitions |

[KAYNAK: SECTOR-RESEARCH.md:1-210 (10 sektör typography + palette) + DESIGN-PATHWAYS.md:207-300 (TY + PL + MO katalog) + SCRAPED-STACKS-2026.md:11-27 (ajans signature) + templates/14-ultra/index.html:586-595 (variable font opsz scroll örneği) + mockups/a-warm-dark + c-concrete (5/5 audit)]

---

## Part 1 sonu — Part 2'ye geçiş notu

**Part 1'de kurulan bağlam:**
- TL;DR + SMART hedef + 7 kritik boşluk + 4 katman mimari
- 17 konfigürasyon kararı (gerekçe + alternatif)
- 5 bütçe tier detay (Tier 0 Ultra-Budget → Tier 4 Enterprise)
- 10 stil ailesi (mood + TY + MO + forbidden + ajans eşleşmesi)

**Part 2 kapsamı (Bölüm 9-16):**
- Bölüm 9: 10 Sektör (insaat / mucevher / kuafor / restoran / klinik / eticaret / spa / fotograf / gayrimenkul / otel) — psikoloji, anti-cliché, pathway ID, 5-tier mapping
- Bölüm 10: 80 Preset Matrisi (10 × 10 grid, ✓ ⚠ ✗ + 20 forbidden sebep)
- Bölüm 11: 47 Atom Kataloğu (kaynak dosya:satır + MIT-safe rewrite + kısa snippet + uyum tablosu)
- Bölüm 12: 18 Agent Roster (14 mevcut + 4 yeni: seo-expert, accessibility-expert, performance-expert, claude-design-liaison)
- Bölüm 13: 33 Skill × 8 Stage eşleşme matrisi (auto-chain + GUARD kuralları)
- Bölüm 14: 8 Pipeline Stage (Stage -1 → Stage 8)
- Bölüm 15: Claude Design Stage 3.75 entegrasyonu (handoff bundle + MCP + token ekonomisi)
- Bölüm 16: 6 Fazlı Uygulama Planı (her faz deliverable + paralel agent strateji + risk + gate)

Part 2 dosyası: `ULTRAPLAN-PART2.md`
Part 3 dosyası: `ULTRAPLAN-PART3.md` (Bölüm 17-24: timeline, usage, approval, verification, risk, CLAUDE.md update, rollback, kabul + 5 öneri)
