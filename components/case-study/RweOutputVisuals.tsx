// Full-width output preview SVGs for the RWE Evidence Studio case study.
// Each viewBox is 800 units wide so that at normal desktop column width
// text renders at a comfortable, legible size (≥12px equivalent).
// All data is illustrative and based on synthetic patient counts.

// ── 1. Cohort Attrition Funnel ────────────────────────────────────────────────

export function RweAttritionFunnelSVG() {
  // sqrt-scale bar widths centered on x=400 (max 700px)
  const MAX_BAR = 700
  const sqrtScale = (n: number, sqrtMax: number) =>
    Math.round((Math.sqrt(n) / sqrtMax) * MAX_BAR)

  const sqrtMax = Math.sqrt(128400)

  const steps = [
    {
      label: "Source population",
      sub: "All OMOP CDM patients with T2D diagnosis",
      n: 128400,
      nLabel: "128,400",
      color: "#D9D1FF",
      excl: null,
    },
    {
      label: "Eligibility criteria met",
      sub: "Age 40–75 · continuous enrollment · no prior exposure",
      n: 38200,
      nLabel: "38,200",
      color: "#D9D1FF",
      excl: "−90,200 did not meet eligibility criteria",
    },
    {
      label: "New drug initiators",
      sub: "First prescription for GLP-1 or DPP-4 inhibitor · washout 90 d",
      n: 14640,
      nLabel: "14,640",
      color: "#C9F2EE",
      excl: "−23,560 had prior drug exposure",
    },
    {
      label: "Propensity score matched",
      sub: "1:1 nearest-neighbor matching · caliper 0.02 log-odds PS",
      n: 10520,
      nLabel: "10,520",
      color: "#C9F2EE",
      excl: "−4,120 unmatched initiators",
    },
    {
      label: "Final analysis cohort",
      sub: "5,260 GLP-1 initiators · 5,260 DPP-4 initiators",
      n: 9840,
      nLabel: "9,840",
      color: "#C7FF35",
      excl: "−680 incomplete follow-up",
    },
  ] as const

  const ROW_H   = 52
  const ROW_GAP = 14
  const ROWS_START = 46

  return (
    <svg
      viewBox="0 0 800 380"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full"
    >
      {/* Background */}
      <rect width="800" height="380" fill="#060D18" />
      {/* Subtle dot grid */}
      <pattern id="rwe-af-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill="#C9F2EE" fillOpacity="0.04" />
      </pattern>
      <rect width="800" height="380" fill="url(#rwe-af-grid)" />

      {/* Header */}
      <text x="20" y="22" fontSize="9.5" fill="#C9F2EE" fillOpacity="0.40"
        fontFamily="monospace" fontWeight="500" letterSpacing="2.5">
        COHORT ATTRITION · OMOP CDM POPULATION · SYNTHETIC COUNTS
      </text>
      <line x1="20" y1="30" x2="780" y2="30" stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.12" />

      {/* Column headers */}
      <text x="24" y="42" fontSize="8" fill="#C9F2EE" fillOpacity="0.28" fontFamily="monospace" letterSpacing="1">STEP</text>
      <text x="776" y="42" fontSize="8" fill="#C9F2EE" fillOpacity="0.28" fontFamily="monospace" textAnchor="end" letterSpacing="1">N</text>

      {steps.map((step, i) => {
        const barW = sqrtScale(step.n, sqrtMax)
        const barX = 400 - barW / 2
        const rowY = ROWS_START + i * (ROW_H + ROW_GAP)
        const barY = rowY + 14
        const isLast = i === steps.length - 1

        return (
          <g key={step.label}>
            {/* Rail */}
            <rect x="20" y={barY} width="760" height={ROW_H - 14} rx="5"
              fill="white" fillOpacity="0.015"
              stroke={step.color} strokeWidth="0.5" strokeOpacity="0.15" />
            {/* Proportional fill */}
            <rect x={barX} y={barY} width={barW} height={ROW_H - 14} rx="5"
              fill={step.color} fillOpacity={isLast ? 0.20 : 0.08} />

            {/* Step number */}
            <text x="30" y={barY + 24} fontSize="10" fill={step.color} fillOpacity="0.40"
              fontFamily="monospace" fontWeight="bold">{String(i + 1).padStart(2, "0")}</text>

            {/* Step label */}
            <text x="60" y={barY + 17} fontSize="11.5" fill={step.color} fillOpacity="0.82"
              fontFamily="monospace" fontWeight="500">{step.label}</text>
            {/* Sub-label */}
            <text x="60" y={barY + 31} fontSize="9" fill={step.color} fillOpacity="0.45"
              fontFamily="monospace">{step.sub}</text>

            {/* N count */}
            <text x="775" y={barY + 26} fontSize="14" fill={step.color} fillOpacity={isLast ? 0.95 : 0.78}
              fontFamily="monospace" fontWeight="bold" textAnchor="end">{step.nLabel}</text>

            {!isLast && (
              <>
                {/* Connector */}
                <line x1="400" y1={barY + ROW_H - 14} x2="400" y2={rowY + ROW_H + ROW_GAP}
                  stroke={step.color} strokeWidth="0.8" strokeOpacity="0.18" strokeDasharray="3 3" />
                {/* Exclusion note */}
                {step.excl && (
                  <text x="775" y={barY + ROW_H + ROW_GAP - 2} fontSize="9" fill={step.color} fillOpacity="0.38"
                    fontFamily="monospace" textAnchor="end">{step.excl}</text>
                )}
              </>
            )}
          </g>
        )
      })}

      {/* Footer */}
      <line x1="20" y1="368" x2="780" y2="368" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.08" />
      <text x="20" y="377" fontSize="8" fill="#C9F2EE" fillOpacity="0.25" fontFamily="monospace">
        Bar width proportional to cohort size (square-root scale) · All counts are illustrative synthetic data
      </text>
    </svg>
  )
}

// ── 2. Generated SQL Workspace ────────────────────────────────────────────────

export function RweSqlWorkspaceSVG() {
  const paramChips = [
    { key: "POPULATION",  val: "T2D  ·  40–75 y" },
    { key: "EXPOSURE",    val: "GLP-1 agonist" },
    { key: "COMPARATOR",  val: "DPP-4 inhibitor" },
    { key: "INDEX",       val: "First prescription" },
    { key: "BASELINE",    val: "−365 days" },
    { key: "FOLLOW-UP",   val: "+180 days" },
  ] as const

  const sqlLines = [
    { n:  1, text: "-- ================================================================",           color: "#C9F2EE", op: 0.18 },
    { n:  2, text: "-- RWE Evidence Studio  ·  Generated cohort SQL",                             color: "#C9F2EE", op: 0.28 },
    { n:  3, text: "-- New-user active-comparator design  ·  OMOP CDM v5.4",                      color: "#C9F2EE", op: 0.28 },
    { n:  4, text: "-- GLP-1 agonist vs DPP-4 inhibitor  ·  T2D 40–75  ·  Hospitalization",       color: "#C9F2EE", op: 0.22 },
    { n:  5, text: "-- ================================================================",           color: "#C9F2EE", op: 0.18 },
    { n:  6, text: "",                                                                              color: "#C9F2EE", op: 0 },
    { n:  7, text: "WITH eligible_patients AS (",                                                  color: "#D9D1FF", op: 0.78 },
    { n:  8, text: "  SELECT  p.person_id,",                                                      color: "#C7FF35", op: 0.70 },
    { n:  9, text: "           p.year_of_birth,",                                                  color: "#C9F2EE", op: 0.60 },
    { n: 10, text: "           p.gender_concept_id",                                               color: "#C9F2EE", op: 0.60 },
    { n: 11, text: "  FROM     person  p",                                                         color: "#D9D1FF", op: 0.68 },
    { n: 12, text: "  JOIN     observation_period  op",                                            color: "#D9D1FF", op: 0.62 },
    { n: 13, text: "    ON     p.person_id = op.person_id",                                       color: "#C9F2EE", op: 0.50 },
    { n: 14, text: "  WHERE    ( :index_year - p.year_of_birth ) BETWEEN 40 AND 75",              color: "#C9F2EE", op: 0.55 },
    { n: 15, text: "    AND    op.observation_period_end_date >= :index_date",                     color: "#C9F2EE", op: 0.50 },
    { n: 16, text: "),",                                                                            color: "#D9D1FF", op: 0.78 },
    { n: 17, text: "",                                                                              color: "#C9F2EE", op: 0 },
    { n: 18, text: "initiators AS (",                                                              color: "#D9D1FF", op: 0.78 },
    { n: 19, text: "  SELECT  de.person_id,",                                                     color: "#C7FF35", op: 0.70 },
    { n: 20, text: "           MIN(de.drug_exposure_start_date)  AS index_date",                  color: "#C9F2EE", op: 0.60 },
    { n: 21, text: "  FROM     drug_exposure  de",                                                color: "#D9D1FF", op: 0.68 },
    { n: 22, text: "  JOIN     eligible_patients  ep  ON  de.person_id = ep.person_id",           color: "#C9F2EE", op: 0.50 },
    { n: 23, text: "  WHERE    de.drug_concept_id  IN  ( :glp1_concept_set )",                    color: "#C7FF35", op: 0.68 },
    { n: 24, text: "    AND    NOT EXISTS (  -- washout: no prior exposure",                      color: "#C9F2EE", op: 0.30 },
    { n: 25, text: "             SELECT 1 FROM drug_exposure prior_de",                            color: "#C9F2EE", op: 0.42 },
    { n: 26, text: "              WHERE prior_de.person_id = de.person_id",                       color: "#C9F2EE", op: 0.42 },
    { n: 27, text: "                AND prior_de.drug_concept_id IN ( :glp1_concept_set )",       color: "#C7FF35", op: 0.55 },
    { n: 28, text: "                AND prior_de.drug_exposure_start_date",                       color: "#C9F2EE", op: 0.38 },
    { n: 29, text: "                    < de.drug_exposure_start_date - INTERVAL '90 days' )",    color: "#C9F2EE", op: 0.38 },
    { n: 30, text: "  GROUP BY de.person_id",                                                     color: "#C9F2EE", op: 0.50 },
    { n: 31, text: ")",                                                                            color: "#D9D1FF", op: 0.78 },
    { n: 32, text: "",                                                                              color: "#C9F2EE", op: 0 },
    { n: 33, text: "SELECT  i.person_id,  i.index_date,  ep.gender_concept_id",                   color: "#C7FF35", op: 0.65 },
    { n: 34, text: "FROM    initiators i  JOIN  eligible_patients ep  USING ( person_id )",       color: "#C9F2EE", op: 0.55 },
    { n: 35, text: "ORDER BY i.index_date;",                                                      color: "#D9D1FF", op: 0.62 },
  ] as const

  const CHIP_W     = 122
  const CHIP_GAP   = 8
  const CHIP_START = 20

  return (
    <svg
      viewBox="0 0 800 520"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full"
    >
      <rect width="800" height="520" fill="#050A14" />

      {/* ── Title bar ─────────────────────────────────────── */}
      <rect width="800" height="28" fill="#0A1628" />
      <text x="20" y="18" fontSize="9.5" fill="#C9F2EE" fillOpacity="0.48"
        fontFamily="monospace" fontWeight="500" letterSpacing="2.5">
        SQL WORKSPACE  ·  OMOP CDM QUERY BUILDER
      </text>
      {/* Window dots */}
      <circle cx="736" cy="14" r="4" fill="#C9F2EE" fillOpacity="0.10" />
      <circle cx="752" cy="14" r="4" fill="#C9F2EE" fillOpacity="0.07" />
      <circle cx="768" cy="14" r="4" fill="#C9F2EE" fillOpacity="0.04" />
      <line x1="0" y1="28" x2="800" y2="28" stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.12" />

      {/* ── Cohort parameter chips ─────────────────────────── */}
      <text x="20" y="44" fontSize="7.5" fill="#C9F2EE" fillOpacity="0.28" fontFamily="monospace" letterSpacing="1">
        STUDY PARAMETERS
      </text>
      {paramChips.map((chip, i) => {
        const cx = CHIP_START + i * (CHIP_W + CHIP_GAP)
        return (
          <g key={chip.key}>
            <rect x={cx} y="48" width={CHIP_W} height="28" rx="5"
              fill="#C9F2EE" fillOpacity="0.04" stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.18" />
            <text x={cx + CHIP_W / 2} y="59" fontSize="7" fill="#C9F2EE" fillOpacity="0.35"
              fontFamily="monospace" textAnchor="middle" fontWeight="500" letterSpacing="0.5">
              {chip.key}
            </text>
            <text x={cx + CHIP_W / 2} y="70" fontSize="8.5" fill="#C9F2EE" fillOpacity="0.80"
              fontFamily="monospace" textAnchor="middle">
              {chip.val}
            </text>
          </g>
        )
      })}

      <line x1="0" y1="80" x2="800" y2="80" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.10" />

      {/* ── Code area ─────────────────────────────────────── */}
      <rect x="0" y="80" width="800" height="426" fill="#030710" />

      {/* Line-number gutter */}
      <rect x="0" y="80" width="44" height="426" fill="#060C18" />
      <line x1="44" y1="80" x2="44" y2="506" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.10" />

      {sqlLines.map((line, i) => {
        const y = 98 + i * 12
        return (
          <g key={i}>
            <text x="38" y={y} fontSize="7.5" fill="#C9F2EE" fillOpacity="0.20"
              fontFamily="monospace" textAnchor="end">{line.n}</text>
            {line.text && (
              <text x="54" y={y} fontSize="8.5" fill={line.color} fillOpacity={line.op}
                fontFamily="monospace">{line.text}</text>
            )}
          </g>
        )
      })}

      {/* ── Status bar ────────────────────────────────────── */}
      <rect x="0" y="506" width="800" height="14" fill="#07101C" />
      <line x1="0" y1="506" x2="800" y2="506" stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.10" />
      <text x="20" y="515" fontSize="7.5" fill="#C9F2EE" fillOpacity="0.30" fontFamily="monospace">
        OMOP CDM v5.4  ·  5 tables referenced  ·  washout 90 d  ·  new-user active-comparator design  ·  v3.1.0
      </text>
    </svg>
  )
}

// ── 3. Cohort Diagnostics: Baseline Balance ───────────────────────────────────

export function RweBaselineBalanceSVG() {
  // Plot area: x from 260 to 740 (480px), SMD 0 to 0.40
  const X_LEFT  = 260
  const X_RIGHT = 740
  const PLOT_W  = X_RIGHT - X_LEFT
  const SMD_MAX = 0.40
  const xSMD = (smd: number) => X_LEFT + (smd / SMD_MAX) * PLOT_W
  const THRESH_X = xSMD(0.10)

  const covariates = [
    { label: "Age, years",                pre: 0.24, post: 0.03 },
    { label: "Female sex",                pre: 0.18, post: 0.04 },
    { label: "T2D duration > 5 years",    pre: 0.31, post: 0.05 },
    { label: "HbA1c >= 8.0%",             pre: 0.22, post: 0.04 },
    { label: "CV disease history",        pre: 0.28, post: 0.03 },
    { label: "CKD stage 3+",              pre: 0.15, post: 0.03 },
    { label: "Insulin prior use",         pre: 0.19, post: 0.06 },
    { label: "ACEI / ARB use",            pre: 0.12, post: 0.02 },
  ] as const

  const ROW_START = 68
  const ROW_SPACE = 30

  return (
    <svg
      viewBox="0 0 800 380"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full"
    >
      <rect width="800" height="380" fill="#060D18" />
      <pattern id="rwe-bb-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill="#C9F2EE" fillOpacity="0.03" />
      </pattern>
      <rect width="800" height="380" fill="url(#rwe-bb-grid)" />

      {/* Header */}
      <text x="20" y="22" fontSize="9.5" fill="#C9F2EE" fillOpacity="0.42"
        fontFamily="monospace" fontWeight="500" letterSpacing="2.5">
        COHORT DIAGNOSTICS  ·  STANDARDIZED MEAN DIFFERENCE BY COVARIATE
      </text>
      <line x1="20" y1="30" x2="780" y2="30" stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.12" />

      {/* Column header labels */}
      <text x="252" y="46" fontSize="8.5" fill="#D9D1FF" fillOpacity="0.35"
        fontFamily="monospace" textAnchor="end">COVARIATE</text>
      <text x={X_LEFT} y="46" fontSize="8.5" fill="#C9F2EE" fillOpacity="0.28"
        fontFamily="monospace" textAnchor="middle">0.0</text>
      <text x={THRESH_X} y="46" fontSize="8.5" fill="#C7FF35" fillOpacity="0.55"
        fontFamily="monospace" textAnchor="middle">0.10 threshold</text>

      {/* Threshold vertical guideline */}
      <line x1={THRESH_X} y1="50" x2={THRESH_X} y2="310"
        stroke="#C7FF35" strokeWidth="1.2" strokeDasharray="5 4" strokeOpacity="0.35" />

      {/* Background grid lines */}
      {[0, 0.1, 0.2, 0.3, 0.4].map((tick) => {
        const x = xSMD(tick)
        return (
          <line key={tick} x1={x} y1="50" x2={x} y2="310"
            stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.06" />
        )
      })}

      {/* Horizontal alternating row bands */}
      {covariates.map((_, i) => {
        const y = ROW_START + i * ROW_SPACE
        return i % 2 === 0 ? (
          <rect key={i} x={X_LEFT} y={y - 12} width={PLOT_W} height={ROW_SPACE}
            fill="white" fillOpacity="0.012" />
        ) : null
      })}

      {/* Covariate rows */}
      {covariates.map((cov, i) => {
        const y     = ROW_START + i * ROW_SPACE
        const xPre  = xSMD(cov.pre)
        const xPost = xSMD(cov.post)

        return (
          <g key={cov.label}>
            {/* Label */}
            <text x="248" y={y + 4} fontSize="10" fill="#D9D1FF" fillOpacity="0.68"
              fontFamily="monospace" textAnchor="end">{cov.label}</text>
            {/* Connector line between pre and post */}
            <line x1={xPost + 6} y1={y} x2={xPre - 6} y2={y}
              stroke="#D9D1FF" strokeWidth="1" strokeOpacity="0.22" />
            {/* Pre-matching: open circle */}
            <circle cx={xPre} cy={y} r="6"
              fill="#D9D1FF" fillOpacity="0.05"
              stroke="#D9D1FF" strokeWidth="1.5" strokeOpacity="0.60" />
            {/* Post-matching: filled circle */}
            <circle cx={xPost} cy={y} r="6"
              fill="#C9F2EE" fillOpacity="0.88" />
          </g>
        )
      })}

      {/* X axis */}
      <line x1={X_LEFT} y1="310" x2={X_RIGHT} y2="310"
        stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.20" />

      {/* Axis tick labels */}
      {[0, 0.1, 0.2, 0.3, 0.4].map((tick) => {
        const x = xSMD(tick)
        return (
          <g key={tick}>
            <line x1={x} y1="310" x2={x} y2="316" stroke="#C9F2EE" strokeWidth="0.8" strokeOpacity="0.28" />
            <text x={x} y="328" fontSize="9" fill="#C9F2EE" fillOpacity="0.42"
              fontFamily="monospace" textAnchor="middle">{tick.toFixed(1)}</text>
          </g>
        )
      })}
      <text x="500" y="345" fontSize="9" fill="#C9F2EE" fillOpacity="0.32"
        fontFamily="monospace" textAnchor="middle">
        Standardized Mean Difference (SMD)
      </text>

      {/* Legend */}
      <circle cx="270" cy="365" r="6" fill="#D9D1FF" fillOpacity="0.05"
        stroke="#D9D1FF" strokeWidth="1.5" strokeOpacity="0.60" />
      <text x="282" y="369" fontSize="9.5" fill="#D9D1FF" fillOpacity="0.60" fontFamily="monospace">
        Before PS matching
      </text>
      <circle cx="430" cy="365" r="6" fill="#C9F2EE" fillOpacity="0.88" />
      <text x="442" y="369" fontSize="9.5" fill="#C9F2EE" fillOpacity="0.72" fontFamily="monospace">
        After PS matching
      </text>
      <line x1="580" y1="365" x2="596" y2="365" stroke="#C7FF35" strokeWidth="1.2"
        strokeDasharray="4 3" strokeOpacity="0.50" />
      <text x="602" y="369" fontSize="9.5" fill="#C7FF35" fillOpacity="0.55" fontFamily="monospace">
        SMD = 0.10 acceptable-balance threshold
      </text>
    </svg>
  )
}

// ── 4. Evidence Brief Summary ─────────────────────────────────────────────────

export function RweEvidenceBriefSVG() {
  // Forest plot: HR axis 0.55 to 1.30 mapped x=60 to x=740 (680px)
  const FP_X0  = 60
  const FP_W   = 680
  const HR_MIN = 0.55
  const HR_MAX = 1.30
  const hrX = (hr: number) => FP_X0 + ((hr - HR_MIN) / (HR_MAX - HR_MIN)) * FP_W

  const nullX = hrX(1.0)   // x=561
  const ptX   = hrX(0.83)  // x=407
  const loX   = hrX(0.74)  // x=335
  const hiX   = hrX(0.92)  // x=479

  return (
    <svg
      viewBox="0 0 800 420"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full"
    >
      <rect width="800" height="420" fill="#060D18" />
      <pattern id="rwe-eb-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill="#C9F2EE" fillOpacity="0.03" />
      </pattern>
      <rect width="800" height="420" fill="url(#rwe-eb-grid)" />

      {/* ── Header band ───────────────────────────────────── */}
      <rect width="800" height="28" fill="#0A1628" />
      <text x="20" y="18" fontSize="9.5" fill="#C9F2EE" fillOpacity="0.55"
        fontFamily="monospace" fontWeight="500" letterSpacing="2.5">
        EVIDENCE BRIEF  ·  GENERATED ANALYSIS SUMMARY
      </text>
      <rect x="658" y="6" width="122" height="16" rx="4"
        fill="#C7FF35" fillOpacity="0.06" stroke="#C7FF35" strokeWidth="0.5" strokeOpacity="0.32" />
      <text x="719" y="17" fontSize="7.5" fill="#C7FF35" fillOpacity="0.60"
        fontFamily="monospace" textAnchor="middle" letterSpacing="0.5">SYNTHETIC DATA</text>
      <line x1="0" y1="28" x2="800" y2="28" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.12" />

      {/* ── Study question ────────────────────────────────── */}
      <text x="20" y="46" fontSize="8" fill="#C9F2EE" fillOpacity="0.35" fontFamily="monospace" letterSpacing="1.5">
        STUDY QUESTION
      </text>
      <text x="20" y="64" fontSize="13" fill="#C9F2EE" fillOpacity="0.82" fontFamily="monospace" fontWeight="500">
        GLP-1 agonist vs. DPP-4 inhibitor — all-cause hospitalization
      </text>
      <text x="20" y="80" fontSize="11" fill="#C9F2EE" fillOpacity="0.55" fontFamily="monospace">
        Adults with type 2 diabetes · ages 40–75 · 180-day follow-up · new-user active-comparator design
      </text>

      {/* ── Design chips ──────────────────────────────────── */}
      <line x1="20" y1="90" x2="780" y2="90" stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.08" />
      {[
        { label: "T2D ADULTS 40–75",      color: "#D9D1FF", x: 20,  w: 140 },
        { label: "GLP-1 AGONIST",         color: "#C9F2EE", x: 170, w: 110 },
        { label: "DPP-4 INHIBITOR",       color: "#F1D7E4", x: 290, w: 120 },
        { label: "HOSPITALIZATION",       color: "#C7FF35", x: 420, w: 130 },
        { label: "OMOP CDM · PS MATCHED", color: "#D9D1FF", x: 560, w: 178 },
      ].map((chip) => (
        <g key={chip.label}>
          <rect x={chip.x} y="94" width={chip.w} height="18" rx="4"
            fill={chip.color} fillOpacity="0.05" stroke={chip.color} strokeWidth="0.4" strokeOpacity="0.25" />
          <text x={chip.x + chip.w / 2} y="106.5" fontSize="7.5" fill={chip.color} fillOpacity="0.68"
            fontFamily="monospace" textAnchor="middle" letterSpacing="0.3">{chip.label}</text>
        </g>
      ))}

      {/* ── Primary result ────────────────────────────────── */}
      <line x1="20" y1="118" x2="780" y2="118" stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.08" />
      <text x="20" y="133" fontSize="8" fill="#C7FF35" fillOpacity="0.45" fontFamily="monospace" letterSpacing="1.5">
        PRIMARY RESULT  ·  ANY-CAUSE HOSPITALIZATION AT 180 DAYS
      </text>

      {/* Large HR */}
      <text x="400" y="190" fontSize="52" fill="#C7FF35" fillOpacity="0.92"
        fontFamily="monospace" fontWeight="bold" textAnchor="middle">HR 0.83</text>
      <text x="400" y="210" fontSize="11.5" fill="#C9F2EE" fillOpacity="0.68"
        fontFamily="monospace" textAnchor="middle">
        95% Confidence Interval: 0.74  to  0.92  ·  p = 0.003
      </text>

      {/* ── Mini forest plot ──────────────────────────────── */}
      {/* Axis line */}
      <line x1={FP_X0} y1="232" x2={FP_X0 + FP_W} y2="232"
        stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.14" />
      {/* Null line */}
      <line x1={nullX} y1="220" x2={nullX} y2="246"
        stroke="#C9F2EE" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.30" />
      <text x={nullX} y="218" fontSize="8" fill="#C9F2EE" fillOpacity="0.32"
        fontFamily="monospace" textAnchor="middle">null (HR=1)</text>
      {/* CI bar */}
      <line x1={loX} y1="232" x2={hiX} y2="232"
        stroke="#C7FF35" strokeWidth="3.5" strokeOpacity="0.65" strokeLinecap="round" />
      {/* CI end caps */}
      <line x1={loX} y1="226" x2={loX} y2="238"
        stroke="#C7FF35" strokeWidth="1.5" strokeOpacity="0.60" />
      <line x1={hiX} y1="226" x2={hiX} y2="238"
        stroke="#C7FF35" strokeWidth="1.5" strokeOpacity="0.60" />
      {/* Point estimate diamond */}
      <path d={`M ${ptX},224 L ${ptX + 8},232 L ${ptX},240 L ${ptX - 8},232 Z`}
        fill="#C7FF35" fillOpacity="0.92" />

      {/* Axis labels */}
      <text x={FP_X0 + 8} y="252" fontSize="8.5" fill="#C7FF35" fillOpacity="0.58" fontFamily="monospace">
        ← Favors GLP-1 arm (protective)
      </text>
      <text x={FP_X0 + FP_W - 8} y="252" fontSize="8.5" fill="#C9F2EE" fillOpacity="0.30"
        fontFamily="monospace" textAnchor="end">
        Favors DPP-4 arm →
      </text>

      {/* Axis tick marks */}
      {[0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3].map((tick) => {
        const x = hrX(tick)
        return (
          <g key={tick}>
            <line x1={x} y1="232" x2={x} y2="238" stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.20" />
            <text x={x} y="260" fontSize="7.5" fill="#C9F2EE" fillOpacity="0.25"
              fontFamily="monospace" textAnchor="middle">{tick.toFixed(1)}</text>
          </g>
        )
      })}

      {/* ── Interpretation notes ──────────────────────────── */}
      <line x1="20" y1="274" x2="780" y2="274" stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.08" />
      <text x="20" y="288" fontSize="8" fill="#D9D1FF" fillOpacity="0.40" fontFamily="monospace" letterSpacing="1.5">
        INTERPRETATION  ·  KEY NOTES
      </text>
      {[
        { icon: "○", text: "Synthetic patient data — all results are illustrative, not real-world evidence" },
        { icon: "○", text: "Observational study design — unmeasured confounding cannot be fully excluded" },
        { icon: "○", text: "New-user active-comparator design with propensity-score matching on OMOP CDM" },
        { icon: "○", text: "OMOP CDM implementation variation may require institution-specific SQL customization" },
      ].map((note, i) => (
        <g key={i}>
          <circle cx="28" cy={302 + i * 22} r="2.5" fill="#D9D1FF" fillOpacity="0.38" />
          <text x="38" y={306 + i * 22} fontSize="10" fill="#D9D1FF" fillOpacity="0.62"
            fontFamily="monospace">{note.text}</text>
        </g>
      ))}

      {/* Footer */}
      <line x1="20" y1="412" x2="780" y2="412" stroke="#C9F2EE" strokeWidth="0.3" strokeOpacity="0.06" />
    </svg>
  )
}
