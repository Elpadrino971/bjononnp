"use client";
import { useState } from "react";
import {
  Database, CreditCard, Box, Sparkles, Figma,
  Activity, Check, Plus, Shield, Lock, Info,
  Cpu
} from "lucide-react";
import Badge from "@/components/ui/Badge";

interface MCPModule {
  id: string;
  icon: React.ElementType;
  name: string;
  description: string;
  badge?: string;
  badgeVariant?: "purple" | "blue" | "green" | "orange" | "cyan";
  required?: boolean;
  tier: "free" | "pro" | "team";
  iconColor: string;
  iconBg: string;
  borderActive: string;
  bgActive: string;
  subModules: string[];
}

const MCP_MODULES: MCPModule[] = [
  {
    id: "supabase-auth",
    icon: Lock,
    name: "Auth + Profils",
    description: "Sign in with Apple, Google, Email. Table profiles séparée, RLS préconfigurée.",
    required: true,
    tier: "free",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/20",
    borderActive: "border-violet-500/40",
    bgActive: "bg-violet-500/10",
    subModules: ["Sign in with Apple", "Sign in with Google", "Email/Password", "Profiles table", "RLS auto"],
  },
  {
    id: "supabase-db",
    icon: Database,
    name: "Base de données",
    description: "Tables Supabase, requêtes typées, migrations versionnées.",
    tier: "free",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/20",
    borderActive: "border-emerald-500/40",
    bgActive: "bg-emerald-500/10",
    subModules: ["Tables auto", "Types Swift générés", "CRUD certifié", "Migrations"],
  },
  {
    id: "supabase-realtime",
    icon: Activity,
    name: "Realtime",
    description: "Subscriptions live, présence utilisateur, reconnexion mobile automatique.",
    tier: "pro",
    badge: "Pro",
    badgeVariant: "purple",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/20",
    borderActive: "border-blue-500/40",
    bgActive: "bg-blue-500/10",
    subModules: ["Subscriptions", "Présence", "Broadcast", "Reconnexion auto"],
  },
  {
    id: "stripe",
    icon: CreditCard,
    name: "Paiements Stripe",
    description: "StoreKit 2 iOS natif + webhooks serveur validés. Abonnements, in-app.",
    tier: "pro",
    badge: "Pro",
    badgeVariant: "blue",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/20",
    borderActive: "border-cyan-500/40",
    bgActive: "bg-cyan-500/10",
    subModules: ["StoreKit 2", "Webhooks validés", "Abonnements", "Connect marketplace"],
  },
  {
    id: "spline",
    icon: Box,
    name: "Spline 3D",
    description: "Scènes 3D interactives Metal natif. iPhone, iPad, visionOS ready.",
    tier: "pro",
    badge: "Pro",
    badgeVariant: "cyan",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/20",
    borderActive: "border-orange-500/40",
    bgActive: "bg-orange-500/10",
    subModules: ["Metal natif", "Interactive", "visionOS", "RAM optimisé"],
  },
  {
    id: "lottie-rive",
    icon: Sparkles,
    name: "Lottie / Rive",
    description: "Animations 2D légères et interactives. Générées depuis votre description.",
    tier: "pro",
    badge: "Pro",
    badgeVariant: "orange",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/20",
    borderActive: "border-pink-500/40",
    bgActive: "bg-pink-500/10",
    subModules: ["Lottie JSON", "Rive interactif", "Triggers typés", "Dark mode"],
  },
  {
    id: "figma",
    icon: Figma,
    name: "Figma → SwiftUI",
    description: "Importez vos frames Figma. Tokens de design préservés automatiquement.",
    tier: "team",
    badge: "Bêta",
    badgeVariant: "green",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/20",
    borderActive: "border-rose-500/40",
    bgActive: "bg-rose-500/10",
    subModules: ["Frames → Views", "Tokens → Styles", "Assets auto", "Dark mode déduit"],
  },
  {
    id: "storage",
    icon: Database,
    name: "Storage",
    description: "Buckets Supabase pour images, avatars, fichiers. Accès sécurisé par RLS.",
    tier: "free",
    iconColor: "text-teal-400",
    iconBg: "bg-teal-500/20",
    borderActive: "border-teal-500/40",
    bgActive: "bg-teal-500/10",
    subModules: ["Buckets public/privé", "Upload images", "Avatars", "RLS storage"],
  },
];

interface MCPSelectorProps {
  onSelectionChange?: (selected: string[]) => void;
  userPlan?: "free" | "pro" | "team";
}

export default function MCPSelector({
  onSelectionChange,
  userPlan = "pro",
}: MCPSelectorProps) {
  const [selected, setSelected] = useState<string[]>(["supabase-auth"]);
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);

  const planOrder = { free: 0, pro: 1, team: 2 };
  const userPlanLevel = planOrder[userPlan];

  function toggleModule(id: string, tier: string) {
    const modulePlanLevel = planOrder[tier as keyof typeof planOrder];
    if (modulePlanLevel > userPlanLevel) return; // Locked

    setSelected((prev) => {
      const next = prev.includes(id)
        ? prev.filter((m) => m !== id)
        : [...prev, id];
      onSelectionChange?.(next);
      return next;
    });
  }

  function isLocked(tier: string) {
    return planOrder[tier as keyof typeof planOrder] > userPlanLevel;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-bold text-sm">MCPs certifiés</h3>
          <p className="text-slate-500 text-xs mt-0.5">
            Activez les modules. L&apos;IA ne génère que dans leur périmètre.
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield size={13} className="text-emerald-400" />
          <span className="text-emerald-400 text-xs font-medium">Protocole v1 certifié</span>
        </div>
      </div>

      {/* Protocol base — always active */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-500/5 border border-violet-500/20">
        <Cpu size={16} className="text-violet-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-violet-300 text-xs font-semibold">TCA Protocol Base</p>
          <p className="text-slate-500 text-[11px]">Architecture Apple certifiée — toujours active, jamais modifiée</p>
        </div>
        <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
          <Check size={10} className="text-emerald-400" />
        </div>
      </div>

      {/* Modules grid */}
      <div className="grid grid-cols-1 gap-2">
        {MCP_MODULES.map((mod) => {
          const Icon = mod.icon;
          const isSelected = selected.includes(mod.id);
          const locked = isLocked(mod.tier);

          return (
            <div
              key={mod.id}
              onClick={() => !locked && !mod.required && toggleModule(mod.id, mod.tier)}
              onMouseEnter={() => setHoveredInfo(mod.id)}
              onMouseLeave={() => setHoveredInfo(null)}
              className={`
                relative flex items-start gap-3 rounded-xl px-4 py-3 border transition-all
                ${locked
                  ? "opacity-50 cursor-not-allowed border-white/5 bg-white/2"
                  : mod.required
                  ? `border-violet-500/30 bg-violet-500/5 cursor-default`
                  : isSelected
                  ? `${mod.borderActive} ${mod.bgActive} cursor-pointer`
                  : "border-white/8 hover:border-white/15 bg-white/2 cursor-pointer"
                }
              `}
            >
              <div className={`w-8 h-8 rounded-lg ${mod.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon size={16} className={mod.iconColor} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-semibold ${isSelected || mod.required ? "text-white" : "text-slate-300"}`}>
                    {mod.name}
                  </span>
                  {mod.required && (
                    <Badge variant="purple" className="text-[9px] px-1.5 py-0.5">Requis</Badge>
                  )}
                  {mod.badge && !mod.required && (
                    <Badge variant={mod.badgeVariant} className="text-[9px] px-1.5 py-0.5">
                      {mod.badge}
                    </Badge>
                  )}
                  {locked && (
                    <Badge variant="orange" className="text-[9px] px-1.5 py-0.5">
                      Upgrade
                    </Badge>
                  )}
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">{mod.description}</p>

                {/* Sub-modules shown on hover or when selected */}
                {(isSelected || hoveredInfo === mod.id) && !locked && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {mod.subModules.map((sub) => (
                      <span key={sub} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                        {sub}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Toggle */}
              {!locked && (
                <div className={`
                  w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all
                  ${mod.required
                    ? "bg-violet-500/30 border-violet-500/50"
                    : isSelected
                    ? "bg-emerald-500 border-emerald-400"
                    : "border-white/20 bg-transparent"
                  }
                `}>
                  {(isSelected || mod.required) ? (
                    <Check size={11} className="text-white" />
                  ) : (
                    <Plus size={11} className="text-slate-500" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="px-4 py-3 rounded-xl bg-white/3 border border-white/8">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{selected.length} MCPs activés • {selected.length + 1} packages Swift</span>
          <span className="text-emerald-400 font-medium">Zéro conflit de version</span>
        </div>
      </div>
    </div>
  );
}
