import Link from "next/link"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatRelativeTime } from "@/lib/utils"
import { formatYeGeonCurrency } from "@/lib/yegeon-data"
import type { Trade } from "@/lib/yegeon-types"

interface TradeHistoryProps {
  trades: Trade[]
}

export default function TradeHistory({ trades }: TradeHistoryProps) {
  if (trades.length === 0) {
    return (
      <div className="py-8 text-center text-sm yg-text-ink-400">
        거래 내역이 없습니다.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {trades.map((trade) => (
        <Link
          key={trade.id}
          href={`/yegeon/question/${trade.marketSlug}`}
          className="yegeon-card-hover rounded-lg border yg-border-canvas-100 yg-bg-canvas-50/30 p-3"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm yg-text-ink-800">
                {trade.marketTitle}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs yg-text-ink-400">
                <span
                  className={cn(
                    "flex items-center gap-0.5 font-medium",
                    trade.direction === "YES"
                      ? "yg-text-yes-500"
                      : "yg-text-no-500"
                  )}
                >
                  {trade.direction === "YES" ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  {trade.direction}
                  {trade.optionLabel ? ` (${trade.optionLabel})` : ""}
                </span>
                <span>·</span>
                <span>{Math.round(trade.probability * 100)}%에 매수</span>
                <span>·</span>
                <span>{formatRelativeTime(trade.timestamp)}</span>
              </div>
            </div>

            <span className="whitespace-nowrap text-sm font-medium yg-text-ink-800">
              {formatYeGeonCurrency(trade.amount)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
