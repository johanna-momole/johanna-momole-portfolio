import { cn } from "@/lib/utils"

// Vertical formula-flow diagram.
// VB_H expanded to 318; all boxes enlarged and all fillOpacity values raised
// throughout for clear legibility at normal desktop zoom.
interface ScoringMethodologyDiagramProps {
  className?: string
}

export function ScoringMethodologyDiagram({ className }: ScoringMethodologyDiagramProps) {
  const VB_W = 680
  const VB_H = 318

  // Row 1 – input chips
  const CHIP_Y    = 38
  const CHIP_H    = 34
  const CHIP_W    = 130
  const BETA_CX   = 205
  const P_CX      = 475
  const CHIP_MID_Y = CHIP_Y + CHIP_H / 2  // vertical center of chip box = 55

  // Row 2 – formula box
  const FORM_Y  = CHIP_Y + CHIP_H + 14   // 86
  const FORM_H  = 50

  // Row 3 – derivation boxes
  const DERIV_Y = FORM_Y + FORM_H + 16   // 152
  const DERIV_H = 40
  const DERIV_W = 200
  const Z_CX    = 190
  const PCT_CX  = 490

  // T-connector from deriv boxes to tier arrow
  const CONN_Y   = DERIV_Y + DERIV_H     // 192
  const CONN_BOT = CONN_Y + 10           // 202
  const ARROW_Y2 = CONN_BOT + 12         // 214

  // Row 4 – tier bands
  const BAND_Y  = ARROW_Y2 + 2           // 216
  const BAND_H  = 22
  const BAND_X  = 80
  const BAND_W  = 520

  const FOOT_DIV = BAND_Y + 3 * BAND_H + 10
  const FOOT_Y   = FOOT_DIV + 12

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <p className="sr-only">
        Gene-level association scoring formula: raw score equals BETA multiplied by negative log base 10 of the P-value.
        Scores are then z-score normalized and assigned a percentile rank from 0 to 100 within the submitted input.
        Category thresholds, relative to the submitted gene set only:
        Upper relative score tier for scores at or above the 75th percentile of the input;
        Middle relative score tier for scores at or above the 25th and strictly below the 75th percentile;
        Lower relative score tier for scores strictly below the 25th percentile.
        These categories are relative to the submitted gene set and do not represent absolute clinical risk.
      </p>

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="min-w-[520px] w-full"
        role="img"
      >
        <defs>
          <linearGradient id="score-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#090F1E" />
            <stop offset="100%" stopColor="#050A12" />
          </linearGradient>
          <pattern id="score-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="#7FE7F2" fillOpacity="0.04" />
          </pattern>
          <marker id="score-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0.5 L6,3 L0,5.5 Z" fill="#7FE7F2" fillOpacity="0.45" />
          </marker>
        </defs>

        <rect width={VB_W} height={VB_H} rx="16" fill="url(#score-bg)" />
        <rect width={VB_W} height={VB_H} rx="16" fill="url(#score-dots)" />

        {/* Header */}
        <text x="16" y="22" fontSize="9" fill="#7FE7F2" fillOpacity="0.55"
          fontFamily="monospace" fontWeight="500" letterSpacing="2">
          SCORING · NORMALIZATION · RELATIVE STRATIFICATION
        </text>
        <line x1="16" y1="30" x2="664" y2="30"
          stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.12" />

        {/* ── BETA chip ──────────────────────────────────────────────────────── */}
        <rect x={BETA_CX - CHIP_W / 2} y={CHIP_Y} width={CHIP_W} height={CHIP_H}
          rx="7" fill="#7FE7F2" fillOpacity="0.07"
          stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.38" />
        <text x={BETA_CX} y={CHIP_MID_Y - 3}
          fontSize="9" fill="#7FE7F2" fillOpacity="0.90"
          fontFamily="monospace" fontWeight="bold" textAnchor="middle">BETA</text>
        <text x={BETA_CX} y={CHIP_MID_Y + 8}
          fontSize="7" fill="#7FE7F2" fillOpacity="0.55"
          fontFamily="monospace" textAnchor="middle">Effect size</text>

        {/* ── P-VALUE chip ───────────────────────────────────────────────────── */}
        <rect x={P_CX - CHIP_W / 2} y={CHIP_Y} width={CHIP_W} height={CHIP_H}
          rx="7" fill="#7FE7F2" fillOpacity="0.07"
          stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.38" />
        <text x={P_CX} y={CHIP_MID_Y - 3}
          fontSize="9" fill="#7FE7F2" fillOpacity="0.90"
          fontFamily="monospace" fontWeight="bold" textAnchor="middle">P-VALUE</text>
        <text x={P_CX} y={CHIP_MID_Y + 8}
          fontSize="7" fill="#7FE7F2" fillOpacity="0.55"
          fontFamily="monospace" textAnchor="middle">In range (0, 1]</text>

        {/* Arrows: chips → formula */}
        <line x1={BETA_CX} y1={CHIP_Y + CHIP_H} x2={BETA_CX} y2={FORM_Y - 2}
          stroke="#7FE7F2" strokeWidth="0.8" strokeOpacity="0.30"
          markerEnd="url(#score-arrow)" />
        <line x1={P_CX} y1={CHIP_Y + CHIP_H} x2={P_CX} y2={FORM_Y - 2}
          stroke="#7FE7F2" strokeWidth="0.8" strokeOpacity="0.30"
          markerEnd="url(#score-arrow)" />

        {/* ── Formula box ────────────────────────────────────────────────────── */}
        <rect x="100" y={FORM_Y} width="480" height={FORM_H}
          rx="9" fill="#7FE7F2" fillOpacity="0.08"
          stroke="#7FE7F2" strokeWidth="0.9" strokeOpacity="0.48" />
        <text x="340" y={FORM_Y + 13}
          fontSize="9" fill="#7FE7F2" fillOpacity="0.65"
          fontFamily="monospace" textAnchor="middle" letterSpacing="1">FORMULA</text>
        <text x="340" y={FORM_Y + 29}
          fontSize="11" fill="#7FE7F2" fillOpacity="0.92"
          fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          raw_score = BETA × −log10(P)
        </text>
        <text x="340" y={FORM_Y + 42}
          fontSize="7" fill="#7FE7F2" fillOpacity="0.42"
          fontFamily="monospace" textAnchor="middle">
          Exploratory scoring rule · Not a validated polygenic risk score
        </text>

        {/* Arrows: formula → derivation boxes */}
        <line x1={Z_CX} y1={FORM_Y + FORM_H} x2={Z_CX} y2={DERIV_Y - 2}
          stroke="#7FE7F2" strokeWidth="0.8" strokeOpacity="0.28"
          markerEnd="url(#score-arrow)" />
        <line x1={PCT_CX} y1={FORM_Y + FORM_H} x2={PCT_CX} y2={DERIV_Y - 2}
          stroke="#7FE7F2" strokeWidth="0.8" strokeOpacity="0.28"
          markerEnd="url(#score-arrow)" />

        {/* ── Z-score box ────────────────────────────────────────────────────── */}
        <rect x={Z_CX - DERIV_W / 2} y={DERIV_Y} width={DERIV_W} height={DERIV_H}
          rx="7" fill="#7FE7F2" fillOpacity="0.06"
          stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.28" />
        <text x={Z_CX} y={DERIV_Y + 18}
          fontSize="8.5" fill="#7FE7F2" fillOpacity="0.85"
          fontFamily="monospace" fontWeight="500" textAnchor="middle">Z-SCORE NORMALIZATION</text>
        <text x={Z_CX} y={DERIV_Y + 32}
          fontSize="7" fill="#7FE7F2" fillOpacity="0.55"
          fontFamily="monospace" textAnchor="middle">(score − μ) / σ across input</text>

        {/* ── Percentile rank box ────────────────────────────────────────────── */}
        <rect x={PCT_CX - DERIV_W / 2} y={DERIV_Y} width={DERIV_W} height={DERIV_H}
          rx="7" fill="#7FE7F2" fillOpacity="0.06"
          stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.28" />
        <text x={PCT_CX} y={DERIV_Y + 18}
          fontSize="8.5" fill="#7FE7F2" fillOpacity="0.85"
          fontFamily="monospace" fontWeight="500" textAnchor="middle">PERCENTILE RANK</text>
        <text x={PCT_CX} y={DERIV_Y + 32}
          fontSize="7" fill="#7FE7F2" fillOpacity="0.55"
          fontFamily="monospace" textAnchor="middle">0 to 100 within input</text>

        {/* T-connector → arrow → tiers */}
        <path d={`M ${Z_CX},${CONN_Y} L ${Z_CX},${CONN_BOT} L ${PCT_CX},${CONN_BOT} L ${PCT_CX},${CONN_Y}`}
          stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.22" fill="none" />
        <line x1="340" y1={CONN_BOT} x2="340" y2={ARROW_Y2}
          stroke="#7FE7F2" strokeWidth="0.8" strokeOpacity="0.28"
          markerEnd="url(#score-arrow)" />

        {/* ── Upper tier band ────────────────────────────────────────────────── */}
        <rect x={BAND_X} y={BAND_Y} width={BAND_W} height={BAND_H}
          rx="4" fill="#C7FF35" fillOpacity="0.10"
          stroke="#C7FF35" strokeWidth="0.6" strokeOpacity="0.42" />
        <text x={BAND_X + 12} y={BAND_Y + 15}
          fontSize="8" fill="#C7FF35" fillOpacity="0.90"
          fontFamily="monospace" fontWeight="500">Upper Relative Score Tier</text>
        <text x={BAND_X + BAND_W - 10} y={BAND_Y + 15}
          fontSize="7" fill="#C7FF35" fillOpacity="0.60"
          fontFamily="monospace" textAnchor="end">≥ 75th percentile of input (inclusive)</text>

        {/* ── Middle tier band ───────────────────────────────────────────────── */}
        <rect x={BAND_X} y={BAND_Y + BAND_H} width={BAND_W} height={BAND_H}
          rx="4" fill="#C6A0FF" fillOpacity="0.10"
          stroke="#C6A0FF" strokeWidth="0.6" strokeOpacity="0.38" />
        <text x={BAND_X + 12} y={BAND_Y + BAND_H + 15}
          fontSize="8" fill="#C6A0FF" fillOpacity="0.90"
          fontFamily="monospace" fontWeight="500">Middle Relative Score Tier</text>
        <text x={BAND_X + BAND_W - 10} y={BAND_Y + BAND_H + 15}
          fontSize="7" fill="#C6A0FF" fillOpacity="0.60"
          fontFamily="monospace" textAnchor="end">≥ 25th and &lt; 75th percentile of input</text>

        {/* ── Lower tier band ────────────────────────────────────────────────── */}
        <rect x={BAND_X} y={BAND_Y + 2 * BAND_H} width={BAND_W} height={BAND_H}
          rx="4" fill="#87A878" fillOpacity="0.10"
          stroke="#87A878" strokeWidth="0.6" strokeOpacity="0.38" />
        <text x={BAND_X + 12} y={BAND_Y + 2 * BAND_H + 15}
          fontSize="8" fill="#87A878" fillOpacity="0.90"
          fontFamily="monospace" fontWeight="500">Lower Relative Score Tier</text>
        <text x={BAND_X + BAND_W - 10} y={BAND_Y + 2 * BAND_H + 15}
          fontSize="7" fill="#87A878" fillOpacity="0.60"
          fontFamily="monospace" textAnchor="end">&lt; 25th percentile of input (strictly)</text>

        {/* Footer */}
        <line x1="16" y1={FOOT_DIV} x2="664" y2={FOOT_DIV}
          stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />
        <text x="340" y={FOOT_Y}
          fontSize="7" fill="#C6A0FF" fillOpacity="0.52"
          fontFamily="monospace" textAnchor="middle">
          Categories are relative to the submitted gene set and do not represent absolute clinical risk
        </text>
      </svg>
    </div>
  )
}
