import { cn } from "@/lib/utils"
import type { Limitation } from "@/content/case-studies/glp1-pharmacovigilance"

interface LimitationCalloutProps {
  limitations: Limitation[]
  className?: string
}

export function LimitationCallout({ limitations, className }: LimitationCalloutProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {limitations.map((lim, i) => (
        <div
          key={lim.id}
          className="overflow-hidden rounded-[16px] border border-blush/[0.12] bg-blush/[0.03]"
        >
          {/* Header */}
          <div className="flex items-start gap-4 px-5 py-4">
            {/* Number badge */}
            <span
              className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-blush/20 bg-blush/[0.06] text-[9px] font-semibold text-blush/70"
              aria-hidden="true"
            >
              {i + 1}
            </span>

            <div className="min-w-0 flex-1">
              <h3 className="mb-1 text-sm font-semibold text-white/85">
                {lim.title}
              </h3>
              <p className="text-[12px] leading-relaxed text-white/55">
                {lim.description}
              </p>
            </div>
          </div>

          {/* Mitigation */}
          <div className="flex items-start gap-3 border-t border-blush/[0.08] bg-blush/[0.02] px-5 py-3">
            <span className="mt-0.5 shrink-0 text-[9px] font-medium tracking-[0.14em] uppercase text-blush/50">
              Mitigation
            </span>
            <p className="text-[11px] leading-relaxed text-white/45">
              {lim.mitigation}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
