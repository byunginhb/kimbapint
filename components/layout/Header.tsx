"use client";

import { useTranslations } from "next-intl";
import { Badge, LiveBadge } from "@/components/ui/Badge";
import { THREAT_LEVEL_CONFIG, type ThreatLevel } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  threatLevel: ThreatLevel;
}

export function Header({ threatLevel }: HeaderProps) {
  const t = useTranslations("header");
  const tThreat = useTranslations("threatLevel");
  const config = THREAT_LEVEL_CONFIG[threatLevel];

  return (
    <header className="sticky top-0 z-50 border-b border-ki-border bg-ki-overlay backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center gap-3">
            <Image src="/kimbap.png" alt="Kimbap" width={44} height={44} />
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                <span className="text-ki-text">Kimbap</span>
                <span className="text-green-500">INT</span>
              </h1>
              <p className="text-xs text-ki-text-muted">{t("title")}</p>
            </div>
          </div>

          {/* 중앙 - 위협 레벨 */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Circle
                className={cn("h-3 w-3 fill-current", config.color)}
              />
              <span className="text-sm text-ki-text-secondary">{t("threatLevel")}:</span>
              <Badge
                variant={
                  threatLevel === "LOW"
                    ? "success"
                    : threatLevel === "MEDIUM"
                      ? "warning"
                      : threatLevel === "HIGH"
                        ? "warning"
                        : "danger"
                }
              >
                {tThreat(`${threatLevel.toLowerCase() as "low" | "medium" | "high" | "critical"}.label`)}
              </Badge>
            </div>
          </div>

          {/* 우측 - LIVE 배지 */}
          <div className="flex items-center gap-3">
            <LiveBadge />
            <span className="text-xs text-ki-text-muted hidden sm:inline">
              {t("realTimeMonitoring")}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
