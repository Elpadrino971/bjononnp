import { Star } from "lucide-react";
import Badge from "@/components/ui/Badge";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "iOS Lead Engineer",
    company: "Spotify",
    avatar: "SC",
    avatarColor: "from-green-400 to-teal-400",
    quote:
      "Zunau cut our SwiftUI prototyping time by 80%. What used to take our team a sprint now takes an afternoon. The AI understands context incredibly well.",
    rating: 5,
    highlight: "80% faster prototyping",
  },
  {
    name: "Marcus Williams",
    role: "Indie Developer",
    company: "TopApps.co",
    avatar: "MW",
    avatarColor: "from-violet-400 to-purple-400",
    quote:
      "I shipped 3 apps on the App Store in 2 months using Zunau. As a solo developer, it's like having an entire iOS team. The code quality is genuinely impressive.",
    rating: 5,
    highlight: "3 apps shipped in 2 months",
  },
  {
    name: "Priya Patel",
    role: "CTO",
    company: "Finlit",
    avatar: "PP",
    avatarColor: "from-orange-400 to-amber-400",
    quote:
      "We evaluated every SwiftUI AI tool available. Zunau is in a different league. The generated code is maintainable, follows Apple guidelines, and actually works.",
    rating: 5,
    highlight: "Best in class code quality",
  },
  {
    name: "James O'Brien",
    role: "Senior iOS Developer",
    company: "Airbnb",
    avatar: "JO",
    avatarColor: "from-red-400 to-pink-400",
    quote:
      "The live preview feature alone is worth it. Seeing my SwiftUI changes render in real-time in the browser without opening Xcode is a game-changer for my workflow.",
    rating: 5,
    highlight: "Xcode-free previewing",
  },
  {
    name: "Emily Zhang",
    role: "Design Engineer",
    company: "Notion",
    avatar: "EZ",
    avatarColor: "from-blue-400 to-indigo-400",
    quote:
      "Zunau bridges the gap between design and code perfectly. I describe my Figma designs and get exact SwiftUI implementations. The design token sync is chef's kiss.",
    rating: 5,
    highlight: "Design to code instantly",
  },
  {
    name: "David Okonkwo",
    role: "Startup Founder",
    company: "SwiftSocial",
    avatar: "DO",
    avatarColor: "from-cyan-400 to-blue-400",
    quote:
      "Non-technical founder here. I built a functional iOS MVP with Zunau in 4 days with zero Swift knowledge. Raised our seed round 3 weeks later. Zunau changed my life.",
    rating: 5,
    highlight: "MVP in 4 days, zero Swift knowledge",
  },
];

export default function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const col1 = testimonials.slice(0, half);
  const col2 = testimonials.slice(half);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="orange" className="mb-4">
            <Star size={13} />
            Loved by developers
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            12,000+ developers
            <br />
            <span className="gradient-text">already vibe coding</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From indie hackers to enterprise teams — see what builders are saying
            about Zunau.io.
          </p>
        </div>

        {/* Masonry testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className={`glass-card rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] ${
                i === 1 ? "lg:mt-8" : i === 4 ? "lg:mt-4" : ""
              }`}
            >
              {/* Rating stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Highlight badge */}
              <div className="mb-3">
                <Badge variant="purple" className="text-[11px]">
                  {testimonial.highlight}
                </Badge>
              </div>

              {/* Quote */}
              <blockquote className="text-slate-300 text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-slate-500 text-xs">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof numbers */}
        <div className="mt-16 glass-card rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "4.9/5", label: "Average Rating", sub: "from 2,400+ reviews" },
              { value: "50K+", label: "Apps Built", sub: "across all platforms" },
              { value: "99.2%", label: "Satisfaction Rate", sub: "based on NPS survey" },
              { value: "#1", label: "SwiftUI AI Tool", sub: "ProductHunt 2026" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-black gradient-text mb-1">{stat.value}</div>
                <div className="text-white font-semibold text-sm mb-0.5">{stat.label}</div>
                <div className="text-slate-500 text-xs">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
