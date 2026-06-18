import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeftIcon, MailIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/Reveal"
import { GlassPanel } from "@/components/shared/GlassPanel"
import { TableOfContents, type TocItem } from "@/components/case-study/TableOfContents"
import { MethodsSection } from "@/components/case-study/MethodsSection"
import { DataSourceCard } from "@/components/case-study/DataSourceCard"
import { LimitationCallout } from "@/components/case-study/LimitationCallout"
import { OutputPreviewCard } from "@/components/case-study/OutputPreviewCard"
import { CaseStudyNav } from "@/components/case-study/CaseStudyNav"
import { RelatedProjects } from "@/components/case-study/RelatedProjects"
import { siteConfig } from "@/content/site"
import type { Project } from "@/content/projects"
import type { CaseStudy } from "@/content/case-studies/types"

// ── Local helpers ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-medium tracking-[0.18em] uppercase text-aqua/55">
      {children}
    </p>
  )
}

function SectionH2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 text-2xl font-semibold leading-tight text-white/90 sm:text-[1.6rem]"
    >
      {children}
    </h2>
  )
}

function SectionDivider() {
  return <div className="border-b border-white/[0.05]" />
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface CaseStudyTemplateProps {
  project: Project
  caseStudy: CaseStudy
  workflowDiagram?: ReactNode
  methodologyDiagram?: ReactNode
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CaseStudyTemplate({
  project,
  caseStudy: cs,
  workflowDiagram,
  methodologyDiagram,
}: CaseStudyTemplateProps) {

  // TOC is computed from props so the "Results" entry appears only when the
  // project has confirmed results.
  const tocItems: TocItem[] = [
    { id: "executive-summary",  label: "Executive Summary" },
    { id: "research-question",  label: "Research Question" },
    { id: "project-context",    label: "Project Context" },
    { id: "my-role",            label: "My Role" },
    { id: "data-sources",       label: "Data Sources" },
    { id: "data-engineering",   label: "Data Engineering" },
    { id: "methodology",        label: "Analytical Methods" },
    { id: "output-previews",    label: "Output Previews" },
    ...(cs.results && cs.results.length > 0
      ? [{ id: "results", label: cs.resultsTocLabel ?? cs.resultsTitle ?? "Results" }]
      : []),
    { id: "data-quality",       label: "Data Quality" },
    { id: "limitations",        label: "Limitations" },
    { id: "technology",         label: "Technology Stack" },
    { id: "lessons",            label: "Lessons Learned" },
    { id: "next-steps",         label: "Next Steps" },
  ]

  return (
    <>
      {/* ── Back link ──────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-8 lg:px-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-[11px] text-white/35 transition-colors hover:text-white/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
        >
          <ArrowLeftIcon className="size-3" aria-hidden="true" />
          All projects
        </Link>
      </div>

      {/* ── Two-column body: sticky TOC + scrollable content ───────────────── */}
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-8 lg:px-16">
        <div className="flex gap-12 xl:gap-16">

          {/* ── TOC sidebar (xl+) ─────────────────────────────────────────── */}
          <aside className="hidden w-[200px] shrink-0 xl:block" aria-label="Page sections">
            <div className="sticky top-28">
              <TableOfContents items={tocItems} />
            </div>
          </aside>

          {/* ── Main content ──────────────────────────────────────────────── */}
          <article className="min-w-0 flex-1 space-y-16">

            {/* ── 1. Executive Summary ─────────────────────────────────────── */}
            <section aria-labelledby="executive-summary">
              <Reveal>
                <SectionLabel>Overview</SectionLabel>
                <SectionH2 id="executive-summary">Executive Summary</SectionH2>
                <GlassPanel variant="dark" className="mt-6 p-6">
                  <ul className="space-y-4">
                    {cs.summary.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-aqua/60"
                          aria-hidden="true"
                        />
                        <p className="text-sm leading-relaxed text-white/65">{point}</p>
                      </li>
                    ))}
                  </ul>
                </GlassPanel>
              </Reveal>
            </section>

            <SectionDivider />

            {/* ── 2. Research Question ─────────────────────────────────────── */}
            <section aria-labelledby="research-question">
              <Reveal delay={0.05}>
                <SectionLabel>Central Question</SectionLabel>
                <SectionH2 id="research-question">Research Question</SectionH2>
                <div className="mt-6 border-l-2 border-aqua/40 pl-6">
                  <blockquote className="font-serif text-xl leading-[1.5] text-white/80 sm:text-2xl">
                    &ldquo;{cs.researchQuestion}&rdquo;
                  </blockquote>
                </div>
              </Reveal>
            </section>

            <SectionDivider />

            {/* ── 3. Project Context ───────────────────────────────────────── */}
            <section aria-labelledby="project-context">
              <Reveal delay={0.05}>
                <SectionLabel>Background</SectionLabel>
                <SectionH2 id="project-context">Project Context</SectionH2>
                <div className="mt-6 space-y-5">
                  <div>
                    <p className="mb-1.5 text-[10px] font-medium tracking-[0.14em] uppercase text-white/30">
                      Motivation
                    </p>
                    <p className="text-sm leading-relaxed text-white/60">{cs.context.motivation}</p>
                  </div>
                  <div>
                    <p className="mb-1.5 text-[10px] font-medium tracking-[0.14em] uppercase text-white/30">
                      Background
                    </p>
                    <p className="text-sm leading-relaxed text-white/60">{cs.context.background}</p>
                  </div>
                </div>
              </Reveal>
            </section>

            <SectionDivider />

            {/* ── 4. My Role ───────────────────────────────────────────────── */}
            <section aria-labelledby="my-role">
              <Reveal delay={0.05}>
                <SectionLabel>Contributions</SectionLabel>
                <SectionH2 id="my-role">My Role</SectionH2>
                <div className="mt-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-full border border-lilac/25 bg-lilac/[0.06] px-3 py-1 text-xs font-medium text-lilac/75">
                      {cs.role.title}
                    </span>
                    <p className="text-sm text-white/50">{cs.role.summary}</p>
                  </div>
                  <ul className="space-y-2">
                    {cs.role.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-2 size-1 shrink-0 rounded-full bg-lilac/50"
                          aria-hidden="true"
                        />
                        <p className="text-sm leading-relaxed text-white/60">{r}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </section>

            <SectionDivider />

            {/* ── 5. Data Sources ──────────────────────────────────────────── */}
            <section aria-labelledby="data-sources">
              <Reveal delay={0.05}>
                <SectionLabel>Inputs</SectionLabel>
                <SectionH2 id="data-sources">{cs.dataSourcesTitle ?? "Data Sources & Scale"}</SectionH2>

                {/* Scale strip — labels and values from content data */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {cs.dataScale.items.map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-[16px] border border-white/[0.07] bg-white/[0.03] px-4 py-4"
                    >
                      <p className="mb-1 text-[9px] font-medium tracking-[0.14em] uppercase text-white/28">
                        {label}
                      </p>
                      <p className="text-2xl font-bold leading-none text-chartreuse">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Exposures — only rendered when the project has an exposures list */}
                {cs.exposures && cs.exposures.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-3 text-[10px] font-medium tracking-[0.14em] uppercase text-white/28">
                      Exposures analyzed
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cs.exposures.map((exp) => (
                        <span
                          key={exp}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/60"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Source cards */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {cs.dataSources.map((source) => (
                    <DataSourceCard key={source.acronym} source={source} />
                  ))}
                </div>
              </Reveal>
            </section>

            <SectionDivider />

            {/* ── 6. Data Engineering ──────────────────────────────────────── */}
            <section aria-labelledby="data-engineering">
              <Reveal delay={0.05}>
                <SectionLabel>Pipeline</SectionLabel>
                <SectionH2 id="data-engineering">Data Engineering Workflow</SectionH2>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {cs.dataSources[0]?.notes
                    ? cs.dataSources[0].notes
                    : "Data is processed through a structured, reproducible pipeline."}
                </p>
              </Reveal>

              {/* Workflow diagram slot — renders only when a diagram is provided */}
              {workflowDiagram && (
                <Reveal delay={0.1}>
                  <div
                    className={cn(
                      "relative mt-6 overflow-hidden rounded-[24px]",
                      "border border-white/[0.09] bg-[#07101A]/70 backdrop-blur-lg",
                      "px-6 py-7"
                    )}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-100"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 1px 1px, rgba(127,231,242,0.04) 1px, transparent 0)",
                        backgroundSize: "28px 28px",
                      }}
                      aria-hidden="true"
                    />
                    <div className="relative">
                      {workflowDiagram}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Workflow steps list */}
              <Reveal delay={0.15}>
                <div className="mt-6 space-y-3">
                  {cs.workflowSteps.map((step) => (
                    <div
                      key={step.step}
                      className="flex items-start gap-4 rounded-[14px] border border-white/[0.06] bg-white/[0.02] px-4 py-3.5"
                    >
                      <span
                        className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-aqua/20 bg-aqua/[0.06] font-mono text-[9px] font-semibold text-aqua/65"
                        aria-hidden="true"
                      >
                        {step.step}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-baseline gap-3">
                          <span className="text-xs font-semibold text-white/75">{step.label}</span>
                          <span className="text-[10px] text-white/30">{step.output}</span>
                        </div>
                        <p className="text-xs leading-relaxed text-white/50">{step.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {step.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[8px] text-white/40"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>

            <SectionDivider />

            {/* ── 7. Methodology ───────────────────────────────────────────── */}
            <section aria-labelledby="methodology">
              <Reveal delay={0.05}>
                <SectionLabel>Methods</SectionLabel>
                <SectionH2 id="methodology">Analytical Methodology</SectionH2>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  Expand each method for description and purpose.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-6">
                  {/* Methodology diagram slot — renders only when a diagram is provided */}
                  {methodologyDiagram}
                  <MethodsSection methods={cs.methods} />
                </div>
              </Reveal>
            </section>

            <SectionDivider />

            {/* ── 8. Output Previews ───────────────────────────────────────── */}
            <section aria-labelledby="output-previews">
              <Reveal delay={0.05}>
                <SectionLabel>Analysis Outputs</SectionLabel>
                <SectionH2 id="output-previews">Selected Output Previews</SectionH2>
                {cs.outputDisclosure ? (
                  <p className="mt-3 text-[11px] leading-relaxed text-white/45">{cs.outputDisclosure}</p>
                ) : (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-[10px] border border-blush/15 bg-blush/[0.04] px-3 py-2">
                    <span className="text-[9px] font-medium tracking-[0.14em] uppercase text-blush/55">
                      Analysis in progress
                    </span>
                    <span className="text-[10px] text-white/40">
                      Visualizations below show illustrative layout only. Actual findings will be added upon completion.
                    </span>
                  </div>
                )}
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {cs.outputPreviews.map((preview) => (
                    <OutputPreviewCard key={preview.id} preview={preview} />
                  ))}
                </div>
              </Reveal>
            </section>

            {/* ── 8b. Results (conditional — only for projects with confirmed outcomes) */}
            {cs.results && cs.results.length > 0 && (
              <>
                <SectionDivider />
                <section aria-labelledby="results">
                  <Reveal delay={0.05}>
                    <SectionLabel>Confirmed Outcomes</SectionLabel>
                    <SectionH2 id="results">{cs.resultsTitle ?? "Results"}</SectionH2>
                    <ul className="mt-6 space-y-3">
                      {cs.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span
                            className="mt-1.5 size-1.5 shrink-0 rounded-full bg-chartreuse/55"
                            aria-hidden="true"
                          />
                          <p className="text-sm leading-relaxed text-white/60">{result}</p>
                        </li>
                      ))}
                    </ul>
                    {cs.resultsProvenance && (
                      <div className="mt-6 rounded-[14px] border border-white/[0.07] bg-white/[0.02] px-5 py-4">
                        <p className="text-[11px] leading-relaxed text-white/38">
                          {cs.resultsProvenance}
                        </p>
                      </div>
                    )}
                  </Reveal>
                </section>
              </>
            )}

            <SectionDivider />

            {/* ── 9. Data Quality ──────────────────────────────────────────── */}
            <section aria-labelledby="data-quality">
              <Reveal delay={0.05}>
                <SectionLabel>Rigor</SectionLabel>
                <SectionH2 id="data-quality">Data Quality &amp; Methodological Safeguards</SectionH2>
                <ul className="mt-6 space-y-3">
                  {cs.dataQualityMeasures.map((measure, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-chartreuse/55"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-relaxed text-white/60">{measure}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>

            <SectionDivider />

            {/* ── 10. Limitations ──────────────────────────────────────────── */}
            <section aria-labelledby="limitations">
              <Reveal delay={0.05}>
                <SectionLabel>Responsible Interpretation</SectionLabel>
                <SectionH2 id="limitations">Limitations</SectionH2>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  Understanding these limitations is essential for correctly interpreting results.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <LimitationCallout limitations={cs.limitations} className="mt-6" />
              </Reveal>
            </section>

            <SectionDivider />

            {/* ── 11. Technology Stack ─────────────────────────────────────── */}
            <section aria-labelledby="technology">
              <Reveal delay={0.05}>
                <SectionLabel>Stack</SectionLabel>
                <SectionH2 id="technology">Technology Stack</SectionH2>
                <div className="mt-6 flex flex-wrap gap-6">
                  {cs.technologies.map((group) => (
                    <div key={group.category}>
                      <p className="mb-2 text-[9px] font-medium tracking-[0.14em] uppercase text-white/28">
                        {group.category}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/65"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>

            <SectionDivider />

            {/* ── 12. Lessons Learned ──────────────────────────────────────── */}
            <section aria-labelledby="lessons">
              <Reveal delay={0.05}>
                <SectionLabel>Reflection</SectionLabel>
                <SectionH2 id="lessons">Lessons Learned</SectionH2>
                <ul className="mt-6 space-y-4">
                  {cs.lessonsLearned.map((lesson, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 shrink-0 font-mono text-[9px] text-aqua/45"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-relaxed text-white/60">{lesson}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>

            <SectionDivider />

            {/* ── 13. Next Steps ───────────────────────────────────────────── */}
            <section aria-labelledby="next-steps">
              <Reveal delay={0.05}>
                <SectionLabel>Forward</SectionLabel>
                <SectionH2 id="next-steps">Next Steps</SectionH2>
                <ul className="mt-6 space-y-3">
                  {cs.nextSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 shrink-0 text-white/20" aria-hidden="true">→</span>
                      <p className="text-sm leading-relaxed text-white/60">{step}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>

          </article>
        </div>
      </div>

      {/* ── Contact CTA ────────────────────────────────────────────────────── */}
      <section
        id="contact"
        aria-labelledby="case-study-contact-heading"
        className="border-t border-white/[0.07]"
      >
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 lg:px-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-lg">
              <h2
                id="case-study-contact-heading"
                className="mb-2 text-xl font-semibold tracking-tight text-white/85 md:text-2xl"
              >
                Interested in this work?
              </h2>
              <p className="text-sm leading-relaxed text-white/50">
                Whether you have questions about the methodology, want to discuss a collaboration, or are curious about applying similar approaches in your context, I would be glad to hear from you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-aqua/30 bg-aqua/[0.08] px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-aqua/45 hover:bg-aqua/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <MailIcon className="size-4" aria-hidden="true" />
                Send an email
              </a>
              <Link
                href="/projects"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium text-white/65 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <ArrowLeftIcon className="size-4" aria-hidden="true" />
                All projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Projects ───────────────────────────────────────────────── */}
      <RelatedProjects currentSlug={project.slug} count={2} />

      {/* ── Case study navigation ──────────────────────────────────────────── */}
      <CaseStudyNav currentSlug={project.slug} />
    </>
  )
}
