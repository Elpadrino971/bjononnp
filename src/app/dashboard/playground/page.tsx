"use client";
import { useState } from "react";
import {
  Zap, Copy, Download, RefreshCw, Smartphone,
  Tablet, Monitor, Sun, Moon, Settings2, Layers
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import CodeWindow from "@/components/ui/CodeWindow";
import PhoneFrame from "@/components/ui/PhoneFrame";

const SAMPLE_VIEWS = [
  {
    name: "Profile Card",
    prompt: "A user profile card with avatar, name, bio and follow button",
    code: `struct ProfileCard: View {
    @State private var isFollowing = false

    var body: some View {
        VStack(spacing: 0) {
            ZStack(alignment: .bottom) {
                LinearGradient(
                    colors: [.purple, .blue],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
                .frame(height: 100)

                Circle()
                    .fill(Color(.systemBackground))
                    .frame(width: 80, height: 80)
                    .overlay(
                        Text("👨‍💻")
                            .font(.system(size: 36))
                    )
                    .offset(y: 40)
            }

            VStack(spacing: 8) {
                Text("Alex Johnson")
                    .font(.title2.bold())
                    .padding(.top, 48)

                Text("iOS Developer")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)

                Button {
                    withAnimation(.spring(
                        response: 0.35,
                        dampingFraction: 0.6
                    )) {
                        isFollowing.toggle()
                    }
                } label: {
                    Label(
                        isFollowing ? "Following" : "Follow",
                        systemImage: isFollowing
                            ? "checkmark.circle.fill"
                            : "person.badge.plus"
                    )
                    .frame(maxWidth: .infinity)
                }
                .buttonStyle(.borderedProminent)
                .tint(isFollowing ? .secondary : .purple)
                .padding(.horizontal)
            }
            .padding(.bottom, 20)
        }
        .background(.ultraThinMaterial)
        .clipShape(RoundedRectangle(
            cornerRadius: 24,
            style: .continuous
        ))
        .shadow(color: .purple.opacity(0.2), radius: 20)
        .padding()
    }
}`,
  },
  {
    name: "Music Player",
    prompt: "A sleek music player with album art, controls, and progress bar",
    code: `struct MusicPlayer: View {
    @State private var isPlaying = false
    @State private var progress: Double = 0.35

    var body: some View {
        VStack(spacing: 24) {
            RoundedRectangle(cornerRadius: 24)
                .fill(
                    LinearGradient(
                        colors: [.indigo, .purple, .pink],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .frame(width: 260, height: 260)
                .overlay(
                    Text("🎵")
                        .font(.system(size: 80))
                )
                .shadow(
                    color: .purple.opacity(0.4),
                    radius: 30,
                    y: 15
                )
                .scaleEffect(isPlaying ? 1.0 : 0.95)
                .animation(.spring(response: 0.4), value: isPlaying)

            VStack(spacing: 4) {
                Text("Midnight Vibes")
                    .font(.title2.bold())
                Text("The Chill Collective")
                    .foregroundStyle(.secondary)
            }

            VStack(spacing: 4) {
                Slider(value: $progress)
                    .tint(.purple)
                HStack {
                    Text("1:42")
                    Spacer()
                    Text("4:58")
                }
                .font(.caption)
                .foregroundStyle(.secondary)
            }

            HStack(spacing: 32) {
                Button { } label: {
                    Image(systemName: "backward.fill")
                        .font(.title)
                }
                Button {
                    withAnimation(.spring()) {
                        isPlaying.toggle()
                    }
                } label: {
                    Image(systemName: isPlaying
                        ? "pause.circle.fill" : "play.circle.fill")
                        .font(.system(size: 64))
                        .foregroundStyle(.purple)
                }
                Button { } label: {
                    Image(systemName: "forward.fill")
                        .font(.title)
                }
            }
        }
        .padding(28)
        .background(.ultraThinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 36))
    }
}`,
  },
];

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState("");
  const [activeExample, setActiveExample] = useState(0);
  const [isDarkPreview, setIsDarkPreview] = useState(true);
  const [device, setDevice] = useState<"phone" | "tablet" | "mac">("phone");
  const [isGenerating, setIsGenerating] = useState(false);

  const currentExample = SAMPLE_VIEWS[activeExample];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="h-full flex flex-col gap-4 -m-6 p-0">
      <div className="flex items-center justify-between px-6 pt-6 pb-0 flex-shrink-0">
        <div>
          <h2 className="text-white font-bold text-xl">AI Playground</h2>
          <p className="text-slate-500 text-sm">Generate SwiftUI views by describing them</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="green">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            GPT-4o Connected
          </Badge>
          <Button variant="ghost" size="sm">
            <Settings2 size={15} />
            Settings
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-0 min-h-0">
        <div className="flex-1 flex flex-col min-w-0 border-r border-white/5">
          <div className="flex items-center gap-2 px-6 py-3 border-b border-white/5 flex-shrink-0">
            <span className="text-slate-500 text-xs">Examples:</span>
            {SAMPLE_VIEWS.map((example, i) => (
              <button
                key={example.name}
                onClick={() => setActiveExample(i)}
                className={"text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer " + (
                  activeExample === i
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                    : "text-slate-500 hover:text-slate-300 border border-white/5 hover:border-white/10"
                )}
              >
                {example.name}
              </button>
            ))}
          </div>

          <div className="px-6 py-4 border-b border-white/5 flex-shrink-0">
            <div className="flex gap-3">
              <div className="flex-1 bg-[#0d0d1a] border border-white/5 rounded-xl overflow-hidden focus-within:border-violet-500/40 transition-colors">
                <textarea
                  rows={2}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={currentExample.prompt}
                  className="w-full bg-transparent px-4 py-3 text-slate-300 placeholder-slate-600 text-sm outline-none resize-none"
                />
                <div className="px-4 pb-2 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {["Minimal", "Dark mode", "Animated"].map((tag) => (
                      <button key={tag} className="text-[10px] bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded-full cursor-pointer hover:bg-violet-500/20 transition-colors">
                        {tag}
                      </button>
                    ))}
                  </div>
                  <span className="text-slate-600 text-[10px]">Cmd+Enter to generate</span>
                </div>
              </div>
              <Button onClick={handleGenerate} disabled={isGenerating} className="self-start flex-shrink-0">
                {isGenerating ? <RefreshCw size={15} className="animate-spin" /> : <Zap size={15} />}
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Badge variant="purple" className="text-[10px]">Swift</Badge>
                <span className="text-slate-500 text-xs">{currentExample.name}.swift</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer">
                  <Copy size={12} /> Copy
                </button>
                <button className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer">
                  <Download size={12} /> Export
                </button>
              </div>
            </div>
            <CodeWindow
              title={currentExample.name + ".swift"}
              code={currentExample.code}
              className="border-0 rounded-none shadow-none"
            />
          </div>
        </div>

        <div className="w-[360px] flex-shrink-0 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 flex-shrink-0">
            <span className="text-slate-400 text-xs font-medium">Live Preview</span>
            <div className="flex items-center gap-1">
              {[
                { icon: Smartphone, key: "phone" },
                { icon: Tablet, key: "tablet" },
                { icon: Monitor, key: "mac" },
              ].map(({ icon: Icon, key }) => (
                <button
                  key={key}
                  onClick={() => setDevice(key as typeof device)}
                  className={"p-1.5 rounded-lg transition-all cursor-pointer " + (
                    device === key ? "bg-violet-500/20 text-violet-400" : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  <Icon size={15} />
                </button>
              ))}
              <div className="w-px h-4 bg-white/10 mx-1" />
              <button
                onClick={() => setIsDarkPreview(!isDarkPreview)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 transition-all cursor-pointer"
              >
                {isDarkPreview ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
          </div>

          <div className={"flex-1 flex items-center justify-center p-6 overflow-hidden " + (isDarkPreview ? "bg-[#0d0d1a]" : "bg-[#f2f2f7]")}>
            {device === "phone" ? (
              <PhoneFrame>
                <div className={"h-full flex flex-col items-center justify-center px-3 py-4 " + (isDarkPreview ? "bg-[#0d0d1a]" : "bg-[#f2f2f7]")}>
                  {activeExample === 0 ? (
                    <div className={"w-full rounded-2xl overflow-hidden shadow-xl " + (isDarkPreview ? "bg-gray-900" : "bg-white")}>
                      <div className="h-16 bg-gradient-to-r from-violet-500 to-blue-500" />
                      <div className="flex flex-col items-center pb-4 -mt-8">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 border-4 border-white flex items-center justify-center text-2xl">👨‍💻</div>
                        <p className={"font-bold text-sm mt-2 " + (isDarkPreview ? "text-white" : "text-gray-900")}>Alex Johnson</p>
                        <p className="text-gray-500 text-xs mt-0.5">iOS Developer</p>
                        <div className="flex gap-6 my-2">
                          <div className="text-center">
                            <p className={"font-bold text-sm " + (isDarkPreview ? "text-white" : "text-gray-900")}>128</p>
                            <p className="text-gray-500 text-[10px]">Following</p>
                          </div>
                          <div className="text-center">
                            <p className={"font-bold text-sm " + (isDarkPreview ? "text-white" : "text-gray-900")}>4.2K</p>
                            <p className="text-gray-500 text-[10px]">Followers</p>
                          </div>
                        </div>
                        <button className="bg-violet-500 text-white text-xs font-bold px-8 py-1.5 rounded-lg">Follow</button>
                      </div>
                    </div>
                  ) : (
                    <div className={"w-full rounded-2xl p-4 shadow-xl " + (isDarkPreview ? "bg-gray-900" : "bg-white")}>
                      <div className="h-28 w-28 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-pink-500 flex items-center justify-center text-4xl mb-3 shadow-lg">🎵</div>
                      <p className={"font-bold text-center text-sm " + (isDarkPreview ? "text-white" : "text-gray-900")}>Midnight Vibes</p>
                      <p className="text-gray-500 text-xs text-center mb-3">The Chill Collective</p>
                      <div className="h-1 w-full bg-gray-700 rounded-full mb-3">
                        <div className="h-full w-1/3 bg-violet-500 rounded-full" />
                      </div>
                      <div className="flex items-center justify-center gap-5">
                        <span className={"text-xl " + (isDarkPreview ? "text-white" : "text-gray-700")}>{"⏮"}</span>
                        <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center text-white text-lg">{"▶"}</div>
                        <span className={"text-xl " + (isDarkPreview ? "text-white" : "text-gray-700")}>{"⏭"}</span>
                      </div>
                    </div>
                  )}
                </div>
              </PhoneFrame>
            ) : (
              <div className={"w-full h-full flex items-center justify-center rounded-xl border " + (isDarkPreview ? "border-white/10 bg-gray-900" : "border-gray-200 bg-white")}>
                <div className="text-center text-slate-500">
                  <Layers size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">{device === "tablet" ? "iPad" : "macOS"} preview</p>
                </div>
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-white/5 flex-shrink-0">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Generated in 0.8s</span>
              <span>847 tokens used</span>
              <button className="text-violet-400 hover:text-violet-300 transition-colors cursor-pointer">Regenerate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
