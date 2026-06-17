import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { projects } from "@/content/projects"

interface CaseStudyNavProps {
  currentSlug: string
}

export function CaseStudyNav({ currentSlug }: CaseStudyNavProps) {
  const allWithCaseStudy = projects.filter((p) => p.hasCaseStudy)
  const idx = allWithCaseStudy.findIndex((p) => p.slug === currentSlug)

  const prev = idx > 0 ? allWithCaseStudy[idx - 1] : null
  const next = idx < allWithCaseStudy.length - 1 ? allWithCaseStudy[idx + 1] : null

  if (!prev && !next) return null

  return (
    <nav
      aria-label="Case study navigation"
      className="border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-8 lg:px-16">
        <div className="flex items-stretch justify-between gap-4">
          {/* Previous */}
          <div className="flex-1">
            {prev && (
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex h-full flex-col gap-1 rounded-[16px] border border-white/[0.07] bg-white/[0.02] p-5 transition-all hover:border-white/[0.14] hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <span className="flex items-center gap-1.5 text-[9px] font-medium tracking-[0.14em] uppercase text-white/30">
                  <ArrowLeftIcon className="size-3" aria-hidden="true" />
                  Previous
                </span>
                <span className="text-sm font-medium text-white/65 group-hover:text-white/80 transition-colors">
                  {prev.shortTitle}
                </span>
              </Link>
            )}
          </div>

          {/* Next */}
          <div className="flex-1 text-right">
            {next && (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex h-full flex-col items-end gap-1 rounded-[16px] border border-white/[0.07] bg-white/[0.02] p-5 transition-all hover:border-white/[0.14] hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <span className="flex items-center gap-1.5 text-[9px] font-medium tracking-[0.14em] uppercase text-white/30">
                  Next
                  <ArrowRightIcon className="size-3" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-white/65 group-hover:text-white/80 transition-colors">
                  {next.shortTitle}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
