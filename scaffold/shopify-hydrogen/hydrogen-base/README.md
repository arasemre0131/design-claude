# __PRESET_ID__

Shopify Hydrogen 2024.10+ storefront — design-claude preset `__PRESET_ID__`, recipe `__PRESET_RECIPE__`, tier `__PRESET_TIER__`.

## Hizli Baslangic

```bash
# 1. Env olustur
cp .env.example .env
# .env dosyasini duzenle: Shopify Admin'den token al

# 2. Install + dev
pnpm install
pnpm dev
# -> http://localhost:3000
```

## Shopify Admin Kurulumu

### 1. Store olustur (yoksa)
- https://partners.shopify.com -> "Development store" olustur
- `your-store.myshopify.com` gibi subdomain alirsin

### 2. Headless app ekle
- Settings -> Apps and sales channels -> Develop apps
- "Create an app" -> isim: "Hydrogen Storefront"
- Configuration -> "Storefront API access":
  - Tum `unauthenticated_read_*` scope'larini sec
- "Install app" -> `PUBLIC_STOREFRONT_API_TOKEN` goster

### 3. `.env` duzenle

```
PUBLIC_STORE_DOMAIN="your-store.myshopify.com"
PUBLIC_STOREFRONT_API_TOKEN="shpsa_xxxxxxxxxxx"
SESSION_SECRET="$(openssl rand -base64 32)"
```

### 4. Metafield tanimla
Products -> Settings -> Metafields, ekle:

| Namespace | Key | Type | Aciklama |
|-----------|-----|------|----------|
| `custom` | `3d_model_url` | URL | GLB model URL |
| `custom` | `ar_usdz_url` | URL | iOS AR USDZ |
| `custom` | `certificate_pdf` | File | Sertifika PDF |
| `custom` | `spec_sheet` | JSON | `[{label, value}]` |

Her urun detay sayfasinda bu metafield'lar doldurulursa:
- 3D viewer aktiflesir (R3F Canvas)
- AR butonu gosterilir (iOS Quick Look + Scene Viewer)
- Sertifika link'i listelenir
- Spec sheet tablo halinde render edilir

## Dizin Yapisi

```
hydrogen-base/
├── app/
│   ├── root.tsx              # Remix layout
│   ├── entry.client.tsx      # Browser hydrate
│   ├── entry.server.tsx      # Oxygen SSR
│   ├── routes/
│   │   ├── _index.tsx        # Anasayfa
│   │   ├── products.$handle.tsx
│   │   ├── collections.$handle.tsx
│   │   ├── cart.tsx
│   │   ├── search.tsx
│   │   └── account.tsx
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductCard3D.tsx  # R3F + metafield viewer
│   │   ├── Cart.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── KvkkBanner.tsx
│   ├── lib/
│   │   ├── shopify.server.ts
│   │   ├── session.server.ts
│   │   ├── fragments.ts       # GraphQL fragments
│   │   ├── queries.ts         # Storefront API sorgulari
│   │   └── constants.ts
│   ├── styles/
│   │   └── app.css            # Tailwind v4 @theme
│   └── assets/
│       └── favicon.svg
├── server.ts                  # Oxygen worker entry
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
└── package.json
```

## Deploy

### Oxygen (Shopify native)

```bash
pnpm deploy
# -> Shopify admin -> Oxygen environment URL
```

### Cloudflare Pages (alternatif)

```bash
pnpm build
wrangler pages deploy dist/client
```

## 3D Model Pipeline

1. **Asset hazirlik** (Blender):
   - Model export: glTF 2.0 Binary (.glb)
   - Max 2MB / model
   - Texture KTX2 (Basis UASTC)

2. **Compression**:
   ```bash
   gltf-transform optimize model.glb model.opt.glb --texture-compress webp
   gltf-transform draco model.opt.glb model.final.glb
   ```

3. **Upload**:
   - Shopify Files (limit 20MB, CDN dahil) veya
   - Cloudflare R2 signed URL + `PUBLIC_3D_ASSET_CDN`

4. **Metafield'a yaz**:
   - Admin -> Product -> Metafields -> `custom.3d_model_url` = `https://cdn.your-store.com/3d/ring-001.glb`

## Payment (Turkiye)

### iyzipay Shopify app
- https://apps.shopify.com/iyzico-turkey
- Install -> API key + Secret Shopify admin'de otomatik kaydedilir
- Checkout akisi: Shopify native cart -> iyzico redirect -> donus URL

### PayTR (alternatif)
- Custom Shopify app gerekli
- Payment provider webhook ile entegre

## Dokuman

- **Shopify Hydrogen:** https://hydrogen.shopify.dev
- **Storefront API:** https://shopify.dev/docs/api/storefront/latest
- **Oxygen deploy:** https://shopify.dev/docs/custom-storefronts/oxygen/deploy
- **design-claude preset:** `catalog/presets/__PRESET_ID__.yaml`
- **design-claude recipe:** `catalog/recipes/shopify-hydrogen.yaml`
- **combo.md:** bu dizindeki design council cikisi
