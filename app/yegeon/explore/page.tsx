"use client"

import {
  Landmark,
  Cpu,
  Trophy,
  Palette,
  Briefcase,
  Sparkles,
} from "lucide-react"
import { getCategoriesWithCounts, getMarketsByCategory } from "@/lib/yegeon-data"
import type { Category } from "@/lib/yegeon-types"
import MarketFeedCard from "@/components/yegeon/feed/MarketFeedCard"

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  정치: <Landmark className="h-5 w-5" />,
  기술: <Cpu className="h-5 w-5" />,
  스포츠: <Trophy className="h-5 w-5" />,
  문화: <Palette className="h-5 w-5" />,
  비즈니스: <Briefcase className="h-5 w-5" />,
  재미: <Sparkles className="h-5 w-5" />,
}

export default function ExplorePage() {
  const categories = getCategoriesWithCounts()

  return (
    <div className="px-4 py-6">
      <h1 className="mb-6 text-xl font-bold yg-text-ink-900">탐색</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {categories.map(({ category, count }) => (
          <CategorySection
            key={category}
            category={category}
            count={count}
          />
        ))}
      </div>
    </div>
  )
}

function CategorySection({
  category,
  count,
}: {
  category: Category
  count: number
}) {
  const markets = getMarketsByCategory(category).slice(0, 3)
  const icon = CATEGORY_ICONS[category] ?? <Sparkles className="h-5 w-5" />

  return (
    <section className="rounded-xl border yg-border-canvas-100 yg-bg-canvas-0">
      <div className="flex items-center gap-2 border-b yg-border-canvas-100 px-4 py-3">
        <span className="yg-text-primary-500">{icon}</span>
        <h2 className="text-sm font-semibold yg-text-ink-900">{category}</h2>
        <span className="text-xs yg-text-ink-400">{count}개 마켓</span>
      </div>

      <div>
        {markets.map((market) => (
          <MarketFeedCard key={market.id} market={market} />
        ))}
      </div>
    </section>
  )
}
