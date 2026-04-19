import { PRESET_ID, PRESET_RECIPE, PRESET_TIER } from "@/lib/constants";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl space-y-6 text-center">
        <div className="text-xs uppercase tracking-[0.3em] opacity-60">
          scaffold.js ile uretildi
        </div>

        <h1 className="text-5xl md:text-7xl font-display">
          {PRESET_ID}
        </h1>

        <p className="text-lg opacity-80 max-w-xl mx-auto text-balance">
          Bu placeholder sayfadir. Design-council cikisindan gelen combo.md
          dosyasini kontrol edin ve src/components/ altindaki atom componentlerini
          compose ederek asil sayfayi yazin.
        </p>

        <dl className="grid grid-cols-3 gap-4 text-sm pt-8 border-t border-[var(--color-border)]">
          <div>
            <dt className="opacity-60 uppercase tracking-wider text-xs">Preset</dt>
            <dd className="mt-1 font-mono">{PRESET_ID}</dd>
          </div>
          <div>
            <dt className="opacity-60 uppercase tracking-wider text-xs">Recipe</dt>
            <dd className="mt-1 font-mono">{PRESET_RECIPE}</dd>
          </div>
          <div>
            <dt className="opacity-60 uppercase tracking-wider text-xs">Tier</dt>
            <dd className="mt-1 font-mono">{PRESET_TIER}</dd>
          </div>
        </dl>

        <div className="pt-8 text-xs opacity-50">
          Sonraki adim: <code className="font-mono bg-[var(--color-surface)] px-2 py-1 rounded">cat combo.md</code>
        </div>
      </div>
    </main>
  );
}
