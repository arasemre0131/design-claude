# SYSTEM-OVERVIEW.md — 4 Katman Mimari + Faz Geçmişi

> **Kapsam:** design-claude sisteminin yüksek-seviye mimarisi, 6 fazın tarihçesi, kritik kararlar ve v2.0 yol haritası.
> **Amaç:** Sen (veya seni 6 ay sonra yerine alacak Claude instance'ı) sistemi tek oturuşta kavrayabilsin.
> **İlgili dokümanlar:** [README.md](README.md) · [CATALOG-STRUCTURE.md](CATALOG-STRUCTURE.md) · [PIPELINE-GUIDE.md](PIPELINE-GUIDE.md) · [TROUBLESHOOT.md](TROUBLESHOOT.md)

---

## 4 katman mimari

Sistem dört katmana ayrılır. Her katman bir üsttekine **veri** sağlar, alttakine **kısıtlama** dayatır.

```
┌──────────────────────────────────────────────────────────────┐
│  L4 — PIPELINE KATMANI (Orchestration)                       │
│  /project-start + project-pipeline.js hook + 8 stage zinciri │
│  design-council → catalog-query → scaffold CLI → seo → launch│
└──────────────────────────────────────────────────────────────┘
               ▲ çıktı: combo.yaml + preset-id
┌──────────────────────────────────────────────────────────────┐
│  L3 — SKILL/AGENT KATMANI (Karar)                            │
│  14 council agent + 4 yeni agent + catalog-query skill       │
│  validate-combo.js + compatibility.yaml                      │
└──────────────────────────────────────────────────────────────┘
               ▲ çıktı: ranked 3 preset (A/B/C)
┌──────────────────────────────────────────────────────────────┐
│  L2 — KATALOG KATMANI (Bilgi)                                │
│  catalog/ — 356 YAML (atoms + sectors + styles + presets +   │
│  recipes + techstack + ROUTING + compatibility + MATRIX)     │
└──────────────────────────────────────────────────────────────┘
               ▲ çıktı: preset + recipe + tier
┌──────────────────────────────────────────────────────────────┐
│  L1 — ÜRETİM KATMANI (Çıktı)                                 │
│  4 scaffold CLI + preview-app (60 route)                     │
│  nextjs-16-base + wordpress-elementor + shopify-hydrogen +   │
│  enterprise-monorepo                                         │
└──────────────────────────────────────────────────────────────┘
               ▼ çıktı: çalışır dev-server-ready proje
```

### Katman bazında sorumluluk

| Katman | Sorumlu | Girdi | Çıktı | Dosya |
|--------|---------|-------|-------|-------|
| **L4 Pipeline** | Orchestration | Brief metni | Atomik stage çıktıları + onay gate'leri | `~/.claude/commands/project-start.md`, `~/.claude/hooks/project-pipeline.js` |
| **L3 Skill/Agent** | Karar + validasyon | Sector + tier + features | 3 preset öneri + anti-cliché skoru | `~/.claude/skills/catalog-query/`, `~/.claude/agents/*.md` (14+4), `scripts/validate-combo.js` |
| **L2 Katalog** | Bilgi kaynağı | Atom/sector/style ID | YAML veri + compatibility kuralı | `catalog/atoms/`, `catalog/sectors/`, `catalog/styles/`, `catalog/presets/`, `catalog/recipes/`, `catalog/compatibility.yaml` |
| **L1 Üretim** | Scaffold + preview | preset-id | Next/WP/Shopify/Enterprise proje + live preview | `scaffold.js`, `scaffold/*/scaffold-*.js`, `preview-app/` |

### Kritik sınırlar

- **L2 → L3 bağımlılığı:** Skill'ler YAML'a bağlı. Atom ID yeniden adlandırılırsa tüm catalog-query + validate-combo bozulur.
- **L3 → L4 bağımlılığı:** Pipeline hook'u skill çıktılarına bağlı. catalog-query MANIFEST'i değişirse `/project-start` çökmez ama hatalı öneri üretir.
- **L1 → L2 bağımlılığı:** Scaffold CLI preset YAML'ı okur. Preset'te eksik atom ID'si varsa scaffolder placeholder üretir, silently fail olmaz (`validate-combo.js` pre-check yapar).

---

## Dosya ve satır envanteri (2026-04-19 itibarıyla)

### L2 — Katalog (356 YAML/MD)

| Klasör | Dosya | Satır | Açıklama |
|--------|-------|-------|----------|
| `catalog/atoms/` | 261 YAML | ~9.700 | 17 kategori × atom |
| `catalog/atoms/typography/` | 44 | — | TY1–TY44 |
| `catalog/atoms/palette/` | 38 | — | PL1–PL38 |
| `catalog/atoms/motion-ajans/` | 33 | — | 14 ajans + 14 signature |
| `catalog/atoms/hero/` | 17 | — | HR1–HR17 |
| `catalog/atoms/3d/` | 15 | — | 3D-01..3D-15 |
| `catalog/atoms/` (diğer) | 114 | — | header/nav/kpi/pipeline/table/chart/chat/form/modal/footer/layout/motion |
| `catalog/sectors/` | 10 YAML | ~1.140 | 10 sektör — psikoloji + anti-cliché |
| `catalog/styles/` | 10 YAML | ~1.000 | 10 stil — tipografi + palette + forbidden |
| `catalog/presets/` | 60 + 4 pedagojik | ~3.600 | 10×10 matris (60 aktif + 40 forbidden hücre) |
| `catalog/recipes/` | 7 YAML | ~900 | Tech stack + version lock |
| `catalog/techstack/` | 3 YAML | ~3.880 | frontend-index (82) + 3d-index (99) + oss-packages (25) |
| `catalog/new-agents/` | 4 MD draft | ~580 | seo + a11y + perf + claude-design-liaison |
| `catalog/ROUTING.yaml` | 1 | 1.400+ | 144 feature → research mapping |
| `catalog/compatibility.yaml` | 1 | ~700 | Forbidden matrix + existing projects |
| `catalog/MATRIX.md` | 1 | ~300 | 10×10 tablo (insan-okunur) |

### L1 — Üretim (~240 dosya)

| Klasör | Dosya | Açıklama |
|--------|-------|----------|
| `scaffold/nextjs-16-base/` | ~50 | Next.js 16 template (app/, public/, src/) |
| `scaffold/wordpress-elementor/` | ~40 | Elementor child theme + scaffold-wp.js + wab-safe-animations.js |
| `scaffold/shopify-hydrogen/` | ~50 | Hydrogen template + scaffold-shopify.js |
| `scaffold/enterprise-monorepo/` | ~20 | Turborepo template + scaffold-enterprise.js |
| `scaffold.js` | 1 CLI | Next.js 16 orchestrator (27.3 KB) |
| `preview-app/` | ~80 | Next.js 16 preview gallery + compare + [preset] dinamik route |

### L3 — Skill/Agent (~20 dosya)

| Konum | İçerik |
|-------|--------|
| `~/.claude/skills/catalog-query/` | SKILL.md + scripts/query.js + package.json |
| `~/.claude/agents/*.md` | 14 mevcut council agent + 4 yeni agent draft |
| `scripts/validate-combo.js` | Anti-cliché + repeat-guard lint |

### L4 — Pipeline (~3 dosya)

| Konum | İçerik |
|-------|--------|
| `~/.claude/commands/project-start.md` | Slash command manifest |
| `~/.claude/commands/design-council.md` | Slash command manifest |
| `~/.claude/hooks/project-pipeline.js` | Stage chain executor |
| `~/.claude/hooks/design-council-reminder.js` | UserPromptSubmit hook |

### Toplam

| Metrik | Değer |
|--------|-------|
| **Toplam dosya** | ~500+ (catalog + scaffold + preview + skill + hook + agent) |
| **YAML + MD satır** | ~36.600 |
| **React/TS component** | ~64 (preview-app) + ~50 (nextjs-16-base içinde çekirdek) |
| **Scaffold CLI** | 4 (scaffold.js + scaffold-wp.js + scaffold-shopify.js + scaffold-enterprise.js) |
| **Preview route** | 60+ (dinamik `[preset]` + gallery + compare) |
| **Agent (mevcut + yeni)** | 18 (14 council + 4 draft) |
| **Preset (aktif)** | 60 |
| **Atom (aktif + yasak)** | 261 (~15 forbidden) |

---

## 6 faz tarihçesi

### Faz 0 + 0.5 — Catalog skeleton + 4 yeni agent (19 Nis, 2h 24m)

**Commit:** `619cd3b` — 296 dosya, 16.800 satır

**6 paralel agent dispatch:**

| Agent | Çıktı | Süre | Token |
|-------|-------|------|-------|
| A | 261 atoms YAML | ~28 dk | 283K |
| B | 10 sector YAML | ~9 dk | 114K |
| C | 17 styles + recipes | ~9 dk | 131K |
| D | 4 techstack + ROUTING | ~16 dk | 165K |
| E | seo + a11y agent draft | ~6 dk | 110K |
| F | perf + claude-design-liaison | ~4 dk | 84K |

**Teslim:** 296 dosya, ~890K token (paralel, wall-time ~28 dk).

**Sorunlar:**
- HR12 + MO12 YAML syntax (agent auto-fix)
- 2 agent brief satır limitini aştı (içerik yoğunluğu haklı, kabul edildi)

### Faz 1 — Query skill + validator (19 Nis)

**Commit:** `e8fc6e6` — 2.163 satır

**Teslim:**
- `~/.claude/skills/catalog-query/` — SKILL.md + query.js (sector/tier/features → 3 preset)
- `scripts/validate-combo.js` — yasaklı ID kontrol + repeat skor
- `catalog/MATRIX.md` — 10 sektör × 10 stil görünür tablo
- `catalog/compatibility.yaml` — anti-cliché matrix (60 aktif / 40 forbidden)

**Özellik:** A/B/C ranked öneri, validate-combo CLI, verbose mode (hangi projeyle çakışıyor).

### Faz 2 — 60 preset üretimi (19 Nis, 10 paralel agent)

**Commit:** `82ea36c`

**Teslim:** 60 preset YAML, 10 stil × aktif sektörler.

**Kritik karar:** Matrix'te ✗ işaretli 40 hücre forbidden — preset üretilmez (ör. `klinik-brutalist`, `spa-brutalist`). Her preset 8-12 atom listesi + anti-cliché block + recipe referansı.

### Faz 3 — Next.js scaffolder + preview-app (19 Nis 18:03)

**Commit:** `f190a68` — 17.270 satır, 64 React component

**Teslim:**
- `scaffold/nextjs-16-base/` — 50 dosyalık template (Next 16 + React 19 + Tailwind v4 + GSAP 3.13 + Lenis 1.3.4 + Three 0.183 + R3F v9 + drei v10)
- `scaffold.js` — CLI orchestrator (preset YAML → çalışır proje)
- `preview-app/` — 60+ route, canlı preset render, gallery + compare

**Test:** `mucevher-editorial-luxury` 20 dosya PASS (Test 1).

### Faz 4 — WordPress + Shopify + Enterprise (19 Nis 18:33)

**Commit:** `9a4dfae` — 141 dosya, 12.024 satır

**Teslim:**
- `scaffold/wordpress-elementor/` — Hello Elementor child theme + `wab-safe-animations.js` (6 MIT-safe pattern) + Elementor template JSON + `scaffold-wp.js` CLI
- `scaffold/shopify-hydrogen/` — Hydrogen 2024.10 template + `ProductCard3D.tsx` (R3F + metafield) + `scaffold-shopify.js` CLI
- `scaffold/enterprise-monorepo/` — Turborepo + 3 apps (web/admin/api) + 5 packages (ui/db/auth/config/observability) + `scaffold-enterprise.js` CLI

**Test:** `kuafor-minimal-swiss` (WP) + `eticaret-immersive-3d` (Shopify) PASS (Test 2+3).

**Kritik karar:** GSAP 3.13 "tamamen ücretsiz" (Webflow acquisition 2024 sonrası). `wab-safe-animations.js` wearebrand.io/fraxbit.com ilhamı MIT-safe orijinal rewrite — kopyala-yapıştır değil.

### Faz 5 — Pipeline integration (19 Nis)

**Commit:** `35ab6d6`

**Teslim:**
- `~/.claude/commands/project-start.md` — Slash command manifest (brief → 8 stage zinciri)
- `~/.claude/hooks/project-pipeline.js` — Stage chain executor
- `SITE-GELISTIRME-PIPELINE.md` Stage 6.75 + 6.8 eklendi (Claude Design Handoff + Catalog Query refresh)
- Memory entry (3 feedback: nextjs16 zorunlu, kalite > miktar, whisper pipeline)

**Sonuç:** "Armut ilanından 30 dakikada çalışır dev server" hedefine ulaşıldı.

### Faz 6 — Test + doküman (19 Nis, devam)

**Test sonucu (`TEST-REPORT.md`):** 3/3 scaffold CLI PASS
- Test 1: `mucevher-editorial-luxury` (20 dosya)
- Test 2: `kuafor-minimal-swiss` (17 dosya, WP)
- Test 3: `eticaret-immersive-3d` (42 dosya, Shopify)

**Minor bulgular (blocker değil):**
- `.env.example` Next 16 base'de yok (Shopify'da var)
- PRESET_RECIPE constants.ts ile combo.md arasında cosmetic tutarsızlık

**Dokümanlar:** 5 MD bu klasörde (README + CATALOG-STRUCTURE + PIPELINE-GUIDE + TROUBLESHOOT + SYSTEM-OVERVIEW).

---

## Kritik kararlar + gerekçeler

### 1. YAML neden JSON değil

| Kriter | YAML | JSON |
|--------|------|------|
| İnsan editing | ✓✓ (comment desteği) | ✗ (comment yok) |
| Multi-line string | ✓✓ (`\|`, `>`) | ✗ (`\n` escape) |
| Anchor + alias | ✓ | ✗ |
| AI parse | ✓ (hiç zorlanmıyor) | ✓✓ |
| Sektör-özel uzun metinler | ✓✓ | ✗ (okunamaz) |

**Karar:** YAML — insan okunur, Claude da zorlanmıyor. `js-yaml` parse 100ms altı tüm katalog için.

### 2. Tek-kaynak compatibility.yaml

Forbidden combinations ve anti-cliché kuralları **tek yerde** tutulur: `catalog/compatibility.yaml`. Preset YAML'leri, sektör YAML'leri ve `validate-combo.js` hepsi bu dosyayı okur. Dağınık olsaydı ikinci projede "PL1'i yasakladık ama bir yerde silinmemiş" tuzağına düşerdik.

### 3. "Recipe" kavramı — tech-stack abstraction

Preset tech-stack'ı doğrudan taşımıyor; `recipe` field'ı ile `catalog/recipes/*.yaml`'a pointer veriyor. Yeni bir tier (ör. Cloudflare Workers tabanlı) eklendiğinde sadece **bir recipe YAML + bir scaffolder CLI** yazılır, 60 preset değişmez.

### 4. `new-agents/` neden draft olarak bekletildi

SEO + a11y + performance + claude-design-liaison **yeni agent'lar** ama council mevcut 14 agent ile çalışıyor. Bunları eklemek `/design-council` komutunu kırabilir (5 tur planı 14'ten 18'e çıkar, tur 2 çelişki tespiti karmaşıklaşır). Faz 7'de kontrollü entegrasyon planlı (bkz: yol haritası).

### 5. Shopify Hydrogen neden `next-r3f` ile preset'te belirtildi

`eticaret-immersive-3d.yaml` preset'te `recipe: next-r3f` yazıyor ama Shopify scaffolder çalıştırıldığında `next-r3f` Next.js 16 bekler, Shopify ise Remix tabanlı. Bu **bilinen cosmetic tutarsızlık** — scaffolder `--skip-recipe-check` flag'i ile override. v2.0'da preset YAML'a `recipe_overrides: [shopify-hydrogen]` eklenecek.

### 6. 261 atom çok mu

Atom sayısı büyük ama 17 kategoriye yayılmış — her kategoride 6-44 seçenek. "Hero" kategorisinde 17 atom var ama hepsi farklı pattern (brochure cover, video hero, split, full-bleed, kinetic headline...). Azaltmak = çeşitlilik kaybı. Faz 2'de "bu kadar atom gerçekten gerekli mi?" sorusu soruldu, **evet** — her preset 8-12 atom kullanıyor ve **hiçbiri aynı 12'yi seçmiyor** (yüksek kombinatorik çeşitlilik hedef).

### 7. Yasaklı ID'leri silmek değil `forbidden: true` flag'lemek

Yasaklı atomlar (TY1, PL1, K1...) dosyaları **silinmiyor** — `forbidden: true` + `reason` field ekleniyor. Sebep: `validate-combo.js` alternative suggestion vermek için yasak atomun profiline bakıyor ("TY1 bir sans-sans pair, sana TY27 (Fraunces+IBM Plex) öneriyorum çünkü editorial variant"). Silseydik bu mantık çalışmazdı.

### 8. Preview-app 60+ route neden statik generate değil dinamik `[preset]`

İlk başta "60 statik route" planlandı ama YAML yüklemesi `generateStaticParams` ile 10 saniye build alıyordu. Dinamik `[preset]` route + ISR (revalidate 3600) tercih edildi — preset YAML değişince 1 saat içinde render güncelleniyor.

---

## v1.0 vs v2.0 yol haritası

### v1.0 — Mevcut (Faz 0-6)

- ✓ 356 YAML katalog
- ✓ 60 preset canlı
- ✓ 4 scaffold CLI
- ✓ /project-start pipeline
- ✓ 14 council agent + 4 yeni agent draft
- ✓ Preview-app gallery + compare + dinamik route
- ✓ 3 test scaffold PASS

### v2.0 — Planlı (Faz 7+)

| Ürün | Durum | Tahmini süre |
|------|-------|--------------|
| **4 yeni agent entegrasyonu** | Council tur planına SEO + a11y + perf ekleme | 4 saat |
| **Claude Design bundle parser** | Stage 3.75 handoff bundle otomatik parse + preset seçimi | 6 saat |
| **Component library publish** | `@design-claude/ui` paketi npm'e publish | 8 saat |
| **Figma plugin** | Preset → Figma frame export | 2 gün |
| **Marketing site** | design-claude.com (agency branding, case studies) | 3 gün |
| **Webflow preset scaffolder** | `scaffold-webflow.js` (recipe: webflow-premium mevcut, CLI eksik) | 1 gün |
| **Astro scaffolder** | Editorial-print preset için Astro variant | 1 gün |
| **Preset versioning** | `@design-claude/preset/mucevher-editorial-luxury@1.0.0` semver | 4 saat |
| **Analytics hook** | Preset seçim frekansı + A/B conversion metric | 1 gün |
| **i18n genişletme** | EN + DE locale (TR şu an default) | 2 gün |

### Faz 7 öncelik sıralaması

1. **4 yeni agent entegrasyonu** — en düşük risk, en yüksek değer
2. **Component library publish** — scaffolder otomatik `@design-claude/ui` kullanır, duplicate kod sıfırlanır
3. **Webflow scaffolder** — recipe zaten var, sadece CLI yazılacak
4. **Preset versioning** — "v1.1'de PL30 eklendi, eski projeler bozulmaz" garantisi
5. **Marketing site** — satış artırımı

### Bilinen teknik borç

- **Next.js 16 alpha stabilitesi:** `next: 16.0.0` alpha, prod'a alınırken canary version kontrol (`next@canary` tarihine bak). Breaking change olursa scaffold template güncellenir.
- **GSAP 3.13 + Turbopack uyumu:** GSAP'ın ScrollTrigger plugin'i Turbopack'in SWC transform ile çakışabilir. Çakışırsa `next.config.ts` > `experimental.optimizePackageImports: ['gsap']` eklenmeli.
- **Tailwind v4 @theme directive:** CSS-first yaklaşım stabile çıktı ama bazı editor (VSCode Tailwind IntelliSense) henüz tam desteklemiyor. Emin değilsen `tailwind-v4-preview` extension kullan.
- **R3F v9 + React 19 concurrent mode:** `<Canvas>` içinde React Suspense edge case'leri bazen hydration mismatch yaratıyor. Faz 6 test'te görülmedi ama prod'da izlenmeli.

---

## Bir sonraki adım — Sen ne yapmalısın

### Hemen (bugün)

1. Preview-app'i aç: `cd preview-app && pnpm dev`, `http://localhost:3000/gallery`
2. 5 preset'i incele: `mucevher-editorial-luxury`, `kuafor-warm-organic`, `insaat-industrial-workwear`, `eticaret-immersive-3d`, `restoran-maximalist-atmospheric`
3. Bir tanesini scaffold et: `node scaffold.js <preset-id> --out <path>`
4. `pnpm install && pnpm dev` + canlı gez

### 1 hafta içinde

1. Gerçek Armut ilanında `/project-start "<brief>"` dene (Fatih Bey veya KADIKOY müşterilerinden biri)
2. Pipeline'dan çıkan combo.md + preset öneri kalitesini değerlendir
3. Feedback varsa `~/.claude/projects/<proje>/memory/feedback_*.md` kaydet

### 1 ay içinde

1. 3 gerçek müşteri projesinde kullan
2. "Hangi preset hangi dönüşüm getirdi" ölçümü için basit analytics ekle
3. Faz 7 önceliklerini gözden geçir

---

## Sistem sağlık göstergesi

| Gösterge | Eşik | Mevcut | Durum |
|----------|------|--------|-------|
| Preset sayısı | ≥ 50 | 60 | 🟢 |
| Atom sayısı | ≥ 250 | 261 | 🟢 |
| Yasak ID kontrolü | tüm preset'te | 60/60 temiz | 🟢 |
| Scaffold CLI PASS | 4/4 | 3/3 test edildi (enterprise henüz değil) | 🟡 |
| Preview-app çalışıyor | dev server up | evet (local) | 🟢 |
| Doküman tamlığı | 5 MD | 5/5 | 🟢 |
| LOG.md güncel | tüm faz kapalı | ✓ | 🟢 |
| Next.js 16 alpha | stable | alpha — izleme gerekli | 🟡 |

---

## Kapanış notu

Bu sistem bir **tercih yığıcı** değil — bir **tercih engelleyici**. 261 atomdan 12'sini seçerken Claude'a "bunları seçemezsin çünkü bunlar Fatih Bey Mücevher ile aynı olur, sen 4. mücevher projende aynı klişeyi tekrar ettin" diyor. Önceden kararlar vermiş olman yeni proje hızını artırıyor, ama esas katkı **tekrar tuzağından çıkış**.

6 fazda inşa edildi. `v2.0` roadmap'i tek kişi 2 haftada bitirebilir. Sonra `marketing-site` ile öne çıkar.

İyi çalışmalar Emre.

— design-claude ekibi (yani sen ve geçmiş oturum Claude instance'ların)
