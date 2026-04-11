"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";

interface ChooseCharityButtonProps {
  charityId: string;
  charityName: string;
  isCurrentCharity: boolean;
}

export default function ChooseCharityButton({
  charityId,
  charityName,
  isCurrentCharity,
}: ChooseCharityButtonProps) {
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleChoose() {
    if (isCurrentCharity) return;
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from("profiles")
        .update({
          selected_charity_id: charityId,
          selected_charity_name: charityName,
        })
        .eq("id", user.id);
    }

    router.push("/dashboard");
    router.refresh();
  }

  if (isCurrentCharity) {
    return (
      <div className="flex items-center gap-2 bg-brand-mint/20 text-brand-green px-6 py-3 rounded-xl">
        <span>✓</span>
        <span className="font-body text-sm font-medium">Your current charity</span>
      </div>
    );
  }

  return (
    <Button variant="primary" onClick={handleChoose}>
      {saving ? "Saving..." : "Choose this charity"}
    </Button>
  );
}