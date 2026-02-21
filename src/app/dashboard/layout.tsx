import DashboardNav from "@/components/dashboard/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#0a0a0f] overflow-hidden">
      <DashboardNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#09090f]/80 backdrop-blur-sm flex-shrink-0">
          <div>
            <h1 className="text-white font-bold text-base">Dashboard</h1>
            <p className="text-slate-500 text-xs">Welcome back, Alex</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 rounded-lg px-3 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI Ready
            </div>
            <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full border border-[#09090f]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
              AJ
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
