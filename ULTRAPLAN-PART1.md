# PLAN Part 1 — Stratejik Çerçeve

> **Tarih:** 2026-04-19 · **Branş:** `claude/ultraplan-part1a-docs-d3UHz`
> **Kapsam (Part 1a):** Bölüm 1-4 — TL;DR, Hedef, Mevcut Durum, 7 Kritik Boşluk
> **Devam:** Part 1b — Bölüm 5+ (mimari, faz planı, risk matrisi)

---

## İçindekiler

1. [Özet (TL;DR)](#1--özet-tldr)
2. [Hedef (SMART)](#2--hedef-smart)
3. [Mevcut Durum (Envanter)](#3--mevcut-durum-envanter)
4. [7 Kritik Boşluk](#4--7-kritik-boşluk)

---

## 1 · Özet (TL;DR)

**Problem.** Emre (İstanbul, Armut freelance) için her yeni proje **3-5 saat manuel iskelet** üretimi demek. Repo'da **288 research kaydı + 14 sektör template + 13 ajans forensics + 4 CRM combo + 14-agent Design Council** var; ama hepsi MD/HTML içinde **gömülü prose** — Claude makine okuyamıyor, query atamıyor. Sonuç: her brief geldiğinde aynı dosyalar baştan okunuyor, manuel `npx create-next-app`, manuel component yazımı, 7-aşamalı pipeline her seferinde elle zincirleniyor.

**Çözüm.** YAML kataloğa konsolide edilmiş **atoms / sectors / styles / presets / recipes / techstack** + bunları sorgulayan **catalog-query skill** + Next.js 16 ve WordPress için iki ayrı **scaffolder** + tek slash komutla zinciri çalıştıran **/project-start** orkestratörü. Hedef akış: Armut ilanı → 30 dk içinde çalışan dev server, manuel kod yazımı sıfır.

**6 faz, 74-76 saat (~8-10 çalışma günü):**

| Faz | İçerik | Süre |
|-----|--------|------|
| F0 | Catalog skeleton (200+ YAML, schema, anti-cliché matrix) | 10-12 sa |
| F1 | catalog-query skill + validate-combo lint | 8 sa |
| F2 | 50-60 preset üretimi (sektör × style) + gallery | 16 sa |
| F3 | Next.js 16 scaffolder + 50 component + responsive base | 16 sa |
| F4 | WordPress + Elementor scaffolder + Hello child theme | 8 sa |
| F5 | `/project-start` slash + master pipeline hook | 8 sa |
| F6 | 3 end-to-end test proje + dokümantasyon + Lighthouse | 8 sa |

**Kabul kriterleri (tümü geçmeli):**

1. `/project-start` brief alımından itibaren **5 dk içinde** scaffold dev server çalışır.
2. Anti-cliché validator yasaklı ID (PL1 dark+gold, TY1/2/4/8) içeren combo'yu **otomatik retle**.
3. Mobile Lighthouse **≥90** (Perf / A11y / Best / SEO dört kategori).
4. Design-council `combo.md` ↔ catalog `preset.yaml` eşleşme **%100 tutarlılık** (build-time lint).
5. WordPress scaffold çıktısı `wp-admin` import ile **sorunsuz** yüklenir (Elementor 3.35 LTS hedef).
6. 3 end-to-end test projesi — **kuafor-minimal-swiss**, **eticaret-maximalist**, **restoran-editorial** — bağımsız onay alır.
7. Emre üretim boyunca **sıfır manuel kod** yazar (sadece onay/retle/refine brief).

[KAYNAK: `YOL-HARITASI.md:9-23, 483-491, 602-614` · `INDEX.md:144-148`]

---

## 2 · Hedef (SMART)

SMART hedef yapısı — her boyut **tek satır tanım + ölçülebilir kriter** ile bağlanır.

| Boyut | Tanım | Ölçü (kabul eşiği) |
|-------|-------|--------------------|
| **S — Specific** | Armut'tan gelen serbest-form brief'i (`/project-start "..."`) → çalışan Next.js 16 dev server (preset uygulanmış, 50 component yerleşmiş) ya da WordPress + Elementor child theme + import-hazır JSON. Karar otomatik (`budget` field). | 1 komut, 1 onay, 0 manuel kod satırı |
| **M — Measurable** | Tüm üretim ölçülebilir metriğe bağlanır: build süresi, manuel müdahale, kalite skoru, tutarlılık. | Lighthouse ≥90 (4 kategori: Perf/A11y/Best/SEO) · 0 manuel kod · anti-cliché validator 0 ihlal · combo↔preset eşleşme %100 · scaffold→dev server ≤5 dk |
| **A — Achievable** | 6 faz, her biri 8-16 saat. Onay-gate'li (her fazın sonunda kullanıcı "kabul" demeden bir sonraki başlamaz). 60 preset üretimi paralel 6 agent ile (her agent 1 style × 10 sektör). | Toplam 74-76 sa · paralel agent destekli · v3 fallback (Tailwind v4 alpha bug için) · WP recipe Elementor 3.35 LTS lock |
| **R — Relevant** | Armut sürekli iş akışına ölçeklendirilebilir freelance pipeline. İki tier: **budget WP** (7.5-15K TL, 3-5 gün) ve **premium Next.js** (15-50K TL, 2-3 hafta). Repeat-guard ile 5 mücevher projesinin aynı PL1 dark+gold yığını oluşturmasının önüne geçilir. | 2 tier × 10 sektör = 20 segment kapsam · repeat-guard skoru ≤7/15 zorunlu · `feedback_catalog_pipeline.md` memory entry ile her tasarım işinde tetiklenir |
| **T — Time-bound** | 8-10 çalışma günü. Her faz onay gate'i: F0 schema+10 örnek, F1 3 test case, F2 gallery onayı, F3 ilk test scaffold, F4 test import, F5 end-to-end test, F6 Lighthouse + kabul. | Bitiş hedefi: kullanıcı bir Pazartesi başlarsa **2 hafta sonraki Cuma** üretime hazır |

[KAYNAK: `YOL-HARITASI.md:483-491, 602-614, 638-647`]

---

## 3 · Mevcut Durum (Envanter)

5 paralel agent deep-audit (67 dosya, 12.700+ satır HTML + 9 MD + research-assets + 6 scrape ajans) ile çıkarılan envanter. **47+ dosya tek kökte** (`design-claude/`), Council sistemi (4 katman, 14 agent) kurulu.

### 3.1 Ana Envanter Tablosu

| # | Grup | Kaynak Yolu | Dosya | Satır / Boyut | Audit Kalite |
|---|------|-------------|-------|---------------|--------------|
| 1 | 14 sektör template | `templates/01-insaat/` … `templates/14-ultra/` | 14 HTML | 4.806 satır | 01-07: 3-4/5 (responsive **yok**); 08-14: 4-5/5 |
| 2 | 4 v2 CRM variant | `v2-blueprint/`, `v2-neobrutalist/`, `v2-kinetic-data/`, `v2-immersive-3d/` | 4 HTML | 3.010 satır | v2-immersive-3d: **5/5** (Three.js procedural kule) |
| 3 | 3 mockup paleti | `mockups/{a-warm-dark, b-off-white-editorial, c-concrete-industrial}/` | 3 HTML | 1.285 satır | a-warm-dark: **5/5** (zero klişe) |
| 4 | 4 insaat-crm combo | `insaat-crm/{combo.md, a-safe, b-edge, c-hybrid}/` | 1 MD + 3 HTML | 130 + 1.874 satır | b-edge: **4.2/5**, c-hybrid: 4.0/5, a-safe: 3.5/5 |
| 5 | 1 v1 CONSTRUO | `index.html` (kök) | 1 HTML | 1.445 satır | **1/5 — DEPRECATE** (7 klişe yığını referans) |
| 6 | 9 MD research | kök + `templates/` + `mevcut pipeline ve techstack/` | 9 MD | ~6.500 satır | SCRAPED-STACKS-2026 en değerli (13 ajans) |
| 7 | 13 ajans forensics | `templates/SCRAPED-STACKS-2026.md` | 1 MD | 470 satır | 47 unique tech, 15 signature pattern, 4 reçete |
| 8 | wearebrand assets | `research-assets/wab/` | 4 dosya | 114 KB | 6 pattern MIT-safe **rewrite-edilebilir** |

**Toplam:** 34+ HTML (12.700+ satır), 6+ research MD, 20+ research artefact.

### 3.2 Altın Madeni Dosyalar (üretime direkt referans)

- `templates/14-ultra/index.html` (660 satır) — **14 imza teknik satır numaralı**: blur-36px char reveal (612-618), porthole dive scale 1→6.5 (578-584), CSS mask `--mask-y` (85-87), magnetic elastic.out(1,0.3) (536-546), ScrambleText (597-610), variable font opsz scroll (586-595), dual cursor + back.out (520-546), SVG textPath bend marquee (454-466), feTurbulence grain (62-63), Canvas2D cursor trail (548-570), SplitText chars+lines (621-628), clip-path 4-yön reveal (314-315), theme switch on scroll (637-645), scroll-scrubbed char opacity (612-618).
- `v2-immersive-3d/index.html` (967 satır) — Three.js procedural 5-kat kule + scroll-camera binding + particles + sun/rim/accent lights + glass UI overlay.
- `templates/12-immersive-3d/index.html` (476 satır) — IcosahedronGeometry crystal + 8 orbiting + particle system + scroll-linked camera path.
- `insaat-crm/b-edge/index.html` (723 satır) — Full **Lenis 1.1.14 + GSAP ScrollTrigger** production bridge, interactive map, barometer gauge, terminal log.
- `research-assets/wab/wearebrand-animations.js` (30 KB) — wabSplit DIY SplitText (1-66), Lenis+GSAP ticker bridge (707-726), blur-36px reveal (148-194), magnetic elastic (738-784), theme switch on scroll (276-297). **6 pattern MIT-safe rewrite hedefi.**

### 3.3 Klişe Yığını (DEPRECATE)

`index.html` v1 (1.445 satır) = Freeman/Kadıköy recipe = **dark #0A0A0A + gold #C9A84C + glassmorphism + custom-cursor + SVG noise + aurora halo + italic-gradient**. 7 klişe overlap → yasak listesine **referans** olarak duruyor. 5+ projede aynı kombinasyon kullanıldığı için PL1 + TY1/2/4/8 kombinasyonları yeni projelerde yasak.

### 3.4 Design Council Çıktısı (insaat-crm)

3 combo simüle edildi (`insaat-crm/combo.md`):

- **Combo A — Safe & Proven** (Steel+Copper, dense Linear-style table) — spec 12/14, repeat skoru 2/15, adversary ✓ onay.
- **Combo B — Edge / Risky** (Concrete+Hazard, interactive map + barometer) — spec 13/14, repeat skoru 4/15, adversary ⚠ koşullu.
- **Combo C — Hybrid** (Tobacco+Clay, blueprint archive + spec sheet) — spec 13/14, repeat skoru 4/15, adversary ✓ onay.

Adversary onayı kâğıt üstü **ama build-time enforce edilmiyor** — bu doğrudan Bölüm 4(b)'deki en kritik boşluğa bağlanıyor: spec'in 1/3'ü kodda yok.

[KAYNAK: `YOL-HARITASI.md:30-58` · `INDEX.md:18-110, 142-148` · `SCRAPED-STACKS-2026.md:9-27`]

---

## 4 · 7 Kritik Boşluk

Audit'in çıkardığı 7 yapısal eksik. Hepsi **şu anda mevcut, hepsi ölçülmüş**. Her biri için **Sorun / Kanıt / Etki / Kaynak** bloku.

### a) YAML catalog yok

- **Sorun:** 288 araştırma kaydı, 120+ atom (H/N/HR/K/P/T/C/CH/F/M/FT/TY/PL/L/MO), 800+ teknoloji indexi — hepsi MD prose içinde gömülü. Claude `grep` ile filtre yapamıyor, frontmatter yok, her sorgu için tüm dosyayı re-read ediyor.
- **Kanıt:** Her yeni proje için `SECTOR-RESEARCH.md` + `DESIGN-PATHWAYS.md` + `SCRAPED-STACKS.md` baştan açılıp okunuyor. **10 sektör × 6 style × 120 atom = 7.200 olası kombinasyon** — MD ile navigate fiili imkansız.
- **Etki:** Tasarım kararları "hatırladığım kadarıyla" ile alınıyor; tutarsız öneri, atlama, repeat-guard skoru hesaplanamıyor.
- **Kaynak:** `YOL-HARITASI.md:64-66, 153-202`

### b) combo.md ↔ iskelet drift

- **Sorun:** Design Council combo'lar (`insaat-crm/combo.md`) güzel spec üretiyor, ama **kodda %33'ü yok**. Spec-code uyumu yalnız **%67**.
- **Kanıt:** `combo.md:46` "CH5 Apache ECharts" diyor; `b-edge/index.html`'de ECharts import yok — sankey grafiği eksik. Combo C'de "C3 Email Threaded" spec'te var, kodda yok. Adversary onayı kâğıt üstü, **build-time lint yok**.
- **Etki:** Müşteriye "council 14 agent kararı" denildikten sonra kodun farklı çıkması güven krizi.
- **Kaynak:** `YOL-HARITASI.md:68-71` · `insaat-crm/combo.md:46, 56-57`

### c) Sektör başına 1 template

- **Sorun:** Hedef matris **10 sektör × 6 style = 60 preset**, mevcut **~20 template** (14 sektör + 4 v2 + birkaç mockup; çoğu sektörde tek tone).
- **Kanıt:** `templates/02-mucevher/index.html` sadece editorial-luxury tone'unda; müşteri "minimal-swiss istiyorum" derse sıfırdan **3-5 saat** manuel kod. `templates/03-kuafor/` aynı durumda.
- **Etki:** Choice paralizesi; her brief manuel pivot, 60 preset'lik gallery hayali kalıyor.
- **Kaynak:** `YOL-HARITASI.md:73-76, 324-347`

### d) 800+ teknoloji prose içinde, query edilemez

- **Sorun:** `3D-TECHSTACK.md` (350+) + `FRONTEND-TECHSTACK.md` (800+) — düz prose, tablo değil, frontmatter yok.
- **Kanıt:** "Bu projede Three.js mi Spline mi OGL mi?" sorusunun cevabı için 3 dosya açılıp okunmalı + bundle_kb / production_score / alternatives manuel hatırlanmalı.
- **Etki:** Stage 1.5 tech-detection saatlerce sürüyor; karar sonrası `pnpm install` da yanlış paket çıkıyor.
- **Kaynak:** `YOL-HARITASI.md:78-81`

### e) WordPress pipeline yok

- **Sorun:** **7.5-15K TL budget tier** (3-5 gün teslim) sistemde tanımlı değil. Sadece Next.js premium yolu var.
- **Kanıt:** **fraxbit.com** (WordPress 6.9 + Elementor Pro 3.35.7 + GSAP 3.12.5 + Lenis 0.2.28 + Motion Design Addon) → Awwwards **Honorable Mention**. **wearebrand.io** (WordPress + Custom Theme + Barba 2.10.3 + Lenis 1.2.3 + GSAP) → Awwwards **SOTD Gold**. WP "düşük kalite" değil — Divi+plugin yığını düşük; custom theme + GSAP + Barba **kazandırıyor**.
- **Etki:** Armut'taki standart müşteri (kuaför, küçük restoran, randevu sitesi) elden kaçıyor; müşteri Squarespace/Wix'e gidiyor.
- **Kaynak:** `YOL-HARITASI.md:83-89, 495-543` · `SCRAPED-STACKS-2026.md:13-14`

### f) Trigger chain 7 adım manuel

- **Sorun:** Mevcut hook `~/.claude/hooks/design-council-reminder.js` **tek aşama**. Full pipeline (intake → tech-detect → catalog-query → onay → handoff → scaffold → polish → council → seo → schema → review → launch) yok; Emre her stage'i elle tetikliyor.
- **Kanıt:** `INDEX.md:130-138` günlük path güncellemeleri var ama orchestrator yok. `/design-council` slash tek başına; `/project-start` slash mevcut değil.
- **Etki:** Pipeline bütünlüğü yok; bazı aşamalar (schema-markup, code-reviewer) atlanıyor.
- **Kaynak:** `YOL-HARITASI.md:91-94, 411-466`

### g) Mobile responsive 0/14

- **Sorun:** **7 sektör template'inin hiçbirinde media query yok**. Desktop-only.
- **Kanıt:** `templates/01-insaat/`, `02-mucevher/`, `03-kuafor/`, `04-restoran/`, `05-klinik/`, `06-eticaret/`, `07-spa/` — `@media` regex 0 hit. 14-ultra dahil 8-14 arasındaki "advanced" template'lerde de breakpoint sistematik değil.
- **Etki:** Mobile Lighthouse <50; Türkiye'de mobile traffic %72 → site fiilen kullanılamaz.
- **Kaynak:** `YOL-HARITASI.md:96-99`

### 4.x Özet — 7 Boşluk Tek Bakışta

| # | Boşluk | Şu anki maliyet | Çözen faz |
|---|--------|-----------------|-----------|
| a | YAML catalog yok | Her brief 30+ dk research re-read | F0 |
| b | combo ↔ kod drift | Spec uyumu %67, council kararı kâğıt üstü | F1 (`validate-combo.js` lint) |
| c | Sektör başına 1 template | Müşteri stil değiştirirse 3-5 sa sıfırdan | F2 (50-60 preset) |
| d | 800+ tech prose içinde | Tech-detect saatlerce, yanlış paket riski | F0 (`techstack/*.yaml`) |
| e | WordPress pipeline yok | Budget tier müşterileri elden kaçıyor | F4 (Hello child + Elementor JSON) |
| f | Trigger chain 7 adım manuel | Aşamalar atlanıyor (schema, code-review) | F5 (`/project-start` + master hook) |
| g | Mobile responsive 0/14 | Lighthouse <50, mobile %72 traffic kayıp | F3 (zorunlu breakpoint base) |

**Sonuç:** 7 boşluğun **6'sı F0-F4 ile** çözülüyor; F5-F6 entegrasyon ve doğrulama. Bu Part 1a'nın çıktısı: *problem alanı hizalandı*. Part 1b detaylı mimari (4-katman) ve faz-faz uygulama planını getirecek.

[KAYNAK: `YOL-HARITASI.md:61-99, 253-491` · `combo.md:46, 56-57` · `SCRAPED-STACKS-2026.md:13-14`]
