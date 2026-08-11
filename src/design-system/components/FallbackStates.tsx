export function SceneFallback({ title = "Scene ready", message = "This section is available with a simplified visual treatment." }) {
  if (import.meta.env.DEV) {
    console.warn(`[Scene fallback] ${title}: ${message}`);
  }

  return (
    <div className="grid h-full w-full place-items-center bg-[var(--pws-theme-bg)] p-10 text-center text-[var(--pws-theme-text)]">
      <div className="max-w-lg border-l border-[var(--pws-red)] pl-5 text-left">
        <p className="pws-technical-label">Fallback</p>
        <h2 className="mt-3 text-2xl font-semibold">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--pws-theme-muted)]">{message}</p>
      </div>
    </div>
  );
}
