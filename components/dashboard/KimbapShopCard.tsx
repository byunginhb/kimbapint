"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ExternalLink, Car } from "lucide-react";
import Image from "next/image";
import type { KimbapShop } from "@/lib/types";

interface KimbapShopCardProps {
  shop: KimbapShop;
}

export function KimbapShopCard({ shop }: KimbapShopCardProps) {
  const tStatus = useTranslations("shopStatus");
  const tShop = useTranslations("shopCard");
  const statusConfig = {
    NOMINAL: {
      bgColor: "bg-green-900/20",
      borderColor: "border-green-500/40",
      textColor: "text-green-400",
    },
    BUSY: {
      bgColor: "bg-yellow-900/20",
      borderColor: "border-yellow-500/40",
      textColor: "text-yellow-400",
    },
    CLOSED: {
      bgColor: "bg-ki-elevated",
      borderColor: "border-ki-border-subtle",
      textColor: "text-ki-text-secondary",
    },
    SPIKE: {
      bgColor: "bg-red-900/20",
      borderColor: "border-red-500/40",
      textColor: "text-red-400",
    },
  };

  const config = statusConfig[shop.status];
  const maxValue = Math.max(...shop.hourlyData.map((d) => d.value));

  return (
    <Link
      href={`/shop/${shop.id}`}
      className="block bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4 hover:bg-ki-elevated/60 hover:border-ki-border-subtle transition-all cursor-pointer"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Image src="/kimbap.png" alt="Kimbap" width={24} height={24} />
          <h3 className="font-bold text-ki-text font-mono text-base uppercase tracking-wide">
            {shop.name}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded bg-ki-elevated text-ki-text-secondary">
            <ExternalLink className="w-4 h-4" />
          </span>
          <span className="p-1.5 rounded bg-ki-elevated text-ki-text-secondary">
            <Car className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* 상태 배지 + 거리 */}
      <div className="flex items-center justify-between mb-4">
        <div
          className={`px-3 py-1.5 rounded ${config.bgColor} border ${config.borderColor} ${config.textColor} text-sm font-mono`}
        >
          {shop.status === "NOMINAL" && "↗ "}
          {tStatus(shop.status.toLowerCase() as "nominal" | "busy" | "closed" | "spike")}
        </div>
        <span className="text-ki-text-muted text-sm font-mono">{shop.distance}</span>
      </div>

      {/* POPULAR TIMES ANALYSIS */}
      <div className="mb-3">
        <h4 className="text-sm text-ki-text-muted font-mono mb-2 tracking-wide">
          {tShop("popularTimes").toUpperCase()}
        </h4>
        <div className="flex items-center gap-1.5 mb-3">
          <span className="px-2 py-0.5 bg-red-900/30 border border-red-500/30 rounded text-red-400 text-sm font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            LIVE
          </span>
          <span className="text-ki-text-secondary text-sm">{shop.statusText}</span>
        </div>
      </div>

      {/* 시간별 바 차트 */}
      <div className="flex items-end gap-0.5 h-20">
        {shop.hourlyData.map((data, index) => {
          const height = maxValue > 0 ? (data.value / maxValue) * 100 : 0;
          const isCurrentHour = data.hour === new Date().getHours();

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t transition-all ${
                  isCurrentHour ? "bg-blue-400" : "bg-blue-600/60"
                }`}
                style={{ height: `${height}%`, minHeight: data.value > 0 ? "4px" : "0" }}
              />
              {index % 4 === 0 && (
                <span className="text-[10px] text-ki-text-muted font-mono">
                  {data.hour.toString().padStart(2, "0")}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Link>
  );
}
