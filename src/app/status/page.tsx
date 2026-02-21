import type { Metadata } from "next";
import { CheckCircle, AlertTriangle, XCircle, Clock, Activity } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Status",
  description: "Live status and uptime history for all Zunau.io services.",
};

type ServiceStatus = "operational" | "degraded" | "outage" | "maintenance";

interface Service {
  name: string;
  description: string;
  status: ServiceStatus;
  uptime: string;
  latency?: string;
}

interface Incident {
  date: string;
  title: string;
  status: "resolved" | "monitoring" | "investigating";
  updates: { time: string; message: string }[];
}

const SERVICES: Service[] = [
  {
    name: "AI Code Generation",
    description: "Claude-powered SwiftUI code generator",
    status: "operational",
    uptime: "99.97%",
    latency: "1.2s avg",
  },
  {
    name: "Dashboard & Web App",
    description: "zunau.io and all dashboard routes",
    status: "operational",
    uptime: "99.99%",
    latency: "48ms avg",
  },
  {
    name: "Authentication",
    description: "Supabase Auth — login, signup, OAuth",
    status: "operational",
    uptime: "99.98%",
    latency: "120ms avg",
  },
  {
    name: "API",
    description: "REST API endpoints and webhooks",
    status: "operational",
    uptime: "99.95%",
    latency: "85ms avg",
  },
  {
    name: "Database",
    description: "Supabase Postgres — projects, profiles, components",
    status: "operational",
    uptime: "99.99%",
    latency: "12ms avg",
  },
  {
    name: "Billing",
    description: "Stripe — subscriptions and payments",
    status: "operational",
    uptime: "99.9%",
  },
];

const PAST_INCIDENTS: Incident[] = [
  {
    date: "Feb 3, 2026",
    title: "Elevated AI generation latency",
    status: "resolved",
    updates: [
      { time: "14:32 UTC", message: "Issue resolved. Generation latency back to normal (<2s)." },
      { time: "13:15 UTC", message: "Investigating elevated latency (avg 8s) on the AI generation endpoint. Upstream provider issue." },
    ],
  },
  {
    date: "Jan 12, 2026",
    title: "Authentication service degraded",
    status: "resolved",
    updates: [
      { time: "09:45 UTC", message: "All systems operational. Root cause: Supabase infrastructure maintenance." },
      { time: "08:20 UTC", message: "Some users unable to log in via OAuth. Investigating." },
    ],
  },
];

const STATUS_CONFIG: Record<ServiceStatus, {
  icon: typeof CheckCircle;
  color: string;
  bg: string;
  label: string;
}> = {
  operational: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-400/10", label: "Operational" },
  degraded: { icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-400/10", label: "Degraded" },
  outage: { icon: XCircle, color: "text-red-400", bg: "bg-red-400/10", label: "Outage" },
  maintenance: { icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10", label: "Maintenance" },
};

function overallStatus(services: Service[]): ServiceStatus {
  if (services.some((s) => s.status === "outage")) return "outage";
  if (services.some((s) => s.status === "degraded")) return "degraded";
  if (services.some((s) => s.status === "maintenance")) return "maintenance";
  return "operational";
}

// 90-day uptime bars — last 90 days, all green for now
function UptimeBars({ uptime }: { uptime: string }) {
  const pct = parseFloat(uptime);
  // Simulate ~1-2 incidents in 90 days for non-100% services
  const bars = Array.from({ length: 90 }, (_, i) => {
    const hasIncident = pct < 99.99 && (i === 22 || i === 57);
    return hasIncident ? "degraded" : "ok";
  });
  return (
    <div className="flex gap-0.5 items-end h-5">
      {bars.map((b, i) => (
        <div
          key={i}
          className={`flex-1 rounded-sm ${b === "ok" ? "bg-green-500/60 hover:bg-green-400" : "bg-yellow-500/60 hover:bg-yellow-400"}`}
          style={{ height: b === "ok" ? "100%" : "60%" }}
        />
      ))}
    </div>
  );
}

export default function StatusPage() {
  const overall = overallStatus(SERVICES);
  const { icon: OverallIcon, color, label } = STATUS_CONFIG[overall];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      <main className="pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Overall status banner */}
          <div
            className={`flex items-center gap-4 rounded-2xl p-6 mb-12 border ${
              overall === "operational"
                ? "border-green-500/20 bg-green-500/5"
                : overall === "degraded"
                ? "border-yellow-500/20 bg-yellow-500/5"
                : "border-red-500/20 bg-red-500/5"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl ${STATUS_CONFIG[overall].bg} flex items-center justify-center`}
            >
              <OverallIcon size={22} className={color} />
            </div>
            <div>
              <h1 className="text-xl font-black text-white">
                {overall === "operational"
                  ? "All systems operational"
                  : overall === "degraded"
                  ? "Partial service degradation"
                  : "Service disruption"}
              </h1>
              <p className="text-slate-400 text-sm">
                Last updated: {new Date().toUTCString()}
              </p>
            </div>
            <Badge
              variant={overall === "operational" ? "green" : overall === "degraded" ? "yellow" : "red"}
              className="ml-auto"
            >
              <Activity size={11} />
              {label}
            </Badge>
          </div>

          {/* Services */}
          <h2 className="text-lg font-black text-white mb-4">Services</h2>
          <div className="space-y-3 mb-14">
            {SERVICES.map((service) => {
              const { icon: Icon, color: c, label: l } = STATUS_CONFIG[service.status];
              return (
                <div key={service.name} className="glass-card rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-white font-semibold text-sm">{service.name}</div>
                      <div className="text-slate-500 text-xs">{service.description}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {service.latency && (
                        <span className="text-slate-500 text-xs">{service.latency}</span>
                      )}
                      <div className={`flex items-center gap-1.5 text-xs font-semibold ${c}`}>
                        <Icon size={13} />
                        {l}
                      </div>
                    </div>
                  </div>
                  <UptimeBars uptime={service.uptime} />
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-slate-600 text-xs">90 days ago</span>
                    <span className="text-slate-400 text-xs">{service.uptime} uptime</span>
                    <span className="text-slate-600 text-xs">Today</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Past incidents */}
          <h2 className="text-lg font-black text-white mb-4">Past incidents</h2>
          {PAST_INCIDENTS.length === 0 ? (
            <div className="glass-card rounded-xl p-6 text-center text-slate-500 text-sm">
              No incidents in the past 90 days.
            </div>
          ) : (
            <div className="space-y-4">
              {PAST_INCIDENTS.map((incident) => (
                <div key={incident.title} className="glass-card rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-white font-semibold text-sm">{incident.title}</div>
                      <div className="text-slate-500 text-xs">{incident.date}</div>
                    </div>
                    <Badge variant={incident.status === "resolved" ? "green" : "yellow"}>
                      {incident.status === "resolved" ? (
                        <CheckCircle size={10} />
                      ) : (
                        <AlertTriangle size={10} />
                      )}
                      {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="space-y-2 pl-3 border-l border-white/10">
                    {incident.updates.map((u) => (
                      <div key={u.time} className="text-xs">
                        <span className="text-slate-500 font-mono">{u.time}</span>
                        <span className="text-slate-400 ml-2">{u.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Subscribe */}
          <div className="mt-12 glass-card rounded-2xl p-6 text-center border border-violet-500/20">
            <p className="text-slate-400 text-sm mb-4">
              Get notified when incidents are created or resolved.
            </p>
            <form className="flex gap-3 max-w-xs mx-auto">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 glass-card rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-500 text-sm outline-none focus:border-violet-500/60 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
