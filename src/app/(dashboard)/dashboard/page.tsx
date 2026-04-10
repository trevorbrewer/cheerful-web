import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/dashboard/DashboardNav";
import StatCard from "@/components/dashboard/StatCard";
import CharityCard from "@/components/dashboard/CharityCard";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile?.onboarding_complete) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <DashboardNav fullName={profile?.full_name} />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-brand-charcoal">
            Good to see you, {profile?.full_name?.split(" ")[0]} 👋
          </h1>
          <p className="font-body text-sm text-brand-charcoal/50 mt-1">
            Here's your giving summary.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard
            icon="💚"
            label="All time"
            value="$0.00"
            sublabel="Total donated to date"
            accent={true}
          />
          <StatCard
            icon="📅"
            label="This month"
            value="$0.00"
            sublabel="Sends on May 1st"
          />
          <StatCard
            icon="🔁"
            label="Round-ups"
            value="0"
            sublabel="Transactions this month"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div>
            <CharityCard
              charityName={profile?.selected_charity_name}
              charityId={profile?.selected_charity_id}
            />
          </div>
        </div>
      </main>
    </div>
  );
}