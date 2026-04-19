// CenterColumnNarrow.tsx — L6 Tek sutun long-read (RSC)
//
// COMBO: Layout — long-read / blog / documentation / editorial-focus / essay
// Kaynak: catalog/atoms/layout/L6.yaml
// forbidden_sectors: dashboard-dense, eticaret-grid

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface CenterColumnNarrowProps {
  children: ReactNode;
  /** Max-width (px). Default 780. 720–840 ideal long-read. */
  maxWidth?: number;
  /** Yan padding (px). Default 48. */
  sidePadding?: number;
  /** Semantic tag — article/main/section. Default article. */
  as?: 'article' | 'main' | 'section' | 'div';
  /** Line-height reading comfort. Default 1.7. */
  lineHeight?: number;
  className?: string;
}

export function CenterColumnNarrow({
  children,
  maxWidth = 780,
  sidePadding = 48,
  as: Tag = 'article',
  lineHeight = 1.7,
  className,
}: CenterColumnNarrowProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full',
        '[&_h1]:text-[clamp(32px,4.5vw,48px)] [&_h1]:font-semibold [&_h1]:tracking-[-0.02em] [&_h1]:leading-[1.1] [&_h1]:mb-6',
        '[&_h2]:text-[clamp(24px,3vw,32px)] [&_h2]:font-semibold [&_h2]:tracking-[-0.01em] [&_h2]:mt-12 [&_h2]:mb-4',
        '[&_h3]:text-[20px] [&_h3]:font-medium [&_h3]:mt-8 [&_h3]:mb-3',
        '[&_p]:mb-5 [&_p]:text-[17px]',
        '[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-current/30 [&_blockquote]:pl-5 [&_blockquote]:italic',
        '[&_a]:underline [&_a]:decoration-current/40 [&_a:hover]:decoration-current',
        className
      )}
      style={{
        maxWidth: `${maxWidth}px`,
        paddingLeft: `${sidePadding}px`,
        paddingRight: `${sidePadding}px`,
        lineHeight,
      }}
    >
      {children}
    </Tag>
  );
}
