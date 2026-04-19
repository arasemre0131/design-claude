/**
 * ProductGrid — responsive grid layout, L4 Full-bleed rails varyasyonu.
 * ProductCard cocuklarini 4/3/2/1 breakpoint'lerinde esit daginim gosterir.
 */
export function ProductGrid({ children }: { children: React.ReactNode }) {
  return <div className="product-grid">{children}</div>;
}
