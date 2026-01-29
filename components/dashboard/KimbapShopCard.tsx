"use client";

import { ExternalLink, Car } from "lucide-react";

interface HourlyData {
  hour: number;
  value: number;
}

interface KimbapShop {
  id: string;
  name: string;
  status: "NOMINAL" | "BUSY" | "CLOSED" | "SPIKE";
  distance: string;
  statusText: string;
  hourlyData: HourlyData[];
}

interface KimbapShopCardProps {
  shop: KimbapShop;
}

export function KimbapShopCard({ shop }: KimbapShopCardProps) {
  const statusConfig = {
    NOMINAL: {
      bgColor: "bg-green-900/20",
      borderColor: "border-green-500/40",
      textColor: "text-green-400",
      label: "정상",
    },
    BUSY: {
      bgColor: "bg-yellow-900/20",
      borderColor: "border-yellow-500/40",
      textColor: "text-yellow-400",
      label: "바쁨",
    },
    CLOSED: {
      bgColor: "bg-gray-800",
      borderColor: "border-gray-600",
      textColor: "text-gray-400",
      label: "영업종료",
    },
    SPIKE: {
      bgColor: "bg-red-900/20",
      borderColor: "border-red-500/40",
      textColor: "text-red-400",
      label: "급증",
    },
  };

  const config = statusConfig[shop.status];
  const maxValue = Math.max(...shop.hourlyData.map((d) => d.value));

  return (
    <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4 hover:bg-gray-800/60 transition-all">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🍙</span>
          <h3 className="font-bold text-white font-mono text-sm uppercase tracking-wide">
            {shop.name}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded bg-gray-800 hover:bg-gray-700 transition-colors text-gray-400 hover:text-white">
            <ExternalLink className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded bg-gray-800 hover:bg-gray-700 transition-colors text-gray-400 hover:text-white">
            <Car className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 상태 배지 + 거리 */}
      <div className="flex items-center justify-between mb-4">
        <div
          className={`px-3 py-1.5 rounded ${config.bgColor} border ${config.borderColor} ${config.textColor} text-xs font-mono`}
        >
          {shop.status === "NOMINAL" && "↗ "}
          {config.label}
        </div>
        <span className="text-gray-500 text-xs font-mono">{shop.distance}</span>
      </div>

      {/* POPULAR TIMES ANALYSIS */}
      <div className="mb-3">
        <h4 className="text-xs text-gray-500 font-mono mb-2 tracking-wide">
          POPULAR TIMES ANALYSIS
        </h4>
        <div className="flex items-center gap-1.5 mb-3">
          <span className="px-2 py-0.5 bg-red-900/30 border border-red-500/30 rounded text-red-400 text-xs font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            LIVE
          </span>
          <span className="text-gray-400 text-xs">{shop.statusText}</span>
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
                <span className="text-[8px] text-gray-600 font-mono">
                  {data.hour.toString().padStart(2, "0")}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
