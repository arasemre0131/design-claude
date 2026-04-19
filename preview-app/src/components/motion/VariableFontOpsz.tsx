/**
 * VariableFontOpsz.tsx — Variable Font opsz Axis Scroll-Linked
 *
 * COMBO: ultra-variable-font-opsz-scroll (atom #25)
 * Kaynak: templates/14-ultra/index.html:586-595 (bizim yazdığımız pattern)
 * License: Our own implementation — fontVariationSettings is a web standard.
 *
 * ScrollTrigger onUpdate ile fontVariationSettings.opsz 144→9 arası
 * interpolasyon. Fraunces / Bricolage / Roboto Flex opsz axis gerektirir.
 * prefers-reduced-motion: statik opsz.
 */

'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn, prefersReducedMotion } from '@/lib/utils';

export interface VariableFontOpszProps {
  children: ReactNode;
  fontFamily?: string; // 'Fraunces' | 'Bricolage Grotesque' | 'Roboto Flex'
  opszMin?: number;
  opszMax?: number;
  softMin?: number;
  softMax?: number;
  /** scroll progress direction: 'enter' = max→min as scrolling in */
  direction?: 'enter' | 'leave';
  as?: keyof Pick<JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'>;
  className?: string;
}

export function VariableFontOpsz({
  children,
  fontFamily = 'Fraunces, serif',
  opszMin = 9,
  opszMax = 144,
  softMin = 0,
  softMax = 100,
  direction = 'enter',
  as = 'h1',
  className,
}: VariableFontOpszProps): ReactNode {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    if (prefersReducedMotion()) {
      // Static mid value
      const mid = (opszMin + opszMax) / 2;
      el.style.fontVariationSettings = `"opsz" ${mid}, "SOFT" ${(softMin + softMax) / 2}`;
      return;
    }

    let st: { kill: () => void } | null = null;
    let cancelled = false;

    (async () => {
      try {
        const gsapMod = await import('gsap');
        const stMod = await import('gsap/ScrollTrigger');
        if (cancelled) return;
        const gsap = gsapMod.default ?? gsapMod;
        const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
        gsap.registerPlugin(ScrollTrigger);

        st = ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self: { progress: number }) => {
            const t = direction === 'enter' ? 1 - self.progress : self.progress;
            const opsz = opszMin + (opszMax - opszMin) * t;
            const soft = softMin + (softMax - softMin) * t;
            el.style.fontVariationSettings = `"opsz" ${opsz.toFixed(1)}, "SOFT" ${soft.toFixed(1)}`;
          },
        });
      } catch {
        /* GSAP missing — static */
      }
    })();

    return () => {
      cancelled = true;
      st?.kill();
    };
  }, [direction, opszMin, opszMax, softMin, softMax]);

  const Tag = as as keyof JSX.IntrinsicElements;
  return (
    <Tag
      ref={ref as never}
      className={cn(className)}
      style={{ fontFamily, fontVariationSettings: `"opsz" ${opszMax}, "SOFT" ${softMax}` }}
    >
      {children}
    </Tag>
  );
}
