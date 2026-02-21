import type { Metadata } from "next";
import { User, CreditCard, Bell, Shield, Key, Palette, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Settings — Zunau.io Dashboard" };

export default function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-white font-bold text-2xl">Settings</h2>
        <p className="text-slate-500 text-sm">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <User size={18} className="text-violet-400" />
          <h3 className="text-white font-bold">Profile</h3>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-blue-400 flex items-center justify-center text-white text-xl font-bold">AJ</div>
          <div>
            <Button variant="secondary" size="sm">Upload photo</Button>
            <p className="text-slate-500 text-xs mt-1">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: "First name", value: "Alex", type: "text" },
            { label: "Last name", value: "Johnson", type: "text" },
            { label: "Email address", value: "alex@company.com", type: "email" },
            { label: "Username", value: "alexj", type: "text" },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">{field.label}</label>
              <input
                type={field.type}
                defaultValue={field.value}
                className="w-full glass-card rounded-xl px-4 py-2.5 text-slate-200 text-sm outline-none focus:border-violet-500/60 transition-colors"
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Bio</label>
          <textarea
            rows={3}
            defaultValue="iOS developer building beautiful apps with SwiftUI and Zunau.io"
            className="w-full glass-card rounded-xl px-4 py-2.5 text-slate-200 text-sm outline-none focus:border-violet-500/60 transition-colors resize-none"
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button size="sm">Save changes</Button>
        </div>
      </div>

      {/* Plan & Billing */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard size={18} className="text-violet-400" />
          <h3 className="text-white font-bold">Plan & Billing</h3>
        </div>
        <div className="flex items-center justify-between p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-bold">Pro Plan</span>
              <Badge variant="purple"><Zap size={11} /> Active</Badge>
            </div>
            <p className="text-slate-400 text-sm">$19/month · Next billing March 1, 2026</p>
          </div>
          <Button variant="secondary" size="sm">Manage</Button>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { label: "Generations Used", value: "847", max: "Unlimited" },
            { label: "Storage Used", value: "1.2 GB", max: "5 GB" },
            { label: "Projects", value: "3", max: "Unlimited" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 rounded-xl p-3">
              <p className="text-slate-400 text-xs mb-1">{s.label}</p>
              <p className="text-white font-bold">{s.value}</p>
              <p className="text-slate-500 text-xs">of {s.max}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell size={18} className="text-violet-400" />
          <h3 className="text-white font-bold">Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: "Generation complete", desc: "When your AI generation finishes", enabled: true },
            { label: "Export ready", desc: "When your Xcode project is ready to download", enabled: true },
            { label: "Team activity", desc: "When teammates make changes to shared projects", enabled: false },
            { label: "New features", desc: "Product updates and new feature announcements", enabled: true },
            { label: "Billing alerts", desc: "Invoice and payment notifications", enabled: true },
          ].map((notif) => (
            <div key={notif.label} className="flex items-center justify-between py-2">
              <div>
                <p className="text-slate-200 text-sm font-medium">{notif.label}</p>
                <p className="text-slate-500 text-xs">{notif.desc}</p>
              </div>
              <button
                className={"relative w-11 h-6 rounded-full transition-all cursor-pointer " + (notif.enabled ? "bg-violet-600" : "bg-white/10")}
              >
                <div className={"absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all " + (notif.enabled ? "left-6" : "left-1")} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* API Keys */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Key size={18} className="text-violet-400" />
            <h3 className="text-white font-bold">API Keys</h3>
          </div>
          <Button variant="secondary" size="sm">Generate New Key</Button>
        </div>
        <div className="space-y-3">
          {[
            { name: "Production", key: "znau_prod_••••••••••••••••7f2a", created: "Jan 15, 2026", last: "2 hours ago" },
            { name: "Development", key: "znau_dev_••••••••••••••••3c9e", created: "Jan 10, 2026", last: "Yesterday" },
          ].map((apiKey) => (
            <div key={apiKey.name} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium text-sm">{apiKey.name}</span>
                  <Badge variant="green" className="text-[10px] px-1.5 py-0.5">Active</Badge>
                </div>
                <p className="text-slate-500 font-mono text-xs">{apiKey.key}</p>
                <p className="text-slate-600 text-xs mt-0.5">Created {apiKey.created} · Last used {apiKey.last}</p>
              </div>
              <Button variant="danger" size="sm">Revoke</Button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="glass-card rounded-2xl p-6 border-red-500/20">
        <div className="flex items-center gap-3 mb-4">
          <Shield size={18} className="text-red-400" />
          <h3 className="text-white font-bold">Danger Zone</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
            <div>
              <p className="text-white text-sm font-medium">Delete all projects</p>
              <p className="text-slate-500 text-xs">This action cannot be undone.</p>
            </div>
            <Button variant="danger" size="sm">Delete All</Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
            <div>
              <p className="text-white text-sm font-medium">Delete account</p>
              <p className="text-slate-500 text-xs">Permanently remove your account and all data.</p>
            </div>
            <Button variant="danger" size="sm">Delete Account</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
