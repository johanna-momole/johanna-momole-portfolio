import { cn } from "@/lib/utils"

// Circular "locus" nodes on a horizontal coordinate track line.
// VB_H increased to 192 and TRACK_Y raised to 100 to give clear vertical
// space for both above-track and below-track labels at larger font sizes.
const STAGES = [
  { label: "LOAD",       sub: ["CSV", "Normalize cols"],  color: "#87A878", cx: 65  },
  { label: "VALIDATE",   sub: ["Schema", "P-range"],       color: "#87A878", cx: 197 },
  { label: "SCORE",      sub: ["BETA × −log10(P)"],        color: "#7FE7F2", cx: 329 },
  { label: "NORMALIZE",  sub: ["Z-score", "Percentile"],   color: "#7FE7F2", cx: 461 },
  { label: "RANK",       sub: ["P75 · P25", "Tier"],       color: "#C6A0FF", cx: 593 },
  { label: "EXPORT",     sub: ["CSV · JSON", "2 plots"],   color: "#C7FF35", cx: 721 },
]

const NODE_R  = 22
const TRACK_Y = 100

interface GenomicsPipelineDiagramProps {
  className?: string
}

export function GenomicsPipelineDiagram({ className }: GenomicsPipelineDiagramProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <svg
        viewBox="0 0 784 192"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="min-w-[640px] w-full"
        role="img"
      >
        <defs>
          <radialGradient id="gen-bg" cx="50%" cy="100%" r="85%">
            <stop offset="0%" stopColor="#0A1E12" />
            <stop offset="100%" stopColor="#040A0E" />
          </radialGradient>
          <pattern id="gen-scan" x="0" y="0" width="784" height="14" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="784" y2="0" stroke="#87A878" strokeWidth="0.4" strokeOpacity="0.04" />
          </pattern>
          <marker id="gen-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0.5 L6,3 L0,5.5 Z" fill="#87A878" fillOpacity="0.55" />
          </marker>
        </defs>

        <rect width="784" height="192" rx="16" fill="url(#gen-bg)" />
        <rect width="784" height="192" rx="16" fill="url(#gen-scan)" />

        {/* Header */}
        <text x="16" y="22" fontSize="9" fill="#87A878" fillOpacity="0.55"
          fontFamily="monospace" fontWeight="500" letterSpacing="2">
          GENE-LEVEL ASSOCIATION SCORING PIPELINE
        </text>
        <text x="16" y="34" fontSize="7" fill="#87A878" fillOpacity="0.35"
          fontFamily="monospace">
          Load · Validate · Score · Normalize · Rank · Export
        </text>
        <line x1="16" y1="42" x2="768" y2="42" stroke="#87A878" strokeWidth="0.5" strokeOpacity="0.12" />

        {/* Horizontal coordinate track line */}
        <line
          x1="20" y1={TRACK_Y}
          x2="764" y2={TRACK_Y}
          stroke="#7FE7F2"
          strokeWidth="0.8"
          strokeOpacity="0.15"
        />

        {/* Arrow connectors between nodes */}
        {STAGES.slice(0, -1).map((stage, i) => {
          const x1 = stage.cx + NODE_R
          const x2 = STAGES[i + 1].cx - NODE_R
          return (
            <line
              key={`conn-${i}`}
              x1={x1} y1={TRACK_Y}
              x2={x2 - 1} y2={TRACK_Y}
              stroke={stage.color}
              strokeWidth="1"
              strokeOpacity="0.28"
              markerEnd="url(#gen-arrow)"
            />
          )
        })}

        {/* Stage nodes + labels */}
        {STAGES.map((stage, i) => {
          const isLast = i === STAGES.length - 1
          // Even indices: label above track; odd indices: label below
          const labelAbove = i % 2 === 0

          const LABEL_FONT = 8.5
          const SUB_FONT   = 7
          const LINE_GAP   = 11

          const labelY = labelAbove
            ? TRACK_Y - NODE_R - 3    // stage name sits just above glow ring; subs stack upward
            : TRACK_Y + NODE_R + 16

          return (
            <g key={stage.label}>
              {/* Outer glow ring */}
              <circle
                cx={stage.cx} cy={TRACK_Y} r={NODE_R + 5}
                fill={stage.color} fillOpacity="0.04"
                stroke={stage.color} strokeWidth="0.5" strokeOpacity="0.14"
              />
              {/* Main node circle */}
              <circle
                cx={stage.cx} cy={TRACK_Y} r={NODE_R}
                fill={stage.color} fillOpacity={isLast ? 0.16 : 0.07}
                stroke={stage.color} strokeWidth="0.9" strokeOpacity={isLast ? 0.72 : 0.35}
              />
              {/* Step number inside node */}
              <text
                x={stage.cx} y={TRACK_Y + 4}
                fontSize="10" fill={stage.color} fillOpacity={isLast ? 0.92 : 0.78}
                fontFamily="monospace" fontWeight="bold" textAnchor="middle"
              >
                {String(i + 1).padStart(2, "0")}
              </text>

              {/* Stage name label */}
              <text
                x={stage.cx} y={labelY}
                fontSize={LABEL_FONT} fill={stage.color}
                fillOpacity={isLast ? 0.95 : 0.88}
                fontFamily="monospace" fontWeight="600" textAnchor="middle"
              >
                {stage.label}
              </text>

              {/* Sub-description lines */}
              {stage.sub.map((line, li) => (
                <text
                  key={li}
                  x={stage.cx}
                  y={labelAbove
                      ? labelY - (li + 1) * LINE_GAP   // stack upward away from node
                      : labelY + (li + 1) * LINE_GAP}  // stack downward away from node
                  fontSize={SUB_FONT}
                  fill={stage.color}
                  fillOpacity="0.52"
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
        <text x="16" y="182" fontSize="7" fill="#87A878" fillOpacity="0.52"
          fontFamily="monospace">
          PYTHON · PANDAS · NUMPY · SCIPY · MATPLOTLIB · DOCKER
        </text>
        <text x="560" y="182" fontSize="7" fill="#C7FF35" fillOpacity="0.62"
          fontFamily="monospace">
          RESEARCH AND EDUCATIONAL USE
        </text>
      </svg>
    </div>
  )
}
