import React from "react";

export default function Button({
  type = "button",
  children,
  onClick,
  variant = "primary", // "primary" | "secondary" | "danger" | "ghost"
  full = false,        // full width button
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = "",
}) {
  const isDisabled = disabled || loading;

  const variants = {
    primary:
      "bg-pink-500 text-white hover:bg-pink-600 shadow shadow-pink-500/40",
    secondary:
      "bg-slate-700 text-slate-100 hover:bg-slate-600",
    danger:
      "bg-red-500 text-white hover:bg-red-600",
    ghost:
      "bg-transparent text-slate-300 hover:bg-slate-800 border border-slate-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={[
        "flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition select-none",
        full ? "w-full" : "w-auto",
        variants[variant],
        isDisabled &&
          "opacity-60 cursor-not-allowed hover:bg-inherit hover:text-inherit",
        className,
      ].join(" ")}
    >
      {/* Left Icon */}
      {leftIcon && <span className="text-base">{leftIcon}</span>}

      {/* Button Text */}
      {!loading ? (
        children
      ) : (
        <span className="flex items-center gap-2">
          <svg
            className="h-4 w-4 animate-spin text-white"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-30"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          Loading...
        </span>
      )}

      {/* Right Icon */}
      {rightIcon && <span className="text-base">{rightIcon}</span>}
    </button>
  );
}
