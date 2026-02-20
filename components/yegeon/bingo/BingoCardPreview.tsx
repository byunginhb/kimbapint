import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import type { BingoCardData } from "@/lib/yegeon-types"
import { FREE_SPACE_INDEX } from "@/lib/yegeon-bingo-utils"
import UserAvatar from "@/components/yegeon/common/UserAvatar"
import BingoStatusBadge from "./BingoStatusBadge"

interface BingoCardPreviewProps {
  card: BingoCardData
}

function MiniGrid({ grid, ariaLabel }: { grid: BingoCardData["grid"]; ariaLabel: string }) {
  return (
    <div className="yegeon-bingo-mini-grid" role="img" aria-label={ariaLabel}>
      {grid.map((cell, i) => {
        let colorClass = "yg-bg-canvas-100"
        if (i === FREE_SPACE_INDEX) colorClass = "yg-bg-bingo-free"
        else if (cell.resolved === true) colorClass = "yg-bg-yes-500"
        else if (cell.resolved === false) colorClass = "yg-bg-no-500"
        return <div key={i} className={`yegeon-bingo-mini-cell rounded-[2px] ${colorClass}`} />
      })}
    </div>
  )
}

export default function BingoCardPreview({ card }: BingoCardPreviewProps) {
  const t = useTranslations("yBingo")

  return (
    <Link
      href={`/yegeon/bingo/${card.cardId}`}
      className="yegeon-card-hover flex items-center gap-4 rounded-xl border yg-border-canvas-100 p-4"
    >
      <MiniGrid grid={card.grid} ariaLabel={t("preview")} />

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <UserAvatar size={24} displayName={card.displayName} colorSeed={card.username} />
          <span className="truncate text-sm font-semibold yg-text-ink-900">
            {card.displayName}
          </span>
          <BingoStatusBadge status={card.status} />
        </div>
        <div className="flex items-center gap-3 text-xs yg-text-ink-500">
          <span>
            {t("winProb")}{" "}
            <span className="font-bold yg-text-ink-900">
              {(card.winProbability * 100).toFixed(0)}%
            </span>
          </span>
          <span>
            {t("target")}{" "}
            <span className="font-medium">
              {(card.targetWinProb * 100).toFixed(0)}%
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}
