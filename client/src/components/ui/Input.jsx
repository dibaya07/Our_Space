import React, { useState } from "react";

export default function Input({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  icon,               // optional left icon (emoji or icon component)
  error,              // string | undefined
  textarea = false,   // convert to <textarea>
  rows = 4,           // textarea rows
  passwordToggle = false, // show/hide password ability
  className = "",
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" && passwordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="w-full space-y-1.5">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-slate-200">
          {label}
        </label>
      )}

      {/* Input wrapper */}
      <div
        className={[
          "flex items-center gap-2 rounded-xl border px-3 py-2 transition",
          "bg-slate-900/60 backdrop-blur-xl shadow-inner",
          error
            ? "border-red-500/70 shadow-[0_0_12px_rgba(239,68,68,0.35)]"
            : "border-slate-700 focus-within:border-pink-500/60 focus-within:shadow-[0_0_14px_rgba(236,72,153,0.25)]",
          className,
        ].join(" ")}
      >
        {/* Left Icon */}
        {icon && (
          <span className="text-lg text-slate-300 select-none">{icon}</span>
        )}

        {/* Textarea mode */}
        {textarea ? (
          <textarea
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-slate-100 text-sm resize-none placeholder-slate-500"
            {...rest}
          />
        ) : (
          <input
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-slate-100 text-sm placeholder-slate-500"
            {...rest}
          />
        )}

        {/* Password toggle button */}
        {type === "password" && passwordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs text-slate-400 hover:text-pink-300 transition"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-400 pl-1">{error}</p>
      )}
    </div>
  );
}
