const steps = [
  {
    number: "01",
    title: "Link your card",
    description: "Securely connect your debit or credit card in under 2 minutes. We use bank-level encryption.",
    icon: "💳",
  },
  {
    number: "02",
    title: "Choose a cause",
    description: "Browse over 1.5 million verified nonprofits. Pick one you love — or switch anytime.",
    icon: "🔍",
  },
  {
    number: "03",
    title: "Shop like normal",
    description: "Every purchase rounds up to the nearest dollar. A $4.37 coffee becomes a $0.63 donation.",
    icon: "☕",
  },
  {
    number: "04",
    title: "We send it monthly",
    description: "At the end of each month, we bundle your round-ups and send them to your charity — in your name.",
    icon: "🌱",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="font-body text-sm font-medium text-brand-green uppercase tracking-widest mb-3">How it works</p>
          <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal max-w-lg">
            Spare change. Real impact.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="text-4xl mb-4">{step.icon}</div>
              <p className="font-display text-5xl text-brand-mint font-bold mb-3">{step.number}</p>
              <h3 className="font-display text-xl text-brand-charcoal mb-2">{step.title}</h3>
              <p className="font-body text-sm text-brand-charcoal/60 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 md:p-8 bg-brand-cream rounded-2xl">
        <p className="font-display text-2xl text-brand-charcoal mb-2">
            "A $4.37 coffee. A $12.84 grocery run. A $67.50 tank of gas."
        </p>
        <p className="font-body text-brand-charcoal/60">
            Those round-ups add up to <span className="text-brand-green font-medium">$18–$35/month</span> for the average Cheerful user. Every cent goes directly to your cause — we take nothing.
        </p>
        </div>
      </div>
    </section>
  );
}