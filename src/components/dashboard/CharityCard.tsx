interface CharityCardProps {
  charityName: string | null;
  charityId: string | null;
}

export default function CharityCard({ charityName, charityId }: CharityCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-brand-charcoal">Your cause</h3>
        <a href="/dashboard/charity" className="font-body text-xs text-brand-green hover:underline">
          Change &rarr;
        </a>
      </div>

      {charityName ? (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-mint/20 rounded-xl flex items-center justify-center text-2xl">
            🌱
          </div>
          <div>
            <p className="font-body text-sm font-medium text-brand-charcoal">{charityName}</p>
            <p className="font-body text-xs text-brand-charcoal/50 mt-0.5">
              100% of your round-ups go here
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="font-body text-sm text-brand-charcoal/50 mb-3">No charity selected yet</p>
          <a href="/dashboard/charity" className="font-body text-sm text-brand-green hover:underline">
            Choose a cause &rarr;
          </a>
        </div>
      )}
    </div>
  );
}