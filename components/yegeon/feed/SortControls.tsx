"use client"

import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { ChevronDown, SlidersHorizontal } from "lucide-react"
import type { SortOption } from "@/lib/yegeon-types"

interface SortControlsProps {
  selected: SortOption
  onChange: (sort: SortOption) => void
}

export default function SortControls({ selected, onChange }: SortControlsProps) {
  const t = useTranslations("ySort")

  const sortOptions: { value: SortOption; labelKey: "popular" | "trending" | "newest" }[] = [
    { value: "popular", labelKey: "popular" },
    { value: "trending", labelKey: "trending" },
    { value: "newest", labelKey: "newest" },
  ]

  return (
    <div className="flex items-center gap-1 border-b yg-border-canvas-100 pb-px">
      {/* Sort tabs */}
      {sortOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "relative whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
            selected === opt.value
              ? "yegeon-sort-tab-active"
              : "yg-text-ink-400 hover:yg-text-ink-800"
          )}
        >
          {t(opt.labelKey)}
        </button>
      ))}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Placeholder: status filter */}
      <button
        type="button"
        className="flex items-center gap-1 whitespace-nowrap px-2 py-2 text-sm yg-text-ink-400 transition-colors hover:yg-text-ink-800"
      >
        {t("allStatus")}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {/* Placeholder: my bets */}
      <button
        type="button"
        className="whitespace-nowrap px-2 py-2 text-sm yg-text-ink-400 transition-colors hover:yg-text-ink-800"
      >
        {t("myBets")}
      </button>

      {/* Settings gear */}
      <button
        type="button"
        aria-label={t("sortSettings")}
        className="rounded p-1.5 yg-text-ink-400 transition-colors hover:yg-bg-canvas-50 hover:yg-text-ink-800"
      >
        <SlidersHorizontal className="h-4 w-4" />
      </button>
    </div>
  )
}
