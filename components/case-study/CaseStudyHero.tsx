import { cn } from "@/lib/utils"
import { ProjectVisual } from "@/components/projects/ProjectVisual"
import type { Project } from "@/content/projects"
import type { CaseStudy } from "@/content/case-studies/glp1-pharmacovigilance"

const statusColors: Record<string, string> = {
  "Ongoing":        "text-chartreuse/80 border-chartreuse/25 bg-chartreuse/5",
  "In development": "text-lilac/80 border-lilac/25 bg-lilac/5",
  "Completed":      "text-aqua/70 border-aqua/20 bg-aqua/5",
  "Conceptual":     "text-blush/70 border-blush/20 bg-blush/5",
}

interface CaseStudyHeroProps {
  project: Project
  caseStudy: CaseStudy
}

export function CaseStudyHero({ project, caseStudy }: CaseStudyHeroProps) {
  return (
    <header className="relative w-full overflow-hidden">
      {/* Subtle legibility gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(5,7,19,0.70) 0%, rgba(5,7,19,0.40) 55%, rgba(5,7,19,0.20) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-[1] mx-auto max-w-[1440px] px-4 pb-16 pt-36 sm:px-8 md:pb-20 md:pt-44 lg:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">

          {/* ── Left: title + metadata ─────────────────────────────────────── */}
          <div>
            {/* Eyebrow */}
            <p className="mb-4 text-xs font-medium tracking-[0.18em] uppercase text-aqua/65">
              Case Study &middot; {project.category}
            </p>

            {/* Title */}
            <h1 className="mb-5 max-w-3xl font-serif text-3xl leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {caseStudy.title}
            </h1>

            {/* Subtitle */}
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              {caseStudy.subtitle}
            </p>

            {/* Positioning note */}
            <div className="mb-8 inline-flex max-w-xl items-start gap-3 rounded-[14px] border border-lilac/15 bg-lilac/5 px-4 py-3">
              <span className="mt-0.5 shrink-0 text-lilac/60" aria-hidden="true">
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6.5" />
                  <line x1="8" y1="5" x2="8" y2="5.5" />
                  <line x1="8" y1="7.5" x2="8" y2="11" />
                </svg>
              </span>
              <p className="text-xs leading-relaxed text-white/50">
                {caseStudy.positioning}
              </p>
            </div>

            {/* Metadata strip */}
            <dl className="flex flex-wrap gap-x-8 gap-y-4">
              <div>
                <dt className="mb-1 text-[9px] font-medium tracking-[0.16em] uppercase text-white/28">Status</dt>
                <dd>
                  <span className={cn(
                    "inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-wide",
                    statusColors[project.status] ?? "text-white/50 border-white/15"
                  )}>
                    {project.status}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-[9px] font-medium tracking-[0.16em] uppercase text-white/28">Analysis Window</dt>
                <dd className="text-sm font-medium text-white/75">{caseStudy.dataScale.analysisPeriod}</dd>
              </div>
              <div>
                <dt className="mb-1 text-[9px] font-medium tracking-[0.16em] uppercase text-white/28">Records Harmonized</dt>
                <dd className="text-sm font-medium text-white/75">{caseStudy.dataScale.totalRecords}</dd>
              </div>
              <div>
                <dt className="mb-1 text-[9px] font-medium tracking-[0.16em] uppercase text-white/28">Role</dt>
                <dd className="text-sm font-medium text-white/75">{project.role}</dd>
              </div>
            </dl>
          </div>

          {/* ── Right: project visual ──────────────────────────────────────── */}
          <div
            className="hidden overflow-hidden rounded-[24px] border border-white/[0.08] lg:block"
            aria-hidden="true"
          >
            <ProjectVisual variant={project.visual} className="h-full w-full" />
          </div>
        </div>
      </div>
    </header>
  )
}
