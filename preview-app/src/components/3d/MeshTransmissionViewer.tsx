// MeshTransmissionViewer.tsx — drei MeshTransmissionMaterial (glass/crystal/jewelry)
//
// COMBO: 3D-08 drei MeshTransmissionMaterial + 3D-04 ContactShadows + 3D-03 PresentationControls
// Kaynak: catalog/atoms/3d/3D-08-drei-meshtransmission.yaml
//         Mobilyacı/3d-demo/research/drei-MeshTransmissionMaterial-research.md
// Uyumlu sektörler: mucevher, cam-ürün, parfüm-şişesi, kristal, saat, premium-ambalaj
// Forbidden with: low-end-gpu (transmission pahalı — GPUGate fallback)
//
// MeshTransmissionMaterial: real-time dispersion + chromatic aberration + thickness.
// Elmas için ior=2.4, cam için ior=1.5. Beklenen framerate: mid-tier GPU'da 60fps.
//
// Canvas içinde çalışır. Geometry + envmap gerekli (Immersive3DCanvas içinde).

'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  MeshTransmissionMaterial,
  PresentationControls,
  ContactShadows,
  Environment,
} from '@react-three/drei';
import type { Mesh } from 'three';

export type TransmissionPreset = 'glass' | 'diamond' | 'crystal' | 'liquid';

export interface MeshTransmissionViewerProps {
  /** Hazır material preset (ior + thickness + chromatic tuned) */
  preset?: TransmissionPreset;
  /** Autospin */
  spin?: boolean;
  /** Geometry slot — override için */
  geometry?: React.ReactNode;
  /** Base color (refract tint) */
  color?: string;
  /** Environment preset (reflections) */
  envPreset?: 'city' | 'studio' | 'sunset' | 'warehouse' | 'park' | 'dawn' | 'night';
}

const PRESETS: Record<TransmissionPreset, {
  thickness: number;
  ior: number;
  chromaticAberration: number;
  roughness: number;
  backside: boolean;
  anisotropy: number;
}> = {
  glass: { thickness: 0.5, ior: 1.5, chromaticAberration: 0.03, roughness: 0.05, backside: false, anisotropy: 0.1 },
  diamond: { thickness: 0.3, ior: 2.4, chromaticAberration: 0.06, roughness: 0, backside: true, anisotropy: 0.2 },
  crystal: { thickness: 0.8, ior: 1.8, chromaticAberration: 0.04, roughness: 0.02, backside: true, anisotropy: 0.15 },
  liquid: { thickness: 1.2, ior: 1.33, chromaticAberration: 0.02, roughness: 0.1, backside: false, anisotropy: 0.3 },
};

export function MeshTransmissionViewer({
  preset = 'diamond',
  spin = true,
  geometry,
  color = '#ffffff',
  envPreset = 'studio',
}: MeshTransmissionViewerProps) {
  const p = PRESETS[preset];
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (spin && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
      meshRef.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <Environment preset={envPreset} />

      <PresentationControls
        global
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 2, Math.PI / 2]}
        snap
      >
        <mesh ref={meshRef} castShadow>
          {geometry ?? <icosahedronGeometry args={[1.5, 8]} />}
          <MeshTransmissionMaterial
            color={color}
            thickness={p.thickness}
            ior={p.ior}
            chromaticAberration={p.chromaticAberration}
            roughness={p.roughness}
            backside={p.backside}
            anisotropy={p.anisotropy}
            transmission={1}
            samples={10}
            resolution={512}
            distortion={0.25}
            distortionScale={0.3}
            temporalDistortion={0.1}
          />
        </mesh>
      </PresentationControls>

      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.5}
        scale={10}
        blur={2.4}
        far={4}
      />
    </>
  );
}
