"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

const navLinks = [
  {
    label: "Product",
    href: "/features",
    children: [
      { label: "AI Code Generation", href: "/features#ai-generation", desc: "Describe and generate SwiftUI" },
      { label: "Live Preview", href: "/features#live-preview", desc: "See changes in real-time" },
      { label: "Component Library", href: "/features#components", desc: "Thousands of SwiftUI components" },
      { label: "App Templates", href: "/features#templates", desc: "Start from proven templates" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-blur shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.7)] transition-all">
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Zunau<span className="text-violet-400">.io</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-slate-300 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.label ? "rotate-180" : ""}`} />}
                </Link>

                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="glass-card rounded-xl p-2 min-w-[260px] shadow-2xl shadow-black/50">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-violet-500/10 transition-colors group"
                        >
                          <span className="text-sm font-medium text-slate-200 group-hover:text-violet-300 transition-colors">
                            {child.label}
                          </span>
                          <span className="text-xs text-slate-500 mt-0.5">{child.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
              Sign in
            </Link>
            <Link href="/signup">
              <Button size="sm">
                Start Free
                <Zap size={14} />
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-slate-300 hover:text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden nav-blur border-t border-violet-500/10">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block text-slate-300 hover:text-white text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 space-y-1 mt-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block text-slate-400 hover:text-slate-200 text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
              <Link href="/login" className="text-slate-300 text-sm font-medium px-3 py-2.5">Sign in</Link>
              <Link href="/signup">
                <Button className="w-full">Start Free <Zap size={14} /></Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
