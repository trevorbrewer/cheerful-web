import { NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { public_token, institution_name, last_four } = await request.json();

    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    await supabase
      .from("profiles")
      .update({
        plaid_access_token: accessToken,
        plaid_item_id: itemId,
        card_linked: true,
        card_institution: institution_name ?? null,
        card_last_four: last_four ?? null,
      })
      .eq("id", user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Plaid exchange token error:", error);
    return NextResponse.json({ error: "Failed to exchange token" }, { status: 500 });
  }
}