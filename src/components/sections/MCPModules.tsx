"use client";
import { useState } from "react";
import { Database, CreditCard, Box, Sparkles, Figma, Activity, Zap, Check, ChevronRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import CodeWindow from "@/components/ui/CodeWindow";

const modules = [
  {
    id: "supabase",
    icon: Database,
    name: "MCP Supabase",
    tagline: "Auth · Base de données · Realtime · Storage",
    description: "Le MCP le plus demandé. Auth Apple/Google/Email, profils utilisateurs séparés, RLS préconfigurée, Realtime avec reconnexion automatique. Zéro configuration, zéro fuite de service_role.",
    badge: "Obligatoire",
    badgeVariant: "purple" as const,
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    modules: ["Auth (Apple, Google, Email)", "Profiles séparées auto", "RLS pré-certifiée", "Realtime + reconnexion", "Storage (buckets sécurisés)", "Edge Functions templates"],
    code: `// MCP Supabase — Injecté automatiquement
// service_role JAMAIS exposé côté client

import SupabaseSwift
import ComposableArchitecture

@Reducer
struct AuthFeature {
  @Dependency(\\.supabaseClient) var supabase

  struct State: Equatable {
    var currentUser: Profile?
    var isLoading = false
  }

  enum Action {
    case signInWithApple
    case signOut
    case profileLoaded(Profile)
  }

  var body: some ReducerOf<Self> {
    Reduce { state, action in
      switch action {
      case .signInWithApple:
        // RLS activée — utilisateur ne voit que ses données
        state.isLoading = true
        return .run { send in
          let session = try await supabase.auth
            .signInWithOAuth(provider: .apple)
          await send(.profileLoaded(session.user.toProfile()))
        }
      }
    }
  }
}`,
  },
  {
    id: "stripe",
    icon: CreditCard,
    name: "MCP Stripe",
    tagline: "StoreKit 2 · Webhooks · Abonnements · Connect",
    description: "Paiements iOS natifs avec StoreKit 2 + Stripe webhooks côté serveur. Abonnements, achats in-app, Stripe Connect pour les marketplaces (split 70/30). Validation côté serveur garantie.",
    badge: "Recommandé",
    badgeVariant: "blue" as const,
    color: "from-blue-500/20 to-indigo-500/20",
    border: "border-blue-500/30",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    modules: ["StoreKit 2 natif iOS", "Stripe Webhooks validés", "Abonnements récurrents", "Stripe Connect (marketplaces)", "Customer Portal self-service", "Gestion des remboursements"],
    code: `// MCP Stripe — Webhook validé serveur
// Jamais confiance au client pour valider un paiement

import Stripe
import Supabase

// Edge Function Supabase (service_role)
export default async function handler(req: Request) {
  const sig = req.headers.get("stripe-signature")!
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  if (event.type === "payment_intent.succeeded") {
    const payment = event.data.object
    // Mettre à jour subscription_status dans profiles
    await supabase
      .from("profiles")
      .update({ subscription_status: "active" })
      .eq("stripe_customer_id", payment.customer)
  }
}`,
  },
  {
    id: "spline",
    icon: Box,
    name: "MCP Spline 3D",
    tagline: "3D interactif · Metal natif · visionOS ready",
    description: "Scènes 3D interactives directement dans SwiftUI. Renderer Metal natif Apple — iPhone, iPad, Mac et visionOS. Chargement local vs cloud selon la taille. Optimisation RAM automatique.",
    badge: "Différenciateur",
    badgeVariant: "cyan" as const,
    color: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/30",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    modules: ["Runtime Metal natif", "SwiftUI intégration directe", "Local vs Cloud automatique", "Optimisation RAM mobile", "Fallback gracieux", "visionOS compatible"],
    code: `// MCP Spline — 3D natif Metal
// Aucun outil vibe coding n'a ça aujourd'hui

import SplineRuntime
import SwiftUI

struct HeroView: View {
  // Zunau détecte la taille → local si < 5MB
  // → cloud si plus grande pour économiser l'espace
  let sceneURL = Bundle.main.url(
    forResource: "hero_scene",
    withExtension: "splinecomp"
  )!

  var body: some View {
    ZStack {
      // Scène 3D interactive en background
      SplineView(sceneFileURL: sceneURL)
        .ignoresSafeArea(.all)
        .allowsHitTesting(true) // interactions activées

      // Votre contenu par dessus
      VStack { ... }
    }
  }
}`,
  },
  {
    id: "lottie",
    icon: Sparkles,
    name: "MCP Lottie / Rive",
    tagline: "Animations certifiées · Interactivité · Performance",
    description: "Animations 2D légères (Lottie) et interactives (Rive) directement intégrées. Décrivez l'animation en langage naturel, Zunau génère le fichier et l'intègre. Performance native garantie.",
    badge: "Animation",
    badgeVariant: "orange" as const,
    color: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/30",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
    modules: ["Lottie iOS natif", "Rive interactif", "Génération depuis prompt", "Optimisation automatique", "Boucles et triggers", "Dark mode adaptatif"],
    code: `// MCP Lottie + Rive — Animations natives
// Généré depuis votre description naturelle

import Lottie
import RiveRuntime
import SwiftUI

// Lottie — animations JSON légères
struct LoadingAnimation: View {
  var body: some View {
    LottieView(name: "loading_dots")
      .playing(loopMode: .loop)
      .frame(width: 120, height: 60)
  }
}

// Rive — animations interactives
struct OnboardingCharacter: View {
  @State private var riveViewModel = RiveViewModel(
    fileName: "character",
    stateMachineName: "CharacterMachine"
  )

  var body: some View {
    riveViewModel.view()
      .onTapGesture {
        riveViewModel.triggerInput("wave") // interactive
      }
  }
}`,
  },
  {
    id: "figma",
    icon: Figma,
    name: "MCP Figma → Swift",
    tagline: "Design to code · Tokens sync · Composants auto",
    description: "Le chainon manquant entre designers et développeurs iOS. Importez votre design Figma, Zunau génère les composants SwiftUI correspondants avec vos tokens de design préservés.",
    badge: "Bêta",
    badgeVariant: "green" as const,
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30",
    iconBg: "bg-pink-500/20",
    iconColor: "text-pink-400",
    modules: ["Import frames Figma", "Tokens → SwiftUI styles", "Composants auto-générés", "Variables → @State", "Assets exportés", "Dark mode déduit"],
    code: `// MCP Figma → Swift
// Votre design Figma devient du vrai SwiftUI

// Token Figma → Design Token Swift
extension Color {
  // Généré depuis vos variables Figma
  static let brandPrimary = Color(hex: "#7C3AED")
  static let surfaceElevated = Color(
    light: .white,
    dark: Color(hex: "#1C1C1E")
  )
}

// Composant Figma → SwiftUI View
// "ProfileCard" dans Figma → ProfileCardView.swift
struct ProfileCardView: View {
  // Spacing tokens depuis Figma
  private let cornerRadius: CGFloat = 20 // Figma: border-radius
  private let padding: CGFloat = 16      // Figma: spacing/md

  var body: some View {
    // Fidèle à 100% au design Figma
    VStack(alignment: .leading, spacing: padding) { ... }
      .cornerRadius(cornerRadius)
  }
}`,
  },
  {
    id: "realtime",
    icon: Activity,
    name: "MCP Realtime",
    tagline: "Live sync · Présence · Broadcast · Reconnexion",
    description: "Données synchronisées en temps réel sur tous les appareils. Présence utilisateur (qui est en ligne), broadcast de messages, et reconnexion automatique sur mobile — gestion que le MCP générique Supabase ne fait pas.",
    badge: "Premium",
    badgeVariant: "purple" as const,
    color: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/30",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
    modules: ["Subscriptions temps réel", "Présence utilisateur", "Broadcast inter-clients", "Reconnexion automatique", "État offline gracieux", "Conflits résolus"],
    code: `// MCP Realtime — Reconnexion mobile certifiée
// Le bug que le MCP générique ne résout pas

import Supabase
import ComposableArchitecture

@Reducer
struct RealtimeFeature {
  struct State: Equatable {
    var messages: [Message] = []
    var isConnected = false
  }

  var body: some ReducerOf<Self> {
    Reduce { state, action in
      case .subscribe:
        return .run { send in
          let channel = supabase.realtimeV2
            .channel("messages")

          channel.onPostgresChanges(
            AnyAction.self,
            table: "messages"
          ) { change in
            await send(.messageReceived(change))
          }

          // Reconnexion automatique sur mobile
          channel.onDisconnect {
            await send(.reconnect)
          }

          await channel.subscribe()
        }
    }
  }
}`,
  },
];

export default function MCPModules() {
  const [active, setActive] = useState("supabase");
  const activeModule = modules.find((m) => m.id === active)!;

  return (
    <section className="py-24 relative overflow-hidden" id="mcp-modules">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="green" className="mb-4">
            <Zap size={13} />
            MCPs pré-certifiés
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Des modules validés,
            <br />
            <span className="gradient-text">pas des intégrations fragiles</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Chaque MCP Zunau est un bloc certifié — testé, optimisé pour iOS natif, et exempt des erreurs
            d&apos;intégration que vous rencontrez avec les autres outils. L&apos;IA assemble, elle ne réinvente jamais.
          </p>
        </div>

        {/* Module selector + preview */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — module list */}
          <div className="space-y-2">
            {modules.map((mod) => {
              const Icon = mod.icon;
              const isActive = mod.id === active;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActive(mod.id)}
                  className={`w-full text-left rounded-2xl p-4 transition-all border ${
                    isActive
                      ? `${mod.color} ${mod.border} shadow-lg`
                      : "glass-card hover:border-white/15"
                  } cursor-pointer`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${isActive ? mod.iconBg : "bg-white/5"} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={18} className={isActive ? mod.iconColor : "text-slate-500"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`font-semibold text-sm ${isActive ? "text-white" : "text-slate-300"}`}>{mod.name}</p>
                        <Badge
                          variant={mod.badgeVariant}
                          className="text-[9px] px-1.5 py-0.5"
                        >
                          {mod.badge}
                        </Badge>
                      </div>
                      <p className="text-slate-500 text-xs truncate mt-0.5">{mod.tagline}</p>
                    </div>
                    {isActive && <ChevronRight size={16} className={mod.iconColor} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right — active module detail */}
          <div className="lg:col-span-2 space-y-5">
            {/* Description card */}
            <Card className={`border ${activeModule.border} ${activeModule.color}`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${activeModule.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <activeModule.icon size={24} className={activeModule.iconColor} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-xl">{activeModule.name}</h3>
                    <Badge variant={activeModule.badgeVariant}>{activeModule.badge}</Badge>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{activeModule.description}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mt-5 grid grid-cols-2 gap-2">
                {activeModule.modules.map((feat) => (
                  <div key={feat} className="flex items-center gap-2">
                    <Check size={13} className="text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-400 text-xs">{feat}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Code preview */}
            <CodeWindow
              title={`${activeModule.name.replace("MCP ", "")}.swift — Certifié v1`}
              code={activeModule.code}
              language="Swift"
              className="max-h-[380px] overflow-y-auto scrollbar-thin"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 glass-card rounded-3xl p-8 text-center border-violet-500/15">
          <h3 className="text-white font-bold text-2xl mb-3">
            Celox Registry — le catalogue MCP communautaire
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto mb-6 text-sm">
            Developers can publish their own certified MCPs. Every module published earns revenue.
            Zunau is not just a tool — it&apos;s an economy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["MCP 100ms Streaming", "MCP RevenueCat", "MCP Mixpanel", "MCP SpriteKit Games", "MCP Mapbox", "MCP + vos MCPs"].map((tag, i) => (
              <span
                key={tag}
                className={`text-xs px-3 py-1.5 rounded-full border ${
                  i === 5
                    ? "border-violet-500/40 text-violet-400 bg-violet-500/10"
                    : "border-white/10 text-slate-400 bg-white/5"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
