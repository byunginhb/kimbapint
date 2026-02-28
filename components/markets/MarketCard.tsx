"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
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
  const tRegions = useTranslations("regions");
  const tMarkets = useTranslations("markets");
  const locale = useLocale();
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
    stable: "text-ki-text-muted",
  }[market.trend];

  return (
    <Link href={`/market/${market.slug}`} className="block">
      <Card className="flex flex-col h-full hover:border-ki-border-subtle transition-colors">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="region">
            {regionConfig.emoji} {tRegions(market.region)}
          </Badge>
          <TrendIcon className={`h-4 w-4 ${trendColor}`} />
        </div>

        {/* 제목 */}
        <h3 className="text-xl font-semibold text-ki-text mb-2 line-clamp-2">
          {market.title}
        </h3>

        {/* 설명 */}
        <p className="text-base text-ki-text-secondary mb-4 line-clamp-2 grow">
          {market.description}
        </p>

        {/* 확률 표시 */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-4xl font-bold text-green-500 font-mono">
              {probabilityPercent}
            </span>
            <span className="text-lg text-ki-text-muted ml-1">%</span>
            <p className="text-sm text-ki-text-muted mt-1">{tMarkets("predictionProb")}</p>
          </div>

          <div className="text-right">
            <p className="text-base font-mono text-ki-text-secondary">
              ₩{formatNumber(market.volume24h, locale)}
            </p>
            <p className="text-sm text-ki-text-muted">{tMarkets("volume24h")}</p>
          </div>
        </div>

        {/* 푸터 */}
        <div className="pt-3 border-t border-ki-border flex items-center justify-between text-sm text-ki-text-muted">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{tMarkets("deadline")}: {formatDate(market.endDate, locale)}</span>
          </div>
          <span>{tMarkets("total")} ₩{formatNumber(market.totalVolume, locale)}</span>
        </div>
      </Card>
    </Link>
  );
}
