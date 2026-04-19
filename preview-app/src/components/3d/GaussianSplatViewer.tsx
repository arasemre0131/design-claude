// GaussianSplatViewer.tsx — drei Splat component (gerçek ürün fotogrametri)
//
// COMBO: 3D-11 Gaussian Splat + drei Splat + OrbitControls
// Kaynak: catalog/atoms/3d/3D-11-gaussian-splat.yaml
//         Mobilyacı/3d-demo/research (Gaussian Splatting)
// Uyumlu sektörler: mucevher (gerçek elmas), gayrimenkul (iç mekan tour), mimari-walkthrough,
//                   müze-3d, sanat-eseri, restoran (mekan 3D), perakende (butik tour)
// Forbidden with: low-bandwidth (.splat dosyaları 10-100MB), low-end-gpu
//
// Gaussian Splatting = NeRF'in GPU-friendly versiyonu. Fotoğraflardan 3D sahne.
// drei v10+ <Splat> component ile kolay tüketim — .splat / .ply dosyası ver, yeterli.
// Progressive load + chunk streaming var (gsplat library altta).
//
// Canvas içinde çalışır. Parent Immersive3DCanvas tercih edilir (GPU gate için).

'use client';

import { Suspense, useState } from 'react';
import { Splat, OrbitControls, Html } from '@react-three/drei';

export interface GaussianSplatViewerProps {
  /** .splat veya .ply URL */
  src: string;
  /** Initial position */
  position?: [number, number, number];
  /** Initial rotation (radians) */
  rotation?: [number, number, number];
  /** Scale */
  scale?: number;
  /** OrbitControls enable */
  controls?: boolean;
  /** Auto rotate */
  autoRotate?: boolean;
  /** Alpha test (siyah arka plan maskeleme) */
  alphaTest?: number;
  /** Loader text */
  loaderText?: string;
}

export function GaussianSplatViewer({
  src,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  controls = true,
  autoRotate = false,
  alphaTest = 0.1,
  loaderText = 'Sahne yükleniyor…',
}: GaussianSplatViewerProps) {
  return (
    <>
      <ambientLight intensity={0.8} />

      <Suspense fallback={<SplatLoader text={loaderText} />}>
        <Splat
          src={src}
          position={position}
          rotation={rotation}
          scale={scale}
          alphaTest={alphaTest}
        />
      </Suspense>

      {controls ? (
        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          minDistance={0.5}
          maxDistance={20}
        />
      ) : null}
    </>
  );
}

/* Suspense fallback — Html overlay ile loading gösterir */
function SplatLoader({ text }: { text: string }) {
  const [dots, setDots] = useState('.');

  if (typeof window !== 'undefined') {
    setTimeout(() => {
      setDots((d) => (d.length >= 3 ? '.' : d + '.'));
    }, 400);
  }

  return (
    <Html center>
      <div
        style={{
          padding: '12px 20px',
          borderRadius: 999,
          background: 'rgba(13,14,20,0.8)',
          color: '#fff',
          fontSize: 13,
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        {text}
        {dots}
      </div>
    </Html>
  );
}
