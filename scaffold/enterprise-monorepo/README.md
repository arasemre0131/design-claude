# scaffold/enterprise-monorepo/ — Tier 5 Enterprise Scaffolder

> design-claude Tier 5 (80K+ TL) projeleri icin Turborepo + pnpm workspaces + multi-tenant SaaS monorepo'sunu uretir.

## Ne Uretir

```
{output-path}/
├── apps/
│   ├── web/          @preset/web     Next.js 16 musteri storefront (multi-tenant subdomain)
│   ├── admin/        @preset/admin   Next.js 16 tenant admin panel (auth middleware)
│   └── api/          @preset/api     Next.js 16 standalone API (Fly.io / Docker)
├── packages/
│   ├── ui/           @preset/ui            Button, Card, Table, Thead/Th/Td...
│   ├── db/           @preset/db            Drizzle schema (6 tablo) + queries + migrations
│   ├── auth/         @preset/auth          Supabase SSR + requireUser + role check
│   ├── config/       @preset/config        eslint + tsconfig + tailwind shared
│   └── observability/@preset/observability Sentry + Mixpanel + PostHog unified API
├── docker/
│   └── compose.dev.yaml     Postgres 16 + Redis 7 + Qdrant + Mailpit
├── .github/workflows/
│   ├── ci.yml               Lint + typecheck + test + build
│   └── deploy.yml           Vercel + Fly.io + DB migrate
├── package.json             Root workspaces + turbo scripts
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── .env.example             Tum env var'lar (Supabase, Sentry, Mixpanel, PostHog, iyzico, Stripe, Resend)
├── .gitignore
├── .prettierrc.json
├── README.md
├── CLAUDE.md
└── combo.md                 Design council cikti + preset bilgisi
```

## Kullanim

```bash
# Preset'ten scaffold et
node scaffold-enterprise.js <preset-id> --out <output-path>

# Ornek
node scaffold-enterprise.js mucevher-enterprise --out ./mucevher-zinciri/
node scaffold-enterprise.js insaat-data-dense --out /tmp/test/ --force
```

### Argumanlar

| Arg | Aciklama |
|-----|----------|
| `<preset-id>` | catalog/presets/<id>.yaml (zorunlu) |
| `--out, -o <path>` | Cikti dizini (zorunlu) |
| `--recipe, -r <id>` | Recipe override (default: preset.recipe veya next-enterprise-monorepo) |
| `--force, -f` | Hedef dolu ise sil + tekrar yaz |
| `--skip-warnings` | Tier veya yasakli ID uyarilarini atla (onerilmez) |
| `-h, --help` | Yardim |

## Akis

```
1. Preset YAML oku               (catalog/presets/{id}.yaml)
   ↓
2. Tier kontrolu                 (tier >= 4 olmali — Tier 5 Enterprise)
   ↓
3. Recipe oku                    (next-enterprise-monorepo → next-r3f fallback)
   ↓
4. Atom'lar                      (palette, typography YAML)
   ↓
5. Anti-cliche kontrolu          (yasakli ID kullanimi varsa abort)
   ↓
6. base/ kopyala                 (scaffold/enterprise-monorepo/base/ → outDir/)
   ↓
7. Patch                         (placeholder'lar preset degerleri ile doldurulur)
   • root package.json           → preset.id-enterprise
   • apps/web, admin, api        → font link, title, palette, tenant name
   • packages/db/src/schema.ts   → preset comment
   • docker/compose.dev.yaml     → container adlari
   • apps/api/fly.toml           → fly.io app adi
   ↓
8. combo.md yaz                  (design council cikti dosyasi)
   ↓
9. Basarili — kullanim talimati
```

## Placeholder List (base/ icindeki __X__ tokenlari)

### Root seviye
- `__PRESET_ID__` → preset.id
- `__PRESET_DESCRIPTION__` → "{sector} × {style}"

### CSS (apps/*/app/globals.css)
- `__COLOR_BG__` / `__COLOR_INK__` / `__COLOR_ACCENT__` / `__COLOR_MUTED__` / `__COLOR_SURFACE__` / `__COLOR_BORDER__`
- `__FONT_DISPLAY__` / `__FONT_BODY__` / `__FONT_MONO__`
- `__PALETTE_ID__` / `__TYPOGRAPHY_ID__`

### Layout (apps/*/app/layout.tsx)
- `__PRESET_TITLE__` / `__PRESET_DESCRIPTION__`
- `{/* __FONT_LINK_TAG__ */}` → `<link rel="stylesheet" href="..." />`

### CLAUDE.md
- `__PRESET_ID__` / `__PRESET_SECTOR__` / `__PRESET_STYLE__` / `__PRESET_RECIPE__`
- `__BUDGET_MIN__` / `__BUDGET_MAX__` / `__DELIVERY_MIN__` / `__DELIVERY_MAX__`
- `__ATOM_PALETTE__` / `__ATOM_TYPOGRAPHY__` / `__ATOM_HEADER__` / `__ATOM_NAV__` / `__ATOM_HERO__` / `__ATOM_KPI__` / `__ATOM_FOOTER__`
- `__ANTI_CLICHE_LIST__` (markdown bullet list)
- `__WCAG_TARGET__` / `__LIGHTHOUSE_TARGET__`

## Test

```bash
# Dry-run test (mevcut preset'lerle)
node scaffold-enterprise.js mucevher-editorial-luxury --out /tmp/dry-run/ --force

# Gercek proje
node scaffold-enterprise.js mucevher-enterprise --out ~/projects/zinciri/
cd ~/projects/zinciri
pnpm install
pnpm docker:up
pnpm db:push
pnpm dev
```

## Yol Haritasi (post-scaffold)

1. `combo.md` oku (yasakli ID'leri hafizana al)
2. `.env.example` → `.env.local` kopyala + degerleri doldur
3. Supabase projesi olustur, DATABASE_URL + anon key al
4. Sentry/Mixpanel/PostHog hesaplarini ac, DSN/token'lari yaz
5. `pnpm install && pnpm db:push` → schema hazir
6. `pnpm dev` → 3 app paralel
7. `tenant1.localhost:3000` Chrome'dan test et (wildcard localhost)
8. Production deploy: Vercel (web/admin) + Fly.io (api)

## Kaynak / Referans

- **ULTRAPLAN.md Bolum 6.5** — Tier 5 Enterprise detay
- **Recipe YAML** — `catalog/recipes/next-enterprise-monorepo.yaml` (opsiyonel)
- **Research:**
  - `Mobilyacı/3d-demo/research/monorepo-turborepo-pnpm-2026.md`
  - `Mobilyacı/3d-demo/research/multi-tenant-whitelabel-saas-2026.md`
  - `Mobilyacı/3d-demo/research/error-handling-logging-monitoring-2026.md`
  - `Mobilyacı/3d-demo/research/analytics-tracking-ab-testing-2026.md`
