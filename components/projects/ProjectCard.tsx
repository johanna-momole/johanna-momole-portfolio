import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProjectVisual } from "@/components/projects/ProjectVisual"
import type { Project } from "@/content/projects"

const statusColors: Record<string, string> = {
  "Ongoing":        "text-chartreuse/80 border-chartreuse/25 bg-chartreuse/5",
  "In development": "text-lilac/80 border-lilac/25 bg-lilac/5",
  "Completed":      "text-aqua/70 border-aqua/20 bg-aqua/5",
  "Conceptual":     "text-blush/70 border-blush/20 bg-blush/5",
}

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-[24px]",
        "border border-white/8 bg-white/4",
        "transition-all duration-200 hover:border-white/15 hover:bg-white/6",
        className
      )}
      aria-label={`${project.title} — ${project.category}`}
    >
      {/* Visual */}
      <div className="relative h-52 shrink-0 overflow-hidden">
        <div className="absolute inset-0 z-10 ring-1 ring-inset ring-white/5" aria-hidden="true" />
        <ProjectVisual variant={project.visual} className="h-full w-full" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-6">
        {/* Category + Status */}
        <div className="flex items-start gap-2 flex-wrap">
          <span className="text-[9px] font-medium tracking-[0.16em] uppercase text-white/40 leading-relaxed">
            {project.category}
          </span>
          <span
            className={cn(
              "ml-auto shrink-0 rounded-full border px-2.5 py-0.5 text-[9px] font-medium tracking-wide",
              statusColors[project.status] ?? "text-white/40 border-white/15"
            )}
          >
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold leading-snug text-white">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-white/55 line-clamp-4">
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-1">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="text-base font-bold text-chartreuse leading-none">
                  {m.value}
                </span>
                <span className="mt-0.5 text-[9px] text-white/35 leading-tight">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Methods */}
        <div className="pt-1">
          <p className="mb-1.5 text-[9px] font-medium tracking-[0.14em] uppercase text-white/25">
            Methods
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.methods.slice(0, 4).map((m) => (
              <span
                key={m}
                className="rounded-full bg-white/5 px-2.5 py-0.5 text-[9px] font-medium text-white/45"
              >
                {m}
              </span>
            ))}
            {project.methods.length > 4 && (
              <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[9px] font-medium text-white/28">
                +{project.methods.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Technologies */}
        <div>
          <p className="mb-1.5 text-[9px] font-medium tracking-[0.14em] uppercase text-white/25">
            Technologies
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-2.5 py-0.5 text-[9px] font-medium text-white/45"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Actions — only render when URLs exist */}
        {(project.repositoryUrl || project.demoUrl) && (
          <div className="flex flex-wrap gap-2 pt-2 mt-auto border-t border-white/8">
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-medium text-white/55 hover:text-white hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                Repository
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-chartreuse/10 border border-chartreuse/25 px-3 py-1.5 text-[10px] font-medium text-chartreuse/80 hover:bg-chartreuse/20 hover:text-chartreuse transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chartreuse/30"
              >
                Live demo
              </a>
            )}
          </div>
        )}

        {/* Case study link or coming-soon note */}
        {!project.repositoryUrl && !project.demoUrl && (
          project.hasCaseStudy ? (
            <div className="mt-auto border-t border-white/[0.06] pt-3">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-[10px] font-medium text-aqua/70 transition-colors hover:text-aqua focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aqua/40"
              >
                View case study
                <ArrowRightIcon className="size-3" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <p className="mt-auto border-t border-white/[0.06] pt-3 text-[9px] text-white/22">
              Case study coming soon
            </p>
          )
        )}
      </div>
    </article>
  )
}
