/**
 * Root domain landing — SaaS marketing sayfasi.
 * Tenant-specific icerik "/tenant/[subdomain]/*" route'unda; middleware.ts rewrite eder.
 */
export default function RootLandingPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-6 px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
        __PRESET_ID__ · Enterprise Tier 5
      </p>
      <h1 className="font-display text-5xl leading-[0.95] sm:text-7xl">
        Multi-tenant SaaS <span className="italic text-[var(--color-accent)]">platform</span>
      </h1>
      <p className="max-w-xl text-lg text-[var(--color-muted)]">
        Turborepo + pnpm workspaces + Next.js 16 + Supabase + Sentry + Mixpanel + PostHog.
        99.9% SLA, multi-tenant subdomain routing, audit log, KVKK/GDPR-uyumlu.
      </p>
      <div className="flex flex-wrap gap-3 pt-4">
        <a
          href="/pricing"
          className="inline-flex items-center rounded-md bg-[var(--color-ink)] px-6 py-3 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-80"
        >
          Paketleri incele
        </a>
        <a
          href="/demo"
          className="inline-flex items-center rounded-md border border-[var(--color-border)] px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--color-surface)]"
        >
          Canli demo
        </a>
      </div>
      <p className="mt-8 font-mono text-xs text-[var(--color-muted)]">
        Dev: <code>tenant1.localhost:3000</code> → tenant subdomain rewrite test edilebilir.
      </p>
    </main>
  );
}
