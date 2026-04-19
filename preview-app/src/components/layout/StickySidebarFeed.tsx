// StickySidebarFeed.tsx — L7 sticky sidebar + feed (Twitter-style) (RSC)
//
// COMBO: Layout — feed / social / activity-stream / blog / dashboard
// Kaynak: catalog/atoms/layout/L7.yaml, insaat-crm/a-safe/index.html:47 (grid 240 1fr 360)
// forbidden_sectors: hero-landing

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface StickySidebarFeedProps {
  /** Sol sticky panel (240px). */
  leftSidebar: ReactNode;
  /** Ortadaki akis (esnek). */
  feed: ReactNode;
  /** Sag rail opsiyonel (360px). Yoksa 2-col grid olur. */
  rightRail?: ReactNode;
  /** Sol sidebar genislik (px). Default 240. */
  leftWidth?: number;
  /** Sag rail genislik (px). Default 360. */
  rightWidth?: number;
  /** Sticky top offset (px). Default 0. */
  stickyTop?: number;
  /** Col arasi bosluk (px). Default 1 (hairline). */
  gap?: number;
  /** Grid arkaplani — 1px hairline line rengi. Default currentColor/10. */
  gridLineColor?: string;
  className?: string;
}

export function StickySidebarFeed({
  leftSidebar,
  feed,
  rightRail,
  leftWidth = 240,
  rightWidth = 360,
  stickyTop = 0,
  gap = 1,
  gridLineColor = 'rgba(0,0,0,0.1)',
  className,
}: StickySidebarFeedProps) {
  const gridTemplate = rightRail
    ? `${leftWidth}px 1fr ${rightWidth}px`
    : `${leftWidth}px 1fr`;

  return (
    <div
      className={cn('grid min-h-screen w-full', className)}
      style={{
        gridTemplateColumns: gridTemplate,
        gap: `${gap}px`,
        backgroundColor: gridLineColor,
      }}
    >
      <aside
        className="sticky self-start overflow-y-auto bg-[inherit]"
        style={{ top: `${stickyTop}px`, height: `calc(100vh - ${stickyTop}px)` }}
        aria-label="Sol panel"
      >
        {leftSidebar}
      </aside>

      <main className="bg-[inherit]" role="main">
        {feed}
      </main>

      {rightRail && (
        <aside
          className="sticky self-start overflow-y-auto bg-[inherit]"
          style={{ top: `${stickyTop}px`, height: `calc(100vh - ${stickyTop}px)` }}
          aria-label="Sag baglam paneli"
        >
          {rightRail}
        </aside>
      )}
    </div>
  );
}
