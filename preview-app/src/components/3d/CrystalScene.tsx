// CrystalScene.tsx — Icosahedron crystal + 8 orbit + particles + emissive
//
// COMBO: HR4 3D Canvas Scroll-Camera + immersive-3d signature
// Kaynak: templates/12-immersive-3d/index.html:332-388
// Uyumlu sektörler: mucevher, gayrimenkul, otel, eticaret (3D product), otomotiv, ajans-showreel
// Forbidden with: low-bandwidth (model küçük ama pipeline pahalı), mobile-low-end
//
// Immersive3DCanvas içine drop-in sahne. Geometri:
// - Main crystal: IcosahedronGeometry(4, 1) + MeshPhysicalMaterial (metalness 0.85, clearcoat 1)
// - Wireframe overlay: IcosahedronGeometry(4.01, 1) wireframe
// - Orbiting 8 crystals: small icosahedrons, angular orbit + bob
// - Sparkles 800 particles (drei) — BufferGeometry GPU'da
// - 3 light setup: key directional + 2 accent points (neonGreen + magenta)

'use client';

import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import type { Group, Mesh } from 'three';

export interface CrystalSceneProps {
  /** Ana kristal rengi */
  color?: string;
  /** Emissive + accent rengi (neon) */
  emissive?: string;
  /** İkincil accent rengi (magenta/purple) */
  accentColor?: string;
  /** Orbit eden küçük kristal sayısı. default 8 */
  orbitCount?: number;
  /** Particle sayısı. default 800 */
  particleCount?: number;
  /** Otomatik dönüş */
  autoRotate?: boolean;
  /** Mouse parallax multiplier (0 = kapalı). default 0.08 */
  parallax?: number;
}

export function CrystalScene({
  color = '#1A1D24',
  emissive = '#4DE6FF',
  accentColor = '#FF3DA8',
  orbitCount = 8,
  particleCount = 800,
  autoRotate = true,
  parallax = 0.08,
}: CrystalSceneProps) {
  const mainRef = useRef<Mesh>(null);
  const wireRef = useRef<Mesh>(null);
  const orbitGroupRef = useRef<Group>(null);
  const sceneRef = useRef<Group>(null);

  // Orbit parametreleri — mount-time stabilize et, her frame random yok
  const orbitSeeds = useMemo(
    () =>
      Array.from({ length: orbitCount }, (_, i) => ({
        angle: (i / orbitCount) * Math.PI * 2,
        radius: 8 + Math.random() * 2,
        speed: 0.3 + Math.random() * 0.4,
        bob: Math.random() * Math.PI * 2,
        size: 0.4 + Math.random() * 0.3,
        color: i % 2 === 0 ? emissive : accentColor,
      })),
    [orbitCount, emissive, accentColor],
  );

  useFrame((state, delta) => {
    if (autoRotate && mainRef.current) {
      mainRef.current.rotation.x += delta * 0.12;
      mainRef.current.rotation.y += delta * 0.18;
    }
    if (wireRef.current && mainRef.current) {
      wireRef.current.rotation.copy(mainRef.current.rotation);
      wireRef.current.rotation.y += delta * 0.09;
    }

    if (orbitGroupRef.current) {
      orbitGroupRef.current.children.forEach((child, i) => {
        const seed = orbitSeeds[i];
        if (!seed) return;
        seed.angle += seed.speed * delta * 0.5;
        child.position.set(
          Math.cos(seed.angle) * seed.radius,
          Math.sin(state.clock.elapsedTime * 0.5 + seed.bob) * 1.5,
          Math.sin(seed.angle) * seed.radius - 2,
        );
      });
    }

    // Mouse parallax — sahnenin tümü hafif kaysın
    if (parallax > 0 && sceneRef.current) {
      const { x, y } = state.mouse;
      sceneRef.current.rotation.y += (x * parallax - sceneRef.current.rotation.y) * 0.05;
      sceneRef.current.rotation.x += (-y * parallax * 0.5 - sceneRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Lighting — key + accent */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[15, 10, 20]} intensity={2} color="#ffffff" />
      <pointLight position={[-8, 2, 10]} intensity={8} distance={40} color={emissive} />
      <pointLight position={[10, -4, 8]} intensity={5} distance={30} color={accentColor} />

      {/* Main crystal */}
      <mesh ref={mainRef}>
        <icosahedronGeometry args={[4, 1]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.85}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive={emissive}
          emissiveIntensity={0.08}
          flatShading
        />
      </mesh>

      {/* Wireframe overlay — 14-ultra pattern */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[4.05, 1]} />
        <meshBasicMaterial color={emissive} wireframe transparent opacity={0.25} />
      </mesh>

      {/* Orbiting small crystals */}
      <group ref={orbitGroupRef}>
        {orbitSeeds.map((seed, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(seed.angle) * seed.radius,
              0,
              Math.sin(seed.angle) * seed.radius - 2,
            ]}
          >
            <icosahedronGeometry args={[seed.size, 0]} />
            <meshPhysicalMaterial
              color={seed.color}
              metalness={0.6}
              roughness={0.3}
              emissive={seed.color}
              emissiveIntensity={0.4}
              flatShading
            />
          </mesh>
        ))}
      </group>

      {/* Particles — drei Sparkles (additive blend GPU) */}
      <Sparkles
        count={particleCount}
        scale={[60, 40, 40]}
        size={2}
        speed={0.3}
        opacity={0.5}
        color={emissive}
      />
    </group>
  );
}
