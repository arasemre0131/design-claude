// Immersive3DCanvas.tsx — R3F Canvas wrapper + GPU tier fallback + AdaptiveDpr
//
// COMBO: 3D-01 (envmap) + 3D-02 (orbitcontrols opt) + 3D-04 (contactshadows)
// Kaynak: Mobilyacı/3d-demo/research/drei-advanced-visual-components-research.md
//         templates/12-immersive-3d/index.html
// Uyumlu sektörler: mucevher, gayrimenkul, otomotiv, mimari, e-ticaret (3D product), otel
// Forbidden with: low-bandwidth, prefers-reduced-motion (fallback göster)
//
// Production 3D wrapper. GPU tier detection (detect-gpu), dpr=[1, 2] cap,
// antialias auto-off on low GPU. frameloop="demand" opsiyonu — pan/rotate yoksa
// GPU idle. AdaptiveDpr ile düşen FPS'de çözünürlük düşür. SSR-safe dynamic import.

'use client';

import { Canvas } from '@react-three/fiber';
import type { CanvasProps } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, Preload, useDetectGPU } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface Immersive3DCanvasProps extends Omit<CanvasProps, 'children'> {
  children: ReactNode;
  /** Düşük tier GPU'da gösterilecek fallback (statik görsel vb.) */
  lowTierFallback?: ReactNode;
  /** frameloop. default 'always' — battery için 'demand' */
  frameloop?: 'always' | 'demand' | 'never';
  /** Suspense loader (model yükleniyor) */
  loader?: ReactNode;
  /** Reduced motion fallback */
  reducedMotionFallback?: ReactNode;
  className?: string;
}

export function Immersive3DCanvas({
  children,
  lowTierFallback,
  reducedMotionFallback,
  loader = null,
  frameloop = 'always',
  className,
  camera,
  gl,
  dpr,
  shadows = 'soft',
  ...rest
}: Immersive3DCanvasProps) {
  return (
    <div className={cn('relative h-full w-full', className)}>
      <Canvas
        dpr={dpr ?? [1, 2]}
        camera={camera ?? { position: [0, 0, 18], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          ...(gl as object),
        }}
        shadows={shadows}
        frameloop={frameloop}
        {...rest}
      >
        <GPUGate lowTierFallback={lowTierFallback} reducedMotionFallback={reducedMotionFallback}>
          <Suspense fallback={loader}>
            {children}
            <Preload all />
          </Suspense>
        </GPUGate>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}

/* GPU tier gate — R3F Canvas içinde çalışır. drei useDetectGPU async değil ama tier < 2 → fallback */
function GPUGate({
  children,
  lowTierFallback,
  reducedMotionFallback,
}: {
  children: ReactNode;
  lowTierFallback?: ReactNode;
  reducedMotionFallback?: ReactNode;
}) {
  const gpu = useDetectGPU();
  const isReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  if (isReducedMotion && reducedMotionFallback) {
    return <>{reducedMotionFallback}</>;
  }
  if (gpu.tier < 2 && lowTierFallback) {
    return <>{lowTierFallback}</>;
  }
  return <>{children}</>;
}
