"use client";

import { useState, useMemo } from "react";
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
import {
  mockKimbapconHistory,
  mockMajorEvents,
  getKimbapconHistoryByDays,
  getMajorEventsByDays,
} from "@/lib/mock-data";
import { KIMBAPCON_LEVELS } from "@/lib/types";

type PeriodFilter = 7 | 30 | 90 | "all";

export default function HistoryPage() {
  const [period, setPeriod] = useState<PeriodFilter>(30);

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
    <div className="min-h-screen bg-black text-white font-mono">
      {/* 헤더 */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <BackButton href="/" label="대시보드" />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-400" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
                KIMBAPCON 히스토리
              </h1>
            </div>
            <div
              className={`px-3 py-1.5 rounded ${currentConfig.bgColor} ${currentConfig.color} text-sm font-bold`}
            >
              현재: LEVEL {currentLevel}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 현재 상태 카드 */}
        <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-blue-400" />
            <h2 className="text-lg font-bold">현재 상태</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                레벨
              </p>
              <p className={`text-3xl font-bold ${currentConfig.color}`}>
                KIMBAPCON {currentLevel}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                상태 코드
              </p>
              <p className="text-lg text-white">
                {mockKimbapconHistory[0]?.status || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                설명
              </p>
              <p className="text-lg text-gray-300">{currentConfig.description}</p>
            </div>
          </div>
        </div>

        {/* 기간 필터 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">기간</span>
          </div>
          <div className="flex gap-2">
            {[
              { value: 7 as PeriodFilter, label: "7일" },
              { value: 30 as PeriodFilter, label: "30일" },
              { value: 90 as PeriodFilter, label: "90일" },
              { value: "all" as PeriodFilter, label: "전체" },
            ].map((option) => (
              <button
                key={String(option.value)}
                onClick={() => setPeriod(option.value)}
                className={`px-3 py-1.5 rounded text-sm transition-all ${
                  period === option.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 레벨 변화 차트 */}
        <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4">
            KIMBAPCON 레벨 변화
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#6b7280", fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  domain={[1, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tick={{ fill: "#6b7280", fontSize: 10 }}
                  width={30}
                  reversed
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
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
              <span className="text-gray-400">Level 5 (안정)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-gray-400">Level 4 (일반)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-gray-400">Level 3 (상승)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-gray-400">Level 2 (고도)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-gray-400">Level 1 (최고)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 레벨 변경 기록 */}
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                레벨 변경 기록
              </h3>
              <span className="px-2 py-0.5 bg-cyan-900/30 border border-cyan-500/30 rounded text-cyan-400 text-xs">
                {filteredHistory.length}건
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
                    className="p-3 bg-gray-800/50 rounded-lg border border-gray-700"
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
                            경계 상승
                          </span>
                        )}
                        {isDown && (
                          <span className="flex items-center gap-1 text-green-400 text-xs">
                            <TrendingDown className="w-3 h-3" />
                            경계 완화
                          </span>
                        )}
                        {!isUp && !isDown && (
                          <span className="flex items-center gap-1 text-gray-400 text-xs">
                            <Minus className="w-3 h-3" />
                            유지
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{entry.date}</span>
                    </div>
                    <p className="text-sm text-gray-300">{entry.trigger}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 주요 이벤트 */}
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                주요 이벤트
              </h3>
              <span className="px-2 py-0.5 bg-yellow-900/30 border border-yellow-500/30 rounded text-yellow-400 text-xs">
                {filteredEvents.length}건
              </span>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 bg-gray-800/50 rounded-lg border border-gray-700"
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
                                : "bg-gray-900/30 text-gray-400"
                        }`}
                      >
                        {event.type === "military"
                          ? "군사"
                          : event.type === "political"
                            ? "정치"
                            : event.type === "economic"
                              ? "경제"
                              : "자연"}
                      </span>
                      <span
                        className={`text-xs ${
                          event.impact === "high"
                            ? "text-red-400"
                            : event.impact === "medium"
                              ? "text-yellow-400"
                              : "text-gray-400"
                        }`}
                      >
                        {event.impact === "high"
                          ? "높은 영향"
                          : event.impact === "medium"
                            ? "중간 영향"
                            : "낮은 영향"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{event.date}</span>
                  </div>
                  <h4 className="text-sm text-white font-medium mb-1">
                    {event.title}
                  </h4>
                  <p className="text-xs text-gray-400">{event.description}</p>
                  {event.kimbapconEffect !== 0 && (
                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-xs text-gray-500">KIMBAPCON 영향:</span>
                      <span
                        className={`text-xs font-bold ${
                          event.kimbapconEffect < 0
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                      >
                        {event.kimbapconEffect > 0
                          ? `+${event.kimbapconEffect} (완화)`
                          : `${event.kimbapconEffect} (상승)`}
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
