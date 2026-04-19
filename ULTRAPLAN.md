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
# ULTRAPLAN — Part 2/3 (Bölüm 9-16)

**Önceki part:** `ULTRAPLAN-PART1.md` (Bölüm 1-8: temel + 5 tier + 10 stil)
**Sonraki part:** `ULTRAPLAN-PART3.md` (Bölüm 17-24: timeline + risk + kabul)

---

## 9 · 10 SEKTÖR — Psikoloji + Anti-Cliché + Pathway ID + Tier Mapping

### 9.1 Sektör tablosu

| # | Sektör | Psikoloji (3 kelime) | Anti-cliché (yasak) | Önerilen pathway (atom ID) | 5-tier mapping |
|:-:|--------|---------------------|----------------------|----------------------------|----------------|
| 1 | **insaat** | sağlamlık, şeffaflık, zanaat | yok (sektörde dark+gold klişesi yok) | HR9 (interactive map) / HR13 (blueprint title block) + K2 (band + rules) + P8 (dense table) + T3 (spec sheet) + PL4 (concrete industrial) / PL21 (ozalit blueprint) + TY11 (Archivo Black) / TY5 (Syne italic) | Tier 1 (tanıtım sitesi WP) → Tier 4 (CRM Yıldız İnşaat) |
| 2 | **mucevher** | el-emeği, ritüel, nadir | **PL1 dark+gold** (5+ proje!), **TY1 Inter**, **TY2 Playfair+Inter**, **HR2 split-hero**, **T6 card grid** | HR11 (brochure cover) / HR3 (video bg) + K2 / K5 (almanac editorial) + L6 (center single) + L8 (masonry ürün) + PL22 (tobacco+pearl) / PL23 (plum+champagne) + TY27 (Fraunces) / TY28 (Cormorant Garamond) + MO4 (Framer layoutId) + MO10 (print-first) | Tier 2 (e-ticaret standart) → Tier 3 (3D viewer + Gaussian Splat) |
| 3 | **kuafor** | ritüel dönüşüm, kişisel bakım, modern atelier | **PL1** (Freeman/Odak/Solarium dark+gold), TY1, custom cursor klişesi | HR3 (full-bleed video) + K2 + L4 (full-bleed rails) + L9 (card deck ekip) + PL24 (salt+peach) / PL25 (slate+olive) + TY29 (Schibsted Grotesk) / TY30 (Recoleta) + MO1 + MO6 | Tier 0 (soğuk satış) → Tier 1 (WP + randevu) → Tier 2 (Next.js + admin) |
| 4 | **restoran** | sıcaklık, yerel-üretim, mevsim | generic dark menü + gold italic başlık | HR3 (yemek hazırlama video) / HR11 (menü cover) + L5 (3-col menu) + L6 (center) + PL14 (salmon+burgundy) / PL26 (olive+tomato) + TY31 (Fraunces SC + Work Sans) / TY32 (Bricolage Grotesque) + MO4 + MO6 (dish name reveal) | Tier 1 (WP menü + rezervasyon iframe) → Tier 2 (Next.js + online sipariş) |
| 5 | **klinik** | güven, netlik, huzur | agresif renk, hızlı motion, neon | HR12 (conversational Q&A randevu flow) + L6 + L7 (sticky sidebar referans/puan) + PL27 (glacier+sage) / PL28 (cream+forest) + TY33 (Fraunces + IBM Plex Sans) / TY34 (Manrope + DM Mono) + MO10 (print-first) + MO4 (çok sakin) | Tier 1 (WP randevu) → Tier 2 (Next.js + hasta portalı) |
| 6 | **eticaret** | hızlı keşif, karşılaştırma, urgency | PL1, hero carousel 5s, glass morphism kart | HR11 (koleksiyon brochure) + HR14 (feed) + L8 (masonry) + L3 (bento-no-glass) + PL29 (slate+acid) / PL30 (kraft+burst) + TY35 (Unbounded + Manrope) / TY36 (Big Shoulders + Public Sans) + MO4 (hover morph) + MO7 (View Transitions) | Tier 2 (Next.js + Supabase) → Tier 3 (3D viewer) → Tier 4 (multi-tenant marketplace) |
| 7 | **spa** | huzur, yavaşlık, doğal nefes | luxury spa dark gradient (klişe) | HR3 (slow-mo su/bitki) + L6 (meditative single col) + PL31 (clay+mist) / PL32 (pearl+seafoam) + TY37 (Cormorant Infant) / TY38 (Fraunces SC + Hanken) + MO2 (Lenis çok yavaş) + MO3 (CSS scroll subtle) | Tier 1 (WP randevu) → Tier 2 (paket satış + gift card) |
| 8 | **fotograf** | görsel-öncelik, sessiz tipografi, kare grid | BG Foto dark+gold (klişe!), PL1 yasak | HR3 (slideshow) + HR11 (brochure) + L8 (masonry) + L9 (card deck) + PL33 (pure off-black) / PL34 (cream+black) + TY39 (IBM Plex Sans monolithic) / TY40 (Inter Tight + JetBrains) + MO7 (image→detail morph) + MO4 | Tier 0 (portfolyo swap) → Tier 1 (WP + Lightroom CDN) → Tier 2 (Next.js + booking) |
| 9 | **gayrimenkul** | güvenilir, lokasyon, yaşam-tarzı | stok foto hero, generic map embed | HR9 (interactive map) + HR11 (brochure) + L8 (masonry) + L3 (bento) + PL35 (sand+ocean) / PL36 (mist+sunset) + TY41 (Fraunces + IBM Plex Sans) / TY42 (Big Shoulders + Inter Tight) + MO1 + MO7 | Tier 2 (Next.js + ilan sistemi) → Tier 3 (sanal tur R3F) → Tier 4 (MLS integration) |
| 10 | **otel** | kaçış, lüks-erişilebilir, manzara | PL1 luxury dark+gold klişesi | HR3 (video bg havuz/manzara) + L4 (full-bleed rails) + L8 (masonry oda) + PL37 (terracotta+sky) / PL38 (cool marble) + TY43 (Fraunces italic) / TY44 (Recoleta + Mulish + Space Mono) + MO2 (Lenis smooth) + MO7 (oda→rezervasyon) | Tier 2 (Next.js + booking) → Tier 3 (sanal tur Matterport/R3F) → Tier 4 (zincir otel multi-tenant) |

### 9.2 Sektör tier uyumluluğu özet

| Sektör | Tier 0 | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|--------|:-:|:-:|:-:|:-:|:-:|
| insaat | ⚠ | ✓ | ✓ | ✓ | ✓ (CRM) |
| mucevher | ✗ | ⚠ | ✓ | ✓ (3D) | ⚠ |
| kuafor | ✓ (KADIKOY) | ✓ | ✓ | ✗ | ✗ |
| restoran | ✓ | ✓ | ✓ | ⚠ | ⚠ (zincir) |
| klinik | ⚠ | ✓ | ✓ | ⚠ | ✗ |
| eticaret | ✗ | ⚠ | ✓ | ✓ | ✓ (marketplace) |
| spa | ✓ | ✓ | ✓ | ✗ | ✗ |
| fotograf | ✓ | ✓ | ✓ | ⚠ | ✗ |
| gayrimenkul | ⚠ | ⚠ | ✓ | ✓ (sanal tur) | ✓ (MLS) |
| otel | ✗ | ⚠ | ✓ | ✓ (tur) | ✓ (zincir) |

Toplam ✓: 27, ⚠: 14, ✗: 9. **✓ aktif preset hedefi: 27 × 2 palette + ⚠'lı kontrollü durumlar = ~60 preset**.

[KAYNAK: SECTOR-RESEARCH.md:1-210 (10 sektör detay) + SECTOR-RESEARCH.md:195-209 (matrix özet) + DESIGN-PATHWAYS.md:308-320 (PROJECT MATRIX yasaklı ID kanıtı) + CLAUDE.md Aktif Projeler (Fatih Bey mücevher = Tier 2, Yıldız İnşaat = Tier 4)]

---

## 10 · 80 PRESET MATRİSİ — 10×10 Grid

### 10.1 Matris (sektör × stil)

| Sektör ↓ / Stil → | brutalist | editorial-luxury | kinetic-agency | immersive-3d | maximalist-atm | minimal-swiss | warm-organic | data-dense | editorial-print | industrial-wear |
|-------------------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **insaat** | ✓ | ⚠ | ✓ | ✓ | ✗ | ✓ | ✗ | ✓ | ⚠ | ✓ |
| **mucevher** | ✗ | ✓ | ⚠ | ✓ | ⚠ | ✓ | ✓ | ✗ | ✓ | ✗ |
| **kuafor** | ✗ | ✓ | ✓ | ✗ | ⚠ | ✓ | ✓ | ✗ | ⚠ | ✗ |
| **restoran** | ⚠ | ✓ | ⚠ | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| **klinik** | ✗ | ✓ | ✗ | ⚠ | ✗ | ✓ | ✓ | ⚠ | ✓ | ✗ |
| **eticaret** | ✓ | ⚠ | ✓ | ✓ | ✓ | ✓ | ⚠ | ✓ | ⚠ | ⚠ |
| **spa** | ✗ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✗ |
| **fotograf** | ⚠ | ✓ | ✓ | ✓ | ✓ | ✓ | ⚠ | ✗ | ✓ | ✗ |
| **gayrimenkul** | ✗ | ✓ | ⚠ | ✓ | ⚠ | ✓ | ⚠ | ⚠ | ✓ | ✗ |
| **otel** | ✗ | ✓ | ⚠ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |

**Sayım:** ✓ = 49 · ⚠ = 22 · ✗ = 29. Aktif preset hedefi: 49 ✓ + 11 ⚠ (seçilecek) = **60 aktif**.

### 10.2 Forbidden (✗) hücrelerinin sebepleri

| Hücre | Sebep |
|-------|-------|
| mucevher × brutalist | Mücevher "rafine el-emeği" psikolojisi; brutalist "raw + rebel" — tam ters mood, premium hissi kaybolur |
| mucevher × data-dense | Dashboard estetiği mücevher editorial hissini öldürür |
| mucevher × industrial-workwear | Concrete + hazard stripe + mücevher = marka kimliği çelişkisi |
| kuafor × brutalist | Hijyen + kişisel bakım algısı; brutalist raw texture "temiz değil" hissi verir |
| kuafor × immersive-3d | Saç kesimi/boyama 3D gerekmiyor; gereksiz complexity |
| kuafor × data-dense | Randevu sistemi ≠ admin dashboard; müşteri homepage'i bu değil |
| kuafor × industrial-workwear | Salon vibe ≠ şantiye vibe |
| restoran × immersive-3d | Yemek 2D photography ile daha iştah açıcı; 3D model render yapay |
| restoran × data-dense | Menü tablo dashboard değil, görsel bir davet |
| restoran × industrial-workwear | Yemek sıcaklık ≠ concrete soğukluk (hariç "ipe dalmış endüstri lokanta" konsept — niche) |
| klinik × brutalist | Güven + huzur; brutalist rebel tonu hasta tedirgin eder |
| klinik × kinetic-agency | Hızlı motion klinikte dikkat dağıtıcı, hasta odaklanamaz |
| klinik × maximalist-atm | Dense overlap klinik sadeliğini bozar |
| klinik × industrial-workwear | Concrete/hazard → hasta "hastaneye değil şantiyeye geldim" hissi |
| klinik × warm-organic — ÇELİŞKİ DÜZELTME: aslında uyumlu, ⚠ olarak işaretlendi | |
| eticaret (Tier 0-1) × brutalist | Sharp border + shadow karar hızını düşürebilir; ✓ ama dikkat |
| spa × brutalist | Spa sakinlik + brutalist agresif — ters |
| spa × kinetic-agency | Yavaş + scroll pin çelişki |
| spa × immersive-3d | Spa deneyimi fiziksel; 3D render mesafe yaratır |
| spa × maximalist-atm | Dense overlap spa sessizliğini bozar |
| spa × data-dense | Randevu ≠ dashboard |
| spa × industrial-workwear | Concrete → "spa değil şantiye" |
| fotograf × data-dense | Portfolio görsel-ağırlıklı; dense table yaklaşımı görseli arka plana atar |
| fotograf × industrial-workwear | Concrete texture fotoğrafın renklerini boğar |
| gayrimenkul × brutalist | Güven + aile-dostu; brutalist rebel uyumsuz |
| gayrimenkul × industrial-workwear | "Evin inşaat halinde" hissi — satışa zarar |
| otel × brutalist | Lüks erişilebilir ≠ raw rebel |
| otel × data-dense | Rezervasyon akışı dashboard değil |
| otel × industrial-workwear | Concrete lüks oteli öldürür |

### 10.3 Kontrollü (⚠) hücrelerin koşulları

| Hücre | Koşul |
|-------|-------|
| insaat × editorial-luxury | Kurumsal inşaat şirketi, premium müşteri segmenti (villa / AVM); residential değil |
| insaat × editorial-print | "İnşaat dergisi" stili (Turk Mühendislik dergisi) — B2B content heavy sitede |
| mucevher × kinetic-agency | Genç mücevher markası (Pandora değil, zanaatkar boutique) |
| mucevher × maximalist-atm | Sanat zanaat mücevher (Sevan Bıçakçı tarzı) |
| kuafor × maximalist-atm | Edgy salon brand (East London style) |
| kuafor × editorial-print | Vintage barber shop (newspaper hed tonda) |
| restoran × brutalist | Ramen-ya, hip-hop konsept, street food |
| restoran × kinetic-agency | Tasting menu fine-dining (storytelling scroll) |
| klinik × immersive-3d | Estetik klinik (before/after 3D) |
| klinik × data-dense | Laboratuvar / klinik sonuç portalı (hasta değil, doktor için) |
| eticaret × editorial-luxury | Niş lüks e-ticaret (zanaat, artisan) |
| eticaret × warm-organic | Organik/doğal ürün e-ticaret |
| eticaret × editorial-print | Magazin e-ticaret (Kinfolk, Cereal tarzı) |
| eticaret × industrial-workwear | Workwear brand (Carhartt, Dickies) |
| fotograf × brutalist | Fotojurnalist / belgesel portfolio |
| fotograf × warm-organic | Düğün fotoğrafçısı (nostaljik ton) |
| gayrimenkul × kinetic-agency | Luxury branding firm (scroll storytelling) |
| gayrimenkul × maximalist-atm | Premium kampanya site (Bosphorus villa lansman) |
| gayrimenkul × warm-organic | Ekolojik konut (solarpunk tonlama) |
| gayrimenkul × data-dense | MLS-benzeri analitik (agent portal) |
| otel × kinetic-agency | Butik otel (storytelling heavy) |
| otel × maximalist-atm | Tema otel (Las Vegas tarzı) |

### 10.4 Preset YAML örneği

```yaml
---
id: mucevher-editorial-luxury
name: Mücevher × Editorial Luxury
sector: mucevher
style: editorial-luxury
tier: [2, 3]  # Mid veya Premium
status: valid  # valid | controlled | forbidden
---
palette: PL22  # Tobacco + Pearl
palette_alt: PL23  # Plum + Champagne
typography: TY27  # Fraunces + IBM Plex Sans + IBM Plex Mono
typography_alt: TY28  # Cormorant Garamond
atoms:
  header: H9  # Corner Brackets + Timestamp
  nav: N5  # Command Palette Only
  hero: HR11  # Brochure Cover 2-col
  kpi: K2  # Band with Horizontal Rules
  layout: L6+L8  # Center Single + Masonry ürün
  footer: FT4  # Colophon editorial
motion:
  primary: MO4  # Framer layoutId morph
  secondary: MO10  # print-first (sakin)
  forbidden: [aggressive-bounce, neon-accent]
forbidden_atoms: [PL1, TY1, TY2, HR2, T6]
scaffold_recipe_default: next-premium  # Tier 2
scaffold_recipe_premium: next-r3f  # Tier 3 — 3D viewer ekler
preview_url: /preview/mucevher-editorial-luxury
reference_impl:
  - templates/02-mucevher/index.html
  - mockups/a-warm-dark/index.html
repeat_score: 2  # 0-3 ✓ / 4-5 ⚠ / 6-7 ⚠⚠ / 8+ ✗
adversary_approved: true
```

[KAYNAK: YOL-HARITASI.md:324-341 (6 stil × 10 sektör matrix) + SECTOR-RESEARCH.md:195-209 (matrix özet) + DESIGN-PATHWAYS.md:304-320 (PROJECT MATRIX) + YOL-HARITASI.md:156-202 (YAML örnekleri) + DESIGN-PATHWAYS.md:332-342 (scoring)]

---

## 11 · 47 ATOM KATALOĞU — Kaynak + MIT-Safe Rewrite + Snippet + Uyum

### 11.1 Atom tablosu (47 satır)

| # | Atom ID | Kategori | Kaynak dosya:satır | MIT-safe rewrite notu | Kısa snippet (1-2 satır) | Uyumlu sektör | Uyumlu palette |
|:-:|---------|----------|---------------------|----------------------|--------------------------|---------------|----------------|
| 1 | Lenis+GSAP-Bridge | motion-foundation | research-assets/wab/wearebrand-animations.js:707-726 | Lenis + GSAP ticker bridge custom ease — bizzat rewrite, wearebrand özgün mülkiyet yok (pattern endüstri standartı) | `lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add(t=>lenis.raf(t*1000))` | tümü | tümü |
| 2 | Blur-36px-Reveal | motion-text | research-assets/wab/wearebrand-animations.js:148-194 + templates/14-ultra/index.html:612-618 | Sadece CSS filter animation, SplitText standart; wearebrand özgün değil | `gsap.from(split.chars, {filter:'blur(36px)', opacity:0, stagger:0.04})` | editorial-luxury, maximalist-atm, kinetic | PL22, PL23, PL9 |
| 3 | Magnetic-Elastic | motion-interaction | research-assets/wab/wearebrand-animations.js:738-784 + templates/14-ultra/index.html:536-546 | Generic mousemove + gsap.to pattern — özgün değil | `gsap.to(btn, {x:dx, y:dy, ease:'elastic.out(1, 0.3)'})` | kinetic, editorial, agency | tümü |
| 4 | CSS-Mask-maskY | motion-reveal | research-assets/wab/wearebrand_brand.html (CSS only) + templates/14-ultra/index.html:85-87 | CSS custom property + mask-image; browser native, özgün değil | `mask-image: url(...); --mask-y: 0%; mask-position: 50% var(--mask-y)` | editorial, maximalist | PL22, PL23 |
| 5 | Theme-Switch-Scroll | motion-state | research-assets/wab/wearebrand-animations.js:276-297 | ScrollTrigger onEnter/onLeave pattern — özgün değil | `ScrollTrigger.create({onEnter:()=>body.classList.add('light')})` | editorial, maximalist | çoklu palette (light+dark) |
| 6 | Figured-Eight-Shadow | visual-effect | wearebrand-custom.css | Pure CSS shadow pattern, non-unique | `box-shadow: 0 60px 120px -30px rgba(0,0,0,0.5)` | mucevher, otel | PL22, PL38 |
| 7 | CSS-Var-Parallax | motion-scroll | research-assets/_fraxbit_home.html:903-919 | CSS custom property pattern — fraxbit özgün ama public CSS | `element.style.setProperty('--speed-x', val); transform: translateX(calc(var(--speed-x) * 1px))` | kinetic, maximalist | çoklu |
| 8 | Clip-Path-Reveal-4dir | motion-reveal | research-assets/_fraxbit_home.html:931-955 + templates/14-ultra/index.html:314-315 | Standart clip-path polygon pattern | `clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%); transition: clip-path 1.4s` | kinetic, minimal-swiss | tümü |
| 9 | Dual-Cursor | visual-cursor | research-assets/_fraxbit_home.html (JS) + templates/14-ultra/index.html:520-546 | Generic pattern, özgün değil | `.cursor { width:6px; } .cursor-big { width:44px; border:1px solid }` | kinetic, agency | dark paletler |
| 10 | Trackpad-Custom-Ease | motion-ease | fraxbit JS | Pattern standart, fraxbit değeri: `cubic-bezier(0, .33, .07, 1.03)` | `ease: "cubic-bezier(0, .33, .07, 1.03)"` | kinetic | çoklu |
| 11 | Scatter-Preloader | motion-loader | fraxbit home.html | GSAP stagger + random position pattern | `gsap.to(imgs, {scale:1.5, stagger:0.15, onComplete: scatterAndShrink})` | agency, kinetic | tümü |
| 12 | Vimeo-Background-3D | media-video | research-assets/_research/mdx_*.html | Vimeo iframe + data attribute pattern | `<div data-vimeo-bg-init data-vimeo-video-id="1161504205">` | editorial-luxury, immersive-3d alternative | tümü |
| 13 | Data-Fade-JSON | motion-attribute | mdx.so | mdx özgün `data-fade-clip` — biz `data-reveal-clip` olarak rename | `<div data-reveal-clip='{"polygon":"40% 0, 60% 0..."}'>` | editorial-print | çoklu |
| 14 | Raw-GLSL-Simplex | shader-3d | Lusion lusion.co (view-source shader source) | Simplex noise GLSL — Ashima Arts MIT license kaynak | `float simplex(vec2 p) { ... Ashima implementation ... }` | immersive-3d, maximalist-atm | PL8, PL9 |
| 15 | CSS-Var-Shader-Uniform | 3d-integration | Lusion | Pattern generic: CSS var + material.uniforms bridge | `document.documentElement.style.setProperty('--pulse', val); material.uniforms.uPulse.value = val;` | immersive-3d | çoklu |
| 16 | Pixi-WiggleFilter | 2d-webgl | Adoratorio (Max Mara) GLSL source | GLSL displacement fragment shader — standart pattern | `vec2 displaced = vec2(vTextureCoord.x + noise.r * 0.003, vTextureCoord.y)` | maximalist-atm, immersive-3d | çoklu |
| 17 | Custom-SplitText | text-split | Adoratorio + Active Theory (GitHub `activetheory/split-text`) | Active Theory MIT OSS — kullanılabilir | `const split = new ATSplitText(el, {type: 'chars'})` | tümü | tümü |
| 18 | Blend-Mode-Difference-Header | visual-chrome | REJOUICE rejouice.com | Pure CSS pattern — özgün değil | `.header { mix-blend-mode: difference; position: fixed }` | brutalist, agency | high-contrast paletler |
| 19 | SVG-TextPath-Circle | chrome-decorative | Fiddle.Digital | SVG standart, özgün değil | `<textPath href="#circlePath">TEXT</textPath>` + `gsap.to('#circle-text', {rotation: 360, repeat: -1})` | kinetic-agency, maximalist | çoklu |
| 20 | Barba-Taxi-Curtain | page-transition | FLOT NOIR flotnoir.studio | Barba + Taxi.js pattern, OSS | `barba.init({transitions:[{leave: fadeOut, enter: fadeIn}]})` | kinetic, editorial-luxury | çoklu |
| 21 | Data-Hover-Follower | motion-interaction | Ravi Klaassens raviklaassens.com | Pattern generic (gsap.quickTo + data-*) | `const quickX = gsap.quickTo(el, 'x', {duration: 0.6, ease: 'rkHover'})` | agency, portfolio | çoklu |
| 22 | Data-Scroll-Attributes | motion-declarative | Locomotive OSS (locomotive-scroll v5 MIT) | Locomotive MIT license — kullanılabilir | `<div data-scroll data-scroll-speed="0.5">` | minimal-swiss, editorial | çoklu |
| 23 | Persistent-Canvas-Barba | 3d-chrome | Evolve madeinevolve.com | Pattern generic (canvas Barba container dışında) | `<canvas class="webgl" style="position:fixed;z-index:-1"></canvas>` | immersive-3d, maximalist-atm | dark palette |
| 24 | Porthole-Dive-Scale | motion-hero | templates/14-ultra/index.html:578-584 + research-assets/wab | Pattern standart (ScrollTrigger pin + scale transform) | `t.to('.hero-bg', {scale: 6.5, duration: 1})` | editorial-luxury, maximalist | PL22, PL23 |
| 25 | Variable-Font-Opsz-Scroll | motion-text | templates/14-ultra/index.html:586-595 | Pattern generic (onUpdate + fontVariationSettings) | `el.style.fontVariationSettings = 'opsz ' + (144-135*s.progress)` | kinetic, editorial | çoklu |
| 26 | ScrambleText-Free | motion-text | templates/14-ultra/index.html:597-610 | GSAP 3.13 ScrambleTextPlugin (2024'ten itibaren ücretsiz) | `gsap.to('#title', {scrambleText:{text:'ISTANBUL', chars:'upperAndLowerCase'}})` | kinetic, data-dense | çoklu |
| 27 | Canvas2D-Cursor-Trail | visual-cursor | templates/14-ultra/index.html:548-570 | Pattern standart (canvas 2d + requestAnimationFrame) | `ctx.arc(p.x, p.y, 10*p.life, 0, Math.PI*2); ctx.fillStyle = 'rgba(232,90,44,'+p.life+')'` | kinetic, maximalist | dark palette |
| 28 | SVG-TextPath-Bend-Marquee | chrome | templates/14-ultra/index.html:454-466 | SVG standart, özgün değil | `<textPath href="#bendCurve"><animate attributeName="startOffset" from="100%" to="-100%" dur="26s" repeatCount="indefinite"/>` | kinetic, agency | çoklu |
| 29 | SVG-feTurbulence-Grain | chrome | templates/14-ultra/index.html:62-63 + 321-326 | SVG filter standart | `<filter id="n"><feTurbulence baseFrequency="0.9" numOctaves="2"/></filter>` | editorial-luxury, maximalist-atm, industrial | tümü |
| 30 | SplitText-Chars-Lines | motion-text | templates/14-ultra/index.html:621-628 | GSAP 3.13 SplitText (ücretsiz) | `const split = new SplitText(h, {type: 'lines,words', mask: 'lines'})` | tümü | tümü |
| 31 | Theme-Scroll-Switch-Wab | motion-state | templates/14-ultra/index.html:637-645 | ScrollTrigger onEnter/onLeave pattern | `ScrollTrigger.create({trigger:'[data-theme="light"]', onEnter:()=>body.classList.add('light')})` | editorial, maximalist | çoklu (light+dark) |
| 32 | Scroll-Scrubbed-Opacity-Char | motion-text | templates/14-ultra/index.html:612-618 | Pattern generic (stagger + scrub) | `gsap.from(chars, {opacity:0.15, stagger:0.04, scrollTrigger:{scrub:true}})` | editorial, kinetic | çoklu |
| 33 | Clip-Path-Mask-Polygon | motion-reveal | templates/14-ultra/index.html:314-315 | CSS standart | `clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%)` | kinetic, minimal-swiss | tümü |
| 34 | Bento-Asymmetric-Grid | layout | templates/14-ultra/index.html:227-255 (.work-grid) | CSS grid pattern | `grid-template-columns: repeat(6, 1fr); .wc-1 { grid-column: span 3; grid-row: span 2 }` | eticaret, agency, data-dense | tümü |
| 35 | Dashboard-Receipt-Strip | data-ui | insaat-crm/b-edge/index.html:254-291 | CSS + HTML pattern | `.receipt { border-top: 1px dashed; padding: 8px 0; display: flex; justify-content: space-between }` | data-dense | PL19, PL4 |
| 36 | Terminal-Log-Mono | data-ui | insaat-crm/b-edge/index.html:293-310 | CSS mono + HTML pattern | `.log { font-family: 'JetBrains Mono'; background: #0A0A0A; color: #4DFFE6 }` | data-dense, industrial | dark paletler |
| 37 | Barometer-Gauge-SVG | data-ui | insaat-crm/b-edge/index.html:209-217 | SVG path + GSAP rotate | `<path id="needle" d="..." /><script>gsap.to(needle, {rotation: val, transformOrigin: '50% 100%'})</script>` | data-dense, industrial | PL4, PL19 |
| 38 | Dense-Table-Linear | data-ui | insaat-crm/a-safe/index.html:126-162 | CSS grid table pattern | `display: grid; grid-template-columns: 40px 1fr 80px 120px; font-variant-numeric: tabular-nums` | data-dense | tümü |
| 39 | Spec-Sheet-Engineering-BOM | data-ui | insaat-crm/c-hybrid/index.html:291-327 | Table pattern | `<table class="bom"><thead><tr><th>ID</th><th>Item</th><th>Qty</th>...</thead></table>` | industrial, data-dense | PL5, PL11 |
| 40 | Column-Chart-Grow-GSAP | chart | insaat-crm/c-hybrid/index.html:178-226 | GSAP scale animation | `gsap.from('.bar', {scaleY: 0, transformOrigin: 'bottom', stagger: 0.1, scrollTrigger: {...}})` | data-dense, industrial | tümü |
| 41 | Sparkline-Inline-SVG | chart | insaat-crm/a-safe/index.html:124 | SVG path pattern | `<svg><path d="M 0,50 L 20,30 L 40,40..." stroke="currentColor" fill="none"/></svg>` | data-dense | tümü |
| 42 | Corner-Bracket-4dir | chrome | insaat-crm/a-safe/index.html:70-82 + c-hybrid:53-71 | Pure CSS pseudo-element pattern | `.frame::before { content:''; position: absolute; top:0; left:0; width:20px; height:20px; border-top: 2px solid; border-left: 2px solid }` | industrial, data-dense | tümü |
| 43 | Hazard-Stripe | chrome | insaat-crm/b-edge/index.html:56-57 + mockups/c-concrete:62-77 | CSS linear-gradient pattern | `background: repeating-linear-gradient(45deg, #111 0 20px, #F5C400 20px 40px)` | industrial, brutalist | PL4, PL6 |
| 44 | Concrete-Speckle-Grain | chrome | insaat-crm/b-edge/index.html:45-53 + mockups/c-concrete:50-59 | SVG feTurbulence + noise pattern | `<filter id="concrete"><feTurbulence baseFrequency="0.85" seed="5"/></filter>` | industrial, brutalist | PL4, PL5 |
| 45 | Plate-Hazard-Header | chrome | insaat-crm/b-edge/index.html:60-83 | HTML + CSS pattern | `<header class="plate"><div class="hazard-top"></div><div class="plate-body">...</div></header>` | industrial | PL4, PL21 |
| 46 | Blueprint-Title-Block | hero | insaat-crm/c-hybrid/index.html (HR13) | HTML + CSS technical drawing frame | `<div class="title-block"><div class="cell">PROJ #</div><div class="cell">DATE</div>...</div>` | industrial, editorial-print | PL5, PL11 |
| 47 | Signature-Block-FT6 | footer | insaat-crm/c-hybrid/index.html:381-395 | HTML + CSS engineering title | `<footer><div class="sig"><span>DESIGNED BY</span><span>PROJECT NO</span></div></footer>` | industrial, editorial-print | PL5, PL11 |

### 11.2 MIT-Safe Rewrite Politikası

- **14-ultra atomları (24-32):** Bizim yazdığımız, rewrite gerekmez, direkt kullan
- **wearebrand atomları (1-6):** Pattern'ler generic, değer özgün ease curve'de (`e => Math.min(1, 1.001 - Math.pow(2, -10*e))`) — bu ease'i olduğu gibi kullanma, kendi curve'ümüzü üretmeliyiz
- **fraxbit atomları (7-11):** Pattern + değer generic; `cubic-bezier(0, .33, .07, 1.03)` özgün olabilir → çok kullanılırsa kendi değer
- **Lusion atomu (14 GLSL):** Ashima Arts MIT lisanslı, atıf gerekli: kod comment `// simplex noise by Ashima Arts (MIT)`
- **Active Theory Split (17):** GitHub MIT, kaynak link comment
- **Locomotive data-scroll (22):** MIT, npm import
- **Adoratorio Pixi WiggleFilter (16):** GLSL fragment özgün değil, PIXI filter boilerplate da public

### 11.3 Atom kullanım örneği (catalog/atoms/HR11.yaml)

```yaml
---
id: HR11
name: Brochure Cover Hero
category: hero
description: "2-col grid, large italic serif display (clamp 72-132px), framed product visual"
---
usage_sectors: [mucevher, restoran, otel, spa, fotograf]
forbidden_with: [PL1]  # dark+gold yasak
requires:
  typography: [variable-serif-opsz]  # TY27, TY28, TY43
  motion: optional  # CSS-only olabilir
reference_impl:
  - file: templates/02-mucevher/index.html
    lines: 74-78
  - file: templates/04-restoran/index.html
    lines: 76-81
  - file: templates/10-otel/index.html
    lines: 82-88
variants:
  - name: photo-framed
    visual: "3/4 aspect, symbol ◎"
  - name: object-centered
    visual: "4/5 aspect, product render"
preview_html: previews/atoms/HR11.html
snippet: |
  <section class="hero-brochure">
    <div class="hero-grid">
      <h1 class="display italic">El emeği<br>her <em>iz</em> bir hikâye</h1>
      <figure class="product-frame"><img src="..."/><figcaption>◎</figcaption></figure>
    </div>
  </section>
```

[KAYNAK: YOL-HARITASI.md:42-47 (altın madenler + 14 atom line number) + YOL-HARITASI.md:653-685 (EK A — pattern listesi) + SCRAPED-STACKS-2026.md:59-93 (ajans OSS paketleri) + SCRAPED-STACKS-2026.md:163-329 (15 signature pattern kod) + 2026-ADVANCED-TECHNIQUES.md:10-216 (fraxbit + mdx + wearebrand) + templates/14-ultra/index.html:62-645 (14 atom satır numarası audit)]

---

## 12 · 18 AGENT ROSTER — Rol + Pathway Yetkinliği + Referans

### 12.1 Mevcut 14 Agent (`~/.claude/agents/`)

| # | Agent | Rol | Pathway yetkinliği | Decision criteria | Referans research |
|:-:|-------|-----|---------------------|-------------------|-------------------|
| 1 | `typography-expert` | Typography seçimi, Türkçe karakter, opsz axes | TY1-TY44 (44 combo) | Variable font opsz axis gerekli mi? / TR subset render OK mu? / opsz 9-144 range kullanılıyor mu? | DESIGN-PATHWAYS.md:205-236 (25 combo tablosu) + SECTOR-RESEARCH.md TY26-TY44 |
| 2 | `palette-expert` | Renk + WCAG kontrast + sektör psikolojisi | PL1-PL38 (38 palette) | WCAG AA pass? / bg-accent ≥4.5:1? / klişe PL1 yasak kontrol | DESIGN-PATHWAYS.md:239-262 + SECTOR-RESEARCH.md palette B |
| 3 | `layout-expert` | 12-col grid, asymmetric, bento, masonry, rhythm | L1-L11 (10 layout) | Mobile-first breakpoint var mı? / whitespace rhythm consistent mi? | DESIGN-PATHWAYS.md:267-281 |
| 4 | `motion-expert` | GSAP / Lenis / Framer / Theatre / CSS scroll-driven | MO1-MO12 (10 motion primitive) | prefers-reduced-motion guard var mı? / 60fps mobile mi? / Lenis+GSAP bridge doğru mu? | DESIGN-PATHWAYS.md:284-295 + animation-gsap-framer-lenis-masterclass-2026.md |
| 5 | `header-expert` | Top bar, sidebar rail, breadcrumb, command palette, dock, writing-mode | H1-H10 + N1-N10 (20 pattern) | Sektöre uygun mu? / mobile dock gerekli mi? | DESIGN-PATHWAYS.md:26-36 + 42-54 |
| 6 | `hero-expert` | Kinetic typography, split-hero, video bg, 3D canvas, newspaper, dashboard, chat | HR1-HR14 (14 pattern) | Hero gereksiz mi (HR14 zero-hero)? / 3D bütçe var mı? | DESIGN-PATHWAYS.md:60-76 + YOL-HARITASI.md:655-663 (HR9-17 promote) |
| 7 | `kpi-expert` | Bento, band+rules, chip row, almanac, ring gauge, tower, sparkline | K1-K13 (13 pattern) | Dashboard mı landing mi? / dense mı sparse mı? | DESIGN-PATHWAYS.md:80-94 |
| 8 | `pipeline-list-expert` | Kanban, elevation, funnel, D3 force, timeline, stacked bars, 3D tower, dense table, card grid | P1-P10 + T1-T8 (18 pattern) | Drag-drop gerekli mi? / virtualization? | DESIGN-PATHWAYS.md:98-126 |
| 9 | `chart-expert` | Chart.js/Recharts/Nivo/D3/ECharts + elevation, candlestick, heatmap, sparkline, 3D R3F | CH1-CH12 (12 pattern) | Enterprise dense mi minimal mi? / a11y label var mı? | DESIGN-PATHWAYS.md:144-158 |
| 10 | `interaction-expert` | Chat, inbox, form, modal, overlay | C1-C6 + F1-F8 + M1-M6 (20 pattern) | Wizard step gerekli mi? / mobile bottom-sheet? | DESIGN-PATHWAYS.md:130-186 |
| 11 | `footer-expert` | Wordmark, sitemap, receipt, colophon, contact card, signature, marquee, slab | FT1-FT8 (8 pattern) | KVKK link zorunlu mu? / editorial colophon uygun mu? | DESIGN-PATHWAYS.md:190-202 |
| 12 | `immersive-3d-expert` | R3F / drei / postprocessing / wawa-vfx / GLSL / Gaussian splat / scroll-camera | 3D atom (HR4, HR-Immersive, MO11, MO12) | 3D bundle ≤ 2MB mı? / 60fps mobile? / Draco+Meshopt? | 3D-TECHSTACK.md + drei-advanced-visual-components-research.md |
| 13 | `design-director` (meta) | Orchestrator — 12 uzmanın görüşünü sentezle, 3 combo türet (A/B/C) | Tümü | A safe (repeat ≤ 3) / B edge (yeni kombine) / C hybrid | COUNCIL-KURULUM-RAPORU.md:64-74 |
| 14 | `design-adversary` (meta) | Eleştirmen — repeat skor + yasaklı ID + coherence + a11y | Tümü | 8+ eşleşme red, yasaklı ID bayrak, kontrast fail red | COUNCIL-KURULUM-RAPORU.md:67-68 |

### 12.2 Yeni 4 Agent (Faz 1'de yazılacak)

| # | Agent | Rol | Pathway/domain | Decision criteria | Referans research |
|:-:|-------|-----|---------------|-------------------|-------------------|
| 15 | `seo-expert` | Teknik SEO + JSON-LD + sitemap + i18n + robots + canonical | Sector × SEO | Product JSON-LD gerekli mi? / LocalBusiness schema? / hreflang? | seo-audit-2026.md + sitemap-robots-structured-data-seo-2026.md + i18n-seo-meta-turkish-web-2026.md |
| 16 | `accessibility-expert` | WCAG 2.2 + ARIA + focus-visible + keyboard nav + screen reader | Tümü (transversal) | axe-core 0 critical? / focus trap doğru? / landmark roles? | accessibility-wcag-aria-2026.md (5578 satır) |
| 17 | `performance-expert` | Core Web Vitals + bundle budget + image opt + caching + edge | Tümü | LCP ≤ 2.5s? / CLS ≤ 0.05? / INP ≤ 200ms? / bundle ≤ 300KB? | nextjs-16-advanced-patterns-2026.md + caching-redis-edge-strategies-2026.md + virtualization-infinite-list-perf-2026.md |
| 18 | `claude-design-liaison` | Stage 3.75 → handoff bundle parser → preset.yaml merge | Tier 3+ | Bundle geçerli mi (schema)? / token çakışma? / design system conflict? | FRONTEND-TECHSTACK.md:423-488 + claude-design-anthropic-labs-2026.md |

### 12.3 Council 5 tur akışında agent rol dağılımı

| Tur | Hangi agent ne yapar |
|:-:|---------------------|
| 1 | Paralel 12 domain agent (1-12) + 3 yeni (15, 16, 17) → her biri kendi kategorisinde 3 aday öner |
| 2 | Aynı agent'lar karşılıklı inceler → çelişki tespit (örn: typography TY14 + palette PL11 kontrast < 4.5:1 → revize) |
| 3 | design-director (13) sentez → 3 combo (A safe / B edge / C hybrid) |
| 4 | design-adversary (14) check → repeat skor, yasaklı ID, kontrast, responsive — 8+ eşleşme RED (max 2 retry) |
| 5 | Kullanıcı onay → combo.md kaydı |
| 3.75 (opsiyonel) | claude-design-liaison (18) — Tier 3+ → handoff bundle preset.yaml'a merge |

### 12.4 Agent karar hiyerarşisi (çelişki durumunda)

```
accessibility-expert > performance-expert > palette-expert > typography-expert > ...
```

**Neden bu sıra:**
1. **a11y hiçbir stil için feda edilmez** — WCAG AA kontrast ihlali varsa palette revize, yasak
2. **performance ikinci** — LCP > 2.5s'de R3F Canvas yerine R3F placeholder + lazy load zorunlu
3. **palette üçüncü** — tema tutarlılığı, ama a11y + perf sonra
4. **diğerleri eşit öncelik** — design-director dengeleme yapar

[KAYNAK: COUNCIL-KURULUM-RAPORU.md:19-42 (14 agent roster) + DESIGN-PATHWAYS.md:24-300 (kategori × pathway) + FRONTEND-TECHSTACK.md:1-94 (research dosyaları liste) + accessibility-wcag-aria-2026.md (5578 satır) + CLAUDE.md skill tanımları]

---

## 13 · 33 SKILL × 8 STAGE EŞLEŞME MATRİSİ

### 13.1 Stage tanımı (Bölüm 14 detayı, burada özet)

- **Stage -1:** Armut ilan ön-hazırlık (teklif öncesi)
- **Stage 0:** Toplantı sonrası dosya + geçmiş kontrolü
- **Stage 1:** Whisper transkript
- **Stage 1.5:** Tech detection (otomatik)
- **Stage 2:** Analiz PDF
- **Stage 3:** 18 doküman + PPTX + (3.5 master + 3.7 council + 3.75 Claude Design + 3.8 catalog-query)
- **Stage 4:** Scaffold (Next.js veya WordPress)
- **Stage 5-8:** Polish → SEO → Review → Launch

### 13.2 Skill × Stage eşleşme matrisi

| Skill (33) | -1 | 0 | 1 | 1.5 | 2 | 3 | 3.5 | 3.7 | 3.75 | 3.8 | 4 | 5 | 6 | 7 | 8 |
|-----------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `armut-bidding` | **A** | | | | | | | | | | | | | | |
| `meeting-analysis` | | **A** | **A** | **A** | **A** | **A** | **A** | | | | | | | | |
| `client-onboarding` | | **M** | | | | **M** | | | | | | | | | |
| `client-proposal` | **M** | | | | | **M** | | | | | | | | | |
| `contract-proposal-writer` | **M** | | | | | **M** | | | | | | | | | |
| `pdf` | | | | | **A** | **M** | **A** | | | | | | | | |
| `docx` | | | | | | **M** | | | | | | | | | |
| `pptx` | | | | | | **M** | | | | | | | | | |
| `xlsx` | | | | | | **M** | | | | | | | | | |
| `design-council` (slash) | | | | | | | | **A** | | | | | | | |
| **catalog-query** (YENİ) | | | | | | | | | | **A** | | | | | |
| `claude-design-liaison` (YENİ) | | | | | | | | | **A** | | | | | | |
| `frontend-design` | | | | | | | | **A** | | **A** | **A** | **A** | | | |
| `ui-ux-pro-max` | | | | | | | | **A** | | **A** | **A** | **A** | | | |
| `site-replicator` | | | | **M** | | | | | | | **M** | | | | |
| `e-commerce-builder` | | | | **M** | | | | | | | **A** | | | | |
| `3d-site-builder` | | | | **M** | | | | | | | **A** | | | | |
| `schema-markup` | | | | | | | | | | | | | **A** | | |
| `site-architecture` | | | | | | | | | | | | | **A** | | |
| `seo-audit` | | | | | | | | | | | | | **A** | | |
| `content-strategy` | | | | | | | | | | | | | **M** | | |
| `programmatic-seo` | | | | | | | | | | | | | **M** | | |
| `code-reviewer` | | **M** (baslangic) | | | | | | | | | | | | **A** (final) | |
| `docker-development` | | | | | | | | | | | **M** | | | | |
| `claude-api` | | | | **M** | | | | | | | **M** | | | | |
| `api-design-reviewer` | | | | | | | | | | | | **M** | | **M** | |
| `pr-review-expert` | | | | | | | | | | | | | | **M** | |
| `rag-architect` | | | | **M** | | | | | | | **M** | | | | |
| `mcp-builder` | | | | | | | | | | | **M** | | | | |
| `launch-strategy` | | | | | | | | | | | | | | | **A** |
| `senior-prompt-engineer` | | | | | | | **M** | | | | **M** | | | | |
| `invoice-tracker` | **M** | **A** | | | | | | | | | | | | | **A** |
| `weekly-summary` | | | | | | | | | | | | | | | |
| `skill-creator` | | | | | | | | | | | | | | | |

**Legend:** **A** = Auto-trigger, **M** = Manuel tetikleme

### 13.3 Auto-chain Kuralları (zorunlu ardışık çağrılar)

```yaml
auto_chains:
  - name: seo-zinciri
    when: stage == 6
    chain: [seo-audit, schema-markup, site-architecture]
    parallel: false  # sıralı
    rationale: "seo-audit sorunu tespit eder → schema-markup düzeltir → site-architecture yapılandırır"

  - name: ecommerce-zinciri
    when: stage == 4 AND features INCLUDES "e-ticaret"
    chain: [e-commerce-builder, schema-markup]
    parallel: false
    rationale: "Product JSON-LD otomatik ekle"

  - name: 3d-zinciri
    when: stage == 1.5 AND tech_detection INCLUDES "3d"
    chain: [3d-site-builder]  # sonrasında Stage 4'te frontend-design
    rationale: "3D tespit edilirse build öncesi 3D skill çalıştır"

  - name: review-zinciri
    when: stage == 7
    chain: [code-reviewer, api-design-reviewer]
    parallel: true
    rationale: "Kod + API ayrı alan, paralel çalışabilir"

  - name: content-zinciri
    when: stage == 6 AND features INCLUDES "blog"
    chain: [content-strategy, programmatic-seo]
    parallel: false
    rationale: "İçerik planlama sonra toplu sayfa üretimi"
```

### 13.4 GUARD Kuralları (önceki skill başarılı olmadan tetikleme yasak)

```yaml
guard_rules:
  - skill: launch-strategy
    requires: code-reviewer.final == "pass"
    rationale: "Güvenlik + performans pass sart — CLAUDE.md Aktif Projeler 7 güvenlik açığı örneği"

  - skill: e-commerce-builder
    requires: meeting-analysis.budget_range >= 15000 OR meeting-analysis.tier >= 2
    rationale: "Tier 1 budget WordPress ile yapılır, Next.js e-commerce-builder Tier 2+"

  - skill: 3d-site-builder
    requires: tech-detection.3d_required == true
    rationale: "3D gereksinimi yoksa overkill, bundle bloat"

  - skill: launch-strategy
    requires: mobile_lighthouse >= 90 AND wcag_aa_pass == true
    rationale: "Quality gate olmadan lansman yasak"
```

### 13.5 Otomatik Pipeline (CLAUDE.md'den türetilen)

| Asama | Tetikleyici | Skill | Zincir |
|-------|-------------|-------|--------|
| Baslangic | Proje acilisi | `code-reviewer` (scope check) | — |
| Gelistirme | Component yazimi | `frontend-design` + `ui-ux-pro-max` | — |
| Gelistirme | 3+ sayfa olusunca | `site-architecture` | — |
| Gelistirme | E-ticaret islevi | `e-commerce-builder` | → `schema-markup` |
| Gelistirme | 3D/WebGL ekleme | `3d-site-builder` | — |
| Son | Sayfalar tamamlaninca | `seo-audit` | → `schema-markup` → `site-architecture` |
| Teslim | Deploy / canli | `launch-strategy` | + `code-reviewer` (final) |

[KAYNAK: CLAUDE.md Skill Kullanim Rehberi (32 skill + auto pipeline) + SITE-GELISTIRME-PIPELINE.md:429-483 (8 stage skill mapping) + CLAUDE.md Otomatik Skill Pipeline tablosu]

---

## 14 · 8 PIPELINE STAGE — Detay

### 14.1 Stage detay tablosu

| Stage | Ne | Trigger | Input | Output | Onay | Skill zinciri | Süre |
|:-:|----|---------|-------|--------|:-:|--------------|------|
| **-1** | Armut ilan ön-hazırlık | Armut ilan linki veya metin paylaşımı | İlan metni | Sektör + bütçe + modül listesi + fiyat tablosu + PPTX sablon + armut-bidding mesajı | — | `armut-bidding` | 15-30 dk |
| **0** | Müşteri kabul + dosya + geçmiş kontrolü | Müşteri "evet" dedi | Önceki müşteri kaydı (varsa), toplantı ses dosyası format/boyut | Onaylanmış dosya listesi | — | `invoice-tracker` (başlangıç) + `meeting-analysis` Stage 0 | 5-10 dk |
| **1** | Whisper transkript | Ses dosyası yüklendi | Audio file (.m4a, .mp4, .wav) | Turkish transkript (large-v3 model, GPU, speaker label) | **İlk 500 kelime kontrol** | `meeting-analysis` Stage 1 | 10-30 dk |
| **1.5** | Tech detection | Transkript hazır | Transkript | Sektör + 3D gerekiyor mu + budget + features listesi + otomatik teslim süresi/fiyat | Otomatik (onay yok) | `meeting-analysis` Stage 1.5 | 2-5 dk |
| **2** | Analiz PDF | Tech detection bitti | Transkript + tech detection | 12 bölümlü analiz PDF (özet + kararlar + aksiyon + kritik bilgi + fırsat + risk + öneri + araştırma + ilişki + alıntı + tech stack öneri) | **PDF kontrol** | `meeting-analysis` Stage 2 + `pdf` | 15-30 dk |
| **3** | 18 doküman + PPTX | PDF onaylandı | PDF analiz | Zorunlu 4 doküman (kapsam, teknik, tasarım brief, içerik) + koşullu 14 (ödeme, soru formu, iç analiz, finansal, aksiyon, sözleşme, 17 dokuman) + PPTX extra öneriler | **Müşteri onay** | `meeting-analysis` Stage 3 + `docx` + `pptx` + `client-proposal` + `contract-proposal-writer` | 30-60 dk |
| **3.5** | Master analiz PDF (iç kullanım) | 18 doküman tamam | Tüm MD dosyaları | 25-35 sayfa birleşik PDF (teknik + finansal + stratejik + rekabet) | — | `pdf` + `senior-prompt-engineer` (opsiyonel prompt tune) | 10-20 dk |
| **3.7** | Design Council (14 agent, 5 tur) | Master PDF hazır | Brief + master PDF + DESIGN-PATHWAYS.md | 3 combo (A safe / B edge / C hybrid) + adversary raporu | — | `design-council` slash (Stage 3.7) | 30-60 dk |
| **3.75** | Claude Design (opsiyonel Tier 3+) | Tier >= 3 AND müşteri visual exploration istiyor | Brief + combo | Claude Design prototip → handoff bundle (ZIP) → preset.yaml'a merge | **Bundle onay** | `claude-design-liaison` + Claude Design web UI | 60-120 dk |
| **3.8** | Catalog-query (YENİ) | Council + (varsa) Claude Design biter | Combo + tech detection | 3 ranked preset (A/B/C) + atom listesi + preview link + adversary validation | **Preset seç A/B/C/hybrid** | `catalog-query` | 5-10 dk |
| **4** | Scaffold | Preset seçildi | `catalog/presets/[sector]-[style].yaml` | Çalışır dev server (Next.js veya WordPress) + `combo.md` + 50 component iskeleti | — | `scaffold.js` (Tier 2-4) veya `scaffold-wp.js` (Tier 1) + `frontend-design` | 5-10 dk scaffold, 2-20 gün content fill |
| **5** | Polish | İskelet çalışıyor | Component listesi | Mobile Lighthouse ≥ 90, responsive 3 breakpoint, a11y AA | — | `frontend-design` + `ui-ux-pro-max` + `site-replicator` (referans polish) | 1-3 gün |
| **6** | SEO zinciri | Sayfalar tamam | Full site | JSON-LD schema, sitemap.xml, robots.txt, Core Web Vitals raporu | — | `seo-audit` → `schema-markup` → `site-architecture` | 0.5-1 gün |
| **7** | Code review | SEO bitti | Full repo | Güvenlik + performans + bug raporu, fix'ler | **Final review onay** | `code-reviewer` + `api-design-reviewer` + `pr-review-expert` | 0.5-1 gün |
| **8** | Launch | Tüm quality gate pass | Repo + deploy plan | Prod deploy (Vercel/cPanel/Docker) + DNS + SSL + analytics + monitoring | **Müşteri final onay** | `launch-strategy` + `invoice-tracker` (final ödeme) | 2-4 saat |

### 14.2 Stage sıra kritik kuralları

1. **Stage -1 TOPLANTI ÖNCESI, Stage 0-8 TOPLANTI SONRASI** — karıştırma yok
2. **Onay almadan stage atlama** — ama Stage 1.5 (tech detection) + 3.5 (master PDF) + 3.8 (catalog-query) otomatik, onay gerekmez
3. **Stage 4 recipe seçimi otomatik** — Stage 1.5 tech detection + 3.8 preset'inin recipe field'ı birleşerek karar verir (bütçe × feature)
4. **Stage 7 code-reviewer pass olmadan Stage 8 launch yasak** — GUARD kuralı (CLAUDE.md)
5. **Stage 8 Lighthouse ≥ 90 / WCAG AA pass olmadan launch yasak** — quality gate

### 14.3 Mevcut pipeline ile fark (SITE-GELISTIRME-PIPELINE.md v2)

| Mevcut v2 | YENİ (ULTRAPLAN ile) | Fark |
|-----------|---------------------|------|
| Stage -1: yok (SITE-GELISTIRME bu başlangıç stage'ini kapsamıyor, sadece Stage 0'dan başlıyor) | Stage -1: armut-bidding + ilan ön-hazırlık | Yeni eklenen |
| Stage 6.5: Design Council | Stage 3.7 (rename + early) | Combo artık Stage 4 scaffold öncesi, Stage 6.5 çok geç |
| Stage 7: Development (hepsi birbirine karışık) | Stage 4-5 (scaffold + polish ayrı), 6 (SEO), 7 (review), 8 (launch) | Bölündü, her stage tekli skill zinciri |
| Claude Design entegrasyon yok | Stage 3.75 (opsiyonel Tier 3+) | Yeni, 17 Nis 2026 lansmanı sonrası |
| Catalog-query yok | Stage 3.8 | Yeni, preset kararı otomatikleştiriyor |
| Mobile Lighthouse quality gate yok | Stage 5 + 8'de zorunlu ölçüm | Yeni |

[KAYNAK: SITE-GELISTIRME-PIPELINE.md:1-594 (mevcut 8 aşama) + SITE-GELISTIRME-PIPELINE.md:354-419 (Stage 6.5 Council) + CLAUDE.md Master Pipeline akışı (Stage -1 → 4) + YOL-HARITASI.md:420-466 (Stage 4 akış detayı)]

---

## 15 · CLAUDE DESIGN STAGE 3.75 ENTEGRASYONU

### 15.1 Nedir?

**Claude Design** (17 Nisan 2026 Anthropic Labs lansmanı) — `claude.ai/design` URL'de ayrı web app. Claude Code içinden çağrılamaz. Kullanıcı tarayıcıda çalışıp sonucu handoff bundle olarak Claude Code'a taşır.

### 15.2 Handoff Bundle Formatı

```
claude-design-export-[proje-id].zip
├── manifest.json          ← bundle metadata (version, exported_at, components[])
├── design.json            ← design token + component tree
├── tokens.css             ← CSS custom property (--color-*, --space-*, --font-*)
├── components/            ← her component ayrı dosya
│   ├── hero/
│   │   ├── structure.json
│   │   ├── style.css
│   │   └── preview.html
│   ├── card/
│   └── nav/
├── assets/                ← image, icon, illustration (SVG + PNG + WebP)
│   ├── hero-bg.webp
│   ├── icon-*.svg
│   └── ...
├── typography.json        ← font family, weight, opsz, tr subset info
└── README.md              ← import talimatı
```

### 15.3 claude-design-liaison Agent Specification

```yaml
---
name: claude-design-liaison
description: Claude Design handoff bundle parse + preset.yaml'a merge. Tier 3+ projelerde Stage 3.75'te çalışır.
tools: [Read, Write, Edit, Glob, Grep, Bash]
---

# claude-design-liaison

## Sorumluluk
1. `design-export-*.zip` oku (user yükler)
2. `manifest.json` schema validate et
3. `design.json` → `preset.yaml` merge:
   - palette override (eğer Claude Design'da yeni palette tokenları varsa)
   - typography override (eğer font-family farklı)
   - atom mapping (Claude Design component → bizim atom ID'lerimiz)
4. Çakışma tespit:
   - Yasaklı ID kullanılmış mı? (örn: PL1 gradient)
   - Tier uyumsuzluğu mu? (örn: Tier 2 bütçede 3D atom talebi)
5. Merge raporu: [X atom accepted, Y atom rejected, Z conflict]

## Input
- zip_path: handoff bundle yolu
- preset_path: hedef preset.yaml yolu

## Output
- Merged preset.yaml
- conflict-report.md

## Decision criteria
- Claude Design atom'u bizim 47 atom'a eşleşiyor mu? Evet → kullan
- Eşleşmiyor → design-director agent'a sor (47 atom'a eklenebilir mi?)
- Yasaklı? → reject + sebep

## Referans research
FRONTEND-TECHSTACK.md:423-488 (Claude Design + MCP)
Mobilyaci/3d-demo/research/claude-design-anthropic-labs-2026.md
```

### 15.4 Hangi Tier'larda Tetiklenir?

| Tier | Claude Design Stage 3.75 |
|:-:|----|
| 0 · Ultra-Budget | ❌ Overkill, bütçeye değmez |
| 1 · Budget WP | ❌ WordPress Elementor ayrı design, bundle işe yaramaz |
| 2 · Mid Next.js | ⚠ Opsiyonel — premium müşteri isterse |
| 3 · Premium | ✓ Önerilir — visual exploration +10-20 saat ama %30-50 iterasyon kazandırır (Brilliant: 20+ prompt → 2 prompt) |
| 4 · Enterprise | ✓ Zorunlu öneri — design system setup karmaşık, Claude Design takım sistemine otomatik uygulanıyor |

### 15.5 Token Ekonomisi

| Session | Token tahmini | Maliyet (Pro/Max plan) |
|---------|--------------|------------------------|
| Claude Design exploration (web UI) | ~55K token / session | Ayrı tracking + haftalık limit (token-intensive) |
| claude-design-liaison (Claude Code içinde) parse + merge | ~5-10K token | Standart usage |
| **Toplam bir Tier 3 proje için** | ~60-65K token | Max plan 5h window'da yetiyor |

### 15.6 MCP Kurulumu (Design-First Stack)

```bash
# Claude Code'da MCP server'lar
claude mcp add playwright -s user -- npx @playwright/mcp@latest         # ~5.3K token
claude mcp add chrome-devtools -s user -- npx @anthropic-ai/chrome-devtools-mcp@latest  # ~5-6K
claude mcp add context7 -s user -- npx -y @upstash/context7-mcp@latest  # ~2K
claude mcp add --transport sse figma-dev-mode-mcp-server http://127.0.0.1:3845/sse      # ~3-4K

# Toplam: ~15-17K token session başı (MCP server'ların discovery maliyeti)
```

### 15.7 Akış Örneği (Tier 3, Mücevher 3D Viewer)

```
Stage 3.7 Council bitti → A Safe combo seçildi
    ↓
[EMRE KARAR] Tier 3 + müşteri "visual exploration istiyor" dedi
    ↓
Stage 3.75 BAŞLA:
    1. Emre Claude Design web UI aç → claude.ai/design
    2. Brief ver: "Fatih Bey Mücevher 3D viewer, mucevher-editorial-luxury preset baz"
    3. Combo + preset.yaml'ı yükle (text paste veya DOCX)
    4. Claude Design prototip üretir (3-5 iterasyon, 60-120 dk)
    5. Müşteri canlı review (URL share)
    6. Müşteri onay → Export → design-export-fatih-bey.zip
    7. Zip'i repo'ya koy → `/handoffs/fatih-bey-mucevher.zip`
    ↓
claude-design-liaison agent tetikle:
    $ claude code → "Handoff bundle merge: /handoffs/fatih-bey-mucevher.zip → preset.yaml"
    ↓
    - manifest.json validate ✓
    - design.json parse
    - Palette override: PL22 (bizim) ✓ uyumlu
    - Typography override: Fraunces (bizim TY27) ✓ uyumlu
    - Yeni atom: "Rotating Diamond Showcase" (bizim 47 atom'a yok)
      → design-director agent'a sor → "HR-Diamond-Rotating" olarak 48. atom eklenebilir
    - Yasaklı ID check: ✓ PL1 yok
    - Merged preset.yaml yaz
    - conflict-report.md: 0 reject, 1 new atom proposal
    ↓
Stage 3.8 catalog-query tetikle (güncellenmiş preset ile)
    ↓
Stage 4 scaffold — scaffold.js ile Next.js iskelet + Claude Design assets
```

[KAYNAK: FRONTEND-TECHSTACK.md:423-488 (Claude Design detay + MCP) + Mobilyaci/3d-demo/research/claude-design-anthropic-labs-2026.md (referans) + YOL-HARITASI.md:439-446 (Stage 3.85 entegrasyon eski adı)]

---

## 16 · 6 FAZLI UYGULAMA PLANI

### 16.1 Faz özet tablosu

| Faz | Saat | Ana deliverable | Paralel agent dispatch | Risk | Gate |
|:-:|----|-----------------|------------------------|------|------|
| 0 | 10-12 | Catalog skeleton (200+ YAML) | 5 paralel (atoms / sectors / styles / recipes / techstack) | Schema v0.1 olgunlaşmamış | Schema + 10 örnek onayı |
| 1 | 8 | catalog-query skill + validator | 2 paralel (skill + scripts) | YAML query yavaş | 3 test case onayı |
| 2 | 16 | 60 preset üretimi | 6 paralel (style × 10 sektör) | Agent kalitesi düşük | Gallery onayı |
| 3 | 16 | Next.js scaffolder + 50 component | 5 paralel (hero / motion / layout / data / 3D) | Tailwind v4 alpha bug | İlk test scaffold |
| 4 | 8 | WordPress scaffolder | 2 paralel (theme + Elementor export) | Elementor schema değişir | Test import |
| 5 | 8 | Trigger chain + pipeline | 3 paralel (hook + slash + pipeline) | Hook performance | E2E test |
| 6 | 8 | 3 test proje + doküman | 3 paralel test project | Real-world edge case | Lighthouse + kabul |

### 16.2 Faz detayları

#### Faz 0 — Konsolidasyon + Catalog Skeleton (10-12 saat)

**Deliverables (~200 YAML):**
- `catalog/schema.md` — field tanımları, validation
- `catalog/atoms/*.yaml` — 120+ (H1-10, N1-10, HR1-17, K1-13, P1-10, T1-8, C1-6, F1-8, M1-6, FT1-8, CH1-12, TY1-44, PL1-38, L1-11, MO1-12)
- `catalog/sectors/*.yaml` — 10
- `catalog/styles/*.yaml` — 10 (orijinal 6 + 4 yeni: warm-organic, data-dense-dashboard, editorial-print, industrial-workwear)
- `catalog/recipes/*.yaml` — 7 (+ claude-design-handoff + shopify-hydrogen)
- `catalog/techstack/*.yaml` — 800+ index (pointer only)
- `catalog/compatibility.yaml` — anti-cliché matrix

**Paralel agent dispatch:**
- Agent A: atoms/ (120 YAML) — DESIGN-PATHWAYS.md + SECTOR-RESEARCH.md TY26-44 + PL21-38 parse
- Agent B: sectors/ (10 YAML) — SECTOR-RESEARCH.md 10 sektör parse
- Agent C: styles/ (10 YAML) + recipes/ (7 YAML)
- Agent D: techstack/ (800+ YAML pointer) — FRONTEND-TECHSTACK.md + 3D-TECHSTACK.md parse
- Agent E: compatibility.yaml + schema.md + MATRIX.md

**Risk:** Schema v0.1 olgunlaşmamış — Faz 2'de tune gerekebilir
**Gate:** 10 örnek YAML Emre onayı → "bu yapı doğru mu?" + 1-2 schema iteration

---

#### Faz 1 — Query Skill + Anti-Cliché Validator (8 saat)

**Deliverables:**
- `~/.claude/skills/catalog-query/SKILL.md`
- `~/.claude/skills/catalog-query/scripts/query.js` (Node, FS YAML filter, SQLite fallback)
- `scripts/validate-combo.js` (build-time linter — yasaklı ID check)
- `catalog/MATRIX.md` (10 sektör × 10 stil görünür tablo)

**catalog-query input/output:**
```
Input: brief (text), sector, budget, features, constraints
Output:
  {
    presets: [
      { id: "kuafor-editorial-luxury", repeat_score: 2, atoms: [...], preview: "..." },
      { id: "kuafor-kinetic-agency", repeat_score: 3, atoms: [...], preview: "..." },
      { id: "kuafor-minimal-swiss", repeat_score: 2, atoms: [...], preview: "..." }
    ],
    rationale: { A: "...", B: "...", C: "..." },
    adversary_notes: "✓ PL1 yok, repeat skor 2/15 safe"
  }
```

**Paralel:**
- Agent A: SKILL.md + scripts/query.js
- Agent B: validate-combo.js + MATRIX.md + 3 test case (kuafor, mücevher, inşaat)

**Risk:** YAML query yavaş (200+ dosya) → SQLite index fallback hazır
**Gate:** 3 test case Emre onayı

---

#### Faz 2 — 60 Preset Üretimi (16 saat)

**Deliverables:**
- `catalog/presets/*.yaml` — 60 YAML
- `previews/[sector]-[style]/index.html` × 60 (gerçek Next.js 16 preview, HTML mockup DEĞİL)
- `previews/gallery.html` — 60 preset gallery (bir bakışta görünür)

**Paralel dispatch (6 agent × 10 preset):**
- Agent 1: brutalist stil × 10 sektör (aktif: insaat, eticaret, fotograf-kontrollü, restoran-kontrollü)
- Agent 2: editorial-luxury × 10 sektör (aktif: mucevher, kuafor, restoran, klinik, spa, fotograf, gayrimenkul, otel)
- Agent 3: kinetic-agency × 10 sektör
- Agent 4: immersive-3d × 10 sektör
- Agent 5: maximalist-atmospheric + minimal-swiss × 10 sektör (ikili agent)
- Agent 6: warm-organic + data-dense + editorial-print + industrial-workwear × 10 sektör

**Risk:** Agent kalitesi düşük üretir → önce 10 test preset, brief refine, sonra batch
**Gate:** Gallery onayı — Emre tek tek işaretle, kırmızılar revize

---

#### Faz 3 — Next.js 16 Scaffolder + 50 Component (16 saat)

**Deliverables:**
- `scaffold/nextjs-16-base/` — Next.js 16 + Tailwind v4 (fallback v3) + shadcn/ui iskelet
- `scaffold/nextjs-16-base/src/components/` — 50 React component (atom → component rewrite)
- `scaffold/nextjs-16-base/src/hooks/` — useLenis / useGSAP / useScrollTrigger / useMagneticHover
- `scaffold/nextjs-16-base/src/lib/wab-safe-animations.ts` — 6 MIT-safe wearebrand pattern
- `scaffold.js` — Node CLI orchestrator

**50 component dağılımı (Bölüm 11 atom'larından türer):**

| Grup | Component (10) |
|------|----------------|
| Hero | HeroBrochure.tsx, HeroInteractiveMap.tsx, HeroQAConversational.tsx, HeroPortholeDive.tsx, HeroKineticSerif.tsx, HeroImmersive3D.tsx |
| Motion | BlurReveal.tsx, MagneticButton.tsx, VariableFontOpsz.tsx, ScrambleText.tsx, ThemeScrollSwitch.tsx, CanvasTrail.tsx, SVGGrainOverlay.tsx, ClipPathReveal.tsx, TextPathBendMarquee.tsx |
| Layout | BentoAsymmetric.tsx, CenterColumnNarrow.tsx, FullBleedRails.tsx, StickySidebarFeed.tsx, MasonryColumns.tsx |
| Data | DenseTable.tsx, SpecSheet.tsx, TerminalLog.tsx, ReceiptStrip.tsx, Sparkline.tsx, BarometerGauge.tsx, ColumnChartGrow.tsx, TimelineVertical.tsx, TimelineMilestones.tsx |
| Interaction | CommandPalette.tsx (⌘K), BottomSheet.tsx, InlineExpand.tsx, WizardSteps.tsx, EmailThreaded.tsx |
| 3D | Immersive3DCanvas.tsx (R3F + drei), CrystalScene.tsx, ScrollCameraPath.tsx, ParticleSystem.tsx |
| Chrome | CornerBracketFrame.tsx, HazardStripe.tsx, ConcreteTexture.tsx, PlateHeader.tsx, SignatureBlock.tsx |

**Paralel dispatch (5 agent):**
- Agent 1: Hero × 6 component
- Agent 2: Motion × 9 component + wab-safe-animations.ts
- Agent 3: Layout + Interaction × 10 component
- Agent 4: Data × 9 component
- Agent 5: 3D × 4 component + Chrome × 5 component + hooks

**Responsive zorunlu:** Her component 3 breakpoint (375/768/1280), Tailwind v4 `@theme`
**Türkçe karakter test:** Her component snippet'inde Türkçe metin placeholder ("Örnek başlık: ışığın izi")

**Risk:** Tailwind v4 alpha bug → `scaffold.js` auto-detect v3 fallback
**Gate:** İlk test scaffold (mucevher-editorial-luxury) → `pnpm dev` → Emre browse

---

#### Faz 4 — WordPress Scaffolder (8 saat)

**Deliverables:**
- `scaffold/wordpress-elementor/` — Hello Elementor child theme
  - `functions.php` — GSAP + Lenis + Barba enqueue (sadece gerektiğinde)
  - `style.css` — child theme
  - `assets/wab-safe-animations.js` — MIT-safe rewrite
  - `assets/main.css` — preset CSS vars inject
- `scaffold/wordpress-elementor/templates/*.json` — Elementor JSON template (preset → JSON serialize)
- `scaffold-wp.js` — Node CLI

**Akış:**
```bash
node scaffold-wp.js kuafor-minimal-swiss --out ../wp-export/
# Çıktı:
# wp-content/themes/kuafor-minimal-swiss-child/
# + templates/home.json + templates/galeri.json (Elementor import edilecek)
# + README (nasıl yükleyeceği)
```

**Tier mapping:**
- Tier 1 (7.5-12K TL): WordPress + Elementor
- Tier 2+ (15K+): Next.js
- Karar catalog-query içinde otomatik (`budget` field'ı recipe seçer)

**Paralel:**
- Agent A: Hello Elementor child theme + functions.php + wab-safe-animations.js rewrite
- Agent B: Elementor JSON template schema + scaffold-wp.js CLI

**Risk:** Elementor Pro 3.35+ vs 4.x schema farkı → 3.35 LTS target, lock file
**Gate:** Test import → localhost WordPress'e yükle, görüntüle

---

#### Faz 5 — Trigger Chain + Pipeline Entegrasyonu (8 saat)

**Deliverables:**
- `~/.claude/hooks/project-pipeline.js` — master orchestrator (UserPromptSubmit)
- `~/.claude/commands/project-start.md` — `/project-start [brief]` slash komut
- `armut/SITE-GELISTIRME-PIPELINE.md` güncelle — Stage 3.75 + 3.8 eklendi
- `~/.claude/CLAUDE.md` güncelle — yeni skill + workflow referansı
- `.claude/projects/.../memory/feedback_catalog_pipeline.md` — memory entry

**Akış (`/project-start` sonrası):**
```
Stage 1 — Intake: meeting-analysis (toplantı varsa) / brief
    ↓
Stage 1.5 — Tech Detection
    ↓
Stage 3.7 — Design Council (14 agent, 5 tur)
    ↓
Stage 3.75 — Claude Design (Tier 3+ opsiyonel)
    ↓
Stage 3.8 — Catalog Query (3 preset)
    ↓
[EMRE ONAYLA]
    ↓
Stage 4 — Scaffold (scaffold.js veya scaffold-wp.js, budget'a göre)
    ↓
Stage 5 — frontend-design polish
    ↓
Stage 6 — SEO zinciri (seo-audit → schema-markup → site-architecture)
    ↓
Stage 7 — code-reviewer
    ↓
Stage 8 — launch-strategy
```

**Paralel:**
- Agent A: hook + slash komut
- Agent B: pipeline-js orchestrator
- Agent C: CLAUDE.md + SITE-GELISTIRME-PIPELINE.md + memory güncellemeleri

**Risk:** Hook performance (her prompt'ta tetiklenir) — Stage kontrolü cheap olmalı
**Gate:** End-to-end test (Fatih Bey test ve Kadıköy kuafor test) → her stage Emre onay

---

#### Faz 6 — Doğrulama + Dokümantasyon (8 saat)

**Deliverables (3 end-to-end test proje):**
1. `test-projects/test-kuafor-minimal-swiss/` — Next.js 16, zero-3D, fast build, Tier 2
2. `test-projects/test-eticaret-maximalist/` — Next.js + R3F + product configurator, Tier 3
3. `test-projects/test-restoran-editorial/` — WordPress + Elementor + Lenis + Barba, Tier 1

**Doküman:**
- `DOKUMAN/README.md` — Emre için kullanım rehberi (5 dk)
- `DOKUMAN/CATALOG-STRUCTURE.md` — YAML schema referansı
- `DOKUMAN/PIPELINE-GUIDE.md` — `/project-start` + örnekler
- `DOKUMAN/TROUBLESHOOT.md` — scaffold hataları, WP import sorunları
- Her test proje için Lighthouse raporu (Performance + A11y + Best Practices + SEO ≥ 90)

**Kabul kriterleri (tümü geçmeli):**
- ✓ `/project-start` → ≤ 30 dk scaffold hazır
- ✓ Preset gallery'deki seçim üretime taşınıyor
- ✓ Anti-cliché validator yasaklı ID combo'yu RED'liyor
- ✓ WordPress scaffold wp-admin'e import ediliyor
- ✓ Mobile Lighthouse ≥ 90 (3 test projenin hepsinde)
- ✓ Design Council combo ↔ catalog preset tutarlılığı %100

**Paralel:**
- Agent A: test-kuafor (Next.js Tier 2)
- Agent B: test-eticaret (Next.js + R3F Tier 3)
- Agent C: test-restoran (WP Tier 1)

**Risk:** Real-world edge case — Kadıköy kuafor gerçek brief deneyimi farklı olabilir
**Gate:** 3 test projenin raporu + Emre "kabul ediyorum"

### 16.3 Gantt Özet

```
Gün 1 ─── Faz 0 (catalog skeleton) + Faz 1 (query skill) ──────────
Gün 2 ─── Faz 2 (60 preset) başla ────────────────────────────────
Gün 3 ─── Faz 2 devam + Faz 3 (Next.js scaffolder) başla ─────────
Gün 4 ─── Faz 3 devam + Faz 4 (WordPress scaffolder) ─────────────
Gün 5 ─── Faz 5 (trigger chain) + Faz 6 (test proje) başla ───────
Gün 6 ─── Faz 6 devam + doküman ──────────────────────────────────
Gün 7 ─── Test proje düzeltmeler + final kabul gate ─────────────
Gün 8 ─── (Buffer — real-world bug + polish) ─────────────────────
```

[KAYNAK: YOL-HARITASI.md:253-491 (6 faz detay) + YOL-HARITASI.md:601-614 (saat tablosu) + SITE-GELISTIRME-PIPELINE.md:354-419 (Stage 6.5) + CLAUDE.md Otomatik Skill Pipeline tablosu]

---

## Part 2 sonu — Part 3'e geçiş notu

**Part 2'de kurulan bağlam:**
- 10 sektör psikoloji + anti-cliché + pathway ID + tier mapping
- 80 preset matrisi (49 ✓, 22 ⚠, 29 ✗) + 60 aktif hedef + forbidden/kontrollü sebep
- 47 atom kataloğu (kaynak dosya:satır + MIT-safe + snippet + uyum)
- 18 agent roster (14 mevcut + 4 yeni) + karar hiyerarşisi
- 33 skill × 15 stage eşleşme + auto-chain + GUARD kuralları
- 8 pipeline stage detay (Stage -1 → 8) + onay noktaları
- Claude Design Stage 3.75 (handoff bundle + claude-design-liaison + Tier 3+ + MCP stack + token ekonomisi)
- 6 fazlı uygulama (74-76 saat, paralel agent dispatch, gate'ler)

**Part 3 kapsamı (Bölüm 17-24):**
- Bölüm 17: Timeline — gün gün Gantt + deliverable
- Bölüm 18: Usage tahmini (~1.35M token Opus 4.7, Max plan kapasitesi)
- Bölüm 19: 7 approval gate (ne sorulacak + kabul + reddedilirse + bekleme)
- Bölüm 20: Verification strategy (her fazda gerçek test proje)
- Bölüm 21: Risk register (10 risk × olasılık × etki × hafifletme)
- Bölüm 22: Global CLAUDE.md güncelleme önerileri (8 madde)
- Bölüm 23: Rollback plan (git tag + worktree)
- Bölüm 24: Kabul kriterleri + FAQ + Ekler + **5 öneri (kapanış)**
# ULTRAPLAN — Part 3/3 (Bölüm 17-24)

**Önceki part'lar:**
- `ULTRAPLAN-PART1.md` — Bölüm 1-8 (temel + 5 tier + 10 stil)
- `ULTRAPLAN-PART2.md` — Bölüm 9-16 (sektör + preset + atom + agent + stage + Claude Design + 6 faz)

---

## 17 · TIMELINE — Gün Gün Gantt

### 17.1 Kritik yol 5-6 gün (full-time) + 2 gün buffer

```
GÜN 1 (10-12 saat) — CATALOG + QUERY
├─ 07:00-10:00  Faz 0 — schema.md + compatibility.yaml + MATRIX.md
├─ 10:00-14:00  Faz 0 — 5 paralel agent dispatch (atoms + sectors + styles + recipes + techstack)
├─ 14:00-15:00  Onay gate 1 — Emre 10 örnek YAML onay
└─ 15:00-19:00  Faz 1 — catalog-query skill + validate-combo.js + 3 test case (kuafor/mücevher/inşaat)

GÜN 2 (8-10 saat) — 60 PRESET
├─ 08:00-10:00  Faz 1 — onay gate 2 (3 test case)
├─ 10:00-18:00  Faz 2 — 6 paralel agent × 10 preset (brutalist/editorial-luxury/kinetic-agency/immersive-3d/maximalist+minimal-swiss/warm+data+print+industrial)
└─ 18:00-19:00  Preview gallery ilk draft

GÜN 3 (10 saat) — SCAFFOLDER (NEXT.JS)
├─ 08:00-10:00  Onay gate 3 — gallery 60 preset, Emre tek tek işaretle
├─ 10:00-18:00  Faz 3 — 5 paralel agent × component grup (hero/motion/layout+interaction/data/3D+chrome)
└─ 18:00-20:00  scaffold.js CLI orchestrator + ilk test (mucevher-editorial-luxury) → pnpm dev

GÜN 4 (8 saat) — WORDPRESS + TRIGGER CHAIN
├─ 08:00-09:00  Onay gate 4 — ilk Next.js test scaffold
├─ 09:00-13:00  Faz 4 — WP Elementor theme + scaffold-wp.js + test import
├─ 13:00-16:00  Faz 5 — hook + slash + pipeline JS
└─ 16:00-17:00  CLAUDE.md + SITE-GELISTIRME-PIPELINE.md + memory entry güncelle

GÜN 5 (10 saat) — 3 TEST PROJE + DOĞRULAMA
├─ 08:00-09:00  Onay gate 5 — end-to-end pipeline test
├─ 09:00-15:00  Faz 6 — 3 paralel test project (test-kuafor Tier 2 Next.js + test-eticaret Tier 3 R3F + test-restoran Tier 1 WP)
├─ 15:00-17:00  Mobile Lighthouse ölçüm + WCAG AA audit (axe-core)
└─ 17:00-19:00  Doküman (README + CATALOG-STRUCTURE + PIPELINE-GUIDE + TROUBLESHOOT)

GÜN 6 (6-8 saat) — FINAL CLEANUP + KABUL
├─ 08:00-12:00  Test proje edge case düzeltme
├─ 12:00-14:00  Onay gate 6 — Lighthouse ≥ 90 / WCAG AA / yasaklı ID 0 / Türkçe font pass
├─ 14:00-16:00  Onay gate 7 — final kabul + "sistem çalışıyor" deklarasyonu
└─ 16:00-18:00  Git tag v1.0 + rollback point + next step memo

GÜN 7-8 (buffer) — REAL-WORLD BUG
├─ Buffer 1: Kadıköy kuafor real brief ile test → edge case bulursan fix
└─ Buffer 2: Fatih Bey Premium 3D viewer gerçek veri ile test
```

### 17.2 Gün başı deliverable tablosu

| Gün | Deliverable | Token tahmini |
|:-:|-------------|---------------|
| 1 | Catalog skeleton (200 YAML) + catalog-query skill + validator | ~200K |
| 2 | 60 preset YAML + gallery.html ilk draft | ~250K |
| 3 | scaffold/nextjs-16-base/ + 50 component + scaffold.js | ~300K |
| 4 | scaffold/wordpress-elementor/ + trigger chain + CLAUDE.md update | ~150K |
| 5 | 3 test proje + Lighthouse raporlar + doküman | ~300K |
| 6 | Final kabul + git tag v1.0 | ~100K |
| 7-8 | Buffer — edge case | ~100-200K |

**Toplam:** ~1.3-1.4M token (~12 saat cumulative agent çalışma süresi, ama paralel dispatch sayesinde takvim süresi 5-6 gün)

[KAYNAK: YOL-HARITASI.md:601-614 (saat tablosu) + CLAUDE.md Aktif Projeler (Fatih Bey teslim 8 Mayıs → 6 gün + buffer hedefi uygun)]

---

## 18 · USAGE TAHMİNİ — Opus 4.7 + Max Plan

### 18.1 Faz başına token hesabı

| Faz | Agent call sayısı | Ortalama token/call | Toplam |
|:-:|:-:|:-:|:-:|
| 0 · Catalog skeleton | 5 (paralel) × 3 iterasyon = 15 | ~40K | 600K |
| 1 · Query skill | 4 (skill + script + validator + test) | ~45K | 180K |
| 2 · 60 preset | 6 (paralel) × 2 batch | ~50K | 600K |
| 3 · Next.js scaffolder | 5 (paralel) + 1 integration | ~50K | 300K |
| 4 · WP scaffolder | 4 (theme + Elementor + CLI + test) | ~40K | 160K |
| 5 · Trigger chain | 3 (hook + slash + pipeline) + 3 doc update | ~45K | 270K |
| 6 · Test proje | 3 (paralel test) + 1 final review | ~55K | 220K |
| **TOPLAM** | **~50 agent call** | **~47K avg** | **~2.3M** |

**Revize (daha gerçekçi):** Paralel agent dispatch tek call değil, main thread orchestrator + 5-6 paralel agent child. Child'lar ~35-45K token, orchestrator ~15-20K context assembly.

- Orchestrator: 50 call × 20K = 1.0M
- Child agent: 150 paralel call × 10K (context lean) = 1.5M
- **Revize toplam: ~2.5M token**

### 18.2 Max Plan Kapasitesi ($200/ay)

**Claude Max Plan ($200/ay) 5h window kapasitesi:**
- Opus 4.7 [1M context]: ~200-800 prompt / 5h (prompt boyutuna göre)
- Yıllık token fair-use: ~50-100M (usage-based limit)

**6 günlük full-time çalışma = ~30 saat = 6 × 5h window.**

| Metrik | Değer | Yeterli mi |
|--------|:-:|:-:|
| Günde 5h window | 200-800 prompt | Evet (günde 50-100 prompt yeterli) |
| Bir faz = ~50-100 prompt | 5-10 saat | Evet |
| Ay toplam 2.5M token | Max plan fair-use limit < 100M | Çok rahat |

**Sonuç:** Max plan yetiyor. Ultra çalışma günlerinde cache miss'leri önemli — prompt cache'i kullan (5 dk TTL), iterasyonlar arası gap'leri 270s altında tut.

### 18.3 Token tasarruf önerileri

1. **Paralel agent dispatch** — child'lar lean context, orchestrator master context
2. **Prompt cache** — 14 research dosyası ilk yüklemede cache'le (5 dk TTL), iterasyon hızlı
3. **Subagent usage** — Faz 2 preset üretiminde `general-purpose` agent child, main thread temiz
4. **Grep + Glob önce** — her agent Read yapmadan önce Grep ile ilgili satır bul
5. **Memory feedback** — tekrar hata yapma → aynı iterasyon tekrar çalıştırmama

### 18.4 Usage izleme

- Günlük `/usage` (veya settings > usage) → "% kullanım" + reset saati
- Max plan 5h window: prompt sayacı dolmadan önce prompt'ları küçült
- Gerekirse **Sonnet 4.6 'ya düş** (non-critical tasks: doküman yazımı, örnek preset fill-in)

[KAYNAK: CLAUDE.md workflow kuralları — Subagent Strategy, Plan First, Autonomous Bug Fixing + FRONTEND-TECHSTACK.md:423-488 (Claude Design token ekonomisi)]

---

## 19 · 7 APPROVAL GATE — Ne Sorulacak + Kabul + Red

| Gate | Ne zaman | Ne sorulacak | Kabul kriteri | Reddedilirse ne yapılacak | Bekleme süresi |
|:-:|----------|--------------|---------------|---------------------------|:-:|
| **1** | Faz 0 sonu | "Schema + 10 örnek YAML doğru mu? Field'lar eksik mi?" | Emre "evet" + değişiklik önerisi | Schema v0.2 iterate + 10 örnek revize + tekrar gate 1 | 1-2 saat |
| **2** | Faz 1 sonu | "catalog-query 3 test case (kuafor/mücevher/inşaat) → 3 preset döndürüyor, mantıklı mı?" | 3 case de çıktısı makul + yasaklı ID yok | Query logic refine + yeni test case ekle | 2-4 saat |
| **3** | Faz 2 sonu | "60 preset gallery'de, beğen/reddet işaretle" | Min 45/60 ✓, kalan 15 düzeltilebilir | Düşük puanlı preset'leri revize (agent'a brief feedback) | 4-8 saat |
| **4** | Faz 3 sonu | "İlk test scaffold (mucevher-editorial-luxury) çalışıyor, `pnpm dev` → browse et" | 375/768/1280 responsive + Lighthouse mobile ≥ 85 (final ≥ 90 Gate 6'da) + 0 critical error | Component revize (hangi component bug'lı tespit → fix) | 2-4 saat |
| **5** | Faz 5 sonu | "End-to-end: `/project-start "Kadıköy kuafor salon brief"` → 30 dk'da çalışır dev server mı?" | 30 dk süre içinde preset seç + scaffold + polish + dev server çalışır | Hangi stage tıkanıyor → debug → pipeline revize | 4-8 saat |
| **6** | Faz 6 sonu (ilk pass) | "3 test proje Lighthouse mobile ≥ 90 / WCAG AA / CLS < 0.05?" | Hepsinde eşik geçildi | Hangi test projede hangi metrik fail → ilgili component/preset revize → Lighthouse tekrar | 8-16 saat |
| **7** | Faz 6 final kabul | "Sistem çalışıyor mu? Kadıköy/Fatih Bey gerçek projede kullanıma hazır mı?" | "Evet kullanıyorum" + git tag v1.0 + rollback point | Hangi gap var → Faz 7+ scope (gelecek) | 1-2 saat |

### 19.1 Gate başarısızlık yönetimi

- **Max 2 retry per gate.** 3. ret → faz tamamen revize (brief değişti demek)
- **Her gate başarısızlığı = memory entry** (feedback_[konu].md) — iki kez aynı hata yapılmaz
- **Onay aktif beklenir** — Emre cevap vermezse 24 saat sonra hatırlatma, 48 saat sonra "default devam et" değil, **dur** — `autonomous` değil, `interactive`

### 19.2 Gate iletişim formatı

```markdown
## GATE [N] — [konu]

### Özet
[1 satır — ne istediğimizi soruyor]

### Kanıt
[dosya yolu + screenshot link + Lighthouse raporu]

### Kabul edersen
- [ ] Faz [N+1] başlar
- [ ] Git tag v0.[N]

### Reddedersen
- Neyi değiştirmeliyim?
- Süre tahmini: [X saat]

Bekliyorum.
```

[KAYNAK: YOL-HARITASI.md her fazın "Onay gate" satırı + CLAUDE.md Workflow Kuralları (Plan First, Verification Before Done, Demand Elegance)]

---

## 20 · VERIFICATION STRATEGY

### 20.1 Her fazda 1 gerçek test proje

| Faz | Test proje | Neden bu | Başarı eşiği |
|:-:|------------|----------|--------------|
| 0 | `test-insaat-crm-catalog` | insaat-crm combo.md ↔ catalog/presets mapping — mevcut gerçek proje | Spec-code uyumu ≥ %95 (şu an %67) |
| 1 | `test-mucevher-query` | Mücevher sektörü yasaklı ID (PL1) reflex — 5+ kez kullanıldığı için riskli | 3 preset (A/B/C) hepsi PL1-free + repeat ≤ 3 |
| 2 | `test-kuafor-preset-gallery` | Kuafor 3 stil önerisi (editorial-luxury / kinetic / minimal-swiss) — KADIKOY soğuk satış müsait | 3 preset gallery'de görünür + adversary onay |
| 3 | `test-restoran-wordpress` | Restoran Tier 1 — WP scaffolder (budget müşteri) | WP import success + GSAP animations çalışıyor |
| 4 | `test-klinik-nextjs` | Klinik Tier 2 — Next.js + Supabase (Tier 2 core path) | Next.js dev server + Supabase auth + randevu form çalışıyor |
| 5 | `test-eticaret-validator` | E-ticaret Tier 3 — 3D viewer + validator (yasaklı ID build-time check) | 0 yasaklı ID + 3D bundle ≤ 2 MB + R3F 60fps mobile |
| 6 | 3 test projeyi bir arada doğrula | End-to-end | Hepsi mobile Lighthouse ≥ 90 + WCAG AA + CLS < 0.05 |

### 20.2 Verification eşikleri

| Metrik | Eşik | Ölçüm aracı | Hangi faz |
|--------|:-:|-------------|:-:|
| Mobile Lighthouse Performance | ≥ 90 | `lighthouse --preset=desktop` + `lighthouse --form-factor=mobile` | Faz 3, 5, 6 |
| Mobile Lighthouse A11y | ≥ 95 | Lighthouse | Faz 5, 6 |
| WCAG AA | axe-core 0 critical | `@axe-core/playwright` | Faz 5, 6 |
| CLS (Core Web Vitals) | < 0.05 | Lighthouse + Chrome DevTools | Faz 5, 6 |
| LCP | < 2.5s | Lighthouse | Faz 5, 6 |
| INP | < 200ms | Chrome UX Report | Faz 6 |
| Bundle size (JS) | < 300KB gzipped | `@next/bundle-analyzer` | Faz 3, 6 |
| R3F 60fps mobile | Stats.js Three.js monitor | DevTools | Faz 6 (Tier 3 test) |
| 3D bundle | < 2 MB (Draco + Meshopt + KTX2) | `gltf-transform inspect` | Faz 6 |
| Türkçe karakter render | Fraunces + IBM Plex + JetBrains Mono ı/İ/ğ/ş/ç/ö/ü pass | Playwright visual diff | Faz 3, 5 |
| Yasaklı ID ihlal | 0 | `scripts/validate-combo.js` | Faz 1-6 (build-time) |

### 20.3 Başarısız verification → faz tekrarlanır

**Örnek:** Faz 3 test (mucevher-editorial-luxury) mobile Lighthouse Performance **84** (eşik 90) çıktı.
- Kök sebep: Three.js Canvas lazy-load yok, initial bundle 450KB
- Fix: `<Suspense>` + dynamic import + `loading={Skeleton}`
- Tekrar ölç: **92** → ✓
- Memory feedback entry: "R3F Canvas her zaman dynamic import + Suspense fallback"

[KAYNAK: YOL-HARITASI.md:483-490 (kabul kriterleri) + FRONTEND-TECHSTACK.md:236-242 (Vitest + Playwright + MSW) + CLAUDE.md Verification Before Done kuralı]

---

## 21 · RISK REGISTER — 10 Risk

| # | Risk | Olasılık (1-5) | Etki (1-5) | Skor | Hafifletme | Tetik sinyali |
|:-:|------|:-:|:-:|:-:|------------|---------------|
| R1 | YAML schema v0.1 yanlış modellendi — preset üretimi tıkanır | 3 | 4 | 12 | Faz 0'da 10 örnek YAML Emre onayı + Faz 2'de tune | Preset YAML validator fail > %20 |
| R2 | Next.js 16 breaking change (alpha → rc veya minor) | 2 | 4 | 8 | Lock version `next@16.x.x` + CI build test + v15 fallback hazır | `pnpm i` sonrası build fail |
| R3 | WordPress Elementor Pro 3.35 → 4.x schema değişir | 3 | 3 | 9 | 3.35 LTS target + JSON template versioning | Elementor import failed |
| R4 | Max plan token limit aşımı (2.5M hedef, 5M üst) | 2 | 5 | 10 | Subagent paralel dispatch + prompt cache + Sonnet 4.6 fallback non-critical | % 80 usage uyarısı |
| R5 | Mobile responsive breakpoint eksikliği (14 template'te 0/14) devam eder | 4 | 5 | 20 | Scaffold base'de zorunlu 3 breakpoint + Playwright visual regression her component | Component mobile'da kırılıyor |
| R6 | Türkçe karakter font render hatası (özellikle Fraunces opsz extreme) | 3 | 3 | 9 | Her TY combo için Playwright visual diff + Google Fonts tr subset query param | Font rendering ı→ı görünüyor ama ı olmuyor |
| R7 | Yasaklı ID build-time enforcement zayıf (Claude kullanmayı "unutuyor") | 4 | 4 | 16 | `scripts/validate-combo.js` + pre-commit hook + CI check + memory entry | Yeni combo.yaml'da PL1 bulundu |
| R8 | Claude Design MCP kurulum hatası (Tier 3+ visual exploration fail) | 2 | 3 | 6 | MCP server kurulum rehberi doküman + fallback "Claude Design'sız manual" | `claude mcp add` error |
| R9 | Trigger chain idempotent değil (aynı `/project-start` iki kez → yan etki) | 3 | 3 | 9 | Stage tracking (hangi stage tamamlandı) + resume capability | Stage 4 tekrar çağrılınca scaffold overwrite |
| R10 | Rollback sırasında uncommitted change kayıp | 3 | 5 | 15 | Her faz sonu zorunlu `git commit` + `git tag v0.[faz]` + worktree stratejisi | `git status` uncommitted + rollback gerekli |

### 21.1 Skor yorumlama

| Skor | Yorum | Aksiyon |
|:-:|------|---------|
| 1-5 | Düşük | İzle, spesifik plan gerekmez |
| 6-10 | Orta | Hafifletme planı aktif, haftalık review |
| 11-15 | Yüksek | Faz başı kontrol + proaktif fix |
| 16+ | Kritik | İlk öncelik, başlamadan önce hafifletme |

**Kritik riskler (16+):** R5 (mobile responsive) ve R7 (yasaklı ID enforce).
**Çözüm:** Faz 3 başlangıcında mobile breakpoint test suite + Faz 1'de validate-combo.js zorunlu pre-commit hook.

### 21.2 Risk tetik monitörü (Stage entegre)

```yaml
risk_monitors:
  - risk_id: R5
    stage: 3, 5, 6
    check: "Playwright mobile viewport test → all components pass"
    on_fail: "Component revize + mobile-first refactor"

  - risk_id: R7
    stage: 1, 3, 4, 6 (build-time)
    check: "validate-combo.js → 0 yasaklı ID"
    on_fail: "BUILD BLOCK — preset.yaml revize"

  - risk_id: R10
    stage: her faz sonu
    check: "git status → clean + tag var"
    on_fail: "Commit + tag + worktree cleanup"
```

[KAYNAK: YOL-HARITASI.md:589-597 (7 risk matrisi) + CLAUDE.md Güvenlik Kuralları + COUNCIL-KURULUM-RAPORU.md:49-51 (yasaklı ID)]

---

## 22 · GLOBAL CLAUDE.md GÜNCELLEME ÖNERİLERİ

### 22.1 8 madde güncelleme listesi

| # | Güncelleme | Lokasyon (CLAUDE.md içi) | Ne ekle/değiştir |
|:-:|------------|--------------------------|-------------------|
| 1 | **Agent roster 14 → 18** | "Design Council Sistemi (ZORUNLU)" → "Sistem Bileşenleri" | 14 agent + 4 yeni (seo-expert, accessibility-expert, performance-expert, claude-design-liaison) = 18 agent |
| 2 | **Stil 6 → 10** | "Design Council Sistemi" → "Katalog" | `armut/DESIGN-PATHWAYS.md` güncel: 10 stil (brutalist, editorial-luxury, kinetic-agency, immersive-3d, maximalist-atmospheric, minimal-swiss, warm-organic, data-dense-dashboard, editorial-print, industrial-workwear) |
| 3 | **5-tier fiyat eklendi** | "Aktif Projeler" tablo üstü | Tier 0 (5-7K) + Tier 1 (7.5-15K) + Tier 2 (15-25K) + Tier 3 (25-80K) + Tier 4 (80K+) referansı |
| 4 | **Stage 3.75 + 3.8 Pipeline'a entegre** | "Master Pipeline (Ilan → Site Teslim)" akış diyagramı | Stage 3.7 Council sonrası → Stage 3.75 Claude Design (opsiyonel Tier 3+) → Stage 3.8 Catalog-query → Stage 4 scaffold |
| 5 | **`catalog-query` skill kayıt** | "Skill Kullanim Rehberi (32 skill)" → "33 skill" | Yeni skill: `catalog-query` trigger: "site yap", "preset seç", sektör adı |
| 6 | **Preview app path** | "Proje Klasorleri" tablosu | `design-claude/previews/` → 60 preset gallery + her preset canlı Next.js 16 route |
| 7 | **ROUTING.yaml referansı** | "Design Council Sistemi" → "Referanslar" | `catalog/routing.yaml` (Stage 1.5 → 3.8 otomatik karar kuralları) |
| 8 | **Memory entry yeni** | "Self-Improvement Loop" → mevcut feedback dosyaları | `feedback_catalog_pipeline_mandatory.md` (Design Council sonrası catalog-query zorunlu, boş scaffold yasak) |

### 22.2 Önerilen memory entry içeriği

`~/.claude/projects/.../memory/feedback_catalog_pipeline_mandatory.md`:

```markdown
---
name: catalog_pipeline_mandatory
description: Her tasarım işinde design-council sonrası catalog-query zorunlu — boş Next.js'ten başlama, scaffold kullan
type: feedback
---

design-council combo.md ürettikten sonra ASLA boş `npx create-next-app` ile başlama.

**Why:** Manuel iskelet 3-5 saat. Scaffold 5 dakika, aynı çıktı. Audit kanıtı: insaat-crm combo.md spec-code uyumu %67 — manuel yazarken drift oluyor.

**How to apply:**
1. Stage 3.7 Council sonrası → Stage 3.75 Claude Design (Tier 3+ opsiyonel)
2. Stage 3.8 catalog-query skill → preset seç
3. Stage 4 scaffold: budget < 12K → scaffold-wp.js (WordPress), budget ≥ 15K → scaffold.js (Next.js)
4. Build-time: validate-combo.js → yasaklı ID (TY1/2/4/8, PL1, K1, HR2, H8, HR7, P1, T6, CH1, CH2) 0 ihlal
5. Stage 5 frontend-design polish, mobile Lighthouse ≥ 90 zorunlu
```

### 22.3 Yasaklı ID listesi eklenmeli (CLAUDE.md'ye)

Mevcut CLAUDE.md'de "Yasaklı liste" var (9 ID). Güncelle → 13 ID:

```
TY1 (Inter-only), TY2 (Playfair+Inter), TY4 (Instrument+SpaceGrotesk), TY8 (DM+Inter),
PL1 (dark+gold), K1 (bento glass), HR2 (split hero), H8 (hero-attached),
HR7 (dashboard panel-as-hero), P1 (kanban klasik), T6 (card grid),
CH1 (Chart.js smooth default), CH2 (Recharts tremor-style SaaS default)
```

### 22.4 Güncelleme yöntemi

1. `~/.claude/CLAUDE.md` aç
2. "Design Council Sistemi (ZORUNLU)" bölümünü bul
3. "Yasaklı ID listesi" satırını güncelle (13 ID)
4. "Skill Kullanım Rehberi" sayısını 32 → 33
5. "Master Pipeline" akış diyagramına Stage 3.75 + 3.8 ekle
6. Bottom'a yeni memory entry pointer ekle

**Backup zorunlu:** Her CLAUDE.md değişikliği öncesi `cp ~/.claude/CLAUDE.md ~/.claude/CLAUDE.md.bak-$(date +%F)`.

[KAYNAK: CLAUDE.md Design Council Sistemi bölümü (mevcut) + CLAUDE.md Skill Kullanim Rehberi + CLAUDE.md Master Pipeline akışı + COUNCIL-KURULUM-RAPORU.md:49-51 (mevcut yasaklı ID)]

---

## 23 · ROLLBACK PLAN

### 23.1 Her faz sonu commit + tag stratejisi

```bash
# Her faz sonunda
git add -A
git commit -m "Faz [N]: [özet]"
git tag v0.[N]

# Örnek faz tag'leri
v0.1  → Faz 0 sonu (catalog skeleton)
v0.2  → Faz 1 sonu (query skill)
v0.3  → Faz 2 sonu (60 preset)
v0.4  → Faz 3 sonu (Next.js scaffolder)
v0.5  → Faz 4 sonu (WP scaffolder)
v0.6  → Faz 5 sonu (trigger chain)
v1.0  → Faz 6 sonu (final kabul)
```

### 23.2 Rollback senaryoları

| Senaryo | Tetik | Aksiyon | Komut |
|---------|-------|---------|-------|
| Faz N başarısız, tekrar gerek | Gate [N] fail × 2 | Faz N öncesine dön | `git reset --hard v0.[N-1]` (soft önce) |
| Bir faz içinde bug, kısmi revert | Component/YAML bozuldu | Sadece o dosyayı geri al | `git checkout v0.[N] -- path/to/file` |
| Test proje başarısız | Lighthouse < 80 | Component revize (faz devam) | Edit + test tekrar (faz tamamen revert değil) |
| Acil stop (Emre müdahale) | Müşteri değişiklik talep | Mevcut worktree yapısını koru, yeni worktree aç | `git worktree add ../design-claude-urgent v0.[N]` |

### 23.3 Worktree stratejisi (paralel faz geliştirme)

```bash
# Faz 3 ve Faz 4 paralel ilerlemek istersen
git worktree add ../design-claude-faz3 -b faz3 v0.2
git worktree add ../design-claude-faz4 -b faz4 v0.2

# Her worktree kendi dev server'ı
cd ../design-claude-faz3 && pnpm dev  # Next.js scaffolder
cd ../design-claude-faz4 && pnpm dev  # WP dev (farklı port)

# Merge zamanı
cd /main/design-claude
git merge faz3
git merge faz4  # conflict resolution
git tag v0.5
```

### 23.4 Commit mesaj convention (zorunlu)

```
Faz [N]: [kısa açıklama]

[Detay — ne değişti, neden]

Deliverable:
- [kısa liste]

Verification:
- [test sonucu]

Closes: gate-[N]
```

**Örnek:**
```
Faz 2: 60 preset üretimi + gallery

- 6 paralel agent × 10 preset batch dispatch
- 49 ✓ valid + 11 ⚠ kontrollü (refined)
- Gallery.html canlı Next.js 16 routes
- Adversary validation passed

Deliverable:
- catalog/presets/*.yaml (60)
- previews/[sector]-[style]/ (60)
- previews/gallery.html

Verification:
- validate-combo.js: 0 yasaklı ID
- Preview 5/60 spot check mobile Lighthouse ≥ 85

Closes: gate-3
```

### 23.5 Rollback sonrası memory güncelleme

Eğer Faz N rollback olduysa:
```markdown
# memory/feedback_faz[N]_lessons.md
## Rollback sebebi
[ne başarısız oldu]

## Tekrar başlarken
[ne farklı yap]

## Kaçınılması gereken
[ne yapma]

Durum: aktif
```

[KAYNAK: CLAUDE.md Workflow Kuralları — Plan First, Self-Improvement Loop + git workflow genel standart]

---

## 24 · KABUL KRİTERLERİ + FAQ + EKLER + 5 ÖNERİ

### 24.1 Sistem "Çalışıyor" Sayılması İçin Minimum

Bu ULTRAPLAN'ın başarı koşulu 6 noktada:

| # | Kriter | Ölçüm | Eşik |
|:-:|--------|-------|:-:|
| 1 | **Armut ilanı → 30 dk'da çalışır dev server** | Stopwatch (gerçek test: Kadıköy kuafor veya Fatih Bey Premium brief) | ≤ 30 dk |
| 2 | **Mobile Lighthouse Performance** | `lighthouse --form-factor=mobile` | ≥ 90 |
| 3 | **WCAG AA compliance** | axe-core 0 critical + manuel kontrast check | 0 critical issue |
| 4 | **Yasaklı ID ihlal** | `scripts/validate-combo.js` build-time | 0 ihlal |
| 5 | **Türkçe karakter font test** | Fraunces + IBM Plex + JetBrains Mono (ı, İ, ğ, ş, ç, ö, ü) render | Visual diff pass |
| 6 | **3 test projesi 6 fazı geçti** | Faz 6 Lighthouse raporları | 3/3 pass |

### 24.2 YAML Schema Örnekleri (Ek A)

**catalog.yaml ana giriş:**
```yaml
---
version: 1.0
date: 2026-04-19
---
atoms_count: 120
sectors_count: 10
styles_count: 10
presets_count: 60  # aktif
recipes_count: 7
techstack_count: 800

forbidden_ids:
  typography: [TY1, TY2, TY4, TY8]
  palette: [PL1]
  kpi: [K1]
  hero: [HR2, HR7]
  header: [H8]
  pipeline: [P1]
  table: [T6]
  chart: [CH1, CH2]
```

**preset.yaml (kuafor örneği):**
```yaml
---
id: kuafor-editorial-luxury
name: Kuaför × Editorial Luxury
sector: kuafor
style: editorial-luxury
tier: [1, 2]
status: valid
---
palette: PL24  # Salt + Peach
palette_alt: PL25  # Slate + Olive
typography: TY29  # Schibsted Grotesk
typography_alt: TY30  # Recoleta
atoms:
  header: H2  # Masthead centered
  nav: N2  # Horizontal tabs underline
  hero: HR3  # Full-bleed video
  kpi: K2  # Band + rules
  layout: L4+L9  # Full-bleed rails + card deck
  footer: FT5  # Contact card
motion:
  primary: MO1  # GSAP ScrollTrigger
  secondary: MO6  # SplitText stagger
forbidden_atoms: [PL1, TY1, HR2]
scaffold_recipe_default: wordpress-elementor-motion  # Tier 1
scaffold_recipe_mid: next-premium  # Tier 2
preview_url: /preview/kuafor-editorial-luxury
reference_impl:
  - templates/03-kuafor/index.html
repeat_score: 2
adversary_approved: true
```

**agent.yaml (claude-design-liaison örneği):**
```yaml
---
id: claude-design-liaison
name: Claude Design Liaison
type: specialist
tier_required: 3  # Sadece Tier 3+
---
responsibilities:
  - handoff_bundle_parse
  - preset_merge
  - conflict_detection
input_schema:
  - zip_path: string (required)
  - preset_path: string (required)
output_schema:
  - merged_preset: string
  - conflict_report: markdown
decision_criteria:
  - claude_design_atom_match: "47 atom'a eşleşiyor mu"
  - forbidden_check: "yasaklı ID var mı"
  - tier_consistency: "preset tier × claude-design tier uyumlu mu"
research_refs:
  - FRONTEND-TECHSTACK.md:423-488
  - Mobilyaci/3d-demo/research/claude-design-anthropic-labs-2026.md
```

### 24.3 `/project-start` Komut Referansı (Ek B)

**Sözdizimi:**
```
/project-start "[kısa brief]" [--sector=X] [--budget=Y] [--features=A,B,C] [--tier=N]
```

**Örnekler:**

```bash
# 1. Brief sadece (Claude tech detection yapacak)
/project-start "Kadıköy kuafor salon, modern ama ürkek değil, 8K TL"

# 2. Eksplisit parametrelerle
/project-start "Fatih Bey Premium 3D viewer mücevher" --sector=mucevher --budget=35000 --features=3d-viewer,e-ticaret --tier=3

# 3. Toplantı transkripti referansla
/project-start --meeting="./toplanti-2026-04-19.md"
```

**Akış:**
```
1. Brief parse (Stage -1)
2. Tech detection (Stage 1.5)
3. Council çağır (Stage 3.7)
4. [Claude Design Stage 3.75 — Tier 3+]
5. Catalog-query 3 preset (Stage 3.8)
6. [EMRE ONAY A/B/C]
7. Scaffold (Stage 4)
8. Polish → SEO → Review → Launch
```

### 24.4 Troubleshoot Listesi (Ek C — 10 yaygın hata)

| # | Hata | Sebep | Çözüm |
|:-:|------|-------|-------|
| 1 | `scaffold.js` → "Tailwind v4 alpha bug" | Tailwind v4 preview release issue | `--fallback-v3` flag kullan |
| 2 | WP Elementor JSON import fail | Elementor Pro 3.35 vs 4.x schema | Lock 3.35 (`functions.php` version check) |
| 3 | `catalog-query` → "No preset found" | Sector YAML eksik veya schema invalid | `catalog/schema.md` kontrol + `validate-catalog.js` çalıştır |
| 4 | Mobile Lighthouse < 90 | R3F Canvas dynamic import yok | `<Suspense><LazyCanvas /></Suspense>` + `loading={Skeleton}` |
| 5 | `validate-combo.js` → yasaklı ID found | Agent yanlış öneri | Brief güncelle + Council tur 4 adversary tekrar |
| 6 | Türkçe karakter "ı" düşük kalite | Variable font opsz extreme + weight kombinasyonu | Farklı weight + opsz pair dene, `font-variation-settings` debug |
| 7 | Claude Design MCP `add` fail | Port 3845 çakışma | `lsof -i :3845` kontrol + farklı port |
| 8 | `/project-start` → "permission denied" | Hook script executable değil | `chmod +x ~/.claude/hooks/project-pipeline.js` |
| 9 | Preset gallery boş | Catalog YAML parse hatası | `catalog/schema.md` ile sync kontrol + `js-yaml` parse test |
| 10 | Git rollback sonrası dev server çalışmıyor | `node_modules/` stale | `rm -rf node_modules && pnpm install` |

### 24.5 Kaynaklar (Ek D)

| Doküman | Konum | Satır |
|---------|-------|:-:|
| YOL-HARITASI.md | design-claude/ | 810 |
| INDEX.md | design-claude/ | 149 |
| COUNCIL-KURULUM-RAPORU.md | design-claude/ | 168 |
| SCRAPED-STACKS-2026.md | design-claude/templates/ | 470 |
| 2026-ADVANCED-TECHNIQUES.md | design-claude/templates/ | 388 |
| SECTOR-RESEARCH.md | design-claude/templates/ | 220 |
| REFERENCE-DESIGNERS.md | design-claude/templates/ | 111 |
| TECH-DETECTION-METHODOLOGY.md | design-claude/templates/ | 292 |
| 14-ultra/index.html | design-claude/templates/ | 660 |
| combo.md (insaat-crm) | design-claude/insaat-crm/ | 130 |
| DESIGN-PATHWAYS.md | design-claude/mevcut pipeline ve techstack/ | 381 |
| FRONTEND-TECHSTACK.md | design-claude/mevcut pipeline ve techstack/ | 526 |
| SITE-GELISTIRME-PIPELINE.md | design-claude/mevcut pipeline ve techstack/ | 594 |
| TECHSTACK-LOOKUP.md | design-claude/mevcut pipeline ve techstack/ | 105 |

### 24.6 Versiyon Lock (Ek E)

```yaml
frontend:
  next: "16.0.0"
  react: "19.0.0"
  typescript: "5.9"
  tailwind: "4.0.0-alpha"  # fallback "3.4.0"

motion:
  gsap: "3.13.0"
  lenis: "1.3.4"
  framer-motion: "12.0.0"
  barba: "2.10.3"

3d:
  three: "0.183.0"  # r183
  "@react-three/fiber": "9.0.0"
  "@react-three/drei": "10.0.0"
  "@react-three/postprocessing": "3.0.0"
  "@react-three/rapier": "2.0.0"

data:
  "@supabase/supabase-js": "latest"
  "drizzle-orm": "latest"
  "zustand": "5.0.0"
  "@tanstack/react-query": "5.0.0"
  "react-hook-form": "7.0.0"
  "zod": "latest"

wordpress:
  elementor-pro: "3.35.7"  # LOCK — 4.x breaking change
  hello-elementor: "latest"

package-manager: "pnpm@9"
node: "22 LTS"
```

### 24.7 Terim Sözlüğü (Ek F)

| Terim | Tanım |
|-------|-------|
| **Atom** | En küçük UI yapıtaşı (örn: HR11 Brochure Cover Hero, K2 Band + Rules) |
| **Preset** | Sektör × Stil kombinasyonu (örn: mucevher-editorial-luxury) — preset.yaml |
| **Recipe** | Stack tarifi (örn: next-premium, wordpress-elementor-motion) — recipe.yaml |
| **Combo** | Bir projeye özel atom seçimleri (örn: H9 + N5 + HR14 + ...) — combo.md |
| **Pathway** | DESIGN-PATHWAYS.md'deki 120+ UI pattern (kategori × pattern) |
| **Council** | 14 uzman agent + 2 meta agent + 3 tur sentez + adversary + Emre onayı süreci |
| **Repeat skor** | Projenin mevcut 13 proje matrisi ile örtüşme (0-15, max 7 güvenli) |
| **Yasaklı ID** | 5+ kez kullanıldığı için yeni projede kullanılamayan pattern |
| **Tier** | Bütçe kademesi (0: 5-7K, 1: 7.5-15K, 2: 15-25K, 3: 25-80K, 4: 80K+) |
| **Handoff bundle** | Claude Design web UI'den export edilen ZIP (design.json + tokens + assets + components) |
| **Stage** | Pipeline aşaması (-1, 0, 1, 1.5, 2, 3, 3.5, 3.7, 3.75, 3.8, 4, 5, 6, 7, 8) |
| **GUARD** | Önceki skill başarılı olmadan tetikleme yasağı (örn: code-reviewer pass olmadan launch-strategy yok) |

### 24.8 FAQ (En Sık 8 Soru)

**Q1: 6 gün sonra sistem "tam hazır" mı yoksa daha çok iterasyon gerekir mi?**
**A:** Faz 6 sonu v1.0 = minimum viable. Gerçek kullanımda (Kadıköy kuafor + Fatih Bey) edge case çıkacak → v1.1, v1.2 küçük iterasyon. 2-3 hafta sonra "stabil" diyoruz.

**Q2: Mevcut 14 agent'ı 18'e çıkarmak ne kadar sürer?**
**A:** 4 yeni agent × ~100 satır SKILL.md + decision criteria = ~4 saat (Faz 1 içinde). Agent markdown pattern belli, hızlı yazılır.

**Q3: WordPress scaffolder Faz 4'te mi, yoksa Tier 1 müşteri gelene kadar erteleyebilir miyiz?**
**A:** Faz 4'te yapılmalı. Faz 5 trigger chain'de `/project-start` budget < 12K kontrolü var, WP eksikse chain kırık. Erteleme = teknik borç.

**Q4: Claude Design Stage 3.75 her Tier 3+ projede zorunlu mu?**
**A:** Opsiyonel. Tier 3-4'te Emre müşteriyle konuşarak "visual exploration istiyor musunuz?" diye seçer. %30-40 müşteri evet der. Token-intensive (~55K/session).

**Q5: Mevcut Fatih Bey projesi bu yeni sistemle mi yapılacak?**
**A:** Hayır — Fatih Bey %50 tamamlanmış (8.750 TL ödenmiş, 8 Mayıs teslim). Mevcut kodla devam, **yeni sistem 8 Mayıs sonrası projelerde**. Fatih Bey bitince retrospektif: "yeni sistemle olsaydı hangi aşamalar X saat kısalırdı" raporla.

**Q6: KADIKOY 10 site portföyü otomatik mi satışa sunulacak?**
**A:** Hayır — KADIKOY soğuk satış Tier 0 (5-7K template swap). Yeni sistem Tier 1+'dan başlar. KADIKOY portföyü mevcut haliyle devam, ayrı mekanizma.

**Q7: `/project-start` komutunu şu anki session'da test edebilir miyiz?**
**A:** Hayır — henüz yok. Faz 5 sonunda (Gün 4) hazır olacak. Faz 5 başlamadan önce mevcut manual akış (design-council slash + elle scaffold) devam.

**Q8: Sistemin "sahibi" ben mi yoksa Emre + Claude ortak mı?**
**A:** Emre sahip, Claude asistan. Karar + preset seçim + rollback + müşteri iletişimi Emre. Claude: scaffold + polish + SEO + review + launch execution. Emre onaysız stage atlama yok.

---

## 24.9 · BİR SONRAKI ADIM İÇİN 5 ÖNERİ

Bu ULTRAPLAN'ı okuduktan sonra Emre'nin 5 concrete aksiyonu:

### Öneri 1: Faz 0'a başla — catalog schema draft

**Ne:** `catalog/schema.md` + 10 örnek YAML (2 atom + 2 sector + 2 style + 2 preset + 1 recipe + 1 agent) yaz.
**Nasıl:** Paralel 1 agent dispatch et — brief: "YOL-HARITASI.md:156-249 YAML örneklerini temel al, 10 farklı kategoriden örnek çıkar, schema field tanımlarını netleştir".
**Süre:** 3-4 saat.
**Onay gate:** 10 örneği incele → "schema doğru mu?" → Faz 0 kalan 190 YAML'a green light.

### Öneri 2: Fatih Bey için retrospektif ölçüm hazırla

**Ne:** Mevcut Fatih Bey projesinde (8 Mayıs teslim) Lighthouse + WCAG ölçümü yap + "yeni sistemle olsaydı hangi aşamada X saat tasarruf olurdu" baseline oluştur.
**Nasıl:** `code-reviewer` + `seo-audit` çalıştır → mevcut repo'nun eksikleri liste → yeni ULTRAPLAN Tier 2 preset ile karşılaştır.
**Süre:** 2 saat.
**Değer:** ULTRAPLAN ROI kanıtı — "3-5 saat iskelet tasarrufu" rakama bağlanır.

### Öneri 3: Claude Design'ı şu an kullanıma aç (Tier 3+ için)

**Ne:** `claude.ai/design` pro/max plan ile etkinleştir + MCP servers kur (playwright + chrome-devtools + context7 + figma-dev-mode).
**Nasıl:**
```bash
claude mcp add playwright -s user -- npx @playwright/mcp@latest
claude mcp add chrome-devtools -s user -- npx @anthropic-ai/chrome-devtools-mcp@latest
claude mcp add context7 -s user -- npx -y @upstash/context7-mcp@latest
```
**Süre:** 30 dk.
**Değer:** Faz 5 Stage 3.75 hazır olduğunda Claude Design zaten kurulu, bir adım geri düşmez.

### Öneri 4: KADIKOY 10 site portföyünü Tier 0 scaffold'a hazırla

**Ne:** KADIKOY SATIŞ klasöründeki 10 işletme bilgisini Faz 6 sonrası Tier 0 scaffold'a uygun formatta hazırla (her işletme için 1 brief YAML: sector + budget + features).
**Nasıl:** `C:/Users/EAS/Desktop/KADIKÖY SATIŞ/*/SATIS_PROMPT.md` tara → her birini `kadikoy/briefs/*.yaml` çıkar.
**Süre:** 1-2 saat.
**Değer:** Faz 6 test'te 10 brief hazır — gerçek field test, ULTRAPLAN hızlı ROI.

### Öneri 5: Yasaklı ID 13 listesinin pre-commit hook'unu ŞİMDİ kur

**Ne:** `scripts/validate-combo.js` tam değil ama basic check'i bugün yazılabilir → her combo.md ve preset.yaml'da TY1/2/4/8, PL1, K1, HR2, H8, HR7, P1, T6, CH1, CH2 regex grep et.
**Nasıl:**
```bash
#!/bin/bash
# .git/hooks/pre-commit
FORBIDDEN="TY1|TY2|TY4|TY8|PL1|K1|HR2|H8|HR7|P1|T6|CH1|CH2"
if git diff --cached --name-only | xargs grep -lE "\b(${FORBIDDEN})\b" 2>/dev/null; then
  echo "❌ Yasaklı ID kullanıldı — commit yasak"
  exit 1
fi
```
**Süre:** 20 dk.
**Değer:** Faz 1'i beklemeden, bugünden itibaren drift önler. Kritik risk R7 (skor 16) hafifletilmiş olur.

---

## Kapanış

Bu ULTRAPLAN'ın 3 parçası (PART1 + PART2 + PART3) toplam ~1,900 satır, 24 bölüm, 15 tablo, 47 atom audit, 60 preset matrisi, 18 agent, 8 pipeline stage, 6 faz, 74-76 saat + 2 gün buffer timeline, ~2.5M Opus 4.7 token, Max plan içinde.

**"Sistem çalışıyor" = ≤ 30 dk'da Armut ilanından dev server, mobile Lighthouse ≥ 90, yasaklı ID 0 ihlal, Türkçe font render pass.**

Karar noktası: Öneri 1 (Faz 0 schema draft) başlat mı? Evet'te Emre Gate 1'e kadar ~4 saat, sonra paralel dispatch.

[KAYNAK: YOL-HARITASI.md:618-647 (üç alternatif seçim) + YOL-HARITASI.md:638-648 (onay bekliyor) + CLAUDE.md Aktif Projeler (Fatih Bey teslim 8 Mayıs baseline) + KADIKOY SATIŞ/MASTER_ANALIZ.md (10 site Tier 0 aday) + tüm 14 dosyanın 5004 satırı]

---

**Son.** ULTRAPLAN-PART1.md + PART2.md + PART3.md birleşik toplam = 24 bölüm, ~1,900 satır. Kaynaksız bölüm yok. Birleştirilmiş tek dosya istersen:
```bash
cat ULTRAPLAN-PART1.md ULTRAPLAN-PART2.md ULTRAPLAN-PART3.md > ULTRAPLAN.md
```
