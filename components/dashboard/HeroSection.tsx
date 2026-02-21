"use client";

import { useTranslations } from "next-intl";
import { Radar, Info } from "lucide-react";
import { OsintFeed } from "./OsintFeed";
import Image from "next/image";

interface HeroSectionProps {
  kimbapconLevel: number;
  kimbapconStatus: string;
}

export function HeroSection({
  kimbapconLevel,
  kimbapconStatus,
}: HeroSectionProps) {
  const t = useTranslations("hero");

  return (
    <div className="py-3 sm:py-4 lg:py-6 border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-4 lg:gap-8">
          {/* 왼쪽: 타이틀 + KIMBAPCON */}
          <div className="w-full lg:flex-1 lg:max-w-2xl">
            {/* 로고 + 타이틀 */}
            <div className="flex items-center gap-2 sm:gap-7 md:gap-8 mb-3 sm:mb-4">
              {/* 김밥 아이콘 */}
              <div className="flex-shrink-0">
                <Image src="/kimbap.png" alt="Kimbap" width={80} height={80} className="w-14 h-14 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-40 lg:h-40" />
              </div>

              <div className="flex-1 min-w-0">
                <h1
                  className="font-bold tracking-normal sm:tracking-wider leading-none sm:leading-tight text-center sm:text-left whitespace-normal sm:whitespace-nowrap break-words text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-yellow-400"
                  style={{ fontFamily: "var(--font-vt323)" }}
                >
                  {t("kimbapIndex")}
                </h1>
                <div className="flex items-center gap-1.5 justify-center sm:justify-start mt-0.5 sm:mt-1 flex-wrap sm:flex-nowrap">
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base tracking-wider sm:tracking-widest whitespace-nowrap">
                    {t("tagline")}
                  </p>
                  <span className="text-gray-500 text-xs sm:text-sm lg:text-base">
                    |
                  </span>
                  <span className="text-gray-400 text-xs sm:text-sm lg:text-base tracking-wider">
                    Kimbap<span className="text-green-400">INT</span>
                  </span>
                </div>
              </div>
            </div>

            {/* KIMBAPCON 박스 */}
            <div className="bg-blue-900/80 border-blue-500 border-2 rounded-xl p-3 sm:p-4 lg:p-5 scanlines relative animate-pulse-glow">
              <div className="absolute top-2 right-2 z-10">
                <button
                  className="p-1.5 rounded-full hover:bg-black/20 transition-colors text-blue-400 relative z-10"
                  aria-label="KIMBAPCON"
                >
                  <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2 lg:gap-3 relative z-10">
                <Radar className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-400 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-400 leading-none -mb-1"
                    style={{ fontFamily: "var(--font-vt323)" }}
                  >
                    KIMBAPCON {kimbapconLevel}
                  </div>
                  <div className="text-xs sm:text-sm text-blue-400 opacity-80 leading-tight flex flex-wrap items-center gap-1">
                    <span>{kimbapconStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: OSINT FEED */}
          <div className="w-full lg:flex-shrink-0 lg:w-auto 2xl:flex-1 min-w-0">
            <div className="w-full lg:max-w-2xl 2xl:max-w-none">
              <OsintFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
