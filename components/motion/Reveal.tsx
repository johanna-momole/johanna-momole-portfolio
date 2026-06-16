"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import type { HTMLMotionProps } from "motion/react"

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  once?: boolean
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  once = true,
  className,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: "-60px" })
  const prefersReduced = useReducedMotion()

  const offset = prefersReduced ? 0 : 20
  const initialY =
    direction === "up" ? offset : direction === "down" ? -offset : 0
  const initialX =
    direction === "left" ? offset : direction === "right" ? -offset : 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: initialY, x: initialX }}
      animate={
        inView
          ? { opacity: 1, y: 0, x: 0 }
          : { opacity: 0, y: initialY, x: initialX }
      }
      transition={{
        duration: prefersReduced ? 0 : 0.55,
        delay: prefersReduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
