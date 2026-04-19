// useScrollTrigger.ts — GSAP ScrollTrigger setup + cleanup hook.
//
// ScrollTrigger config'i React lifecycle'ina bagli. useEffect ile kurulur,
// unmount'ta kill() edilir. prefers-reduced-motion: skip.

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

// SSR-safe plugin registration (idempotent).
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type ScrollTriggerVars = Parameters<typeof ScrollTrigger.create>[0];

export interface UseScrollTriggerOptions {
  /** Skip tum config if prefers-reduced-motion. Default true. */
  respectReducedMotion?: boolean;
  /** Dependencies array — re-create when changed. Default []. */
  dependencies?: ReadonlyArray<unknown>;
}

/**
 * useScrollTrigger — bir ScrollTrigger.create() config'i kurar, cleanup
 * unmount'ta calisir. Return: trigger instance (null SSR/disabled).
 */
export function useScrollTrigger(
  vars: ScrollTriggerVars | (() => ScrollTriggerVars),
  opts: UseScrollTriggerOptions = {}
): ScrollTrigger | null {
  const { respectReducedMotion = true, dependencies = [] } = opts;
  const reducedMotion = useReducedMotion();
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (respectReducedMotion && reducedMotion) return;

    const config = typeof vars === 'function' ? vars() : vars;
    const trigger = ScrollTrigger.create(config);
    triggerRef.current = trigger;

    return () => {
      trigger.kill();
      triggerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, reducedMotion]);

  return triggerRef.current;
}

/**
 * Global refresh — layout degistiginde cagir (ornek: accordion open/close).
 * ScrollTrigger pozisyonlarini yeniden hesaplar.
 */
export function refreshScrollTrigger(): void {
  if (typeof window === 'undefined') return;
  ScrollTrigger.refresh();
}
