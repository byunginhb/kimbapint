"use client"

import { useTranslations, useLocale } from "next-intl"
import { ArrowUp, ArrowDown } from "lucide-react"
import type { GlobeTrade } from "@/lib/globe-data"

interface TradeFeedProps {
  trades: GlobeTrade[]
  onTradeClick: (trade: GlobeTrade) => void
}

export default function TradeFeed({ trades, onTradeClick }: TradeFeedProps) {
  const t = useTranslations("globe")
  const locale = useLocale()

  return (
    <div
      className="w-72 max-h-full flex flex-col rounded-xl overflow-hidden font-mono"
      style={{
        background: "rgba(20,20,40,0.85)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,150,255,0.2)",
      }}
    >
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-white/10 flex items-center justify-between">
        <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
          {t("feed.title")}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-green-400/80">{t("feed.live")}</span>
        </span>
      </div>

      {/* Trade List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {trades.map((trade) => (
          <button
            key={trade.id}
            onClick={() => onTradeClick(trade)}
            className="w-full text-left px-3 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/80 truncate leading-tight">
                  {trade.marketTitle}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`flex items-center gap-0.5 text-[10px] font-bold ${
                      trade.type === "YES"
                        ? "text-[#00ff88]"
                        : "text-[#ff4466]"
                    }`}
                  >
                    {trade.type === "YES" ? (
                      <ArrowUp className="w-2.5 h-2.5" />
                    ) : (
                      <ArrowDown className="w-2.5 h-2.5" />
                    )}
                    {trade.type}
                  </span>
                  <span className="text-[10px] text-white/40">
                    {trade.amount.toLocaleString()}p
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-white">
                  {(trade.probability * 100).toFixed(0)}%
                </span>
                <p className="text-[10px] text-white/30 mt-0.5">
                  {formatTradeTime(trade.timestamp, locale)}
                </p>
              </div>
            </div>
          </button>
        ))}

        {trades.length === 0 && (
          <div className="px-3 py-8 text-center text-xs text-white/30">
            {t("feed.empty")}
          </div>
        )}
      </div>
    </div>
  )
}

function formatTradeTime(timestamp: string, locale: string): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  })
}
