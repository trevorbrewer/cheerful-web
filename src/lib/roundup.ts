export function calculateRoundup(amount: number): number {
  if (amount <= 0) return 0;
  const ceiling = Math.ceil(amount);
  const roundup = ceiling - amount;
  return roundup === 0 ? 1.00 : parseFloat(roundup.toFixed(2));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getCurrentMonthRange(): { startDate: string; endDate: string } {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];
  return { startDate, endDate };
}