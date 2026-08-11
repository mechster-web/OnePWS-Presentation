import { AlertTriangle } from "lucide-react";
import { useMemo, useState } from "react";
import { validateContent } from "../content/contentValidation";

export function ContentValidationNotice() {
  const [dismissed, setDismissed] = useState(false);
  const issues = useMemo(() => validateContent(), []);
  const errors = issues.filter((issue) => issue.severity === "error");

  if (dismissed || issues.length === 0) {
    return null;
  }

  return (
    <aside className="fixed left-4 top-4 z-[90] max-w-md border border-control-warm/70 bg-control-deep/96 p-4 text-control-text shadow-control backdrop-blur">
      <div className="flex items-start gap-3">
        <AlertTriangle aria-hidden="true" className="mt-0.5 shrink-0 text-control-warm" size={18} />
        <div>
          <p className="text-sm font-medium">
            {errors.length > 0 ? "Required experience content needs attention" : "Experience content needs review"}
          </p>
          <p className="mt-2 text-xs leading-5 text-control-muted">
            {issues.slice(0, 3).map((issue) => `${issue.area}: ${issue.message}`).join(" ")}
          </p>
          {issues.length > 3 ? (
            <p className="mt-2 text-xs text-control-muted">{issues.length - 3} more validation notes.</p>
          ) : null}
          <button
            className="mt-3 border border-control-line px-3 py-2 text-xs text-control-soft transition hover:border-control-warm hover:text-control-warm"
            onClick={() => setDismissed(true)}
            type="button"
          >
            Dismiss
          </button>
        </div>
      </div>
    </aside>
  );
}
