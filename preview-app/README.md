# design-claude preview-app

60+ preset canli render + karsilastirma + gallery.

## Baslangic

```bash
cd preview-app
pnpm install
pnpm dev
```

localhost:3000 → /gallery'ye yonlendirilirsiniz.

## Route'lar

| Route | Aciklama |
|-------|----------|
| `/gallery` | Tum preset grid'i, filtre (sector + style + tier) |
| `/preview/{preset-id}` | Tek preset tam render (palette + typo + atom kartlar + mood) |
| `/compare?a={id1}&b={id2}` | Iki preset yan yana iframe |

## Mimari

```
preview-app/
├── app/                 Next.js App Router
│   ├── gallery/         Preset grid (SSR)
│   ├── preview/[id]/    Dynamic preview route
│   └── compare/         Iframe split view
├── src/
│   ├── components/
│   │   ├── PresetRenderer.tsx    CORE renderer (palette + typo + atoms)
│   │   ├── Gallery/PresetCard.tsx
│   │   └── Compare/SplitView.tsx
│   └── lib/
│       ├── preset-loader.ts      YAML reader (js-yaml + front-matter)
│       ├── atom-resolver.ts      Atom ID → component name mapping (180+ entry)
│       └── tailwind-tokens.ts    Palette → CSS var generator
├── next.config.ts       outputFileTracingRoot parent (catalog/ access)
└── postcss.config.mjs   Tailwind v4 PostCSS
```

## Catalog konumu

Preview-app, `process.cwd() + "/../catalog/"` yolunu tarar (monorepo parent).
Override: `DESIGN_CLAUDE_CATALOG` env var set edilebilir.

## Agent entegrasyonu

- `atom-resolver.ts` — Agent J/K/L bu dosyaya component ekler (ID → componentName)
- `src/components/atoms/` — Atom component'lerinin gercek implementasyonu (Agent dolduracak)

## Tech Stack

- Next.js 16 (App Router, Turbopack, RSC)
- React 19
- TypeScript 6.0
- Tailwind CSS v4
- js-yaml (preset loader)
- Server Components default

## Lisans

Private.
