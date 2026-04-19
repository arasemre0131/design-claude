// TextPathBendMarquee.tsx — SVG textPath kavisli sonsuz marquee
//
// COMBO: ultra-textpath-marquee (14-ultra)
// Kaynak: catalog/atoms/motion-ajans/ultra-textpath-marquee.yaml
//         templates/14-ultra/index.html:454-466
// Uyumlu sektörler: kinetic, agency, brand-chrome, decorative, ajans-portfolio, hero-decorative
// Forbidden with: yok
//
// SVG quadratic Bezier path üstünde textPath + <animate startOffset> kayar.
// SSR-safe (pure SVG, animate deklaratif). accent class ile seçili kelimeler vurgulanır.

import { cn } from '@/lib/utils';
import type { CSSProperties } from 'react';

export interface TextPathBendMarqueeProps {
  /** Her eleman tek kelime/işaret. "accent: true" olanlar vurgulanır */
  segments: { text: string; accent?: boolean }[];
  /** Kaç tekrar (loop) oluşturulsun — daha uzun path için artır */
  repeat?: number;
  /** Animasyon süresi saniye */
  durationSec?: number;
  /** Bezier eğrisi. default: M 0 200 Q 800 -40 1600 200 (üstü kavisli) */
  pathD?: string;
  /** Font size (SVG px) */
  fontSize?: number;
  /** Ana text rengi */
  color?: string;
  /** Accent rengi */
  accentColor?: string;
  /** ViewBox (default 1600x260) */
  viewBox?: string;
  className?: string;
  style?: CSSProperties;
}

export function TextPathBendMarquee({
  segments,
  repeat = 3,
  durationSec = 26,
  pathD = 'M 0 200 Q 800 -40 1600 200',
  fontSize = 120,
  color = 'currentColor',
  accentColor = '#E85A2C',
  viewBox = '0 0 1600 260',
  className,
  style,
}: TextPathBendMarqueeProps) {
  const pathId = `bendPath-${Math.random().toString(36).slice(2, 9)}`;

  // segments × repeat birleştirilip render edilir
  const expanded = Array.from({ length: repeat }, () => segments).flat();

  return (
    <svg
      className={cn('w-full h-auto select-none', className)}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      style={style}
      aria-hidden
    >
      <defs>
        <path id={pathId} d={pathD} fill="none" />
      </defs>
      <text
        style={{
          fontFamily: 'inherit',
          fontSize,
          fontWeight: 700,
          letterSpacing: '0.02em',
          fill: color,
        }}
      >
        <textPath href={`#${pathId}`} startOffset="0%">
          <animate
            attributeName="startOffset"
            from="100%"
            to="-100%"
            dur={`${durationSec}s`}
            repeatCount="indefinite"
          />
          {expanded.map((seg, i) => (
            <tspan key={i} fill={seg.accent ? accentColor : undefined}>
              {seg.text}
              {i < expanded.length - 1 ? ' · ' : ''}
            </tspan>
          ))}
        </textPath>
      </text>
    </svg>
  );
}
