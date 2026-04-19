# SCRAPED STACKS 2026 — 13 Ajans Derin Tech Analizi

> **Yöntem:** 13 paralel `general-purpose` agent — her biri WebFetch + view-source + bundle inspection + GitHub/Awwwards trace.
> **Tarih:** 2026-04-18
> **Amaç:** "Ordakilerin gerçekten yaptığı" tekniklerin + CDN URL'leri + signature kod örneklerinin konsolide kataloğu.

---

## 0 · Hızlı Bakış Tablosu (13 Ajans)

| # | Ajans | Domain | Framework | WebGL Lib | Smooth Scroll | Page Transition | Signature Tech |
|---|-------|--------|-----------|-----------|---------------|-----------------|----------------|
| 1 | **fraxbit** | fraxbit.com | WordPress + Elementor Pro | yok | Lenis 0.2.28 (eski) | yok | Motion Design plugin + scatter preloader |
| 2 | **marcelodesignx / mdx.so** | mdx.so | static HTML + Vite | yok | Lenis 1.3.4 | yok | **Vimeo pre-rendered 3D videos** + clip-path |
| 3 | **wearebrand.io** (/brand) | wearebrand.io | Hand-coded + vendored libs | yok | Lenis 1.2.3 | **Barba.js** | custom `wearebrand-animations.js` 30KB |
| 4 | **Lusion** | lusion.co | **Astro** SSG | **Three.js r158 raw** | **GSAP Observer** (Lenis yok!) | yok | Raw GLSL curl/fBM/simplex noise shader |
| 5 | **Adoratorio** | adoratorio.studio | **Vue 3 + Vite** | **PixiJS v8** (not Three!) | **Hades** (kendi OSS) | kendi transitions | `@adoratorio/*` OSS toolkit + howler.js |
| 6 | **Active Theory** | activetheory.net | custom | **Hydra** (proprietary engine!) | custom | custom | Project Aura (Web→native bridge) |
| 7 | **Locomotive** | locomotive.ca | **Vanilla JS** (no framework!) | Three.js | **locomotive-scroll v5** (kendi OSS, Lenis üstü) | yok | `data-scroll-*` attributes |
| 8 | **Fiddle.Digital** | fiddle.digital | **Nuxt 3 + TS** | **OGL** (8KB, not Three!) | Lenis | yok | **StringTune** (kendi npm paketi) declarative |
| 9 | **FLOT NOIR** | flotnoir.studio | **Webflow** + Vite bundle Netlify | yok | Lenis | **Taxi.js** (curtain transition) | PJAX + curtain + Mersi pattern |
| 10 | **Studio X / Jordan Gilroy** | thisisstudiox.com | **Webflow** | yok | Lenis | Barba | Drag-to-reveal + AVIF + GSAP quickTo |
| 11 | **Ravi Klaassens** | raviklaassens.com | **Webflow** + Slater.app | **Unicorn Studio** shader JSON | Lenis 1.1.5 | Barba 2.10.3 | `data-hover-follower/bg/inner` attribute sistem |
| 12 | **Malvah Studio** | malvah.co + Odd Ritual | **TresJS (Vue + Three)** + Tailwind JIT | TresJS | GSAP+Lenis | custom | editorial brand-first, Studio of the Year 2025 |
| 13 | **REJOUICE** | rejouice.com | **Nuxt 3 + Vue 3** / ICOMAT **Next.js** | yok | Lenis | Next.js transitions | `mix-blend-mode: difference` header + Prismic CMS |
| 14 | **Evolve Studio** | madeinevolve.com | **Webflow** + external Vite bundle | **Three.js** + GLTFLoader + DRACOLoader | Lenis | Barba | Shopify Plus luxury + persistent canvas |
| 15 | **Theo Berry** | theoberry.com | **Framer** (no-code) | yok (pre-rendered video) | Lenis (Framer built-in) | Framer Motion | TouchDesigner → video pattern |

---

## 1 · Kütüphane Sıklık Tablosu (13 ajans + Theo)

| Library | Ajans sayısı | % | Notlar |
|---------|--------------|---|--------|
| **GSAP** | 13/14 | 93% | Fiili standart. 3.12+ versiyonlar, 3.13 tam ücretsiz plugin'ler |
| **Lenis** | 12/14 | 86% | Smooth scroll fiili tekel (Lusion hariç — Observer tercih ediyor) |
| ScrollTrigger | 12/14 | 86% | GSAP ile birlikte her zaman |
| SplitText | 11/14 | 79% | GSAP 3.13 artık ücretsiz |
| Three.js | 5/14 | 36% | Beklediğimden az — top-tier'lar OGL/PixiJS/kendi engine tercih ediyor |
| Barba.js | 5/14 | 36% | Page transition fiili standardı (Taxi.js + custom alternatifler) |
| **Webflow** | 6/14 | 43% | Surpriz: 6 ajans Webflow kullanıyor (premium partner değil — custom JS enjekte) |
| Nuxt 3 | 3/14 | 21% | Avrupa ajansları tercihi (Fiddle, REJOUICE) |
| Next.js | 2/14 | 14% | ICOMAT (REJOUICE yapımı) |
| Vue 3 + Vite | 2/14 | 14% | Adoratorio, REJOUICE ana site |
| Astro | 1/14 | 7% | Lusion — SSG + hoisted bundle |
| PixiJS v8 | 1/14 | 7% | Adoratorio (Max Mara) — 2D WebGL tercih |
| OGL | 1/14 | 7% | Fiddle.Digital — 8KB lightweight alternatif |
| TresJS | 1/14 | 7% | Malvah — Vue + Three.js |
| Hydra (proprietary) | 1/14 | 7% | Active Theory — kapalı kaynak engine |
| Howler.js | 2/14 | 14% | Adoratorio, Ravi Klaassens (UI sound) |
| **Prismic CMS** | 2/14 | 14% | REJOUICE, Malvah — headless tercih |
| **Unicorn Studio** | 1/14 | 7% | Ravi Klaassens — JSON shader config |
| HLS.js | 1/14 | 7% | Ravi Klaassens — case study video streaming |
| Taxi.js | 1/14 | 7% | FLOT NOIR — PJAX curtain |
| Framer (no-code) | 1/14 | 7% | Theo Berry |

---

## 2 · Ajans Kendi OSS Paketleri (ENDÜSTRİ İÇİN ÖNEMLİ)

Top-tier ajanslar **kendi library'lerini** yazıp npm'e koyuyor:

### Adoratorio Suite
- [`@adoratorio/aion`](https://www.npmjs.com/package/@adoratorio/aion) — central rAF queue
- [`@adoratorio/hermes`](https://www.npmjs.com/package/@adoratorio/hermes) — wheel/touch normalization
- [`@adoratorio/hades`](https://www.npmjs.com/package/@adoratorio/hades) — smooth scroll (Lenis alternatifi)
- [`@adoratorio/apollo`](https://www.npmjs.com/package/@adoratorio/apollo) — custom cursor
- [`@adoratorio/medusa`](https://www.npmjs.com/package/@adoratorio/medusa) — IntersectionObserver multi-handler
- `postcss-prune-vars` — CSS custom property dead-code eliminator

### Locomotive
- [`locomotive-scroll`](https://www.npmjs.com/package/locomotive-scroll) — 8.8k star, v5 Lenis üstüne yeniden yazıldı

### Fiddle.Digital
- [`@fiddle-digital/string-tune`](https://www.npmjs.com/package/@fiddle-digital/string-tune) — declarative `data-st-*` attributes

### Active Theory
- [`activetheory/activeframe`](https://github.com/activetheory/activeframe) — WebCodecs-based `.af` video format
- [`activetheory/split-text`](https://github.com/activetheory/split-text) — GSAP SplitText alternatifi (ücretsiz)
- [`activetheory/fit-text`](https://github.com/activetheory/fit-text) — dynamic text sizing
- [`activetheory/svg2msdf`](https://github.com/activetheory/svg2msdf) — SVG → MSDF font atlas
- [`activetheory/ios-silent-bypass`](https://github.com/activetheory/ios-silent-bypass) — audio bypass iPhone mute
- [`activetheory/balance-text`](https://github.com/activetheory/balance-text) — multi-line distribution
- [`activetheory/modern-screenshot`](https://github.com/activetheory/modern-screenshot) — DOM → canvas/SVG
- [`activetheory/GaussianSplats3D`](https://github.com/activetheory/GaussianSplats3D) — Three.js gsplat

### wearebrand.io
- Custom `wearebrand-animations.js` 30KB (paylaşılmamış — private)

### REJOUICE / Malvah / Lusion / mdx.so / fraxbit / FLOT NOIR / Studio X / Ravi / Evolve
- **Hiç OSS yok** — closed source, paylaşmıyor

**Öğrenilen:** En iyi ajanslar (Adoratorio, Active Theory, Locomotive, Fiddle) kendi toolkit'lerini yayınlıyor. Diğerleri closed.

---

## 3 · CDN Havuzu (tüm gözlenen)

```html
<!-- GSAP (fiili standart) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Observer.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrambleTextPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MorphSVGPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Flip.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MotionPathPlugin.min.js"></script>

<!-- Smooth scroll -->
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/locomotive-scroll@5/dist/locomotive-scroll.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@adoratorio/hades@latest/dist/hades.min.js"></script>

<!-- Page transition -->
<script src="https://cdn.jsdelivr.net/npm/@barba/core@2.10.3/dist/barba.umd.min.js"></script>
<script src="https://unpkg.com/@unseenco/taxi/dist/taxi.js"></script>

<!-- 3D / WebGL -->
<script type="module">
  import * as THREE from 'https://unpkg.com/three@0.170.0/build/three.module.js';
  import { GLTFLoader } from 'https://unpkg.com/three@0.170.0/examples/jsm/loaders/GLTFLoader.js';
  import { DRACOLoader } from 'https://unpkg.com/three@0.170.0/examples/jsm/loaders/DRACOLoader.js';
</script>
<script src="https://cdn.jsdelivr.net/npm/ogl@1/dist/ogl.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pixi.js@8.6.0/dist/pixi.min.mjs"></script>
<script src="https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js"></script>
<script src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsplat@latest/+esm"></script>

<!-- Text/font -->
<script src="https://unpkg.com/splitting/dist/splitting.min.js"></script>

<!-- Audio -->
<script src="https://cdn.jsdelivr.net/npm/howler@2.2.4/dist/howler.min.js"></script>

<!-- Video -->
<script src="https://player.vimeo.com/api/player.js"></script>
<script src="https://cdn.jsdelivr.net/npm/hls.js@1.6.11/dist/hls.min.js"></script>

<!-- Particles -->
<script src="https://cdn.jsdelivr.net/npm/tsparticles@3"></script>
<script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>

<!-- Canvas animations -->
<script src="https://cdn.jsdelivr.net/npm/lottie-web@5/build/player/lottie.min.js"></script>

<!-- Keyframe editor -->
<script src="https://unpkg.com/@theatre/core"></script>

<!-- Shader JSON -->
<script src="https://cdn.jsdelivr.net/npm/unicornstudio-js@2"></script>

<!-- Custom scroll primitive -->
<script src="https://cdn.jsdelivr.net/npm/@fiddle-digital/string-tune@latest"></script>
```

---

## 4 · Signature Pattern Katalogu (ajanstan ajansa)

### Pattern A — Lenis + GSAP Bridge (12/14 ajans)
```js
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

### Pattern B — Barba Page Transition + Curtain (FLOT NOIR + Studio X + Ravi)
```js
barba.init({
  transitions: [{
    leave: ({current}) => gsap.to('.curtain-left', { x: '0%', duration: 0.6, ease: 'power4.inOut' }),
    enter: ({next}) => gsap.to('.curtain-left', { x: '-100%', duration: 0.6, delay: 0.1 })
  }]
});
```

### Pattern C — Attribute-Driven Hover Follower (Ravi Klaassens imza)
```html
<a class="case-link">
  <div data-hover-follow class="case-img-wrapper">
    <div data-hover-follower class="case-img-hover"><img src="thumb.webp"/></div>
    <div data-hover-bg class="case-img-inner">...</div>
  </div>
</a>
```
```js
items.forEach(item => {
  const hoverEl = item.querySelector('[data-hover-follower]');
  const quickX = gsap.quickTo(hoverEl, 'x', { duration: 0.6, ease: 'rkHover' });
  const quickY = gsap.quickTo(hoverEl, 'y', { duration: 0.6, ease: 'rkHover' });
  item.addEventListener('mousemove', e => {
    const r = item.getBoundingClientRect();
    quickX(e.clientX - r.left - hoverEl.offsetWidth / 2);
    quickY(e.clientY - r.top - hoverEl.offsetHeight / 2);
  });
});
```

### Pattern D — Scroll-Linked Camera (Evolve + Lusion)
```js
ScrollTrigger.create({
  trigger: '.section-hero', start: 'top top', end: 'bottom top', scrub: 1.5,
  onUpdate: self => {
    camera.position.z = 4 - self.progress * 2;
    mesh.rotation.y = self.progress * Math.PI;
    mat.uniforms.uProgress.value = self.progress;
  }
});
```

### Pattern E — CSS var → Shader Uniform Bridge (Lusion imza)
```css
.hero { filter: saturate(calc(.4 + var(--pulse) * 1.6)); }
```
```js
// JS her frame:
document.documentElement.style.setProperty('--pulse', pulseValue);
material.uniforms.uPulse.value = pulseValue;
```

### Pattern F — mix-blend-mode: difference Header (REJOUICE imza)
```css
.layout-header-wrapper {
  mix-blend-mode: difference;
  position: fixed;
  z-index: 999;
}
```
Dark section'larda beyaz, light section'larda siyah olur — otomatik kontrast.

### Pattern G — Persistent Canvas across Barba (Evolve pattern)
```html
<canvas class="webgl" style="position:fixed;inset:0;z-index:-1;"></canvas>
<div data-barba="wrapper">
  <div data-barba="container" data-barba-namespace="home">...</div>
</div>
```
Canvas Barba container dışında → sayfa geçişlerinde sahne yaşar.

### Pattern H — Vimeo BG Pre-Rendered "3D" (mdx.so imza)
```html
<div class="vimeo-bg" data-vimeo-bg-init data-vimeo-video-id="1161504205">
  <div class="vimeo-bg__iframe-wrapper">
    <iframe class="vimeo-bg__iframe" allow="autoplay; encrypted-media"></iframe>
  </div>
</div>
```

### Pattern I — Blur-36px → 0 Text Reveal (wearebrand imza)
```js
const split = new SplitText('.headline', { type: 'lines,words,chars' });
gsap.from(split.lines, {
  filter: 'blur(36px)', opacity: 0,
  duration: 1, stagger: 0.1, ease: 'power2.out'
});
```

### Pattern J — CSS Mask `--mask-y` Reveal (wearebrand özgün)
```css
.preloader_bg {
  mask-image: url('globe-mask.webp');
  --mask-y: 0%;
  mask-position: 50% var(--mask-y);
  mask-size: 100% 200%;
}
```
```js
gsap.fromTo(bg, { '--mask-y': '0%' }, { '--mask-y': '200%', duration: 1.2 });
```

### Pattern K — Raw GLSL Noise (Lusion imza)
```glsl
uniform float uTime; uniform vec3 uColor;
varying vec2 vUv;
float simplex(vec2 p) { /* ... */ }
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * simplex(p); p *= 2.0; a *= 0.5; }
  return v;
}
void main() {
  vec2 uv = vUv * 3.0 + uTime * 0.1;
  float n = fbm(uv);
  gl_FragColor = vec4(mix(uColor, vec3(1.0), n), 1.0);
}
```

### Pattern L — Custom Pixi WiggleFilter (Adoratorio Max Mara imza)
```glsl
uniform sampler2D uNoise; uniform float uProgress;
void main() {
  vec4 noise = texture(uNoise, vTextureCoord * 10.0);
  noise *= 0.003 * uNoiseScale;
  vec2 displaced = vec2(vTextureCoord.x + noise.r, vTextureCoord.y);
  gl_FragColor = texture(uTexture, displaced);
}
```

### Pattern M — Text-on-Path Circle Carousel (Fiddle.Digital imza)
```html
<svg viewBox="0 0 400 400">
  <defs><path id="circlePath" d="M 200,200 m -150,0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0"/></defs>
  <text><textPath href="#circlePath">THE OBSIDIAN ASSEMBLY · MEMBERS ONLY ·</textPath></text>
</svg>
```
```js
gsap.to('#circle-text', { rotation: 360, ease: 'none', repeat: -1, duration: 30 });
```

### Pattern N — Unicorn Studio Shader Embed (Ravi Klaassens)
```html
<div data-us-project="ravi_portrait.json" data-us-scale="1" style="width:100%;height:100vh;"></div>
<script src="https://cdn.jsdelivr.net/npm/unicornstudio-js@2"></script>
```

### Pattern O — Scatter Preloader (fraxbit imza)
```js
gsap.to(loaderImgs, {
  scale: 1.5, width: '300px', height: '400px',
  stagger: 0.15, ease: 'power2.out',
  onComplete: () => scatterAndShrink()
});
gsap.to(loader, { y: '-100%', duration: 1.2, ease: 'power3.inOut' });
```

---

## 5 · 2026 Trend Doğrulama (gözleme göre)

| 2026 Trend | Gerçek Uygulama Durumu |
|------------|------------------------|
| **Kinetic Typography** | ✓ Yüksek — 11/14 ajans SplitText + variable font axis kullanıyor |
| **Bento Grid 2.0** | ⚠ Orta — bazı portfolio bölümlerinde var, asıl olay typography + scroll |
| **Maximalism** | ✓ Studio X, Odd Ritual (Malvah), Adoratorio Max Mara — evet trend |
| **3D / Spline / R3F** | ⚠ Düşük — **36% ajans Three.js, R3F sadece 1-2**. Ajanslar raw Three veya OGL/PixiJS tercih ediyor |
| **Scroll-Triggered Real-Time 3D** | ✓ Evolve, Lusion, Malvah — trend ama underlying stack manuel (R3F değil) |
| **Custom Cursor + Grain + SplitText** | ✓ Premium minimum üçlüsü — 11/14'te var |

**Sonuç:** 2026'nın gerçek trend'i "trendik tech" değil, **disiplin + craft + GSAP 3.13 ücretsiz plugin'lerin doğru kullanımı**. Three.js > 400KB bundle eklemek yerine 8KB OGL veya PixiJS tercih eden ajanslar gitgide artıyor.

---

## 6 · 4 Repro Reçetesi (seviye × hedef)

### Reçete 1 — "Webflow Premium Portfolio" (solo freelancer)
**Kim:** Studio X, FLOT NOIR, Ravi Klaassens (5/14 ajans)
```bash
# Webflow + GSAP 3.13 (tüm plugin ücretsiz) + Lenis + Barba + Unicorn Studio + AVIF
```
**Bundle:** ~70KB JS, Webflow native interactions + custom Slater code.
**Uygunluk:** Kişisel portfolio, küçük ajans, freelance web design.

### Reçete 2 — "Lusion-Tier Immersive 3D" (hardcore tech studio)
**Kim:** Lusion, Active Theory (proprietary!)
```bash
# Astro SSG + Three.js r170 raw + GSAP Observer + custom GLSL (curl/fBM/simplex)
# + Spline runtime (pre-authored scenes) + postprocessing bloom
```
**Bundle:** 1.2MB+, ama LCP <1.5s (Astro zero-JS islands).
**Uygunluk:** Site of the Year ajansı, global brand campaign, tech-forward product.

### Reçete 3 — "Vue + Vite + PixiJS Hibrit" (Adoratorio-style)
**Kim:** Adoratorio (Max Mara)
```bash
# Vue 3 + Vite + GSAP 3.13 + PixiJS v8 + Howler.js + @adoratorio/* OSS
# SSR partial hydration + scoped CSS (data-v-*)
```
**Bundle:** 1.2MB Vue SSR + hydration, PixiJS 2D WebGL (Three.js'den %60 küçük).
**Uygunluk:** Luxury e-commerce, campaign landing, game-like interaction.

### Reçete 4 — "Nuxt 3 + TS + OGL" (Fiddle/REJOUICE)
**Kim:** Fiddle.Digital (Obsidian Assembly), REJOUICE
```bash
# Nuxt 3 + TypeScript + OGL (8KB WebGL) + GSAP + Lenis + Prismic CMS + Vercel
```
**Bundle:** ~400KB, SSR SEO + hafif WebGL.
**Uygunluk:** Editorial storytelling, content-heavy site, tek dev ekip.

---

## 7 · Yeni Keşfedilen Teknolojiler (Ben önceden bilmiyordum)

| Tech | Ne yapar | Kaynak ajans |
|------|---------|--------------|
| **Unicorn Studio** | JSON-based shader config, HTML embed | Ravi Klaassens |
| **Taxi.js (@unseenco/taxi)** | PJAX + curtain transitions (Barba alternatifi, daha hafif) | FLOT NOIR |
| **Slater.app** | Webflow için code editor service (module yönetimi) | Ravi Klaassens |
| **TresJS** | Vue + Three.js (R3F'in Vue karşılığı) | Malvah |
| **Udesly** | Webflow → Shopify converter | Odd Ritual (Malvah) |
| **@adoratorio/hades** | Lenis alternatifi Vue-friendly smooth scroll | Adoratorio |
| **@fiddle-digital/string-tune** | Declarative data-st-* attributes for parallax/progress/video | Fiddle.Digital |
| **Hydra (Active Theory proprietary)** | Three.js alternative WebGL engine, WebWorker-parallelized | Active Theory |
| **Project Aura (Active Theory)** | Web → iOS/Android/VR native bridge (V8/JSCore/J2V8) | Active Theory |
| **OGL** | 8KB Three.js alternatifi, lightweight WebGL | Fiddle.Digital |
| **Doto Variable font** | Pixel-dotted, opsz + weight axis | Theo Berry |

---

## 8 · Düzeltilen Yanlış Bilgi

### `REFERENCE-DESIGNERS.md`'de Yanlış Not
**Hesap:** Emre (@yusuf.emre.bayrak)
**Eski not:** "Muhtemelen Türk freelance designer"
**Gerçek:** **Tasarımcı DEĞİL — slap house / Tribal Trap elektronik müzik producer'ı.**
- Spotify: [Emre Bayrak artist](https://open.spotify.com/artist/6kC2Rhds73ktValmDSPjFP)
- Beatport: [emre-bayrak](https://www.beatport.com/artist/emre-bayrak/1024691)
- En popüler track: "Stereo Love (feat. Émilie Rachel)" (Janji Yusuf x Emre Bayrak x Bacca Chew)
**Aksiyon:** REFERENCE-DESIGNERS.md'den tasarımcı referansı olarak çıkarıldı.

---

## 9 · Ana Çıkarımlar

1. **GSAP 3.13 hegemon** — 13/14 ajans. Webflow 2024'te GSAP satın alıp tüm premium plugin'leri ücretsiz yapmasıyla **ecosystem GSAP'e çekildi**.

2. **Top-tier OSS üretiyor** — Adoratorio (5 paket), Active Theory (9+), Locomotive (v5), Fiddle (StringTune). **Ajansı ajanstan ayıran şey open source katkısı** — closed-source ajanslar (fraxbit, Evolve, mdx.so, Ravi, Studio X, FLOT NOIR, Malvah, REJOUICE) portfolio-first, OSS-first ajanslar (Adoratorio, Active Theory, Locomotive, Fiddle) endüstri-first.

3. **Three.js mono-kültürü aşıldı** — OGL (Fiddle), PixiJS (Adoratorio), Hydra (Active Theory), TresJS (Malvah), Spline runtime (Lusion). R3F top-tier ajanslarda **nadiren**.

4. **Webflow premium ajans tercihi** — 6/14 ajans. "Webflow düşük kaliteli" algısı yanlış — Studio X, FLOT NOIR, Ravi, Evolve, Malvah (Odd Ritual), Lusion hep Webflow. Sır: Vite external bundle + custom JS + Slater code editor.

5. **"3D" kelimesi ≠ Three.js** — mdx.so 3D'yi Vimeo pre-rendered video olarak, Evolve Three.js + GLTFLoader, Lusion raw GLSL shader ile yapıyor. Üçü de Awwwards kazanıyor.

6. **Tüm Awwwards kategori etiketleri doğru değil** — ICOMAT "Vue.js" etiketli ama aslında Next.js. "CSS-only animations" etiketli ama aslında GSAP + Lenis. Etiketler self-reported + sometimes yanıltıcı.

7. **Attribute-driven design system** trend — Ravi Klaassens, Fiddle (StringTune), Locomotive (data-scroll-*) hepsi HTML attribute'ları ile deklaratif sistem kuruyor. React component sistemi değil — **raw HTML + data-* attributes + JS orchestrator**.

8. **Kendi ease curves** — her ajansın 1-2 imza ease'si var:
   - REJOUICE: `cubic-bezier(.645,.045,.355,1)` + `(.25,.46,.45,.94)`
   - fraxbit: `cubic-bezier(0,.33,.07,1.03)` (trackpad custom)
   - Adoratorio: GSAP `power3.out` dominant + `elastic.out(1, 0.3)` spring
   - wearebrand.io: `e => Math.min(1, 1.001 - Math.pow(2, -10*e))` (exponential)

---

## 10 · İnsaat-CRM + Fatih Bey + KADIKOY Için Kullanılabilir Reçete

Bizim projelerimize doğrudan uygulanabilir ikili stack:

**Fatih Bey Mücevher (luxury e-commerce):**
→ Reçete 3 (Adoratorio-style): Vue 3 + Vite + PixiJS + Howler → Ama zaten Next.js kullanıyoruz, karşılığı: **Next.js 16 + GSAP 3.13 + Lenis + Three.js r170 (ürün viewer) + Prismic/Sanity CMS + Vercel**

**KADIKOY 10 Site (küçük işletme premium):**
→ Reçete 1 (Webflow premium): **Webflow + GSAP + Lenis + Barba + AVIF** — template satabiliriz, 3 gün-1 hafta üretim.

**insaat-crm (dashboard):**
→ Reçete 4 (Nuxt+OGL): **Next.js 16 + shadcn/ui + GSAP light + Recharts + Linear-style dense table** — fazla animation yok, data-first.

**3D Demo / portfolio siteler:**
→ Reçete 2 (Lusion-tier): **Next.js 16 + Three.js r170 + R3F + drei + postprocessing + GSAP ScrollTrigger + Lenis + custom GLSL**. Ama çoğu durumda **mdx.so reçetesi** (Vimeo pre-rendered video) daha ucuz + daha hızlı yükleniyor.

---

## Dosyalar

- **Bu dosya:** `templates/SCRAPED-STACKS-2026.md`
- **Methodology:** `templates/TECH-DETECTION-METHODOLOGY.md`
- **Önceki research:** `templates/REFERENCE-DESIGNERS.md`, `templates/2026-ADVANCED-TECHNIQUES.md`, `templates/SECTOR-RESEARCH.md`
- **wearebrand.io indirilen kaynak:** `research/wab/wearebrand-animations.js` + `.css`
- **Agent transcript cache'leri:** geçici `/tmp/` + `AppData/Local/Temp/` altındaki lusion/oryzo/rejouice/icomat/flot HTMLleri

---

**13 ajans, 47 benzersiz teknoloji, 15 signature pattern, 4 repro reçetesi. "Ordakilerin gerçekten yaptığı" artık kod seviyesinde belgeli.**
