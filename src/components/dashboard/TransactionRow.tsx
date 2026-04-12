import { formatCurrency } from "@/lib/roundup";

const CATEGORY_ICONS: Record<string, string> = {
  FOOD_AND_DRINK: "🍔",
  TRAVEL: "✈️",
  SHOPPING: "🛍️",
  ENTERTAINMENT: "🎬",
  HEALTH: "💊",
  TRANSPORTATION: "🚗",
  UTILITIES: "💡",
  DEFAULT: "💳",
};

interface TransactionRowProps {
  merchantName: string;
  amount: number;
  roundupAmount: number;
  date: string;
  category: string | null;
}

export default function TransactionRow({
  merchantName,
  amount,
  roundupAmount,
  date,
  category,
}: TransactionRowProps) {
  const icon = category
    ? CATEGORY_ICONS[category] ?? CATEGORY_ICONS.DEFAULT
    : CATEGORY_ICONS.DEFAULT;

  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex items-center justify-between py-3 border-b border-brand-mint/10 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-brand-cream rounded-lg flex items-center justify-center text-base flex-shrink-0">
          {icon}
        </div>
        <div>
          <p className="font-body text-sm text-brand-charcoal">{merchantName}</p>
          <p className="font-body text-xs text-brand-charcoal/40">
            {formattedDate} · {formatCurrency(amount)}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-body text-sm font-medium text-brand-green">
          +{formatCurrency(roundupAmount)}
        </p>
        <p className="font-body text-xs text-brand-charcoal/40">round-up</p>
      </div>
    </div>
  );
}