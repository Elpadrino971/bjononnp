import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ArrowRight, Clock, Tag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "SwiftUI tutorials, AI coding tips, and product updates from the Zunau.io team.",
};

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  featured?: boolean;
  author: { name: string; avatar: string };
}

const POSTS: Post[] = [
  {
    slug: "tca-swiftui-ai-patterns",
    title: "TCA + AI: How to Keep Architecture Control While Vibe Coding",
    excerpt:
      "The Composable Architecture is perfect for AI-assisted development — but only if you define clear boundaries. Here's the protocol we use at Zunau.",
    date: "Feb 18, 2026",
    readTime: "8 min",
    category: "Architecture",
    featured: true,
    author: { name: "Zunau Team", avatar: "ZT" },
  },
  {
    slug: "swiftui-mcp-supabase-auth",
    title: "Add Supabase Auth to Any SwiftUI App in Under 10 Minutes",
    excerpt:
      "Step-by-step guide using the Zunau MCP Auth module: user registration, login, session refresh, and Row Level Security — all generated for you.",
    date: "Feb 14, 2026",
    readTime: "6 min",
    category: "Tutorial",
    author: { name: "Zunau Team", avatar: "ZT" },
  },
  {
    slug: "stripe-storekit2-swiftui",
    title: "StoreKit 2 vs Stripe: Which Should You Use for Your iOS App?",
    excerpt:
      "A practical breakdown of when to use Apple's in-app purchases vs Stripe — with generated SwiftUI code for both approaches.",
    date: "Feb 10, 2026",
    readTime: "10 min",
    category: "Monetization",
    author: { name: "Zunau Team", avatar: "ZT" },
  },
  {
    slug: "swiftui-observable-macro",
    title: "iOS 17 @Observable vs ObservableObject: The Complete Migration Guide",
    excerpt:
      "Everything you need to know about the new @Observable macro — with before/after code examples and common migration gotchas.",
    date: "Feb 5, 2026",
    readTime: "7 min",
    category: "SwiftUI",
    author: { name: "Zunau Team", avatar: "ZT" },
  },
  {
    slug: "ai-swiftui-prompt-engineering",
    title: "10 Prompt Patterns That Get Better SwiftUI Code from AI",
    excerpt:
      "After generating 50,000+ SwiftUI components, we've found the prompt patterns that consistently produce clean, production-ready code.",
    date: "Jan 28, 2026",
    readTime: "5 min",
    category: "AI Tips",
    author: { name: "Zunau Team", avatar: "ZT" },
  },
  {
    slug: "swiftdata-core-data-comparison",
    title: "SwiftData in 2026: Is It Ready to Replace Core Data?",
    excerpt:
      "We migrated a real production app from Core Data to SwiftData. Here's what worked, what didn't, and how Zunau handles both.",
    date: "Jan 20, 2026",
    readTime: "12 min",
    category: "SwiftUI",
    author: { name: "Zunau Team", avatar: "ZT" },
  },
];

const CATEGORY_COLORS: Record<string, "violet" | "blue" | "green" | "yellow" | "red" | "slate"> = {
  Architecture: "violet",
  Tutorial: "blue",
  Monetization: "green",
  SwiftUI: "blue",
  "AI Tips": "violet",
};

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      <main className="pt-32 pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="violet" className="mb-4">Blog</Badge>
            <h1 className="text-5xl font-black text-white mb-4">
              SwiftUI &amp; AI insights
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Tutorials, architecture deep-dives, and product updates from the
              Zunau.io team.
            </p>
          </div>

          {/* Featured post */}
          <Link
            href={`/blog/${featured.slug}`}
            className="block glass-card rounded-2xl p-8 mb-12 hover:border-violet-500/40 transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={CATEGORY_COLORS[featured.category] ?? "slate"}>
                {featured.category}
              </Badge>
              <span className="text-violet-400 text-xs font-semibold uppercase tracking-wider">
                Featured
              </span>
            </div>
            <h2 className="text-2xl font-black text-white mb-3 group-hover:text-violet-300 transition-colors">
              {featured.title}
            </h2>
            <p className="text-slate-400 mb-6 leading-relaxed">{featured.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>{featured.date}</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  {featured.readTime} read
                </span>
              </div>
              <span className="text-violet-400 flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all">
                Read article <ArrowRight size={14} />
              </span>
            </div>
          </Link>

          {/* Post grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card rounded-2xl p-6 hover:border-violet-500/40 transition-all group flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={CATEGORY_COLORS[post.category] ?? "slate"} className="text-xs">
                    <Tag size={10} />
                    {post.category}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors flex-1">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 glass-card rounded-2xl p-8 text-center border border-violet-500/20">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center mx-auto mb-4">
              <Zap size={18} className="text-white" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">
              Get new posts in your inbox
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Weekly SwiftUI tutorials and Zunau product updates. No spam.
            </p>
            <form className="flex gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 glass-card rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-500 text-sm outline-none focus:border-violet-500/60 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
