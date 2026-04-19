/**
 * HeroBrochure.tsx — HR11 Brochure Cover 2-col
 *
 * COMBO: HR11 + TY27/TY43 (Fraunces variable opsz) + PL22 (Tobacco+Pearl) / PL38
 * Kaynak: templates/02-mucevher/index.html:74-78 · templates/04-restoran/index.html:76-81
 * Uyumlu sektörler: mücevher, restoran, otel, spa, fotoğraf, editorial, e-ticaret-premium
 * Forbidden with: PL1 (dark+gold klişe), HR2 (split-hero klişe)
 *
 * Magazine/catalog cover aesthetic. Italic serif display,
 * 2-col (3:2) grid, side-panel framed visual. CSS-only, server-render OK.
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface HeroBrochureProps {
  eyebrow?: string;
  title: ReactNode;
  titleEm?: string;
  description?: string;
  cta?: { label: string; href: string };
  visualSymbol?: string;
  visualAspect?: '3/4' | '4/5' | '1/1';
  visualCaption?: string;
  className?: string;
}

export function HeroBrochure({
  eyebrow = 'Koleksiyon · 2026',
  title,
  titleEm,
  description,
  cta,
  visualSymbol = '◎',
  visualAspect = '3/4',
  visualCaption,
  className,
}: HeroBrochureProps): ReactNode {
  return (
    <section
      className={cn(
        'grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20',
        'px-6 py-24 lg:px-16 lg:py-32',
        'bg-surface text-ink',
        className,
      )}
    >
      <div className="flex flex-col justify-center">
        {eyebrow ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-8">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="font-display text-[clamp(3rem,10vw,8.25rem)] leading-[0.92] tracking-tight">
          {title}
          {titleEm ? (
            <>
              <br />
              <em className="italic font-light text-accent">{titleEm}</em>
            </>
          ) : null}
        </h1>

        {description ? (
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">{description}</p>
        ) : null}

        {cta ? (
          <a
            href={cta.href}
            className={cn(
              'mt-10 inline-flex items-center gap-3 self-start',
              'text-sm uppercase tracking-[0.18em]',
              'underline decoration-accent underline-offset-8 decoration-[1.5px]',
              'hover:decoration-ink transition-colors duration-500',
            )}
          >
            {cta.label}
            <span aria-hidden>→</span>
          </a>
        ) : null}
      </div>

      <figure
        className={cn(
          'relative w-full border border-line overflow-hidden bg-surface',
          visualAspect === '3/4' && 'aspect-[3/4]',
          visualAspect === '4/5' && 'aspect-[4/5]',
          visualAspect === '1/1' && 'aspect-square',
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center text-[12rem] text-muted opacity-25 select-none">
          {visualSymbol}
        </div>
        {visualCaption ? (
          <figcaption className="absolute bottom-4 left-4 right-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {visualSymbol} {visualCaption}
          </figcaption>
        ) : null}
      </figure>
    </section>
  );
}
