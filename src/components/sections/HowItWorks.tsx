import { MessageSquare, Code2, Eye, Rocket } from "lucide-react";
import Badge from "@/components/ui/Badge";
import CodeWindow from "@/components/ui/CodeWindow";
import PhoneFrame from "@/components/ui/PhoneFrame";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Describe Your Vision",
    description:
      "Type what you want to build in plain English. Be as vague or specific as you like — 'a blue button' or 'a card component with avatar, name, bio, and a follow button with haptic feedback'.",
    iconColor: "text-violet-400",
    gradient: "from-violet-600 to-purple-600",
  },
  {
    number: "02",
    icon: Code2,
    title: "AI Generates SwiftUI",
    description:
      "Zunau's AI instantly produces clean, production-ready SwiftUI code following Apple's Human Interface Guidelines. No boilerplate, no filler — just elegant Swift.",
    iconColor: "text-blue-400",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    number: "03",
    icon: Eye,
    title: "Preview & Refine",
    description:
      "See your app rendered live. Iterate by typing new instructions — 'make it darker', 'add a spring animation', 'use SF Symbols instead'. The AI understands context.",
    iconColor: "text-cyan-400",
    gradient: "from-cyan-600 to-teal-600",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Export & Ship",
    description:
      "When you're happy, export a complete Xcode project in one click. All your assets, packages, and configurations included. From prompt to App Store in record time.",
    iconColor: "text-emerald-400",
    gradient: "from-emerald-600 to-green-600",
  },
];

const PROFILE_CARD_CODE = `struct ProfileCardView: View {
    let user: User
    @State private var isFollowing = false

    var body: some View {
        VStack(spacing: 0) {
            // Header with gradient
            ZStack {
                LinearGradient(
                    colors: [.purple, .blue],
                    startPoint: .leading,
                    endPoint: .trailing
                )
                .frame(height: 80)

                Circle()
                    .fill(.white)
                    .frame(width: 72, height: 72)
                    .overlay(
                        AsyncImage(url: user.avatarURL)
                            .clipShape(Circle())
                    )
                    .offset(y: 36)
            }

            // Content
            VStack(spacing: 8) {
                Text(user.name)
                    .font(.title2.bold())
                    .padding(.top, 44)

                Text(user.bio)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal)

                Button {
                    withAnimation(.spring()) {
                        isFollowing.toggle()
                    }
                } label: {
                    Text(isFollowing ? "Following" : "Follow")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(.borderedProminent)
                .padding()
            }
        }
        .background(.card)
        .clipShape(RoundedRectangle(cornerRadius: 20))
        .shadow(radius: 10)
    }
}`;

export default function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden" id="how-it-works">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge variant="blue" className="mb-4">
            <Rocket size={13} />
            How it works
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            From idea to iOS app
            <br />
            <span className="gradient-text">in 4 simple steps</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            No Xcode knowledge required. No Swift expertise needed. Just your
            imagination and Zunau.io.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/0 via-violet-500/30 to-violet-500/0 hidden lg:block" />

          <div className="space-y-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <Icon size={22} className="text-white" />
                      </div>
                      <span className="text-6xl font-black text-white/5 font-mono leading-none">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>

                  {/* Visual */}
                  <div className="flex-1 relative">
                    {/* Dot on timeline */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-violet-500 border-4 border-[#0a0a0f] z-10 hidden lg:block" />

                    {i === 0 && (
                      <div className="glass-card rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <MessageSquare size={16} className="text-violet-400" />
                          <span className="text-sm text-slate-400">Describe your component</span>
                        </div>
                        <div className="bg-[#0d0d1a] rounded-xl p-4 font-mono text-sm text-slate-300">
                          <span className="text-violet-400">User: </span>
                          Create a profile card with avatar, name, bio text and a follow button that animates with spring physics when tapped
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-violet-500/20 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full animate-pulse" />
                          </div>
                          <span className="text-xs text-violet-400">Generating...</span>
                        </div>
                      </div>
                    )}

                    {i === 1 && (
                      <CodeWindow
                        title="ProfileCardView.swift"
                        code={PROFILE_CARD_CODE}
                        className="max-h-[400px] overflow-y-auto scrollbar-thin"
                        showLineNumbers={false}
                      />
                    )}

                    {i === 2 && (
                      <PhoneFrame>
                        <div className="h-full bg-[#f2f2f7] flex flex-col items-center justify-start pt-4 px-4">
                          <div className="w-full bg-white rounded-2xl overflow-hidden shadow-lg">
                            <div className="h-16 bg-gradient-to-r from-violet-500 to-blue-500" />
                            <div className="flex flex-col items-center -mt-8 pb-4">
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 border-3 border-white mb-2" />
                              <p className="font-bold text-sm text-gray-900">Alex Johnson</p>
                              <p className="text-xs text-gray-500 text-center px-4 mt-1">iOS Developer & Design Enthusiast</p>
                              <button className="mt-3 bg-violet-500 text-white text-xs font-bold px-8 py-1.5 rounded-lg">
                                Follow
                              </button>
                            </div>
                          </div>
                        </div>
                      </PhoneFrame>
                    )}

                    {i === 3 && (
                      <div className="glass-card rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold">Export Options</span>
                          <Badge variant="green">Ready</Badge>
                        </div>
                        {[
                          { icon: "📦", label: "Xcode Project (.xcodeproj)", action: "Export" },
                          { icon: "📁", label: "Swift Package (SPM)", action: "Export" },
                          { icon: "✈️", label: "Submit to TestFlight", action: "Deploy" },
                          { icon: "🚀", label: "App Store Connect", action: "Publish" },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5"
                          >
                            <div className="flex items-center gap-3">
                              <span>{item.icon}</span>
                              <span className="text-slate-300 text-sm">{item.label}</span>
                            </div>
                            <button className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors cursor-pointer">
                              {item.action} →
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
