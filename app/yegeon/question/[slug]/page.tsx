"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import QuestionHeader from "@/components/yegeon/market/QuestionHeader"
import BinaryBetting from "@/components/yegeon/market/BinaryBetting"
import MultipleChoice from "@/components/yegeon/market/MultipleChoice"
import ProbabilityChart from "@/components/yegeon/market/ProbabilityChart"
import CommentSection from "@/components/yegeon/market/CommentSection"
import RelatedMarkets from "@/components/yegeon/market/RelatedMarkets"
import {
  getMarketBySlug,
  getCommentsByMarketId,
  getRelatedMarkets,
} from "@/lib/yegeon-data"

export default function YeGeonQuestionPage() {
  const params = useParams()
  const slug = params.slug as string

  const market = getMarketBySlug(slug)

  if (!market) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20">
        <p className="text-lg yg-text-ink-400">마켓을 찾을 수 없습니다.</p>
        <Link
          href="/yegeon"
          className="flex items-center gap-1 text-sm yg-text-primary-500 hover:yg-text-primary-400"
        >
          <ArrowLeft className="h-4 w-4" />
          메인으로 돌아가기
        </Link>
      </div>
    )
  }

  const marketComments = getCommentsByMarketId(market.id)
  const related = getRelatedMarkets(market.slug, 3)
  const isBinary = market.type === "binary"

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6">
      <Link
        href="/yegeon"
        className="mb-4 inline-flex items-center gap-1 text-sm yg-text-ink-400 hover:yg-text-ink-800"
      >
        <ArrowLeft className="h-4 w-4" />
        뒤로
      </Link>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="min-w-0 flex-1">
          <QuestionHeader market={market} />

          <div className="mt-6">
            <ProbabilityChart
              data={market.probabilityHistory}
              color={isBinary ? "#14b8a6" : "#6366f1"}
            />
          </div>

          <div className="mt-6">
            <CommentSection comments={marketComments} />
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-80">
          {isBinary ? (
            <BinaryBetting probability={market.probability} />
          ) : (
            <MultipleChoice options={market.options ?? []} />
          )}

          <RelatedMarkets markets={related} />
        </div>
      </div>
    </div>
  )
}
