import { Wallet, TrendingUp, PiggyBank, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatYeGeonCurrency } from "@/lib/yegeon-data"
import type { YeGeonUser } from "@/lib/yegeon-types"

interface PortfolioStatsProps {
  user: YeGeonUser
}

export default function PortfolioStats({ user }: PortfolioStatsProps) {
  const stats = [
    {
      label: "순자산",
      value: formatYeGeonCurrency(user.netWorth),
      icon: DollarSign,
      color: "yg-text-primary-500",
    },
    {
      label: "잔고",
      value: formatYeGeonCurrency(user.balance),
      icon: Wallet,
      color: "yg-text-yes-500",
    },
    {
      label: "투자금",
      value: formatYeGeonCurrency(user.investedAmount),
      icon: PiggyBank,
      color: "text-amber-400",
    },
    {
      label: "수익",
      value: formatYeGeonCurrency(user.profitLoss),
      icon: TrendingUp,
      color: user.profitLoss >= 0 ? "yg-text-yes-500" : "yg-text-no-500",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border yg-border-canvas-100 yg-bg-canvas-50/50 p-3"
        >
          <div className="flex items-center gap-1.5">
            <stat.icon className={cn("h-4 w-4", stat.color)} />
            <span className="text-xs yg-text-ink-400">{stat.label}</span>
          </div>
          <p className={cn("mt-1 text-sm font-bold", stat.color)}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}
