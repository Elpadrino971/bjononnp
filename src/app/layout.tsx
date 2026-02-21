import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Zunau.io — Vibe Code SwiftUI Apps",
    template: "%s | Zunau.io",
  },
  description:
    "The AI-powered vibe coding platform for SwiftUI. Describe your iOS app in plain English and watch production-ready SwiftUI code appear instantly.",
  keywords: [
    "SwiftUI", "iOS development", "AI coding", "vibe coding", "Swift",
    "Xcode", "iOS app builder", "AI SwiftUI generator", "no-code iOS",
  ],
  authors: [{ name: "Zunau.io" }],
  openGraph: {
    title: "Zunau.io — Vibe Code SwiftUI Apps",
    description: "The AI-powered platform for building SwiftUI iOS apps by describing your vision.",
    url: "https://zunau.io",
    siteName: "Zunau.io",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zunau.io — Vibe Code SwiftUI Apps",
    description: "The AI-powered platform for building SwiftUI iOS apps by describing your vision.",
    creator: "@zunauio",
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
