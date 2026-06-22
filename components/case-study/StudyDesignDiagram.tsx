import { cn } from "@/lib/utils"

interface StudyDesignDiagramProps {
  className?: string
}

export function StudyDesignDiagram({ className }: StudyDesignDiagramProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <svg
        viewBox="0 0 680 360"
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
          <pattern id="study-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill="#7FE7F2" fillOpacity="0.04" />
          </pattern>
        </defs>

        <rect width="680" height="360" rx="16" fill="url(#study-bg)" />
        <rect width="680" height="360" rx="16" fill="url(#study-dots)" />

        {/* ── Header ── */}
        <text x="16" y="20" fontSize="6" fill="#7FE7F2" fillOpacity="0.38" fontFamily="monospace" fontWeight="500" letterSpacing="2">
          STUDY DESIGN: DISPROPORTIONALITY ANALYSIS
        </text>
        <line x1="16" y1="26" x2="664" y2="26" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.10" />

        {/* ── Two-by-two Disproportionality Table ── */}
        <text x="16" y="43" fontSize="7.5" fill="#7FE7F2" fillOpacity="0.55" fontFamily="monospace" fontWeight="500">
          TWO-BY-TWO DISPROPORTIONALITY TABLE
        </text>

        {/* Outer table border */}
        <rect x="16" y="52" width="318" height="84" rx="4" fill="none" stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.28" />
        {/* Header row background */}
        <rect x="17" y="53" width="316" height="22" fill="#7FE7F2" fillOpacity="0.06" />

        {/* Column dividers */}
        <line x1="152" y1="52" x2="152" y2="136" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.22" />
        <line x1="244" y1="52" x2="244" y2="136" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.22" />
        {/* Header-body divider */}
        <line x1="16" y1="75" x2="334" y2="75" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.22" />
        {/* Row divider */}
        <line x1="16" y1="105" x2="334" y2="105" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.14" />

        {/* Column headers */}
        <text x="84" y="64" fontSize="7" fill="#7FE7F2" fillOpacity="0.52" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">Group / Exposure</text>
        <text x="198" y="64" fontSize="7.5" fill="#7FE7F2" fillOpacity="0.72" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">Event (+)</text>
        <text x="289" y="64" fontSize="7.5" fill="#7FE7F2" fillOpacity="0.65" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">No Event (−)</text>

        {/* Row 1: GLP-1 exposed (center y=90) */}
        <rect x="153" y="76" width="90" height="29" fill="#C7FF35" fillOpacity="0.07" stroke="#C7FF35" strokeWidth="0.4" strokeOpacity="0.28" />
        <text x="84" y="90" fontSize="7.5" fill="#7FE7F2" fillOpacity="0.72" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">GLP-1 exposed</text>
        <text x="198" y="90" fontSize="14" fill="#C7FF35" fillOpacity="0.92" fontFamily="monospace" textAnchor="middle" dominantBaseline="central" fontWeight="bold">a</text>
        <text x="289" y="90" fontSize="14" fill="#7FE7F2" fillOpacity="0.58" fontFamily="monospace" textAnchor="middle" dominantBaseline="central" fontWeight="bold">b</text>

        {/* Row 2: Non-GLP-1 (center y=120) */}
        <text x="84" y="120" fontSize="7.5" fill="#7FE7F2" fillOpacity="0.62" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">Non-GLP-1</text>
        <text x="198" y="120" fontSize="14" fill="#7FE7F2" fillOpacity="0.55" fontFamily="monospace" textAnchor="middle" dominantBaseline="central" fontWeight="bold">c</text>
        <text x="289" y="120" fontSize="14" fill="#7FE7F2" fillOpacity="0.38" fontFamily="monospace" textAnchor="middle" dominantBaseline="central" fontWeight="bold">d</text>

        {/* ROR formula — right panel, aligned with table */}
        <text x="370" y="70" fontSize="7" fill="#C7FF35" fillOpacity="0.75" fontFamily="monospace">ROR = (a × d) / (b × c)</text>
        <line x1="370" y1="75" x2="570" y2="75" stroke="#C7FF35" strokeWidth="0.5" strokeOpacity="0.25" />
        <text x="370" y="85" fontSize="6.5" fill="#7FE7F2" fillOpacity="0.50" fontFamily="monospace">95% CI: exp(ln(ROR) ± 1.96 × SE)</text>
        <text x="370" y="97" fontSize="6.5" fill="#7FE7F2" fillOpacity="0.42" fontFamily="monospace">Signal threshold: lower CI &gt; 1.0, n ≥ min count</text>

        {/* Caption */}
        <text x="16" y="152" fontSize="6.5" fill="#7FE7F2" fillOpacity="0.32" fontFamily="monospace">
          Compares adverse event reports between GLP-1 exposed and non-GLP-1 cases.
        </text>

        {/* ── Section divider ── */}
        <line x1="16" y1="178" x2="664" y2="178" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.08" />

        {/* ── Sex Stratification ── */}
        <text x="16" y="192" fontSize="7.5" fill="#C6A0FF" fillOpacity="0.62" fontFamily="monospace" fontWeight="500">
          SEX STRATIFICATION
        </text>
        {/* Two-line sub-label — each line confined to left panel (x < 340) */}
        <text x="16" y="204" fontSize="7" fill="#7FE7F2" fillOpacity="0.42" fontFamily="monospace">
          Separate 2×2 tables per sex stratum,
        </text>
        <text x="16" y="214" fontSize="7" fill="#7FE7F2" fillOpacity="0.36" fontFamily="monospace">
          enabling formal comparison of signal profiles
        </text>

        {/* Female table — y=222, height=74, bottom=296 */}
        <rect x="16" y="222" width="136" height="74" rx="8" fill="#C6A0FF" fillOpacity="0.04" stroke="#C6A0FF" strokeWidth="0.7" strokeOpacity="0.22" />
        <text x="84" y="235" fontSize="7.5" fill="#C6A0FF" fillOpacity="0.75" fontFamily="monospace" textAnchor="middle">FEMALE ♀</text>
        {(["a♀", "b♀", "c♀", "d♀"] as const).map((cell, i) => {
          const cx = 48 + (i % 2) * 52
          // rect center y = cy − 0.5; text centered there with dominantBaseline="central"
          const cy = 244 + Math.floor(i / 2) * 20
          const isA = i === 0
          return (
            <g key={cell}>
              <rect x={cx - 14} y={cy - 8} width="28" height="15" rx="3"
                fill="#C6A0FF" fillOpacity={isA ? 0.13 : 0.05}
                stroke="#C6A0FF" strokeWidth="0.5" strokeOpacity={isA ? 0.38 : 0.16} />
              <text x={cx} y={cy - 0.5} fontSize="7.5" fill={isA ? "#C7FF35" : "#C6A0FF"}
                fillOpacity={isA ? 0.85 : 0.48} fontFamily="monospace" textAnchor="middle"
                dominantBaseline="central" fontWeight={isA ? "bold" : "normal"}>{cell}</text>
            </g>
          )
        })}
        <text x="84" y="308" fontSize="7" fill="#C6A0FF" fillOpacity="0.55" fontFamily="monospace" textAnchor="middle">ROR♀ + 95% CI</text>

        {/* Compare arrow — in the gap between tables */}
        <text x="163" y="261" fontSize="16" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace">→</text>
        <text x="158" y="274" fontSize="6.5" fill="#7FE7F2" fillOpacity="0.32" fontFamily="monospace">compare</text>

        {/* Male table — same y as female */}
        <rect x="182" y="222" width="136" height="74" rx="8" fill="#7FE7F2" fillOpacity="0.04" stroke="#7FE7F2" strokeWidth="0.7" strokeOpacity="0.20" />
        <text x="250" y="235" fontSize="7.5" fill="#7FE7F2" fillOpacity="0.70" fontFamily="monospace" textAnchor="middle">MALE ♂</text>
        {(["a♂", "b♂", "c♂", "d♂"] as const).map((cell, i) => {
          const cx = 214 + (i % 2) * 52
          const cy = 244 + Math.floor(i / 2) * 20
          const isA = i === 0
          return (
            <g key={cell}>
              <rect x={cx - 14} y={cy - 8} width="28" height="15" rx="3"
                fill="#7FE7F2" fillOpacity={isA ? 0.13 : 0.05}
                stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity={isA ? 0.32 : 0.13} />
              <text x={cx} y={cy - 0.5} fontSize="7.5" fill={isA ? "#C7FF35" : "#7FE7F2"}
                fillOpacity={isA ? 0.85 : 0.42} fontFamily="monospace" textAnchor="middle"
                dominantBaseline="central" fontWeight={isA ? "bold" : "normal"}>{cell}</text>
            </g>
          )
        })}
        <text x="250" y="308" fontSize="7" fill="#7FE7F2" fillOpacity="0.55" fontFamily="monospace" textAnchor="middle">ROR♂ + 95% CI</text>

        {/* ── Exposures Analyzed — right panel, aligned with SEX STRATIFICATION ── */}
        <text x="360" y="192" fontSize="7.5" fill="#7FE7F2" fillOpacity="0.55" fontFamily="monospace" fontWeight="500">EXPOSURES ANALYZED</text>
        <line x1="360" y1="197" x2="660" y2="197" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.12" />
        {[
          { name: "Semaglutide",  type: "GLP-1 RA",       color: "#7FE7F2" },
          { name: "Liraglutide",  type: "GLP-1 RA",       color: "#7FE7F2" },
          { name: "Dulaglutide",  type: "GLP-1 RA",       color: "#7FE7F2" },
          { name: "Exenatide",    type: "GLP-1 RA",       color: "#7FE7F2" },
          { name: "Tirzepatide",  type: "GLP-1/GIP Dual", color: "#C6A0FF" },
        ].map((exp, i) => (
          <g key={exp.name}>
            <circle cx="368" cy={210 + i * 18} r="3" fill={exp.color} fillOpacity="0.65" />
            <text x="378" y={215 + i * 18} fontSize="7.5" fill={exp.color} fillOpacity="0.82" fontFamily="monospace">{exp.name}</text>
            <text x="478" y={215 + i * 18} fontSize="7" fill={exp.color} fillOpacity="0.52" fontFamily="monospace">{exp.type}</text>
          </g>
        ))}

        {/* ── Bottom note ── */}
        <line x1="16" y1="322" x2="664" y2="322" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.08" />
        <text x="16" y="335" fontSize="6.5" fill="#7FE7F2" fillOpacity="0.30" fontFamily="monospace">
          FAERS · CASEID DEDUPLICATION · SMQs · MULTIPLE-TESTING ADJUSTMENT · STIMULATED REPORTING CHECKS
        </text>
      </svg>
    </div>
  )
}
