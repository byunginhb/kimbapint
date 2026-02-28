"use client";

import { useParams, notFound } from "next/navigation";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
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
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { useChartTheme } from "@/lib/chart-theme";
import { getShopById, mockMarkets } from "@/lib/mock-data";
import { SHOP_STATUS_CONFIG } from "@/lib/types";
import { getWeekdayLabels } from "@/lib/mock-data";

export default function ShopDetailPage() {
  const tStatus = useTranslations("shopStatus");
  const t = useTranslations("shop");
  const tCommon = useTranslations("pageCommon");
  const params = useParams();
  const shopId = params.id as string;

  const ct = useChartTheme();
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
    <div className="min-h-screen bg-ki-base text-ki-text font-mono">
      {/* 헤더 */}
      <div className="bg-ki-surface-alt border-b border-ki-border-subtle">
        <div className="container mx-auto px-4 py-4">
          <BackButton href="/" label={tCommon("dashboard")} />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <Image src="/kimbap.png" alt="Kimbap" width={36} height={36} />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
                  {shop.name}
                </h1>
                <p className="text-ki-text-secondary text-sm">{shop.distance} from target</p>
              </div>
            </div>

            <div
              className={`px-4 py-2 rounded ${statusConfig.bgColor} border ${statusConfig.borderColor} ${statusConfig.color} text-sm font-mono`}
            >
              {shop.status === "NOMINAL" && "↗ "}
              {tStatus(shop.status.toLowerCase() as "nominal" | "busy" | "closed" | "spike")}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 기본 정보 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
            <div className="flex items-center gap-2 text-ki-text-secondary mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">{t("address")}</span>
            </div>
            <p className="text-sm text-ki-text">{shop.address}</p>
          </div>

          <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
            <div className="flex items-center gap-2 text-ki-text-secondary mb-2">
              <Phone className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">{t("contact")}</span>
            </div>
            <p className="text-sm text-ki-text">{shop.phone}</p>
          </div>

          <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
            <div className="flex items-center gap-2 text-ki-text-secondary mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">{t("hours")}</span>
            </div>
            <p className="text-sm text-ki-text">
              {shop.operatingHours.open} - {shop.operatingHours.close}
            </p>
          </div>

          <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
            <div className="flex items-center gap-2 text-ki-text-secondary mb-2">
              <Building2 className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">{t("nearbyFacility")}</span>
            </div>
            <p className="text-sm text-ki-text">{shop.nearbyFacility}</p>
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 24시간 주문 차트 */}
          <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-ki-text tracking-wider uppercase">
                {t("orderPattern24h")}
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
                    tick={{ fill: ct.tick, fontSize: 10 }}
                    tickFormatter={(v) => `${v}${t("hourSuffix")}`}
                    interval={3}
                  />
                  <YAxis tick={{ fill: ct.tick, fontSize: 10 }} width={30} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: ct.tooltipBg,
                      border: `1px solid ${ct.tooltipBorder}`,
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: ct.tooltipText,
                    }}
                    labelStyle={{ color: ct.tooltipLabel }}
                    labelFormatter={(v) => `${v}${t("hourSuffix")}`}
                    formatter={(v) => [`${v}`, t("orderTooltip")]}
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
          <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-ki-text tracking-wider uppercase">
                {t("weeklyTrend")}
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
                    tick={{ fill: ct.tick, fontSize: 10 }}
                  />
                  <YAxis tick={{ fill: ct.tick, fontSize: 10 }} width={30} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: ct.tooltipBg,
                      border: `1px solid ${ct.tooltipBorder}`,
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: ct.tooltipText,
                    }}
                    labelStyle={{ color: ct.tooltipLabel }}
                    formatter={(v) => [`${v}`, t("orderTooltip")]}
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
          <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <h3 className="text-sm font-bold text-ki-text tracking-wider uppercase">
                {t("anomalyHistory")}
              </h3>
              <span className="px-2 py-0.5 bg-yellow-900/30 border border-yellow-500/30 rounded text-yellow-400 text-xs">
                {tCommon("count", { count: shop.anomalyHistory.length })}
              </span>
            </div>
            <div className="space-y-3">
              {shop.anomalyHistory.map((anomaly) => (
                <div
                  key={`${anomaly.date}-${anomaly.type}`}
                  className="flex items-start gap-3 p-3 bg-ki-elevated/50 rounded-lg border border-ki-border-subtle"
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
                      <span className="text-xs text-ki-text-muted">{anomaly.date}</span>
                    </div>
                    <p className="text-sm text-ki-text-secondary mt-1">
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
          <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-ki-text tracking-wider uppercase">
                {t("relatedMarkets")}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedMarketsData.map((market) => (
                <Link
                  key={market.id}
                  href={`/market/${market.slug}`}
                  className="block p-3 bg-ki-elevated/50 rounded-lg border border-ki-border-subtle hover:bg-ki-elevated transition-colors"
                >
                  <h4 className="text-sm text-ki-text font-medium mb-2 line-clamp-2">
                    {market.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-500 font-mono">
                      {(market.probability * 100).toFixed(1)}%
                    </span>
                    <span className="text-xs text-ki-text-muted">
                      {market.region}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 좌표 정보 */}
        <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-ki-text tracking-wider uppercase">
              {t("coordinates")}
            </h3>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-ki-text-secondary">{t("latitude")}: </span>
              <span className="text-cyan-400 font-mono">
                {shop.coordinates.lat.toFixed(4)}
              </span>
            </div>
            <div>
              <span className="text-ki-text-secondary">{t("longitude")}: </span>
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
