import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // React 19 + Turbopack features
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
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "*.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(self)",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ],
    },
  ],
  // Sentry source maps
  webpack: (cfg) => {
    cfg.resolve.fallback = { ...cfg.resolve.fallback, fs: false };
    return cfg;
  },
};

export default config;
