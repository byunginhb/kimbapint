"use client"

import { cn } from "@/lib/utils"
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
    <div className="flex items-center gap-2">
      {sortOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-colors",
            selected === opt.value
              ? "yg-bg-primary-500 text-white"
              : "yg-bg-canvas-50 yg-text-ink-400 hover:yg-bg-canvas-100 hover:yg-text-ink-800"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
