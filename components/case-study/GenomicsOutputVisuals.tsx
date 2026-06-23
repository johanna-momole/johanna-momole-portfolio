// Polished portfolio-native SVG output visuals for the Genetic Risk Map case study.
// All three components use an 800×420 viewBox to render clearly in the stacked layout.

// ── 1. Relative Score Distribution ──────────────────────────────────────────────

const DIST_BINS = [
  { label: "−6", count: 1, tier: "lower"  },
  { label: "−4", count: 2, tier: "lower"  },
  { label: "−2", count: 3, tier: "lower"  },
  { label: "0",  count: 3, tier: "lower"  },
  { label: "2",  count: 3, tier: "lower"  },
  { label: "4",  count: 5, tier: "middle" },
  { label: "6",  count: 7, tier: "middle" },
  { label: "8",  count: 8, tier: "middle" },
  { label: "10", count: 5, tier: "middle" },
  { label: "12", count: 5, tier: "upper"  },
  { label: "14", count: 5, tier: "upper"  },
  { label: "16", count: 3, tier: "upper"  },
] as const

// 12 lower + 25 middle + 13 upper = 50 genes

const TIER_COLOR: Record<string, string> = {
  lower:  "#87A878",
  middle: "#7FE7F2",
  upper:  "#C7FF35",
}

export function GenomicsScoreDistributionSVG() {
  const VB_W = 800, VB_H = 420
  const X_LEFT = 80, X_RIGHT = 740
  const Y_BOTTOM = 320, Y_TOP = 60
  const MAX_COUNT = 8
  const N_BINS = DIST_BINS.length
  const BIN_SLOT = (X_RIGHT - X_LEFT) / N_BINS   // 55
  const BAR_W = 42
  const MAX_BAR_H = Y_BOTTOM - Y_TOP - 10          // 250

  const P25_X = X_LEFT + 5 * BIN_SLOT              // after bin[4], between lower and middle
  const P75_X = X_LEFT + 9 * BIN_SLOT              // after bin[8], between middle and upper

  const gridCounts = [0, 2, 4, 6, 8]

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full"
      role="img"
    >
      <defs>
        <radialGradient id="gd-bg" cx="40%" cy="0%" r="90%">
          <stop offset="0%" stopColor="#0A1A12" />
          <stop offset="100%" stopColor="#040A0E" />
        </radialGradient>
        <pattern id="gd-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.6" fill="#87A878" fillOpacity="0.04" />
        </pattern>
      </defs>

      <rect width={VB_W} height={VB_H} rx="18" fill="url(#gd-bg)" />
      <rect width={VB_W} height={VB_H} rx="18" fill="url(#gd-dots)" />

      {/* Header */}
      <text x="18" y="24" fontSize="9" fill="#87A878" fillOpacity="0.55"
        fontFamily="monospace" fontWeight="500" letterSpacing="2">
        RELATIVE SCORE DISTRIBUTION
      </text>
      <text x="18" y="38" fontSize="7" fill="#87A878" fillOpacity="0.35"
        fontFamily="monospace">
        50-gene synthetic example dataset · raw_score = BETA × −log10(P)
      </text>
      <line x1="18" y1="46" x2={VB_W - 18} y2="46"
        stroke="#87A878" strokeWidth="0.5" strokeOpacity="0.12" />

      {/* Gridlines and Y-axis labels */}
      {gridCounts.map((c) => {
        const gy = Y_BOTTOM - (c / MAX_COUNT) * MAX_BAR_H
        return (
          <g key={c}>
            <line x1={X_LEFT} y1={gy} x2={X_RIGHT} y2={gy}
              stroke="#7FE7F2" strokeWidth={c === 0 ? 0.8 : 0.4}
              strokeOpacity={c === 0 ? 0.22 : 0.08} />
            <text x={X_LEFT - 8} y={gy + 3.5} fontSize="8" fill="#7FE7F2" fillOpacity="0.38"
              fontFamily="monospace" textAnchor="end">{c}</text>
          </g>
        )
      })}

      {/* Y-axis label */}
      <text x="16" y="200" fontSize="7.5" fill="#7FE7F2" fillOpacity="0.38"
        fontFamily="monospace" textAnchor="middle"
        transform="rotate(-90 16 200)">
        Gene count
      </text>

      {/* Bars */}
      {DIST_BINS.map((bin, i) => {
        const barH = (bin.count / MAX_COUNT) * MAX_BAR_H
        const barX = X_LEFT + i * BIN_SLOT + (BIN_SLOT - BAR_W) / 2
        const barY = Y_BOTTOM - barH
        const col = TIER_COLOR[bin.tier]
        const isUpper = bin.tier === "upper"
        return (
          <g key={bin.label}>
            <rect
              x={barX} y={barY} width={BAR_W} height={barH}
              rx="4"
              fill={col} fillOpacity={isUpper ? 0.32 : 0.20}
              stroke={col} strokeWidth="0.8" strokeOpacity={isUpper ? 0.70 : 0.40}
            />
            {/* Count label above bar */}
            <text x={barX + BAR_W / 2} y={barY - 4}
              fontSize="7.5" fill={col} fillOpacity={0.72}
              fontFamily="monospace" textAnchor="middle">{bin.count}</text>
            {/* X-axis label */}
            <text x={barX + BAR_W / 2} y={Y_BOTTOM + 14}
              fontSize="7.5" fill="#7FE7F2" fillOpacity="0.38"
              fontFamily="monospace" textAnchor="middle">{bin.label}</text>
          </g>
        )
      })}

      {/* P25 threshold line */}
      <line x1={P25_X} y1={Y_TOP - 10} x2={P25_X} y2={Y_BOTTOM}
        stroke="#87A878" strokeWidth="1.2" strokeDasharray="5 3" strokeOpacity="0.55" />
      <text x={P25_X + 5} y={Y_TOP - 2} fontSize="7.5" fill="#87A878" fillOpacity="0.65"
        fontFamily="monospace">P25 threshold</text>

      {/* P75 threshold line */}
      <line x1={P75_X} y1={Y_TOP - 10} x2={P75_X} y2={Y_BOTTOM}
        stroke="#C7FF35" strokeWidth="1.2" strokeDasharray="5 3" strokeOpacity="0.55" />
      <text x={P75_X + 5} y={Y_TOP - 2} fontSize="7.5" fill="#C7FF35" fillOpacity="0.65"
        fontFamily="monospace">P75 threshold</text>

      {/* X-axis label */}
      <text x={(X_LEFT + X_RIGHT) / 2} y={Y_BOTTOM + 32}
        fontSize="8" fill="#7FE7F2" fillOpacity="0.40"
        fontFamily="monospace" textAnchor="middle">
        Gene-Level Association Score
      </text>

      {/* Legend — anchored to left of plot area, clear of both threshold lines */}
      {(["lower", "middle", "upper"] as const).map((tier, i) => {
        const lx = X_LEFT + i * 72
        const col = TIER_COLOR[tier]
        const label = tier === "lower" ? "Lower" : tier === "middle" ? "Middle" : "Upper"
        return (
          <g key={tier}>
            <rect x={lx} y={Y_TOP + 8} width="10" height="10" rx="2"
              fill={col} fillOpacity="0.30" stroke={col} strokeWidth="0.6" strokeOpacity="0.60" />
            <text x={lx + 14} y={Y_TOP + 17} fontSize="8" fill={col} fillOpacity="0.72"
              fontFamily="monospace">{label}</text>
          </g>
        )
      })}

      {/* Footer */}
      <line x1="18" y1={VB_H - 30} x2={VB_W - 18} y2={VB_H - 30}
        stroke="#87A878" strokeWidth="0.4" strokeOpacity="0.10" />
      <text x="18" y={VB_H - 16} fontSize="7.5" fill="#87A878" fillOpacity="0.52"
        fontFamily="monospace">
        Illustrative output · 50-gene synthetic dataset · tiers are relative to the submitted gene set
      </text>
      <text x={VB_W - 18} y={VB_H - 16} fontSize="7.5" fill="#C7FF35" fillOpacity="0.60"
        fontFamily="monospace" textAnchor="end">
        RESEARCH AND EDUCATIONAL USE
      </text>
    </svg>
  )
}

// ── 2. Ranked Gene Score Map ─────────────────────────────────────────────────────

const SCORE_MAP_LABELS: Record<number, string> = {
  46: "SNCA",
  47: "INS",
  48: "TP53",
  49: "TNF",
  50: "APOE",
}

export function GenomicsScoreMapSVG() {
  const VB_W = 800, VB_H = 420
  const X_LEFT = 80, X_RIGHT = 740
  const Y_BOTTOM = 330, Y_TOP = 55
  const SCORE_DISPLAY_MIN = -8, SCORE_DISPLAY_MAX = 20
  const SCORE_RANGE = SCORE_DISPLAY_MAX - SCORE_DISPLAY_MIN
  const PLOT_H = Y_BOTTOM - Y_TOP                  // 275

  const N = 50

  const genes = Array.from({ length: N }, (_, i) => {
    const rank = i + 1
    const t = (rank - 1) / (N - 1)
    // S-curve: low scores at rank 1, high at rank 50
    const baseScore = -6 + 24 * Math.pow(t, 1.2)
    // Deterministic perturbation using modular arithmetic
    const perturb = (rank % 7 - 3) * 0.38 + (rank % 5 - 2) * 0.20
    const score = Math.max(SCORE_DISPLAY_MIN + 0.5, Math.min(SCORE_DISPLAY_MAX - 0.5, baseScore + perturb))
    const cx = X_LEFT + t * (X_RIGHT - X_LEFT)
    const cy = Y_BOTTOM - ((score - SCORE_DISPLAY_MIN) / SCORE_RANGE) * PLOT_H
    // Radius from NSNPS proxy (deterministic)
    const nsnps = 20 + (rank * 7 % 11) * 4
    const r = 3.5 + Math.sqrt(nsnps) / 3.2
    const tier = rank <= 12 ? "lower" : rank >= 38 ? "upper" : "middle"
    const color = tier === "lower" ? "#87A878" : tier === "upper" ? "#C7FF35" : "#7FE7F2"
    const fillOp = tier === "upper" ? 0.55 : tier === "middle" ? 0.30 : 0.25
    const strokeOp = tier === "upper" ? 0.80 : tier === "middle" ? 0.45 : 0.38
    const label = SCORE_MAP_LABELS[rank]
    return { rank, score, cx, cy, r, color, fillOp, strokeOp, tier, label }
  })

  // P25 (rank 12-13 boundary) and P75 (rank 37-38 boundary) y positions
  const p25Score = -6 + 24 * Math.pow(11 / (N - 1), 1.2)
  const p75Score = -6 + 24 * Math.pow(37 / (N - 1), 1.2)
  const P25_Y = Y_BOTTOM - ((p25Score - SCORE_DISPLAY_MIN) / SCORE_RANGE) * PLOT_H
  const P75_Y = Y_BOTTOM - ((p75Score - SCORE_DISPLAY_MIN) / SCORE_RANGE) * PLOT_H

  // Y-axis score tick positions
  const yTicks = [-4, 0, 5, 10, 15] as const

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full"
      role="img"
    >
      <defs>
        <radialGradient id="gm-bg" cx="60%" cy="0%" r="90%">
          <stop offset="0%" stopColor="#091520" />
          <stop offset="100%" stopColor="#040A0E" />
        </radialGradient>
        <pattern id="gm-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.6" fill="#7FE7F2" fillOpacity="0.03" />
        </pattern>
      </defs>

      <rect width={VB_W} height={VB_H} rx="18" fill="url(#gm-bg)" />
      <rect width={VB_W} height={VB_H} rx="18" fill="url(#gm-dots)" />

      {/* Header */}
      <text x="18" y="24" fontSize="9" fill="#7FE7F2" fillOpacity="0.55"
        fontFamily="monospace" fontWeight="500" letterSpacing="2">
        RANKED GENE SCORE MAP
      </text>
      <text x="18" y="38" fontSize="7" fill="#7FE7F2" fillOpacity="0.35"
        fontFamily="monospace">
        Each gene plotted by rank and score · bubble size reflects NSNPS in gene window · color indicates relative tier
      </text>
      <line x1="18" y1="46" x2={VB_W - 18} y2="46"
        stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.12" />

      {/* Y-axis gridlines and labels */}
      {yTicks.map((score) => {
        const gy = Y_BOTTOM - ((score - SCORE_DISPLAY_MIN) / SCORE_RANGE) * PLOT_H
        return (
          <g key={score}>
            <line x1={X_LEFT} y1={gy} x2={X_RIGHT} y2={gy}
              stroke="#7FE7F2" strokeWidth="0.35" strokeOpacity="0.08" />
            <text x={X_LEFT - 8} y={gy + 3} fontSize="8" fill="#7FE7F2" fillOpacity="0.35"
              fontFamily="monospace" textAnchor="end">{score}</text>
          </g>
        )
      })}

      {/* Baseline (score=0) */}
      <line x1={X_LEFT} y1={Y_BOTTOM - ((0 - SCORE_DISPLAY_MIN) / SCORE_RANGE) * PLOT_H}
        x2={X_RIGHT} y2={Y_BOTTOM - ((0 - SCORE_DISPLAY_MIN) / SCORE_RANGE) * PLOT_H}
        stroke="#7FE7F2" strokeWidth="0.6" strokeOpacity="0.18" strokeDasharray="3 3" />

      {/* P25 threshold */}
      <line x1={X_LEFT} y1={P25_Y} x2={X_RIGHT} y2={P25_Y}
        stroke="#87A878" strokeWidth="1" strokeDasharray="6 3" strokeOpacity="0.45" />
      <text x={X_RIGHT + 5} y={P25_Y + 4} fontSize="7.5" fill="#87A878" fillOpacity="0.62"
        fontFamily="monospace">P25</text>

      {/* P75 threshold */}
      <line x1={X_LEFT} y1={P75_Y} x2={X_RIGHT} y2={P75_Y}
        stroke="#C7FF35" strokeWidth="1" strokeDasharray="6 3" strokeOpacity="0.45" />
      <text x={X_RIGHT + 5} y={P75_Y + 4} fontSize="7.5" fill="#C7FF35" fillOpacity="0.62"
        fontFamily="monospace">P75</text>

      {/* Gene bubbles (render lower tier first so upper sits on top) */}
      {(["lower", "middle", "upper"] as const).map((tier) =>
        genes
          .filter((g) => g.tier === tier)
          .map((g) => (
            <circle
              key={g.rank}
              cx={g.cx} cy={g.cy} r={g.r}
              fill={g.color} fillOpacity={g.fillOp}
              stroke={g.color} strokeWidth="0.8" strokeOpacity={g.strokeOp}
            />
          ))
      )}

      {/* Labels for top genes */}
      {genes
        .filter((g) => g.label !== undefined)
        .map((g) => (
          <g key={`label-${g.rank}`}>
            <line x1={g.cx} y1={g.cy - g.r - 1} x2={g.cx} y2={g.cy - g.r - 12}
              stroke="#C7FF35" strokeWidth="0.6" strokeOpacity="0.40" />
            <text x={g.cx} y={g.cy - g.r - 15}
              fontSize="8" fill="#C7FF35" fillOpacity="0.80"
              fontFamily="monospace" fontWeight="500" textAnchor="middle">
              {g.label}
            </text>
          </g>
        ))
      }

      {/* X-axis baseline and rank labels */}
      <line x1={X_LEFT} y1={Y_BOTTOM} x2={X_RIGHT} y2={Y_BOTTOM}
        stroke="#7FE7F2" strokeWidth="0.8" strokeOpacity="0.22" />
      {[1, 10, 20, 30, 40, 50].map((rank) => {
        const tx = X_LEFT + ((rank - 1) / (N - 1)) * (X_RIGHT - X_LEFT)
        return (
          <text key={rank} x={tx} y={Y_BOTTOM + 14}
            fontSize="8" fill="#7FE7F2" fillOpacity="0.38"
            fontFamily="monospace" textAnchor="middle">{rank}</text>
        )
      })}

      {/* Axis labels */}
      <text x={(X_LEFT + X_RIGHT) / 2} y={Y_BOTTOM + 30}
        fontSize="8" fill="#7FE7F2" fillOpacity="0.40"
        fontFamily="monospace" textAnchor="middle">
        Gene Rank (by association score)
      </text>
      <text x="14" y="200" fontSize="7.5" fill="#7FE7F2" fillOpacity="0.38"
        fontFamily="monospace" textAnchor="middle"
        transform="rotate(-90 14 200)">
        Raw Score
      </text>

      {/* Legend */}
      {(["lower", "middle", "upper"] as const).map((tier, i) => {
        const lx = X_RIGHT - 190 + i * 66
        const col = tier === "lower" ? "#87A878" : tier === "upper" ? "#C7FF35" : "#7FE7F2"
        const label = tier === "lower" ? "Lower" : tier === "middle" ? "Middle" : "Upper"
        return (
          <g key={tier}>
            <circle cx={lx + 5} cy={Y_TOP + 11} r="5"
              fill={col} fillOpacity="0.30" stroke={col} strokeWidth="0.7" strokeOpacity="0.65" />
            <text x={lx + 14} y={Y_TOP + 15} fontSize="8" fill={col} fillOpacity="0.72"
              fontFamily="monospace">{label}</text>
          </g>
        )
      })}

      {/* Footer */}
      <line x1="18" y1={VB_H - 30} x2={VB_W - 18} y2={VB_H - 30}
        stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />
      <text x="18" y={VB_H - 16} fontSize="7.5" fill="#7FE7F2" fillOpacity="0.50"
        fontFamily="monospace">
        Illustrative output · bubble size proportional to NSNPS · tiers relative to submitted gene set
      </text>
      <text x={VB_W - 18} y={VB_H - 16} fontSize="7.5" fill="#C7FF35" fillOpacity="0.58"
        fontFamily="monospace" textAnchor="end">
        RESEARCH AND EDUCATIONAL USE
      </text>
    </svg>
  )
}

// ── 3. Scored Output Table Preview ──────────────────────────────────────────────

const TABLE_ROWS = [
  { gene: "APOE",  beta: "0.842",  p: "2.3e−7", raw: "17.24", norm: "2.84", pct: "98.0", tier: "Upper",  tc: "#C7FF35" },
  { gene: "TP53",  beta: "0.731",  p: "4.1e−7", raw: "15.86", norm: "2.61", pct: "96.0", tier: "Upper",  tc: "#C7FF35" },
  { gene: "TNF",   beta: "0.685",  p: "8.2e−7", raw: "14.53", norm: "2.38", pct: "94.0", tier: "Upper",  tc: "#C7FF35" },
  { gene: "SNCA",  beta: "0.614",  p: "3.6e−6", raw: "12.38", norm: "2.01", pct: "90.0", tier: "Upper",  tc: "#C7FF35" },
  { gene: "VEGFA", beta: "0.438",  p: "1.2e−4", raw: "8.07",  norm: "1.28", pct: "65.0", tier: "Middle", tc: "#7FE7F2" },
  { gene: "IL6",   beta: "0.392",  p: "3.8e−4", raw: "7.14",  norm: "1.12", pct: "58.0", tier: "Middle", tc: "#7FE7F2" },
  { gene: "EGFR",  beta: "0.218",  p: "4.2e−2", raw: "2.44",  norm: "0.32", pct: "34.0", tier: "Middle", tc: "#7FE7F2" },
  { gene: "MTHFR", beta: "−0.124", p: "2.8e−1", raw: "−0.69", norm: "−0.48",pct: "8.0",  tier: "Lower",  tc: "#87A878" },
] as const

// Column definitions: label, x position, width — spread across full 800px viewbox
const COLS = [
  { label: "GENE",       x: 22,  w: 95  },
  { label: "BETA",       x: 117, w: 95  },
  { label: "P-VALUE",    x: 216, w: 110 },
  { label: "RAW_SCORE",  x: 334, w: 105 },
  { label: "NORM_SCORE", x: 446, w: 110 },
  { label: "PCT_RANK",   x: 564, w: 88  },
  { label: "TIER",       x: 658, w: 124 },
] as const

export function GenomicsScoredTableSVG() {
  const VB_W = 800, VB_H = 420
  const HEADER_H = 22
  const COL_HDR_Y = 50
  const ROW_H = 36
  const ROWS_START_Y = COL_HDR_Y + 18
  const ROWS_END_Y = ROWS_START_Y + TABLE_ROWS.length * ROW_H

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full"
      role="img"
    >
      <defs>
        <linearGradient id="gt-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#090F1C" />
          <stop offset="100%" stopColor="#050810" />
        </linearGradient>
      </defs>

      <rect width={VB_W} height={VB_H} rx="18" fill="url(#gt-bg)" />

      {/* Top window bar */}
      <rect width={VB_W} height={HEADER_H} rx="18" fill="#0C1628" />
      <rect x="0" y="10" width={VB_W} height={HEADER_H - 10} fill="#0C1628" />
      <text x="18" y="15" fontSize="8.5" fill="#7FE7F2" fillOpacity="0.48"
        fontFamily="monospace" fontWeight="500" letterSpacing="2">
        SCORED OUTPUT TABLE · gene_prs_results.csv
      </text>
      {/* Window dots */}
      <circle cx={VB_W - 34} cy="11" r="3.5" fill="#7FE7F2" fillOpacity="0.12" />
      <circle cx={VB_W - 22} cy="11" r="3.5" fill="#7FE7F2" fillOpacity="0.08" />
      <circle cx={VB_W - 10} cy="11" r="3.5" fill="#7FE7F2" fillOpacity="0.05" />

      <line x1="0" y1={HEADER_H} x2={VB_W} y2={HEADER_H}
        stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.15" />

      {/* Column headers */}
      {COLS.map((col) => (
        <text key={col.label} x={col.x} y={COL_HDR_Y}
          fontSize="8" fill="#7FE7F2" fillOpacity="0.38"
          fontFamily="monospace" fontWeight="500" letterSpacing="0.5">
          {col.label}
        </text>
      ))}
      <line x1="18" y1={COL_HDR_Y + 6} x2={VB_W - 18} y2={COL_HDR_Y + 6}
        stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.14" />

      {/* Data rows */}
      {TABLE_ROWS.map((row, ri) => {
        const ry = ROWS_START_Y + ri * ROW_H
        const isAlt = ri % 2 === 1
        return (
          <g key={row.gene}>
            {/* Row background */}
            {isAlt && (
              <rect x="18" y={ry - 3} width={VB_W - 36} height={ROW_H - 2} rx="4"
                fill="#7FE7F2" fillOpacity="0.025" />
            )}
            {/* GENE */}
            <text x={COLS[0].x} y={ry + 18}
              fontSize="9" fill="#C7FF35" fillOpacity="0.85"
              fontFamily="monospace" fontWeight="600">{row.gene}</text>
            {/* BETA */}
            <text x={COLS[1].x} y={ry + 18}
              fontSize="8.5" fill="#7FE7F2" fillOpacity="0.70"
              fontFamily="monospace">{row.beta}</text>
            {/* P-VALUE */}
            <text x={COLS[2].x} y={ry + 18}
              fontSize="8.5" fill="#C6A0FF" fillOpacity="0.70"
              fontFamily="monospace">{row.p}</text>
            {/* RAW_SCORE */}
            <text x={COLS[3].x} y={ry + 18}
              fontSize="8.5" fill="#7FE7F2" fillOpacity="0.72"
              fontFamily="monospace">{row.raw}</text>
            {/* NORM_SCORE */}
            <text x={COLS[4].x} y={ry + 18}
              fontSize="8.5" fill="#7FE7F2" fillOpacity="0.65"
              fontFamily="monospace">{row.norm}</text>
            {/* PCT_RANK */}
            <text x={COLS[5].x} y={ry + 18}
              fontSize="8.5" fill="#7FE7F2" fillOpacity="0.65"
              fontFamily="monospace">{row.pct}</text>
            {/* TIER badge */}
            <rect x={COLS[6].x} y={ry + 4} width={60} height={18} rx="5"
              fill={row.tc} fillOpacity="0.10"
              stroke={row.tc} strokeWidth="0.6" strokeOpacity="0.45" />
            <text x={COLS[6].x + 30} y={ry + 16.5}
              fontSize="8" fill={row.tc} fillOpacity="0.85"
              fontFamily="monospace" fontWeight="500" textAnchor="middle">
              {row.tier}
            </text>
          </g>
        )
      })}

      {/* Closing row line */}
      <line x1="18" y1={ROWS_END_Y} x2={VB_W - 18} y2={ROWS_END_Y}
        stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.12" />

      {/* Footer */}
      <line x1="18" y1={VB_H - 32} x2={VB_W - 18} y2={VB_H - 32}
        stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.08" />
      <text x="18" y={VB_H - 18} fontSize="7.5" fill="#7FE7F2" fillOpacity="0.48"
        fontFamily="monospace">
        Illustrative output · columns: GENE, BETA, P, raw_score, normalized_score, percentile_rank, risk_category
      </text>
      <text x="18" y={VB_H - 8} fontSize="7.5" fill="#7FE7F2" fillOpacity="0.36"
        fontFamily="monospace">
        Tier labels are relative to the submitted gene set only and do not represent absolute clinical risk
      </text>
    </svg>
  )
}
