import type { Metadata } from "next";
import { Search, Filter, Star, Download, Eye, Layers } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export const metadata: Metadata = { title: "Component Library — Zunau.io Dashboard" };

const categories = ["All", "Navigation", "Forms", "Cards", "Charts", "Modals", "Animations", "Lists", "Media"];

const components = [
  { name: "GradientCard", category: "Cards", uses: 2341, stars: 4.9, preview: "🎨", tags: ["SwiftUI", "Gradient"], isNew: false, isPro: false },
  { name: "AnimatedTabBar", category: "Navigation", uses: 1892, stars: 4.8, preview: "📑", tags: ["Animation", "TabView"], isNew: true, isPro: false },
  { name: "LineChart", category: "Charts", uses: 1654, stars: 4.7, preview: "📈", tags: ["Charts", "SwiftCharts"], isNew: false, isPro: true },
  { name: "SearchableList", category: "Lists", uses: 1432, stars: 4.9, preview: "🔍", tags: ["List", "Search"], isNew: false, isPro: false },
  { name: "OnboardingFlow", category: "Navigation", uses: 1287, stars: 4.8, preview: "🚀", tags: ["TabView", "PageStyle"], isNew: false, isPro: false },
  { name: "PieChart", category: "Charts", uses: 1156, stars: 4.6, preview: "🥧", tags: ["Charts", "SwiftCharts"], isNew: false, isPro: true },
  { name: "MediaPlayer", category: "Media", uses: 987, stars: 4.7, preview: "🎵", tags: ["AVKit", "Audio"], isNew: true, isPro: true },
  { name: "FloatingActionButton", category: "Forms", uses: 876, stars: 4.5, preview: "⚡", tags: ["Button", "Animation"], isNew: false, isPro: false },
  { name: "SwipeableCard", category: "Cards", uses: 754, stars: 4.8, preview: "🃏", tags: ["Gesture", "DragGesture"], isNew: true, isPro: false },
];

export default function ComponentsPage() {
  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-2xl">Component Library</h2>
          <p className="text-slate-500 text-sm">500+ production-ready SwiftUI components</p>
        </div>
        <Button size="sm">
          <Layers size={15} />
          Submit Component
        </Button>
      </div>

      {/* Search & filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="glass-card rounded-xl flex items-center gap-2 px-3 py-2.5 flex-1 max-w-xs">
          <Search size={15} className="text-slate-500" />
          <input type="text" placeholder="Search components..." className="bg-transparent text-slate-300 placeholder-slate-500 text-sm outline-none flex-1" />
        </div>
        <Button variant="ghost" size="sm"><Filter size={15} />Filter</Button>
        <div className="flex gap-1 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} className={"text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer border " + (cat === "All" ? "bg-violet-500/20 text-violet-300 border-violet-500/30" : "text-slate-500 border-white/5 hover:text-slate-300 hover:border-white/10")}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {components.map((comp) => (
          <div key={comp.name} className="glass-card rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all hover:-translate-y-0.5 group cursor-pointer">
            {/* Preview */}
            <div className="h-28 bg-gradient-to-br from-violet-900/30 to-blue-900/30 border-b border-white/5 flex items-center justify-center text-5xl relative">
              {comp.preview}
              {comp.isNew && (
                <div className="absolute top-2 right-2">
                  <Badge variant="green" className="text-[10px]">New</Badge>
                </div>
              )}
              {comp.isPro && (
                <div className="absolute top-2 left-2">
                  <Badge variant="purple" className="text-[10px]">Pro</Badge>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-semibold text-sm group-hover:text-violet-300 transition-colors">{comp.name}</h3>
                <div className="flex items-center gap-1 text-xs text-amber-400">
                  <Star size={11} className="fill-amber-400" />
                  {comp.stars}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {comp.tags.map((tag) => (
                  <span key={tag} className="text-[10px] bg-white/5 text-slate-400 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-xs flex items-center gap-1">
                  <Download size={11} /> {comp.uses.toLocaleString()} uses
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-violet-300 transition-colors cursor-pointer">
                    <Eye size={13} />
                  </button>
                  <button className="p-1.5 rounded-lg bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 transition-colors cursor-pointer">
                    <Download size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-8">
        <Button variant="secondary">Load more components</Button>
      </div>
    </div>
  );
}
