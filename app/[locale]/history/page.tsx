"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Shield,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { BackButton } from "@/components/ui/BackButton";
import { useChartTheme } from "@/lib/chart-theme";
import {
  mockKimbapconHistory,
  mockMajorEvents,
  getKimbapconHistoryByDays,
  getMajorEventsByDays,
} from "@/lib/mock-data";
import { KIMBAPCON_LEVELS } from "@/lib/types";

type PeriodFilter = 7 | 30 | 90 | "all";

export default function HistoryPage() {
  const tKimbapcon = useTranslations("kimbapcon");
  const t = useTranslations("history");
  const tCommon = useTranslations("pageCommon");
  const [period, setPeriod] = useState<PeriodFilter>(30);
  const ct = useChartTheme();

  const filteredHistory = useMemo(() => {
    if (period === "all") return mockKimbapconHistory;
    return getKimbapconHistoryByDays(period);
  }, [period]);

  const filteredEvents = useMemo(() => {
    if (period === "all") return mockMajorEvents;
    return getMajorEventsByDays(period);
  }, [period]);

  const chartData = useMemo(() => {
    return [...filteredHistory]
      .reverse()
      .map((entry) => ({
        date: entry.date.slice(5),
        level: entry.level,
        fullDate: entry.date,
      }));
  }, [filteredHistory]);

  const currentLevel = mockKimbapconHistory[0]?.level || 4;
  const currentConfig = KIMBAPCON_LEVELS[currentLevel];

  return (
    <div className="min-h-screen bg-ki-base text-ki-text font-mono">
      {/* 헤더 */}
      <div className="bg-ki-surface-alt border-b border-ki-border-subtle">
        <div className="container mx-auto px-4 py-4">
          <BackButton href="/" label={tCommon("dashboard")} />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-400" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
                {t("title")}
              </h1>
            </div>
            <div
              className={`px-3 py-1.5 rounded ${currentConfig.bgColor} ${currentConfig.color} text-sm font-bold`}
            >
              {t("currentLevel", { level: currentLevel })}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 현재 상태 카드 */}
        <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-blue-400" />
            <h2 className="text-lg font-bold">{t("currentStatus")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-ki-text-secondary text-xs uppercase tracking-wider mb-1">
                {t("level")}
              </p>
              <p className={`text-3xl font-bold ${currentConfig.color}`}>
                KIMBAPCON {currentLevel}
              </p>
            </div>
            <div>
              <p className="text-ki-text-secondary text-xs uppercase tracking-wider mb-1">
                {t("statusCode")}
              </p>
              <p className="text-lg text-ki-text">
                {mockKimbapconHistory[0]?.status || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-ki-text-secondary text-xs uppercase tracking-wider mb-1">
                {t("description")}
              </p>
              <p className="text-lg text-ki-text-secondary">{tKimbapcon(`${currentLevel as 1 | 2 | 3 | 4 | 5}.description`)}</p>
            </div>
          </div>
        </div>

        {/* 기간 필터 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-ki-text-secondary">
            <Calendar className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">{t("period")}</span>
          </div>
          <div className="flex gap-2">
            {[
              { value: 7 as PeriodFilter, label: t("days7") },
              { value: 30 as PeriodFilter, label: t("days30") },
              { value: 90 as PeriodFilter, label: t("days90") },
              { value: "all" as PeriodFilter, label: t("all") },
            ].map((option) => (
              <button
                key={String(option.value)}
                onClick={() => setPeriod(option.value)}
                className={`px-3 py-1.5 rounded text-sm transition-all ${
                  period === option.value
                    ? "bg-blue-600 text-white"
                    : "bg-ki-elevated text-ki-text-secondary hover:bg-ki-border-subtle hover:text-ki-text"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 레벨 변화 차트 */}
        <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
          <h3 className="text-sm font-bold text-ki-text tracking-wider uppercase mb-4">
            {t("levelChart")}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="date"
                  tick={{ fill: ct.tick, fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  domain={[1, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tick={{ fill: ct.tick, fontSize: 10 }}
                  width={30}
                  reversed
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: ct.tooltipBg,
                    border: `1px solid ${ct.tooltipBorder}`,
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: ct.tooltipText,
                  }}
                  labelStyle={{ color: ct.tooltipLabel }}
                  formatter={(v) => [`Level ${v}`, "KIMBAPCON"]}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return payload[0].payload.fullDate;
                    }
                    return label;
                  }}
                />
                <ReferenceLine y={3} stroke="#eab308" strokeDasharray="3 3" />
                <ReferenceLine y={2} stroke="#f97316" strokeDasharray="3 3" />
                <Line
                  type="stepAfter"
                  dataKey="level"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  activeDot={{ r: 6, fill: "#60a5fa" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-ki-text-secondary">{t("levelStable")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-ki-text-secondary">{t("levelNormal")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-ki-text-secondary">{t("levelElevated")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-ki-text-secondary">{t("levelHigh")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-ki-text-secondary">{t("levelMax")}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 레벨 변경 기록 */}
          <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-ki-text tracking-wider uppercase">
                {t("changeLog")}
              </h3>
              <span className="px-2 py-0.5 bg-cyan-900/30 border border-cyan-500/30 rounded text-cyan-400 text-xs">
                {tCommon("count", { count: filteredHistory.length })}
              </span>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredHistory.map((entry) => {
                const levelConfig = KIMBAPCON_LEVELS[entry.level];
                const isUp = entry.level < entry.previousLevel;
                const isDown = entry.level > entry.previousLevel;

                return (
                  <div
                    key={entry.id}
                    className="p-3 bg-ki-elevated/50 rounded-lg border border-ki-border-subtle"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-bold ${levelConfig.bgColor} ${levelConfig.color}`}
                        >
                          Level {entry.level}
                        </span>
                        {isUp && (
                          <span className="flex items-center gap-1 text-red-400 text-xs">
                            <TrendingUp className="w-3 h-3" />
                            {t("alertRise")}
                          </span>
                        )}
                        {isDown && (
                          <span className="flex items-center gap-1 text-green-400 text-xs">
                            <TrendingDown className="w-3 h-3" />
                            {t("alertDrop")}
                          </span>
                        )}
                        {!isUp && !isDown && (
                          <span className="flex items-center gap-1 text-ki-text-secondary text-xs">
                            <Minus className="w-3 h-3" />
                            {t("maintain")}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-ki-text-muted">{entry.date}</span>
                    </div>
                    <p className="text-sm text-ki-text-secondary">{entry.trigger}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 주요 이벤트 */}
          <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <h3 className="text-sm font-bold text-ki-text tracking-wider uppercase">
                {t("majorEvents")}
              </h3>
              <span className="px-2 py-0.5 bg-yellow-900/30 border border-yellow-500/30 rounded text-yellow-400 text-xs">
                {tCommon("count", { count: filteredEvents.length })}
              </span>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 bg-ki-elevated/50 rounded-lg border border-ki-border-subtle"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          event.type === "military"
                            ? "bg-red-900/30 text-red-400"
                            : event.type === "political"
                              ? "bg-blue-900/30 text-blue-400"
                              : event.type === "economic"
                                ? "bg-green-900/30 text-green-400"
                                : "bg-ki-surface-alt/30 text-ki-text-secondary"
                        }`}
                      >
                        {event.type === "military"
                          ? t("typeMilitary")
                          : event.type === "political"
                            ? t("typePolitical")
                            : event.type === "economic"
                              ? t("typeEconomic")
                              : t("typeNatural")}
                      </span>
                      <span
                        className={`text-xs ${
                          event.impact === "high"
                            ? "text-red-400"
                            : event.impact === "medium"
                              ? "text-yellow-400"
                              : "text-ki-text-secondary"
                        }`}
                      >
                        {event.impact === "high"
                          ? t("impactHigh")
                          : event.impact === "medium"
                            ? t("impactMedium")
                            : t("impactLow")}
                      </span>
                    </div>
                    <span className="text-xs text-ki-text-muted">{event.date}</span>
                  </div>
                  <h4 className="text-sm text-ki-text font-medium mb-1">
                    {event.title}
                  </h4>
                  <p className="text-xs text-ki-text-secondary">{event.description}</p>
                  {event.kimbapconEffect !== 0 && (
                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-xs text-ki-text-muted">{t("kimbapconEffect")}:</span>
                      <span
                        className={`text-xs font-bold ${
                          event.kimbapconEffect < 0
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                      >
                        {event.kimbapconEffect > 0
                          ? `+${event.kimbapconEffect} ${t("effectEase")}`
                          : `${event.kimbapconEffect} ${t("effectRise")}`}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
