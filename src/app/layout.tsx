import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zunau.io"),
  title: {
    default: "Zunau.io — Vibe Code SwiftUI Apps",
    template: "%s | Zunau.io",
  },
  description:
    "The AI-powered vibe coding platform for SwiftUI. Describe your iOS app in plain English and watch production-ready SwiftUI code appear instantly.",
  keywords: [
    "SwiftUI", "iOS development", "AI coding", "vibe coding", "Swift",
    "Xcode", "iOS app builder", "AI SwiftUI generator", "no-code iOS",
    "SwiftUI tutorial", "TCA architecture", "Supabase iOS",
  ],
  authors: [{ name: "Zunau.io", url: "https://zunau.io" }],
  creator: "Zunau.io",
  publisher: "Zunau.io",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Zunau.io — Vibe Code SwiftUI Apps",
    description: "The AI-powered platform for building SwiftUI iOS apps by describing your vision.",
    url: "https://zunau.io",
    siteName: "Zunau.io",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zunau.io — Vibe Code SwiftUI Apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zunau.io — Vibe Code SwiftUI Apps",
    description: "The AI-powered platform for building SwiftUI iOS apps by describing your vision.",
    creator: "@zunauio",
    site: "@zunauio",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
