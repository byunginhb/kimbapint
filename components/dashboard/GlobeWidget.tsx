"use client";

import Image from "next/image";
import { Globe, TrendingUp } from "lucide-react";
import { Link } from "@/i18n/navigation";

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
    <Link
      href="/globe"
      className="block bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4 hover:border-purple-500/40 transition-colors cursor-pointer"
    >
      {/* 헤더 */}
      <div className="flex items-center gap-2 mb-4 group">
        <div className="p-2 bg-purple-900/30 rounded-lg group-hover:bg-purple-900/50 transition-colors">
          <Globe className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-ki-text font-mono">KIMBAP</h3>
          <h3 className="text-sm font-bold text-purple-400 font-mono">GLOBE</h3>
        </div>
      </div>

      {/* 지구본 이미지 */}
      <div className="relative w-full max-w-[200px] mx-auto mb-4">
        <Image
          src="/globe.png"
          alt="Globe"
          width={200}
          height={200}
          className="w-full h-auto drop-shadow-lg"
        />
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
            className="flex items-center justify-between p-2 bg-ki-elevated/50 rounded hover:bg-ki-elevated transition-colors"
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
    </Link>
  );
}
