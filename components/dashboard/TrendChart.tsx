"use client";

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

interface TrendChartProps {
  weeklyOrders: number[];
  weeklyAverage: number;
}

export function TrendChart({ weeklyOrders, weeklyAverage }: TrendChartProps) {
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
        <span className="text-sm text-neutral-400">7일 배달 추이</span>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-neutral-500">일별 주문</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-neutral-500" />
            <span className="text-neutral-500">평균</span>
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
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
            <XAxis
              dataKey="day"
              tick={{ fill: "#737373", fontSize: 12 }}
              axisLine={{ stroke: "#262626" }}
              tickLine={{ stroke: "#262626" }}
            />
            <YAxis
              tick={{ fill: "#737373", fontSize: 12 }}
              axisLine={{ stroke: "#262626" }}
              tickLine={{ stroke: "#262626" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#171717",
                border: "1px solid #262626",
                borderRadius: "8px",
                color: "#fafafa",
              }}
              labelStyle={{ color: "#a3a3a3" }}
              formatter={(value, name) => [
                `${value}건`,
                name === "orders" ? "주문" : "평균",
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
