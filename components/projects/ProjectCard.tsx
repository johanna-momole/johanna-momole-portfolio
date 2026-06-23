import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { GithubMark } from "@/components/shared/GithubMark"
import { cn } from "@/lib/utils"
import { ProjectVisual } from "@/components/projects/ProjectVisual"
import { StatusBadge } from "@/components/shared/StatusBadge"
import type { Project } from "@/content/projects"

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
      aria-label={`${project.title}: ${project.category}`}
    >
      {/* Visual */}
      <div className="relative aspect-[8/5] w-full shrink-0 overflow-hidden">
        <div className="absolute inset-0 z-10 ring-1 ring-inset ring-white/5" aria-hidden="true" />
        <ProjectVisual variant={project.visual} context="compact" className="h-full w-full" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-6">
        {/* Category + Status */}
        <div className="flex items-start gap-2 flex-wrap">
          <span className="text-[9px] font-medium tracking-[0.16em] uppercase text-white/40 leading-relaxed">
            {project.category}
          </span>
          <StatusBadge status={project.status} className="ml-auto shrink-0" />
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
          </div>
        </div>

        {/* Technologies */}
        <div>
          <p className="mb-1.5 text-[9px] font-medium tracking-[0.14em] uppercase text-white/25">
            Technologies
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-2.5 py-0.5 text-[9px] font-medium text-white/45"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom action bar — always visible */}
        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-3">
          {project.hasCaseStudy ? (
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-[10px] font-medium text-aqua/70 transition-colors hover:text-aqua focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aqua/40"
            >
              View case study
              <ArrowRightIcon className="size-3" aria-hidden="true" />
            </Link>
          ) : (
            <span className="text-[9px] text-white/22">Case study coming soon</span>
          )}
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View GitHub repository for ${project.title}`}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-medium text-white/50 transition-colors hover:border-white/28 hover:text-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <GithubMark className="size-3 shrink-0" />
              GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo for ${project.shortTitle}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-chartreuse/25 bg-chartreuse/10 px-2.5 py-1 text-[10px] font-medium text-chartreuse/80 transition-colors hover:bg-chartreuse/20 hover:text-chartreuse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chartreuse/30"
            >
              Live demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
