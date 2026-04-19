# DESIGN-PATHWAYS.md — Armut Projeleri UI Pathway Picker

> **Amaç:** Her UI bileşeni için N farklı pathway tanımla, her proje bir kombinasyon seçsin → iki proje aynı combo olamaz → tekrar eden "dark+gold+glass+Inter" recipe'si biter.
> **Kural:** Yeni proje → `/design-council` → 14 uzman agent tartışır → 3 alternatif combo → kullanıcı seçer → **sonra** kod yazılır. Onaysız kod yok.
> **Son güncelleme:** 2026-04-18

---

## KULLANIM

```
1. Yeni site / UI / tasarım işi geldiğinde → /design-council [proje-adı]
2. 14 uzman agent paralel çalışır (3 tur)
3. Çıktı: 3 alternatif combo + repeat-guard raporu
4. Emre seçer (A / B / C)
5. Design-director seçilen combo'yu kod-hazır tabloya çevirir
6. Kod yazımı başlar — her component bu tablonun satırından türetilir
```

**Asla atlanamaz:** UI kod dosyası (.tsx / .html / .vue) yazılmadan önce o projenin combo tablosu olmalı. Yoksa adversary agent red eder.

---

## 1 · HEADER / TOP BAR (10 pathway)

| ID | İsim | Tek cümle | Uygunluk | Referans |
|----|------|-----------|----------|----------|
| **H1** | Plate + Hazard Strip | Endüstriyel şantiye plakası, sarı-siyah şerit bant üstü/altı | construction, factory, blue-collar | mockup-C |
| **H2** | Masthead Centered | Gazete başlığı tarzı, ortalanmış wordmark + altında küçük subtitle | editorial, news, luxury magazine | mockup-B |
| **H3** | Sidebar Rail + Breadcrumb | Solda vertical rail, üstte breadcrumb + komut çubuğu | dashboard, admin, SaaS | v1-CONSTRUO, Linear |
| **H4** | Floating Command Palette Only | Hiç sabit header yok; ⌘K ile açılan overlay panel | power-user tool, developer UI | Raycast, Warp |
| **H5** | Marquee Ticker Top | En üstte sürekli kayan finansal/data ticker bandı | fintech, data-ops, trading | v2-kinetic-data |
| **H6** | Icon Dock (Mobile-First) | Alt sabit dock, iOS/macOS dock tarzı | mobile-heavy, PWA | Apple Mail |
| **H7** | Vertical Writing-Mode Rail | Sol taraf vertical-rl yazı ile logo + bölüm index | portfolio, art, luxury | v2-kinetic-data (var kısmen) |
| **H8** | Hero-Attached (No Separate Header) | Header hero'nun bir parçası, scroll'da ince bar'a dönüşür | landing, marketing, storytelling | Apple product pages |
| **H9** | Corner Brackets + Timestamp | 4 köşede ince bracket (⌐¬└┘) + merkezde tarih/saat | technical, observatory, monitoring | SpaceX telemetry |
| **H10** | Receipt / Docket Strip | Dar, perforated kenarlı makbuz şeridi üstte | retail POS, order tracking | Square POS |

---

## 2 · NAVIGATION (10)

| ID | İsim | Tek cümle | Uygunluk |
|----|------|-----------|----------|
| **N1** | Sidebar Fixed Rail | Solda sabit, icon+label, admin/SaaS klasik | dashboard, CRM |
| **N2** | Horizontal Tabs Underline | Üstte yatay, aktif underline kayan | docs, content site |
| **N3** | Breadcrumb-Only | Sadece yol, menü yok (deep link first) | docs tree, file browser |
| **N4** | Mega Menu Full-Width | Hover ile açılan devasa sütunlu panel | e-commerce, enterprise |
| **N5** | Command Palette Only | Tek giriş ⌘K, visible nav yok | power tools |
| **N6** | Floating Dock (Radial/Bar) | Ortada/altta yüzen, scroll'a duyarlı | interactive landing |
| **N7** | Vertical Writing-Mode Rail | Sağ/sol kenarda yazı dik, bölüm listesi | editorial long-read |
| **N8** | Accordion Grouped | Sidebar gibi ama gruplar accordion açılır | deeply nested nav |
| **N9** | Map Anchor Nav | Sayfa bir haritaymış gibi noktalar → bölümler | storytelling, case study |
| **N10** | Timeline Scroll-Locked | Scroll progress + section dots sağ kenar | narrative |

---

## 3 · HERO (14)

| ID | İsim | Tek cümle | Uygunluk | Referans |
|----|------|-----------|----------|----------|
| **HR1** | Kinetic Typography Mask | Devasa başlık letter-by-letter animate, variable font weight change | editorial, portfolio | v2-kinetic-data |
| **HR2** | Split Hero | Text left, media (image/video/3D) right | product, SaaS | standard |
| **HR3** | Full-Bleed Video Background | Video arkaplanı, text overlay + gradient scrim | hospitality, luxury | — |
| **HR4** | 3D Canvas Scroll-Camera | Three.js sahne, scroll kamera uçurur | architecture, product-3D | v2-immersive-3d |
| **HR5** | Sign Board / Poster Rotated | Hazard/construction sign, hafif rotate, chunky | construction, events | mockup-C |
| **HR6** | Newspaper Hed + Deck + Byline | Centered hed, italic deck, byline row | editorial, serious | mockup-B |
| **HR7** | Dashboard Panel-as-Hero | Hero yerine direkt canlı data panel | admin tool | v1-CONSTRUO |
| **HR8** | Chat Interface Hero | Full-screen chat UI, demo konuşma | AI product, support | Raycast AI |
| **HR9** | Interactive Map Hero | Tıklanabilir harita + overlay noktalar | real-estate, travel | — |
| **HR10** | Scroll Timeline Hero | Scroll ilerledikçe timeline ilerler | agency, portfolio | — |
| **HR11** | Brochure Cover Grid | Kitap kapağı gibi tipografi + küçük thumbnails | magazine, catalog | — |
| **HR12** | Conversational Q&A | "Ne arıyorsun? → şunu mu kastediyorsun?" akışı | onboarding | — |
| **HR13** | Blueprint Title Block | Teknik çizim title block corner format | architecture, engineering | v2-blueprint |
| **HR14** | Receipt-Strip Zero-Hero | Hero yok, direkt dense list/feed (zero-scroll) | inbox, activity | Superhuman |

---

## 4 · KPI / METRICS (12)

| ID | İsim | Tek cümle | Uygunluk |
|----|------|-----------|----------|
| **K1** | Bento Grid Glass | Karışık boyutlu glass kartlar (YASAK: tekrar eden klişe) | ~default — kaçın |
| **K2** | Band with Horizontal Rules | Tek satır 3-4 metric, aralarında hairline rule | mockup-A |
| **K3** | Chip Row Colored Blocks | Renkli blok şerit yan yana (hazard ton + ink + cream) | mockup-C |
| **K4** | Spec Sheet Table | Veri tablosu gibi, id/label/value/note kolonları | engineering |
| **K5** | Almanac Editorial | Gazete almanak/hava tahmini format, serif büyük sayı | mockup-B |
| **K6** | Ring / Radial Gauge | Daire grafik, progress ring | fitness, OKR |
| **K7** | Tower Vertical Stack | Dikey stack, her metric bir "kat" | building metaphor | v2-immersive-3d |
| **K8** | Inline Sparkline Minimal | Tek satır: label + value + sparkline, kart yok | finance, terminal |
| **K9** | Barometer / Dial | Analog gösterge simülasyonu | classic dashboard |
| **K10** | Kinetic Counter Marquee | Sürekli kayan büyük sayılar, live feed | data-ops, trading | v2-kinetic-data |
| **K11** | Postcard Stack | Her metric kart bir postkart, rotate + shadow | travel, mood-board |
| **K12** | Columns Chart as KPI | Mini bar chart, label altında, edebi görünüm | blueprint | v2-blueprint |

---

## 5 · PIPELINE / LIST DISPLAY (10)

| ID | İsim | Tek cümle | Uygunluk |
|----|------|-----------|----------|
| **P1** | Kanban Columns | 5 kolon drag-drop klasik | CRM standart |
| **P2** | Elevation Cross-Section | Mimarlık kesit çizimi gibi kolonlar + dashed grid | architecture | v2-blueprint |
| **P3** | Funnel Stages | Huni, her stage daralır, clip-path | sales funnel | v2-kinetic-data |
| **P4** | D3 Force Network | Node-link graph, lead↔agent bağları | relationships | v2-kinetic-data |
| **P5** | Horizontal Timeline | Scroll-lock timeline, stage'ler ilerlerken | gantt, schedule |
| **P6** | Stacked Bars Chart | Her aşama bar yığın, oran göster | analytics-heavy |
| **P7** | 3D Isometric Tower | Building metaphor, kat kat | v2-immersive-3d |
| **P8** | Dense Table (Linear-style) | Satır satır, kısayol odaklı, zero-padding | Linear, Airtable |
| **P9** | Card Grid Horizontal Scroll | Kartlar yatay scroll, Netflix carousel | media, marketplace |
| **P10** | Neo-brutal Sticker Blocks | Sharp border + shadow + rotated sticker | v2-neobrutalist |

---

## 6 · DATA TABLE (8)

| ID | İsim | Tek cümle |
|----|------|-----------|
| **T1** | Airbnb List (sparse, image-first) |
| **T2** | Linear Issue (dense, keyboard-first) |
| **T3** | Spec Sheet (engineering bill-of-materials) |
| **T4** | Editorial Byline List (gazete içindekiler) |
| **T5** | Spreadsheet Dense (Excel feel, grid lines) |
| **T6** | Card Grid (resim + 2-3 satır + rate) |
| **T7** | Receipt Strip (transaction list, kompakt) |
| **T8** | Timeline Rows (her satır bir date badge ile) |

---

## 7 · CHAT / INBOX (6)

| ID | İsim | Tek cümle |
|----|------|-----------|
| **C1** | Classic Split (conversations left, thread right) | v1-CONSTRUO |
| **C2** | Messenger-Style Bubbles | iMessage/WA görünümü |
| **C3** | Email Inline Threaded | Gmail conversation view |
| **C4** | Terminal Log (mono, dense) | IRC/Slack power |
| **C5** | Kanban-as-Inbox | Her mesaj lead card'ına otomatik dönüşür |
| **C6** | Voice-First (transcript + audio wave) | Call center, podcast |

---

## 8 · CHART / DATA VIZ (12)

| ID | İsim | Tek cümle |
|----|------|-----------|
| **CH1** | Chart.js smooth line (default — kaçın) |
| **CH2** | Recharts tremor-style (SaaS default) |
| **CH3** | Nivo geometric (colorful, generous) |
| **CH4** | D3 custom force / tree / sankey |
| **CH5** | Apache ECharts (enterprise dense) |
| **CH6** | Column bar elevation (blueprint style) | v2-blueprint |
| **CH7** | Ring/radial custom SVG | mockup-A candidate |
| **CH8** | Candlestick / OHLC (finance) |
| **CH9** | Heatmap grid (calendar/status) |
| **CH10** | Sparkline-only (minimal inline) |
| **CH11** | Stacked area kinetic (GSAP reveal) |
| **CH12** | 3D chart R3F (extruded bar geometry) |

---

## 9 · FORM (8)

| ID | İsim | Tek cümle |
|----|------|-----------|
| **F1** | Single-Column Tall (Typeform) |
| **F2** | Multi-Column Grid (enterprise settings) |
| **F3** | Wizard Steps (progress bar) |
| **F4** | Inline Edit (click-to-edit, no form) |
| **F5** | Table Cell Edit (spreadsheet-like) |
| **F6** | Conversational Chat Form |
| **F7** | Document Fill-in-the-Blanks |
| **F8** | Calculator Input (retro digits) |

---

## 10 · MODAL / OVERLAY (6)

| ID | İsim | Tek cümle |
|----|------|-----------|
| **M1** | Centered Dialog (default) |
| **M2** | Right Sheet Drawer |
| **M3** | Bottom Sheet (mobile) |
| **M4** | Full-Screen Takeover |
| **M5** | Inline Expand (no overlay, row grows) |
| **M6** | Popover Tethered Anchor |

---

## 11 · FOOTER (8)

| ID | İsim | Tek cümle |
|----|------|-----------|
| **FT1** | Huge Wordmark (brand-name dev font) | v1-CONSTRUO, v2-neobrutalist |
| **FT2** | Sitemap Columns (classic 4-col) |
| **FT3** | Receipt Strip (dashed, minimal) |
| **FT4** | Colophon (editorial credits) | mockup-B |
| **FT5** | Contact Card (single line, kişisel) |
| **FT6** | Signature Block (engineering title block) | v2-blueprint |
| **FT7** | Marquee Text (sürekli kayan) |
| **FT8** | Slab Dark Info-Strip | mockup-C |

---

## 12 · TYPOGRAPHY COMBO (25)

> **Kural:** Bir combo tek projede — sonraki proje başka combo seçmeli.

| ID | Display | Body | Mono | Karakter | Kullanıldı mı |
|----|---------|------|------|----------|---------------|
| **TY1** | Inter + — + — | sadece sans | — | vanilla SaaS | Freeman, BG Foto, Dagintaslı · **YASAK** |
| **TY2** | Playfair Italic | Inter | — | gold luxury | BG Foto, Modern Alyans · **YASAK** |
| **TY3** | Poppins | Poppins | — | clean friendly | Fatih Bey · kullanıldı |
| **TY4** | Instrument Serif italic | Space Grotesk | JetBrains Mono | editorial luxury | v1-CONSTRUO · **YASAK** |
| **TY5** | Syne 800 italic | Space Grotesk | JetBrains Mono | blueprint tech | v2-blueprint |
| **TY6** | Archivo Black + Space Grotesk 900 | Space Grotesk | JetBrains Mono | neobrutalist | v2-neobrutalist |
| **TY7** | Bricolage Grotesque italic | Space Grotesk | JetBrains Mono | kinetic data | v2-kinetic-data |
| **TY8** | DM Serif Display italic | Inter | JetBrains Mono | 3d immersive | v2-immersive-3d · **YASAK** |
| **TY9** | Fraunces (var) | Hanken Grotesk | Geist Mono | warm editorial | mockup-A |
| **TY10** | Instrument Serif | IBM Plex Serif body | IBM Plex Mono | newspaper | mockup-B |
| **TY11** | Archivo Black + Narrow | Geist Sans | Geist Mono + Stardos Stencil | industrial | mockup-C |
| **TY12** | Migra Italic | IBM Plex Sans | Berkeley Mono | fashion editorial | — |
| **TY13** | PP Editorial New | PP Mori | Commit Mono | sophisticated | — |
| **TY14** | Monument Extended | Inter Tight | JetBrains Mono | tech-chic | — |
| **TY15** | Redaction (variable) | Supreme | Operator Mono | declassified document | — |
| **TY16** | Unbounded | Manrope | DM Mono | rounded SaaS | — |
| **TY17** | Cormorant Garamond italic | Montserrat | — | romantic luxury (kaçın — mücevher klişesi) | — |
| **TY18** | Söhne Breit | Söhne | Söhne Mono | swiss modern | — |
| **TY19** | Tiempos Headline | National 2 | Operator Mono | NYT modern | — |
| **TY20** | Degular Display | Degular Text | Degular Mono | geometric contemporary | — |
| **TY21** | Recoleta | Lato | IBM Plex Mono | warm serif | — |
| **TY22** | Basteleur Moonlight | Satoshi | JetBrains Mono | quirky display | — |
| **TY23** | Editorial Old + PP Neue Machina | — | — | max maximalist | — |
| **TY24** | Signifier | GT America | — | tech journal | — |
| **TY25** | Marfa | Neue Haas Unica | — | art book | — |

---

## 13 · PALETTE SYSTEM (20)

| ID | İsim | Bg | Accent | İkincil | Notlar |
|----|------|-----|--------|---------|--------|
| **PL1** | Dark+Gold (YASAK) | #0A0A0A | #C9A84C | cream | Freeman, BG Foto, Dagintaslı, Mayamir, Modern Alyans, Fatih Bey, v1 → **YENİ PROJEDE KULLANMA** |
| **PL2** | Warm Dark Espresso | #1C1A17 | #E89B7C coral | #B8875C brass | mockup-A |
| **PL3** | Off-White Editorial | #F5F1E8 | #C43D2B red | ink #131313 | mockup-B |
| **PL4** | Concrete Industrial | #D4CFC4 | #E85D04 safety orange | #F5C400 hazard | mockup-C |
| **PL5** | Blueprint Paper | #E6EDF2 | #0F4C75 blue | #BF360C warn + #8B2E3F stamp | v2-blueprint |
| **PL6** | Neobrutalist Multi | #FFF8EB | #2B4DDB cobalt | #FFD500 + #FF3B30 + #00A86B + #B794F6 | v2-neobrutalist |
| **PL7** | Kinetic Lime/Cyan/Magenta | #08090C | #C7FF4D | #4DFFE6 + #FF4DE6 + #FFB84D | v2-kinetic-data |
| **PL8** | Immersive 3D Warm | #0B0D10 | #FF5E3A orange | #FFB347 + #7FD4FF | v2-immersive-3d |
| **PL9** | Botanic / Solarpunk | #E8EDE3 | #3A5A40 forest | #C9A46B warm ochre | Vitanatur |
| **PL10** | Deep Night Cobalt | #0F1A30 navy | #C5A46D gold | cream | Fatih Bey mevcut |
| **PL11** | Tobacco + Clay | #2A1F14 | #D9A066 tan | #A0522D sienna | leather goods |
| **PL12** | Slate Mono + Acid | #1A1D21 slate | #D4FF00 acid | pure white | developer tool |
| **PL13** | Mist + Ink (Japandi) | #EEEBE4 mist | #1A1A1A ink | #8B6F47 tatami | minimalist |
| **PL14** | Salmon + Burgundy | #F4D5C4 salmon | #6B1B2E burgundy | #D4B896 champagne | food, restaurant |
| **PL15** | Glacier + Fjord | #EDF4F7 ice | #2E5A72 fjord | #8FB8CE glacier | water, wellness |
| **PL16** | Terracotta + Ochre | #F2E3D1 sand | #B34F1B terra | #D4A04C ochre | mediterranean |
| **PL17** | Olive + Mustard | #E8E4D0 pale | #556B2F olive | #DAA520 mustard | outdoor, earth |
| **PL18** | Plum + Champagne | #F5EFE8 | #5B2A4A plum | #D4B896 | florist, events |
| **PL19** | Steel + Copper | #E0E2E5 | #B87333 copper | #5F6C7B steel | industrial-chic |
| **PL20** | Moss + Cream | #F2F0E6 | #4A5D3A moss | #C5B290 bone | herbal, natural |

**Forbidden moves (her palette için):** purple gradient, gold-on-dark combo (PL1 hariç, o da yasak), %100 grayscale-only, #FF00FF magenta solo.

---

## 14 · LAYOUT SYSTEM (10)

| ID | İsim | Tek cümle |
|----|------|-----------|
| **L1** | 12-Col Flex Grid (default — genelde uygun) |
| **L2** | Asymmetric Broken Grid (editorial magazine) |
| **L3** | Bento Mondrian (box-in-box) |
| **L4** | Full-Bleed Horizontal Rails (cinematic) |
| **L5** | 3-Column Newspaper (dense text) |
| **L6** | Center-Stage Single Column (long read) |
| **L7** | Sticky Sidebar + Feed (Twitter-style) |
| **L8** | Masonry / Pinterest |
| **L9** | Card Deck Carousel (stacked rotated) |
| **L10** | Zine / Poster Scroll (vertical scrolling zine) |

---

## 15 · MOTION SYSTEM (10)

| ID | Tek cümle |
|----|-----------|
| **MO1** | GSAP + ScrollTrigger (pin, scrub) |
| **MO2** | Lenis Smooth Scroll + scroll-linked pin |
| **MO3** | CSS Scroll-Driven Animations (native, 2026) |
| **MO4** | Framer Motion v12 (React-native) |
| **MO5** | Theatre.js Scripted (keyframe editor) |
| **MO6** | SplitText + Stagger (kinetic typography) |
| **MO7** | View Transitions API |
| **MO8** | Web Animations API (imperative) |
| **MO9** | WAAPI + Popover API (stateful) |
| **MO10** | No Motion / Static (print-first editorial) |

---

## PROJECT MATRIX (mevcut projelerin combo'ları — repeat guard)

Bu tablo REPEAT-GUARD için. Yeni combo seçilirken buna bakılır, ≥8 kolon üstüste aynı olamaz.

| Proje | Header | Nav | Hero | KPI | Pipeline | Table | Chat | Chart | Form | Modal | Footer | Typo | Palette | Layout | Motion |
|-------|--------|-----|------|-----|----------|-------|------|-------|------|-------|--------|------|---------|--------|--------|
| **Freeman** (kuaför) | H8 | N2 | HR2 | — | — | — | — | — | F1 | M1 | FT1 | TY1 · **YASAK** | PL1 · **YASAK** | L1 | MO4 |
| **BG Foto** | H8 | N2 | HR2 | K1 | — | — | — | — | F1 | M1 | FT1 | TY2 · **YASAK** | PL1 · **YASAK** | L1 | MO4 |
| **Dagintaslı** | H8 | N2 | HR2 | K1 | — | — | — | — | F1 | M1 | FT2 | TY2 · **YASAK** | PL1 · **YASAK** | L1 | MO4 |
| **Modern Alyans** | H8 | N2 | HR2 | K1 | — | — | — | — | F1 | M1 | FT2 | TY2 · **YASAK** | PL1 · **YASAK** | L1 | MO4 |
| **Fatih Bey Mücevher** | H8 | N2 | HR2 | K1 | — | T6 | — | — | F1 | M1 | FT2 | TY3 | PL10 | L1 | MO4 |
| **v1-CONSTRUO** (editorial luxury) | H3 | N1 | HR7 | K1 | P1 | T2 | C1 | CH1 | — | M1 | FT1 | TY4 · **YASAK** | PL8-variant · **YASAK** | L1 | MO4 |
| **v2-blueprint** | H9 | N3 | HR13 | K12 | P2 | T3 | — | CH6 | — | — | FT6 | TY5 | PL5 | L5 | MO1 |
| **v2-neobrutalist** | H1-variant | N2 | HR5 | K3 | P10 | T6 | C2 | CH3 | — | — | FT1 | TY6 | PL6 | L2 | MO4 |
| **v2-kinetic-data** | H5 | N7 | HR1 | K10 | P3+P4 | T4 | — | CH11 | — | — | FT7 | TY7 | PL7 | L4 | MO1+MO2+MO6 |
| **v2-immersive-3d** | H8 | N10 | HR4 | K7 | P7 | T6 | — | CH7 | — | — | FT1 | TY8 · **YASAK** | PL8 · **kısmen** | L7 | MO1+3D |
| **mockup-A** (warm-dark) | H8 | — | HR11 | K2 | — | — | — | — | — | — | FT3 | TY9 | PL2 | L6 | MO10 |
| **mockup-B** (editorial) | H2 | — | HR6 | K5 | — | — | — | — | — | — | FT4 | TY10 | PL3 | L5 | MO10 |
| **mockup-C** (industrial) | H1 | — | HR5 | K3 | P — | T3 | — | — | — | — | FT8 | TY11 | PL4 | L1 | MO10 |

---

## REPEAT GUARD KURALLARI

1. **TY1 (Inter-only), TY2 (Playfair+Inter), TY4 (Instrument+SpaceGrotesk), TY8 (DM+Inter)** → yeni projede **YASAK** (5+ kez kullanıldı).
2. **PL1 (dark+gold)** → yeni projede **YASAK** (5+ kez).
3. **PL8 variant (dark+warm orange)** → dikkatli kullan, tekrar riski yüksek.
4. Yeni combo, mevcut projelerin hiçbiri ile **8'den fazla kolonda üstüste eşleşemez**.
5. Skoru otomatik kontrol `design-adversary` agent yapar. 8+ eşleşme varsa "tekrar" bayrağı çeker, director combo'yu reddeder.

---

## SCORING MATRİS (adversary kullanır)

| Eşleşme miktarı | Sonuç |
|-----------------|-------|
| 0-3 kolon üstüste | ✓ Farklı, geç |
| 4-5 | ⚠ İkinci tur gözden geçir |
| 6-7 | ⚠⚠ En az 3 kolon değiştir |
| 8+ | ✗ Red, combo yeniden |

---

## YENİ COMBO TEMPLATE (council çıktısı)

Her proje için council şu tabloyu üretir:

```markdown
## [PROJE ADI] — Pathway Combo

| Kategori | Seçim ID | Neden (agent notu) |
|----------|----------|---------------------|
| Header | H? | ... |
| Nav | N? | ... |
| Hero | HR? | ... |
| KPI | K? | ... |
| Pipeline | P? | ... |
| Table | T? | ... |
| Chat | C? | ... |
| Chart | CH? | ... |
| Form | F? | ... |
| Modal | M? | ... |
| Footer | FT? | ... |
| Typography | TY? | ... |
| Palette | PL? | ... |
| Layout | L? | ... |
| Motion | MO? | ... |

**Repeat-guard skoru:** X/15 kolon mevcut projelerle eşleşme (max 7).
**Adversary onayı:** ✓ / ✗
**3 alternatif (A / B / C):** ...
```

---

## NOT

- Yeni pathway eklenebilir (pattern keşfedildikçe). ID rezerv sistemi: her kategoriye 50 slot boş bırakıldı (H11-H60, N11-N60, vs.).
- Her 10 yeni projede bir katalogu güncelleyip "hangi ID'ler yoğun kullanıldı, hangisi hiç kullanılmadı" raporu çıkar.
- Her PRO (agent) kendi kategorisinde yeni ID önerebilir — director onaylar.
