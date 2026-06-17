import type { Metadata } from "next"
import Link from "next/link"
import { MailIcon, ArrowLeftIcon } from "lucide-react"

import { ProjectsGallery } from "@/components/projects/ProjectsGallery"
import { siteConfig } from "@/content/site"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Healthcare analytics, pharmacovigilance, real-world evidence, genomics visualization, and public health data science projects by Johanna Momole.",
}

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      {/* ── Page header ─────────────────────────────────────────── */}
      <section
        className="w-full pt-36 pb-16 md:pt-44 md:pb-20"
        aria-labelledby="projects-heading"
      >
        <div className="mx-auto max-w-[1440px] px-8 md:px-16">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-medium tracking-[0.18em] uppercase text-muted-foreground">
              Work
            </p>
            <h1
              id="projects-heading"
              className="mb-6 font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem]"
            >
              Work that connects healthcare questions, data, and decisions.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              These projects span real-world evidence, pharmacovigilance, healthcare operations,
              biomedical visualization, and public-health analytics. Each one reflects a different
              part of how I approach complex healthcare questions.
            </p>
          </div>
        </div>
      </section>

      {/* ── Project gallery ─────────────────────────────────────── */}
      <section
        className="w-full flex-1 pb-16"
        aria-label="Project gallery"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          {/* Dark gallery container matching homepage style */}
          <div
            className="relative overflow-hidden rounded-[36px] px-6 py-12 sm:px-10 md:px-14 md:py-16 border border-white/[0.10] bg-[#07101A]/68 backdrop-blur-xl"
          >
            {/* Dot-grid texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-100"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(127,231,242,0.045) 1px, transparent 0)",
                backgroundSize: "36px 36px",
              }}
              aria-hidden="true"
            />

            <div className="relative">
              <ProjectsGallery />
            </div>
          </div>
        </div>
      </section>

      {/* ── Case study note ─────────────────────────────────────── */}
      <section
        className="w-full py-14"
        aria-label="Case study status"
      >
        <div className="mx-auto max-w-[1440px] px-8 md:px-16">
          <div className="max-w-xl">
            <p className="mb-2 text-xs font-medium tracking-[0.18em] uppercase text-muted-foreground">
              In progress
            </p>
            <p className="text-base leading-relaxed text-foreground">
              Selected case studies are being expanded with detailed methods, findings, and interactive elements.
              If you would like to discuss a specific project before then, reach out directly.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ─────────────────────────────────────────── */}
      <section
        id="contact"
        className="w-full py-20"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto max-w-[1440px] px-8 md:px-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-lg">
              <h2
                id="contact-heading"
                className="mb-3 text-2xl font-semibold tracking-tight md:text-3xl"
              >
                Let&apos;s connect.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Whether you have a collaboration in mind, a healthcare analytics question,
                or are curious about the work, I would be glad to hear from you.
              </p>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-aqua/30 bg-aqua/[0.08] px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-aqua/45 hover:bg-aqua/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <MailIcon className="size-4" aria-hidden="true" />
                Send an email
              </a>
              <Link
                href="/"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium text-white/65 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <ArrowLeftIcon className="size-4" aria-hidden="true" />
                Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
