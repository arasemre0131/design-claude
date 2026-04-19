# insaat-crm (CONSTRUO / Yıldız İnşaat Ankara) — Design Council Combo

**Tarih:** 2026-04-18
**Council tur sayısı:** 3 görüş + 1 adversary (simüle — gerçek 14-agent run için `/design-council insaat-crm` komutu yeterli)
**Brief:** İnşaat CRM — WhatsApp + Instagram + Evolution API lead toplama, Monday-tarzı kanban pipeline, Ollama (qwen2.5:7b) otomatik yanıt, n8n workflow, satış temsilcileri dashboard, Next.js 16 + Tailwind v4 + shadcn/ui, Türkçe, mobile-friendly.

---

## COMBO A · "Safe & Proven" (tanıdık ama tekrarsız)

| Kategori | ID | Seçim | Neden |
|----------|-----|-------|-------|
| Header | **H9** | Corner Brackets + Timestamp | Inşaat/şantiye "observatory" hissi; köşe bracket'ler technical karakter |
| Nav | **N5** | Command Palette Only | Power-user satış temsilcisi; visible menü yok, ⌘K ile tüm ekranlar |
| Hero | **HR14** | Receipt-Strip Zero-Hero | Dashboard için hero gereksiz; direkt canlı inbox feed ile giriş |
| KPI | **K2** | Band with Horizontal Rules | Hairline kural ile 4 metrik; kart yok, minimum sinyal |
| Pipeline | **P8** | Dense Table (Linear-style) | 50+ lead için keyboard-first, virtualization var |
| Table | **T2** | Linear Issue Dense | Pipeline ile uyumlu, satır-satır kompakt |
| Chat | **C3** | Email Threaded (Gmail tarzı) | WA+IG+email birleşik, konuşma thread olarak |
| Chart | **CH10** | Sparkline-Only Minimal | Dashboard zaten dense; grafik büyük değil, inline |
| Form | **F4** | Inline Edit | Lead kartı üzerinde click-to-edit, modal açma gereksiz |
| Modal | **M5** | Inline Expand | Satır genişler, overlay yok |
| Footer | **FT5** | Contact Card Tek Satır | Dashboard footer minimal |
| Typography | **TY12** | Migra Italic + IBM Plex Sans + Berkeley Mono | Variable axis Migra display, IBM Plex dengeli body, Berkeley Mono data — hiçbir projede kullanılmadı |
| Palette | **PL19** | Steel + Copper | `#E0E2E5` cool gray + `#B87333` copper + `#5F6C7B` steel — industrial-chic, inşaat sektörüne uygun, hiç kullanılmadı |
| Layout | **L7** | Sticky Sidebar + Feed | Sol sabit context + sağ canlı akış |
| Motion | **MO3 + MO4** | CSS scroll-driven (native) + Framer Motion v12 | 2026 native, Framer reactive patterns |

**Repeat skoru:** 2/15 (sadece T2 + MO4 kısmi eşleşme — v1-CONSTRUO ile)
**Adversary:** ✓ ONAY — yasaklı ID yok, sektör uyumu ✓, accessibility kontrast AA geçer

---

## COMBO B · "Edge / Risky" (cesur, zero-recycle)

| Kategori | ID | Seçim | Neden |
|----------|-----|-------|-------|
| Header | **H1** | Plate + Hazard Strip | Şantiye giriş plakası tarzı; sarı-siyah hazard şeridi üst-alt — inşaatla direkt bağ |
| Nav | **N4** | Mega Menu Full-Width | Proje / müşteri / ekip / sözleşme / şantiye / rapor sütunları |
| Hero | **HR9** | Interactive Map Hero | Yıldız İnşaat'ın Ankara proje lokasyonları haritada, hover'da lead sayısı |
| KPI | **K9** | Barometer / Dial | Retro analog gauge — "satış basıncı", "pipeline sıcaklığı" |
| Pipeline | **P5** | Horizontal Timeline | Scroll-locked timeline, şantiye milestone gibi lead aşamaları |
| Table | **T7** | Receipt Strip | Transaction list kompakt — son 50 etkileşim |
| Chat | **C4** | Terminal Log (mono dense) | Power-user log tarzı, IRC hissi, satır-satır mesaj dump |
| Chart | **CH5** | Apache ECharts (enterprise) | Heavy charts — sankey (lead kaynağından kapanışa akış) |
| Form | **F3** | Wizard Steps | Yeni lead girişi step-by-step, mobile-uyumlu |
| Modal | **M3** | Bottom Sheet (mobile-first) | Satış temsilcisi saha telefonu → bottom sheet |
| Footer | **FT8** | Slab Dark Info-Strip | Siyah slab bilgi şeridi + hazard kenar |
| Typography | **TY11** | Archivo Black + Geist Sans + Stardos Stencil | Condensed industrial — mockup-C ailesi |
| Palette | **PL4** | Concrete Industrial | `#D4CFC4` beton + `#E85D04` safety orange + `#F5C400` hazard |
| Layout | **L4** | Full-Bleed Horizontal Rails | Cinematic, harita + timeline full-width |
| Motion | **MO2** | Lenis Smooth + Scroll-Linked Pin | Timeline scroll-lock için |

**Repeat skoru:** 4/15 (H1, FT8, TY11, PL4 — hepsi mockup-C ile; mockup-C production olmadığı için kabul)
**Adversary:** ⚠ KOŞULLU ONAY — industrial palette tekrar riski, ama sektörle doğal bağ olduğu için kabul
**Risk:** Müşteri "çok şantiyevari" bulabilir; önce demo göster.

---

## COMBO C · "Hybrid" (blueprint + engineering ruhu)

| Kategori | ID | Seçim | Neden |
|----------|-----|-------|-------|
| Header | **H9** | Corner Brackets + Timestamp | A'dan alındı — technical observatory |
| Nav | **N5** | Command Palette Only | A'dan alındı — power-user akış |
| Hero | **HR13** | Blueprint Title Block | Teknik çizim title block, mimari dokuman hissi |
| KPI | **K12** | Columns Chart as KPI | Mini bar chart, edebi görünüm — v2-blueprint'ten esin ama ID farklı (K4 yerine K12) |
| Pipeline | **P5** | Horizontal Timeline | B'den alındı |
| Table | **T3** | Spec Sheet (engineering BOM) | Lead'ler = malzeme listesi metaforu |
| Chat | **C3** | Email Threaded | A'dan alındı |
| Chart | **CH6** | Column Bar Elevation | Blueprint tarzı bar chart |
| Form | **F5** | Table Cell Edit | Spreadsheet inline |
| Modal | **M5** | Inline Expand | Satır genişler |
| Footer | **FT6** | Signature Block (engineering title) | Blueprint foot |
| Typography | **TY14** | Monument Extended + Inter Tight + JetBrains Mono | Monument condensed display, Inter Tight (Inter DEĞİL) dengeli body — hiç kullanılmadı |
| Palette | **PL11** | Tobacco + Clay | `#2A1F14` + `#D9A066` tan + `#A0522D` sienna — industrial warm, deri/eski arşiv hissi |
| Layout | **L6** | Center Single Column | Long-read + dense table altı |
| Motion | **MO1 + MO3** | GSAP ScrollTrigger + CSS scroll-driven | Scroll pin + native scroll animation |

**Repeat skoru:** 4/15 (HR13, T3, FT6, MO1 — v2-blueprint ile ama typo ve palette tamamen farklı, karakter ayrı)
**Adversary:** ✓ ONAY — "blueprint" ruhu var ama tobacco+clay ile yeni kimlik

---

## Council Notları

### Agent anlaşmazlıkları (tartışmadan çıkan)
- **typography ↔ palette:** Monument Extended (TY14) sıkı sıkışık karakter, PL11 tobacco düşük kontrast riski → A/AA geçiyor ancak PL11'de body text `#2A1F14` zemin üstüne `#D9A066` değil, açık krem kullan
- **motion ↔ 3d:** 3D canvas council'e dahil edilmedi — inşaat CRM'de 3D overkill, satış temsilcisinin saha bandwidth'i sınırlı
- **header ↔ nav:** H9 corner brackets + N5 command palette uyumu: H9 minimal, N5 tamamen hidden → pürüzsüz
- **hero ↔ layout:** HR14 (zero-hero) + L7 (sticky sidebar feed) Combo A'da mükemmel; HR9 (interactive map) + L4 (full-bleed rail) Combo B'de zorunlu

### Tercih soruları (kullanıcıya)
1. **Saha kullanımı:** Satış temsilcileri çoğunlukla mobile'da mı? Evet → Combo B (M3 bottom sheet) avantajlı.
2. **Müşteri demo:** Fatih Bey'e göstereceksen Combo A (safe), kendi ofis kullanım için Combo B (cesur) daha iyi.
3. **Sektör imaj:** "Şantiyevari endüstriyel" ton mu, "beyaz yakalı analitik" ton mu? İlkinde Combo B, ikincisinde Combo A/C.
4. **v2-blueprint demo'suyla paralel geliştirme planı var mı?** Varsa Combo C'den kaçın (stil karışır).

### Repeat-Guard Özeti

| Combo | En yüksek eşleşme | Karşı proje | Sonuç |
|-------|-------------------|-------------|-------|
| A | 2/15 | v1-CONSTRUO | ✓ Yeterince farklı |
| B | 4/15 | mockup-C | ⚠ Industrial ailesi, ama mockup-C prod değil |
| C | 4/15 | v2-blueprint | ✓ Typography + palette farklı, ruh benzer |

### Yasaklı ID Kullanımı
Üç combo'da da: **yok** (TY1/2/4/8, PL1, K1, HR2, T6, CH1, H8 hiçbirinde).

---

## ONAY BEKLİYOR

Hangisini seçeceksen — **A / B / C / hybrid (A+B parçaları) / reject** — onayından sonra:
1. Combo satırı `DESIGN-PATHWAYS.md` § PROJECT MATRIX'e eklenir
2. `insaat-crm/apps/web/src/` altında component'ler bu combo'nun her bir ID'sinden türetilir
3. Her component başında yorum: `// DESIGN-COUNCIL COMBO: insaat-crm [H9+N5+HR14+...]`
4. Mevcut `design-claude/index.html` (v1) iptal

---

### NOT — Simülasyon vs Gerçek Run

Bu combo tablosu **simülasyon**: ben (ana Claude) 14 agent'ın rolünü üstlenerek kuralları uyguladım. Gerçek 3-tur paralel agent run için:

```
/design-council insaat-crm "İnşaat CRM, Ankara Yıldız İnşaat, WA+IG+Evolution, kanban+Ollama, saha satış temsilcileri, Next.js 16"
```

Gerçek agent'lar DESIGN-PATHWAYS.md'yi okur, kendi alan uzmanlığıyla 3 aday öner, çelişkileri tartışır, farklı görüşler çıkarabilir — bu combo değişebilir. Simülasyon referans niteliğinde.
