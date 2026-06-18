import { cn } from "@/lib/utils"

// Pill-shaped nodes differentiate visually from the rectangular boxes in the
// GLP-1 DataPipelineDiagram and RWE RwePipelineDiagram.
const STAGES = [
  { label: "QUESTION",  sub: "Operational · Strategic",  color: "#7FE7F2", phase: "Input"    },
  { label: "DATA PREP", sub: "Consolidate · Normalize",  color: "#7FE7F2", phase: "Input"    },
  { label: "ANALYSIS",  sub: "Network · Geographic",     color: "#C6A0FF", phase: "Analysis" },
  { label: "REVIEW",    sub: "Referral · Service-line",  color: "#C6A0FF", phase: "Analysis" },
  { label: "DASHBOARD", sub: "Visualize · Translate",    color: "#C7FF35", phase: "Output"   },
  { label: "RECOMMEND", sub: "Prioritize · Action",      color: "#C7FF35", phase: "Output"   },
]

const BOX_W  = 104
const BOX_H  = 44
const BOX_Y  = 68
const GAP    = 20
const START  = (784 - (6 * BOX_W + 5 * GAP)) / 2  // ≈ 30
const STEP   = BOX_W + GAP                           // 124
const CENTER_Y = BOX_Y + BOX_H / 2

interface ReferralWorkflowDiagramProps {
  className?: string
}

export function ReferralWorkflowDiagram({ className }: ReferralWorkflowDiagramProps) {
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
          {/* Diagonal gradient — different from the radial gradients in other pipeline diagrams */}
          <linearGradient id="ref-wf-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B1A2E" />
            <stop offset="100%" stopColor="#050713" />
          </linearGradient>
          {/* Cross-hatch grid — distinct from the dot grid used in GLP-1/RWE pipelines */}
          <pattern id="ref-wf-grid" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <line x1="8" y1="0" x2="8" y2="16" stroke="#7FE7F2" strokeWidth="0.3" strokeOpacity="0.04" />
            <line x1="0" y1="8" x2="16" y2="8" stroke="#7FE7F2" strokeWidth="0.3" strokeOpacity="0.04" />
          </pattern>
          <marker id="ref-wf-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0.5 L6,3 L0,5.5 Z" fill="#7FE7F2" fillOpacity="0.32" />
          </marker>
        </defs>

        <rect width="784" height="148" rx="16" fill="url(#ref-wf-bg)" />
        <rect width="784" height="148" rx="16" fill="url(#ref-wf-grid)" />

        {/* Subtle backbone line behind nodes */}
        <line
          x1={START + 8}
          y1={CENTER_Y}
          x2={START + 6 * BOX_W + 5 * GAP - 8}
          y2={CENTER_Y}
          stroke="#7FE7F2"
          strokeWidth="0.5"
          strokeOpacity="0.06"
          strokeDasharray="3 4"
        />

        {/* Header */}
        <text x="16" y="20" fontSize="6" fill="#7FE7F2" fillOpacity="0.38" fontFamily="monospace" fontWeight="500" letterSpacing="2">
          HEALTHCARE REFERRAL ANALYTICS · OPERATIONAL WORKFLOW
        </text>
        <text x="16" y="30" fontSize="5" fill="#7FE7F2" fillOpacity="0.18" fontFamily="monospace">
          Question · Data · Analysis · Review · Dashboard · Recommendation
        </text>
        <line x1="16" y1="36" x2="768" y2="36" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.10" />

        {/* Arrow connectors between stages */}
        {STAGES.slice(0, -1).map((stage, i) => {
          const x1 = START + i * STEP + BOX_W
          const x2 = START + (i + 1) * STEP
          return (
            <line
              key={`arrow-${i}`}
              x1={x1}
              y1={CENTER_Y}
              x2={x2 - 1}
              y2={CENTER_Y}
              stroke={stage.color}
              strokeWidth="0.8"
              strokeOpacity="0.22"
              markerEnd="url(#ref-wf-arrow)"
            />
          )
        })}

        {/* Pill-shaped stage nodes */}
        {STAGES.map((stage, i) => {
          const x      = START + i * STEP
          const isLast = i === STAGES.length - 1
          return (
            <g key={stage.label}>
              {/* Phase chip above box */}
              <text
                x={x + BOX_W / 2}
                y={BOX_Y - 5}
                fontSize="4"
                fill={stage.color}
                fillOpacity="0.30"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {stage.phase}
              </text>

              {/* Pill box — rx=20 gives the rounded-pill appearance */}
              <rect
                x={x}
                y={BOX_Y}
                width={BOX_W}
                height={BOX_H}
                rx="20"
                fill={stage.color}
                fillOpacity={isLast ? 0.12 : 0.06}
                stroke={stage.color}
                strokeWidth="0.75"
                strokeOpacity={isLast ? 0.65 : 0.28}
              />

              {/* Step number */}
              <text
                x={x + 10}
                y={BOX_Y + 12}
                fontSize="5"
                fill={stage.color}
                fillOpacity="0.38"
                fontFamily="monospace"
              >
                {String(i + 1).padStart(2, "0")}
              </text>

              {/* Stage label */}
              <text
                x={x + BOX_W / 2}
                y={BOX_Y + 25}
                fontSize={isLast ? "7" : "6.5"}
                fill={stage.color}
                fillOpacity={isLast ? 0.90 : 0.75}
                fontFamily="monospace"
                fontWeight="500"
                textAnchor="middle"
              >
                {stage.label}
              </text>

              {/* Sub-label */}
              {stage.sub.split(" · ").map((line, li) => (
                <text
                  key={li}
                  x={x + BOX_W / 2}
                  y={BOX_Y + 34 + li * 7}
                  fontSize="4.5"
                  fill={stage.color}
                  fillOpacity="0.35"
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
        <text x="16" y="138" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.15" fontFamily="monospace">
          SQL · PYTHON · TABLEAU
        </text>
        <text x="530" y="138" fontSize="4.5" fill="#C7FF35" fillOpacity="0.25" fontFamily="monospace">
          SYNTHETIC REPRESENTATIVE INTERFACE
        </text>
      </svg>
    </div>
  )
}
