"use client";

import { useAppTheme } from "@/components/common/ThemeProvider";

export function useChartTheme() {
  const { theme } = useAppTheme();
  const isLight = theme === "light";

  return {
    grid: isLight ? "#e5e7eb" : "#262626",
    tick: isLight ? "#737373" : "#737373",
    axisLine: isLight ? "#d1d5db" : "#262626",
    tooltipBg: isLight ? "#ffffff" : "#171717",
    tooltipBorder: isLight ? "#e5e7eb" : "#262626",
    tooltipText: isLight ? "#171717" : "#fafafa",
    tooltipLabel: isLight ? "#52525b" : "#a3a3a3",
    muted: isLight ? "#525252" : "#525252",
    needleCenter: isLight ? "#f8fafc" : "#0f172a",
  };
}
