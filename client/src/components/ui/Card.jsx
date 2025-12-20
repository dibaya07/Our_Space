import React from "react";

export default function Card({
  children,
  title,
  subtitle,
  footer,
  className = "",
  hover = false,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={[
        "rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl shadow-[0_0_25px_rgba(15,23,42,0.4)] p-4 md:p-5 transition",
        hover && "cursor-pointer hover:border-pink-500/40 hover:shadow-[0_0_35px_rgba(236,72,153,0.25)]",
        className,
      ].join(" ")}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-3 space-y-0.5">
          {title && (
            <h2 className="text-base md:text-lg font-semibold text-slate-100">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xs md:text-sm text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Body / content */}
      <div className="text-slate-200 text-sm md:text-base">{children}</div>

      {/* Footer */}
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}
