/**
 * HeroImmersive3D.tsx — HR4 3D Canvas Scroll-Camera
 *
 * COMBO: HR4 + TY5/TY8/TY14 + immersive-3d pathway
 * Kaynak: v2-immersive-3d/index.html:1-200 · templates/09-gayrimenkul/index.html:80-180
 *          SCRAPED-STACKS-2026.md:206-215 (Pattern D — Scroll-Linked Camera)
 * Uyumlu sektörler: architecture, product-3d, gayrimenkul, automotive, mobilya-3d
 * Forbidden with: klinik, kargo
 *
 * R3F Canvas, scroll-linked camera path (Hermite-ish interpolation via lerp).
 * prefers-reduced-motion: statik kamera + low DPR fallback.
 */

'use client';

import { Suspense, useRef, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import type { Group, PerspectiveCamera as ThreePerspectiveCamera } from 'three';
import { cn, prefersReducedMotion } from '@/lib/utils';

export interface HeroImmersive3DProps {
  eyebrow?: string;
  title: ReactNode;
  titleEm?: string;
  description?: string;
  cameraPath?: [number, number, number][]; // [x,y,z] keyframes
  autoOrbit?: boolean;
  dpr?: [number, number];
  className?: string;
  children?: ReactNode; // custom scene slot
}

interface ScrollCameraProps {
  path: [number, number, number][];
}

function ScrollCamera({ path }: ScrollCameraProps): null {
  useFrame(({ camera }) => {
    if (typeof window === 'undefined') return;
    const sc = window.scrollY;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const t = Math.min(1, Math.max(0, sc / max));
    const segs = path.length - 1;
    const p = t * segs;
    const i = Math.min(segs - 1, Math.floor(p));
    const f = p - i;
    const a = path[i];
    const b = path[i + 1];
    // Hermite-cubic ease
    const e = f * f * (3 - 2 * f);
    const cam = camera as ThreePerspectiveCamera;
    cam.position.x = a[0] + (b[0] - a[0]) * e;
    cam.position.y = a[1] + (b[1] - a[1]) * e;
    cam.position.z = a[2] + (b[2] - a[2]) * e;
    cam.lookAt(0, 0, 0);
  });
  return null;
}

function DefaultScene(): ReactNode {
  const g = useRef<Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.15;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={g}>
        <mesh>
          <torusKnotGeometry args={[1.1, 0.32, 180, 24]} />
          <meshStandardMaterial color="#d4b17a" metalness={0.6} roughness={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroImmersive3D({
  eyebrow = 'Immersive · Scroll to explore',
  title,
  titleEm,
  description,
  cameraPath = [
    [0, 0.5, 6],
    [1.5, 1.2, 4],
    [0, 2, 3],
    [-1.5, 0.8, 4.5],
  ],
  autoOrbit = false,
  dpr = [1, 1.5],
  className,
  children,
}: HeroImmersive3DProps): ReactNode {
  const reduce = prefersReducedMotion();

  return (
    <section
      className={cn(
        'relative h-[200vh] bg-ink text-surface',
        className,
      )}
    >
      {/* Fixed 3D canvas behind copy */}
      <div className="sticky top-0 h-screen w-full">
        <Canvas
          dpr={reduce ? [1, 1] : dpr}
          camera={{ position: cameraPath[0], fov: 42 }}
          className="!absolute !inset-0"
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={['#0D0E14']} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 6, 4]} intensity={1.2} />
          <Suspense fallback={null}>
            {children ?? <DefaultScene />}
            <Environment preset="studio" />
          </Suspense>
          {!reduce && !autoOrbit ? <ScrollCamera path={cameraPath} /> : null}
          {autoOrbit ? (
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
          ) : null}
        </Canvas>

        {/* Copy overlay */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end lg:justify-center px-6 lg:px-16 pb-16 lg:pb-0">
          <div className="max-w-2xl">
            {eyebrow ? (
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-surface/60 mb-6">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="font-display text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95] tracking-tight">
              {title}
              {titleEm ? (
                <>
                  {' '}
                  <em className="italic text-accent">{titleEm}</em>
                </>
              ) : null}
            </h1>
            {description ? (
              <p className="mt-6 max-w-md text-lg text-surface/70 leading-relaxed">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
