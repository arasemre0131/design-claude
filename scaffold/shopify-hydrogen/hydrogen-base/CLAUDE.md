# __PRESET_ID__ — Shopify Hydrogen Proje Kurallari

## Preset Bilgisi

| Alan | Deger |
|------|-------|
| Preset ID | `__PRESET_ID__` |
| Sektor | `__PRESET_SECTOR__` |
| Stil | `__PRESET_STYLE__` |
| Recipe | `shopify-hydrogen` |
| Tier | Premium (3) |
| Butce | __BUDGET_MIN__ – __BUDGET_MAX__ TL |
| Teslim | __DELIVERY_MIN__ – __DELIVERY_MAX__ hafta |

## Stack

- **Framework:** Shopify Hydrogen 2024.10+ (Remix)
- **Runtime:** Oxygen (edge, Cloudflare Worker benzeri)
- **Language:** TypeScript 5.9+
- **Styling:** Tailwind v4 (CSS-first `@theme`)
- **3D:** React Three Fiber 9 + drei 10 + postprocessing
- **Animation:** GSAP 3.13, Lenis 1.3, Framer Motion 12
- **State:** Zustand 5 + TanStack Query 5
- **Payment:** Shopify Payments + iyzipay (TR) + PayTR (alternatif)
- **CMS:** Shopify Metaobjects + Metafields

## Atoms (Design Council Onayli)

| Atom | ID |
|------|-----|
| Palette | `__ATOM_PALETTE__` |
| Typography | `__ATOM_TYPOGRAPHY__` |
| Header | `__ATOM_HEADER__` |
| Nav | `__ATOM_NAV__` |
| Hero | `__ATOM_HERO__` |
| KPI | `__ATOM_KPI__` |
| Footer | `__ATOM_FOOTER__` |

## Yasakli ID'ler (BU PROJEDE KULLANILAMAZ)

__ANTI_CLICHE_LIST__

## Shopify Metafield Yapisi

Admin -> Products -> Metafields ekle:

| Namespace | Key | Type | Aciklama |
|-----------|-----|------|----------|
| `custom` | `3d_model_url` | url | GLB model URL (Cloudflare R2 signed veya Shopify Files) |
| `custom` | `ar_usdz_url` | url | iOS AR Quick Look USDZ URL |
| `custom` | `certificate_pdf` | file_reference | Sertifika PDF (elmas/ayar) |
| `custom` | `spec_sheet` | json | `[{label, value}]` array |
| `custom` | `metal_purity` | single_line_text | 14K / 18K / Platinum |
| `custom` | `stone_carat` | number_decimal | Elmas karat agirligi |

## Komutlar

```bash
pnpm install              # bagimliliklar
cp .env.example .env      # env dosyasi olustur, duzenle
pnpm dev                  # localhost:3000 (shopify hydrogen dev)
pnpm build                # production build
pnpm preview              # build + local preview
pnpm deploy               # Oxygen deploy (shopify hydrogen deploy)
pnpm typecheck            # TS strict (0 error beklenir)
pnpm codegen              # GraphQL codegen (types auto-generate)
```

## .env Gerekli Degerler

1. **Shopify Admin -> Settings -> Apps -> Develop apps -> "Headless" app**:
   - `PUBLIC_STORE_DOMAIN` (myshopify.com subdomain)
   - `PUBLIC_STOREFRONT_API_TOKEN` (Configuration -> Storefront API)
   - `PUBLIC_STOREFRONT_ID` (Shopify.dev'de bulunur)
   - `PRIVATE_STOREFRONT_API_TOKEN` (Admin API -> Generate token)

2. **Customer Account API**:
   - `PUBLIC_CUSTOMER_ACCOUNT_API_URL`
   - `PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID`

3. **iyzipay Turkiye** (Shopify app setup sirasinda 2-3 gun onay):
   - `IYZIPAY_API_KEY`, `IYZIPAY_SECRET_KEY`

## Calisma Kurallari

1. `combo.md` — design-council cikti dosyasi, sadakat zorunlu
2. Yasakli ID listesinde olan atomlari kullanma
3. Tailwind v4 @theme directive ile tokens `app/styles/app.css` icinde
4. Server loader'larda `context.storefront` / `context.cart` / `context.customerAccount` kullan
5. Oxygen runtime = Cloudflare Worker — `process` yerine `env` + Web API kullan
6. GraphQL query'ler `app/lib/queries.ts` icinde, fragment'lar `fragments.ts`
7. Metafield access: `product.metafield3d?.value` (fragment'ta alias kullan)
8. Turkce UI — `html lang="tr"`, tum label/placeholder/error Turkce
9. KVKK cookie banner zorunlu (`<KvkkBanner />` root'ta)
10. 3D Canvas: `frameloop="demand"` + preservedDrawingBuffer=false (performans)

## Onemli Dosyalar

- `app/styles/app.css` — Tailwind v4 @theme tokens (scaffold.js patch)
- `app/root.tsx` — Remix layout, Analytics.Provider, Header/Footer, Cart
- `server.ts` — Oxygen worker entry, storefront/cart/customerAccount init
- `app/lib/shopify.server.ts` — helpers (getStorefront, parseMetafield, formatTurkishPrice)
- `app/lib/fragments.ts` — GraphQL fragments (Product, Cart, Image)
- `app/lib/queries.ts` — Storefront API sorgulari
- `app/lib/constants.ts` — preset metadata + METAFIELD_NAMESPACES
- `app/components/ProductCard3D.tsx` — R3F 3D viewer (metafield-driven)
- `combo.md` — design council combo
- `.env.example` — env template

## Performance Targets

| Metrik | Hedef |
|--------|-------|
| Mobile Lighthouse | __LIGHTHOUSE_TARGET__ |
| LCP | < 2.5s |
| CLS | < 0.05 |
| INP | < 200ms |
| WCAG | __WCAG_TARGET__ |
| 3D Model | < 2MB (Draco + KTX2 + Meshopt) |
| Total 3D scene | < 8MB |
| Desktop FPS | 60 |
| Mobile FPS | 30 |

## Teslim Oncesi Checklist

1. `pnpm typecheck` pass (0 error)
2. `pnpm lint` pass
3. Lighthouse mobile >= __LIGHTHOUSE_TARGET__
4. WCAG: __WCAG_TARGET__
5. 3 breakpoint gorsel test (375/768/1280)
6. iyzico test mode: 3DS + non-3DS odeme calisiyor mu
7. Shopify checkout flow end-to-end (sepete ekle -> odeme -> siparis)
8. Metafield 3d_model_url varsa 3D viewer render ediliyor mu
9. KVKK banner ilk ziyarette goruluyor mu
10. Oxygen deploy testi (preview branch)
