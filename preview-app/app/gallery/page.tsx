import { loadAllPresets, type Preset } from "@/lib/preset-loader";
import PresetCard from "@/components/Gallery/PresetCard";

export const dynamic = "force-dynamic";

type SearchParams = {
  sector?: string;
  style?: string;
  tier?: string;
};

export default async function GalleryPage(props: { searchParams: Promise<SearchParams> }) {
  const params = await props.searchParams;
  const presets = loadAllPresets();

  const sectors = uniqueSorted(presets.map((p) => p.sector));
  const styles = uniqueSorted(presets.map((p) => p.style));
  const tiers = uniqueSorted(presets.map((p) => String(p.tier)));

  const filtered = presets.filter((p) => {
    if (params.sector && p.sector !== params.sector) return false;
    if (params.style && p.style !== params.style) return false;
    if (params.tier && String(p.tier) !== params.tier) return false;
    return true;
  });

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-[var(--color-canvas)] backdrop-blur" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] opacity-60">design-claude</div>
            <h1 className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              Preset Gallery
            </h1>
          </div>
          <div className="flex items-center gap-6 text-sm font-mono">
            <a href="/compare" className="hover:underline">compare</a>
            <span className="opacity-50">{filtered.length} / {presets.length}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-6 pb-4 flex flex-wrap gap-4 text-sm">
          <Filter
            label="sector"
            current={params.sector}
            options={sectors}
            basePath="/gallery"
            paramKey="sector"
            otherParams={{ style: params.style, tier: params.tier }}
          />
          <Filter
            label="style"
            current={params.style}
            options={styles}
            basePath="/gallery"
            paramKey="style"
            otherParams={{ sector: params.sector, tier: params.tier }}
          />
          <Filter
            label="tier"
            current={params.tier}
            options={tiers}
            basePath="/gallery"
            paramKey="tier"
            otherParams={{ sector: params.sector, style: params.style }}
          />
        </div>
      </header>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20 opacity-60">
            <p>Filtrelerle eslesen preset yok.</p>
            <a href="/gallery" className="underline mt-2 inline-block">filtreleri temizle</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <PresetCard key={p.id} preset={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

/* ---------- helpers ---------- */

function Filter({
  label,
  current,
  options,
  basePath,
  paramKey,
  otherParams,
}: {
  label: string;
  current?: string;
  options: string[];
  basePath: string;
  paramKey: string;
  otherParams: Record<string, string | undefined>;
}) {
  const buildHref = (val?: string) => {
    const params = new URLSearchParams();
    Object.entries(otherParams).forEach(([k, v]) => v && params.set(k, v));
    if (val) params.set(paramKey, val);
    const qs = params.toString();
    return `${basePath}${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs opacity-60 uppercase tracking-wider">{label}:</span>
      <div className="flex flex-wrap gap-1">
        <a
          href={buildHref(undefined)}
          className={`px-2 py-0.5 rounded-sm text-xs border ${!current ? "bg-black text-white" : "hover:bg-black/5"}`}
          style={{ borderColor: "var(--color-border)" }}
        >
          all
        </a>
        {options.map((o) => (
          <a
            key={o}
            href={buildHref(o)}
            className={`px-2 py-0.5 rounded-sm text-xs border ${current === o ? "bg-black text-white" : "hover:bg-black/5"}`}
            style={{ borderColor: "var(--color-border)" }}
          >
            {o}
          </a>
        ))}
      </div>
    </div>
  );
}

function uniqueSorted<T>(arr: T[]): T[] {
  return Array.from(new Set(arr)).sort();
}
