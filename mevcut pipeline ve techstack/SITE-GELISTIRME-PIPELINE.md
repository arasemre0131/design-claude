# Site Geliştirme Pipeline v2 — Toplantıdan Teslime
# Meeting Analysis → Referans Analiz → 3D/Animasyon Tespit → Özelleştirme → Sunum → Geliştirme
# Son güncelleme: 2026-03-21

---

## GENEL AKIS

```
TOPLANTI SES DOSYASI
    ↓
[1] TOPLANTI ANALİZİ — meeting-analysis skill (17 doküman + PDF rapor)
    ↓
[2] PROJE BRIEF + 3D/ANİMASYON TESPİT — transkriptten keyword tarama
    ↓
[3] REFERANS SITE ANALIZI — site-replicator + WebFetch/Firecrawl (canlı scrape)
    ↓
[4] TRANSKRIPT UYUMLULUK KONTROLÜ #1 — referans vs müşteri kararları
    ↓ (uyumsuzluk varsa düzelt)
[5] ÖZELLEŞTIRME — müşteri kararları + 3D teknoloji seçimi uygulanır
    ↓
[5.5] GELİŞTİRME ÖNERİLERİ + PPTX SUNUM — biz ne ekleyebiliriz?
    ↓ (müşteriye sun, onay al, onay olmadan devam etme)
[6] TRANSKRIPT UYUMLULUK KONTROLÜ #2 — final kontrol (onaylanan öneriler dahil)
    ↓ (PASS ise devam, FAIL ise 5'e dön)
[6.5] DESIGN COUNCIL — 14 uzman agent, 3 tur, 3 combo, adversary onayı (ZORUNLU)
    ↓ (combo.md kaydedilmeden Aşama 7'ye geçilemez)
[7] GELİŞTİRME — 32 skill ile kod yazımı (combo.md'ye sadık)
    ↓
[8] HER YENİ TOPLANTIDA — tekrar analiz + uyumluluk kontrolü + scope güncelle
    ↓
TEST + DEPLOY
```

---

## AŞAMA 1: TOPLANTI ANALİZİ

### Tetikleyici
Müşteri toplantısı yapıldığında veya ses dosyası paylaşıldığında.

### Kullanılacak Skill
`meeting-analysis` — tam pipeline (Stage 0→1→2→3)

### Çıktılar (17 doküman)
Bu aşamadan çıkan ve site geliştirmede KULLANILACAK dokümanlar:

| Doküman | Site Geliştirmede Kullanımı | Hangi Aşamaya Gider |
|---------|---------------------------|---------------------|
| `kapsam_belgesi.md` | Yapılacak/yapılmayacak listesi → scope | Aşama 2 (brief) |
| `teknik_gereksinimler.md` | Tech stack, özellikler → feature list | Aşama 2 (brief) + Aşama 7 (dev) |
| `tasarim_brief.md` | Referans siteler, renk/font tercihleri → design tokens | Aşama 3 (referans) + Aşama 5 (özelleştirme) |
| `icerik_gereksinimleri.md` | Fotoğraf, logo, metin → asset checklist | Aşama 7 (dev) |
| `odeme_plani.md` | Fiyat, taksit → invoice-tracker | Aşama 7 (invoice-tracker skill) |
| `soru_formu.md` | Müşteriden beklenen bilgiler | Aşama 2 (brief — eksik bilgiler) |
| `ic_analiz.md` | Müşteri profili → iletişim stratejisi | Aşama 5.5 (sunum tonu ayarı) |
| `ic_finansal.md` | Maliyet/kar → bütçe kararları | Aşama 5.5 (upsell fiyatlandırma) |
| `aksiyon_takip.md` | Kim ne yapacak → görev takibi | Aşama 7 (dev sıralaması) |

### PDF Analiz Raporu → Pipeline Bağlantısı
Meeting-analysis'in ürettiği PDF raporu (11 bölüm) pipeline'ın GİRİŞ VERİSİDİR:

| PDF Bölümü | Pipeline'da Nerede Kullanılır |
|-----------|------------------------------|
| 1. Yönetici Özeti | Aşama 2 — proje brief özeti |
| 2. Detaylı Toplantı Anlatımı | Aşama 2 — kronolojik kararlar |
| 3. Kararlar ve Anlaşmalar | Aşama 2 — OLACAK/OLMAYACAK listesi |
| 4. Aksiyon Planı | Aşama 7 — görev sıralaması |
| 5. Kritik Bilgiler (Finansal/Teknik/Kişiler) | Aşama 2 (brief) + Aşama 5 (teknik) + Aşama 5.5 (fiyat) |
| 6. Fırsatlar ve Stratejik İçgörüler | Aşama 5.5 — upsell önerileri |
| 7. Riskler ve Uyarılar | Aşama 6 — kontrol listesi |
| 8. Araştırılması Gerekenler | Aşama 3 — referans araştırma konuları |
| 9. İlişki ve İletişim Dinamikleri | Aşama 5.5 — sunum tonu/yaklaşım |
| 10. Önemli Alıntılar | Aşama 4 — uyumluluk kontrolü referansları |
| 11. Öneriler | Aşama 5.5 — strateji |

---

## AŞAMA 2: PROJE BRIEF + 3D/ANİMASYON TESPİT

### Tetikleyici
Toplantı analizi tamamlandığında.

### Süreç

**A) Proje Brief Oluşturma:**
1. Transkript(ler)i tam oku
2. PDF analiz raporunu oku
3. Müşterinin BİREBİR söylediklerini çıkar (alıntılarla)
4. Net kararları listele (OLACAK / OLMAYACAK)
5. Belirsiz/çelişkili noktaları işaretle

**B) 3D / Animasyon Keyword Taraması:**
Transkriptte aşağıdaki keyword'ler geçiyor mu tara:

```
3D KEYWORDS (herhangi biri geçerse 3D-TECHSTACK.md'ye bak):
- "3 boyutlu", "3D", "üç boyutlu"
- "dönen görsel", "360 derece", "döndürme"
- "animasyon", "animasyonlu", "hareketli"
- "interaktif", "etkileşimli"
- "AR", "artırılmış gerçeklik", "sanal deneme"
- "cam efekti", "şeffaf", "kristal"
- "parçacık", "particle"
- "scroll animasyon", "kaydırma efekti"

GENEL GELİŞMİŞ UI KEYWORDS:
- "modern", "çağdaş", "lüks görünüm"
- "hızlı", "performanslı", "akıcı"
- "mobil öncelikli", "telefonda iyi"
- "profesyonel", "kurumsal"
```

**C) 3D Teknoloji Eşleştirme:**
Keyword tespit edilirse → `C:/Users/EAS/Desktop/armut/3D-TECHSTACK.md` oku → sektöre ve isteğe göre en uygun teknolojiyi seç:

| Müşteri Ne Dedi | 3D-TECHSTACK'ten Seçilecek | Sektör Dosyası |
|----------------|---------------------------|----------------|
| "dönen görsel" / "360" | 360° spin viewer VEYA R3F OrbitControls | jewelry-photography-web.md |
| "3 boyutlu ürün" | R3F + drei + useGLTF | 3d-product-configurator-research.md |
| "animasyonlu site" | GSAP + Lenis + Framer Motion | motion-design-principles-3d.md |
| "cam efekti" | MeshTransmissionMaterial | drei-MeshTransmissionMaterial-research.md |
| "AR deneme" | model-viewer + WebXR | ar-furniture-ecommerce-research.md |
| "interaktif" | ScrollTrigger + useFrame | scroll-animation-patterns.md |
| "modern görünüm" | Glass morphism + custom cursor | tailwind-v4-3d-overlay-patterns.md |
| "hızlı site" | PerformanceMonitor + AdaptiveDpr | responsive-mobile-optimization-r3f.md |
| "lüks" | Dark theme + gold accents + Bloom | color-theory-3d-design.md |

### Çıktı
`[proje-klasoru]/proje-brief.md` — içerik:
- Proje özeti (müşteri, fiyat, teslim, ödeme)
- Müşterinin net kararları (birebir alıntılarla)
- Teknik spesifikasyonlar (transkriptten)
- UI/UX tercihleri (transkriptten)
- Referans siteler (müşterinin söylediği)
- OLMAYACAK özellikler (müşterinin reddettiği)
- **3D/Animasyon Tespit Sonucu** — keyword + eşleşen teknoloji + research dosyası
- Eksik bilgiler (henüz gelmemiş)
- Takvim

### Kural
**UYDURMA YOK.** Brief'te sadece toplantıda konuşulan bilgiler olacak. Müşterinin söylemediği hiçbir şey eklenmeyecek. Tahminler varsa açıkça "[tahmin — teyit alınmadı]" işaretle.

---

## AŞAMA 3: REFERANS SİTE ANALİZİ

### Tetikleyici
Proje brief'te referans site belirtildiğinde.

### Kullanılacak Skill
`site-replicator` — Stage 0 (ön analiz) + Stage 1 (design token extraction)

### Süreç
1. Referans siteyi WebFetch/Firecrawl ile scrape et
2. Gerçek veriler çıkar:
   - Renk paleti (hex kodları)
   - Tipografi (font, size, weight)
   - Layout yapısı (grid, spacing)
   - Navigasyon (menü yapısı, dropdown stili)
   - Ürün sayfası layout (sol/sağ, konfigüratör)
   - Mobil deneyim
   - Animasyon/interaction pattern'leri
   - **3D/WebGL kullanımı** (varsa teknoloji tespit et)
3. Branding format kullan (firecrawl_scrape branding varsa)
4. Screenshot al (desktop + mobil)
5. **PDF Bölüm 8 (Araştırılması Gerekenler)** kontrol et — ek araştırma konuları var mı?

### Çıktı
`[proje-klasoru]/referans-analiz.md` — içerik:
- Tech stack
- Renk paleti (gerçek hex)
- Tipografi (gerçek font/size)
- Navigasyon yapısı
- Sayfa yapıları (homepage, kategori, ürün)
- Konfigüratör analizi
- 3D/animasyon kullanımı (varsa)
- OLMAYAN özellikler (fırsat alanları)
- Screenshot'lar

---

## AŞAMA 4: TRANSKRIPT UYUMLULUK KONTROLÜ #1

### Tetikleyici
Referans site analizi tamamlandığında.

### Süreç
Transkripti TEKRAR oku ve referans analizle karşılaştır:

```
Her referans site özelliği için:
  1. Müşteri bu özelliği istedi mi? → Transkriptte ara
  2. Müşteri bu özelliği REDDETTİ mi? → Transkriptte ara
  3. Müşteri bu konuda HİÇ konuşmadı mı? → İşaretle

Sonuç tablosu oluştur:
| Özellik | Referansta | Müşteri İstedi | Müşteri Reddetti | Konuşulmadı |
```

**PDF Bölüm 10 (Önemli Alıntılar)** kullan — müşterinin net sözlerini referans al.

### Çıktı
`[proje-klasoru]/uyumluluk-kontrolu-1.md`

### Eylem
- ✅ İstenen özellikler → development scope'a ekle
- ❌ Reddedilen özellikler → ÇIKAR, yapma
- ⚠️ Konuşulmayan özellikler → Aşama 5.5'te önerilecek

---

## AŞAMA 5: ÖZELLEŞTİRME

### Tetikleyici
Uyumluluk kontrolü tamamlandığında.

### Süreç
Site-replicator'ın çıkardığı design tokenları müşteri kararlarına göre düzenle:

1. **Renk paleti:** Müşteriden logo/brand geldi mi? Geldiyse onları kullan. Gelmediyse referansın paletini başlangıç noktası al.
2. **Font:** Müşteri tercih belirtti mi? Belirtmediyse referansınkini kullan.
3. **Konfigüratör:** Müşterinin istediği parametreleri (transkriptten) birebir uygula. Referansta olan ama müşterinin istemediği parametreleri ÇIKAR.
4. **Sayfa yapısı:** Müşterinin "şu tarafa dönen görsel, bu tarafa seçim" gibi net isteklerini uygula.
5. **Kategoriler:** Müşterinin ürün kategorilerini birebir kullan (transkriptten).
6. **3D/Animasyon:** Aşama 2'de tespit edilen 3D keyword'lere göre seçilen teknolojileri tasarıma entegre et.

### Çıktı
`[proje-klasoru]/ozellestirilmis-tasarim.md` — içerik:
- Final renk paleti
- Final tipografi
- Final navigasyon yapısı
- Final ürün sayfası layout
- Final konfigüratör spesifikasyonu
- Final kategori yapısı
- **3D/Animasyon planı** (hangi teknoloji, nerede kullanılacak)

---

## AŞAMA 5.5: GELİŞTİRME ÖNERİLERİ + PPTX SUNUM

### Tetikleyici
Özelleştirme tamamlandığında, uyumluluk kontrolü #2'den ÖNCE.

### Amaç
Müşterinin istemediği/bilmediği ama siteyi çok daha iyi yapacak özellikleri tespit et, paketleyip müşteriye sun. **Upsell + kalite artışı + profesyonel izlenim.**

### Veri Kaynakları
- **PDF Bölüm 6 (Fırsatlar)** → stratejik upsell fikirleri
- **PDF Bölüm 9 (İlişki Dinamikleri)** → sunum tonu/yaklaşımı
- **PDF Bölüm 5 (Kritik Bilgiler - Finansal)** → fiyat hassasiyeti
- **ic_finansal.md** → bütçe marjı, upsell potansiyeli
- **3D-TECHSTACK.md** → eklenebilecek 3D/animasyon teknolojileri
- **Sektör research dosyaları** → sektöre özel best practice'ler

### Süreç

**1. Eksik Analizi:**
Referans site + sektör araştırması + 3D techstack'ten bakarak müşterinin istemediği ama eklenebilecek özellikleri listele:

```
Her özellik için:
- Ne: [özellik adı]
- Neden: [müşteriye faydası — teknik değil, iş değeri]
- Efor: [kaç saat/gün ekler]
- Maliyet: [ek ücret gerekir mi, yoksa hediye mi]
- Öncelik: [P0: zorunlu öner / P1: güçlü öner / P2: nice-to-have]
- Görsel: [nasıl görünecek — screenshot/mockup referansı]
- 3D Teknoloji: [gerekiyorsa hangi teknoloji — 3D-TECHSTACK.md'den]
```

**2. Kategorize Et:**

| Kategori | Ne İçerir | Müşteriye Sunuş |
|----------|-----------|-----------------|
| **Ücretsiz İyileştirmeler** | SEO schema, performans, accessibility, meta tags, temel animasyonlar | "Bunları zaten yapıyoruz, ekstra ücret yok" |
| **Değer Katan Öneriler** | Beden rehberi, karşılaştırma, favori listesi, taksit tablosu, smooth scroll, hover efektleri | "Bunlar conversion artırır, scope içinde yaparız" |
| **Premium Upsell** | 3D ürün viewer, AR deneme, WhatsApp chatbot, çoklu dil, custom cursor, scroll animasyonlar | "Bunlar ayrı modül, ek ücretle yapılabilir" |
| **Gelecek Fazlar** | Mobil app, SEO içerik, Google Shopping, influencer, AI chatbot | "Şimdi değil ama ileride konuşabiliriz" |

**3. PPTX Sunum Hazırla:**
`pptx` skill'i kullanarak müşteriye sunulacak profesyonel sunum oluştur:

```
Slide yapısı:
1. Kapak — "[Marka] Dijital Deneyim Projesi"
2. Mevcut Durum — Müşterinin şu anki durumu (site yok / eski site)
3. Referans Analizi — Referans site analiz özeti (screenshot'larla)
4. Bizim Yaklaşımımız — Ne yapıyoruz, nasıl farklıyız
5. Site Haritası — Sayfa yapısı görsel olarak
6-8. Sayfa Tasarımları — Homepage, kategori, ürün mockup/wireframe
9. Konfigüratör Demo — Ürün seçim sistemi açıklama (varsa)
10. Ücretsiz İyileştirmeler — "Bunları hediye ediyoruz" (SEO, performance, animasyonlar)
11. Önerilen Ek Özellikler — Değer katan ama scope'ta olmayan (3D viewer, scroll efekt)
12. Premium Modüller — Ayrı fiyatlandırma (AR, chatbot, çoklu dil)
13. 3D/Animasyon Önerileri — Müşteri "animasyon" dediyse göster (video/screenshot ile)
14. Takvim — Milestone'lar + teslim tarihi
15. Yatırım Özeti — Mevcut anlaşma + opsiyonel modül fiyatları
16. Sonraki Adımlar — Ne bekliyoruz (logo, fotoğraf, onay)
```

**4. Müşteri Onay Süreci:**
- Sunumu WhatsApp/email ile gönder VEYA yüz yüze göster
- **PDF Bölüm 9 (İlişki Dinamikleri)** referans alarak tonu ayarla
- Müşteriden net onay al: "Hangi ek özellikleri istiyorsunuz?"
- Kabul edilenler → scope'a ekle, fiyat güncelle
- Reddedilenler → yapma, zorlama

### Çıktı
- `[proje-klasoru]/gelistirme-onerileri.md` — tam öneri listesi
- `[proje-klasoru]/sunum/[marka]-proje-sunumu.pptx` — müşteriye sunulacak
- `[proje-klasoru]/fiyat-guncelleme.md` — kabul edilen ek modüllerin fiyatı (varsa)

### Kural
- Öneri yapabilirsin ama **uygulamadan ÖNCE müşteri onayı ŞART**
- Ücretsiz iyileştirmeleri bile söyle — "bunu da ekliyoruz" demek güven inşa eder
- Premium modüllerde baskıcı olma — "isterseniz" tonu kullan
- PPTX profesyonel görünsün — müşteri bunu başkalarına da gösterebilir
- **3D önerilerde video/görsel göster** — teknik terim kullanma, sonucu göster

---

## AŞAMA 6: TRANSKRIPT UYUMLULUK KONTROLÜ #2

### Tetikleyici
Müşteri Aşama 5.5 sunumuna cevap verdiğinde (onay/red).

### Süreç
Transkripti SON KEZ oku ve güncellenmiş scope ile karşılaştır:

```
Kontrol listesi:
[ ] Müşterinin İSTEDİĞİ her özellik tasarımda var mı?
[ ] Müşterinin REDDETTİĞİ hiçbir özellik tasarımda yok mu?
[ ] Aşama 5.5'te ONAYLANAN öneriler scope'a eklendi mi?
[ ] Aşama 5.5'te REDDEDİLEN öneriler scope'ta YOK mu?
[ ] Fiyat/kapsam sınırları aşılmadı mı?
[ ] Mobil öncelik gözetildi mi? (müşteri mobil dedi ise)
[ ] Teslim tarihine uygun mu?
[ ] Admin panel gereksinimleri karşılandı mı?
[ ] Ödeme entegrasyonu planlandı mı?
[ ] 3D/animasyon seçimleri müşterinin istediğiyle tutarlı mı?
```

### Çıktı
`[proje-klasoru]/uyumluluk-kontrolu-2.md` — PASS/FAIL + detay

### Eylem
- PASS → Aşama 6.5'e geç (Design Council)
- FAIL → Aşama 5'e dön (düzelt)

---

## AŞAMA 6.5: DESIGN COUNCIL (ZORUNLU — ATLAMA YASAK)

### Tetikleyici
Uyumluluk kontrolü #2 PASS aldığında, **Aşama 7 kod yazımına geçmeden ÖNCE**.

### Amaç
"Dark + gold + glass + Inter" recipe tekrarını durdur. Her proje için 14 uzman agent'lı council 3 alternatif pathway combo üretsin, kullanıcı seçsin, **sonra** kod yazımı başlasın.

### Kullanılacak Skill / Komut
- Slash komut: `/design-council [proje-adı] [kısa brief]`
- Skill: `design-council` (auto-trigger; UI/tasarım keyword'lerini algılar)
- Hook: `~/.claude/hooks/design-council-reminder.js` (UserPromptSubmit'te hatırlatıcı basar)

### Akış (5 Tur)

| Tur | Ne | Agent |
|-----|-----|-------|
| 1 | Paralel görüş alma | 12 uzman paralel (typography, palette, layout, motion, header, hero, kpi, pipeline-list, chart, interaction, footer, 3d) |
| 2 | Karşılıklı inceleme | 12 uzman revize (çelişki tespit) |
| 3 | Sentez | `design-director` → 3 combo (A safe / B edge / C hybrid) |
| 4 | Adversary check | `design-adversary` — repeat skor + yasaklı ID + accessibility |
| 5 | Kullanıcıya sun | Onay → `design-claude/[proje]/combo.md` kaydet |

### Çıktı
`C:/Users/EAS/Desktop/armut/research/design-claude/[proje]/combo.md` dosyası:

```markdown
# [PROJE] — Pathway Combo
| Kategori | ID | Seçim | Neden |
|----------|-----|-------|-------|
| Header   | H?  | ...   | ...   |
| Nav      | N?  | ...   | ...   |
| Hero     | HR? | ...   | ...   |
| KPI      | K?  | ...   | ...   |
| Pipeline | P?  | ...   | ...   |
| Table    | T?  | ...   | ...   |
| Chat     | C?  | ...   | ...   |
| Chart    | CH? | ...   | ...   |
| Form     | F?  | ...   | ...   |
| Modal    | M?  | ...   | ...   |
| Footer   | FT? | ...   | ...   |
| Typo     | TY? | ...   | ...   |
| Palette  | PL? | ...   | ...   |
| Layout   | L?  | ...   | ...   |
| Motion   | MO? | ...   | ...   |

Repeat skor: X/15
Adversary onayı: ✓
Tarih: YYYY-MM-DD
```

### Zorunlu Referanslar
- Katalog: `C:/Users/EAS/Desktop/armut/DESIGN-PATHWAYS.md`
- Proje matrisi: aynı dosyada (mevcut 13 projenin combo'ları)

### Kural
- **Combo onaysız Aşama 7'ye geçilemez.**
- Yasaklı ID kullanılamaz: TY1, TY2, TY4, TY8, PL1, K1, HR2, T6, CH1.
- İki proje kolon-kolon ≥8 eşleşemez.
- Kod yazımı sırasında her component başında yorum: `// DESIGN-COUNCIL COMBO: [H?+N?+HR?+...]`

### Eylem
- Adversary onayladı + kullanıcı seçti → Aşama 7'ye geç
- Adversary 3 combo'yu da reddetti → Tur 3'e dön (max 2 retry)
- Kullanıcı tamamını reddetti → brief'i revize + Tur 1'e dön

---

## AŞAMA 7: GELİŞTİRME

### Tetikleyici
Uyumluluk kontrolü #2 PASS aldığında.

### Kullanılacak Skill'ler (projeye göre seçilir)

**Site Geliştirme (Core):**
| Skill | Ne İçin |
|-------|---------|
| `e-commerce-builder` | E-ticaret altyapısı, ürün kataloğu, sepet, checkout |
| `site-replicator` Stage 3-6 | Referans site kopyalama, design token, component üretimi |
| `frontend-design` | UI/UX component'ler, sayfa tasarımı |
| `3d-site-builder` | 3D ürün viewer, animasyonlu sahneler |

**SEO & Yapı:**
| Skill | Ne İçin |
|-------|---------|
| `schema-markup` | Product, LocalBusiness, FAQ, Breadcrumb JSON-LD |
| `site-architecture` | URL yapısı, internal linking, breadcrumbs |
| `seo-audit` | Teknik SEO denetimi, Core Web Vitals |
| `content-strategy` | Blog/içerik planı, anahtar kelime stratejisi |
| `programmatic-seo` | Toplu SEO sayfaları (kategori+şehir vb.) |

**Doküman & İş:**
| Skill | Ne İçin |
|-------|---------|
| `invoice-tracker` | Ödeme kayıtları, mali özet |
| `contract-proposal-writer` | Sözleşme yazımı |
| `client-proposal` | Ek modül/upsell teklif dokümanı |
| `pdf` | Kapsam belgesi PDF, fatura |
| `docx` | Word dokümanları (sözleşme vb.) |
| `xlsx` | Ürün listesi Excel import/export |
| `pptx` | Sunum (ilerleme raporu, demo) |

**Teknik:**
| Skill | Ne İçin |
|-------|---------|
| `code-reviewer` | Kod review, kalite kontrolü |
| `docker-development` | Docker ortam kurulumu (gerekirse) |
| `claude-api` | AI entegrasyonu (chatbot, öneri motoru) |
| `api-design-reviewer` | API tasarım inceleme |
| `rag-architect` | RAG sistemi (ürün arama, FAQ chatbot) |
| `mcp-builder` | MCP server (özel entegrasyon gerekirse) |

**Strateji & Planlama:**
| Skill | Ne İçin |
|-------|---------|
| `pricing-strategy` | Ürün/hizmet fiyatlandırma stratejisi |
| `product-manager-toolkit` | Feature önceliklendirme (RICE), PRD |
| `launch-strategy` | Site lansman planı |
| `senior-prompt-engineer` | AI prompt optimizasyonu |

**Takip & Raporlama:**
| Skill | Ne İçin |
|-------|---------|
| `weekly-summary` | Haftalık ilerleme raporu |
| `meeting-analysis` | Her yeni toplantıda tekrar analiz |
| `armut-bidding` | Armut'tan yeni iş gelirse teklif yazma |
| `skill-creator` | Projeye özel yeni skill gerekirse |

**NOT:** Tüm 32 skill kullanılabilir — proje ihtiyacına göre otomatik seçilir.

### 3D Teknoloji Seçimi (Aşama 2'de tespit edilmişse)
Aşama 2'de keyword tespiti yapıldıysa, `3D-TECHSTACK.md` referans dosyası ve ilgili research dosyasından en uygun teknoloji seçilir:

| Tespit | Seçilecek Teknoloji | Research Dosyası |
|--------|---------------------|-----------------|
| 360° ürün spin | Frame-based viewer veya R3F OrbitControls | jewelry-photography-web.md |
| 3D model viewer | R3F + drei + useGLTF + Stage | 3d-product-configurator-research.md |
| Cam/kristal efekt | MeshTransmissionMaterial | drei-MeshTransmissionMaterial-research.md |
| Scroll animasyon | GSAP ScrollTrigger + Lenis | gsap-free-plugins-deep-dive.md |
| Hover efektler | Framer Motion + GSAP | motion-design-principles-3d.md |
| AR deneme | model-viewer web component | ar-furniture-ecommerce-research.md |
| Parçacık efekti | BufferGeometry / Sparkles / wawa-vfx | particle-systems-deep-research.md |
| Glass morphism UI | Tailwind v4 backdrop-blur | tailwind-v4-3d-overlay-patterns.md |
| Custom cursor | Framer Motion spring + GSAP magnetic | cursor-mouse-interactions-research.md |
| Loading animasyon | useProgress + Framer Motion | loading-transitions-r3f.md |
| Sinematik kamera | Hermite spline + dolly zoom | camera-rigs-cinematography.md |
| Toon/stilize render | MeshToonMaterial + Outlines | toon-cel-shading-npr.md |
| Ses entegrasyonu | Howler.js + PositionalAudio | audio-integration.md |
| Fizik efektleri | @react-three/rapier | physics-rapier-complete.md |

### Geliştirme Sırası
1. Proje iskelet kurulumu (Next.js + Supabase + Tailwind)
2. Veritabanı şeması (Supabase migration)
3. Layout componentleri (header, footer, nav)
4. Homepage
5. Kategori sayfası
6. Ürün detay sayfası + konfigüratör
7. 3D/animasyon entegrasyonu (Aşama 2'de tespit edildiyse)
8. Sepet + checkout
9. Admin paneli
10. Ödeme entegrasyonu (iyzico)
11. SEO (schema, sitemap, meta)
12. Performans optimizasyonu
13. Mobil test
14. Deploy

---

## AŞAMA 8: HER YENİ TOPLANTIDA

### Tetikleyici
Müşteriyle yeni toplantı yapıldığında.

### Süreç
1. `meeting-analysis` skill'i ile yeni toplantıyı analiz et (17 doküman + PDF güncelle)
2. `gecmis_ozet.md` güncelle
3. Yeni kararları proje brief'e ekle
4. **3D keyword taraması tekrarla** — yeni 3D/animasyon istekleri var mı?
5. **TRANSKRIPT UYUMLULUK KONTROLÜ** tekrarla:
   - Yeni istekler var mı? → Scope'a ekle
   - Değişen kararlar var mı? → Güncelle
   - İptal olan özellikler var mı? → Çıkar
6. Scope creep kontrolü: Yeni istekler bütçeyi aşıyor mu?
7. Gerekirse fiyat güncelleme teklifi hazırla
8. Gerekirse yeni PPTX sunum güncelle (ilerleme + yeni öneriler)

### Çıktı
- Güncellenmiş proje brief
- Güncellenmiş uyumluluk kontrolü
- Değişiklik raporu (ne değişti)
- (Opsiyonel) Güncellenmiş PPTX sunum

---

## DOSYA YAPISI

```
[Proje Klasörü]/
├── proje-brief.md                    ← Aşama 2
├── referans-analiz.md                ← Aşama 3
├── uyumluluk-kontrolu-1.md           ← Aşama 4
├── ozellestirilmis-tasarim.md        ← Aşama 5
├── gelistirme-onerileri.md           ← Aşama 5.5
├── uyumluluk-kontrolu-2.md           ← Aşama 6
├── fiyat-guncelleme.md               ← Aşama 5.5 (onaylanan ek modüller)
├── sunum/
│   └── [marka]-proje-sunumu.pptx     ← Aşama 5.5
├── degisiklik-raporlari/             ← Aşama 8 (her toplantıdan sonra)
│   ├── degisiklik-2026-03-21.md
│   └── degisiklik-2026-04-14.md
├── research/                         ← Araştırma dosyaları
│   ├── gabriano-analiz.md
│   ├── supabase-schema.md
│   ├── iyzico-integration.md
│   └── ...
└── site/                             ← Geliştirme kodu
    ├── src/
    ├── package.json
    └── ...
```

---

## KRİTİK KURALLAR

1. **Transkript = kaynak gerçek.** Müşteri ne dediyse o. Tahmin ekleme.
2. **Her aşamada ONAY al.** Otomatik geçme.
3. **Uyumluluk kontrolü atlanmaz.** Her referans site analizi ve her toplantı sonrası yapılır.
4. **Scope creep alarm.** Yeni istek → bütçe kontrolü → gerekirse fiyat güncelleme.
5. **Reddedilen özellik geri gelmez.** Müşteri "istemiyorum" dediyse koyma.
6. **Konuşulmayan özellik ÖNCE ÖNERİLİR.** Direkt eklenmez, Aşama 5.5'te sunulur, müşteri onaylarsa eklenir.
7. **gecmis_ozet.md her toplantıdan sonra güncellenir.** Süreklilik sağlar.
8. **Mobil öncelik.** Müşteri mobil dediyse mobile-first zorunlu.
9. **Gerçek veri.** WebFetch/Firecrawl ile canlı site verisi kullan, tahmin değil.
10. **Fiyat/tarih bağlayıcı.** Toplantıda söylenen fiyat ve tarih değişmez (müşteri değiştirmedikçe).
11. **Proaktif olabilirsin ama onaysız uygulama.** SEO, performans, UX, 3D iyileştirme önerileri yap — ama müşteri "evet" demeden koda koyma.
12. **PPTX sunum her projede hazırlanır.** Profesyonel izlenim + upsell fırsatı + müşterinin başkalarına göstermesi.
13. **3D keyword tespiti her toplantıda tekrarlanır.** Müşteri sonradan "animasyon da olsun" diyebilir.
14. **PDF analiz raporu pipeline'ın giriş verisidir.** Her bölüm ilgili aşamaya yönlendirilir.
15. **3D-TECHSTACK.md ana referanstır.** 350+ teknoloji arasından sektör + istek bazlı seçim yapılır.
