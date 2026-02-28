"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { TrendingUp, HelpCircle, ChevronDown } from "lucide-react";

interface OsintTweet {
  id: string;
  account: string;
  time: string;
  content: string;
  hasWarning: boolean;
}

interface MarketItem {
  id: string;
  title: string;
  image: string;
  price: number;
  priceChange: number | null;
  volume24h: string;
  status: "LIVE" | "CLOSED";
}

const osintTweets: OsintTweet[] = [
  {
    id: "1",
    account: "sentdefender",
    time: "23:32Z",
    content:
      'U.S. Air Force C-17A Globemaster IIIs have once again begun to steadily flow eastward out of Robert Gray Army Airfield located inside of Fort Hood, Texas, after a several-day delay due to the ice and snow, with the C-17s likely carrying additional Terminal High Altitude Area Defense (THAAD) Anti-Ballistic Missile Systems assigned to the U.S. Army\'s 62nd Air Defense Artillery Regiment to bases in the Middle East.',
    hasWarning: true,
  },
  {
    id: "2",
    account: "osintwarfare",
    time: "23:27Z",
    content:
      'Russian BTR-22 armored personnel carriers, BMDU "Ballista," "Planshet-A" wheeled artillery command vehicles, and 300mm Sarma High-Precision Multiple Launch Rocket Systems (MLRS) mounted on the KAMAZ-63501 armored chassis, delivered by Rosoboronexport to Saudi Arabia for the... pic.',
    hasWarning: true,
  },
  {
    id: "3",
    account: "polymarketintel",
    time: "23:21Z",
    content:
      'Ukrainian divers from Odesa\'s State Emergency Service have taken out a Russian "Geran-2" drone in the Dnister River.',
    hasWarning: true,
  },
  {
    id: "4",
    account: "osintwarfare",
    time: "23:07Z",
    content:
      "The Belarusian Ministry of Defense has announced that the Air Force and...",
    hasWarning: false,
  },
];

const markets: MarketItem[] = [
  {
    id: "1",
    title: "러시아가 1월 31일까지 드루즈키브카에 진입할까?",
    image: "🏙️",
    price: 1,
    priceChange: null,
    volume24h: "$390",
    status: "LIVE",
  },
  {
    id: "2",
    title: "2026년 3월 31일까지 러-우 휴전?",
    image: "🇺🇦",
    price: 16,
    priceChange: null,
    volume24h: "$117.6K",
    status: "LIVE",
  },
  {
    id: "3",
    title: "2026년 말까지 러-우 휴전?",
    image: "🕊️",
    price: 45,
    priceChange: -1,
    volume24h: "$120.5K",
    status: "LIVE",
  },
  {
    id: "4",
    title: "2026년 NATO가 우크라이나에 병력 배치?",
    image: "🔵",
    price: 51,
    priceChange: null,
    volume24h: "$85.2K",
    status: "LIVE",
  },
];

function TweetCard({ tweet }: { tweet: OsintTweet }) {
  return (
    <div
      className={`bg-ki-elevated/50 border ${tweet.hasWarning ? "border-yellow-500/30" : "border-ki-border-subtle"} rounded-lg p-4 hover:bg-ki-elevated transition-colors cursor-pointer`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-ki-border-subtle flex items-center justify-center text-xs">
            👤
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-ki-text">
                {tweet.account}
              </span>
              {tweet.hasWarning && (
                <span className="text-yellow-500 text-xs">⚠</span>
              )}
            </div>
            <span className="text-xs text-ki-text-muted">{tweet.time}</span>
          </div>
        </div>
        <a
          href="#"
          className="text-ki-text-muted hover:text-ki-text transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="currentColor"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>
      <p className="text-sm text-ki-text-secondary leading-relaxed line-clamp-4">
        {tweet.content}
      </p>
    </div>
  );
}

function IntelMarketCard({ market }: { market: MarketItem }) {
  const t = useTranslations("marketIntel")
  return (
    <div className="bg-ki-elevated/30 border border-ki-border-subtle rounded-lg p-4 hover:bg-ki-elevated/50 transition-colors">
      <div className="flex items-start gap-3">
        <div className="text-3xl">{market.image}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm text-ki-text font-medium mb-1 line-clamp-2">
            {market.title}
          </h4>
          <p className="text-xs text-ki-text-muted">
            {market.priceChange !== null ? (
              <span
                className={
                  market.priceChange >= 0 ? "text-green-400" : "text-red-400"
                }
              >
                {market.priceChange >= 0 ? "▲" : "▼"} {Math.abs(market.priceChange)}¢
              </span>
            ) : (
              t("noChange")
            )}{" "}
            ({t("sinceTweet")})
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xl font-bold text-cyan-400 font-mono">
            {market.price}¢
          </span>
          <span className="text-xs text-green-400">{market.status}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-ki-border-subtle">
        <span className="text-xs text-ki-text-muted">
          24h Vol — {market.volume24h}
        </span>
        <div className="flex items-center gap-2">
          <button className="text-xs text-ki-text-muted hover:text-ki-text-secondary transition-colors">
            <ChevronDown className="w-4 h-4 inline" /> {t("details")}
          </button>
          <a
            href="#"
            className="px-3 py-1 text-xs bg-ki-border-subtle hover:bg-ki-elevated rounded text-ki-text transition-colors font-mono"
          >
            {t("viewMarket")}
          </a>
        </div>
      </div>
    </div>
  );
}

export function MarketIntelligence() {
  const t = useTranslations("marketIntel");
  const [activeTab, setActiveTab] = useState<"Live" | "Top">("Live");

  return (
    <div className="py-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-ki-text font-mono tracking-wider">
            {t("title")}
          </h2>
          <span className="flex items-center gap-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-ki-text-secondary">{t("live")}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-ki-text-muted">
          <span>Powered by</span>
          <span className="px-2 py-1 bg-blue-600 rounded text-white font-medium">
            Polymarket
          </span>
        </div>
      </div>

      {/* 설명 */}
      <div className="flex items-start gap-2 mb-6 p-4 bg-ki-elevated/30 rounded-lg border border-ki-border-subtle">
        <HelpCircle className="w-5 h-5 text-ki-text-muted flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-ki-text-secondary mb-2">
            {t("description")}{" "}
            <a href="#" className="text-cyan-400 hover:underline">
              {t("topMarkets")}
            </a>
            {t("descriptionSuffix")}
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-ki-text-muted">
            <span>
              <span className="text-green-400">●</span> {t("tipTweet")}
            </span>
            <span>
              <span className="text-green-400">●</span> {t("tipToggle")}
            </span>
            <span>
              <span className="text-yellow-400">●</span> {t("tipRelevance")}
            </span>
          </div>
        </div>
      </div>

      {/* OSINT FEED 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-ki-text-muted">⚡</span>
          <h3 className="text-sm font-mono text-ki-text-secondary tracking-wider">
            OSINT FEED
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("Live")}
            className={`px-3 py-1 text-xs font-mono rounded transition-colors ${activeTab === "Live"
                ? "bg-blue-600 text-white"
                : "bg-ki-elevated text-ki-text-secondary hover:text-ki-text"
              }`}
          >
            Live
          </button>
          <button
            onClick={() => setActiveTab("Top")}
            className={`px-3 py-1 text-xs font-mono rounded transition-colors ${activeTab === "Top"
                ? "bg-blue-600 text-white"
                : "bg-ki-elevated text-ki-text-secondary hover:text-ki-text"
              }`}
          >
            Top
          </button>
          <span className="text-xs text-ki-text-muted ml-2 font-mono">00:14Z</span>
        </div>
      </div>

      {/* 콘텐츠 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          {osintTweets.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
        <div className="space-y-3">
          {markets.map((market) => (
            <IntelMarketCard key={market.id} market={market} />
          ))}
        </div>
      </div>

      {/* Polymarket 배너 */}
      <div className="mt-6 p-4 bg-gradient-to-r from-ki-elevated to-ki-surface-alt rounded-lg border border-ki-border-subtle flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 bg-blue-600 rounded text-white text-xs font-medium">
            Polymarket
          </span>
          <span className="text-ki-text font-medium">
            {t("tradingBanner")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white text-sm font-medium transition-colors"
          >
            {t("trading")}
          </a>
          <button className="px-4 py-2 bg-ki-border-subtle hover:bg-ki-elevated rounded text-ki-text text-sm transition-colors">
            {t("close")}
          </button>
        </div>
      </div>

      {/* 푸터 */}
      <div className="mt-8 text-center text-xs text-ki-text-muted font-mono tracking-wider">
        {t("classified")}
      </div>
    </div>
  );
}
