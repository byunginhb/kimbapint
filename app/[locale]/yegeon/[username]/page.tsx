"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Link } from "@/i18n/navigation"
import ProfileHeader from "@/components/yegeon/profile/ProfileHeader"
import ProfileTabs, { type ProfileTab } from "@/components/yegeon/profile/ProfileTabs"
import PortfolioStats from "@/components/yegeon/profile/PortfolioStats"
import TradeHistory from "@/components/yegeon/profile/TradeHistory"
import MarketFeedCard from "@/components/yegeon/feed/MarketFeedCard"
import { getUserByUsername, getTradesByUsername, markets } from "@/lib/yegeon-data"

export default function YeGeonProfilePage() {
  const params = useParams()
  const username = params.username as string
  const [tab, setTab] = useState<ProfileTab>("trades")

  const user = getUserByUsername(username)

  if (!user) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20">
        <p className="text-lg yg-text-ink-400">
          사용자를 찾을 수 없습니다.
        </p>
        <Link
          href="/yegeon"
          className="flex items-center gap-1 text-sm yg-text-primary-500 hover:yg-text-primary-400"
        >
          <ArrowLeft className="h-4 w-4" />
          메인으로 돌아가기
        </Link>
      </div>
    )
  }

  const userTrades = getTradesByUsername(username)
  const userMarkets = markets.filter((m) => m.creatorUsername === username)

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <Link
        href="/yegeon"
        className="mb-4 inline-flex items-center gap-1 text-sm yg-text-ink-400 hover:yg-text-ink-800"
      >
        <ArrowLeft className="h-4 w-4" />
        뒤로
      </Link>

      <ProfileHeader user={user} />

      <div className="mt-6">
        <PortfolioStats user={user} />
      </div>

      <div className="mt-6">
        <ProfileTabs selected={tab} onChange={setTab} />

        <div className="mt-4">
          {tab === "trades" && <TradeHistory trades={userTrades} />}

          {tab === "markets" && (
            <div className="flex flex-col gap-3">
              {userMarkets.length > 0 ? (
                userMarkets.map((m) => (
                  <MarketFeedCard key={m.id} market={m} />
                ))
              ) : (
                <div className="py-8 text-center text-sm yg-text-ink-400">
                  생성한 마켓이 없습니다.
                </div>
              )}
            </div>
          )}

          {tab === "comments" && (
            <div className="py-8 text-center text-sm yg-text-ink-400">
              댓글이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
