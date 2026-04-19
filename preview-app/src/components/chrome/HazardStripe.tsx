// HazardStripe.tsx — Chrome utility, repeating 45° hazard pattern (RSC)
//
// COMBO: Chrome element — industrial-workwear + brutalist + insaat-crm
// Kaynak: mockups/c-concrete-industrial/index.html:62-77, insaat-crm/b-edge/index.html:56-57
// Uyumlu sektorler: insaat (ozellikle), eticaret-edge, brutalist style

import { cn } from '@/lib/utils';

export interface HazardStripeProps {
  /** Strip yuksekligi (px). Default 20. */
  height?: number;
  /** Renk varyanti: classic (sari-siyah), orange-dark (turuncu-siyah), red-dark (kirmizi-siyah). */
  variant?: 'classic' | 'orange-dark' | 'red-dark';
  /** Ek sinif zincirleme. */
  className?: string;
  /** Scroll-linked slide animasyonu. motion-reduce ile respect edilir. */
  animate?: boolean;
}

const VARIANTS = {
  classic:
    'bg-[linear-gradient(45deg,#F5C400_0_14px,#111111_14px_28px)]',
  'orange-dark':
    'bg-[linear-gradient(45deg,#E85D04_0_14px,#111111_14px_28px)]',
  'red-dark':
    'bg-[linear-gradient(45deg,#C43D2B_0_14px,#111111_14px_28px)]',
} as const;

export function HazardStripe({
  height = 20,
  variant = 'classic',
  className,
  animate = false,
}: HazardStripeProps) {
  return (
    <div
      className={cn(
        'w-full bg-[length:28.28px_28.28px]',
        VARIANTS[variant],
        animate && 'animate-[hazard-slide_12s_linear_infinite] motion-reduce:animate-none',
        className
      )}
      style={{ height: `${height}px` }}
      role="presentation"
      aria-hidden="true"
    />
  );
}
