# PIPELINE-GUIDE.md — /project-start ve Pipeline Rehberi

> **Kapsam:** 8 stage (−1 → 8), 13 otomatik skill + 20 manuel skill, 7 approval gate, 5 gerçek senaryo.
> **Amaç:** Armut ilanından 30 dakikada çalışır dev server'a ulaşma.

---

## Pipeline özeti

```
ARMUT ILAN
   │
[−1] Pre-Meeting      ← armut-bidding / meeting-analysis
   │
   ├─ Müşteri kabul + toplantı
   │
[0] Setup             ← client-onboarding
   │
[1.5] Tech Detection  ← brief keyword → sector + tier + features
   │
[3.7] Design Council  ← 14 agent, 5 tur, 3 combo üret
   │
   ├─ [APPROVAL 1] Combo seçimi
   │
[3.75] Claude Design Handoff (opsiyonel, Tier 3+)
   │
[3.8] Catalog Query   ← 3 preset önerisi A/B/C
   │
   ├─ [APPROVAL 2] Preset seçimi
   │
[4] Scaffold Execution  ← scaffold.js / scaffold-wp.js / scaffold-shopify.js / scaffold-enterprise.js
   │
[5] Polish            ← Lighthouse ≥ 90, WCAG AA, feature tamamlama
   │
[6] SEO Chain         ← seo-audit → schema-markup → site-architecture
   │
[6.75] Claude Design Handoff (son polish, opsiyonel)
   │
[6.8] Catalog Query (refresh, feature sonrası)
   │
[7] QA Guard          ← code-reviewer (GUARD — launch öncesi zorunlu)
   │
[8] Launch            ← launch-strategy + deploy + monitoring
```

---

## Stage detayları

### Stage −1: Pre-Meeting (opsiyonel)

**Tetikleyici:** Armut ilan metni VEYA toplantı ses dosyası.

| Girdi | Skill | Çıktı |
|-------|-------|-------|
| Armut ilan URL / metin | `armut-bidding` | Teklif mesajı + fiyat tablosu |
| Toplantı `.m4a/.mp4` | `meeting-analysis` | Whisper transkript + 12-bölüm PDF + 17 dokuman + PPTX |

İkisi de yoksa → direkt Stage 0.

---

### Stage 0: Setup

**Tetikleyici:** Müşteri kabul etti, toplantı yapıldı.

| Adım | Çıktı |
|------|-------|
| `client-onboarding` skill | `C:/Users/EAS/Desktop/armut/<proje-adi>/` |
| Proje `CLAUDE.md` | Sektör + müşteri + tech stack + özel notlar |
| `scope.md` | Kapsam + revizyon + teslim tanımı |
| `timeline.md` | Milestone + teslim tarihleri |

---

### Stage 1.5: Tech Detection (otomatik)

**Tetikleyici:** Stage 0 bitti, otomatik zincir.

Brief metninden keyword çıkar:

| Tespit edilen | Sonuç |
|---------------|-------|
| `mucevher` / `kuyum` / `altın` | sector = mucevher |
| `kuaför` / `berber` | sector = kuafor |
| `inşaat` / `şantiye` / `CRM` | sector = insaat |
| `restoran` / `yemek` | sector = restoran |
| (10 sektör anahtar listesi) | — |
| Bütçe < 7.500 TL | tier = ultra-budget |
| 7.500 – 15.000 | tier = budget |
| 15.000 – 25.000 | tier = mid |
| 25.000 – 80.000 | tier = premium |
| 80.000+ | tier = enterprise |
| `3d viewer` / `ar` / `configurator` | tier = premium (zorla) |
| `multi-tenant` / `sla` | tier = enterprise (zorla) |

**Çıktı:** Memory'ye kaydet: `{tier, sector, features[]}`.

---

### Stage 3.7: Design Council

**Tetikleyici:** Stage 1.5 bitti.
**Komut:** `/design-council <proje-adi> <brief>`

| Tur | İş |
|-----|-----|
| 1 | 12 uzman agent paralel görüş (typography / palette / layout / motion / header / hero / kpi / pipeline / chart / interaction / footer / 3d) |
| 2 | Karşılıklı inceleme, çelişki tespit, revize |
| 3 | `design-director` 3 combo çıkarır (A safe / B edge / C hybrid) |
| 4 | `adversary` + repeat-guard + accessibility + yasaklı ID kontrol |
| 5 | Kullanıcıya sun (A/B/C) |

**Yeni agent eklenecek (Faz 0.5 draft):**
- `seo-expert` (13 decision criteria)
- `accessibility-expert` (WCAG 2.2 AA)
- `performance-expert` (Lighthouse ≥ 90)
- `claude-design-liaison` (Stage 3.75 hook)

Toplam: **14 agent aktif + 4 draft = 18 agent potansiyel**.

**[APPROVAL 1]:** Sen A/B/C'den birini seçmezsen pipeline durur.

---

### Stage 3.75: Claude Design Handoff (opsiyonel)

**Tetikleyici:** Design Council bitti + müşteri Tier 3+ + "özel tasarım istiyorum".

- Sorulur: **"Claude Design'da prototip (claude.ai/design) yapmak ister misin?"**
- **Evet** → claude.ai/design link + `claude-design-liaison` agent
- **Hayır** → Stage 3.8

Tier 1-2 müşterilerde bu stage tamamen atlanır (token ekonomisi).

**Bundle format:** JSON (component tree) + CSS vars + font imports + atom ID mapping.

---

### Stage 3.8: Catalog Query + Scaffold

**Tetikleyici:** Design Council onaylandı (otomatik).

1. `catalog-query` skill otomatik tetiklenir
2. Girdi: brief + Stage 1.5 tech detect
3. Çıktı: **3 preset öneri (A Safe / B Edge / C Hybrid)**
4. Her öneri için:
   - Preset ID (`mucevher-editorial-luxury` gibi)
   - Rationale (neden seçildi)
   - Repeat skor (mevcut 13 proje ile eşleşme)
   - Anti-cliché violation (varsa)
5. `validate-combo.js` her öneri üzerinde 4 kontrol:
   - Yasaklı ID (TY1/2/4/8, PL1, K1, HR2, T6 vb.)
   - Forbidden combo (matrix ✗)
   - Repeat-guard (8+ eşleşme = red)
   - Stil-sektör uyumsuzluk

**[APPROVAL 2]:** Sen A/B/C'den birini seçmezsen pipeline durur.

Recipe'a göre scaffold CLI çağrılır:

| Recipe | CLI |
|--------|-----|
| `next-premium` / `next-r3f` | `scaffold.js` |
| `wordpress-elementor-motion` | `scaffold/wordpress-elementor/scaffold-wp.js` |
| `shopify-hydrogen` | `scaffold/shopify-hydrogen/scaffold-shopify.js` |
| `next-enterprise-monorepo` | `scaffold/enterprise-monorepo/scaffold-enterprise.js` |

---

### Stage 4: Scaffold Execution

**Tetikleyici:** Preset seçimi yapıldı.

```bash
cd <proje-klasor>/
pnpm install       # ~2 dk
pnpm dev           # localhost:3000
```

Çıktı:
- `<proje>/` — çalışan Next.js / WordPress / Shopify / Enterprise
- `<proje>/combo.md` — final combo kaydı
- `<proje>/preset.yaml` — preset metadata
- `<proje>/LOG.md` — progress trace
- `<proje>/CLAUDE.md` — proje-spesifik kurallar
- `<proje>/.env.example` — env template

---

### Stage 5: Polish

**Tetikleyici:** Dev server ayakta.

- `frontend-design` skill → UI/UX kalite kontrol
- `e-commerce-builder` (e-ticaret varsa)
- `3d-site-builder` (3D varsa)
- Feature tamamlama: wishlist / favori / karşılaştırma / cart / randevu
- **Lighthouse ≥ 90** (Performance + Accessibility + Best Practices + SEO)
- **WCAG 2.1 AA** (axe-core pass)
- 3 breakpoint görsel test (375/768/1280)
- Türkçe karakter test (`ı`, `İ`, `ğ`, `ş`, `ç`, `ö`, `ü`)

---

### Stage 6: SEO Chain

**Tetikleyici:** Sayfalar hazır.

Zincir (3 skill otomatik):
1. `seo-audit` → teknik SEO (meta, canonical, sitemap, robots)
2. `schema-markup` → JSON-LD (Product, LocalBusiness, FAQ, Breadcrumb)
3. `site-architecture` → URL yapısı, internal linking, breadcrumb

Sektör'e göre zorunlu schema:

| Sektör | Schema |
|--------|--------|
| E-ticaret | Product + Offer + AggregateRating + Brand + Breadcrumb |
| Kuaför/Berber | LocalBusiness + OpeningHours + Service |
| Klinik | MedicalBusiness + Physician + MedicalProcedure |
| Restoran | Restaurant + Menu + OpeningHours |
| Otel | LodgingBusiness + Room |
| Fotoğraf | Organization + CreativeWork portfolio |

---

### Stage 6.75 + 6.8 (Faz 5 ekleme)

**6.75 — Claude Design Handoff (final polish):**
Önce (3.75) prototip aldıysan, şimdi son tasarım revizyonu handoff bundle ile gelebilir.

**6.8 — Catalog Query (refresh):**
Feature eklendikten sonra compatibility.yaml ve repeat-guard yeniden kontrol edilir. Yeni feature eski preset'i ihlal ediyorsa uyarı.

---

### Stage 7: QA Guard

**Tetikleyici:** Stage 6 bitti.

- `code-reviewer` skill **ZORUNLU** (launch-strategy'den önce)
- Güvenlik kontrolü:
  - Input validation (XSS, SQL injection, IDOR)
  - Secret protection (.env, API key frontend'de yok)
  - Auth güvenliği (bcrypt/argon2, rate limit, session expire)
  - Data isolation (multi-user ownership check)
- Performans kontrolü:
  - Bundle size < 300KB (initial load)
  - LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Pass zorunlu** (FAIL → fix → retry).

---

### Stage 8: Launch

**Tetikleyici:** Stage 7 PASS.

- `launch-strategy` skill tetikle
- Deploy:
  - Next.js → Vercel / Cloudflare Pages
  - WordPress → Kinsta / shared hosting
  - Shopify → Oxygen custom storefront
  - Enterprise → GCP/AWS/Azure + Docker + CI/CD
- Domain bağla, SSL aktif et
- Google Search Console + Analytics (GA4 + Vercel Analytics)
- Monitoring: Sentry + UptimeRobot
- Müşteri teslim:
  - Deploy URL
  - Admin credentials
  - 5-10 dk yönetim paneli kullanım videosu

---

## /project-start kullanımı

```
/project-start "<brief metni>"
```

**Örnek 1 — Mid tier Next.js:**
```
/project-start "Ankara mücevherci, premium e-ticaret, 3D ürün viewer, 25K TL bütçe, 2 Mayıs teslim"
```

Pipeline çalıştırır:
- Stage 1.5 → sector=mucevher, tier=premium, features=[e-commerce, 3d-viewer, wishlist]
- Stage 3.7 → design-council 14 agent
- Stage 3.8 → 3 preset (ör. mucevher-editorial-luxury / mucevher-immersive-3d / mucevher-warm-organic)
- [APPROVAL 2]
- Stage 4 → `scaffold.js mucevher-editorial-luxury --out ./ankara-mucevher/`
- ... Stage 8'e kadar zincir

**Örnek 2 — Budget WordPress:**
```
/project-start "Kadıköy berber, 12K TL, randevu sistemi, WhatsApp, 1 hafta teslim"
```
- tier = budget → recipe = wordpress-elementor-motion
- scaffold-wp.js kullanılır

**Örnek 3 — Enterprise:**
```
/project-start "SaaS enterprise dashboard, multi-tenant, KVKK, 90K TL"
```
- tier = enterprise → scaffold-enterprise.js
- Turborepo + apps/web + apps/admin + apps/api + observability

---

## 5 gerçek senaryo

### Senaryo 1 — Armut ilanından Next.js (25K TL mücevherci)

**Brief:**
> "Ankara merkezli kuyumcu. Nişan/alyans + tektaş + kolye-küpe. iyzico ödeme, KVKK, Instagram feed, WhatsApp, 3D ürün viewer. 25K TL bütçe. Teslim 8 hafta."

**Beklenen:**
- Stage 1.5: `sector=mucevher, tier=premium, features=[e-commerce, 3d-viewer, iyzico, kvkk, instagram, whatsapp]`
- Stage 3.7: design-council → combo A (editorial-luxury) / B (immersive-3d) / C (warm-organic)
- Stage 3.8: preset öneri
  - A: `mucevher-editorial-luxury` (repeat skor 1/15, PL22 Tobacco+Pearl)
  - B: `mucevher-immersive-3d` (repeat skor 0, R3F + MeshTransmissionMaterial)
  - C: `mucevher-warm-organic` (repeat skor 2)
- Stage 4: `scaffold.js mucevher-editorial-luxury --out ./fatih-bey-v2/`
- Stage 5: wishlist + iyzico + instagram feed + 3D viewer + AR try-on
- Stage 6: Product + Offer + AggregateRating JSON-LD
- Stage 7: code-review (IDOR, Supabase RLS, env var kontrolü)
- Stage 8: Vercel deploy + fatih-bey-mucevher.com

**Süre tahmini:** 30 dk pipeline + 3-5 hafta geliştirme + 1 gün launch = toplam 3-5 hafta teslim.

---

### Senaryo 2 — KADIKOY soğuk satış (7K TL kuaför)

**Brief:**
> "Kadıköy kuaför Freeman. 7K TL bütçe. Online randevu, WhatsApp, Instagram feed, 5 hizmet fiyat listesi, maps location, 3 gün teslim."

**Beklenen:**
- Stage 1.5: `sector=kuafor, tier=ultra-budget+ (7K sınır, manuel budget'a çıkar), features=[randevu, whatsapp, instagram, maps]`
- Stage 3.7: design-council
  - A: `kuafor-minimal-swiss` (default ✓✓)
  - B: `kuafor-warm-organic` (alternatif sıcak)
  - C: `kuafor-kinetic-agency` (edge)
- Stage 3.8: A seçildi (repeat skor 0)
- Stage 4: `scaffold-wp.js kuafor-minimal-swiss --out ./freeman-kuafor/`
- Stage 5: Elementor template import + online randevu (Bookly plugin)
- Stage 6: LocalBusiness + Service + OpeningHours JSON-LD
- Stage 7: Wordfence + 2FA + KVKK banner
- Stage 8: Kinsta/GoDaddy + SSL

**Süre tahmini:** 30 dk pipeline + 3-5 gün geliştirme.

---

### Senaryo 3 — Fatih Bey feature ekleme (mevcut projeye wishlist)

**Brief:**
> "Fatih Bey mücevher sitesine favori/wishlist ekle. Mevcut Next.js 16 + Supabase stack. Ek modül ücreti 2.500 TL."

**Pipeline bypass:**
- Mevcut `combo.md` var → design-council atlanır
- Stage 3.8 `catalog-query` çağrılır ama sadece feature validation için
- `ROUTING.yaml` → `features.wishlist` → `Mobilyacı/3d-demo/research/favori_sistem_tasarim.md`
- Skill zincir: `frontend-design` (component) + `e-commerce-builder` (cart integration) + `schema-markup` (ItemList schema)

**Süre:** 1 gün geliştirme.

---

### Senaryo 4 — Yeni sektör Premium (60K TL mobilya + AR)

**Brief:**
> "Eskişehir modern mobilya. Premium katalog + 3D viewer + AR try (WebXR). 60K TL. 2 ay teslim."

**Beklenen:**
- Stage 1.5: `sector=mobilya (yeni eklenecek), tier=premium, features=[e-commerce, 3d-viewer, ar, configurator]`
- **Önemli:** `mobilya` sektörü yoksa, `catalog/sectors/mobilya.yaml` önce yaratılır (Emre'nin onayı ile)
- Ya da geçici: `sector=eticaret` + `style=warm-organic` fallback
- Stage 3.8: preset öneri
  - A: `eticaret-warm-organic` (yoksa üret)
  - B: `eticaret-immersive-3d` (3D viewer zorla premium tier)
- Stage 4: `scaffold.js eticaret-immersive-3d --out ./eskisehir-mobilya/`
- Stage 5: Configurator (kumaş + boyut + renk) + AR try (iOS Quick Look + Android Scene Viewer)
- Stage 6: Product + 3DModel schema

**Süre tahmini:** 2 hafta yeni sektör onboarding + 2 ay geliştirme.

---

### Senaryo 5 — Enterprise multi-tenant (150K TL + SLA)

**Brief:**
> "SaaS inşaat CRM, multi-tenant (20+ şirket), KVKK + SLA, observability, GCP deploy. 150K TL. 3 ay."

**Beklenen:**
- Stage 1.5: `sector=insaat (SaaS variant), tier=enterprise, features=[multi-tenant, sla, observability, kvkk, dashboard]`
- Stage 3.7: design-council
  - A: `insaat-industrial-workwear` (default ✓✓ ama SaaS için adapt)
  - B: `insaat-data-dense-dashboard` (SaaS panel ideal)
  - C: `insaat-kinetic-agency` (landing page için)
- Stage 3.8: B seçildi (data-dense-dashboard SaaS CRUD için ideal)
- Stage 4: `scaffold-enterprise.js insaat-data-dense-dashboard --out ./construo-crm/`
  - Monorepo: apps/web (landing) + apps/admin (CRM) + apps/api
  - packages/ui + db + auth + config + observability
- Stage 5: Multi-tenant RLS + tenant_id her tabloda + SLA (99.9% uptime)
- Stage 6: Enterprise schema (SoftwareApplication + Organization)
- Stage 7: Observability (OpenTelemetry + Sentry + Prometheus) + pen-test
- Stage 8: GCP Cloud Run + Cloud SQL + Secret Manager + Cloudflare

**Süre tahmini:** 30 dk pipeline + 3 ay geliştirme.

---

## Skill zinciri — Otomatik (13 skill)

Pipeline içinde bu skill'ler otomatik tetiklenir:

| Stage | Skill | Zorunlu |
|-------|-------|---------|
| −1 | `armut-bidding` | Opsiyonel |
| −1 | `meeting-analysis` | Opsiyonel |
| 0 | `client-onboarding` | Evet |
| 3.7 | `design-council` (14 agent) | Evet |
| 3.75 | `claude-design-liaison` | Tier 3+ |
| 3.8 | `catalog-query` | Evet |
| 5 | `frontend-design` | Evet |
| 5 | `e-commerce-builder` | E-ticaret varsa |
| 5 | `3d-site-builder` | 3D varsa |
| 6 | `seo-audit` | Evet |
| 6 | `schema-markup` | Evet |
| 6 | `site-architecture` | Evet |
| 7 | `code-reviewer` | Evet (GUARD) |
| 8 | `launch-strategy` | Evet |

---

## Skill zinciri — Manuel (20 skill)

İhtiyaç duyulursa manuel çağır:

| Skill | Ne zaman |
|-------|----------|
| `site-replicator` | Referans URL paylaşıldı ("bu siteyi yap") |
| `client-proposal` | Teklif dokumanı gerek |
| `contract-proposal-writer` | Sözleşme imza öncesi |
| `invoice-tracker` | Ödeme kaydı |
| `product-manager-toolkit` | PRD / RICE / discovery |
| `content-strategy` | Blog + icerik plani |
| `programmatic-seo` | Toplu SEO sayfa |
| `pricing-strategy` | SaaS fiyatlandırma |
| `rag-architect` | Vektör/embedding sistemi |
| `claude-api` | Anthropic SDK kullanımı |
| `docker-development` | Container + compose |
| `api-design-reviewer` | REST/GraphQL review |
| `pr-review-expert` | GitHub PR review |
| `mcp-builder` | MCP server |
| `senior-prompt-engineer` | Prompt optimizasyon |
| `weekly-summary` | Haftalık rapor |
| `skill-creator` | Yeni skill |
| `docx` / `pdf` / `pptx` / `xlsx` | Dokuman isleme |

---

## 7 Approval Gate

Pipeline'da sen 7 noktada onay verirsin, vermezsen zincir durur:

| # | Stage | Ne onaylanır |
|---|-------|--------------|
| 1 | −1 | Armut teklif mesajı (gönderim öncesi) |
| 2 | 1 | Meeting transkript (ilk 500 kelime) |
| 3 | 2 | 12-bölüm analiz PDF |
| 4 | 3 | 17 dokuman + PPTX ek sunum |
| 5 | 3.7 | 3 combo A/B/C (design-council çıktısı) |
| 6 | 3.8 | 3 preset A/B/C (catalog-query çıktısı) |
| 7 | 8 | Deploy öncesi son kontrol |

Her biri Claude Code'un stop → sana sorma → senin "devam" cevabı ile açılır.

---

## Özel durumlar

### Bütçe < 7.5K TL (Ultra-Budget)
- Hazır template swap (scaffold.js template-swap modu)
- Manuel tasarım yok, logo + renk + metin swap
- 1-2 günde teslim

### 3D Feature var
- Stage 3.7'de `immersive-3d-expert` agent katılır
- Recipe: `next-r3f` (Tier 3+)
- `3d-site-builder` Stage 5'te ek polish
- Model asset prep: glb/gltf + Draco compression

### KVKK (Türkiye)
- Türkçe yasal banner zorunlu
- Cookie banner (granular consent)
- İletişim formunda "KVKK onayla" checkbox
- `yasal_uyumluluk_denetim.md` research kontrol

### Multi-Tenant (SaaS)
- Enterprise-monorepo recipe zorunlu
- Workspace: apps/web + apps/admin + apps/api
- RLS aktif, tenant_id her tabloda
- Observability: OpenTelemetry + Sentry + Prometheus

---

## Bypass — Pipeline atla

```
/project-start "pipeline atla, direkt scaffold kuafor-warm-organic"
```

Kullanıcı "pipeline atla" veya "skip stages" derse → otomatik zincir atlanır, manuel mod aktif.

**Manuel scaffold:**
```bash
node scaffold.js <preset-id> --out <path> --force
```

---

## Çıktı teslim kriterleri

Pipeline bittiğinde:

- [ ] Proje klasörü hazır (`pnpm install + pnpm dev` çalışır)
- [ ] `combo.md` + `preset.yaml` kayıtlı
- [ ] Vercel preview URL (opsiyonel canlı link)
- [ ] Lighthouse ≥ 90 tüm kategoriler
- [ ] WCAG 2.1 AA pass (axe-core)
- [ ] Security audit PASS (code-reviewer)
- [ ] SEO chain tamam (meta + schema + sitemap)
- [ ] 3 breakpoint test (375/768/1280)
- [ ] Türkçe karakter test (`ı İ ğ ş ç ö ü`)
- [ ] Müşteri teslim paketi (credentials + kılavuz video)

---

## Diğer dokümanlar

| Doküman | Bağlantı |
|---------|----------|
| Hızlı başlangıç | [README.md](README.md) |
| YAML schema | [CATALOG-STRUCTURE.md](CATALOG-STRUCTURE.md) |
| Hata → çözüm | [TROUBLESHOOT.md](TROUBLESHOOT.md) |
| Mimari + faz | [SYSTEM-OVERVIEW.md](SYSTEM-OVERVIEW.md) |
| Ana pipeline (global) | [../../../SITE-GELISTIRME-PIPELINE.md](../../../SITE-GELISTIRME-PIPELINE.md) |
| Slash komut tanım | [~/.claude/commands/project-start.md](~/.claude/commands/project-start.md) |
