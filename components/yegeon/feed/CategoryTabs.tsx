"use client"

import { cn } from "@/lib/utils"
import type { Category } from "@/lib/yegeon-types"

const categories: Category[] = [
  "전체",
  "팔로우",
  "정치",
  "기술",
  "스포츠",
  "문화",
  "비즈니스",
  "재미",
]

interface CategoryTabsProps {
  selected: Category
  onChange: (category: Category) => void
}

export default function CategoryTabs({ selected, onChange }: CategoryTabsProps) {
  return (
    <div className="scrollbar-hide flex gap-1 overflow-x-auto border-b yg-border-canvas-100 pb-px">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            "relative whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors",
            selected === cat
              ? "yg-text-primary-500 yegeon-tab-active"
              : "yg-text-ink-400 hover:yg-text-ink-800"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
