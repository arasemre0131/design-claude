# scaffold/shopify-hydrogen

**Shopify Hydrogen 2024.10+ storefront scaffolder** — design-claude catalog preset'lerinden Premium Tier 3 e-ticaret sitesi uretir.

## Ne Uretir

Tek komutla:
- Shopify Hydrogen + Remix + TypeScript template
- Tailwind v4 CSS-first tokens (palette + typography preset'ten)
- React Three Fiber 3D product viewer (metafield `custom.3d_model_url`)
- GSAP + Lenis + Framer Motion animation stack
- Storefront API 2024-10 fragments + queries
- iyzipay/PayTR Turkiye payment ready
- KVKK cookie consent + Product schema JSON-LD
- combo.md (design council cikisi + atom listesi)

## Kullanim

```bash
node scaffold-shopify.js <preset-id> --out <output-path>

# Ornek 1 — Fatih Bey mucevher premium
node scaffold-shopify.js mucevher-immersive-3d --out ./fatih-bey-shopify/

# Ornek 2 — Mobilya premium
node scaffold-shopify.js mobilya-immersive-3d --out ./furniture-shop/

# Ornek 3 — Store domain ile
node scaffold-shopify.js eticaret-editorial-luxury \
  --out ./luxury-store/ \
  --store-domain my-store.myshopify.com
```

## Parametreler

| Flag | Aciklama |
|------|----------|
| `<preset-id>` | `catalog/presets/*.yaml` icinden preset ID |
| `--out, -o` | Cikti dizini (zorunlu) |
| `--force, -f` | Hedef dizin doluysa sil + yeniden yaz |
| `--skip-warnings` | Yasakli ID uyarilarini atla |
| `--skip-recipe-check` | Preset `recipe=shopify-hydrogen` degilse devam et |
| `--store-domain <d>` | `.env.example`'a otomatik yaz |

## Akis

1. **Preset YAML** yukle (`catalog/presets/<id>.yaml`)
2. **Recipe dogrula** — `shopify-hydrogen` olmali (veya `--skip-recipe-check`)
3. **Recipe YAML** yukle (`catalog/recipes/shopify-hydrogen.yaml`)
4. **Atoms yukle** (palette + typography)
5. **Anti-cliche kontrol** (yasakli ID'ler preset combo'suna sizmis mi)
6. **Butce tier kontrol** (min 25K TL — Shopify Plus gerekli)
7. **Base template kopyala** (`hydrogen-base/` -> out)
8. **Patch dosyalari:**
   - `package.json` (name, description)
   - `app/styles/app.css` (palette + typography tokens)
   - `app/root.tsx` (Google Fonts link, theme-color)
   - `app/lib/constants.ts` (preset metadata)
   - `CLAUDE.md` (proje kurallari)
   - `README.md`
   - `.env.example` (store domain)
9. **combo.md** olustur (design council cikisi)

## Hangi Preset'lerle Uyumlu

Sadece preset'in `recipe: shopify-hydrogen` olmasi gerekli (veya `--skip-recipe-check`).

Tipik uygun preset'ler:
- `mucevher-immersive-3d` — mucevher premium + 3D
- `mucevher-editorial-luxury` — minimal + editorial luxury
- `mobilya-immersive-3d` — mobilya AR + 3D viewer
- `eticaret-editorial-luxury` — luxury e-ticaret
- `eticaret-immersive-3d` — premium 3D product catalog

Recipe degistirmek icin preset YAML'da `recipe: shopify-hydrogen` olarak ayarla.

## Red Line (Ne Zaman Kullanma)

- **Butce < 25K TL** — Shopify Plus plani $2000/ay, maliyeti kapamaz. Bunun yerine `next-premium` + Supabase.
- **Turkiye micro-business** (50K TL/ay ciro alti) — WooCommerce veya Next.js
- **Acil teslim** (< 3 hafta) — Hydrogen stabilite curve 6-8 ay, kararsiz
- **Oxygen Istanbul edge yok** — fra1 en yakin, isolasyon 40-80ms. Cloudflare Pages alternatifi mevcut

## Sonraki Adimlar (scaffold sonrasi)

```bash
cd <output>
cp .env.example .env
# .env duzenle: Shopify Admin token'lari

pnpm install
pnpm codegen     # GraphQL types
pnpm dev         # http://localhost:3000

# Deploy
pnpm deploy      # Oxygen (Shopify native)
```

## Dokuman

- **Recipe YAML:** `catalog/recipes/shopify-hydrogen.yaml`
- **Hydrogen docs:** https://hydrogen.shopify.dev
- **Storefront API:** https://shopify.dev/docs/api/storefront/2024-10
- **design-claude ULTRAPLAN:** `ULTRAPLAN.md` Bolum 6 (Tier 4 Premium)
