// SVGGrainOverlay.tsx — SVG feTurbulence grain fixed-overlay (2026 standard)
//
// COMBO: ultra-svg-feturbulence-grain (14-ultra, tüm premium template'lerde)
// Kaynak: catalog/atoms/motion-ajans/ultra-svg-feturbulence-grain.yaml
//         templates/14-ultra/index.html:62-63
// Uyumlu sektörler: editorial-luxury, maximalist-atm, industrial, print-feel, mucevher, otel, restoran
// Forbidden with: yok (her yerde güvenli overlay)
//
// fixed position, pointer-events:none, mix-blend-mode overlay.
// baseFrequency 0.9, %7 opacity ideal — bozmadan doku hissi.
// SSR-safe pure SVG. Her overlay için unique filter id.

import { cn } from '@/lib/utils';

export interface SVGGrainOverlayProps {
  /** 0-1 arası. default 0.07 (2026 standard, görünmez ama dokulu) */
  opacity?: number;
  /** feTurbulence baseFrequency. Yüksek = ince grain. default 0.9 */
  baseFrequency?: number;
  /** Kaç oktav (pahalı). default 2 */
  numOctaves?: number;
  /** mix-blend-mode. default overlay */
  blendMode?: 'overlay' | 'multiply' | 'screen' | 'soft-light';
  /** z-index. default 98 (her şeyin üstünde ama cursor'ın altında) */
  zIndex?: number;
  /** Sadece belirli bir section için absolute render */
  scope?: 'fixed' | 'absolute';
  className?: string;
}

export function SVGGrainOverlay({
  opacity = 0.07,
  baseFrequency = 0.9,
  numOctaves = 2,
  blendMode = 'overlay',
  zIndex = 98,
  scope = 'fixed',
  className,
}: SVGGrainOverlayProps) {
  // SSR + multiple-instance safe unique id
  const filterId = `grain-${baseFrequency}-${numOctaves}-${opacity}`.replace(/\./g, '_');

  return (
    <svg
      aria-hidden
      className={cn(scope === 'fixed' ? 'fixed inset-0' : 'absolute inset-0', 'pointer-events-none', className)}
      width="100%"
      height="100%"
      style={{
        opacity,
        mixBlendMode: blendMode,
        zIndex,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id={filterId}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency={baseFrequency}
          numOctaves={numOctaves}
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 0.5 0"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} />
    </svg>
  );
}
