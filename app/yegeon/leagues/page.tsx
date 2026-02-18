"use client"

import { useState, useEffect } from "react"
import { Clock, Trophy, ChevronDown, Star } from "lucide-react"
import type { LeagueTier } from "@/lib/yegeon-types"
import {
  LEAGUE_TIERS,
  TIER_EMOJIS,
  TIER_COLORS,
  CURRENT_SEASON,
  getCurrentUserLeague,
  getLeagueGroups,
  getPromotionRequirement,
  getCurrentUser,
  getMemberDisplayName,
} from "@/lib/yegeon-data"
import UserAvatar from "@/components/yegeon/common/UserAvatar"
import LeaderboardTable from "@/components/yegeon/leagues/LeaderboardTable"

function useRemainingTime(endDate: string) {
  const [remaining, setRemaining] = useState("")

  useEffect(() => {
    function calculate() {
      const now = new Date()
      const end = new Date(endDate)
      const diff = Math.max(0, end.getTime() - now.getTime())
      const days = Math.floor(diff / 86400000)
      const hours = Math.floor((diff % 86400000) / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      setRemaining(`${days}일 ${hours}시간 ${minutes}분`)
    }
    calculate()
    const interval = setInterval(calculate, 60000)
    return () => clearInterval(interval)
  }, [endDate])

  return remaining
}

export default function LeaguesPage() {
  const userLeague = getCurrentUserLeague()
  const currentUser = getCurrentUser()
  const [selectedTier, setSelectedTier] = useState<LeagueTier>(userLeague.tier)
  const [subTab, setSubTab] = useState<"rankings" | "activity">("rankings")

  const groups = getLeagueGroups(selectedTier)
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0)
  const group = groups[selectedGroupIndex]
  const remaining = useRemainingTime(CURRENT_SEASON.endDate)
  const promotionReq = getPromotionRequirement(selectedTier)

  const isUserTier = selectedTier === userLeague.tier
  const tierColor = TIER_COLORS[userLeague.tier]

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="mb-1 flex items-baseline justify-between">
        <h1 className="text-xl font-bold yg-text-ink-900">리그</h1>
        <span className="text-xs font-medium yg-text-primary-500 cursor-pointer">
          전체 리더보드 →
        </span>
      </div>
      <p className="mb-5 text-sm yg-text-ink-500">
        매월 트레이딩 수익을 기반으로 경쟁하세요.
      </p>

      {/* Season bar */}
      <div className="mb-5 flex flex-wrap items-center gap-3 rounded-lg border yg-border-canvas-100 px-4 py-2.5 text-sm">
        <span className="font-semibold yg-text-ink-900">
          시즌 {CURRENT_SEASON.number}: {CURRENT_SEASON.month}
        </span>
        <div className="flex items-center gap-1.5 yg-text-ink-500">
          <Clock className="h-3.5 w-3.5" />
          <span>종료까지 {remaining}</span>
        </div>
        <div className="flex items-center gap-1.5 yg-text-ink-500 cursor-pointer hover:yg-text-ink-700">
          <Trophy className="h-3.5 w-3.5" />
          <span>상품 보기</span>
        </div>
      </div>

      {/* My league card */}
      <div
        className="mb-5 rounded-xl border-2 border-dashed p-4"
        style={{ borderColor: tierColor }}
      >
        <div className="flex items-center gap-4">
          {/* Tier badge */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl">{TIER_EMOJIS[userLeague.tier]}</span>
            <span
              className="text-xs font-bold"
              style={{ color: tierColor }}
            >
              {userLeague.tier}
            </span>
          </div>

          {/* User info */}
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <UserAvatar
              size={36}
              displayName={currentUser.displayName}
              colorSeed={currentUser.username}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold yg-text-ink-900">
                {currentUser.displayName}
              </p>
              <p className="text-xs yg-text-ink-400">{userLeague.groupName}</p>
            </div>
          </div>

          {/* Rank + mana */}
          <div className="text-right">
            <p className="text-lg font-bold yg-text-ink-900">#{userLeague.rank}</p>
            <p
              className={`text-sm font-semibold tabular-nums ${
                userLeague.manaEarned >= 0 ? "yg-text-yes-500" : "yg-text-no-500"
              }`}
            >
              Ⓜ{userLeague.manaEarned >= 0 ? "+" : ""}
              {userLeague.manaEarned.toLocaleString("ko-KR")}
            </p>
          </div>
        </div>
        <p className="mt-2 text-xs yg-text-ink-400">
          {userLeague.tier} 잔류 중
        </p>
      </div>

      {/* Tier tabs */}
      <div className="mb-4 flex gap-1 overflow-x-auto border-b yg-border-canvas-100 pb-px">
        {LEAGUE_TIERS.map((tier) => {
          const isActive = tier === selectedTier
          const isUserTab = tier === userLeague.tier
          return (
            <button
              key={tier}
              type="button"
              onClick={() => {
                setSelectedTier(tier)
                setSelectedGroupIndex(0)
              }}
              className={`flex shrink-0 items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "yegeon-sort-tab-active"
                  : "yg-text-ink-400 hover:yg-text-ink-700"
              }`}
            >
              <span>{TIER_EMOJIS[tier]}</span>
              <span>{tier}</span>
              {isUserTab && (
                <span className="rounded-full yg-bg-primary-500 px-1.5 py-px text-[10px] font-bold text-white">
                  You
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Group selector */}
      {groups.length > 0 && (
        <div className="mb-4 flex items-center gap-2 text-sm">
          <span className="yg-text-ink-500">그룹:</span>
          <div className="relative">
            <select
              value={selectedGroupIndex}
              onChange={(e) => setSelectedGroupIndex(Number(e.target.value))}
              className="appearance-none rounded-lg border yg-border-canvas-100 yg-bg-canvas-0 py-1.5 pl-3 pr-8 text-sm font-medium yg-text-ink-900 outline-none"
            >
              {groups.map((g, i) => (
                <option key={g.id} value={i}>
                  ★ {g.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 yg-text-ink-400" />
          </div>
        </div>
      )}

      {/* Sub tabs: Rankings / Activity */}
      <div className="mb-4 flex gap-4 border-b yg-border-canvas-100 pb-px">
        <button
          type="button"
          onClick={() => setSubTab("rankings")}
          className={`pb-2 text-sm font-medium transition-colors ${
            subTab === "rankings"
              ? "yegeon-sort-tab-active"
              : "yg-text-ink-400 hover:yg-text-ink-700"
          }`}
        >
          랭킹
        </button>
        <button
          type="button"
          onClick={() => setSubTab("activity")}
          className={`pb-2 text-sm font-medium transition-colors ${
            subTab === "activity"
              ? "yegeon-sort-tab-active"
              : "yg-text-ink-400 hover:yg-text-ink-700"
          }`}
        >
          활동
        </button>
      </div>

      {/* Content */}
      {subTab === "rankings" ? (
        <>
          {/* Promotion requirement */}
          {promotionReq > 0 && (
            <p className="mb-3 text-xs yg-text-ink-500">
              {selectedTier}에서 승급하려면 Ⓜ{promotionReq.toLocaleString("ko-KR")} 이상 획득해야 합니다.
            </p>
          )}

          {group && (
            <LeaderboardTable
              members={group.members}
              promotionLine={group.promotionLine}
              tier={selectedTier}
              currentUsername={currentUser.username}
            />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-3 py-12">
          <Star className="h-8 w-8 yg-text-ink-300" />
          <p className="text-sm yg-text-ink-500">
            아직 이번 시즌의 활동 기록이 없습니다.
          </p>
        </div>
      )}
    </div>
  )
}
