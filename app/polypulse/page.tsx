"use client";

import Link from "next/link";
import { ArrowLeft, Activity, AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const threatPairs = getAllThreatPairs();
  const stats = calculateGlobalStats();

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* 헤더 */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-3 py-1.5 text-gray-400 hover:text-white transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>대시보드</span>
          </button>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-cyan-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
                  PolyPulse - 양자 위협 모니터
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  국가 간 긴장도 지수 추적 시스템
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs text-red-400 font-mono">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 위협 레벨 범례 */}
        <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            위협 레벨
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
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Activity className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">모니터링 쌍</span>
            </div>
            <div className="text-3xl font-bold text-cyan-400">{stats.totalPairs}</div>
            <p className="text-xs text-gray-500 mt-1">국가 쌍 추적 중</p>
          </div>

          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">평균 Z-점수</span>
            </div>
            <div className="text-3xl font-bold text-yellow-400">{stats.avgZScore}</div>
            <p className="text-xs text-gray-500 mt-1">28일 평균 기준</p>
          </div>

          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">위기 쌍</span>
            </div>
            <div className="text-3xl font-bold text-red-400">{stats.criticalPairs}</div>
            <p className="text-xs text-gray-500 mt-1">HIGH 또는 CRITICAL</p>
          </div>
        </div>

        {/* 국가 쌍 그리드 */}
        <div>
          <h2 className="text-sm font-bold text-white tracking-wider uppercase mb-4">
            국가 쌍 목록
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {threatPairs.map((pair) => (
              <ThreatPairCard key={pair.id} pair={pair} />
            ))}
          </div>
        </div>

        {/* 방법론 설명 */}
        <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-3">
            방법론
          </h3>
          <div className="text-sm text-gray-400 space-y-2">
            <p>
              PolyPulse는 GDELT 프로젝트의 실시간 뉴스 데이터를 기반으로 국가 간 긴장도를 측정합니다.
            </p>
            <p>
              Z-점수는 28일 이동 평균 대비 현재 언급 빈도의 표준편차를 나타내며,
              2.0 이상은 비정상적인 활동을 의미합니다.
            </p>
            <p>
              위협 레벨은 Z-점수, 언급 톤, 이벤트 심각도를 종합하여 산출됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThreatPairCard({ pair }: { pair: ThreatPair }) {
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
      : "text-gray-400";

  return (
    <Link
      href={`/polypulse/${pair.id}`}
      className="block bg-gray-900/60 border border-gray-700 rounded-lg p-4 hover:bg-gray-800/60 hover:border-gray-600 transition-all"
    >
      {/* 국가 쌍 표시 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{pair.from.flag}</span>
          <span className="text-gray-500">→</span>
          <span className="text-xl">{pair.to.flag}</span>
        </div>
        <div className={`px-2 py-0.5 ${config.bgColor} border ${config.borderColor} rounded text-xs ${config.color}`}>
          {config.label}
        </div>
      </div>

      {/* 국가명 */}
      <div className="text-sm text-white font-medium mb-2">
        {pair.from.name} → {pair.to.name}
      </div>

      {/* Z-점수 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold" style={{ color: config.chartColor }}>
            {pair.zScore.toFixed(1)}
          </span>
          <span className="text-xs text-gray-500">Z-점수</span>
        </div>
        <div className={`flex items-center gap-1 ${trendColor} text-xs`}>
          <TrendIcon className="w-3 h-3" />
          <span>{detail?.statistics.trend === "rising" ? "상승" : detail?.statistics.trend === "falling" ? "하락" : "유지"}</span>
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
        <span>분석하기</span>
        <span>→</span>
      </div>
    </Link>
  );
}
