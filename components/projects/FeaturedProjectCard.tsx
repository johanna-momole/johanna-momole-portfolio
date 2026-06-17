"use client"

import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { ProjectVisual } from "@/components/projects/ProjectVisual"
import type { Project } from "@/content/projects"

const statusColors: Record<string, string> = {
  "Ongoing":       "text-chartreuse/80 border-chartreuse/25 bg-chartreuse/5",
  "In development":"text-lilac/80 border-lilac/25 bg-lilac/5",
  "Completed":     "text-aqua/70 border-aqua/20 bg-aqua/5",
  "Conceptual":    "text-blush/70 border-blush/20 bg-blush/5",
}

interface FeaturedProjectCardProps {
  project: Project
  layout?: "hero" | "medium" | "compact"
  index?: number
}

export function FeaturedProjectCard({
  project,
  layout = "medium",
  index = 0,
}: FeaturedProjectCardProps) {
  const prefersReduced = useReducedMotion()
  const isHero = layout === "hero"

  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: prefersReduced ? 0 : 0.55,
        delay: prefersReduced ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        prefersReduced
          ? {}
          : { y: -3, transition: { duration: 0.22, ease: "easeOut" } }
      }
      className={cn(
        "group relative flex h-full overflow-hidden rounded-[24px]",
        "border border-white/[0.10] bg-[#0B1220]/60 backdrop-blur-xl",
        "transition-all duration-200",
        "hover:border-white/[0.20] hover:bg-[#111A2A]/72",
        isHero ? "flex-col lg:flex-row" : "flex-col"
      )}
      aria-label={`${project.title} — ${project.category}`}
    >
      {/* Visual preview */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden",
          isHero
            ? "h-56 lg:h-full lg:w-[46%]"
            : layout === "compact"
              ? "h-36"
              : "h-40"
        )}
      >
        {/* Subtle inner border on visual */}
        <div className="absolute inset-0 z-10 rounded-t-[24px] ring-1 ring-inset ring-white/5 lg:rounded-none" aria-hidden="true" />
        <ProjectVisual
          variant={project.visual}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex flex-col gap-2.5 p-5",
          isHero ? "lg:p-7" : "",
          layout === "compact" ? "p-4 gap-2" : ""
        )}
      >
        {/* Category + Status row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[9px] font-medium tracking-[0.16em] uppercase text-white/40">
            {project.category}
          </span>
          <span
            className={cn(
              "ml-auto rounded-full border px-2 py-0.5 text-[9px] font-medium tracking-wide",
              statusColors[project.status] ?? "text-white/40 border-white/15"
            )}
          >
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-semibold leading-snug text-white",
            isHero ? "text-xl md:text-2xl" : layout === "compact" ? "text-base" : "text-lg"
          )}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            "text-white/55 leading-relaxed",
            isHero ? "text-sm md:text-base" : "text-sm",
            layout === "compact" ? "line-clamp-2 text-xs" : "line-clamp-3"
          )}
        >
          {project.shortDescription}
        </p>

        {/* Metrics — only if present */}
        {project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-1">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="text-sm font-bold text-chartreuse leading-none">
                  {m.value}
                </span>
                <span className="text-[9px] text-white/35 mt-0.5 leading-tight">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {(isHero ? project.technologies : project.technologies.slice(0, 3)).map(
            (tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 px-2.5 py-0.5 text-[9px] font-medium text-white/45"
              >
                {tech}
              </span>
            )
          )}
          {!isHero && project.technologies.length > 3 && (
            <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[9px] font-medium text-white/30">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Hover accent line */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] translate-y-full bg-gradient-to-r from-aqua/0 via-aqua/40 to-aqua/0 transition-transform duration-300 group-hover:translate-y-0"
        aria-hidden="true"
      />
    </motion.article>
  )
}
