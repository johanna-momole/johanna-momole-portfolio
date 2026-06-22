// Four polished output preview SVGs for the RWE Evidence Studio case study.
// All data is illustrative and based on synthetic patient counts.
// Visual language matches the portfolio dark theme: lilac / aqua / chartreuse accents.

// ── 1. Cohort Attrition Funnel ────────────────────────────────────────────────

export function RweAttritionFunnelSVG() {
  const steps = [
    { label: "Source population",         n: "128,400", barW: 220, color: "#D9D1FF", excl: null },
    { label: "Eligibility criteria met",  n: "38,200",  barW: 121, color: "#D9D1FF", excl: "−90,200 excluded" },
    { label: "New drug initiators",       n: "14,640",  barW: 76,  color: "#C9F2EE", excl: "−23,560 excluded" },
    { label: "Propensity score matched",  n: "10,520",  barW: 64,  color: "#C9F2EE", excl: "−4,120 excluded" },
    { label: "Final analysis cohort",     n: "9,840",   barW: 62,  color: "#C7FF35", excl: "−680 excluded" },
  ] as const

  return (
    <svg
      viewBox="0 0 300 186"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full"
    >
      <rect width="300" height="186" fill="#060D18" />

      {/* Header */}
      <text x="8" y="13" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.45" fontFamily="monospace" fontWeight="500" letterSpacing="1.5">
        COHORT ATTRITION · OMOP CDM POPULATION
      </text>
      <line x1="8" y1="18" x2="292" y2="18" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.12" />

      {steps.map((step, i) => {
        const rowY   = 22 + i * 32
        const barY   = rowY + 2
        const barX   = 150 - step.barW / 2
        const isLast = i === steps.length - 1

        return (
          <g key={step.label}>
            {/* Background rail */}
            <rect x="8" y={barY} width="284" height="14" rx="3"
              fill="white" fillOpacity="0.015"
              stroke={step.color} strokeWidth="0.35" strokeOpacity="0.14" />
            {/* Proportional fill */}
            <rect x={barX} y={barY} width={step.barW} height="14" rx="3"
              fill={step.color} fillOpacity={isLast ? 0.26 : 0.12} />
            {/* Step label */}
            <text x="14" y={rowY + 12} fontSize="5.5" fill={step.color} fillOpacity="0.68"
              fontFamily="monospace">{step.label}</text>
            {/* N count — prominent right side */}
            <text x="290" y={rowY + 12} fontSize="6.5" fill={step.color} fillOpacity="0.90"
              fontFamily="monospace" fontWeight="bold" textAnchor="end">{step.n}</text>

            {!isLast && (
              <>
                {/* Dashed connector */}
                <line x1="150" y1={barY + 14} x2="150" y2={rowY + 34}
                  stroke={step.color} strokeWidth="0.6" strokeOpacity="0.18" strokeDasharray="2 2" />
                {/* Exclusion count, right-aligned */}
                {step.excl && (
                  <text x="290" y={rowY + 26} fontSize="4.5" fill={step.color} fillOpacity="0.40"
                    fontFamily="monospace" textAnchor="end">{step.excl}</text>
                )}
              </>
            )}
          </g>
        )
      })}

      {/* Footer */}
      <line x1="8" y1="178" x2="292" y2="178" stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.08" />
      <text x="8" y="184" fontSize="4.5" fill="#C9F2EE" fillOpacity="0.28" fontFamily="monospace">
        Illustrative counts · synthetic OMOP CDM cohort · T2D comparative effectiveness
      </text>
    </svg>
  )
}

// ── 2. Generated SQL Workspace ────────────────────────────────────────────────

export function RweSqlWorkspaceSVG() {
  const paramChips = [
    { key: "POPULATION",  val: "T2D 40–75" },
    { key: "EXPOSURE",    val: "GLP-1" },
    { key: "COMPARATOR",  val: "DPP-4i" },
    { key: "INDEX",       val: "First Rx" },
    { key: "BASELINE",    val: "−365 d" },
    { key: "FOLLOW-UP",   val: "+180 d" },
  ] as const

  const sqlLines = [
    { n:  1, text: "-- New-user active-comparator cohort",   color: "#C9F2EE", op: 0.28 },
    { n:  2, text: "-- GLP-1 agonist vs DPP-4 inhibitor",    color: "#C9F2EE", op: 0.28 },
    { n:  3, text: "-- OMOP CDM v5.4  ·  RWE Evidence Studio", color: "#C9F2EE", op: 0.22 },
    { n:  4, text: "",                                         color: "#C9F2EE", op: 0 },
    { n:  5, text: "WITH initiators AS (",                    color: "#D9D1FF", op: 0.75 },
    { n:  6, text: "  SELECT de.person_id,",                  color: "#C7FF35", op: 0.65 },
    { n:  7, text: "    MIN(drug_exposure_start_date)",       color: "#C9F2EE", op: 0.58 },
    { n:  8, text: "      AS index_date",                     color: "#C9F2EE", op: 0.52 },
    { n:  9, text: "  FROM   drug_exposure  de",              color: "#D9D1FF", op: 0.65 },
    { n: 10, text: "  JOIN   observation_period  op",         color: "#D9D1FF", op: 0.58 },
    { n: 11, text: "    ON   de.person_id = op.person_id",    color: "#C9F2EE", op: 0.48 },
    { n: 12, text: "  WHERE  de.drug_concept_id",             color: "#C9F2EE", op: 0.52 },
    { n: 13, text: "           IN ( :glp1_concept_set )",     color: "#C7FF35", op: 0.62 },
    { n: 14, text: "  GROUP BY de.person_id",                 color: "#C9F2EE", op: 0.48 },
    { n: 15, text: ")",                                        color: "#D9D1FF", op: 0.75 },
  ] as const

  const CHIP_W = 46
  const CHIP_X_START = 6

  return (
    <svg
      viewBox="0 0 300 202"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full"
    >
      {/* Background */}
      <rect width="300" height="202" fill="#050A14" />

      {/* Title bar */}
      <rect width="300" height="18" fill="#0A1628" />
      <text x="8" y="12" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.42" fontFamily="monospace" fontWeight="500" letterSpacing="1.5">
        SQL WORKSPACE · OMOP CDM QUERY BUILDER
      </text>
      {/* Window control dots */}
      <circle cx="270" cy="9" r="3" fill="#C9F2EE" fillOpacity="0.10" />
      <circle cx="280" cy="9" r="3" fill="#C9F2EE" fillOpacity="0.07" />
      <circle cx="290" cy="9" r="3" fill="#C9F2EE" fillOpacity="0.04" />
      <line x1="0" y1="18" x2="300" y2="18" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.12" />

      {/* Cohort parameter chips */}
      {paramChips.map((chip, i) => {
        const cx = CHIP_X_START + i * (CHIP_W + 4)
        return (
          <g key={chip.key}>
            <rect x={cx} y="21" width={CHIP_W} height="20" rx="3"
              fill="#C9F2EE" fillOpacity="0.04" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.18" />
            <text x={cx + CHIP_W / 2} y="30" fontSize="4" fill="#C9F2EE" fillOpacity="0.38"
              fontFamily="monospace" textAnchor="middle" fontWeight="500" letterSpacing="0.5">{chip.key}</text>
            <text x={cx + CHIP_W / 2} y="38" fontSize="5" fill="#C9F2EE" fillOpacity="0.72"
              fontFamily="monospace" textAnchor="middle">{chip.val}</text>
          </g>
        )
      })}

      <line x1="0" y1="43" x2="300" y2="43" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.10" />

      {/* Code area background */}
      <rect x="0" y="43" width="300" height="149" fill="#040810" />

      {/* Line number gutter */}
      <rect x="0" y="43" width="22" height="149" fill="#060C18" />
      <line x1="22" y1="43" x2="22" y2="192" stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.10" />

      {/* SQL lines */}
      {sqlLines.map((line, i) => {
        const y = 53 + i * 10
        return (
          <g key={i}>
            {/* Line number */}
            <text x="18" y={y} fontSize="4" fill="#C9F2EE" fillOpacity="0.20"
              fontFamily="monospace" textAnchor="end">{line.n}</text>
            {/* Code text */}
            {line.text && (
              <text x="27" y={y} fontSize="4.8" fill={line.color} fillOpacity={line.op}
                fontFamily="monospace">{line.text}</text>
            )}
          </g>
        )
      })}

      {/* Status bar */}
      <rect x="0" y="192" width="300" height="10" fill="#07101C" />
      <line x1="0" y1="192" x2="300" y2="192" stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.10" />
      <text x="8" y="199" fontSize="4" fill="#C9F2EE" fillOpacity="0.28" fontFamily="monospace">
        OMOP CDM v5.4 · 5 tables · washout 90d · new-user design · v3.1.0
      </text>
    </svg>
  )
}

// ── 3. Cohort Diagnostics: Baseline Balance ───────────────────────────────────

export function RweBaselineBalanceSVG() {
  // x-axis: SMD 0 to 0.40, mapped to x=90 to x=260 (170px)
  const X_ZERO    = 90
  const SMD_MAX   = 0.40
  const AXIS_W    = 170
  const thresh    = X_ZERO + (0.10 / SMD_MAX) * AXIS_W  // x=132.5

  const covariates = [
    { label: "Age, years",          pre: 0.24, post: 0.04 },
    { label: "Female sex",          pre: 0.18, post: 0.03 },
    { label: "Diabetes dur. >5y",   pre: 0.31, post: 0.06 },
    { label: "HbA1c >= 8%",         pre: 0.22, post: 0.05 },
    { label: "CV disease history",  pre: 0.28, post: 0.04 },
    { label: "CKD stage 3+",        pre: 0.15, post: 0.03 },
    { label: "Insulin prior use",   pre: 0.19, post: 0.07 },
    { label: "ACEI / ARB use",      pre: 0.12, post: 0.02 },
  ] as const

  const ROW_START = 36
  const ROW_SPACE = 16

  return (
    <svg
      viewBox="0 0 300 196"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full"
    >
      <rect width="300" height="196" fill="#060D18" />

      {/* Header */}
      <text x="8" y="12" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.45" fontFamily="monospace" fontWeight="500" letterSpacing="1.5">
        BASELINE BALANCE · STANDARDIZED MEAN DIFFERENCE
      </text>
      <line x1="8" y1="17" x2="292" y2="17" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.12" />

      {/* Column headers */}
      <text x="88" y="26" fontSize="4.5" fill="#C9F2EE" fillOpacity="0.32" fontFamily="monospace" textAnchor="end">COVARIATE</text>
      <text x={(X_ZERO + (0.1 / SMD_MAX) * AXIS_W)} y="26" fontSize="4.5" fill="#C7FF35" fillOpacity="0.45" fontFamily="monospace" textAnchor="middle">0.10 threshold</text>

      {/* Threshold guideline */}
      <line x1={thresh} y1="28" x2={thresh} y2="163"
        stroke="#C7FF35" strokeWidth="0.8" strokeDasharray="3 2" strokeOpacity="0.32" />

      {/* Vertical grid lines (0.0, 0.2, 0.3, 0.4) */}
      {[0, 0.2, 0.3, 0.4].map((tick) => {
        const x = X_ZERO + (tick / SMD_MAX) * AXIS_W
        return <line key={tick} x1={x} y1="28" x2={x} y2="163"
          stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.06" />
      })}

      {/* Covariate rows */}
      {covariates.map((cov, i) => {
        const y    = ROW_START + i * ROW_SPACE
        const xPre  = X_ZERO + (cov.pre  / SMD_MAX) * AXIS_W
        const xPost = X_ZERO + (cov.post / SMD_MAX) * AXIS_W

        return (
          <g key={cov.label}>
            {/* Covariate label */}
            <text x="86" y={y + 3} fontSize="5" fill="#D9D1FF" fillOpacity="0.58"
              fontFamily="monospace" textAnchor="end">{cov.label}</text>
            {/* Improvement arrow line */}
            <line x1={xPost + 4} y1={y} x2={xPre - 4} y2={y}
              stroke="#D9D1FF" strokeWidth="0.6" strokeOpacity="0.20" />
            {/* Pre-matching dot (open circle) */}
            <circle cx={xPre} cy={y} r="3.5"
              fill="#D9D1FF" fillOpacity="0.06"
              stroke="#D9D1FF" strokeWidth="1" strokeOpacity="0.55" />
            {/* Post-matching dot (filled) */}
            <circle cx={xPost} cy={y} r="3.5"
              fill="#C9F2EE" fillOpacity="0.80" />
          </g>
        )
      })}

      {/* X axis line */}
      <line x1={X_ZERO} y1="163" x2="263" y2="163"
        stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.18" />

      {/* X axis tick labels */}
      {[0, 0.1, 0.2, 0.3, 0.4].map((tick) => {
        const x = X_ZERO + (tick / SMD_MAX) * AXIS_W
        return (
          <g key={tick}>
            <line x1={x} y1="163" x2={x} y2="166" stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.25" />
            <text x={x} y="173" fontSize="4.5" fill="#C9F2EE" fillOpacity="0.38"
              fontFamily="monospace" textAnchor="middle">{tick.toFixed(1)}</text>
          </g>
        )
      })}
      <text x="175" y="181" fontSize="4.5" fill="#C9F2EE" fillOpacity="0.30"
        fontFamily="monospace" textAnchor="middle">Standardized Mean Difference (SMD)</text>

      {/* Legend */}
      <circle cx="96"  cy="190" r="3.5" fill="#D9D1FF" fillOpacity="0.06" stroke="#D9D1FF" strokeWidth="1" strokeOpacity="0.55" />
      <text x="103" y="193" fontSize="4.8" fill="#D9D1FF" fillOpacity="0.55" fontFamily="monospace">Before matching</text>
      <circle cx="192" cy="190" r="3.5" fill="#C9F2EE" fillOpacity="0.80" />
      <text x="199" y="193" fontSize="4.8" fill="#C9F2EE" fillOpacity="0.68" fontFamily="monospace">After PS matching</text>
    </svg>
  )
}

// ── 4. Evidence Brief Summary ─────────────────────────────────────────────────

export function RweEvidenceBriefSVG() {
  // Mini forest plot: HR axis 0.6 to 1.3 → x=28 to x=272 (244px)
  const FP_X0   = 28
  const FP_W    = 244
  const HR_MIN  = 0.60
  const HR_MAX  = 1.30
  const hrX = (hr: number) => FP_X0 + ((hr - HR_MIN) / (HR_MAX - HR_MIN)) * FP_W
  const nullX   = hrX(1.0)  // ≈ 181
  const ptX     = hrX(0.83) // ≈ 122
  const loX     = hrX(0.74) // ≈ 95
  const hiX     = hrX(0.92) // ≈ 148

  return (
    <svg
      viewBox="0 0 300 202"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full"
    >
      <rect width="300" height="202" fill="#060D18" />

      {/* ── Header band ─────────────────────────────────────── */}
      <rect width="300" height="20" fill="#0A1628" />
      <text x="8" y="13" fontSize="5.5" fill="#C9F2EE" fillOpacity="0.52" fontFamily="monospace" fontWeight="500" letterSpacing="1.5">
        EVIDENCE BRIEF
      </text>
      <rect x="212" y="4" width="80" height="12" rx="3"
        fill="#C7FF35" fillOpacity="0.06" stroke="#C7FF35" strokeWidth="0.4" strokeOpacity="0.28" />
      <text x="252" y="12" fontSize="4" fill="#C7FF35" fillOpacity="0.55"
        fontFamily="monospace" textAnchor="middle" letterSpacing="0.5">SYNTHETIC DATA</text>
      <line x1="0" y1="20" x2="300" y2="20" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.12" />

      {/* ── Study question ──────────────────────────────────── */}
      <text x="8" y="30" fontSize="4" fill="#C9F2EE" fillOpacity="0.38" fontFamily="monospace" letterSpacing="1">STUDY QUESTION</text>
      <text x="8" y="41" fontSize="6" fill="#C9F2EE" fillOpacity="0.78" fontFamily="monospace">GLP-1 agonist vs. DPP-4 inhibitor</text>
      <text x="8" y="51" fontSize="6" fill="#C9F2EE" fillOpacity="0.78" fontFamily="monospace">All-cause hospitalization · T2D adults 40–75</text>

      {/* ── Design chips ────────────────────────────────────── */}
      <line x1="8" y1="56" x2="292" y2="56" stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.08" />
      {[
        { label: "T2D ADULTS",       color: "#D9D1FF", x: 8   },
        { label: "GLP-1 AGONIST",    color: "#C9F2EE", x: 82  },
        { label: "DPP-4 INHIBITOR",  color: "#F1D7E4", x: 162 },
        { label: "HOSPITALIZATION",  color: "#C7FF35", x: 221 },
      ].map((chip) => (
        <g key={chip.label}>
          <rect x={chip.x} y="59" width={chip.x < 82 ? 70 : chip.x < 162 ? 76 : chip.x < 221 ? 55 : 71} height="12" rx="3"
            fill={chip.color} fillOpacity="0.05" stroke={chip.color} strokeWidth="0.4" strokeOpacity="0.22" />
          <text
            x={chip.x + (chip.x < 82 ? 35 : chip.x < 162 ? 38 : chip.x < 221 ? 27.5 : 35.5)}
            y="67.5"
            fontSize="3.8" fill={chip.color} fillOpacity="0.62"
            fontFamily="monospace" textAnchor="middle" letterSpacing="0.4">{chip.label}</text>
        </g>
      ))}

      {/* ── Primary result ──────────────────────────────────── */}
      <line x1="8" y1="75" x2="292" y2="75" stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.08" />
      <text x="8" y="84" fontSize="4" fill="#C7FF35" fillOpacity="0.45" fontFamily="monospace" letterSpacing="1">PRIMARY RESULT · ANY HOSPITALIZATION AT 6 MONTHS</text>

      {/* Large HR */}
      <text x="150" y="103" fontSize="22" fill="#C7FF35" fillOpacity="0.90"
        fontFamily="monospace" fontWeight="bold" textAnchor="middle">HR 0.83</text>
      <text x="150" y="114" fontSize="6" fill="#C9F2EE" fillOpacity="0.65"
        fontFamily="monospace" textAnchor="middle">95% CI: 0.74 to 0.92  ·  p = 0.003</text>

      {/* Mini forest plot */}
      {/* Axis line */}
      <line x1={FP_X0} y1="126" x2={FP_X0 + FP_W} y2="126"
        stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.14" />
      {/* Null line */}
      <line x1={nullX} y1="118" x2={nullX} y2="134"
        stroke="#C9F2EE" strokeWidth="0.7" strokeDasharray="2 2" strokeOpacity="0.28" />
      <text x={nullX} y="116" fontSize="4" fill="#C9F2EE" fillOpacity="0.30"
        fontFamily="monospace" textAnchor="middle">null HR=1</text>
      {/* CI line */}
      <line x1={loX} y1="126" x2={hiX} y2="126"
        stroke="#C7FF35" strokeWidth="2" strokeOpacity="0.60" strokeLinecap="round" />
      {/* CI caps */}
      <line x1={loX} y1="122" x2={loX} y2="130"
        stroke="#C7FF35" strokeWidth="1" strokeOpacity="0.55" />
      <line x1={hiX} y1="122" x2={hiX} y2="130"
        stroke="#C7FF35" strokeWidth="1" strokeOpacity="0.55" />
      {/* Point estimate diamond */}
      <path d={`M ${ptX},120 L ${ptX+5},126 L ${ptX},132 L ${ptX-5},126 Z`}
        fill="#C7FF35" fillOpacity="0.90" />
      {/* Direction label */}
      <text x={FP_X0 + 4} y="140" fontSize="4.5" fill="#C7FF35" fillOpacity="0.55"
        fontFamily="monospace">← Favors GLP-1 arm</text>
      <text x={FP_X0 + FP_W - 4} y="140" fontSize="4.5" fill="#C9F2EE" fillOpacity="0.30"
        fontFamily="monospace" textAnchor="end">Favors DPP-4 arm →</text>

      {/* ── Interpretation notes ─────────────────────────────── */}
      <line x1="8" y1="146" x2="292" y2="146" stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.08" />
      <text x="8" y="154" fontSize="4" fill="#D9D1FF" fillOpacity="0.42" fontFamily="monospace" letterSpacing="1">INTERPRETATION NOTES</text>
      {[
        "Synthetic patient data · results are illustrative, not real-world evidence",
        "Observational design · unmeasured confounding cannot be fully excluded",
        "New-user active-comparator design · PS matched · OMOP CDM",
      ].map((note, i) => (
        <g key={i}>
          <circle cx="12" cy={163 + i * 12} r="1.5" fill="#D9D1FF" fillOpacity="0.35" />
          <text x="18" y={165.5 + i * 12} fontSize="5" fill="#D9D1FF" fillOpacity="0.55"
            fontFamily="monospace">{note}</text>
        </g>
      ))}

      {/* Footer */}
      <line x1="8" y1="198" x2="292" y2="198" stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.06" />
    </svg>
  )
}
