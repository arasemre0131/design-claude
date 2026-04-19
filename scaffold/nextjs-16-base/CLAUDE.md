# __PRESET_ID__ — Proje Kurallari

## Preset Bilgisi

| Alan | Deger |
|------|-------|
| Preset ID | `__PRESET_ID__` |
| Sektor | `__PRESET_SECTOR__` |
| Stil | `__PRESET_STYLE__` |
| Recipe | `__PRESET_RECIPE__` |
| Tier | `__PRESET_TIER__` |
| Butce | __BUDGET_MIN__ – __BUDGET_MAX__ TL |
| Teslim | __DELIVERY_MIN__ – __DELIVERY_MAX__ hafta |

## Atoms (Design Council Onayli Kombo)

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

## Tech Stack

Recipe: `__PRESET_RECIPE__`

Detaylar icin: `C:/Users/EAS/Desktop/armut/research/design-claude/catalog/recipes/__PRESET_RECIPE__.yaml`

## Komutlar

```bash
pnpm install         # bagimliliklari yukle
pnpm dev             # localhost:3000
pnpm build           # production build
pnpm typecheck       # TS strict kontrol
pnpm lint            # ESLint
```

## Calisma Kurallari

1. `combo.md` — design-council cikti dosyasi, sadakat zorunlu
2. Yasakli ID listesinde olan atomlari kullanma (yeni benzer yapi da olusturma)
3. Tailwind v4 @theme directive ile tokens `app/globals.css` icinde — JS config'e token ekleme
4. Server Components default, `"use client"` gerektiginde ac
5. Supabase: anon key NEXT_PUBLIC_*, service_role ASLA client bundle'a
6. Turkce UI — html lang="tr", tum label/placeholder/error Turkce
7. Mobile-first — 375/768/1280 breakpoint test zorunlu

## Onemli Dosyalar

- `app/globals.css` — Tailwind v4 @theme tokens
- `app/layout.tsx` — Font imports + meta
- `src/lib/constants.ts` — Preset metadata
- `combo.md` — Design council combo
- `.env.example` — Env template

## Teslim Oncesi

1. `pnpm typecheck` pass (0 error)
2. `pnpm lint` pass
3. Lighthouse mobile >= __LIGHTHOUSE_TARGET__
4. WCAG: __WCAG_TARGET__
5. 3 breakpoint gorsel test (375/768/1280)
