import { cn } from "@/lib/utils"

interface StudyDesignDiagramProps {
  className?: string
}

export function StudyDesignDiagram({ className }: StudyDesignDiagramProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <svg
        viewBox="0 0 680 260"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="min-w-[520px] w-full"
        role="img"
      >
        <defs>
          <radialGradient id="study-bg" cx="30%" cy="20%" r="90%">
            <stop offset="0%" stopColor="#0D1B2A" />
            <stop offset="100%" stopColor="#050713" />
          </radialGradient>
        </defs>

        <rect width="680" height="260" rx="16" fill="url(#study-bg)" />

        {/* Dot grid */}
        <defs>
          <pattern id="study-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill="#7FE7F2" fillOpacity="0.04" />
          </pattern>
        </defs>
        <rect width="680" height="260" rx="16" fill="url(#study-dots)" />

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <text x="16" y="20" fontSize="6" fill="#7FE7F2" fillOpacity="0.38" fontFamily="monospace" fontWeight="500" letterSpacing="2">
          STUDY DESIGN: DISPROPORTIONALITY ANALYSIS
        </text>
        <line x1="16" y1="26" x2="664" y2="26" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.10" />

        {/* ── Section 1: 2×2 Table ─────────────────────────────────────────── */}
        <text x="16" y="42" fontSize="5.5" fill="#7FE7F2" fillOpacity="0.40" fontFamily="monospace">2×2 CONTINGENCY TABLE</text>

        {/* Column headers */}
        <text x="200" y="58" fontSize="5.5" fill="#7FE7F2" fillOpacity="0.55" fontFamily="monospace" textAnchor="middle">Drug X</text>
        <text x="310" y="58" fontSize="5.5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace" textAnchor="middle">All Other Drugs</text>

        {/* Row headers */}
        <text x="108" y="76" fontSize="5.5" fill="#7FE7F2" fillOpacity="0.45" fontFamily="monospace" textAnchor="end">AE of Interest</text>
        <text x="108" y="96" fontSize="5.5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace" textAnchor="end">All Other AEs</text>

        {/* Cells */}
        {/* a */}
        <rect x="120" y="62" width="72" height="20" rx="4" fill="#7FE7F2" fillOpacity="0.10" stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.35" />
        <text x="156" y="75" fontSize="10" fill="#C7FF35" fillOpacity="0.85" fontFamily="monospace" textAnchor="middle" fontWeight="bold">a</text>
        {/* b */}
        <rect x="264" y="62" width="72" height="20" rx="4" fill="#7FE7F2" fillOpacity="0.05" stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.20" />
        <text x="300" y="75" fontSize="10" fill="#7FE7F2" fillOpacity="0.55" fontFamily="monospace" textAnchor="middle" fontWeight="bold">b</text>
        {/* c */}
        <rect x="120" y="84" width="72" height="20" rx="4" fill="#7FE7F2" fillOpacity="0.05" stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.20" />
        <text x="156" y="97" fontSize="10" fill="#7FE7F2" fillOpacity="0.55" fontFamily="monospace" textAnchor="middle" fontWeight="bold">c</text>
        {/* d */}
        <rect x="264" y="84" width="72" height="20" rx="4" fill="#7FE7F2" fillOpacity="0.05" stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.15" />
        <text x="300" y="97" fontSize="10" fill="#7FE7F2" fillOpacity="0.40" fontFamily="monospace" textAnchor="middle" fontWeight="bold">d</text>

        {/* ROR formula */}
        <text x="370" y="68" fontSize="5.5" fill="#C7FF35" fillOpacity="0.65" fontFamily="monospace">ROR = (a × d) / (b × c)</text>
        <line x1="370" y1="72" x2="560" y2="72" stroke="#C7FF35" strokeWidth="0.5" strokeOpacity="0.20" />
        <text x="370" y="80" fontSize="5" fill="#7FE7F2" fillOpacity="0.30" fontFamily="monospace">95% CI: exp(ln(ROR) ± 1.96 × SE)</text>
        <text x="370" y="90" fontSize="5" fill="#7FE7F2" fillOpacity="0.22" fontFamily="monospace">Signal threshold: lower CI &gt; 1.0, n ≥ min count</text>

        {/* Divider */}
        <line x1="16" y1="118" x2="664" y2="118" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.08" />

        {/* ── Section 2: Sex stratification ───────────────────────────────── */}
        <text x="16" y="132" fontSize="5.5" fill="#C6A0FF" fillOpacity="0.45" fontFamily="monospace">SEX STRATIFICATION</text>
        <text x="16" y="141" fontSize="5" fill="#7FE7F2" fillOpacity="0.22" fontFamily="monospace">Separate 2×2 tables constructed for each sex stratum — enabling formal comparison of signal profiles</text>

        {/* Female table */}
        <rect x="16" y="148" width="136" height="70" rx="8" fill="#C6A0FF" fillOpacity="0.04" stroke="#C6A0FF" strokeWidth="0.7" strokeOpacity="0.20" />
        <text x="84" y="160" fontSize="5.5" fill="#C6A0FF" fillOpacity="0.60" fontFamily="monospace" textAnchor="middle">FEMALE ♀</text>
        {["a♀", "b♀", "c♀", "d♀"].map((cell, i) => {
          const cx = 48 + (i % 2) * 52
          const cy = 168 + Math.floor(i / 2) * 18
          const isA = i === 0
          return (
            <g key={cell}>
              <rect x={cx - 14} y={cy - 8} width="28" height="14" rx="3"
                fill="#C6A0FF" fillOpacity={isA ? 0.12 : 0.05}
                stroke="#C6A0FF" strokeWidth="0.5" strokeOpacity={isA ? 0.35 : 0.15} />
              <text x={cx} y={cy + 2} fontSize="7" fill={isA ? "#C7FF35" : "#C6A0FF"}
                fillOpacity={isA ? 0.80 : 0.45} fontFamily="monospace" textAnchor="middle" fontWeight={isA ? "bold" : "normal"}>{cell}</text>
            </g>
          )
        })}
        <text x="84" y="225" fontSize="5" fill="#C6A0FF" fillOpacity="0.40" fontFamily="monospace" textAnchor="middle">ROR♀ + 95% CI</text>

        {/* Arrow between */}
        <text x="164" y="186" fontSize="16" fill="#7FE7F2" fillOpacity="0.20" fontFamily="monospace">→</text>
        <text x="158" y="196" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.20" fontFamily="monospace">compare</text>

        {/* Male table */}
        <rect x="182" y="148" width="136" height="70" rx="8" fill="#7FE7F2" fillOpacity="0.04" stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.18" />
        <text x="250" y="160" fontSize="5.5" fill="#7FE7F2" fillOpacity="0.55" fontFamily="monospace" textAnchor="middle">MALE ♂</text>
        {["a♂", "b♂", "c♂", "d♂"].map((cell, i) => {
          const cx = 214 + (i % 2) * 52
          const cy = 168 + Math.floor(i / 2) * 18
          const isA = i === 0
          return (
            <g key={cell}>
              <rect x={cx - 14} y={cy - 8} width="28" height="14" rx="3"
                fill="#7FE7F2" fillOpacity={isA ? 0.12 : 0.05}
                stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity={isA ? 0.30 : 0.12} />
              <text x={cx} y={cy + 2} fontSize="7" fill={isA ? "#C7FF35" : "#7FE7F2"}
                fillOpacity={isA ? 0.80 : 0.40} fontFamily="monospace" textAnchor="middle" fontWeight={isA ? "bold" : "normal"}>{cell}</text>
            </g>
          )
        })}
        <text x="250" y="225" fontSize="5" fill="#7FE7F2" fillOpacity="0.40" fontFamily="monospace" textAnchor="middle">ROR♂ + 95% CI</text>

        {/* Right side: exposure legend */}
        <text x="360" y="132" fontSize="5.5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace">EXPOSURES ANALYZED</text>
        <line x1="360" y1="136" x2="660" y2="136" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />
        {[
          { name: "Semaglutide",  type: "GLP-1 RA",      color: "#7FE7F2" },
          { name: "Liraglutide",  type: "GLP-1 RA",      color: "#7FE7F2" },
          { name: "Dulaglutide",  type: "GLP-1 RA",      color: "#7FE7F2" },
          { name: "Exenatide",    type: "GLP-1 RA",      color: "#7FE7F2" },
          { name: "Tirzepatide",  type: "GLP-1/GIP Dual", color: "#C6A0FF" },
        ].map((exp, i) => (
          <g key={exp.name}>
            <circle cx="366" cy={146 + i * 16} r="2.5" fill={exp.color} fillOpacity="0.55" />
            <text x="374" y={150 + i * 16} fontSize="5.5" fill={exp.color} fillOpacity="0.70" fontFamily="monospace">{exp.name}</text>
            <text x="480" y={150 + i * 16} fontSize="5" fill={exp.color} fillOpacity="0.35" fontFamily="monospace">{exp.type}</text>
          </g>
        ))}

        {/* Bottom note */}
        <line x1="16" y1="240" x2="664" y2="240" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.08" />
        <text x="16" y="252" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.18" fontFamily="monospace">
          FAERS · CASEID DEDUPLICATION · SMQs · MULTIPLE-TESTING ADJUSTMENT · STIMULATED REPORTING CHECKS
        </text>
      </svg>
    </div>
  )
}
