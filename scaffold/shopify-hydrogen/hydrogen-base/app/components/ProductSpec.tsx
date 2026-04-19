import { parseMetafield } from "~/lib/shopify.server";

interface ProductSpecProps {
  metafield?: { value: string } | null;
}

/**
 * ProductSpec — T3 spec sheet atom.
 * Metafield JSON array'i [{label, value}] formatinda, editorial tablo render eder.
 * Mucevher sektor icin: ayar, karat, tas bilgisi, agirlik, sertifika numarasi.
 */
export function ProductSpec({ metafield }: ProductSpecProps) {
  if (!metafield?.value) return null;

  let specs: Array<{ label: string; value: string }> = [];
  try {
    const parsed = JSON.parse(metafield.value);
    if (Array.isArray(parsed)) {
      specs = parsed;
    } else if (typeof parsed === "object") {
      specs = Object.entries(parsed).map(([label, value]) => ({ label, value: String(value) }));
    }
  } catch {
    return null;
  }

  if (specs.length === 0) return null;

  return (
    <section className="border-t border-[var(--color-border)] pt-6">
      <h2 className="text-xs uppercase tracking-[0.3em] opacity-60 mb-4">
        Teknik Ozellikler
      </h2>
      <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-sm">
        {specs.map((spec, i) => (
          <div key={i} className="contents">
            <dt className="opacity-60 uppercase tracking-wider text-xs font-mono">
              {spec.label}
            </dt>
            <dd className="font-medium">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
