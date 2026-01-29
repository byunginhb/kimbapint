"use client";

import { Badge, LiveBadge } from "@/components/ui/Badge";
import { THREAT_LEVEL_CONFIG, type ThreatLevel } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";

interface HeaderProps {
  threatLevel: ThreatLevel;
}

export function Header({ threatLevel }: HeaderProps) {
  const config = THREAT_LEVEL_CONFIG[threatLevel];

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center gap-3">
            <div className="text-2xl">🍙</div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                <span className="text-neutral-50">Kimbap</span>
                <span className="text-green-500">INT</span>
              </h1>
              <p className="text-xs text-neutral-500">국방부 김밥 지수</p>
            </div>
          </div>

          {/* 중앙 - 위협 레벨 */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Circle
                className={cn("h-3 w-3 fill-current", config.color)}
              />
              <span className="text-sm text-neutral-400">위협 레벨:</span>
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
                {config.label}
              </Badge>
            </div>
          </div>

          {/* 우측 - LIVE 배지 */}
          <div className="flex items-center gap-3">
            <LiveBadge />
            <span className="text-xs text-neutral-500 hidden sm:inline">
              실시간 모니터링
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
