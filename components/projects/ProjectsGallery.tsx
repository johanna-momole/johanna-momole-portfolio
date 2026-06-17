"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"

import { projects } from "@/content/projects"
import type { FilterCategory } from "@/content/projects"
import { ProjectFilters } from "@/components/projects/ProjectFilters"
import { ProjectCard } from "@/components/projects/ProjectCard"

export function ProjectsGallery() {
  const [active, setActive] = useState<FilterCategory>("All")
  const prefersReduced = useReducedMotion()

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.filterCategory === active)

  return (
    <div className="flex flex-col gap-8">
      <ProjectFilters active={active} onChange={setActive} />

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout={!prefersReduced}
              initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.97 }}
              transition={{
                duration: prefersReduced ? 0 : 0.30,
                delay: prefersReduced ? 0 : i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProjectCard project={project} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-white/40">
          No projects in this category yet.
        </p>
      )}
    </div>
  )
}
