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
                ? "bg-neutral-800 border-neutral-700 text-neutral-50"
                : "bg-transparent border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-300"
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
