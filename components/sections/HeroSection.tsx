"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { MailIcon, ArrowRightIcon } from "lucide-react"

import { siteConfig } from "@/content/site"
import { HeroProfileCard } from "@/components/sections/HeroProfileCard"
import { cn } from "@/lib/utils"

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:")
  const Tag = isExternal ? "a" : Link

  return (
    <Tag
      href={href}
      aria-label={label}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "flex size-9 items-center justify-center rounded-full",
        "border border-white/20",
        "text-white/55 hover:text-white hover:border-white/35",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      )}
    >
      {children}
    </Tag>
  )
}

export function HeroSection() {
  const prefersReduced = useReducedMotion()

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: prefersReduced ? 0 : 0.65,
      delay: prefersReduced ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  })

  const { social, resume } = siteConfig

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      aria-label="Introduction"
    >
      {/* Hero-specific text legibility gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(5,7,19,0.52) 0%, rgba(5,7,19,0.18) 52%, transparent 78%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid h-full max-w-[1440px] grid-cols-1 lg:grid-cols-2">

        {/* ── Left: Content column ──────────────────────────────────────────── */}
        <div className="flex flex-col justify-center px-8 pb-16 pt-32 md:px-16 lg:pb-0 lg:pr-12 lg:pt-0">
          <motion.p
            {...fadeUp(0.1)}
            className="mb-6 text-xs font-medium tracking-[0.18em] uppercase text-white/45"
          >
            {siteConfig.eyebrow}
          </motion.p>

          <motion.h1
            {...fadeUp(0.2)}
            className="mb-6 max-w-xl font-serif text-4xl leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]"
          >
            {siteConfig.headline}
          </motion.h1>

          <motion.p
            {...fadeUp(0.32)}
            className="mb-10 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg"
          >
            {siteConfig.bio}
          </motion.p>

          <motion.div {...fadeUp(0.42)} className="mb-10 flex flex-wrap gap-3">
            <Link
              href="/#work"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F8F7F4] px-8 text-sm font-semibold text-[#050713] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              Explore My Work
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href={resume}
              aria-label="View Johanna Momole's résumé"
              className="inline-flex h-11 items-center rounded-full border border-white/25 px-8 text-sm font-medium text-white/85 transition-all hover:border-white/38 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              View Resume
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp(0.52)}
            className="flex items-center gap-2"
            aria-label="Social links"
          >
            {social.linkedin && (
              <SocialLink href={social.linkedin} label="Johanna Momole on LinkedIn">
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                  <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                </svg>
              </SocialLink>
            )}
            {social.github && (
              <SocialLink href={social.github} label="Johanna Momole on GitHub">
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </SocialLink>
            )}
            <SocialLink
              href={`mailto:${social.email}`}
              label={`Email Johanna at ${social.email}`}
            >
              <MailIcon className="size-4" aria-hidden="true" />
            </SocialLink>
          </motion.div>
        </div>

        {/* ── Right: Profile cards floating over video ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReduced ? 0 : 0.7, delay: prefersReduced ? 0 : 0.2 }}
          className="relative lg:min-h-screen"
        >

          {/* ── Desktop: balanced 2×3 cluster, vertically centered (lg+) ──────── */}
          {/*
            Cards in a CSS grid: transforms don't affect layout, so floating
            animations can never push cards into each other.
            pointer-events-none on the container lets clicks pass through to
            the video; the grid and cards have default pointer-events.
          */}
          <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none">
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 pointer-events-auto">

              {/* Row 1 — left: Education | right: Scholarship */}
              <div className="w-[166px]">
                <HeroProfileCard
                  type="credential"
                  eyebrow="Education"
                  primary="UPenn MBMI"
                  secondary="Master of Biomedical Informatics"
                  supporting="GPA 3.81 / 4.00"
                  floatDelay={0.2}
                  floatY={-3}
                  floatDuration={4.8}
                />
              </div>
              <div className="w-[166px]">
                <HeroProfileCard
                  type="credential"
                  eyebrow="Scholarship"
                  primary="LPDP Scholar"
                  secondary="Full-ride merit scholarship"
                  supporting="LPDP · Ministry of Finance of Indonesia"
                  floatDelay={1.2}
                  floatY={-4}
                  floatDuration={4.6}
                />
              </div>

              {/* Row 2 — left: Research Scale | right: Leadership */}
              <div className="w-[166px]">
                <HeroProfileCard
                  type="metric"
                  eyebrow="Research Scale"
                  primary="158K+"
                  secondary="Distinct GLP-1 cases analyzed"
                  supporting="Sex-stratified pharmacovigilance"
                  visual="cases"
                  floatDelay={0.8}
                  floatY={-4}
                  floatDuration={4.1}
                />
              </div>
              <div className="w-[166px]">
                <HeroProfileCard
                  type="leadership"
                  eyebrow="Leadership"
                  primary="Executive-Facing"
                  secondary="Weekly insights presented to the CEO and Hospital Director"
                  floatDelay={0.5}
                  floatY={-3}
                  floatDuration={5.0}
                />
              </div>

              {/* Row 3 — left: Partnerships | right: Signal Detection */}
              <div className="w-[166px]">
                <HeroProfileCard
                  type="metric"
                  eyebrow="Partnerships"
                  primary="200+"
                  secondary="Hospital and clinic agreements secured"
                  visual="partnerships"
                  floatDelay={1.5}
                  floatY={-3}
                  floatDuration={4.5}
                />
              </div>
              <div className="w-[166px]">
                <HeroProfileCard
                  type="metric"
                  eyebrow="Signal Detection"
                  primary="665"
                  secondary="Multiple-testing-adjusted safety signals detected"
                  supporting="FAERS · ROR · PRR"
                  visual="signals"
                  floatDelay={1.9}
                  floatY={-5}
                  floatDuration={3.9}
                />
              </div>

            </div>
          </div>

          {/* ── Tablet + Mobile: 2-column grid below hero copy (< lg) ─────────── */}
          {/* floatY={0} disables floating on static grid cards */}
          <div className="grid grid-cols-2 gap-3 px-4 py-8 sm:px-8 sm:py-10 lg:hidden">
            {/* Row 1: Education | Scholarship */}
            <HeroProfileCard
              type="credential"
              eyebrow="Education"
              primary="UPenn MBMI"
              secondary="Master of Biomedical Informatics"
              supporting="GPA 3.81 / 4.00"
              floatY={0}
            />
            <HeroProfileCard
              type="credential"
              eyebrow="Scholarship"
              primary="LPDP Scholar"
              secondary="Full-ride merit scholarship"
              supporting="LPDP · Ministry of Finance of Indonesia"
              floatY={0}
            />
            {/* Row 2: Research Scale | Leadership */}
            <HeroProfileCard
              type="metric"
              eyebrow="Research Scale"
              primary="158K+"
              secondary="Distinct GLP-1 cases analyzed"
              supporting="Sex-stratified pharmacovigilance"
              visual="cases"
              floatY={0}
            />
            <HeroProfileCard
              type="leadership"
              eyebrow="Leadership"
              primary="Executive-Facing"
              secondary="Weekly insights presented to the CEO and Hospital Director"
              floatY={0}
            />
            {/* Row 3: Partnerships | Signal Detection */}
            <HeroProfileCard
              type="metric"
              eyebrow="Partnerships"
              primary="200+"
              secondary="Hospital and clinic agreements secured"
              visual="partnerships"
              floatY={0}
            />
            <HeroProfileCard
              type="metric"
              eyebrow="Signal Detection"
              primary="665"
              secondary="Multiple-testing-adjusted safety signals detected"
              supporting="FAERS · ROR · PRR"
              visual="signals"
              floatY={0}
            />
          </div>

        </motion.div>
      </div>
    </section>
  )
}
