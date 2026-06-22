import { GithubMark } from "@/components/shared/GithubMark"
import { ProjectVisual } from "@/components/projects/ProjectVisual"
import { StatusBadge } from "@/components/shared/StatusBadge"
import type { Project } from "@/content/projects"
import type { CaseStudy } from "@/content/case-studies/types"

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
                <dt className="mb-1 text-[9px] font-medium tracking-[0.16em] uppercase text-white/42">Status</dt>
                <dd>
                  <StatusBadge status={project.status} />
                </dd>
              </div>
              {caseStudy.dataScale.items.slice(0, 2).map(({ label, value }) => (
                <div key={label}>
                  <dt className="mb-1 text-[9px] font-medium tracking-[0.16em] uppercase text-white/42">{label}</dt>
                  <dd className="text-sm font-medium text-white/75">{value}</dd>
                </div>
              ))}
              <div>
                <dt className="mb-1 text-[9px] font-medium tracking-[0.16em] uppercase text-white/42">Role</dt>
                <dd className="text-sm font-medium text-white/75">{project.role}</dd>
              </div>
            </dl>

            {/* Repository action */}
            {project.repositoryUrl && (
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View GitHub repository for ${project.title}`}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-5 text-sm font-medium text-white/75 transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <GithubMark className="size-4 shrink-0" />
                  View GitHub repository
                </a>
              </div>
            )}
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
