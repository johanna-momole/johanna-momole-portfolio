"use client"

import { useReducedMotion } from "motion/react"
import {
  ComposedChart, Bar, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts"
import { quarterlyData, quarterlyFdaEvents } from "@/content/case-studies/glp1-chart-data"

const COLOR_HP       = "#5897C4"
const COLOR_CONSUMER = "#D9D1FF"
const COLOR_OTHER    = "#4A5A68"
const COLOR_LINE     = "#C7FF35"

type TooltipProps = {
  active?: boolean
  payload?: Array<{ name: string; value: number; fill?: string; stroke?: string }>
  label?: string
}

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  const hp  = payload.find((p) => p.name === "hp")?.value ?? 0
  const con = payload.find((p) => p.name === "consumer")?.value ?? 0
  const oth = payload.find((p) => p.name === "other")?.value ?? 0
  const pct = payload.find((p) => p.name === "consumerPct")?.value ?? 0
  const total = hp + con + oth
  return (
    <div className="rounded-[10px] border border-white/[0.12] bg-[#080F1C]/95 px-3 py-2.5 text-[10px] backdrop-blur-sm">
      <p className="mb-2 font-semibold text-white/80">{label}</p>
      <p style={{ color: COLOR_HP }}       className="mb-0.5">Health professional: {hp.toLocaleString()}</p>
      <p style={{ color: COLOR_CONSUMER }} className="mb-0.5">Consumer: {con.toLocaleString()}</p>
      <p style={{ color: COLOR_OTHER }}    className="mb-0.5">Other / unknown: {oth.toLocaleString()}</p>
      <p className="mt-1.5 border-t border-white/[0.08] pt-1.5 text-white/55">
        Total: <span className="text-white/75">{total.toLocaleString()}</span>
        &ensp;&middot;&ensp;Consumer%: <span style={{ color: COLOR_LINE }}>{pct}%</span>
      </p>
    </div>
  )
}

export function Glp1QuarterlyTrendChart() {
  const reducedMotion = useReducedMotion() ?? false

  return (
    <div className="w-full">
      <p className="mb-3 text-[9px] font-medium tracking-[0.14em] uppercase text-white/38">
        Q1 2021 – Q4 2024 · FAERS Deduplicated Cases · Reporter Composition
      </p>

      <div className="overflow-hidden rounded-[14px] bg-[#070E1A]">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart
            data={quarterlyData}
            margin={{ top: 4, right: 48, left: 4, bottom: 28 }}
          >
          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />

          <XAxis
            dataKey="quarter"
            tick={{ fill: "rgba(255,255,255,0.38)", fontSize: 7.5 }}
            axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
            tickLine={false}
            angle={-40}
            textAnchor="end"
            interval={0}
          />

          <YAxis
            yAxisId="left"
            tick={{ fill: "rgba(255,255,255,0.38)", fontSize: 8.5 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            tick={{ fill: COLOR_LINE, fontSize: 8.5, fillOpacity: 0.55 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}%`}
          />

          {quarterlyFdaEvents.map(({ quarter, label }) => (
            <ReferenceLine
              key={quarter}
              x={quarter}
              yAxisId="left"
              stroke="rgba(255,255,255,0.14)"
              strokeDasharray="3 3"
              label={{
                value: label,
                fill: "rgba(255,255,255,0.30)",
                fontSize: 6.5,
                position: "insideTopRight" as const,
              }}
            />
          ))}

          <Bar
            yAxisId="left" dataKey="hp"
            stackId="a" fill={COLOR_HP}
            name="hp" isAnimationActive={!reducedMotion}
          />
          <Bar
            yAxisId="left" dataKey="consumer"
            stackId="a" fill={COLOR_CONSUMER}
            name="consumer" isAnimationActive={!reducedMotion}
          />
          <Bar
            yAxisId="left" dataKey="other"
            stackId="a" fill={COLOR_OTHER}
            name="other" isAnimationActive={!reducedMotion}
          />

          <Line
            yAxisId="right"
            dataKey="consumerPct"
            name="consumerPct"
            stroke={COLOR_LINE}
            strokeWidth={1.5}
            dot={{ r: 2.5, fill: COLOR_LINE, strokeWidth: 0 }}
            activeDot={{ r: 4, fill: COLOR_LINE }}
            isAnimationActive={!reducedMotion}
          />

          <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        {[
          { color: COLOR_HP,       label: "Health professional" },
          { color: COLOR_CONSUMER, label: "Consumer" },
          { color: COLOR_OTHER,    label: "Other / unknown" },
          { color: COLOR_LINE,     label: "Consumer %" },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1.5 text-[9px] text-white/40">
            <span className="size-2 rounded-full shrink-0" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>

      <p className="mt-5 border-t border-white/[0.06] pt-4 text-sm leading-relaxed text-white/65">
        Each bar shows the number of GLP-1 adverse event reports received by the FDA per quarter, broken down by who submitted them. The chartreuse line tracks the share from consumer reporters (patients and caregivers). Spikes near labeled approval dates reflect stimulated reporting, a pattern where media attention temporarily inflates submission counts rather than indicating new safety concerns.
      </p>
    </div>
  )
}
