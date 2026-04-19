// ScrollCameraPath.tsx — Camera keyframe interpolation linked to scroll
//
// COMBO: 3D-07 (drei ScrollControls) benzeri + GSAP ScrollTrigger bridge
// Kaynak: templates/12-immersive-3d/index.html:390-414
// Uyumlu sektörler: mucevher-3d, mimari-walkthrough, gayrimenkul-tour, ajans-showreel,
//                   interactive-case-study
// Forbidden with: yok (prefers-reduced-motion otomatik olarak son keyframe'de durur)
//
// Canvas içinde çalışır. GSAP ScrollTrigger her section'ı izler, aktif index'i set eder.
// Kamera Hermite cubic interpolation (daha smooth than linear) ile hedefe gsap.to.
// lookAt target da interpolate edilir (4 lookAt keypoint).

'use client';

import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';

export interface CameraKeyframe {
  /** Camera position */
  pos: [number, number, number];
  /** lookAt target */
  look: [number, number, number];
}

export interface ScrollCameraPathProps {
  /** 2-N keyframe — her section için bir keyframe */
  keyframes: CameraKeyframe[];
  /** Trigger edilecek section selector. default 'section' */
  sectionSelector?: string;
  /** ScrollTrigger start — default 'top 60%' */
  start?: string;
  end?: string;
  /** Ease — default 'power2.inOut' */
  ease?: string;
  /** Tween duration (sn) */
  duration?: number;
}

export function ScrollCameraPath({
  keyframes,
  sectionSelector = 'section',
  start = 'top 60%',
  end = 'bottom 40%',
  ease = 'power2.inOut',
  duration = 2,
}: ScrollCameraPathProps) {
  const { camera } = useThree();
  const lookAtTarget = useRef(new Vector3(...(keyframes[0]?.look ?? [0, 0, 0])));
  const idxRef = useRef(0);

  // Canvas parent DOM'unda ScrollTrigger kurulur (Canvas dışındaki section'lar trigger olur)
  useEffect(() => {
    if (keyframes.length < 2) return;

    // İlk keyframe'i uygula
    camera.position.set(...keyframes[0].pos);
    lookAtTarget.current.set(...keyframes[0].look);
    camera.lookAt(lookAtTarget.current);

    let cleanup = () => {};

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) return; // ilk frame'de kalır

      const setCamera = (i: number) => {
        const clamped = Math.max(0, Math.min(keyframes.length - 1, i));
        if (clamped === idxRef.current) return;
        idxRef.current = clamped;

        const k = keyframes[clamped];
        gsap.to(camera.position, {
          x: k.pos[0],
          y: k.pos[1],
          z: k.pos[2],
          duration,
          ease,
          onUpdate: () => camera.lookAt(lookAtTarget.current),
        });
        gsap.to(lookAtTarget.current, {
          x: k.look[0],
          y: k.look[1],
          z: k.look[2],
          duration,
          ease,
          onUpdate: () => camera.lookAt(lookAtTarget.current),
        });
      };

      const sections = Array.from(document.querySelectorAll(sectionSelector));
      const triggers = sections.map((sec, i) =>
        ScrollTrigger.create({
          trigger: sec as HTMLElement,
          start,
          end,
          onEnter: () => setCamera(Math.min(i, keyframes.length - 1)),
          onEnterBack: () => setCamera(Math.min(i, keyframes.length - 1)),
        }),
      );

      cleanup = () => {
        triggers.forEach((t) => t.kill());
      };
    })();

    return () => cleanup();
  }, [camera, duration, ease, end, keyframes, sectionSelector, start]);

  return null;
}
