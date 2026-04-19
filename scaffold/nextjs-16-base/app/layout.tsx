import type { Metadata } from "next";
import "./globals.css";

/**
 * Preset fontlari link rel="stylesheet" olarak <head>'e enjekte edilir.
 * Google Fonts URL: __FONT_GOOGLE_URL__
 * scaffold.js bu URL'yi preset YAML'dan typography atom'u okuyarak uretir.
 */

export const metadata: Metadata = {
  title: {
    default: "__PRESET_TITLE__",
    template: "%s · __PRESET_TITLE__",
  },
  description: "__PRESET_DESCRIPTION__",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "__PRESET_TITLE__",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* __FONT_LINK_TAG__ */}
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
