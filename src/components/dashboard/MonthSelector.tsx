"use client";
import { useRouter, useSearchParams } from "next/navigation";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function MonthSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const now = new Date();

  const selectedMonth = parseInt(searchParams.get("month") ?? String(now.getMonth()));
  const selectedYear = parseInt(searchParams.get("year") ?? String(now.getFullYear()));

  function handleChange(month: number, year: number) {
    const params = new URLSearchParams();
    params.set("month", String(month));
    params.set("year", String(year));
    router.replace(`/dashboard/history?${params.toString()}`);
  }

  function goToPrevMonth() {
    if (selectedMonth === 0) {
      handleChange(11, selectedYear - 1);
    } else {
      handleChange(selectedMonth - 1, selectedYear);
    }
  }

  function goToNextMonth() {
    const isCurrentMonth =
      selectedMonth === now.getMonth() && selectedYear === now.getFullYear();
    if (isCurrentMonth) return;

    if (selectedMonth === 11) {
      handleChange(0, selectedYear + 1);
    } else {
      handleChange(selectedMonth + 1, selectedYear);
    }
  }

  const isCurrentMonth =
    selectedMonth === now.getMonth() && selectedYear === now.getFullYear();

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl px-4 py-3 w-fit">
      <button
        onClick={goToPrevMonth}
        className="text-brand-charcoal/40 hover:text-brand-charcoal transition-colors font-body text-lg"
      >
        ←
      </button>
      <span className="font-body text-sm font-medium text-brand-charcoal min-w-32 text-center">
        {MONTHS[selectedMonth]} {selectedYear}
      </span>
      <button
        onClick={goToNextMonth}
        disabled={isCurrentMonth}
        className="text-brand-charcoal/40 hover:text-brand-charcoal transition-colors font-body text-lg disabled:opacity-20"
      >
        →
      </button>
    </div>
  );
}