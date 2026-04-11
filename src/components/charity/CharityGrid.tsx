"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Charity } from "@/lib/everyorg";
import CharityBrowseCard from "@/components/charity/CharityBrowseCard";
import Button from "@/components/ui/Button";

interface CharityGridProps {
  charities: Charity[];
  currentCharityId: string | null;
}

export default function CharityGrid({ charities, currentCharityId }: CharityGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(currentCharityId);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  function handleSelect(charity: Charity) {
    setSelectedId(charity.ein);
    setSelectedName(charity.name);
  }

  async function handleSave() {
    if (!selectedId || !selectedName) return;
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("profiles")
        .update({
          selected_charity_id: selectedId,
          selected_charity_name: selectedName,
        })
        .eq("id", user.id);
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {charities.length === 0 ? (
          <div className="col-span-3 text-center py-16">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-body text-brand-charcoal/50">No charities found. Try a different search.</p>
          </div>
        ) : (
          charities.map((charity) => (
            <CharityBrowseCard
              key={charity.ein}
              charity={charity}
              onSelect={handleSelect}
              isSelected={selectedId === charity.ein}
            />
          ))
        )}
      </div>

      {selectedId && selectedName && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-brand-mint/30 px-6 py-4 flex items-center gap-6 z-50">
          <div>
            <p className="font-body text-xs text-brand-charcoal/50">Selected charity</p>
            <p className="font-body text-sm font-medium text-brand-charcoal">{selectedName}</p>
          </div>
          <Button variant="primary" onClick={handleSave}>
            {saving ? "Saving..." : "Save & continue"}
          </Button>
        </div>
      )}
    </div>
  );
}