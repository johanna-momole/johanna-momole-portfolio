"use client"

import { useState, useMemo } from "react"
import { scatterData, type ScatterPoint, type ScatterCategory } from "@/content/case-studies/glp1-chart-data"

// ── Layout ────────────────────────────────────────────────────────────────────

const W      = 520
const H      = 520
const M      = { top: 28, right: 28, bottom: 48, left: 48 }
const PW     = W - M.left - M.right  // 444
const PH     = H - M.top  - M.bottom // 364
const DOMAIN = [-2.3, 2.3] as const

function px(v: number) {
  return M.left + ((v - DOMAIN[0]) / (DOMAIN[1] - DOMAIN[0])) * PW
}
function py(v: number) {
  return M.top + ((DOMAIN[1] - v) / (DOMAIN[1] - DOMAIN[0])) * PH
}

// ── Styles ────────────────────────────────────────────────────────────────────

const STYLE: Record<ScatterCategory, { fill: string; r: number; opacity: number }> = {
  "neither":            { fill: "rgba(255,255,255,0.10)", r: 2.2, opacity: 1 },
  "shared":             { fill: "rgba(255,255,255,0.35)", r: 3,   opacity: 1 },
  "female-only-tested": { fill: "#F1D7E4",                r: 3.5, opacity: 0.50 },
  "male-only-tested":   { fill: "#C9F2EE",                r: 3.5, opacity: 0.50 },
  "female-dominant":    { fill: "#F1D7E4",                r: 5,   opacity: 0.85 },
  "male-dominant":      { fill: "#C9F2EE",                r: 5,   opacity: 0.85 },
}

const RENDER_ORDER: ScatterCategory[] = [
  "neither", "shared", "female-only-tested", "male-only-tested",
  "female-dominant", "male-dominant",
]

const LEGEND_ITEMS: Array<{ cat: ScatterCategory; label: string }> = [
  { cat: "female-dominant",    label: "Female-dominant signal" },
  { cat: "male-dominant",      label: "Male-dominant signal" },
  { cat: "female-only-tested", label: "Signal in females only" },
  { cat: "male-only-tested",   label: "Signal in males only" },
  { cat: "shared",             label: "Shared signal" },
]

const TICKS = [-2, -1, 0, 1, 2]

// ── Tooltip ───────────────────────────────────────────────────────────────────

type TooltipState = { point: ScatterPoint; x: number; y: number } | null

function ScatterTooltip({ tip }: { tip: TooltipState }) {
  if (!tip) return null
  const rorF = Math.pow(10, tip.point.lf).toFixed(2)
  const rorM = Math.pow(10, tip.point.lm).toFixed(2)
  const isMale = tip.point.cat === "male-dominant" || tip.point.cat === "male-only-tested"
  const catLabel = tip.point.cat.replace(/-/g, " ")
  return (
    <div
      className="pointer-events-none absolute z-10 max-w-[200px] rounded-[10px] border border-white/[0.12] bg-[#080F1C]/95 px-3 py-2 text-[10px] backdrop-blur-sm"
      style={{ left: tip.x + 12, top: Math.max(4, tip.y - 72) }}
    >
      <p className="mb-1 font-semibold leading-tight text-white/85">{tip.point.pt}</p>
      <p style={{ color: isMale ? "#C9F2EE" : "#F1D7E4" }} className="mb-1.5 text-[9px] capitalize">
        {catLabel}
      </p>
      <div className="space-y-0.5 border-t border-white/[0.08] pt-1.5">
        <p className="text-white/55">Female ROR: <span className="text-white/75">{rorF}</span></p>
        <p className="text-white/55">Male ROR: <span className="text-white/75">{rorM}</span></p>
        <p className="text-white/35 text-[9px]">
          &#9792; n={tip.point.nf.toLocaleString()} &ensp; &#9794; n={tip.point.nm.toLocaleString()}
        </p>
      </div>
    </div>
  )
}

// ── Chart ─────────────────────────────────────────────────────────────────────

export function Glp1SexScatterChart() {
  const [tip, setTip] = useState<TooltipState>(null)

  const byCategory = useMemo(() => {
    const groups: Partial<Record<ScatterCategory, ScatterPoint[]>> = {}
    for (const cat of RENDER_ORDER) groups[cat] = []
    for (const pt of scatterData) groups[pt.cat]?.push(pt)
    return groups
  }, [])

  function handleEnter(e: React.MouseEvent<SVGCircleElement>, point: ScatterPoint) {
    const svg = e.currentTarget.closest("svg") as SVGSVGElement
    const svgRect = svg.getBoundingClientRect()
    const container = svg.parentElement as HTMLElement
    const contRect = container.getBoundingClientRect()
    const scale = svgRect.width / W
    const cx = parseFloat(e.currentTarget.getAttribute("cx") ?? "0")
    const cy = parseFloat(e.currentTarget.getAttribute("cy") ?? "0")
    setTip({
      point,
      x: svgRect.left - contRect.left + cx * scale,
      y: svgRect.top  - contRect.top  + cy * scale,
    })
  }

  return (
    <div className="relative w-full select-none">
      <p className="mb-3 text-[9px] font-medium tracking-[0.14em] uppercase text-white/38">
        BH-Adjusted Signals · Jointly Evaluable PTs · Q1 2021 – Q4 2024
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Scatter plot: female vs male log10 ROR for GLP-1 therapy adverse events"
        onMouseLeave={() => setTip(null)}
      >
        <rect width={W} height={H} fill="#070E1A" />

        {/* Grid */}
        {TICKS.map((t) => (
          <g key={t}>
            <line x1={px(t)} y1={M.top} x2={px(t)} y2={M.top + PH}
              stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1={M.left} y1={py(t)} x2={M.left + PW} y2={py(t)}
              stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </g>
        ))}

        {/* Zero lines */}
        <line x1={px(0)} y1={M.top} x2={px(0)} y2={M.top + PH}
          stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
        <line x1={M.left} y1={py(0)} x2={M.left + PW} y2={py(0)}
          stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

        {/* Equal disproportionality diagonal */}
        <line
          x1={px(DOMAIN[0])} y1={py(DOMAIN[0])}
          x2={px(DOMAIN[1])} y2={py(DOMAIN[1])}
          stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" strokeDasharray="5 4"
        />

        {/* Data points */}
        {RENDER_ORDER.map((cat) =>
          byCategory[cat]?.map((pt) => (
            <circle
              key={pt.pt}
              cx={px(pt.lf)}
              cy={py(pt.lm)}
              r={STYLE[cat].r}
              fill={STYLE[cat].fill}
              fillOpacity={STYLE[cat].opacity}
              className="cursor-default transition-opacity hover:opacity-100"
              onMouseEnter={(e) => handleEnter(e, pt)}
            />
          ))
        )}

        {/* X-axis ticks */}
        {TICKS.map((t) => (
          <text key={t} x={px(t)} y={M.top + PH + 16} textAnchor="middle"
            fontSize="10" fill="rgba(255,255,255,0.38)">{t}</text>
        ))}

        {/* Y-axis ticks */}
        {TICKS.map((t) => (
          <text key={t} x={M.left - 7} y={py(t) + 3.5} textAnchor="end"
            fontSize="10" fill="rgba(255,255,255,0.38)">{t}</text>
        ))}

        {/* Axis labels */}
        <text x={M.left + PW / 2} y={H - 6} textAnchor="middle"
          fontSize="10.5" fill="rgba(255,255,255,0.45)">
          log&#x2081;&#x2080; ROR (female stratum)
        </text>
        <text
          x={13} y={M.top + PH / 2} textAnchor="middle"
          fontSize="10.5" fill="rgba(255,255,255,0.45)"
          transform={`rotate(-90, 13, ${M.top + PH / 2})`}
        >
          log&#x2081;&#x2080; ROR (male stratum)
        </text>

        {/* Diagonal label */}
        <text
          x={px(1.45)} y={py(1.32)} textAnchor="middle"
          fontSize="8" fill="rgba(255,255,255,0.20)"
          transform={`rotate(-33, ${px(1.45)}, ${py(1.32)})`}
        >
          Equal disproportionality
        </text>

        {/* Legend */}
        {LEGEND_ITEMS.map(({ cat, label }, i) => (
          <g key={cat}>
            <circle
              cx={M.left + 6}
              cy={M.top + 10 + i * 19}
              r={STYLE[cat].r + 0.5}
              fill={STYLE[cat].fill}
              fillOpacity={STYLE[cat].opacity}
            />
            <text
              x={M.left + 16}
              y={M.top + 14 + i * 19}
              fontSize="9" fill="rgba(255,255,255,0.42)"
            >
              {label}
            </text>
          </g>
        ))}
      </svg>

      <ScatterTooltip tip={tip} />

      <p className="mt-5 border-t border-white/[0.06] pt-4 text-sm leading-relaxed text-white/65">
        Each point is one type of adverse event, plotted by how often it was reported in female patients (x-axis) versus male patients (y-axis). Points above the dashed diagonal appear more in males; points below appear more in females. Colored points are statistically significant after multiple-comparison adjustment. Hover over any point to see the adverse event name and exact values.
      </p>
    </div>
  )
}
