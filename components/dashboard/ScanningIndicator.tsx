"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function ScanningIndicator() {
  const t = useTranslations("scanning");
  const messages = [
    t("messages.0"),
    t("messages.1"),
    t("messages.2"),
    t("messages.3"),
    t("messages.4"),
    t("messages.5"),
  ];
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [messages.length]);

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
        {messages[messageIndex]}
      </span>
    </div>
  );
}
