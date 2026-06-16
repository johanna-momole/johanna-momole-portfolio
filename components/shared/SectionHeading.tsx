import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-medium tracking-[0.18em] uppercase text-muted-foreground">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {description && (
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
