import Button from "@/components/ui/Button";

interface Charity {
  id: string;
  name: string;
  category: string;
  emoji: string;
}

const FEATURED_CHARITIES: Charity[] = [
  { id: "atlanta-food-bank", name: "Atlanta Community Food Bank", category: "Hunger", emoji: "🥫" },
  { id: "doctors-without-borders", name: "Doctors Without Borders", category: "Healthcare", emoji: "🏥" },
  { id: "khan-academy", name: "Khan Academy", category: "Education", emoji: "📚" },
  { id: "nature-conservancy", name: "The Nature Conservancy", category: "Environment", emoji: "🌿" },
  { id: "st-jude", name: "St. Jude Children's Hospital", category: "Children", emoji: "💛" },
  { id: "habitat-humanity", name: "Habitat for Humanity", category: "Housing", emoji: "🏠" },
];

interface StepCharityProps {
  selectedId: string;
  onSelect: (id: string, name: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepCharity({ selectedId, onSelect, onNext, onBack }: StepCharityProps) {
  return (
    <div>
      <h2 className="font-display text-3xl text-brand-charcoal mb-2">
        Choose your cause.
      </h2>
      <p className="font-body text-brand-charcoal/60 mb-8">
        Every round-up goes here. You can change this anytime from your dashboard.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {FEATURED_CHARITIES.map((charity) => (
          <button
            key={charity.id}
            onClick={() => onSelect(charity.id, charity.name)}
            className={`
              text-left p-4 rounded-xl border transition-all
              ${selectedId === charity.id
                ? "border-brand-green bg-brand-mint/10 ring-2 ring-brand-mint/30"
                : "border-brand-mint/30 hover:border-brand-green bg-white"
              }
            `}
          >
            <span className="text-2xl block mb-2">{charity.emoji}</span>
            <p className="font-body text-sm font-medium text-brand-charcoal">{charity.name}</p>
            <p className="font-body text-xs text-brand-charcoal/50 mt-1">{charity.category}</p>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onBack} className="flex-1 justify-center">
          ← Back
        </Button>
        <Button
          variant="primary"
          onClick={onNext}
          className="flex-2 flex-1 justify-center"
        >
          Continue →
        </Button>
      </div>
    </div>
  );
}