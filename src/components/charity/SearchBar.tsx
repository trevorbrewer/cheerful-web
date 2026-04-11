"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      router.replace(`/dashboard/charity?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/30 text-lg">
        🔍
      </span>
      <input
        type="text"
        defaultValue={query}
        onChange={handleSearch}
        placeholder="Search 1.5M+ nonprofits..."
        className="w-full pl-11 pr-4 py-3 bg-white border border-brand-mint/40 rounded-xl font-body text-sm outline-none focus:border-brand-green transition-colors"
      />
    </div>
  );
}