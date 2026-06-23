// Portfolio-native SVG output components for the Healthcare AI Strategy case study.
// All visuals are illustrative frameworks — no client-specific data or projections.

/* ─── Care Pathway Economics Framework ──────────────────────────────────────── */
export function StrategyCarePathwaySVG() {
  const VB_W = 800
  const VB_H = 420

  // Pathway bars (illustrative proportions only, no actual values)
  const pathways = [
    { label: "Emergency Department", segments: [{ w: 380, color: "#F1D7E4", label: "Acute visit cost" }, { w: 120, color: "#D9D1FF", label: "Follow-up" }, { w: 60, color: "#7FE7F2", label: "Coordination" }] },
    { label: "Ambulatory Care",       segments: [{ w: 160, color: "#F1D7E4", label: "Clinic visit cost" }, { w: 90,  color: "#D9D1FF", label: "Follow-up" }, { w: 80, color: "#7FE7F2", label: "Coordination" }] },
    { label: "AI-Supported Care",     segments: [{ w: 100, color: "#F1D7E4", label: "Clinic visit cost" }, { w: 60,  color: "#D9D1FF", label: "Follow-up" }, { w: 200, color: "#C7FF35", label: "Platform + coordination" }] },
  ]

  const BAR_X    = 200
  const BAR_H    = 36
  const ROW_GAP  = 68
  const ROWS_Y   = 100

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full"
    >
      <defs>
        <linearGradient id="strat-cp-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D1520" />
          <stop offset="100%" stopColor="#070C14" />
        </linearGradient>
        <pattern id="strat-cp-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.5" fill="#C9F2EE" fillOpacity="0.04" />
        </pattern>
        <marker id="strat-cp-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0.5 L6,3 L0,5.5 Z" fill="#C9F2EE" fillOpacity="0.45" />
        </marker>
      </defs>

      <rect width={VB_W} height={VB_H} rx="16" fill="url(#strat-cp-bg)" />
      <rect width={VB_W} height={VB_H} rx="16" fill="url(#strat-cp-dots)" />

      {/* Header — title omitted; shown in card banner above */}
      <text x="20" y="24" fontSize="7" fill="#C9F2EE" fillOpacity="0.45"
        fontFamily="monospace">
        Illustrative relative cost structure · Specific values confidential
      </text>
      <line x1="20" y1="34" x2="780" y2="34" stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.12" />

      {/* Axis */}
      <line x1={BAR_X} y1="60" x2={BAR_X} y2="340"
        stroke="#C9F2EE" strokeWidth="0.6" strokeOpacity="0.18" />
      <text x={BAR_X} y="56" fontSize="7" fill="#C9F2EE" fillOpacity="0.58"
        fontFamily="monospace" textAnchor="middle">LOW</text>
      <text x={BAR_X + 560} y="56" fontSize="7" fill="#F1D7E4" fillOpacity="0.68"
        fontFamily="monospace" textAnchor="end">HIGHER COST</text>

      {pathways.map(({ label, segments }, ri) => {
        const rowY = ROWS_Y + ri * ROW_GAP
        let x = BAR_X
        return (
          <g key={label}>
            {/* Row label */}
            <text x={BAR_X - 10} y={rowY + BAR_H / 2 + 4}
              fontSize="8.5" fill="#C9F2EE" fillOpacity={ri === 2 ? 0.95 : 0.82}
              fontFamily="monospace" textAnchor="end" fontWeight={ri === 2 ? "600" : "400"}>
              {label}
            </text>

            {/* Stacked bar segments */}
            {segments.map(({ w, color, label: segLabel }, si) => {
              const segX = x
              x += w
              const isLast = si === segments.length - 1
              return (
                <g key={segLabel}>
                  <rect x={segX} y={rowY} width={w} height={BAR_H}
                    rx={si === 0 ? 4 : 0}
                    fill={color}
                    fillOpacity={ri === 2 && isLast ? 0.22 : 0.10}
                    stroke={color}
                    strokeWidth={ri === 2 && isLast ? 1.0 : 0.6}
                    strokeOpacity={ri === 2 && isLast ? 0.65 : 0.28}
                  />
                  {w >= 80 && (
                    <text x={segX + w / 2} y={rowY + BAR_H / 2 + 3}
                      fontSize="6.5" fill={color}
                      fillOpacity={ri === 2 && isLast ? 0.92 : 0.78}
                      fontFamily="monospace" textAnchor="middle">
                      {segLabel}
                    </text>
                  )}
                </g>
              )
            })}

            {/* AI label callout */}
            {ri === 2 && (
              <>
                <text x={BAR_X + 365} y={rowY - 8}
                  fontSize="8" fill="#C7FF35" fillOpacity="0.80"
                  fontFamily="monospace">
                  Potential shift in care mix
                </text>
                <line x1={BAR_X + 355} y1={rowY - 2} x2={BAR_X + 355} y2={rowY}
                  stroke="#C7FF35" strokeWidth="0.7" strokeOpacity="0.55" />
              </>
            )}
          </g>
        )
      })}

      {/* Legend */}
      <text x="20" y="365" fontSize="7" fill="#C9F2EE" fillOpacity="0.58"
        fontFamily="monospace">COST COMPONENTS:</text>
      {[
        { color: "#F1D7E4", label: "Acute / visit cost" },
        { color: "#D9D1FF", label: "Follow-up and coordination" },
        { color: "#7FE7F2", label: "Traditional coordination" },
        { color: "#C7FF35", label: "AI platform and coordination" },
      ].map(({ color, label }, i) => (
        <g key={label}>
          <rect x={100 + i * 165} y="355" width="12" height="12" rx="2"
            fill={color} fillOpacity="0.25"
            stroke={color} strokeWidth="0.6" strokeOpacity="0.50" />
          <text x={116 + i * 165} y="364"
            fontSize="7" fill="#C9F2EE" fillOpacity="0.70" fontFamily="monospace">
            {label}
          </text>
        </g>
      ))}

      {/* Footer */}
      <line x1="20" y1="382" x2="780" y2="382" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.10" />
      <text x="400" y="396"
        fontSize="7" fill="#D9D1FF" fillOpacity="0.58"
        fontFamily="monospace" textAnchor="middle">
        Illustrative framework only · No proprietary data · Penn Graduate Consulting Club engagement
      </text>
    </svg>
  )
}

/* ─── Payer and Customer Segment Landscape ───────────────────────────────────── */
export function StrategyPayerLandscapeSVG() {
  const VB_W = 800
  const VB_H = 420

  const segments = [
    { label: "Payer — Medicaid",         x: 160, y: 110, rx: 52, ry: 28, color: "#D9D1FF", value: "HIGH", valueNote: "volume alignment",  tier: 1 },
    { label: "Payer — Commercial",       x: 380, y: 100, rx: 58, ry: 30, color: "#D9D1FF", value: "HIGH", valueNote: "margin potential",   tier: 1 },
    { label: "Employer Health Plan",     x: 590, y: 120, rx: 48, ry: 26, color: "#C9F2EE", value: "MED",  valueNote: "adoption pathway",   tier: 2 },
    { label: "Integrated Health System", x: 250, y: 220, rx: 62, ry: 32, color: "#C7FF35", value: "HIGH", valueNote: "care coordination",  tier: 1 },
    { label: "OB/GYN Practice Network",  x: 520, y: 215, rx: 54, ry: 28, color: "#C9F2EE", value: "MED",  valueNote: "access expansion",   tier: 2 },
    { label: "Digital Health Platform",  x: 370, y: 305, rx: 44, ry: 24, color: "#87A878", value: "MED",  valueNote: "distribution",       tier: 3 },
    { label: "ACO",                      x: 650, y: 290, rx: 40, ry: 22, color: "#87A878", value: "LOW",  valueNote: "longer horizon",     tier: 3 },
  ]

  const tierColors: Record<number, string> = { 1: "#C7FF35", 2: "#C9F2EE", 3: "#87A878" }

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full"
    >
      <defs>
        <linearGradient id="strat-pl-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D1A2A" />
          <stop offset="100%" stopColor="#070D18" />
        </linearGradient>
        <pattern id="strat-pl-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="60" stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.05" />
          <line x1="0" y1="0" x2="60" y2="0" stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.05" />
        </pattern>
      </defs>

      <rect width={VB_W} height={VB_H} rx="16" fill="url(#strat-pl-bg)" />
      <rect width={VB_W} height={VB_H} rx="16" fill="url(#strat-pl-grid)" />

      {/* Header — title omitted; shown in card banner above */}
      <text x="20" y="24" fontSize="7" fill="#C9F2EE" fillOpacity="0.45"
        fontFamily="monospace">
        Segment prioritization by value capture potential and adoption feasibility · Illustrative
      </text>
      <line x1="20" y1="34" x2="780" y2="34" stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.12" />

      {/* Axis labels */}
      <text x="400" y="56" fontSize="7.5" fill="#C9F2EE" fillOpacity="0.45"
        fontFamily="monospace" textAnchor="middle">VALUE CAPTURE POTENTIAL</text>
      <text x="20" y="200" fontSize="7" fill="#C9F2EE" fillOpacity="0.38"
        fontFamily="monospace"
        transform="rotate(-90, 20, 200)">ADOPTION FEASIBILITY</text>

      {/* Segment bubbles */}
      {segments.map(({ label, x, y, rx, ry, color, value, valueNote, tier }) => (
        <g key={label}>
          <ellipse cx={x} cy={y} rx={rx} ry={ry}
            fill={color}
            fillOpacity={tier === 1 ? 0.12 : tier === 2 ? 0.08 : 0.10}
            stroke={color}
            strokeWidth={tier === 1 ? 1.0 : 0.7}
            strokeOpacity={tier === 1 ? 0.55 : tier === 2 ? 0.38 : 0.45}
          />
          <text x={x} y={y - 3}
            fontSize={tier === 1 ? 7.5 : 7} fill={color}
            fillOpacity={tier === 1 ? 0.92 : tier === 2 ? 0.82 : 0.88}
            fontFamily="monospace" textAnchor="middle" fontWeight={tier === 1 ? "600" : "400"}>
            {label}
          </text>
          <text x={x} y={y + 10}
            fontSize="6.5" fill={tierColors[tier]}
            fillOpacity="0.80"
            fontFamily="monospace" textAnchor="middle">
            {value} · {valueNote}
          </text>
        </g>
      ))}

      {/* Priority tier legend */}
      <rect x="20" y="355" width="760" height="48" rx="8"
        fill="#C9F2EE" fillOpacity="0.02"
        stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.10" />
      <text x="34" y="368" fontSize="7" fill="#C9F2EE" fillOpacity="0.55"
        fontFamily="monospace">SEGMENT PRIORITY:</text>
      {[
        { tier: 1, color: "#C7FF35", label: "Tier 1 — Highest near-term priority" },
        { tier: 2, color: "#C9F2EE", label: "Tier 2 — Medium-term pathway" },
        { tier: 3, color: "#87A878", label: "Tier 3 — Longer-horizon opportunity" },
      ].map(({ tier, color, label }, i) => (
        <g key={tier}>
          <circle cx={170 + i * 200} cy="365" r="5"
            fill={color} fillOpacity="0.25"
            stroke={color} strokeWidth="0.8" strokeOpacity="0.60" />
          <text x={180 + i * 200} y="369"
            fontSize="7" fill="#C9F2EE" fillOpacity="0.65" fontFamily="monospace">
            {label}
          </text>
        </g>
      ))}
      <text x="400" y="393"
        fontSize="6.5" fill="#D9D1FF" fillOpacity="0.50"
        fontFamily="monospace" textAnchor="middle">
        Illustrative framework · Segment prioritization informed by engagement analysis · Client-specific findings confidential
      </text>
    </svg>
  )
}

/* ─── Scenario and Sensitivity Framework ─────────────────────────────────────── */
export function StrategySensitivityMatrixSVG() {
  const VB_W = 800
  const VB_H = 420

  const variables = [
    { label: "Unit cost per ED visit",         low: "Low",   base: "Mid",   high: "High",   impact: 0.90, color: "#F1D7E4" },
    { label: "Platform adoption rate",          low: "5%",    base: "15%",   high: "30%",    impact: 0.85, color: "#D9D1FF" },
    { label: "Care diversion rate",             low: "Low",   base: "Mid",   high: "High",   impact: 0.80, color: "#C9F2EE" },
    { label: "Utilization per enrolled user",   low: "Low",   base: "Mid",   high: "High",   impact: 0.65, color: "#C9F2EE" },
    { label: "Follow-up visit reduction",       low: "None",  base: "Some",  high: "High",   impact: 0.55, color: "#87A878" },
    { label: "Time to payer contracting",       low: "Fast",  base: "Mid",   high: "Slow",   impact: 0.45, color: "#87A878" },
  ]

  // Redesigned column layout: impact indicator moved left, scenario columns spread right
  const COL_IMPACT_X  = 220  // impact bar start x
  const COL_IMPACT_W  = 60   // max bar width
  const COL_SCENARIO_X = [400, 540, 680]
  const COL_LABELS     = ["Bear Case", "Base Case", "Bull Case"]
  const COL_COLORS     = ["#F1D7E4", "#C9F2EE", "#C7FF35"]
  const ROW_H          = 38
  const ROWS_Y         = 110

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full"
    >
      <defs>
        <linearGradient id="strat-sm-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080F1C" />
          <stop offset="100%" stopColor="#050A12" />
        </linearGradient>
        <pattern id="strat-sm-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.5" fill="#C9F2EE" fillOpacity="0.03" />
        </pattern>
      </defs>

      <rect width={VB_W} height={VB_H} rx="16" fill="url(#strat-sm-bg)" />
      <rect width={VB_W} height={VB_H} rx="16" fill="url(#strat-sm-dots)" />

      {/* Header — title omitted; shown in card banner above */}
      <text x="20" y="24" fontSize="7" fill="#C9F2EE" fillOpacity="0.45"
        fontFamily="monospace">
        Key variables and scenario values · Impact ranking by sensitivity to outcome · Values illustrative
      </text>
      <line x1="20" y1="34" x2="780" y2="34" stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.12" />

      {/* Column headers */}
      <text x="30" y="78" fontSize="7.5" fill="#C9F2EE" fillOpacity="0.52"
        fontFamily="monospace">VARIABLE</text>
      <text x={COL_IMPACT_X + COL_IMPACT_W / 2} y="78" fontSize="7.5" fill="#C9F2EE" fillOpacity="0.52"
        fontFamily="monospace" textAnchor="middle">RELATIVE IMPACT</text>
      {COL_LABELS.map((label, i) => (
        <text key={label} x={COL_SCENARIO_X[i]} y="78"
          fontSize="7.5" fill={COL_COLORS[i]}
          fillOpacity={i === 1 ? 0.85 : 0.68}
          fontFamily="monospace" textAnchor="middle" fontWeight={i === 1 ? "600" : "400"}>
          {label}
        </text>
      ))}

      {/* Header divider */}
      <line x1="20" y1="84" x2="780" y2="84" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.15" />

      {variables.map(({ label, low, base, high, impact, color }, ri) => {
        const rowY = ROWS_Y + ri * ROW_H
        const isAlt = ri % 2 === 1
        const scenarioValues = [low, base, high]
        return (
          <g key={label}>
            {/* Row bg */}
            {isAlt && (
              <rect x="20" y={rowY - 2} width="760" height={ROW_H - 4} rx="4"
                fill="#C9F2EE" fillOpacity="0.02" />
            )}

            {/* Variable label */}
            <text x="30" y={rowY + ROW_H / 2 + 3}
              fontSize="8" fill={color} fillOpacity="0.85"
              fontFamily="monospace">
              {label}
            </text>

            {/* Impact bar */}
            <rect x={COL_IMPACT_X} y={rowY + ROW_H / 2 - 5} width={Math.round(impact * COL_IMPACT_W)} height="10"
              rx="2" fill={color} fillOpacity="0.22"
              stroke={color} strokeWidth="0.5" strokeOpacity="0.50" />

            {/* Scenario value chips */}
            {scenarioValues.map((val, si) => {
              const chipColor = COL_COLORS[si]
              return (
                <g key={si}>
                  <rect
                    x={COL_SCENARIO_X[si] - 44} y={rowY + ROW_H / 2 - 10}
                    width="88" height="20" rx="5"
                    fill={chipColor}
                    fillOpacity={si === 1 ? 0.10 : 0.05}
                    stroke={chipColor}
                    strokeWidth={si === 1 ? 0.7 : 0.4}
                    strokeOpacity={si === 1 ? 0.48 : 0.25}
                  />
                  <text x={COL_SCENARIO_X[si]} y={rowY + ROW_H / 2 + 4}
                    fontSize="7.5" fill={chipColor}
                    fillOpacity={si === 1 ? 0.90 : 0.68}
                    fontFamily="monospace" textAnchor="middle"
                    fontWeight={si === 1 ? "600" : "400"}>
                    {val}
                  </text>
                </g>
              )
            })}

            {/* Row divider */}
            <line x1="20" y1={rowY + ROW_H - 2} x2="780" y2={rowY + ROW_H - 2}
              stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.07" />
          </g>
        )
      })}

      {/* Footer */}
      <line x1="20" y1="380" x2="780" y2="380" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.10" />
      <text x="400" y="396"
        fontSize="7" fill="#D9D1FF" fillOpacity="0.55"
        fontFamily="monospace" textAnchor="middle">
        Sensitivity analysis identifies highest-impact variables · Scenario values illustrative · Specific projections confidential
      </text>
    </svg>
  )
}
