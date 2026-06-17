import type { OutputPreview } from "@/content/case-studies/glp1-pharmacovigilance"

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
      <text x="70" y="147" fontSize="4" fill="#7FE7F2" fillOpacity="0.20" fontFamily="monospace">← Favors null</text>
      <text x="165" y="147" fontSize="4" fill="#7FE7F2" fillOpacity="0.20" fontFamily="monospace">Favors signal →</text>
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

      {/* Y axis grid */}
      {[30, 60, 90, 120].map((y) => (
        <line key={y} x1="18" y1={y} x2="272" y2={y} stroke="#7FE7F2" strokeWidth="0.3" strokeOpacity="0.07" />
      ))}

      {/* Year separators */}
      {[70, 134, 198].map((x) => (
        <line key={x} x1={x} y1="22" x2={x} y2="128" stroke="#7FE7F2" strokeWidth="0.4" strokeDasharray="2 3" strokeOpacity="0.12" />
      ))}

      {/* Year labels */}
      {years.map((yr, i) => (
        <text key={yr} x={22 + i * 62} y="128" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.30" fontFamily="monospace">{yr}</text>
      ))}

      {/* Trend line */}
      <path d={d} fill="none" stroke="#7FE7F2" strokeWidth="1" strokeOpacity="0.35" />

      {/* Dots */}
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
    { var: "Sex",     missingness: "—",    completeness: 0.72 },
    { var: "Age",     missingness: "—",    completeness: 0.65 },
    { var: "Country", missingness: "—",    completeness: 0.88 },
    { var: "Drug",    missingness: "0%",   completeness: 1.00 },
    { var: "AE (PT)", missingness: "0%",   completeness: 1.00 },
  ]

  return (
    <svg viewBox="0 0 290 148" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full">
      <rect width="290" height="148" fill="#070E1A" />
      <text x="8" y="12" fontSize="5" fill="#7FE7F2" fillOpacity="0.35" fontFamily="monospace">DATA QUALITY SUMMARY · MISSINGNESS BY VARIABLE</text>
      <line x1="8" y1="16" x2="282" y2="16" stroke="#7FE7F2" strokeWidth="0.4" strokeOpacity="0.10" />

      {/* Column headers */}
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
        Exact missingness values: analysis in progress — values are illustrative layout only
      </text>
    </svg>
  )
}

const VISUAL_MAP = {
  "forest-plot":  ForestPlotSVG,
  "trend-chart":  TrendChartSVG,
  "table":        DataQualitySVG,
}

interface OutputPreviewCardProps {
  preview: OutputPreview
}

export function OutputPreviewCard({ preview }: OutputPreviewCardProps) {
  const Visual = VISUAL_MAP[preview.visualType]

  return (
    <div className="overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02]">
      {/* Preview label banner */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
        <span className="text-[9px] font-medium tracking-[0.16em] uppercase text-aqua/55">
          {preview.title}
        </span>
        <span className="rounded-full border border-blush/20 bg-blush/5 px-2 py-0.5 text-[8px] font-medium tracking-wide text-blush/55">
          Preview — findings not shown
        </span>
      </div>

      {/* SVG visualization placeholder */}
      <div className="relative overflow-hidden">
        <Visual />
        {/* Full-surface dim + centered label */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/55">
          <div className="rounded-[10px] border border-white/10 bg-[#050713]/80 px-4 py-2.5 text-center backdrop-blur-sm">
            <p className="text-[9px] font-medium tracking-[0.14em] uppercase text-white/45">
              Analysis output preview
            </p>
            <p className="mt-0.5 text-[8px] text-white/28">
              Illustrative layout — actual findings not shown
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-3">
        <p className="text-[11px] leading-relaxed text-white/40">
          {preview.description}
        </p>
      </div>
    </div>
  )
}
