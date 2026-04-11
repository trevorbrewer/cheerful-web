import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/dashboard/DashboardNav";
import CardLinkSection from "@/components/dashboard/CardLinkSection";

export default async function LinkCardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, card_linked, card_institution, card_last_four")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-brand-cream">
      <DashboardNav fullName={profile?.full_name} />

      <main className="max-w-2xl mx-auto px-6 py-10">
        
        <a href="/dashboard"
          className="font-body text-sm text-brand-charcoal/50 hover:text-brand-charcoal mb-8 inline-block"
        >
          &larr; Back to dashboard
        </a>

        <h1 className="font-display text-3xl text-brand-charcoal mb-2">
          Link your card.
        </h1>
        <p className="font-body text-sm text-brand-charcoal/50 mb-10">
          Connect your bank account so we can track round-ups on your purchases.
        </p>

        <CardLinkSection
          cardLinked={profile?.card_linked ?? false}
          cardInstitution={profile?.card_institution ?? null}
          cardLastFour={profile?.card_last_four ?? null}
        />
      </main>
    </div>
  );
}