// CanvasTrail.tsx — Canvas2D pointermove trail, particle fade-via-life
//
// COMBO: ultra-canvas-trail (14-ultra)
// Kaynak: catalog/atoms/motion-ajans/ultra-canvas-trail.yaml
//         templates/14-ultra/index.html:548-570
// Uyumlu sektörler: kinetic, maximalist, agency, brand-campaign, interactive-portfolio
// Forbidden with: mobile-coarse-pointer (pointer: fine guard ile zaten atlıyor)
//                 prefers-reduced-motion (guard ile atlıyor)
//
// Global fixed canvas. Her pointermove'da { x, y, life:1 } push. RAF loop
// life -= 0.025, fillStyle rgba(r,g,b, life*alphaMul). Arka plana da rgba(dark, 0.1)
// ile "motion blur trail" yaratıyor — 14-ultra'daki tam pattern.

'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface CanvasTrailProps {
  /** Trail particle rengi (rgb) */
  color?: { r: number; g: number; b: number };
  /** Arka plan kararma rengi (rgb) — trail'in fade-out için */
  fadeBg?: { r: number; g: number; b: number; a: number };
  /** Particle max radius (px) */
  radius?: number;
  /** Life decrement per frame (daha büyük = kısa iz) */
  lifeDecay?: number;
  /** Alpha multiplier (0-1) */
  alphaMul?: number;
  /** z-index */
  zIndex?: number;
  /** Performance: canvas çözünürlük çarpanı (dpr cap) */
  dprCap?: number;
  className?: string;
}

export function CanvasTrail({
  color = { r: 232, g: 90, b: 44 },
  fadeBg = { r: 13, g: 14, b: 20, a: 0.1 },
  radius = 10,
  lifeDecay = 0.025,
  alphaMul = 0.35,
  zIndex = 97,
  dprCap = 2,
  className,
}: CanvasTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Guardlar: coarse-pointer (touch) ve reduced-motion → render atla
    if (!matchMedia('(pointer: fine)').matches) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio ?? 1, dprCap);
    const size = () => {
      dpr = Math.min(window.devicePixelRatio ?? 1, dprCap);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    size();

    type Pt = { x: number; y: number; life: number };
    const pts: Pt[] = [];

    const onMove = (e: PointerEvent) => {
      pts.push({ x: e.clientX, y: e.clientY, life: 1 });
      // Cap array size — infinite growth prevent
      if (pts.length > 600) pts.splice(0, pts.length - 600);
    };

    let rafId = 0;
    const loop = () => {
      ctx.fillStyle = `rgba(${fadeBg.r}, ${fadeBg.g}, ${fadeBg.b}, ${fadeBg.a})`;
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        p.life -= lifeDecay;
        if (p.life <= 0) {
          pts.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${p.life * alphaMul})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', size);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', size);
    };
  }, [alphaMul, color.b, color.g, color.r, dprCap, fadeBg.a, fadeBg.b, fadeBg.g, fadeBg.r, lifeDecay, radius]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn('pointer-events-none fixed inset-0', className)}
      style={{ zIndex, mixBlendMode: 'screen' }}
    />
  );
}
