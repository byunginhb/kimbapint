"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const scanningMessages = [
  "김밥 주파수 스캔중...",
  "국방부 주변 배달 패턴 분석중...",
  "용산 지역 이상 징후 모니터링...",
  "실시간 데이터 수집중...",
  "합참 주변 김밥집 탐지중...",
  "야근 패턴 분석중...",
];

export function ScanningIndicator() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % scanningMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3">
      {/* 펄스 인디케이터 */}
      <div className="relative">
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <div className="absolute inset-0 h-3 w-3 animate-ping rounded-full bg-green-500" />
      </div>

      {/* 스캔 메시지 */}
      <span
        className={cn(
          "font-mono text-sm text-green-400",
          "animate-pulse"
        )}
      >
        {scanningMessages[messageIndex]}
      </span>
    </div>
  );
}
