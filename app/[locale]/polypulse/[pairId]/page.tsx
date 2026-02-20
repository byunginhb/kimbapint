"use client";

import { useParams, notFound } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import {
  ArrowLeft,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  Newspaper,
  BarChart3,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  getThreatPairDetailById,
  THREAT_LEVEL_CONFIG,
} from "@/lib/polypulse-data";

type Period = "7d" | "30d" | "90d";

export default function PolyPulseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const pairId = params.pairId as string;
  const [period, setPeriod] = useState<Period>("30d");

  const t = useTranslations("polypulseDetail");
  const tLevel = useTranslations("polypulseThreatLevel");
  const tCommon = useTranslations("pageCommon");

  const pair = useMemo(() => getThreatPairDetailById(pairId), [pairId]);

  if (!pair) {
    notFound();
  }

  const config = THREAT_LEVEL_CONFIG[pair.level];
  const levelKey = pair.level.toLowerCase() as "low" | "moderate" | "elevated" | "high" | "critical";

  const periodDays = { "7d": 7, "30d": 30, "90d": 90 };
  const chartData = pair.zScoreHistory.slice(-periodDays[period]).map((entry) => ({
    date: entry.date.slice(5),
    zScore: entry.zScore,
  }));

  const TrendIcon = pair.statistics.trend === "rising"
    ? TrendingUp
    : pair.statistics.trend === "falling"
      ? TrendingDown
      : Minus;

  const trendColor = pair.statistics.trend === "rising"
    ? "text-red-400"
    : pair.statistics.trend === "falling"
      ? "text-green-400"
      : "text-gray-400";

  const trendLabel = pair.statistics.trend === "rising"
    ? t("trendRising")
    : pair.statistics.trend === "falling"
      ? t("trendFalling")
      : t("trendStable");

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* 헤더 */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push("/polypulse")}
            className="flex items-center gap-2 px-3 py-1.5 text-gray-400 hover:text-white transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>PolyPulse</span>
          </button>

          <div className="mt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{pair.from.flag}</span>
                <span className="text-gray-500 text-lg">→</span>
                <span className="text-2xl">{pair.to.flag}</span>
              </div>
              <div className={`px-2.5 py-1 ${config.bgColor} border ${config.borderColor} rounded text-xs ${config.color}`}>
                {tLevel(`${levelKey}.label`)}
              </div>
              <div className={`flex items-center gap-1 ${trendColor} text-sm`}>
                <TrendIcon className="w-4 h-4" />
                <span>{trendLabel}</span>
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
              {pair.from.name} → {pair.to.name}
            </h1>
            <p className="text-gray-400 text-sm mt-1">{tLevel(`${levelKey}.description`)}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Activity className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">{t("currentZScore")}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold" style={{ color: config.chartColor }}>
                {pair.zScore.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">{t("avg28d")}</span>
            </div>
            <div className="text-3xl font-bold text-cyan-400">
              {pair.statistics.avg28d.toFixed(1)}
            </div>
          </div>

          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">{t("avg90d")}</span>
            </div>
            <div className="text-3xl font-bold text-purple-400">
              {pair.statistics.avg90d.toFixed(1)}
            </div>
          </div>

          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">{t("percentile")}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-yellow-400">
                {pair.statistics.percentile}
              </span>
              <span className="text-lg text-gray-500">%</span>
            </div>
          </div>
        </div>

        {/* Z-점수 차트 */}
        <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                {t("zScoreTrend")}
              </h3>
              <span className="px-2 py-0.5 bg-red-900/30 border border-red-500/30 rounded text-red-400 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                {tCommon("live")}
              </span>
            </div>

            {/* 기간 필터 */}
            <div className="flex items-center gap-2">
              {(["7d", "30d", "90d"] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                    period === p
                      ? "bg-cyan-900/50 border border-cyan-500 text-cyan-400"
                      : "bg-gray-800 border border-gray-700 text-gray-400 hover:text-white"
                  }`}
                >
                  {p === "7d" ? t("days7") : p === "30d" ? t("days30") : t("days90")}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#6b7280", fontSize: 10 }}
                  interval={period === "7d" ? 0 : period === "30d" ? 4 : 10}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 10 }}
                  width={35}
                  domain={[-1, 6]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(v) => [v, t("zScoreTrend")]}
                />
                {/* 위협 레벨 기준선 */}
                <ReferenceLine y={2} stroke="#eab308" strokeDasharray="3 3" label={{ value: t("refElevated"), fill: "#eab308", fontSize: 10 }} />
                <ReferenceLine y={3} stroke="#f97316" strokeDasharray="3 3" label={{ value: t("refHigh"), fill: "#f97316", fontSize: 10 }} />
                <ReferenceLine y={4} stroke="#ef4444" strokeDasharray="3 3" label={{ value: t("refCritical"), fill: "#ef4444", fontSize: 10 }} />
                <Area
                  type="monotone"
                  dataKey="zScore"
                  stroke={config.chartColor}
                  fill={config.chartColor}
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 핵심 이벤트 */}
        {pair.keyEvents.length > 0 && (
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                {t("keyEvents")}
              </h3>
              <span className="px-2 py-0.5 bg-yellow-900/30 border border-yellow-500/30 rounded text-yellow-400 text-xs">
                {tCommon("count", { count: pair.keyEvents.length })}
              </span>
            </div>
            <div className="space-y-3">
              {pair.keyEvents.map((event) => (
                <div
                  key={`${event.date}-${event.title.slice(0, 20)}`}
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
                    <div className="flex items-center justify-between flex-wrap gap-2">
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
                          ? t("impactDeescalation")
                          : event.impact === "negative"
                            ? t("impactEscalation")
                            : t("impactNeutral")}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono ${event.zScoreImpact > 0 ? "text-red-400" : "text-green-400"}`}>
                          {event.zScoreImpact > 0 ? "+" : ""}{event.zScoreImpact.toFixed(1)} Z
                        </span>
                        <span className="text-xs text-gray-500">{event.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">{event.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 관련 뉴스 */}
        {pair.relatedNews.length > 0 && (
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                {t("relatedNews")}
              </h3>
            </div>
            <div className="space-y-3">
              {pair.relatedNews.map((news) => (
                <div
                  key={`${news.date}-${news.source}`}
                  className="p-3 bg-gray-800/50 rounded-lg border border-gray-700"
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

        {/* 방법론 설명 */}
        <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-3">
            {t("methodology")}
          </h3>
          <div className="text-sm text-gray-400 space-y-2">
            <p>
              <span className="text-white font-medium">{t("zScoreExplain")}</span>
              {" "}
              {tLevel(`${levelKey}.description`)}
            </p>
            <p>
              <span className="text-white font-medium">{t("percentileExplain")}</span>
              {" "}
              {pair.statistics.percentile}%
            </p>
            <div className="mt-3 p-3 bg-gray-800/50 rounded border border-gray-700">
              <p className="text-xs text-gray-500">
                Data source: GDELT Project (Global Database of Events, Language, and Tone)
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {t("lastUpdated")}: {pair.lastUpdated.slice(0, 10)} {pair.lastUpdated.slice(11, 19)} UTC
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
