import { cn } from "@/lib/utils"

const statusColors: Record<string, string> = {
  "Ongoing":        "text-chartreuse/80 border-chartreuse/25 bg-chartreuse/5",
  "In development": "text-lilac/80       border-lilac/25       bg-lilac/5",
  "Completed":      "text-aqua/70        border-aqua/20        bg-aqua/5",
  "Conceptual":     "text-blush/70       border-blush/20       bg-blush/5",
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-full border px-2.5",
        "text-[10px] font-medium leading-none tracking-wide",
        statusColors[status] ?? "text-white/50 border-white/15",
        className
      )}
    >
      {status}
    </span>
  )
}
