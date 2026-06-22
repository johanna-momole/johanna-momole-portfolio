import React, { type ReactNode } from "react"
import type { OutputPreview } from "@/content/case-studies/types"

function ForestPlotSVG() {
  const rows = [
    { label: "AE Category A · ♀", y: 42, lo: 90,  hi: 165, pt: 130 },
    { label: "AE Category A · ♂", y: 58, lo: 75,  hi: 145, pt: 108 },
    { label: "AE Category B · ♀", y: 74, lo: 118, hi: 178, pt: 152 },
    { label: "AE Category B · ♂", y: 90, lo: 88,  hi: 160, pt: 122 },
    { label: "AE Category C · ♀", y: 106, lo: 105, hi: 172, pt: 145 },
    { label: "AE Category C · ♂", y: 122, lo: 70,  hi: 150, pt: 98  },
  ]

  return (
    <svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full">
      <rect width="300" height="155" fill="#070E1A" />
      <text x="8" y="12" fontSize="5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace">FOREST PLOT · ROR WITH 95% CI · SEX-STRATIFIED</text>
      <line x1="8" y1="16" x2="292" y2="16" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />

      {/* Null line */}
      <line x1="130" y1="22" x2="130" y2="135" stroke="#7FE7F2" strokeWidth="0.6" strokeDasharray="2 2" strokeOpacity="0.18" />
      <text x="130" y="20" fontSize="4" fill="#7FE7F2" fillOpacity="0.25" fontFamily="monospace" textAnchor="middle">null (ROR=1)</text>

      {rows.map((r) => (
        <g key={r.label}>
          <text x="6" y={r.y + 2} fontSize="4" fill="#7FE7F2" fillOpacity="0.32" fontFamily="monospace">{r.label}</text>
          <line x1={r.lo} y1={r.y} x2={r.hi} y2={r.y} stroke="#7FE7F2" strokeWidth="0.8" strokeOpacity="0.25" />
          <line x1={r.lo} y1={r.y - 2} x2={r.lo} y2={r.y + 2} stroke="#7FE7F2" strokeWidth="0.8" strokeOpacity="0.22" />
          <line x1={r.hi} y1={r.y - 2} x2={r.hi} y2={r.y + 2} stroke="#7FE7F2" strokeWidth="0.8" strokeOpacity="0.22" />
          <rect x={r.pt - 3} y={r.y - 3} width="6" height="6"
            fill="#7FE7F2"
            fillOpacity={0.45}
            transform={`rotate(45 ${r.pt} ${r.y})`} />
        </g>
      ))}

      <line x1="8" y1="137" x2="292" y2="137" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />
      <text x="70" y="147" fontSize="4" fill="#7FE7F2" fillOpacity="0.20" fontFamily="monospace">{"← Favors null"}</text>
      <text x="165" y="147" fontSize="4" fill="#7FE7F2" fillOpacity="0.20" fontFamily="monospace">{"Favors signal →"}</text>
    </svg>
  )
}

function TrendChartSVG() {
  const years = ["2021", "2022", "2023", "2024"]
  const points: [number, number][] = [
    [22, 112], [38, 108], [54, 104], [70, 102],
    [86, 100], [102, 97], [118, 95], [134, 94],
    [150, 92], [166, 88], [182, 85], [198, 84],
    [214, 80], [230, 78], [246, 76], [262, 72],
  ]

  const d = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ")

  return (
    <svg viewBox="0 0 290 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full">
      <rect width="290" height="140" fill="#070E1A" />
      <text x="8" y="12" fontSize="5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace">QUARTERLY REPORTING TREND · Q1 2021 – Q4 2024</text>
      <line x1="8" y1="16" x2="282" y2="16" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />

      {[30, 60, 90, 120].map((y) => (
        <line key={y} x1="18" y1={y} x2="272" y2={y} stroke="#7FE7F2" strokeWidth="0.3" strokeOpacity="0.07" />
      ))}

      {[70, 134, 198].map((x) => (
        <line key={x} x1={x} y1="22" x2={x} y2="128" stroke="#7FE7F2" strokeWidth="0.4" strokeDasharray="2 3" strokeOpacity="0.12" />
      ))}

      {years.map((yr, i) => (
        <text key={yr} x={22 + i * 62} y="128" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.30" fontFamily="monospace">{yr}</text>
      ))}

      <path d={d} fill="none" stroke="#7FE7F2" strokeWidth="1" strokeOpacity="0.35" />

      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2"
          fill={i === 15 ? "#C7FF35" : "#7FE7F2"}
          fillOpacity={i === 15 ? 0.85 : 0.40} />
      ))}

      <line x1="8" y1="130" x2="282" y2="130" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />
    </svg>
  )
}

function DataQualitySVG() {
  const rows = [
    { var: "CASEID",  missingness: "0%",   completeness: 1.00 },
    { var: "Sex",     missingness: "n/a",  completeness: 0.72 },
    { var: "Age",     missingness: "n/a",  completeness: 0.65 },
    { var: "Country", missingness: "n/a",  completeness: 0.88 },
    { var: "Drug",    missingness: "0%",   completeness: 1.00 },
    { var: "AE (PT)", missingness: "0%",   completeness: 1.00 },
  ]

  return (
    <svg viewBox="0 0 290 148" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full">
      <rect width="290" height="148" fill="#070E1A" />
      <text x="8" y="12" fontSize="5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace">DATA QUALITY SUMMARY · MISSINGNESS BY VARIABLE</text>
      <line x1="8" y1="16" x2="282" y2="16" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />

      <text x="10" y="26" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace">Variable</text>
      <text x="100" y="26" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace">Completeness</text>
      <text x="220" y="26" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace">Missing</text>
      <line x1="8" y1="29" x2="282" y2="29" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />

      {rows.map((r, i) => {
        const y = 39 + i * 17
        const barW = r.completeness * 100
        const isFull = r.completeness === 1.0
        return (
          <g key={r.var}>
            <text x="10" y={y + 4} fontSize="5" fill="#7FE7F2" fillOpacity="0.55" fontFamily="monospace">{r.var}</text>
            <rect x="100" y={y - 4} width={barW} height="10" rx="2"
              fill={isFull ? "#C7FF35" : "#7FE7F2"}
              fillOpacity={isFull ? 0.55 : 0.25} />
            <text x="220" y={y + 4} fontSize="5" fill="#7FE7F2" fillOpacity="0.40" fontFamily="monospace">{r.missingness}</text>
          </g>
        )
      })}

      <line x1="8" y1="142" x2="282" y2="142" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.08" />
      <text x="8" y="147" fontSize="4" fill="#7FE7F2" fillOpacity="0.18" fontFamily="monospace">
        Exact missingness values: analysis in progress. Values are illustrative layout only.
      </text>
    </svg>
  )
}

// ── RWE Evidence Studio preview SVGs ─────────────────────────────────────────

function PicotInterfaceSVG() {
  const rows = [
    { key: "P", label: "Population",   hint: "Example criterion" },
    { key: "I", label: "Intervention", hint: "Example criterion" },
    { key: "C", label: "Comparator",   hint: "Example criterion" },
    { key: "O", label: "Outcome",      hint: "Example criterion" },
    { key: "T", label: "Time Horizon", hint: "Example criterion" },
  ]

  return (
    <svg viewBox="0 0 300 170" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full">
      <rect width="300" height="170" fill="#070E1A" />
      <text x="8" y="12" fontSize="5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace">COHORT DEFINITION · PICOT FRAMEWORK</text>
      <line x1="8" y1="16" x2="292" y2="16" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />

      <text x="8"  y="26" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace">Key</text>
      <text x="28" y="26" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace">Component</text>
      <text x="110" y="26" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace">Criterion / Concept</text>
      <line x1="8" y1="29" x2="292" y2="29" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />

      {rows.map((r, i) => {
        const y = 40 + i * 20
        return (
          <g key={r.key}>
            <rect x="8" y={y - 7} width="14" height="12" rx="3"
              fill="#7FE7F2" fillOpacity="0.10" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.30" />
            <text x="15" y={y + 2} fontSize="6" fill="#C7FF35" fillOpacity="0.80"
              fontFamily="monospace" fontWeight="bold" textAnchor="middle">{r.key}</text>
            <text x="28" y={y + 2} fontSize="5" fill="#7FE7F2" fillOpacity="0.65" fontFamily="monospace">{r.label}</text>
            <rect x="108" y={y - 7} width="178" height="12" rx="3"
              fill="#7FE7F2" fillOpacity="0.04" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.20" />
            <text x="116" y={y + 2} fontSize="4.5" fill="#7FE7F2" fillOpacity="0.30" fontFamily="monospace">{r.hint}</text>
          </g>
        )
      })}

      <line x1="8" y1="146" x2="292" y2="146" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />

      <rect x="8" y="150" width="88" height="11" rx="3" fill="#7FE7F2" fillOpacity="0.04" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.22" />
      <text x="16" y="158" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace">+ Add inclusion criterion</text>

      <rect x="106" y="150" width="88" height="11" rx="3" fill="#7FE7F2" fillOpacity="0.04" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.18" />
      <text x="114" y="158" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace">{"− Add exclusion criterion"}</text>

      <text x="8" y="168" fontSize="4" fill="#7FE7F2" fillOpacity="0.18" fontFamily="monospace">
        Illustrative interface layout. Example criteria shown.
      </text>
    </svg>
  )
}

function SqlPreviewSVG() {
  const lines = [
    { text: "-- Illustrative SQL · not executable",        color: "#7FE7F2", op: 0.28 },
    { text: "SELECT  co.person_id,",                       color: "#C7FF35", op: 0.70 },
    { text: "        co.condition_start_date AS index_dt", color: "#7FE7F2", op: 0.55 },
    { text: "FROM    omop.condition_occurrence  co",        color: "#C6A0FF", op: 0.65 },
    { text: "JOIN    omop.observation_period    op",        color: "#C6A0FF", op: 0.55 },
    { text: "  ON    co.person_id = op.person_id",         color: "#7FE7F2", op: 0.40 },
    { text: "WHERE   co.concept_id IN ( concept_set )",    color: "#7FE7F2", op: 0.50 },
    { text: "  AND   co.condition_start_date",             color: "#7FE7F2", op: 0.40 },
    { text: "          BETWEEN op.obs_start_date",         color: "#7FE7F2", op: 0.35 },
    { text: "          AND     op.obs_end_date;",          color: "#7FE7F2", op: 0.35 },
  ]

  return (
    <svg viewBox="0 0 300 158" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full">
      <rect width="300" height="158" fill="#050A14" />

      <rect x="0" y="0" width="300" height="18" fill="#0A1628" />
      <text x="8" y="12" fontSize="5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace">SQL GENERATOR · OMOP CDM QUERY</text>

      <circle cx="272" cy="9" r="3" fill="#7FE7F2" fillOpacity="0.12" />
      <circle cx="282" cy="9" r="3" fill="#7FE7F2" fillOpacity="0.08" />
      <circle cx="292" cy="9" r="3" fill="#7FE7F2" fillOpacity="0.05" />

      <line x1="0" y1="18" x2="300" y2="18" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.12" />

      <rect x="0" y="18" width="18" height="140" fill="#070E1A" />
      <line x1="18" y1="18" x2="18" y2="158" stroke="#7FE7F2" strokeWidth="0.3" strokeOpacity="0.10" />

      {lines.map((l, i) => {
        const y = 28 + i * 13
        return (
          <g key={i}>
            <text x="14" y={y} fontSize="4" fill="#7FE7F2" fillOpacity="0.18" fontFamily="monospace" textAnchor="end">
              {i + 1}
            </text>
            <text x="24" y={y} fontSize="4.8" fill={l.color} fillOpacity={l.op} fontFamily="monospace">
              {l.text}
            </text>
          </g>
        )
      })}

      <text x="8" y="155" fontSize="4" fill="#7FE7F2" fillOpacity="0.15" fontFamily="monospace">
        Illustrative SQL. Does not reference a real database or patient population.
      </text>
    </svg>
  )
}

function BarChartSVG() {
  const rows = [
    { label: "Covariate A", w: 72 },
    { label: "Covariate B", w: 55 },
    { label: "Covariate C", w: 83 },
    { label: "Covariate D", w: 48 },
    { label: "Covariate E", w: 67 },
  ]

  return (
    <svg viewBox="0 0 300 158" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full">
      <rect width="300" height="158" fill="#070E1A" />
      <text x="8" y="12" fontSize="5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace">COHORT DIAGNOSTICS · COVARIATE SUMMARY</text>
      <line x1="8" y1="16" x2="292" y2="16" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />

      <text x="8"  y="26" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace">Covariate</text>
      <text x="105" y="26" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace">Distribution</text>
      <text x="238" y="26" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace">Status</text>
      <line x1="8" y1="29" x2="292" y2="29" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />

      {rows.map((r, i) => {
        const y = 40 + i * 20
        return (
          <g key={r.label}>
            <text x="8" y={y + 4} fontSize="5" fill="#7FE7F2" fillOpacity="0.55" fontFamily="monospace">{r.label}</text>
            <rect x="104" y={y - 4} width="120" height="10" rx="2" fill="#7FE7F2" fillOpacity="0.06" />
            <rect x="104" y={y - 4} width={r.w} height="10" rx="2" fill="#7FE7F2" fillOpacity="0.25" />
            <text x="240" y={y + 4} fontSize="4.5" fill="#7FE7F2" fillOpacity="0.28" fontFamily="monospace">Preview</text>
          </g>
        )
      })}

      <line x1="8" y1="142" x2="292" y2="142" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.08" />
      <text x="8" y="148" fontSize="4" fill="#7FE7F2" fillOpacity="0.18" fontFamily="monospace">
        Diagnostic preview. Values shown are illustrative.
      </text>
      <text x="8" y="155" fontSize="4" fill="#7FE7F2" fillOpacity="0.18" fontFamily="monospace">
        Actual cohort diagnostics require a connected OMOP CDM data source
      </text>
    </svg>
  )
}

// ── Healthcare Referral Analytics preview SVGs ────────────────────────────────

function NetworkSVG() {
  // Provider nodes positioned around a central hospital hub — no real names
  const providers = [
    { cx: 60,  cy: 52,  label: "A" },
    { cx: 118, cy: 28,  label: "B" },
    { cx: 186, cy: 22,  label: "C" },
    { cx: 248, cy: 28,  label: "D" },
    { cx: 278, cy: 66,  label: "E" },
    { cx: 252, cy: 112, label: "F" },
  ]
  const hubCx = 150
  const hubCy = 108

  return (
    <svg viewBox="0 0 300 158" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full">
      <rect width="300" height="158" fill="#070E1A" />
      <text x="8" y="12" fontSize="5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace">PROVIDER NETWORK · REFERRAL STRUCTURE</text>
      <line x1="8" y1="16" x2="292" y2="16" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />

      {/* Zone grouping arc - left side */}
      <ellipse cx="128" cy="68" rx="88" ry="56" fill="#7FE7F2" fillOpacity="0.03" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.10" strokeDasharray="3 3" />
      <text x="34" y="126" fontSize="4" fill="#7FE7F2" fillOpacity="0.22" fontFamily="monospace">Zone A</text>

      {/* Connection lines from providers to hub */}
      {providers.map((p) => (
        <line
          key={p.label}
          x1={p.cx} y1={p.cy}
          x2={hubCx} y2={hubCy}
          stroke="#7FE7F2"
          strokeWidth="0.7"
          strokeOpacity="0.20"
        />
      ))}

      {/* Provider nodes */}
      {providers.map((p) => (
        <g key={p.label}>
          <circle cx={p.cx} cy={p.cy} r="11" fill="#7FE7F2" fillOpacity="0.07" stroke="#7FE7F2" strokeWidth="0.6" strokeOpacity="0.28" />
          <text x={p.cx} y={p.cy + 2} fontSize="6" fill="#7FE7F2" fillOpacity="0.65" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{p.label}</text>
        </g>
      ))}

      {/* Hospital hub — central node */}
      <circle cx={hubCx} cy={hubCy} r="18" fill="#C7FF35" fillOpacity="0.07" stroke="#C7FF35" strokeWidth="0.8" strokeOpacity="0.55" />
      <text x={hubCx} y={hubCy - 2} fontSize="5" fill="#C7FF35" fillOpacity="0.80" fontFamily="monospace" fontWeight="bold" textAnchor="middle">HUB</text>
      <text x={hubCx} y={hubCy + 7} fontSize="4" fill="#C7FF35" fillOpacity="0.40" fontFamily="monospace" textAnchor="middle">Hospital</text>

      {/* Status chip */}
      <rect x="8" y="132" width="104" height="11" rx="3" fill="#7FE7F2" fillOpacity="0.05" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.18" />
      <text x="14" y="140" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace">Active partnerships · 2024</text>

      <line x1="8" y1="146" x2="292" y2="146" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.08" />
      <text x="8" y="155" fontSize="4" fill="#7FE7F2" fillOpacity="0.18" fontFamily="monospace">
        Illustrative portfolio interface · No real provider names or patient data
      </text>
    </svg>
  )
}

function MatrixSVG() {
  const serviceLines = ["Svc A", "Svc B", "Svc C", "Svc D"]
  const zones        = ["Zone 1", "Zone 2", "Zone 3", "Zone 4"]
  // Opacity values per cell — abstract, not derived from real data
  const cells = [
    [0.45, 0.18, 0.30, 0.08],
    [0.12, 0.55, 0.22, 0.35],
    [0.28, 0.14, 0.48, 0.20],
    [0.08, 0.38, 0.15, 0.42],
  ]
  const CELL_W = 52
  const CELL_H = 22
  const ORIGIN_X = 52
  const ORIGIN_Y = 36

  return (
    <svg viewBox="0 0 300 158" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full">
      <rect width="300" height="158" fill="#070E1A" />
      <text x="8" y="12" fontSize="5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace">SERVICE-LINE · GEOGRAPHIC DISTRIBUTION</text>
      <line x1="8" y1="16" x2="292" y2="16" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />

      {/* Column headers */}
      {zones.map((z, j) => (
        <text
          key={z}
          x={ORIGIN_X + j * CELL_W + CELL_W / 2}
          y={ORIGIN_Y - 4}
          fontSize="4.5"
          fill="#7FE7F2"
          fillOpacity="0.30"
          fontFamily="monospace"
          textAnchor="middle"
        >
          {z}
        </text>
      ))}

      {/* Row headers + cells */}
      {serviceLines.map((sl, i) => (
        <g key={sl}>
          <text
            x={ORIGIN_X - 4}
            y={ORIGIN_Y + i * CELL_H + CELL_H / 2 + 2}
            fontSize="4.5"
            fill="#7FE7F2"
            fillOpacity="0.30"
            fontFamily="monospace"
            textAnchor="end"
          >
            {sl}
          </text>
          {cells[i].map((opacity, j) => (
            <rect
              key={j}
              x={ORIGIN_X + j * CELL_W + 1}
              y={ORIGIN_Y + i * CELL_H + 1}
              width={CELL_W - 2}
              height={CELL_H - 2}
              rx="2"
              fill="#7FE7F2"
              fillOpacity={opacity}
            />
          ))}
        </g>
      ))}

      {/* Legend */}
      <text x="8" y="130" fontSize="4" fill="#7FE7F2" fillOpacity="0.22" fontFamily="monospace">Relative activity level →</text>
      <rect x="110" y="124" width="12" height="8" rx="1" fill="#7FE7F2" fillOpacity="0.10" />
      <rect x="126" y="124" width="12" height="8" rx="1" fill="#7FE7F2" fillOpacity="0.25" />
      <rect x="142" y="124" width="12" height="8" rx="1" fill="#7FE7F2" fillOpacity="0.45" />

      <line x1="8" y1="136" x2="292" y2="136" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.08" />
      <text x="8" y="143" fontSize="4" fill="#7FE7F2" fillOpacity="0.18" fontFamily="monospace">
        Synthetic representative view · Abstract categories only
      </text>
      <text x="8" y="152" fontSize="4" fill="#7FE7F2" fillOpacity="0.15" fontFamily="monospace">
        No geographic identifiers or operational records shown
      </text>
    </svg>
  )
}

// ── Visual map ────────────────────────────────────────────────────────────────

import {
  RweAttritionFunnelSVG,
  RweSqlWorkspaceSVG,
  RweBaselineBalanceSVG,
  RweEvidenceBriefSVG,
} from "@/components/case-study/RweOutputVisuals"

const VISUAL_MAP: Record<OutputPreview["visualType"], () => React.ReactElement> = {
  "forest-plot":            ForestPlotSVG,
  "trend-chart":            TrendChartSVG,
  "table":                  DataQualitySVG,
  "bar-chart":              BarChartSVG,
  "picot-interface":        PicotInterfaceSVG,
  "sql-preview":            SqlPreviewSVG,
  "network":                NetworkSVG,
  "matrix":                 MatrixSVG,
  "rwe-attrition-funnel":   RweAttritionFunnelSVG,
  "rwe-sql-workspace":      RweSqlWorkspaceSVG,
  "rwe-baseline-balance":   RweBaselineBalanceSVG,
  "rwe-evidence-brief":     RweEvidenceBriefSVG,
}

import Image from "next/image"

interface OutputPreviewCardProps {
  preview: OutputPreview
  chartContent?: ReactNode
}

function PlaceholderVisual({ preview }: { preview: OutputPreview }) {
  const Visual = VISUAL_MAP[preview.visualType]
  return (
    <div className="relative overflow-hidden">
      <Visual />
      <div className="absolute inset-0 flex items-center justify-center bg-black/55">
        <div className="rounded-[10px] border border-white/10 bg-[#050713]/80 px-4 py-2.5 text-center backdrop-blur-sm">
          <p className="text-[9px] font-medium tracking-[0.14em] uppercase text-white/45">
            Analysis output preview
          </p>
          <p className="mt-0.5 text-[8px] text-white/28">
            Illustrative layout. Actual findings not shown.
          </p>
        </div>
      </div>
    </div>
  )
}

function RealImageVisual({ preview }: { preview: OutputPreview }) {
  return (
    <>
      <div className="relative w-full overflow-hidden bg-[#060E18]" style={{ aspectRatio: "5/3" }}>
        <Image
          src={preview.imageSrc!}
          alt={preview.imageAlt ?? preview.title}
          fill
          className="object-contain p-2"
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 380px"
        />
      </div>
      <p className="border-t border-white/[0.06] px-4 pt-2 pb-1 text-[9px] leading-relaxed text-white/28">
        Original output generated by the project pipeline using the example dataset
      </p>
    </>
  )
}

export function OutputPreviewCard({ preview, chartContent }: OutputPreviewCardProps) {
  const hasChart     = Boolean(chartContent)
  const hasRealImage = !hasChart && Boolean(preview.imageSrc)
  const isPolished   = !hasChart && !hasRealImage && !preview.isPlaceholder

  return (
    <div className="overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02]">
      {/* Banner: title + chip */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
        <span className="text-[9px] font-medium tracking-[0.16em] uppercase text-aqua/55">
          {preview.title}
        </span>
        {hasChart ? (
          <span className="rounded-full border border-chartreuse/22 bg-chartreuse/[0.06] px-2 py-0.5 text-[8px] font-medium tracking-wide text-chartreuse/70">
            Analysis output
          </span>
        ) : hasRealImage ? (
          <span className="rounded-full border border-organic-green/22 bg-organic-green/[0.06] px-2 py-0.5 text-[8px] font-medium tracking-wide text-organic-green/65">
            Original project output
          </span>
        ) : isPolished ? (
          <span className="rounded-full border border-aqua/22 bg-aqua/[0.05] px-2 py-0.5 text-[8px] font-medium tracking-wide text-aqua/65">
            Analysis preview
          </span>
        ) : (
          <span className="rounded-full border border-blush/20 bg-blush/5 px-2 py-0.5 text-[8px] font-medium tracking-wide text-blush/55">
            Illustrative output structure
          </span>
        )}
      </div>

      {/* Visual area */}
      {hasChart ? (
        <div className="px-4 py-4">{chartContent}</div>
      ) : hasRealImage ? (
        <RealImageVisual preview={preview} />
      ) : isPolished ? (
        <div className="relative overflow-hidden">
          {(() => {
            const Visual = VISUAL_MAP[preview.visualType]
            return Visual ? <Visual /> : null
          })()}
        </div>
      ) : (
        <PlaceholderVisual preview={preview} />
      )}

      {/* Description — suppressed for interactive chart cards; the chart renders its own explanation */}
      {!hasChart && (
        <div className="px-4 py-3">
          <p className="text-[11px] leading-relaxed text-white/62">
            {preview.description}
          </p>
        </div>
      )}
    </div>
  )
}
