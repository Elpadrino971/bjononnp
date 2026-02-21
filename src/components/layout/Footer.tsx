import Link from "next/link";
import { Zap, Github, Twitter, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Status", href: "/status" },
  ],
  Developers: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs/api" },
    { label: "Swift SDK", href: "/docs/sdk" },
    { label: "Examples", href: "/docs/examples" },
    { label: "Integrations", href: "/integrations" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Security", href: "/security" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com/zunau", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/zunauio", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/zunau", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@zunau", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="border-t border-violet-500/10 bg-[#08080f]">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-white font-bold text-xl">
                Zunau<span className="text-violet-400">.io</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-[200px]">
              The AI-powered vibe coding platform for SwiftUI. Build stunning iOS apps by describing your vision.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-violet-300 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white text-sm font-semibold mb-4">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 text-sm hover:text-slate-200 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 Zunau.io. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Built with</span>
            <span className="text-violet-400">SwiftUI</span>
            <span>&</span>
            <span className="text-violet-400">Next.js</span>
            <span>— Made for iOS developers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
