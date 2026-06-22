import type { Metadata } from "next"
import { MailIcon, ArrowRightIcon, ArrowDownToLineIcon } from "lucide-react"
import { Reveal } from "@/components/motion/Reveal"
import { GlassPanel } from "@/components/shared/GlassPanel"
import { CopyEmailButton } from "@/components/contact/CopyEmailButton"
import { siteConfig } from "@/content/site"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Johanna Momole. Open to conversations about real-world evidence, healthcare analytics, biomedical informatics, and analytical product development.",
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionDivider() {
  return <div className="border-b border-white/[0.05]" />
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const { email, linkedin, github } = siteConfig.social
  const { interests, location, collaboration } = siteConfig.contact
  const hasLinkedIn = linkedin.length > 0
  const hasGitHub   = github.length > 0

  const mailtoHref = `mailto:${email}?subject=Portfolio%20inquiry`

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16">

      {/* ── MAIN 2-COLUMN SECTION ────────────────────────────────────────────── */}
      <section
        aria-labelledby="contact-hero-heading"
        className="pb-16 pt-28 md:pb-24 md:pt-36"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_460px] lg:items-start lg:gap-16">

          {/* ── LEFT: Heading + intro + interests + location ── */}
          <div>
            <Reveal>
              <p className="mb-5 text-[10px] font-medium tracking-[0.18em] uppercase text-aqua/65">
                Contact
              </p>
            </Reveal>
            <Reveal delay={0.07}>
              <h1
                id="contact-hero-heading"
                className="mb-6 font-serif text-3xl leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
              >
                Have a healthcare question that data can clarify?
              </h1>
            </Reveal>
            <Reveal delay={0.13}>
              <p className="text-base leading-relaxed text-white/58 sm:text-[1.05rem]">
                I am open to conversations about real-world evidence, healthcare analytics, biomedical data, and analytical product development. Whether you have a research question, a collaboration in mind, or simply want to discuss the work, reach out.
              </p>
            </Reveal>

            {/* Areas of interest */}
            <Reveal delay={0.22}>
              <div className="mt-12">
                <p className="mb-4 text-[10px] font-medium tracking-[0.18em] uppercase text-aqua/55">
                  Open to conversations about
                </p>
                <ul
                  className="flex flex-wrap gap-2.5"
                  role="list"
                  aria-label="Professional interest areas"
                >
                  {interests.map((item) => (
                    <li key={item}>
                      <span className="inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/70">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Location / Collaboration / Availability */}
            <Reveal delay={0.30}>
              <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
                <div>
                  <h2 className="mb-3 text-[10px] font-medium tracking-[0.18em] uppercase text-blush/55">
                    Location
                  </h2>
                  <p className="text-sm leading-relaxed text-white/60">
                    {location}
                  </p>
                </div>
                <div>
                  <h2 className="mb-3 text-[10px] font-medium tracking-[0.18em] uppercase text-lilac/55">
                    Collaboration
                  </h2>
                  <p className="text-sm leading-relaxed text-white/60">
                    {collaboration}
                  </p>
                </div>
                <div>
                  <h2 className="mb-3 text-[10px] font-medium tracking-[0.18em] uppercase text-organic-green/55">
                    Availability
                  </h2>
                  <p className="text-sm leading-relaxed text-white/60">
                    Graduate study at the University of Pennsylvania is complete. Available for full-time roles now and open to early conversations about upcoming opportunities.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT: Email card + professional links ── */}
          <div className="space-y-8 lg:sticky lg:top-28">

            {/* Email card */}
            <Reveal delay={0.05}>
              <GlassPanel variant="dark" className="p-7 sm:p-9">

                <div
                  className="mb-6 flex items-center gap-3"
                  aria-hidden="true"
                >
                  <div className="h-px flex-1 bg-gradient-to-r from-aqua/20 to-transparent" />
                  <span className="text-[9px] font-medium tracking-[0.22em] uppercase text-aqua/35">
                    Direct contact
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-aqua/20 to-transparent" />
                </div>

                <h2
                  id="contact-email-heading"
                  className="mb-2 text-[10px] font-medium tracking-[0.18em] uppercase text-white/30"
                >
                  Email
                </h2>

                {/*
                  Email address is always visible in plain HTML — no JS required
                  to read it. The copy and mailto buttons are progressive enhancement.
                */}
                <address className="not-italic">
                  <a
                    href={mailtoHref}
                    className="mb-5 block break-all text-xl font-medium text-white/90 transition-colors hover:text-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm sm:text-2xl"
                    aria-label={`Send an email to ${email}`}
                  >
                    {email}
                  </a>
                </address>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={mailtoHref}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-aqua px-6 text-sm font-semibold text-[#050713] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/50"
                    aria-label={`Open email client to send a message to ${email}`}
                  >
                    <MailIcon className="size-4 shrink-0" aria-hidden="true" />
                    Send an email
                  </a>

                  <CopyEmailButton email={email} />
                </div>

                <p className="mt-5 text-xs text-white/28">
                  Suggested subject: &ldquo;Portfolio inquiry&rdquo;, or use your own.
                </p>

              </GlassPanel>
            </Reveal>

            {/* Professional links */}
            <Reveal delay={0.12}>
              <div>
                <p className="mb-4 text-[10px] font-medium tracking-[0.18em] uppercase text-aqua/55">
                  Professional links
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={siteConfig.resumePdf}
                    download
                    aria-label="Download Johanna Momole's résumé as a PDF"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-lilac/30 bg-lilac/[0.07] px-5 text-sm font-medium text-white/80 transition-all hover:border-lilac/45 hover:bg-lilac/[0.12] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    <ArrowDownToLineIcon className="size-4 shrink-0" aria-hidden="true" />
                    Download R&eacute;sum&eacute;
                  </a>

                  {hasLinkedIn && (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-medium text-white/70 transition-all hover:border-white/25 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                      aria-label="Johanna Momole on LinkedIn (opens in new tab)"
                    >
                      LinkedIn
                      <ArrowRightIcon className="size-3.5 rotate-[-45deg]" aria-hidden="true" />
                    </a>
                  )}

                  {hasGitHub && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-medium text-white/70 transition-all hover:border-white/25 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                      aria-label="Johanna Momole on GitHub (opens in new tab)"
                    >
                      GitHub
                      <ArrowRightIcon className="size-3.5 rotate-[-45deg]" aria-hidden="true" />
                    </a>
                  )}
                </div>

                {(!hasLinkedIn || !hasGitHub) && (
                  <p className="mt-4 text-xs text-white/25">
                    {!hasLinkedIn && !hasGitHub
                      ? "LinkedIn and GitHub links will appear here once added."
                      : !hasLinkedIn
                        ? "LinkedIn link will appear here once added."
                        : "GitHub link will appear here once added."}
                  </p>
                )}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── FINAL CALL TO ACTION ─────────────────────────────────────────────── */}
      <section aria-label="Final contact action" className="py-14 md:py-20">
        <Reveal>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-lg leading-relaxed text-white/55 sm:text-xl">
              The best way to reach me is by email. I read everything and reply to relevant inquiries.
            </p>
            <a
              href={mailtoHref}
              className="inline-flex shrink-0 h-12 items-center gap-2 rounded-full bg-aqua px-7 text-sm font-semibold text-[#050713] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/50"
              aria-label={`Send an email to Johanna at ${email}`}
            >
              <MailIcon className="size-4 shrink-0" aria-hidden="true" />
              Get in touch
            </a>
          </div>
        </Reveal>
      </section>

    </div>
  )
}
