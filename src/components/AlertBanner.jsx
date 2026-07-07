function AlertBanner({ message, type = "success", onClose }) {
  if (!message) return null;

  const styles =
    type === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";

  return (
    <div className="fixed right-5 top-5 z-50 w-[calc(100%-2.5rem)] max-w-sm animate-[slideIn_0.25s_ease-out]">
      <div
        className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${styles}`}
      >
        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white/70 text-xs font-bold">
          ✓
        </div>

        <p className="flex-1 text-sm font-medium leading-5">
          {message}
        </p>

        <button
          onClick={onClose}
          className="text-lg leading-none opacity-60 transition hover:opacity-100"
          aria-label="Close alert"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default AlertBanner;