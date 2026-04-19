/**
 * HeroKineticSerif.tsx — HR1 Kinetic Typography Mask
 *
 * COMBO: HR1 + TY7/TY11/TY13/TY27 (variable-serif + mono) + kinetic-agency
 * Kaynak: templates/14-ultra/index.html:612-628 (SplitText + blur reveal)
 *          v2-kinetic-data/hero-kinetic.html:1-150
 * Uyumlu sektörler: editorial, portfolio, agency, creative, data-ops
 * Forbidden with: klinik, kargo, b2b-corporate
 *
 * Kelimeleri word-inner span ile wrap eder, translateY(110%) → 0 stagger mask.
 * GSAP 3.13 SplitText ücretsiz. prefers-reduced-motion fallback: direkt görünür.
 */

'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn, prefersReducedMotion } from '@/lib/utils';

export interface HeroKineticSerifProps {
  eyebrow?: string;
  lines: string[]; // her satır ayrı bir h1 blok parçası
  emphasisWord?: string; // italic vurgu (örn. "yeniden")
  stagger?: number;
  mode?: 'mask-y' | 'blur-chars';
  className?: string;
}

export function HeroKineticSerif({
  eyebrow = 'Parallel Studio · 2016 — 2026',
  lines,
  emphasisWord,
  stagger = 0.08,
  mode = 'mask-y',
  className,
}: HeroKineticSerifProps): ReactNode {
  const rootRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    if (prefersReducedMotion()) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    (async () => {
      try {
        const gsapMod = await import('gsap');
        const stMod = await import('gsap/ScrollTrigger');
        const splitMod = await import('gsap/SplitText');
        if (cancelled || !rootRef.current) return;
        const gsap = gsapMod.default ?? gsapMod;
        const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
        const SplitText = splitMod.SplitText ?? splitMod.default;
        gsap.registerPlugin(ScrollTrigger, SplitText);

        ctx = gsap.context(() => {
          const split = new SplitText(rootRef.current, {
            type: 'lines,words',
            mask: mode === 'mask-y' ? 'lines' : undefined,
          });

          if (mode === 'mask-y') {
            gsap.from(split.words, {
              yPercent: 110,
              opacity: 0,
              duration: 1.1,
              ease: 'expo.out',
              stagger,
              scrollTrigger: {
                trigger: rootRef.current,
                start: 'top 85%',
                once: true,
              },
            });
          } else {
            const chars = new SplitText(rootRef.current, { type: 'chars' });
            gsap.from(chars.chars, {
              filter: 'blur(30px)',
              opacity: 0.15,
              duration: 0.6,
              stagger: { each: 0.02 },
              scrollTrigger: {
                trigger: rootRef.current,
                start: 'top 85%',
                end: 'bottom 60%',
                scrub: true,
              },
            });
          }
        }, rootRef);
      } catch (err) {
        // GSAP yüklü değilse sessizce düş — CSS fallback zaten görünür.
        // console.warn('[HeroKineticSerif] gsap load failed', err);
      }
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [mode, stagger]);

  return (
    <section
      className={cn(
        'relative flex flex-col justify-center min-h-[88vh]',
        'px-6 py-24 lg:px-16 lg:py-32 bg-surface text-ink',
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted mb-10">
          {eyebrow}
        </p>
      ) : null}

      <h1
        ref={rootRef}
        className="font-display text-[clamp(2.75rem,9vw,8rem)] leading-[0.95] tracking-tight max-w-6xl"
      >
        {lines.map((line, i) => (
          <span key={i} className="block">
            {emphasisWord && line.includes(emphasisWord)
              ? line.split(emphasisWord).map((seg, j, arr) => (
                  <span key={j}>
                    {seg}
                    {j < arr.length - 1 ? (
                      <em className="italic font-light text-accent">{emphasisWord}</em>
                    ) : null}
                  </span>
                ))
              : line}
          </span>
        ))}
      </h1>
    </section>
  );
}
