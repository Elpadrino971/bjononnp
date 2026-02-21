import type { Metadata } from "next";
import { Plus, Search, Filter, Clock, Layers, Eye, MoreHorizontal, GitBranch } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Projects — Zunau.io Dashboard" };

const projects = [
  {
    name: "FitTrack Pro",
    description: "Fitness tracking app with HealthKit integration, workout logging, and progress charts",
    lastEdited: "2 hours ago",
    status: "Active",
    screens: 12,
    components: 48,
    color: "from-violet-500 to-purple-600",
    icon: "🏋️",
    branch: "main",
    collaborators: ["AJ", "SK"],
  },
  {
    name: "WeatherVibes",
    description: "Beautiful weather app with dynamic backgrounds and 7-day forecast with animations",
    lastEdited: "Yesterday",
    status: "Active",
    screens: 7,
    components: 31,
    color: "from-blue-500 to-cyan-500",
    icon: "🌤️",
    branch: "feature/hourly-forecast",
    collaborators: ["AJ"],
  },
  {
    name: "TaskFlow",
    description: "Productivity app with SwiftData persistence, tags, and custom reminders",
    lastEdited: "3 days ago",
    status: "Draft",
    screens: 5,
    components: 22,
    color: "from-emerald-500 to-teal-500",
    icon: "✅",
    branch: "main",
    collaborators: ["AJ"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-2xl">Projects</h2>
          <p className="text-slate-500 text-sm">3 of unlimited projects (Pro plan)</p>
        </div>
        <Button size="sm">
          <Plus size={16} />
          New Project
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 max-w-xs glass-card rounded-xl flex items-center gap-2 px-3 py-2.5">
          <Search size={15} className="text-slate-500" />
          <input type="text" placeholder="Search projects..." className="bg-transparent text-slate-300 placeholder-slate-500 text-sm outline-none flex-1" />
        </div>
        <Button variant="ghost" size="sm">
          <Filter size={15} />
          Filter
        </Button>
        <div className="flex gap-1 glass-card rounded-xl p-1">
          {["All", "Active", "Draft", "Archived"].map((f) => (
            <button key={f} className={"text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer " + (f === "All" ? "bg-violet-500/20 text-violet-300" : "text-slate-500 hover:text-slate-300")}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Project grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.name} className="glass-card rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all hover:-translate-y-0.5 group cursor-pointer">
            {/* Card header */}
            <div className={"h-20 bg-gradient-to-br " + project.color + " flex items-center justify-center text-4xl relative"}>
              {project.icon}
              <button className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/20 text-white/70 hover:text-white hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100 cursor-pointer">
                <MoreHorizontal size={15} />
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-bold text-base group-hover:text-violet-300 transition-colors">{project.name}</h3>
                <Badge variant={project.status === "Active" ? "green" : "blue"} className="text-[10px] px-2 py-0.5 flex-shrink-0 ml-2">
                  {project.status}
                </Badge>
              </div>

              <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>

              <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1"><Eye size={11} /> {project.screens} screens</span>
                <span className="flex items-center gap-1"><Layers size={11} /> {project.components} components</span>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {project.collaborators.map((c) => (
                      <div key={c} className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 border border-[#12121a] flex items-center justify-center text-white text-[9px] font-bold">
                        {c}
                      </div>
                    ))}
                  </div>
                  <span className="text-slate-600 text-xs flex items-center gap-1">
                    <GitBranch size={10} />{project.branch}
                  </span>
                </div>
                <span className="text-slate-600 text-xs flex items-center gap-1">
                  <Clock size={10} />{project.lastEdited}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* New project card */}
        <button className="glass-card rounded-2xl p-8 border-dashed border-white/10 hover:border-violet-500/30 transition-all flex flex-col items-center justify-center gap-3 text-center group cursor-pointer min-h-[240px]">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-all">
            <Plus size={22} className="text-violet-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm group-hover:text-violet-300 transition-colors">New Project</p>
            <p className="text-slate-500 text-xs mt-0.5">Start from scratch or a template</p>
          </div>
        </button>
      </div>

      {/* Templates section */}
      <div>
        <h3 className="text-white font-bold text-lg mb-4">Start from a template</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: "Social App", icon: "👥", desc: "Profiles, feed, messaging" },
            { name: "E-Commerce", icon: "🛒", desc: "Products, cart, checkout" },
            { name: "Dashboard", icon: "📊", desc: "Charts, analytics, data" },
            { name: "Onboarding", icon: "🚀", desc: "3-step with animations" },
          ].map((template) => (
            <button key={template.name} className="glass-card rounded-xl p-4 text-left hover:border-violet-500/30 transition-all group cursor-pointer">
              <div className="text-2xl mb-2">{template.icon}</div>
              <p className="text-white text-sm font-semibold group-hover:text-violet-300 transition-colors">{template.name}</p>
              <p className="text-slate-500 text-xs">{template.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
