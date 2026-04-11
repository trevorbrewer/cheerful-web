"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PlaidLinkButton from "@/components/dashboard/PlaidLinkButton";

interface CardLinkSectionProps {
  cardLinked: boolean;
  cardInstitution: string | null;
  cardLastFour: string | null;
}

export default function CardLinkSection({
  cardLinked,
  cardInstitution,
  cardLastFour,
}: CardLinkSectionProps) {
  const [linked, setLinked] = useState(cardLinked);
  const router = useRouter();

  function handleSuccess() {
    setLinked(true);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-brand-mint/20 rounded-xl flex items-center justify-center text-2xl">
            🔒
          </div>
          <div>
            <p className="font-body text-sm font-medium text-brand-charcoal">
              Bank-level security
            </p>
            <p className="font-body text-xs text-brand-charcoal/50">
              256-bit encryption · Read-only access · Powered by Plaid
            </p>
          </div>
        </div>

        {linked ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-brand-mint/10 border border-brand-mint/30 rounded-xl p-4">
              <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center text-white text-lg">
                🏦
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-medium text-brand-charcoal">
                  {cardInstitution ?? "Your bank"}
                </p>
                {cardLastFour && (
                  <p className="font-body text-xs text-brand-charcoal/50">
                    Account ending in {cardLastFour}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 text-brand-green">
                <span className="text-sm">✓</span>
                <span className="font-body text-xs font-medium">Connected</span>
              </div>
            </div>

            <p className="font-body text-xs text-brand-charcoal/40 text-center">
              Want to switch banks?{" "}
              <button
                onClick={() => setLinked(false)}
                className="text-brand-green hover:underline"
              >
                Connect a different account
              </button>
            </p>
          </div>
        ) : (
          <PlaidLinkButton onSuccess={handleSuccess} />
        )}
      </div>

      <div className="bg-brand-cream rounded-2xl p-6 space-y-3">
        <p className="font-body text-xs font-medium text-brand-charcoal/50 uppercase tracking-widest">
          How it works
        </p>
        {[
          "We connect read-only to your account — we can never move money",
          "Every purchase is rounded up to the nearest dollar",
          "Round-ups accumulate and are sent to your charity on the 1st of each month",
          "You can disconnect your bank at any time",
        ].map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className="text-brand-green text-sm mt-0.5">✓</span>
            <p className="font-body text-sm text-brand-charcoal/60">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}