/**
 * HeroQAConversational.tsx — HR12 Conversational Q&A
 *
 * COMBO: HR12 + TY16/TY20/TY33 (mono + humanist sans) + warm-organic pathway
 * Kaynak: templates/05-klinik/index.html:60-180 · mockups/q-a-onboarding.html:1-100
 * Uyumlu sektörler: klinik, onboarding, saas-signup, lead-gen, randevu
 * Forbidden with: mücevher, editorial, luxury-static
 *
 * Soru > seçenek > sonraki soru akışı. Progress dots. Pill-shaped CTA.
 * Form-state lokal (useState); API submit callback prop'ta.
 */

'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface QAStep {
  id: string;
  question: string;
  options: Array<{ label: string; value: string }>;
}

export interface HeroQAConversationalProps {
  eyebrow?: string;
  steps: QAStep[];
  onComplete?: (answers: Record<string, string>) => void;
  ctaFinalLabel?: string;
  className?: string;
}

export function HeroQAConversational({
  eyebrow = 'Randevu · 4 adımda',
  steps,
  onComplete,
  ctaFinalLabel = 'Sonucu gönder',
  className,
}: HeroQAConversationalProps): ReactNode {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const current = steps[i];
  const isLast = i === steps.length - 1;

  const pick = (value: string): void => {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    if (isLast) {
      onComplete?.(next);
    } else {
      setI(i + 1);
    }
  };

  return (
    <section
      className={cn(
        'relative flex min-h-[80vh] items-center justify-center',
        'px-6 py-20 lg:py-28 bg-surface text-ink',
        className,
      )}
    >
      <div className="w-full max-w-2xl">
        {/* Progress dots */}
        <div className="flex items-center gap-2 mb-12" aria-label={`Adım ${i + 1} / ${steps.length}`}>
          {steps.map((_, idx) => (
            <span
              key={idx}
              className={cn(
                'h-1.5 rounded-full transition-all duration-500',
                idx === i ? 'w-10 bg-accent' : idx < i ? 'w-6 bg-ink/40' : 'w-6 bg-ink/10',
              )}
            />
          ))}
        </div>

        {eyebrow ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
            {eyebrow} · Adım {String(i + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
          </p>
        ) : null}

        <div
          key={current.id}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <h1 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight mb-10">
            {current.question}
          </h1>

          <div className="flex flex-wrap gap-3">
            {current.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => pick(opt.value)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full',
                  'border border-line bg-surface',
                  'px-5 py-2.5 text-sm',
                  'hover:border-accent hover:bg-accent/10 transition-colors duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                )}
              >
                {opt.label}
                <span aria-hidden className="text-muted">→</span>
              </button>
            ))}
          </div>

          {isLast ? (
            <p className="mt-10 font-mono text-xs uppercase tracking-[0.22em] text-muted">
              Son adım · {ctaFinalLabel}
            </p>
          ) : null}

          {i > 0 ? (
            <button
              type="button"
              onClick={() => setI(i - 1)}
              className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-muted hover:text-ink transition-colors"
            >
              ← Geri dön
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
