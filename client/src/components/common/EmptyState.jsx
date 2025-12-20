import React from "react";

export default function EmptyState({
  icon = "💗",
  title = "Nothing here yet",
  subtitle = "Add something to get started",
  actions, // optional buttons / links
  className = "",
}) {
  return (
    <div
      className={[
        "w-full flex flex-col items-center text-center gap-3 py-10 px-4",
        "rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl",
        className,
      ].join(" ")}
    >
      {/* Icon */}
      <div className="text-4xl md:text-5xl select-none">{icon}</div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-semibold text-slate-200">
        {title}
      </h3>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm md:text-[15px] text-slate-400 max-w-md leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Actions */}
      {actions && <div className="mt-2 flex flex-wrap justify-center gap-2">{actions}</div>}
    </div>
  );
}
