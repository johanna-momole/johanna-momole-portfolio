import { cn } from "@/lib/utils"

const STEPS = [
  { label: "INGEST",      sub: "FAERS ASCII → PostgreSQL",  color: "#7FE7F2", x: 20  },
  { label: "HARMONIZE",   sub: "Drug names · MedDRA terms",  color: "#7FE7F2", x: 128 },
  { label: "DEDUPLICATE", sub: "CASEID-based · Cross-qtr",   color: "#C6A0FF", x: 236 },
  { label: "EXPOSE",      sub: "5 compounds · PS + SS roles", color: "#C6A0FF", x: 344 },
  { label: "STRATIFY",    sub: "Female · Male · 2×2 tables", color: "#C7FF35", x: 452 },
  { label: "COMPUTE",     sub: "ROR · PRR · Multiple adj.",  color: "#C7FF35", x: 560 },
  { label: "OUTPUT",      sub: "665 signals · QC-validated", color: "#C7FF35", x: 668 },
]

const BOX_W  = 96
const BOX_H  = 52
const BOX_Y  = 58
const ARROW_Y = BOX_Y + BOX_H / 2

interface DataPipelineDiagramProps {
  className?: string
}

export function DataPipelineDiagram({ className }: DataPipelineDiagramProps) {
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
          <radialGradient id="pipe-bg" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#0D1B2A" />
            <stop offset="100%" stopColor="#050713" />
          </radialGradient>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0.5 L6,3 L0,5.5 Z" fill="#7FE7F2" fillOpacity="0.35" />
          </marker>
        </defs>

        <rect width="784" height="148" rx="16" fill="url(#pipe-bg)" />

        {/* Subtle dot grid */}
        <defs>
          <pattern id="pipe-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#7FE7F2" fillOpacity="0.04" />
          </pattern>
        </defs>
        <rect width="784" height="148" rx="16" fill="url(#pipe-dots)" />

        {/* Header */}
        <text x="16" y="20" fontSize="6" fill="#7FE7F2" fillOpacity="0.38" fontFamily="monospace" fontWeight="500" letterSpacing="2">
          FAERS DATA ENGINEERING PIPELINE
        </text>
        <text x="16" y="30" fontSize="5" fill="#7FE7F2" fillOpacity="0.18" fontFamily="monospace">
          Q1 2021 – Q4 2024 · 18.5M+ RECORDS · 158K+ GLP-1 CASES
        </text>
        <line x1="16" y1="36" x2="768" y2="36" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.10" />

        {/* Arrows between steps */}
        {STEPS.slice(0, -1).map((step, i) => {
          const arrowX1 = step.x + BOX_W
          const arrowX2 = STEPS[i + 1].x
          return (
            <line
              key={`arrow-${i}`}
              x1={arrowX1}
              y1={ARROW_Y}
              x2={arrowX2 - 1}
              y2={ARROW_Y}
              stroke="#7FE7F2"
              strokeWidth="1"
              strokeOpacity="0.28"
              markerEnd="url(#arrow)"
            />
          )
        })}

        {/* Step boxes + labels */}
        {STEPS.map((step, i) => {
          const isLast    = i === STEPS.length - 1
          const isMid     = i >= 4
          const boxOpacity = isLast ? 0.14 : isMid ? 0.10 : 0.07
          return (
            <g key={step.label}>
              {/* Box */}
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

              {/* Sub-label (two parts split by ·) */}
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

        {/* Bottom scale note */}
        <text x="16" y="138" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.15" fontFamily="monospace">
          DOCKER · POSTGRESQL · SQL · R · PYTHON · GIT
        </text>
        <text x="680" y="138" fontSize="4.5" fill="#C7FF35" fillOpacity="0.28" fontFamily="monospace">
          HYPOTHESIS-GENERATING ONLY
        </text>
      </svg>
    </div>
  )
}
