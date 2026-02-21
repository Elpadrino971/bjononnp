import { Shield, Layers, Cpu, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import CodeWindow from "@/components/ui/CodeWindow";

const PROTOCOL_CODE = `// Zunau Protocol v1 — TCA Foundation
// Every project starts from this certified base

import SwiftUI
import ComposableArchitecture

// ─── Protocol Core ───────────────────────────────────
@Reducer
struct AppFeature {
  @ObservableState
  struct State: Equatable {
    // MCP Supabase — Auth (auto-injected)
    var auth: AuthFeature.State = .init()
    // MCP Stripe — Payments (on-demand)
    var payments: PaymentsFeature.State = .init()
    // MCP Spline — 3D Scenes (on-demand)
    var scenes: SplineFeature.State = .init()
  }

  enum Action {
    case auth(AuthFeature.Action)
    case payments(PaymentsFeature.Action)
    case scenes(SplineFeature.Action)
  }

  var body: some ReducerOf<Self> {
    // AI only modifies inside this scope
    // Core architecture is never touched
    Scope(state: \\.auth, action: \\.auth) {
      AuthFeature() // ← MCP Supabase certified
    }
    Scope(state: \\.payments, action: \\.payments) {
      PaymentsFeature() // ← MCP Stripe certified
    }
  }
}`;

const steps = [
  {
    number: "01",
    title: "Protocol TCA chargé",
    description: "Le protocole Apple TCA certifié est injecté — architecture MVVM + modules isolés. L'IA ne touche jamais le core.",
    icon: Layers,
    color: "from-violet-600 to-purple-600",
  },
  {
    number: "02",
    title: "MCPs activés",
    description: "Vous choisissez vos modules : Auth, Paiements, Animation 3D, Base de données. Chaque MCP est pré-validé, zéro bug d'intégration.",
    icon: Cpu,
    color: "from-blue-600 to-cyan-600",
  },
  {
    number: "03",
    title: "L'IA modifie, pas crée",
    description: "L'IA travaille dans les zones autorisées du protocole. Elle habille le squelette certifié. Le code généré est propre par construction.",
    icon: Shield,
    color: "from-emerald-600 to-teal-600",
  },
];

export default function ProtocolArchitecture() {
  return (
    <section className="py-24 relative overflow-hidden" id="protocol">
      {/* BG effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/8 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/4 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="purple" className="mb-4">
            <Shield size={13} />
            Le secret de Zunau
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            L&apos;IA ne crée pas,{" "}
            <span className="gradient-text">elle modifie</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Contrairement aux autres outils de vibe coding, Zunau ne génère pas du code depuis zéro.
            L&apos;IA travaille sur un protocole Apple TCA pré-certifié — c&apos;est pourquoi le code
            est toujours propre, toujours sans bug d&apos;intégration.
          </p>
        </div>

        {/* Main split */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left — code */}
          <CodeWindow
            title="AppFeature.swift — Protocole certifié v1"
            code={PROTOCOL_CODE}
            language="Swift TCA"
            className="shadow-2xl shadow-violet-900/20"
          />

          {/* Right — steps */}
          <div className="space-y-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex gap-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl font-black text-white/10 font-mono">{step.number}</span>
                      <h3 className="text-white font-bold text-lg">{step.title}</h3>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-sm">{step.description}</p>
                  </div>
                </div>
              );
            })}

            {/* Comparison callout */}
            <div className="glass-card rounded-2xl p-5 border-violet-500/20">
              <p className="text-slate-400 text-sm mb-3 font-medium">La différence fondamentale</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                  <p className="text-red-400 text-xs font-bold mb-2">Autres outils</p>
                  <p className="text-slate-400 text-xs">Génèrent du code depuis zéro → erreurs d&apos;intégration API → friction</p>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                  <p className="text-emerald-400 text-xs font-bold mb-2">Zunau</p>
                  <p className="text-slate-400 text-xs">Protocole certifié + MCPs validés → zéro bug d&apos;intégration → vitesse</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture diagram */}
        <div className="glass-card rounded-3xl p-8 border-violet-500/15">
          <p className="text-slate-500 text-xs font-mono text-center mb-8 uppercase tracking-wider">Architecture Zunau</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {[
              { label: "Votre prompt", sub: "Langage naturel", bg: "bg-violet-600/20", border: "border-violet-500/30", text: "text-violet-300" },
              { arrow: true },
              { label: "Orchestrateur IA", sub: "Claude Opus 4 + Gemini", bg: "bg-blue-600/20", border: "border-blue-500/30", text: "text-blue-300" },
              { arrow: true },
              { label: "Protocole TCA", sub: "Apple certified base", bg: "bg-cyan-600/20", border: "border-cyan-500/30", text: "text-cyan-300" },
              { arrow: true },
              { label: "MCPs certifiés", sub: "Supabase · Stripe · Spline", bg: "bg-emerald-600/20", border: "border-emerald-500/30", text: "text-emerald-300" },
              { arrow: true },
              { label: "Code SwiftUI", sub: "Propre · Sans bug · Exportable", bg: "bg-orange-600/20", border: "border-orange-500/30", text: "text-orange-300" },
            ].map((item, i) => {
              if ('arrow' in item) {
                return (
                  <div key={i} className="flex items-center justify-center md:rotate-0 rotate-90 my-1 md:my-0 md:mx-2">
                    <ArrowRight size={18} className="text-slate-600" />
                  </div>
                );
              }
              return (
                <div
                  key={i}
                  className={`${item.bg} border ${item.border} rounded-2xl px-5 py-4 text-center min-w-[120px]`}
                >
                  <p className={`${item.text} font-bold text-sm`}>{item.label}</p>
                  <p className="text-slate-500 text-[10px] mt-1">{item.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
