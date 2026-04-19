# Tech Stack Detection Methodology — 2026

> Herhangi bir ajans/portfolyo sitesinin kullandığı teknolojileri **5 dakikada** tespit etme rehberi.
> Agent'larla paralel araştırma için standart prosedür.

---

## 1 · Otomatik Araçlar (0-30 saniye, fingerprint)

### Wappalyzer (Chrome/Firefox ext + CLI)
Tek tıkla: JS frameworks, CMS, CDN, analytics, font providers.
```bash
npx wappalyzer https://fraxbit.com
# veya CLI: npm i -g wappalyzer-cli
```
Çıktı: CMS: WordPress · Builder: Elementor · JS: jQuery + GSAP

### BuiltWith.com
Web UI veya API — **daha kapsamlı** (hosting, DNS, analytics, SSL, e-commerce plugins).
URL: `https://builtwith.com/fraxbit.com`
Pro: geriye dönük "ne zaman eklendi" gösterir.

### WhatRuns (whatruns.com)
Hızlı Chrome ext — SVG animations, typekit, LinkedIn pixel, tag manager.

### Statemap / Bundlephobia
JS bundle size + tree-shake analysis.

---

## 2 · Manuel View-Source (60 sn — gerçek kod)

Tarayıcıda `Ctrl+U` → Chrome `view-source:https://...`

### Aradığın signature pattern'ler (Ctrl+F):

| Arama | Gösterdiği |
|-------|-----------|
| `gsap` | GSAP kullanımı — version da yazıyor |
| `three.min.js` veya `three.module.js` | Three.js |
| `lenis` | Lenis smooth scroll |
| `framer-motion` | Framer Motion (React) |
| `locomotive-scroll` | Locomotive (GSAP alternatifi) |
| `barba` | Barba.js page transition |
| `splitting` | Splitting.js text split |
| `anime.js` | Anime library |
| `pixi.js` | PixiJS 2D WebGL |
| `<spline-viewer>` | Spline 3D embed |
| `<model-viewer>` | Google model-viewer (GLB) |
| `ogl` | OGL lightweight WebGL (Nuxt tercihi) |
| `.glb` veya `.gltf` | 3D model asset |
| `.splat` veya `.ply` | Gaussian Splatting |
| `webflow.com` CDN | Webflow barındırma |
| `vercel.app` / `nuxt/static` | Vercel / Nuxt deploy |
| `player.vimeo.com/api` | Vimeo background video |
| `feTurbulence` | SVG grain overlay |
| `font-variation-settings` | Variable font axes |
| `backdrop-filter` | Glassmorphism |
| `mix-blend-mode` | Difference/screen blend tricks |
| `clip-path: polygon` | Reveal mask tekniği |
| `data-scroll` / `data-speed` | Locomotive veya custom parallax |
| `data-barba` | Barba.js route |
| `data-splitting` | Splitting.js |
| `data-fade-clip` | GSAP custom attribute (mdx.so pattern) |
| `scrambleText` veya `scrambleTextPlugin` | GSAP ScrambleText |

---

## 3 · Chrome DevTools Network Tab (2-3 dakika — CDN + boyut)

### Adımlar:
1. F12 → Network tab
2. `Cmd+R` hard refresh (Disable cache ON)
3. Filter: `JS` — yüklü tüm scriptler (with URLs + size)
4. Filter: `Font` — hangi fontlar (Google/Adobe/self-hosted)
5. Filter: `Media` — video/3D asset boyutları

### Önemli sütunlar:
- **Name:** CDN URL (→ hangi paket)
- **Size:** KB (bundle size clue)
- **Time:** yüklenme hızı
- **Initiator:** hangi dosya bunu çağırıyor (dependency graph)

### Örnek analiz:
```
gsap.min.js         90 KB    cdnjs.cloudflare.com/.../3.12.5
ScrollTrigger.min   35 KB    cdnjs.cloudflare.com/.../3.12.5
SplitText.min       12 KB    cdn.jsdelivr.net/.../3.13
lenis.min.js         4 KB    unpkg.com/lenis@1.3.4
three.module.js    640 KB    unpkg.com/three@0.162.0
```
→ Bu kombinasyon = "Lusion-tier R3F stack".

---

## 4 · HTML DOM Pattern Inspection (5 dakika — teknik niyet)

### `data-*` attribute'ları (custom convention'lar):
- `data-scroll`, `data-scroll-speed` → Locomotive
- `data-gsap`, `data-animate` → Custom GSAP
- `data-splitting`, `data-type="chars"` → Splitting.js
- `data-barba` → Barba routing
- `data-fade-clip`, `data-fade-y` → mdx.so custom (copy-paste uygun)
- `data-vimeo-bg-init` → Vimeo background loop
- `data-wab-hero-left` → wearebrand.io custom

### CSS class prefix'leri (convention kimlik):
- `.elementor-` → Elementor (WordPress)
- `.oxy-` → Oxygen Builder
- `.wp-block-` → Gutenberg blocks
- `.w-` → Webflow
- `.framer-` → Framer
- `.tw-` veya `.sm:` `.md:` → Tailwind
- `._module_` → CSS Modules (React)
- `.__wab_` → Plasmic

### CSS custom properties (değişkenler):
View computed style (DevTools Elements > Computed). Kullanılan `--var-*` keşfedilir:
- `--parallax`, `--speed-x` → Motion Design plugin
- `--mask-y` → wearebrand.io custom mask reveal
- `--progress`, `--lenis-scroll` → scroll-linked calc patterns

---

## 5 · JS Bundle Analizi (deep dive, 10-15 dakika)

### CDN veya minified dosyayı indir:
```bash
curl -s https://example.com/assets/main.min.js > main.min.js
# Unminify için:
npx prettier --write main.min.js
# Keyword search:
grep -oE "gsap|three|lenis|barba|split|webgl|shader|ctx.drawImage|new Worker" main.min.js | sort -u
```

### Sourcemap varsa (`.map`):
```js
// main.min.js sonunda:
//# sourceMappingURL=main.min.js.map
```
Download `main.min.js.map` → orijinal dosya yapısı ve yorum satırları görünür.

### Önemli bulgular:
- `new Lenis({...})` blok → smooth scroll config
- `gsap.timeline({...})` → animation orchestration
- `useEffect(() => { ... })` → React + hook-based animation
- `requestAnimationFrame(loop)` → manuel canvas/WebGL loop
- `new Worker(...)` → Web Worker (performance opt)
- WebGL shader: `uniform`, `varying`, `gl_FragColor` → GLSL source gömülü

---

## 6 · Three.js / 3D Spesifik Tespit

### `<spline-viewer>` embed:
```html
<spline-viewer url="https://prod.spline.design/xyz/scene.splinecode"></spline-viewer>
```
Spline kullanıyor ama Three.js raw değil.

### `<model-viewer>` (Google):
```html
<model-viewer src="/model.glb" auto-rotate camera-controls></model-viewer>
```
Shopify + e-commerce sıklıkla kullanır.

### Three.js raw kullanımı belirtileri:
- `import * as THREE from 'three'` (source görünürse)
- `new THREE.Scene()`, `new THREE.WebGLRenderer()`
- `renderer.setPixelRatio(devicePixelRatio)`
- `renderer.setSize(...)` canvas attach

### R3F (React Three Fiber):
- `import { Canvas } from '@react-three/fiber'`
- `<Canvas>` JSX tag
- `useFrame`, `useThree` hook'ları
- drei: `<OrbitControls>`, `<Environment>`, `<Float>`

### Gaussian Splatting:
- `.splat` veya `.ply` asset
- `gsplat` npm paketi (veya `huggingface/gsplat.js`)

---

## 7 · Open Source Kod Bulma

### GitHub organization/user arama:
```
github.com/[username]
github.com/search?q=[agency+name]
```
Agency'ler genelde:
- Demo repository (case study)
- Custom GSAP plugin
- Boilerplate template

### CodePen profil:
`codepen.io/[username]` — çoğu designer günlük oraya yüklüyor.

### Codrops tutorials:
`tympanus.net/codrops/?s=[technique]` — gerçek çalışır demo + kaynak kod.

### Awwwards `credits` bölümü:
Awwwards site entry'sinde "Credits" + "Technologies used" listelenir (self-reported).

---

## 8 · TikTok / YouTube Tutorial İzleme

Büyük hesaplar (marcelodesignx, wearebrand.io) kendi tutorial'larını paylaşıyor.
- TikTok profil scroll: en çok beğenilen 5 video → hangi tekniği anlatıyor
- YouTube kanal: 10+ dakikalık detaylı tutorial'lar (Figma to Webflow, R3F portfolio, vs.)
- CapCut / Loom: ekran kaydı genelde timestamp ile organize

---

## 9 · Performance Profiling (bonus)

### Lighthouse (DevTools):
Core Web Vitals + bundle size + unused JS.

### WebPageTest:
`webpagetest.org` — gerçekçi network conditions + waterfall.

### BundlePhobia:
`bundlephobia.com/package/lenis@1.3.4` — size + dependencies.

---

## 10 · Agent Automation Brief Template

Araştırma için agent'a vereceğin standart prompt:

```
Hedef: [https://URL]

YAPACAKLARIN:
1. WebFetch ile site'yi çek
2. HTML'deki script tag'leri ve CDN URL'lerini listele
3. Aşağıdaki keyword'leri ara (case-insensitive):
   gsap, three, lenis, framer, barba, splitting, locomotive,
   pixi, ogl, spline-viewer, model-viewer, webflow.com,
   feTurbulence, font-variation-settings, data-scroll,
   data-barba, clip-path, mix-blend-mode, backdrop-filter
4. CSS custom properties (--var-*) çıkar
5. Font-family değerlerini listele
6. Renk paleti (actual hex değerleri) raporla
7. data-* attribute convention'larından framework tahmin et
8. Eğer GitHub/CodePen/YouTube bağlantısı varsa not al

ÇIKTI:
- Platform: [WordPress/Webflow/Next.js/Nuxt/custom]
- JS Libraries (versiyon + CDN URL + size):
- CSS Techniques:
- Typography:
- Color Palette:
- Signature animation patterns (kod örneği):
- Open source / paylaşım:
```

---

## 11 · Quick Lookup Tablosu (pattern → library)

| Gözlenen | Muhtemel Library | CDN |
|----------|------------------|-----|
| `gsap.to()`, `ScrollTrigger` | GSAP 3.x | `cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0` |
| `new Lenis()` | Lenis 1.x | `unpkg.com/lenis@1.3.4` |
| `locomotive-scroll.min.js` | Locomotive | `unpkg.com/locomotive-scroll@4` |
| `barba.init(...)` | Barba.js | `unpkg.com/@barba/core` |
| `import { motion }` | Framer Motion (React) | npm only |
| `<Canvas>` + `useFrame` | R3F | npm + @react-three/fiber |
| `new PIXI.Application()` | PixiJS | `cdn.jsdelivr.net/npm/pixi.js@8` |
| `new Splitting()` | Splitting.js | `unpkg.com/splitting/dist/splitting.min.js` |
| `anime({...})` | anime.js | `cdn.jsdelivr.net/npm/animejs@3` |
| `tsparticles` | tsParticles | `cdn.jsdelivr.net/npm/tsparticles@3` |
| `theatre.js` | Theatre.js (keyframe editor) | `unpkg.com/@theatre/core` |
| `gsplat.js` | Gaussian Splatting | `cdn.jsdelivr.net/npm/gsplat` |
| `lottie-web.min.js` | Lottie | `cdn.jsdelivr.net/npm/lottie-web` |
| `ogl.min.js` | OGL | `unpkg.com/ogl@1` |
| `@splinetool/viewer` | Spline | `unpkg.com/@splinetool/viewer` |
| `@google/model-viewer` | model-viewer | `unpkg.com/@google/model-viewer` |

---

## 12 · Sık Yapılan Hatalar / Limitler

- **Cloudflare / Vercel edge-cached HTML** bazen script'leri maskeliyor — DevTools Network tab daha güvenilir
- **TikTok / Instagram scrape** çoğu zaman authenticated (cookie) + bot-blocked; API alternatif yok
- **Bot-gated siteler** Cloudflare Turnstile arkasında — WebFetch 403 döner, User-Agent değişiklik gerekli
- **React SSR'de** component kodu başlangıçta HTML'de var ama ilerleyen state'ler yok — sonuç: hook/effect'ler sadece DevTools'ta çalışırken gözlenir
- **CSS inlined** custom property'ler `<style>` içinde gömülü ama class'ta yok — tüm style tag'lerini incele
