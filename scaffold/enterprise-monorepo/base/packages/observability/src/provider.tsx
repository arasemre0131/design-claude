"use client";
/**
 * <ObservabilityProvider /> — root layout'a yerlestirilir.
 * env vars'tan config okur, client'ta initObservability cagirir.
 */
import { useEffect, type ReactNode } from "react";
import { initObservability } from "./index";

export type ObservabilityProviderProps = {
  children: ReactNode;
  tenantId?: string;
  userId?: string;
  debug?: boolean;
};

export function ObservabilityProvider({
  children,
  tenantId,
  userId,
  debug = false,
}: ObservabilityProviderProps) {
  useEffect(() => {
    initObservability({
      sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      sentryEnvironment: process.env.NODE_ENV,
      mixpanelToken: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
      posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
      posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      tenantId,
      userId,
      debug,
    });
  }, [tenantId, userId, debug]);

  return <>{children}</>;
}
