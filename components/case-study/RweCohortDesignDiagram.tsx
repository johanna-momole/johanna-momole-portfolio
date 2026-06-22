import { cn } from "@/lib/utils"

// Cohort time-at-risk structure diagram for the RWE Evidence Studio case study.
// Shows: washout window → baseline → index event → follow-up, with inclusion/
// exclusion criteria chips and outcome definition in a row below the axis.
//
// Key layout note: the "Cohort entry date" sub-label lives entirely ABOVE the
// dashed vertical index-event line (which starts at y=76), so there is no
// overlap between the annotation and the marker line.

interface RweCohortDesignDiagramProps {
  className?: string
}

export function RweCohortDesignDiagram({ className }: RweCohortDesignDiagramProps) {
  // ── Geometry constants ─────────────────────────────────────────────────────
  const VB_W  = 720
  const VB_H  = 248

  const AXIS_Y = 126          // y of the main time axis
  const IDX_X  = 360          // x of the index event / cohort entry

  // Dashed vertical line: starts clearly below the label text
  const DASH_Y1 = 78
  const DASH_Y2 = AXIS_Y + 22

  // Bracket rows (below axis)
  const BRACK_Y = AXIS_Y + 22
  const LABEL_Y = AXIS_Y + 36
  const SUB_Y   = AXIS_Y + 48

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="min-w-[520px] w-full"
        role="img"
      >
        <defs>
          <radialGradient id="rwe-cd-bg" cx="30%" cy="20%" r="90%">
            <stop offset="0%" stopColor="#0D1B2A" />
            <stop offset="100%" stopColor="#050713" />
          </radialGradient>
          <pattern id="rwe-cd-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill="#7FE7F2" fillOpacity="0.04" />
          </pattern>
          <marker id="rwe-cd-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0.5 L7,3.5 L0,6.5 Z" fill="#7FE7F2" fillOpacity="0.38" />
          </marker>
        </defs>

        <rect width={VB_W} height={VB_H} rx="16" fill="url(#rwe-cd-bg)" />
        <rect width={VB_W} height={VB_H} rx="16" fill="url(#rwe-cd-dots)" />

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <text x="18" y="22" fontSize="8" fill="#7FE7F2" fillOpacity="0.48"
          fontFamily="monospace" fontWeight="500" letterSpacing="2">
          COHORT DESIGN: TIME-AT-RISK STRUCTURE
        </text>
        <line x1="18" y1="30" x2={VB_W - 18} y2="30"
          stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.12" />

        {/* ── INDEX EVENT labels — fully above the dashed line ───────────── */}
        {/* "INDEX EVENT" headline */}
        <text x={IDX_X} y="50" fontSize="8.5" fill="#C7FF35" fillOpacity="0.88"
          fontFamily="monospace" fontWeight="500" textAnchor="middle">
          INDEX EVENT
        </text>
        {/* "Cohort entry date" sub-label — ends at y≈66, well above DASH_Y1=78 */}
        <text x={IDX_X} y="64" fontSize="7" fill="#C7FF35" fillOpacity="0.62"
          fontFamily="monospace" textAnchor="middle">
          Cohort entry date
        </text>

        {/* ── Dashed vertical index marker — starts at y=78, clear of labels ─ */}
        <line x1={IDX_X} y1={DASH_Y1} x2={IDX_X} y2={DASH_Y2}
          stroke="#C7FF35" strokeWidth="1.2" strokeDasharray="4 3" strokeOpacity="0.60" />
        {/* Dot on axis */}
        <circle cx={IDX_X} cy={AXIS_Y} r="6" fill="#C7FF35" fillOpacity="0.80" />

        {/* ── Main time axis ─────────────────────────────────────────────── */}
        <line x1="42" y1={AXIS_Y} x2={VB_W - 26} y2={AXIS_Y}
          stroke="#7FE7F2" strokeWidth="1.4" strokeOpacity="0.32"
          markerEnd="url(#rwe-cd-arr)" />

        {/* ── Washout region ─────────────────────────────────────────────── */}
        <rect x="42" y={AXIS_Y - 16} width="66" height="32" rx="5"
          fill="#7FE7F2" fillOpacity="0.04"
          stroke="#7FE7F2" strokeWidth="0.6" strokeOpacity="0.22" strokeDasharray="3 2" />
        <text x="75" y={AXIS_Y - 2} fontSize="6.5" fill="#7FE7F2" fillOpacity="0.48"
          fontFamily="monospace" textAnchor="middle" fontWeight="500">WASHOUT</text>
        <text x="75" y={AXIS_Y + 10} fontSize="6" fill="#7FE7F2" fillOpacity="0.32"
          fontFamily="monospace" textAnchor="middle">90 days</text>

        {/* t−n label */}
        <text x="116" y={AXIS_Y - 20} fontSize="7" fill="#7FE7F2" fillOpacity="0.40"
          fontFamily="monospace">t−n</text>

        {/* t+m label */}
        <text x={VB_W - 80} y={AXIS_Y - 20} fontSize="7" fill="#C6A0FF" fillOpacity="0.40"
          fontFamily="monospace">t+m</text>

        {/* ── Above-axis annotation text ─────────────────────────────────── */}
        {/* Left zone: baseline */}
        <text x="228" y={AXIS_Y - 22} fontSize="7" fill="#7FE7F2" fillOpacity="0.55"
          fontFamily="monospace" textAnchor="middle">
          Prior exposure + covariates measured
        </text>
        {/* Right zone: follow-up */}
        <text x="510" y={AXIS_Y - 22} fontSize="7" fill="#C6A0FF" fillOpacity="0.55"
          fontFamily="monospace" textAnchor="middle">
          Outcome and exposure tracked
        </text>

        {/* ── Baseline bracket ───────────────────────────────────────────── */}
        <line x1="118" y1={BRACK_Y} x2={IDX_X - 4} y2={BRACK_Y}
          stroke="#7FE7F2" strokeWidth="1" strokeOpacity="0.42" />
        <line x1="118" y1={BRACK_Y - 5} x2="118" y2={BRACK_Y + 5}
          stroke="#7FE7F2" strokeWidth="1" strokeOpacity="0.42" />
        <line x1={IDX_X - 4} y1={BRACK_Y - 5} x2={IDX_X - 4} y2={BRACK_Y + 5}
          stroke="#7FE7F2" strokeWidth="1" strokeOpacity="0.42" />
        <text x="228" y={LABEL_Y} fontSize="7.5" fill="#7FE7F2" fillOpacity="0.68"
          fontFamily="monospace" textAnchor="middle" fontWeight="500">
          Baseline Period
        </text>
        <text x="228" y={SUB_Y} fontSize="6.5" fill="#7FE7F2" fillOpacity="0.40"
          fontFamily="monospace" textAnchor="middle">
          Covariate assessment window
        </text>

        {/* ── Follow-up bracket ──────────────────────────────────────────── */}
        <line x1={IDX_X + 4} y1={BRACK_Y} x2="628" y2={BRACK_Y}
          stroke="#C6A0FF" strokeWidth="1" strokeOpacity="0.42" />
        <line x1={IDX_X + 4} y1={BRACK_Y - 5} x2={IDX_X + 4} y2={BRACK_Y + 5}
          stroke="#C6A0FF" strokeWidth="1" strokeOpacity="0.42" />
        <line x1="628" y1={BRACK_Y - 5} x2="628" y2={BRACK_Y + 5}
          stroke="#C6A0FF" strokeWidth="1" strokeOpacity="0.42" />
        <text x="516" y={LABEL_Y} fontSize="7.5" fill="#C6A0FF" fillOpacity="0.68"
          fontFamily="monospace" textAnchor="middle" fontWeight="500">
          Follow-up Period
        </text>
        <text x="516" y={SUB_Y} fontSize="6.5" fill="#C6A0FF" fillOpacity="0.40"
          fontFamily="monospace" textAnchor="middle">
          Outcome ascertainment window
        </text>

        {/* ── Criteria row ───────────────────────────────────────────────── */}
        <line x1="18" y1="194" x2={VB_W - 18} y2="194"
          stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />

        {/* Inclusion */}
        <text x="18" y="208" fontSize="7" fill="#7FE7F2" fillOpacity="0.45" fontFamily="monospace">
          Inclusion criteria
        </text>
        <rect x="122" y="198" width="126" height="16" rx="5"
          fill="#7FE7F2" fillOpacity="0.05" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.22" />
        <text x="185" y="209" fontSize="6.5" fill="#7FE7F2" fillOpacity="0.52"
          fontFamily="monospace" textAnchor="middle">+ Example criterion</text>

        {/* Exclusion */}
        <text x="268" y="208" fontSize="7" fill="#7FE7F2" fillOpacity="0.45" fontFamily="monospace">
          Exclusion criteria
        </text>
        <rect x="368" y="198" width="126" height="16" rx="5"
          fill="#7FE7F2" fillOpacity="0.04" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.18" />
        <text x="431" y="209" fontSize="6.5" fill="#7FE7F2" fillOpacity="0.45"
          fontFamily="monospace" textAnchor="middle">− Example criterion</text>

        {/* Outcome */}
        <text x="514" y="208" fontSize="7" fill="#C6A0FF" fillOpacity="0.45" fontFamily="monospace">
          Outcome definition
        </text>
        <rect x="618" y="198" width="84" height="16" rx="5"
          fill="#C6A0FF" fillOpacity="0.04" stroke="#C6A0FF" strokeWidth="0.4" strokeOpacity="0.18" />
        <text x="660" y="209" fontSize="6.5" fill="#C6A0FF" fillOpacity="0.45"
          fontFamily="monospace" textAnchor="middle">First occurrence</text>

        {/* ── Bottom note ────────────────────────────────────────────────── */}
        <line x1="18" y1="224" x2={VB_W - 18} y2="224"
          stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.08" />
        <text x="18" y="238" fontSize="6.5" fill="#7FE7F2" fillOpacity="0.30"
          fontFamily="monospace">
          OMOP CDM · NEW-USER DESIGN · ACTIVE COMPARATOR · COHORT DIAGNOSTICS BEFORE ANALYSIS
        </text>
      </svg>
    </div>
  )
}
