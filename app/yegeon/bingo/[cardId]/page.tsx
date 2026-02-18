"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Target, Wallet } from "lucide-react"
import { getBingoCardById } from "@/lib/yegeon-bingo-data"
import { analyzeAllLines } from "@/lib/yegeon-bingo-utils"
import BingoCardHeader from "@/components/yegeon/bingo/BingoCardHeader"
import BingoGrid from "@/components/yegeon/bingo/BingoGrid"

interface BingoCardDetailPageProps {
  params: Promise<{ cardId: string }>
}

export default function BingoCardDetailPage({ params }: BingoCardDetailPageProps) {
  const { cardId } = use(params)
  const card = getBingoCardById(cardId)

  if (!card) {
    return (
      <div className="flex flex-col items-center gap-4 px-4 py-20">
        <p className="text-sm yg-text-ink-500">카드를 찾을 수 없습니다.</p>
        <Link
          href="/yegeon/bingo"
          className="text-sm font-medium yg-text-primary-500 hover:yg-text-primary-400"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>
    )
  }

  const lines = analyzeAllLines(card.grid)
  const createdDate = new Date(card.createdTime).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      {/* Back link */}
      <Link
        href="/yegeon/bingo"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium yg-text-ink-500 hover:yg-text-ink-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        목록으로 돌아가기
      </Link>

      {/* Card header */}
      <div className="mb-6">
        <BingoCardHeader card={card} />
      </div>

      {/* Bingo grid */}
      <div className="mb-6">
        <BingoGrid grid={card.grid} lines={lines} />
      </div>

      {/* Card details */}
      <div className="rounded-xl border yg-border-canvas-100 p-4">
        <h3 className="mb-3 text-sm font-semibold yg-text-ink-900">카드 상세 정보</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 yg-text-ink-400" />
            <span className="yg-text-ink-500">생성일</span>
            <span className="ml-auto font-medium yg-text-ink-900">{createdDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Wallet className="h-4 w-4 yg-text-ink-400" />
            <span className="yg-text-ink-500">구매가</span>
            <span className="ml-auto font-medium yg-text-ink-900">
              Ⓜ{card.purchasePrice.toLocaleString("ko-KR")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 yg-text-ink-400" />
            <span className="yg-text-ink-500">목표 승률</span>
            <span className="ml-auto font-medium yg-text-ink-900">
              {(card.targetWinProb * 100).toFixed(0)}%
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 yg-text-ink-400" />
            <span className="yg-text-ink-500">현재 승률</span>
            <span className="ml-auto font-bold yg-text-primary-500">
              {(card.winProbability * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
