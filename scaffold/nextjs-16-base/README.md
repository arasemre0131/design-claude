# __PRESET_ID__

Bu proje `scaffold.js` ile uretildi.

**Kaynak:** `design-claude/catalog/presets/__PRESET_ID__.yaml`
**Recipe:** `__PRESET_RECIPE__`
**Tier:** `__PRESET_TIER__`

## Baslangic

```bash
pnpm install
cp .env.example .env.local  # env duzenle
pnpm dev
```

localhost:3000 → placeholder anasayfa gorecek.

## Sonraki Adimlar

1. `combo.md` dosyasini okuyun — design-council onayli atom listesi
2. `CLAUDE.md` icindeki kurallari izleyin (yasakli ID'ler)
3. `src/components/` altina atom componentlerini yazin
4. `app/page.tsx` placeholder'ini asil sayfayla degistirin

## Tech Stack

- Next.js 16 (App Router, Turbopack, RSC)
- React 19
- TypeScript 6.0 beta (strict)
- Tailwind CSS v4 (@theme directive)
- Supabase (PostgreSQL + Auth + Storage)
- Drizzle ORM
- GSAP 3.13 + Lenis 1.3.4 + Framer Motion 12
- React Three Fiber 9 + drei 10 (3D)

## Komutlar

| Komut | Aciklama |
|-------|----------|
| `pnpm dev` | Turbopack dev server |
| `pnpm build` | Production build |
| `pnpm start` | Production server |
| `pnpm typecheck` | TS strict check |
| `pnpm lint` | ESLint |

## Lisans

Private.
