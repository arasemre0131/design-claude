/**
 * BlurReveal.tsx — Blur-36px → 0 Reveal (SplitText chars/words/lines)
 *
 * COMBO: ultra-blur-char-reveal + wearebrand signature pattern
 * License: MIT-safe rewrite — pattern referenced from
 *   research-assets/wab/wearebrand-animations.js:148-194 (wearebrand) +
 *   templates/14-ultra/index.html:612-618 (bizim yazdığımız).
 *   Implementation is original; only the CSS filter transition + SplitText
 *   combination (industry-standard) is reused. wearebrand ease curve
 *   kullanılmıyor.
 *
 * GSAP 3.13 SplitText ve ScrollTrigger gerektirir (peer deps).
 * Lazy-import: ilk render'da yüklenir; SSR güvenli.
 * prefers-reduced-motion: tam opaklıkla statik göster.
 */

'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

export type BlurRevealMode = 'chars' | 'words' | 'lines';

export interface BlurRevealProps {
  children: ReactNode;
  mode?: BlurRevealMode;
  blurPx?: number;
  duration?: number;
  staggerEach?: number;
  start?: string; // ScrollTrigger start
  scrub?: boolean | number;
  as?: keyof Pick<
    JSX.IntrinsicElements,
    'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'section'
  >;
  className?: string;
}

export function BlurReveal({
  children,
  mode = 'chars',
  blurPx = 30,
  duration = 0.6,
  staggerEach = 0.02,
  start = 'top 85%',
  scrub = false,
  as = 'div',
  className,
}: BlurRevealProps): ReactNode {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (prefersReducedMotion()) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    (async () => {
      try {
        const gsapMod = await import('gsap');
        const stMod = await import('gsap/ScrollTrigger');
        const spMod = await import('gsap/SplitText');
        if (cancelled || !ref.current) return;
        const gsap = gsapMod.default ?? gsapMod;
        const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
        const SplitText = spMod.SplitText ?? spMod.default;
        gsap.registerPlugin(ScrollTrigger, SplitText);

        ctx = gsap.context(() => {
          const splitType =
            mode === 'chars' ? 'chars,words' : mode === 'words' ? 'words' : 'lines,words';
          const split = new SplitText(ref.current, {
            type: splitType,
            mask: mode === 'lines' ? 'lines' : undefined,
          });
          const targets = mode === 'chars' ? split.chars : mode === 'words' ? split.words : split.lines;

          gsap.from(targets, {
            filter: `blur(${blurPx}px)`,
            opacity: 0.15,
            duration,
            stagger: { each: staggerEach },
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start,
              end: 'bottom 60%',
              scrub: scrub === true ? true : typeof scrub === 'number' ? scrub : false,
              once: !scrub,
            },
          });
        }, ref);
      } catch {
        /* GSAP missing — static fallback */
      }
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [mode, blurPx, duration, staggerEach, start, scrub]);

  const Tag = as as keyof JSX.IntrinsicElements;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
