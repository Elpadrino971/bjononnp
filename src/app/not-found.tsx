import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ArrowLeft, Search, BookOpen, LayoutDashboard } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "This page doesn't exist.",
};

const QUICK_LINKS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Documentation", href: "/docs" },
  { icon: Search, label: "Pricing", href: "/pricing" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-16 relative">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        <span className="text-white font-bold text-xl">
          Zunau<span className="text-violet-400">.io</span>
        </span>
      </Link>

      <div className="relative text-center max-w-lg">
        {/* Big 404 */}
        <div className="text-[10rem] font-black leading-none gradient-text select-none mb-2">
          404
        </div>

        <h1 className="text-3xl font-black text-white mb-3">
          Page not found
        </h1>
        <p className="text-slate-400 mb-10">
          This page doesn&apos;t exist — or it may have moved. Head back home
          or jump straight to one of the links below.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Link href="/">
            <Button variant="primary" size="md">
              <ArrowLeft size={16} />
              Back home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary" size="md">
              Go to Dashboard
            </Button>
          </Link>
        </div>

        {/* Quick links */}
        <div className="flex items-center justify-center gap-6">
          {QUICK_LINKS.map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1.5 text-slate-500 hover:text-violet-400 text-sm transition-colors"
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
