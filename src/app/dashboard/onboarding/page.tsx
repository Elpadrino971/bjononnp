"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Zap, CheckCircle, ArrowRight, Smartphone,
  Code2, Database, Rocket
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

type Usecase = "indie" | "agency" | "startup" | "learning";
type Stack = "supabase" | "firebase" | "custom" | "none";

interface Step {
  id: number;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  { id: 1, title: "Welcome", description: "Tell us about you" },
  { id: 2, title: "Your stack", description: "Choose your backend" },
  { id: 3, title: "First project", description: "Create your first app" },
];

const USECASES: { id: Usecase; label: string; emoji: string; description: string }[] = [
  { id: "indie", label: "Indie developer", emoji: "🧑‍💻", description: "Building apps on my own" },
  { id: "agency", label: "Agency / freelancer", emoji: "🏢", description: "Building for clients" },
  { id: "startup", label: "Startup", emoji: "🚀", description: "Building a product with a team" },
  { id: "learning", label: "Learning SwiftUI", emoji: "📚", description: "Exploring iOS development" },
];

const STACKS: { id: Stack; label: string; icon: typeof Database; description: string }[] = [
  { id: "supabase", label: "Supabase", icon: Database, description: "Postgres + Auth + Storage — recommended" },
  { id: "firebase", label: "Firebase", icon: Database, description: "Google's realtime database" },
  { id: "custom", label: "Custom backend", icon: Code2, description: "I'll handle the backend myself" },
  { id: "none", label: "No backend yet", icon: Smartphone, description: "Local / offline app for now" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [usecase, setUsecase] = useState<Usecase | null>(null);
  const [stack, setStack] = useState<Stack | null>(null);
  const [projectName, setProjectName] = useState("");

  function next() {
    if (step < 3) setStep(step + 1);
    else finish();
  }

  function finish() {
    // In production: save onboarding data to Supabase profiles table
    router.push("/dashboard/new-project");
  }

  const canProceed =
    (step === 1 && usecase !== null) ||
    (step === 2 && stack !== null) ||
    (step === 3 && projectName.trim().length > 0);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-4 py-16">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        <span className="text-white font-bold text-xl">
          Zunau<span className="text-violet-400">.io</span>
        </span>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  s.id < step
                    ? "bg-violet-600 text-white"
                    : s.id === step
                    ? "bg-violet-600 text-white ring-2 ring-violet-400/40"
                    : "bg-white/10 text-slate-500"
                }`}
              >
                {s.id < step ? <CheckCircle size={14} /> : s.id}
              </div>
              <span
                className={`text-sm font-medium ${
                  s.id === step ? "text-white" : "text-slate-500"
                }`}
              >
                {s.title}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-8 h-px bg-white/10" />
            )}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="glass-card rounded-2xl p-8 w-full max-w-lg">
        {/* Step 1 — usecase */}
        {step === 1 && (
          <div>
            <Badge variant="violet" className="mb-4">Step 1 of 3</Badge>
            <h1 className="text-2xl font-black text-white mb-2">How will you use Zunau?</h1>
            <p className="text-slate-400 text-sm mb-6">
              We&apos;ll personalise your experience based on your answer.
            </p>
            <div className="space-y-3">
              {USECASES.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setUsecase(u.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                    usecase === u.id
                      ? "border-violet-500 bg-violet-500/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className="text-2xl">{u.emoji}</span>
                  <div>
                    <div className="text-white font-semibold text-sm">{u.label}</div>
                    <div className="text-slate-500 text-xs">{u.description}</div>
                  </div>
                  {usecase === u.id && (
                    <CheckCircle size={16} className="text-violet-400 ml-auto shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — stack */}
        {step === 2 && (
          <div>
            <Badge variant="violet" className="mb-4">Step 2 of 3</Badge>
            <h1 className="text-2xl font-black text-white mb-2">What&apos;s your backend?</h1>
            <p className="text-slate-400 text-sm mb-6">
              Zunau will activate the right MCP modules for your stack.
            </p>
            <div className="space-y-3">
              {STACKS.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setStack(s.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                      stack === s.id
                        ? "border-violet-500 bg-violet-500/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-slate-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{s.label}</div>
                      <div className="text-slate-500 text-xs">{s.description}</div>
                    </div>
                    {stack === s.id && (
                      <CheckCircle size={16} className="text-violet-400 ml-auto shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3 — first project */}
        {step === 3 && (
          <div>
            <Badge variant="violet" className="mb-4">Step 3 of 3</Badge>
            <h1 className="text-2xl font-black text-white mb-2">Name your first project</h1>
            <p className="text-slate-400 text-sm mb-6">
              You can always change this later. Make it yours.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Project name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. FitTrack, TaskFlow, MyApp…"
                  autoFocus
                  className="w-full glass-card rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 text-sm outline-none focus:border-violet-500/60 transition-colors"
                />
              </div>

              <div className="glass-card rounded-xl p-4 border border-violet-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket size={14} className="text-violet-400" />
                  <span className="text-white text-sm font-semibold">What happens next</span>
                </div>
                <ul className="space-y-1.5">
                  {[
                    "Your project is created with the Zunau Protocol base",
                    stack === "supabase" && "Supabase MCP Auth module is activated",
                    "You land in the AI Playground — start describing your UI",
                    "Generate, preview, copy, and paste into Xcode",
                  ]
                    .filter(Boolean)
                    .map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-400 text-xs">
                        <CheckCircle size={12} className="text-green-400 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                </ul>
              </div>

              {stack === "supabase" && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Database size={14} className="text-blue-400 shrink-0" />
                  <p className="text-blue-300 text-xs">
                    Supabase detected — we&apos;ll include the Auth MCP and RLS templates in your project.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}
          <Button
            variant="primary"
            size="md"
            onClick={next}
            disabled={!canProceed}
          >
            {step === 3 ? (
              <>
                <Rocket size={16} />
                Create project
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={16} />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Skip */}
      <button
        onClick={() => router.push("/dashboard")}
        className="mt-6 text-slate-600 hover:text-slate-400 text-sm transition-colors"
      >
        Skip onboarding — go to dashboard
      </button>

    </div>
  );
}
