import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap, Eye, Code2, Layers, GitBranch, Smartphone,
  Cpu, Palette, Download, Shield, RefreshCw, Globe,
  ArrowRight, Check
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import CodeWindow from "@/components/ui/CodeWindow";
import PhoneFrame from "@/components/ui/PhoneFrame";

export const metadata: Metadata = {
  title: "Features",
  description: "Everything you need to build, preview, and ship SwiftUI iOS apps. Explore all Zunau.io features.",
};

const ANIMATION_CODE = `struct PulsingButton: View {
    @State private var isPulsing = false

    var body: some View {
        Button("Tap me!") {
            withAnimation(.spring(
                response: 0.3,
                dampingFraction: 0.6
            )) {
                isPulsing.toggle()
            }
        }
        .scaleEffect(isPulsing ? 0.95 : 1.0)
        .overlay(
            Circle()
                .stroke(Color.purple.opacity(
                    isPulsing ? 0 : 0.8
                ), lineWidth: 2)
                .scaleEffect(isPulsing ? 2 : 1)
                .opacity(isPulsing ? 0 : 1)
                .animation(.easeOut(duration: 0.6),
                    value: isPulsing)
        )
        .buttonStyle(.borderedProminent)
        .tint(.purple)
    }
}`;

const highlightedFeatures = [
  {
    id: "ai-generation",
    icon: Zap,
    title: "AI Code Generation",
    subtitle: "Powered by GPT-4o",
    description: "The most advanced SwiftUI AI on the market. Describe your component, screen, or entire app. Zunau generates clean, idiomatic SwiftUI code that compiles on the first try.",
    bullets: [
      "Understands Apple HIG guidelines automatically",
      "Generates MVVM architecture by default",
      "Handles async/await and Combine patterns",
      "Supports iOS 17+ and Swift 6 concurrency",
    ],
    badge: "Core Feature",
    badgeVariant: "purple" as const,
    visual: "prompt",
  },
  {
    id: "live-preview",
    icon: Eye,
    title: "Real-Time Live Preview",
    subtitle: "See changes instantly",
    description: "Our browser-based SwiftUI renderer shows your code changes in real-time — no Xcode required. Preview on any device frame with accurate pixel rendering.",
    bullets: [
      "iPhone, iPad, Apple Watch, Apple TV previews",
      "Light and dark mode switching",
      "Accessibility simulator built-in",
      "Share preview links with your team",
    ],
    badge: "Most Loved",
    badgeVariant: "blue" as const,
    visual: "phone",
  },
  {
    id: "animation-studio",
    icon: RefreshCw,
    title: "Animation Studio",
    subtitle: "Complex animations, zero effort",
    description: "Create stunning SwiftUI animations visually or by description. Spring physics, keyframe animations, matched geometry effects — all generated with a single prompt.",
    bullets: [
      "60fps spring & physics animations",
      "MatchedGeometryEffect transitions",
      "Lottie integration support",
      "Export as reusable ViewModifiers",
    ],
    badge: "Fan Favorite",
    badgeVariant: "cyan" as const,
    visual: "code",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
          <Badge variant="purple" className="mb-4">
            <Layers size={13} />
            Platform Features
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            The complete SwiftUI
            <br />
            <span className="gradient-text">development platform</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Every tool you need to go from zero to App Store. Built by iOS
            developers, for iOS developers.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">
                Start Free <Zap size={16} />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="secondary" size="lg">
                View Pricing <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 space-y-32">
          {highlightedFeatures.map((feature, i) => {
            const Icon = feature.icon;
            const isEven = i % 2 === 0;

            return (
              <div
                key={feature.id}
                id={feature.id}
                className={`flex flex-col lg:flex-row items-center gap-16 ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="feature-icon">
                      <Icon size={22} className="text-violet-400" />
                    </div>
                    <Badge variant={feature.badgeVariant}>{feature.badge}</Badge>
                  </div>

                  <div>
                    <p className="text-violet-400 text-sm font-mono mb-1">{feature.subtitle}</p>
                    <h2 className="text-4xl font-black text-white mb-4">{feature.title}</h2>
                    <p className="text-slate-400 leading-relaxed text-lg">{feature.description}</p>
                  </div>

                  <ul className="space-y-3">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                          <Check size={11} className="text-emerald-400" />
                        </div>
                        <span className="text-slate-300">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/signup">
                    <Button>
                      Try it free <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>

                {/* Visual */}
                <div className="flex-1">
                  {feature.visual === "prompt" && (
                    <div className="glass-card rounded-2xl p-6 space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs text-emerald-400 font-mono">AI Connected</span>
                      </div>
                      {[
                        { role: "user", text: "Create a SwiftUI onboarding flow with 3 pages, a gradient background, SF Symbols icons, and a page indicator" },
                        { role: "ai", text: "Generating your onboarding flow with TabView, PageTabViewStyle, and spring animations..." },
                      ].map((msg) => (
                        <div
                          key={msg.role}
                          className={`p-4 rounded-xl text-sm ${
                            msg.role === "user"
                              ? "bg-violet-500/15 border border-violet-500/20 text-slate-200"
                              : "bg-blue-500/10 border border-blue-500/20 text-slate-300"
                          }`}
                        >
                          <span className={`text-xs font-semibold block mb-1 ${msg.role === "user" ? "text-violet-400" : "text-blue-400"}`}>
                            {msg.role === "user" ? "You" : "Zunau AI"}
                          </span>
                          {msg.text}
                        </div>
                      ))}
                      <div className="flex gap-1.5">
                        {["Generating", "✦", "✦", "✦"].map((d, i) => (
                          <div
                            key={i}
                            className={`h-1.5 rounded-full bg-violet-500 animate-pulse ${i === 0 ? "flex-1" : "w-1.5"}`}
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {feature.visual === "phone" && (
                    <PhoneFrame>
                      <div className="h-full bg-[#f2f2f7] flex flex-col">
                        <div className="bg-white border-b border-gray-200 px-4 py-3">
                          <h3 className="font-bold text-gray-900 text-sm">Live Preview</h3>
                          <p className="text-xs text-gray-500">Rendering in real-time</p>
                        </div>
                        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-violet-50 to-blue-50">
                          <div className="text-center px-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 mx-auto mb-4 flex items-center justify-center shadow-lg">
                              <span className="text-2xl">⚡</span>
                            </div>
                            <h4 className="font-bold text-gray-900 text-base mb-1">Welcome to Zunau</h4>
                            <p className="text-gray-500 text-xs">Build faster with AI</p>
                          </div>
                        </div>
                        <div className="bg-white border-t border-gray-200 p-3 flex gap-2">
                          <div className="flex-1 bg-violet-500 text-white text-xs font-bold rounded-lg py-2 text-center">Get Started</div>
                          <div className="flex-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg py-2 text-center">Learn More</div>
                        </div>
                      </div>
                    </PhoneFrame>
                  )}

                  {feature.visual === "code" && (
                    <CodeWindow
                      title="PulsingButton.swift"
                      code={ANIMATION_CODE}
                      className="shadow-2xl shadow-violet-900/20"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature grid */}
        <div className="bg-[#08080f] border-y border-white/5 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-black text-white text-center mb-12">
              And much more...
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: Layers, title: "500+ Components", desc: "Pre-built, customizable SwiftUI components ready to use in your projects.", tag: "Library" },
                { icon: GitBranch, title: "Git Integration", desc: "Full Git support with GitHub, GitLab, and Bitbucket sync built in.", tag: "VCS" },
                { icon: Cpu, title: "SwiftData Models", desc: "Generate complete data models with SwiftData or CoreData automatically.", tag: "Data" },
                { icon: Palette, title: "Figma Sync", desc: "Import design tokens directly from Figma and apply them to your SwiftUI app.", tag: "Design" },
                { icon: Smartphone, title: "Multi-Platform", desc: "Target iOS, macOS, watchOS, tvOS, and visionOS from one codebase.", tag: "Platforms" },
                { icon: Shield, title: "SOC 2 Compliant", desc: "Enterprise-grade security with encryption, audit logs, and data residency.", tag: "Security" },
                { icon: Download, title: "One-Click Deploy", desc: "Deploy to TestFlight or App Store Connect without leaving Zunau.", tag: "Deploy" },
                { icon: Globe, title: "REST & GraphQL", desc: "Auto-generate networking layer from your API spec or OpenAPI schema.", tag: "API" },
                { icon: Code2, title: "Swift Package Manager", desc: "Manage dependencies with SPM, integrated directly into your workspace.", tag: "Build" },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-all hover:border-violet-500/30 group">
                    <div className="feature-icon mb-4 group-hover:scale-110 transition-transform">
                      <Icon size={20} className="text-violet-400" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold">{f.title}</h3>
                      <Badge variant="blue" className="text-[10px] px-2 py-0.5">{f.tag}</Badge>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Ready to vibe code?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join 12,000+ developers building iOS apps at the speed of thought.
          </p>
          <Link href="/signup">
            <Button size="lg">
              Start Building Free — No card required
              <Zap size={16} />
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
