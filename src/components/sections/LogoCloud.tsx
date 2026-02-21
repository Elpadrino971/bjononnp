export default function LogoCloud() {
  const companies = [
    "Apple", "Spotify", "Airbnb", "Stripe", "Notion",
    "Linear", "Figma", "Vercel", "Discord", "Shopify",
  ];

  return (
    <section className="py-14 border-y border-white/5 bg-[#08080f]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-slate-500 text-sm mb-8">
          Trusted by developers at world-class companies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {companies.map((company) => (
            <div key={company} className="text-slate-600 hover:text-slate-400 transition-colors font-semibold text-base tracking-wide">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
