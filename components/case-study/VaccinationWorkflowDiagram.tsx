import { cn } from "@/lib/utils"

// Horizontal card-chain workflow for the HPV Vaccination Analytics case study.
// Visual identity: warm dark purple-navy gradient + 45° diagonal stripe pattern
// (distinct from dot grid / scan-line / cross-hatch used in existing diagrams).
// SMOTE step is visually flagged with a caution ring and "!" indicator.

const TRACK_Y = 88
const NODE_W  = 80
const NODE_H  = 38
const NODE_RX = 7

const STAGES = [
  {
    label: "SURVEY",
    sub:   ["NHANES L", "2021-2023"],
    color: "#F1D7E4",
    cx:    50,
    warn:  false,
  },
  {
    label: "EXTRACT",
    sub:   ["IMQ060 · HIQ011", "IND310 · DMDEDUC2"],
    color: "#D9D1FF",
    cx:    173,
    warn:  false,
  },
  {
    label: "MERGE",
    sub:   ["Left join on SEQN", "Complete-case filter"],
    color: "#D9D1FF",
    cx:    296,
    warn:  false,
  },
  {
    label: "RECODE",
    sub:   ["Binary 1 / 2", "All 4 variables"],
    color: "#C9F2EE",
    cx:    419,
    warn:  false,
  },
  {
    label: "SMOTE",
    sub:   ["K=5 · dup_size=2", "Before split"],
    color: "#C7FF35",
    cx:    542,
    warn:  true,
  },
  {
    label: "TRAIN",
    sub:   ["XGBoost", "Logistic Regression"],
    color: "#C9F2EE",
    cx:    665,
    warn:  false,
  },
  {
    label: "EVALUATE",
    sub:   ["Confusion matrix", "F1 · Recall"],
    color: "#F1D7E4",
    cx:    788,
    warn:  false,
  },
] as const

interface VaccinationWorkflowDiagramProps {
  className?: string
}

export function VaccinationWorkflowDiagram({ className }: VaccinationWorkflowDiagramProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <svg
        viewBox="0 0 840 172"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="min-w-[680px] w-full"
        role="img"
      >
        <defs>
          <linearGradient id="vax-wf-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0F0618" />
            <stop offset="100%" stopColor="#070410" />
          </linearGradient>
          {/* 45° diagonal stripe — distinct from dot / scan-line / cross-hatch */}
          <pattern id="vax-diag" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <line x1="0" y1="16" x2="16" y2="0" stroke="#F1D7E4" strokeWidth="0.4" strokeOpacity="0.05" />
          </pattern>
          <marker id="vax-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0.5 L5,2.5 L0,4.5 Z" fill="#C9F2EE" fillOpacity="0.45" />
          </marker>
        </defs>

        <rect width="840" height="172" rx="16" fill="url(#vax-wf-bg)" />
        <rect width="840" height="172" rx="16" fill="url(#vax-diag)" />

        {/* Header */}
        <text x="16" y="20" fontSize="7.5" fill="#F1D7E4" fillOpacity="0.52" fontFamily="monospace" fontWeight="500" letterSpacing="2">
          HPV VACCINATION ANALYTICS WORKFLOW
        </text>
        <text x="16" y="30" fontSize="6" fill="#F1D7E4" fillOpacity="0.28" fontFamily="monospace">
          Survey · Extract · Merge · Recode · SMOTE · Train · Evaluate
        </text>
        <line x1="16" y1="36" x2="824" y2="36" stroke="#F1D7E4" strokeWidth="0.5" strokeOpacity="0.08" />

        {/* Connector arrows */}
        {STAGES.slice(0, -1).map((stage, i) => (
          <line
            key={`conn-${i}`}
            x1={stage.cx + NODE_W / 2}
            y1={TRACK_Y}
            x2={STAGES[i + 1].cx - NODE_W / 2 - 1}
            y2={TRACK_Y}
            stroke={stage.color}
            strokeWidth="0.9"
            strokeOpacity="0.25"
            markerEnd="url(#vax-arrow)"
          />
        ))}

        {/* Stage nodes + labels */}
        {STAGES.map((stage, i) => {
          const labelAbove = i % 2 === 0
          const nodeX      = stage.cx - NODE_W / 2
          const nodeY      = TRACK_Y - NODE_H / 2
          const isLast     = i === STAGES.length - 1

          return (
            <g key={stage.label}>
              {/* Caution glow ring for SMOTE */}
              {stage.warn && (
                <rect
                  x={nodeX - 4} y={nodeY - 4}
                  width={NODE_W + 8} height={NODE_H + 8}
                  rx={NODE_RX + 2}
                  fill={stage.color} fillOpacity="0.05"
                  stroke={stage.color} strokeWidth="0.7" strokeOpacity="0.35"
                />
              )}

              {/* Node rectangle */}
              <rect
                x={nodeX} y={nodeY}
                width={NODE_W} height={NODE_H}
                rx={NODE_RX}
                fill={stage.color}
                fillOpacity={isLast ? 0.13 : stage.warn ? 0.10 : 0.07}
                stroke={stage.color}
                strokeWidth="0.8"
                strokeOpacity={isLast ? 0.70 : stage.warn ? 0.60 : 0.35}
              />

              {/* Step number */}
              <text
                x={stage.cx} y={TRACK_Y - 4}
                fontSize="7" fill={stage.color} fillOpacity="0.55"
                fontFamily="monospace" textAnchor="middle"
              >
                {String(i + 1).padStart(2, "0")}
              </text>

              {/* Stage label */}
              <text
                x={stage.cx} y={TRACK_Y + 8}
                fontSize="8" fill={stage.color}
                fillOpacity={isLast ? 0.95 : 0.82}
                fontFamily="monospace" fontWeight="bold" textAnchor="middle"
              >
                {stage.label}
              </text>

              {/* Sub-labels — alternating above / below */}
              {stage.sub.map((line, li) => {
                const baseY = labelAbove
                  ? nodeY - 8 - (stage.sub.length - 1 - li) * 8
                  : nodeY + NODE_H + 10 + li * 8
                return (
                  <text
                    key={li}
                    x={stage.cx}
                    y={baseY}
                    fontSize="6"
                    fill={stage.color}
                    fillOpacity={stage.warn ? 0.65 : 0.45}
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {line}
                  </text>
                )
              })}

              {/* Caution indicator for SMOTE — small "!" circle above node */}
              {stage.warn && (
                <>
                  <circle
                    cx={stage.cx + 32} cy={nodeY - 10}
                    r={6}
                    fill={stage.color} fillOpacity="0.12"
                    stroke={stage.color} strokeWidth="0.6" strokeOpacity="0.60"
                  />
                  <text
                    x={stage.cx + 32} y={nodeY - 7}
                    fontSize="7.5" fill={stage.color} fillOpacity="0.88"
                    fontFamily="monospace" fontWeight="bold" textAnchor="middle"
                  >
                    !
                  </text>
                </>
              )}
            </g>
          )
        })}

        {/* Footer */}
        <text x="16" y="162" fontSize="6" fill="#F1D7E4" fillOpacity="0.28" fontFamily="monospace">
          R · NHANESA · TIDYVERSE · CARET · XGBOOST · SMOTEFAMILY · MLMETRICS · GGPLOT2
        </text>
        <text x="560" y="162" fontSize="6" fill="#C7FF35" fillOpacity="0.42" fontFamily="monospace">
          BMIN503/EPID600 · COURSE ANALYSIS
        </text>
      </svg>
    </div>
  )
}
