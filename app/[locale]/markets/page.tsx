"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  TrendingUp,
  Filter,
  ArrowUpDown,
  DollarSign,
  BarChart3,
  Target,
} from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import { MarketCard } from "@/components/markets/MarketCard";
import { mockMarkets } from "@/lib/mock-data";
import { REGION_CONFIG, type Region } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

type SortOption = "probability" | "volume" | "endDate";

export default function MarketsPage() {
  const tRegions = useTranslations("regions");
  const t = useTranslations("markets");
  const tCommon = useTranslations("pageCommon");
  const locale = useLocale();
  const [selectedRegion, setSelectedRegion] = useState<Region>("all");
  const [sortBy, setSortBy] = useState<SortOption>("volume");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const regions: Region[] = ["all", "korean_peninsula", "northeast_asia", "southeast_asia", "americas", "middle_east"];

  const filteredAndSortedMarkets = useMemo(() => {
    let filtered = mockMarkets;

    if (selectedRegion !== "all") {
      filtered = filtered.filter((market) => market.region === selectedRegion);
    }

    return [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "probability":
          comparison = a.probability - b.probability;
          break;
        case "volume":
          comparison = a.volume24h - b.volume24h;
          break;
        case "endDate":
          comparison = new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
          break;
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });
  }, [selectedRegion, sortBy, sortOrder]);

  const stats = useMemo(() => {
    const total = filteredAndSortedMarkets.length;
    const totalVolume = filteredAndSortedMarkets.reduce(
      (sum, m) => sum + m.volume24h,
      0
    );
    const avgProbability =
      filteredAndSortedMarkets.reduce((sum, m) => sum + m.probability, 0) / total || 0;

    return { total, totalVolume, avgProbability };
  }, [filteredAndSortedMarkets]);

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(option);
      setSortOrder("desc");
    }
  };

  return (
    <div className="min-h-screen bg-ki-base text-ki-text font-mono">
      {/* 헤더 */}
      <div className="bg-ki-surface-alt border-b border-ki-border-subtle">
        <div className="container mx-auto px-4 py-4">
          <BackButton href="/" label={tCommon("dashboard")} />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
                {t("title")}
              </h1>
              <span className="px-2 py-0.5 bg-green-900/30 border border-green-500/30 rounded text-green-400 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                LIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
            <div className="flex items-center gap-2 text-ki-text-secondary mb-2">
              <Target className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">{t("marketCount")}</span>
            </div>
            <span className="text-3xl font-bold text-ki-text">{stats.total}</span>
            <span className="text-ki-text-muted text-sm ml-2">{t("countUnit")}</span>
          </div>

          <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
            <div className="flex items-center gap-2 text-ki-text-secondary mb-2">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">{t("totalVolume24h")}</span>
            </div>
            <span className="text-3xl font-bold text-cyan-400">
              ₩{formatNumber(stats.totalVolume, locale)}
            </span>
          </div>

          <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
            <div className="flex items-center gap-2 text-ki-text-secondary mb-2">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">{t("avgProbability")}</span>
            </div>
            <span className="text-3xl font-bold text-green-500">
              {(stats.avgProbability * 100).toFixed(1)}
            </span>
            <span className="text-ki-text-muted text-lg ml-1">%</span>
          </div>
        </div>

        {/* 필터 및 정렬 */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* 지역 필터 */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 text-ki-text-secondary">
              <Filter className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">{t("regionFilter")}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1.5 rounded text-sm transition-all ${
                    selectedRegion === region
                      ? "bg-purple-600 text-white"
                      : "bg-ki-elevated text-ki-text-secondary hover:bg-ki-border-subtle hover:text-ki-text"
                  }`}
                >
                  {REGION_CONFIG[region].emoji} {tRegions(region)}
                </button>
              ))}
            </div>
          </div>

          {/* 정렬 */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-ki-text-secondary">
              <ArrowUpDown className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">{t("sort")}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSort("probability")}
                className={`px-3 py-1.5 rounded text-sm transition-all flex items-center gap-1 ${
                  sortBy === "probability"
                    ? "bg-green-600 text-white"
                    : "bg-ki-elevated text-ki-text-secondary hover:bg-ki-border-subtle hover:text-ki-text"
                }`}
              >
                {t("probability")}
                {sortBy === "probability" && (
                  <span className="text-xs">{sortOrder === "desc" ? "↓" : "↑"}</span>
                )}
              </button>
              <button
                onClick={() => handleSort("volume")}
                className={`px-3 py-1.5 rounded text-sm transition-all flex items-center gap-1 ${
                  sortBy === "volume"
                    ? "bg-cyan-600 text-white"
                    : "bg-ki-elevated text-ki-text-secondary hover:bg-ki-border-subtle hover:text-ki-text"
                }`}
              >
                {t("volume")}
                {sortBy === "volume" && (
                  <span className="text-xs">{sortOrder === "desc" ? "↓" : "↑"}</span>
                )}
              </button>
              <button
                onClick={() => handleSort("endDate")}
                className={`px-3 py-1.5 rounded text-sm transition-all flex items-center gap-1 ${
                  sortBy === "endDate"
                    ? "bg-yellow-600 text-white"
                    : "bg-ki-elevated text-ki-text-secondary hover:bg-ki-border-subtle hover:text-ki-text"
                }`}
              >
                {t("endDate")}
                {sortBy === "endDate" && (
                  <span className="text-xs">{sortOrder === "desc" ? "↓" : "↑"}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 마켓 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>

        {/* 마켓이 없을 때 */}
        {filteredAndSortedMarkets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-ki-text-muted text-lg">{t("noMarkets")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
