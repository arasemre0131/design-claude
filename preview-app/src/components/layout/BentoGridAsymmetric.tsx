// BentoGridAsymmetric.tsx — L3 Bento Mondrian asimetrik grid (RSC)
//
// COMBO: Layout — Bento solid, NOT "glass+gradient" cliche
// Kaynak: catalog/atoms/layout/L3.yaml, templates/14-ultra/index.html:227-255
// forbidden_with: K1 (KPI glass bento)
// Uyumlu sektorler: portfolio, eticaret-feature, dashboard-modular, landing

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type BentoSpan = {
  /** grid-column span. Default 2. 1–6 arasi. */
  col?: 1 | 2 | 3 | 4 | 5 | 6;
  /** grid-row span. Default 1. 1–4 arasi. */
  row?: 1 | 2 | 3 | 4;
};

/** Onceden tanimli preset boyutlar */
export const BENTO_PRESETS = {
  'cat-big': { col: 2, row: 2 } satisfies BentoSpan,
  'cat-wide': { col: 2, row: 1 } satisfies BentoSpan,
  'cat-tall': { col: 1, row: 2 } satisfies BentoSpan,
  'cat-square': { col: 1, row: 1 } satisfies BentoSpan,
  'cat-hero': { col: 3, row: 2 } satisfies BentoSpan,
} as const;

export type BentoPresetName = keyof typeof BENTO_PRESETS;

export interface BentoItem {
  id: string;
  content: ReactNode;
  /** Preset adi VEYA manuel span. */
  span?: BentoPresetName | BentoSpan;
  className?: string;
}

export interface BentoGridAsymmetricProps {
  items: BentoItem[];
  /** Columns sayisi. Default 6. */
  columns?: number;
  /** Auto-row yuksekligi (px). Default 160. */
  rowHeight?: number;
  /** Hucreler arasi bosluk (px). Default 12. */
  gap?: number;
  className?: string;
}

function resolveSpan(span?: BentoPresetName | BentoSpan): Required<BentoSpan> {
  if (!span) return { col: 2, row: 1 };
  if (typeof span === 'string') {
    const preset = BENTO_PRESETS[span];
    return { col: preset.col, row: preset.row };
  }
  return { col: span.col ?? 2, row: span.row ?? 1 };
}

export function BentoGridAsymmetric({
  items,
  columns = 6,
  rowHeight = 160,
  gap = 12,
  className,
}: BentoGridAsymmetricProps) {
  return (
    <div
      className={cn('w-full', className)}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridAutoRows: `${rowHeight}px`,
        gap: `${gap}px`,
      }}
    >
      {items.map((item) => {
        const { col, row } = resolveSpan(item.span);
        return (
          <div
            key={item.id}
            className={cn(
              'relative overflow-hidden border border-current/10 bg-current/[0.02]',
              item.className
            )}
            style={{ gridColumn: `span ${col}`, gridRow: `span ${row}` }}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}
