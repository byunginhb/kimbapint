import type { LeagueMember, LeagueTier } from "@/lib/yegeon-types"
import {
  getMemberDisplayName,
  getPromotionTargetTier,
  TIER_COLORS,
} from "@/lib/yegeon-data"
import UserAvatar from "@/components/yegeon/common/UserAvatar"

interface LeaderboardTableProps {
  members: LeagueMember[]
  promotionLine: number
  tier: LeagueTier
  currentUsername: string
}

export default function LeaderboardTable({
  members,
  promotionLine,
  tier,
  currentUsername,
}: LeaderboardTableProps) {
  const targetTier = getPromotionTargetTier(tier)
  const tierColor = targetTier ? TIER_COLORS[targetTier] : undefined

  return (
    <div className="rounded-xl border yg-border-canvas-100 overflow-hidden">
      {members.map((member, index) => {
        const isCurrentUser = member.username === currentUsername
        const displayName = getMemberDisplayName(member.username)
        const showPromotionLine =
          promotionLine > 0 && index === promotionLine && targetTier

        return (
          <div key={member.username}>
            {/* Promotion divider */}
            {showPromotionLine && (
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="h-px flex-1" style={{ backgroundColor: tierColor }} />
                <span
                  className="whitespace-nowrap text-xs font-medium"
                  style={{ color: tierColor }}
                >
                  {targetTier}로 승급
                </span>
                <div className="h-px flex-1" style={{ backgroundColor: tierColor }} />
              </div>
            )}

            {/* Member row */}
            <div
              className={`yegeon-row-hover flex items-center gap-4 px-4 py-3 ${
                isCurrentUser ? "yg-bg-primary-100/20" : ""
              }`}
            >
              {/* Rank */}
              <span className="w-6 text-center text-sm tabular-nums yg-text-ink-500">
                {member.rank}
              </span>

              {/* Avatar + Name */}
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <UserAvatar
                  size={32}
                  displayName={displayName}
                  colorSeed={member.username}
                />
                <span className="truncate text-sm font-medium yg-text-ink-900">
                  {displayName}
                </span>
              </div>

              {/* Mana earned */}
              <span
                className={`text-sm font-semibold tabular-nums ${
                  member.manaEarned >= 0 ? "yg-text-yes-500" : "yg-text-no-500"
                }`}
              >
                {member.manaEarned >= 0 ? "+" : ""}Ⓜ
                {Math.abs(member.manaEarned).toLocaleString("ko-KR")}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
