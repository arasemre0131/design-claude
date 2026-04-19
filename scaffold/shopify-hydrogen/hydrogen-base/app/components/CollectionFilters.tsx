import { Link, useSearchParams } from "@remix-run/react";

interface CollectionFiltersProps {
  filters: Array<{
    id: string;
    label: string;
    type: string;
    values: Array<{ id: string; label: string; count: number; input: string }>;
  }>;
  searchParams: URLSearchParams;
}

/**
 * CollectionFilters — Storefront API Product Filter sistemini render eder.
 * Price range + availability + option/variant filter desteklenir.
 */
export function CollectionFilters({ filters, searchParams }: CollectionFiltersProps) {
  if (!filters || filters.length === 0) return null;

  return (
    <aside className="space-y-8">
      <header>
        <h2 className="text-xs uppercase tracking-[0.3em] opacity-60">Filtre</h2>
      </header>
      {filters.map((filter) => (
        <div key={filter.id} className="space-y-3">
          <h3 className="text-sm font-medium uppercase tracking-wider">{filter.label}</h3>
          <ul className="space-y-2 text-sm">
            {filter.values.slice(0, 10).map((value) => {
              const params = new URLSearchParams(searchParams);
              const paramKey = `filter.${filter.id}`;
              const existing = params.getAll(paramKey);
              const isActive = existing.includes(value.input);

              if (isActive) {
                params.delete(paramKey);
                existing.filter((v) => v !== value.input).forEach((v) => params.append(paramKey, v));
              } else {
                params.append(paramKey, value.input);
              }

              return (
                <li key={value.id}>
                  <Link
                    to={`?${params.toString()}`}
                    className={`flex items-center justify-between hover:opacity-100 ${isActive ? "opacity-100 font-medium" : "opacity-70"}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`inline-block w-3 h-3 border border-current ${isActive ? "bg-current" : ""}`} />
                      {value.label}
                    </span>
                    <span className="text-xs opacity-60 tabular-nums">({value.count})</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
