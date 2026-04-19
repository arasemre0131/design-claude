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
