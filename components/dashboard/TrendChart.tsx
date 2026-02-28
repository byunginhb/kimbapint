"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { getWeekdayLabels } from "@/lib/mock-data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useChartTheme } from "@/lib/chart-theme";

interface TrendChartProps {
  weeklyOrders: number[];
  weeklyAverage: number;
}

export function TrendChart({ weeklyOrders, weeklyAverage }: TrendChartProps) {
  const t = useTranslations("trendChart");
  const ct = useChartTheme();
  const labels = getWeekdayLabels();
  const data = weeklyOrders.map((orders, index) => ({
    day: labels[index],
    orders,
    average: weeklyAverage,
  }));

  return (
    <Card>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-base text-ki-text-secondary">{t("title")}</span>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-ki-text-muted">{t("dailyOrders")}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-ki-text-muted" />
            <span className="text-ki-text-muted">{t("average")}</span>
          </div>
        </div>
      </div>

      {/* 차트 */}
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} />
            <XAxis
              dataKey="day"
              tick={{ fill: ct.tick, fontSize: 12 }}
              axisLine={{ stroke: ct.axisLine }}
              tickLine={{ stroke: ct.axisLine }}
            />
            <YAxis
              tick={{ fill: ct.tick, fontSize: 12 }}
              axisLine={{ stroke: ct.axisLine }}
              tickLine={{ stroke: ct.axisLine }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: ct.tooltipBg,
                border: `1px solid ${ct.tooltipBorder}`,
                borderRadius: "8px",
                color: ct.tooltipText,
              }}
              labelStyle={{ color: ct.tooltipLabel }}
              formatter={(value, name) => [
                `${value}`,
                name === "orders" ? t("ordersTooltip") : t("averageTooltip"),
              ]}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#22c55e"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOrders)"
            />
            <Line
              type="monotone"
              dataKey="average"
              stroke="#525252"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
