export function formatCurrency(value: number): string {
  return `₩${value.toLocaleString("ko-KR")}`
}

export function calculateExpectedProfit(
  amount: number,
  probability: number
): number {
  if (probability <= 0) return 0
  return Math.round(amount / probability - amount)
}

export function formatPresetAmount(preset: number): string {
  return preset >= 10000
    ? `${preset / 10000}만`
    : preset.toLocaleString("ko-KR")
}
