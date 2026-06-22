import { cn } from "@/lib/utils"
import type { DataSource } from "@/content/case-studies/glp1-pharmacovigilance"

interface DataSourceCardProps {
  source: DataSource
  className?: string
}

export function DataSourceCard({ source, className }: DataSourceCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-5",
        className
      )}
    >
      {/* Header */}
      <div>
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full border border-aqua/20 bg-aqua/5 px-2 py-0.5 text-[8px] font-medium tracking-wide text-aqua/70">
            {source.acronym}
          </span>
          <span className="text-[9px] text-white/30">{source.type}</span>
        </div>
        <h3 className="text-sm font-semibold text-white/90">{source.name}</h3>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="mb-0.5 text-[9px] font-medium tracking-[0.14em] uppercase text-white/25">Period</p>
          <p className="text-xs font-medium text-white/70">{source.period}</p>
        </div>
        <div>
          <p className="mb-0.5 text-[9px] font-medium tracking-[0.14em] uppercase text-white/25">Scale</p>
          <p className="text-xs font-medium text-white/70">{source.scale}</p>
        </div>
      </div>

      {/* Tables */}
      {source.tables && source.tables.length > 0 && (
        <div>
          <p className="mb-2 text-[9px] font-medium tracking-[0.14em] uppercase text-white/25">
            Tables used
          </p>
          <div className="flex flex-wrap gap-1.5">
            {source.tables.map((t) => (
              <span
                key={t}
                className="rounded-[6px] border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] text-white/55"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      <p className="mt-1 border-t border-white/[0.06] pt-4 text-[11px] leading-relaxed text-white/65">
        {source.notes}
      </p>
    </div>
  )
}
