import { educationalDisclaimer } from "@/lib/content";
import { AlertCircle } from "lucide-react";

interface DisclaimerBannerProps {
  variant?: "default" | "compact";
}

export function DisclaimerBanner({ variant = "default" }: DisclaimerBannerProps) {
  if (variant === "compact") {
    return (
      <p className="rounded-lg border border-magenta/15 bg-magenta/5 px-4 py-3 text-xs leading-relaxed text-muted">
        <strong className="text-magenta-dark">Notice:</strong> {educationalDisclaimer}
      </p>
    );
  }

  return (
    <aside
      className="flex gap-4 rounded-2xl border border-magenta/20 bg-gradient-to-r from-magenta/5 to-burnt-orange/5 p-5 sm:p-6"
      role="note"
      aria-label="Educational services disclaimer"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-magenta" aria-hidden="true" />
      <div>
        <p className="font-semibold text-magenta-dark">Educational Services Only</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{educationalDisclaimer}</p>
      </div>
    </aside>
  );
}
