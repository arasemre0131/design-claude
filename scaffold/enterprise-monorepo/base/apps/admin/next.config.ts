import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    ppr: "incremental",
    reactCompiler: true,
    typedRoutes: true,
  },
  transpilePackages: [
    "@preset/ui",
    "@preset/db",
    "@preset/auth",
    "@preset/observability",
  ],
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        // Admin panel iframe blocked (tam koruma)
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin" },
        { key: "X-Robots-Tag", value: "noindex, nofollow" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
  ],
};

export default config;
