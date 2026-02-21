"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Sparkles, Play } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import CodeWindow from "@/components/ui/CodeWindow";
import PhoneFrame from "@/components/ui/PhoneFrame";

const SWIFT_EXAMPLE = `import SwiftUI

struct ContentView: View {
    @State private var isAnimating = false
    @State private var userName = "Vibe Coder"

    var body: some View {
        ZStack {
            LinearGradient(
                colors: [.purple, .blue, .cyan],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()

            VStack(spacing: 24) {
                Image(systemName: "swift")
                    .font(.system(size: 72))
                    .foregroundColor(.white)
                    .scaleEffect(isAnimating ? 1.1 : 1.0)
                    .animation(.easeInOut(duration: 1.5)
                        .repeatForever(), value: isAnimating)

                Text("Hello, \\(userName)!")
                    .font(.largeTitle.bold())
                    .foregroundColor(.white)

                Text("Built with Zunau.io")
                    .font(.subheadline)
                    .foregroundColor(.white.opacity(0.8))

                Button("Get Started") {
                    isAnimating.toggle()
                }
                .buttonStyle(.borderedProminent)
                .tint(.white.opacity(0.2))
            }
        }
        .onAppear { isAnimating = true }
    }
}`;

const TYPING_PROMPTS = [
  "Build a social media app with dark mode...",
  "Create a fitness tracker with animations...",
  "Design a weather app with gradients...",
  "Make a task manager with SwiftUI...",
  "Generate a music player interface...",
];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPrompt = TYPING_PROMPTS[promptIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentPrompt.length) {
            setTypedText(currentPrompt.slice(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          if (charIndex > 0) {
            setTypedText(currentPrompt.slice(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            setIsDeleting(false);
            setPromptIndex((promptIndex + 1) % TYPING_PROMPTS.length);
          }
        }
      },
      isDeleting ? 40 : 60
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, promptIndex]);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-600/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124,58,237,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-16">
          {/* Announcement badge */}
          <div className="flex justify-center mb-8 animate-fade-in-up">
            <Badge variant="purple" className="px-4 py-1.5 text-sm">
              <Sparkles size={13} />
              Introducing Zunau AI v2.0 — Now with Vision Pro Support
              <ArrowRight size={13} />
            </Badge>
          </div>

          {/* Main heading */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Vibe Code
            <br />
            <span className="gradient-text">SwiftUI Apps</span>
          </h1>

          <p
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Describe your iOS app in plain English. Watch Zunau transform your vision into
            production-ready SwiftUI code — instantly.
          </p>

          {/* Typing prompt demo */}
          <div
            className="max-w-2xl mx-auto mb-10 glass-card rounded-2xl p-1 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-3 bg-[#0d0d1a] rounded-xl p-4">
              <Zap size={18} className="text-violet-400 flex-shrink-0" />
              <span className="text-slate-300 text-base font-mono text-left flex-1">
                {typedText}
                <span className="inline-block w-0.5 h-5 bg-violet-400 ml-0.5 animate-pulse align-middle" />
              </span>
              <Button size="sm" className="flex-shrink-0">
                Generate
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link href="/signup">
              <Button size="lg">
                Start Building Free
                <Zap size={16} />
              </Button>
            </Link>
            <Link href="#demo">
              <Button variant="secondary" size="lg">
                <Play size={16} />
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Free tier forever
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Export to Xcode instantly
            </span>
          </div>
        </div>

        {/* Code + Phone preview */}
        <div
          className="grid lg:grid-cols-2 gap-8 items-center animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <CodeWindow
            title="ContentView.swift"
            code={SWIFT_EXAMPLE}
            language="SwiftUI"
            className="shadow-2xl shadow-violet-900/20"
          />

          <div className="flex flex-col items-center gap-8">
            <PhoneFrame className="animate-float">
              {/* SwiftUI app preview inside phone */}
              <div className="h-full w-full bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 flex flex-col items-center justify-center gap-4 px-6">
                <div className="text-6xl">⚡</div>
                <div className="text-white text-center">
                  <p className="text-xl font-bold mb-1">Hello, Vibe Coder!</p>
                  <p className="text-sm opacity-80">Built with Zunau.io</p>
                </div>
                <button className="bg-white/20 text-white text-sm font-semibold px-6 py-2.5 rounded-full border border-white/30 backdrop-blur-sm">
                  Get Started
                </button>
                <div className="absolute bottom-6 flex gap-8 text-white/60">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">🏠</span>
                    <span className="text-[9px]">Home</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">🔍</span>
                    <span className="text-[9px]">Search</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">⚙️</span>
                    <span className="text-[9px]">Settings</span>
                  </div>
                </div>
              </div>
            </PhoneFrame>

            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">Live SwiftUI Preview</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-mono">Rendering in real-time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "50K+", label: "Apps Built", icon: "📱" },
            { value: "12K+", label: "Developers", icon: "👩‍💻" },
            { value: "99.9%", label: "Uptime SLA", icon: "⚡" },
            { value: "4.9★", label: "App Store Rating", icon: "⭐" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center hover:border-violet-500/30 transition-all"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
