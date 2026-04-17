import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">

          <div className="inline-flex items-center gap-2 bg-brand-mint/20 border border-brand-mint/40 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span className="font-body text-sm text-brand-green font-medium">Now in beta — join the waitlist</span>
          </div>

          <h1 className="font-display text-6xl md:text-7xl text-brand-charcoal leading-tight mb-6">
            Giving that fits{" "}
            <span className="text-brand-green italic">inside</span>{" "}
            your everyday life.
          </h1>

          <p className="font-body text-xl text-brand-charcoal/70 leading-relaxed mb-10 max-w-xl">
            Link your card. Shop like normal. Cheerful rounds up every purchase
            and sends your spare change to a charity you love — automatically,
            every month.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button variant="primary" className="text-base px-8 py-4">
              Start giving for free
            </Button>
            <Button variant="ghost" className="text-base px-8 py-4">
              Explore charities →
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-brand-mint/30">
            <Stat number="$0" label="to get started" />
            <Stat number="1.5M+" label="nonprofits to choose from" />
            <Stat number="92%" label="of every round-up donated" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl text-brand-green font-bold">{number}</p>
      <p className="font-body text-sm text-brand-charcoal/60">{label}</p>
    </div>
  );
}