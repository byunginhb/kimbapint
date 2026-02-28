"use client"

import { useTranslations } from "next-intl"
import { X, TrendingUp, Clock, MapPin } from "lucide-react"
import type { GlobeMarketFeature } from "@/lib/globe-data"
import { formatGlobeVolume, getStatusColor, GLOBE_CATEGORY_CONFIG } from "@/lib/globe-data"

interface MarketPopupProps {
  market: GlobeMarketFeature
  onClose: () => void
}

export default function MarketPopup({ market, onClose }: MarketPopupProps) {
  const t = useTranslations("globe")
  const { properties: p } = market

  const statusColor = getStatusColor(p.status)
  const categoryConfig = GLOBE_CATEGORY_CONFIG[p.category]

  const lastTradeDate = new Date(p.lastTradeAt)
  const timeAgo = getTimeAgo(lastTradeDate, t)

  return (
    <div
      className="w-80 rounded-xl overflow-hidden font-mono shadow-2xl"
      style={{
        background: "rgba(20,20,40,0.92)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(0,150,255,0.3)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between p-4 pb-2">
        <div className="flex-1 mr-2">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: statusColor }}
            />
            <span className="text-[10px] uppercase tracking-wider text-white/50">
              {t(`statuses.${p.status}`)}
            </span>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: `${categoryConfig.color}20`,
                color: categoryConfig.color,
              }}
            >
              {t(`categories.${p.category}`)}
            </span>
          </div>
          <h3 className="text-sm font-bold text-white leading-tight">
            {p.title}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-white/10 transition-colors text-white/40 hover:text-white/80"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Probability Bar */}
      <div className="px-4 py-3">
        <div className="flex items-end justify-between mb-2">
          <span className="text-3xl font-bold text-white">
            {(p.probability * 100).toFixed(0)}
            <span className="text-lg text-white/50">%</span>
          </span>
          <span className="text-xs text-white/40">{t("popup.probability")}</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${p.probability * 100}%`,
              background: `linear-gradient(90deg, ${statusColor}, ${statusColor}80)`,
            }}
          />
        </div>
      </div>

      {/* Details */}
      <div className="px-4 pb-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-white/50">
            <TrendingUp className="w-3 h-3" />
            <span>{t("popup.volume")}</span>
          </div>
          <span className="text-white font-medium">
            {formatGlobeVolume(p.volume)}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-white/50">
            <MapPin className="w-3 h-3" />
            <span>{t("popup.country")}</span>
          </div>
          <span className="text-white font-medium">{p.country}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-white/50">
            <Clock className="w-3 h-3" />
            <span>{t("popup.lastTrade")}</span>
          </div>
          <span className="text-white font-medium">{timeAgo}</span>
        </div>
      </div>
    </div>
  )
}

type TranslationFn = ReturnType<typeof useTranslations>

function getTimeAgo(date: Date, t: TranslationFn): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)

  if (diffMin < 1) return t("timeAgo.justNow")
  if (diffMin < 60) return t("timeAgo.minutesAgo", { min: diffMin })

  const diffHours = Math.floor(diffMin / 60)
  if (diffHours < 24) return t("timeAgo.hoursAgo", { hours: diffHours })

  const diffDays = Math.floor(diffHours / 24)
  return t("timeAgo.daysAgo", { days: diffDays })
}
