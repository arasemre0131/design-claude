// useLenis.ts — Lenis 1.3.4 + GSAP ticker bridge hook (MIT-safe rewrite).
//
// createLenisGsapBridge() helper'ini useEffect icinde kurar/teardown eder.
// prefers-reduced-motion: smooth scroll devre disi (native scroll kullanilir).
// SSR-safe — server component'ten cagirilmasi engelli, 'use client' dosyadan.

'use client';

import { useEffect, useRef, useState } from 'react';
import { createLenisGsapBridge, type LenisGsapBridge } from '@/lib/wab-safe-animations';
import { useReducedMotion } from './useReducedMotion';

export interface UseLenisOptions {
  /** Lenis duration (seconds). Default 1.2. */
  duration?: number;
  /** smoothWheel. Default true. */
  smoothWheel?: boolean;
  /** touchMultiplier. Default 2. */
  touchMultiplier?: number;
  /** Custom easing curve. Default cubic-out. */
  easing?: (t: number) => number;
  /** Set false to disable (conditional hook). Default true. */
  enabled?: boolean;
}

/**
 * Lenis + GSAP ticker bridge hook.
 * Returns the Lenis instance once mounted, or null during SSR/first paint.
 */
export function useLenis(opts: UseLenisOptions = {}): LenisGsapBridge | null {
  const { enabled = true } = opts;
  const reducedMotion = useReducedMotion();
  const [bridge, setBridge] = useState<LenisGsapBridge | null>(null);
  const bridgeRef = useRef<LenisGsapBridge | null>(null);

  useEffect(() => {
    if (!enabled || reducedMotion) return;
    if (typeof window === 'undefined') return;

    const instance = createLenisGsapBridge({
      duration: opts.duration,
      smoothWheel: opts.smoothWheel,
      touchMultiplier: opts.touchMultiplier,
      easing: opts.easing,
    });
    bridgeRef.current = instance;
    setBridge(instance);

    return () => {
      instance.destroy();
      bridgeRef.current = null;
      setBridge(null);
    };
    // Intentionally omit opts.* from deps — consumer should pass stable options
    // or restart the hook by toggling `enabled`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, reducedMotion]);

  return bridge;
}
