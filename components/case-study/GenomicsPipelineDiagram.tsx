import { cn } from "@/lib/utils"

// Circular "locus" nodes on a horizontal coordinate track line.
// Horizontal scan-line background (distinct from dot grid in GLP-1/RWE and
// cross-hatch in the Referral diagram).
const STAGES = [
  { label: "LOAD",       sub: "CSV · Normalize cols",  color: "#87A878", cx: 65  },
  { label: "VALIDATE",   sub: "Schema · P-range",       color: "#87A878", cx: 197 },
  { label: "SCORE",      sub: "BETA × −log10(P)",       color: "#7FE7F2", cx: 329 },
  { label: "NORMALIZE",  sub: "Z-score · Percentile",   color: "#7FE7F2", cx: 461 },
  { label: "RANK",       sub: "P75 · P25 · tier",       color: "#C6A0FF", cx: 593 },
  { label: "EXPORT",     sub: "CSV · JSON · 2 plots",   color: "#C7FF35", cx: 721 },
]

const NODE_R  = 20
const TRACK_Y = 78

interface GenomicsPipelineDiagramProps {
  className?: string
}

export function GenomicsPipelineDiagram({ className }: GenomicsPipelineDiagramProps) {
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
          {/* Subtle green-tinted radial gradient — distinct from the blue/navy in GLP-1 and RWE */}
          <radialGradient id="gen-bg" cx="50%" cy="100%" r="85%">
            <stop offset="0%" stopColor="#0A1E12" />
            <stop offset="100%" stopColor="#040A0E" />
          </radialGradient>
          {/* Horizontal scan-line pattern — genomic track viewer motif */}
          <pattern id="gen-scan" x="0" y="0" width="784" height="14" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="784" y2="0" stroke="#87A878" strokeWidth="0.4" strokeOpacity="0.04" />
          </pattern>
          <marker id="gen-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0.5 L5,2.5 L0,4.5 Z" fill="#87A878" fillOpacity="0.35" />
          </marker>
        </defs>

        <rect width="784" height="148" rx="16" fill="url(#gen-bg)" />
        <rect width="784" height="148" rx="16" fill="url(#gen-scan)" />

        {/* Header */}
        <text x="16" y="20" fontSize="6" fill="#87A878" fillOpacity="0.38" fontFamily="monospace" fontWeight="500" letterSpacing="2">
          GENE-LEVEL ASSOCIATION SCORING PIPELINE
        </text>
        <text x="16" y="30" fontSize="5" fill="#87A878" fillOpacity="0.18" fontFamily="monospace">
          Load · Validate · Score · Normalize · Rank · Export
        </text>
        <line x1="16" y1="36" x2="768" y2="36" stroke="#87A878" strokeWidth="0.5" strokeOpacity="0.10" />

        {/* Horizontal coordinate track line */}
        <line
          x1="20" y1={TRACK_Y}
          x2="764" y2={TRACK_Y}
          stroke="#7FE7F2"
          strokeWidth="0.7"
          strokeOpacity="0.12"
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
              strokeWidth="0.8"
              strokeOpacity="0.20"
              markerEnd="url(#gen-arrow)"
            />
          )
        })}

        {/* Stage nodes + labels */}
        {STAGES.map((stage, i) => {
          const isLast = i === STAGES.length - 1
          // Alternate label positioning: odd above track, even below (prevents crowding)
          const labelAbove = i % 2 === 0

          return (
            <g key={stage.label}>
              {/* Outer glow ring */}
              <circle
                cx={stage.cx} cy={TRACK_Y} r={NODE_R + 4}
                fill={stage.color} fillOpacity="0.04"
                stroke={stage.color} strokeWidth="0.4" strokeOpacity="0.12"
              />
              {/* Main node circle */}
              <circle
                cx={stage.cx} cy={TRACK_Y} r={NODE_R}
                fill={stage.color} fillOpacity={isLast ? 0.13 : 0.06}
                stroke={stage.color} strokeWidth="0.8" strokeOpacity={isLast ? 0.70 : 0.30}
              />
              {/* Step number inside node */}
              <text
                x={stage.cx} y={TRACK_Y + 3}
                fontSize="8" fill={stage.color} fillOpacity={isLast ? 0.88 : 0.65}
                fontFamily="monospace" fontWeight="bold" textAnchor="middle"
              >
                {String(i + 1).padStart(2, "0")}
              </text>

              {/* Stage name label */}
              <text
                x={stage.cx} y={labelAbove ? TRACK_Y - NODE_R - 6 : TRACK_Y + NODE_R + 12}
                fontSize="5.5" fill={stage.color} fillOpacity={isLast ? 0.90 : 0.72}
                fontFamily="monospace" fontWeight="500" textAnchor="middle"
              >
                {stage.label}
              </text>

              {/* Sub-description */}
              {stage.sub.split(" · ").map((line, li) => (
                <text
                  key={li}
                  x={stage.cx}
                  y={(labelAbove
                    ? TRACK_Y - NODE_R - 6 + (li + 1) * 7
                    : TRACK_Y + NODE_R + 12 + (li + 1) * 7
                  )}
                  fontSize="4.5"
                  fill={stage.color}
                  fillOpacity="0.32"
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
        <text x="16" y="138" fontSize="4.5" fill="#87A878" fillOpacity="0.15" fontFamily="monospace">
          PYTHON · PANDAS · NUMPY · SCIPY · MATPLOTLIB · DOCKER
        </text>
        <text x="564" y="138" fontSize="4.5" fill="#C7FF35" fillOpacity="0.25" fontFamily="monospace">
          RESEARCH AND EDUCATIONAL USE
        </text>
      </svg>
    </div>
  )
}
