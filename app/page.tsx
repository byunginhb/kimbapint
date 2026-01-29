"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { BreakingNewsTicker } from "@/components/dashboard/BreakingNewsTicker";
import { FilterTabs } from "@/components/dashboard/FilterTabs";
import { KimbapShopGrid } from "@/components/dashboard/KimbapShopGrid";
import { StatusGauge } from "@/components/dashboard/StatusGauge";
import { GlobeWidget } from "@/components/dashboard/GlobeWidget";
import { NothingEverHappensIndex } from "@/components/dashboard/NothingEverHappensIndex";
import { PolyPulseThreatMonitor } from "@/components/dashboard/PolyPulseThreatMonitor";
import { FeatureCards } from "@/components/dashboard/FeatureCards";
import { MarketIntelligence } from "@/components/dashboard/MarketIntelligence";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* 상단 바 */}
      <TopBar />

      {/* 히어로 섹션 (타이틀 + KIMBAPCON + OSINT FEED) */}
      <HeroSection
        kimbapconLevel={4}
        kimbapconStatus="DOUBLE TAKE • INCREASED INTELLIGENCE WATCH"
      />

      {/* Breaking News 티커 */}
      <BreakingNewsTicker />

      {/* 필터 탭 + Timeline View */}
      <FilterTabs />

      {/* 김밥집 카드 그리드 */}
      <KimbapShopGrid />

      {/* Status + Globe 섹션 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GlobeWidget />
      </div>

      {/* Nothing Ever Happens Index 섹션 */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <NothingEverHappensIndex
            percentage={19}
            highestRiskMarket={{
              title: "2026년 미국이 중남미 국가를 침공할까?",
              percentage: 19,
              countryFlag: "🇺🇸",
            }}
          />
        </div>
      </div>

      {/* PolyPulse - Bilateral Threat Monitor */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PolyPulseThreatMonitor />
        </div>
      </div>

      {/* Feature Cards (POLY GLOBE + Mention HUB) */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureCards />
        </div>
      </div>

      {/* Market Intelligence */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MarketIntelligence />
        </div>
      </div>

      {/* 푸터 */}
      <Footer />
    </div>
  );
}
