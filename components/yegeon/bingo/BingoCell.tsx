import { Link } from "@/i18n/navigation"
import { Star } from "lucide-react"
import type { BingoCellData } from "@/lib/yegeon-types"
import { FREE_SPACE_INDEX } from "@/lib/yegeon-bingo-utils"

interface BingoCellProps {
  cell: BingoCellData
  index: number
}

export default function BingoCell({ cell, index }: BingoCellProps) {
  const isFreeSpace = index === FREE_SPACE_INDEX

  if (isFreeSpace) {
    return (
      <div className="yegeon-bingo-cell yg-bg-bingo-free flex flex-col items-center justify-center gap-0.5 rounded border yg-border-bingo-free">
        <Star className="h-4 w-4 yg-text-bingo-free" />
        <span className="text-[10px] font-bold yg-text-bingo-free">FREE</span>
      </div>
    )
  }

  const borderClass =
    cell.status === "resolved_yes"
      ? "yegeon-bingo-cell-yes"
      : cell.status === "resolved_no"
        ? "yegeon-bingo-cell-no"
        : "yegeon-bingo-cell-active"

  const probText =
    cell.resolved === true
      ? "100%"
      : cell.resolved === false
        ? "0%"
        : `${(cell.prob * 100).toFixed(0)}%`

  const probColor =
    cell.resolved === true
      ? "yg-text-yes-500"
      : cell.resolved === false
        ? "yg-text-no-500"
        : "yg-text-ink-900"

  return (
    <Link
      href={cell.url}
      className={`yegeon-bingo-cell flex flex-col justify-between rounded ${borderClass} transition-opacity hover:opacity-80`}
    >
      <p className="line-clamp-3 text-[11px] leading-snug yg-text-ink-600">
        {cell.question}
      </p>
      <span className={`text-base font-bold tabular-nums ${probColor}`}>
        {probText}
      </span>
    </Link>
  )
}
