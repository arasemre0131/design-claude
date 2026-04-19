import { Link } from "@remix-run/react";

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  backgroundImage?: string;
}

/**
 * Hero — preset'e gore HR4 3D canvas veya HR1 editorial gorsel hero.
 * Default: editorial yasli hero (minimal + typography-driven).
 * HR4 icin: `<Canvas>` wrap et ve `Immersive3DCanvas` componentini yerlestir.
 */
export function Hero({ title, subtitle, ctaPrimary, ctaSecondary, backgroundImage }: HeroProps) {
  return (
    <section
      className="relative flex min-h-[90vh] items-center overflow-hidden"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
      )}

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-8">
          <p className="text-xs uppercase tracking-[0.3em] opacity-60">
            Koleksiyon 2026
          </p>
          <h1 className="text-6xl font-display md:text-8xl lg:text-9xl leading-[0.95] text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-xl text-xl opacity-80 text-pretty">
              {subtitle}
            </p>
          )}
          {(ctaPrimary || ctaSecondary) && (
            <div className="flex flex-wrap gap-4 pt-4">
              {ctaPrimary && (
                <Link
                  to={ctaPrimary.href}
                  className="inline-block border-2 border-current bg-[var(--color-ink)] text-[var(--color-bg)] px-8 py-4 text-sm uppercase tracking-wider hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                >
                  {ctaPrimary.label}
                </Link>
              )}
              {ctaSecondary && (
                <Link
                  to={ctaSecondary.href}
                  className="inline-block border-2 border-current px-8 py-4 text-sm uppercase tracking-wider hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] hover:border-[var(--color-accent)] transition-colors"
                >
                  {ctaSecondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
