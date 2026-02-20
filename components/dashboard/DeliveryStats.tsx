"use client";

import { useTranslations, useLocale } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { DeliveryStats as DeliveryStatsType } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { MapPin, TrendingUp } from "lucide-react";

interface DeliveryStatsProps {
  stats: DeliveryStatsType;
}

export function DeliveryStats({ stats }: DeliveryStatsProps) {
  const t = useTranslations("deliveryStats");
  const locale = useLocale();
  const changePercent = ((stats.todayOrders - stats.weeklyAverage) / stats.weeklyAverage) * 100;

  return (
    <Card>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-neutral-400">{t("title")}</span>
        <Badge variant={changePercent > 10 ? "warning" : "default"}>
          {t("comparedToAvg", { percent: `${changePercent > 0 ? "+" : ""}${changePercent.toFixed(1)}` })}
        </Badge>
      </div>

      {/* 주요 통계 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-xs text-neutral-500 mb-1">{t("todayOrders")}</p>
          <p className="text-3xl font-bold font-mono text-neutral-50">
            {formatNumber(stats.todayOrders, locale)}
          </p>
        </div>
        <div>
          <p className="text-xs text-neutral-500 mb-1">{t("weeklyAvg")}</p>
          <p className="text-3xl font-bold font-mono text-neutral-400">
            {formatNumber(stats.weeklyAverage, locale)}
          </p>
        </div>
      </div>

      {/* 핫스팟 위치 */}
      <div className="border-t border-neutral-800 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-neutral-500" />
          <span className="text-sm text-neutral-400">{t("topLocations")}</span>
        </div>
        <div className="space-y-2">
          {stats.topLocations.slice(0, 5).map((location, index) => (
            <div
              key={location.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-600 w-4">{index + 1}.</span>
                <span className="text-sm text-neutral-300">{location.name}</span>
              </div>
              <span className="text-sm font-mono text-neutral-400">
                {formatNumber(location.count, locale)}{t("unit")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
