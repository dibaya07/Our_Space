import React from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/95 px-3 py-2 text-xs text-slate-100 shadow-lg">
      <div className="mb-1 text-[11px] text-slate-400">{label}</div>
      {payload.map((item) => (
        <div key={item.dataKey} className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-slate-200">{item.name || item.dataKey}:</span>
          <span className="font-semibold text-slate-100">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * LineChart
 *
 * Props:
 * - data: array of objects
 * - xKey: string (key for x-axis)
 * - lines: array of { dataKey, name?, color? }
 * - height: number (chart height, default 260)
 */
export default function LineChart({
  data = [],
  xKey = "label",
  lines = [{ dataKey: "value", name: "Value", color: "#ec4899" }],
  height = 260,
}) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={height}>
        <ReLineChart
          data={data}
          margin={{ top: 8, right: 16, left: -16, bottom: 8 }}
        >
          <CartesianGrid
            stroke="rgba(148, 163, 184, 0.25)"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey={xKey}
            tickMargin={8}
            tick={{ fill: "#cbd5f5", fontSize: 11 }}
            axisLine={{ stroke: "#475569" }}
          />
          <YAxis
            tick={{ fill: "#cbd5f5", fontSize: 11 }}
            axisLine={{ stroke: "#475569" }}
            tickMargin={4}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{
              paddingBottom: 8,
              fontSize: 11,
              color: "#e5e7eb",
            }}
          />

          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name || line.dataKey}
              stroke={line.color || "#ec4899"}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}
