interface AdminStatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon: string;
  accent?: "green" | "gold" | "coral" | "mint";
}

const accents = {
  green: "bg-brand-green text-white",
  gold: "bg-brand-gold/20 text-brand-charcoal",
  coral: "bg-brand-coral/20 text-brand-charcoal",
  mint: "bg-brand-mint/20 text-brand-charcoal",
};

export default function AdminStatCard({
  label,
  value,
  sublabel,
  icon,
  accent = "mint",
}: AdminStatCardProps) {
  return (
    <div className={`rounded-2xl p-6 ${accents[accent]}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="font-display text-3xl font-bold mb-1">{value}</p>
      <p className="font-body text-sm font-medium">{label}</p>
      {sublabel && (
        <p className="font-body text-xs opacity-60 mt-1">{sublabel}</p>
      )}
    </div>
  );
}