import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Preview-app catalog/ dizinini filesystem-read etmek zorunda (server-side).
  // Monorepo'nun bir ustunde catalog var → outputFileTracingRoot ayari.
  outputFileTracingRoot: path.join(__dirname, ".."),

  experimental: {
    serverActions: { bodySizeLimit: "2mb" },
    reactCompiler: true,
  },

  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "fonts.gstatic.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
