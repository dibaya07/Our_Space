import { useCallback } from "react";

// Lightweight fallback toast hook.
// The original code expected a ToastContext which isn't present in this repo.
// Provide no-op / console-based functions so components can call toasts
// without the app crashing. If you want a visual toast system later,
// implement `ToastContext` and replace this hook's implementation.
export default function useToast() {
  const success = useCallback((message) => {
    // eslint-disable-next-line no-console
    console.info("Toast success:", message);
  }, []);

  const error = useCallback((message) => {
    // eslint-disable-next-line no-console
    console.error("Toast error:", message);
  }, []);

  const warning = useCallback((message) => {
    // eslint-disable-next-line no-console
    console.warn("Toast warning:", message);
  }, []);

  const info = useCallback((message) => {
    // eslint-disable-next-line no-console
    console.log("Toast info:", message);
  }, []);

  const removeToast = useCallback(() => {}, []);

  return { success, error, warning, info, removeToast };
}
