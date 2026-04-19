/**
 * Hydrogen 2024.10+ Remix config (Oxygen-targeted).
 * Vite destekli Hydrogen surumunde remix.config.js optional — buradaki ayarlar
 * fallback icin bulundurulmustur. Asil konfigurasyon app/root.tsx + server.ts icinde.
 * @type {import('@remix-run/dev').AppConfig}
 */
export default {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "dist/server/index.js",
  serverConditions: ["workerd", "worker", "browser"],
  serverDependenciesToBundle: "all",
  serverMainFields: ["browser", "module", "main"],
  serverMinify: true,
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  ignoredRouteFiles: ["**/.*"],
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
    v3_routeConfig: true,
    v3_singleFetch: true,
    v3_lazyRouteDiscovery: true,
  },
};
