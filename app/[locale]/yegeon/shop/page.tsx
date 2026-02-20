"use client"

import { useState, useCallback } from "react"
import { useLocale } from "next-intl"
import { Wallet, CheckCircle } from "lucide-react"
import { getCurrentUser } from "@/lib/yegeon-data"
import type { ManaPackage } from "@/components/yegeon/shop/ManaPackageCard"
import ManaPackageCard from "@/components/yegeon/shop/ManaPackageCard"

const PACKAGES: ManaPackage[] = [
  { id: "p1", mana: 1000, price: 1000, bonus: 0 },
  { id: "p2", mana: 5000, price: 4500, bonus: 500 },
  { id: "p3", mana: 10000, price: 8000, bonus: 2000, popular: true },
  { id: "p4", mana: 50000, price: 35000, bonus: 15000 },
]

type PurchaseState = "idle" | "loading" | "success"

export default function ShopPage() {
  const locale = useLocale()
  const user = getCurrentUser()
  const [balance, setBalance] = useState(user.balance)
  const [states, setStates] = useState<Record<string, PurchaseState>>({})
  const [lastPurchased, setLastPurchased] = useState<ManaPackage | null>(null)

  const handlePurchase = useCallback(
    (id: string) => {
      const pkg = PACKAGES.find((p) => p.id === id)
      if (!pkg) return

      setStates((prev) => {
        if (prev[id] === "loading" || prev[id] === "success") return prev
        return { ...prev, [id]: "loading" }
      })

      setTimeout(() => {
        setStates((prev) => ({ ...prev, [id]: "success" }))
        setBalance((prev) => prev + pkg.mana + pkg.bonus)
        setLastPurchased(pkg)

        setTimeout(() => {
          setStates((prev) => ({ ...prev, [id]: "idle" }))
        }, 2000)
      }, 1500)
    },
    [],
  )

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold yg-text-ink-900">마나 상점</h1>
        <div className="flex items-center gap-2 rounded-lg yg-bg-canvas-50 px-3 py-2">
          <Wallet className="h-4 w-4 yg-text-primary-500" />
          <span className="text-sm font-semibold yg-text-ink-900">
            Ⓜ {balance.toLocaleString(locale === "ko" ? "ko-KR" : "en-US")}
          </span>
        </div>
      </div>

      {/* Purchase success toast */}
      {lastPurchased && states[lastPurchased.id] === "success" && (
        <div className="mb-4 flex animate-bet-fade items-center gap-2 rounded-lg yg-bg-yes-600/20 px-4 py-3">
          <CheckCircle className="h-4 w-4 yg-text-yes-500" />
          <span className="text-sm font-medium yg-text-yes-500">
            Ⓜ {(lastPurchased.mana + lastPurchased.bonus).toLocaleString(locale === "ko" ? "ko-KR" : "en-US")} 충전 완료!
          </span>
        </div>
      )}

      {/* Package grid */}
      <div className="grid grid-cols-2 gap-3">
        {PACKAGES.map((pkg) => (
          <ManaPackageCard
            key={pkg.id}
            pkg={pkg}
            purchaseState={states[pkg.id] ?? "idle"}
            onPurchase={handlePurchase}
          />
        ))}
      </div>

      {/* Info */}
      <div className="mt-6 rounded-lg yg-bg-canvas-50 px-4 py-3">
        <p className="text-xs leading-relaxed yg-text-ink-400">
          마나(Ⓜ)는 예견에서 마켓에 베팅할 때 사용하는 포인트입니다.
          실제 금전적 가치는 없으며, 예측의 정확도에 따라 마나를 획득하거나 잃을 수 있습니다.
          위 결제는 샘플이며 실제 결제가 이루어지지 않습니다.
        </p>
      </div>
    </div>
  )
}
