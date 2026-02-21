"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, Zap, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const plans = [
  {
    name: "Starter",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    period: "/month",
    description: "Perfect for hobbyists and learning SwiftUI",
    badge: null,
    popular: false,
    features: [
      { text: "25 AI generations/month", included: true },
      { text: "3 active projects", included: true },
      { text: "SwiftUI live preview", included: true },
      { text: "Component library (100 components)", included: true },
      { text: "Xcode export", included: true },
      { text: "Community support", included: true },
      { text: "Unlimited generations", included: false },
      { text: "Collaboration", included: false },
      { text: "Priority AI queue", included: false },
      { text: "Custom design tokens", included: false },
    ],
    cta: "Start Free",
    ctaVariant: "secondary" as const,
    href: "/signup",
  },
  {
    name: "Pro",
    monthlyPrice: "$29",
    yearlyPrice: "$19",
    period: "/month",
    description: "For serious iOS developers building real apps",
    badge: "Most Popular",
    popular: true,
    features: [
      { text: "Unlimited AI generations", included: true },
      { text: "Unlimited projects", included: true },
      { text: "SwiftUI + UIKit preview", included: true },
      { text: "Full component library (500+)", included: true },
      { text: "Xcode + SPM export", included: true },
      { text: "Priority support", included: true },
      { text: "TestFlight deployment", included: true },
      { text: "Custom design tokens", included: true },
      { text: "AI code review", included: true },
      { text: "Team collaboration (2 seats)", included: false },
    ],
    cta: "Start Pro Trial",
    ctaVariant: "primary" as const,
    href: "/signup?plan=pro",
  },
  {
    name: "Team",
    monthlyPrice: "$79",
    yearlyPrice: "$59",
    period: "/month",
    description: "For development teams building together",
    badge: null,
    popular: false,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Up to 10 team seats", included: true },
      { text: "Shared component library", included: true },
      { text: "Team design system", included: true },
      { text: "Role-based permissions", included: true },
      { text: "Git branch preview", included: true },
      { text: "CI/CD pipeline", included: true },
      { text: "App Store submission", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Dedicated Slack support", included: true },
    ],
    cta: "Start Team Trial",
    ctaVariant: "secondary" as const,
    href: "/signup?plan=team",
  },
  {
    name: "Enterprise",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    period: "",
    description: "For organizations needing full control and compliance",
    badge: "Custom",
    popular: false,
    features: [
      { text: "Everything in Team", included: true },
      { text: "Unlimited seats", included: true },
      { text: "On-premise deployment", included: true },
      { text: "SSO / SAML integration", included: true },
      { text: "SOC 2 Type II compliance", included: true },
      { text: "Custom AI model fine-tuning", included: true },
      { text: "SLA guarantee (99.9%)", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom integrations", included: true },
      { text: "White-label options", included: true },
    ],
    cta: "Contact Sales",
    ctaVariant: "secondary" as const,
    href: "/contact",
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section className="py-24 relative" id="pricing">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="cyan" className="mb-4">
            <Zap size={13} />
            Simple pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Build more,
            <span className="gradient-text"> pay less</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            Start free. Scale as you grow. Cancel anytime. No hidden fees, no
            surprise overages.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 glass-card rounded-full p-1.5">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                !isYearly
                  ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                isYearly
                  ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Yearly
              <Badge variant="green" className="text-[10px] px-2 py-0.5">Save 35%</Badge>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "pricing-card-popular shadow-2xl shadow-violet-900/30 scale-105"
                  : "glass-card hover:border-violet-500/30"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge
                    variant={plan.popular ? "purple" : plan.badge === "Custom" ? "cyan" : "blue"}
                    className="whitespace-nowrap shadow-lg"
                  >
                    {plan.popular && <Zap size={11} />}
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-white">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  {plan.period && (
                    <span className="text-slate-400 text-sm mb-1">{plan.period}</span>
                  )}
                </div>
                {isYearly && plan.monthlyPrice !== "$0" && plan.monthlyPrice !== "Custom" && (
                  <p className="text-slate-500 text-xs mt-1">
                    Billed annually ({plan.name === "Pro" ? "$228" : "$708"}/yr)
                  </p>
                )}
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5">
                    {feature.included ? (
                      <Check size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X size={15} className="text-slate-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button
                  variant={plan.ctaVariant}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm">
            All plans include a{" "}
            <span className="text-violet-400 font-semibold">14-day free trial</span>.
            No credit card required to get started.{" "}
            <Link href="/pricing" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
              See full comparison →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
