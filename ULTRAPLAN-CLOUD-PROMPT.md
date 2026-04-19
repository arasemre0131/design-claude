# ULTRAPLAN.md Üretim Promptu — Cloud Session'a Yapıştırılacak

Aşağıdaki metni cloud session'a /ultraplan argümanı olarak ver. Önceki denemede 7 dosya eksik okundu, bu versiyon OKUMA PROTOKOLÜ ile başlıyor.

---

## 🚨 KRİTİK: OKUMA PROTOKOLÜ — ATLAMA YASAK

Bu task'a başlamadan ÖNCE aşağıdaki 14 dosyayı **TAM** oku. Önceki denemede default 200-500 satır limit'ine takıldın, dosyaların çoğunu eksik okudun. Bu sefer **her Read çağrısında explicit `limit` parametresi** geç ve değeri aşağıdaki tabloda verilen gerçek satır sayısına eşit yap.

### Zorunlu 14 Dosya + Gerçek Satır Sayısı

```
 1. /home/user/design-claude/YOL-HARITASI.md                                   → 810 satır
 2. /home/user/design-claude/INDEX.md                                          → 149 satır
 3. /home/user/design-claude/COUNCIL-KURULUM-RAPORU.md                         → 168 satır
 4. /home/user/design-claude/templates/SCRAPED-STACKS-2026.md                  → 470 satır
 5. /home/user/design-claude/templates/2026-ADVANCED-TECHNIQUES.md             → 388 satır
 6. /home/user/design-claude/templates/SECTOR-RESEARCH.md                      → 220 satır
 7. /home/user/design-claude/templates/REFERENCE-DESIGNERS.md                  → 111 satır
 8. /home/user/design-claude/templates/TECH-DETECTION-METHODOLOGY.md           → 292 satır
 9. /home/user/design-claude/templates/14-ultra/index.html                     → 660 satır
10. /home/user/design-claude/insaat-crm/combo.md                               → 130 satır
11. /home/user/design-claude/mevcut pipeline ve techstack/DESIGN-PATHWAYS.md   → 381 satır
12. /home/user/design-claude/mevcut pipeline ve techstack/FRONTEND-TECHSTACK.md → 526 satır
13. /home/user/design-claude/mevcut pipeline ve techstack/SITE-GELISTIRME-PIPELINE.md → 594 satır
14. /home/user/design-claude/mevcut pipeline ve techstack/TECHSTACK-LOOKUP.md  → 105 satır

TOPLAM: 5004 satır
```

### Read Çağrı Formatı (ÖRNEK)

```
Read(file_path="/home/user/design-claude/YOL-HARITASI.md", limit=810)
Read(file_path="/home/user/design-claude/mevcut pipeline ve techstack/SITE-GELISTIRME-PIPELINE.md", limit=594)
Read(file_path="/home/user/design-claude/mevcut pipeline ve techstack/DESIGN-PATHWAYS.md", limit=381)
```

**14 Read çağrısını PARALEL yap** (tek mesajda 14 tool use). Tek tek sıralı çağırma.

### Doğrulama Kuralı

Her Read çıktısının başında "Read N lines" yazıyor. N, tabloda verilen sayıyla EŞİT olmalı:
- YOL-HARITASI.md → "Read 810 lines" (veya 811) ✓
- SITE-GELISTIRME-PIPELINE.md → "Read 594 lines" ✓
- DESIGN-PATHWAYS.md → "Read 381 lines" ✓

Eğer "Read 500 lines" veya "Read 232 lines" görürsen — eksik okundu demektir. `offset` parametresiyle ikinci Read yap: `Read(file_path="...", offset=500, limit=94)`. Eksik okuma varsa ULTRAPLAN.md yazmaya **BAŞLAMA**.

### Önceki Session'ın Kanıtlı Hataları

| Dosya | Gerçek | Önceki Okuma | Durum |
|-------|-------:|-------------:|:------|
| DESIGN-PATHWAYS.md | 381 | 232 | son 149 satır (yasaklı ID + proje matrisi) kayıp |
| SITE-GELISTIRME-PIPELINE.md | 594 | 500 | son 94 satır kayıp |
| FRONTEND-TECHSTACK.md | 526 | 450 | son 76 satır (AI Design Tooling + istatistik) kayıp |
| 2026-ADVANCED-TECHNIQUES.md | 388 | 310 | son 78 satır (Codrops pattern + çıkarımlar) kayıp |
| SECTOR-RESEARCH.md | 220 | 80 | son 140 satır (7-10. sektör + matrix) kayıp |
| combo.md | 130 | 80 | son 50 satır (adversary + onay) kayıp |
| REFERENCE-DESIGNERS.md | 111 | 0 | HİÇ okunmadı |
| TECH-DETECTION-METHODOLOGY.md | 292 | 0 | HİÇ okunmadı |
| 14-ultra/index.html | 660 | 0 | HİÇ okunmadı (sadece ls) |

Bu hataları tekrar etme.

---

## PROJE ÖZETİ (BAĞLAM)

Emre (Armut freelance, İstanbul merkezli AI + yazılım şirketi) her proje için manuel 3-5 saat iskelet kuruyor. Hedef: **Armut ilanı → 30 dakikada çalışan Next.js dev server**. Yöntem: var olan 288 research dosyası + 13 ajans forensics + 14 sektör template + 4 CRM variant + 3 mockup + 3 CRM combo + mevcut 14-agent Design Council sistemini **makine-okunabilir YAML kataloğa** dönüştürüp, catalog-query skill + scaffolder (Next.js + WordPress) + trigger chain (`/project-start`) ile end-to-end otomasyona bağlamak.

Repo: https://github.com/arasemre0131/design-claude (PUBLIC)

---

## FINAL 17 KONFİGÜRASYON AYARI

**1. Stiller (10):** brutalist, editorial-luxury, kinetic-agency, immersive-3d, maximalist-atmospheric, minimal-swiss, warm-organic, data-dense-dashboard, editorial-print, industrial-workwear

**2. Sektörler (10):** insaat, mucevher, kuafor, restoran, klinik, eticaret, spa, fotograf, gayrimenkul, otel

**3. Stack Recipes (7):** next-premium, next-r3f, wordpress-elementor-motion, webflow-premium, nuxt-ogl, shopify-hydrogen, claude-design-handoff

**4. Bütçe 5 Tier:**
- **Ultra-Budget 5-7K TL** — Next.js template swap, 2-3 gün
- **Budget 7.5-15K TL** — WordPress + Elementor Pro + GSAP 3.13 + Lenis, 3-7 gün (fraxbit.com Awwwards HM kanıtı)
- **Mid 15-25K TL** — Next.js 16 + shadcn + Supabase, 2-3 hafta
- **Premium 25-80K TL** — + R3F + drei v10 + Three.js r183 + MeshTransmissionMaterial + Gaussian Splat, 3-5 hafta
- **Enterprise 80K+ TL** — + Turborepo monorepo + multi-tenant + Sentry/Mixpanel/PostHog + SLA, 6-12 hafta

**5. Feature Modules (14):** e-ticaret, admin, blog, randevu, whatsapp, 3d-viewer, AR, chat, wishlist, karsilastirma, PWA, i18n, SLA, observability

**6. Palette:** 38 (PL1-PL38)
**7. Typography:** 44 (TY1-TY44)
**8. Versiyon Lock:** GSAP 3.13, Lenis 1.3.4, Motion v12, Three.js r183, drei v10, R3F v9, Next.js 16, React 19, Tailwind v4
**9. Yasaklı ID (13):** TY1/2/4/8, PL1, K1, HR2, H8, HR7, P1, T6, CH1, CH2 — yeni projede kullanılamaz
**10. Quality Gate:** Mobile Lighthouse ≥ 90 / WCAG AA / CLS < 0.05 / Enterprise 99.9% SLA
**11. Deploy:** Vercel + Cloudflare Pages + Docker self-host
**12. Agent Roster:** 18 = 14 mevcut (~/.claude/agents/) + 4 yeni (seo-expert, accessibility-expert, performance-expert, claude-design-liaison)
**13. Preview:** Gerçek Next.js 16 app (60+ route, canlı GSAP/Lenis/R3F) — **HTML mockup DEĞİL**
**14. Claude Design Stage 3.75:** opsiyonel prototip + handoff bundle parser (Tier 3+)
**15. Enterprise Monorepo:** Turborepo + pnpm workspaces
**16. Observability:** Sentry + Mixpanel + PostHog
**17. Aktif Preset:** 60 = 10 sektör × 10 stil - 20 sektör-stil uyumsuzluğu

---

## 47 ATOM AJANS KAYNAĞI

- **wearebrand.io (6):** Lenis+GSAP bridge, blur-36px reveal, magnetic elastic.out(1,0.3), CSS mask --mask-y, theme switch, figured-eight shadow
- **fraxbit (5):** CSS var parallax, clip-path reveal, dual cursor, trackpad ease, scatter preloader
- **mdx.so (2):** Vimeo bg "3D", data-fade JSON
- **Lusion (2):** raw GLSL simplex/fBM, CSS var→shader uniform
- **Adoratorio (2):** Pixi WiggleFilter, custom SplitText
- **REJOUICE (1):** mix-blend-mode:difference header
- **Fiddle (1):** SVG textPath circle
- **FLOT NOIR (1):** Barba+Taxi curtain
- **Ravi Klaassens (1):** data-hover-follower
- **Locomotive (1):** data-scroll-*
- **Evolve (1):** persistent canvas
- **14-ultra template'den 14 pattern** (satır numaralarıyla audit edildi — templates/14-ultra/index.html 62-645 arası, detayları YOL-HARITASI.md:42-47 ve 655-678'de)

---

## ÇIKTI: ULTRAPLAN.md

**Konum:** `/home/user/design-claude/ULTRAPLAN.md`
**Dil:** Türkçe (tüm orthography zorunlu: ı, İ, ğ, ş, ç, ö, ü)
**Uzunluk:** 1500-2000 satır
**Format:** Tablo ağırlıklı, scannable, öneri listesiyle biter

### 24 Bölüm (ZORUNLU — hepsi olacak)

1. **Özet / TL;DR** — 1 sayfa
2. **Hedef** — SMART format (Specific, Measurable, Achievable, Relevant, Time-bound)
3. **Mevcut Durum** — audit bulguları, 5 agent scan sonucu, envanter
4. **Problem Analizi** — 7 kritik boşluk (catalog makine-okunmaz, spec-code drift, sektör başına 1 template, 800+ teknoloji query edilemez, WordPress yok, trigger chain manuel, mobile responsive 0/14)
5. **Hedef Mimari** — 4 katman diyagramı (L1 catalog / L2 query skill / L3 scaffolder / L4 trigger chain)
6. **17 Konfigürasyon Ayarı** — her biri için: **gerekçe + alternatif + karar** (3 sütunlu tablo)
7. **5 Bütçe Tier Detaylı** — her tier: müşteri profili, stack, teslim süresi, bakım, kâr marjı, örnek proje, kabul/red kriteri
8. **10 Stil Ailesi** — her biri: mood, typography ailesi (TY ID), motion primitives (MO ID), forbidden pattern, referans implementasyon (dosya:satır)
9. **10 Sektör** — her biri: psikoloji, anti-cliché listesi, recommended pathway ID'leri, 5-tier mapping
10. **80 Preset Matrisi** — 10×10 grid (sektör × stil), yasak hücreler işaretli (✗), kontrollü (⚠), valid (✓), 60 aktif hedef, 20 forbidden sebep açıklaması
11. **47 Atom Kataloğu** — her atom: kaynak dosya:satır + MIT-safe rewrite notu + kullanım örneği (kısa kod snippet) + uyumlu sektör/palette listesi (tablo halinde 47 satır)
12. **18 Agent Roster** — 14 mevcut + 4 yeni agent'ın detaylı tanımı: rol, pathway ID yetkinliği, decision criteria, referans research dosyası
13. **33 Skill + 8 Stage Eşleşme Matrisi** — hangi skill hangi stage'de otomatik/manuel tetiklenir, auto-chain kuralları, GUARD kuralları (örn: code-reviewer öncesi launch-strategy yasak)
14. **8 Pipeline Stage** — Stage -1 → Stage 8, her aşama: trigger + input + output + onay noktası + skill zinciri
15. **Claude Design Stage 3.75 Entegrasyonu** — handoff bundle format, claude-design-liaison agent spec, hangi tier'larda tetiklenir, token ekonomisi (~55K/session), MCP kurulum
16. **6 Fazlı Uygulama Planı** — her faz: deliverable listesi, paralel agent dispatch stratejisi, süre tahmini, risk, onay gate
17. **Timeline** — gün gün Gantt, 5-6 günlük full-time kritik yol, her günün deliverable'ı
18. **Usage Tahmini** — ~30 agent call × 45K token = ~1.35M token Opus 4.7, Max plan kapasitesi analizi
19. **7 Approval Gate** — her biri için: ne sorulacak, başarı kriteri, reddedilirse ne yapılacak, bekleme süresi
20. **Verification Strategy** — her fazda 1 gerçek test proje, başarısızsa fazı tekrar, Lighthouse / WCAG / CLS eşikleri
21. **Risk Register** — 10 risk, her biri için: olasılık × etki × hafifletme × tetik sinyali (tablo)
22. **Global CLAUDE.md Güncelleme Önerileri** — 8 madde: agent 14→18, stil 6→10, 5-tier, Stage 3.75+3.8, catalog-query skill, preview app, ROUTING.yaml, memory entry
23. **Rollback Plan** — her faz sonunda repo commit, başarısızsa git reset, worktree stratejisi
24. **Kabul Kriterleri + FAQ + Ekler** — sistem "çalışıyor" sayılması için minimum: Armut ilanı → 30 dk dev server, mobile Lighthouse ≥ 90, YAML schema örnekleri, `/project-start` komut referansı, troubleshoot

### Her Bölüm İçin ZORUNLU Kanıt Satırı

Her bölümün SONUNDA kaynak kanıt:
```
[KAYNAK: DESIGN-PATHWAYS.md:243-264 (PL1-PL20 palette tablosu) + SCRAPED-STACKS-2026.md:163-329 (15 signature pattern kodu)]
```
Dosya adı + satır numarası eşleşmeli. Kaynaksız bölüm kabul edilmez.

---

## ÖZEL KURALLAR (ÖNCEKİ DENEMEDE ATLANDI — BU SEFER UYGULANACAK)

1. **Preview HTML mockup YOK** — gerçek Next.js 16 + R3F + GSAP canlı çalışır, iskelet `pnpm dev` ile açılır
2. **Preset üretiminde wearebrand-animations.js** — direkt kopya yapabilirsin, ama karşılaştırma sunarak 
3. **Mobile breakpoint (375/768/1280)** — her component'te zorunlu, Tailwind v4 `@theme` ile token
4. **Yasaklı ID listesi build-time validator ile enforce** — `scripts/validate-combo.js` YAML'deki ID'yi kodda gerçek kontrol
5. **Türkçe karakter (ı, İ, ğ, ş, ç, ö, ü) font testi zorunlu** — her typography combo için Fraunces/IBM Plex/JetBrains Mono TR subset doğrulaması
6. **Her kararın ARKASINDAKİ GEREKÇE** — sadece "ne" değil "**niye**" ve "**nasıl**" açık yazılmalı
7. **Tablo ağırlıklı, scannable** — paragraf ağır yazma, maddeler + tablolar tercih et
8. **Öneri listesiyle bitmeli** — 24. bölüm sonunda "bir sonraki adım için 5 öneri"

---

## SON KONTROL CHECKLİSTİ (ULTRAPLAN.md yazıldıktan SONRA kendin doğrula)

```
[ ] 14 dosyanın hepsi tam satır okundu (stdout'taki "Read X lines" değeri tablo ile eşleşti)
[ ] 24 bölüm var, hepsi başlıkla ayrılmış
[ ] Her bölümde kaynak kanıt satırı mevcut
[ ] Toplam 1500-2000 satır aralığında
[ ] 47 atom için 47 ayrı tablo satırı (dosya:satır + MIT-safe notu)
[ ] 80 preset matrisi 10×10 tam görünüyor (60 aktif + 20 forbidden)
[ ] 18 agent her biri ayrı tanımlı (14 mevcut + 4 yeni isimleri net)
[ ] 8 pipeline stage + Stage 3.75 + Stage 3.8 ayrı anlatıldı
[ ] 5 bütçe tier müşteri profili + kâr marjı + süre dahil
[ ] 60 aktif preset / 20 forbidden uyumsuzluk sebebi açıklanmış
[ ] Türkçe orthography doğru (ı, İ, ğ, ş, ç, ö, ü hiç ASCII'ye düşmemiş)
[ ] 17 konfigürasyon ayarının hepsi için gerekçe + alternatif + karar 3 sütunlu tablosu
[ ] Risk register 10 satır, her biri olasılık × etki × hafifletme × sinyal
[ ] 7 approval gate her biri için ret senaryosu açıklanmış
[ ] Yasaklı ID listesi (13) 24. bölümde EK olarak tekrar listelenmiş
```

Bu 14 checkbox'tan biri boşsa ULTRAPLAN.md teslim edilmez, ilgili bölüm revize edilir.

---

## BAŞLANGIÇ KOMUTU

1. 14 Read çağrısını PARALEL at (tek mesajda 14 tool use)
2. Her Read çıktısının "Read N lines" değerini doğrula (tablo eşleşmesi)
3. Eksik varsa offset ile tamamla
4. 24 bölümü sırayla yaz, her bölüm sonunda kaynak kanıt
5. Write tool ile `/home/user/design-claude/ULTRAPLAN.md`'e kaydet
6. Son kontrol checklistini kendin doğrula, eksikse revize et
7. Kullanıcıya teslim: "ULTRAPLAN.md hazır, X satır, 24 bölüm, 14 dosya tam okundu"

**Eksik okuma veya eksik bölüm ile teslim YASAK.**
