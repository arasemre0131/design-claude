// ConcreteTexture.tsx — Chrome background, 4x radial-gradient speckle (RSC)
//
// COMBO: Chrome element — industrial, concrete-industrial palette
// Kaynak: insaat-crm/b-edge/index.html:44-53, mockups/c-concrete-industrial/index.html:50-59
// Uyumlu sektorler: insaat, endustriyel, brutalist, utility dashboard

import { cn } from '@/lib/utils';

export interface ConcreteTextureProps {
  /** Tint rengi RGB (0-255 arasi 3 sayi). Default siyah [0,0,0]. */
  tint?: [number, number, number];
  /** Nokta yogunlugu / opaklik 0-1. Default 0.04. */
  opacity?: number;
  /** Sabit mi (fixed), yoksa container'a mi yapisir? Default fixed. */
  attachment?: 'fixed' | 'absolute';
  /** Ek sinif. */
  className?: string;
}

/** Deterministik pseudo-random speckle — her render aynisi */
const SPECKLE_POINTS: Array<{ x: string; y: string; size: string }> = [
  { x: '20%', y: '30%', size: '50px 50px' },
  { x: '70%', y: '60%', size: '70px 70px' },
  { x: '40%', y: '80%', size: '60px 60px' },
  { x: '90%', y: '20%', size: '80px 80px' },
  { x: '10%', y: '70%', size: '55px 55px' },
];

export function ConcreteTexture({
  tint = [0, 0, 0],
  opacity = 0.04,
  attachment = 'fixed',
  className,
}: ConcreteTextureProps) {
  const [r, g, b] = tint;
  const gradients = SPECKLE_POINTS.map(
    (p) =>
      `radial-gradient(circle at ${p.x} ${p.y}, rgba(${r},${g},${b},${opacity}) 0, transparent 2px)`
  ).join(', ');
  const sizes = SPECKLE_POINTS.map((p) => p.size).join(', ');

  return (
    <div
      className={cn(
        'pointer-events-none inset-0',
        attachment === 'fixed' ? 'fixed z-0' : 'absolute',
        className
      )}
      style={{
        backgroundImage: gradients,
        backgroundSize: sizes,
      }}
      aria-hidden="true"
    />
  );
}
