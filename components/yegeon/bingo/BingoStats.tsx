import { LayoutGrid, Zap, Trophy } from "lucide-react"

interface BingoStatsProps {
  totalCards: number
  activeCards: number
  winners: number
}

export default function BingoStats({ totalCards, activeCards, winners }: BingoStatsProps) {
  const stats = [
    { label: "전체 카드", value: totalCards, icon: LayoutGrid, color: "yg-text-primary-500" },
    { label: "진행중", value: activeCards, icon: Zap, color: "yg-text-yes-500" },
    { label: "우승자", value: winners, icon: Trophy, color: "yg-text-no-400" },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center gap-1 rounded-xl border yg-border-canvas-100 py-4"
        >
          <stat.icon className={`h-5 w-5 ${stat.color}`} />
          <span className="text-lg font-bold yg-text-ink-900">{stat.value}</span>
          <span className="text-xs yg-text-ink-500">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
