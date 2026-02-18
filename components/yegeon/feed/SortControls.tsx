"use client"

import { cn } from "@/lib/utils"
import { ChevronDown, SlidersHorizontal } from "lucide-react"
import type { SortOption } from "@/lib/yegeon-types"

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popular", label: "인기순" },
  { value: "trending", label: "화제순" },
  { value: "newest", label: "최신순" },
]

interface SortControlsProps {
  selected: SortOption
  onChange: (sort: SortOption) => void
}

export default function SortControls({ selected, onChange }: SortControlsProps) {
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
          {opt.label}
        </button>
      ))}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Placeholder: status filter */}
      <button
        type="button"
        className="flex items-center gap-1 whitespace-nowrap px-2 py-2 text-sm yg-text-ink-400 transition-colors hover:yg-text-ink-800"
      >
        모든 상태
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {/* Placeholder: my bets */}
      <button
        type="button"
        className="whitespace-nowrap px-2 py-2 text-sm yg-text-ink-400 transition-colors hover:yg-text-ink-800"
      >
        내 베팅
      </button>

      {/* Settings gear */}
      <button
        type="button"
        aria-label="정렬 설정"
        className="rounded p-1.5 yg-text-ink-400 transition-colors hover:yg-bg-canvas-50 hover:yg-text-ink-800"
      >
        <SlidersHorizontal className="h-4 w-4" />
      </button>
    </div>
  )
}
