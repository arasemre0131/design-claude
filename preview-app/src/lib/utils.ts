// utils.ts — Tailwind class merger + shared helpers
//
// cn() — clsx + tailwind-merge karisimi. SSR-safe. Motion component'ler
// prefersReducedMotion() ile guard'lanir.

import { clsx, type ClassValue as ClsxClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ClassValue = ClsxClassValue;

/**
 * Tailwind class merger — clsx + tailwind-merge.
 * Kullanim: cn('px-4 py-2', isActive && 'bg-accent', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * prefers-reduced-motion check (SSR-safe).
 * Motion component'leri bu helper ile guard'lanmali.
 * Sadece ilk render anini kontrol eder — runtime degisimi icin useReducedMotion hook.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * SSR-safe window check — client-only kod guard'i.
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Turkce karakter destegi testi icin string normalize — CSS fallback kontrolu.
 * Kullanim: logger amacli, UI'da kullanma (locale-aware olmali).
 */
export function hasTurkishChars(text: string): boolean {
  return /[ığüşöçİĞÜŞÖÇı]/.test(text);
}

/**
 * Clamp — belirli min-max arasinda sayi tut.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Lerp — linear interpolation (Lenis + GSAP hesaplarinda).
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
