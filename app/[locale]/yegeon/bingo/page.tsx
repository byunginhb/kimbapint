"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { getBingoCards, getBingoStats } from "@/lib/yegeon-bingo-data"
import BingoStats from "@/components/yegeon/bingo/BingoStats"
import BingoCardPreview from "@/components/yegeon/bingo/BingoCardPreview"
import UserAvatar from "@/components/yegeon/common/UserAvatar"

type Tab = "cards" | "leaderboard"

export default function BingoPage() {
  const t = useTranslations("yBingo")
  const [tab, setTab] = useState<Tab>("cards")
  const cards = getBingoCards()
  const stats = getBingoStats()

  const leaderboard = [...cards]
    .sort((a, b) => b.winProbability - a.winProbability)
    .map((card, i) => ({ ...card, rank: i + 1 }))

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      {/* Header */}
      <h1 className="mb-1 text-xl font-bold yg-text-ink-900">{t("title")}</h1>
      <p className="mb-5 text-sm yg-text-ink-500">
        {t("description")}
      </p>

      {/* Stats */}
      <div className="mb-5">
        <BingoStats
          totalCards={stats.totalCards}
          activeCards={stats.activeCards}
          winners={stats.winners}
        />
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-4 border-b yg-border-canvas-100 pb-px">
        {(["cards", "leaderboard"] as const).map((tabKey) => (
          <button
            key={tabKey}
            type="button"
            onClick={() => setTab(tabKey)}
            className={`pb-2 text-sm font-medium transition-colors ${
              tab === tabKey
                ? "yegeon-sort-tab-active"
                : "yg-text-ink-400 hover:yg-text-ink-700"
            }`}
          >
            {tabKey === "cards" ? t("allCards") : t("leaderboard")}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "cards" ? (
        <div className="flex flex-col gap-3">
          {cards.map((card) => (
            <BingoCardPreview key={card.cardId} card={card} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b yg-border-canvas-100 text-left">
                <th className="pb-2 pr-3 font-medium yg-text-ink-500">#</th>
                <th className="pb-2 pr-3 font-medium yg-text-ink-500">{t("user")}</th>
                <th className="pb-2 pr-3 text-right font-medium yg-text-ink-500">{t("cards")}</th>
                <th className="pb-2 pr-3 text-right font-medium yg-text-ink-500">{t("wins")}</th>
                <th className="pb-2 text-right font-medium yg-text-ink-500">{t("winRate")}</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => {
                const totalCards = cards.filter(
                  (c) => c.username === entry.username,
                ).length
                const wins = cards.filter(
                  (c) => c.username === entry.username && c.status === "won",
                ).length

                return (
                  <tr
                    key={entry.cardId}
                    className="yegeon-row-hover"
                  >
                    <td className="py-2.5 pr-3 font-medium yg-text-ink-500">
                      {entry.rank}
                    </td>
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2">
                        <UserAvatar
                          size={24}
                          displayName={entry.displayName}
                          colorSeed={entry.username}
                        />
                        <span className="font-medium yg-text-ink-900">
                          {entry.displayName}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-3 text-right tabular-nums yg-text-ink-700">
                      {totalCards}
                    </td>
                    <td className="py-2.5 pr-3 text-right tabular-nums yg-text-yes-500">
                      {wins}
                    </td>
                    <td className="py-2.5 text-right tabular-nums font-bold yg-text-ink-900">
                      {(entry.winProbability * 100).toFixed(0)}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
