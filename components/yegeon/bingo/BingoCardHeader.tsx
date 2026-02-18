import type { BingoCardData } from "@/lib/yegeon-types"
import UserAvatar from "@/components/yegeon/common/UserAvatar"
import BingoStatusBadge from "./BingoStatusBadge"

interface BingoCardHeaderProps {
  card: BingoCardData
}

export default function BingoCardHeader({ card }: BingoCardHeaderProps) {
  const probColor =
    card.winProbability >= 0.5
      ? "yg-text-yes-500"
      : card.winProbability >= 0.2
        ? "yg-text-primary-500"
        : "yg-text-no-500"

  return (
    <div className="flex items-center gap-4">
      <UserAvatar size={48} displayName={card.displayName} colorSeed={card.username} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold yg-text-ink-900">{card.displayName}</span>
          <BingoStatusBadge status={card.status} size="md" />
        </div>
        <div className="flex items-center gap-3 text-sm yg-text-ink-500">
          <span>
            승률{" "}
            <span className={`font-bold ${probColor}`}>
              {(card.winProbability * 100).toFixed(1)}%
            </span>
          </span>
          <span>
            목표{" "}
            <span className="font-medium">
              {(card.targetWinProb * 100).toFixed(0)}%
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
