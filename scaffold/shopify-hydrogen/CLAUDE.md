# scaffold/shopify-hydrogen — Gelistirme Kurallari

Bu dizin `design-claude` kataloguyla uyumlu bir **Shopify Hydrogen 2024.10+** storefront scaffolder'i saglar.

## Dosya Yapisi

```
scaffold/shopify-hydrogen/
├── hydrogen-base/              # Template (copy edilip patch'lenir)
│   ├── app/
│   │   ├── root.tsx
│   │   ├── entry.client.tsx
│   │   ├── entry.server.tsx
│   │   ├── routes/            # _index, products.$handle, collections, cart, search, account
│   │   ├── components/        # Hero, ProductCard, ProductCard3D, Cart, Header, Footer...
│   │   ├── lib/               # shopify.server, session, fragments, queries, constants
│   │   ├── styles/            # app.css (Tailwind v4 @theme, patch'lenen placeholder'lar)
│   │   └── assets/
│   ├── server.ts               # Oxygen worker entry
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── package.json            # hydrogen 2024.10+, remix 2.15, three, drei, gsap
│   ├── .env.example
│   ├── CLAUDE.md               # Her preset'te patch'lenir (__PRESET_ID__ placeholder)
│   └── README.md
├── scaffold-shopify.js         # CLI orchestrator
├── README.md                   # Kullanim rehberi
└── CLAUDE.md                   # Bu dosya
```

## Placeholder Sistemi

`hydrogen-base/` icindeki dosyalar scaffold-shopify.js tarafindan `__PLACEHOLDER__` string replace ile patch'lenir:

| Placeholder | Kaynak | Doldugu dosyalar |
|-------------|--------|-------------------|
| `__PRESET_ID__` | preset.id | constants.ts, CLAUDE.md, README.md |
| `__PRESET_NAME__` | preset.name veya preset.id | constants.ts, package.json |
| `__PRESET_SECTOR__` | preset.sector | CLAUDE.md |
| `__PRESET_STYLE__` | preset.style | CLAUDE.md |
| `__BUDGET_MIN__` / `__BUDGET_MAX__` | preset.budget_range_try | constants.ts, CLAUDE.md |
| `__DELIVERY_MIN__` / `__DELIVERY_MAX__` | preset.delivery_weeks | constants.ts, CLAUDE.md |
| `__ATOM_PALETTE__` ... `__ATOM_FOOTER__` | preset.atoms.* | constants.ts, CLAUDE.md |
| `__COLOR_BG__` / `__COLOR_INK__` / `__COLOR_ACCENT__` | palette atom | app.css, root.tsx |
| `__FONT_DISPLAY__` / `__FONT_BODY__` / `__FONT_MONO__` | typography atom | app.css |
| `/* __FONT_LINK__ */` | Google Fonts URL | root.tsx |
| `__ANTI_CLICHE_LIST__` | preset.anti_cliche.* birlesik | CLAUDE.md |
| `__LIGHTHOUSE_TARGET__` | preset.scaffold_hints.lighthouse_target | constants.ts, CLAUDE.md |
| `__WCAG_TARGET__` | preset.scaffold_hints.wcag_contrast_target | constants.ts, CLAUDE.md |

## Scaffold-Sonrasi Adimlar (manual)

Scaffold-shopify.js otomatik yapmadiklari:

1. **Shopify Admin** — dev store olustur, headless app ekle, token al
2. **Metafield tanimlari** — admin panel uzerinden custom.3d_model_url vs. olustur
3. **3D model upload** — Blender'dan GLB + Draco compress + Shopify Files/R2'ye yukle
4. **iyzipay** — Shopify app yukle, 2-3 gun onay bekle
5. **Preset-spesifik component writes** — `components/ProductCard.tsx` ve `Hero.tsx`'i preset atom'larina gore patch (ornek: mucevher-immersive-3d icin HR4 3D canvas hero)
6. **Content populate** — collection + product entries

## Gelistirme Kurallari (bu scaffolder'i editleyenler)

1. **Hydrogen API surface** — `@shopify/hydrogen` 2024.10+ stable API (CartForm, Analytics, Money, Image, VariantSelector, Pagination). Bunlari kendi abstraction ile SARMAYIN — straight import edin.
2. **Oxygen runtime = Web Worker** — `process.env` degil `context.env` kullanin, Node-only modulleri server.ts disinda import etmeyin.
3. **Storefront API caching** — `storefront.CacheShort()` / `CacheLong()` / `CacheNone()` wrap'leri kullanin. Default cache = CacheLong (1 saat).
4. **Metafield access pattern** — GraphQL fragment'ta alias kullanin (`metafield3d: metafield(namespace: "custom", key: "3d_model_url")`). Query'de tek namespace'te birden fazla metafield sorgulamak icin alias mecburi.
5. **3D Canvas best practice:**
   - `frameloop="demand"` (idle'da render kesil)
   - `preserveDrawingBuffer={false}` (memory)
   - GPU tier check (`detect-gpu` npm) — tier 0-1'de image fallback
   - `Suspense` + `useGLTF.preload(url)` kullan
6. **i18n** — `country: "TR", language: "TR"` her storefront query'de override edilebilir. `@inContext` directive ekli sorgulardan kopyala, yeni yazma.
7. **Turkce numerik format** — `Intl.NumberFormat("tr-TR")` + `<Money />` default EN locale — helper `formatTurkishPrice` kullan.
8. **KVKK cookie** — `localStorage "kvkk-consent"` minimum. Daha detayli iceriksel izin icin `@shopify/hydrogen` consent provider.
9. **SEO** — Hydrogen `getSeoMeta()` helper + route `meta` export + Product schema JSON-LD (`<JsonLd />` component).
10. **Mobile breakpoint** — 375/768/1280 zorunlu test.

## Test Plani (manual)

Scaffolder tamamlandi sayilmasi icin:

1. `node scaffold-shopify.js mucevher-immersive-3d --out /tmp/test-shopify/` calisiyor
2. `cd /tmp/test-shopify && pnpm install` basarili
3. `.env` doldurulup `pnpm dev` localhost:3000 aciyor
4. Anasayfa yukleniyor (placeholder product olsa bile)
5. `/products/<handle>` acilinca metafield_3d varsa Canvas acilyor
6. `/cart` sepet isliyor (test urunu)
7. `pnpm typecheck` 0 error
8. Lighthouse mobile >= 85

## Eksik / Gelistirilecek (TODO)

- [ ] `apps/test-fixture/` — sahte Shopify Storefront mock (offline dev)
- [ ] Playwright e2e test suite (cart flow)
- [ ] `routes/api/iyzipay.ts` — custom payment webhook handler
- [ ] `routes/sitemap[.xml].ts` — dynamic sitemap (Shopify native sitemap yetersizse)
- [ ] ProductConfigurator component (mucevher alyans configurator)
- [ ] Gaussian Splat viewer (tier 4+ preset icin)

## Referanslar

- **Catalog recipe:** `../../catalog/recipes/shopify-hydrogen.yaml`
- **Sample preset:** `../../catalog/presets/mucevher-immersive-3d.yaml`
- **Hydrogen docs:** https://hydrogen.shopify.dev
- **Storefront API 2024-10:** https://shopify.dev/docs/api/storefront/2024-10
- **Madein.co case study** — Evolve Studio luxury brand ornegi
