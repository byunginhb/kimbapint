"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type ThreatLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

interface ThreatPair {
  id: string;
  from: { code: string; flag: string };
  to: { code: string; flag: string };
  level: ThreatLevel;
  chartData: number[];
}

function useThreatPairs() {
  const t = useTranslations("countries");
  const threatPairs: ThreatPair[] = [
    {
      id: "us-ru",
      from: { code: t("us"), flag: "🇺🇸" },
      to: { code: t("ru"), flag: "🇷🇺" },
      level: "MODERATE",
      chartData: [40, 35, 42, 38, 45, 40, 38, 42, 45, 48, 44, 40],
    },
    {
      id: "ru-ua",
      from: { code: t("ru"), flag: "🇷🇺" },
      to: { code: t("ua"), flag: "🇺🇦" },
      level: "HIGH",
      chartData: [50, 55, 52, 60, 58, 65, 62, 58, 55, 52, 58, 55],
    },
    {
      id: "us-cn",
      from: { code: t("us"), flag: "🇺🇸" },
      to: { code: t("cn"), flag: "🇨🇳" },
      level: "MODERATE",
      chartData: [30, 32, 28, 35, 38, 42, 40, 45, 48, 50, 52, 55],
    },
    {
      id: "cn-tw",
      from: { code: t("cn"), flag: "🇨🇳" },
      to: { code: t("tw"), flag: "🇹🇼" },
      level: "HIGH",
      chartData: [60, 58, 62, 55, 52, 48, 50, 45, 48, 52, 50, 48],
    },
    {
      id: "us-ir",
      from: { code: t("us"), flag: "🇺🇸" },
      to: { code: t("ir"), flag: "🇮🇷" },
      level: "CRITICAL",
      chartData: [50, 55, 60, 58, 65, 70, 75, 78, 80, 85, 82, 88],
    },
    {
      id: "us-ve",
      from: { code: t("us"), flag: "🇺🇸" },
      to: { code: t("ve"), flag: "🇻🇪" },
      level: "CRITICAL",
      chartData: [70, 68, 72, 65, 68, 62, 58, 55, 60, 58, 55, 52],
    },
  ];
  return threatPairs;
}

const levelStyles: Record<
  ThreatLevel,
  { badge: string; border: string; chart: string }
> = {
  LOW: {
    badge: "bg-green-500/20 text-green-400 border-green-500/50",
    border: "border-ki-border-subtle",
    chart: "#22c55e",
  },
  MODERATE: {
    badge: "bg-cyan-500/20 text-cyan-400 border-cyan-500/50",
    border: "border-ki-border-subtle",
    chart: "#06b6d4",
  },
  HIGH: {
    badge: "bg-orange-500/20 text-orange-400 border-orange-500/50",
    border: "border-ki-border-subtle",
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

function ThreatCard({ pair, analyzeLabel }: { pair: ThreatPair; analyzeLabel: string }) {
  const styles = levelStyles[pair.level];

  return (
    <Link
      href={`/polypulse/${pair.id}`}
      className={`block bg-ki-surface-alt/60 border ${styles.border} rounded-lg p-4 hover:bg-ki-elevated/60 transition-colors`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{pair.from.flag}</span>
          <span className="text-ki-text-muted">→</span>
          <span className="text-xl">{pair.to.flag}</span>
        </div>
        <span
          className={`px-2 py-0.5 text-[10px] font-mono tracking-wider border rounded ${styles.badge}`}
        >
          {pair.level}
        </span>
      </div>

      <p className="text-sm text-ki-text-secondary font-mono mb-3">
        {pair.from.code} / {pair.to.code}
      </p>

      <div className="mb-2">
        <MiniChart data={pair.chartData} color={styles.chart} />
      </div>

      <span className="text-xs text-ki-text-muted hover:text-ki-text-secondary transition-colors font-mono">
        {analyzeLabel}
      </span>
    </Link>
  );
}

export function PolyPulseThreatMonitor() {
  const t = useTranslations("polyPulseMonitor");
  const threatPairs = useThreatPairs();

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 text-[10px] font-mono bg-green-500/20 text-green-400 border border-green-500/50 rounded">
            NEW
          </span>
          <h2 className="text-lg sm:text-xl font-mono text-ki-text flex items-center gap-2">
            <span className="text-purple-400">↗</span>
            <span className="font-bold">PolyPulse</span>
            <span className="text-ki-text-secondary">—</span>
            <span className="text-ki-text-secondary">{t("title")}</span>
          </h2>
        </div>
        <Link
          href="/polypulse"
          className="hidden sm:flex items-center gap-2 px-4 py-2 border border-ki-border-subtle rounded-lg text-sm text-ki-text-secondary hover:bg-ki-elevated transition-colors font-mono"
        >
          {t("openPolyPulse")}
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {threatPairs.map((pair) => (
          <ThreatCard key={pair.id} pair={pair} analyzeLabel={t("analyze")} />
        ))}
      </div>
    </div>
  );
}
