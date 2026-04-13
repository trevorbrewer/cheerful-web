import { formatCurrency } from "@/lib/roundup";

interface RoundupSummaryProps {
  totalRoundup: number;
  cheerfulFee: number;
  charityAmount: number;
  transactionCount: number;
  donated: boolean;
  charityName: string | null;
}

export default function RoundupSummary({
  totalRoundup,
  cheerfulFee,
  charityAmount,
  transactionCount,
  donated,
  charityName,
}: RoundupSummaryProps) {
  return (
    <div className="bg-white rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg text-brand-charcoal">Monthly summary</h3>
        <span className={`
          font-body text-xs px-3 py-1 rounded-full
          ${donated
            ? "bg-brand-mint/20 text-brand-green"
            : "bg-brand-gold/20 text-brand-charcoal"
          }
        `}>
          {donated ? "✓ Donated" : "⏳ Pending"}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between py-2 border-b border-brand-cream">
          <p className="font-body text-sm text-brand-charcoal/60">
            Total round-ups ({transactionCount} transactions)
          </p>
          <p className="font-body text-sm font-medium text-brand-charcoal">
            {formatCurrency(totalRoundup)}
          </p>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-brand-cream">
          <p className="font-body text-sm text-brand-charcoal/60">
            Cheerful fee (8%)
          </p>
          <p className="font-body text-sm text-brand-charcoal/60">
            -{formatCurrency(cheerfulFee)}
          </p>
        </div>
        <div className="flex items-center justify-between py-2">
          <p className="font-body text-sm font-medium text-brand-charcoal">
            Goes to {charityName ?? "your charity"}
          </p>
          <p className="font-body text-sm font-medium text-brand-green">
            {formatCurrency(charityAmount)}
          </p>
        </div>
      </div>

      {!donated && (
        <div className="bg-brand-cream rounded-xl p-4">
          <p className="font-body text-xs text-brand-charcoal/50 text-center">
            Your round-ups will be sent to {charityName ?? "your charity"} on the 1st of next month.
          </p>
        </div>
      )}
    </div>
  );
}