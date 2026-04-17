import { NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const plaidSignature = request.headers.get("plaid-verification");

    if (!plaidSignature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    const parsedBody = JSON.parse(body);
    const webhookType = parsedBody.webhook_type;
    const webhookCode = parsedBody.webhook_code;

    console.log("Plaid webhook received:", webhookType, webhookCode);

    if (webhookType === "TRANSACTIONS") {
      if (
        webhookCode === "SYNC_UPDATES_AVAILABLE" ||
        webhookCode === "INITIAL_UPDATE" ||
        webhookCode === "HISTORICAL_UPDATE"
      ) {
        console.log("New transactions available for item:", parsedBody.item_id);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}