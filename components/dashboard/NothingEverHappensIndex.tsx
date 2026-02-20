"use client";

import { useTranslations } from "next-intl";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface HighestRiskMarket {
  title: string;
  percentage: number;
  countryFlag: string;
}

interface NothingEverHappensIndexProps {
  percentage: number;
  highestRiskMarket: HighestRiskMarket;
}

export function NothingEverHappensIndex({
  percentage,
  highestRiskMarket,
}: NothingEverHappensIndexProps) {
  const t = useTranslations("nothingIndex");

  const getStatusKey = (pct: number) => {
    if (pct < 30) return "nothing" as const;
    if (pct < 65) return "maybe" as const;
    if (pct < 99) return "happening" as const;
    return "itsOver" as const;
  };

  const getStatusColor = (pct: number) => {
    if (pct < 30) return "text-green-400";
    if (pct < 65) return "text-yellow-400";
    if (pct < 99) return "text-orange-400";
    return "text-red-400";
  };

  const statusKey = getStatusKey(percentage);
  const status = t(`levels.${statusKey}`);
  const statusColor = getStatusColor(percentage);

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center relative z-10">
        {/* 왼쪽: 타이틀 + 설명 */}
        <div className="flex-1 min-w-0 text-center lg:text-left order-1">
          <p className="text-xs text-gray-500 tracking-[0.2em] font-mono mb-3">
            {t("geoIndex")}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6">
            <span className="text-white">{t("status")}: </span>
            <span className={statusColor}>{status}</span>
          </h2>

          <button className="mx-auto lg:mx-0 flex items-center justify-center w-12 h-12 border border-gray-600 rounded-lg mb-4 lg:mb-6 hover:bg-gray-800 transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>

          <p className="text-gray-400 text-sm lg:text-base mb-6 lg:mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
            {t("description")}
          </p>

          <div className="hidden lg:block">
            <HighestRiskCard market={highestRiskMarket} maxRiskLabel={t("maxRisk")} />
          </div>
        </div>

        {/* 오른쪽: 게이지 */}
        <div className="w-full max-w-[450px] lg:w-[450px] order-2">
          <DoomsdayGauge percentage={percentage} labels={t.raw("levels" as Parameters<typeof t.raw>[0])} />
        </div>

        {/* 모바일 Highest Risk */}
        <div className="lg:hidden w-full max-w-md order-3">
          <HighestRiskCard market={highestRiskMarket} maxRiskLabel={t("maxRisk")} />
        </div>
      </div>
    </div>
  );
}

function HighestRiskCard({ market, maxRiskLabel }: { market: HighestRiskMarket; maxRiskLabel: string }) {
  return (
    <div className="bg-gray-900/80 border border-gray-700 rounded-xl p-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center text-4xl">
          {market.countryFlag}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-yellow-500 text-sm">⚠</span>
            <span className="text-xs text-gray-500 tracking-wider font-mono">
              {maxRiskLabel}
            </span>
          </div>
          <p className="text-sm text-white leading-tight line-clamp-2">
            {market.title}
          </p>
        </div>
        <div className="flex items-center gap-2 pl-4 border-l border-gray-700">
          <span className="text-orange-400 font-bold text-2xl font-mono">
            {market.percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}

function DoomsdayGauge({ percentage, labels }: { percentage: number; labels: { nothing: string; maybe: string; happening: string; itsOver: string } }) {
  const gaugeData = [
    { name: "Nothing Ever Happens", value: 30, color: "#22c55e" },
    { name: "Something Might Happen", value: 35, color: "#a3a329" },
    { name: "Something Is Happening", value: 34, color: "#f97316" },
    { name: "It Happened", value: 1, color: "#ef4444" },
  ];

  const RADIAN = Math.PI / 180;
  const needleAngle = 180 - (percentage / 100) * 180;
  const needleLength = 120;
  const cx = 225;
  const cy = 180;
  const needleX = cx + needleLength * Math.cos(needleAngle * RADIAN);
  const needleY = cy - needleLength * Math.sin(needleAngle * RADIAN);

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={gaugeData}
            cx="50%"
            cy="65%"
            startAngle={180}
            endAngle={0}
            innerRadius={100}
            outerRadius={140}
            paddingAngle={1}
            dataKey="value"
            stroke="none"
          >
            {gaugeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 450 280"
      >
        <line
          x1={cx}
          y1={cy}
          x2={needleX}
          y2={needleY}
          stroke="#22c55e"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle
          cx={cx}
          cy={cy}
          r="12"
          fill="#0f172a"
          stroke="#22c55e"
          strokeWidth="3"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center pt-8">
        <span className="text-5xl font-bold text-cyan-400 font-mono">
          {percentage}
        </span>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-8 text-gray-500 text-xs font-mono">
        <span>0</span>
        <span className="ml-8">30</span>
        <span>65</span>
        <span className="mr-8">99</span>
        <span>100</span>
      </div>

      {/* 구역 라벨 */}
      <div className="absolute top-[15%] left-[8%] text-green-500 text-[11px] font-bold leading-tight text-center">
        {labels.nothing}
      </div>

      <div className="absolute top-[2%] left-[28%] text-yellow-600 text-[11px] font-bold leading-tight text-center">
        {labels.maybe}
      </div>

      <div className="absolute top-[2%] right-[22%] text-orange-500 text-[11px] font-bold leading-tight text-center">
        {labels.happening}
      </div>

      <div className="absolute top-[15%] right-[5%] text-red-500 text-[11px] font-bold leading-tight text-center">
        {labels.itsOver}
      </div>
    </div>
  );
}
