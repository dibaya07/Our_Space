import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md", // "sm" | "md" | "lg" | "xl"
  closeOnBackdrop = true,
  className = "",
}) {
  // Close on Esc key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* Modal card */}
      <div
        className={[
          "relative z-10 w-full mx-3 sm:mx-4",
          sizeClasses[size],
        ].join(" ")}
      >
        <div
          className={[
            "rounded-2xl border border-slate-700 bg-slate-900/95 shadow-[0_0_40px_rgba(0,0,0,0.8)]",
            "flex flex-col max-h-[80vh]",
            className,
          ].join(" ")}
        >
          {/* Header */}
          {(title || onClose) && (
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 px-4 py-3">
              <h2 className="text-sm sm:text-base font-semibold text-slate-100">
                {title}
              </h2>
              {onClose && (
                <button
                  onClick={onClose}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 text-slate-400 hover:border-pink-500 hover:text-pink-300 transition text-xs"
                  aria-label="Close"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-5 sm:py-4 text-sm text-slate-100">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="border-t border-slate-800 px-4 py-3 sm:px-5 sm:py-3">
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                {footer}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Use portal if #modal-root exists, else normal render
  const modalRoot = document.getElementById("modal-root");
  if (modalRoot) {
    return ReactDOM.createPortal(modalContent, modalRoot);
  }

  return modalContent;
}
