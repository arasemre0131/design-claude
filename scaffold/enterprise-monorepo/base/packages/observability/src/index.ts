/**
 * @preset/observability — Unified observability layer
 *
 * 3 araci tek API altinda birlestirir:
 *   Sentry    → error tracking + performance monitoring + session replay (errors only)
 *   Mixpanel  → event analytics (funnel, retention, cohort)
 *   PostHog   → session replay (all) + feature flags + A/B test
 *
 * Tenant 5 SLA icin ucu bir arada: Sentry'de hata bir suratanda
 * Mixpanel event'i ile eslestirip root cause + kullanici path'i paralel gorebilirsiniz.
 */
import * as Sentry from "@sentry/nextjs";
import mixpanel from "mixpanel-browser";
import posthog from "posthog-js";

/* ================================================================ */
/*  Types                                                            */
/* ================================================================ */

export type ObservabilityConfig = {
  sentryDsn?: string;
  sentryEnvironment?: string;
  sentryRelease?: string;
  mixpanelToken?: string;
  posthogKey?: string;
  posthogHost?: string;
  tenantId?: string;
  userId?: string;
  tracesSampleRate?: number;
  replaysSessionSampleRate?: number;
  replaysOnErrorSampleRate?: number;
  debug?: boolean;
};

let initialized = false;
let currentTenantId: string | undefined;
let currentUserId: string | undefined;

/* ================================================================ */
/*  Init                                                             */
/* ================================================================ */

export function initObservability(config: ObservabilityConfig): void {
  if (initialized) {
    if (config.debug) console.warn("[observability] Already initialized");
    return;
  }

  currentTenantId = config.tenantId;
  currentUserId = config.userId;

  // Sentry (server + client)
  if (config.sentryDsn) {
    Sentry.init({
      dsn: config.sentryDsn,
      environment: config.sentryEnvironment ?? process.env.NODE_ENV,
      release: config.sentryRelease,
      tracesSampleRate: config.tracesSampleRate ?? 0.1,
      replaysSessionSampleRate: config.replaysSessionSampleRate ?? 0.1,
      replaysOnErrorSampleRate: config.replaysOnErrorSampleRate ?? 1.0,
      integrations: [Sentry.replayIntegration()],
    });

    if (config.tenantId) Sentry.setTag("tenant_id", config.tenantId);
    if (config.userId) Sentry.setUser({ id: config.userId });
  }

  // Browser-only: Mixpanel + PostHog
  if (typeof window !== "undefined") {
    if (config.mixpanelToken) {
      mixpanel.init(config.mixpanelToken, {
        debug: config.debug ?? false,
        track_pageview: true,
        persistence: "localStorage",
      });
      if (config.userId) mixpanel.identify(config.userId);
      if (config.tenantId) {
        mixpanel.register({ tenant_id: config.tenantId });
        mixpanel.people.set({ tenant_id: config.tenantId });
      }
    }

    if (config.posthogKey) {
      posthog.init(config.posthogKey, {
        api_host: config.posthogHost ?? "https://eu.i.posthog.com",
        capture_pageview: true,
        session_recording: { maskAllInputs: true, maskTextSelector: "[data-pii]" },
        persistence: "localStorage+cookie",
      });
      if (config.userId) {
        posthog.identify(config.userId, {
          tenant_id: config.tenantId,
        });
      }
      if (config.tenantId) posthog.group("tenant", config.tenantId);
    }
  }

  initialized = true;
}

/* ================================================================ */
/*  Identify (login/logout sonrasi cagir)                           */
/* ================================================================ */

export function identify(userId: string, traits?: Record<string, unknown>): void {
  currentUserId = userId;
  Sentry.setUser({ id: userId, ...traits });

  if (typeof window !== "undefined") {
    try {
      mixpanel.identify(userId);
      if (traits) mixpanel.people.set(traits);
      posthog.identify(userId, traits);
    } catch {}
  }
}

export function setTenant(tenantId: string): void {
  currentTenantId = tenantId;
  Sentry.setTag("tenant_id", tenantId);
  if (typeof window !== "undefined") {
    try {
      mixpanel.register({ tenant_id: tenantId });
      posthog.group("tenant", tenantId);
    } catch {}
  }
}

export function reset(): void {
  currentUserId = undefined;
  currentTenantId = undefined;
  Sentry.setUser(null);
  if (typeof window !== "undefined") {
    try {
      mixpanel.reset();
      posthog.reset();
    } catch {}
  }
}

/* ================================================================ */
/*  Track event — Mixpanel + PostHog paralel                        */
/* ================================================================ */

export function track(event: string, properties?: Record<string, unknown>): void {
  const payload = {
    ...properties,
    tenant_id: currentTenantId,
    user_id: currentUserId,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      mixpanel.track(event, payload);
      posthog.capture(event, payload);
    } catch (e) {
      // Analytics fail → Sentry'e push etme (sonsuz loop riski)
      if (process.env.NODE_ENV === "development") console.warn("[observability] track failed", e);
    }
  }

  // Sentry breadcrumb (hata meydana gelirse context olur)
  Sentry.addBreadcrumb({
    category: "track",
    message: event,
    data: payload,
    level: "info",
  });
}

/* ================================================================ */
/*  Error capture                                                    */
/* ================================================================ */

export function captureException(
  error: unknown,
  context?: Record<string, unknown>,
): string | undefined {
  const eventId = Sentry.captureException(error, {
    extra: {
      ...context,
      tenant_id: currentTenantId,
      user_id: currentUserId,
    },
  });

  // PostHog'da da event olarak gor
  if (typeof window !== "undefined") {
    try {
      posthog.capture("$exception", {
        $exception_message: (error as Error)?.message,
        $exception_type: (error as Error)?.name,
        ...context,
      });
    } catch {}
  }

  return eventId;
}

export function captureMessage(message: string, level: "info" | "warning" | "error" = "info"): void {
  Sentry.captureMessage(message, level);
}

/* ================================================================ */
/*  Performance monitoring                                           */
/* ================================================================ */

export function startTransaction(name: string, op = "custom") {
  return Sentry.startSpan({ name, op }, (span) => span);
}

export function measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
  return Sentry.startSpan({ name, op: "function" }, async () => fn());
}

/* ================================================================ */
/*  Feature flags (PostHog)                                          */
/* ================================================================ */

export function isFeatureEnabled(flag: string, fallback = false): boolean {
  if (typeof window === "undefined") return fallback;
  try {
    const result = posthog.isFeatureEnabled(flag);
    return result ?? fallback;
  } catch {
    return fallback;
  }
}

export function getFeatureFlag(flag: string): string | boolean | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    return posthog.getFeatureFlag(flag);
  } catch {
    return undefined;
  }
}
