import Link from "next/link"
import { MessageCircle, Users, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatVolume, getCommentsByMarketId } from "@/lib/yegeon-data"
import type { YeGeonMarket } from "@/lib/yegeon-types"
import TopicTags from "./TopicTags"

interface MarketFeedCardProps {
  market: YeGeonMarket
}

export default function MarketFeedCard({ market }: MarketFeedCardProps) {
  const isBinary = market.type === "binary"
  const commentCount = getCommentsByMarketId(market.id).length

  return (
    <Link href={`/yegeon/question/${market.slug}`}>
      <div className="yegeon-card-hover rounded-lg border yg-border-canvas-100 yg-bg-canvas-50/50 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold leading-snug yg-text-ink-900 sm:text-base">
              {market.title}
            </h3>

            <div className="mt-2 flex items-center gap-3 text-xs yg-text-ink-400">
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {market.totalTraders.toLocaleString("ko-KR")}명
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" />
                {formatVolume(market.volume)}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5" />
                {commentCount}
              </span>
            </div>

            <TopicTags tags={market.tags} className="mt-2.5" />
          </div>

          <div className="flex-shrink-0 text-right">
            {isBinary ? (
              <BinaryProbability probability={market.probability} />
            ) : (
              <MultiChoicePreview options={market.options ?? []} />
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

function BinaryProbability({ probability }: { probability: number }) {
  const percent = Math.round(probability * 100)
  const isYesFavored = probability >= 0.5

  return (
    <div className="flex flex-col items-end gap-1">
      <span
        className={cn(
          "text-2xl font-bold tabular-nums",
          isYesFavored ? "yg-text-yes-500" : "yg-text-no-500"
        )}
      >
        {percent}%
      </span>
      <span className="text-xs yg-text-ink-400">확률</span>
    </div>
  )
}

function MultiChoicePreview({
  options,
}: {
  options: { label: string; probability: number; color: string }[]
}) {
  const top = options.slice(0, 2)
  return (
    <div className="flex flex-col gap-1">
      {top.map((opt) => (
        <div key={opt.label} className="flex items-center gap-2 text-right">
          <span className="text-xs yg-text-ink-400">{opt.label}</span>
          <span
            className="text-sm font-bold tabular-nums"
            style={{ color: opt.color }}
          >
            {Math.round(opt.probability * 100)}%
          </span>
        </div>
      ))}
      {options.length > 2 && (
        <span className="text-xs yg-text-ink-400">
          +{options.length - 2}개 선택지
        </span>
      )}
    </div>
  )
}
