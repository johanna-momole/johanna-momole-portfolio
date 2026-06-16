import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark"
}

export function GlassPanel({
  className,
  variant = "dark",
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-[20px] border backdrop-blur-md",
        variant === "dark"
          ? "bg-white/5 border-white/10 shadow-[0_4px_32px_rgba(0,0,0,0.3)]"
          : "bg-white/70 border-black/8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
