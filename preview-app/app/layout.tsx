import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "design-claude preview",
  description: "60+ preset canli render + karsilastirma + gallery",
};

// Preview-app TUM fontlari yukler — her preset kendi setini tokenlarla kullanir.
// Preconnect + display=swap = minimal FOIT.
const ALL_FONTS_URL =
  "https://fonts.googleapis.com/css2?" +
  [
    "family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..700",
    "family=IBM+Plex+Sans:wght@300..700",
    "family=IBM+Plex+Serif:ital,wght@0,300..700;1,400",
    "family=IBM+Plex+Mono:wght@400;500",
    "family=Inter:wght@300..700",
    "family=Inter+Tight:wght@300..700",
    "family=Instrument+Serif:ital@0;1",
    "family=Playfair+Display:ital,wght@0,400..700;1,400..700",
    "family=Unbounded:wght@400..700",
    "family=Bricolage+Grotesque:wght@300..700",
    "family=Manrope:wght@300..700",
    "family=Schibsted+Grotesk:wght@400..700",
    "family=Archivo+Black",
    "family=Archivo:wght@400..700",
    "family=Space+Grotesk:wght@300..700",
    "family=JetBrains+Mono:wght@400;500",
    "family=Cormorant:ital,wght@0,300..700;1,400",
    "family=Cormorant+Garamond:ital,wght@0,300..700;1,400",
    "family=DM+Sans:wght@300..700",
    "family=DM+Serif+Display:ital@0;1",
    "family=Stardos+Stencil:wght@400;700",
    "family=Bodoni+Moda:ital,wght@0,400..900;1,400..700",
    "family=Tenor+Sans",
    "family=Syne:wght@400..800",
    "family=PP+Neue+Montreal&display=swap",
  ].join("&");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={ALL_FONTS_URL} />
      </head>
      <body>{children}</body>
    </html>
  );
}
