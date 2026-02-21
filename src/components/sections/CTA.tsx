import Link from "next/link";
import { ArrowRight, Zap, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-[#0a0a0f] to-blue-950/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-3xl" />

      {/* Decorative orbs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 text-violet-300 text-sm font-medium mb-6 bg-violet-500/10 px-4 py-2 rounded-full border border-violet-500/20">
          <Sparkles size={15} />
          Join 12,000+ iOS developers already vibe coding
        </div>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
          Start building your
          <br />
          <span className="gradient-text">dream iOS app</span>
          <br />
          today.
        </h2>

        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          No credit card. No setup. No Xcode knowledge required.
          Just describe what you want to build and let Zunau do the rest.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/signup">
            <Button size="lg" className="min-w-[200px]">
              <Zap size={18} />
              Start Building Free
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="secondary" size="lg" className="min-w-[160px]">
              View Pricing
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
          {[
            "✓ Free forever plan",
            "✓ No credit card needed",
            "✓ Export to Xcode",
            "✓ Cancel anytime",
            "✓ SOC 2 compliant",
          ].map((item) => (
            <span key={item} className="text-slate-500 hover:text-slate-300 transition-colors">
              {item}
            </span>
          ))}
        </div>

        {/* App store badges */}
        <div className="mt-12 pt-12 border-t border-white/5">
          <p className="text-slate-500 text-sm mb-6">Also available as a native app</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-3 hover:bg-white/10 transition-colors cursor-pointer">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <p className="text-white/50 text-[10px]">Download on the</p>
                <p className="text-white font-semibold text-sm">App Store</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-3 hover:bg-white/10 transition-colors cursor-pointer">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" style={{ color: '#34A853' }}>
                <path d="M3.18 23.76c.34.19.72.24 1.1.14L14.76 12 3.5.24C3.08.12 2.66.17 2.32.38 1.7.75 1.33 1.4 1.33 2.13v19.74c0 .73.37 1.38.99 1.75l.86.14zm16.97-10.43-2.78-2.78-11.16 6.36 13.94-3.58zm-2.78-5.34L3.5.24 17.37 7.45l-2.78 2.78 2.78-2.78zM3.18.38c.34-.19.72-.24 1.1-.14L3.18.38z"/>
              </svg>
              <div className="text-left">
                <p className="text-white/50 text-[10px]">Get it on</p>
                <p className="text-white font-semibold text-sm">Google Play</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
