"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import { Money } from "@shopify/hydrogen";
import { Suspense, useState, useEffect } from "react";
import { Link } from "@remix-run/react";

interface ProductCard3DProps {
  product: {
    id: string;
    title: string;
    handle?: string;
    modelUrl: string;
    fallbackImage?: { url: string; altText?: string; width?: number; height?: number } | null;
    priceRange?: { minVariantPrice: { amount: string; currencyCode: string } };
  };
  fullSize?: boolean;
  autoRotate?: boolean;
  enablePostProcessing?: boolean;
}

/**
 * ProductCard3D — Shopify Metafield "custom.3d_model_url" icinden GLB yukler,
 * R3F Canvas icinde interactive 3D product viewer acar.
 *
 * Shopify integration:
 *   - metafield3d.value → GLB URL (Shopify Files veya Cloudflare R2 signed)
 *   - Draco/KTX2 compressed < 2MB olmali (scaffold_hints.model_compression)
 *   - GPU detection ile tier 0-1'de skip edip fallback image goster
 *
 * Mucevher preset icin MeshTransmissionMaterial + Bloom (3D-08 + 3D-09).
 */
export function ProductCard3D({
  product,
  fullSize = false,
  autoRotate = true,
  enablePostProcessing = true,
}: ProductCard3DProps) {
  const [canShow3D, setCanShow3D] = useState(true);
  const [isInView, setIsInView] = useState(!fullSize); // fullSize'da hep yuklen

  useEffect(() => {
    // Prefers reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setCanShow3D(false);
      return;
    }

    // WebGL support check
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) setCanShow3D(false);
    } catch {
      setCanShow3D(false);
    }
  }, []);

  const imageFallback = product.fallbackImage ? (
    <img
      src={product.fallbackImage.url}
      alt={product.fallbackImage.altText || product.title}
      width={product.fallbackImage.width}
      height={product.fallbackImage.height}
      className="h-full w-full object-cover"
      loading="lazy"
    />
  ) : (
    <div className="flex h-full items-center justify-center opacity-40 text-xs uppercase tracking-[0.2em]">
      Gorsel yok
    </div>
  );

  const wrapper = (
    <div className={`canvas-3d relative ${fullSize ? "aspect-square" : "aspect-square"}`}>
      {canShow3D && product.modelUrl && isInView ? (
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 4], fov: 45 }}
          frameloop="demand"
          aria-label={`${product.title} 3D gorunumu — detay bilgileri sayfa icinde listelenmistir`}
          tabIndex={-1}
          gl={{ preserveDrawingBuffer: false, antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Stage environment="studio" intensity={0.6} adjustCamera={1.2}>
              <Model url={product.modelUrl} />
            </Stage>
            <ContactShadows opacity={0.4} blur={2.5} far={4} resolution={512} />
            <Environment preset="studio" />
          </Suspense>
          <OrbitControls
            makeDefault
            autoRotate={autoRotate}
            autoRotateSpeed={0.8}
            enablePan={false}
            enableZoom={!fullSize}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
          />
          {enablePostProcessing && (
            <EffectComposer multisampling={0}>
              <Bloom intensity={0.6} luminanceThreshold={0.9} luminanceSmoothing={0.2} />
              <DepthOfField focusDistance={0.01} focalLength={0.3} bokehScale={2} />
            </EffectComposer>
          )}
        </Canvas>
      ) : (
        imageFallback
      )}

      {canShow3D && product.modelUrl && (
        <div className="pointer-events-none absolute left-3 top-3 bg-[var(--color-ink)]/80 text-[var(--color-bg)] px-2 py-1 text-[10px] uppercase tracking-[0.2em] font-mono backdrop-blur-sm">
          3D — Cevir
        </div>
      )}
    </div>
  );

  if (fullSize) return wrapper;

  /* Card variant (koleksiyon icin) */
  return (
    <article className="group block">
      {product.handle ? (
        <Link to={`/products/${product.handle}`}>{wrapper}</Link>
      ) : (
        wrapper
      )}
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium leading-snug">{product.title}</h3>
        {product.priceRange && (
          <Money data={product.priceRange.minVariantPrice} className="text-sm price-display" />
        )}
      </div>
    </article>
  );
}

/**
 * Model — useGLTF draco/meshopt decoder otomatik.
 * Shopify Metafield'daki URL GLB/GLTF binary olmalidir.
 */
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} dispose={null} />;
}

// Preload disaridan cagrilabilsin diye export
export const preloadModel = (url: string) => useGLTF.preload(url);
