"use client"

import { useState } from "react"
import { forestData, type ForestRow } from "@/content/case-studies/glp1-chart-data"

// ── Layout ────────────────────────────────────────────────────────────────────

const W        = 620
const H        = 380
const M        = { top: 24, right: 8, bottom: 36, left: 148 }
const PW       = W - M.left - M.right   // 464
const PH       = H - M.top  - M.bottom  // 250
const GROUPS   = ["Gastrointestinal", "Pancreatitis", "Gallbladder/Biliary",
                   "Hypoglycemia", "Renal", "Psychiatric", "Cardiovascular"]
const N_GROUPS = GROUPS.length           // 7
const ROW_H    = PH / N_GROUPS           // ~35.7px
const OFFSET   = ROW_H * 0.22           // vertical gap between F and M per group
const LOG_MIN  = Math.log10(0.45)       // ≈ -0.347
const LOG_MAX  = Math.log10(10.5)       // ≈ 1.021
const LOG_SPAN = LOG_MAX - LOG_MIN

function xPos(ror: number): number {
  return M.left + ((Math.log10(ror) - LOG_MIN) / LOG_SPAN) * PW
}
function yGroup(groupIdx: number): number {
  return M.top + ROW_H * groupIdx + ROW_H / 2
}

const COLOR_F = "#F1D7E4"  // blush
const COLOR_M = "#C9F2EE"  // aqua

const X_TICKS = [0.5, 1, 2, 3, 5, 8]

// ── Tooltip ───────────────────────────────────────────────────────────────────

type TipState = { row: ForestRow; svgX: number; svgY: number } | null

function ForestTooltip({ tip }: { tip: TipState }) {
  if (!tip) return null
  return (
    <div
      className="pointer-events-none absolute z-10 rounded-[10px] border border-white/[0.12] bg-[#080F1C]/95 px-3 py-2 text-[10px] backdrop-blur-sm"
      style={{ left: tip.svgX + 10, top: Math.max(4, tip.svgY - 64) }}
    >
      <p className="mb-1 font-semibold text-white/85">{tip.row.group}</p>
      <p style={{ color: tip.row.sex === "female" ? COLOR_F : COLOR_M }}
         className="mb-1.5 text-[9px] capitalize">{tip.row.sex}</p>
      <div className="space-y-0.5 border-t border-white/[0.08] pt-1.5">
        <p className="text-white/55">ROR: <span className="text-white/80">{tip.row.ror.toFixed(2)}</span></p>
        <p className="text-white/45">95% CI: {tip.row.ciLo.toFixed(2)} – {tip.row.ciHi.toFixed(2)}</p>
        <p className="text-white/35 text-[9px]">n = {tip.row.n.toLocaleString()}</p>
      </div>
    </div>
  )
}

// ── Chart ─────────────────────────────────────────────────────────────────────

export function Glp1ForestPlotChart() {
  const [tip, setTip] = useState<TipState>(null)

  function handleEnter(e: React.MouseEvent<SVGCircleElement>, row: ForestRow) {
    const svg = e.currentTarget.closest("svg") as SVGSVGElement
    const svgRect = svg.getBoundingClientRect()
    const container = svg.parentElement as HTMLElement
    const cRect = container.getBoundingClientRect()
    const scale = svgRect.width / W
    const cx = parseFloat(e.currentTarget.getAttribute("cx") ?? "0")
    const cy = parseFloat(e.currentTarget.getAttribute("cy") ?? "0")
    setTip({
      row,
      svgX: svgRect.left - cRect.left + cx * scale,
      svgY: svgRect.top  - cRect.top  + cy * scale,
    })
  }

  // Index data by (group, sex)
  const dataMap = new Map<string, ForestRow>()
  for (const row of forestData) dataMap.set(`${row.group}|${row.sex}`, row)

  return (
    <div className="relative w-full select-none">
      <p className="mb-3 text-[9px] font-medium tracking-[0.14em] uppercase text-white/38">
        Pre-Specified Groups · ROR with 95% CI · Female vs Male
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Forest plot of pre-specified clinical group signals stratified by sex for GLP-1 therapies"
        onMouseLeave={() => setTip(null)}
      >
        <rect width={W} height={H} fill="#070E1A" />

        {/* Vertical grid at tick marks */}
        {X_TICKS.map((t) => (
          <line key={t}
            x1={xPos(t)} y1={M.top}
            x2={xPos(t)} y2={M.top + PH}
            stroke="rgba(255,255,255,0.05)" strokeWidth="1"
          />
        ))}

        {/* Reference line at ROR = 1 */}
        <line
          x1={xPos(1)} y1={M.top - 4}
          x2={xPos(1)} y2={M.top + PH + 4}
          stroke="rgba(255,255,255,0.22)" strokeWidth="0.9" strokeDasharray="4 3"
        />

        {/* Group labels and error bars */}
        {GROUPS.map((group, gi) => {
          const yMid = yGroup(gi)
          const rowF = dataMap.get(`${group}|female`)
          const rowM = dataMap.get(`${group}|male`)

          return (
            <g key={group}>
              {/* Group label */}
              <text
                x={M.left - 10} y={yMid + 3.5}
                textAnchor="end" fontSize="9.5"
                fill="rgba(255,255,255,0.65)"
              >
                {group}
              </text>

              {/* Female error bar */}
              {rowF && (() => {
                const y = yMid - OFFSET
                const xC  = xPos(rowF.ror)
                const xLo = xPos(rowF.ciLo)
                const xHi = xPos(rowF.ciHi)
                return (
                  <g>
                    <line x1={xLo} y1={y} x2={xHi} y2={y}
                      stroke={COLOR_F} strokeWidth="1.2" strokeOpacity="0.75" />
                    <line x1={xLo} y1={y - 3} x2={xLo} y2={y + 3}
                      stroke={COLOR_F} strokeWidth="1.2" strokeOpacity="0.75" />
                    <line x1={xHi} y1={y - 3} x2={xHi} y2={y + 3}
                      stroke={COLOR_F} strokeWidth="1.2" strokeOpacity="0.75" />
                    <circle
                      cx={xC} cy={y} r={5}
                      fill={COLOR_F} fillOpacity="0.85"
                      className="cursor-default"
                      onMouseEnter={(e) => handleEnter(e, rowF)}
                    />
                  </g>
                )
              })()}

              {/* Male error bar */}
              {rowM && (() => {
                const y = yMid + OFFSET
                const xC  = xPos(rowM.ror)
                const xLo = xPos(rowM.ciLo)
                const xHi = xPos(rowM.ciHi)
                return (
                  <g>
                    <line x1={xLo} y1={y} x2={xHi} y2={y}
                      stroke={COLOR_M} strokeWidth="1.2" strokeOpacity="0.75" />
                    <line x1={xLo} y1={y - 3} x2={xLo} y2={y + 3}
                      stroke={COLOR_M} strokeWidth="1.2" strokeOpacity="0.75" />
                    <line x1={xHi} y1={y - 3} x2={xHi} y2={y + 3}
                      stroke={COLOR_M} strokeWidth="1.2" strokeOpacity="0.75" />
                    <circle
                      cx={xC} cy={y} r={5}
                      fill={COLOR_M} fillOpacity="0.85"
                      className="cursor-default"
                      onMouseEnter={(e) => handleEnter(e, rowM)}
                    />
                  </g>
                )
              })()}
            </g>
          )
        })}

        {/* X-axis ticks and labels */}
        {X_TICKS.map((t) => (
          <text key={t}
            x={xPos(t)} y={M.top + PH + 16}
            textAnchor="middle" fontSize="9.5"
            fill="rgba(255,255,255,0.40)"
          >{t}</text>
        ))}

        {/* X-axis title */}
        <text
          x={M.left + PW / 2} y={H - 4}
          textAnchor="middle" fontSize="10"
          fill="rgba(255,255,255,0.42)"
        >
          Reporting Odds Ratio (95% CI)
        </text>

        {/* Legend */}
        <g>
          <circle cx={M.left + 10} cy={M.top + 8} r={5}
            fill={COLOR_F} fillOpacity="0.85" />
          <text x={M.left + 20} y={M.top + 12}
            fontSize="9" fill="rgba(255,255,255,0.45)">Female</text>
          <circle cx={M.left + 72} cy={M.top + 8} r={5}
            fill={COLOR_M} fillOpacity="0.85" />
          <text x={M.left + 82} y={M.top + 12}
            fontSize="9" fill="rgba(255,255,255,0.45)">Male</text>
        </g>
      </svg>

      <ForestTooltip tip={tip} />

      <p className="mt-5 border-t border-white/[0.06] pt-4 text-sm leading-relaxed text-white/65">
        Each row is an adverse event category. The dot shows how much more (or less) often that category was reported with GLP-1 therapies compared to all other drugs in FAERS. Values to the right of 1.0 (the dashed line) indicate elevated reporting. Pink represents female patients; teal represents male patients. Gastrointestinal and pancreatitis signals are elevated across both sexes; cardiovascular events are underrepresented. Hover over any point for exact figures.
      </p>
    </div>
  )
}
