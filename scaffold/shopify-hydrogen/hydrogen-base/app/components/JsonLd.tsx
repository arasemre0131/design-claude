/**
 * JsonLd — schema.org structured data inject eder.
 * Shopify Hydrogen seo helper'a ek olarak custom Product/3DModel schema icin.
 */
export function JsonLd({ schema }: { schema: Record<string, any> | Array<Record<string, any>> }) {
  const json = JSON.stringify(schema);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
