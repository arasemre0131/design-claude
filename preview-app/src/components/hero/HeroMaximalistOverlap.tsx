/**
 * HeroMaximalistOverlap.tsx — Maximalist-Atmospheric Signature
 *
 * COMBO: maximalist-atmospheric + TY27/TY43 (Fraunces italic em) + PL22/PL23
 * Kaynak: templates/14-ultra/index.html:572-584 (hero porthole dive)
 *          v2-kinetic-data (maximalist overlap spec)
 *          ULTRAPLAN.md Section 11 atom #24 Porthole-Dive-Scale
 * Uyumlu sektörler: editorial-luxury, maximalist, agency, luxury, portfolio
 * Forbidden with: PL1 (dark+gold klişe), b2b-corporate
 *
 * 3 satır progressive left-margin offset, italic em gradient accent.
 * Scale-up + scroll parallax (optional). Reduced-motion: statik.
 */

'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn, prefersReducedMotion } from '@/lib/utils';

export interface HeroMaximalistOverlapProps {
  eyebrow?: string;
  line1: string;
  line2: string;
  line2Em?: string;
  line3: string;
  subtext?: string;
  offsetStep?: number; // vw — her satır kayması
  parallax?: boolean;
  className?: string;
}

export function HeroMaximalistOverlap({
  eyebrow = 'Koleksiyon · Mart 2026',
  line1,
  line2,
  line2Em,
  line3,
  subtext,
  offsetStep = 6,
  parallax = true,
  className,
}: HeroMaximalistOverlapProps): ReactNode {
  const rootRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!parallax || prefersReducedMotion()) return;
    let raf = 0;
    const onScroll = (): void => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!rootRef.current || !bgRef.current) return;
        const rect = rootRef.current.getBoundingClientRect();
        const wh = window.innerHeight;
        const p = Math.min(1, Math.max(0, 1 - rect.top / wh));
        bgRef.current.style.transform = `scale(${1 + p * 0.4}) rotate(${p * 3}deg)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [parallax]);

  return (
    <section
      ref={rootRef}
      className={cn(
        'relative overflow-hidden min-h-[88vh]',
        'px-6 py-24 lg:px-16 lg:py-32',
        'bg-surface text-ink',
        className,
      )}
    >
      {/* Atmospheric glow / grain bg */}
      <div
        ref={bgRef}
        aria-hidden
        className="pointer-events-none absolute -inset-[20%] opacity-60 transition-transform duration-500 ease-out"
        style={{
          background:
            'radial-gradient(60% 60% at 70% 30%, var(--color-accent, #d4b17a) 0%, transparent 55%), radial-gradient(40% 40% at 20% 80%, var(--color-ink, #111) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      {eyebrow ? (
        <p className="relative font-mono text-[11px] uppercase tracking-[0.28em] text-muted mb-10">
          {eyebrow}
        </p>
      ) : null}

      <h1 className="relative font-display text-[clamp(3rem,11vw,10rem)] leading-[0.88] tracking-tight max-w-[1400px]">
        <span className="block">{line1}</span>
        <span
          className="block"
          style={{ marginLeft: `${offsetStep}vw` }}
        >
          {line2Em ? (
            <>
              {line2}{' '}
              <em
                className="italic font-light"
                style={{
                  background:
                    'linear-gradient(90deg, var(--color-accent, #d4b17a) 0%, var(--color-ink, #111) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {line2Em}
              </em>
            </>
          ) : (
            line2
          )}
        </span>
        <span
          className="block"
          style={{ marginLeft: `${offsetStep * 2}vw` }}
        >
          {line3}
        </span>
      </h1>

      {subtext ? (
        <p className="relative mt-12 max-w-md text-lg text-muted leading-relaxed" style={{ marginLeft: `${offsetStep * 2}vw` }}>
          {subtext}
        </p>
      ) : null}
    </section>
  );
}
