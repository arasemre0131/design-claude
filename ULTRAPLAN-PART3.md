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
