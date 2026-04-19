# __PRESET_ID__ — Enterprise Monorepo (Tier 5)

> **design-claude** preset: `__PRESET_ID__` · Recipe: `__PRESET_RECIPE__` · Tier 5 Enterprise

Turborepo + pnpm workspaces + Next.js 16 + Supabase + multi-tenant + Sentry + Mixpanel + PostHog.
99.9% SLA, KVKK/GDPR compliant, Docker Compose local dev.

## Yapi

```
__PRESET_ID__-enterprise/
├── apps/
│   ├── web/           @preset/web    Next.js 16 musteri storefront  (port 3000)
│   ├── admin/         @preset/admin  Next.js 16 admin panel         (port 3001)
│   └── api/           @preset/api    Next.js 16 standalone API      (port 3002)
├── packages/
│   ├── ui/            @preset/ui            Button, Card, Table, DataGrid
│   ├── db/            @preset/db            Drizzle schema + queries + migrations
│   ├── auth/          @preset/auth          Supabase wrapper + requireUser helper
│   ├── config/        @preset/config        eslint + tsconfig + tailwind
│   └── observability/ @preset/observability Sentry + Mixpanel + PostHog
├── docker/
│   ├── compose.dev.yaml    Postgres 16 + Redis 7 (+ Qdrant/Mailpit)
│   └── init.sql            uuid-ossp, pgcrypto, vector extensions
├── .github/workflows/
│   ├── ci.yml          Lint + typecheck + test + build (every PR)
│   └── deploy.yml      Vercel (web/admin) + Fly.io (api) + DB migrate (on main)
├── package.json        Root workspaces
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
└── .env.example
```

## Hizli Baslangic

```bash
# 1. Bagimliliklari yukle
pnpm install

# 2. Local stack'i ayaga kaldir
pnpm docker:up                # Postgres + Redis

# 3. Env'i hazirla
cp .env.example .env.local
# Supabase, Sentry, Mixpanel, PostHog degerlerini doldur

# 4. DB migrate
pnpm db:generate              # Drizzle migration dosyasi uret
pnpm db:push                  # Schema'yi DB'ye ugra

# 5. 3 uygulamayi paralel calistir
pnpm dev                      # turbo run dev → web:3000, admin:3001, api:3002
```

## Komutlar

| Komut | Aciklama |
|-------|----------|
| `pnpm dev` | Tum app'ler paralel dev (Turborepo) |
| `pnpm build` | Topological build (packages → apps) |
| `pnpm lint` | ESLint her paket |
| `pnpm typecheck` | `tsc --noEmit` her paket |
| `pnpm test` | Vitest unit + integration |
| `pnpm db:generate` | Drizzle migration uret |
| `pnpm db:migrate` | Migration'lari uygula |
| `pnpm db:studio` | Drizzle Studio UI (port 4983) |
| `pnpm docker:up` | Postgres + Redis local |
| `pnpm docker:down` | Stack'i durdur |
| `pnpm format` | Prettier |
| `pnpm clean` | node_modules + .next + .turbo sil |

## Multi-Tenant Routing

`apps/web/middleware.ts` subdomain'i analiz edip tenant rewrite yapar.

| URL | Rewrite | Ne gorulur |
|-----|---------|-----------|
| `yourapp.com/` | (yok) | Root SaaS marketing |
| `www.yourapp.com/` | (yok) | Root (RESERVED) |
| `tenant1.yourapp.com/` | `/tenant/tenant1` | tenant1 storefront |
| `tenant1.yourapp.com/urunler` | `/tenant/tenant1/urunler` | Urun listesi |
| `admin.yourapp.com/*` | (separate app) | apps/admin deploy'u |

Dev'de test icin: `tenant1.localhost:3000` (Chrome localhost wildcard destekler).

## Observability — Uclu Stack

Tier 5'te **Sentry + Mixpanel + PostHog** uclusu kullanilir.

| Arac | Kullanim | Fiyat |
|------|----------|-------|
| **Sentry** | Error tracking + performance monitoring | $26/mo 50K event |
| **Mixpanel** | Event analytics (funnel, cohort, retention) | Free 20M event/mo |
| **PostHog** | Session replay + feature flags + A/B test | Free 1M event/mo |

`@preset/observability` her ucunu tek API altinda birlestirir:

```ts
import { track, captureException, isFeatureEnabled } from "@preset/observability";

track("order.created", { amount: 1299, plan: "pro" });
captureException(error, { route: "/api/orders" });
if (isFeatureEnabled("new_checkout")) { /* ... */ }
```

## KVKK / GDPR

- `GET /api/gdpr/export` → kullanici verisini JSON olarak indir
- `POST /api/gdpr/delete` → hesabi pseudonymize et + audit log yaz
- `audit_log` tablosu kalici (yasal delil), user verisi NULL'lanir

## Deploy

### Web + Admin → Vercel
```bash
vercel --prod -- apps/web
vercel --prod -- apps/admin
```

### API → Fly.io
```bash
flyctl deploy --config apps/api/fly.toml
```

### DB Migrations → GitHub Actions
`main`'e push: `.github/workflows/deploy.yml` otomatik `pnpm db:migrate` calistirir.

## Gizli Bilgiler (.env.local)

- `SUPABASE_SERVICE_ROLE_KEY` — **ASLA** client bundle'a. Sadece API route'lardan.
- `STRIPE_WEBHOOK_SECRET` — webhook signature dogrulama.
- `IYZICO_SECRET_KEY` — server-side only.
- `SENTRY_AUTH_TOKEN` — source map upload build-time.

## 99.9% SLA Hedefi

- Vercel Pro (SLA 100%) + Cloudflare CDN
- Postgres 16 on Supabase (Professional plan 99.9%)
- Fly.io API (min_machines_running=1 auto-restart)
- Sentry error budget: %0.1 error rate tolerance
- Rollback: Vercel instant rollback + DB migration reversibility

## Tech Stack Detayi

Recipe: `catalog/recipes/__PRESET_RECIPE__.yaml`
Full techstack lookup: `C:/Users/EAS/Desktop/armut/FRONTEND-TECHSTACK.md`

## Lisans

Proprietary — client-specific build, repo private.
