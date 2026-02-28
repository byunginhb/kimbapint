"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Filter, Map } from "lucide-react";
import Image from "next/image";

export function FilterTabs() {
  const t = useTranslations("filterTabs");
  const days = [
    t("weekdays.0"),
    t("weekdays.1"),
    t("weekdays.2"),
    t("weekdays.3"),
    t("weekdays.4"),
    t("weekdays.5"),
    t("weekdays.6"),
  ];
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [activeFilter, setActiveFilter] = useState<"all" | "filter" | "map">("all");

  return (
    <div className="bg-ki-surface-alt/50 border-b border-ki-border py-3 px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* 왼쪽: 필터 탭 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`p-2 rounded-lg border transition-all ${
              activeFilter === "all"
                ? "bg-yellow-500/20 border-yellow-500/40 text-yellow-400"
                : "bg-ki-elevated/50 border-ki-border-subtle text-ki-text-secondary hover:text-ki-text"
            }`}
          >
            <Image src="/kimbap.png" alt="Kimbap" width={20} height={20} />
          </button>
          <button
            onClick={() => setActiveFilter("filter")}
            className={`p-2 rounded-lg border transition-all ${
              activeFilter === "filter"
                ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                : "bg-ki-elevated/50 border-ki-border-subtle text-ki-text-secondary hover:text-ki-text"
            }`}
          >
            <Filter className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveFilter("map")}
            className={`p-2 rounded-lg border transition-all ${
              activeFilter === "map"
                ? "bg-purple-500/20 border-purple-500/40 text-purple-400"
                : "bg-ki-elevated/50 border-ki-border-subtle text-ki-text-secondary hover:text-ki-text"
            }`}
          >
            <Map className="w-5 h-5" />
          </button>
        </div>

        {/* 중앙: Timeline View */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-ki-text-muted font-mono hidden sm:inline">⏱️ TIMELINE VIEW:</span>
          <div className="flex items-center gap-1">
            {days.map((day, index) => (
              <button
                key={day}
                onClick={() => setSelectedDay(index)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  selectedDay === index
                    ? "bg-blue-600 text-white"
                    : "bg-ki-elevated text-ki-text-secondary hover:bg-ki-border-subtle hover:text-ki-text"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* 오른쪽: LIVE 버튼 */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-green-900/30 border border-green-500/40 rounded text-green-400 text-xs font-mono hover:bg-green-900/50 transition-all">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            LIVE
          </button>

          <div className="w-8 h-8 rounded-full bg-ki-border-subtle border border-ki-border-subtle flex items-center justify-center text-lg">
            <Image src="/kimbap.png" alt="Kimbap" width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
