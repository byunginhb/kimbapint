"use client"

import {
  Landmark,
  Cpu,
  Trophy,
  Palette,
  Briefcase,
  Sparkles,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { getCategoriesWithCounts, getMarketsByCategory } from "@/lib/yegeon-data"
import type { Category } from "@/lib/yegeon-types"
import MarketFeedCard from "@/components/yegeon/feed/MarketFeedCard"

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  politics: <Landmark className="h-5 w-5" />,
  technology: <Cpu className="h-5 w-5" />,
  sports: <Trophy className="h-5 w-5" />,
  culture: <Palette className="h-5 w-5" />,
  business: <Briefcase className="h-5 w-5" />,
  fun: <Sparkles className="h-5 w-5" />,
}

export default function ExplorePage() {
  const tExplore = useTranslations("yExplore")
  const categories = getCategoriesWithCounts()

  return (
    <div className="px-4 py-6">
      <h1 className="mb-6 text-xl font-bold yg-text-ink-900">{tExplore("title")}</h1>

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
  const t = useTranslations("categories")
  const tExplore = useTranslations("yExplore")
  const markets = getMarketsByCategory(category).slice(0, 3)
  const icon = CATEGORY_ICONS[category] ?? <Sparkles className="h-5 w-5" />

  return (
    <section className="rounded-xl border yg-border-canvas-100 yg-bg-canvas-0">
      <div className="flex items-center gap-2 border-b yg-border-canvas-100 px-4 py-3">
        <span className="yg-text-primary-500">{icon}</span>
        <h2 className="text-sm font-semibold yg-text-ink-900">{t(category)}</h2>
        <span className="text-xs yg-text-ink-400">{tExplore("marketCount", { count })}</span>
      </div>

      <div>
        {markets.map((market) => (
          <MarketFeedCard key={market.id} market={market} />
        ))}
      </div>
    </section>
  )
}
