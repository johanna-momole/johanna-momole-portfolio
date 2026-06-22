import { cn } from "@/lib/utils"
import type { ProjectVisualVariant } from "@/content/projects"

/* ─── Signal (GLP-1 Pharmacovigilance) — 5-panel portrait dashboard ───────── */
function SignalVisual({ className }: { className?: string }) {
  const sexEvents     = ["GI", "META", "ENDO", "CARD"]
  const femaleSignals = [0.80, 0.45, 0.62, 1.00]
  const maleSignals   = [0.50, 0.92, 0.30, 0.70]

  // Forest plot rows: SVG x-coords pre-computed on log scale (range 0.5–3.5)
  const NULL_X = 135
  const forestRows = [
    { label: "SEMA",  ror: 233, lo: 191, hi: 276, sig: true,  color: "#C9F2EE", rorLabel: "1.85" },
    { label: "LIRA",  ror: 202, lo: 162, hi: 243, sig: true,  color: "#C9F2EE", rorLabel: "1.52" },
    { label: "DULA",  ror: 175, lo: 129, hi: 221, sig: false, color: "#C9F2EE", rorLabel: "1.28" },
    { label: "EXEN",  ror: 217, lo: 176, hi: 258, sig: true,  color: "#C9F2EE", rorLabel: "1.67" },
    { label: "TIRZE", ror: 259, lo: 224, hi: 295, sig: true,  color: "#D9D1FF", rorLabel: "2.18" },
  ]

  const trendPts = [
    { x: 40,  y: 596 },
    { x: 118, y: 576 },
    { x: 210, y: 555 },
    { x: 320, y: 532 },
  ]

  const matrixCols = ["GI", "META", "ENDO", "CARD"]
  const matrixRows = ["GLP-1 RA", "TIRZE", "COMPR"]
  const matrixColX = [88, 156, 224, 292]
  const matrixRowY = [684, 710, 736]
  const matrixData = [
    [0.85, 0.65, 0.30, 0.55],
    [0.90, 0.82, 0.60, 0.78],
    [0.22, 0.18, 0.15, 0.20],
  ]

  return (
    <svg
      viewBox="0 0 360 790"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("w-full h-full", className)}
    >
      <defs>
        <radialGradient id="sig-bg" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#152430" />
          <stop offset="100%" stopColor="#090B0C" />
        </radialGradient>
      </defs>

      <rect width="360" height="790" fill="url(#sig-bg)" />

      {/* Subtle grid */}
      <g stroke="#C9F2EE" strokeWidth="0.4" opacity="0.04">
        {[80, 160, 240, 320, 400, 480, 560, 640, 720].map((y) => (
          <line key={y} x1="0" y1={y} x2="360" y2={y} />
        ))}
        {[90, 180, 270].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="790" />
        ))}
      </g>

      {/* ════ PANEL 1: Header + Metrics + Compounds (y: 0–138) ════ */}
      <text x="14" y="20" fontSize="6.5" fill="#C9F2EE" fillOpacity="0.50" fontFamily="monospace" fontWeight="500" letterSpacing="1">FAERS SIGNAL ANALYSIS</text>
      <rect x="256" y="8" width="90" height="15" rx="7" fill="#C9F2EE" fillOpacity="0.08" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.25" />
      <text x="301" y="18" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.72" fontFamily="monospace" textAnchor="middle">COMPLETED</text>
      <text x="14" y="30" fontSize="4.5" fill="#C9F2EE" fillOpacity="0.22" fontFamily="monospace">GLP-1 PHARMACOVIGILANCE · DISPROPORTIONALITY ANALYSIS</text>
      <rect x="0" y="36" width="360" height="0.6" fill="#C9F2EE" fillOpacity="0.10" />

      {[
        { label: "18.5M+", sub: "FAERS records", sub2: "harmonized",   x: 10  },
        { label: "5",      sub: "GLP-1 agents",  sub2: "analyzed",     x: 127 },
        { label: "4yr",    sub: "coverage",       sub2: "2021 to 2024", x: 244 },
      ].map(({ label, sub, sub2, x }) => (
        <g key={label}>
          <rect x={x} y="42" width="108" height="56" rx="8" fill="#C9F2EE" fillOpacity="0.05" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.18" />
          <text x={x + 54} y="66" fontSize={label.length > 3 ? 13 : 18}
            fill="#C7FF35" fillOpacity="0.88" fontFamily="monospace"
            textAnchor="middle" dominantBaseline="central" fontWeight="bold">{label}</text>
          <text x={x + 54} y="80" fontSize="6" fill="#C9F2EE" fillOpacity="0.42" fontFamily="monospace" textAnchor="middle">{sub}</text>
          <text x={x + 54} y="90" fontSize="5" fill="#C9F2EE" fillOpacity="0.25" fontFamily="monospace" textAnchor="middle">{sub2}</text>
        </g>
      ))}

      <text x="14" y="112" fontSize="5" fill="#C9F2EE" fillOpacity="0.28" fontFamily="monospace" letterSpacing="0.5">COMPOUNDS ANALYZED</text>
      {[
        { label: "SEMA",  color: "#C9F2EE", dual: false },
        { label: "LIRA",  color: "#C9F2EE", dual: false },
        { label: "DULA",  color: "#C9F2EE", dual: false },
        { label: "EXEN",  color: "#C9F2EE", dual: false },
        { label: "TIRZE", color: "#D9D1FF", dual: true  },
      ].map(({ label, color, dual }, i) => {
        const x = 10 + i * 70
        return (
          <g key={label}>
            <rect x={x} y="116" width="64" height="17" rx="8"
              fill={color} fillOpacity="0.07"
              stroke={color} strokeWidth="0.5" strokeOpacity={dual ? 0.40 : 0.22}
            />
            <circle cx={x + 10} cy="124.5" r="3" fill={color} fillOpacity={dual ? 0.65 : 0.48} />
            <text x={x + 18} y="127.5" fontSize="5.5" fill={color} fillOpacity={dual ? 0.82 : 0.65} fontFamily="monospace">{label}</text>
          </g>
        )
      })}

      <rect x="0" y="138" width="360" height="0.6" fill="#C9F2EE" fillOpacity="0.10" />

      {/* ════ PANEL 2: Sex-Stratified Signals (y: 138–300) ════ */}
      <text x="14" y="153" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.40" fontFamily="monospace">SEX-STRATIFIED SIGNALS</text>
      <rect x="14" y="157" width="332" height="0.5" fill="#C9F2EE" fillOpacity="0.07" />

      <text x="174" y="172" fontSize="7" fill="#D9D1FF" fillOpacity="0.72" fontFamily="monospace" textAnchor="middle">FEMALE</text>
      <text x="306" y="172" fontSize="7" fill="#C9F2EE" fillOpacity="0.72" fontFamily="monospace" textAnchor="middle">MALE</text>
      <line x1="240" y1="160" x2="240" y2="292" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.12" />

      {sexEvents.map((evt, i) => {
        const rowY = 200 + i * 28
        const fv   = femaleSignals[i]
        const mv   = maleSignals[i]
        const fMax = fv >= 0.95
        const mMax = mv >= 0.85
        return (
          <g key={evt}>
            <text x="14" y={rowY + 4} fontSize="7" fill="#C9F2EE" fillOpacity="0.42" fontFamily="monospace">{evt}</text>
            <circle cx="174" cy={rowY} r={4 + fv * 8}
              fill={fMax ? "#C7FF35" : "#D9D1FF"}
              fillOpacity={fMax ? 0.88 : 0.22 + fv * 0.48} />
            {fMax && <circle cx="174" cy={rowY} r={4 + fv * 8 + 4} fill="#C7FF35" fillOpacity="0.08" />}
            <circle cx="306" cy={rowY} r={4 + mv * 8}
              fill={mMax ? "#C7FF35" : "#C9F2EE"}
              fillOpacity={mMax ? 0.88 : 0.20 + mv * 0.45} />
            {mMax && <circle cx="306" cy={rowY} r={4 + mv * 8 + 4} fill="#C7FF35" fillOpacity="0.08" />}
          </g>
        )
      })}

      <text x="14" y="292" fontSize="4.5" fill="#C9F2EE" fillOpacity="0.20" fontFamily="monospace">Bubble radius = relative signal strength · Chartreuse = highest per group</text>
      <rect x="0" y="300" width="360" height="0.6" fill="#C9F2EE" fillOpacity="0.10" />

      {/* ════ PANEL 3: ROR Disproportionality Forest (y: 300–460) ════ */}
      <text x="14" y="315" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.40" fontFamily="monospace">ROR DISPROPORTIONALITY (95% CI)</text>
      <rect x="14" y="319" width="332" height="0.5" fill="#C9F2EE" fillOpacity="0.07" />

      <line x1={NULL_X} y1="328" x2={NULL_X} y2="443" stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.22" strokeDasharray="2,2" />
      <line x1="25" y1="443" x2="330" y2="443" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.14" />

      {[
        { x: 25,     label: "0.5" },
        { x: NULL_X, label: "1.0" },
        { x: 211,    label: "2.0" },
        { x: 276,    label: "3.0" },
      ].map(({ x, label }) => (
        <g key={label}>
          <line x1={x} y1="441" x2={x} y2="446" stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.20" />
          <text x={x} y="454" fontSize="4" fill="#C9F2EE" fillOpacity="0.25" fontFamily="monospace" textAnchor="middle">{label}</text>
        </g>
      ))}

      {forestRows.map(({ label, ror, lo, hi, sig, color, rorLabel }, i) => {
        const rowY    = 340 + i * 20
        const isTirze = color === "#D9D1FF"
        const ptFill  = isTirze ? "#C7FF35" : (sig ? "#C9F2EE" : "#C9F2EE")
        const ptOpac  = isTirze ? 0.90 : (sig ? 0.65 : 0.28)
        return (
          <g key={label}>
            <text x="14" y={rowY + 4} fontSize="5.5" fill={color} fillOpacity={isTirze ? 0.75 : 0.48} fontFamily="monospace">{label}</text>
            <line x1={lo} y1={rowY} x2={hi} y2={rowY} stroke={color} strokeWidth="0.7" strokeOpacity={sig ? 0.55 : 0.28} />
            <line x1={lo} y1={rowY - 3} x2={lo} y2={rowY + 3} stroke={color} strokeWidth="0.7" strokeOpacity={sig ? 0.48 : 0.22} />
            <line x1={hi} y1={rowY - 3} x2={hi} y2={rowY + 3} stroke={color} strokeWidth="0.7" strokeOpacity={sig ? 0.48 : 0.22} />
            <polygon
              points={`${ror},${rowY - 4} ${ror + 4},${rowY} ${ror},${rowY + 4} ${ror - 4},${rowY}`}
              fill={ptFill} fillOpacity={ptOpac}
            />
            <text x={hi + 6} y={rowY + 4} fontSize="4.5" fill={color} fillOpacity={isTirze ? 0.65 : 0.38} fontFamily="monospace">{rorLabel}</text>
          </g>
        )
      })}

      <text x="14" y="459" fontSize="4" fill="#C9F2EE" fillOpacity="0.18" fontFamily="monospace">Diamond = point estimate · Bar = 95% CI · Dashed = null (1.0) · Exploratory only</text>
      <rect x="0" y="460" width="360" height="0.6" fill="#C9F2EE" fillOpacity="0.10" />

      {/* ════ PANEL 4: Quarterly Signal Trend (y: 460–620) ════ */}
      <text x="14" y="475" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.38" fontFamily="monospace">QUARTERLY SIGNAL TREND</text>
      <rect x="14" y="479" width="332" height="0.5" fill="#C9F2EE" fillOpacity="0.07" />

      <line x1="36" y1="492" x2="36" y2="600" stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.12" />
      <text x="34" y="496" fontSize="4.5" fill="#C9F2EE" fillOpacity="0.22" fontFamily="monospace" textAnchor="end">H</text>
      <text x="34" y="598" fontSize="4.5" fill="#C9F2EE" fillOpacity="0.22" fontFamily="monospace" textAnchor="end">L</text>

      <path
        d="M40,596 C72,588 96,580 118,576 C148,569 178,561 210,555 C248,547 284,540 320,532 L320,600 L40,600 Z"
        fill="#C9F2EE" fillOpacity="0.05"
      />
      <path
        d="M40,596 C72,588 96,580 118,576 C148,569 178,561 210,555 C248,547 284,540 320,532"
        fill="none" stroke="#C9F2EE" strokeWidth="1.5" strokeOpacity="0.48"
      />

      {trendPts.map(({ x, y }, i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 3 ? 4.5 : 3.5}
            fill={i === 3 ? "#C7FF35" : "#C9F2EE"}
            fillOpacity={i === 3 ? 0.95 : 0.58} />
          {i === 3 && <circle cx={x} cy={y} r="8" fill="#C7FF35" fillOpacity="0.10" />}
        </g>
      ))}

      <line x1="38" y1="600" x2="340" y2="600" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.15" />
      {[
        { q: "Q1'21", x: 40  },
        { q: "Q1'22", x: 118 },
        { q: "Q1'23", x: 210 },
        { q: "Q4'24", x: 320 },
      ].map(({ q, x }) => (
        <text key={q} x={x} y="610" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.30" fontFamily="monospace" textAnchor="middle">{q}</text>
      ))}

      <rect x="0" y="620" width="360" height="0.6" fill="#C9F2EE" fillOpacity="0.10" />

      {/* ════ PANEL 5: Signal by Clinical Group Matrix (y: 620–790) ════ */}
      <text x="14" y="635" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.38" fontFamily="monospace">SIGNAL BY CLINICAL GROUP</text>
      <rect x="14" y="639" width="332" height="0.5" fill="#C9F2EE" fillOpacity="0.07" />

      {matrixCols.map((col, i) => (
        <text key={col} x={matrixColX[i]} y="654" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.38" fontFamily="monospace" textAnchor="middle">{col}</text>
      ))}

      {matrixData.map((row, ri) => (
        <g key={ri}>
          <text x="14" y={matrixRowY[ri] + 4} fontSize="5" fill={ri === 1 ? "#D9D1FF" : "#C9F2EE"} fillOpacity={ri === 1 ? 0.65 : 0.42} fontFamily="monospace">{matrixRows[ri]}</text>
          {row.map((val, ci) => {
            const isHigh   = val >= 0.80
            const cx       = matrixColX[ci] ?? 88
            const cy       = matrixRowY[ri] ?? 684
            const dotColor = isHigh ? (ri === 1 ? "#D9D1FF" : "#C7FF35") : "#C9F2EE"
            return (
              <g key={ci}>
                <rect
                  x={cx - 16} y={cy - 12} width="32" height="20" rx="4"
                  fill={dotColor} fillOpacity={isHigh ? 0.10 : 0.03}
                  stroke={dotColor} strokeWidth="0.4" strokeOpacity={isHigh ? 0.35 : 0.10}
                />
                <circle
                  cx={cx} cy={cy - 2} r={2 + val * 6}
                  fill={dotColor} fillOpacity={isHigh ? 0.75 : 0.18 + val * 0.30}
                />
              </g>
            )
          })}
        </g>
      ))}

      <circle cx="25"  cy="762" r="5"   fill="#C7FF35" fillOpacity="0.70" />
      <text x="33"  y="765" fontSize="5" fill="#C9F2EE" fillOpacity="0.35" fontFamily="monospace">High signal</text>
      <circle cx="110" cy="762" r="3.5" fill="#D9D1FF" fillOpacity="0.65" />
      <text x="118" y="765" fontSize="5" fill="#C9F2EE" fillOpacity="0.35" fontFamily="monospace">Dual agonist</text>
      <circle cx="212" cy="762" r="2.5" fill="#C9F2EE" fillOpacity="0.40" />
      <text x="220" y="765" fontSize="5" fill="#C9F2EE" fillOpacity="0.30" fontFamily="monospace">Moderate</text>
      <circle cx="292" cy="762" r="1.5" fill="#C9F2EE" fillOpacity="0.22" />
      <text x="298" y="765" fontSize="5" fill="#C9F2EE" fillOpacity="0.25" fontFamily="monospace">Low</text>

      <text x="14" y="779" fontSize="4" fill="#C9F2EE" fillOpacity="0.15" fontFamily="monospace">158K+ GLP-1 CASES · ROR · PRR · BH ADJUSTMENT · HYPOTHESIS-GENERATING ONLY</text>
    </svg>
  )
}

/* ─── Signal compact (GLP-1) — single landscape overview ──────────────────── */
function SignalVisualCompact({ className }: { className?: string }) {
  // Pre-computed log-scale x-coords: x = 38 + (log(ROR) - log(0.5)) / (log(3.5) - log(0.5)) * 137
  // NULL_X (ROR=1.0) = 87, axis ticks: 0.5→38, 1.0→87, 2.0→136, 3.0→164
  const NULL_X = 87
  const forestRows = [
    { label: "SEMA",  ror: 130, lo: 111, hi: 149, sig: true,  color: "#C9F2EE", rorLabel: "1.85" },
    { label: "LIRA",  ror: 116, lo:  98, hi: 134, sig: true,  color: "#C9F2EE", rorLabel: "1.52" },
    { label: "DULA",  ror: 104, lo:  84, hi: 125, sig: false, color: "#C9F2EE", rorLabel: "1.28" },
    { label: "EXEN",  ror: 123, lo: 105, hi: 141, sig: true,  color: "#C9F2EE", rorLabel: "1.67" },
    { label: "TIRZE", ror: 142, lo: 126, hi: 157, sig: true,  color: "#D9D1FF", rorLabel: "2.18" },
  ]

  const sexEvents     = ["GI", "META", "ENDO", "CARD"]
  const femaleSignals = [0.80, 0.45, 0.62, 1.00]
  const maleSignals   = [0.50, 0.92, 0.30, 0.70]

  // Trend x/y mapped to: x 34–340, y 160 (high/Q4'24) → 210 (low/Q1'21)
  const trendPts = [
    { x:  34, y: 210 },
    { x: 119, y: 194 },
    { x: 220, y: 178 },
    { x: 340, y: 160 },
  ]

  return (
    <svg
      viewBox="0 0 360 230"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("w-full h-full", className)}
    >
      <defs>
        <radialGradient id="sig-c-bg" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#152430" />
          <stop offset="100%" stopColor="#090B0C" />
        </radialGradient>
      </defs>

      <rect width="360" height="230" fill="url(#sig-c-bg)" rx="12" />

      {/* Subtle grid */}
      <g stroke="#C9F2EE" strokeWidth="0.4" opacity="0.04">
        {[50, 100, 150, 200].map((y) => (
          <line key={y} x1="0" y1={y} x2="360" y2={y} />
        ))}
        {[90, 180, 270].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="230" />
        ))}
      </g>

      {/* ════ HEADER (y 0–25) ════ */}
      <text x="14" y="13" fontSize="6.5" fill="#C9F2EE" fillOpacity="0.50" fontFamily="monospace" fontWeight="500" letterSpacing="1">FAERS SIGNAL ANALYSIS</text>
      <rect x="268" y="4" width="78" height="14" rx="7" fill="#C9F2EE" fillOpacity="0.08" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.25" />
      <text x="307" y="13" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.72" fontFamily="monospace" textAnchor="middle">COMPLETED</text>
      <text x="14" y="21" fontSize="4.5" fill="#C9F2EE" fillOpacity="0.22" fontFamily="monospace">GLP-1 · 18.5M+ FAERS RECORDS · 5 AGENTS · 2021–2024</text>
      <rect x="0" y="25" width="360" height="0.5" fill="#C9F2EE" fillOpacity="0.08" />

      {/* ════ LEFT: ROR Forest Plot (x 0–190, y 25–140) ════ */}
      <text x="14" y="35" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.38" fontFamily="monospace">ROR DISPROPORTIONALITY (95% CI)</text>
      <rect x="14" y="38" width="168" height="0.4" fill="#C9F2EE" fillOpacity="0.06" />

      {/* Null line + axis */}
      <line x1={NULL_X} y1="42" x2={NULL_X} y2="126" stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.20" strokeDasharray="2,2" />
      <line x1="38" y1="126" x2="175" y2="126" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.14" />
      {[
        { x: 38,  label: "0.5" },
        { x: 87,  label: "1.0" },
        { x: 136, label: "2.0" },
        { x: 164, label: "3.0" },
      ].map(({ x, label }) => (
        <g key={label}>
          <line x1={x} y1="124" x2={x} y2="128" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.18" />
          <text x={x} y="135" fontSize="4" fill="#C9F2EE" fillOpacity="0.22" fontFamily="monospace" textAnchor="middle">{label}</text>
        </g>
      ))}

      {/* Forest rows — row spacing 15px starting at y=53 */}
      {forestRows.map(({ label, ror, lo, hi, sig, color, rorLabel }, i) => {
        const rowY    = 53 + i * 15
        const isTirze = color === "#D9D1FF"
        const ptFill  = isTirze ? "#C7FF35" : "#C9F2EE"
        const ptOpac  = isTirze ? 0.90 : (sig ? 0.65 : 0.28)
        return (
          <g key={label}>
            <text x="14" y={rowY + 3} fontSize="5" fill={color} fillOpacity={isTirze ? 0.72 : 0.45} fontFamily="monospace">{label}</text>
            <line x1={lo} y1={rowY} x2={hi} y2={rowY} stroke={color} strokeWidth="0.8" strokeOpacity={sig ? 0.50 : 0.22} />
            <line x1={lo} y1={rowY - 2.5} x2={lo} y2={rowY + 2.5} stroke={color} strokeWidth="0.8" strokeOpacity={sig ? 0.45 : 0.18} />
            <line x1={hi} y1={rowY - 2.5} x2={hi} y2={rowY + 2.5} stroke={color} strokeWidth="0.8" strokeOpacity={sig ? 0.45 : 0.18} />
            <polygon
              points={`${ror},${rowY - 3.5} ${ror + 3.5},${rowY} ${ror},${rowY + 3.5} ${ror - 3.5},${rowY}`}
              fill={ptFill} fillOpacity={ptOpac}
            />
            <text x={hi + 4} y={rowY + 3} fontSize="3.5" fill={color} fillOpacity={isTirze ? 0.58 : 0.30} fontFamily="monospace">{rorLabel}</text>
          </g>
        )
      })}

      {/* Column separator */}
      <line x1="190" y1="26" x2="190" y2="139" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.10" />

      {/* ════ RIGHT: Sex-Stratified Signals (x 195–360, y 25–140) ════ */}
      <text x="200" y="35" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.38" fontFamily="monospace">SEX-STRATIFIED SIGNALS</text>
      <rect x="200" y="38" width="152" height="0.4" fill="#C9F2EE" fillOpacity="0.06" />

      <text x="248" y="49" fontSize="6" fill="#D9D1FF" fillOpacity="0.65" fontFamily="monospace" textAnchor="middle">FEMALE</text>
      <text x="325" y="49" fontSize="6" fill="#C9F2EE" fillOpacity="0.65" fontFamily="monospace" textAnchor="middle">MALE</text>
      <line x1="285" y1="40" x2="285" y2="132" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.10" />

      {/* Bubble rows — row spacing 17px starting at y=65 */}
      {sexEvents.map((evt, i) => {
        const rowY = 65 + i * 17
        const fv   = femaleSignals[i]
        const mv   = maleSignals[i]
        const fMax = fv >= 0.95
        const mMax = mv >= 0.85
        return (
          <g key={evt}>
            <text x="200" y={rowY + 3} fontSize="5" fill="#C9F2EE" fillOpacity="0.38" fontFamily="monospace">{evt}</text>
            <circle cx="248" cy={rowY} r={3 + fv * 6}
              fill={fMax ? "#C7FF35" : "#D9D1FF"}
              fillOpacity={fMax ? 0.88 : 0.22 + fv * 0.45}
            />
            {fMax && <circle cx="248" cy={rowY} r={3 + fv * 6 + 3} fill="#C7FF35" fillOpacity="0.08" />}
            <circle cx="325" cy={rowY} r={3 + mv * 6}
              fill={mMax ? "#C7FF35" : "#C9F2EE"}
              fillOpacity={mMax ? 0.88 : 0.20 + mv * 0.42}
            />
            {mMax && <circle cx="325" cy={rowY} r={3 + mv * 6 + 3} fill="#C7FF35" fillOpacity="0.08" />}
          </g>
        )
      })}

      <text x="200" y="137" fontSize="3.5" fill="#C9F2EE" fillOpacity="0.18" fontFamily="monospace">Bubble radius = relative signal strength</text>

      {/* Row divider */}
      <rect x="0" y="140" width="360" height="0.5" fill="#C9F2EE" fillOpacity="0.07" />

      {/* ════ QUARTERLY TREND (y 140–222) ════ */}
      <text x="14" y="151" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.38" fontFamily="monospace">QUARTERLY SIGNAL TREND</text>
      <rect x="14" y="154" width="332" height="0.4" fill="#C9F2EE" fillOpacity="0.06" />

      <line x1="32" y1="160" x2="32" y2="210" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.10" />

      {/* Trend area + line */}
      <path
        d="M34,210 C62,205 94,199 119,194 C152,189 187,183 220,178 C260,172 300,166 340,160 L340,210 L34,210 Z"
        fill="#C9F2EE" fillOpacity="0.05"
      />
      <path
        d="M34,210 C62,205 94,199 119,194 C152,189 187,183 220,178 C260,172 300,166 340,160"
        fill="none" stroke="#C9F2EE" strokeWidth="1.5" strokeOpacity="0.45"
      />

      {/* Trend points */}
      {trendPts.map(({ x, y }, i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 3 ? 4 : 3}
            fill={i === 3 ? "#C7FF35" : "#C9F2EE"}
            fillOpacity={i === 3 ? 0.95 : 0.55}
          />
          {i === 3 && <circle cx={x} cy={y} r="7" fill="#C7FF35" fillOpacity="0.10" />}
        </g>
      ))}

      {/* X-axis + labels */}
      <line x1="32" y1="210" x2="348" y2="210" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.14" />
      {[
        { q: "Q1'21", x:  34 },
        { q: "Q1'22", x: 119 },
        { q: "Q1'23", x: 220 },
        { q: "Q4'24", x: 340 },
      ].map(({ q, x }) => (
        <text key={q} x={x} y="218" fontSize="5" fill="#C9F2EE" fillOpacity="0.28" fontFamily="monospace" textAnchor="middle">{q}</text>
      ))}

      <text x="180" y="226" fontSize="3.8" fill="#C9F2EE" fillOpacity="0.15" fontFamily="monospace" textAnchor="middle">158K+ GLP-1 CASES · ROR · PRR · BH ADJUSTMENT · HYPOTHESIS-GENERATING ONLY</text>
    </svg>
  )
}

/* ─── Cohort (RWE Studio) ──────────────────────────────────────────────────── */
function CohortVisual({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 230"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("w-full h-full", className)}
    >
      <defs>
        <radialGradient id="coh-bg" cx="60%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#1a1535" />
          <stop offset="100%" stopColor="#090B0C" />
        </radialGradient>
      </defs>

      <rect width="360" height="230" fill="url(#coh-bg)" rx="12" />

      {/* Subtle grid */}
      <g stroke="#D9D1FF" strokeWidth="0.4" opacity="0.05">
        {[40, 80, 120, 160, 200].map((y) => (
          <line key={y} x1="0" y1={y} x2="360" y2={y} />
        ))}
        {[60, 120, 180, 240, 300].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="230" />
        ))}
      </g>

      {/* Header */}
      <text x="14" y="12" fontSize="6.5" fill="#D9D1FF" fillOpacity="0.50" fontFamily="monospace" fontWeight="500">RWE STUDIO</text>
      <rect x="278" y="5" width="70" height="11" rx="5" fill="#D9D1FF" fillOpacity="0.10" stroke="#D9D1FF" strokeWidth="0.5" strokeOpacity="0.40" />
      <text x="313" y="12.5" fontSize="5.5" fill="#D9D1FF" fillOpacity="0.75" fontFamily="monospace" textAnchor="middle">COMPLETED</text>
      <rect x="14" y="17" width="332" height="0.8" fill="#D9D1FF" fillOpacity="0.10" />

      {/* ── Flow diagram: Question → Cohort → Evidence ── */}
      {/* Box 1: Clinical Question */}
      <rect x="14" y="26" width="86" height="28" rx="6" fill="#D9D1FF" fillOpacity="0.08" stroke="#D9D1FF" strokeWidth="0.8" strokeOpacity="0.30" />
      <text x="57" y="38" fontSize="5.5" fill="#D9D1FF" fillOpacity="0.70" fontFamily="monospace" textAnchor="middle">CLINICAL</text>
      <text x="57" y="47" fontSize="5.5" fill="#D9D1FF" fillOpacity="0.70" fontFamily="monospace" textAnchor="middle">QUESTION</text>

      {/* Arrow 1 */}
      <line x1="100" y1="40" x2="126" y2="40" stroke="#C9F2EE" strokeWidth="1" strokeOpacity="0.35" />
      <polygon points="126,37 132,40 126,43" fill="#C9F2EE" fillOpacity="0.35" />

      {/* Box 2: Cohort */}
      <rect x="132" y="26" width="86" height="28" rx="6" fill="#C9F2EE" fillOpacity="0.08" stroke="#C9F2EE" strokeWidth="0.8" strokeOpacity="0.35" />
      <text x="175" y="38" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.70" fontFamily="monospace" textAnchor="middle">COHORT</text>
      <text x="175" y="47" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.70" fontFamily="monospace" textAnchor="middle">DEFINITION</text>

      {/* Arrow 2 */}
      <line x1="218" y1="40" x2="244" y2="40" stroke="#C7FF35" strokeWidth="1" strokeOpacity="0.40" />
      <polygon points="244,37 250,40 244,43" fill="#C7FF35" fillOpacity="0.40" />

      {/* Box 3: Evidence */}
      <rect x="250" y="26" width="96" height="28" rx="6" fill="#C7FF35" fillOpacity="0.06" stroke="#C7FF35" strokeWidth="0.8" strokeOpacity="0.35" />
      <text x="298" y="38" fontSize="5.5" fill="#C7FF35" fillOpacity="0.70" fontFamily="monospace" textAnchor="middle">EVIDENCE</text>
      <text x="298" y="47" fontSize="5.5" fill="#C7FF35" fillOpacity="0.70" fontFamily="monospace" textAnchor="middle">OUTPUT</text>

      {/* ── SQL code block ─────────────────────── */}
      <rect x="14" y="62" width="200" height="74" rx="6" fill="#000000" fillOpacity="0.30" />
      <rect x="14" y="62" width="200" height="10" rx="6" fill="#D9D1FF" fillOpacity="0.05" />
      <text x="18" y="69.5" fontSize="5" fill="#D9D1FF" fillOpacity="0.35" fontFamily="monospace">query.sql</text>

      {[
        { y: 81, code: "SELECT patient_id, drug, start_dt", color: "#C9F2EE" },
        { y: 89, code: "FROM faers_harmonized", color: "#D9D1FF" },
        { y: 97, code: "WHERE drug_class = 'GLP1'", color: "#C9F2EE" },
        { y: 105, code: "  AND follow_up_days >= 90", color: "#C9F2EE" },
        { y: 113, code: "  AND age BETWEEN 18 AND 80", color: "#C9F2EE" },
        { y: 121, code: "ORDER BY start_dt;", color: "#87A878" },
        { y: 129, code: "-- n = 10,847 records", color: "#C9F2EE" },
      ].map(({ y, code, color }) => (
        <text key={y} x="18" y={y} fontSize="5" fill={color} fillOpacity="0.45" fontFamily="monospace">{code}</text>
      ))}

      {/* ── Attrition funnel ───────────────────── */}
      <text x="222" y="70" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.35" fontFamily="monospace">COHORT ATTRITION</text>

      {[
        { label: "ELIGIBLE",  n: "10,847", w: 120 },
        { label: "EXPOSED",   n: "4,203",  w: 90 },
        { label: "MATCHED",   n: "3,891",  w: 72 },
        { label: "ANALYZED",  n: "3,891",  w: 72 },
      ].map(({ label, n, w }, i) => {
        const y = 78 + i * 16
        const x = 220 + (120 - w) / 2
        return (
          <g key={label}>
            <rect x={x} y={y} width={w} height="10" rx="2" fill="#C9F2EE" fillOpacity={0.08 + i * 0.01} />
            <rect x={x} y={y} width={w} height="10" rx="2" stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.25" fill="none" />
            <text x={x + 4} y={y + 7} fontSize="5" fill="#C9F2EE" fillOpacity="0.55" fontFamily="monospace">{label}</text>
            <text x={x + w - 4} y={y + 7} fontSize="5" fill="#C9F2EE" fillOpacity="0.70" fontFamily="monospace" textAnchor="end">{`n=${n}`}</text>
          </g>
        )
      })}

      {/* ── Config blocks ─── */}
      <text x="14" y="144" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.25" fontFamily="monospace">CONFIGURATION</text>
      <line x1="14" y1="147" x2="346" y2="147" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.12" />

      {[
        { label: "EXPOSURE", value: "GLP-1 RA", color: "#C9F2EE" },
        { label: "OUTCOME",  value: "ADE events", color: "#D9D1FF" },
        { label: "WASHOUT",  value: "90 days", color: "#87A878" },
        { label: "LOOKBACK", value: "365 days", color: "#C7FF35" },
      ].map(({ label, value, color }, i) => {
        const x = 14 + i * 84
        return (
          <g key={label}>
            <rect x={x} y="152" width="78" height="22" rx="4" fill={color} fillOpacity="0.05" stroke={color} strokeWidth="0.5" strokeOpacity="0.25" />
            <text x={x + 5} y="161" fontSize="5" fill={color} fillOpacity="0.45" fontFamily="monospace">{label}</text>
            <text x={x + 5} y="169.5" fontSize="5.5" fill={color} fillOpacity="0.80" fontFamily="monospace" fontWeight="500">{value}</text>
          </g>
        )
      })}

      {/* Diagnostics placeholder */}
      <text x="14" y="186" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.20" fontFamily="monospace">COHORT DIAGNOSTICS · SYNTHETIC DATA · OMOP-COMPATIBLE</text>

      {/* Bottom bar */}
      <rect x="14" y="195" width="332" height="24" rx="6" fill="#D9D1FF" fillOpacity="0.04" stroke="#D9D1FF" strokeWidth="0.4" strokeOpacity="0.15" />
      {["EXPOSURE", "OUTCOME", "TIME-AT-RISK", "DIAGNOSTICS", "EVIDENCE"].map((step, i) => (
        <text key={step} x={24 + i * 64} y="208" fontSize="5" fill="#D9D1FF" fillOpacity={0.20 + i * 0.08} fontFamily="monospace">{step}</text>
      ))}
    </svg>
  )
}

/* ─── Referral (Healthcare Operations) ────────────────────────────────────── */
function ReferralVisual({ className }: { className?: string }) {
  const providers = [
    { x: 80,  y: 60,  r: 5,   label: "CARDIO",   v: 0.8 },
    { x: 160, y: 40,  r: 4.5, label: "ORTHO",    v: 0.6 },
    { x: 235, y: 60,  r: 6,   label: "NEURO",    v: 1.0 },
    { x: 265, y: 120, r: 4,   label: "GI",       v: 0.5 },
    { x: 200, y: 155, r: 5,   label: "PULM",     v: 0.7 },
    { x: 100, y: 150, r: 4,   label: "ONCO",     v: 0.55 },
    { x: 55,  y: 115, r: 4.5, label: "ENDO",     v: 0.65 },
  ]

  return (
    <svg
      viewBox="0 0 360 230"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("w-full h-full", className)}
    >
      <defs>
        <radialGradient id="ref-bg" cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor="#0d2218" />
          <stop offset="100%" stopColor="#090B0C" />
        </radialGradient>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#87A878" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#87A878" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="360" height="230" fill="url(#ref-bg)" rx="12" />

      {/* Grid */}
      <g stroke="#87A878" strokeWidth="0.4" opacity="0.06">
        {[40, 80, 120, 160, 200].map((y) => (
          <line key={y} x1="0" y1={y} x2="360" y2={y} />
        ))}
        {[60, 120, 180, 240, 300].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="230" />
        ))}
      </g>

      {/* Header */}
      <text x="14" y="12" fontSize="6.5" fill="#87A878" fillOpacity="0.55" fontFamily="monospace" fontWeight="500">REFERRAL NETWORK ANALYTICS</text>
      <rect x="14" y="17" width="230" height="0.8" fill="#87A878" fillOpacity="0.12" />

      {/* ── Network left portion ─────────────────── */}
      {/* Hub: health system */}
      <circle cx="160" cy="108" r="24" fill="url(#hub-glow)" />
      <circle cx="160" cy="108" r="14" fill="#87A878" fillOpacity="0.14" stroke="#87A878" strokeWidth="1.2" strokeOpacity="0.50" />
      <text x="160" y="107" fontSize="5" fill="#87A878" fillOpacity="0.90" fontFamily="monospace" textAnchor="middle">HEALTH</text>
      <text x="160" y="114" fontSize="5" fill="#87A878" fillOpacity="0.90" fontFamily="monospace" textAnchor="middle">SYSTEM</text>

      {/* Connection lines to providers */}
      {providers.map((p) => (
        <line
          key={p.label}
          x1="160" y1="108"
          x2={p.x} y2={p.y}
          stroke={p.v >= 0.9 ? "#C7FF35" : "#87A878"}
          strokeWidth={0.5 + p.v * 1.8}
          strokeOpacity={0.2 + p.v * 0.35}
        />
      ))}

      {/* Provider nodes */}
      {providers.map((p) => (
        <g key={p.label}>
          <circle
            cx={p.x} cy={p.y} r={p.r}
            fill={p.v >= 0.9 ? "#C7FF35" : "#87A878"}
            fillOpacity={p.v >= 0.9 ? 0.85 : 0.45 + p.v * 0.2}
          />
          <text x={p.x} y={p.y - p.r - 2} fontSize="4.5" fill="#87A878" fillOpacity="0.50" fontFamily="monospace" textAnchor="middle">{p.label}</text>
        </g>
      ))}

      {/* Tier labels */}
      <text x="230" y="12" fontSize="5.5" fill="#87A878" fillOpacity="0.35" fontFamily="monospace">TIER 1</text>
      <text x="258" y="12" fontSize="5.5" fill="#87A878" fillOpacity="0.25" fontFamily="monospace">TIER 2</text>
      <text x="288" y="12" fontSize="5.5" fill="#87A878" fillOpacity="0.18" fontFamily="monospace">TIER 3</text>

      {/* ── Revenue trend chart (right side) ─── */}
      <line x1="293" y1="20" x2="293" y2="190" stroke="#87A878" strokeWidth="0.5" strokeOpacity="0.15" />
      <text x="295" y="12" fontSize="5.5" fill="#87A878" fillOpacity="0.35" fontFamily="monospace">REV INDEX</text>

      {[
        { h: 30, v: 0.35, q: "Q1" },
        { h: 48, v: 0.50, q: "Q2" },
        { h: 62, v: 0.65, q: "Q3" },
        { h: 90, v: 1.00, q: "Q4" },
      ].map(({ h, v, q }, i) => {
        const x = 296 + i * 16
        const y = 180 - h
        const isLast = i === 3
        return (
          <g key={q}>
            <rect x={x} y={y} width="12" height={h} rx="2"
              fill={isLast ? "#C7FF35" : "#87A878"}
              fillOpacity={isLast ? 0.70 : 0.20 + v * 0.25}
            />
            <text x={x + 6} y={180 + 8} fontSize="4.5" fill="#87A878" fillOpacity="0.40" fontFamily="monospace" textAnchor="middle">{q}</text>
          </g>
        )
      })}

      {/* +216% label */}
      <text x="334" y="82" fontSize="7.5" fill="#C7FF35" fillOpacity="0.85" fontFamily="monospace" textAnchor="middle">+216%</text>
      <text x="334" y="91" fontSize="5" fill="#87A878" fillOpacity="0.45" fontFamily="monospace" textAnchor="middle">revenue</text>

      {/* Baseline */}
      <line x1="294" y1="180" x2="360" y2="180" stroke="#87A878" strokeWidth="0.5" strokeOpacity="0.20" />

      {/* Bottom stats */}
      <rect x="14" y="192" width="266" height="24" rx="6" fill="#87A878" fillOpacity="0.04" stroke="#87A878" strokeWidth="0.4" strokeOpacity="0.15" />
      {[
        { label: "PARTNERS", val: "200+" },
        { label: "COVERAGE", val: "Regional" },
        { label: "WORKFLOW", val: "-45.5%" },
        { label: "EMR OPT.", val: "Active" },
      ].map(({ label, val }, i) => (
        <g key={label}>
          <text x={22 + i * 66} y="202" fontSize="4.5" fill="#87A878" fillOpacity="0.35" fontFamily="monospace">{label}</text>
          <text x={22 + i * 66} y="210" fontSize="6" fill="#87A878" fillOpacity="0.75" fontFamily="monospace">{val}</text>
        </g>
      ))}
    </svg>
  )
}

/* ─── Genomics (Genetic Risk Map) ─────────────────────────────────────────── */
function GenomicsVisual({ className }: { className?: string }) {
  const chromosomes = [
    { label: "CHR 1",  snps: [0.1, 0.3, 0.6, 0.85, 0.45, 0.7, 0.9],  len: 220 },
    { label: "CHR 6",  snps: [0.4, 0.7, 0.5, 0.3, 0.8, 0.6],          len: 190 },
    { label: "CHR 11", snps: [0.3, 0.5, 0.9, 0.4, 0.7],               len: 160 },
    { label: "CHR 17", snps: [0.6, 0.8, 0.4, 0.9, 0.5, 0.7],          len: 175 },
  ]

  return (
    <svg
      viewBox="0 0 360 220"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("w-full h-full", className)}
    >
      <defs>
        <radialGradient id="gen-bg" cx="40%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#1a1030" />
          <stop offset="100%" stopColor="#090B0C" />
        </radialGradient>
        <linearGradient id="chr-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D9D1FF" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#F1D7E4" stopOpacity="0.30" />
          <stop offset="85%" stopColor="#C7FF35" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#C7FF35" stopOpacity="0.10" />
        </linearGradient>
        <linearGradient id="risk-scale" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D9D1FF" stopOpacity="0.40" />
          <stop offset="50%" stopColor="#F1D7E4" stopOpacity="0.60" />
          <stop offset="100%" stopColor="#C7FF35" stopOpacity="0.80" />
        </linearGradient>
      </defs>

      <rect width="360" height="220" fill="url(#gen-bg)" rx="12" />

      {/* Grid */}
      <g stroke="#D9D1FF" strokeWidth="0.4" opacity="0.05">
        {[40, 80, 120, 160, 200].map((y) => (
          <line key={y} x1="0" y1={y} x2="360" y2={y} />
        ))}
      </g>

      {/* Header */}
      <text x="14" y="12" fontSize="6.5" fill="#D9D1FF" fillOpacity="0.50" fontFamily="monospace" fontWeight="500">GENETIC RISK MAP</text>
      <text x="286" y="12" fontSize="5.5" fill="#D9D1FF" fillOpacity="0.35" fontFamily="monospace">PRS · GWAS</text>
      <rect x="14" y="17" width="332" height="0.8" fill="#D9D1FF" fillOpacity="0.10" />

      {/* ── Chromosome tracks ─────────────────── */}
      {chromosomes.map(({ label, snps, len }, i) => {
        const y = 32 + i * 32
        const xStart = 52

        return (
          <g key={label}>
            {/* Label */}
            <text x="14" y={y + 8} fontSize="5.5" fill="#D9D1FF" fillOpacity="0.40" fontFamily="monospace">{label}</text>

            {/* Chromosome track */}
            <rect x={xStart} y={y} width={len} height="10" rx="5" fill="url(#chr-grad)" stroke="#D9D1FF" strokeWidth="0.4" strokeOpacity="0.20" />

            {/* SNP dots */}
            {snps.map((val, si) => {
              const x = xStart + (si + 0.5) * (len / snps.length)
              const isHigh = val >= 0.80
              return (
                <circle
                  key={si}
                  cx={x}
                  cy={y - 5}
                  r={isHigh ? 3 : 2}
                  fill={isHigh ? "#C7FF35" : "#D9D1FF"}
                  fillOpacity={isHigh ? 0.85 : 0.30 + val * 0.4}
                />
              )
            })}

            {/* Odds ratio annotation on high-risk SNP */}
            {i === 0 && (
              <text x={xStart + len * 0.72} y={y - 10} fontSize="4.5" fill="#C7FF35" fillOpacity="0.60" fontFamily="monospace">OR=1.8</text>
            )}
          </g>
        )
      })}

      {/* ── Risk scale ─────────────────────────── */}
      <text x="14" y="170" fontSize="5.5" fill="#D9D1FF" fillOpacity="0.30" fontFamily="monospace">POLYGENIC RISK SCORE</text>
      <rect x="14" y="174" width="200" height="8" rx="4" fill="url(#risk-scale)" />
      <text x="14" y="190" fontSize="5" fill="#D9D1FF" fillOpacity="0.30" fontFamily="monospace">LOW</text>
      <text x="104" y="190" fontSize="5" fill="#F1D7E4" fillOpacity="0.40" fontFamily="monospace" textAnchor="middle">AVERAGE</text>
      <text x="210" y="190" fontSize="5" fill="#C7FF35" fillOpacity="0.55" fontFamily="monospace" textAnchor="end">HIGH RISK</text>

      {/* PRS pointer */}
      <polygon points="156,172 159,167 162,172" fill="#C7FF35" fillOpacity="0.70" />
      <line x1="159" y1="167" x2="159" y2="160" stroke="#C7FF35" strokeWidth="0.6" strokeOpacity="0.50" />
      <text x="159" y="157" fontSize="5" fill="#C7FF35" fillOpacity="0.55" fontFamily="monospace" textAnchor="middle">PRS</text>

      {/* Bottom metadata labels */}
      <text x="14" y="206" fontSize="5.5" fill="#D9D1FF" fillOpacity="0.20" fontFamily="monospace">LOCUS · ALLELE FREQ · EFFECT SIZE · POPULATION STRATIFICATION</text>

      {/* Network scatter dots (right side) */}
      {[
        [295, 50], [315, 40], [330, 65], [305, 80], [340, 50],
        [320, 95], [295, 110], [340, 105], [315, 125],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2 + (i % 3)} fill="#D9D1FF" fillOpacity={0.10 + (i % 4) * 0.06} />
      ))}
      {[[310, 60], [325, 90]].map(([x, y], i) => (
        <circle key={`h${i}`} cx={x} cy={y} r="3.5" fill="#C7FF35" fillOpacity="0.45" />
      ))}
    </svg>
  )
}

/* ─── Vaccination (HPV Analytics) ─────────────────────────────────────────── */
function VaccinationVisual({ className }: { className?: string }) {
  const features = [
    { label: "Insurance",  importance: 0.28, w: 168 },
    { label: "Income",     importance: 0.18, w: 108 },
    { label: "Education",  importance: 0.14, w: 84 },
    { label: "Age",        importance: 0.12, w: 72 },
    { label: "Sex",        importance: 0.10, w: 60 },
  ]

  return (
    <svg
      viewBox="0 0 360 220"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("w-full h-full", className)}
    >
      <defs>
        <radialGradient id="vac-bg" cx="35%" cy="60%" r="80%">
          <stop offset="0%" stopColor="#0e1f15" />
          <stop offset="100%" stopColor="#090B0C" />
        </radialGradient>
      </defs>

      <rect width="360" height="220" fill="url(#vac-bg)" rx="12" />

      {/* Grid */}
      <g stroke="#87A878" strokeWidth="0.4" opacity="0.06">
        {[40, 80, 120, 160, 200].map((y) => (
          <line key={y} x1="0" y1={y} x2="360" y2={y} />
        ))}
      </g>

      {/* Header */}
      <text x="14" y="12" fontSize="6.5" fill="#87A878" fillOpacity="0.55" fontFamily="monospace" fontWeight="500">HPV VACCINATION ANALYTICS</text>
      <text x="290" y="12" fontSize="5.5" fill="#C7FF35" fillOpacity="0.50" fontFamily="monospace">RF</text>
      <rect x="14" y="17" width="332" height="0.8" fill="#87A878" fillOpacity="0.12" />

      {/* ── Feature importance chart ──────────── */}
      <text x="14" y="28" fontSize="5.5" fill="#87A878" fillOpacity="0.35" fontFamily="monospace">FEATURE IMPORTANCE (RANDOM FOREST)</text>

      {features.map(({ label, importance, w }, i) => {
        const y = 35 + i * 22
        const isTop = i === 0
        return (
          <g key={label}>
            {/* Feature label */}
            <text x="14" y={y + 8} fontSize="5.5" fill="#87A878" fillOpacity={isTop ? 0.80 : 0.50} fontFamily="monospace">{label}</text>

            {/* Bar */}
            <rect x="80" y={y} width={w} height="11" rx="3"
              fill={isTop ? "#C7FF35" : "#87A878"}
              fillOpacity={isTop ? 0.65 : 0.20 + importance * 0.5}
            />

            {/* Value */}
            <text x={80 + w + 6} y={y + 8} fontSize="5.5" fill={isTop ? "#C7FF35" : "#87A878"} fillOpacity={isTop ? 0.80 : 0.55} fontFamily="monospace">{importance.toFixed(2)}</text>
          </g>
        )
      })}

      {/* Axis */}
      <line x1="80" y1="145" x2="280" y2="145" stroke="#87A878" strokeWidth="0.5" strokeOpacity="0.18" />
      <text x="80" y="152" fontSize="4.5" fill="#87A878" fillOpacity="0.25" fontFamily="monospace">0.00</text>
      <text x="268" y="152" fontSize="4.5" fill="#87A878" fillOpacity="0.25" fontFamily="monospace">0.28</text>

      {/* ── 5-Fold CV indicator ────────────────── */}
      <text x="14" y="168" fontSize="5.5" fill="#87A878" fillOpacity="0.30" fontFamily="monospace">5-FOLD CROSS-VALIDATION</text>
      {[0, 1, 2, 3, 4].map((fold) => (
        <rect
          key={fold}
          x={14 + fold * 28}
          y="172"
          width="22"
          height="12"
          rx="3"
          fill={fold === 4 ? "#C7FF35" : "#87A878"}
          fillOpacity={fold === 4 ? 0.60 : 0.12}
          stroke={fold === 4 ? "#C7FF35" : "#87A878"}
          strokeWidth="0.5"
          strokeOpacity={fold === 4 ? 0.60 : 0.20}
        />
      ))}
      {[0, 1, 2, 3, 4].map((fold) => (
        <text key={fold} x={25 + fold * 28} y="180" fontSize="5" fill={fold === 4 ? "#C7FF35" : "#87A878"} fillOpacity={fold === 4 ? 0.80 : 0.40} fontFamily="monospace" textAnchor="middle">{`F${fold + 1}`}</text>
      ))}

      {/* ── Demographic breakdown (right side) ── */}
      <text x="200" y="35" fontSize="5.5" fill="#87A878" fillOpacity="0.30" fontFamily="monospace">UPTAKE BY SEGMENT</text>
      <line x1="200" y1="38" x2="346" y2="38" stroke="#87A878" strokeWidth="0.4" strokeOpacity="0.12" />

      {[
        { label: "Under 26", vac: 0.72, unvac: 0.28 },
        { label: "26-45",    vac: 0.48, unvac: 0.52 },
        { label: "45+",      vac: 0.22, unvac: 0.78 },
      ].map(({ label, vac, unvac }, i) => {
        const y = 44 + i * 28
        return (
          <g key={label}>
            <text x="200" y={y + 5} fontSize="5" fill="#87A878" fillOpacity="0.40" fontFamily="monospace">{label}</text>
            <rect x="244" y={y - 2} width={Math.round(vac * 80)} height="8" rx="2" fill="#87A878" fillOpacity="0.55" />
            <rect x={244 + Math.round(vac * 80)} y={y - 2} width={Math.round(unvac * 80)} height="8" rx="2" fill="#87A878" fillOpacity="0.12" />
            <text x="330" y={y + 5} fontSize="5" fill="#87A878" fillOpacity="0.45" fontFamily="monospace">{`${Math.round(vac * 100)}%`}</text>
          </g>
        )
      })}

      <text x="244" y="130" fontSize="4.5" fill="#87A878" fillOpacity="0.25" fontFamily="monospace">Vaccinated</text>
      <rect x="244" y="133" width="8" height="4" rx="1" fill="#87A878" fillOpacity="0.55" />
      <text x="256" y="137" fontSize="4.5" fill="#87A878" fillOpacity="0.25" fontFamily="monospace">Not vaccinated</text>
      <rect x="244" y="139" width="8" height="4" rx="1" fill="#87A878" fillOpacity="0.12" />

      {/* Bottom method labels */}
      <rect x="14" y="192" width="332" height="18" rx="5" fill="#87A878" fillOpacity="0.04" stroke="#87A878" strokeWidth="0.4" strokeOpacity="0.14" />
      {["NHANES", "BRFSS", "RANDOM FOREST", "5-FOLD CV", "FEATURE IMPORTANCE"].map((tag, i) => (
        <text key={tag} x={20 + i * 66} y="203" fontSize="5" fill="#87A878" fillOpacity={0.25 + i * 0.04} fontFamily="monospace">{tag}</text>
      ))}
    </svg>
  )
}

/* ─── Public export ────────────────────────────────────────────────────────── */
interface ProjectVisualProps {
  variant: ProjectVisualVariant
  className?: string
  /** "homepage" → tall 5-panel portrait; "compact" → landscape overview */
  context?: "homepage" | "compact"
}

export function ProjectVisual({ variant, className, context = "homepage" }: ProjectVisualProps) {
  switch (variant) {
    case "signal":     return context === "compact"
                         ? <SignalVisualCompact className={className} />
                         : <SignalVisual className={className} />
    case "cohort":     return <CohortVisual className={className} />
    case "referral":   return <ReferralVisual className={className} />
    case "genomics":   return <GenomicsVisual className={className} />
    case "vaccination":return <VaccinationVisual className={className} />
  }
}
