import { NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";
import { createClient } from "@/lib/supabase/server";
import { calculateRoundup, getCurrentMonthRange } from "@/lib/roundup";
import { Transaction } from "plaid";

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("plaid_access_token, card_linked")
      .eq("id", user.id)
      .single();

    if (!profile?.card_linked || !profile?.plaid_access_token) {
      return NextResponse.json({ error: "No card linked" }, { status: 400 });
    }

    const { startDate, endDate } = getCurrentMonthRange();

    const response = await plaidClient.transactionsGet({
      access_token: profile.plaid_access_token,
      start_date: startDate,
      end_date: endDate,
      options: { count: 100, offset: 0 },
    });

    const transactions: Transaction[] = response.data.transactions;
    let synced = 0;

    for (const transaction of transactions) {
      if (transaction.pending) continue;
      if (transaction.amount <= 0) continue;

      const roundup = calculateRoundup(transaction.amount);

      const { error } = await supabase
        .from("transactions")
        .upsert({
          user_id: user.id,
          plaid_transaction_id: transaction.transaction_id,
          merchant_name: transaction.merchant_name ?? transaction.name,
          amount: transaction.amount,
          roundup_amount: roundup,
          date: transaction.date,
          category: transaction.personal_finance_category?.primary ?? null,
          pending: false,
          donated: false,
        }, {
          onConflict: "plaid_transaction_id",
          ignoreDuplicates: false,
        });

      if (!error) synced++;
    }

    return NextResponse.json({ success: true, synced, total: transactions.length });
  } catch (error) {
    console.error("Manual sync error:", error);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}