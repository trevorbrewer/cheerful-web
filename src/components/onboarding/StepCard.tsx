import Button from "@/components/ui/Button";

interface StepCardProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepCard({ onNext, onBack }: StepCardProps) {
  return (
    <div>
      <h2 className="font-display text-3xl text-brand-charcoal mb-2">
        Link your card.
      </h2>
      <p className="font-body text-brand-charcoal/60 mb-8">
        We use Plaid to securely connect your card. Cheerful never sees your
        full card number — only your transaction amounts.
      </p>

      <div className="bg-brand-mint/10 border border-brand-mint/30 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center text-white text-xl">
            🔒
          </div>
          <div>
            <p className="font-body text-sm font-medium text-brand-charcoal">Bank-level security</p>
            <p className="font-body text-xs text-brand-charcoal/50">256-bit encryption, read-only access</p>
          </div>
        </div>
        <p className="font-body text-xs text-brand-charcoal/50 leading-relaxed">
          Cheerful only reads your transaction amounts to calculate round-ups.
          We cannot move money, see your balance, or access your account details.
        </p>
      </div>

      <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl px-4 py-3 mb-8">
        <p className="font-body text-sm text-brand-charcoal/70">
          🚧 Card linking is coming soon. Click continue to finish setup — you can link your card from your dashboard when it's ready.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onBack} className="flex-1 justify-center">
          ← Back
        </Button>
        <Button variant="primary" onClick={onNext} className="flex-1 justify-center">
          Finish setup →
        </Button>
      </div>
    </div>
  );
}