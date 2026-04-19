import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "__PRESET_TITLE__ · Admin",
  description: "Tenant yonetim paneli",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-dvh bg-[var(--color-bg)] text-[var(--color-ink)] antialiased">
        {children}
      </body>
    </html>
  );
}
