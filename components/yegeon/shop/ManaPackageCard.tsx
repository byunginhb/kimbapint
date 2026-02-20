"use client"

import { useLocale } from "next-intl"
import { Check, Loader2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ManaPackage {
  id: string
  mana: number
  price: number
  bonus: number
  popular?: boolean
}

type PurchaseState = "idle" | "loading" | "success"

interface ManaPackageCardProps {
  pkg: ManaPackage
  purchaseState: PurchaseState
  onPurchase: (id: string) => void
}

export default function ManaPackageCard({
  pkg,
  purchaseState,
  onPurchase,
}: ManaPackageCardProps) {
  const locale = useLocale()
  const totalMana = pkg.mana + pkg.bonus
  const isLoading = purchaseState === "loading"
  const isSuccess = purchaseState === "success"

  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-3 rounded-xl border px-4 py-5 transition-all",
        pkg.popular
          ? "yg-border-primary-500 yg-bg-primary-100/20"
          : "yg-border-canvas-100 yg-bg-canvas-0",
        isSuccess && "yg-border-yes-500",
      )}
    >
      {/* Popular badge */}
      {pkg.popular && (
        <span className="absolute -top-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full yg-bg-primary-500 px-2.5 py-0.5 text-[10px] font-bold text-white">
          <Sparkles className="h-3 w-3" />
          인기
        </span>
      )}

      {/* Mana amount */}
      <p className="text-2xl font-extrabold yg-text-ink-900">
        Ⓜ {totalMana.toLocaleString(locale === "ko" ? "ko-KR" : "en-US")}
      </p>

      {/* Bonus info */}
      {pkg.bonus > 0 && (
        <p className="text-xs font-medium yg-text-yes-500">
          +{pkg.bonus.toLocaleString(locale === "ko" ? "ko-KR" : "en-US")} 보너스
        </p>
      )}

      {/* Price */}
      <p className="text-sm font-semibold yg-text-ink-600">
        ₩{pkg.price.toLocaleString(locale === "ko" ? "ko-KR" : "en-US")}
      </p>

      {/* Buy button */}
      <button
        type="button"
        disabled={isLoading || isSuccess}
        onClick={() => onPurchase(pkg.id)}
        className={cn(
          "yegeon-bet-btn mt-1 w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors",
          isSuccess
            ? "yg-bg-yes-500"
            : "yg-bg-primary-500 hover:yg-bg-primary-600",
          (isLoading || isSuccess) && "cursor-not-allowed opacity-80",
        )}
      >
        {isLoading ? (
          <Loader2 className="mx-auto h-4 w-4 animate-bet-spinner" />
        ) : isSuccess ? (
          <span className="flex items-center justify-center gap-1.5">
            <Check className="h-4 w-4" />
            완료
          </span>
        ) : (
          "구매하기"
        )}
      </button>
    </div>
  )
}
