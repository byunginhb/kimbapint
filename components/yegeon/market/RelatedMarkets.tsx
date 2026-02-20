import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import type { YeGeonMarket } from "@/lib/yegeon-types"

interface RelatedMarketsProps {
  markets: YeGeonMarket[]
}

export default function RelatedMarkets({ markets }: RelatedMarketsProps) {
  const t = useTranslations("yMarket")

  if (markets.length === 0) return null

  return (
    <div className="rounded-lg border yg-border-canvas-100 yg-bg-canvas-50/50 p-4">
      <h3 className="mb-3 text-sm font-medium yg-text-ink-600">{t("relatedMarkets")}</h3>

      <div className="flex flex-col gap-2">
        {markets.map((market) => {
          const percent = Math.round(market.probability * 100)
          const isYesFavored = market.probability >= 0.5

          return (
            <Link
              key={market.id}
              href={`/yegeon/question/${market.slug}`}
              className="yegeon-card-hover rounded-lg border yg-border-canvas-100 yg-bg-canvas-50 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="min-w-0 flex-1 text-xs leading-snug yg-text-ink-600 sm:text-sm">
                  {market.title}
                </p>
                <span
                  className={cn(
                    "flex-shrink-0 text-sm font-bold tabular-nums",
                    isYesFavored ? "yg-text-yes-500" : "yg-text-no-500"
                  )}
                >
                  {percent}%
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
