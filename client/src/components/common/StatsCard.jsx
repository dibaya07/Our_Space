import React from "react";

export default function StatsCard({
  title,
  value,
  icon,                // optional emoji/icon
  trend,               // number (positive or negative) — % change
  trendLabel,          // optional text (e.g., "vs last week")
  onClick,             // clickable card
  className = "",
}) {
  const clickable = typeof onClick === "function";

  const trendColor =
    trend > 0
      ? "text-green-400"
      : trend < 0
      ? "text-red-400"
      : "text-slate-400";

  return (
    <div
      onClick={onClick}
      className={[
        "rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-[0_0_25px_rgba(15,23,42,0.45)] p-4 md:p-5 transition",
        clickable && "cursor-pointer hover:border-pink-500/50 hover:shadow-[0_0_35px_rgba(236,72,153,0.25)]",
        className,
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        {icon && (
          <div className="text-2xl md:text-3xl leading-none select-none">
            {icon}
          </div>
        )}

        {/* Text */}
        <div className="flex-1">
          <h3 className="text-xs md:text-sm font-medium text-slate-400">
            {title}
          </h3>
          <div className="text-xl md:text-2xl font-semibold text-slate-100 mt-1">
            {value}
          </div>
        </div>
      </div>

      {/* Trend */}
      {typeof trend === "number" && (
        <div className="mt-3 flex items-center gap-2 text-xs md:text-sm">
          <span className={trendColor}>
            {trend > 0 && "▲ "}
            {trend < 0 && "▼ "}
            {Math.abs(trend)}%
          </span>
          {trendLabel && (
            <span className="text-slate-500">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
