"use client";

import { useTranslations } from "next-intl";
import { Zap, ChevronDown } from "lucide-react";

interface NewsItem {
  id: string;
  text: string;
  probability: number;
  change: number;
  emoji: string;
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    text: "다음 정부 예산안이 1월 30일에 통과될까요?",
    probability: 19,
    change: -13,
    emoji: "⚡",
  },
  {
    id: "2",
    text: "아무 일도 일어나지 않음: 1월",
    probability: 48,
    change: -8,
    emoji: "😴",
  },
  {
    id: "3",
    text: "2025년 내 한반도 군사 충돌 발생?",
    probability: 8,
    change: 2,
    emoji: "🔥",
  },
];

export function BreakingNewsTicker() {
  const t = useTranslations("breakingNews");

  return (
    <div className="bg-ki-surface-alt/80 border-y border-ki-border-subtle py-2 px-4">
      <div className="flex items-center gap-4 overflow-hidden">
        {/* BREAKING 배지 */}
        <div className="flex-shrink-0 flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded text-yellow-400 text-xs font-mono">
          <Zap className="w-3 h-3" />
          <span>BREAKING</span>
        </div>

        {/* 뉴스 티커 */}
        <div className="flex-1 overflow-hidden">
          <div
            className="flex items-center gap-8 animate-ticker whitespace-nowrap"
            style={{ animationDuration: "30s" }}
          >
            {[...newsItems, ...newsItems].map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center gap-2 text-sm">
                <span>{item.emoji}</span>
                <span className="text-ki-text-secondary">{item.text}</span>
                <span className="text-ki-text font-bold">{item.probability}%</span>
                <span className={item.change >= 0 ? "text-green-400" : "text-red-400"}>
                  {item.change >= 0 ? "↑" : "↓"}{Math.abs(item.change)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 더보기 버튼 */}
        <button className="flex-shrink-0 flex items-center gap-1 text-ki-text-secondary hover:text-ki-text transition-colors text-xs">
          <span className="hidden sm:inline">{t("morePredictions")}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
