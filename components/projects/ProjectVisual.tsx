import { cn } from "@/lib/utils"
import type { ProjectVisualVariant } from "@/content/projects"

/* ─── Signal (GLP-1 Pharmacovigilance) ────────────────────────────────────── */
function SignalVisual({ className }: { className?: string }) {
  const sexEvents     = ["GI", "META", "ENDO", "CARD"]
  const femaleSignals = [0.8, 0.4, 0.6, 1.0]
  const maleSignals   = [0.5, 0.9, 0.3, 0.7]

  const matrixCols   = ["Q1", "Q2", "Q3", "Q4"]
  const matrixEvents = ["GI", "META", "ENDO", "CARD"]
  const matrixSignals: number[][] = [
    [0.3, 0.5, 0.9, 0.7],
    [0.6, 0.4, 0.5, 1.0],
    [0.2, 0.7, 0.4, 0.6],
    [0.5, 0.3, 0.8, 0.4],
  ]

  const forestMarks = [
    { label: "GI · ♀",   lo: 88,  hi: 172, point: 148, y: 278 },
    { label: "META · ♂", lo: 76,  hi: 174, point: 122, y: 298 },
    { label: "ENDO · ♀", lo: 103, hi: 174, point: 141, y: 318 },
  ]

  const trendDots: [number, number][] = [
    [12, 355], [66, 353], [120, 348], [174, 344], [228, 342],
  ]

  return (
    <svg
      viewBox="0 0 240 420"
      preserveAspectRatio="xMidYMid slice"
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

      {/* Background — covers full 240×420 so slice never shows card bg */}
      <rect width="240" height="420" fill="url(#sig-bg)" />

      {/* Subtle grid */}
      <g stroke="#C9F2EE" strokeWidth="0.4" opacity="0.05">
        {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400].map((y) => (
          <line key={y} x1="0" y1={y} x2="240" y2={y} />
        ))}
        {[60, 120, 180].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="420" />
        ))}
      </g>

      {/* ── Header (y: 0-52 — decorative, partially clips on wide viewports) ── */}
      <text x="12" y="18" fontSize="6.5" fill="#C9F2EE" fillOpacity="0.50" fontFamily="monospace" fontWeight="500">FAERS SIGNAL ANALYSIS</text>
      <text x="165" y="18" fontSize="5.5" fill="#C7FF35" fillOpacity="0.75" fontFamily="monospace">ONGOING</text>
      <text x="12" y="29" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.28" fontFamily="monospace">GLP-1 PHARMACOVIGILANCE</text>
      <text x="12" y="40" fontSize="5" fill="#C9F2EE" fillOpacity="0.16" fontFamily="monospace">SIGNAL DETECTION · HYPOTHESIS-GENERATING</text>
      <rect x="12" y="46" width="216" height="0.7" fill="#C9F2EE" fillOpacity="0.10" />

      {/* ── Section 1: Sex-stratified analysis (y: 53-141) ── */}
      <text x="12" y="64" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.42" fontFamily="monospace">SEX-STRATIFIED ANALYSIS</text>
      <text x="122" y="74" fontSize="5.5" fill="#D9D1FF" fillOpacity="0.65" fontFamily="monospace" textAnchor="middle">♀ F</text>
      <text x="192" y="74" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.65" fontFamily="monospace" textAnchor="middle">♂ M</text>
      <rect x="12" y="78" width="216" height="0.6" fill="#C9F2EE" fillOpacity="0.08" />

      {sexEvents.map((evt, i) => {
        const rowY = 90 + i * 13
        const fv   = femaleSignals[i]
        const mv   = maleSignals[i]
        const fMax = fv >= 0.95
        const mMax = mv >= 0.85
        return (
          <g key={evt}>
            <text x="12" y={rowY + 4} fontSize="5.5" fill="#C9F2EE" fillOpacity="0.35" fontFamily="monospace">{evt}</text>
            <circle cx="122" cy={rowY + 2} r={2.5 + fv * 5.5}
              fill={fMax ? "#C7FF35" : "#D9D1FF"}
              fillOpacity={fMax ? 0.85 : 0.25 + fv * 0.50} />
            <circle cx="192" cy={rowY + 2} r={2.5 + mv * 5.5}
              fill={mMax ? "#C7FF35" : "#C9F2EE"}
              fillOpacity={mMax ? 0.85 : 0.25 + mv * 0.50} />
          </g>
        )
      })}

      <rect x="12" y="141" width="216" height="0.6" fill="#C9F2EE" fillOpacity="0.10" />

      {/* ── Section 2: Adverse event matrix (y: 143-245) ── */}
      <text x="12" y="153" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.42" fontFamily="monospace">ADVERSE EVENT MATRIX</text>
      {matrixCols.map((col, ci) => (
        <text key={col} x={68 + ci * 40} y="163" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.35" fontFamily="monospace" textAnchor="middle">{col}</text>
      ))}
      <rect x="12" y="167" width="216" height="0.6" fill="#C9F2EE" fillOpacity="0.08" />

      {matrixEvents.map((evt, ri) => {
        const rowY = 178 + ri * 17
        return (
          <g key={`m-${evt}`}>
            <text x="12" y={rowY + 4} fontSize="5.5" fill="#C9F2EE" fillOpacity="0.30" fontFamily="monospace">{evt}</text>
            {matrixSignals[ri].map((val, ci) => {
              const isHigh = val >= 0.85
              return (
                <circle key={ci}
                  cx={68 + ci * 40} cy={rowY + 2}
                  r={2 + val * 5}
                  fill={isHigh ? "#C7FF35" : "#C9F2EE"}
                  fillOpacity={isHigh ? 0.85 : 0.20 + val * 0.50} />
              )
            })}
          </g>
        )
      })}

      <rect x="12" y="245" width="216" height="0.6" fill="#C9F2EE" fillOpacity="0.10" />

      {/* ── Section 3: Disproportionality marks (y: 247-325) ── */}
      <text x="12" y="257" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.38" fontFamily="monospace">DISPROPORTIONALITY MARKS</text>
      <rect x="12" y="261" width="216" height="0.5" fill="#C9F2EE" fillOpacity="0.07" />

      {/* Unity / null reference */}
      <line x1="130" y1="266" x2="130" y2="324" stroke="#C9F2EE" strokeWidth="0.6" strokeOpacity="0.15" strokeDasharray="2 2" />
      <text x="130" y="264" fontSize="4.5" fill="#C9F2EE" fillOpacity="0.20" fontFamily="monospace" textAnchor="middle">null</text>

      {forestMarks.map((fp, i) => {
        const above = fp.point > 130
        return (
          <g key={i}>
            <text x="12" y={fp.y + 2} fontSize="4.5" fill="#C9F2EE" fillOpacity="0.38" fontFamily="monospace">{fp.label}</text>
            <line x1={fp.lo} y1={fp.y} x2={fp.hi} y2={fp.y} stroke="#C9F2EE" strokeWidth="0.8" strokeOpacity="0.30" />
            <line x1={fp.lo}  y1={fp.y - 2.5} x2={fp.lo}  y2={fp.y + 2.5} stroke="#C9F2EE" strokeWidth="0.8" strokeOpacity="0.28" />
            <line x1={fp.hi}  y1={fp.y - 2.5} x2={fp.hi}  y2={fp.y + 2.5} stroke="#C9F2EE" strokeWidth="0.8" strokeOpacity="0.28" />
            <rect
              x={fp.point - 4} y={fp.y - 4} width="8" height="8"
              fill={above ? "#C7FF35" : "#C9F2EE"}
              fillOpacity={above ? 0.80 : 0.55}
              transform={`rotate(45 ${fp.point} ${fp.y})`}
            />
          </g>
        )
      })}

      <rect x="12" y="325" width="216" height="0.6" fill="#C9F2EE" fillOpacity="0.10" />

      {/* ── Section 4: Quarterly signal trend (y: 327-370) ── */}
      <text x="12" y="337" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.38" fontFamily="monospace">QUARTERLY SIGNAL TREND</text>
      <rect x="12" y="341" width="216" height="0.5" fill="#C9F2EE" fillOpacity="0.07" />

      <path
        d="M12,355 C35,350 50,358 66,353 C83,348 100,353 120,348 C140,343 156,350 174,344 C192,339 210,346 228,342"
        fill="none" stroke="#C9F2EE" strokeWidth="1" strokeOpacity="0.40"
      />
      {trendDots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2"
          fill={i === 4 ? "#C7FF35" : "#C9F2EE"}
          fillOpacity={i === 4 ? 0.90 : 0.48} />
      ))}

      {/* ── Footer (y: 380-420 — decorative, clips on most viewports) ── */}
      <text x="12" y="392" fontSize="5" fill="#C9F2EE" fillOpacity="0.14" fontFamily="monospace">HYPOTHESIS-GENERATING ONLY</text>
      <text x="12" y="405" fontSize="5" fill="#C9F2EE" fillOpacity="0.10" fontFamily="monospace">ROR · PRR · FAERS · DEDUPLICATION</text>
      <text x="12" y="418" fontSize="5" fill="#C9F2EE" fillOpacity="0.07" fontFamily="monospace">DATA PIPELINE · SIGNAL DETECTION</text>
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
      <rect x="278" y="5" width="70" height="11" rx="5" fill="#D9D1FF" fillOpacity="0.10" stroke="#D9D1FF" strokeWidth="0.5" strokeOpacity="0.3" />
      <text x="285" y="12.5" fontSize="5.5" fill="#D9D1FF" fillOpacity="0.65" fontFamily="monospace">IN DEVELOPMENT</text>
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
}

export function ProjectVisual({ variant, className }: ProjectVisualProps) {
  switch (variant) {
    case "signal":     return <SignalVisual className={className} />
    case "cohort":     return <CohortVisual className={className} />
    case "referral":   return <ReferralVisual className={className} />
    case "genomics":   return <GenomicsVisual className={className} />
    case "vaccination":return <VaccinationVisual className={className} />
  }
}
