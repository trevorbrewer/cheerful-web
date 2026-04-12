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

  const { data: transactionStats } = await supabase
  .from("transactions")
  .select("roundup_amount, donated")
  .eq("user_id", user.id);

    const totalAllTime = transactionStats
    ? transactionStats.reduce((sum, t) => sum + Number(t.roundup_amount), 0)
    : 0;

    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthlyStats = transactionStats?.filter((t) =>
    !t.donated
    ) ?? [];

    const totalThisMonth = monthlyStats.reduce(
    (sum, t) => sum + Number(t.roundup_amount), 0
    );

    const roundupCount = monthlyStats.length;

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
            value={`$${totalAllTime.toFixed(2)}`}
            sublabel="Total donated to date"
            accent={true}
            />
            <StatCard
            icon="📅"
            label="This month"
            value={`$${totalThisMonth.toFixed(2)}`}
            sublabel="Sends on the 1st"
            />
            <StatCard
            icon="🔁"
            label="Round-ups"
            value={roundupCount.toString()}
            sublabel="Transactions this month"
            />
        </div>

        {!profile?.card_linked && (
        <div className="bg-brand-gold/20 border border-brand-gold/40 rounded-2xl p-5 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
            <span className="text-2xl">💳</span>
            <div>
                <p className="font-body text-sm font-medium text-brand-charcoal">Link your card to start giving</p>
                <p className="font-body text-xs text-brand-charcoal/50">Connect your bank account to track round-ups</p>
            </div>
            </div>
            
            <a href="/dashboard/link-card"
            className="font-body text-sm bg-brand-green text-white px-4 py-2 rounded-xl hover:bg-brand-mint hover:text-brand-charcoal transition-all whitespace-nowrap"
            >
            Link card
            </a>
        </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
          <RecentActivity />
          <div className="mt-3 text-right">
            
            <a href="/dashboard/history"
              className="font-body text-sm text-brand-green hover:underline"
            >
              View full history &rarr;
            </a>
          </div>
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