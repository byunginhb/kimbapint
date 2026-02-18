export function Spinner() {
  return (
    <span className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-bet-spinner" />
  )
}

export function CheckCircleIcon() {
  return (
    <svg
      className="h-12 w-12 animate-bet-pop"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
