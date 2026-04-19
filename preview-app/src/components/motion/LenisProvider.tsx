/**
 * LenisProvider.tsx — Lenis 1.3.4 smooth scroll + GSAP ticker bridge
 *
 * COMBO: wearebrand-lenis-gsap-bridge + motion-foundation
 * License: MIT-safe rewrite — pattern referenced from
 *   research-assets/wab/wearebrand-animations.js:707-726 +
 *   templates/14-ultra/index.html:492-499.
 *   Implementation is original. Custom ease curve: cubic-out
 *   (t => 1 - (1-t)^3) instead of wearebrand's
 *   (e => Math.min(1, 1.001 - 2^(-10*e))) — kendi curve'ümüz.
 *
 * Context + hook:
 *   - <LenisProvider>{children}</LenisProvider> root layout'ta sarmalanır
 *   - const lenis = useLenis() → scrollTo, on('scroll'), stop() API
 *
 * prefers-reduced-motion: Lenis başlatılmaz, native scroll kullanılır.
 */

'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { prefersReducedMotion } from '@/lib/utils';

// Minimal Lenis type surface — dependency kaçınma
interface LenisLike {
  raf: (time: number) => void;
  on: (event: string, cb: (...args: unknown[]) => void) => void;
  scrollTo: (target: number | string | HTMLElement, opts?: Record<string, unknown>) => void;
  stop: () => void;
  start: () => void;
  destroy: () => void;
}

const LenisContext = createContext<LenisLike | null>(null);

export interface LenisProviderProps {
  children: ReactNode;
  duration?: number;
  smoothWheel?: boolean;
  touchMultiplier?: number;
  /** Custom easing — default: cubic-out (kendi curve'ümüz) */
  easing?: (t: number) => number;
}

const defaultEasing = (t: number): number => 1 - Math.pow(1 - t, 3);

export function LenisProvider({
  children,
  duration = 1.1,
  smoothWheel = true,
  touchMultiplier = 2,
  easing = defaultEasing,
}: LenisProviderProps): ReactNode {
  const [lenis, setLenis] = useState<LenisLike | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;
    let instance: LenisLike | null = null;
    let gsapRef: typeof import('gsap').default | null = null;

    (async () => {
      try {
        const lenisMod = await import('lenis');
        if (cancelled) return;
        const Lenis = lenisMod.default ?? lenisMod;
        instance = new Lenis({
          duration,
          smoothWheel,
          touchMultiplier,
          easing,
        }) as unknown as LenisLike;

        // GSAP ticker bridge (optional — falls back to rAF if GSAP missing)
        try {
          const gsapMod = await import('gsap');
          const stMod = await import('gsap/ScrollTrigger');
          if (cancelled) return;
          const gsap = gsapMod.default ?? gsapMod;
          const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
          gsap.registerPlugin(ScrollTrigger);
          gsapRef = gsap;
          instance!.on('scroll', ScrollTrigger.update);
          gsap.ticker.add((t: number) => instance!.raf(t * 1000));
          gsap.ticker.lagSmoothing(0);
        } catch {
          // Native rAF loop
          const loop = (t: number): void => {
            instance?.raf(t);
            rafRef.current = requestAnimationFrame(loop);
          };
          rafRef.current = requestAnimationFrame(loop);
        }

        setLenis(instance);
      } catch {
        /* Lenis missing — no smooth scroll */
      }
    })();

    return () => {
      cancelled = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (gsapRef) gsapRef.ticker.remove(() => undefined);
      instance?.destroy();
    };
  }, [duration, smoothWheel, touchMultiplier, easing]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/**
 * useLenis — LenisProvider içinde kullanılmalı.
 * Provider yoksa null döner (safe).
 */
export function useLenis(): LenisLike | null {
  return useContext(LenisContext);
}
