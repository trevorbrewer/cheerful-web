import Button from "@/components/ui/Button";

interface StepNameProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export default function StepName({ value, onChange, onNext }: StepNameProps) {
  return (
    <div>
      <h2 className="font-display text-3xl text-brand-charcoal mb-2">
        What should we call you?
      </h2>
      <p className="font-body text-brand-charcoal/60 mb-8">
        This is how your name will appear on donation receipts sent to your charity.
      </p>

      <div className="mb-6">
        <label className="font-body text-sm text-brand-charcoal/70 block mb-2">
          Full name
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Full Name"
          className="w-full border border-brand-mint/40 rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-green"
          autoFocus
        />
      </div>

      <Button
        variant="primary"
        className="w-full justify-center"
        onClick={onNext}
      >
        Continue →
      </Button>
    </div>
  );
}