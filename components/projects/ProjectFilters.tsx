"use client"

import { cn } from "@/lib/utils"
import { filterCategories } from "@/content/projects"
import type { FilterCategory } from "@/content/projects"

interface ProjectFiltersProps {
  active: FilterCategory
  onChange: (cat: FilterCategory) => void
}

export function ProjectFilters({ active, onChange }: ProjectFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="flex flex-wrap gap-2"
    >
      {filterCategories.map((cat) => {
        const isActive = cat === active
        return (
          <button
            key={cat}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(cat)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
              isActive
                ? "border-chartreuse/40 bg-chartreuse/10 text-chartreuse"
                : "border-white/15 bg-white/4 text-white/55 hover:border-white/28 hover:text-white/80"
            )}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
