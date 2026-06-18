import type { Metadata } from "next"
import Link from "next/link"
import { MailIcon, ArrowDownToLineIcon, ArrowRightIcon } from "lucide-react"
import { siteConfig } from "@/content/site"
import {
  resumeRoles,
  education,
  skillGroups,
  professionalSummary,
  resumeProjects,
} from "@/content/experience"

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Johanna Momole — biomedical informatics and healthcare analytics professional with experience in real-world evidence, pharmacovigilance, and hospital operations.",
}

// ── Section helpers ───────────────────────────────────────────────────────────

function ResumeSection({
  id,
  heading,
  children,
}: {
  id: string
  heading: string
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={id} className="mb-8 print:mb-6">
      <h2
        id={id}
        className="mb-4 border-b border-white/[0.10] pb-2 text-[10px] font-semibold tracking-[0.20em] uppercase text-aqua/70 print:border-black/20 print:text-black/55"
      >
        {heading}
      </h2>
      {children}
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ResumePage() {
  return (
    <>
      {/* Print-only page title injected before nav hides */}
      <div className="hidden print:block print:mb-2 print:text-[9px] print:text-black/40 print:tracking-widest print:uppercase">
        Johanna Momole &mdash; Resume
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16">
        <div className="pt-24 pb-20 md:pt-32 md:pb-24 print:pt-4 print:pb-8">

          {/* ── RESUME SHELL ──────────────────────────────────────────────── */}
          <div className="mx-auto max-w-4xl">

            {/* ── NAME + HEADLINE ─────────────────────────────────────────── */}
            <header className="mb-8 print:mb-6" aria-label="Contact information">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="mb-1 text-3xl font-bold tracking-tight text-white/95 sm:text-4xl print:text-3xl print:text-black">
                    Johanna Momole
                  </h1>
                  <p className="text-base font-medium text-aqua/80 print:text-black/65">
                    {siteConfig.title}
                  </p>
                </div>

                <div className="flex items-center gap-3 print:hidden">
                  <a
                    href={`mailto:${siteConfig.social.email}`}
                    className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 px-4 text-xs font-medium text-white/60 transition-all hover:border-white/25 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    aria-label={`Email ${siteConfig.social.email}`}
                  >
                    <MailIcon className="size-3.5" aria-hidden="true" />
                    Email
                  </a>
                  <a
                    href={siteConfig.resumePdf}
                    download
                    className="inline-flex h-9 items-center gap-2 rounded-full border border-aqua/30 bg-aqua/[0.08] px-4 text-xs font-semibold text-white transition-all hover:border-aqua/45 hover:bg-aqua/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/50"
                    aria-label="Download Johanna Momole's résumé as a PDF"
                  >
                    <ArrowDownToLineIcon className="size-3.5" aria-hidden="true" />
                    Download R&eacute;sum&eacute;
                  </a>
                </div>
              </div>

              {/* Contact row */}
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/40 print:text-black/55">
                <a
                  href={`mailto:${siteConfig.social.email}`}
                  className="hover:text-white/70 transition-colors print:no-underline print:text-black/55"
                >
                  {siteConfig.social.email}
                </a>
                <span aria-hidden="true" className="print:hidden">&middot;</span>
                <span>Philadelphia, PA (relocating)</span>
                <span aria-hidden="true" className="print:hidden">&middot;</span>
                <Link
                  href="/projects"
                  className="hover:text-white/70 transition-colors print:text-black/55"
                >
                  Portfolio: projects
                </Link>
              </div>
            </header>

            <div className="border-b border-white/[0.07] mb-8 print:border-black/15 print:mb-6" />

            {/* ── TWO-COLUMN LAYOUT ───────────────────────────────────────── */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_260px] lg:gap-10 print:grid-cols-[1fr_220px] print:gap-8">

              {/* ── MAIN COLUMN ─────────────────────────────────────────────── */}
              <div>

                {/* PROFESSIONAL SUMMARY */}
                <ResumeSection id="resume-summary" heading="Professional Summary">
                  <p className="text-sm leading-relaxed text-white/65 print:text-black/75 print:text-[12px]">
                    {professionalSummary}
                  </p>
                </ResumeSection>

                {/* EXPERIENCE */}
                <ResumeSection id="resume-experience" heading="Experience">
                  <div className="space-y-7 print:space-y-5">
                    {resumeRoles
                      .filter((r) => r.type !== "education")
                      .map((role) => (
                        <article
                          key={role.id}
                          className="print:break-inside-avoid"
                          aria-labelledby={`resume-role-${role.id}`}
                        >
                          <div className="mb-2 flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h3
                                id={`resume-role-${role.id}`}
                                className="text-sm font-semibold text-white/90 print:text-black print:text-[13px]"
                              >
                                {role.title}
                              </h3>
                              <p className="text-xs font-medium text-aqua/70 print:text-black/60 print:text-[11px]">
                                {role.organization} &middot; {role.location}
                              </p>
                            </div>
                            {role.period && (
                              <time
                                dateTime={role.period}
                                className="shrink-0 text-xs text-white/35 print:text-black/45 print:text-[11px]"
                              >
                                {role.period}
                              </time>
                            )}
                          </div>
                          <ul
                            className="mt-2.5 space-y-1.5 print:mt-2 print:space-y-1"
                            role="list"
                          >
                            {role.highlights.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-xs leading-relaxed text-white/58 print:text-black/70 print:text-[11px]"
                              >
                                <span
                                  className="mt-1.5 size-1 shrink-0 rounded-full bg-white/25 print:bg-black/30"
                                  aria-hidden="true"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </article>
                      ))}
                  </div>
                </ResumeSection>

                {/* EDUCATION */}
                <ResumeSection id="resume-education" heading="Education">
                  {education.map((entry) => (
                    <article
                      key={entry.id}
                      className="print:break-inside-avoid"
                      aria-labelledby={`resume-edu-${entry.id}`}
                    >
                      <div className="mb-1.5 flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3
                            id={`resume-edu-${entry.id}`}
                            className="text-sm font-semibold text-white/90 print:text-black print:text-[13px]"
                          >
                            {entry.degree}
                          </h3>
                          <p className="text-xs font-medium text-aqua/70 print:text-black/60 print:text-[11px]">
                            {entry.institution} &middot; {entry.location}
                          </p>
                        </div>
                        <time
                          className="shrink-0 text-xs text-white/35 print:text-black/45 print:text-[11px]"
                        >
                          {entry.year}
                        </time>
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-2 text-[10px] text-white/40 print:text-black/50">
                        <span>{entry.gpa}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span className="font-medium text-chartreuse/70 print:text-black/60">
                          {entry.award}
                        </span>
                        <span aria-hidden="true">&middot;</span>
                        <span>{entry.awardDetail}</span>
                      </div>
                      <ul
                        className="mt-2.5 space-y-1 print:mt-2"
                        role="list"
                      >
                        {entry.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-xs text-white/52 print:text-black/65 print:text-[11px]"
                          >
                            <span
                              className="mt-1.5 size-1 shrink-0 rounded-full bg-white/20 print:bg-black/25"
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </ResumeSection>

                {/* SELECTED PROJECTS */}
                <ResumeSection id="resume-projects" heading="Selected Projects">
                  <div className="space-y-3 print:space-y-2">
                    {resumeProjects.map((project) => (
                      <article
                        key={project.slug}
                        className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:gap-4 print:break-inside-avoid"
                      >
                        <div className="sm:w-48 shrink-0">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="text-xs font-semibold text-white/80 hover:text-aqua/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 print:text-black print:no-underline print:text-[11px]"
                          >
                            {project.title}
                          </Link>
                        </div>
                        <p className="text-xs leading-relaxed text-white/50 print:text-black/65 print:text-[11px]">
                          {project.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </ResumeSection>

              </div>

              {/* ── SIDEBAR COLUMN ──────────────────────────────────────────── */}
              <div>

                {skillGroups.map((group) => (
                  <section
                    key={group.heading}
                    aria-labelledby={`skills-${group.heading.replace(/\s+/g, "-").toLowerCase()}`}
                    className="mb-7 print:mb-5 print:break-inside-avoid"
                  >
                    <h2
                      id={`skills-${group.heading.replace(/\s+/g, "-").toLowerCase()}`}
                      className="mb-3 text-[9px] font-semibold tracking-[0.20em] uppercase text-aqua/60 border-b border-white/[0.08] pb-1.5 print:border-black/15 print:text-black/50"
                    >
                      {group.heading}
                    </h2>
                    <ul className="space-y-1.5" role="list">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-white/58 print:text-black/70 print:text-[11px]"
                        >
                          <span
                            className="mt-1.5 size-1 shrink-0 rounded-full bg-white/20 print:bg-black/20"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}

              </div>
            </div>

            {/* ── FOOTER ACTIONS (screen only) ─────────────────────────────── */}
            <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/[0.07] pt-8 print:hidden">
              <Link
                href="/experience"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white/45 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Full experience narrative
                <ArrowRightIcon className="size-3" aria-hidden="true" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white/45 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Project case studies
                <ArrowRightIcon className="size-3" aria-hidden="true" />
              </Link>
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white/45 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <MailIcon className="size-3" aria-hidden="true" />
                {siteConfig.social.email}
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
