import SplitView from "@/components/Compare/SplitView";
import { listPresets } from "@/lib/preset-loader";

type SearchParams = {
  a?: string;
  b?: string;
};

export default async function ComparePage(props: { searchParams: Promise<SearchParams> }) {
  const { a, b } = await props.searchParams;

  if (!a || !b) {
    const presets = listPresets().slice(0, 12);
    return (
      <main className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl mb-4">Compare</h1>
        <p className="text-sm opacity-70 mb-6">
          URL query: <code className="font-mono bg-black/5 px-2 py-1 rounded">?a=&lt;preset&gt;&amp;b=&lt;preset&gt;</code>
        </p>
        <div className="space-y-2">
          <p className="text-sm font-mono opacity-60">Hizli ornekler:</p>
          <ul className="space-y-1 text-sm">
            {[
              ["mucevher-editorial-luxury", "eticaret-brutalist"],
              ["mucevher-editorial-luxury", "mucevher-minimal-swiss"],
              ["insaat-industrial-workwear", "insaat-minimal-swiss"],
              ["klinik-warm-organic", "klinik-minimal-swiss"],
              ["eticaret-minimal-swiss", "eticaret-data-dense-dashboard"],
            ].map(([x, y]) => (
              <li key={`${x}-${y}`}>
                <a href={`/compare?a=${x}&b=${y}`} className="underline text-blue-600">
                  {x} vs {y}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs opacity-50">Tum preset'ler ({presets.length}+): /gallery</p>
        </div>
      </main>
    );
  }

  return <SplitView left={a} right={b} />;
}
