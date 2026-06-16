"use client"

import { motion, useReducedMotion } from "motion/react"
import { GlassPanel } from "@/components/shared/GlassPanel"
import { cn } from "@/lib/utils"

interface EvidenceCardProps {
  category: string
  value: string
  label: string
  detail: string
  floatDelay?: number
  className?: string
}

const MiniSparkline = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 60 20"
    aria-hidden="true"
    className={cn("w-full opacity-60", className)}
  >
    <polyline
      points="0,16 10,12 20,14 30,6 40,10 50,4 60,7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const MiniBarChart = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 60 20"
    aria-hidden="true"
    className={cn("w-full opacity-60", className)}
  >
    <rect x="0" y="10" width="8" height="10" rx="1" fill="currentColor" opacity="0.5" />
    <rect x="11" y="5" width="8" height="15" rx="1" fill="currentColor" opacity="0.5" />
    <rect x="22" y="8" width="8" height="12" rx="1" fill="currentColor" opacity="0.5" />
    <rect x="33" y="2" width="8" height="18" rx="1" fill="currentColor" />
    <rect x="44" y="6" width="8" height="14" rx="1" fill="currentColor" opacity="0.5" />
  </svg>
)

const MiniProgress = ({
  value,
  className,
}: {
  value: number
  className?: string
}) => (
  <div
    className={cn("relative h-1 rounded-full overflow-hidden bg-white/10", className)}
    role="presentation"
  >
    <div
      className="absolute left-0 top-0 h-full rounded-full bg-chartreuse"
      style={{ width: `${value}%` }}
    />
  </div>
)

export function EvidenceCard({
  category,
  value,
  label,
  detail,
  floatDelay = 0,
  className,
}: EvidenceCardProps) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      animate={
        prefersReduced
          ? {}
          : {
              y: [0, -8, 0],
              transition: {
                duration: 4 + floatDelay * 0.5,
                delay: floatDelay,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
      }
      className={cn("pointer-events-none select-none", className)}
    >
      <GlassPanel variant="dark" className="w-[178px] p-4">
        {/* Category eyebrow */}
        <p className="mb-2 text-[9px] font-medium tracking-[0.16em] uppercase text-aqua/60">
          {category}
        </p>

        {/* Metric value */}
        <p className="mb-0.5 text-2xl font-bold leading-none text-white">
          {value}
        </p>

        {/* Label */}
        <p className="mb-3 text-[11px] leading-snug text-white/55">{label}</p>

        {/* Mini visualization */}
        <div className="text-aqua">
          {category === "Workflow Efficiency" ? (
            <MiniProgress value={45.5} className="mb-1" />
          ) : category === "Referral Analytics" ? (
            <MiniBarChart className="h-5" />
          ) : (
            <MiniSparkline className="h-5" />
          )}
        </div>

        {/* Detail label */}
        <p className="mt-2 text-[9px] text-white/30">{detail}</p>
      </GlassPanel>
    </motion.div>
  )
}
