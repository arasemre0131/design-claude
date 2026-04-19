// WizardSteps.tsx — F3 Wizard Steps (progress bar + back/next)
//
// COMBO: F3 + MO4 (smooth step transition)
// Kaynak: catalog/atoms/form/F3.yaml · templates/06-eticaret/checkout.html
// Uyumlu sektörler: onboarding, checkout, registration, multi-step form
// Forbidden with: simple-contact (tek-ekran form yeterli)
//
// Controlled/uncontrolled hybrid wizard. Numbered circles + progress bar
// karışık — yukarıda step indicator, altında aktif step body, en altta
// back/next butonları. Keyboard accessible.

'use client';

import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

export interface WizardStep {
  id: string;
  label: string;
  description?: string;
  content: ReactNode;
  /** Submit öncesi validate edebilir. false dönerse ileri gidemez */
  validate?: () => boolean | Promise<boolean>;
}

export interface WizardStepsProps {
  steps: WizardStep[];
  /** Controlled active index (opsiyonel) */
  activeIndex?: number;
  onChange?: (index: number) => void;
  onComplete?: () => void;
  /** Indicator stili. numbered-circles (default) veya linear-bar */
  indicator?: 'numbered-circles' | 'linear-bar';
  className?: string;
}

export function WizardSteps({
  steps,
  activeIndex,
  onChange,
  onComplete,
  indicator = 'numbered-circles',
  className,
}: WizardStepsProps) {
  const [internalIdx, setInternalIdx] = useState(0);
  const idx = activeIndex ?? internalIdx;

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(steps.length - 1, next));
      if (activeIndex == null) setInternalIdx(clamped);
      onChange?.(clamped);
    },
    [activeIndex, onChange, steps.length],
  );

  const handleNext = useCallback(async () => {
    const current = steps[idx];
    if (current.validate) {
      const ok = await current.validate();
      if (!ok) return;
    }
    if (idx === steps.length - 1) {
      onComplete?.();
      return;
    }
    goTo(idx + 1);
  }, [goTo, idx, onComplete, steps]);

  const progressPct = useMemo(
    () => ((idx + 1) / steps.length) * 100,
    [idx, steps.length],
  );

  const isFirst = idx === 0;
  const isLast = idx === steps.length - 1;

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      {/* Indicator */}
      {indicator === 'numbered-circles' ? (
        <ol className="flex items-center gap-2">
          {steps.map((step, i) => {
            const done = i < idx;
            const active = i === idx;
            return (
              <li key={step.id} className="flex items-center gap-2 flex-1 last:flex-none">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium transition-colors',
                      done && 'border-emerald-500 bg-emerald-500 text-black',
                      active && 'border-neutral-100 bg-neutral-100 text-black',
                      !done && !active && 'border-neutral-700 text-neutral-500',
                    )}
                    aria-current={active ? 'step' : undefined}
                  >
                    {done ? <Check size={16} /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      'hidden sm:block text-sm',
                      active ? 'text-neutral-100 font-medium' : 'text-neutral-500',
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 ? (
                  <span
                    className={cn('h-px flex-1 transition-colors', done ? 'bg-emerald-500' : 'bg-neutral-800')}
                    aria-hidden
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-neutral-400">
            <span>
              Adım {idx + 1} / {steps.length}
            </span>
            <span>{steps[idx].label}</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-800">
            <div
              className="h-full bg-neutral-100 transition-[width] duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="min-h-[200px]">
        {steps[idx].description ? (
          <p className="mb-4 text-sm text-neutral-400">{steps[idx].description}</p>
        ) : null}
        {steps[idx].content}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3 border-t border-neutral-800 pt-5">
        <button
          type="button"
          onClick={() => goTo(idx - 1)}
          disabled={isFirst}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border border-neutral-700 px-5 py-2 text-sm',
            'transition-colors hover:border-neutral-500',
            'disabled:opacity-40 disabled:cursor-not-allowed',
          )}
        >
          <ChevronLeft size={16} /> Geri
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-6 py-2 text-sm font-medium text-black hover:bg-white"
        >
          {isLast ? 'Tamamla' : 'İleri'}
          {!isLast ? <ChevronRight size={16} /> : null}
        </button>
      </div>
    </div>
  );
}
