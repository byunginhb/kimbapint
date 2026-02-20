import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Clock, Users, TrendingUp, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatVolume, getUserByUsername } from "@/lib/yegeon-data"
import UserAvatar from "../common/UserAvatar"
import { formatDate } from "@/lib/utils"
import type { YeGeonMarket } from "@/lib/yegeon-types"
import TopicTags from "../feed/TopicTags"

interface QuestionHeaderProps {
  market: YeGeonMarket
}

export default function QuestionHeader({ market }: QuestionHeaderProps) {
  const t = useTranslations("yMarket")
  const locale = useLocale()
  const creator = getUserByUsername(market.creatorUsername)

  return (
    <div>
      <div className="flex items-center gap-2 text-xs yg-text-ink-400">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 font-medium",
            market.status === "open"
              ? "yg-bg-yes-100/10 yg-text-yes-500"
              : "yg-bg-canvas-100 yg-text-ink-400"
          )}
        >
          {market.status === "open" ? t("open") : t("closed")}
        </span>
        <span>{market.category}</span>
      </div>

      <h1 className="mt-3 text-xl font-bold leading-tight yg-text-ink-1000 sm:text-2xl">
        {market.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs yg-text-ink-400">
        {creator && (
          <Link
            href={`/yegeon/${creator.username}`}
            className="flex items-center gap-1.5 hover:yg-text-ink-800"
          >
            <UserAvatar size={20} />
            <span>{creator.displayName}</span>
          </Link>
        )}
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {t("deadline")}: {formatDate(market.closeDate, locale)}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {t("traders", { count: market.totalTraders.toLocaleString(locale === "ko" ? "ko-KR" : "en-US") })}
        </span>
        <span className="flex items-center gap-1">
          <TrendingUp className="h-3.5 w-3.5" />
          {formatVolume(market.volume, locale)} {t("volume")}
        </span>
      </div>

      <TopicTags tags={market.tags} className="mt-3" />

      {market.isResolved && market.resolution && (
        <div className="mt-3 flex items-center gap-2 rounded-lg yg-bg-yes-100/10 px-3 py-2 text-sm yg-text-yes-500">
          <CheckCircle className="h-4 w-4" />
          {t("resolution")}: {market.resolution}
        </div>
      )}

      <div className="mt-4 rounded-lg border yg-border-canvas-100 yg-bg-canvas-50/30 p-3">
        <p className="text-sm leading-relaxed yg-text-ink-600">
          {market.description}
        </p>
      </div>
    </div>
  )
}
