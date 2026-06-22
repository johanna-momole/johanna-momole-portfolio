import { cn } from "@/lib/utils"

const STEPS = [
  { label: "QUESTION",  sub: "Clinical · PICOT input",       color: "#7FE7F2" },
  { label: "COHORT",    sub: "Criteria · Index event",       color: "#7FE7F2" },
  { label: "SQL GEN",   sub: "OMOP CDM · Auto-generated",    color: "#C6A0FF" },
  { label: "DIAGNOSE",  sub: "Attrition · Balance checks",   color: "#C6A0FF" },
  { label: "ANALYZE",   sub: "Propensity · Effect estimate",  color: "#C7FF35" },
  { label: "EVIDENCE",  sub: "Interpretable · Reproducible", color: "#C7FF35" },
]

// Box geometry — wider boxes to hold larger labels comfortably
const BOX_W   = 110
const BOX_H   = 72
const BOX_GAP = 22
const BOX_Y   = 48
// x positions computed from geometry
const STEP_X  = STEPS.map((_, i) => 18 + i * (BOX_W + BOX_GAP))
const ARROW_Y = BOX_Y + BOX_H / 2
const VB_W    = 18 + 6 * BOX_W + 5 * BOX_GAP + 18  // ≈ 824
const VB_H    = 168

interface RwePipelineDiagramProps {
  className?: string
}

export function RwePipelineDiagram({ className }: RwePipelineDiagramProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="min-w-[640px] w-full"
        role="img"
      >
        <defs>
          <radialGradient id="rwe-pipe-bg" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#0D1B2A" />
            <stop offset="100%" stopColor="#050713" />
          </radialGradient>
          <pattern id="rwe-pipe-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#7FE7F2" fillOpacity="0.04" />
          </pattern>
          <marker id="rwe-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0.5 L7,3.5 L0,6.5 Z" fill="#7FE7F2" fillOpacity="0.50" />
          </marker>
        </defs>

        <rect width={VB_W} height={VB_H} rx="16" fill="url(#rwe-pipe-bg)" />
        <rect width={VB_W} height={VB_H} rx="16" fill="url(#rwe-pipe-dots)" />

        {/* Header */}
        <text x="18" y="21" fontSize="8" fill="#7FE7F2" fillOpacity="0.48"
          fontFamily="monospace" fontWeight="500" letterSpacing="2">
          RWE EVIDENCE STUDIO · ANALYTICAL WORKFLOW
        </text>
        <line x1="18" y1="30" x2={VB_W - 18} y2="30"
          stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.12" />

        {/* Arrows between steps */}
        {STEP_X.slice(0, -1).map((x, i) => (
          <line
            key={`rwe-arrow-${i}`}
            x1={x + BOX_W}
            y1={ARROW_Y}
            x2={STEP_X[i + 1] - 1}
            y2={ARROW_Y}
            stroke="#7FE7F2"
            strokeWidth="1"
            strokeOpacity="0.28"
            markerEnd="url(#rwe-arrow)"
          />
        ))}

        {/* Step boxes */}
        {STEPS.map((step, i) => {
          const x        = STEP_X[i]
          const isLast   = i === STEPS.length - 1
          const isMid    = i >= 4
          const fillOp   = isLast ? 0.16 : isMid ? 0.11 : 0.07
          const strokeOp = isLast ? 0.70 : 0.32
          const subLines = step.sub.split(" · ")

          return (
            <g key={step.label}>
              {/* Box */}
              <rect x={x} y={BOX_Y} width={BOX_W} height={BOX_H} rx="7"
                fill={step.color} fillOpacity={fillOp}
                stroke={step.color} strokeWidth="0.8" strokeOpacity={strokeOp} />

              {/* Step number */}
              <text x={x + 8} y={BOX_Y + 14} fontSize="6.5" fill={step.color}
                fillOpacity="0.52" fontFamily="monospace">
                {String(i + 1).padStart(2, "0")}
              </text>

              {/* Main label */}
              <text x={x + BOX_W / 2} y={BOX_Y + 34} fontSize="9"
                fill={step.color} fillOpacity={isLast ? 0.95 : 0.82}
                fontFamily="monospace" fontWeight="500" textAnchor="middle">
                {step.label}
              </text>

              {/* Sub-labels */}
              {subLines.map((line, li) => (
                <text
                  key={li}
                  x={x + BOX_W / 2}
                  y={BOX_Y + 48 + li * 11}
                  fontSize="6"
                  fill={step.color}
                  fillOpacity="0.48"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {line}
                </text>
              ))}
            </g>
          )
        })}

        {/* Footer */}
        <text x="18" y={VB_H - 10} fontSize="6" fill="#7FE7F2" fillOpacity="0.28"
          fontFamily="monospace">
          PYTHON · SQL · R · OMOP CDM
        </text>
        <text x={VB_W - 18} y={VB_H - 10} fontSize="6" fill="#C7FF35" fillOpacity="0.38"
          fontFamily="monospace" textAnchor="end">
          REPRODUCIBLE · AUDITABLE · PORTABLE
        </text>
      </svg>
    </div>
  )
}
