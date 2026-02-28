"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { ArrowLeft, Activity, AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import {
  getAllThreatPairs,
  calculateGlobalStats,
  THREAT_LEVEL_CONFIG,
  mockThreatPairDetails,
  type ThreatPair,
  type PolyPulseThreatLevel,
} from "@/lib/polypulse-data";

export default function PolyPulsePage() {
  const router = useRouter();
  const t = useTranslations("polypulse");
  const tCommon = useTranslations("pageCommon");
  const tLevel = useTranslations("polypulseThreatLevel");
  const threatPairs = getAllThreatPairs();
  const stats = calculateGlobalStats();

  return (
    <div className="min-h-screen bg-ki-base text-ki-text font-mono">
      {/* 헤더 */}
      <div className="bg-ki-surface-alt border-b border-ki-border-subtle">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-3 py-1.5 text-ki-text-secondary hover:text-ki-text transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{tCommon("dashboard")}</span>
          </button>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-cyan-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
                  {t("title")}
                </h1>
                <p className="text-ki-text-secondary text-sm mt-1">
                  {t("subtitle")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs text-red-400 font-mono">{tCommon("live")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 위협 레벨 범례 */}
        <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
          <h3 className="text-xs font-bold text-ki-text-secondary uppercase tracking-wider mb-3">
            {t("threatLevel")}
          </h3>
          <div className="flex flex-wrap gap-3">
            {(Object.keys(THREAT_LEVEL_CONFIG) as PolyPulseThreatLevel[]).map((level) => {
              const config = THREAT_LEVEL_CONFIG[level];
              return (
                <div key={level} className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full`}
                    style={{ backgroundColor: config.chartColor }}
                  />
                  <span className={`text-xs ${config.color}`}>
                    {tLevel(`${level.toLowerCase() as "low" | "moderate" | "elevated" | "high" | "critical"}.label`)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
            <div className="flex items-center gap-2 text-ki-text-secondary mb-2">
              <Activity className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">{t("monitoringPairs")}</span>
            </div>
            <div className="text-3xl font-bold text-cyan-400">{stats.totalPairs}</div>
            <p className="text-xs text-ki-text-muted mt-1">{t("pairsTracking")}</p>
          </div>

          <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
            <div className="flex items-center gap-2 text-ki-text-secondary mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">{t("avgZScore")}</span>
            </div>
            <div className="text-3xl font-bold text-yellow-400">{stats.avgZScore}</div>
            <p className="text-xs text-ki-text-muted mt-1">{t("avgBasis")}</p>
          </div>

          <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
            <div className="flex items-center gap-2 text-ki-text-secondary mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">{t("crisisPairs")}</span>
            </div>
            <div className="text-3xl font-bold text-red-400">{stats.criticalPairs}</div>
            <p className="text-xs text-ki-text-muted mt-1">{t("crisisDesc")}</p>
          </div>
        </div>

        {/* 국가 쌍 그리드 */}
        <div>
          <h2 className="text-sm font-bold text-ki-text tracking-wider uppercase mb-4">
            {t("pairList")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {threatPairs.map((pair) => (
              <ThreatPairCard key={pair.id} pair={pair} />
            ))}
          </div>
        </div>

        {/* 방법론 설명 */}
        <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
          <h3 className="text-sm font-bold text-ki-text tracking-wider uppercase mb-3">
            {t("methodology")}
          </h3>
          <div className="text-sm text-ki-text-secondary space-y-2">
            <p>{t("methodDesc1")}</p>
            <p>{t("methodDesc2")}</p>
            <p>{t("methodDesc3")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThreatPairCard({ pair }: { pair: ThreatPair }) {
  const t = useTranslations("polypulse");
  const tCommon = useTranslations("pageCommon");
  const tLevel = useTranslations("polypulseThreatLevel");
  const config = THREAT_LEVEL_CONFIG[pair.level];
  const detail = mockThreatPairDetails[pair.id];
  const chartData = detail?.zScoreHistory.slice(-14) || [];

  const TrendIcon = detail?.statistics.trend === "rising"
    ? TrendingUp
    : detail?.statistics.trend === "falling"
      ? TrendingDown
      : Minus;

  const trendColor = detail?.statistics.trend === "rising"
    ? "text-red-400"
    : detail?.statistics.trend === "falling"
      ? "text-green-400"
      : "text-ki-text-secondary";

  const trendKey = detail?.statistics.trend === "rising"
    ? "rising" as const
    : detail?.statistics.trend === "falling"
      ? "falling" as const
      : "stable" as const;

  return (
    <Link
      href={`/polypulse/${pair.id}`}
      className="block bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4 hover:bg-ki-elevated/60 hover:border-ki-border-subtle transition-all"
    >
      {/* 국가 쌍 표시 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{pair.from.flag}</span>
          <span className="text-ki-text-muted">→</span>
          <span className="text-xl">{pair.to.flag}</span>
        </div>
        <div className={`px-2 py-0.5 ${config.bgColor} border ${config.borderColor} rounded text-xs ${config.color}`}>
          {tLevel(`${pair.level.toLowerCase() as "low" | "moderate" | "elevated" | "high" | "critical"}.label`)}
        </div>
      </div>

      {/* 국가명 */}
      <div className="text-sm text-ki-text font-medium mb-2">
        {pair.from.name} → {pair.to.name}
      </div>

      {/* Z-점수 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold" style={{ color: config.chartColor }}>
            {pair.zScore.toFixed(1)}
          </span>
          <span className="text-xs text-ki-text-muted">{t("zScore")}</span>
        </div>
        <div className={`flex items-center gap-1 ${trendColor} text-xs`}>
          <TrendIcon className="w-3 h-3" />
          <span>{tCommon(trendKey)}</span>
        </div>
      </div>

      {/* 미니 차트 */}
      <div className="h-12 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
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

      {/* 분석하기 링크 */}
      <div className="text-xs text-cyan-400 flex items-center justify-end gap-1">
        <span>{t("analyze")}</span>
        <span>→</span>
      </div>
    </Link>
  );
}
