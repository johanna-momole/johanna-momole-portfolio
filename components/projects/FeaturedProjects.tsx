import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { projects } from "@/content/projects"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard"

export function FeaturedProjects() {
  const [glp1, rwe, referral, genomics, hpv] = projects

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="w-full py-6 md:py-10"
    >
      {/* Outer spacing container */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Dark rounded container */}
        <div
          className="relative overflow-hidden rounded-[36px] px-6 py-14 sm:px-10 md:px-14 md:py-20 border border-white/[0.10] bg-[#07101A]/68 backdrop-blur-xl"
        >
          {/* Subtle ambient dot-grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-100"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(127,231,242,0.045) 1px, transparent 0)",
              backgroundSize: "36px 36px",
            }}
            aria-hidden="true"
          />

          {/* Ambient glow blobs */}
          <div
            className="pointer-events-none absolute -top-32 -left-32 h-64 w-64 rounded-full blur-3xl"
            style={{ background: "rgba(127,231,242,0.06)" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 right-1/4 h-48 w-96 rounded-full blur-3xl"
            style={{ background: "rgba(217,209,255,0.05)" }}
            aria-hidden="true"
          />

          {/* ── Header ───────────────────────────── */}
          <div className="relative mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="work-heading"
              eyebrow="Selected Work"
              title="Projects built at the intersection of healthcare, data, and decisions."
              description="I build analytical systems that translate complex biomedical and healthcare data into evidence, operational insight, and usable decision support."
              className="text-white [&_p]:text-white/50 [&_h2]:text-white max-w-2xl"
            />
            <Link
              href="/projects"
              className="shrink-0 inline-flex h-9 items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-4 text-sm font-medium text-white/90 transition-all hover:border-white/30 hover:bg-white/[0.14] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 select-none"
            >
              View All Projects
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </div>

          {/* ── Bento grid ───────────────────────── */}
          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
            {/* GLP-1: Flagship — col 1-8, row 1-2 */}
            <div className="md:col-span-2 lg:col-start-1 lg:col-end-9 lg:row-start-1 lg:row-end-3 min-h-[400px]">
              <FeaturedProjectCard project={glp1} layout="hero" index={0} />
            </div>

            {/* RWE: top right — col 9-12, row 1 */}
            <div className="lg:col-start-9 lg:col-end-13 lg:row-start-1 lg:row-end-2 min-h-[195px]">
              <FeaturedProjectCard project={rwe} layout="medium" index={1} />
            </div>

            {/* Referral: middle right — col 9-12, row 2 */}
            <div className="lg:col-start-9 lg:col-end-13 lg:row-start-2 lg:row-end-3 min-h-[195px]">
              <FeaturedProjectCard project={referral} layout="medium" index={2} />
            </div>

            {/* Genomics: bottom left — col 1-6, row 3 */}
            <div className="lg:col-start-1 lg:col-end-7 lg:row-start-3 lg:row-end-4 min-h-[240px]">
              <FeaturedProjectCard project={genomics} layout="compact" index={3} />
            </div>

            {/* HPV: bottom right — col 7-12, row 3 */}
            <div className="lg:col-start-7 lg:col-end-13 lg:row-start-3 lg:row-end-4 min-h-[240px]">
              <FeaturedProjectCard project={hpv} layout="compact" index={4} />
            </div>
          </div>

          {/* ── Bottom CTA ───────────────────────── */}
          <div className="relative mt-10 flex justify-center">
            <p className="text-sm text-white/35">
              Selected case studies are being expanded.{" "}
              <Link
                href="/#contact"
                className="text-white/60 underline underline-offset-4 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
              >
                Reach out to learn more.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
