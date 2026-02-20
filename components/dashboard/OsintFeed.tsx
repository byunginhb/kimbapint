"use client";

import { useTranslations } from "next-intl";
import { Satellite, Wifi, Pause, ExternalLink, TrendingUp } from "lucide-react";

interface FeedItem {
  id: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
  isAlert: boolean;
}

const mockFeedItems: FeedItem[] = [
  {
    id: "1",
    username: "@국방부_모니터",
    avatar: "🎖️",
    content: "국방부 본관 주변 김밥집 3곳에서 동시에 대량 주문 감지. 야근 패턴 분석 중. 합참 본부 방향으로 배달 집중.",
    timestamp: "12분 전",
    isAlert: true,
  },
  {
    id: "2",
    username: "@용산_워치",
    avatar: "👁️",
    content: "용산대통령실 인근 '맛있는 김밥천국' 주문량 평소 대비 340% 증가. 비정상적 패턴 확인.",
    timestamp: "25분 전",
    isAlert: true,
  },
  {
    id: "3",
    username: "@밀리터리_푸드",
    avatar: "🍱",
    content: "합참 주변 야간 배달 주문 급증. 참치김밥, 치즈김밥 품목 인기. 회의 장기화 추정.",
    timestamp: "1시간 전",
    isAlert: false,
  },
];

export function OsintFeed() {
  const t = useTranslations("osintFeed");

  return (
    <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-3 shadow-lg">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Satellite className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-bold font-mono text-white">OSINT FEED</h3>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <Wifi className="w-3 h-3 text-green-400" />
          </div>
          <div className="text-xs text-gray-500 font-mono">00:00Z</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs font-mono px-2 py-1 rounded text-green-400 bg-green-900/20">
            AUTO-SCROLL
          </div>
          <button
            title={t("pauseScroll")}
            className="p-1 rounded transition-colors text-green-400 hover:text-green-300 hover:bg-green-900/20"
          >
            <Pause className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 통계 */}
      <div className="flex items-center justify-between mb-3 text-xs font-mono">
        <div className="text-blue-400">MONITORING 12 ACCOUNTS</div>
        <div className="text-gray-500">87 REPORTS • 15 ALERTS</div>
      </div>

      {/* 피드 아이템들 */}
      <div className="overflow-x-auto scrollbar-hide">
        <div
          className="flex gap-3 pb-2 animate-marquee"
          style={{
            width: "max-content",
            animationPlayState: "running",
            animationDuration: "60s",
          }}
        >
          {[...mockFeedItems, ...mockFeedItems].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="relative flex-shrink-0 w-[calc(100vw-4rem)] sm:w-80"
            >
              <div
                className={`bg-gray-900/60 border rounded-lg transition-all duration-300 hover:bg-gray-800/60 p-2 h-32 flex flex-col overflow-hidden ${item.isAlert
                  ? "animate-alert-breathe"
                  : "border-gray-700"
                  }`}
              >
                {/* 상단 */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.avatar}</span>
                    <span className="text-xs font-mono text-blue-400 hover:text-blue-300 hover:underline transition-colors cursor-pointer">
                      {item.username}
                    </span>
                    {item.isAlert && (
                      <span className="text-xs text-red-400">⚠️</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{item.timestamp}</span>
                </div>

                {/* 콘텐츠 */}
                <div className="flex gap-1 flex-1 pb-0.5 mb-1">
                  <div className="text-xs text-gray-200 leading-snug font-mono flex-1 line-clamp-3">
                    {item.content}
                  </div>
                </div>

                {/* 하단 */}
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-gray-500 font-mono">LIVE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors font-mono">
                      <TrendingUp className="w-2.5 h-2.5" />
                      MARKETS
                    </button>
                    <button className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors font-mono">
                      <ExternalLink className="w-2.5 h-2.5" />
                      VIEW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
