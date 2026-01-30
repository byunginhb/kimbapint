"use client";

import { useParams, notFound } from "next/navigation";
import { useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  DollarSign,
  Newspaper,
  AlertCircle,
  Store,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
import { getMarketBySlug, mockShopDetails } from "@/lib/mock-data";
import { REGION_CONFIG } from "@/lib/types";
import { formatNumber, formatDate } from "@/lib/utils";

export default function MarketDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const market = useMemo(() => getMarketBySlug(slug), [slug]);

  if (!market) {
    notFound();
  }

  const regionConfig = REGION_CONFIG[market.region];
  const probabilityPercent = (market.probability * 100).toFixed(1);

  const TrendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
  }[market.trend];

  const trendColor = {
    up: "text-green-500",
    down: "text-red-500",
    stable: "text-gray-500",
  }[market.trend];

  const trendLabel = {
    up: "상승",
    down: "하락",
    stable: "유지",
  }[market.trend];

  const relatedShopsData = mockShopDetails.filter((shop) =>
    market.relatedShops.includes(shop.id)
  );

  const probabilityChartData = market.probabilityHistory.slice(-14).map((entry) => ({
    date: entry.date.slice(5),
    probability: Number((entry.probability * 100).toFixed(1)),
  }));

  const volumeChartData = market.volumeHistory.slice(-14).map((entry) => ({
    date: entry.date.slice(5),
    volume: entry.volume / 1000000,
  }));

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* 헤더 */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <BackButton href="/" label="대시보드" />

          <div className="mt-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 bg-purple-900/30 border border-purple-500/30 rounded text-purple-400 text-xs">
                {regionConfig.emoji} {market.region}
              </span>
              <div className={`flex items-center gap-1 ${trendColor} text-sm`}>
                <TrendIcon className="w-4 h-4" />
                <span>{trendLabel}</span>
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide mb-2">
              {market.title}
            </h1>
            <p className="text-gray-400 text-sm">{market.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 확률 및 거래량 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 현재 확률 */}
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-2 text-gray-400 mb-3">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">현재 확률</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold text-green-500">
                {probabilityPercent}
              </span>
              <span className="text-2xl text-gray-500 mb-1">%</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">예측 확률</p>
          </div>

          {/* 24시간 거래량 */}
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-2 text-gray-400 mb-3">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">24시간 거래량</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-cyan-400">
                ₩{formatNumber(market.volume24h)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              총 거래량: ₩{formatNumber(market.totalVolume)}
            </p>
          </div>

          {/* 마감일 */}
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-2 text-gray-400 mb-3">
              <Calendar className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">마감일</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {formatDate(market.endDate)}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              생성일: {formatDate(market.createdAt)}
            </p>
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 확률 히스토리 차트 */}
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                확률 변동 (14일)
              </h3>
              <span className="px-2 py-0.5 bg-green-900/30 border border-green-500/30 rounded text-green-400 text-xs">
                실시간
              </span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={probabilityChartData}>
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                    interval={2}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                    width={35}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(v) => [`${v}%`, "확률"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="probability"
                    stroke="#22c55e"
                    fill="#22c55e"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 거래량 차트 */}
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                일별 거래량 (14일)
              </h3>
              <span className="text-xs text-gray-500">단위: 백만원</span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeChartData}>
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                    interval={2}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                    width={35}
                    tickFormatter={(v) => `${v}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(v) => [`₩${Number(v).toFixed(1)}M`, "거래량"]}
                  />
                  <Bar dataKey="volume" fill="#06b6d4" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 핵심 이벤트 타임라인 */}
        {market.keyEvents.length > 0 && (
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                핵심 이벤트
              </h3>
              <span className="px-2 py-0.5 bg-yellow-900/30 border border-yellow-500/30 rounded text-yellow-400 text-xs">
                {market.keyEvents.length}건
              </span>
            </div>
            <div className="space-y-3">
              {market.keyEvents.map((event) => (
                <div
                  key={`${event.date}-${event.event.slice(0, 20)}`}
                  className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 ${
                      event.impact === "positive"
                        ? "bg-green-400"
                        : event.impact === "negative"
                          ? "bg-red-400"
                          : "bg-gray-400"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-mono ${
                          event.impact === "positive"
                            ? "text-green-400"
                            : event.impact === "negative"
                              ? "text-red-400"
                              : "text-gray-400"
                        }`}
                      >
                        {event.impact === "positive"
                          ? "긍정적"
                          : event.impact === "negative"
                            ? "부정적"
                            : "중립"}
                      </span>
                      <span className="text-xs text-gray-500">{event.date}</span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 관련 뉴스 */}
        {market.relatedNews.length > 0 && (
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                관련 뉴스
              </h3>
            </div>
            <div className="space-y-3">
              {market.relatedNews.map((news) => (
                <div
                  key={`${news.date}-${news.source}`}
                  className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <h4 className="text-sm text-white font-medium mb-1">
                    {news.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{news.source}</span>
                    <span>•</span>
                    <span>{news.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 관련 김밥집 */}
        {relatedShopsData.length > 0 && (
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Store className="w-4 h-4 text-orange-400" />
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                관련 김밥집
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedShopsData.map((shop) => (
                <Link
                  key={shop.id}
                  href={`/shop/${shop.id}`}
                  className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <span className="text-2xl">🍙</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm text-white font-medium truncate">
                      {shop.name}
                    </h4>
                    <p className="text-xs text-gray-500">{shop.nearbyFacility}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      shop.status === "NOMINAL"
                        ? "bg-green-900/30 text-green-400"
                        : shop.status === "SPIKE"
                          ? "bg-red-900/30 text-red-400"
                          : shop.status === "BUSY"
                            ? "bg-yellow-900/30 text-yellow-400"
                            : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {shop.status}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
