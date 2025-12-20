import React from "react";

export default function TabNavigation({
  tabs = [],               // [{ key, label, icon }]
  active,                  // active key
  onChange,                // callback(key)
  full = true,             // full width tabs
  className = "",
}) {
  return (
    <div className={`w-full flex flex-wrap items-center gap-2 ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.key === active;

        return (
          <button
            key={tab.key}
            onClick={() => onChange && onChange(tab.key)}
            className={[
              "flex items-center gap-2 text-xs sm:text-sm font-medium px-3 py-2 rounded-xl border transition select-none",
              full ? "flex-1 justify-center" : "px-4",
              isActive
                ? "bg-pink-600/20 text-pink-200 border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.25)]"
                : "bg-slate-800/40 text-slate-300 border-slate-700 hover:border-pink-500/40 hover:text-pink-200",
            ].join(" ")}
          >
            {tab.icon && <span className="text-base">{tab.icon}</span>}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
