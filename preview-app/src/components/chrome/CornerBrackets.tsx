// CornerBrackets.tsx — Chrome frame, 4 kose bracket (RSC)
//
// COMBO: Chrome element — technical, blueprint, schematic aesthetic
// Kaynak: insaat-crm/a-safe/index.html:71-74 (.corner-frame pseudo-elements)
// Uyumlu sektorler: blueprint, engineering, dashboard-technical, schematic

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface CornerBracketsProps {
  /** Bracket kenar boyutu (px). Default 14. */
  size?: number;
  /** Bracket border kalinligi (px). Default 2. */
  thickness?: number;
  /** Bracket rengi CSS. Default currentColor. */
  color?: string;
  /** Her kose tekil acilabilir (true = sadece o kose). */
  corners?: {
    tl?: boolean;
    tr?: boolean;
    bl?: boolean;
    br?: boolean;
  };
  /** Icerik. */
  children?: ReactNode;
  /** Ek sinif. */
  className?: string;
}

export function CornerBrackets({
  size = 14,
  thickness = 2,
  color = 'currentColor',
  corners = { tl: true, tr: true, bl: true, br: true },
  children,
  className,
}: CornerBracketsProps) {
  const common = {
    position: 'absolute' as const,
    width: `${size}px`,
    height: `${size}px`,
    borderColor: color,
    borderStyle: 'solid',
  };

  return (
    <div className={cn('relative', className)}>
      {corners.tl && (
        <span
          aria-hidden="true"
          style={{
            ...common,
            top: 0,
            left: 0,
            borderWidth: `${thickness}px 0 0 ${thickness}px`,
          }}
        />
      )}
      {corners.tr && (
        <span
          aria-hidden="true"
          style={{
            ...common,
            top: 0,
            right: 0,
            borderWidth: `${thickness}px ${thickness}px 0 0`,
          }}
        />
      )}
      {corners.bl && (
        <span
          aria-hidden="true"
          style={{
            ...common,
            bottom: 0,
            left: 0,
            borderWidth: `0 0 ${thickness}px ${thickness}px`,
          }}
        />
      )}
      {corners.br && (
        <span
          aria-hidden="true"
          style={{
            ...common,
            bottom: 0,
            right: 0,
            borderWidth: `0 ${thickness}px ${thickness}px 0`,
          }}
        />
      )}
      {children}
    </div>
  );
}
