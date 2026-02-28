"use client"

import { useTranslations } from "next-intl"
import { Activity, Globe, TrendingUp, MapPin } from "lucide-react"
import type { GlobeStats as GlobeStatsType } from "@/lib/globe-data"
import { formatGlobeVolume } from "@/lib/globe-data"

interface GlobeStatsProps {
  stats: GlobeStatsType
}

export default function GlobeStats({ stats }: GlobeStatsProps) {
  const t = useTranslations("globe")

  const items = [
    {
      icon: Globe,
      label: t("stats.activeMarkets"),
      value: stats.activeMarkets.toString(),
      color: "#00ff88",
    },
    {
      icon: TrendingUp,
      label: t("stats.volume24h"),
      value: formatGlobeVolume(stats.volume24h),
      color: "#ffd93d",
    },
    {
      icon: Activity,
      label: t("stats.tps"),
      value: stats.tps.toFixed(1),
      color: "#4d96ff",
    },
    {
      icon: MapPin,
      label: t("stats.countries"),
      value: stats.totalCountries.toString(),
      color: "#cc5de8",
    },
  ]

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono"
          style={{
            background: "rgba(20,20,40,0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(0,150,255,0.2)",
          }}
        >
          <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-white/50">{item.label}</span>
            <span className="text-sm font-bold text-white">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
