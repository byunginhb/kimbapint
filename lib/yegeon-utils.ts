export function formatCurrency(value: number, locale = "ko"): string {
  return `₩${value.toLocaleString(locale === "ko" ? "ko-KR" : "en-US")}`
}

export function calculateExpectedProfit(
  amount: number,
  probability: number
): number {
  if (probability <= 0) return 0
  return Math.round(amount / probability - amount)
}

export function formatPresetAmount(preset: number, locale = "ko"): string {
  return preset >= 10000
    ? `${preset / 10000}만`
    : preset.toLocaleString(locale === "ko" ? "ko-KR" : "en-US")
}
