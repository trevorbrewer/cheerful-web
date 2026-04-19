import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendDonation } from "@/lib/everyorg";
import { sendDonationReceipt } from "@/lib/email";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const month = lastMonth.getMonth();
    const year = lastMonth.getFullYear();
    const startDate = new Date(year, month, 1).toISOString().split("T")[0];
    const endDate = new Date(year, month + 1, 0).toISOString().split("T")[0];

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, selected_charity_id, selected_charity_name")
      .eq("card_linked", true)
      .eq("onboarding_complete", true)
      .not("selected_charity_id", "is", null);

    if (!profiles || profiles.length === 0) {
      return NextResponse.json({ message: "No eligible profiles" });
    }

    let totalProcessed = 0;
    let totalFailed = 0;

    for (const profile of profiles) {
      try {
        const { data: transactions } = await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", profile.id)
          .eq("donated", false)
          .gte("date", startDate)
          .lte("date", endDate);

        if (!transactions || transactions.length === 0) continue;

        const totalRoundup = transactions.reduce(
          (sum, t) => sum + Number(t.roundup_amount), 0
        );

        if (totalRoundup < 0.50) continue;

        const cheerfulFee = 0;
        const charityAmount = parseFloat(totalRoundup.toFixed(2));
        const amountCents = Math.round(charityAmount * 100);

        const { data: userRecord } = await supabase.auth.admin.getUserById(profile.id);
        const userEmail = userRecord?.user?.email ?? "";

        const donationResult = await sendDonation({
          nonprofitSlug: profile.selected_charity_id,
          amountCents,
          donorName: profile.full_name ?? "Cheerful User",
          donorEmail: userEmail,
          description: `Cheerful round-up donation for ${MONTHS[month]} ${year}`,
        });

        const status = donationResult.success ? "completed" : "failed";

        await supabase.from("donations").insert({
          user_id: profile.id,
          charity_name: profile.selected_charity_name,
          charity_slug: profile.selected_charity_id,
          total_roundup: totalRoundup,
          cheerful_fee: cheerfulFee,
          charity_amount: charityAmount,
          transaction_count: transactions.length,
          every_org_charge_id: donationResult.chargeId ?? null,
          status,
          month,
          year,
        });

        if (donationResult.success) {
          await supabase
            .from("transactions")
            .update({ donated: true })
            .in("id", transactions.map((t) => t.id));

          if (userEmail) {
            await sendDonationReceipt({
              toEmail: userEmail,
              toName: profile.full_name ?? "Friend",
              charityName: profile.selected_charity_name ?? "your charity",
              totalRoundup,
              cheerfulFee,
              charityAmount,
              transactionCount: transactions.length,
              month: MONTHS[month],
              year,
            });
          }

          totalProcessed++;
        } else {
          totalFailed++;
        }
      } catch (profileError) {
        console.error(`Failed to process payout for user ${profile.id}:`, profileError);
        totalFailed++;
        continue;
      }
    }

    return NextResponse.json({
      success: true,
      processed: totalProcessed,
      failed: totalFailed,
      total: profiles.length,
    });
  } catch (error) {
    console.error("Payout processing error:", error);
    return NextResponse.json({ error: "Payout failed" }, { status: 500 });
  }
}