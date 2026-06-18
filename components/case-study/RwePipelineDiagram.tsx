import { cn } from "@/lib/utils"

const STEPS = [
  { label: "QUESTION",  sub: "Clinical · PICOT input",       color: "#7FE7F2", x: 18  },
  { label: "COHORT",    sub: "Criteria · Index event",       color: "#7FE7F2", x: 146 },
  { label: "SQL GEN",   sub: "OMOP CDM · Auto-generated",    color: "#C6A0FF", x: 274 },
  { label: "DIAGNOSE",  sub: "Attrition · Balance checks",   color: "#C6A0FF", x: 402 },
  { label: "ANALYZE",   sub: "Propensity · Effect estimate",  color: "#C7FF35", x: 530 },
  { label: "EVIDENCE",  sub: "Interpretable · Reproducible", color: "#C7FF35", x: 658 },
]

const BOX_W  = 108
const BOX_H  = 52
const BOX_Y  = 58
const ARROW_Y = BOX_Y + BOX_H / 2

interface RwePipelineDiagramProps {
  className?: string
}

export function RwePipelineDiagram({ className }: RwePipelineDiagramProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <svg
        viewBox="0 0 784 148"
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
          <marker id="rwe-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0.5 L6,3 L0,5.5 Z" fill="#7FE7F2" fillOpacity="0.35" />
          </marker>
        </defs>

        <rect width="784" height="148" rx="16" fill="url(#rwe-pipe-bg)" />

        {/* Dot grid */}
        <defs>
          <pattern id="rwe-pipe-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#7FE7F2" fillOpacity="0.04" />
          </pattern>
        </defs>
        <rect width="784" height="148" rx="16" fill="url(#rwe-pipe-dots)" />

        {/* Header */}
        <text x="18" y="20" fontSize="6" fill="#7FE7F2" fillOpacity="0.38" fontFamily="monospace" fontWeight="500" letterSpacing="2">
          RWE EVIDENCE STUDIO · ANALYTICAL WORKFLOW
        </text>
        <text x="18" y="30" fontSize="5" fill="#7FE7F2" fillOpacity="0.18" fontFamily="monospace">
          Question · Cohort · SQL · Diagnose · Analyze · Evidence
        </text>
        <line x1="18" y1="36" x2="766" y2="36" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.10" />

        {/* Arrows between steps */}
        {STEPS.slice(0, -1).map((step, i) => (
          <line
            key={`rwe-arrow-${i}`}
            x1={step.x + BOX_W}
            y1={ARROW_Y}
            x2={STEPS[i + 1].x - 1}
            y2={ARROW_Y}
            stroke="#7FE7F2"
            strokeWidth="1"
            strokeOpacity="0.25"
            markerEnd="url(#rwe-arrow)"
          />
        ))}

        {/* Step boxes + labels */}
        {STEPS.map((step, i) => {
          const isLast    = i === STEPS.length - 1
          const isMid     = i >= 4
          const boxOpacity = isLast ? 0.14 : isMid ? 0.10 : 0.07
          return (
            <g key={step.label}>
              <rect
                x={step.x}
                y={BOX_Y}
                width={BOX_W}
                height={BOX_H}
                rx="6"
                fill={step.color}
                fillOpacity={boxOpacity}
                stroke={step.color}
                strokeWidth="0.75"
                strokeOpacity={isLast ? 0.65 : 0.30}
              />

              {/* Step number */}
              <text
                x={step.x + 6}
                y={BOX_Y + 12}
                fontSize="5"
                fill={step.color}
                fillOpacity="0.45"
                fontFamily="monospace"
              >
                {String(i + 1).padStart(2, "0")}
              </text>

              {/* Label */}
              <text
                x={step.x + BOX_W / 2}
                y={BOX_Y + 27}
                fontSize={isLast ? "7.5" : "7"}
                fill={step.color}
                fillOpacity={isLast ? 0.92 : 0.78}
                fontFamily="monospace"
                fontWeight="500"
                textAnchor="middle"
              >
                {step.label}
              </text>

              {/* Sub-labels */}
              {step.sub.split(" · ").map((line, li) => (
                <text
                  key={li}
                  x={step.x + BOX_W / 2}
                  y={BOX_Y + 37 + li * 8}
                  fontSize="4.5"
                  fill={step.color}
                  fillOpacity="0.38"
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
        <text x="18" y="138" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.15" fontFamily="monospace">
          PYTHON · SQL · R · OMOP CDM
        </text>
        <text x="580" y="138" fontSize="4.5" fill="#C7FF35" fillOpacity="0.28" fontFamily="monospace">
          REPRODUCIBLE · AUDITABLE · PORTABLE
        </text>
      </svg>
    </div>
  )
}
