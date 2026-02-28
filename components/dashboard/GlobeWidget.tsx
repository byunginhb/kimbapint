"use client";

import { Globe, TrendingUp } from "lucide-react";

interface MarketItem {
  name: string;
  percentage: number;
  change: number;
}

const markets: MarketItem[] = [
  { name: "한반도 평화 유지", percentage: 78, change: -2 },
  { name: "북한 도발 없음", percentage: 65, change: -5 },
  { name: "한미 연합훈련 무사 종료", percentage: 82, change: 1 },
];

export function GlobeWidget() {
  return (
    <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
      {/* 헤더 */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-purple-900/30 rounded-lg">
          <Globe className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-ki-text font-mono">KIMBAP</h3>
          <h3 className="text-sm font-bold text-purple-400 font-mono">GLOBE</h3>
        </div>
      </div>

      {/* 지구본 시각화 (간단한 원형) */}
      <div className="relative w-full aspect-square max-w-[200px] mx-auto mb-4">
        {/* 외곽 원 */}
        <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
          {/* 위도 선들 */}
          <div className="absolute inset-[20%] rounded-full border border-purple-500/20" />
          <div className="absolute inset-[40%] rounded-full border border-purple-500/20" />

          {/* 한반도 마커 */}
          <div className="absolute top-[30%] left-[70%] w-3 h-3">
            <div className="w-full h-full rounded-full bg-green-400 animate-ping opacity-75" />
            <div className="absolute inset-0 w-full h-full rounded-full bg-green-400" />
          </div>

          {/* 미국 마커 */}
          <div className="absolute top-[35%] left-[20%] w-2 h-2">
            <div className="w-full h-full rounded-full bg-blue-400" />
          </div>

          {/* 일본 마커 */}
          <div className="absolute top-[40%] left-[75%] w-2 h-2">
            <div className="w-full h-full rounded-full bg-yellow-400" />
          </div>
        </div>

        {/* 중앙 레이블 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🌏</span>
        </div>
      </div>

      {/* 마켓 리스트 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-ki-text-muted font-mono mb-2">
          <TrendingUp className="w-3 h-3" />
          <span>RELATED MARKETS</span>
        </div>
        {markets.map((market, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-ki-elevated/50 rounded hover:bg-ki-elevated transition-colors cursor-pointer"
          >
            <span className="text-xs text-ki-text-secondary font-mono truncate flex-1 mr-2">
              {market.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-ki-text font-mono">
                {market.percentage}%
              </span>
              <span
                className={`text-xs font-mono ${
                  market.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {market.change >= 0 ? "↑" : "↓"}
                {Math.abs(market.change)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
