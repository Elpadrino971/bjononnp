import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Code2, Zap, ArrowRight, Search, Layers, Cpu, Globe, Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import CodeWindow from "@/components/ui/CodeWindow";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Learn how to use Zunau.io to build SwiftUI iOS apps. Guides, API reference, examples, and more.",
};

const QUICKSTART_CODE = `// 1. Install the Zunau Swift SDK via SPM
// Add to Package.swift:
// .package(url: "https://github.com/zunau/zunau-swift", from: "2.0.0")

import SwiftUI
import ZunauSDK

// 2. Initialize with your API key
@main
struct MyApp: App {
    init() {
        Zunau.configure(apiKey: "znau_your_api_key_here")
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

// 3. Use the AI generation API
struct ContentView: View {
    @StateObject private var zunau = ZunauClient()
    @State private var prompt = ""

    var body: some View {
        VStack {
            TextField("Describe your view...", text: $prompt)

            Button("Generate") {
                Task {
                    let code = try await zunau.generate(
                        prompt: prompt,
                        context: .swiftUI,
                        style: .modern
                    )
                    print(code.swiftSource)
                }
            }
        }
    }
}`;

const sections = [
  {
    category: "Getting Started",
    icon: Zap,
    color: "text-violet-400",
    items: [
      { title: "Quick Start Guide", desc: "Build your first SwiftUI app in 5 minutes", href: "/docs/quickstart", badge: "Recommended" },
      { title: "Installation", desc: "Install Zunau SDK for iOS and macOS", href: "/docs/installation", badge: null },
      { title: "Authentication", desc: "Set up your API keys and authentication", href: "/docs/auth", badge: null },
      { title: "Your First Generation", desc: "Generate your first SwiftUI view with AI", href: "/docs/first-generation", badge: null },
    ],
  },
  {
    category: "Core Concepts",
    icon: BookOpen,
    color: "text-blue-400",
    items: [
      { title: "Prompting Guide", desc: "Write effective prompts for better SwiftUI output", href: "/docs/prompting", badge: "Essential" },
      { title: "Project Structure", desc: "How Zunau organizes your SwiftUI projects", href: "/docs/project-structure", badge: null },
      { title: "Component Library", desc: "Using and extending the component library", href: "/docs/components", badge: null },
      { title: "Design Tokens", desc: "Manage colors, fonts, and spacing across your app", href: "/docs/design-tokens", badge: null },
    ],
  },
  {
    category: "API Reference",
    icon: Code2,
    color: "text-cyan-400",
    items: [
      { title: "REST API", desc: "Complete REST API reference with examples", href: "/docs/api/rest", badge: null },
      { title: "Swift SDK", desc: "Native Swift SDK for iOS and macOS", href: "/docs/api/swift", badge: null },
      { title: "Webhooks", desc: "Real-time notifications for generation events", href: "/docs/api/webhooks", badge: null },
      { title: "Rate Limits", desc: "Understanding and handling rate limits", href: "/docs/api/rate-limits", badge: null },
    ],
  },
  {
    category: "Frameworks",
    icon: Layers,
    color: "text-emerald-400",
    items: [
      { title: "SwiftUI Basics", desc: "Generating Views, modifiers, and layouts", href: "/docs/swiftui/basics", badge: null },
      { title: "SwiftData", desc: "Data modeling and persistence patterns", href: "/docs/swiftui/swiftdata", badge: "New" },
      { title: "Combine & async/await", desc: "Reactive patterns and Swift concurrency", href: "/docs/swiftui/async", badge: null },
      { title: "visionOS", desc: "Building spatial apps for Apple Vision Pro", href: "/docs/swiftui/visionos", badge: "New" },
    ],
  },
  {
    category: "Integrations",
    icon: Globe,
    color: "text-orange-400",
    items: [
      { title: "Xcode Integration", desc: "Use Zunau directly inside Xcode", href: "/docs/integrations/xcode", badge: null },
      { title: "GitHub Actions", desc: "CI/CD automation with Zunau", href: "/docs/integrations/github-actions", badge: null },
      { title: "Figma Plugin", desc: "Import designs directly from Figma", href: "/docs/integrations/figma", badge: null },
      { title: "Fastlane", desc: "Automate App Store submissions", href: "/docs/integrations/fastlane", badge: null },
    ],
  },
  {
    category: "Security & Privacy",
    icon: Shield,
    color: "text-pink-400",
    items: [
      { title: "Security Overview", desc: "How Zunau protects your code and data", href: "/docs/security/overview", badge: null },
      { title: "Data Handling", desc: "What data Zunau stores and for how long", href: "/docs/security/data", badge: null },
      { title: "SOC 2 Compliance", desc: "Enterprise compliance documentation", href: "/docs/security/soc2", badge: null },
      { title: "On-Premise Deployment", desc: "Self-hosted deployment for enterprises", href: "/docs/security/on-premise", badge: "Enterprise" },
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24">
        {/* Hero */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <Badge variant="blue" className="mb-4">
            <BookOpen size={13} />
            Documentation
          </Badge>
          <h1 className="text-5xl font-black text-white mb-4">
            Build with <span className="gradient-text">Zunau</span>
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            Everything you need to know about building SwiftUI apps with Zunau.
            From quick start to advanced integrations.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto">
            <div className="glass-card rounded-xl p-1 flex items-center gap-3">
              <div className="flex items-center gap-3 flex-1 px-3">
                <Search size={18} className="text-slate-500" />
                <input
                  type="text"
                  placeholder="Search docs..."
                  className="flex-1 bg-transparent text-slate-300 placeholder-slate-500 outline-none text-sm py-2"
                />
              </div>
              <div className="flex gap-1 mr-2">
                <kbd className="px-2 py-1 bg-white/10 text-slate-400 text-xs rounded border border-white/10">⌘</kbd>
                <kbd className="px-2 py-1 bg-white/10 text-slate-400 text-xs rounded border border-white/10">K</kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Quick start */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
          <div className="glass-card rounded-2xl p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <Badge variant="green" className="mb-3">
                  <Zap size={13} />
                  5-minute quickstart
                </Badge>
                <h2 className="text-2xl font-black text-white mb-3">
                  Get up and running fast
                </h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Install the Zunau Swift SDK, configure your API key, and make your
                  first AI generation call in under 5 minutes.
                </p>
                <div className="flex gap-3">
                  <Link href="/docs/quickstart">
                    <button className="btn-primary text-sm">
                      Full Quickstart Guide <ArrowRight size={14} />
                    </button>
                  </Link>
                  <Link href="/docs/api" className="btn-secondary text-sm">
                    API Reference
                  </Link>
                </div>
              </div>
              <CodeWindow
                title="quickstart.swift"
                code={QUICKSTART_CODE}
                showLineNumbers={false}
                className="max-h-[380px] overflow-y-auto scrollbar-thin"
              />
            </div>
          </div>
        </div>

        {/* Doc sections grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.category} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="feature-icon">
                      <Icon size={18} className={section.color} />
                    </div>
                    <h2 className="text-white font-bold text-base">{section.category}</h2>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-200 text-sm font-medium group-hover:text-white transition-colors">
                                {item.title}
                              </span>
                              {item.badge && (
                                <Badge
                                  variant={item.badge === "New" ? "green" : item.badge === "Enterprise" ? "orange" : "purple"}
                                  className="text-[9px] px-1.5 py-0.5"
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            <span className="text-slate-500 text-xs">{item.desc}</span>
                          </div>
                          <ArrowRight size={14} className="text-slate-600 group-hover:text-violet-400 transition-colors flex-shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Community */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
          <div className="glass-card rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-black text-white mb-3">
              Join the Zunau community
            </h2>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              Connect with 12,000+ iOS developers, share your apps, get help, and
              contribute to the community component library.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { label: "Discord Community", href: "/discord", icon: "💬", count: "8.2K members" },
                { label: "GitHub Discussions", href: "https://github.com/zunau", icon: "🐙", count: "2.1K topics" },
                { label: "Twitter / X", href: "https://twitter.com/zunauio", icon: "🐦", count: "15K followers" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 glass-card rounded-xl px-5 py-3 hover:border-violet-500/30 transition-all group"
                >
                  <span className="text-xl">{link.icon}</span>
                  <div className="text-left">
                    <p className="text-white text-sm font-medium group-hover:text-violet-300 transition-colors">{link.label}</p>
                    <p className="text-slate-500 text-xs">{link.count}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
