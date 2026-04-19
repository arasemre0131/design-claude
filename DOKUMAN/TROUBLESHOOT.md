# TROUBLESHOOT.md — Yaygın Hata → Çözüm

> **Amaç:** Sen bir şey çalışmadığı için saatlerce debug etme. Burada arat, çöz.
> **Nasıl kullan:** Ctrl+F ile hata mesajı / keyword ara, altındaki adımı uygula.

---

## Hızlı tanı tablosu

| Hata / Sinyal | Bölüm |
|---------------|-------|
| "Preset bulunamadı" | [Preset hataları](#preset-hataları) |
| "Yasaklı ID kullanıldı" | [Validator hataları](#validator-hataları) |
| "Recipe mismatch" | [Scaffold CLI karışıklığı](#scaffold-cli-karışıklığı) |
| `pnpm install` hata | [pnpm + Node sorunları](#pnpm--node-sorunları) |
| Next.js 16 alpha bug | [Next.js 16 alpha kısıtları](#nextjs-16-alpha-kısıtları) |
| GSAP paid plugin | [GSAP + Lenis sorunları](#gsap--lenis-sorunları) |
| Tailwind v4 @theme | [Tailwind v4 CSS-first](#tailwind-v4-css-first) |
| R3F SSR hydration | [R3F + SSR sorunları](#r3f--ssr-sorunları) |
| Lighthouse < 90 | [Performance sorunları](#performance-sorunları) |
| Claude Design bundle parse | [Claude Design handoff](#claude-design-handoff) |
| Türkçe karakter kaybı | [Türkçe + UTF-8](#türkçe--utf-8) |
| WordPress 404 | [WordPress + Elementor](#wordpress--elementor) |
| Vercel deploy hatası | [Vercel deploy](#vercel-deploy) |

---

## Preset hataları

### "Preset bulunamadı: `<id>`"

**Sebep:** Preset YAML `catalog/presets/` altında yok.

**Çözüm:**

```bash
# 1) Preset dosyasını bul
ls C:/Users/EAS/Desktop/armut/research/design-claude/catalog/presets/ | grep <id>

# 2) Yoksa MATRIX.md kontrol — hücre ✗ mi?
# catalog/MATRIX.md içinde sektör × stil hücresine bak

# 3) Hücre ✓ ise preset üretilmeli ama henüz yok
#    → CATALOG-STRUCTURE.md "Yeni preset ekleme" adımlarını izle

# 4) Hücre ✗ ise bu combo forbidden
#    → compatibility.yaml forbidden_combinations'da gerekçe
#    → alternatif stil dene (sektörün ✓ kolonları)
```

**Mevcut 60 preset listesi:**
```bash
ls C:/Users/EAS/Desktop/armut/research/design-claude/catalog/presets/*.yaml | wc -l
# Beklenen: 60+ (4 pedagojik örnek dahil)
```

---

### "Preset recipe ile scaffold CLI uyumsuz"

**Sebep:** `scaffold.js` preset'in `recipe` alanını okur. Eğer `wordpress-elementor-motion` ise WP scaffolder'a yönlendirir, ters de geçerli.

**Çözüm:**

| Preset Recipe | Kullan |
|---------------|--------|
| `next-premium` | `node scaffold.js <id>` |
| `next-r3f` | `node scaffold.js <id>` |
| `wordpress-elementor-motion` | `node scaffold/wordpress-elementor/scaffold-wp.js <id>` |
| `shopify-hydrogen` | `node scaffold/shopify-hydrogen/scaffold-shopify.js <id>` |
| `next-enterprise-monorepo` | `node scaffold/enterprise-monorepo/scaffold-enterprise.js <id>` |

**Kontrol:**
```bash
grep "^recipe:" C:/Users/EAS/Desktop/armut/research/design-claude/catalog/presets/<id>.yaml
```

---

## Validator hataları

### "Yasaklı ID kullanıldı: PL1"

**Sebep:** `validate-combo.js` preset veya combo.md'de yasaklı atom ID bulmuş.

**Yasaklı ID tam listesi:**
| ID | Kategori | Alternatif |
|----|----------|------------|
| TY1 | Inter-only | TY27 (Fraunces + IBM Plex), TY28 (Cormorant + Mulish) |
| TY2 | Playfair + Inter | TY27, TY28, TY9 |
| TY4 | Instrument + Space Grotesk | TY27, TY28 |
| TY8 | DM Serif + Inter | TY27, TY28, TY9 |
| PL1 | Dark #0A0A0A + Gold #C9A84C | PL22 (Tobacco+Pearl), PL23 (Plum+Champagne) |
| K1 | Bento glass card | K2 (Band+rules), K5 (Almanac editorial) |
| HR2 | Split 5-slide carousel | HR11 (Brochure cover), HR3 (Full-bleed video) |
| H8 | Difference-blend header | H2 (Masthead centered), H4 (Editorial split) |
| T6 | Card grid ürün | T3 (Spec sheet), L8 (Masonry editorial) |
| L1 | Standard hero-features-cta | L6 (Center single col), L8 (Masonry) |
| CH1 | Chart.js smooth default | CH5 (Custom D3), CH7 (SVG hand-drawn) |
| F1 | Standard form | F4 (Inline edit) |

**Çözüm:**

```bash
# validate-combo çıktısını oku, alternatif atom ID öner
node C:/Users/EAS/Desktop/armut/research/design-claude/scripts/validate-combo.js <preset.yaml>

# Alternatif listeyi catalog-query ile al
# (Claude Code'da)
/catalog-query <sector> <budget> alternative_only
```

---

### "Repeat score 8+ — mevcut projeyle çakışıyor"

**Sebep:** Yeni combo mevcut 13 projeden biriyle 8+ atom eşleşiyor (tekrar klişesi).

**Çözüm:**

```bash
# Hangi proje ile eşleştiğini gör
node scripts/validate-combo.js <preset.yaml> --verbose

# compatibility.yaml > existing_projects'da mevcut combo'lara bak
cat catalog/compatibility.yaml | grep -A 5 "combo:"
```

**Kural:**
- 4-5 eşleşme → ikinci tur review (design-council)
- 6-7 eşleşme → en az 3 kolon değiştir
- 8+ eşleşme → combo reddedilir, yeni atomlar seç

**Mevcut 13 proje combo'ları:** `DESIGN-PATHWAYS.md § PROJECT MATRIX`

---

## Scaffold CLI karışıklığı

### `scaffold.js` çalıştı ama WordPress preset yüklenmedi

**Sebep:** Yanlış CLI.

**Çözüm:**

```bash
# Preset recipe'sine bak
grep "^recipe:" catalog/presets/<id>.yaml

# Sonra doğru CLI:
# recipe: wordpress-elementor-motion
node scaffold/wordpress-elementor/scaffold-wp.js kuafor-minimal-swiss --out ./<proje>/

# recipe: next-premium veya next-r3f
node scaffold.js mucevher-editorial-luxury --out ./<proje>/
```

---

### `scaffold-wp.js` hata: "Preset recipe mismatch — Next.js'e yönlendiriliyor"

**Sebep:** Preset `recipe: next-premium` ama WP CLI çağırdın.

**Çözüm:**

```bash
# 1) Preset'i kontrol et
grep "^recipe:" catalog/presets/<id>.yaml

# 2) Recipe'a göre doğru CLI çağır (yukarıdaki tablo)

# 3) Eğer Next.js preset'i WordPress'e taşımak istiyorsan:
#    catalog/presets/<id>.yaml'i düzenle:
#    - recipe: wordpress-elementor-motion
#    - tier: budget
#    - budget_range_try: [7500, 15000]
#    - delivery_weeks: [0.5, 1]
#    - atoms'u WordPress uyumlu hale getir (custom cursor, advanced motion-ajans çıkar)
```

---

## pnpm + Node sorunları

### `pnpm install` hata: `ERR_PNPM_UNSUPPORTED_ENGINE`

**Sebep:** Node versiyon uyumsuz. design-claude Node 22+ ve pnpm 9+ gerektirir.

**Çözüm:**

```bash
# Versiyon kontrol
node --version    # beklenen: v22.x LTS
pnpm --version    # beklenen: 9.x+

# Yükseltme (Windows)
# Node: https://nodejs.org/en/download → v22 LTS
# pnpm:
npm install -g pnpm@latest

# nvm kullanıyorsan
nvm install 22
nvm use 22
corepack enable
corepack prepare pnpm@latest --activate
```

---

### `pnpm install` takıldı, `ELIFECYCLE` hata

**Sebep:** lockfile bozuk veya cache kirli.

**Çözüm:**

```bash
# 1) Cache temizle
pnpm store prune

# 2) node_modules + lockfile sil
rm -rf node_modules pnpm-lock.yaml

# 3) Yeniden yükle
pnpm install

# 4) Hala hata ise, npm cache
npm cache clean --force
```

---

## Next.js 16 alpha kısıtları

> **Uyarı:** Next.js 16 halen alpha/RC. Bazı feature'lar değişebilir. Fallback gerekirse 15 kullan.

### "Turbopack dev server crash"

**Sebep:** Turbopack alpha bug (özellikle CSS imports, sass, plain.css hatlarında).

**Çözüm:**

```bash
# 1) Webpack fallback
pnpm dev --no-turbo

# 2) next.config.ts içinde turbopack config düzenle
# experimental.turbopack.rules güncelle
```

---

### Next.js 16 → 15 fallback

**Ne zaman:** Alpha bug + teslim tarihine 1 hafta kala.

**Adımlar:**

```bash
# package.json patch
{
  "dependencies": {
    "next": "15.x",         # 16.x → 15.x
    "react": "18.x",        # 19 → 18 (compat için)
    "react-dom": "18.x"
  }
}

pnpm install

# app/layout.tsx bazı Next.js 16 specific API'ler 15'te farklı:
# - generateMetadata fonksiyonu aynı
# - Server Actions aynı
# - Partial Prerendering — Next.js 15'te YOK (experimental değil)
#   → sayfa bazında `export const dynamic = 'force-static'` kullan
```

---

### "React 19 hook'lar çalışmıyor"

**Sebep:** `use()` hook + `useActionState` React 19 alpha. Tip tanımları bazı library'lerde henüz yok.

**Çözüm:**

```ts
// tsconfig.json strict ise:
{
  "compilerOptions": {
    "types": ["@types/react@19", "@types/react-dom@19"]
  }
}

// react-hook-form v7 React 19 uyumlu ama zod resolver bazen tip hatası verir
// Geçici: @ts-expect-error veya any fallback
```

---

## GSAP + Lenis sorunları

### "GSAP paid plugin error"

**Sebep:** Eski research'lerde GSAP plugin'leri paid (MorphSVG, DrawSVG, SplitText paid idi).

**GÜNCELLEMƏ (2026):** GSAP **tamamen ücretsiz** oldu — Webflow satın aldı. Tüm plugin'ler free.

**Çözüm:**

```bash
pnpm add gsap@3.13.0 @gsap/react

# Kullanım (artık tüm plugin'ler free):
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"    # EVET, ücretsiz
import { Observer } from "gsap/Observer"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"  # EVET

gsap.registerPlugin(ScrollTrigger, SplitText, Observer, MorphSVGPlugin)
```

**Private registry gerekmez.** `npm install gsap` yeterli.

---

### "Lenis smooth scroll mobilde bozuk"

**Sebep:** Lenis default config mobil için agresif.

**Çözüm:**

```ts
import Lenis from "lenis"

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  // Mobilde disable
  touchMultiplier: 2,
  smoothWheel: true,
  // Reduced motion respect
  autoResize: true,
})

// Reduced motion kontrol
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  lenis.destroy()
}
```

---

## Tailwind v4 CSS-first

### "Tailwind v4 theme JS config çalışmıyor"

**Sebep:** Tailwind v4 **CSS-first** oldu. `tailwind.config.js` büyük ölçüde kaldırıldı.

**Çözüm:**

```css
/* app/globals.css — Tailwind v4 @theme directive */
@import "tailwindcss";

@theme {
  --color-bg: #1C1A17;
  --color-surface: #26221D;
  --color-ink: #F5EDE0;
  --color-accent: #E89B7C;

  --font-display: "Fraunces", serif;
  --font-body: "IBM Plex Sans", sans-serif;

  --breakpoint-sm: 375px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1280px;
}
```

**JS config YOK.** Tüm tokens CSS `@theme` altında.

---

### "cn() / clsx sınıflar birbirini eziyor"

**Sebep:** Tailwind v4 + tailwind-merge eski sürüm uyumsuz.

**Çözüm:**

```bash
pnpm add tailwind-merge@latest clsx class-variance-authority
```

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## R3F + SSR sorunları

### "R3F SSR hydration error: Canvas is undefined on server"

**Sebep:** `@react-three/fiber` Canvas component client-only.

**Çözüm:**

```tsx
// app/urun/[slug]/page.tsx
"use client"  // ← BU ZORUNLU

import { Canvas } from "@react-three/fiber"
// ...
```

**VEYA dynamic import (tercih edilir):**

```tsx
// app/urun/[slug]/page.tsx (Server Component)
import dynamic from "next/dynamic"

const Urun3DViewer = dynamic(
  () => import("@/components/3d/Urun3DViewer"),
  { ssr: false }
)

export default function UrunPage() {
  return <Urun3DViewer modelUrl="/models/kolye.glb" />
}
```

---

### "drei Environment preset HDR yüklenemiyor"

**Sebep:** `drei@v10` Environment preset default CDN'si bazen down.

**Çözüm:**

```tsx
import { Environment } from "@react-three/drei"

// Kendi HDR'ini host et
<Environment files="/env/studio.hdr" />

// Veya preset (CDN)
<Environment preset="studio" />   # "city", "sunset", "studio", "warehouse"
```

Preset çalışmıyorsa HDR'i kendi Supabase Storage'a yükle.

---

## Performance sorunları

### "Lighthouse Performance < 90"

**Hızlı checklist:**

| Metrik | Hedef | Nasıl fix |
|--------|-------|-----------|
| LCP | < 2.5s | Hero image `priority` flag, WebP/AVIF, font preload |
| CLS | < 0.1 | Image width/height attribute, font-display swap |
| INP | < 200ms | Main thread free, kod split, lazy load |
| TBT | < 300ms | Third-party script defer, web worker heavy task |

**Fix:**

```tsx
// 1) Image optimization
import Image from "next/image"
<Image src="/hero.jpg" alt="..." priority width={1600} height={900} />

// 2) Font preload + swap
// app/layout.tsx
import { Fraunces } from "next/font/google"
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],  # Türkçe için latin-ext
  display: "swap",
  preload: true,
  variable: "--font-fraunces",
})

// 3) Code split
const HeavyComponent = dynamic(() => import("./Heavy"), { ssr: false })

// 4) Third-party scripts
import Script from "next/script"
<Script src="..." strategy="lazyOnload" />
```

---

### "Bundle size > 500KB"

**Sebep:** Büyük dependency'ler client'e sızıyor.

**Çözüm:**

```bash
# Bundle analyze
ANALYZE=true pnpm build

# Yaygın suçlular:
# - framer-motion (>50KB) → use CSS animation or GSAP
# - lodash (tümü) → lodash-es + import specific functions
# - moment.js → date-fns veya dayjs
# - @react-three/* → dynamic import + ssr:false
```

---

## Claude Design handoff

### "Handoff bundle JSON parse error"

**Sebep:** Claude Design export format tutarsız.

**Format şartları:**

```json
{
  "version": "1.0",
  "preset_id": "mucevher-editorial-luxury",
  "atoms": {
    "palette": "PL22",
    "typography": "TY27",
    "hero": "HR11"
  },
  "components": [...],
  "css_vars": {
    "--color-bg": "#1C1A17",
    "--font-display": "Fraunces"
  },
  "font_imports": [
    "Fraunces:opsz,wght@9..144,300..700"
  ]
}
```

**Çözüm:**

```bash
# 1) Bundle format doğrulama
node scripts/validate-handoff.js bundle.json

# 2) Format uyumsuzsa:
# claude-design-liaison agent draft'ı incele
cat catalog/new-agents/claude-design-liaison.md

# 3) Bundle → preset.yaml dönüşüm
# (Agent yazacak, henüz hazır değil)
```

---

## Türkçe + UTF-8

### "Türkçe karakter kaybı — ı, ğ, ş, ç görünmüyor"

**Sebep:** Font `latin-ext` subset yüklenmedi VEYA HTML charset yok.

**Çözüm:**

```tsx
// app/layout.tsx
import { Fraunces } from "next/font/google"

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],  # ← latin-ext zorunlu
  display: "swap",
})

export default function RootLayout({ children }) {
  return (
    <html lang="tr">   {/* ← lang="tr" */}
      <head>
        <meta charSet="utf-8" />   {/* ← zorunlu */}
      </head>
      <body className={fraunces.className}>{children}</body>
    </html>
  )
}
```

**Stil YAML kontrol:**
```yaml
# catalog/styles/<style>.yaml
typography:
  turkish_support: ["i", "İ", "ğ", "ş", "ç", "ö", "ü"]   # ← yes
```

**Test:**
```
Mücevher koleksiyonu — eşsiz zanaat, güçlü çizgi.
ıİğĞşŞçÇöÖüÜ
```

---

### "Font 'Playfair Display' Türkçe yamuk"

**Sebep:** Playfair Türkçe aksanlı karakterlerde çirkin. (Playfair zaten TY2 yasak.)

**Çözüm:**

```ts
// Fraunces opsz var — Türkçe desteği tam
// Cormorant Garamond — Türkçe OK
// Instrument Serif — latin-ext subset var

import { Fraunces } from "next/font/google"
```

**Yasaklı font-TR kombinasyonu:** Playfair Display + `lang="tr"` (ğ çirkin).

---

## WordPress + Elementor

### "WordPress 404 route — sayfa bulunamadı"

**Sebep:** Permalink cache kirli.

**Çözüm:**

```
WP Admin → Settings → Permalinks → "Save Changes" (değişiklik yapmadan kaydet)
```

Bu .htaccess'i yeniden oluşturur.

---

### "Elementor template import hatası"

**Sebep:** Elementor Pro yok (free core'da Library Import yok).

**Çözüm:**
- Elementor Pro yükle (premium plugin, müşteriden lisans iste)
- VEYA Kit Import kullan (Elementor Pro gerekli hala)

---

### "hello-elementor-child fonksiyon çakışması"

**Sebep:** Birden fazla scaffold-wp preset aynı prefix kullanıyor.

**Çözüm:**

`scaffold-wp.js` her preset için benzersiz prefix üretir:
- Fonksiyon: `dc_<preset_slug>_*` → `dc_kuafor_minimal_swiss_enqueue_styles`
- Const: `DC_<PRESET_SLUG>_*` → `DC_KUAFOR_MINIMAL_SWISS_VERSION`

Bu otomatik, ama farklı iki çocuk temanın aktif olması durumunda çakışma olabilir. **Sadece bir child theme aktif tut.**

---

## Vercel deploy

### "Vercel deploy hatası: Missing env vars"

**Sebep:** `.env.local` Vercel'e taşınmadı.

**Çözüm:**

```bash
# Vercel CLI ile env upload
vercel env add SUPABASE_URL production
vercel env add SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production   # SADECE server-side!
vercel env add IYZICO_API_KEY production
vercel env add IYZICO_SECRET_KEY production

# Veya Vercel Dashboard'dan:
# Project → Settings → Environment Variables
```

**Kritik güvenlik:**
- `NEXT_PUBLIC_*` ile başlayanlar client bundle'a girer, güvenli olmalı
- `SUPABASE_SERVICE_ROLE_KEY`, `IYZICO_SECRET_KEY` **ASLA** `NEXT_PUBLIC_*` prefix'i taşımamalı

---

### "Vercel build hatası: `output: 'standalone'` gerekli"

**Sebep:** Bazı hosting Vercel'de `output: 'standalone'` şart değil, ama Cloudflare Pages / Docker'da şart.

**Çözüm:**

```ts
// next.config.ts
const nextConfig = {
  output: "standalone",
  experimental: {
    turbopack: {
      // ...
    },
  },
}

export default nextConfig
```

---

### "Vercel deploy OK ama environment production'da değişti"

**Sebep:** Development env yüklenmiş olabilir.

**Çözüm:**

```bash
# Production env'leri kontrol et
vercel env ls --environment production

# Preview + production ayrı set edilmeli
vercel env add SUPABASE_URL preview
vercel env add SUPABASE_URL production
```

---

## Genel debug stratejisi

### 1. Log oku
```bash
# Next.js build hatası
pnpm build 2>&1 | tee build.log

# Runtime hata
pnpm dev 2>&1 | tee dev.log
```

### 2. Git status
```bash
git -C C:/Users/EAS/Desktop/armut/research/design-claude/ status
git -C C:/Users/EAS/Desktop/armut/research/design-claude/ log --oneline -5
```

### 3. Validate combo
```bash
node scripts/validate-combo.js <proje>/combo.yaml
```

### 4. Preview app test
```bash
cd preview-app && pnpm dev
# localhost:3000/preview/<preset-id> çalışıyor mu?
```

### 5. Minimal reproduction
Bir preset çalışmıyorsa, minimal preset'le test et:
```bash
node scaffold.js mucevher-minimal-swiss --out /tmp/test/ --force
cd /tmp/test/ && pnpm install && pnpm dev
```

`minimal-swiss` en az bağımlılığa sahip, genelde çalışır → sorun diğer preset'e özgü.

---

## Hâlâ takıldıysan

1. **LOG.md** oku: `C:/Users/EAS/Desktop/armut/research/design-claude/LOG.md`
2. **ULTRAPLAN.md** oku: aynı sorunun Faz 0-5'te nasıl çözüldüğü yazıyor olabilir
3. **Memory** sorgula: Claude Code memory'de benzer feedback olabilir
4. **Git blame:** son değişiklik kim yapmış, ne zaman?
   ```bash
   git -C C:/Users/EAS/Desktop/armut/research/design-claude/ log -p catalog/presets/<id>.yaml
   ```

---

## Diğer doküman referansları

| Doküman | Ne için |
|---------|---------|
| [README.md](README.md) | Hızlı başlangıç |
| [CATALOG-STRUCTURE.md](CATALOG-STRUCTURE.md) | YAML schema detay |
| [PIPELINE-GUIDE.md](PIPELINE-GUIDE.md) | Pipeline akışı |
| [SYSTEM-OVERVIEW.md](SYSTEM-OVERVIEW.md) | Mimari |
| [../LOG.md](../LOG.md) | Faz geçmişi + sorun kayıtları |
