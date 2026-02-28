"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MarketCard } from "./MarketCard";
import { RegionFilter } from "./RegionFilter";
import { getMarketsByRegion } from "@/lib/mock-data";
import type { Region } from "@/lib/types";

export function MarketGrid() {
  const t = useTranslations("markets");
  const [selectedRegion, setSelectedRegion] = useState<Region>("all");
  const markets = getMarketsByRegion(selectedRegion);

  return (
    <div>
      {/* 헤더 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-ki-text">{t("gridTitle")}</h2>
          <p className="text-sm text-ki-text-secondary mt-1">
            {t("gridSubtitle")}
          </p>
        </div>
        <RegionFilter selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />
      </div>

      {/* 마켓 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {markets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>

      {/* 결과 없음 */}
      {markets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-ki-text-muted">{t("noMarketsGrid")}</p>
        </div>
      )}
    </div>
  );
}
