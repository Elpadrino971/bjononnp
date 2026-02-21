import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, HelpCircle, Zap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for every iOS developer. Start free, scale as you grow.",
};

const comparisonFeatures = [
  { category: "AI Generation", features: [
    { name: "Monthly AI generations", starter: "25", pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited" },
    { name: "AI model quality", starter: "Standard", pro: "GPT-4o", team: "GPT-4o", enterprise: "Custom fine-tuned" },
    { name: "Context window", starter: "8K tokens", pro: "128K tokens", team: "128K tokens", enterprise: "200K tokens" },
    { name: "AI code review", starter: false, pro: true, team: true, enterprise: true },
  ]},
  { category: "Projects & Storage", features: [
    { name: "Active projects", starter: "3", pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited" },
    { name: "Storage per project", starter: "100MB", pro: "5GB", team: "20GB", enterprise: "Unlimited" },
    { name: "Asset management", starter: "Basic", pro: "Advanced", team: "Advanced", enterprise: "Advanced" },
    { name: "Project history", starter: "7 days", pro: "90 days", team: "1 year", enterprise: "Forever" },
  ]},
  { category: "Preview & Export", features: [
    { name: "Live SwiftUI preview", starter: true, pro: true, team: true, enterprise: true },
    { name: "Device frame previews", starter: "iPhone only", pro: "All devices", team: "All devices", enterprise: "All devices" },
    { name: "Xcode export", starter: true, pro: true, team: true, enterprise: true },
    { name: "SPM package export", starter: false, pro: true, team: true, enterprise: true },
    { name: "TestFlight deployment", starter: false, pro: true, team: true, enterprise: true },
  ]},
  { category: "Collaboration", features: [
    { name: "Team members", starter: "1", pro: "1", team: "Up to 10", enterprise: "Unlimited" },
    { name: "Shared component library", starter: false, pro: false, team: true, enterprise: true },
    { name: "Role-based permissions", starter: false, pro: false, team: true, enterprise: true },
    { name: "Real-time collaboration", starter: false, pro: false, team: true, enterprise: true },
  ]},
  { category: "Support", features: [
    { name: "Support channel", starter: "Community", pro: "Email", team: "Priority email", enterprise: "Dedicated Slack" },
    { name: "Response time", starter: "Best effort", pro: "24 hours", team: "4 hours", enterprise: "1 hour" },
    { name: "Onboarding assistance", starter: false, pro: false, team: "Group session", enterprise: "1-on-1 sessions" },
    { name: "SLA guarantee", starter: false, pro: false, team: false, enterprise: true },
  ]},
];

const faqs = [
  {
    q: "What counts as an 'AI generation'?",
    a: "Each time you ask Zunau to generate or significantly modify SwiftUI code, that counts as one generation. Small edits, syntax fixes, and minor tweaks do not consume your generation quota.",
  },
  {
    q: "Can I export my code and cancel my subscription?",
    a: "Yes, absolutely. Your code is always yours. You can export your complete Xcode project at any time, even after cancellation. We believe in no lock-in.",
  },
  {
    q: "What happens when I hit my generation limit?",
    a: "On the free plan, you'll be prompted to upgrade or wait until your quota resets on the 1st of each month. You'll never lose access to your existing projects or code.",
  },
  {
    q: "Do you offer student or non-profit discounts?",
    a: "Yes! We offer 50% off for verified students and 75% off for registered non-profit organizations. Contact us at discounts@zunau.io with your credentials.",
  },
  {
    q: "Is the generated SwiftUI code production-ready?",
    a: "Yes. Zunau generates idiomatic SwiftUI code that follows Apple's Human Interface Guidelines, uses modern Swift patterns, and is ready for production use. We don't generate boilerplate or commented-out code.",
  },
  {
    q: "Can I use Zunau for commercial iOS apps?",
    a: "Absolutely. All plans (including the free tier) grant you full commercial rights to the generated code. There are no royalties or attribution requirements.",
  },
];

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check size={18} className="text-emerald-400 mx-auto" />
    ) : (
      <X size={18} className="text-slate-700 mx-auto" />
    );
  }
  return <span className="text-slate-300 text-sm">{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24">
        {/* Hero */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-20">
          <Badge variant="cyan" className="mb-4">
            <Zap size={13} />
            Pricing
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Build more,
            <span className="gradient-text"> pay less</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Start free. Scale as you grow. Full commercial rights on all plans.
            Cancel anytime with no questions asked.
          </p>
        </div>

        {/* Plan cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: "Starter", price: "$0", desc: "For hobbyists & learners", popular: false, cta: "Start Free", href: "/signup", features: ["25 AI generations/month", "3 projects", "Live preview", "Xcode export", "Community support"] },
              { name: "Pro", price: "$19", desc: "For serious developers", popular: true, cta: "Start Pro Trial", href: "/signup?plan=pro", features: ["Unlimited generations", "Unlimited projects", "All device previews", "TestFlight deploy", "Priority support"] },
              { name: "Team", price: "$59", desc: "For development teams", popular: false, cta: "Start Team Trial", href: "/signup?plan=team", features: ["Everything in Pro", "10 team seats", "Shared library", "CI/CD pipeline", "4-hour SLA support"] },
              { name: "Enterprise", price: "Custom", desc: "For organizations", popular: false, cta: "Contact Sales", href: "/contact", features: ["Everything in Team", "Unlimited seats", "On-premise deploy", "Custom AI models", "Dedicated manager"] },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 flex flex-col ${plan.popular ? "pricing-card-popular scale-105 shadow-2xl" : "glass-card"}`}
              >
                {plan.popular && (
                  <Badge variant="purple" className="self-start mb-3">
                    <Zap size={11} />
                    Most Popular
                  </Badge>
                )}
                <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-slate-400 text-sm">/month</span>}
                </div>
                <ul className="space-y-2 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check size={14} className="text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}>
                  <Button variant={plan.popular ? "primary" : "secondary"} className="w-full">
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Full comparison table */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
          <h2 className="text-3xl font-black text-white text-center mb-10">
            Full Feature Comparison
          </h2>
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left p-4 text-slate-400 font-medium text-sm w-1/3">Feature</th>
                    {["Starter", "Pro", "Team", "Enterprise"].map((plan) => (
                      <th key={plan} className="text-center p-4 text-white font-semibold text-sm">
                        {plan}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category) => (
                    <>
                      <tr key={category.category} className="bg-violet-500/5">
                        <td colSpan={5} className="px-4 py-2.5 text-xs font-semibold text-violet-400 uppercase tracking-wider">
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature) => (
                        <tr key={feature.name} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                          <td className="p-4 text-slate-300 text-sm">{feature.name}</td>
                          <td className="p-4 text-center"><CellValue value={feature.starter} /></td>
                          <td className="p-4 text-center bg-violet-500/5"><CellValue value={feature.pro} /></td>
                          <td className="p-4 text-center"><CellValue value={feature.team} /></td>
                          <td className="p-4 text-center"><CellValue value={feature.enterprise} /></td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-white text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="glass-card rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle size={18} className="text-violet-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
