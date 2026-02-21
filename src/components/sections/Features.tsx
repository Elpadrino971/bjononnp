"use client";
import { useRef } from "react";
import {
  Zap, Eye, Code2, Layers, GitBranch, Smartphone,
  Cpu, Palette, Download, Shield, RefreshCw, Globe
} from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const features = [
  {
    icon: Zap,
    title: "AI-Powered Generation",
    description:
      "Describe your SwiftUI view in plain English. Our GPT-4 powered engine generates clean, idiomatic SwiftUI code that follows Apple HIG guidelines.",
    tag: "Core",
    color: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/30",
    iconColor: "text-violet-400",
  },
  {
    icon: Eye,
    title: "Real-Time Live Preview",
    description:
      "See your SwiftUI views rendered instantly. Our web-based SwiftUI renderer previews exactly what your code looks like on iPhone, iPad, and Apple Watch.",
    tag: "Preview",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    icon: Code2,
    title: "Intelligent Code Editor",
    description:
      "A purpose-built editor with SwiftUI autocomplete, syntax highlighting, error detection, and inline AI suggestions. Code faster than ever.",
    tag: "Editor",
    color: "from-cyan-500/20 to-teal-500/20",
    border: "border-cyan-500/30",
    iconColor: "text-cyan-400",
  },
  {
    icon: Layers,
    title: "Component Library",
    description:
      "Access 500+ pre-built SwiftUI components — buttons, cards, charts, navigation patterns, animations, and more. One-click insertion.",
    tag: "Library",
    color: "from-emerald-500/20 to-green-500/20",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    icon: GitBranch,
    title: "Version Control Built-In",
    description:
      "Every change is tracked. Branch your app, experiment freely, and merge with confidence. Full Git integration with one-click GitHub sync.",
    tag: "Git",
    color: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/30",
    iconColor: "text-orange-400",
  },
  {
    icon: Smartphone,
    title: "Multi-Platform Export",
    description:
      "Export your project directly to Xcode in one click. Supports iOS, macOS, watchOS, tvOS, and visionOS targets automatically.",
    tag: "Export",
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30",
    iconColor: "text-pink-400",
  },
  {
    icon: Cpu,
    title: "SwiftData & CoreData",
    description:
      "Generate complete data models with SwiftData or CoreData. AI understands your data relationships and generates proper CRUD operations.",
    tag: "Data",
    color: "from-violet-500/20 to-blue-500/20",
    border: "border-violet-500/30",
    iconColor: "text-violet-400",
  },
  {
    icon: Palette,
    title: "Design Token System",
    description:
      "Sync with Figma or define your design tokens directly. Colors, typography, spacing, and shadows applied consistently across your app.",
    tag: "Design",
    color: "from-blue-500/20 to-indigo-500/20",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    icon: RefreshCw,
    title: "Animation Studio",
    description:
      "Create complex SwiftUI animations visually. Spring physics, keyframes, transitions, and matchedGeometryEffect — all generated automatically.",
    tag: "Animations",
    color: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/30",
    iconColor: "text-cyan-400",
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description:
      "Enterprise-grade security. Your code is encrypted at rest and in transit. SOC 2 Type II certified. Full data residency options available.",
    tag: "Enterprise",
    color: "from-emerald-500/20 to-cyan-500/20",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    icon: Globe,
    title: "API Integration",
    description:
      "Connect to any REST or GraphQL API. Zunau generates the networking layer, data models, and error handling automatically from your API spec.",
    tag: "Networking",
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30",
    iconColor: "text-orange-400",
  },
  {
    icon: Download,
    title: "TestFlight Ready",
    description:
      "From prompt to TestFlight in minutes. Automated CI/CD pipeline, code signing, and App Store Connect submission built right in.",
    tag: "Deploy",
    color: "from-pink-500/20 to-violet-500/20",
    border: "border-pink-500/30",
    iconColor: "text-pink-400",
  },
];

export default function Features() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="purple" className="mb-4">
            <Layers size={13} />
            Everything you need
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            The complete SwiftUI
            <br />
            <span className="gradient-text">development platform</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From idea to App Store — Zunau provides every tool you need to build,
            preview, and ship iOS apps at the speed of thought.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                hover
                glow
                className="group"
                style={{ animationDelay: `${i * 0.05}s` } as React.CSSProperties}
              >
                <div
                  className={`feature-icon mb-4 bg-gradient-to-br ${feature.color} ${feature.border} group-hover:scale-110 transition-transform`}
                >
                  <Icon size={22} className={feature.iconColor} />
                </div>

                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-semibold text-base">{feature.title}</h3>
                  <Badge
                    variant={
                      feature.tag === "Core" ? "purple" :
                      feature.tag === "Enterprise" ? "green" :
                      feature.tag === "Deploy" ? "orange" : "blue"
                    }
                    className="text-[10px] px-2 py-0.5 flex-shrink-0 ml-2"
                  >
                    {feature.tag}
                  </Badge>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
