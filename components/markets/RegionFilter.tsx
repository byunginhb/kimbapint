"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { REGION_CONFIG, type Region } from "@/lib/types";

interface RegionFilterProps {
  selectedRegion: Region;
  onRegionChange: (region: Region) => void;
}

const regions: Region[] = ["all", "korean_peninsula", "northeast_asia", "southeast_asia", "americas", "middle_east"];

export function RegionFilter({ selectedRegion, onRegionChange }: RegionFilterProps) {
  const t = useTranslations("regions");

  return (
    <div className="flex flex-wrap gap-2">
      {regions.map((region) => {
        const config = REGION_CONFIG[region];
        const isSelected = selectedRegion === region;

        return (
          <button
            key={region}
            onClick={() => onRegionChange(region)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              "border",
              isSelected
                ? "bg-ki-elevated border-ki-border-subtle text-ki-text"
                : "bg-transparent border-ki-border text-ki-text-secondary hover:border-ki-border-subtle hover:text-ki-text-secondary"
            )}
          >
            <span className="mr-1.5">{config.emoji}</span>
            {t(region)}
          </button>
        );
      })}
    </div>
  );
}
