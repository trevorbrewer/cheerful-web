import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendDonationReceipt } from "@/lib/email";

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, selected_charity_name")
      .eq("id", user.id)
      .single();

    await sendDonationReceipt({
      toEmail: user.email!,
      toName: profile?.full_name ?? "Friend",
      charityName: profile?.selected_charity_name ?? "Atlanta Community Food Bank",
      totalRoundup: 18.43,
      cheerfulFee: 0,
      charityAmount: 18.43,
      transactionCount: 23,
      month: "April",
      year: 2026,
    });

    return NextResponse.json({ success: true, sentTo: user.email });
  } catch (error) {
    console.error("Test receipt error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}