import React from "react";
import {
  PieChart as RePieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

function CustomTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) return null;

  const item = payload[0];
  const { name, value, payload: extra } = item;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/95 px-3 py-2 text-xs text-slate-100 shadow-lg">
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="font-medium text-slate-100">
          {name}
        </span>
      </div>
      <div className="mt-1 text-slate-300">
        <span className="font-semibold">{value}</span>
        {extra && typeof extra.percentage === "number" && (
          <span className="text-slate-400"> ({extra.percentage}%)</span>
        )}
      </div>
    </div>
  );
}

/**
 * PieChart
 *
 * Props:
 * - data: array of objects
 * - nameKey: string (label, e.g. "label", "mood")
 * - valueKey: string (numeric value, e.g. "count")
 * - colors: array of color strings (optional)
 * - height: number (default: 260)
 * - innerRadius: number | string (for donut effect)
 * - outerRadius: number | string
 */
export default function PieChart({
  data = [],
  nameKey = "label",
  valueKey = "value",
  colors = [
    "#ec4899",
    "#22c55e",
    "#38bdf8",
    "#f97316",
    "#a855f7",
    "#eab308",
  ],
  height = 260,
  innerRadius = "50%",
  outerRadius = "80%",
}) {
  // Pre-compute total & percentage if not already present
  const total = data.reduce((sum, item) => sum + (item[valueKey] || 0), 0);
  const enrichedData =
    total > 0
      ? data.map((item) => ({
          ...item,
          percentage: Math.round(((item[valueKey] || 0) / total) * 100),
        }))
      : data;

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={height}>
        <RePieChart>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{
              paddingTop: 12,
              fontSize: 11,
              color: "#e5e7eb",
            }}
          />
          <Pie
            data={enrichedData}
            dataKey={valueKey}
            nameKey={nameKey}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={3}
            stroke="#020617"
            strokeWidth={1}
          >
            {enrichedData.map((entry, index) => (
              <Cell
                key={`${entry[nameKey]}-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
}
