"use client";

import { useState } from "react";
import { MarketCard } from "./MarketCard";
import { RegionFilter } from "./RegionFilter";
import { getMarketsByRegion } from "@/lib/mock-data";
import type { Region } from "@/lib/types";

export function MarketGrid() {
  const [selectedRegion, setSelectedRegion] = useState<Region>("전체");
  const markets = getMarketsByRegion(selectedRegion);

  return (
    <div>
      {/* 헤더 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-50">지정학적 리스크 예측</h2>
          <p className="text-sm text-neutral-400 mt-1">
            김밥 지수와 연관된 지정학적 이벤트 예측 시장
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
          <p className="text-neutral-500">해당 지역의 예측 시장이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
