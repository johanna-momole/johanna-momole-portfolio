import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { MailIcon } from "lucide-react"
import { Reveal } from "@/components/motion/Reveal"
import { GlassPanel } from "@/components/shared/GlassPanel"
import { siteConfig } from "@/content/site"
import { aboutContent as about } from "@/content/about"

export const metadata: Metadata = {
  title: "About",
  description:
    "Johanna Momole is a biomedical informatics and healthcare analytics professional with a background in biology, hospital operations, and graduate training at the University of Pennsylvania.",
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16">

      {/* ── 1. HERO — graduation portrait ──────────────────────────────────── */}
      <section
        aria-labelledby="about-hero-heading"
        className="pb-16 pt-28 md:pb-20 md:pt-36"
      >
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_460px] lg:items-center lg:gap-14">

          {/* Text — appears first in DOM (top on mobile, left on desktop) */}
          <div className="order-1 max-w-xl">
            <Reveal>
              <p className="mb-5 text-[10px] font-medium tracking-[0.18em] uppercase text-aqua/65">
                {about.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1
                id="about-hero-heading"
                className="mb-6 font-serif text-3xl leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
              >
                {about.headline}
              </h1>
            </Reveal>
            {about.intro.map((paragraph, i) => (
              <Reveal key={i} delay={0.14 + i * 0.07}>
                <p className="mb-4 text-base leading-relaxed text-white/60 last:mb-0 sm:text-[1.05rem]">
                  {paragraph}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${siteConfig.social.email}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-aqua/30 bg-aqua/[0.08] px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-aqua/45 hover:bg-aqua/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <MailIcon className="size-4" aria-hidden="true" />
                  Get in touch
                </a>
                <Link
                  href="/projects"
                  className="inline-flex h-11 items-center rounded-full border border-white/15 px-6 text-sm font-medium text-white/65 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  View work
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Hero portrait — appears second in DOM (below text on mobile, right on desktop) */}
          <div className="order-2">
            <Reveal delay={0.1} direction="none">
              {/*
                Aspect 4:5 editorial portrait.
                object-top keeps face and graduation cap both visible
                through any responsive resize.
              */}
              <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] aspect-[4/5] shadow-[0_12px_80px_rgba(0,0,0,0.50)]">
                <Image
                  src="/images/about/johanna-graduation-portrait.jpg"
                  alt="Johanna Momole in graduation regalia at the University of Pennsylvania"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 460px"
                />
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      <SectionDivider />

      {/* ── 2. PROFESSIONAL STORY — Penn portrait ──────────────────────────── */}
      <section
        aria-labelledby="about-story-heading"
        className="py-20 md:py-24"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[380px_1fr] lg:items-start lg:gap-16">

          {/* Penn portrait — left on desktop, below heading on mobile */}
          <div className="lg:sticky lg:top-28">
            <Reveal direction="left" delay={0.05}>
              {/*
                Tall 3:4 editorial composition.
                object-position: center 15% keeps Johanna's face in the upper
                third while preserving the graduation stole and architectural
                context in the background — avoids a tight face crop.
              */}
              <div className="relative overflow-hidden rounded-[24px] border border-white/[0.07] aspect-[3/4] shadow-[0_8px_48px_rgba(0,0,0,0.40)]">
                <Image
                  src="/images/about/johanna-penn-portrait.jpg"
                  alt="Johanna Momole wearing her Penn graduation stole on campus"
                  fill
                  className="object-cover [object-position:center_15%]"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 380px"
                />
              </div>
            </Reveal>
          </div>

          {/* Chapters — right on desktop */}
          <div>
            <Reveal delay={0.05}>
              <SectionLabel>{about.story.label}</SectionLabel>
              <h2
                id="about-story-heading"
                className="mb-10 max-w-lg text-2xl font-semibold leading-tight text-white/90 sm:text-[1.6rem]"
              >
                {about.story.heading}
              </h2>
            </Reveal>

            <div className="space-y-8">
              {about.story.chapters.map((chapter, i) => (
                <Reveal key={chapter.label} delay={0.1 + i * 0.07}>
                  <div className="border-l-2 border-white/[0.07] pl-6">
                    <p className="mb-1 text-[9px] font-medium tracking-[0.16em] uppercase text-aqua/40">
                      {chapter.label}
                    </p>
                    <h3 className="mb-3 text-base font-semibold text-white/80">
                      {chapter.heading}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/55">
                      {chapter.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </section>

      <SectionDivider />

      {/* ── 3. GRADUATION MILESTONE — cap toss ─────────────────────────────── */}
      <section
        aria-labelledby="about-milestone-heading"
        className="py-12 md:py-16"
      >
        {/*
          Responsive composition:
          - Mobile (<sm): aspect-[2/3] — tall portrait crop so the airborne
            cap above Johanna stays visible without the horizontal crop
            cutting it out
          - Desktop (sm+): aspect-[16/7] — wide cinematic frame, tree-lined
            walkway visible on both sides
          object-position center 20%: shifts anchor point up so the cap in
          flight at the top of the frame is not cropped on wide viewports.
        */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.07] aspect-[2/3] shadow-[0_8px_64px_rgba(0,0,0,0.45)] sm:aspect-[16/7]">
            <Image
              src="/images/about/johanna-cap-toss.jpg"
              alt="Johanna Momole tossing her graduation cap on the University of Pennsylvania campus"
              fill
              className="object-cover [object-position:center_20%]"
              sizes="(max-width: 640px) 95vw, 90vw"
            />
            {/* Gradient to ensure overlay legibility without covering the subject */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent"
              aria-hidden="true"
            />
            {/* Metadata overlay — bottom left, never over Johanna's face */}
            <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
              <div
                className="inline-flex flex-col gap-0.5 rounded-[12px] border border-white/[0.14] bg-black/65 px-4 py-3 backdrop-blur-sm"
                aria-hidden="true"
              >
                <span className="text-[11px] font-semibold tracking-wide text-white/90">
                  Master of Biomedical Informatics
                </span>
                <span className="text-[10px] text-white/55">
                  University of Pennsylvania &middot; 2026
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* The milestone text is below the image, NOT over it */}
        <Reveal delay={0.1}>
          <p
            id="about-milestone-heading"
            className="mt-5 text-center text-xs text-white/28 tracking-wide"
            aria-label="Master of Biomedical Informatics, University of Pennsylvania, Class of 2026"
          >
            Master of Biomedical Informatics &middot; University of Pennsylvania &middot; Class of 2026
          </p>
        </Reveal>
      </section>

      <SectionDivider />

      {/* ── 4. EDUCATION ───────────────────────────────────────────────────── */}
      <section
        aria-labelledby="about-education-heading"
        className="py-16 md:py-20"
      >
        <Reveal>
          <SectionLabel>{about.education.label}</SectionLabel>
          <h2
            id="about-education-heading"
            className="mb-8 text-2xl font-semibold leading-tight text-white/90 sm:text-[1.6rem]"
          >
            Academic background
          </h2>
        </Reveal>

        <div className="flex flex-col gap-4">
          {about.education.entries.map((entry) => (
            <Reveal key={entry.degree} delay={0.06}>
              <GlassPanel variant="dark" className="p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="mb-1 text-base font-semibold text-white/85">
                      {entry.degree}
                    </h3>
                    <p className="text-sm font-medium text-aqua/70">
                      {entry.institution} &middot; {entry.location}
                    </p>
                    <p className="mt-2 text-xs text-white/45">{entry.gpa}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                    <span className="rounded-full border border-chartreuse/25 bg-chartreuse/[0.06] px-3 py-1 text-[10px] font-semibold text-chartreuse/80">
                      {entry.year}
                    </span>
                    <div className="text-right">
                      <p className="text-[10px] font-medium text-lilac/70">
                        {entry.award}
                      </p>
                      <p className="text-[9px] text-white/30">{entry.awardDetail}</p>
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── 5. SKILLS ──────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="about-skills-heading"
        className="py-16 md:py-20"
      >
        <Reveal>
          <SectionLabel>{about.skills.label}</SectionLabel>
          <h2
            id="about-skills-heading"
            className="mb-8 text-2xl font-semibold leading-tight text-white/90 sm:text-[1.6rem]"
          >
            Methods, tools, and domains
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {about.skills.categories.map((cat, i) => (
            <Reveal key={cat.heading} delay={0.06 + i * 0.06}>
              <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-6 h-full">
                <h3 className="mb-4 text-[10px] font-medium tracking-[0.16em] uppercase text-aqua/55">
                  {cat.heading}
                </h3>
                <ul className="space-y-2" role="list">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-white/60"
                    >
                      <span
                        className="size-1 shrink-0 rounded-full bg-aqua/35"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── 6. CONTACT CTA ─────────────────────────────────────────────────── */}
      <section
        aria-labelledby="about-contact-heading"
        className="py-16 md:py-20"
      >
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-lg">
              <h2
                id="about-contact-heading"
                className="mb-2 text-xl font-semibold tracking-tight text-white/85 md:text-2xl"
              >
                Interested in working together?
              </h2>
              <p className="text-sm leading-relaxed text-white/50">
                Whether you have questions about my work, want to discuss a collaboration, or are exploring how analytical methods could apply in your context, I would be glad to hear from you.
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
                className="inline-flex h-11 items-center rounded-full border border-white/15 px-6 text-sm font-medium text-white/65 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                View projects
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  )
}
