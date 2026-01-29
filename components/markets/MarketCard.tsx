"use client";

import { Card } from "@/components/ui/Card";
import { Badge, TrendBadge } from "@/components/ui/Badge";
import type { Market } from "@/lib/types";
import { REGION_CONFIG } from "@/lib/types";
import { formatNumber, formatDate } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react";

interface MarketCardProps {
  market: Market;
}

export function MarketCard({ market }: MarketCardProps) {
  const regionConfig = REGION_CONFIG[market.region];
  const probabilityPercent = (market.probability * 100).toFixed(1);

  const TrendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
  }[market.trend];

  const trendColor = {
    up: "text-green-500",
    down: "text-red-500",
    stable: "text-neutral-500",
  }[market.trend];

  return (
    <Card className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <Badge variant="region">
          {regionConfig.emoji} {market.region}
        </Badge>
        <TrendIcon className={`h-4 w-4 ${trendColor}`} />
      </div>

      {/* 제목 */}
      <h3 className="text-lg font-semibold text-neutral-50 mb-2 line-clamp-2">
        {market.title}
      </h3>

      {/* 설명 */}
      <p className="text-sm text-neutral-400 mb-4 line-clamp-2 flex-grow">
        {market.description}
      </p>

      {/* 확률 표시 */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <span className="text-4xl font-bold text-green-500 font-mono">
            {probabilityPercent}
          </span>
          <span className="text-lg text-neutral-500 ml-1">%</span>
          <p className="text-xs text-neutral-500 mt-1">예측 확률</p>
        </div>

        <div className="text-right">
          <p className="text-sm font-mono text-neutral-300">
            ₩{formatNumber(market.volume24h)}
          </p>
          <p className="text-xs text-neutral-500">24시간 거래량</p>
        </div>
      </div>

      {/* 푸터 */}
      <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>마감: {formatDate(market.endDate)}</span>
        </div>
        <span>총 ₩{formatNumber(market.totalVolume)}</span>
      </div>
    </Card>
  );
}
