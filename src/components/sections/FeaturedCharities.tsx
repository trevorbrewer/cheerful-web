const charities = [
  { name: "Atlanta Community Food Bank", category: "Hunger", emoji: "🥫", impact: "Feeds 800K+ people/year" },
  { name: "Doctors Without Borders", category: "Healthcare", emoji: "🏥", impact: "Active in 70+ countries" },
  { name: "Khan Academy", category: "Education", emoji: "📚", impact: "Free for 140M+ learners" },
  { name: "The Nature Conservancy", category: "Environment", emoji: "🌿", impact: "Protected 125M+ acres" },
  { name: "St. Jude Children's Hospital", category: "Children", emoji: "💛", impact: "Treats kids at no cost" },
  { name: "Habitat for Humanity", category: "Housing", emoji: "🏠", impact: "Built 1M+ homes" },
];

export default function FeaturedCharities() {
  return (
    <section id="charities" className="py-24 px-6 bg-brand-cream">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="font-body text-sm font-medium text-brand-green uppercase tracking-widest mb-3">Charities</p>
            <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal">
              Your spare change,<br />their big mission.
            </h2>
          </div>
          <button className="font-body text-sm text-brand-green border border-brand-green rounded-xl px-6 py-3 hover:bg-brand-green hover:text-white transition-all self-start md:self-auto">
            Browse all 1.5M+ charities →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {charities.map((charity) => (
            <div
              key={charity.name}
              className="bg-white rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{charity.emoji}</span>
                <span className="font-body text-xs text-brand-green bg-brand-mint/20 px-3 py-1 rounded-full">
                  {charity.category}
                </span>
              </div>
              <h3 className="font-display text-lg text-brand-charcoal mb-2 group-hover:text-brand-green transition-colors">
                {charity.name}
              </h3>
              <p className="font-body text-sm text-brand-charcoal/50">{charity.impact}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}