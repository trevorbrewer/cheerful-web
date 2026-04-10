interface StatCardProps {
  label: string;
  value: string;
  sublabel?: string;
  icon: string;
  accent?: boolean;
}

export default function StatCard({ label, value, sublabel, icon, accent }: StatCardProps) {
  return (
    <div className={`
      rounded-2xl p-6 flex flex-col gap-2
      ${accent ? "bg-brand-green text-white" : "bg-white"}
    `}>
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className={`font-body text-xs px-2 py-1 rounded-full ${accent ? "bg-white/20 text-white" : "bg-brand-mint/20 text-brand-green"}`}>
          {label}
        </span>
      </div>
      <p className={`font-display text-3xl font-bold mt-2 ${accent ? "text-white" : "text-brand-charcoal"}`}>
        {value}
      </p>
      {sublabel && (
        <p className={`font-body text-xs ${accent ? "text-white/60" : "text-brand-charcoal/50"}`}>
          {sublabel}
        </p>
      )}
    </div>
  );
}