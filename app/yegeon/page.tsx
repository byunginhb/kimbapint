"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import CategoryTabs from "@/components/yegeon/feed/CategoryTabs"
import SortControls from "@/components/yegeon/feed/SortControls"
import MarketFeedCard from "@/components/yegeon/feed/MarketFeedCard"
import { markets } from "@/lib/yegeon-data"
import type { Category, SortOption } from "@/lib/yegeon-types"

export default function YeGeonFeedPage() {
  const [category, setCategory] = useState<Category>("전체")
  const [sort, setSort] = useState<SortOption>("popular")

  const filtered = useMemo(() => {
    const byCategory =
      category === "전체" || category === "팔로우"
        ? markets
        : markets.filter((m) => m.category === category)

    return [...byCategory].sort((a, b) => {
      switch (sort) {
        case "popular":
          return b.volume - a.volume
        case "trending":
          return b.totalTraders - a.totalTraders
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        default:
          return 0
      }
    })
  }, [category, sort])

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <CategoryTabs selected={category} onChange={setCategory} />

      {/* Search bar */}
      <div className="mt-4 flex items-center gap-2 rounded-lg border yg-border-canvas-100 yg-bg-canvas-50/30 px-3 py-2">
        <Search className="h-4 w-4 shrink-0 yg-text-ink-400" />
        <input
          type="text"
          placeholder="마켓 검색..."
          readOnly
          className="w-full bg-transparent text-sm yg-text-ink-900 placeholder:yg-text-ink-400 outline-none"
        />
      </div>

      <div className="mt-4">
        <SortControls selected={sort} onChange={setSort} />
      </div>

      <div className="mt-2 flex flex-col">
        {filtered.map((market) => (
          <MarketFeedCard key={market.id} market={market} />
        ))}

        {filtered.length === 0 && (
          <div className="rounded-lg border yg-border-canvas-100 yg-bg-canvas-50/30 py-12 text-center">
            <p className="yg-text-ink-400">
              해당 카테고리에 마켓이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
