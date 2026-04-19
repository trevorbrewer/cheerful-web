import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import AdminStatCard from "@/components/admin/AdminStatCard";
import { createAdminClient } from "@/lib/supabase/admin";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) redirect("/dashboard");

  const adminSupabase = createAdminClient();

  const { count: totalUsers } = await adminSupabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const { count: linkedCards } = await adminSupabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("card_linked", true);

  const { count: completedOnboarding } = await adminSupabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("onboarding_complete", true);

  const { data: donationStats } = await adminSupabase
    .from("donations")
    .select("charity_amount, cheerful_fee, status");

  const totalDonated = donationStats
    ?.filter((d) => d.status === "completed")
    .reduce((sum, d) => sum + Number(d.charity_amount), 0) ?? 0;

  const totalFees = donationStats
    ?.filter((d) => d.status === "completed")
    .reduce((sum, d) => sum + Number(d.cheerful_fee), 0) ?? 0;

  const failedDonations = donationStats
    ?.filter((d) => d.status === "failed").length ?? 0;

  const { data: recentUsers } = await adminSupabase
    .from("profiles")
    .select("full_name, created_at, card_linked, onboarding_complete, selected_charity_name")
    .order("created_at", { ascending: false })
    .limit(10);

  const { data: recentDonations } = await adminSupabase
    .from("donations")
    .select("charity_name, charity_amount, status, month, year, transaction_count")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div className="min-h-screen bg-brand-cream">
      <AdminNav />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-brand-charcoal">Overview</h1>
          <p className="font-body text-sm text-brand-charcoal/50 mt-1">
            Cheerful platform metrics
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <AdminStatCard
            icon="👥"
            label="Total users"
            value={totalUsers ?? 0}
            sublabel={`${completedOnboarding ?? 0} onboarded`}
            accent="mint"
          />
          <AdminStatCard
            icon="💳"
            label="Cards linked"
            value={linkedCards ?? 0}
            sublabel={`of ${totalUsers ?? 0} users`}
            accent="mint"
          />
          <AdminStatCard
            icon="💚"
            label="Total donated"
            value={`$${totalDonated.toFixed(2)}`}
            sublabel="100% goes to charity"
            accent="green"
          />
          <AdminStatCard
            icon="⚠️"
            label="Failed donations"
            value={failedDonations}
            sublabel="Needs attention"
            accent={failedDonations > 0 ? "coral" : "mint"}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-display text-lg text-brand-charcoal mb-4">
              Recent users
            </h2>
            {recentUsers && recentUsers.length > 0 ? (
              <div className="space-y-1">
                {recentUsers.map((u, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-brand-mint/10 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-brand-mint/20 rounded-full flex items-center justify-center text-sm font-medium text-brand-green">
                        {u.full_name ? u.full_name[0].toUpperCase() : "?"}
                      </div>
                      <div>
                        <p className="font-body text-sm text-brand-charcoal">
                          {u.full_name ?? "No name"}
                        </p>
                        <p className="font-body text-xs text-brand-charcoal/40">
                          {u.selected_charity_name ?? "No charity selected"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {u.card_linked && (
                        <span className="font-body text-xs bg-brand-mint/20 text-brand-green px-2 py-0.5 rounded-full">
                          Card linked
                        </span>
                      )}
                      {!u.onboarding_complete && (
                        <span className="font-body text-xs bg-brand-gold/20 text-brand-charcoal px-2 py-0.5 rounded-full">
                          Incomplete
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-body text-sm text-brand-charcoal/40 text-center py-8">
                No users yet
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-display text-lg text-brand-charcoal mb-4">
              Recent donations
            </h2>
            {recentDonations && recentDonations.length > 0 ? (
              <div className="space-y-1">
                {recentDonations.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-brand-mint/10 last:border-0"
                  >
                    <div>
                      <p className="font-body text-sm text-brand-charcoal">
                        {d.charity_name}
                      </p>
                      <p className="font-body text-xs text-brand-charcoal/40">
                        {MONTHS[d.month]} {d.year} · {d.transaction_count} transactions
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-body text-sm font-medium text-brand-green">
                        ${Number(d.charity_amount).toFixed(2)}
                      </p>
                      <span className={`font-body text-xs px-2 py-0.5 rounded-full ${
                        d.status === "completed"
                          ? "bg-brand-mint/20 text-brand-green"
                          : "bg-brand-coral/20 text-brand-coral"
                      }`}>
                        {d.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-body text-sm text-brand-charcoal/40 text-center py-8">
                No donations yet
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}