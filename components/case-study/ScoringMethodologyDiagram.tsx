import { cn } from "@/lib/utils"

// Vertical formula-flow diagram. The accessible description of the formula and
// category thresholds is included as an sr-only paragraph alongside the SVG.
interface ScoringMethodologyDiagramProps {
  className?: string
}

export function ScoringMethodologyDiagram({ className }: ScoringMethodologyDiagramProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      {/* Accessible text: formula and category thresholds in plain HTML */}
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
        viewBox="0 0 680 250"
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
          <marker id="score-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0.5 L5,2.5 L0,4.5 Z" fill="#7FE7F2" fillOpacity="0.40" />
          </marker>
        </defs>

        <rect width="680" height="250" rx="16" fill="url(#score-bg)" />
        <rect width="680" height="250" rx="16" fill="url(#score-dots)" />

        {/* Header */}
        <text x="16" y="20" fontSize="6" fill="#7FE7F2" fillOpacity="0.38" fontFamily="monospace" fontWeight="500" letterSpacing="2">
          SCORING · NORMALIZATION · RELATIVE STRATIFICATION
        </text>
        <line x1="16" y1="26" x2="664" y2="26" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.10" />

        {/* ── Row 1: Input chips ─────────────────────────────────────────── */}
        {/* BETA chip */}
        <rect x="140" y="36" width="130" height="24" rx="6" fill="#7FE7F2" fillOpacity="0.06" stroke="#7FE7F2" strokeWidth="0.6" strokeOpacity="0.28" />
        <text x="205" y="46" fontSize="7.5" fill="#7FE7F2" fillOpacity="0.80" fontFamily="monospace" fontWeight="bold" textAnchor="middle">BETA</text>
        <text x="205" y="56" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace" textAnchor="middle">Effect size</text>

        {/* P chip */}
        <rect x="410" y="36" width="130" height="24" rx="6" fill="#7FE7F2" fillOpacity="0.06" stroke="#7FE7F2" strokeWidth="0.6" strokeOpacity="0.28" />
        <text x="475" y="46" fontSize="7.5" fill="#7FE7F2" fillOpacity="0.80" fontFamily="monospace" fontWeight="bold" textAnchor="middle">P-VALUE</text>
        <text x="475" y="56" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace" textAnchor="middle">In range (0, 1]</text>

        {/* Arrows from chips to formula */}
        <line x1="205" y1="60" x2="205" y2="70" stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.25" markerEnd="url(#score-arrow)" />
        <line x1="475" y1="60" x2="475" y2="70" stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.25" markerEnd="url(#score-arrow)" />

        {/* ── Row 2: Formula box ─────────────────────────────────────────── */}
        <rect x="100" y="72" width="480" height="32" rx="8" fill="#7FE7F2" fillOpacity="0.07" stroke="#7FE7F2" strokeWidth="0.8" strokeOpacity="0.38" />
        <text x="340" y="84" fontSize="8" fill="#7FE7F2" fillOpacity="0.55" fontFamily="monospace" textAnchor="middle" letterSpacing="1">FORMULA</text>
        <text x="340" y="97" fontSize="9" fill="#7FE7F2" fillOpacity="0.88" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          raw_score = BETA × −log10(P)
        </text>
        <text x="340" y="112" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.25" fontFamily="monospace" textAnchor="middle">
          Exploratory scoring rule · Not a validated polygenic risk score
        </text>

        {/* Arrows from formula to two derivation boxes */}
        <line x1="220" y1="104" x2="220" y2="122" stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.22" markerEnd="url(#score-arrow)" />
        <line x1="460" y1="104" x2="460" y2="122" stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.22" markerEnd="url(#score-arrow)" />

        {/* ── Row 3: Derivation boxes ────────────────────────────────────── */}
        {/* Z-score */}
        <rect x="90" y="124" width="200" height="32" rx="6" fill="#7FE7F2" fillOpacity="0.05" stroke="#7FE7F2" strokeWidth="0.6" strokeOpacity="0.22" />
        <text x="190" y="137" fontSize="6" fill="#7FE7F2" fillOpacity="0.72" fontFamily="monospace" fontWeight="500" textAnchor="middle">Z-SCORE NORMALIZATION</text>
        <text x="190" y="148" fontSize="5" fill="#7FE7F2" fillOpacity="0.32" fontFamily="monospace" textAnchor="middle">(score − μ) / σ across input</text>

        {/* Percentile rank */}
        <rect x="390" y="124" width="200" height="32" rx="6" fill="#7FE7F2" fillOpacity="0.05" stroke="#7FE7F2" strokeWidth="0.6" strokeOpacity="0.22" />
        <text x="490" y="137" fontSize="6" fill="#7FE7F2" fillOpacity="0.72" fontFamily="monospace" fontWeight="500" textAnchor="middle">PERCENTILE RANK</text>
        <text x="490" y="148" fontSize="5" fill="#7FE7F2" fillOpacity="0.32" fontFamily="monospace" textAnchor="middle">0 to 100 within input</text>

        {/* T-connector: two derivation boxes → single arrow → bands */}
        <path d="M 190,156 L 190,164 L 490,164 L 490,156" stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.18" fill="none" />
        <line x1="340" y1="164" x2="340" y2="172" stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.22" markerEnd="url(#score-arrow)" />

        {/* ── Row 4: Relative score tier bands ──────────────────────────── */}
        {/* Upper tier */}
        <rect x="80" y="174" width="520" height="17" rx="3" fill="#C7FF35" fillOpacity="0.09" stroke="#C7FF35" strokeWidth="0.5" strokeOpacity="0.32" />
        <text x="92" y="186" fontSize="5.5" fill="#C7FF35" fillOpacity="0.78" fontFamily="monospace" fontWeight="500">Upper Relative Score Tier</text>
        <text x="588" y="186" fontSize="5" fill="#C7FF35" fillOpacity="0.45" fontFamily="monospace" textAnchor="end">≥ 75th percentile of input (inclusive)</text>

        {/* Middle tier */}
        <rect x="80" y="194" width="520" height="17" rx="3" fill="#C6A0FF" fillOpacity="0.09" stroke="#C6A0FF" strokeWidth="0.5" strokeOpacity="0.28" />
        <text x="92" y="206" fontSize="5.5" fill="#C6A0FF" fillOpacity="0.78" fontFamily="monospace" fontWeight="500">Middle Relative Score Tier</text>
        <text x="588" y="206" fontSize="5" fill="#C6A0FF" fillOpacity="0.45" fontFamily="monospace" textAnchor="end">≥ 25th and &lt; 75th percentile of input</text>

        {/* Lower tier */}
        <rect x="80" y="214" width="520" height="17" rx="3" fill="#87A878" fillOpacity="0.09" stroke="#87A878" strokeWidth="0.5" strokeOpacity="0.28" />
        <text x="92" y="226" fontSize="5.5" fill="#87A878" fillOpacity="0.78" fontFamily="monospace" fontWeight="500">Lower Relative Score Tier</text>
        <text x="588" y="226" fontSize="5" fill="#87A878" fillOpacity="0.45" fontFamily="monospace" textAnchor="end">&lt; 25th percentile of input (strictly)</text>

        {/* Footer note */}
        <line x1="16" y1="236" x2="664" y2="236" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.08" />
        <text x="340" y="246" fontSize="4.5" fill="#C6A0FF" fillOpacity="0.35" fontFamily="monospace" textAnchor="middle">
          Categories are relative to the submitted gene set and do not represent absolute clinical risk
        </text>
      </svg>
    </div>
  )
}
