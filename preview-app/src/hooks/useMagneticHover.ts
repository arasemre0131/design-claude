// useMagneticHover.ts — mousemove magnetic attract + elastic.out(1, 0.3) return.
// MIT-safe rewrite — pattern industry-standard, curve original.
//
// prefers-reduced-motion / mobil (<= 991px) altinda otomatik devre disi.
// Touch-only cihazlarda da no-op.

'use client';

import { useEffect, type RefObject } from 'react';
import { magneticHover, type MagneticHoverOptions } from '@/lib/wab-safe-animations';
import { useReducedMotion } from './useReducedMotion';

export interface UseMagneticHoverOptions extends MagneticHoverOptions {
  /** false ise hook hicbir sey yapmaz. Default true. */
  enabled?: boolean;
}

/**
 * Magnetic hover effect attach — element mouse takip eder, bilekle birlikte
 * x/y transform alir; mouseleave'de elastic ease ile eski yerine doner.
 *
 * Kullanim:
 *   const ref = useRef<HTMLButtonElement>(null);
 *   useMagneticHover(ref, { strength: 0.3 });
 */
export function useMagneticHover<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  opts: UseMagneticHoverOptions = {}
): void {
  const { enabled = true, ...rest } = opts;
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!enabled || reducedMotion) return;
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) return;

    const cleanup = magneticHover(el, rest);
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, reducedMotion, ref]);
}
