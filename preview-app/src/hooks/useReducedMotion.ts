// useReducedMotion.ts — prefers-reduced-motion MediaQuery reactive hook.
//
// Motion component'leri bu hook'u kullanarak calisma-zamani kararli
// reduce-motion durumu izler. SSR-safe — ilk render'da false doner.

import { useEffect, useState } from 'react';

const MEDIA_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Reactive prefers-reduced-motion flag.
 * useEffect ile dinler; kullanici OS tercihini degistirirse re-render olur.
 * Initial render: false (SSR-safe default, CLS-friendly).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const mq = window.matchMedia(MEDIA_QUERY);
    setReduced(mq.matches);

    const handler = (event: MediaQueryListEvent): void => {
      setReduced(event.matches);
    };

    // Modern browsers: addEventListener / removeEventListener
    // Safari <14 legacy fallback: addListener / removeListener
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
    // deprecated API — still supported in older Safari
    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, []);

  return reduced;
}
