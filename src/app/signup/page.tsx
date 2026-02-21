import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Github, Check, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Sign Up — Start Free",
  description: "Create your free Zunau.io account and start building SwiftUI apps with AI.",
};

const perks = [
  "25 AI generations free every month",
  "3 active projects — no time limit",
  "Live SwiftUI preview in browser",
  "One-click Xcode export",
  "No credit card required",
];

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left - benefits */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-violet-950 via-[#0a0a0f] to-blue-950 flex-col justify-center px-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />

        <div className="relative">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl">
              Zunau<span className="text-violet-400">.io</span>
            </span>
          </Link>

          <Badge variant="green" className="mb-6">Free forever plan available</Badge>

          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Build iOS apps at
            <br />
            <span className="gradient-text">the speed of thought</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-sm">
            Describe your app. Zunau builds it. Export to Xcode.
            Ship to the App Store. That&apos;s the whole workflow.
          </p>

          <ul className="space-y-3 mb-10">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-emerald-400" />
                </div>
                <span className="text-slate-300">{perk}</span>
              </li>
            ))}
          </ul>

          {/* Testimonial */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-amber-400 text-sm">★</span>
              ))}
            </div>
            <p className="text-slate-300 text-sm italic mb-3">
              &ldquo;I built and launched my first iOS app in 2 weeks using Zunau.
              The AI just gets SwiftUI in a way that no other tool does.&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 flex items-center justify-center text-white text-xs font-bold">MR</div>
              <div>
                <p className="text-white text-sm font-semibold">Michael R.</p>
                <p className="text-slate-500 text-xs">Indie developer, 3 App Store apps</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right - form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 py-12 max-w-lg mx-auto w-full">
        {/* Logo mobile */}
        <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl">Zunau<span className="text-violet-400">.io</span></span>
        </Link>

        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-black text-white">Create your account</h1>
          <p className="text-slate-400">Free forever. No credit card needed.</p>
        </div>

        {/* Social buttons */}
        <div className="space-y-3 mb-6">
          <button className="w-full glass-card rounded-xl p-3.5 flex items-center justify-center gap-3 text-slate-200 text-sm font-medium hover:border-violet-500/40 transition-all cursor-pointer">
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>

          <button className="w-full glass-card rounded-xl p-3.5 flex items-center justify-center gap-3 text-slate-200 text-sm font-medium hover:border-violet-500/40 transition-all cursor-pointer">
            <Github size={20} />
            Sign up with GitHub
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-slate-500 text-sm">or sign up with email</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">First name</label>
              <input
                type="text"
                placeholder="Alex"
                className="w-full glass-card rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 text-sm outline-none focus:border-violet-500/60 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Last name</label>
              <input
                type="text"
                placeholder="Johnson"
                className="w-full glass-card rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 text-sm outline-none focus:border-violet-500/60 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full glass-card rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 text-sm outline-none focus:border-violet-500/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <input
              type="password"
              placeholder="Min. 8 characters"
              className="w-full glass-card rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 text-sm outline-none focus:border-violet-500/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              What are you building?
            </label>
            <select className="w-full glass-card rounded-xl px-4 py-3 text-slate-300 text-sm outline-none focus:border-violet-500/60 transition-colors bg-transparent cursor-pointer">
              <option value="" className="bg-[#12121a]">Select your use case...</option>
              <option value="personal" className="bg-[#12121a]">Personal / hobby project</option>
              <option value="indie" className="bg-[#12121a]">Indie iOS app (for App Store)</option>
              <option value="startup" className="bg-[#12121a]">Startup / client work</option>
              <option value="enterprise" className="bg-[#12121a]">Enterprise / team project</option>
              <option value="learning" className="bg-[#12121a]">Learning SwiftUI</option>
            </select>
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="terms" className="accent-violet-500 mt-0.5" />
            <label htmlFor="terms" className="text-sm text-slate-400">
              I agree to the{" "}
              <Link href="/terms" className="text-violet-400 hover:text-violet-300 transition-colors">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-violet-400 hover:text-violet-300 transition-colors">Privacy Policy</Link>
            </label>
          </div>

          <Button className="w-full" size="md">
            Create Free Account
            <ArrowRight size={16} />
          </Button>
        </form>

        <p className="text-center text-slate-500 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
