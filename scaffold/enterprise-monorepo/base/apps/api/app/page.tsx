/**
 * apps/api — Minimal landing (API olduguna dair isaret)
 */
export default function ApiRoot() {
  return (
    <pre style={{ padding: 24, fontFamily: "monospace" }}>
      {JSON.stringify(
        {
          service: "@preset/api",
          version: "0.1.0",
          status: "ok",
          docs: "/api/health",
        },
        null,
        2,
      )}
    </pre>
  );
}
