import { cn } from "@/lib/utils"

interface RweCohortDesignDiagramProps {
  className?: string
}

export function RweCohortDesignDiagram({ className }: RweCohortDesignDiagramProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <svg
        viewBox="0 0 680 220"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="min-w-[520px] w-full"
        role="img"
      >
        <defs>
          <radialGradient id="rwe-cohort-bg" cx="30%" cy="20%" r="90%">
            <stop offset="0%" stopColor="#0D1B2A" />
            <stop offset="100%" stopColor="#050713" />
          </radialGradient>
        </defs>

        <rect width="680" height="220" rx="16" fill="url(#rwe-cohort-bg)" />

        {/* Dot grid */}
        <defs>
          <pattern id="rwe-cohort-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill="#7FE7F2" fillOpacity="0.04" />
          </pattern>
        </defs>
        <rect width="680" height="220" rx="16" fill="url(#rwe-cohort-dots)" />

        {/* ── Header ───────────────────────────────────────────────────── */}
        <text x="16" y="20" fontSize="6" fill="#7FE7F2" fillOpacity="0.38" fontFamily="monospace" fontWeight="500" letterSpacing="2">
          COHORT DESIGN: TIME-AT-RISK STRUCTURE
        </text>
        <line x1="16" y1="26" x2="664" y2="26" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.10" />

        {/* ── Time axis ───────────────────────────────────────────────── */}
        {/* Main axis line */}
        <line x1="40" y1="110" x2="640" y2="110" stroke="#7FE7F2" strokeWidth="1.2" strokeOpacity="0.30" />
        {/* Arrow at end */}
        <path d="M636,106 L644,110 L636,114 Z" fill="#7FE7F2" fillOpacity="0.30" />

        {/* ── Index event marker ──────────────────────────────────────── */}
        {/* Vertical dashed line */}
        <line x1="340" y1="52" x2="340" y2="140" stroke="#C7FF35" strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.55" />
        {/* Dot on axis */}
        <circle cx="340" cy="110" r="5" fill="#C7FF35" fillOpacity="0.75" />
        {/* Label above */}
        <text x="340" y="46" fontSize="6" fill="#C7FF35" fillOpacity="0.80" fontFamily="monospace" textAnchor="middle" fontWeight="500">
          INDEX EVENT
        </text>
        <text x="340" y="56" fontSize="4.5" fill="#C7FF35" fillOpacity="0.45" fontFamily="monospace" textAnchor="middle">
          Cohort entry date
        </text>

        {/* ── Baseline period (left of index) ─────────────────────────── */}
        {/* Bracket line */}
        <line x1="100" y1="125" x2="336" y2="125" stroke="#7FE7F2" strokeWidth="1" strokeOpacity="0.40" />
        <line x1="100" y1="121" x2="100" y2="129" stroke="#7FE7F2" strokeWidth="1" strokeOpacity="0.40" />
        <line x1="336" y1="121" x2="336" y2="129" stroke="#7FE7F2" strokeWidth="1" strokeOpacity="0.40" />
        {/* Label */}
        <text x="218" y="140" fontSize="5.5" fill="#7FE7F2" fillOpacity="0.55" fontFamily="monospace" textAnchor="middle">
          Baseline Period
        </text>
        <text x="218" y="150" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace" textAnchor="middle">
          Covariate assessment window
        </text>

        {/* Washout region indicator */}
        <rect x="40" y="95" width="56" height="30" rx="4" fill="#7FE7F2" fillOpacity="0.04" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.20" strokeDasharray="2 2" />
        <text x="68" y="109" fontSize="4" fill="#7FE7F2" fillOpacity="0.30" fontFamily="monospace" textAnchor="middle">WASHOUT</text>

        {/* Baseline sub-label: t-n */}
        <text x="104" y="108" fontSize="5" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace">t−n</text>

        {/* ── Follow-up period (right of index) ───────────────────────── */}
        {/* Bracket line */}
        <line x1="344" y1="125" x2="590" y2="125" stroke="#C6A0FF" strokeWidth="1" strokeOpacity="0.40" />
        <line x1="344" y1="121" x2="344" y2="129" stroke="#C6A0FF" strokeWidth="1" strokeOpacity="0.40" />
        <line x1="590" y1="121" x2="590" y2="129" stroke="#C6A0FF" strokeWidth="1" strokeOpacity="0.40" />
        {/* Label */}
        <text x="467" y="140" fontSize="5.5" fill="#C6A0FF" fillOpacity="0.55" fontFamily="monospace" textAnchor="middle">
          Follow-up Period
        </text>
        <text x="467" y="150" fontSize="4.5" fill="#C6A0FF" fillOpacity="0.28" fontFamily="monospace" textAnchor="middle">
          Outcome ascertainment window
        </text>

        {/* Follow-up sub-label: t+m */}
        <text x="560" y="108" fontSize="5" fill="#C6A0FF" fillOpacity="0.28" fontFamily="monospace">t+m</text>

        {/* ── Section labels (above axis) ─────────────────────────────── */}
        {/* Intervention/exposure label left of index */}
        <text x="218" y="80" fontSize="5" fill="#7FE7F2" fillOpacity="0.40" fontFamily="monospace" textAnchor="middle">
          Prior exposure + covariates measured
        </text>
        {/* Outcome label right of index */}
        <text x="467" y="80" fontSize="5" fill="#C6A0FF" fillOpacity="0.40" fontFamily="monospace" textAnchor="middle">
          Outcome and exposure tracked
        </text>

        {/* ── Horizontal separators for label zones ───────────────────── */}
        <line x1="16" y1="168" x2="664" y2="168" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.07" />

        {/* ── Criteria summary row ──────────────────────────────────────── */}
        <text x="16" y="180" fontSize="5.5" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace">
          Inclusion criteria
        </text>
        <rect x="100" y="172" width="120" height="12" rx="4" fill="#7FE7F2" fillOpacity="0.05" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.20" />
        <text x="160" y="180" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace" textAnchor="middle">+ Example criterion</text>

        <text x="240" y="180" fontSize="5.5" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace">
          Exclusion criteria
        </text>
        <rect x="328" y="172" width="120" height="12" rx="4" fill="#7FE7F2" fillOpacity="0.04" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.15" />
        <text x="388" y="180" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace" textAnchor="middle">− Example criterion</text>

        <text x="470" y="180" fontSize="5.5" fill="#C6A0FF" fillOpacity="0.28" fontFamily="monospace">
          Outcome definition
        </text>
        <rect x="560" y="172" width="100" height="12" rx="4" fill="#C6A0FF" fillOpacity="0.04" stroke="#C6A0FF" strokeWidth="0.4" strokeOpacity="0.15" />
        <text x="610" y="180" fontSize="4.5" fill="#C6A0FF" fillOpacity="0.28" fontFamily="monospace" textAnchor="middle">First occurrence</text>

        {/* ── Bottom note ──────────────────────────────────────────────── */}
        <line x1="16" y1="197" x2="664" y2="197" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.07" />
        <text x="16" y="210" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.18" fontFamily="monospace">
          OMOP CDM · NEW-USER DESIGN · ACTIVE COMPARATOR · COHORT DIAGNOSTICS BEFORE ANALYSIS
        </text>
      </svg>
    </div>
  )
}
