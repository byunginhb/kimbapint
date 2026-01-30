"use client";

import { useParams, notFound } from "next/navigation";
import { useMemo } from "react";
import {
  MapPin,
  Phone,
  Clock,
  AlertTriangle,
  TrendingUp,
  Building2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
import { getShopById, mockMarkets } from "@/lib/mock-data";
import { SHOP_STATUS_CONFIG } from "@/lib/types";
import { getWeekdayLabels } from "@/lib/mock-data";

export default function ShopDetailPage() {
  const params = useParams();
  const shopId = params.id as string;

  const shop = useMemo(() => getShopById(shopId), [shopId]);

  if (!shop) {
    notFound();
  }

  const statusConfig = SHOP_STATUS_CONFIG[shop.status];
  const weekdayLabels = getWeekdayLabels();

  const weeklyChartData = shop.weeklyOrders.map((orders, index) => ({
    day: weekdayLabels[index],
    orders,
  }));

  const relatedMarketsData = mockMarkets.filter((market) =>
    shop.relatedMarkets.includes(market.id)
  );

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* 헤더 */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <BackButton href="/" label="대시보드" />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🍙</span>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
                  {shop.name}
                </h1>
                <p className="text-gray-400 text-sm">{shop.distance} from target</p>
              </div>
            </div>

            <div
              className={`px-4 py-2 rounded ${statusConfig.bgColor} border ${statusConfig.borderColor} ${statusConfig.color} text-sm font-mono`}
            >
              {shop.status === "NOMINAL" && "↗ "}
              {statusConfig.label}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 기본 정보 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">주소</span>
            </div>
            <p className="text-sm text-white">{shop.address}</p>
          </div>

          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Phone className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">연락처</span>
            </div>
            <p className="text-sm text-white">{shop.phone}</p>
          </div>

          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">영업시간</span>
            </div>
            <p className="text-sm text-white">
              {shop.operatingHours.open} - {shop.operatingHours.close}
            </p>
          </div>

          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Building2 className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">인근 시설</span>
            </div>
            <p className="text-sm text-white">{shop.nearbyFacility}</p>
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 24시간 주문 차트 */}
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                24시간 주문 패턴
              </h3>
              <span className="px-2 py-0.5 bg-red-900/30 border border-red-500/30 rounded text-red-400 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                LIVE
              </span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={shop.hourlyData}>
                  <XAxis
                    dataKey="hour"
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                    tickFormatter={(v) => `${v}시`}
                    interval={3}
                  />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} width={30} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    labelFormatter={(v) => `${v}시`}
                    formatter={(v) => [`${v}건`, "주문"]}
                  />
                  <Bar
                    dataKey="value"
                    fill="#3b82f6"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 주간 트렌드 차트 */}
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                주간 주문 트렌드
              </h3>
              <div className="flex items-center gap-1 text-green-400 text-xs">
                <TrendingUp className="w-3 h-3" />
                <span>+12.5%</span>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyChartData}>
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                  />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} width={30} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(v) => [`${v}건`, "주문"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#22c55e"
                    fill="#22c55e"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 이상 징후 타임라인 */}
        {shop.anomalyHistory.length > 0 && (
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                이상 징후 히스토리
              </h3>
              <span className="px-2 py-0.5 bg-yellow-900/30 border border-yellow-500/30 rounded text-yellow-400 text-xs">
                {shop.anomalyHistory.length}건
              </span>
            </div>
            <div className="space-y-3">
              {shop.anomalyHistory.map((anomaly) => (
                <div
                  key={`${anomaly.date}-${anomaly.type}`}
                  className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 ${
                      anomaly.type === "SPIKE"
                        ? "bg-red-400"
                        : anomaly.type === "DROP"
                          ? "bg-blue-400"
                          : "bg-yellow-400"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-mono ${
                          anomaly.type === "SPIKE"
                            ? "text-red-400"
                            : anomaly.type === "DROP"
                              ? "text-blue-400"
                              : "text-yellow-400"
                        }`}
                      >
                        {anomaly.type}
                      </span>
                      <span className="text-xs text-gray-500">{anomaly.date}</span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">
                      {anomaly.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 관련 마켓 */}
        {relatedMarketsData.length > 0 && (
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                관련 예측 마켓
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedMarketsData.map((market) => (
                <Link
                  key={market.id}
                  href={`/market/${market.slug}`}
                  className="block p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <h4 className="text-sm text-white font-medium mb-2 line-clamp-2">
                    {market.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-500 font-mono">
                      {(market.probability * 100).toFixed(1)}%
                    </span>
                    <span className="text-xs text-gray-500">
                      {market.region}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 좌표 정보 */}
        <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">
              위치 좌표
            </h3>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-gray-400">위도: </span>
              <span className="text-cyan-400 font-mono">
                {shop.coordinates.lat.toFixed(4)}
              </span>
            </div>
            <div>
              <span className="text-gray-400">경도: </span>
              <span className="text-cyan-400 font-mono">
                {shop.coordinates.lng.toFixed(4)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
