"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Smartphone, Gamepad2, ShoppingBag,
  Users, Video, Zap, Check, Cpu
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import MCPSelector from "@/components/dashboard/MCPSelector";

const APP_TYPES = [
  {
    id: "saas",
    icon: Zap,
    label: "SaaS / App mobile",
    description: "Auth, abonnements, base de données. Template universel.",
    mcpsDefault: ["supabase-auth", "supabase-db", "stripe"],
    color: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/30",
    iconColor: "text-violet-400",
  },
  {
    id: "social",
    icon: Users,
    label: "Réseau social",
    description: "Profils, feed, messages en temps réel, stories.",
    mcpsDefault: ["supabase-auth", "supabase-db", "supabase-realtime", "storage"],
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    label: "E-commerce",
    description: "Catalogue produits, panier, paiements, commandes.",
    mcpsDefault: ["supabase-auth", "supabase-db", "stripe", "storage"],
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    id: "streaming",
    icon: Video,
    label: "Streaming / Media",
    description: "HLS live, VOD, paywall, communauté.",
    mcpsDefault: ["supabase-auth", "supabase-db", "stripe", "supabase-realtime"],
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30",
    iconColor: "text-orange-400",
  },
  {
    id: "game",
    icon: Gamepad2,
    label: "Jeu mobile",
    description: "SpriteKit, leaderboards, in-app purchases, animations.",
    mcpsDefault: ["supabase-auth", "supabase-db", "stripe", "lottie-rive"],
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30",
    iconColor: "text-pink-400",
  },
  {
    id: "custom",
    icon: Smartphone,
    label: "Projet custom",
    description: "Partez de zéro et choisissez vos MCPs manuellement.",
    mcpsDefault: ["supabase-auth"],
    color: "from-slate-500/20 to-slate-600/20",
    border: "border-slate-500/30",
    iconColor: "text-slate-400",
  },
];

export default function NewProjectPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [projectName, setProjectName] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedMCPs, setSelectedMCPs] = useState<string[]>(["supabase-auth"]);

  const selectedTypeData = APP_TYPES.find((t) => t.id === selectedType);

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <button className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer">
            <ArrowLeft size={16} />
          </button>
        </Link>
        <div>
          <h1 className="text-white font-black text-xl">Nouveau projet</h1>
          <p className="text-slate-500 text-xs">Protocole TCA v1 + MCPs certifiés</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        {[
          { n: 1, label: "Type d'app" },
          { n: 2, label: "MCPs" },
          { n: 3, label: "Lancer" },
        ].map(({ n, label }) => (
          <div key={n} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
              step > n ? "bg-emerald-500 border-emerald-400 text-white" :
              step === n ? "bg-violet-600 border-violet-500 text-white" :
              "border-white/10 text-slate-600"
            }`}>
              {step > n ? <Check size={13} /> : n}
            </div>
            <span className={`text-xs ${step >= n ? "text-slate-300" : "text-slate-600"}`}>{label}</span>
            {n < 3 && <div className={`w-8 h-px ${step > n ? "bg-emerald-500/40" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1 — App type */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-white font-bold text-lg mb-1">Quel type d&apos;application ?</h2>
            <p className="text-slate-400 text-sm">Le protocole de base sera préconfiguré avec les MCPs les plus adaptés.</p>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Nom du projet..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm outline-none focus:border-violet-500/40 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {APP_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type.id);
                    setSelectedMCPs(type.mcpsDefault);
                  }}
                  className={`text-left rounded-2xl p-5 border transition-all cursor-pointer hover:-translate-y-0.5 ${
                    isSelected
                      ? `${type.color} ${type.border} shadow-lg`
                      : "glass-card hover:border-white/15"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-3`}>
                    <Icon size={20} className={type.iconColor} />
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isSelected ? "text-white" : "text-slate-200"}`}>
                    {type.label}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{type.description}</p>

                  {isSelected && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {type.mcpsDefault.map((mcp) => (
                        <span key={mcp} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                          {mcp.replace("supabase-", "").replace("-", " ")}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => setStep(2)}
              disabled={!selectedType || !projectName.trim()}
            >
              Configurer les MCPs
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2 — MCPs */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-white font-bold text-lg mb-1">MCPs certifiés</h2>
            <p className="text-slate-400 text-sm">
              Présélection pour &quot;{selectedTypeData?.label}&quot;. Ajustez selon vos besoins.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <MCPSelector
              onSelectionChange={setSelectedMCPs}
              userPlan="pro"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-slate-400 hover:text-white text-sm transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Retour
            </button>
            <Button onClick={() => setStep(3)}>
              Continuer
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3 — Launch */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-white font-bold text-lg mb-1">Prêt à vibe coder</h2>
            <p className="text-slate-400 text-sm">Votre protocole est configuré. Zunau va générer le squelette certifié.</p>
          </div>

          {/* Summary */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-500 text-xs mb-1">Projet</p>
                <p className="text-white font-bold">{projectName}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-1">Type</p>
                <p className="text-white font-bold">{selectedTypeData?.label}</p>
              </div>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-2">Architecture</p>
              <div className="flex items-center gap-2 text-sm">
                <Cpu size={14} className="text-violet-400" />
                <span className="text-violet-300">TCA Protocol v1</span>
                <span className="text-slate-600">+</span>
                <span className="text-slate-300">{selectedMCPs.length} MCPs certifiés</span>
              </div>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-2">MCPs activés</p>
              <div className="flex flex-wrap gap-2">
                {selectedMCPs.map((mcp) => (
                  <span key={mcp} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                    <Check size={10} />
                    {mcp.replace("supabase-", "").replace("-", " ")}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-4 py-3 bg-violet-500/5 border border-violet-500/15 rounded-xl">
              <p className="text-violet-300 text-xs font-medium mb-1">Ce que Zunau va générer</p>
              <ul className="space-y-1">
                {[
                  "AppFeature.swift — Root TCA reducer certifié",
                  "AuthFeature.swift — MCP Supabase Auth v1",
                  selectedMCPs.includes("stripe") && "PaymentsFeature.swift — MCP Stripe v1",
                  selectedMCPs.includes("supabase-realtime") && "RealtimeFeature.swift — MCP Realtime v1",
                  "Package.swift — toutes les dépendances résolues",
                  "Supabase migrations SQL — auto-appliquées",
                ].filter(Boolean).map((item) => (
                  <li key={String(item)} className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Check size={10} className="text-emerald-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="text-slate-400 hover:text-white text-sm transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Retour
            </button>
            <Button size="lg">
              <Zap size={16} />
              Générer le protocole
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
