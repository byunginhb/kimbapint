import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Users, Gem } from "lucide-react"
import { cn } from "@/lib/utils"
import { getUserByUsername } from "@/lib/yegeon-data"
import type { YeGeonMarket } from "@/lib/yegeon-types"
import UserAvatar from "@/components/yegeon/common/UserAvatar"

interface MarketFeedCardProps {
  market: YeGeonMarket
}

function getRecentChange(market: YeGeonMarket): number | null {
  const history = market.probabilityHistory
  if (history.length < 2) return null
  const current = history[history.length - 1].probability
  const previous = history[history.length - 2].probability
  const diff = Math.round((current - previous) * 100)
  return diff === 0 ? null : diff
}

export default function MarketFeedCard({ market }: MarketFeedCardProps) {
  const t = useTranslations("yFeed")
  const locale = useLocale()
  const isBinary = market.type === "binary"
  const creator = getUserByUsername(market.creatorUsername)
  const change = isBinary ? getRecentChange(market) : null

  return (
    <Link href={`/yegeon/question/${market.slug}`}>
      <div className="yegeon-row-hover flex items-center gap-3 px-2 py-3">
        {/* Creator avatar */}
        <UserAvatar
          size={24}
          displayName={creator?.displayName}
          colorSeed={creator?.username}
        />

        {/* Title — truncate to single line */}
        <span className="min-w-0 flex-1 truncate text-sm font-medium yg-text-ink-900">
          {market.title}
        </span>

        {/* Traders count — hidden on mobile */}
        <span className="hidden items-center gap-1 text-xs yg-text-ink-400 sm:flex">
          <Users className="h-3.5 w-3.5" />
          {market.totalTraders.toLocaleString(locale === "ko" ? "ko-KR" : "en-US")}
        </span>

        {/* Gem icon — hidden on mobile */}
        <Gem className="hidden h-3.5 w-3.5 yg-text-ink-300 sm:block" />

        {/* Probability / options */}
        {isBinary ? (
          <BinaryDisplay probability={market.probability} change={change} />
        ) : (
          <MultiChoiceBar options={market.options ?? []} />
        )}

        {/* Bet button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          className="shrink-0 rounded-full border yg-border-canvas-100 px-3 py-1 text-xs font-medium yg-text-ink-600 transition-colors hover:yg-bg-canvas-50"
        >
          {t("bet")}
        </button>
      </div>
    </Link>
  )
}

function BinaryDisplay({
  probability,
  change,
}: {
  probability: number
  change: number | null
}) {
  const percent = Math.round(probability * 100)

  return (
    <div className="flex shrink-0 items-center gap-2">
      <span className="text-sm font-bold tabular-nums yg-text-ink-900">
        {percent}%
      </span>
      {change !== null && (
        <span
          className={cn(
            "text-xs font-medium tabular-nums",
            change > 0 ? "yg-text-yes-500" : "yg-text-no-500"
          )}
        >
          {change > 0 ? `+${change}` : change}
        </span>
      )}
    </div>
  )
}

function MultiChoiceBar({
  options,
}: {
  options: { label: string; probability: number; color: string }[]
}) {
  return (
    <div className="flex h-5 w-24 shrink-0 overflow-hidden rounded-full">
      {options.map((opt) => (
        <div
          key={opt.label}
          style={{
            width: `${Math.round(opt.probability * 100)}%`,
            backgroundColor: opt.color,
          }}
          title={`${opt.label}: ${Math.round(opt.probability * 100)}%`}
        />
      ))}
    </div>
  )
}
