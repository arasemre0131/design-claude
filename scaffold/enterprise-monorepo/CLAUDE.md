# scaffold/enterprise-monorepo/ — CLAUDE Kurallari

## Amac

Tier 5 Enterprise (80K+ TL) preset'lerini **30 dakikada calisir Turborepo monorepo**'ya cevirmek.

## Ne Zaman Kullanilir

- Preset tier = 4 (Enterprise)
- Multi-tenant (subdomain routing) gerekli
- Observability uclusu (Sentry + Mixpanel + PostHog) zorunlu
- 99.9% SLA + audit log + KVKK export/delete

Daha dusuk tier icin:
- Tier 3 (Premium 3D) → `scaffold/nextjs-16-base/` + `scaffold.js`
- Tier 2 (Premium) → `scaffold/nextjs-16-base/` + `scaffold.js`
- Tier 1 (WordPress) → `scaffold/wordpress-elementor/` + `scaffold-wp.js`
- Tier 0 (Shopify) → `scaffold/shopify-hydrogen/`

## Scaffolder Ic Yapisi

```
scaffold/enterprise-monorepo/
├── base/                       # Kopyalanacak template (placeholder'li)
│   ├── apps/
│   │   ├── web/                # Musteri storefront (port 3000)
│   │   ├── admin/              # Admin panel (port 3001)
│   │   └── api/                # Standalone API (port 3002)
│   ├── packages/
│   │   ├── ui/
│   │   ├── db/                 # Drizzle schema — 6 tablo
│   │   ├── auth/               # Supabase SSR
│   │   ├── config/
│   │   └── observability/      # Sentry + Mixpanel + PostHog
│   ├── docker/compose.dev.yaml
│   └── .github/workflows/
├── scaffold-enterprise.js      # CLI
├── README.md
└── CLAUDE.md (bu dosya)
```

## Gelistirirken Dikkat

1. **Workspace protocol:** `"@preset/db": "workspace:*"` — pnpm workspaces zorunlu.
2. **Path alias:** `packages/*` → `@preset/*` (`tsconfig.base.json` paths).
3. **Drizzle schema:** `packages/db/src/schema.ts` — tabs: tenants, users, products, orders, auditLog, analyticsEvents. Hepsi tenantId ile scoped.
4. **RLS:** `packages/db/migrations/0001_init_rls.sql` — Supabase Postgres 16 RLS policy'leri.
5. **Observability init:** `<ObservabilityProvider>` root layout'a yerlestir. Mixpanel/PostHog/Sentry tek cagri.
6. **Multi-tenant middleware:** `apps/web/middleware.ts` subdomain yakalayip `/tenant/{sub}` rewrite eder. Reserved list (www, admin, api) pass-through.
7. **Audit log zorunlu:** Kritik eylemlerde `writeAudit({ action, resource, resourceId, userId, tenantId })` cagir.
8. **KVKK:** `/api/gdpr/export` + `/api/gdpr/delete` hazir template — preset'e ozel alan eklenebilir.
9. **Deploy stratejisi:** web + admin → Vercel Pro, api → Fly.io (Dockerfile + fly.toml).

## Yasakli / Hatalar

- `apps/*/package.json` icinde `"dependencies"` yerine `workspace:*` kullanmak yerine gercek versiyon YAZMA.
- `drizzle.config.ts` root'ta DEGIL, `packages/db/` icinde.
- RLS policy'lerini Drizzle schema'da DEGIL, `migrations/*.sql` icinde tut.
- `SUPABASE_SERVICE_ROLE_KEY` client bundle'a SIZMAMALI — sadece server code'unda.
- Middleware'de DB call YAPMA — edge runtime latency'si 50ms+ verebilir. DB call apps/web/app/tenant/[sub]/page.tsx icinde (RSC).

## Placeholder Pattern

Tum placeholder'lar `__X__` formatinda (kolay grep):

```
__PRESET_ID__            → preset.id
__COLOR_BG__             → palette.bg (#F5F0E8)
__FONT_DISPLAY__         → "Fraunces" (typography.display_font)
__ATOM_PALETTE__         → atoms.palette (PL27)
__ANTI_CLICHE_LIST__     → markdown bullet list
{/* __FONT_LINK_TAG__ */} → <link rel="stylesheet" href="..." />
```

`walkAndPatch()` fonksiyonu tum .ts/.tsx/.css/.md/.json/.toml/.yaml dosyalarini tarar, replacement'lari uygular.

## Test

Her scaffold calisimasi sonrasi:

```bash
cd <output-path>
pnpm install             # ~2-3 dakika (pnpm cache hit'le)
pnpm typecheck           # 0 error bekleniyor
pnpm build               # topological build
pnpm docker:up           # Postgres + Redis
pnpm db:push             # Drizzle schema → Postgres
pnpm dev                 # 3 app paralel, port 3000/3001/3002
```

Multi-tenant test:
```bash
# /etc/hosts (veya Chrome localhost wildcard)
curl http://tenant1.localhost:3000/         # → /tenant/tenant1/ rewrite
curl http://www.localhost:3000/             # → / pass-through
curl http://admin.localhost:3000/           # → / pass-through (admin app separate deploy)
```

## Kaynaklar

- Recipe: catalog/recipes/next-r3f.yaml (Tier 3 ref, Tier 5 extend)
- Research:
  - monorepo-turborepo-pnpm-2026.md → Turborepo 2.5 pipeline patterns
  - multi-tenant-whitelabel-saas-2026.md → Subdomain + RLS + tenant config
  - error-handling-logging-monitoring-2026.md → Sentry + Web Vitals + custom logger
  - analytics-tracking-ab-testing-2026.md → Mixpanel + PostHog + GA4 pattern

## Sonraki Gelistirmeler (v2)

- [ ] Playwright E2E test harness (cross-browser visual regression)
- [ ] Inngest / QStash background job helper (packages/jobs/)
- [ ] react-email + Resend template pack (packages/emails/)
- [ ] tRPC alternatif layer (opsiyonel, REST yerine)
- [ ] OpenTelemetry distributed tracing (Sentry + Jaeger)
