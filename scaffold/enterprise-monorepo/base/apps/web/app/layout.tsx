import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "__PRESET_TITLE__",
    template: "%s · __PRESET_TITLE__",
  },
  description: "__PRESET_DESCRIPTION__",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "__PRESET_TITLE__",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* __FONT_LINK_TAG__ */}
      </head>
      <body className="min-h-dvh antialiased">
        {children}
      </body>
    </html>
  );
}
