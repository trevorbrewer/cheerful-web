import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/dashboard/DashboardNav";
import MonthSelector from "@/components/dashboard/MonthSelector";
import RoundupSummary from "@/components/dashboard/RoundupSummary";
import TransactionRow from "@/components/dashboard/TransactionRow";
import { Suspense } from "react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface PageProps {
  searchParams: Promise<{ month?: string; year?: string }>;
}

export default async function HistoryPage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, selected_charity_name")
    .eq("id", user.id)
    .single();

  const { month, year } = await searchParams;
  const now = new Date();
  const selectedMonth = parseInt(month ?? String(now.getMonth()));
  const selectedYear = parseInt(year ?? String(now.getFullYear()));

  const startDate = new Date(selectedYear, selectedMonth, 1)
    .toISOString()
    .split("T")[0];
  const endDate = new Date(selectedYear, selectedMonth + 1, 0)
    .toISOString()
    .split("T")[0];

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: false });

  const { data: donations } = await supabase
    .from("donations")
    .select("*")
    .eq("user_id", user.id)
    .order("year", { ascending: false })
    .order("month", { ascending: false });

  const txList = transactions ?? [];
  const totalRoundup = txList.reduce((sum, t) => sum + Number(t.roundup_amount), 0);
  const cheerfulFee = 0;
  const charityAmount = parseFloat(totalRoundup.toFixed(2));
  const allDonated = txList.length > 0 && txList.every((t) => t.donated);

  return (
    <div className="min-h-screen bg-brand-cream">
      <DashboardNav fullName={profile?.full_name} />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            
            <a href="/dashboard"
              className="font-body text-sm text-brand-charcoal/50 hover:text-brand-charcoal mb-2 inline-block"
            >
              &larr; Back to dashboard
            </a>
            <h1 className="font-display text-3xl text-brand-charcoal">
              Round-up history
            </h1>
          </div>
          <Suspense>
            <MonthSelector />
          </Suspense>
        </div>

        {txList.length > 0 ? (
          <>
            <RoundupSummary
              totalRoundup={totalRoundup}
              charityAmount={charityAmount}
              transactionCount={txList.length}
              donated={allDonated}
              charityName={profile?.selected_charity_name ?? null}
            />

            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-display text-lg text-brand-charcoal mb-4">
                Transactions
              </h3>
              {txList.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  merchantName={transaction.merchant_name}
                  amount={transaction.amount}
                  roundupAmount={transaction.roundup_amount}
                  date={transaction.date}
                  category={transaction.category}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-16 text-center">
            <p className="text-4xl mb-4">📭</p>
            <p className="font-display text-xl text-brand-charcoal mb-2">
              No transactions this month
            </p>
            <p className="font-body text-sm text-brand-charcoal/50">
              Use the arrows above to browse other months.
            </p>
          </div>
        )}
        {donations && donations.length > 0 && (
  <div className="bg-white rounded-2xl p-6 mt-6">
    <h3 className="font-display text-lg text-brand-charcoal mb-4">
      Past donations
    </h3>
    <div className="space-y-1">
      {donations.map((donation) => (
        <div
          key={donation.id}
          className="flex items-center justify-between py-3 border-b border-brand-mint/10 last:border-0"
        >
          <div>
            <p className="font-body text-sm text-brand-charcoal">
              {MONTHS[donation.month]} {donation.year}
            </p>
            <p className="font-body text-xs text-brand-charcoal/50">
              {donation.charity_name} · {donation.transaction_count} transactions
            </p>
          </div>
          <div className="text-right">
            <p className="font-body text-sm font-medium text-brand-green">
              ${Number(donation.charity_amount).toFixed(2)}
            </p>
            <p className="font-body text-xs text-brand-charcoal/40">
              {donation.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
      </main>
    </div>
  );
}