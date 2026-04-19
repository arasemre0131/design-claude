// FullBleedRails.tsx — L4 Full-bleed horizontal rails (RSC)
//
// COMBO: Layout — cinematic / brand-story / immersive / otel / gayrimenkul
// Kaynak: catalog/atoms/layout/L4.yaml, insaat-crm/b-edge/index.html:104-107
// forbidden_sectors: admin-dense

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface FullBleedRailsProps {
  /** Her biri bir full-width section icerigi. */
  children: ReactNode;
  /** Yan padding (px). Default 40. 0 = edge-to-edge. */
  horizontalPadding?: number;
  /** Bolumler arasi bosluk (px). Default 0 (sinirlar dokunsun). */
  sectionGap?: number;
  /** Her bolum min-height (ornek '100vh' cinematic, '60vh' slot). */
  sectionMinHeight?: string;
  className?: string;
}

export function FullBleedRails({
  children,
  horizontalPadding = 40,
  sectionGap = 0,
  sectionMinHeight,
  className,
}: FullBleedRailsProps) {
  return (
    <div
      className={cn('flex w-full flex-col', className)}
      style={{ gap: `${sectionGap}px` }}
    >
      {children}
      <style>{`
        [data-rail-section] {
          width: 100%;
          padding-left: ${horizontalPadding}px;
          padding-right: ${horizontalPadding}px;
          ${sectionMinHeight ? `min-height: ${sectionMinHeight};` : ''}
        }
      `}</style>
    </div>
  );
}

/** Rail bolum wrapper — padding + min-height devralir. */
export function FullBleedRailSection({
  children,
  className,
  background,
}: {
  children: ReactNode;
  className?: string;
  /** Section bg — her biri farkli cinematic panel olabilir. */
  background?: string;
}) {
  return (
    <section
      data-rail-section
      className={cn('relative', className)}
      style={background ? { background } : undefined}
    >
      {children}
    </section>
  );
}
