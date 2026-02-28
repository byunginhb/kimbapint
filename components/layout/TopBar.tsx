"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Clock, Archive, TrendingUp, Eye } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";

const LOCALE_OPTIONS = [
  { value: "ko" as const, flag: "🇰🇷", label: "KO" },
  { value: "en" as const, flag: "🇺🇸", label: "EN" },
];

export function TopBar() {
  const locale = useLocale();
  const t = useTranslations("topbar");
  const pathname = usePathname();

  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toISOString().slice(0, 19) + "Z");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentOption = LOCALE_OPTIONS.find((o) => o.value === locale) ?? LOCALE_OPTIONS[0];

  function switchLocale(newLocale: "ko" | "en") {
    setLangOpen(false);
    // 전체 새로고침으로 Google Translate DOM 오염 방지
    window.location.href = `/${newLocale}${pathname}`;
  }

  return (
    <div className="bg-ki-surface-alt border-b border-ki-border-subtle px-3 pr-24 sm:px-6 py-1.5 sm:py-2">
      <div className="flex flex-row flex-wrap sm:flex-nowrap sm:items-center sm:justify-between text-xs gap-2 sm:gap-0">
        {/* 왼쪽 */}
        <div className="flex flex-row flex-wrap sm:flex-nowrap sm:items-center gap-2 sm:gap-4">
          {/* 시간 */}
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-green-400 flex-shrink-0" />
            <span className="text-ki-text-secondary text-xs">{currentTime ?? "Loading..."}</span>
          </div>

          {/* 위치 모니터링 */}
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full flex-shrink-0 bg-yellow-400 animate-pulse" />
            <span className="text-ki-text-secondary">
              <span className="sm:hidden">{t("locationsShort", { count: 5 })}</span>
              <span className="hidden sm:inline">{t("locationsMonitored", { count: 5 })}</span>
            </span>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4">
          {/* HISTORY 버튼 */}
          <Link
            href="/history"
            className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-900/50 border border-blue-500 rounded text-blue-400 hover:bg-blue-900 light:bg-blue-50 light:border-blue-300 light:text-blue-700 light:hover:bg-blue-100 transition-all font-mono text-xs"
          >
            <Archive className="w-3 h-3 shrink-0" />
            <span className="hidden sm:inline">HISTORY</span>
            <span className="sm:hidden">HIST</span>
          </Link>

          {/* MARKETS 버튼 */}
          <Link
            href="/markets"
            className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-purple-900/50 border border-purple-500 rounded text-purple-400 hover:bg-purple-900 light:bg-purple-50 light:border-purple-300 light:text-purple-700 light:hover:bg-purple-100 transition-all font-mono text-xs"
          >
            <TrendingUp className="w-3 h-3 shrink-0" />
            <span className="hidden sm:inline">MARKETS</span>
            <span className="sm:hidden">MKT</span>
          </Link>

          {/* 예견(YeGeon) 버튼 */}
          <Link
            href="/yegeon"
            className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-amber-900/50 border border-amber-500 rounded text-amber-400 hover:bg-amber-900 light:bg-amber-50 light:border-amber-300 light:text-amber-700 light:hover:bg-amber-100 transition-all font-mono text-xs"
          >
            <Eye className="w-3 h-3 shrink-0" />
            <span className="hidden sm:inline">YEGEON</span>
            <span className="sm:hidden">YG</span>
          </Link>

          {/* 언어 선택 */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-ki-surface-alt border border-ki-border-subtle rounded text-ki-text-secondary hover:bg-ki-elevated hover:text-ki-text transition-all font-mono text-xs"
            >
              <span className="text-base">{currentOption.flag}</span>
              <span className="uppercase hidden sm:inline">{currentOption.label}</span>
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-1 z-50 bg-ki-elevated border border-ki-border-subtle rounded shadow-lg py-1 min-w-[100px]">
                {LOCALE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => switchLocale(option.value)}
                    className={`flex items-center gap-2 w-full px-3 py-1.5 text-xs font-mono transition-colors ${
                      option.value === locale
                        ? "bg-ki-border-subtle text-ki-text"
                        : "text-ki-text-secondary hover:bg-ki-border-subtle hover:text-ki-text"
                    }`}
                  >
                    <span className="text-base">{option.flag}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* STATUS */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-ki-text-secondary hidden sm:inline">{t("status")}:</span>
            <span className="text-green-400">{t("operational")}</span>
          </div>

          {/* 테마 토글 */}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
