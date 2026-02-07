"use client"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import type { ProbabilityPoint } from "@/lib/yegeon-types"

interface ProbabilityChartProps {
  data: ProbabilityPoint[]
  color?: string
}

function formatChartDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

interface TooltipPayload {
  value: number
  payload: ProbabilityPoint
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: TooltipPayload[]
}) {
  if (!active || !payload?.length) return null

  const point = payload[0]
  return (
    <div className="rounded-lg border yg-border-canvas-100 yg-bg-canvas-50 px-3 py-2 text-xs shadow-lg">
      <p className="yg-text-ink-400">{point.payload.date}</p>
      <p className="mt-0.5 font-bold yg-text-yes-500">
        {Math.round(point.value * 100)}%
      </p>
    </div>
  )
}

export default function ProbabilityChart({
  data,
  color = "#14b8a6",
}: ProbabilityChartProps) {
  return (
    <div className="rounded-lg border yg-border-canvas-100 yg-bg-canvas-50/50 p-4">
      <h3 className="mb-3 text-sm font-medium yg-text-ink-600">확률 변동</h3>

      <div className="h-48 w-full sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#64748b40"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatChartDate}
              tick={{ fill: "#888da7", fontSize: 11 }}
              axisLine={{ stroke: "#64748b40" }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[0, 1]}
              tickFormatter={(v: number) => `${Math.round(v * 100)}%`}
              tick={{ fill: "#888da7", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="probability"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color, stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
