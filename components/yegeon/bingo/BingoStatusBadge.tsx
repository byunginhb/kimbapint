import type { BingoCardStatus } from "@/lib/yegeon-types"

interface BingoStatusBadgeProps {
  status: BingoCardStatus
  size?: "sm" | "md"
}

const STATUS_CONFIG = {
  active: { label: "진행중", className: "yg-bg-primary-100/20 yg-text-primary-500" },
  won: { label: "우승!", className: "yg-bg-yes-600/20 yg-text-yes-500" },
  lost: { label: "탈락", className: "yg-bg-no-600/20 yg-text-no-500" },
} as const

export default function BingoStatusBadge({ status, size = "sm" }: BingoStatusBadgeProps) {
  const { label, className } = STATUS_CONFIG[status]
  const sizeClass = size === "sm"
    ? "px-2 py-0.5 text-[10px]"
    : "px-2.5 py-1 text-xs"

  return (
    <span className={`rounded-full font-bold ${sizeClass} ${className}`}>
      {label}
    </span>
  )
}
