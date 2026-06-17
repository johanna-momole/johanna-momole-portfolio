"use client"

import React from "react"
import { motion, useReducedMotion } from "motion/react"
import { GlassPanel } from "@/components/shared/GlassPanel"
import { cn } from "@/lib/utils"

// ── Mini SVG visuals — metric cards only ─────────────────────────────────────

const CaseDots = () => (
  <svg viewBox="0 0 56 14" aria-hidden="true" className="w-full">
    <circle cx="4"  cy="10" r="1.4" fill="currentColor" opacity="0.75" />
    <circle cx="9"  cy="5"  r="1.1" fill="currentColor" opacity="0.55" />
    <circle cx="15" cy="9"  r="1.3" fill="currentColor" opacity="0.65" />
    <circle cx="21" cy="3"  r="1.0" fill="currentColor" opacity="0.45" />
    <circle cx="27" cy="8"  r="1.4" fill="currentColor" opacity="0.70" />
    <circle cx="32" cy="5"  r="1.0" fill="currentColor" opacity="0.40" />
    <circle cx="38" cy="11" r="1.3" fill="currentColor" opacity="0.65" />
    <circle cx="43" cy="4"  r="1.1" fill="currentColor" opacity="0.55" />
    <circle cx="48" cy="8"  r="1.4" fill="currentColor" opacity="0.75" />
    <circle cx="53" cy="6"  r="1.0" fill="currentColor" opacity="0.40" />
    <circle cx="12" cy="12" r="0.9" fill="currentColor" opacity="0.30" />
    <circle cx="30" cy="12" r="0.9" fill="currentColor" opacity="0.30" />
    <circle cx="42" cy="2"  r="0.9" fill="currentColor" opacity="0.35" />
  </svg>
)

const SignalMarks = () => (
  <svg viewBox="0 0 56 16" aria-hidden="true" className="w-full">
    <line x1="0"  y1="13" x2="56" y2="13" stroke="currentColor" strokeWidth="0.7" opacity="0.18" />
    <line x1="0"  y1="7"  x2="56" y2="7"  stroke="currentColor" strokeWidth="0.6" opacity="0.13" strokeDasharray="3,2" />
    <line x1="4"  y1="13" x2="4"  y2="9"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.40" />
    <line x1="10" y1="13" x2="10" y2="5"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
    <line x1="16" y1="13" x2="16" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.40" />
    <line x1="22" y1="13" x2="22" y2="3"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="1.00" />
    <line x1="28" y1="13" x2="28" y2="8"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.50" />
    <line x1="34" y1="13" x2="34" y2="6"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.80" />
    <line x1="40" y1="13" x2="40" y2="9"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.40" />
    <line x1="46" y1="13" x2="46" y2="4"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.90" />
    <line x1="52" y1="13" x2="52" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
  </svg>
)

const NetworkNodes = () => (
  <svg viewBox="0 0 56 16" aria-hidden="true" className="w-full">
    <line x1="7"  y1="8"  x2="22" y2="4"  stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    <line x1="7"  y1="8"  x2="20" y2="13" stroke="currentColor" strokeWidth="0.8" opacity="0.20" />
    <line x1="22" y1="4"  x2="38" y2="7"  stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    <line x1="20" y1="13" x2="38" y2="7"  stroke="currentColor" strokeWidth="0.8" opacity="0.20" />
    <line x1="38" y1="7"  x2="51" y2="4"  stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    <line x1="38" y1="7"  x2="50" y2="13" stroke="currentColor" strokeWidth="0.8" opacity="0.20" />
    <circle cx="7"  cy="8"  r="2.5" fill="currentColor" opacity="0.75" />
    <circle cx="22" cy="4"  r="2.0" fill="currentColor" opacity="0.55" />
    <circle cx="20" cy="13" r="2.0" fill="currentColor" opacity="0.50" />
    <circle cx="38" cy="7"  r="2.5" fill="currentColor" opacity="0.85" />
    <circle cx="51" cy="4"  r="1.8" fill="currentColor" opacity="0.55" />
    <circle cx="50" cy="13" r="1.8" fill="currentColor" opacity="0.50" />
  </svg>
)

// ── Types & lookup tables ─────────────────────────────────────────────────────

// Only metric cards carry data visuals.
// Credential and leadership cards are text-first — no visual key needed.
type VisualKey = "cases" | "signals" | "partnerships"
type CardType  = "metric" | "credential" | "leadership"

const VISUALS: Record<VisualKey, () => React.ReactElement> = {
  cases:        CaseDots,
  signals:      SignalMarks,
  partnerships: NetworkNodes,
}

const ACCENT_COLOR: Record<CardType, string> = {
  metric:     "text-aqua/65",
  credential: "text-lilac/65",
  leadership: "text-blush/65",
}

const HOVER_LIFT: Record<CardType, number> = {
  metric:     -5,
  credential: -3,
  leadership: -3,
}

// ── Component ─────────────────────────────────────────────────────────────────

interface HeroProfileCardProps {
  type: CardType
  eyebrow: string
  primary: string
  secondary: string
  supporting?: string
  visual?: VisualKey       // required for metric; omit for credential/leadership
  floatDelay?: number
  floatY?: number
  floatDuration?: number
  className?: string
}

export function HeroProfileCard({
  type,
  eyebrow,
  primary,
  secondary,
  supporting,
  visual,
  floatDelay = 0,
  floatY = -5,
  floatDuration = 4,
  className,
}: HeroProfileCardProps) {
  const prefersReduced = useReducedMotion()
  const isMetric = type === "metric"
  const MiniVisual = (isMetric && visual) ? VISUALS[visual] : null

  return (
    <motion.div
      animate={
        prefersReduced || floatY === 0
          ? {}
          : {
              y: [0, floatY, 0],
              transition: {
                duration: floatDuration,
                delay: floatDelay,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
      }
      whileHover={
        prefersReduced
          ? {}
          : { y: HOVER_LIFT[type], transition: { duration: 0.22, ease: "easeOut" } }
      }
      tabIndex={0}
      className={cn(
        "group select-none rounded-[20px] outline-none",
        "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-0",
        className
      )}
    >
      <GlassPanel
        variant="dark"
        className={cn(
          "w-full p-3.5",
          "transition-all duration-200",
          "group-hover:border-white/[0.20] group-hover:bg-white/[0.08] group-hover:shadow-[0_8px_36px_rgba(0,0,0,0.45)]",
          "group-focus-visible:border-white/[0.18] group-focus-visible:bg-white/[0.07]"
        )}
      >
        {/* Eyebrow */}
        <p className={cn(
          "mb-1.5 text-[9px] font-medium tracking-[0.16em] uppercase",
          ACCENT_COLOR[type]
        )}>
          {eyebrow}
        </p>

        {/* Primary — large number for metrics, refined bold text for credentials */}
        <p className={cn(
          "mb-0.5 text-white",
          isMetric
            ? "text-[1.75rem] font-bold leading-none"
            : "text-[0.9rem] font-bold leading-tight"
        )}>
          {primary}
        </p>

        {/* Secondary descriptor */}
        <p className="mb-2.5 text-[11px] leading-snug text-white/55">
          {secondary}
        </p>

        {/* ── Metric card: compact data visual ── */}
        {isMetric && MiniVisual && (
          <div className="text-aqua">
            <MiniVisual />
          </div>
        )}
        {isMetric && supporting && (
          <p className="mt-1.5 text-[10px] font-medium leading-normal text-white/48">
            {supporting}
          </p>
        )}

        {/* ── Credential / leadership: thin rule + supporting text ── */}
        {!isMetric && supporting && (
          <>
            <div className="border-t border-white/[0.08]" />
            <p className="mt-2 text-[10px] font-medium leading-normal text-white/48">
              {supporting}
            </p>
          </>
        )}
      </GlassPanel>
    </motion.div>
  )
}
