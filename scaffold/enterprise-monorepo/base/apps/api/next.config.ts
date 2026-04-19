import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "standalone", // Docker / Fly.io deploy icin
  transpilePackages: [
    "@preset/db",
    "@preset/auth",
    "@preset/observability",
  ],
};

export default config;
