// Sparkline.tsx — CH10 Inline minimal sparkline (RSC)
//
// COMBO: Data UI — finance / dashboard-minimal / terminal / data-ops / KPI inline
// Kaynak: catalog/atoms/chart/CH10.yaml, insaat-crm/a-safe/index.html:124
// forbidden_sectors: editorial-rich, luxury

import { cn } from '@/lib/utils';

export type SparklineVariant = 'line' | 'area' | 'bar';

export interface SparklineProps {
  /** Data noktalari — y degerleri (x otomatik esit aralikli). */
  data: number[];
  /** Yukseklik (px). Default 28. */
  height?: number;
  /** Genislik (px). Undefined = responsive 100%. */
  width?: number;
  /** Variant — line (default), area (alt gradient), bar (mini stubs). */
  variant?: SparklineVariant;
  /** Cizgi rengi. Default currentColor. */
  color?: string;
  /** Cizgi kalinligi. Default 1.5. */
  strokeWidth?: number;
  /** Area variant opacity. Default 0.15. */
  fillOpacity?: number;
  /** Son nokta dot'u goster. Default true. */
  showLastDot?: boolean;
  /** aria-label. Default 'Trend gostergesi'. */
  label?: string;
  className?: string;
}

function normalize(data: number[], targetW: number, targetH: number, pad = 2) {
  if (data.length === 0) return { pts: [] as Array<[number, number]>, min: 0, max: 0 };
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = data.length === 1 ? 0 : (targetW - pad * 2) / (data.length - 1);
  const pts: Array<[number, number]> = data.map((v, i) => {
    const x = pad + i * stepX;
    const y = targetH - pad - ((v - min) / range) * (targetH - pad * 2);
    return [x, y];
  });
  return { pts, min, max };
}

export function Sparkline({
  data,
  height = 28,
  width,
  variant = 'line',
  color = 'currentColor',
  strokeWidth = 1.5,
  fillOpacity = 0.15,
  showLastDot = true,
  label = 'Trend gostergesi',
  className,
}: SparklineProps) {
  // Fixed internal viewBox — SVG scales via preserveAspectRatio
  const vbW = 120;
  const vbH = 40;

  if (data.length === 0) {
    return (
      <span
        className={cn('inline-block opacity-30', className)}
        style={{ width: width ?? '100%', height }}
        aria-label={`${label} — veri yok`}
      />
    );
  }

  const { pts } = normalize(data, vbW, vbH);
  const pathD = pts
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ');

  const firstPt = pts[0];
  const lastPt = pts[pts.length - 1];
  // data.length === 0 kontrolu yukarida — buraya gelen pts en az 1 element icerir
  const lastX = lastPt ? lastPt[0] : 0;
  const lastY = lastPt ? lastPt[1] : 0;
  const areaD = firstPt && lastPt
    ? `${pathD} L ${lastPt[0].toFixed(2)},${vbH} L ${firstPt[0].toFixed(2)},${vbH} Z`
    : pathD;

  return (
    <svg
      className={cn('inline-block align-middle', className)}
      viewBox={`0 0 ${vbW} ${vbH}`}
      preserveAspectRatio="none"
      width={width ?? '100%'}
      height={height}
      role="img"
      aria-label={label}
      style={{ color }}
    >
      {variant === 'area' && (
        <path d={areaD} fill={color} fillOpacity={fillOpacity} stroke="none" />
      )}

      {variant === 'bar' &&
        pts.map(([x, y], i) => (
          <rect
            key={i}
            x={x - 1}
            y={y}
            width={2}
            height={vbH - y}
            fill={color}
            fillOpacity={fillOpacity + 0.4}
          />
        ))}

      {(variant === 'line' || variant === 'area') && (
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {showLastDot && variant !== 'bar' && (
        <circle cx={lastX} cy={lastY} r={strokeWidth + 0.5} fill={color} />
      )}
    </svg>
  );
}
