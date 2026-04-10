const MOCK_TRANSACTIONS = [
  { id: 1, merchant: "Starbucks", amount: 6.43, roundup: 0.57, date: "Today" },
  { id: 2, merchant: "Publix", amount: 47.23, roundup: 0.77, date: "Today" },
  { id: 3, merchant: "Shell Gas Station", amount: 62.18, roundup: 0.82, date: "Yesterday" },
  { id: 4, merchant: "Chick-fil-A", amount: 11.64, roundup: 0.36, date: "Yesterday" },
  { id: 5, merchant: "Amazon", amount: 34.99, roundup: 0.01, date: "Apr 8" },
  { id: 6, merchant: "Delta Airlines", amount: 284.50, roundup: 0.50, date: "Apr 7" },
];

export default function RecentActivity() {
  const total = MOCK_TRANSACTIONS.reduce((sum, t) => sum + t.roundup, 0);

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg text-brand-charcoal">Recent activity</h3>
        <span className="font-body text-xs text-brand-charcoal/50">
          +${total.toFixed(2)} this week
        </span>
      </div>

      <div className="space-y-3">
        {MOCK_TRANSACTIONS.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between py-3 border-b border-brand-mint/10 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-cream rounded-lg flex items-center justify-center text-sm">
                🛍️
              </div>
              <div>
                <p className="font-body text-sm text-brand-charcoal">{transaction.merchant}</p>
                <p className="font-body text-xs text-brand-charcoal/40">{transaction.date} · ${transaction.amount.toFixed(2)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-body text-sm font-medium text-brand-green">
                +${transaction.roundup.toFixed(2)}
              </p>
              <p className="font-body text-xs text-brand-charcoal/40">round-up</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}