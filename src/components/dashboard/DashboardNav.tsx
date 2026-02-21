"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap, LayoutDashboard, FolderOpen, Layers, Code2,
  Settings, HelpCircle, LogOut, ChevronDown, Bell,
  Plus, Search, ChevronsLeft, ChevronsRight
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FolderOpen, label: "Projects", href: "/dashboard/projects", badge: "3" },
  { icon: Code2, label: "Playground", href: "/dashboard/playground" },
  { icon: Layers, label: "Components", href: "/dashboard/components", badge: "New" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardNav() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen sticky top-0 bg-[#09090f] border-r border-violet-500/10 transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-2.5 px-4 py-5 border-b border-white/5", collapsed && "justify-center px-2")}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="text-white font-bold text-base">
            Zunau<span className="text-violet-400">.io</span>
          </span>
        )}
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 py-3 border-b border-white/5">
          <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
            <Search size={14} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-slate-300 placeholder-slate-500 text-xs outline-none flex-1"
            />
            <kbd className="text-slate-600 text-[10px] bg-white/5 px-1 rounded">⌘K</kbd>
          </div>
        </div>
      )}

      {/* New project */}
      <div className="px-3 py-3">
        <button
          className={cn(
            "w-full flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl transition-all hover:opacity-90 cursor-pointer",
            collapsed ? "justify-center p-2.5" : "px-3 py-2.5"
          )}
        >
          <Plus size={16} />
          {!collapsed && <span className="text-sm font-semibold">New Project</span>}
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all group",
                isActive
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon size={18} className={cn("flex-shrink-0", isActive && "text-violet-400")} />
              {!collapsed && (
                <>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant={item.badge === "New" ? "green" : "blue"}
                      className="text-[10px] px-1.5 py-0.5"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/5 p-3 space-y-1">
        <Link
          href="/docs"
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all",
            collapsed && "justify-center px-2"
          )}
        >
          <HelpCircle size={18} />
          {!collapsed && <span className="text-sm font-medium">Help & Docs</span>}
        </Link>

        {/* User */}
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/5 transition-all cursor-pointer group",
            collapsed && "justify-center px-2"
          )}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            AJ
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">Alex Johnson</p>
                <p className="text-slate-500 text-[10px] truncate">Pro Plan</p>
              </div>
              <ChevronDown size={14} className="text-slate-500 group-hover:text-slate-300" />
            </>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-600 hover:text-slate-400 hover:bg-white/5 transition-all cursor-pointer",
            collapsed && "justify-center px-2"
          )}
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
