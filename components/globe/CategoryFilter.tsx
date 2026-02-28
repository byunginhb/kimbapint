"use client"

import { useTranslations } from "next-intl"
import type { GlobeCategory } from "@/lib/globe-data"
import { GLOBE_CATEGORY_CONFIG } from "@/lib/globe-data"

interface CategoryFilterProps {
  selected: GlobeCategory
  onChange: (category: GlobeCategory) => void
}

const CATEGORIES: GlobeCategory[] = [
  "all",
  "politics",
  "economy",
  "sports",
  "technology",
  "society",
  "culture",
]

export default function CategoryFilter({
  selected,
  onChange,
}: CategoryFilterProps) {
  const t = useTranslations("globe")

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => {
        const isAll = cat === "all"
        const isActive = selected === cat
        const config = isAll ? null : GLOBE_CATEGORY_CONFIG[cat]

        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`
              px-3 py-1.5 rounded-full text-xs font-mono font-medium
              transition-all duration-200 border
              ${
                isActive
                  ? "bg-white/15 border-white/30 text-white shadow-lg"
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80"
              }
            `}
            style={
              isActive && config
                ? { borderColor: `${config.color}80`, boxShadow: `0 0 8px ${config.color}30` }
                : undefined
            }
          >
            {config && (
              <span
                className="inline-block w-2 h-2 rounded-full mr-1.5"
                style={{ backgroundColor: config.color }}
              />
            )}
            {t(`categories.${cat}`)}
          </button>
        )
      })}
    </div>
  )
}
