"use client";

type ThreatLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

interface ThreatPair {
  from: { code: string; flag: string };
  to: { code: string; flag: string };
  level: ThreatLevel;
  chartData: number[];
}

const threatPairs: ThreatPair[] = [
  {
    from: { code: "미국", flag: "🇺🇸" },
    to: { code: "러시아", flag: "🇷🇺" },
    level: "MODERATE",
    chartData: [40, 35, 42, 38, 45, 40, 38, 42, 45, 48, 44, 40],
  },
  {
    from: { code: "러시아", flag: "🇷🇺" },
    to: { code: "우크라", flag: "🇺🇦" },
    level: "HIGH",
    chartData: [50, 55, 52, 60, 58, 65, 62, 58, 55, 52, 58, 55],
  },
  {
    from: { code: "미국", flag: "🇺🇸" },
    to: { code: "중국", flag: "🇨🇳" },
    level: "MODERATE",
    chartData: [30, 32, 28, 35, 38, 42, 40, 45, 48, 50, 52, 55],
  },
  {
    from: { code: "중국", flag: "🇨🇳" },
    to: { code: "대만", flag: "🇹🇼" },
    level: "HIGH",
    chartData: [60, 58, 62, 55, 52, 48, 50, 45, 48, 52, 50, 48],
  },
  {
    from: { code: "미국", flag: "🇺🇸" },
    to: { code: "이란", flag: "🇮🇷" },
    level: "CRITICAL",
    chartData: [50, 55, 60, 58, 65, 70, 75, 78, 80, 85, 82, 88],
  },
  {
    from: { code: "미국", flag: "🇺🇸" },
    to: { code: "베네수엘라", flag: "🇻🇪" },
    level: "CRITICAL",
    chartData: [70, 68, 72, 65, 68, 62, 58, 55, 60, 58, 55, 52],
  },
];

const levelStyles: Record<
  ThreatLevel,
  { badge: string; border: string; chart: string }
> = {
  LOW: {
    badge: "bg-green-500/20 text-green-400 border-green-500/50",
    border: "border-gray-700",
    chart: "#22c55e",
  },
  MODERATE: {
    badge: "bg-cyan-500/20 text-cyan-400 border-cyan-500/50",
    border: "border-gray-700",
    chart: "#06b6d4",
  },
  HIGH: {
    badge: "bg-orange-500/20 text-orange-400 border-orange-500/50",
    border: "border-gray-700",
    chart: "#f97316",
  },
  CRITICAL: {
    badge: "bg-red-500/20 text-red-400 border-red-500/50",
    border: "border-red-500/50",
    chart: "#ef4444",
  },
};

function MiniChart({
  data,
  color,
}: {
  data: number[];
  color: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 200;
  const height = 60;
  const padding = 5;

  const points = data
    .map((val, i) => {
      const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
      const y =
        height - padding - ((val - min) / range) * (height - 2 * padding);
      return `${x},${y}`;
    })
    .join(" ");

  const lastPoint = data[data.length - 1];
  const lastX = width - padding;
  const lastY =
    height - padding - ((lastPoint - min) / range) * (height - 2 * padding);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lastX} cy={lastY} r="4" fill={color} />
    </svg>
  );
}

function ThreatCard({ pair }: { pair: ThreatPair }) {
  const styles = levelStyles[pair.level];

  return (
    <div
      className={`bg-gray-900/60 border ${styles.border} rounded-lg p-4 hover:bg-gray-800/60 transition-colors`}
    >
      {/* 헤더: 국기 + 레벨 뱃지 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{pair.from.flag}</span>
          <span className="text-gray-500">→</span>
          <span className="text-xl">{pair.to.flag}</span>
        </div>
        <span
          className={`px-2 py-0.5 text-[10px] font-mono tracking-wider border rounded ${styles.badge}`}
        >
          {pair.level}
        </span>
      </div>

      {/* 국가 코드 */}
      <p className="text-sm text-gray-400 font-mono mb-3">
        {pair.from.code} / {pair.to.code}
      </p>

      {/* 차트 */}
      <div className="mb-2">
        <MiniChart data={pair.chartData} color={styles.chart} />
      </div>

      {/* 분석 링크 */}
      <a
        href="#"
        className="text-xs text-gray-500 hover:text-gray-300 transition-colors font-mono"
      >
        분석하기 →
      </a>
    </div>
  );
}

export function PolyPulseThreatMonitor() {
  return (
    <div className="py-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 text-[10px] font-mono bg-green-500/20 text-green-400 border border-green-500/50 rounded">
            NEW
          </span>
          <h2 className="text-lg sm:text-xl font-mono text-white flex items-center gap-2">
            <span className="text-purple-400">↗</span>
            <span className="font-bold">PolyPulse</span>
            <span className="text-gray-400">—</span>
            <span className="text-gray-300">양자 위협 모니터</span>
          </h2>
        </div>
        <button className="hidden sm:flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg text-sm text-gray-300 hover:bg-gray-800 transition-colors font-mono">
          PolyPulse 열기 →
        </button>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {threatPairs.map((pair, index) => (
          <ThreatCard key={index} pair={pair} />
        ))}
      </div>
    </div>
  );
}
