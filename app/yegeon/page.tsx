"use client"

import { useState, useMemo } from "react"
import { TrendingUp, BarChart3 } from "lucide-react"
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
      category === "전체"
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
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 yg-text-primary-500" />
          <h1 className="text-xl font-bold yg-text-ink-1000">예측 마켓</h1>
        </div>
        <p className="mt-1 text-sm yg-text-ink-400">
          집단지성으로 미래를 예측하세요
        </p>
      </div>

      <CategoryTabs selected={category} onChange={setCategory} />

      <div className="mt-4 flex items-center justify-between">
        <SortControls selected={sort} onChange={setSort} />
        <div className="flex items-center gap-1.5 text-xs yg-text-ink-400">
          <BarChart3 className="h-3.5 w-3.5" />
          <span>{filtered.length}개 마켓</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
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
