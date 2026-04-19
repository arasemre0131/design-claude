/**
 * @preset/observability/server — Node.js server-side helpers.
 *
 * Sentry ve PostHog'un server SDK'larini kullanir. API Route'lardan
 * cagrilir; browser yok, bu yuzden Mixpanel server'da kullanilmaz
 * (Mixpanel Track API cagrilabilir ama pattern'i Mixpanel'i browser'da
 * tutuyoruz, server-side event'leri PostHog+Sentry'e akitiyoruz).
 */
import * as Sentry from "@sentry/node";
import { PostHog } from "posthog-node";

let sentryInit = false;
let posthogClient: PostHog | null = null;

export function initServerObservability(config: {
  sentryDsn?: string;
  sentryEnvironment?: string;
  posthogKey?: string;
  posthogHost?: string;
  release?: string;
}) {
  if (!sentryInit && config.sentryDsn) {
    Sentry.init({
      dsn: config.sentryDsn,
      environment: config.sentryEnvironment ?? process.env.NODE_ENV,
      release: config.release,
      tracesSampleRate: 0.2,
    });
    sentryInit = true;
  }

  if (!posthogClient && config.posthogKey) {
    posthogClient = new PostHog(config.posthogKey, {
      host: config.posthogHost ?? "https://eu.i.posthog.com",
      flushAt: 20,
      flushInterval: 10000,
    });
  }
}

export function trackServer(event: string, distinctId: string, properties?: Record<string, unknown>) {
  if (posthogClient) {
    posthogClient.capture({ distinctId, event, properties });
  }
  Sentry.addBreadcrumb({ category: "server-event", message: event, data: properties });
}

export function captureExceptionServer(err: unknown, context?: Record<string, unknown>) {
  return Sentry.captureException(err, { extra: context });
}

export async function flushServerObservability() {
  await Promise.allSettled([
    Sentry.flush(2000),
    posthogClient?.shutdown(),
  ]);
}
