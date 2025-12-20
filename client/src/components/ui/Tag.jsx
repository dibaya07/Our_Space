import React from "react";

export default function Tag({
  children,
  icon,            // optional emoji / icon
  variant = "default", // "default" | "success" | "warning" | "danger" | "pink"
  onClick,
  className = "",
  rounded = true,  // fully rounded or soft rounded
  small = false,   // compact version
}) {
  const variants = {
    default: "bg-slate-800 text-slate-200 border-slate-700",
    success: "bg-green-600/20 text-green-300 border-green-500/40",
    warning: "bg-yellow-600/20 text-yellow-300 border-yellow-500/40",
    danger: "bg-red-600/20 text-red-300 border-red-500/40",
    pink: "bg-pink-600/20 text-pink-300 border-pink-500/40",
  };

  return (
    <span
      onClick={onClick}
      className={[
        "inline-flex items-center gap-1 border font-medium select-none",
        small
          ? "text-[10px] px-2 py-[3px]"
          : "text-xs px-3 py-[5px]",
        rounded ? "rounded-full" : "rounded-md",
        variants[variant],
        onClick && "cursor-pointer hover:opacity-80 transition",
        className,
      ].join(" ")}
    >
      {icon && <span className="text-sm">{icon}</span>}
      {children}
    </span>
  );
}
