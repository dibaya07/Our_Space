import React from "react";

export default function Select({
  label,
  value,
  onChange,
  options = [],          // array of { value, label } or strings
  placeholder = "Select an option",
  icon,                  // optional left icon
  error,
  className = "",
  ...rest
}) {
  // Normalize options: allow ["a", "b"] or [{ value, label }]
  const normalizedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const showPlaceholder = placeholder && (value === "" || value === undefined || value === null);

  return (
    <div className="w-full space-y-1.5">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-slate-200">
          {label}
        </label>
      )}

      {/* Wrapper */}
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
        {/* Left icon */}
        {icon && (
          <span className="text-lg text-slate-300 select-none">{icon}</span>
        )}

        {/* Select */}
        <select
          value={value ?? ""} // ensure controlled
          onChange={onChange}
          className="flex-1 bg-transparent outline-none text-slate-100 text-sm placeholder-slate-500 appearance-none pr-6"
          {...rest}
        >
          {showPlaceholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}

          {normalizedOptions.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-slate-900 text-slate-100"
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* Right chevron */}
        <span className="pointer-events-none text-xs text-slate-400 -ml-4">
          ▼
        </span>
      </div>

      {/* Error text */}
      {error && <p className="text-xs text-red-400 pl-1">{error}</p>}
    </div>
  );
}
