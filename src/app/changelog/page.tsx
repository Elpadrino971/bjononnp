import type { Metadata } from "next";
import { CheckCircle, Zap, Wrench, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's new in Zunau.io — new features, improvements, and bug fixes.",
};

type ChangeKind = "feature" | "improvement" | "fix" | "breaking";

interface Change {
  kind: ChangeKind;
  text: string;
}

interface Release {
  version: string;
  date: string;
  label?: string;
  summary: string;
  changes: Change[];
}

const RELEASES: Release[] = [
  {
    version: "2.4.0",
    date: "Feb 18, 2026",
    label: "Latest",
    summary: "MCP v2 protocol with per-project module activation and Swift 6 strict concurrency support.",
    changes: [
      { kind: "feature", text: "MCP v2 — activate individual modules (Auth, Stripe, Analytics) per project from the dashboard" },
      { kind: "feature", text: "Swift 6 strict concurrency mode: all generated code is Sendable-safe" },
      { kind: "feature", text: "New Playground shortcut: ⌘↵ to regenerate, ⌘K to clear" },
      { kind: "improvement", text: "50% faster code generation via streamed responses" },
      { kind: "improvement", text: "Component library now has 520 items across 18 categories" },
      { kind: "fix", text: "Fixed rare crash when copying code in Safari" },
    ],
  },
  {
    version: "2.3.0",
    date: "Feb 3, 2026",
    summary: "Team plan launch with collaborative projects and shared component libraries.",
    changes: [
      { kind: "feature", text: "Team plan: shared projects, roles (Owner, Editor, Viewer), and team component library" },
      { kind: "feature", text: "Project templates: 12 starter apps (e-commerce, social, productivity, fintech)" },
      { kind: "improvement", text: "New onboarding flow with interactive first-project guide" },
      { kind: "improvement", text: "Dashboard redesign: activity feed and project health indicators" },
      { kind: "fix", text: "Resolved Stripe webhook duplicate event handling" },
      { kind: "fix", text: "Fixed token counter overflow on very large codebases" },
    ],
  },
  {
    version: "2.2.0",
    date: "Jan 15, 2026",
    summary: "Supabase MCP v2 with RLS policy generation and realtime support.",
    changes: [
      { kind: "feature", text: "Supabase MCP v2: automatic RLS policies, realtime subscriptions, and storage helpers" },
      { kind: "feature", text: "MCP Analytics module: Amplitude + PostHog integration" },
      { kind: "feature", text: "Xcode project export with correct folder structure and .xcodeproj" },
      { kind: "improvement", text: "SwiftUI preview accuracy improved — 95% first-try accuracy on standard layouts" },
      { kind: "fix", text: "Fixed @Observable macro not being recognized in older Xcode versions" },
    ],
  },
  {
    version: "2.1.0",
    date: "Dec 20, 2025",
    summary: "iOS 17 @Observable support and new PhoneFrame preview modes.",
    changes: [
      { kind: "feature", text: "Full iOS 17 @Observable macro support in generated code" },
      { kind: "feature", text: "PhoneFrame preview: dark mode, dynamic type, and RTL layout toggles" },
      { kind: "improvement", text: "Faster component search (< 50ms for 500+ items)" },
      { kind: "improvement", text: "Docs hub redesign with better search and copy-to-clipboard" },
      { kind: "fix", text: "Fixed sign-in redirect loop on Safari mobile" },
    ],
  },
  {
    version: "2.0.0",
    date: "Nov 30, 2025",
    label: "Major",
    summary: "Zunau 2.0 — Protocol Architecture, MCP system, and complete UI overhaul.",
    changes: [
      { kind: "feature", text: "Protocol Architecture v1: AI modifies within boundaries, it never owns the structure" },
      { kind: "feature", text: "MCP system launch with Auth and Stripe certified modules" },
      { kind: "feature", text: "TCA Base Protocol — pre-defined reducer zones with AI-safe annotations" },
      { kind: "breaking", text: "Projects created before v2.0 need to be migrated — see migration guide" },
      { kind: "improvement", text: "Complete UI overhaul: dark theme, glassmorphism, animated previews" },
    ],
  },
];

const KIND_CONFIG: Record<ChangeKind, { icon: typeof CheckCircle; color: string; label: string }> = {
  feature: { icon: Star, color: "text-violet-400", label: "New" },
  improvement: { icon: Zap, color: "text-blue-400", label: "Improved" },
  fix: { icon: Wrench, color: "text-green-400", label: "Fixed" },
  breaking: { icon: CheckCircle, color: "text-red-400", label: "Breaking" },
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      <main className="pt-32 pb-24 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="violet" className="mb-4">Changelog</Badge>
            <h1 className="text-5xl font-black text-white mb-4">
              What&apos;s new
            </h1>
            <p className="text-slate-400 text-lg">
              Every update, improvement, and fix — in one place.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-white/10 to-transparent" />

            <div className="space-y-12">
              {RELEASES.map((release) => (
                <div key={release.version} className="relative pl-12">
                  {/* Dot */}
                  <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                    <Zap size={12} className="text-white" />
                  </div>

                  {/* Version header */}
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-white font-black text-lg">v{release.version}</span>
                    {release.label && (
                      <Badge variant={release.label === "Latest" ? "violet" : release.label === "Major" ? "blue" : "slate"}>
                        {release.label}
                      </Badge>
                    )}
                    <span className="text-slate-500 text-sm">{release.date}</span>
                  </div>

                  <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                    {release.summary}
                  </p>

                  {/* Changes */}
                  <div className="space-y-2.5">
                    {release.changes.map((change, i) => {
                      const { icon: Icon, color, label } = KIND_CONFIG[change.kind];
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <Icon size={14} className={`${color} mt-0.5 shrink-0`} />
                          <span className="text-slate-300 text-sm leading-relaxed">
                            <span className={`${color} font-semibold text-xs uppercase tracking-wider mr-2`}>
                              {label}
                            </span>
                            {change.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscribe */}
          <div className="mt-16 glass-card rounded-2xl p-6 text-center border border-violet-500/20">
            <p className="text-slate-400 text-sm mb-4">
              Get notified when we ship new features.
            </p>
            <form className="flex gap-3 max-w-xs mx-auto">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 glass-card rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-500 text-sm outline-none focus:border-violet-500/60 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Notify me
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
