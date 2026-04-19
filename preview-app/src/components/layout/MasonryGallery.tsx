// MasonryGallery.tsx — L8 CSS columns Pinterest masonry (RSC)
//
// COMBO: Layout — portfolio / fotograf / gallery / visual eticaret
// Kaynak: catalog/atoms/layout/L8.yaml
// forbidden_sectors: data-dense-table

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface MasonryItem {
  id: string;
  content: ReactNode;
  /** Opsiyonel padding-bottom aspect (ornek '75%' = 4:3). Gorsel null ise atla. */
  aspectRatio?: string;
  className?: string;
}

export interface MasonryGalleryProps {
  items: MasonryItem[];
  /** Column sayilari responsive. */
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  /** Column gap (px). Default 12. */
  gap?: number;
  className?: string;
}

export function MasonryGallery({
  items,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 12,
  className,
}: MasonryGalleryProps) {
  const { mobile = 1, tablet = 2, desktop = 3 } = columns;

  return (
    <div
      className={cn('w-full', className)}
      style={
        {
          columnCount: mobile,
          columnGap: `${gap}px`,
          '--cols-tablet': tablet,
          '--cols-desktop': desktop,
        } as React.CSSProperties
      }
    >
      {items.map((item) => (
        <figure
          key={item.id}
          className={cn(
            'mb-[var(--masonry-mb)] block break-inside-avoid overflow-hidden border border-current/10',
            item.className
          )}
          style={
            {
              '--masonry-mb': `${gap}px`,
              marginBottom: `${gap}px`,
            } as React.CSSProperties
          }
        >
          {item.aspectRatio && (
            <div style={{ paddingBottom: item.aspectRatio, position: 'relative' }}>
              <div className="absolute inset-0">{item.content}</div>
            </div>
          )}
          {!item.aspectRatio && item.content}
        </figure>
      ))}

      <style>{`
        @media (min-width: 768px) {
          [data-masonry-root] { column-count: ${tablet}; }
        }
        @media (min-width: 1024px) {
          [data-masonry-root] { column-count: ${desktop}; }
        }
      `}</style>
    </div>
  );
}
