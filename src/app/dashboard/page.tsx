import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap, TrendingUp, Code2, Clock, ArrowRight,
  Plus, Star, GitBranch, Eye, Layers
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Dashboard — Zunau.io",
};

const recentProjects = [
  {
    name: "FitTrack Pro",
    description: "Fitness tracking app with HealthKit integration",
    lastEdited: "2 hours ago",
    status: "Active",
    screens: 12,
    components: 48,
    color: "from-violet-500 to-purple-600",
    icon: "🏋️",
  },
  {
    name: "WeatherVibes",
    description: "Beautiful weather app with dynamic backgrounds",
    lastEdited: "Yesterday",
    status: "Active",
    screens: 7,
    components: 31,
    color: "from-blue-500 to-cyan-500",
    icon: "🌤️",
  },
  {
    name: "TaskFlow",
    description: "Productivity app with SwiftData persistence",
    lastEdited: "3 days ago",
    status: "Draft",
    screens: 5,
    components: 22,
    color: "from-emerald-500 to-teal-500",
    icon: "✅",
  },
];

const stats = [
  { label: "AI Generations Used", value: "847", max: "∞", icon: Zap, color: "text-violet-400", progress: null, sub: "This month" },
  { label: "Total Projects", value: "3", max: "∞", icon: Layers, color: "text-blue-400", progress: null, sub: "Pro plan" },
  { label: "Components Created", value: "101", max: null, icon: Code2, color: "text-cyan-400", progress: null, sub: "All time" },
  { label: "Time Saved", value: "47h", max: null, icon: Clock, color: "text-emerald-400", progress: null, sub: "This month (est.)" },
];

const recentActivity = [
  { action: "Generated", target: "ProfileCardView.swift", project: "FitTrack Pro", time: "10 min ago", icon: "⚡" },
  { action: "Exported", target: "FitTrack Pro.xcodeproj", project: "FitTrack Pro", time: "2 hours ago", icon: "📦" },
  { action: "Generated", target: "WeatherDashboard.swift", project: "WeatherVibes", time: "Yesterday", icon: "⚡" },
  { action: "Created branch", target: "feature/dark-mode", project: "TaskFlow", time: "3 days ago", icon: "🌿" },
  { action: "Generated", target: "TaskListView.swift", project: "TaskFlow", time: "3 days ago", icon: "⚡" },
];

const quickPrompts = [
  "Create a onboarding screen with gradient and animations",
  "Build a settings screen with grouped sections",
  "Generate a tab bar with custom icons",
  "Design a card carousel with pagination",
  "Create a search bar with live filtering",
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl">
      {/* Usage banner */}
      <div className="glass-card rounded-2xl p-5 bg-gradient-to-r from-violet-600/10 to-blue-600/10 border-violet-500/20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-white font-bold mb-1">You&apos;re on the Pro plan</h3>
            <p className="text-slate-400 text-sm">Unlimited AI generations. Next billing: March 1, 2026.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="purple"><Zap size={12} /> Pro</Badge>
            <Link href="/pricing">
              <Button variant="secondary" size="sm">Upgrade to Team</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center`}>
                  <Icon size={18} className={stat.color} />
                </div>
                <TrendingUp size={14} className="text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
              <div className="text-[10px] text-slate-600 mt-0.5">{stat.sub}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Projects */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-bold text-lg">Recent Projects</h2>
            <Link href="/dashboard/projects" className="text-violet-400 text-sm hover:text-violet-300 transition-colors flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div
                key={project.name}
                className="glass-card rounded-2xl p-5 hover:border-violet-500/30 transition-all hover:-translate-y-0.5 group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-xl flex-shrink-0`}>
                    {project.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-white font-semibold group-hover:text-violet-300 transition-colors">{project.name}</h3>
                      <Badge
                        variant={project.status === "Active" ? "green" : "blue"}
                        className="text-[10px] px-2 py-0.5"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-slate-400 text-sm mb-3 truncate">{project.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Eye size={11} /> {project.screens} screens</span>
                      <span className="flex items-center gap-1"><Layers size={11} /> {project.components} components</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {project.lastEdited}</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-slate-600 group-hover:text-violet-400 transition-colors flex-shrink-0" />
                </div>
              </div>
            ))}

            {/* New project */}
            <button className="w-full glass-card rounded-2xl p-5 border-dashed border-white/10 hover:border-violet-500/30 transition-all text-center group cursor-pointer">
              <div className="flex items-center justify-center gap-2 text-slate-500 group-hover:text-violet-400 transition-colors">
                <Plus size={18} />
                <span className="text-sm font-medium">Create new project</span>
              </div>
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* AI Playground */}
          <Card className="p-5">
            <h3 className="text-white font-bold mb-3">Quick Generate</h3>
            <div className="space-y-2 mb-4">
              <textarea
                rows={3}
                placeholder="Describe a SwiftUI view..."
                className="w-full bg-[#0d0d1a] border border-white/5 rounded-xl px-3 py-2.5 text-slate-300 placeholder-slate-600 text-sm outline-none focus:border-violet-500/40 resize-none transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {["Dark mode", "Animations", "SF Symbols"].map((tag) => (
                <button key={tag} className="text-xs bg-white/5 text-slate-400 px-2.5 py-1 rounded-full hover:bg-violet-500/15 hover:text-violet-300 transition-colors cursor-pointer border border-white/5">
                  {tag}
                </button>
              ))}
            </div>
            <Button className="w-full" size="sm">
              <Zap size={14} />
              Generate SwiftUI
            </Button>
          </Card>

          {/* Quick prompts */}
          <Card className="p-5">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <Star size={15} className="text-amber-400" />
              Prompt ideas
            </h3>
            <ul className="space-y-2">
              {quickPrompts.map((prompt) => (
                <li key={prompt}>
                  <button className="w-full text-left text-xs text-slate-400 hover:text-violet-300 transition-colors py-1.5 px-2 rounded-lg hover:bg-violet-500/10 cursor-pointer">
                    {prompt}
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          {/* Activity */}
          <Card className="p-5">
            <h3 className="text-white font-bold mb-3">Recent Activity</h3>
            <ul className="space-y-3">
              {recentActivity.slice(0, 4).map((activity, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-sm flex-shrink-0 mt-0.5">{activity.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-300">
                      <span className="text-slate-500">{activity.action} </span>
                      <span className="font-mono text-violet-400 truncate">{activity.target}</span>
                    </p>
                    <p className="text-[10px] text-slate-600">{activity.time} · {activity.project}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
