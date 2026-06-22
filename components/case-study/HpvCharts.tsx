"use client"

import { useState } from "react"
import { useReducedMotion } from "motion/react"

// ── Shared layout constants ───────────────────────────────────────────────────

const W = 300

// ── Two-bar vertical chart (Charts A–D) ──────────────────────────────────────

interface VBarItem {
  label: string
  sublabel?: string
  value: number
  pct: number
  color: string
  accent: string
}

function TwoBarChart({
  bars,
  sampleNote,
  explanation,
}: {
  bars: [VBarItem, VBarItem]
  sampleNote?: string
  explanation: string
}) {
  const [hov, setHov] = useState<number | null>(null)
  const reduced = useReducedMotion()

  const maxVal    = Math.max(bars[0].value, bars[1].value)
  const BAR_W     = 90
  const GAP       = 36
  const CHART_TOP = 42           // extra head-room for count labels + hover badge
  const CHART_H   = 112
  const AXIS_Y    = CHART_TOP + CHART_H  // 154
  const startX    = (W - 2 * BAR_W - GAP) / 2

  return (
    <div>
      <svg viewBox={`0 0 ${W} 212`} className="w-full" aria-hidden="true">
        {/* Grid lines */}
        {[0.33, 0.67, 1.0].map((f) => (
          <line
            key={f}
            x1={startX - 2}
            y1={CHART_TOP + CHART_H * (1 - f)}
            x2={startX + 2 * BAR_W + GAP + 2}
            y2={CHART_TOP + CHART_H * (1 - f)}
            stroke="#C9F2EE"
            strokeWidth="0.3"
            strokeOpacity="0.07"
          />
        ))}

        {bars.map((b, i) => {
          const barH = (b.value / maxVal) * CHART_H
          const x    = startX + i * (BAR_W + GAP)
          const y    = AXIS_Y - barH
          const isH  = hov === i

          return (
            <g key={b.label}>
              <rect
                x={x} y={y} width={BAR_W} height={barH} rx="5"
                fill={isH ? b.accent : b.color}
                fillOpacity={isH ? 0.72 : 0.40}
                style={reduced ? undefined : { transition: "fill-opacity 120ms ease, fill 100ms ease" }}
                onPointerEnter={() => setHov(i)}
                onPointerLeave={() => setHov(null)}
                className="cursor-pointer"
              />

              {/* Count value above bar */}
              <text
                x={x + BAR_W / 2} y={y - 6}
                textAnchor="middle"
                fontSize="11" fontFamily="monospace" fontWeight="600"
                fill={isH ? b.accent : "#FAF9F6"}
                fillOpacity={isH ? 1.0 : 0.75}
              >
                {b.value.toLocaleString()}
              </text>

              {/* Percentage badge on hover */}
              {isH && (
                <g>
                  <rect
                    x={x + BAR_W / 2 - 22} y={y - 28}
                    width={44} height={14} rx={4}
                    fill={b.accent} fillOpacity={0.12}
                    stroke={b.accent} strokeWidth={0.5} strokeOpacity={0.45}
                  />
                  <text
                    x={x + BAR_W / 2} y={y - 19}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="8.5" fontFamily="monospace"
                    fill={b.accent} fillOpacity={0.95}
                  >
                    {b.pct.toFixed(1)}%
                  </text>
                </g>
              )}

              {/* X-axis label */}
              <text
                x={x + BAR_W / 2} y={AXIS_Y + 14}
                textAnchor="middle" fontSize="8.5"
                fill="#FAF9F6" fillOpacity="0.58"
              >
                {b.label}
              </text>
              {b.sublabel && (
                <text
                  x={x + BAR_W / 2} y={AXIS_Y + 25}
                  textAnchor="middle" fontSize="7"
                  fill="#FAF9F6" fillOpacity="0.32"
                >
                  {b.sublabel}
                </text>
              )}
            </g>
          )
        })}

        {/* Baseline */}
        <line
          x1={startX - 4} y1={AXIS_Y}
          x2={startX + 2 * BAR_W + GAP + 4} y2={AXIS_Y}
          stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.14"
        />

        {/* Sample / metadata note */}
        {sampleNote && (
          <text
            x={W / 2} y={200}
            textAnchor="middle" fontSize="7.5"
            fill="#C9F2EE" fillOpacity="0.45" fontFamily="monospace"
          >
            {sampleNote}
          </text>
        )}
      </svg>

      <p className="mt-3 text-[11px] leading-relaxed text-white/68">
        {explanation}
      </p>
    </div>
  )
}

// ── Chart A: HPV Vaccination Status ───────────────────────────────────────────

export function HpvVaccinationStatusChart() {
  return (
    <TwoBarChart
      bars={[
        {
          label: "Vaccinated",
          sublabel: "(HPV = Yes)",
          value: 323,
          pct: 38.9,
          color: "#C9F2EE",
          accent: "#C7FF35",
        },
        {
          label: "Not Vaccinated",
          sublabel: "(HPV = No)",
          value: 506,
          pct: 61.1,
          color: "#D9D1FF",
          accent: "#C7FF35",
        },
      ]}
      sampleNote="N = 829 · Pre-SMOTE · NHANES 2021–2023 · Ages 20–49"
      explanation="Fewer than 4 in 10 respondents reported receiving an HPV vaccine. This imbalance between vaccinated (323) and not vaccinated (506) was why SMOTE oversampling was applied before model training. Hover a bar to see the percentage breakdown."
    />
  )
}

// ── Chart B: Health Insurance Coverage ───────────────────────────────────────

export function HpvInsuranceCoverageChart() {
  return (
    <TwoBarChart
      bars={[
        {
          label: "Covered",
          sublabel: "(Insurance = 1)",
          value: 721,
          pct: 87.0,
          color: "#C9F2EE",
          accent: "#C7FF35",
        },
        {
          label: "Not Covered",
          sublabel: "(Insurance = 2)",
          value: 108,
          pct: 13.0,
          color: "#F1D7E4",
          accent: "#C7FF35",
        },
      ]}
      sampleNote="N = 829 · Analytical sample · NHANES 2021–2023"
      explanation="Most respondents had health insurance, yet overall vaccination remained below 40%. This suggests that insurance coverage alone does not fully explain vaccination behavior — education and savings were also included as predictors in the models."
    />
  )
}

// ── Chart C: Family Savings Level ─────────────────────────────────────────────

export function HpvFamilySavingsChart() {
  return (
    <TwoBarChart
      bars={[
        {
          label: "< $3,000",
          sublabel: "(Savings = 1)",
          value: 582,
          pct: 70.2,
          color: "#D9D1FF",
          accent: "#C7FF35",
        },
        {
          label: "$3,000 or More",
          sublabel: "(Savings = 2)",
          value: 247,
          pct: 29.8,
          color: "#C9F2EE",
          accent: "#C7FF35",
        },
      ]}
      sampleNote="N = 829 · Analytical sample · NHANES 2021–2023"
      explanation="More than 70% of respondents reported family savings below $3,000. This variable is derived from the NHANES IND310 question and used here as a broad economic proxy. Lower household savings may reflect financial pressures that deprioritize preventive care like vaccination."
    />
  )
}

// ── Chart D: Education Level ──────────────────────────────────────────────────

export function HpvEducationLevelChart() {
  return (
    <TwoBarChart
      bars={[
        {
          label: "Below College",
          sublabel: "(Education = 1)",
          value: 286,
          pct: 34.5,
          color: "#D9D1FF",
          accent: "#C7FF35",
        },
        {
          label: "College or Above",
          sublabel: "(Education = 2)",
          value: 543,
          pct: 65.5,
          color: "#C9F2EE",
          accent: "#C7FF35",
        },
      ]}
      sampleNote="N = 829 · Analytical sample · NHANES 2021–2023"
      explanation="About two-thirds of respondents had at least some college education. Education was the most influential predictor in both the XGBoost and logistic regression models, consistent with research linking higher educational attainment to greater health literacy and uptake of preventive services."
    />
  )
}

// ── Chart E: XGBoost Feature Importance ──────────────────────────────────────

export function HpvFeatureImportanceChart() {
  const [hov, setHov] = useState<number | null>(null)
  const reduced = useReducedMotion()

  // Relative gain values normalized to Education = 1.0.
  // Ranking confirmed from original course output; exact gain values not separately recorded.
  const features = [
    { label: "Education", sublabel: "College vs. Below College", relGain: 1.00, color: "#C9F2EE" },
    { label: "Insurance", sublabel: "Covered vs. Not Covered",   relGain: 0.48, color: "#D9D1FF" },
    { label: "Savings",   sublabel: "< $3K vs. $3K+",           relGain: 0.20, color: "#87A878" },
  ]

  const LABEL_W = 90
  const BAR_MAX = 168
  const ROW_H   = 34
  const START_Y = 20

  return (
    <div>
      <svg viewBox={`0 0 ${W} 125`} className="w-full" aria-hidden="true">
        {/* Column header */}
        <text
          x={LABEL_W + 2} y={12}
          fontSize="6.5" fontFamily="monospace"
          fill="#C9F2EE" fillOpacity="0.32"
        >
          Relative gain (approximate — exact values not published)
        </text>

        {features.map((f, i) => {
          const y    = START_Y + i * ROW_H
          const barW = f.relGain * BAR_MAX
          const isH  = hov === i

          return (
            <g key={f.label}>
              {/* Track */}
              <rect
                x={LABEL_W} y={y + 8}
                width={BAR_MAX} height={14} rx="3"
                fill="#C9F2EE" fillOpacity="0.05"
              />
              {/* Bar */}
              <rect
                x={LABEL_W} y={y + 8}
                width={barW} height={14} rx="3"
                fill={isH ? "#C7FF35" : f.color}
                fillOpacity={isH ? 0.75 : 0.48}
                style={reduced ? undefined : { transition: "fill-opacity 120ms ease, fill 100ms ease" }}
                onPointerEnter={() => setHov(i)}
                onPointerLeave={() => setHov(null)}
                className="cursor-pointer"
              />
              {/* Feature label */}
              <text
                x={LABEL_W - 5} y={y + 17}
                textAnchor="end" fontSize="9"
                fill="#FAF9F6" fillOpacity={isH ? 0.90 : 0.65}
              >
                {f.label}
              </text>
              <text
                x={LABEL_W - 5} y={y + 27}
                textAnchor="end" fontSize="6.5"
                fill="#FAF9F6" fillOpacity="0.35"
              >
                {f.sublabel}
              </text>
              {/* Rank */}
              <text
                x={LABEL_W + barW + 5} y={y + 17}
                fontSize="8" fontFamily="monospace"
                fill={isH ? "#C7FF35" : "#C9F2EE"}
                fillOpacity={isH ? 0.95 : 0.48}
              >
                {isH ? `Rank ${i + 1}` : `#${i + 1}`}
              </text>
            </g>
          )
        })}
      </svg>

      <p className="mt-1.5 text-[10px] leading-relaxed text-white/50 font-mono">
        Ranking confirmed from original XGBoost output. Exact gain values are approximate.
      </p>

      <p className="mt-3 text-[11px] leading-relaxed text-white/68">
        XGBoost assigns each feature a gain score reflecting how much it improved the model at each decision split. Education (college versus below college) was the most important predictor by a wide margin, followed by insurance coverage and family savings. Gain measures usefulness in splitting — not the direction or magnitude of the effect on vaccination likelihood.
      </p>
    </div>
  )
}

// ── Chart F: Logistic Regression Coefficient Direction ────────────────────────

export function HpvLogiCoefficientsChart() {
  const [hov, setHov] = useState<number | null>(null)
  const reduced = useReducedMotion()

  // Direction of each predictor's association with HPV vaccination (coded 1 = Yes).
  // Magnitudes are qualitative approximations; exact values not extracted from course output.
  const coefs = [
    { label: "Education", sublabel: "College or Above", coef: +0.62, color: "#C9F2EE" },
    { label: "Insurance", sublabel: "Not Covered",      coef: -0.44, color: "#F1D7E4" },
    { label: "Savings",   sublabel: "$3,000 or More",   coef: +0.22, color: "#87A878" },
  ]

  const maxAbs    = 0.62
  const CENTER    = 180   // shifted right to give label area more room
  const BAR_SCALE = 95
  const ROW_H     = 36
  const START_Y   = 22

  return (
    <div>
      <svg viewBox={`0 0 ${W} 138`} className="w-full" aria-hidden="true">
        {/* Direction axis labels */}
        <text
          x={CENTER - 6} y={14}
          textAnchor="end" fontSize="7" fontFamily="monospace"
          fill="#F1D7E4" fillOpacity="0.58"
        >
          lower vaccination
        </text>
        <text
          x={CENTER + 6} y={14}
          textAnchor="start" fontSize="7" fontFamily="monospace"
          fill="#C9F2EE" fillOpacity="0.58"
        >
          higher vaccination
        </text>

        {/* Zero / center line */}
        <line
          x1={CENTER} y1={18}
          x2={CENTER} y2={START_Y + coefs.length * ROW_H + 4}
          stroke="#FAF9F6" strokeWidth="0.6" strokeOpacity="0.15"
        />

        {coefs.map((c, i) => {
          const y    = START_Y + i * ROW_H
          const barW = (Math.abs(c.coef) / maxAbs) * BAR_SCALE
          const isPos = c.coef > 0
          const isH  = hov === i
          const barX = isPos ? CENTER : CENTER - barW

          return (
            <g key={c.label}>
              {/* Track */}
              <rect
                x={CENTER - BAR_SCALE} y={y + 8}
                width={BAR_SCALE * 2} height={14} rx="3"
                fill="#C9F2EE" fillOpacity="0.04"
              />
              {/* Bar */}
              <rect
                x={barX} y={y + 8}
                width={barW} height={14} rx="3"
                fill={isH ? "#C7FF35" : c.color}
                fillOpacity={isH ? 0.78 : 0.50}
                style={reduced ? undefined : { transition: "fill-opacity 120ms ease, fill 100ms ease" }}
                onPointerEnter={() => setHov(i)}
                onPointerLeave={() => setHov(null)}
                className="cursor-pointer"
              />
              {/* Feature label — left of track */}
              <text
                x={CENTER - BAR_SCALE - 4} y={y + 17}
                textAnchor="end" fontSize="9"
                fill="#FAF9F6" fillOpacity={isH ? 0.88 : 0.62}
              >
                {c.label}
              </text>
              <text
                x={CENTER - BAR_SCALE - 4} y={y + 27}
                textAnchor="end" fontSize="6.5"
                fill="#FAF9F6" fillOpacity="0.32"
              >
                {c.sublabel}
              </text>
              {/* Direction sign on hover */}
              {isH && (
                <text
                  x={CENTER + BAR_SCALE + 4} y={y + 17}
                  textAnchor="start" fontSize="7" fontFamily="monospace"
                  fill="#C7FF35" fillOpacity="0.80"
                >
                  {isPos ? "+" : "-"}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      <p className="mt-1.5 text-[10px] leading-relaxed text-white/50 font-mono">
        Direction qualitative. Magnitudes approximate — exact values not extracted from course output.
      </p>

      <p className="mt-3 text-[11px] leading-relaxed text-white/68">
        Bars extending right indicate a positive association with HPV vaccination; bars extending left indicate a negative association. College education was most strongly associated with higher vaccination likelihood, while lacking insurance was associated with lower odds. Note: the logistic model classified every respondent as vaccinated (see Limitations), so these directions reflect coefficient signs rather than discriminative performance.
      </p>
    </div>
  )
}
