import { projects } from "@/content/projects"
import { ProjectCard } from "@/components/projects/ProjectCard"

interface RelatedProjectsProps {
  currentSlug: string
  count?: number
}

export function RelatedProjects({ currentSlug, count = 2 }: RelatedProjectsProps) {
  const related = projects.filter((p) => p.slug !== currentSlug).slice(0, count)

  if (related.length === 0) return null

  return (
    <section aria-labelledby="related-heading" className="border-t border-white/[0.07]">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 lg:px-16">
        <p className="mb-2 text-xs font-medium tracking-[0.18em] uppercase text-white/35">
          More work
        </p>
        <h2
          id="related-heading"
          className="mb-8 text-xl font-semibold text-white/80"
        >
          Related projects
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {related.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
