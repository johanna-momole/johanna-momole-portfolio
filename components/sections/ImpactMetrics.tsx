"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

import { siteConfig } from "@/content/site"
import { cn } from "@/lib/utils"

function MetricItem({
  value,
  label,
  index,
}: {
  value: string
  label: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: prefersReduced ? 0 : 0.55,
        delay: prefersReduced ? 0 : 0.08 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "flex flex-col gap-2 px-8 py-6",
        "border-b border-white/10 last:border-b-0",
        "sm:border-b-0 sm:border-r sm:last:border-r-0"
      )}
    >
      <p
        className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        aria-label={`${value}: ${label}`}
      >
        {value}
      </p>
      <p className="text-sm leading-snug text-muted-foreground">{label}</p>
    </motion.div>
  )
}

export function ImpactMetrics() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const prefersReduced = useReducedMotion()

  return (
    <section
      className="w-full"
      aria-labelledby="metrics-heading"
    >
      <div className="mx-auto max-w-[1440px] px-8 py-16 md:px-16">
        {/* Context label */}
        <motion.p
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: prefersReduced ? 0 : 0.5, ease: "easeOut" }}
          id="metrics-heading"
          className="mb-10 text-xs font-medium tracking-[0.18em] uppercase text-muted-foreground"
        >
          {siteConfig.metricsContext}
        </motion.p>

        {/* Metrics grid */}
        <div
          className={cn(
            "grid grid-cols-1 overflow-hidden rounded-[24px]",
            "border border-white/10 bg-[#09101D]/55 backdrop-blur-xl",
            "sm:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {siteConfig.metrics.map((metric, i) => (
            <MetricItem
              key={metric.label}
              value={metric.value}
              label={metric.label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
