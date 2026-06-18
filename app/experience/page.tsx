import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon, MailIcon } from "lucide-react"
import { Reveal } from "@/components/motion/Reveal"
import { GlassPanel } from "@/components/shared/GlassPanel"
import { siteConfig } from "@/content/site"
import {
  experienceRoles,
  capabilities,
  type ExperienceRole,
} from "@/content/experience"

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Johanna Momole's professional journey from bioinformatics research and diagnostic laboratory operations through hospital network strategy and graduate training in biomedical informatics at the University of Pennsylvania.",
}

// ── Small helpers ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-medium tracking-[0.18em] uppercase text-aqua/55">
      {children}
    </p>
  )
}

function SectionDivider() {
  return <div className="border-b border-white/[0.05]" />
}

// Domain accent colors mapped to Tailwind tokens
const domainStyles: Record<string, { border: string; chip: string; metric: string }> = {
  "Bioinformatics Research": {
    border: "border-organic-green/25",
    chip:   "bg-organic-green/[0.08] border-organic-green/20 text-organic-green/75",
    metric: "text-organic-green",
  },
  "Diagnostic Laboratory": {
    border: "border-blush/25",
    chip:   "bg-blush/[0.08] border-blush/20 text-blush/75",
    metric: "text-blush",
  },
  "Healthcare Operations": {
    border: "border-aqua/30",
    chip:   "bg-aqua/[0.08] border-aqua/20 text-aqua/80",
    metric: "text-aqua",
  },
  "Biomedical Informatics": {
    border: "border-lilac/30",
    chip:   "bg-lilac/[0.08] border-lilac/20 text-lilac/80",
    metric: "text-lilac",
  },
}

function DomainChip({ domain }: { domain: string }) {
  const style = domainStyles[domain] ?? {
    chip: "bg-white/[0.06] border-white/15 text-white/55",
  }
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold tracking-wide ${style.chip}`}
    >
      {domain}
    </span>
  )
}

function MetricCallout({
  value,
  label,
  context,
  colorClass,
}: {
  value: string
  label: string
  context: string
  colorClass: string
}) {
  return (
    <div className="rounded-[16px] border border-white/[0.08] bg-white/[0.02] p-4">
      <p className={`text-2xl font-bold leading-none tracking-tight ${colorClass}`}>
        {value}
      </p>
      <p className="mt-1 text-xs font-medium text-white/70">{label}</p>
      <p className="mt-0.5 text-[10px] text-white/35">{context}</p>
    </div>
  )
}

// ── Chapter component ─────────────────────────────────────────────────────────

function ChapterSection({ role, index }: { role: ExperienceRole; index: number }) {
  const style = domainStyles[role.domain] ?? {
    border: "border-white/10",
    metric: "text-aqua",
  }
  const isLast = index === experienceRoles.length - 1
  const isEducation = role.type === "education"

  return (
    <section
      aria-labelledby={`chapter-${role.id}-heading`}
      className="py-16 md:py-20"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr] lg:gap-16">

        {/* Chapter marker — sticky on desktop */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal direction="left" delay={0.03}>
            <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
              <p
                className={`font-serif text-5xl font-bold leading-none tracking-tight ${style.metric} opacity-30 select-none`}
                aria-hidden="true"
              >
                {role.chapterNumber}
              </p>
              <div>
                <p className="text-[9px] font-medium tracking-[0.20em] uppercase text-white/30">
                  {role.chapterEra}
                </p>
                {role.period && (
                  <p className="mt-0.5 text-[10px] text-white/25">{role.period}</p>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Chapter content */}
        <div>
          <Reveal delay={0.04}>
            <div className="mb-5 flex flex-wrap items-start gap-3">
              <DomainChip domain={role.domain} />
              {isEducation && (
                <span className="inline-flex items-center rounded-full border border-chartreuse/25 bg-chartreuse/[0.06] px-3 py-1 text-[10px] font-semibold text-chartreuse/80">
                  LPDP Scholar
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              id={`chapter-${role.id}-heading`}
              className="mb-1 text-xl font-semibold leading-tight text-white/90 sm:text-2xl"
            >
              {role.title}
            </h2>
            <p className={`mb-5 text-sm font-medium ${style.metric} opacity-70`}>
              {role.organization} &middot; {role.location}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mb-7 max-w-2xl text-[15px] leading-relaxed text-white/55">
              {role.summary}
            </p>
          </Reveal>

          {/* Highlights */}
          <Reveal delay={0.10}>
            <div
              className={`mb-7 border-l-2 ${style.border} pl-6`}
            >
              <ul className="space-y-2.5" role="list">
                {role.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-white/60"
                  >
                    <span
                      className={`mt-[7px] size-1 shrink-0 rounded-full ${style.metric} opacity-50`}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Metrics */}
          {role.metrics && (
            <Reveal delay={0.12}>
              <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {role.metrics.map((m) => (
                  <MetricCallout
                    key={m.value}
                    value={m.value}
                    label={m.label}
                    context={m.context}
                    colorClass={style.metric}
                  />
                ))}
              </div>
            </Reveal>
          )}

          {/* Technologies */}
          {role.technologies.length > 0 && (
            <Reveal delay={0.13}>
              <div className="flex flex-wrap gap-2">
                {role.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/[0.10] bg-white/[0.03] px-3 py-1 text-[11px] text-white/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          )}

          {/* Linked projects */}
          {role.linkedProjectSlugs.length > 0 && (
            <Reveal delay={0.15}>
              <div className="mt-6 flex flex-wrap gap-3">
                {role.linkedProjectSlugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/projects/${slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] px-4 py-2 text-xs font-medium text-white/50 transition-all hover:border-white/20 hover:bg-white/[0.05] hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    View case study
                    <ArrowRightIcon className="size-3" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {!isLast && <div className="mt-12 border-b border-white/[0.04]" />}
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ExperiencePage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16">

      {/* ── 1. EDITORIAL HERO ────────────────────────────────────────────────── */}
      <section
        aria-labelledby="experience-hero-heading"
        className="pb-12 pt-28 md:pb-16 md:pt-36"
      >
        <div className="max-w-2xl">
          <Reveal>
            <p className="mb-5 text-[10px] font-medium tracking-[0.18em] uppercase text-aqua/65">
              Professional Journey
            </p>
          </Reveal>
          <Reveal delay={0.07}>
            <h1
              id="experience-hero-heading"
              className="mb-6 font-serif text-3xl leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
            >
              From research bench to hospital operations to analytical informatics
            </h1>
          </Reveal>
          <Reveal delay={0.13}>
            <p className="mb-4 text-base leading-relaxed text-white/58 sm:text-[1.05rem]">
              My professional path is not a single straight line. It moves through bioinformatics research at ITB, molecular laboratory work in Jakarta, hospital network strategy at Siloam Hospitals, and graduate training in biomedical informatics at Penn.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="text-base leading-relaxed text-white/58 sm:text-[1.05rem]">
              Each chapter added a layer of understanding that the previous one lacked. The laboratory gave me clinical grounding that research alone does not. Operations gave me an appreciation for what analytical work has to produce to actually change a decision. Informatics gave me the methods to build rigorous evidence at scale.
            </p>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      {/* ── 2. IMPACT METRICS STRIP ──────────────────────────────────────────── */}
      <section aria-label="Selected impact metrics" className="py-12 md:py-14">
        <Reveal>
          <SectionLabel>Selected impact</SectionLabel>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {siteConfig.metrics.map((m, i) => (
            <Reveal key={m.value} delay={0.05 + i * 0.06}>
              <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.02] p-5">
                <p className="text-2xl font-bold leading-none tracking-tight text-chartreuse sm:text-3xl">
                  {m.value}
                </p>
                <p className="mt-2 text-xs leading-snug text-white/55">{m.label}</p>
                <p className="mt-1 text-[10px] text-white/28">{m.category}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── 3. CHAPTER TIMELINE ──────────────────────────────────────────────── */}
      <div>
        {experienceRoles.map((role, i) => (
          <ChapterSection key={role.id} role={role} index={i} />
        ))}
      </div>

      <SectionDivider />

      {/* ── 4. CROSS-FUNCTIONAL CAPABILITIES ────────────────────────────────── */}
      <section
        aria-labelledby="experience-capabilities-heading"
        className="py-16 md:py-20"
      >
        <Reveal>
          <SectionLabel>Capabilities</SectionLabel>
          <h2
            id="experience-capabilities-heading"
            className="mb-8 text-2xl font-semibold leading-tight text-white/90 sm:text-[1.6rem]"
          >
            What working across these domains produced
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.area} delay={0.05 + i * 0.06}>
              <div className="h-full rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-6">
                <h3 className="mb-3 text-[10px] font-medium tracking-[0.16em] uppercase text-aqua/60">
                  {cap.area}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">
                  {cap.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── 5. TRANSITION BRIDGE ─────────────────────────────────────────────── */}
      <section
        aria-labelledby="experience-transition-heading"
        className="py-16 md:py-20"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_480px] lg:gap-16 lg:items-start">
          <div>
            <Reveal>
              <SectionLabel>The turn toward informatics</SectionLabel>
              <h2
                id="experience-transition-heading"
                className="mb-6 text-2xl font-semibold leading-tight text-white/90 sm:text-[1.6rem]"
              >
                Why biomedical informatics
              </h2>
            </Reveal>
            <Reveal delay={0.07}>
              <p className="mb-5 text-[15px] leading-relaxed text-white/55">
                The decision to pursue graduate training in biomedical informatics was not a departure from healthcare operations. It was a response to what I observed within it. Working in hospital settings, I consistently encountered the same structural problem: data existed, but the infrastructure to make it useful for decisions did not.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mb-5 text-[15px] leading-relaxed text-white/55">
                Referral data that could have guided network strategy sat in systems that no one had time to query. Laboratory workflows that could have been automated ran manually for years. The gap was not a data problem. It was an infrastructure problem, and addressing it requires both the clinical understanding to know what matters and the technical skills to build something usable.
              </p>
            </Reveal>
            <Reveal delay={0.17}>
              <p className="text-[15px] leading-relaxed text-white/55">
                The LPDP Scholarship from the Ministry of Finance of the Republic of Indonesia made graduate study at Penn possible. It brought together epidemiology, clinical data science, real-world evidence methods, and the analytical product thinking needed to close that gap at scale.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.08} direction="right">
            <GlassPanel variant="dark" className="p-7 sm:p-8">
              <p className="mb-4 text-[9px] font-medium tracking-[0.18em] uppercase text-lilac/55">
                Graduate Focus Areas
              </p>
              <ul className="space-y-3" role="list">
                {[
                  "Real-world evidence and cohort design",
                  "Pharmacovigilance signal detection",
                  "Clinical data science and machine learning",
                  "Health data standards — OMOP CDM, FHIR",
                  "AI in healthcare",
                  "Biomedical data engineering",
                ].map((area) => (
                  <li
                    key={area}
                    className="flex items-start gap-3 text-sm text-white/60"
                  >
                    <span
                      className="mt-[7px] size-1 shrink-0 rounded-full bg-lilac/40"
                      aria-hidden="true"
                    />
                    {area}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-white/[0.06] pt-5">
                <p className="text-xs font-semibold text-chartreuse/75">
                  LPDP Scholar
                </p>
                <p className="text-[11px] text-white/35">
                  Ministry of Finance, Republic of Indonesia
                </p>
                <p className="mt-2 text-[11px] text-white/35">
                  Master of Biomedical Informatics &middot; GPA 3.81 / 4.00
                </p>
              </div>
            </GlassPanel>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      {/* ── 6. PROJECT BRIDGE ────────────────────────────────────────────────── */}
      <section aria-label="Project work" className="py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <SectionLabel>Projects</SectionLabel>
              <h2 className="mb-3 text-xl font-semibold tracking-tight text-white/88 md:text-2xl">
                See the analytical work
              </h2>
              <p className="text-sm leading-relaxed text-white/50">
                Project case studies document the methods, data sources, analytical decisions, and outputs across pharmacovigilance, real-world evidence, healthcare operations, bioinformatics, and public health.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-aqua/30 bg-aqua/[0.08] px-6 py-3 text-sm font-semibold text-white transition-all hover:border-aqua/45 hover:bg-aqua/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              View all projects
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>

      <SectionDivider />

      {/* ── 7. CONTACT CTA ───────────────────────────────────────────────────── */}
      <section
        aria-labelledby="experience-contact-heading"
        className="py-16 md:py-20"
      >
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-lg">
              <h2
                id="experience-contact-heading"
                className="mb-2 text-xl font-semibold tracking-tight text-white/85 md:text-2xl"
              >
                Interested in working together?
              </h2>
              <p className="text-sm leading-relaxed text-white/50">
                Whether you are exploring collaboration, have questions about my analytical work, or want to discuss how these methods could apply in your context, I would be glad to hear from you.
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
                href="/resume"
                className="inline-flex h-11 items-center rounded-full border border-white/15 px-6 text-sm font-medium text-white/65 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                View resume
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  )
}
