"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { MailIcon, ArrowRightIcon } from "lucide-react"

import { siteConfig } from "@/content/site"
import { Button } from "@/components/ui/button"
import { BiologicalDataVisual } from "@/components/sections/BiologicalDataVisual"
import { EvidenceCard } from "@/components/sections/EvidenceCard"
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
        "border border-black/12 dark:border-white/15",
        "text-foreground/50 hover:text-foreground hover:border-black/25 dark:hover:border-white/30",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

  const { evidenceCards, social, resume } = siteConfig

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      aria-label="Introduction"
    >
      <div className="mx-auto grid h-full max-w-[1440px] grid-cols-1 lg:grid-cols-2">
        {/* ── Left: Content column ─────────────────────────────────────────── */}
        <div className="flex flex-col justify-center px-8 pb-16 pt-32 md:px-16 lg:pb-0 lg:pr-12 lg:pt-0">
          {/* Eyebrow */}
          <motion.p
            {...fadeUp(0.1)}
            className="mb-6 text-xs font-medium tracking-[0.18em] uppercase text-muted-foreground"
          >
            {siteConfig.eyebrow}
          </motion.p>

          {/* Headline — serif for the whole line as the single editorial phrase */}
          <motion.h1
            {...fadeUp(0.2)}
            className="mb-6 max-w-xl font-serif text-4xl leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.25rem]"
          >
            {siteConfig.headline}
          </motion.h1>

          {/* Supporting paragraph */}
          <motion.p
            {...fadeUp(0.32)}
            className="mb-10 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {siteConfig.bio}
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.42)} className="mb-10 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="rounded-full bg-near-black text-ivory dark:bg-ivory dark:text-near-black hover:opacity-80 gap-2"
              asChild
            >
              <Link href="/#work">
                Explore My Work
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/8"
              asChild
            >
              <a href={resume} aria-label="View Resume (PDF)">
                View Resume
              </a>
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            {...fadeUp(0.52)}
            className="flex items-center gap-2"
            aria-label="Social links"
          >
            {social.linkedin && (
              <SocialLink href={social.linkedin} label="Johanna on LinkedIn">
                {/* LinkedIn "in" logo */}
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                  <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                </svg>
              </SocialLink>
            )}
            {social.github && (
              <SocialLink href={social.github} label="Johanna on GitHub">
                {/* GitHub Octocat */}
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

        {/* ── Right: Visual column ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReduced ? 0 : 0.8, delay: prefersReduced ? 0 : 0.15 }}
          className="relative flex min-h-[480px] items-center justify-center overflow-hidden bg-near-black dark:bg-deep-blue lg:min-h-screen"
        >
          {/* Subtle radial glow in the background of the visual column */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 55% 45%, rgba(201,242,238,0.08) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Visual */}
          <div className="relative flex w-full max-w-[460px] items-center justify-center p-8 lg:p-10">
            <BiologicalDataVisual />

            {/* Floating evidence cards — positioned around the visual */}
            {/* Card 1: upper left */}
            <div className="absolute left-2 top-10 z-10 hidden sm:block lg:left-0 lg:-translate-x-8">
              <EvidenceCard
                category={evidenceCards[0].category}
                value={evidenceCards[0].value}
                label={evidenceCards[0].label}
                detail={evidenceCards[0].detail}
                floatDelay={0}
              />
            </div>

            {/* Card 2: lower right */}
            <div className="absolute bottom-12 right-2 z-10 hidden sm:block lg:right-0 lg:translate-x-8">
              <EvidenceCard
                category={evidenceCards[1].category}
                value={evidenceCards[1].value}
                label={evidenceCards[1].label}
                detail={evidenceCards[1].detail}
                floatDelay={1.3}
              />
            </div>

            {/* Card 3: lower left */}
            <div className="absolute bottom-32 left-2 z-10 hidden sm:block lg:left-0 lg:-translate-x-8">
              <EvidenceCard
                category={evidenceCards[2].category}
                value={evidenceCards[2].value}
                label={evidenceCards[2].label}
                detail={evidenceCards[2].detail}
                floatDelay={0.65}
              />
            </div>
          </div>

          {/* Mobile: stacked cards below the visual */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 pb-6 sm:hidden px-4">
            {evidenceCards.map((card) => (
              <div key={card.id} className="flex-1 min-w-0 max-w-[160px]">
                <EvidenceCard
                  category={card.category}
                  value={card.value}
                  label={card.label}
                  detail={card.detail}
                  floatDelay={0}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
