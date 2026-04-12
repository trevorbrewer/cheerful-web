"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatCurrency } from "@/lib/roundup";

interface Transaction {
  id: string;
  merchant_name: string;
  amount: number;
  roundup_amount: number;
  date: string;
  category: string | null;
}

export default function RecentActivity() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [totalRoundup, setTotalRoundup] = useState(0);
  const supabase = createClient();

  async function fetchTransactions() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .limit(10);

    if (data) {
      setTransactions(data);
      const total = data.reduce((sum, t) => sum + Number(t.roundup_amount), 0);
      setTotalRoundup(parseFloat(total.toFixed(2)));
    }
    setLoading(false);
  }

  async function handleSync() {
    setSyncing(true);
    try {
      await fetch("/api/plaid/sync-now", { method: "POST" });
      await fetchTransactions();
    } catch (error) {
      console.error("Sync failed:", error);
    }
    setSyncing(false);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg text-brand-charcoal">Recent activity</h3>
        <div className="flex items-center gap-3">
          {totalRoundup > 0 && (
            <span className="font-body text-xs text-brand-charcoal/50">
              +{formatCurrency(totalRoundup)} this month
            </span>
          )}
          <button
            onClick={handleSync}
            disabled={syncing}
            className="font-body text-xs text-brand-green hover:underline disabled:opacity-50"
          >
            {syncing ? "Syncing..." : "Sync now"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="font-body text-sm text-brand-charcoal/40">Loading transactions...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-3xl mb-3">💳</p>
          <p className="font-body text-sm text-brand-charcoal/50 mb-3">
            No transactions yet
          </p>
          <button
            onClick={handleSync}
            className="font-body text-sm text-brand-green hover:underline"
          >
            Sync transactions
          </button>
        </div>
      ) : (
        <div className="space-y-1">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-3 border-b border-brand-mint/10 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-cream rounded-lg flex items-center justify-center text-sm">
                  🛍️
                </div>
                <div>
                  <p className="font-body text-sm text-brand-charcoal">
                    {transaction.merchant_name}
                  </p>
                  <p className="font-body text-xs text-brand-charcoal/40">
                    {transaction.date} · {formatCurrency(transaction.amount)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-body text-sm font-medium text-brand-green">
                  +{formatCurrency(transaction.roundup_amount)}
                </p>
                <p className="font-body text-xs text-brand-charcoal/40">round-up</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}