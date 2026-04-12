import { NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";
import { createClient } from "@/lib/supabase/server";
import { calculateRoundup, getCurrentMonthRange } from "@/lib/roundup";
import { RemovedTransaction, Transaction } from "plaid";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();

    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, plaid_access_token, plaid_item_id")
      .eq("card_linked", true)
      .not("plaid_access_token", "is", null);

    if (profilesError || !profiles) {
      return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 });
    }

    const { startDate, endDate } = getCurrentMonthRange();
    let totalSynced = 0;

    for (const profile of profiles) {
      try {
        const response = await plaidClient.transactionsGet({
          access_token: profile.plaid_access_token!,
          start_date: startDate,
          end_date: endDate,
          options: { count: 100, offset: 0 },
        });

        const transactions: Transaction[] = response.data.transactions;

        for (const transaction of transactions) {
          if (transaction.pending) continue;
          if (transaction.amount <= 0) continue;

          const roundup = calculateRoundup(transaction.amount);

          const { error } = await supabase
            .from("transactions")
            .upsert({
              user_id: profile.id,
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

          if (!error) totalSynced++;
        }
      } catch (profileError) {
        console.error(`Failed to sync transactions for user ${profile.id}:`, profileError);
        continue;
      }
    }

    return NextResponse.json({
      success: true,
      synced: totalSynced,
      profiles: profiles.length,
    });
  } catch (error) {
    console.error("Transaction sync error:", error);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}