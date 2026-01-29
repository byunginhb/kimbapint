"use client";

import { useState, useEffect } from "react";
import { Clock, Archive, TrendingUp, ChevronDown } from "lucide-react";

export function TopBar() {
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toISOString().slice(0, 19) + "Z");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 border-b border-gray-700 px-3 pr-24 sm:px-6 py-1.5 sm:py-2">
      <div className="flex flex-row flex-wrap sm:flex-nowrap sm:items-center sm:justify-between text-xs gap-2 sm:gap-0">
        {/* 왼쪽 */}
        <div className="flex flex-row flex-wrap sm:flex-nowrap sm:items-center gap-2 sm:gap-4">
          {/* 언어 선택 */}
          <div className="relative">
            <button className="flex items-center gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-900/50 border border-slate-700 rounded text-slate-300 hover:bg-slate-800 hover:text-white transition-all font-mono text-xs">
              <span className="text-base">🇰🇷</span>
              <span className="uppercase hidden sm:inline">KO</span>
              <ChevronDown className="w-2.5 h-2.5 transition-transform opacity-70 hidden sm:block" />
            </button>
          </div>

          {/* 시간 */}
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-green-400 flex-shrink-0" />
            <span className="text-gray-400 text-xs">{currentTime ?? "Loading..."}</span>
          </div>

          {/* 위치 모니터링 */}
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full flex-shrink-0 bg-yellow-400 animate-pulse" />
            <span className="text-gray-400">
              <span className="sm:hidden">5 LOC</span>
              <span className="hidden sm:inline">5 LOCATIONS MONITORED</span>
            </span>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4">
          {/* HISTORY 버튼 */}
          <button className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-900/50 border border-blue-500 rounded text-blue-400 hover:bg-blue-900 transition-all font-mono text-xs">
            <Archive className="w-3 h-3 flex-shrink-0" />
            <span className="hidden sm:inline">HISTORY</span>
            <span className="sm:hidden">HIST</span>
            <ChevronDown className="w-2.5 h-2.5 flex-shrink-0" />
          </button>

          {/* MARKETS 버튼 */}
          <button className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-purple-900/50 border border-purple-500 rounded text-purple-400 hover:bg-purple-900 transition-all font-mono text-xs">
            <TrendingUp className="w-3 h-3 flex-shrink-0" />
            <span className="hidden sm:inline">MARKETS</span>
            <span className="sm:hidden">MKT</span>
            <ChevronDown className="w-2.5 h-2.5 flex-shrink-0" />
          </button>

          {/* STATUS */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400 hidden sm:inline">STATUS:</span>
            <span className="text-green-400">OPERATIONAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
