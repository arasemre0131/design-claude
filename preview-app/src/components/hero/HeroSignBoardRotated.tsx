/**
 * HeroSignBoardRotated.tsx — HR5 Sign Board / Construction Poster
 *
 * COMBO: HR5 + TY6/TY26 (Archivo Black + stencil) + PL4 (hazard yellow) / PL21
 * Kaynak: templates/01-insaat/index.html:90-180 · v2-neobrutalist/hero-sign.html
 * Uyumlu sektörler: inşaat, construction, endüstriyel, events, neobrutalist
 * Forbidden with: mücevher, spa, klinik (uygun değil)
 *
 * Hazard tape frame, rotated -0.8deg, 8px hard shadow, rivet corners.
 * CSS-only, static hero. Server-render OK.
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface HeroSignBoardRotatedProps {
  badge?: string;
  title: string;
  subtitle?: string;
  meta?: string;
  rotateDeg?: number;
  frameColor?: 'hazard' | 'ink' | 'concrete';
  className?: string;
}

export function HeroSignBoardRotated({
  badge = '⚠ ACTIVE SITE',
  title,
  subtitle,
  meta,
  rotateDeg = -0.8,
  frameColor = 'hazard',
  className,
}: HeroSignBoardRotatedProps): ReactNode {
  return (
    <section
      className={cn(
        'relative flex min-h-[80vh] items-center justify-center',
        'px-6 py-24 lg:py-32 bg-surface',
        className,
      )}
    >
      {/* Hazard stripes backdrop */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-4"
        style={{
          background:
            'repeating-linear-gradient(45deg, var(--color-ink,#111) 0 20px, var(--color-accent,#F5C400) 20px 40px)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-4"
        style={{
          background:
            'repeating-linear-gradient(45deg, var(--color-ink,#111) 0 20px, var(--color-accent,#F5C400) 20px 40px)',
        }}
      />

      <div
        className={cn(
          'relative inline-block border-[8px] px-10 py-12 lg:px-16 lg:py-20',
          frameColor === 'hazard' && 'border-ink bg-accent',
          frameColor === 'ink' && 'border-accent bg-ink text-surface',
          frameColor === 'concrete' && 'border-ink bg-surface',
        )}
        style={{
          transform: `rotate(${rotateDeg}deg)`,
          boxShadow: '8px 8px 0 0 var(--color-ink, #111)',
        }}
      >
        {/* Rivets at corners */}
        {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={cn(
              'absolute w-3 h-3 rounded-full bg-ink ring-2 ring-surface',
              pos === 'top-left' && 'top-2 left-2',
              pos === 'top-right' && 'top-2 right-2',
              pos === 'bottom-left' && 'bottom-2 left-2',
              pos === 'bottom-right' && 'bottom-2 right-2',
            )}
          />
        ))}

        {badge ? (
          <div className="font-mono text-xs uppercase tracking-[0.28em] text-ink/80 mb-6">
            {badge}
          </div>
        ) : null}

        <h1 className="font-display font-black uppercase tracking-tight leading-[0.9] text-[clamp(3.5rem,11vw,9.5rem)] text-ink">
          {title}
        </h1>

        {subtitle ? (
          <p className="mt-6 font-mono text-sm uppercase tracking-[0.22em] text-ink/70">
            {subtitle}
          </p>
        ) : null}

        {meta ? (
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-ink/60">
            {meta}
          </p>
        ) : null}
      </div>
    </section>
  );
}
