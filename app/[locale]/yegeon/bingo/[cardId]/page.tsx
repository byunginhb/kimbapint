"use client"

import { use, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowLeft, Calendar, Target, Wallet, Pencil, Check, X } from "lucide-react"
import { getBingoCardById } from "@/lib/yegeon-bingo-data"
import { analyzeAllLines } from "@/lib/yegeon-bingo-utils"
import type { BingoCellData } from "@/lib/yegeon-types"
import BingoCardHeader from "@/components/yegeon/bingo/BingoCardHeader"
import BingoGrid from "@/components/yegeon/bingo/BingoGrid"

interface BingoCardDetailPageProps {
  params: Promise<{ cardId: string }>
}

export default function BingoCardDetailPage({ params }: BingoCardDetailPageProps) {
  const { cardId } = use(params)
  const locale = useLocale()
  const t = useTranslations("yBingo")
  const card = getBingoCardById(cardId)

  const [isEditing, setIsEditing] = useState(false)
  const [editableGrid, setEditableGrid] = useState<BingoCellData[]>([])

  if (!card) {
    return (
      <div className="flex flex-col items-center gap-4 px-4 py-20">
        <p className="text-sm yg-text-ink-500">{t("cardNotFound")}</p>
        <Link
          href="/yegeon/bingo"
          className="text-sm font-medium yg-text-primary-500 hover:yg-text-primary-400"
        >
          ← {t("backToList")}
        </Link>
      </div>
    )
  }

  const displayGrid = isEditing ? editableGrid : card.grid
  const lines = analyzeAllLines(displayGrid)

  const createdDate = new Date(card.createdTime).toLocaleDateString(
    locale === "ko" ? "ko-KR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  )

  const handleStartEditing = () => {
    setEditableGrid([...card.grid])
    setIsEditing(true)
  }

  const handleConfirm = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditableGrid([])
    setIsEditing(false)
  }

  const handleSwapCells = (fromIndex: number, toIndex: number) => {
    setEditableGrid((prev) =>
      prev.map((cell, i) => {
        if (i === fromIndex) return prev[toIndex]
        if (i === toIndex) return prev[fromIndex]
        return cell
      })
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      {/* Back link */}
      <Link
        href="/yegeon/bingo"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium yg-text-ink-500 hover:yg-text-ink-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("backToList")}
      </Link>

      {/* Card header */}
      <div className="mb-6">
        <BingoCardHeader card={card} />
      </div>

      {/* Edit controls */}
      <div className="mb-3 flex items-center justify-between">
        {isEditing ? (
          <>
            <p className="text-xs yg-text-ink-400">{t("editMode")}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-1.5 rounded-lg border yg-border-canvas-100 px-3 py-1.5 text-xs font-medium yg-text-ink-600 transition-colors hover:yg-bg-canvas-50"
              >
                <X className="h-3.5 w-3.5" />
                {t("cancel")}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="inline-flex items-center gap-1.5 rounded-lg yg-bg-primary-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:yg-bg-primary-600"
              >
                <Check className="h-3.5 w-3.5" />
                {t("confirm")}
              </button>
            </div>
          </>
        ) : (
          <>
            <div />
            <button
              type="button"
              onClick={handleStartEditing}
              className="inline-flex items-center gap-1.5 rounded-lg border yg-border-canvas-100 px-3 py-1.5 text-xs font-medium yg-text-ink-600 transition-colors hover:yg-bg-canvas-50"
            >
              <Pencil className="h-3.5 w-3.5" />
              {t("edit")}
            </button>
          </>
        )}
      </div>

      {/* Bingo grid */}
      <div className="mb-6">
        <BingoGrid
          grid={displayGrid}
          lines={lines}
          isEditing={isEditing}
          onSwapCells={handleSwapCells}
        />
      </div>

      {/* Card details */}
      <div className="rounded-xl border yg-border-canvas-100 p-4">
        <h3 className="mb-3 text-sm font-semibold yg-text-ink-900">{t("cardDetails")}</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 yg-text-ink-400" />
            <span className="yg-text-ink-500">{t("createdAt")}</span>
            <span className="ml-auto font-medium yg-text-ink-900">{createdDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Wallet className="h-4 w-4 yg-text-ink-400" />
            <span className="yg-text-ink-500">{t("purchasePrice")}</span>
            <span className="ml-auto font-medium yg-text-ink-900">
              Ⓜ{card.purchasePrice.toLocaleString(locale === "ko" ? "ko-KR" : "en-US")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 yg-text-ink-400" />
            <span className="yg-text-ink-500">{t("targetWinRate")}</span>
            <span className="ml-auto font-medium yg-text-ink-900">
              {(card.targetWinProb * 100).toFixed(0)}%
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 yg-text-ink-400" />
            <span className="yg-text-ink-500">{t("currentWinRate")}</span>
            <span className="ml-auto font-bold yg-text-primary-500">
              {(card.winProbability * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
