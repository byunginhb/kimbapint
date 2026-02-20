"use client";

import { useTranslations, useLocale } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Badge, TrendBadge } from "@/components/ui/Badge";
import { THREAT_LEVEL_CONFIG, type ThreatLevel as ThreatLevelType } from "@/lib/types";
import { cn, formatNumber } from "@/lib/utils";
import { AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ThreatLevelProps {
  level: ThreatLevelType;
  deliveryCount: number;
  change24h: number;
  anomalyDetected?: boolean;
}

export function ThreatLevel({
  level,
  deliveryCount,
  change24h,
  anomalyDetected,
}: ThreatLevelProps) {
  const t = useTranslations("threatLevel");
  const tCard = useTranslations("threatLevelCard");
  const locale = useLocale();
  const config = THREAT_LEVEL_CONFIG[level];
  const isPositiveChange = change24h > 0;
  const levelKey = level.toLowerCase() as "low" | "medium" | "high" | "critical";

  return (
    <Card className="relative overflow-hidden">
      {/* 배경 그라데이션 */}
      <div
        className={cn(
          "absolute inset-0 opacity-10",
          level === "LOW" && "bg-gradient-to-br from-green-500 to-transparent",
          level === "MEDIUM" && "bg-gradient-to-br from-yellow-500 to-transparent",
          level === "HIGH" && "bg-gradient-to-br from-orange-500 to-transparent",
          level === "CRITICAL" && "bg-gradient-to-br from-red-500 to-transparent"
        )}
      />

      <div className="relative">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-neutral-400">{tCard("currentLevel")}</span>
          {anomalyDetected && (
            <Badge variant="warning" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              {tCard("anomalyDetected")}
            </Badge>
          )}
        </div>

        {/* 위협 레벨 표시 */}
        <div className="flex items-end gap-4 mb-4">
          <div>
            <span className={cn("text-5xl font-bold", config.color)}>
              {t(`${levelKey}.label`)}
            </span>
            <span className="text-lg text-neutral-500 ml-2">({level})</span>
          </div>
        </div>

        {/* 설명 */}
        <p className="text-sm text-neutral-400 mb-4">{t(`${levelKey}.description`)}</p>

        {/* 통계 */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
          <div>
            <p className="text-xs text-neutral-500 mb-1">{tCard("todayOrders")}</p>
            <p className="text-2xl font-semibold font-mono text-neutral-50">
              {formatNumber(deliveryCount, locale)}
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 mb-1">{tCard("change24h")}</p>
            <div className="flex items-center gap-2">
              {isPositiveChange ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : change24h < 0 ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : (
                <Minus className="h-4 w-4 text-neutral-500" />
              )}
              <span
                className={cn(
                  "text-2xl font-semibold font-mono",
                  isPositiveChange ? "text-green-500" : change24h < 0 ? "text-red-500" : "text-neutral-50"
                )}
              >
                {isPositiveChange ? "+" : ""}
                {change24h.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
