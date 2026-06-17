"use client"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Method } from "@/content/case-studies/glp1-pharmacovigilance"

const typeLabel: Record<Method["type"], string> = {
  primary:     "Primary",
  sensitivity: "Sensitivity",
  quality:     "Data quality",
  validation:  "Validation",
}

const typeColor: Record<Method["type"], string> = {
  primary:     "text-aqua/70 border-aqua/20 bg-aqua/5",
  sensitivity: "text-lilac/70 border-lilac/20 bg-lilac/5",
  quality:     "text-chartreuse/65 border-chartreuse/20 bg-chartreuse/5",
  validation:  "text-blush/70 border-blush/20 bg-blush/5",
}

const typeAccent: Record<Method["type"], string> = {
  primary:     "border-l-aqua/50",
  sensitivity: "border-l-lilac/50",
  quality:     "border-l-chartreuse/50",
  validation:  "border-l-blush/50",
}

interface MethodsSectionProps {
  methods: Method[]
}

export function MethodsSection({ methods }: MethodsSectionProps) {
  return (
    <Accordion type="multiple" className="space-y-2">
      {methods.map((method) => (
        <AccordionItem
          key={method.name}
          value={method.name}
          className={cn(
            "overflow-hidden rounded-[16px] border border-white/[0.08] bg-white/[0.03]",
            "data-[state=open]:border-white/[0.13] data-[state=open]:bg-white/[0.05]",
            "transition-colors duration-150"
          )}
        >
          <AccordionTrigger
            className={cn(
              "flex w-full items-center gap-3 px-5 py-4 text-left",
              "hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
              "[&>svg]:shrink-0 [&>svg]:text-white/35"
            )}
          >
            <span className="flex flex-1 items-center gap-3 min-w-0">
              <span
                className={cn(
                  "shrink-0 rounded-full border px-2 py-0.5 text-[8px] font-medium tracking-wide",
                  typeColor[method.type]
                )}
              >
                {typeLabel[method.type]}
              </span>
              <span className="truncate text-sm font-medium text-white/85">
                {method.name}
              </span>
            </span>
          </AccordionTrigger>

          <AccordionContent
            className={cn(
              "mx-5 mb-4 border-l-2 pl-4 text-sm leading-relaxed",
              typeAccent[method.type]
            )}
          >
            <p className="mb-3 text-white/60">{method.description}</p>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-[9px] font-medium tracking-[0.14em] uppercase text-white/28">
                Purpose
              </span>
              <p className="text-[11px] leading-relaxed text-white/45">
                {method.purpose}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
