/**
 * ScrollTriggerProvider.tsx — GSAP ScrollTrigger global bootstrap
 *
 * COMBO: motion-foundation — tüm ScrollTrigger-bağımlı component'ler için
 * Kaynak: templates/14-ultra/index.html:488-499 (gsap.registerPlugin)
 * License: GSAP 3.13 ücretsiz — ScrollTrigger, SplitText, ScrambleTextPlugin dahil
 *
 * Sorumluluklar:
 *   1. gsap.registerPlugin(ScrollTrigger) — tek sefer
 *   2. Route change'de ScrollTrigger.refresh() — next.js/app router uyumlu
 *   3. resize → refresh debounced
 *   4. Component unmount'ta kill all (global)
 *
 * Next.js 16 App Router usePathname ile route değişimi dinlenir.
 * LenisProvider ile birlikte kullanılırsa Lenis internal ScrollTrigger.update
 * çağrısı ayarlıyor; burada ek cleanup yapıyoruz.
 */

'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export interface ScrollTriggerProviderProps {
  children: ReactNode;
  /** pathname değiştiğinde refresh tetikle */
  refreshOnRouteChange?: boolean;
  /** resize debounce ms */
  resizeDebounce?: number;
}

export function ScrollTriggerProvider({
  children,
  refreshOnRouteChange = true,
  resizeDebounce = 200,
}: ScrollTriggerProviderProps): ReactNode {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    (async () => {
      try {
        const gsapMod = await import('gsap');
        const stMod = await import('gsap/ScrollTrigger');
        if (cancelled) return;
        const gsap = gsapMod.default ?? gsapMod;
        const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
        gsap.registerPlugin(ScrollTrigger);

        const onResize = (): void => {
          if (resizeTimer) clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => ScrollTrigger.refresh(), resizeDebounce);
        };
        window.addEventListener('resize', onResize);

        return () => {
          window.removeEventListener('resize', onResize);
          if (resizeTimer) clearTimeout(resizeTimer);
        };
      } catch {
        /* GSAP missing */
      }
    })();

    return () => {
      cancelled = true;
      // Kill all scrolltriggers on provider unmount
      (async () => {
        try {
          const stMod = await import('gsap/ScrollTrigger');
          const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
          ScrollTrigger.getAll().forEach((t: { kill: () => void }) => t.kill());
        } catch {
          /* noop */
        }
      })();
    };
  }, [resizeDebounce]);

  // Route change → refresh
  useEffect(() => {
    if (!refreshOnRouteChange) return;
    let cancelled = false;
    (async () => {
      try {
        const stMod = await import('gsap/ScrollTrigger');
        if (cancelled) return;
        const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
        // Small delay to let Next.js hydrate new route DOM
        setTimeout(() => ScrollTrigger.refresh(), 120);
      } catch {
        /* noop */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname, refreshOnRouteChange]);

  return <>{children}</>;
}
